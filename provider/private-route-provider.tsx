"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/public/assets/loading";

export function PrivateRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (isLoading || !isLoggedIn) {
    return <Loading />;
  }

  return <>{children}</>;
}
