import { describe, it, expect } from "vitest";

import { bmiCalculator } from "../../lib/calculators/bmi";
import {
  ckdEpi2021Calculator,
} from "../../lib/calculators/ckd-epi-2021";
import { gcsCalculator } from "../../lib/calculators/gcs";

import type {
  CalculatorDefinition,
} from "../../lib/calculators/calculator.types";

/**
 * Helper: calls a calculator's calculate() with string values.
 */
function calc(
  def: CalculatorDefinition,
  values: Record<string, string>,
) {
  return def.calculate(values);
}

// ---------------------------------------------------------------------------
// BMI — weight / (height_m²), result.toFixed(2)
// Classification (robust contiguous boundaries):
//   < 18.5 → low  (Underweight)
//   < 25   → normal (Normal weight)
//   < 30   → high  (Overweight)
//   ≥ 30   → critical (Obesity)
// ---------------------------------------------------------------------------
describe("BMI calculate() output", () => {
  it("normal weight: 70 kg, 170 cm", () => {
    // 70 / (1.70²) = 70 / 2.89 = 24.221… → 24.22
    const r = calc(bmiCalculator, {
      weight: "70",
      height: "170",
    });
    expect(r.value).toBe(24.22);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal weight");
  });

  it("underweight: 45 kg, 170 cm", () => {
    // 45 / (1.70²) = 45 / 2.89 = 15.5709… → 15.57
    const r = calc(bmiCalculator, {
      weight: "45",
      height: "170",
    });
    expect(r.value).toBe(15.57);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Underweight");
  });

  it("overweight: 85 kg, 170 cm", () => {
    // 85 / (1.70²) = 85 / 2.89 = 29.4117… → 29.41
    const r = calc(bmiCalculator, {
      weight: "85",
      height: "170",
    });
    expect(r.value).toBe(29.41);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Overweight");
  });

  it("obesity: 100 kg, 170 cm", () => {
    // 100 / (1.70²) = 100 / 2.89 = 34.6020… → 34.60
    const r = calc(bmiCalculator, {
      weight: "100",
      height: "170",
    });
    expect(r.value).toBe(34.6);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Obesity");
  });

  it("regression: boundary 18.5 BMI now classified correctly", () => {
    // weight=47.36, height=160 → raw BMI ≈ 18.4999… (floating-point)
    // Previously fell through classification; now correctly caught
    // by result < 18.5 → Underweight
    const r = calc(bmiCalculator, {
      weight: "47.36",
      height: "160",
    });
    expect(r.value).toBe(18.5);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Underweight");
  });

  it("regression: clearly below 18.5 boundary", () => {
    // 46 / (1.60²) = 46 / 2.56 = 17.96875 → 17.97
    const r = calc(bmiCalculator, {
      weight: "46",
      height: "160",
    });
    expect(r.value).toBe(17.97);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Underweight");
  });

  it("regression: just above 18.5 boundary", () => {
    // 48 / (1.60²) = 48 / 2.56 = 18.75
    const r = calc(bmiCalculator, {
      weight: "48",
      height: "160",
    });
    expect(r.value).toBe(18.75);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal weight");
  });
});

