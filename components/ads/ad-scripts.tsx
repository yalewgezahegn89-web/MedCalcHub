"use client";

import Script from "next/script";

import { adsConfig } from "@/lib/ads/config";

export function AdScripts() {
  if (!adsConfig.adsenseReady) {
    return null;
  }

  return (
    <Script
      id="adsense-init"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.adsensePubId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
