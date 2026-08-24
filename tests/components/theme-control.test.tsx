import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    // DOM effects don't run in unit tests
    useEffect: () => {},
    useRef: (initial: unknown) => ({ current: initial }),
    // Resolve the store snapshot directly so mocked localStorage
    // states can be asserted without a browser environment.
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
  };
});

import { ThemeControl } from "../../components/theme/theme-control";

function createLocalStorageMock(initial?: Record<string, string>) {
  const store = new Map<string, string>(
    Object.entries(initial ?? {}),
  );
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

function stubWindow(ls: ReturnType<typeof createLocalStorageMock>) {
  vi.stubGlobal("localStorage", ls.mock);
  vi.stubGlobal("window", {
    localStorage: ls.mock,
    dispatchEvent: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    matchMedia: vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe("ThemeControl accessibility", () => {
  function renderControl(
    stored?: Record<string, string>,
  ): string {
    stubWindow(createLocalStorageMock(stored));
    return renderToStaticMarkup(<ThemeControl />);
  }

  it("renders a named menu button reflecting the current theme", () => {
    const markup = renderControl();

    expect(markup).toContain('aria-haspopup="menu"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain(
      'aria-label="Theme: System. Change theme"',
    );
  });

  it("announces an explicit light preference to screen readers", () => {
    const markup = renderControl({
      "medcalchub-theme": "light",
    });

    expect(markup).toContain(
      'aria-label="Theme: Light. Change theme"',
    );
  });

  it("announces an explicit dark preference", () => {
    const markup = renderControl({
      "medcalchub-theme": "dark",
    });

    expect(markup).toContain(
      'aria-label="Theme: Dark. Change theme"',
    );
  });

  it("keeps the menu closed until activated (no hidden duplicate controls)", () => {
    const markup = renderControl();

    expect(markup).not.toContain('role="menu"');
    expect(markup).not.toContain('role="menuitemradio"');
  });

  it("shows visible focus affordances on the trigger", () => {
    const markup = renderControl();

    expect(markup).toContain("focus-visible:ring-2");
    expect(markup).toContain("focus-visible:outline-none");
  });

  it("meets the existing navbar touch-target sizing", () => {
    const markup = renderControl();

    expect(markup).toContain("min-h-[44px]");
  });
});
