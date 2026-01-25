import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Delius_Unicase } from "next/font/google";
import "@/app/globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { DeviceCheckerProvider } from "@/providers/device-checker-provider";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  faqSchema,
  BASE_URL,
} from "@/utils/constants";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14b8a6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d9488" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
};

export const metadata: Metadata = {
  // Identity
  title: {
    default: "Work-life Balance AI | Platform AI Keseimbangan Kerja-Hidup",
    template: "%s | Work-life Balance AI",
  },
  description:
    "Platform AI untuk keseimbangan kerja-hidup yang membantu Anda melacak, menganalisis, dan meningkatkan work-life balance dengan layanan personalisasi berbasis kecerdasan buatan.",
  applicationName: "Work-life Balance AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Indexing & Crawling
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "144x144" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#14b8a6",
      },
    ],
  },

  // Authors & Creator
  authors: [
    { name: "Naufal Nasrullah", url: "https://linkedin.com/in/naufalnn/" },
  ],
  creator: "Naufal Nasrullah",
  publisher: "Naufal Nasrullah",

  // Keywords (Extended)
  keywords: [
    // Primary Keywords
    "work-life balance ai",
    "ai work-life balance",
    "work-life balance platform",
    "keseimbangan kerja hidup",
    "work life balance indonesia",
    // Feature Keywords
    "ai schedule analysis",
    "personalized work recommendations",
    "work-life score tracking",
    "productivity ai",
    "wellness ai platform",
    // Long-tail Keywords
    "cara meningkatkan work life balance",
    "aplikasi keseimbangan kerja",
    "ai untuk produktivitas",
    "platform kesehatan mental kerja",
    "work-life balance tracker",
    "ai productivity assistant",
    "smart work-life management",
    // Related Keywords
    "burnout prevention",
    "stress management ai",
    "work wellness",
    "employee wellbeing",
    "remote work balance",
  ],

  // Manifest & Category
  manifest: `${BASE_URL}/manifest.webmanifest`,
  category: "Health & Productivity",
  classification: "Web Application",

  // Canonical & Alternate
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "id-ID": "/",
    },
  },

  // Open Graph (Enhanced)
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Work-life Balance AI | Platform AI Keseimbangan Kerja-Hidup",
    description:
      "Platform AI yang membantu Anda melacak, menganalisis, dan meningkatkan keseimbangan kerja-hidup dengan layanan personalisasi berbasis kecerdasan buatan.",
    siteName: "Work-life Balance AI",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: `${BASE_URL}/assets/og-wlb.png`,
        width: 1200,
        height: 630,
        alt: "Work-life Balance AI - Platform Keseimbangan Kerja-Hidup Berbasis AI",
        type: "image/png",
      },
      {
        url: `${BASE_URL}/assets/og-wlb-square.png`,
        width: 600,
        height: 600,
        alt: "Work-life Balance AI Logo",
        type: "image/png",
      },
    ],
  },

  // Twitter Card (Enhanced)
  twitter: {
    card: "summary_large_image",
    title: "Work-life Balance AI | Platform AI Keseimbangan Kerja-Hidup",
    description:
      "Platform AI yang membantu Anda melacak, menganalisis, dan meningkatkan keseimbangan kerja-hidup dengan layanan personalisasi.",
    images: [`${BASE_URL}/assets/og-wlb.png`],
    creator: "@naufalnn",
    site: "@worklifebalanceai",
  },

  // Verification (tambahkan kode verifikasi yang sebenarnya)
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
    // yahoo: "yahoo-verification-code-here",
    other: {
      "msvalidate.01": "bing-verification-code-here",
      "facebook-domain-verification": "facebook-verification-code-here",
    },
  },

  // App Links
  appleWebApp: {
    capable: true,
    title: "Work-life Balance AI",
    statusBarStyle: "black-translucent",
  },

  // Format Detection
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },

  // Additional Meta
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#14b8a6",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#14b8a6",
    // Preconnect hints
    "dns-prefetch": "https://fonts.googleapis.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
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
