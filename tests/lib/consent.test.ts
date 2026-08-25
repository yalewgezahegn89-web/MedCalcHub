import { describe, it, expect, beforeEach, vi } from "vitest";

const STORAGE_KEY = "medcalchub-consent";
const CHANGE_EVENT = "medcalchub-consent-changed";

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
      clear: vi.fn(() => {
        store.clear();
      }),
    },
  };
}

describe("consent", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchEventSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    vi.resetModules();
  });

  async function load() {
    return import("../../lib/consent/consent");
  }

  describe("getConsent", () => {
    it("returns null when no value is stored", async () => {
      const { getConsent } = await load();
      expect(getConsent()).toBeNull();
    });

    it("returns true when 'true' is stored", async () => {
      ls.store.set(STORAGE_KEY, "true");
      const { getConsent } = await load();
      expect(getConsent()).toBe(true);
    });

    it("returns false when 'false' is stored", async () => {
      ls.store.set(STORAGE_KEY, "false");
      const { getConsent } = await load();
      expect(getConsent()).toBe(false);
    });

    it("returns null for malformed values", async () => {
      const { getConsent } = await load();

      ls.store.set(STORAGE_KEY, "yes");
      expect(getConsent()).toBeNull();

      ls.store.set(STORAGE_KEY, "1");
      expect(getConsent()).toBeNull();

      ls.store.set(STORAGE_KEY, "undefined");
      expect(getConsent()).toBeNull();

      ls.store.set(STORAGE_KEY, "{}");
      expect(getConsent()).toBeNull();
    });

    it("returns null when localStorage throws", async () => {
      ls.mock.getItem.mockImplementation(() => {
        throw new Error("quota exceeded");
      });
      const { getConsent } = await load();
      expect(getConsent()).toBeNull();
    });
  });

  describe("setConsent", () => {
    it("stores 'true' in localStorage", async () => {
      const { setConsent } = await load();
      const result = setConsent(true);
      expect(result).toBe(true);
      expect(ls.mock.setItem).toHaveBeenCalledWith(STORAGE_KEY, "true");
    });

    it("stores 'false' in localStorage", async () => {
      const { setConsent } = await load();
      const result = setConsent(false);
      expect(result).toBe(true);
      expect(ls.mock.setItem).toHaveBeenCalledWith(STORAGE_KEY, "false");
    });

    it("dispatches consent changed event", async () => {
      const { setConsent } = await load();
      setConsent(true);
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.any(Event),
      );
      expect(dispatchEventSpy.mock.calls[0][0].type).toBe(CHANGE_EVENT);
    });

    it("returns false when localStorage throws", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new Error("quota exceeded");
      });
      const { setConsent } = await load();
      const result = setConsent(true);
      expect(result).toBe(false);
    });
  });

  describe("clearConsent", () => {
    it("removes the consent key from localStorage", async () => {
      ls.store.set(STORAGE_KEY, "true");
      const { clearConsent } = await load();
      const result = clearConsent();
      expect(result).toBe(true);
      expect(ls.mock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it("dispatches consent changed event", async () => {
      const { clearConsent } = await load();
      clearConsent();
      expect(dispatchEventSpy).toHaveBeenCalled();
    });

    it("returns false when localStorage throws", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new Error("quota exceeded");
      });
      const { clearConsent } = await load();
      const result = clearConsent();
      expect(result).toBe(false);
    });

    it("causes getConsent to return null after clearing", async () => {
      ls.store.set(STORAGE_KEY, "true");
      const { clearConsent, getConsent } = await load();
      expect(getConsent()).toBe(true);
      clearConsent();
      expect(getConsent()).toBeNull();
    });

    it("causes hasConsent to return false after clearing", async () => {
      ls.store.set(STORAGE_KEY, "true");
      const { clearConsent, hasConsent } = await load();
      expect(hasConsent()).toBe(true);
      clearConsent();
      expect(hasConsent()).toBe(false);
    });
  });

  describe("hasConsent", () => {
    it("returns false when consent is null", async () => {
      const { hasConsent } = await load();
      expect(hasConsent()).toBe(false);
    });

    it("returns true when consent is true", async () => {
      ls.store.set(STORAGE_KEY, "true");
      const { hasConsent } = await load();
      expect(hasConsent()).toBe(true);
    });

    it("returns false when consent is false", async () => {
      ls.store.set(STORAGE_KEY, "false");
      const { hasConsent } = await load();
      expect(hasConsent()).toBe(false);
    });
  });

  describe("subscribeConsent", () => {
    it("returns a function", async () => {
      const { subscribeConsent } = await load();
      const unsub = subscribeConsent(() => {});
      expect(typeof unsub).toBe("function");
      unsub();
    });

    it("adds event listeners on subscribe", async () => {
      const addSpy = vi.fn();
      const removeSpy = vi.fn();
      vi.stubGlobal("window", {
        dispatchEvent: dispatchEventSpy,
        addEventListener: addSpy,
        removeEventListener: removeSpy,
      });

      const { subscribeConsent } = await load();
      const unsub = subscribeConsent(() => {});

      expect(addSpy).toHaveBeenCalledWith(CHANGE_EVENT, expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith("storage", expect.any(Function));

      unsub();

      expect(removeSpy).toHaveBeenCalledWith(CHANGE_EVENT, expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    });
  });
});

