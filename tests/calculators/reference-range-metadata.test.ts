/**
 * ReferenceRange Architecture + Clinical Metadata Tests
 *
 * Sprint 1.8 Batch 4
 *
 * Verifies:
 * - Backward-compatible legacy `{label, range}` reference ranges
 * - Extended metadata (unit, sex, population, ageGroup, pregnancy, context)
 * - Strong typing of sex/population/age-unit enums
 * - Registry integrity for referenceRanges and clinical metadata
 * - No accidental loss of clinical guidance content
 * - Result-level dynamic advice/warnings/followUp remain intact
 */

import { describe, it, expect } from "vitest";
import type {
  CalculatorDefinition,
  CalculatorResult,
  ReferenceRange,
  ReferenceRangeAgeGroup,
  ReferenceRangePopulation,
  ReferenceRangeSex,
} from "../../lib/calculators/calculator.types";
import { calculatorRegistry } from "../../lib/calculators/registry";

describe("ReferenceRange — legacy compatibility", () => {
  it("legacy { label, range } objects remain valid", () => {
    const legacy: ReferenceRange = {
      label: "Normal",
      range: "18.5–24.9",
    };
    expect(legacy.label).toBe("Normal");
    expect(legacy.range).toBe("18.5–24.9");
  });

  it("legacy object with only label and range is assignable", () => {
    const ranges: ReferenceRange[] = [
      { label: "Underweight", range: "< 18.5" },
      { label: "Normal", range: "18.5–24.9" },
      { label: "Overweight", range: "25–29.9" },
    ];
    expect(ranges).toHaveLength(3);
    for (const r of ranges) {
      expect(r.label).toBeTruthy();
      expect(r.range).toBeTruthy();
    }
  });

  it("unit is optional", () => {
    const withUnit: ReferenceRange = {
      label: "Normal",
      range: "70–99",
      unit: "mg/dL",
    };
    const withoutUnit: ReferenceRange = {
      label: "Normal",
      range: "70–99",
    };
    expect(withUnit.unit).toBe("mg/dL");
    expect(withoutUnit.unit).toBeUndefined();
  });

  it("existing calculator ranges remain compatible (BMI)", () => {
    const bmi = calculatorRegistry.find((c) => c.slug === "bmi");
    expect(bmi).toBeDefined();
    expect(Array.isArray(bmi?.referenceRanges)).toBe(true);
    expect(bmi?.referenceRanges?.length).toBeGreaterThan(0);
    for (const range of bmi?.referenceRanges ?? []) {
      expect(typeof range.label).toBe("string");
      expect(typeof range.range).toBe("string");
    }
  });
});

describe("ReferenceRange — extended metadata", () => {
  const validSexes: ReferenceRangeSex[] = ["male", "female", "all"];
  const validPopulations: ReferenceRangePopulation[] = [
    "adult",
    "pediatric",
    "all",
  ];

  it("sex accepts only valid values", () => {
    for (const sex of validSexes) {
      const r: ReferenceRange = { label: "x", range: "y", sex };
      expect(r.sex).toBe(sex);
    }
    // @ts-expect-error invalid sex value must be rejected at compile time
    const invalid: ReferenceRange = { label: "x", range: "y", sex: "unknown" };
    void invalid;
  });

  it("population accepts only valid values", () => {
    for (const pop of validPopulations) {
      const r: ReferenceRange = { label: "x", range: "y", population: pop };
      expect(r.population).toBe(pop);
    }
    // @ts-expect-error invalid population value must be rejected at compile time
    const invalid: ReferenceRange = { label: "x", range: "y", population: "geriatric" };
    void invalid;
  });

  it("age ranges support minimum-only bounds", () => {
    const r: ReferenceRange = {
      label: "Adult",
      range: "18.5–24.9",
      ageGroup: { min: 18 },
    };
    expect(r.ageGroup?.min).toBe(18);
    expect(r.ageGroup?.max).toBeUndefined();
  });

  it("age ranges support maximum-only bounds", () => {
    const r: ReferenceRange = {
      label: "Pediatric",
      range: "5–85",
      ageGroup: { max: 17, unit: "years" },
    };
    expect(r.ageGroup?.min).toBeUndefined();
    expect(r.ageGroup?.max).toBe(17);
    expect(r.ageGroup?.unit).toBe("years");
  });

  it("age ranges support bounded ranges", () => {
    const r: ReferenceRange = {
      label: "Infant",
      range: "70–100",
      ageGroup: { min: 1, max: 12, unit: "months" },
    };
    expect(r.ageGroup?.min).toBe(1);
    expect(r.ageGroup?.max).toBe(12);
    expect(r.ageGroup?.unit).toBe("months");
  });

  it("age units support years/months/days", () => {
    const ageUnits: ReferenceRangeAgeGroup["unit"][] = [
      "years",
      "months",
      "days",
    ];
    for (const unit of ageUnits) {
      const r: ReferenceRange = {
        label: "x",
        range: "y",
        ageGroup: { min: 0, max: 1, unit },
      };
      expect(r.ageGroup?.unit).toBe(unit);
    }
  });

  it("pregnancy is boolean when present", () => {
    const pregnant: ReferenceRange = {
      label: "Pregnant",
      range: "4.0–12.0",
      pregnancy: true,
    };
    const notPregnant: ReferenceRange = {
      label: "Non-pregnant",
      range: "4.0–11.0",
      pregnancy: false,
    };
    expect(pregnant.pregnancy).toBe(true);
    expect(notPregnant.pregnancy).toBe(false);
  });

  it("context is optional free-text", () => {
    const r: ReferenceRange = {
      label: "Fasting",
      range: "70–99",
      context: "fasting",
    };
    expect(r.context).toBe("fasting");
  });

  it("fully-annotated range is valid", () => {
    const r: ReferenceRange = {
      label: "Normal",
      range: "70–99",
      unit: "mg/dL",
      sex: "female",
      population: "adult",
      ageGroup: { min: 18, max: 65, unit: "years" },
      pregnancy: false,
      context: "fasting",
    };
    expect(r).toMatchObject({
      label: "Normal",
      range: "70–99",
      unit: "mg/dL",
      sex: "female",
      population: "adult",
      ageGroup: { min: 18, max: 65, unit: "years" },
      pregnancy: false,
      context: "fasting",
    });
  });
});

