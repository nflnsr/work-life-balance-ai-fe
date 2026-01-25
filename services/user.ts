import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { LoginFormType } from "@/validators/login";
import { setRefreshToken } from "@/server/auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { RegisterFormType } from "@/validators/register";
import { AxiosError } from "axios";
import { Response } from "@/types/response";

const baseAPIUrl = "/api/user";

// profile fetch used in auth provider to check
// user session and set user state token
const useGetProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setIsLoading, setUser } = useAuthStore();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get(`${baseAPIUrl}/profile`);
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading?.(false);
        throw error;
      }
    },
    onSuccess: (data) => {
      setUser(data.data);
    },
    onSettled: () => {
      setIsLoading?.(false);
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

const usePostLogin = (params?: UseMutationOptions<any, any, LoginFormType>) => {
  const { setAccessToken, setUser, setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (input: LoginFormType) => {
      const { data } = await axiosInstance.post(`${baseAPIUrl}/login`, input);
      return data;
    },
    onSuccess: (data) => {
      setRefreshToken(data.data.refreshToken);
      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      setIsLoggedIn(true);
      router.replace("/dashboard");
    },
    onError: () => {
      toast.error("Login failed");
    },
    ...params,
  });
};

const usePostRegister = (
  params?: UseMutationOptions<any, any, RegisterFormType>,
) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (input: RegisterFormType) => {
      const { data } = await axiosInstance.post(
        `${baseAPIUrl}/register`,
        input,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Register berhasil, silakan login");
      router.replace("/login");
    },
    onError: (error: AxiosError<Response>) => {
      toast.error(`Register failed: ${error.response?.data.message}`);
    },
    ...params,
  });
};

export { useGetProfile, usePostLogin, usePostRegister };
