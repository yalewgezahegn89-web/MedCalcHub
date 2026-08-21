import { describe, it, expect, beforeEach, vi } from "vitest";

function createLocalStorageMock() {
  const store = new Map<string, string>();
  return {
    store,
    mock: {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => store.set(key, value)),
      removeItem: vi.fn((key: string) => store.delete(key)),
      clear: vi.fn(() => store.clear()),
    },
  };
}

const STORAGE_KEY = "medcalchub-recent";
const CHANGE_EVENT = "medcalchub-recent-changed";

describe("recent", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);
    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", { dispatchEvent: dispatchEventSpy });
    vi.resetModules();
  });

  async function load() {
    return import("../../lib/recent");
  }

  describe("getRecentCalculators", () => {
    it("returns [] during SSR", async () => {
      const savedWindow = globalThis.window;
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      try {
        const { getRecentCalculators } = await load();
        expect(getRecentCalculators()).toEqual([]);
      } finally {
        globalThis.window = savedWindow;
      }
    });

    it("returns [] when storage is empty", async () => {
      const { getRecentCalculators } = await load();
      expect(getRecentCalculators()).toEqual([]);
    });

    it("returns valid stored JSON", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));
      const { getRecentCalculators } = await load();
      expect(getRecentCalculators()).toEqual(["bmi", "crf"]);
    });

    it("returns [] for malformed JSON", async () => {
      ls.store.set(STORAGE_KEY, "bad-json");
      const { getRecentCalculators } = await load();
      expect(getRecentCalculators()).toEqual([]);
    });
  });

  describe("addRecentCalculator", () => {
    it("stores new ID at the beginning", async () => {
      const { addRecentCalculator, getRecentCalculators } = await load();
      addRecentCalculator("bmi");
      expect(getRecentCalculators()).toEqual(["bmi"]);
    });

    it("moves existing ID to the top", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));
      const { addRecentCalculator, getRecentCalculators } = await load();
      addRecentCalculator("crf");
      expect(getRecentCalculators()).toEqual(["crf", "bmi"]);
    });

    it("caps at 10 entries", async () => {
      const ids = Array.from({ length: 15 }, (_, i) => `calc-${i}`);
      ls.store.set(STORAGE_KEY, JSON.stringify(ids));
      const { addRecentCalculator, getRecentCalculators } = await load();
      addRecentCalculator("new");
      const result = getRecentCalculators();
      expect(result).toHaveLength(10);
      expect(result[0]).toBe("new");
    });
  });

  describe("removeRecentCalculator", () => {
    it("removes an existing ID", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));
      const { removeRecentCalculator, getRecentCalculators } = await load();
      removeRecentCalculator("bmi");
      expect(getRecentCalculators()).toEqual(["crf"]);
    });

    it("does not throw for missing ID", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      const { removeRecentCalculator } = await load();
      expect(() => removeRecentCalculator("nonexistent")).not.toThrow();
    });
  });

  describe("clearRecentCalculators", () => {
    it("removes stored data", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      const { clearRecentCalculators, getRecentCalculators } = await load();
      clearRecentCalculators();
      expect(getRecentCalculators()).toEqual([]);
      expect(ls.mock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  describe("storage failure", () => {
    it("addRecentCalculator does not throw on write failure", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { addRecentCalculator } = await load();
      expect(() => addRecentCalculator("bmi")).not.toThrow();
    });

    it("removeRecentCalculator does not throw on write failure", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { removeRecentCalculator } = await load();
      expect(() => removeRecentCalculator("bmi")).not.toThrow();
    });

    it("clearRecentCalculators does not throw on remove failure", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearRecentCalculators } = await load();
      expect(() => clearRecentCalculators()).not.toThrow();
    });

    it("addRecentCalculator does not dispatch event when setItem fails", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { addRecentCalculator } = await load();
      addRecentCalculator("bmi");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("removeRecentCalculator does not dispatch event when setItem fails", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { removeRecentCalculator } = await load();
      removeRecentCalculator("bmi");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("clearRecentCalculators does not dispatch event when removeItem fails", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearRecentCalculators } = await load();
      clearRecentCalculators();
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  describe("events", () => {
    it("dispatches change event after addRecentCalculator", async () => {
      const { addRecentCalculator } = await load();
      addRecentCalculator("bmi");
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("dispatches change event after removeRecentCalculator", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      const { removeRecentCalculator } = await load();
      removeRecentCalculator("bmi");
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("dispatches change event after clearRecentCalculators", async () => {
      const { clearRecentCalculators } = await load();
      clearRecentCalculators();
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });
  });
});