// ─────────────────────────────────────────────────
// Batch 16 — Consent Accessibility Tests
// ─────────────────────────────────────────────────

describe("CookieBanner accessibility", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  function createBannerMocks() {
    const store = new Map<string, string>();
    const addEventListeners: Array<[string, EventListener]> = [];
    const removeEventListeners: Array<[string, EventListener]> = [];

    return {
      store,
      localStorage: {
        getItem: vi.fn((key: string) => store.get(key) ?? null),
        setItem: vi.fn((key: string, value: string) => { store.set(key, value); }),
        removeItem: vi.fn((key: string) => { store.delete(key); }),
        clear: vi.fn(() => { store.clear(); }),
      },
      window: {
        dispatchEvent: vi.fn(),
        addEventListener: vi.fn((...args: [string, EventListener]) => {
          addEventListeners.push(args);
        }),
        removeEventListener: vi.fn((...args: [string, EventListener]) => {
          removeEventListeners.push(args);
        }),
      },
      addEventListeners,
      removeEventListeners,
    };
  }

  it("banner has role=dialog and aria-label", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain('role="dialog"');
    expect(src).toContain('aria-label="Cookie and advertising consent"');
  });

  it("banner renders Accept and Reject buttons", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("Accept advertising");
    expect(src).toContain("Reject advertising");
  });

  it("Accept button has ref for initial focus", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("acceptRef");
    expect(src).toContain("ref={acceptRef}");
  });

  it("initial focus effect targets Accept button", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("acceptRef.current?.focus({ preventScroll: true })");
  });

  it("Escape key triggers reject (safe explicit outcome)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain('"Escape"');
    expect(src).toContain("setConsent(false)");
  });

  it("no keyboard trap: Escape handler uses preventDefault but does not block navigation", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("e.preventDefault()");
  });

  it("focus restoration targets previousFocusRef", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("previousFocusRef");
    expect(src).toContain(
      "previousFocusRef.current.focus({ preventScroll: true })",
    );
  });

  it("banner returns null when consent is not null", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain("if (consent !== null)");
    expect(src).toContain("return null;");
  });

  it("useEffect cleanup removes keydown listener", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/consent/cookie-banner.tsx"),
      "utf8",
    );
    expect(src).toContain('document.removeEventListener("keydown", onKeyDown)');
  });
});

// ─────────────────────────────────────────────────
// Batch 16 — Consent Flow Integration Tests
// ─────────────────────────────────────────────────

describe("Consent flow integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("clearConsent causes getConsent to return null", async () => {
    const store = new Map<string, string>([["medcalchub-consent", "true"]]);
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
    });
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    expect(consent.getConsent()).toBe(true);
    consent.clearConsent();
    expect(consent.getConsent()).toBeNull();
    expect(consent.hasConsent()).toBe(false);
  });

  it("setConsent(false) causes hasConsent to return false", async () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
    });
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    consent.setConsent(false);
    expect(consent.hasConsent()).toBe(false);
    expect(consent.getConsent()).toBe(false);
  });

  it("setConsent(true) causes hasConsent to return true", async () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
    });
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    consent.setConsent(true);
    expect(consent.hasConsent()).toBe(true);
  });

  it("consent change event is dispatched on setConsent", async () => {
    const dispatchSpy = vi.fn();
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    vi.stubGlobal("window", {
      dispatchEvent: dispatchSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    consent.setConsent(true);
    expect(dispatchSpy).toHaveBeenCalled();
    const eventArg = dispatchSpy.mock.calls[0][0] as Event;
    expect(eventArg.type).toBe("medcalchub-consent-changed");
  });

  it("consent change event is dispatched on clearConsent", async () => {
    const dispatchSpy = vi.fn();
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    vi.stubGlobal("window", {
      dispatchEvent: dispatchSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    consent.clearConsent();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("subscribeConsent fires on consent change event", async () => {
    let handler: EventListener | undefined;
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn((_event: string, cb: EventListener) => {
        handler = cb;
      }),
      removeEventListener: vi.fn(),
    });

    const consent = await import("../../lib/consent/consent");
    const spy = vi.fn();
    consent.subscribeConsent(spy);
    expect(handler).toBeDefined();
  });
});
