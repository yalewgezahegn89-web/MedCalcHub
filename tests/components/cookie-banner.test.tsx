import { describe, it, expect, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
    useCallback: <T extends (...args: unknown[]) => unknown>(cb: T) => cb,
    useRef: (initial: unknown) => ({ current: initial }),
    // Mock useEffect to be a no-op — DOM effects don't run in unit tests
    useEffect: () => {},
  };
});

const CONSENT_KEY = "medcalchub-consent";

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

describe("CookieBanner", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchEventSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("returns element when consent is undecided", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).not.toBeNull();
  });

  it("returns null when consent is accepted", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).toBeNull();
  });

  it("returns null when consent is rejected", async () => {
    ls.store.set(CONSENT_KEY, "false");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).toBeNull();
  });

  it("reappears after consent is cleared (revocation)", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    expect(CookieBanner()).toBeNull();

    vi.resetModules();
    ls.store.delete(CONSENT_KEY);
    const { CookieBanner: Banner2 } = await import(
      "../../components/consent/cookie-banner"
    );
    expect(Banner2()).not.toBeNull();
  });
});

/* ---- Mobile consent interaction regressions ---- */

function flattenText(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(flattenText).join(" ");
  }
  const element = node as { props?: { children?: unknown } };
  if (
    element &&
    typeof element === "object" &&
    element.props &&
    typeof element.props === "object" &&
    "children" in element.props
  ) {
    return flattenText(element.props.children);
  }
  return "";
}

function findClickableByLabel(
  node: unknown,
  label: string,
  handler: "onClick" | "onTouchEnd" = "onClick",
): { onClick: (...args: unknown[]) => void } | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findClickableByLabel(child, label, handler);
      if (found) return found;
    }
    return null;
  }

  const element = node as ReactElement<{
    children?: unknown;
    onClick?: (...args: unknown[]) => void;
    onTouchEnd?: (...args: unknown[]) => void;
  }>;

  if (!element || typeof element !== "object" || !element.props) {
    return null;
  }

  const { children } = element.props;
  const fn =
    handler === "onTouchEnd"
      ? element.props.onTouchEnd
      : element.props.onClick;

  if (typeof fn === "function" && flattenText(children).includes(label)) {
    return { onClick: fn };
  }

  return findClickableByLabel(children, label, handler);
}

describe("CookieBanner mobile interaction (regression)", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchEventSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("tapping Accept advertising immediately persists consent and notifies subscribers", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );

    const accept = findClickableByLabel(CookieBanner(), "Accept advertising");
    expect(accept).not.toBeNull();

    accept!.onClick();

    expect(ls.store.get(CONSENT_KEY)).toBe("true");
    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it("banner disappears after tapping Accept (re-render resolves consent)", async () => {
    let mod = await import("../../components/consent/cookie-banner");
    const accept = findClickableByLabel(mod.CookieBanner(), "Accept advertising");
    accept!.onClick();

    vi.resetModules();
    mod = await import("../../components/consent/cookie-banner");
    expect(mod.CookieBanner()).toBeNull();
  });

  it("tapping Reject advertising persists rejection without enabling ads", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );

    const reject = findClickableByLabel(CookieBanner(), "Reject advertising");
    expect(reject).not.toBeNull();

    reject!.onClick();

    expect(ls.store.get(CONSENT_KEY)).toBe("false");
  });

  it("buttons are explicit type=button with >=44px touch targets and iOS tap reliability classes", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const html = renderToStaticMarkup(CookieBanner());

    expect(html).toContain('type="button"');
    expect(html).toContain("min-h-[44px]");
    expect(html).toContain("touch-manipulation");
    // Buttons must not sit under the iOS home-indicator / safe area
    expect(html).toContain("safe-area-inset-bottom");
  });

  it("keyboard Escape-to-reject wiring is preserved with correct listener cleanup", async () => {
    const source = readFileSync(
      path.join(process.cwd(), "components", "consent", "cookie-banner.tsx"),
      "utf8",
    );

    expect(source).toContain('document.addEventListener("keydown"');
    expect(source).toContain('document.removeEventListener("keydown"');

    // Consent store subscription lives in the lib layer; its
    // subscribe/unsubscribe symmetry must stay intact.
    const consentLib = readFileSync(
      path.join(process.cwd(), "lib", "consent", "consent.ts"),
      "utf8",
    );
    expect(consentLib).toContain(
      'window.addEventListener(CHANGE_EVENT, handler)',
    );
    expect(consentLib).toContain(
      'window.removeEventListener(CHANGE_EVENT, handler)',
    );
  });

  it("Accept works via the touch path (onTouchEnd) without any focus state", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );

    // Tap-equivalent: no prior focus, no click event — proves the
    // interaction does not rely on focus state.
    const touch = findClickableByLabel(
      CookieBanner(),
      "Accept advertising",
      "onTouchEnd",
    );
    expect(touch).not.toBeNull();

    let prevented = false;
    touch!.onClick!({ preventDefault: () => { prevented = true; } });

    expect(prevented).toBe(true);
    expect(ls.store.get(CONSENT_KEY)).toBe("true");
  });

  it("banner dismisses via Accept even when localStorage writes throw (iOS privacy modes)", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new Error("SecurityError: storage blocked");
    });

    const mod = await import("../../components/consent/cookie-banner");

    const accept = findClickableByLabel(mod.CookieBanner(), "Accept advertising");
    accept!.onClick!();

    // Same module instance: memory fallback must flip the snapshot so the
    // banner unmounts even though persistence failed.
    expect(mod.CookieBanner()).toBeNull();
  });

  it("Reject works via the touch path and cancels the synthetic click once", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );

    const touch = findClickableByLabel(
      CookieBanner(),
      "Reject advertising",
      "onTouchEnd",
    );
    expect(touch).not.toBeNull();

    let preventCalls = 0;
    touch!.onClick!({ preventDefault: () => { preventCalls += 1; } });

    expect(preventCalls).toBe(1);
    expect(ls.store.get(CONSENT_KEY)).toBe("false");
  });
});
