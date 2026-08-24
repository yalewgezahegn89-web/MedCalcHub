export type ThemePreference = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "medcalchub-theme";

export const THEME_CHANGE_EVENT = "medcalchub-theme-changed";

export const DEFAULT_THEME: ThemePreference = "system";

const VALID_THEMES: readonly ThemePreference[] = [
  "light",
  "dark",
  "system",
];

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function isValidTheme(value: unknown): value is ThemePreference {
  return VALID_THEMES.includes(value as ThemePreference);
}

/**
 * Reads the stored preference. Missing storage, unavailable
 * localStorage, or an invalid value always resolves to "system".
 */
export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(raw) ? raw : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function setStoredTheme(theme: ThemePreference): void {
  if (!isValidTheme(theme)) return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable — the choice still applies for this session.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.matchMedia?.(DARK_MEDIA_QUERY).matches);
}

export function resolveAppliedTheme(
  preference: ThemePreference,
): ResolvedTheme {
  if (preference === "system") {
    return systemPrefersDark() ? "dark" : "light";
  }
  return preference;
}

const THEME_CLASS = "dark";

/**
 * Applies the resolved theme to <html> via the `dark` class so every
 * existing Tailwind dark: variant keeps working. Also mirrors the
 * resolution onto color-scheme for native form controls.
 */
export function applyTheme(preference: ThemePreference): void {
  if (typeof document === "undefined") return;

  const resolved = resolveAppliedTheme(preference);

  document.documentElement.classList.toggle(
    THEME_CLASS,
    resolved === "dark",
  );
  document.documentElement.style.colorScheme = resolved;
}
