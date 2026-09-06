/**
 * Batch 2C — Medication Calculator Content & Safety Remediation Tests
 *
 * Focused tests for the two medication calculators enriched in Batch 2C:
 *   - levothyroxine-dose
 *   - magnesium-sulfate-preeclampsia
 *
 * Verifies (without broad snapshots):
 *   - Calculation behavior remains unchanged where intended
 *   - Boundary / validation cases
 *   - Interpretation text contains the correct safety distinctions
 *   - High-risk warning language is present
 *   - No placeholder reference text remains
 *   - Registry remains unchanged at 143 calculators
 */

import { describe, it, expect } from "vitest";

import { levothyroxineDoseCalculator } from "../../lib/calculators/levothyroxine-dose";
import { magnesiumSulfatePreeclampsiaCalculator } from "../../lib/calculators/magnesium-sulfate-preeclampsia";
import {
  calculatorRegistry,
  getCalculatorById,
} from "../../lib/calculators/registry";
import type { CalculatorResult } from "../../lib/calculators/calculator.types";

function interpretation(result: CalculatorResult): string {
  return result.interpretation ?? "";
}

const PLACEHOLDER_MARKERS = [
  "MedCalcHub Clinical References",
  "placeholder",
  "TODO",
  "TBD",
  "lorem ipsum",
];

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

describe("Batch 2C — no placeholder reference text remains", () => {
  it("levothyroxine-dose contains no placeholder reference markers", () => {
    const text = collectText(levothyroxineDoseCalculator);
    for (const marker of PLACEHOLDER_MARKERS) {
      expect(
        text.toLowerCase(),
        `found placeholder marker "${marker}"`,
      ).not.toContain(marker.toLowerCase());
    }
  });

  it("magnesium-sulfate-preeclampsia contains no placeholder reference markers", () => {
    const text = collectText(magnesiumSulfatePreeclampsiaCalculator);
    for (const marker of PLACEHOLDER_MARKERS) {
      expect(
        text.toLowerCase(),
        `found placeholder marker "${marker}"`,
      ).not.toContain(marker.toLowerCase());
    }
  });
});

describe("Batch 2C — levothyroxine-dose calculation behavior is preserved", () => {
  it("keeps the 1.6 * weight formula for the standard adult case", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    expect(result.value).toBe(112);
    expect(Math.abs(Number(result.value) - 1.6 * 70)).toBeLessThan(0.01);
  });

  it("preserves the formula string describing 1.6 x weight", () => {
    expect(levothyroxineDoseCalculator.formula).toContain("1.6");
    expect(levothyroxineDoseCalculator.formula).toContain("weight");
  });

  it("still produces the full-replacement estimate for a 70kg adult", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    expect(result.status).toBe("normal");
    expect(String(result.value)).toBe("112");
  });
});

describe("Batch 2C — levothyroxine-dose boundary/validation", () => {
  it("returns critical and no NaN for missing weight", () => {
    const result = levothyroxineDoseCalculator.calculate({});
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it("returns critical and no NaN for non-numeric weight", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "abc" });
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it("returns critical and no NaN for negative weight", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "-70" });
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it("returns critical and no NaN for zero weight", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "0" });
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });
});

describe("Batch 2C — levothyroxine-dose safety content", () => {
  it("interpretation distinguishes estimated full replacement dose from a safe starting dose", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    expect(interpretation(result)).toContain("full replacement");
    expect(interpretation(result).toLowerCase()).toContain("not a safe starting dose");
  });

  it("interpretation warns about older/cardiac patients needing lower doses and slower titration", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    const text = interpretation(result).toLowerCase();
    expect(text).toContain("elderly");
    expect(text).toContain("cardiovascular");
    expect(text).toContain("lower starting dose");
    expect(text).toContain("slower titration");
  });

  it("interpretation requires confirmation by clinical status and TSH/free T4", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    const text = interpretation(result).toLowerCase();
    expect(text).toContain("clinical status");
    expect(text).toContain("tsh");
  });

  it("interpretation notes adrenal insufficiency contraindication and separate pregnancy/cancer management", () => {
    const result = levothyroxineDoseCalculator.calculate({ weight: "70" });
    const text = interpretation(result).toLowerCase();
    expect(text).toContain("adrenal insufficiency");
    expect(text).toContain("pregnancy");
    expect(text).toContain("thyroid-cancer");
  });

  it("clinicalNotes states this is not a universal prescribing dose calculator", () => {
    const notes = (levothyroxineDoseCalculator.clinicalNotes ?? "").toLowerCase();
    expect(notes).toContain("not a universal prescribing dose");
  });

  it("clinicalNotes references non-placeholder FDA labeling only", () => {
    const refs = levothyroxineDoseCalculator.references ?? [];
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) {
      expect(ref).not.toContain("MedCalcHub");
      expect(ref.toLowerCase()).toMatch(/fda|dailymed|prescribing information/);
    }
  });
});

