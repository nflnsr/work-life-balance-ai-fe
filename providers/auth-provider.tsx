"use client";

import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";
import { useGetProfile } from "@/services/user";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore();
  useGetProfile();

  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  }, [accessToken]);

  return <>{children}</>;
}

export default AuthProvider;
