import { describe, it, expect, beforeEach, vi } from "vitest";
import type { CalculatorResult } from "../../lib/calculators";

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

const STORAGE_KEY = "medcalchub-saved-calculations";
const CHANGE_EVENT = "medcalchub-saved-calculations-changed";

type SavedCalculation = {
  id: string;
  calculatorId: string;
  calculatorName: string;
  values: Record<string, string>;
  result?: CalculatorResult;
  savedAt: number;
};

function makeItem(overrides: Partial<SavedCalculation> = {}): Omit<SavedCalculation, "id"> {
  return {
    calculatorId: "bmi",
    calculatorName: "BMI",
    values: { weight: "70", height: "175" },
    result: { value: 22.86, unit: "kg/m²", interpretation: "Normal weight", status: "normal" },
    savedAt: Date.now(),
    ...overrides,
  };
}

describe("saved-calculations", () => {
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
    return import("../../lib/saved-calculations");
  }

  // -------------------------------------------------------
  // getSavedCalculations
  // -------------------------------------------------------

  describe("getSavedCalculations", () => {
    it("returns [] during SSR", async () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;
      const { getSavedCalculations } = await load();
      expect(getSavedCalculations()).toEqual([]);
    });

    it("returns [] when storage is empty", async () => {
      const { getSavedCalculations } = await load();
      expect(getSavedCalculations()).toEqual([]);
    });

    it("returns valid stored data", async () => {
      const items = [{ ...makeItem(), id: "abc-123" }];
      ls.store.set(STORAGE_KEY, JSON.stringify(items));
      const { getSavedCalculations } = await load();
      expect(getSavedCalculations()).toEqual(items);
    });

    it("returns [] for malformed JSON", async () => {
      ls.store.set(STORAGE_KEY, "not-json");
      const { getSavedCalculations } = await load();
      expect(getSavedCalculations()).toEqual([]);
    });
  });

  // -------------------------------------------------------
  // getSavedCalculation
  // -------------------------------------------------------

  describe("getSavedCalculation", () => {
    it("returns undefined for unknown id", async () => {
      const { getSavedCalculation } = await load();
      expect(getSavedCalculation("unknown")).toBeUndefined();
    });

    it("returns the matching item by id", async () => {
      const item = { ...makeItem(), id: "abc-123" };
      ls.store.set(STORAGE_KEY, JSON.stringify([item]));
      const { getSavedCalculation } = await load();
      expect(getSavedCalculation("abc-123")).toEqual(item);
    });
  });

  // -------------------------------------------------------
  // saveSavedCalculation
  // -------------------------------------------------------

  describe("saveSavedCalculation", () => {
    it("stores an entry with a generated id", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem());
      const items = getSavedCalculations();
      expect(items).toHaveLength(1);
      expect(items[0].id).toBeTruthy();
      expect(items[0].calculatorId).toBe("bmi");
    });

    it("newest item is first", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ calculatorId: "bmi", savedAt: 1 }));
      saveSavedCalculation(makeItem({ calculatorId: "crf", savedAt: 2 }));
      const items = getSavedCalculations();
      expect(items[0].calculatorId).toBe("crf");
      expect(items[1].calculatorId).toBe("bmi");
    });

    it("generated IDs are unique", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem());
      saveSavedCalculation(makeItem());
      const items = getSavedCalculations();
      expect(items[0].id).not.toBe(items[1].id);
    });

    it("calculatorId is preserved", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ calculatorId: "ckd-epi-2021" }));
      expect(getSavedCalculations()[0].calculatorId).toBe("ckd-epi-2021");
    });

    it("calculatorName is preserved", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ calculatorName: "CKD-EPI 2021" }));
      expect(getSavedCalculations()[0].calculatorName).toBe("CKD-EPI 2021");
    });

    it("values are preserved", async () => {
      const values = { weight: "80", height: "180", age: "45" };
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ values }));
      expect(getSavedCalculations()[0].values).toEqual(values);
    });

    it("result is preserved", async () => {
      const result: CalculatorResult = { value: 24.69, unit: "kg/m²", interpretation: "Normal", status: "normal" };
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ result }));
      expect(getSavedCalculations()[0].result).toEqual(result);
    });

    it("savedAt is preserved", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ savedAt: 1700000000000 }));
      expect(getSavedCalculations()[0].savedAt).toBe(1700000000000);
    });

    it("does NOT merge duplicate snapshots", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ calculatorId: "bmi", values: { weight: "70", height: "175" } }));
      saveSavedCalculation(makeItem({ calculatorId: "bmi", values: { weight: "70", height: "175" } }));
      expect(getSavedCalculations()).toHaveLength(2);
    });

    it("caps at 50 entries", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      for (let i = 0; i < 55; i++) {
        saveSavedCalculation(makeItem({ calculatorId: `calc-${i}`, savedAt: i }));
      }
      expect(getSavedCalculations()).toHaveLength(50);
    });

    it("dispatches the custom change event", async () => {
      const { saveSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });
  });

  // -------------------------------------------------------
  // deleteSavedCalculation
  // -------------------------------------------------------

  describe("deleteSavedCalculation", () => {
    it("deletes an entry by id", async () => {
      const { saveSavedCalculation, deleteSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ calculatorId: "bmi", savedAt: 1 }));
      const items = getSavedCalculations();
      deleteSavedCalculation(items[0].id);
      expect(getSavedCalculations()).toHaveLength(0);
    });

    it("unknown ID is a safe no-op", async () => {
      const { saveSavedCalculation, deleteSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem());
      deleteSavedCalculation("nonexistent-id");
      expect(getSavedCalculations()).toHaveLength(1);
    });

    it("dispatches event after deletion", async () => {
      const { saveSavedCalculation, deleteSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      const items = (await load()).getSavedCalculations();
      dispatchEventSpy.mockClear();
      deleteSavedCalculation(items[0].id);
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });

    it("does not dispatch event for no-op deletion", async () => {
      const { saveSavedCalculation, deleteSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      dispatchEventSpy.mockClear();
      deleteSavedCalculation("nonexistent-id");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // clearSavedCalculations
  // -------------------------------------------------------

  describe("clearSavedCalculations", () => {
    it("clears all saved calculations", async () => {
      ls.store.set(STORAGE_KEY, JSON.stringify([{ ...makeItem(), id: "abc" }]));
      const { clearSavedCalculations, getSavedCalculations } = await load();
      clearSavedCalculations();
      expect(getSavedCalculations()).toEqual([]);
      expect(ls.mock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it("is safe when storage is empty", async () => {
      const { clearSavedCalculations } = await load();
      expect(() => clearSavedCalculations()).not.toThrow();
    });

    it("dispatches event after clear", async () => {
      const { clearSavedCalculations } = await load();
      clearSavedCalculations();
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: CHANGE_EVENT }),
      );
    });
  });

  // -------------------------------------------------------
  // storage failure
  // -------------------------------------------------------

  describe("storage failure", () => {
    it("saveSavedCalculation does not throw on write failure", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { saveSavedCalculation } = await load();
      expect(() => saveSavedCalculation(makeItem())).not.toThrow();
    });

    it("saveSavedCalculation does not dispatch event when setItem fails", async () => {
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { saveSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("deleteSavedCalculation does not throw on write failure", async () => {
      const { saveSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { deleteSavedCalculation } = await load();
      expect(() => deleteSavedCalculation("any-id")).not.toThrow();
    });

    it("deleteSavedCalculation does not dispatch event when setItem fails", async () => {
      const { saveSavedCalculation } = await load();
      saveSavedCalculation(makeItem());
      dispatchEventSpy.mockClear();
      ls.mock.setItem.mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
      const { deleteSavedCalculation } = await load();
      deleteSavedCalculation("any-id");
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });

    it("clearSavedCalculations does not throw on remove failure", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearSavedCalculations } = await load();
      expect(() => clearSavedCalculations()).not.toThrow();
    });

    it("clearSavedCalculations does not dispatch event when removeItem fails", async () => {
      ls.mock.removeItem.mockImplementation(() => {
        throw new DOMException("Storage error", "NotFoundError");
      });
      const { clearSavedCalculations } = await load();
      clearSavedCalculations();
      expect(dispatchEventSpy).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // serialization
  // -------------------------------------------------------

  describe("serialization", () => {
    it("saved result survives serialization/deserialization", async () => {
      const result = {
        value: 24.69,
        unit: "kg/m²",
        score: 24.69,
        interpretation: "Normal weight",
        status: "normal" as const,
        advice: ["Maintain current weight"],
        warnings: [] as string[],
        followUp: ["Recheck in 6 months"],
      };
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ result }));
      const items = getSavedCalculations();
      expect(items[0].result).toEqual(result);
    });

    it("undefined result fields round-trip safely", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ result: undefined }));
      const items = getSavedCalculations();
      expect(items[0].result).toBeUndefined();
    });

    it("empty values object round-trips safely", async () => {
      const { saveSavedCalculation, getSavedCalculations } = await load();
      saveSavedCalculation(makeItem({ values: {} }));
      expect(getSavedCalculations()[0].values).toEqual({});
    });
  });
});
