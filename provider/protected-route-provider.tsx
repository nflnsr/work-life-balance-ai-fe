"use client";

// import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import loading from "@/public/assets/loading.svg"
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
      // <div className="flex h-screen items-center justify-center">
      //   <div className="size-12 animate-spin rounded-full border-t-4 border-b-4 border-gray-700" />
      // </div>
    );
  }

  return <>{children}</>;
}
