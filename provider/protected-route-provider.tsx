"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Loading } from "@/public/assets/loading";

export function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      router.replace("/dashboard");
      console.log("kepush ke dashboard", isLoggedIn);
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn || isLoading) {
    return (
      <Loading />
    );
  }

  return <>{children}</>;
}