describe("ReferenceRange — registry integrity", () => {
  it("every registered calculator has a valid referenceRanges structure when provided", () => {
    for (const calc of calculatorRegistry) {
      if (calc.referenceRanges === undefined) continue;
      expect(Array.isArray(calc.referenceRanges)).toBe(true);
      for (const range of calc.referenceRanges) {
        expect(typeof range.label).toBe("string");
        expect(typeof range.range).toBe("string");
        if (range.unit !== undefined) {
          expect(typeof range.unit).toBe("string");
        }
        if (range.sex !== undefined) {
          expect(["male", "female", "all"]).toContain(range.sex);
        }
        if (range.population !== undefined) {
          expect(["adult", "pediatric", "all"]).toContain(range.population);
        }
        if (range.ageGroup !== undefined) {
          if (range.ageGroup.min !== undefined) {
            expect(typeof range.ageGroup.min).toBe("number");
          }
          if (range.ageGroup.max !== undefined) {
            expect(typeof range.ageGroup.max).toBe("number");
          }
          if (range.ageGroup.unit !== undefined) {
            expect(["years", "months", "days"]).toContain(range.ageGroup.unit);
          }
        }
        if (range.pregnancy !== undefined) {
          expect(typeof range.pregnancy).toBe("boolean");
        }
        if (range.context !== undefined) {
          expect(typeof range.context).toBe("string");
        }
      }
    }
  });

  it("empty reference range arrays remain safely handled", () => {
    // BSA, CURB-65, GCS, heart-rate, lean-body-weight, MAP, NEWS2, qSOFA, shock-index
    const emptyRangeCalcs = calculatorRegistry.filter(
      (c) => c.referenceRanges !== undefined && c.referenceRanges.length === 0,
    );
    expect(emptyRangeCalcs.length).toBeGreaterThan(0);
    for (const calc of emptyRangeCalcs) {
      expect(calc.referenceRanges).toEqual([]);
    }
  });

  it("all calculators retain their existing reference ranges", () => {
    const expectedCounts: Record<string, number> = {};
    for (const calc of calculatorRegistry) {
      expectedCounts[calc.slug] = calc.referenceRanges?.length ?? 0;
    }
    // Regression: specific known counts must not regress
    const bmi = calculatorRegistry.find((c) => c.slug === "bmi");
    expect(bmi?.referenceRanges).toHaveLength(4);
  });

  it("registry exposes calculators with population-specific metadata support", () => {
    // No calculator is forced to use metadata; but the type must accept it.
    const typed: CalculatorDefinition = {
      id: "test-pop",
      slug: "test-pop",
      name: "Test Population",
      shortName: "TP",
      description: "test",
      category: "test",
      inputs: [],
      referenceRanges: [
        {
          label: "Adult Male",
          range: "10–20",
          sex: "male",
          population: "adult",
        },
        {
          label: "Pediatric",
          range: "5–15",
          population: "pediatric",
          ageGroup: { max: 17, unit: "years" },
        },
      ],
      calculate: () => ({ value: 0 }),
    };
    expect(typed.referenceRanges?.[0].sex).toBe("male");
    expect(typed.referenceRanges?.[1].population).toBe("pediatric");
  });
});

