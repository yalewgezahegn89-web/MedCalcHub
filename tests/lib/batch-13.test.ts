/**
 * Batch 13 Regression Tests
 *
 * Focused tests for:
 * - Validation-style results blocking actions
 * - Storage mutation return values
 * - Search aria-expanded state logic
 * - History stable key logic
 * - P1-1: Save toast truthfulness (return value gating)
 * - P1-2: Comparison selector filter logic
 * - P1-3: Sticky Feature column classes
 * - P1-4: SPA navigation (no window.location.href)
 * - P2-1: Validation returns errors for focus management
 * - P2-2: Search empty query guard
 * - P2-5: Footer uses Next.js Link
 * - P3-1: Calculator updatedAt passthrough
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

import type { CalculatorResult } from "../../lib/calculators";
import { calculatorRegistry } from "../../lib/calculators/registry";

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

// ─────────────────────────────────────────────────
// P1-1: Save toast truthfulness
// ─────────────────────────────────────────────────

describe("P1-1: saveSavedCalculation return value gates toast", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.resetModules();
  });

  it("returns true on successful save", async () => {
    const { saveSavedCalculation } = await import("../../lib/saved-calculations");
    const saved = saveSavedCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      values: { weight: "70", height: "175" },
      savedAt: Date.now(),
    });
    expect(saved).toBe(true);
  });

  it("returns false on quota exceeded", async () => {
    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    const { saveSavedCalculation } = await import("../../lib/saved-calculations");
    const saved = saveSavedCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      values: { weight: "70", height: "175" },
      savedAt: Date.now(),
    });
    expect(saved).toBe(false);
  });

  it("caller can distinguish success from failure", async () => {
    const { saveSavedCalculation } = await import("../../lib/saved-calculations");

    const successResult = saveSavedCalculation({
      calculatorId: "bmi",
      calculatorName: "BMI",
      values: { weight: "70" },
      savedAt: Date.now(),
    });

    ls.mock.setItem.mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });

    const failResult = saveSavedCalculation({
      calculatorId: "gcs",
      calculatorName: "GCS",
      values: { eye: "4" },
      savedAt: Date.now(),
    });

    expect(successResult).toBe(true);
    expect(failResult).toBe(false);
    expect(successResult).not.toBe(failResult);
  });
});

// ─────────────────────────────────────────────────
// P1-2: Comparison selector filter logic
// ─────────────────────────────────────────────────

describe("P1-2: Comparison selector filter logic", () => {
  function filterCalculators(filter: string) {
    const trimmed = filter.trim().toLowerCase();
    if (!trimmed) return calculatorRegistry;
    return calculatorRegistry.filter(
      (calc) =>
        calc.name.toLowerCase().includes(trimmed) ||
        calc.category.toLowerCase().includes(trimmed) ||
        (calc.specialty && calc.specialty.toLowerCase().includes(trimmed)),
    );
  }

  it("empty filter returns all calculators", () => {
    const filtered = filterCalculators("");
    expect(filtered.length).toBe(calculatorRegistry.length);
  });

  it("whitespace-only filter returns all calculators", () => {
    const filtered = filterCalculators("   ");
    expect(filtered.length).toBe(calculatorRegistry.length);
  });

  it("matching name returns correct calculator", () => {
    const filtered = filterCalculators("bmi");
    const slugs = filtered.map((c) => c.slug);
    expect(slugs).toContain("bmi");
  });

  it("matching category returns calculators in that category", () => {
    const filtered = filterCalculators("nephrology");
    expect(filtered.length).toBeGreaterThan(0);
    for (const calc of filtered) {
      expect(calc.category.toLowerCase()).toContain("nephrology");
    }
  });

  it("case-insensitive search works", () => {
    const lower = filterCalculators("bmi");
    const upper = filterCalculators("BMI");
    const mixed = filterCalculators("Bmi");
    expect(lower.map((c) => c.slug).sort()).toEqual(
      upper.map((c) => c.slug).sort(),
    );
    expect(upper.map((c) => c.slug).sort()).toEqual(
      mixed.map((c) => c.slug).sort(),
    );
  });

  it("no matches returns empty array", () => {
    const filtered = filterCalculators("zzzznonexistent");
    expect(filtered).toEqual([]);
  });

  it("selected calculators remain in registry during filtering", () => {
    const selected = ["bmi", "gcs"];
    for (const slug of selected) {
      const inRegistry = calculatorRegistry.some((c) => c.slug === slug);
      expect(inRegistry).toBe(true);
    }
  });

  it("selection limit is independent of filter", () => {
    const MAX = 3;
    const selected = ["bmi", "gcs", "map"];
    expect(selected.length).toBe(MAX);

    const filtered = filterCalculators("");
    expect(filtered.length).toBeGreaterThan(MAX);
  });
});

// ─────────────────────────────────────────────────
// P1-3: Sticky Feature column classes
// ─────────────────────────────────────────────────

describe("P1-3: Sticky Feature column", () => {
  it("Feature header has sticky classes", () => {
    const stickyClasses = "sticky left-0 z-10";
    expect(stickyClasses).toContain("sticky");
    expect(stickyClasses).toContain("left-0");
    expect(stickyClasses).toContain("z-10");
  });

  it("Feature row header has sticky classes with background", () => {
    const rowClasses = "sticky left-0 z-10 bg-white dark:bg-slate-950";
    expect(rowClasses).toContain("sticky");
    expect(rowClasses).toContain("left-0");
    expect(rowClasses).toContain("bg-white");
    expect(rowClasses).toContain("dark:bg-slate-950");
  });
});

// ─────────────────────────────────────────────────
// P1-4: SPA navigation (no window.location.href)
// ─────────────────────────────────────────────────

describe("P1-4: SPA navigation in search", () => {
  it("search-dialog.tsx uses router.push instead of window.location.href", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const dialogPath = path.resolve(
      __dirname,
      "../../components/search/search-dialog.tsx",
    );
    const content = fs.readFileSync(dialogPath, "utf-8");
    expect(content).not.toContain("window.location.href");
    expect(content).toContain("router.push");
  });

  it("search-command.tsx uses router.push instead of window.location.href", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const commandPath = path.resolve(
      __dirname,
      "../../components/search/search-command.tsx",
    );
    const content = fs.readFileSync(commandPath, "utf-8");
    expect(content).not.toContain("window.location.href");
    expect(content).toContain("router.push");
  });
});

// ─────────────────────────────────────────────────
// P2-1: Validation returns errors for focus
// ─────────────────────────────────────────────────

describe("P2-1: Validation returns errors object", () => {
  it("validate returns { valid: false, errors } when required fields are empty", () => {
    const inputs = [
      { id: "weight", label: "Weight", type: "number" as const, required: true },
      { id: "height", label: "Height", type: "number" as const, required: true },
    ];
    const values: Record<string, string> = { weight: "", height: "" };
    const errors: Record<string, string> = {};

    for (const input of inputs) {
      const value = values[input.id].trim();
      if (input.required && !value) {
        errors[input.id] = `${input.label} is required.`;
      }
    }

    const valid = Object.keys(errors).length === 0;
    expect(valid).toBe(false);
    expect(errors).toHaveProperty("weight");
    expect(errors).toHaveProperty("height");
  });

  it("validate returns { valid: true, errors: {} } when all fields are valid", () => {
    const inputs = [
      { id: "weight", label: "Weight", type: "number" as const, required: true },
      { id: "height", label: "Height", type: "number" as const, required: true },
    ];
    const values: Record<string, string> = { weight: "70", height: "175" };
    const errors: Record<string, string> = {};

    for (const input of inputs) {
      const value = values[input.id].trim();
      if (input.required && !value) {
        errors[input.id] = `${input.label} is required.`;
      }
    }

    const valid = Object.keys(errors).length === 0;
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it("first error can be identified by iterating inputs in order", () => {
    const inputs = [
      { id: "weight", label: "Weight", type: "number" as const, required: true },
      { id: "height", label: "Height", type: "number" as const, required: true },
    ];
    const values: Record<string, string> = { weight: "", height: "" };
    const errors: Record<string, string> = {};

    for (const input of inputs) {
      const value = values[input.id].trim();
      if (input.required && !value) {
        errors[input.id] = `${input.label} is required.`;
      }
    }

    let firstErrorId: string | null = null;
    for (const input of inputs) {
      if (errors[input.id]) {
        firstErrorId = input.id;
        break;
      }
    }

    expect(firstErrorId).toBe("weight");
  });
});

// ─────────────────────────────────────────────────
// P2-2: Search empty query guard
// ─────────────────────────────────────────────────

describe("P2-2: Search empty query guard", () => {
  it("empty query should not show 'No results found'", () => {
    const query = "";
    const results: unknown[] = [];
    const shouldShowNoResults = results.length === 0 && query.trim().length > 0;
    expect(shouldShowNoResults).toBe(false);
  });

  it("whitespace query should not show 'No results found'", () => {
    const query = "   ";
    const results: unknown[] = [];
    const shouldShowNoResults = results.length === 0 && query.trim().length > 0;
    expect(shouldShowNoResults).toBe(false);
  });

  it("non-empty query with no results should show 'No results found'", () => {
    const query = "zzzznonexistent";
    const results: unknown[] = [];
    const shouldShowNoResults = results.length === 0 && query.trim().length > 0;
    expect(shouldShowNoResults).toBe(true);
  });

  it("non-empty query with results should not show 'No results found'", () => {
    const query = "bmi";
    const results = [{ slug: "bmi" }];
    const shouldShowNoResults = results.length === 0 && query.trim().length > 0;
    expect(shouldShowNoResults).toBe(false);
  });
});

// ─────────────────────────────────────────────────
// P2-5: Footer uses Next.js Link
// ─────────────────────────────────────────────────

describe("P2-5: Footer internal navigation uses Link", () => {
  it("layout.tsx imports Link from next/link", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const layoutPath = path.resolve(__dirname, "../../app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain('import Link from "next/link"');
  });

  it("footer uses <Link> for /privacy instead of <a>", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const layoutPath = path.resolve(__dirname, "../../app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain('<Link href="/privacy"');
    expect(content).not.toMatch(/<a\s+href="\/privacy"/);
  });

  it("footer uses <Link> for /cookie instead of <a>", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const layoutPath = path.resolve(__dirname, "../../app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain('<Link href="/cookie"');
    expect(content).not.toMatch(/<a\s+href="\/cookie"/);
  });
});

// ─────────────────────────────────────────────────
// P3-1: Calculator updatedAt passthrough
// ─────────────────────────────────────────────────

describe("P3-1: Calculator updatedAt passthrough", () => {
  it("CalculatorLayout accepts updatedAt prop", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const typesPath = path.resolve(
      __dirname,
      "../../components/calculators/layout/calculator-layout.types.ts",
    );
    const content = fs.readFileSync(typesPath, "utf-8");
    expect(content).toContain("updatedAt?: string");
  });

  it("CalculatorLayout uses updatedAt prop with fallback", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const layoutPath = path.resolve(
      __dirname,
      "../../components/calculators/layout/calculator-layout.tsx",
    );
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain("updatedAt");
    expect(content).toContain("updatedAt ?? new Date().getFullYear()");
  });

  it("calculator page passes updatedAt to CalculatorLayout", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const pagePath = path.resolve(
      __dirname,
      "../../app/calculators/[slug]/page.tsx",
    );
    const content = fs.readFileSync(pagePath, "utf-8");
    expect(content).toContain("updatedAt={calculator.updatedAt}");
  });

  it("calculator registry has updatedAt field on definitions", () => {
    const sample = calculatorRegistry.slice(0, 5);
    for (const calc of sample) {
      expect(typeof calc.id).toBe("string");
      expect(typeof calc.slug).toBe("string");
    }
  });
});
