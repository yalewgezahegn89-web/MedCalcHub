"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  applyTheme,
  DEFAULT_THEME,
  getStoredTheme,
  setStoredTheme,
  THEME_CHANGE_EVENT,
  type ThemePreference,
} from "@/lib/theme";

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => callback();
  let unsubscribeMedia: (() => void) | undefined;

  try {
    window.addEventListener("storage", notify);
    window.addEventListener(THEME_CHANGE_EVENT, notify);

    const media = window.matchMedia?.(DARK_MEDIA_QUERY);
    const onMediaChange = () => {
      applyTheme(getStoredTheme());
      notify();
    };
    media?.addEventListener("change", onMediaChange);
    unsubscribeMedia = () =>
      media?.removeEventListener("change", onMediaChange);
  } catch {
    // Environment without full event support — subscription degrades
    // to manual updates only.
  }

  return () => {
    try {
      window.removeEventListener("storage", notify);
      window.removeEventListener(THEME_CHANGE_EVENT, notify);
      unsubscribeMedia?.();
    } catch {
      // Ignore teardown failures in degraded environments.
    }
  };
}

function getServerSnapshot(): ThemePreference {
  return DEFAULT_THEME;
}

/**
 * React binding for the theme preference. SSR/hydration safe: server
 * and first client render both report "system", then the client store
 * value is adopted after hydration without mismatch warnings.
 */
export function useThemePreference(): readonly [
  ThemePreference,
  (theme: ThemePreference) => void,
] {
  const preference = useSyncExternalStore(
    subscribe,
    getStoredTheme,
    getServerSnapshot,
  );

  const setTheme = useCallback((theme: ThemePreference) => {
    setStoredTheme(theme);
    applyTheme(theme);
  }, []);

  return [preference, setTheme] as const;
}
