"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

import { adsConfig } from "@/lib/ads/config";
import {
  hasConsent,
  subscribeConsent,
} from "@/lib/consent/consent";

export function AdScripts() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    hasConsent,
    () => false,
  );

  if (!adsConfig.adsenseReady || !consent) {
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
