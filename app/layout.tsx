import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import "./globals.css";

import { AdScripts } from "@/components/ads/ad-scripts";
import { ConsentPreferencesButton } from "@/components/consent/consent-preferences-button";
import { CookieBanner } from "@/components/consent/cookie-banner";
import Navbar from "@/components/navbar";
import { SearchProvider } from "@/components/search/search-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { NotificationProvider } from "@/components/ui/notification/notification-provider";
import { SITE_URL } from "@/lib/site-url";
import { THEME_STORAGE_KEY } from "@/lib/theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MedCalcHub",
    template: "%s | MedCalcHub",
  },
  description:
    "Professional evidence-based clinical calculators for healthcare professionals.",
  openGraph: {
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "MedCalcHub — Professional Medical Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"&&t!=="system")t="system";var m=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches:false;var d=t==="dark"||(t==="system"&&m);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider />

        <Navbar />

        <SearchProvider />

        <main id="main-content">{children}</main>

        <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>MedCalcHub — Professional medical calculators for healthcare professionals.</p>
            <p className="mt-2">
              Data stored locally in your browser. Not synced to any server.
            </p>
            <p className="mt-3">
              <Link href="/privacy" className="underline hover:text-slate-700 dark:hover:text-slate-200">Privacy Policy</Link>
              {" · "}
              <Link href="/cookie" className="underline hover:text-slate-700 dark:hover:text-slate-200">Cookie Policy</Link>
              {" · "}
              <ConsentPreferencesButton />
            </p>
          </div>
        </footer>

        <NotificationProvider />

        <CookieBanner />
        <AdScripts />

      </body>
    </html>
  );
}
