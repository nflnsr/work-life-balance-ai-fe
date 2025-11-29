import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Work-life Balance AI",
  description: "Work-life Balance AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