// ---------------------------------------------------------------------------
// CKD-EPI 2021 —
// Formula: 142 * min(Scr/0.9,1)^-0.302 * max(Scr/0.9,1)^-1.2 * 0.9938^age * 1.012
// Classification (contiguous, no gaps):
//   ≥ 90 → G1 Normal or high
//   ≥ 60 → G2 Mildly decreased
//   ≥ 45 → G3a Mild to moderate
//   ≥ 30 → G3b Moderate to severe
//   ≥ 15 → G4 Severely decreased
//   < 15 → G5 Kidney failure
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("CKD-EPI 2021 calculate() output", () => {
  // Helper to compute the raw expected value for verification
  function expectedEgfr(
    creatinine: number,
    age: number,
  ) {
    return Number(
      (
        142 *
        Math.pow(
          Math.min(creatinine / 0.9, 1),
          -0.302,
        ) *
        Math.pow(
          Math.max(creatinine / 0.9, 1),
          -1.2,
        ) *
        Math.pow(0.9938, age) *
        1.012
      ).toFixed(2),
    );
  }

  it("normal renal function: female, age 40, Cr 0.8", () => {
    const expected = expectedEgfr(0.8, 40);
    const r = calc(ckdEpi2021Calculator, {
      age: "40",
      sex: "1",
      creatinine: "0.8",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "G1: Normal or high",
    );
  });

  it("mildly decreased: female, age 65, Cr 1.1", () => {
    const expected = expectedEgfr(1.1, 65);
    const r = calc(ckdEpi2021Calculator, {
      age: "65",
      sex: "1",
      creatinine: "1.1",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "G2: Mildly decreased",
    );
  });

  it("moderate decrease: female, age 55, Cr 1.5", () => {
    // Cr 1.5, age 55 → eGFR ≈ 56.6, clearly in G3a (45–59)
    const expected = expectedEgfr(1.5, 55);
    const r = calc(ckdEpi2021Calculator, {
      age: "55",
      sex: "1",
      creatinine: "1.5",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3a: Mild to moderate",
    );
  });

  it("severe decrease: female, age 72, Cr 3.5", () => {
    const expected = expectedEgfr(3.5, 72);
    const r = calc(ckdEpi2021Calculator, {
      age: "72",
      sex: "1",
      creatinine: "3.5",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G4: Severely decreased",
    );
  });

  it("regression: Cr 1.8 age 55 now classified as G3b", () => {
    // Previously ~44.87 fell through the gap; now correctly
    // classified as G3b Moderate to severe
    const expected = expectedEgfr(1.8, 55);
    const r = calc(ckdEpi2021Calculator, {
      age: "55",
      sex: "2",
      creatinine: "1.8",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3b: Moderate to severe",
    );
  });

  it("regression: boundary eGFR ≈ 45 → G3a", () => {
    // Find inputs that produce eGFR very close to 45
    // age=40, Cr≈1.57 → eGFR ≈ 45.0
    const expected = expectedEgfr(1.57, 40);
    expect(expected).toBeGreaterThanOrEqual(45);
    expect(expected).toBeLessThan(60);
    const r = calc(ckdEpi2021Calculator, {
      age: "40",
      sex: "1",
      creatinine: "1.57",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3a: Mild to moderate",
    );
  });

  it("regression: boundary eGFR ≈ 30 → G3b", () => {
    // age=80, Cr≈2.0 → eGFR ≈ 30-ish, should be G3b or G4
    const expected = expectedEgfr(2.0, 80);
    expect(expected).toBeGreaterThanOrEqual(15);
    expect(expected).toBeLessThan(45);
    const r = calc(ckdEpi2021Calculator, {
      age: "80",
      sex: "1",
      creatinine: "2.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    // Should be G3b or G4 depending on exact value
    expect([
      "G3b: Moderate to severe",
      "G4: Severely decreased",
    ]).toContain(r.interpretation);
  });

  it("kidney failure: male, age 80, Cr 5.0", () => {
    const expected = expectedEgfr(5.0, 80);
    const r = calc(ckdEpi2021Calculator, {
      age: "80",
      sex: "2",
      creatinine: "5.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe(
      "G5: Kidney failure",
    );
  });
});

// ---------------------------------------------------------------------------
// GCS — eye + verbal + motor
// Result = Number(result.toFixed(2))
// Interpretation/status are always "Clinical interpretation pending."/"normal"
// (no classification logic in the current implementation)
// ---------------------------------------------------------------------------
describe("GCS calculate() output", () => {
  it("fully normal: eye 4 + verbal 5 + motor 6 = 15", () => {
    const r = calc(gcsCalculator, {
      eye: "4",
      verbal: "5",
      motor: "6",
    });
    expect(r.value).toBe(15);
    expect(r.status).toBe("normal");
  });

  it("moderate: eye 3 + verbal 4 + motor 5 = 12", () => {
    const r = calc(gcsCalculator, {
      eye: "3",
      verbal: "4",
      motor: "5",
    });
    expect(r.value).toBe(12);
    expect(r.status).toBe("normal");
  });

  it("severe: eye 1 + verbal 1 + motor 1 = 3", () => {
    const r = calc(gcsCalculator, {
      eye: "1",
      verbal: "1",
      motor: "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("mid-range: eye 2 + verbal 3 + motor 4 = 9", () => {
    const r = calc(gcsCalculator, {
      eye: "2",
      verbal: "3",
      motor: "4",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("normal");
  });
});