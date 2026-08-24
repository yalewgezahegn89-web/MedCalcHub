import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  applyTheme,
  DEFAULT_THEME,
  getStoredTheme,
  resolveAppliedTheme,
  setStoredTheme,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
} from "../../lib/theme";
import { subscribe } from "../../components/theme/use-theme-preference";

type ThemePreference =
  | "light"
  | "dark"
  | "system";

function createLocalStorageMock() {
  const store = new Map<string, string>();
  return {
    store,
    mock: {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store.set(key, value);
      }),
      removeItem: vi.fn((key: string) => {
        store.delete(key);
      }),
      clear: vi.fn(() => store.clear()),
    },
  };
}

function stubWindow(options?: {
  prefersDark?: boolean;
  localStorage?: ReturnType<typeof createLocalStorageMock>;
}) {
  const ls = options?.localStorage ?? createLocalStorageMock();
  const listeners = new Map<string, Set<EventListener>>();

  vi.stubGlobal("localStorage", ls.mock);
  vi.stubGlobal("window", {
    localStorage: ls.mock,
    dispatchEvent: vi.fn((event: Event) => {
      for (const listener of listeners.get(event.type) ?? []) {
        listener(event);
      }
      return true;
    }),
    addEventListener: vi.fn(
      (type: string, listener: EventListener) => {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)?.add(listener);
      },
    ),
    removeEventListener: vi.fn(
      (type: string, listener: EventListener) => {
        listeners.get(type)?.delete(listener);
      },
    ),
    matchMedia: vi.fn(() => ({
      matches: options?.prefersDark ?? false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });

  return { ls, listeners };
}

function stubDocument() {
  const classSet = new Set<string>();
  const toggle = vi.fn(
    (token: string, force?: boolean) => {
      if (force === undefined) {
        if (classSet.has(token)) classSet.delete(token);
        else classSet.add(token);
        return classSet.has(token);
      }
      if (force) classSet.add(token);
      else classSet.delete(token);
      return force;
    },
  );

  const documentMock = {
    documentElement: {
      classList: { toggle, contains: (t: string) => classSet.has(t) },
      style: {} as Record<string, string>,
    },
  };

  vi.stubGlobal("document", documentMock);

  return {
    classSet,
    toggle,
    get colorScheme() {
      return (
        documentMock.documentElement.style as unknown as {
          colorScheme?: string;
        }
      ).colorScheme;
    },
  };
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getStoredTheme", () => {
  it("defaults to system without a window (SSR safety)", () => {
    expect(getStoredTheme()).toBe("system");
    expect(DEFAULT_THEME).toBe("system");
  });

  it("defaults to system when nothing is stored", () => {
    stubWindow();
    expect(getStoredTheme()).toBe("system");
  });

  it("reads a stored explicit preference", () => {
    const { ls } = stubWindow();

    for (const theme of ["light", "dark", "system"] as const) {
      ls.store.set(THEME_STORAGE_KEY, theme);
      expect(getStoredTheme()).toBe(theme);
    }
  });

  it("falls back to system on invalid stored values", () => {
    const { ls } = stubWindow();

    for (const invalid of [
      "blue",
      "LIGHT",
      "",
      '{"theme":"dark"}',
      "null",
    ]) {
      ls.store.set(THEME_STORAGE_KEY, invalid);
      expect(getStoredTheme()).toBe("system");
    }
  });

  it("falls back to system when localStorage throws", () => {
    stubWindow({
      localStorage: {
        store: new Map(),
        mock: {
          getItem: vi.fn(() => {
            throw new Error("blocked");
          }),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
      },
    });

    expect(getStoredTheme()).toBe("system");
  });
});

describe("setStoredTheme", () => {
  it("persists light, dark, and system choices", () => {
    const { ls } = stubWindow();

    for (const theme of ["light", "dark", "system"] as const) {
      setStoredTheme(theme);
      expect(ls.mock.setItem).toHaveBeenCalledWith(
        THEME_STORAGE_KEY,
        theme,
      );
      expect(ls.store.get(THEME_STORAGE_KEY)).toBe(theme);
    }
  });

  it("ignores invalid values", () => {
    const { ls } = stubWindow();

    setStoredTheme("blue" as ThemePreference);
    expect(ls.mock.setItem).not.toHaveBeenCalled();
  });

  it("survives unavailable storage and still notifies", () => {
    const win = stubWindow({
      localStorage: {
        store: new Map(),
        mock: {
          getItem: vi.fn(() => null),
          setItem: vi.fn(() => {
            throw new Error("quota");
          }),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
      },
    });

    expect(() => setStoredTheme("dark")).not.toThrow();
    expect(
      (window.dispatchEvent as ReturnType<typeof vi.fn>).mock.calls
        .length,
    ).toBe(1);
    expect(win.ls.store.has(THEME_STORAGE_KEY)).toBe(false);
  });
});

describe("resolveAppliedTheme", () => {
  it("resolves explicit light/dark directly", () => {
    expect(resolveAppliedTheme("light")).toBe("light");
    expect(resolveAppliedTheme("dark")).toBe("dark");
  });

  it("follows the system preference in system mode", () => {
    stubWindow({ prefersDark: true });
    expect(resolveAppliedTheme("system")).toBe("dark");

    vi.unstubAllGlobals();
    stubWindow({ prefersDark: false });
    expect(resolveAppliedTheme("system")).toBe("light");
  });
});

describe("applyTheme", () => {
  it("is a no-op without a document (SSR safety)", () => {
    expect(() =>
      applyTheme("dark"),
    ).not.toThrow();
  });

  it("toggles the dark class for each resolution", () => {
    stubWindow({ prefersDark: false });
    const doc = stubDocument();

    applyTheme("light");
    expect(doc.toggle).toHaveBeenLastCalledWith("dark", false);

    applyTheme("dark");
    expect(doc.toggle).toHaveBeenLastCalledWith("dark", true);

    applyTheme("system");
    expect(doc.toggle).toHaveBeenLastCalledWith("dark", false);

    expect(doc.colorScheme).toBe("light");
  });

  it("applies dark when system preference is dark", () => {
    stubWindow({ prefersDark: true });
    const doc = stubDocument();

    applyTheme("system");
    expect(doc.toggle).toHaveBeenLastCalledWith("dark", true);
    expect(doc.colorScheme).toBe("dark");
  });
});

describe("subscribe", () => {
  it("returns a no-op unsubscribe without a window", () => {
    const unsubscribe = subscribe(() => {});
    expect(typeof unsubscribe).toBe("function");
    expect(() => unsubscribe()).not.toThrow();
  });

  it("notifies on the change event and stops after unsubscribe", () => {
    const { listeners } = stubWindow();
    const callback = vi.fn();

    const unsubscribe = subscribe(callback);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    expect(callback).toHaveBeenCalledTimes(1);

    unsubscribe();
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    expect(callback).toHaveBeenCalledTimes(1);

    expect(listeners.get(THEME_CHANGE_EVENT)?.size).toBe(0);
  });
});

describe("theme mechanism regression guards", () => {
  const root = join(__dirname, "..", "..");

  it("globals.css uses the class-based dark variant", () => {
    const css = readFileSync(
      join(root, "app", "globals.css"),
      "utf8",
    );

    expect(css).toContain("@custom-variant dark");
    expect(css).toContain(".dark {");
    // The media query alone must no longer be the only mechanism:
    expect(css).not.toContain("@media (prefers-color-scheme: dark)");
  });

  it("layout applies the pre-hydration theme script safely", () => {
    const layout = readFileSync(
      join(root, "app", "layout.tsx"),
      "utf8",
    );

    expect(layout).toContain("suppressHydrationWarning");
    expect(layout).toContain("THEME_STORAGE_KEY");
    expect(layout).toContain("<ThemeProvider />");
  });

  it("existing components keep using tailwind dark variants", () => {
    const navbar = readFileSync(
      join(root, "components", "navbar.tsx"),
      "utf8",
    );
    expect(navbar).toContain("dark:border-slate-800");
  });
});
