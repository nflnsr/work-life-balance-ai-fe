import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/header";
import GeometricBackground from "@/components/geometric-background";
import { ProtectedRouteProvider } from "@/providers/protected-route-provider";
import { BASE_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Work-life Balance AI | Platform AI Keseimbangan Kerja-Hidup",
  description:
    "Platform AI yang membantu Anda melacak, menganalisis, dan meningkatkan keseimbangan kerja-hidup dengan layanan personalisasi berbasis kecerdasan buatan. Mulai perjalanan menuju kehidupan yang lebih seimbang.",
  keywords: [
    "work-life balance",
    "keseimbangan kerja hidup",
    "ai productivity",
    "work wellness platform",
    "stress management",
    "burnout prevention",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Work-life Balance AI | Platform AI untuk mengatur Keseimbangan Kerja-Hidup",
    description:
      "Platform AI yang membantu Anda melacak, menganalisis, dan meningkatkan keseimbangan kerja-hidup. Mulai perjalanan menuju kehidupan yang lebih seimbang.",
    url: BASE_URL,
    type: "website",
  },
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
