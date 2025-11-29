import type { Metadata } from "next";
import { Geist, Geist_Mono, Delius_Unicase } from "next/font/google";
import "@/app/globals.css";
import ReactQueryProvider from "@/provider/react-query-provider";
import AuthProvider from "@/provider/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { DeviceCheckerProvider } from "@/provider/device-checker-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const deliusUnicase = Delius_Unicase({
  variable: "--font-delius-unicase",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Work-life Balance AI",
  description:
    "Work-life balance AI platform that helps users achieve an optimal work-life balance through personalized services.",
  themeColor: "#14b8a6",
  robots: "index, follow",
  applicationName: "Work-life Balance AI",
  icons: {
    icon: "https://worklifebalance-ai.tech/favicon.ico",
    shortcut: "https://worklifebalance-ai.tech/favicon.ico",
  },
  authors: [
    { name: "Naufal Nasrullah", url: "https://linkedin.com/in/naufalnn/" },
  ],
  keywords: [
    "work-life balance ai",
    "ai work-life balance",
    "work-life balance ai platform",
    "work-life ai",
    "work life ai",
    "ai for work-life balance",
    "ai for work life balance",
    "personalized work-life balance",
    "work-life balance",
    "work life balance",
    "worklife balance",
    "worklifebalance",
    "work-life",
    "work life",
  ],
  creator: "Naufal Nasrullah",
  publisher: "Naufal Nasrullah",
  generator: "Next.js",
  manifest: "https://worklifebalance-ai.tech/manifest.webmanifest",
  category: "Personal Website",
  classification: "Personal Website",
  openGraph: {
    type: "website",
    url: "https://worklifebalance-ai.tech",
    title: "Work-life Balance AI",
    description:
      "Work-life balance AI platform that helps users achieve an optimal work-life balance through personalized services.",
    images: [
      {
        url: "https://worklifebalance-ai.tech/assets/og-wlb.png",
        width: 720,
        height: 720,
        alt: "Work-life Balance AI",
      },
    ],
    siteName: "Work-life Balance AI",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${deliusUnicase.variable} antialiased`}
      >
        <DeviceCheckerProvider>
          <Toaster className="bg-purple-600" />
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </DeviceCheckerProvider>
      </body>
    </html>
  );
}
