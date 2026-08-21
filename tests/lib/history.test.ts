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

const STORAGE_KEY = "medcalchub-history";
const CHANGE_EVENT = "medcalchub-history-changed";

type HistoryItem = {
  calculatorId: string;
  calculatorName: string;
  result: string;
  timestamp: number;
};

function makeItem(overrides: Partial<HistoryItem> = {}): HistoryItem {
  return {
    calculatorId: "bmi",
    calculatorName: "BMI",
    result: "24.9",
    timestamp: Date.now(),
    ...overrides,
  };
}

describe("history", () => {
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
    return import("../../lib/history/history");
  }

  // -------------------------------------------------------
  // getCalculationHistory
  // -------------------------------------------------------

  describe("getCalculationHistory", () => {
    it("returns [] during SSR", async () => {
      const savedWindow = globalThis.window;
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      try {
        const { getCalculationHistory } = await load();
        expect(getCalculationHistory()).toEqual([]);
      } finally {
        globalThis.window = savedWindow;
      }
    });

    it("returns [] when storage is empty", async () => {
      const { getCalculationHistory } = await load();
      expect(getCalculationHistory()).toEqual([]);
    });

    it("returns valid stored history", async () => {
      const items = [makeItem({ calculatorId: "bmi" })];
      ls.store.set(STORAGE_KEY, JSON.stringify(items));
      const { getCalculationHistory } = await load();
      expect(getCalculationHistory()).toEqual(items);
    });

    it("returns [] for malformed JSON", async () => {
      ls.store.set(STORAGE_KEY, "not-json");
      const { getCalculationHistory } = await load();
      expect(getCalculationHistory()).toEqual([]);
    });
  });

  // -------------------------------------------------------
  // saveCalculation
  // -------------------------------------------------------

  describe("saveCalculation", () => {
    it("stores an item", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      const item = makeItem();
      saveCalculation(item);
      const history = getCalculationHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(item);
    });

    it("newest item is first", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      const first = makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 1 });
      const second = makeItem({ calculatorId: "crf", result: "90", timestamp: 2 });
      saveCalculation(first);
      saveCalculation(second);
      const history = getCalculationHistory();
      expect(history[0].calculatorId).toBe("crf");
      expect(history[1].calculatorId).toBe("bmi");
    });

    it("caps at 50 entries", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      for (let i = 0; i < 55; i++) {
        saveCalculation(makeItem({ calculatorId: `calc-${i}`, result: `${i}`, timestamp: i }));
      }
      const history = getCalculationHistory();
      expect(history).toHaveLength(50);
      // Most recent (highest timestamp) should be first
      expect(history[0].timestamp).toBe(54);
    });

    it("deduplicates by calculatorId + result", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 2 }));
      const history = getCalculationHistory();
      expect(history).toHaveLength(1);
      // The second save should be the one kept (most recent)
      expect(history[0].timestamp).toBe(2);
    });

    it("preserves entries with same calculator but different results", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "bmi", result: "28.3", timestamp: 2 }));
      const history = getCalculationHistory();
      expect(history).toHaveLength(2);
      expect(history[0].result).toBe("28.3");
      expect(history[1].result).toBe("24.9");
    });

    it("preserves entries with same result but different calculators", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "bsa", result: "24.9", timestamp: 2 }));
      const history = getCalculationHistory();
      expect(history).toHaveLength(2);
    });

    it("multiple saves preserve expected order", async () => {
      const { saveCalculation, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "a", result: "1", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "b", result: "2", timestamp: 2 }));
      saveCalculation(makeItem({ calculatorId: "c", result: "3", timestamp: 3 }));
      const history = getCalculationHistory();
      expect(history.map((h) => h.calculatorId)).toEqual(["c", "b", "a"]);
    });
  });

  // -------------------------------------------------------
  // deleteHistoryEntry
  // -------------------------------------------------------

  describe("deleteHistoryEntry", () => {
    it("deletes one history entry by index", async () => {
      const { saveCalculation, deleteHistoryEntry, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "bmi", result: "24.9", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "crf", result: "90", timestamp: 2 }));

      deleteHistoryEntry(0);

      const history = getCalculationHistory();
      expect(history).toHaveLength(1);
      expect(history[0].calculatorId).toBe("bmi");
    });

    it("is a safe no-op for negative index", async () => {
      const { saveCalculation, deleteHistoryEntry, getCalculationHistory } = await load();
      saveCalculation(makeItem());

      deleteHistoryEntry(-1);

      expect(getCalculationHistory()).toHaveLength(1);
    });

    it("is a safe no-op for out-of-range index", async () => {
      const { saveCalculation, deleteHistoryEntry, getCalculationHistory } = await load();
      saveCalculation(makeItem());

      deleteHistoryEntry(5);

      expect(getCalculationHistory()).toHaveLength(1);
    });

    it("is a safe no-op on empty history", async () => {
      const { deleteHistoryEntry } = await load();
      expect(() => deleteHistoryEntry(0)).not.toThrow();
    });

    it("preserves order of remaining entries", async () => {
      const { saveCalculation, deleteHistoryEntry, getCalculationHistory } = await load();
      saveCalculation(makeItem({ calculatorId: "a", result: "1", timestamp: 1 }));
      saveCalculation(makeItem({ calculatorId: "b", result: "2", timestamp: 2 }));
      saveCalculation(makeItem({ calculatorId: "c", result: "3", timestamp: 3 }));

      deleteHistoryEntry(1);

      const history = getCalculationHistory();
      expect(history.map((h) => h.calculatorId)).toEqual(["c", "a"]);
    });

    it("dispatches change event after deletion", async () => {
      const { saveCalculation, deleteHistoryEntry } = await load();
      saveCalculation(makeItem());
      dispatchEventSpy.mockClear();

      deleteHistoryEntry(0);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("does not dispatch event for no-op deletion", async () => {
      const { saveCalculation, deleteHistoryEntry } = await load();
      saveCalculation(makeItem());
      dispatchEventSpy.mockClear();

      deleteHistoryEntry(99);

      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // clearHistory
  // -------------------------------------------------------

  describe("clearHistory", () => {
    it("clears stored history", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify([makeItem()]));
      const { clearHistory, getCalculationHistory } = await load();
      clearHistory();
      expect(getCalculationHistory()).toEqual([]);
      expect(ls.mock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it("is safe when storage is empty", async () => {
      const { clearHistory } = await load();
      expect(() => clearHistory()).not.toThrow();
    });
  });

  // -------------------------------------------------------
  // storage failure
  // -------------------------------------------------------

  describe("storage failure", () => {
    it("saveCalculation does not throw on write failure", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { saveCalculation } = await load();
      expect(() => saveCalculation(makeItem())).not.toThrow();
    });

    it("deleteHistoryEntry does not throw on write failure", async () => {
      const { saveCalculation } = await load();
      saveCalculation(makeItem());
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { deleteHistoryEntry } = await load();
      expect(() => deleteHistoryEntry(0)).not.toThrow();
    });

    it("deleteHistoryEntry does not dispatch event when setItem fails", async () => {
      const { saveCalculation } = await load();
      saveCalculation(makeItem());
      dispatchEventSpy.mockClear();
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { deleteHistoryEntry } = await load();
      deleteHistoryEntry(0);
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("clearHistory does not throw on remove failure", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearHistory } = await load();
      expect(() => clearHistory()).not.toThrow();
    });

    it("saveCalculation does not dispatch event when setItem fails", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { saveCalculation } = await load();
      saveCalculation(makeItem());
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("clearHistory does not dispatch event when removeItem fails", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearHistory } = await load();
      clearHistory();
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // events
  // -------------------------------------------------------

  describe("events", () => {
    it("dispatches change event after successful saveCalculation", async () => {
      const { saveCalculation } = await load();
      saveCalculation(makeItem());
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("dispatches change event after successful clearHistory", async () => {
      const { clearHistory } = await load();
      clearHistory();
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });
  });
});