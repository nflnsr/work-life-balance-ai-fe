"use client";

// import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import loading from "@/public/assets/loading.svg"
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
      console.log("kepush ke login", isLoggedIn);
    }
  }, [isLoggedIn, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <Loading />
      // <div>
      //   <img src={loading} alt="Loading..." className="" />
      // </div>
      // <div className="flex h-screen items-center justify-center">
      //   <div className="size-12 animate-spin rounded-full border-t-4 border-b-4 border-gray-700" />
      // </div>
    ); 
  }

  return <>{children}</>;
}
