"use client";

import { useCallback } from "react";

import { clearConsent } from "@/lib/consent/consent";

export function ConsentPreferencesButton() {
  const handleClick = useCallback(() => {
    clearConsent();
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="underline hover:text-slate-700 dark:hover:text-slate-200"
    >
      Manage cookie preferences
    </button>
  );
}
