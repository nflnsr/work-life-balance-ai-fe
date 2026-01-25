import { BASE_URL } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Masuk ke Akun Anda",
  description:
    "Masuk ke akun Work-life Balance AI Anda untuk melacak dan meningkatkan keseimbangan kerja-hidup dengan bantuan kecerdasan buatan.",
  keywords: [
    "login work-life balance ai",
    "masuk akun wlb",
    "sign in work life balance",
    "login keseimbangan kerja",
  ],
  alternates: {
    canonical: `${BASE_URL}/login`,
  },
  openGraph: {
    title: "Login - Work-life Balance AI",
    description:
      "Masuk ke akun Anda untuk melacak dan meningkatkan keseimbangan kerja-hidup.",
    url: `${BASE_URL}/login`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
