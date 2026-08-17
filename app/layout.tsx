import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar";
import { SearchProvider } from "@/components/search/search-provider";
import { NotificationProvider } from "@/components/ui/notification/notification-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medcalchub.com"),
  title: {
    default: "MedCalcHub",
    template: "%s | MedCalcHub",
  },
  description:
    "Professional evidence-based clinical calculators for healthcare professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        <SearchProvider />

        <main id="main-content">{children}</main>

        <NotificationProvider />
      </body>
    </html>
  );
}