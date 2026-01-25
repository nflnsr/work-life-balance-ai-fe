import { BASE_URL } from "@/utils/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar - Buat Akun Gratis",
  description:
    "Daftar gratis di Work-life Balance AI dan mulai perjalanan Anda menuju keseimbangan kerja-hidup yang optimal dengan bantuan AI.",
  keywords: [
    "daftar work-life balance ai",
    "sign up wlb ai",
    "register keseimbangan kerja",
    "buat akun work life balance",
    "registrasi gratis ai productivity",
  ],
  alternates: {
    canonical: `${BASE_URL}/sign-up`,
  },
  openGraph: {
    title: "Daftar Gratis - Work-life Balance AI",
    description:
      "Buat akun gratis dan mulai perjalanan Anda menuju keseimbangan kerja-hidup yang optimal dengan AI.",
    url: `${BASE_URL}/sign-up`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
