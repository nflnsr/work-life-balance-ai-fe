"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Loading } from "@/components/loading";
import { useDeviceStore } from "@/store/device";

export function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuthStore();
  const { isMobile } = useDeviceStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn || isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
