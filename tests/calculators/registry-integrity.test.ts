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

  it("registry contains exactly 49 calculators", () => {
    expect(calculatorRegistry).toHaveLength(49);
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

  it("searchCalculators returns empty array for nonsense query", () => {
    const results = searchCalculators(
      "xyzzy_nonexistent_12345",
    );
    expect(results).toHaveLength(0);
  });
});