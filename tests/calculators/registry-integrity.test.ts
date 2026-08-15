/**
 * Registry Integrity Tests
 *
 * Replaces the previous placeholder test.
 * Verifies structural integrity of the calculator registry.
 */

import { describe, it, expect } from "vitest";
import {
  calculatorRegistry,
  getCalculatorById,
  getCalculatorsByCategory,
  getFeaturedCalculators,
  searchCalculators,
} from "../../lib/calculators/registry";

describe("Calculator Registry Integrity", () => {
  it("registry is non-empty", () => {
    expect(calculatorRegistry.length).toBeGreaterThan(0);
  });

  it("registry contains exactly 81 calculators", () => {
    expect(calculatorRegistry).toHaveLength(81);
  });

  it("the 14 Reliability Batch 5 calculators are registered and searchable", () => {
    const batch5Ids = [
      "a-a-gradient",
      "apri",
      "edd",
      "fib-4",
      "gestational-age",
      "glasgow-blatchford",
      "maddrey",
      "meld",
      "meld-na",
      "nafld-fibrosis",
      "oxygen-index",
      "pf-ratio",
      "rockall",
      "rox-index",
    ];
    const slugs = new Set(calculatorRegistry.map((c) => c.slug));
    for (const id of batch5Ids) {
      const calc = getCalculatorById(id);
      expect(calc, `batch-5 calculator "${id}" must resolve`).toBeDefined();
      expect(slugs.has(calc!.slug)).toBe(true);
      expect(searchCalculators(calc!.name).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every calculator has a unique id", () => {
    const ids = calculatorRegistry.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every calculator has a unique slug", () => {
    const slugs = calculatorRegistry.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("every calculator has a unique name", () => {
    const names = calculatorRegistry.map((c) => c.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("every calculator has required fields", () => {
    for (const calc of calculatorRegistry) {
      expect(calc.id).toBeTruthy();
      expect(typeof calc.id).toBe("string");
      expect(calc.slug).toBeTruthy();
      expect(typeof calc.slug).toBe("string");
      expect(calc.name).toBeTruthy();
      expect(typeof calc.name).toBe("string");
      expect(calc.description).toBeTruthy();
      expect(typeof calc.description).toBe("string");
      expect(calc.category).toBeTruthy();
      expect(typeof calc.category).toBe("string");
      expect(Array.isArray(calc.inputs)).toBe(true);
      expect(calc.inputs.length).toBeGreaterThan(0);
    }
  });

  it("every calculator has a calculate function", () => {
    for (const calc of calculatorRegistry) {
      expect(typeof calc.calculate).toBe("function");
    }
  });

  it("every calculator input has required fields", () => {
    for (const calc of calculatorRegistry) {
      for (const input of calc.inputs) {
        expect(input.id).toBeTruthy();
        expect(typeof input.id).toBe("string");
        expect(input.label).toBeTruthy();
        expect(["number", "text", "select"]).toContain(input.type);
      }
    }
  });

  it("no duplicate calculator definitions are registered", () => {
    const uniqueObjects = new Set(
      calculatorRegistry.map((c) => c),
    );
    expect(uniqueObjects.size).toBe(
      calculatorRegistry.length,
    );
  });

  it("getCalculatorById returns correct calculator", () => {
    const first = calculatorRegistry[0];
    expect(getCalculatorById(first.id)).toBe(first);
  });

  it("getCalculatorById returns undefined for unknown id", () => {
    expect(
      getCalculatorById("nonexistent-calculator-id"),
    ).toBeUndefined();
  });

  it("getCalculatorsByCategory returns calculators for known category", () => {
    const categories = new Set(
      calculatorRegistry.map((c) => c.category),
    );
    for (const category of categories) {
      const results = getCalculatorsByCategory(category);
      expect(results.length).toBeGreaterThan(0);
      for (const calc of results) {
        expect(calc.category).toBe(category);
      }
    }
  });

  it("getFeaturedCalculators returns array", () => {
    const featured = getFeaturedCalculators();
    expect(Array.isArray(featured)).toBe(true);
    for (const calc of featured) {
      expect(calc.featured).toBe(true);
    }
  });

  it("searchCalculators finds calculators by name", () => {
    const results = searchCalculators("bmi");
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("every calculator has a unique shortName", () => {
    const shortNames = calculatorRegistry.map((c) => c.shortName);
    const uniqueShortNames = new Set(shortNames);
    expect(uniqueShortNames.size).toBe(shortNames.length);
  });

  it("every relatedCalculators reference resolves to a registered calculator", () => {
    const ids = new Set(calculatorRegistry.map((c) => c.id));
    for (const calc of calculatorRegistry) {
      for (const ref of calc.relatedCalculators ?? []) {
        expect(
          ids.has(ref),
          `${calc.id}: relatedCalculators references "${ref}" which is not a registered calculator id`,
        ).toBe(true);
      }
    }
  });

  it("every inline comparison href resolves to a registered calculator slug", () => {
    const slugs = new Set(calculatorRegistry.map((c) => c.slug));
    for (const calc of calculatorRegistry) {
      const comparison = calc.comparison;
      const items = Array.isArray(comparison)
        ? comparison
        : (comparison?.calculators ?? []);
      for (const item of items) {
        const slug = item.href?.replace("/calculators/", "");
        expect(
          slug && slugs.has(slug),
          `${calc.id}: comparison references "${item.href}" which is not a registered calculator slug`,
        ).toBe(true);
      }
    }
  });

  it("every calculator id and slug is reachable from its definition", () => {
    for (const calc of calculatorRegistry) {
      expect(getCalculatorById(calc.id)).toBe(calc);
      const bySlug = calculatorRegistry.find((c) => c.slug === calc.slug);
      expect(bySlug).toBe(calc);
    }
  });

  it("searchCalculators returns empty array for nonsense query", () => {
    const results = searchCalculators(
      "xyzzy_nonexistent_12345",
    );
    expect(results).toHaveLength(0);
  });
});