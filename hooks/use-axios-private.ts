import { useEffect } from "react";
import {
  axiosPrivateInstance,
  axiosPrivateInstance2,
} from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { setRefreshToken } from "@/server/auth";

export function useAxiosPrivate() {
  const { accessToken, setAccessToken, setUser, setIsLoggedIn, setIsLoading } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("Error responsenya:", error?.response?.status);
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          // setIsLoading?.(true);
          try {
            const { data } = await axiosPrivateInstance2.post(
              "/user/refresh-token",
              {},
              { withCredentials: true },
            );
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            setIsLoggedIn(true);
            setUser(data.data.user);
            prevRequest.headers["Authorization"] =
            `Bearer ${data.data.accessToken}`;
            prevRequest.sent = true;
            setIsLoading?.(false);
            return axiosPrivateInstance(prevRequest);
          } catch (error) {
            console.error("Failed to refresh token:", error);
          }

          setUser(null);
          setAccessToken(null);
          setIsLoading?.(false);
          setIsLoggedIn(false);
          if (pathname.split("/").filter(Boolean)[0] === "dashboard") {
            router.replace("/login");
            // window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [router, accessToken, setAccessToken, setUser, setIsLoggedIn]);

  return axiosPrivateInstance;
}
