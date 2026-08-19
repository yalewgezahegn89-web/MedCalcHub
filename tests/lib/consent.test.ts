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
