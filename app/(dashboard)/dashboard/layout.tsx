import type { Metadata } from "next";
import { PrivateRouteProvider } from "@/provider/private-route-provider";

export const metadata: Metadata = {
  title: "Work-life Balance AI",
  description: "Work-life Balance AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrivateRouteProvider>{children}</PrivateRouteProvider>;
}