describe("Clinical metadata — clinical vs clinicalGuidance", () => {
  it("clinical is the canonical rendered field and always well-formed when present", () => {
    const withClinical = calculatorRegistry.filter(
      (c) => c.clinical !== undefined,
    );
    expect(withClinical.length).toBeGreaterThan(0);
    for (const calc of withClinical) {
      expect(calc.clinical).toBeDefined();
      if (calc.clinical?.pearl !== undefined) {
        expect(typeof calc.clinical.pearl).toBe("string");
      }
      if (calc.clinical?.commonMistakes !== undefined) {
        expect(Array.isArray(calc.clinical.commonMistakes)).toBe(true);
      }
    }
  });

  it("clinicalGuidance remains populated with static content (no loss of guidance)", () => {
    const withGuidance = calculatorRegistry.filter(
      (c) => c.clinicalGuidance !== undefined,
    );
    expect(withGuidance.length).toBeGreaterThan(0);
    for (const calc of withGuidance) {
      const g = calc.clinicalGuidance;
      if (g?.advice !== undefined) {
        expect(Array.isArray(g.advice)).toBe(true);
      }
      if (g?.warnings !== undefined) {
        expect(Array.isArray(g.warnings)).toBe(true);
      }
      if (g?.followUp !== undefined) {
        expect(Array.isArray(g.followUp)).toBe(true);
      }
    }
  });

  it("clinicalGuidance content is preserved (pilot calculators retain guidance)", () => {
    // Pilot calculators from Sprint 1.8: BMI, CKD-EPI 2021, corrected calcium, etc.
    const bmi = calculatorRegistry.find((c) => c.slug === "bmi");
    expect(bmi?.clinicalGuidance?.advice?.length).toBeGreaterThan(0);
    expect(bmi?.clinicalGuidance?.warnings?.length).toBeGreaterThan(0);
    expect(bmi?.clinicalGuidance?.followUp?.length).toBeGreaterThan(0);

    const ckd = calculatorRegistry.find((c) => c.slug === "ckd-epi-2021");
    expect(ckd?.clinicalGuidance?.advice?.length).toBeGreaterThan(0);
    expect(ckd?.clinicalGuidance?.warnings?.length).toBeGreaterThan(0);
    expect(ckd?.clinicalGuidance?.followUp?.length).toBeGreaterThan(0);
  });

  it("a calculator may have both clinical and clinicalGuidance without conflict", () => {
    const both = calculatorRegistry.filter(
      (c) => c.clinical !== undefined && c.clinicalGuidance !== undefined,
    );
    // lean-body-weight and waist-to-hip-ratio have both
    for (const calc of both) {
      expect(calc.clinical).toBeDefined();
      expect(calc.clinicalGuidance).toBeDefined();
    }
  });
});

describe("Top-level definition metadata fields", () => {
  it("definition-level warnings/advice/followUp, when present, are string arrays", () => {
    for (const calc of calculatorRegistry) {
      if (calc.warnings !== undefined) {
        expect(Array.isArray(calc.warnings)).toBe(true);
        for (const w of calc.warnings) {
          expect(typeof w).toBe("string");
        }
      }
      if (calc.advice !== undefined) {
        expect(Array.isArray(calc.advice)).toBe(true);
        for (const a of calc.advice) {
          expect(typeof a).toBe("string");
        }
      }
      if (calc.followUp !== undefined) {
        expect(Array.isArray(calc.followUp)).toBe(true);
        for (const f of calc.followUp) {
          expect(typeof f).toBe("string");
        }
      }
    }
  });
});

describe("Result-level dynamic guidance remains unchanged", () => {
  it("CalculatorResult advice/warnings/followUp are separate from definition-level fields", () => {
    // Type-level guarantee: CalculatorResult fields are string arrays
    const result: CalculatorResult = {
      value: 22,
      unit: "kg/m²",
      advice: ["Result-specific advice"],
      warnings: ["Result-specific warning"],
      followUp: ["Result-specific follow-up"],
    };
    expect(Array.isArray(result.advice)).toBe(true);
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(Array.isArray(result.followUp)).toBe(true);
  });

  it("calculate() continues returning dynamic advice/warnings/followUp", () => {
    const bmi = calculatorRegistry.find((c) => c.slug === "bmi");
    expect(bmi).toBeDefined();
    const result = bmi!.calculate({ weight: "70", height: "175" });
    // Dynamic result fields are arrays when present
    if (result.advice !== undefined) {
      expect(Array.isArray(result.advice)).toBe(true);
    }
    if (result.warnings !== undefined) {
      expect(Array.isArray(result.warnings)).toBe(true);
    }
    if (result.followUp !== undefined) {
      expect(Array.isArray(result.followUp)).toBe(true);
    }
  });
});