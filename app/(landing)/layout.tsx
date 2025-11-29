import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/header";
import GeometricBackground from "@/components/geometric-background";
import { ProtectedRouteProvider } from "@/provider/protected-route-provider";

export const metadata: Metadata = {
  title: "Work-life Balance AI",
  description: "Work-life Balance AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRouteProvider>
      <div className="relative min-h-[calc(100vh-4rem)]">
        <GeometricBackground />
        <div className="relative mx-auto my-8 h-full min-h-[calc(100vh-4rem)] max-w-6xl rounded-3xl bg-white/95 shadow-2xl backdrop-opacity-80">
          <Header />
          {children}
        </div>
      </div>
    </ProtectedRouteProvider>
  );
}
