"use client";

import { useSyncExternalStore } from "react";

import { adsConfig } from "@/lib/ads/config";
import {
  hasConsent,
  subscribeConsent,
} from "@/lib/consent/consent";

type AdSlotSize = "banner" | "leaderboard" | "rectangle" | "mobile-banner";

type AdSlotProps = {
  size?: AdSlotSize;
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
  label = "Advertisement",
  className,
}: AdSlotProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    hasConsent,
    () => false,
  );

  if (!adsConfig.adsenseReady || !consent) {
    return null;
  }

  return (
    <aside
      role="complementary"
      aria-label={label}
      className={`mx-auto my-6 flex items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 ${sizeStyles[size]} ${className ?? ""}`}
    >
      <span className="text-xs text-slate-400 dark:text-slate-500">
        {label}
      </span>
    </aside>
  );
}
