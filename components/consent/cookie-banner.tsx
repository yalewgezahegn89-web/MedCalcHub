"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import {
  getConsent,
  setConsent,
  subscribeConsent,
} from "@/lib/consent/consent";

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    () => null,
  );

  const acceptRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleAccept = useCallback(() => {
    setConsent(true);
  }, []);

  const handleReject = useCallback(() => {
    setConsent(false);
  }, []);

  // Initial focus: move focus to Accept button when banner appears
  useEffect(() => {
    if (consent === null) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      acceptRef.current?.focus({ preventScroll: true });
    }
  }, [consent]);

  // Keyboard: Escape rejects consent (safe, explicit outcome)
  useEffect(() => {
    if (consent !== null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setConsent(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [consent]);

  // Focus restoration: when consent resolves, restore focus to trigger
  useEffect(() => {
    if (consent !== null && previousFocusRef.current) {
      previousFocusRef.current.focus({ preventScroll: true });
      previousFocusRef.current = null;
    }
  }, [consent]);

  if (consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie and advertising consent"
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-slate-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-6 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          MedCalcHub stores your favorites, history, and saved calculations
          locally in your browser using localStorage. This data never leaves
          your device.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Optional advertising, when enabled, may use third-party cookies or
          similar technologies. You can accept or reject advertising below.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            ref={acceptRef}
            type="button"
            onClick={handleAccept}
            className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation select-none items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Accept advertising
          </button>

          <button
            type="button"
            onClick={handleReject}
            className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation select-none items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Reject advertising
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          <a
            href="/privacy"
            className="underline hover:text-slate-700 dark:hover:text-slate-200"
          >
            Privacy Policy
          </a>
          {" · "}
          <a
            href="/cookie"
            className="underline hover:text-slate-700 dark:hover:text-slate-200"
          >
            Cookie Policy
          </a>
        </p>
      </div>
    </div>
  );
}
