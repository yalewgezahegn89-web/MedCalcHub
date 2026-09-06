/**
 * Batch 2D — Legacy Artifact Cleanup Tests
 *
 * After removing the unregistered legacy duplicate `thyroid-dose` calculator
 * and replacing placeholder references on registered calculators:
 *   - Verifies the dead `lib/calculators/thyroid-dose.ts` file is absent
 *   - Verifies no registered calculator retains the placeholder reference
 *   - Verifies the registry stays at 143 calculators with unique ids/slugs
 *   - Spot-checks that calculations for touched areas are unchanged
 */

import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { levothyroxineDoseCalculator } from "../../lib/calculators/levothyroxine-dose";
import { magnesiumSulfatePreeclampsiaCalculator } from "../../lib/calculators/magnesium-sulfate-preeclampsia";
import {
  calculatorRegistry,
  getCalculatorById,
} from "../../lib/calculators/registry";

const PLACEHOLDER = "MedCalcHub Clinical References";

function collectText(calculator: {
  description?: string;
  formula?: string;
  normalRange?: string;
  clinicalNotes?: string;
  references?: string[];
  referenceRanges?: { label?: string; range?: string; context?: string }[];
  name?: string;
}) {
  return [
    calculator.name,
    calculator.description,
    calculator.formula,
    calculator.normalRange,
    calculator.clinicalNotes,
    ...(calculator.referenceRanges ?? []).flatMap((r) => [
      r.label,
      r.range,
      r.context,
    ]),
    ...(calculator.references ?? []),
  ]
    .filter((x): x is string => typeof x === "string")
    .join(" ");
}

describe("Batch 2D — legacy thyroid-dose artifact removal", () => {
  it("lib/calculators/thyroid-dose.ts is absent after cleanup", () => {
    const file = resolve(
      process.cwd(),
      "lib/calculators/thyroid-dose.ts",
    );
    expect(existsSync(file)).toBe(false);
  });

  it("the thyroid-dose slug is not present in the registry", () => {
    const slugs = new Set(calculatorRegistry.map((c) => c.slug));
    expect(slugs.has("thyroid-dose")).toBe(false);
  });

  it("levothyroxine-dose is the registered thyroid replacement calculator", () => {
    expect(getCalculatorById("levothyroxine-dose")).toBe(
      levothyroxineDoseCalculator,
    );
  });
});

describe("Batch 2D — no placeholder text in registered calculators", () => {
  it("no registered calculator contains the placeholder reference", () => {
    const offenders = calculatorRegistry
      .filter((c) => collectText(c).includes(PLACEHOLDER))
      .map((c) => c.slug);
    expect(offenders).toEqual([]);
  });
});

describe("Batch 2D — registry integrity is preserved", () => {
  it("registry still contains exactly 143 calculators", () => {
    expect(calculatorRegistry.length).toBe(143);
  });

  it("all calculator ids are unique", () => {
    const ids = calculatorRegistry.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all calculator slugs are unique", () => {
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("Batch 2D — calculation behavior is unchanged", () => {
  it("levothyroxine-dose still yields 1.6 * weight for 70 kg", () => {
    const result =
      levothyroxineDoseCalculator.calculate({ weight: "70" });
    expect(result.value).toBe(112);
    expect(result.status).toBe("normal");
  });

  it("magnesium-sulfate-preeclampsia still yields 4g load + 2 g/h = 52 g", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "2",
    });
    expect(result.value).toBe(52);
    expect(result.status).toBe("normal");
  });
});