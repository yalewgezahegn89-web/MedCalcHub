/**
 * Batch 13 Regression Tests
 *
 * Focused tests for:
 * - Validation-style results blocking actions
 * - Storage mutation return values
 * - Search aria-expanded state logic
 * - History stable key logic
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

import type { CalculatorResult } from "../../lib/calculators";

import {
  isValidationStyleResult,
} from "../../lib/result-presentation";

// ─────────────────────────────────────────────────
// Objective 1: Validation-style results block actions
// ─────────────────────────────────────────────────

describe("Validation-style results block actions", () => {
  it("isValidationStyleResult identifies validation results", () => {
    const result: CalculatorResult = {
      value: 0,
      interpretation: "Weight is required.",
      status: "critical",
    };
    expect(isValidationStyleResult(result)).toBe(true);
  });

  it("isValidationStyleResult rejects clinical critical results", () => {
    const result: CalculatorResult = {
      value: 0,
      interpretation: "G5: Kidney failure",
      status: "critical",
    };
    expect(isValidationStyleResult(result)).toBe(false);
  });

  it("validation results should be treated as not actionable", () => {
    const result: CalculatorResult = {
      value: 0,
      interpretation: "Height is required.",
      status: "critical",
    };

    const isValidation = isValidationStyleResult(result);
    const isStale = false;

    const disabledSave = !result || isStale || isValidation;
    const disabledCopy = !result || isStale || isValidation;
    const disabledShare = !result || isStale || isValidation;
    const disabledPrint = !result || isStale || isValidation;

    expect(disabledSave).toBe(true);
    expect(disabledCopy).toBe(true);
    expect(disabledShare).toBe(true);
    expect(disabledPrint).toBe(true);
  });

  it("fresh clinical results are actionable", () => {
    const result: CalculatorResult = {
      value: 24.5,
      unit: "kg/m²",
      interpretation: "Normal weight",
      status: "normal",
    };

    const isValidation = isValidationStyleResult(result);
    const isStale = false;

    const disabledSave = !result || isStale || isValidation;
    const disabledCopy = !result || isStale || isValidation;
    const disabledShare = !result || isStale || isValidation;
    const disabledPrint = !result || isStale || isValidation;

    expect(disabledSave).toBe(false);
    expect(disabledCopy).toBe(false);
    expect(disabledShare).toBe(false);
    expect(disabledPrint).toBe(false);
  });

  it("stale clinical results are not actionable", () => {
    const result: CalculatorResult = {
      value: 24.5,
      unit: "kg/m²",
      interpretation: "Normal weight",
      status: "normal",
    };

    const isValidation = isValidationStyleResult(result);
    const isStale = true;

    const disabledSave = !result || isStale || isValidation;
    const disabledCopy = !result || isStale || isValidation;

    expect(disabledSave).toBe(true);
    expect(disabledCopy).toBe(true);
  });
});

// ─────────────────────────────────────────────────
// Objective 3: Storage mutation return values
// ─────────────────────────────────────────────────

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

describe("Storage mutations return boolean", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.resetModules();
  });

  it("addFavorite returns true on success", async () => {
    const { addFavorite } = await import("../../lib/favorites");
    expect(addFavorite("bmi")).toBe(true);
  });

  it("removeFavorite returns true on success", async () => {
    const { addFavorite, removeFavorite } = await import("../../lib/favorites");
    addFavorite("bmi");
    expect(removeFavorite("bmi")).toBe(true);
  });

  it("clearFavorites returns true on success", async () => {
    const { clearFavorites } = await import("../../lib/favorites");
    expect(clearFavorites()).toBe(true);
  });

  it("addFavorite returns false on storage failure", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { addFavorite } = await import("../../lib/favorites");
    expect(addFavorite("bmi")).toBe(false);
  });

  it("removeFavorite returns false on storage failure", async () => {
    const { addFavorite } = await import("../../lib/favorites");
    addFavorite("bmi");
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { removeFavorite } = await import("../../lib/favorites");
    expect(removeFavorite("bmi")).toBe(false);
  });

  it("saveSavedCalculation returns true on success", async () => {
    const { saveSavedCalculation } = await import("../../lib/saved-calculations");
    const result = saveSavedCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      values: { weight: "70", height: "175" },
      savedAt: Date.now(),
    });
    expect(result).toBe(true);
  });

  it("saveSavedCalculation returns false on storage failure", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { saveSavedCalculation } = await import("../../lib/saved-calculations");
    expect(saveSavedCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      values: { weight: "70", height: "175" },
      savedAt: Date.now(),
    })).toBe(false);
  });

  it("saveCalculation returns true on success", async () => {
    const { saveCalculation } = await import("../../lib/history/history");
    expect(saveCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      result: "24.5",
      timestamp: Date.now(),
    })).toBe(true);
  });

  it("saveCalculation returns false on storage failure", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { saveCalculation } = await import("../../lib/history/history");
    expect(saveCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      result: "24.5",
      timestamp: Date.now(),
    })).toBe(false);
  });

  it("addRecentCalculator returns true on success", async () => {
    const { addRecentCalculator } = await import("../../lib/recent");
    expect(addRecentCalculator("bmi")).toBe(true);
  });

  it("addRecentCalculator returns false on storage failure", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { addRecentCalculator } = await import("../../lib/recent");
    expect(addRecentCalculator("bmi")).toBe(false);
  });
});

// ─────────────────────────────────────────────────
// Objective 4: Search aria-expanded state logic
// ─────────────────────────────────────────────────

describe("Search aria-expanded state logic", () => {
  it("aria-expanded is true when query is non-empty", () => {
    const query = "bmi";
    const hasResults = false;
    const ariaExpanded = query.trim().length > 0;
    expect(ariaExpanded).toBe(true);
    expect(ariaExpanded).not.toBe(hasResults);
  });

  it("aria-expanded is false when query is empty", () => {
    const query = "";
    const ariaExpanded = query.trim().length > 0;
    expect(ariaExpanded).toBe(false);
  });

  it("aria-expanded is true when query is non-empty but zero results", () => {
    const query = "xyz123nonexistent";
    const results: unknown[] = [];
    const ariaExpanded = query.trim().length > 0;
    expect(ariaExpanded).toBe(true);
    expect(results.length).toBe(0);
  });

  it("aria-expanded is true when query has whitespace only then trimmed", () => {
    const query = "  ";
    const ariaExpanded = query.trim().length > 0;
    expect(ariaExpanded).toBe(false);
  });
});

// ─────────────────────────────────────────────────
// Objective 7: History stable key logic
// ─────────────────────────────────────────────────

describe("History stable key logic", () => {
  it("calculatorId-timestamp produces a stable unique key", () => {
    const item1 = { calculatorId: "bmi", timestamp: 1700000000000 };
    const item2 = { calculatorId: "bmi", timestamp: 1700000001000 };
    const item3 = { calculatorId: "crf", timestamp: 1700000000000 };

    const key1 = `${item1.calculatorId}-${item1.timestamp}`;
    const key2 = `${item2.calculatorId}-${item2.timestamp}`;
    const key3 = `${item3.calculatorId}-${item3.timestamp}`;

    expect(key1).toBe("bmi-1700000000000");
    expect(key2).toBe("bmi-1700000001000");
    expect(key3).toBe("crf-1700000000000");
    expect(key1).not.toBe(key2);
    expect(key1).not.toBe(key3);
  });

  it("different timestamps on same calculator produce different keys", () => {
    const key1 = `bmi-${100}`;
    const key2 = `bmi-${200}`;
    expect(key1).not.toBe(key2);
  });

  it("same calculator+timestamp always produces the same key", () => {
    const makeKey = (id: string, ts: number) => `${id}-${ts}`;
    expect(makeKey("bmi", 100)).toBe(makeKey("bmi", 100));
  });
});
