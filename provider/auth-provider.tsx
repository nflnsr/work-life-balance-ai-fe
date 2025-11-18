"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { useAuthStore } from "@/store/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setIsLoading, setUser, accessToken } = useAuthStore();
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get("/user/profile");
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
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  }, [accessToken]);

  return <>{children}</>;
}

export default AuthProvider;
