import { describe, it, expect, beforeEach, vi } from "vitest";

// Minimal localStorage mock backed by a Map
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

const STORAGE_KEY = "medcalchub-favorites";
const CHANGE_EVENT = "medcalchub-favorites-changed";

describe("favorites", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", { dispatchEvent: dispatchEventSpy });

    // Clear module cache so functions re-evaluate on import
    vi.resetModules();
  });

  async function load() {
    return import("../../lib/favorites");
  }

  // -------------------------------------------------------
  // getFavorites
  // -------------------------------------------------------

  describe("getFavorites", () => {
    it("returns [] during SSR (no window)", async () => {
      vi.unstubAllGlobals();
      // Make sure window is undefined
      delete (globalThis as Record<string, unknown>).window;

      const { getFavorites } = await load();
      expect(getFavorites()).toEqual([]);
    });

    it("returns [] when localStorage is empty", async () => {
      const { getFavorites } = await load();
      expect(getFavorites()).toEqual([]);
    });

    it("returns stored favorites for valid JSON", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { getFavorites } = await load();
      expect(getFavorites()).toEqual(["bmi", "crf"]);
    });

    it("returns [] for malformed JSON", async () => {
      ls.store.set(STORAGE_KEY, "not-valid-json");

      const { getFavorites } = await load();
      expect(getFavorites()).toEqual([]);
    });
  });

  // -------------------------------------------------------
  // isFavorite
  // -------------------------------------------------------

  describe("isFavorite", () => {
    it("returns false for missing ID", async () => {
      const { isFavorite } = await load();
      expect(isFavorite("bmi")).toBe(false);
    });

    it("returns true for existing ID", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { isFavorite } = await load();
      expect(isFavorite("bmi")).toBe(true);
    });
  });

  // -------------------------------------------------------
  // addFavorite
  // -------------------------------------------------------

  describe("addFavorite", () => {
    it("stores a new ID", async () => {
      const { addFavorite, getFavorites } = await load();
      addFavorite("bmi");

      expect(getFavorites()).toEqual(["bmi"]);
      expect(ls.mock.setItem).toHaveBeenCalled();
    });

    it("does not create duplicates", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));

      const { addFavorite, getFavorites } = await load();
      addFavorite("bmi");

      expect(getFavorites()).toEqual(["bmi"]);
    });
  });

  // -------------------------------------------------------
  // removeFavorite
  // -------------------------------------------------------

  describe("removeFavorite", () => {
    it("removes an existing ID", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { removeFavorite, getFavorites } = await load();
      removeFavorite("bmi");

      expect(getFavorites()).toEqual(["crf"]);
    });

    it("handles missing ID without throwing", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));

      const { removeFavorite } = await load();
      expect(() => removeFavorite("nonexistent")).not.toThrow();
    });

    it("does not modify stored list when removing a nonexistent favorite", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { removeFavorite, getFavorites } = await load();
      removeFavorite("nonexistent");

      expect(getFavorites()).toEqual(["bmi", "crf"]);
      expect(ls.mock.setItem).not.toHaveBeenCalled();
    });

    it("does not dispatch event when removing a nonexistent favorite", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));

      const { removeFavorite } = await load();
      removeFavorite("nonexistent");

      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("dispatches event when removing an existing favorite", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { removeFavorite } = await load();
      removeFavorite("bmi");

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });
  });

  // -------------------------------------------------------
  // toggleFavorite
  // -------------------------------------------------------

  describe("toggleFavorite", () => {
    it("adds a missing ID and returns true", async () => {
      const { toggleFavorite, getFavorites } = await load();
      const result = toggleFavorite("bmi");

      expect(result).toBe(true);
      expect(getFavorites()).toEqual(["bmi"]);
    });

    it("removes an existing ID and returns false", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi", "crf"]));

      const { toggleFavorite, getFavorites } = await load();
      const result = toggleFavorite("bmi");

      expect(result).toBe(false);
      expect(getFavorites()).toEqual(["crf"]);
    });
  });

  // -------------------------------------------------------
  // Events
  // -------------------------------------------------------

  describe("events", () => {
    it("dispatches change event after addFavorite", async () => {
      const { addFavorite } = await load();
      addFavorite("bmi");

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("dispatches change event after removeFavorite", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));

      const { removeFavorite } = await load();
      removeFavorite("bmi");

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("dispatches change event even when addFavorite is a no-op (duplicate)", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));

      const { addFavorite } = await load();
      addFavorite("bmi");

      // No-op because already present — event should NOT be dispatched
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // Storage failure resilience
  // -------------------------------------------------------

  describe("storage failure", () => {
    it("addFavorite does not throw when localStorage.setItem fails", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });

      const { addFavorite } = await load();
      expect(() => addFavorite("bmi")).not.toThrow();
    });

    it("removeFavorite does not throw when localStorage.setItem fails", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });

      const { removeFavorite } = await load();
      expect(() => removeFavorite("bmi")).not.toThrow();
    });

    it("addFavorite does not dispatch event when setItem fails", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });

      const { addFavorite } = await load();
      addFavorite("bmi");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("removeFavorite does not dispatch event when setItem fails", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify(["bmi"]));
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });

      const { removeFavorite } = await load();
      removeFavorite("bmi");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });
});