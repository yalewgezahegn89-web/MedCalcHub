"use client";

import { useEffect } from "react";

import {
  applyTheme,
  getStoredTheme,
  THEME_CHANGE_EVENT,
} from "@/lib/theme";

/**
 * Keeps the applied theme in sync after hydration. The inline script
 * in app/layout.tsx sets the class before first paint; this component
 * re-applies on preference/storage changes so React-driven updates
 * never drift from the DOM.
 */
export function ThemeProvider() {
  useEffect(() => {
    const sync = () => applyTheme(getStoredTheme());

    sync();

    window.addEventListener(THEME_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return null;
}
