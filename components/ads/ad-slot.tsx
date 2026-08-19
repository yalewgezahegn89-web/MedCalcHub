"use client";

import { useEffect, useSyncExternalStore } from "react";

import { adsConfig, isValidSlotId } from "@/lib/ads/config";
import {
  hasConsent,
  subscribeConsent,
} from "@/lib/consent/consent";

type AdSlotSize = "banner" | "leaderboard" | "rectangle" | "mobile-banner";

type AdSlotProps = {
  size?: AdSlotSize;
  slotId?: string;
  label?: string;
  className?: string;
};

const sizeStyles: Record<AdSlotSize, string> = {
  banner: "min-h-[100px] max-w-[728px]",
  leaderboard: "min-h-[100px] max-w-[970px]",
  rectangle: "min-h-[260px] max-w-[336px]",
  "mobile-banner": "min-h-[100px] max-w-[320px]",
};

export function AdSlot({
  size = "banner",
  slotId,
  label = "Advertisement",
  className,
}: AdSlotProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    hasConsent,
    () => false,
  );

  if (!adsConfig.adsenseReady || !consent || !isValidSlotId(slotId)) {
    return null;
  }

  return (
    <aside
      role="complementary"
      aria-label={label}
      className={`mx-auto my-6 overflow-hidden rounded-lg ${sizeStyles[size]} ${className ?? ""}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsConfig.adsensePubId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <AdSlotInit />
    </aside>
  );
}

function AdSlotInit() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense initialization error — silently ignored
    }
  }, []);

  return null;
}