describe("Batch 2C — magnesium-sulfate-preeclampsia calculation behavior is preserved", () => {
  it("keeps total = loading dose + maintenance x 24 (4g load, 2 g/h)", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "2",
    });
    expect(result.value).toBe(52);
  });

  it("keeps total for a 6g load at 1 g/h", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "6",
      maintenance: "1",
    });
    expect(result.value).toBe(30);
  });

  it("keeps total for a 5g load at 2 g/h", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "5",
      maintenance: "2",
    });
    expect(result.value).toBe(53);
  });

  it("returns critical for missing loading dose", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      maintenance: "2",
    });
    expect(result.status).toBe("critical");
  });

  it("returns critical for an invalid maintenance selection", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "3",
    });
    expect(result.status).toBe("critical");
  });
});

describe("Batch 2C — magnesium-sulfate-preeclampsia safety content", () => {
  it("interpretation states the clinical indication (prevention/treatment of eclampsia)", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "2",
    });
    const text = interpretation(result).toLowerCase();
    expect(text).toContain("preeclampsia");
    expect(text).toContain("eclampsia");
  });

  it("interpretation distinguishes prevention of eclampsia from treatment of an eclamptic seizure", () => {
    const notes = (magnesiumSulfatePreeclampsiaCalculator.clinicalNotes ?? "").toLowerCase();
    expect(notes).toContain("prevention of eclampsia");
    expect(notes).toContain("treatment of eclampsia");
    expect(notes).toContain("eclamptic seizure");
  });

  it("clinicalNotes states regimen choice depends on setting/route/renal function/judgment", () => {
    const notes = (magnesiumSulfatePreeclampsiaCalculator.clinicalNotes ?? "").toLowerCase();
    expect(notes).toContain("clinical setting");
    expect(notes).toContain("route");
    expect(notes).toContain("renal function");
    expect(notes).toContain("clinician judgment");
  });

  it("warns that magnesium sulfate requires monitoring and is not a self-calculation tool", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "2",
    });
    const all = [
      ...(result.warnings ?? []),
      ...(result.advice ?? []),
      result.interpretation,
    ].join(" ").toLowerCase();
    expect(all).toContain("clinical monitoring");
    expect(all).toContain("not a routine self-calculation tool");
  });

  it("mentions toxicity monitoring and calcium gluconate", () => {
    const result = magnesiumSulfatePreeclampsiaCalculator.calculate({
      loadingDose: "4",
      maintenance: "2",
    });
    const all = [
      ...(result.warnings ?? []),
      ...(result.advice ?? []),
      result.interpretation,
    ].join(" ").toLowerCase();
    expect(all).toContain("patellar reflexes");
    expect(all).toContain("calcium gluconate");
  });

  it("references include WHO and ACOG sources", () => {
    const refs = magnesiumSulfatePreeclampsiaCalculator.references ?? [];
    expect(refs.some((r) => r.includes("WHO"))).toBe(true);
    expect(refs.some((r) => r.includes("ACOG"))).toBe(true);
  });
});

describe("Batch 2C — registry remains unchanged at 143 calculators", () => {
  it("registry length is 143", () => {
    expect(calculatorRegistry).toHaveLength(143);
  });

  it("both target calculators remain registered without duplication", () => {
    const ids = calculatorRegistry.map((c) => c.id);
    const slugs = calculatorRegistry.map((c) => c.slug);
    expect(ids.filter((id) => id === "levothyroxine-dose")).toHaveLength(1);
    expect(ids.filter((id) => id === "magnesium-sulfate-preeclampsia")).toHaveLength(1);
    expect(new Set(slugs).size).toBe(143);
  });

  it("getCalculatorById still resolves both target calculators to their enriched definitions", () => {
    expect(getCalculatorById("levothyroxine-dose")).toBe(
      levothyroxineDoseCalculator,
    );
    expect(getCalculatorById("magnesium-sulfate-preeclampsia")).toBe(
      magnesiumSulfatePreeclampsiaCalculator,
    );
  });
});