"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { useAuthStore } from "@/store/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const axiosPrivate = useAxiosPrivate();
  const { setIsLoading, setUser } = useAuthStore();
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try{
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

  return <>{children}</>;
}

export default AuthProvider;
