import type { Metadata } from "next";
import { PrivateRouteProvider } from "@/providers/private-route-provider";
import { SidebarProvider } from "@/components/sidebar";
import { BASE_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Dashboard - Kelola Work-life Balance Anda",
  description:
    "Dashboard personal Work-life Balance AI untuk melacak aktivitas, melihat skor keseimbangan, dan mendapatkan rekomendasi AI untuk meningkatkan work-life balance Anda.",
  keywords: [
    "dashboard work-life balance",
    "tracking work-life balance",
    "work life score",
    "ai recommendations",
    "personal productivity dashboard",
  ],
  alternates: {
    canonical: `${BASE_URL}/dashboard`,
  },
  openGraph: {
    title: "Dashboard - Work-life Balance AI",
    description:
      "Kelola dan pantau keseimbangan kerja-hidup Anda dengan dashboard AI personal.",
    url: `${BASE_URL}/dashboard`,
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRouteProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </PrivateRouteProvider>
  );
}
