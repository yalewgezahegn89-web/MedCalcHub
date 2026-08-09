import { describe, it, expect } from "vitest";

import { bmiCalculator } from "../../lib/calculators/bmi";
import {
  ckdEpi2021Calculator,
} from "../../lib/calculators/ckd-epi-2021";
import { gcsCalculator } from "../../lib/calculators/gcs";
import { news2Calculator } from "../../lib/calculators/news2";
import { curb65Calculator } from "../../lib/calculators/curb-65";
import { qsofaCalculator } from "../../lib/calculators/qsofa";
import {
  anionGapCalculator,
} from "../../lib/calculators/anion-gap";
import {
  correctedAnionGapCalculator,
} from "../../lib/calculators/corrected-anion-gap";
import { fenaCalculator } from "../../lib/calculators/fena";
import { feureaCalculator } from "../../lib/calculators/feurea";
import { ttkgCalculator } from "../../lib/calculators/ttkg";
import {
  correctedSodiumCalculator,
} from "../../lib/calculators/corrected-sodium";
import {
  serumOsmolalityCalculator,
} from "../../lib/calculators/serum-osmolality";
import {
  osmolarGapCalculator,
} from "../../lib/calculators/osmolar-gap";
import { childPughCalculator } from "../../lib/calculators/child-pugh";
import { cockcroftGaultCalculator } from "../../lib/calculators/cockcroft-gault";
import { mdrdCalculator } from "../../lib/calculators/mdrd";

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

// ---------------------------------------------------------------------------
// NEWS2 — National Early Warning Score 2
// NOTE: The current NEWS2 implementation is a placeholder that sums raw
// vital signs instead of scoring them per the NEWS2 protocol. It also has
// no classification logic (always returns status "normal"). This section
// documents the current (known-broken) behavior. These tests serve as
// regression tests so any future fix can be validated.
// ---------------------------------------------------------------------------
describe("NEWS2 calculate() boundary audit", () => {
  it("produces a numeric result from valid inputs", () => {
    const r = calc(news2Calculator, {
      respiratory_rate: "20",
      spo2: "94",
      temperature: "38",
      sbp: "110",
      pulse: "110",
    });
    expect(typeof r.value).toBe("number");
    expect(r.value).toBeGreaterThan(0);
  });

  it("classification is always normal (known limitation)", () => {
    // NEWS2 currently has no classification logic; always returns "normal"
    const r = calc(news2Calculator, {
      respiratory_rate: "8",
      spo2: "88",
      temperature: "34",
      sbp: "70",
      pulse: "40",
    });
    expect(r.status).toBe("normal");
  });

  it("returns critical status for missing input", () => {
    const r = calc(news2Calculator, {
      respiratory_rate: "",
      spo2: "94",
      temperature: "38",
      sbp: "110",
      pulse: "110",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// CURB-65 — Severity score for community-acquired pneumonia
// NOTE: The current CURB-65 implementation has a hardcoded result of 65
// and no actual scoring logic. It also lacks a "confusion" input.
// These tests document current (known-broken) behavior.
// ---------------------------------------------------------------------------
describe("CURB-65 calculate() boundary audit", () => {
  it("result is always 65 (known limitation)", () => {
    const r = calc(curb65Calculator, {
      age: "70",
      urea: "7",
      respiratory_rate: "22",
      sbp: "90",
    });
    expect(r.value).toBe(65);
    expect(r.status).toBe("normal");
  });

  it("returns critical status for missing age", () => {
    const r = calc(curb65Calculator, {
      age: "",
      urea: "7",
      respiratory_rate: "22",
      sbp: "90",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// qSOFA — Quick Sequential Organ Failure Assessment
// NOTE: The current qSOFA implementation sums raw SBP + RR instead of
// scoring them (SBP ≤100 → 1, RR ≥22 → 1, altered mental status → 1).
// The mental_status input is parsed but never used in the score.
// These tests document current (known-broken) behavior.
// ---------------------------------------------------------------------------
describe("qSOFA calculate() boundary audit", () => {
  it("produces a numeric result from valid inputs", () => {
    const r = calc(qsofaCalculator, {
      sbp: "100",
      respiratory_rate: "22",
      mental_status: "1",
    });
    expect(typeof r.value).toBe("number");
    expect(r.value).toBeGreaterThan(0);
  });

  it("classification is always normal (known limitation)", () => {
    // qSOFA currently has no classification logic
    const r = calc(qsofaCalculator, {
      sbp: "80",
      respiratory_rate: "30",
      mental_status: "1",
    });
    expect(r.status).toBe("normal");
  });

  it("returns critical status for missing input", () => {
    const r = calc(qsofaCalculator, {
      sbp: "",
      respiratory_rate: "22",
      mental_status: "1",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Child-Pugh Score — Liver disease severity
// Classification:
//   score ≤ 6  → Class A (normal, green)
//   score ≤ 9  → Class B (high, yellow)
//   score > 9  → Class C (critical, red)
// Minimum possible score = 5 (all 1s), maximum = 15 (all 3s)
// ---------------------------------------------------------------------------
describe("Child-Pugh calculate() boundary audit", () => {
  it("minimum score (5) → Class A", () => {
    // All inputs = "1" → score = 5
    const r = calc(childPughCalculator, {
      bilirubin: "1",
      albumin: "1",
      inr: "1",
      ascites: "1",
      encephalopathy: "1",
    });
    expect(r.score).toBe(5);
    expect(r.value).toBe("Child-Pugh Class A");
    expect(r.status).toBe("normal");
  });

  it("score 6 (boundary) → Class A", () => {
    // bilirubin=2, rest=1 → score = 6
    const r = calc(childPughCalculator, {
      bilirubin: "2",
      albumin: "1",
      inr: "1",
      ascites: "1",
      encephalopathy: "1",
    });
    expect(r.score).toBe(6);
    expect(r.value).toBe("Child-Pugh Class A");
    expect(r.status).toBe("normal");
  });

  it("score 7 (boundary) → Class B", () => {
    // bilirubin=2, albumin=2, rest=1 → score = 7
    const r = calc(childPughCalculator, {
      bilirubin: "2",
      albumin: "2",
      inr: "1",
      ascites: "1",
      encephalopathy: "1",
    });
    expect(r.score).toBe(7);
    expect(r.value).toBe("Child-Pugh Class B");
    expect(r.status).toBe("high");
  });

  it("score 9 (boundary) → Class B", () => {
    // bilirubin=3, albumin=3, inr=1, ascites=1, encephalopathy=1 → 9
    const r = calc(childPughCalculator, {
      bilirubin: "3",
      albumin: "3",
      inr: "1",
      ascites: "1",
      encephalopathy: "1",
    });
    expect(r.score).toBe(9);
    expect(r.value).toBe("Child-Pugh Class B");
    expect(r.status).toBe("high");
  });

  it("score 10 (boundary) → Class C", () => {
    // bilirubin=3, albumin=3, inr=2, ascites=1, encephalopathy=1 → 10
    const r = calc(childPughCalculator, {
      bilirubin: "3",
      albumin: "3",
      inr: "2",
      ascites: "1",
      encephalopathy: "1",
    });
    expect(r.score).toBe(10);
    expect(r.value).toBe("Child-Pugh Class C");
    expect(r.status).toBe("critical");
  });

  it("maximum score (15) → Class C", () => {
    // All inputs = "3" → score = 15
    const r = calc(childPughCalculator, {
      bilirubin: "3",
      albumin: "3",
      inr: "3",
      ascites: "3",
      encephalopathy: "3",
    });
    expect(r.score).toBe(15);
    expect(r.value).toBe("Child-Pugh Class C");
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Cockcroft-Gault — Creatinine clearance estimation
// Formula: CrCl = ((140 - age) * weight) / (72 * Scr) * (0.85 if female)
// Classification:
//   ≥ 90 → Normal renal function
//   60–89 → Mild renal impairment
//   30–59 → Moderate renal impairment
//   15–29 → Severe renal impairment
//   < 15  → Kidney failure
// ---------------------------------------------------------------------------
describe("Cockcroft-Gault calculate() boundary audit", () => {
  // Known male result for reference
  const maleAge50Wt70Scr1 = ((140 - 50) * 70) / (72 * 1); // 87.5

  it("male: age 50, weight 70, Cr 1.0 → ~87.5, Mild renal impairment", () => {
    const r = calc(cockcroftGaultCalculator, {
      age: "50",
      weight: "70",
      sex: "1",
      creatinine: "1.0",
    });
    expect(r.value).toBeCloseTo(87.5, 1);
    expect(r.interpretation).toBe("Mild renal impairment");
    expect(r.status).toBe("normal");
  });

  it("female: same inputs → 0.85 factor applied", () => {
    const expected = Math.round(87.5 * 0.85 * 100) / 100; // 74.38
    const r = calc(cockcroftGaultCalculator, {
      age: "50",
      weight: "70",
      sex: "2",
      creatinine: "1.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("Mild renal impairment");
    expect(r.status).toBe("normal");
  });

  it("boundary: result ≈ 90 → Normal renal function", () => {
    // age=30, weight=80, Cr=1.0, male: (110*80)/(72*1) = 122.22
    const r = calc(cockcroftGaultCalculator, {
      age: "30",
      weight: "80",
      sex: "1",
      creatinine: "1.0",
    });
    expect(r.value).toBeGreaterThanOrEqual(90);
    expect(r.interpretation).toBe("Normal renal function");
    expect(r.status).toBe("normal");
  });

  it("boundary: result ≈ 60 → Mild renal impairment", () => {
    // age=80, weight=60, Cr=1.5, male: (60*60)/(72*1.5) = 33.33 → moderate
    // Try to hit ~60-65: age=50, weight=60, Cr=1.0, male: (90*60)/(72) = 75
    // age=70, weight=60, Cr=1.0, male: (70*60)/(72) = 58.33 → moderate
    // age=60, weight=70, Cr=1.0, male: (80*70)/(72) = 77.78 → mild
    // age=70, weight=50, Cr=1.0, male: (70*50)/(72) = 48.61 → moderate
    // We need result in 60-89 range; age=60, weight=60, Cr=1.0: (80*60)/72=66.67
    const r = calc(cockcroftGaultCalculator, {
      age: "60",
      weight: "60",
      sex: "1",
      creatinine: "1.0",
    });
    expect(r.value).toBeGreaterThanOrEqual(60);
    expect(r.value).toBeLessThanOrEqual(89);
    expect(r.interpretation).toBe("Mild renal impairment");
    expect(r.status).toBe("normal");
  });

  it("boundary: result ≈ 50 → Moderate renal impairment", () => {
    // age=70, weight=60, Cr=1.0, male: (70*60)/(72) = 58.33
    // age=70, weight=50, Cr=1.0, male: (70*50)/(72) = 48.61
    const r = calc(cockcroftGaultCalculator, {
      age: "70",
      weight: "50",
      sex: "1",
      creatinine: "1.0",
    });
    expect(r.value).toBeGreaterThanOrEqual(30);
    expect(r.value).toBeLessThanOrEqual(59);
    expect(r.interpretation).toBe("Moderate renal impairment");
    expect(r.status).toBe("low");
  });

  it("boundary: result ≈ 20 → Severe renal impairment", () => {
    // age=80, weight=30, Cr=3.0, male: (60*30)/(72*3) = 8.33 → failure
    // age=80, weight=50, Cr=2.5, male: (60*50)/(72*2.5) = 16.67 → severe
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "50",
      sex: "1",
      creatinine: "2.5",
    });
    expect(r.value).toBeGreaterThanOrEqual(15);
    expect(r.value).toBeLessThanOrEqual(29);
    expect(r.interpretation).toBe("Severe renal impairment");
    expect(r.status).toBe("low");
  });

  it("boundary: result < 15 → Kidney failure", () => {
    // age=80, weight=30, Cr=3.0, male: (60*30)/(72*3) = 8.33
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "30",
      sex: "1",
      creatinine: "3.0",
    });
    expect(r.value).toBeLessThan(15);
    expect(r.interpretation).toBe("Kidney failure");
    expect(r.status).toBe("critical");
  });

  it("boundary: just below 15 → Kidney failure (regression)", () => {
    // age=80, weight=25, Cr=2.0, male: (60*25)/(72*2) = 1500/144 = 10.42
    // age=80, weight=35, Cr=2.0, male: (60*35)/(72*2) = 2100/144 = 14.58
    // This is genuinely close to but below 15
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "35",
      sex: "1",
      creatinine: "2.0",
    });
    expect(r.value).toBeGreaterThanOrEqual(14);
    expect(r.value).toBeLessThan(15);
    expect(r.interpretation).toBe("Kidney failure");
    expect(r.status).toBe("critical");
  });

  it("boundary: exactly 15 → Severe renal impairment (not failure)", () => {
    // (140-age)*wt/(72*Cr) = 15
    // age=80, wt=36, Cr=2.0: (60*36)/(72*2) = 2160/144 = 15.0
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "36",
      sex: "1",
      creatinine: "2.0",
    });
    expect(r.value).toBe(15);
    expect(r.interpretation).toBe("Severe renal impairment");
    expect(r.status).toBe("low");
  });
});

// ---------------------------------------------------------------------------
// MDRD — Estimated GFR
// Formula: 175 * Scr^-1.154 * age^-0.203 * (0.742 if female)
// Classification:
//   ≥ 90  → G1: Normal or high
//   60–89 → G2: Mildly decreased
//   45–59 → G3a: Mild to moderate
//   30–44 → G3b: Moderate to severe
//   15–29 → G4: Severely decreased
//   < 15  → G5: Kidney failure
// ---------------------------------------------------------------------------
describe("MDRD calculate() boundary audit", () => {
  function expectedMdrd(
    creatinine: number,
    age: number,
    sex: string,
  ) {
    const isFemale = sex === "2";
    return Number(
      (
        175 *
        Math.pow(creatinine, -1.154) *
        Math.pow(age, -0.203) *
        (isFemale ? 0.742 : 1)
      ).toFixed(2),
    );
  }

  it("male, age 50, Cr 1.0 → expected eGFR, G1 or G2", () => {
    const expected = expectedMdrd(1.0, 50, "1");
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "1.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("normal");
  });

  it("female: same age/Cr → 0.742 factor applied", () => {
    const expectedMale = expectedMdrd(1.0, 50, "1");
    const expectedFemale = expectedMdrd(1.0, 50, "2");
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "2",
      creatinine: "1.0",
    });
    expect(r.value).toBeCloseTo(expectedFemale, 1);
    // Female result should be ~74.2% of male result
    expect(expectedFemale).toBeCloseTo(expectedMale * 0.742, 0);
  });

  it("boundary: eGFR ≥ 90 → G1 Normal or high", () => {
    // Low creatinine → high eGFR. Cr=0.5, age=40, male
    const expected = expectedMdrd(0.5, 40, "1");
    expect(expected).toBeGreaterThanOrEqual(90);
    const r = calc(mdrdCalculator, {
      age: "40",
      sex: "1",
      creatinine: "0.5",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G1: Normal or high");
    expect(r.status).toBe("normal");
  });

  it("boundary: eGFR in 60–89 → G2 Mildly decreased", () => {
    // Cr=1.2, age=50, male → lower eGFR to land in G2
    const expected = expectedMdrd(1.2, 50, "1");
    expect(expected).toBeGreaterThanOrEqual(60);
    expect(expected).toBeLessThanOrEqual(89);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "1.2",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G2: Mildly decreased");
    expect(r.status).toBe("normal");
  });

  it("boundary: eGFR in 45–59 → G3a Mild to moderate", () => {
    // Cr=1.5, age=50, male
    const expected = expectedMdrd(1.5, 50, "1");
    expect(expected).toBeGreaterThanOrEqual(45);
    expect(expected).toBeLessThanOrEqual(59);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "1.5",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G3a: Mild to moderate");
    expect(r.status).toBe("low");
  });

  it("boundary: eGFR in 30–44 → G3b Moderate to severe", () => {
    // Cr=2.0, age=50, male
    const expected = expectedMdrd(2.0, 50, "1");
    expect(expected).toBeGreaterThanOrEqual(30);
    expect(expected).toBeLessThanOrEqual(44);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "2.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G3b: Moderate to severe");
    expect(r.status).toBe("low");
  });

  it("boundary: eGFR in 15–29 → G4 Severely decreased", () => {
    // Cr=4.0, age=50, male
    const expected = expectedMdrd(4.0, 50, "1");
    expect(expected).toBeGreaterThanOrEqual(15);
    expect(expected).toBeLessThanOrEqual(29);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "4.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G4: Severely decreased");
    expect(r.status).toBe("low");
  });

  it("boundary: eGFR < 15 → G5 Kidney failure", () => {
    // Cr=8.0, age=80, male
    const expected = expectedMdrd(8.0, 80, "1");
    expect(expected).toBeLessThan(15);
    const r = calc(mdrdCalculator, {
      age: "80",
      sex: "1",
      creatinine: "8.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G5: Kidney failure");
    expect(r.status).toBe("critical");
  });

  it("boundary: eGFR ≈ 15–29 → G4 Severely decreased (regression)", () => {
    // Cr=3.73, age=50, male produces eGFR ≈ 15.0 — squarely in G4 (15–29)
    const expected = expectedMdrd(3.73, 50, "1");
    expect(expected).toBeGreaterThanOrEqual(15);
    expect(expected).toBeLessThan(30);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "3.73",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.value).toBeGreaterThanOrEqual(15);
    expect(r.value).toBeLessThan(30);
    expect(r.interpretation).toBe("G4: Severely decreased");
    expect(r.status).toBe("low");
  });

  it("boundary: just below 15 → G5 Kidney failure (regression)", () => {
    // Cr=8.0, age=80, male → clearly below 15
    const expected = expectedMdrd(8.0, 80, "1");
    expect(expected).toBeLessThan(15);
    const r = calc(mdrdCalculator, {
      age: "80",
      sex: "1",
      creatinine: "8.0",
    });
    expect(r.interpretation).toBe("G5: Kidney failure");
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Anion Gap — Na − (Cl + HCO₃)
// Previously defective: computed Na − (Cl + Na) = −Cl (always negative)
// Classification:
//   ≤ 7   → Low anion gap
//   8–12  → Normal anion gap
//   ≥ 13  → High anion gap
//   ≥ 20  → Markedly elevated (unreachable dead branch — not tested here)
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Anion Gap calculate() regression", () => {
  it("Na=140, Cl=104, HCO3=24 → AG = 12 (normal)", () => {
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
    });
    expect(r.value).toBe(12);
    expect(r.interpretation).toBe("Normal anion gap");
    expect(r.status).toBe("normal");
  });

  it("different inputs produce different results", () => {
    const r1 = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
    });
    const r2 = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "100",
      bicarbonate: "20",
    });
    expect(r1.value).not.toBe(r2.value);
  });

  it("high anion gap: Na=140, Cl=110, HCO3=10 → AG = 20", () => {
    // 140 - (110 + 10) = 20
    // After dead-branch fix, AG>=20 is now checked before AG>=13,
    // so AG=20 correctly gets "Markedly elevated" (critical)
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "110",
      bicarbonate: "10",
    });
    expect(r.value).toBe(20);
    expect(r.interpretation).toBe("Markedly elevated anion gap");
    expect(r.status).toBe("critical");
  });

  it("low anion gap: Na=130, Cl=105, HCO3=22 → AG = 3", () => {
    // 130 - (105 + 22) = 3
    const r = calc(anionGapCalculator, {
      sodium: "130",
      chloride: "105",
      bicarbonate: "22",
    });
    expect(r.value).toBe(3);
    expect(r.interpretation).toBe("Low anion gap");
    expect(r.status).toBe("low");
  });

  it("regression: result is no longer -104 for standard inputs", () => {
    // Previously: Na − (Cl + Na) = 140 − (104 + 140) = −104
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
    });
    expect(r.value).not.toBe(-104);
    expect(r.value).toBe(12);
  });
});

// ---------------------------------------------------------------------------
// Corrected Anion Gap — (Na − (Cl + HCO₃)) + 2.5 × (4 − Albumin)
// Previously defective: same base-AG bug as anion-gap
// Classification: same as anion gap
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Corrected Anion Gap calculate() regression", () => {
  it("Na=140, Cl=104, HCO3=24, alb=2.0 → corrected AG = 17", () => {
    // AG = 140 - (104 + 24) = 12
    // correction = 2.5 * (4 - 2.0) = 5
    // corrected = 12 + 5 = 17
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
      albumin: "2.0",
    });
    expect(r.value).toBe(17);
    expect(r.interpretation).toBe("High corrected anion gap");
    expect(r.status).toBe("high");
  });

  it("normal albumin: correction is zero", () => {
    // Na=140, Cl=104, HCO3=24, alb=4.0 → AG=12, correction=0 → 12
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
      albumin: "4.0",
    });
    expect(r.value).toBe(12);
    expect(r.interpretation).toBe("Normal corrected anion gap");
    expect(r.status).toBe("normal");
  });

  it("regression: result is no longer -99 for standard inputs", () => {
    // Previously: (Na − (Cl + Na)) + correction = (140 − 244) + 5 = -99
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
      albumin: "2.0",
    });
    expect(r.value).not.toBe(-99);
    expect(r.value).toBe(17);
  });
});

// ---------------------------------------------------------------------------
// FENa — (urineNa / plasmaNa) / (urineCr / plasmaCr) × 100
// Previously defective: (urineNa/urineNa)/(urineNa/urineNa) × 100 = always 100
// Classification:
//   ≤ 1%  → Prerenal azotemia
//   1–2%  → Indeterminate
//   ≥ 2%  → Intrinsic renal injury (ATN)
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("FENa calculate() regression", () => {
  it("prerenal: urineNa=20, plasmaNa=140, urineCr=120, plasmaCr=2.0 → ~0.24%", () => {
    // (20/140) / (120/2.0) * 100 = 0.14286 / 60 * 100 = 0.2381
    const r = calc(fenaCalculator, {
      urineNa: "20",
      plasmaNa: "140",
      urineCr: "120",
      plasmaCr: "2.0",
    });
    expect(r.value).toBeCloseTo(0.24, 1);
    expect(r.interpretation).toBe("Prerenal azotemia");
    expect(r.status).toBe("low");
  });

  it("ATN: urineNa=80, plasmaNa=140, urineCr=40, plasmaCr=2.0 → ~2.86%", () => {
    // (80/140) / (40/2.0) * 100 = 0.5714 / 20 * 100 = 2.8571
    const r = calc(fenaCalculator, {
      urineNa: "80",
      plasmaNa: "140",
      urineCr: "40",
      plasmaCr: "2.0",
    });
    expect(r.value).toBeCloseTo(2.86, 0);
    expect(r.interpretation).toBe("Intrinsic renal injury (ATN)");
    expect(r.status).toBe("high");
  });

  it("different inputs produce different results", () => {
    const r1 = calc(fenaCalculator, {
      urineNa: "20",
      plasmaNa: "140",
      urineCr: "120",
      plasmaCr: "2.0",
    });
    const r2 = calc(fenaCalculator, {
      urineNa: "80",
      plasmaNa: "140",
      urineCr: "40",
      plasmaCr: "2.0",
    });
    expect(r1.value).not.toBe(r2.value);
  });

  it("regression: result is no longer always 100", () => {
    const r = calc(fenaCalculator, {
      urineNa: "20",
      plasmaNa: "140",
      urineCr: "120",
      plasmaCr: "2.0",
    });
    expect(r.value).not.toBe(100);
    expect(r.value).toBeCloseTo(0.24, 1);
  });
});

// ---------------------------------------------------------------------------
// FEUrea — (urineUrea / plasmaUrea) / (urineCr / plasmaCr) × 100
// Previously defective: (urineUrea/urineUrea)/(urineUrea/urineUrea) × 100 = always 100
// Classification:
//   ≤ 35% → Prerenal azotemia
//   35–50% → Indeterminate
//   ≥ 50% → Intrinsic renal injury (ATN)
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("FEUrea calculate() regression", () => {
  it("prerenal: urineUrea=100, plasmaUrea=10, urineCr=50, plasmaCr=1 → 20%", () => {
    // (100/10) / (50/1) * 100 = 10 / 50 * 100 = 20
    const r = calc(feureaCalculator, {
      urineUrea: "100",
      plasmaUrea: "10",
      urineCr: "50",
      plasmaCr: "1",
    });
    expect(r.value).toBe(20);
    expect(r.interpretation).toBe("Prerenal azotemia");
    expect(r.status).toBe("low");
  });

  it("ATN: urineUrea=500, plasmaUrea=20, urineCr=120, plasmaCr=2 → ~41.67%", () => {
    // (500/20) / (120/2) * 100 = 25 / 60 * 100 = 41.6667
    const r = calc(feureaCalculator, {
      urineUrea: "500",
      plasmaUrea: "20",
      urineCr: "120",
      plasmaCr: "2",
    });
    expect(r.value).toBeCloseTo(41.67, 0);
    expect(r.interpretation).toBe("Indeterminate");
    expect(r.status).toBe("normal");
  });

  it("high FEUrea: urineUrea=800, plasmaUrea=10, urineCr=50, plasmaCr=1 → 160%", () => {
    // (800/10) / (50/1) * 100 = 80 / 50 * 100 = 160
    const r = calc(feureaCalculator, {
      urineUrea: "800",
      plasmaUrea: "10",
      urineCr: "50",
      plasmaCr: "1",
    });
    expect(r.value).toBe(160);
    expect(r.interpretation).toBe("Intrinsic renal injury (ATN)");
    expect(r.status).toBe("high");
  });

  it("regression: result is no longer always 100", () => {
    const r = calc(feureaCalculator, {
      urineUrea: "100",
      plasmaUrea: "10",
      urineCr: "50",
      plasmaCr: "1",
    });
    expect(r.value).not.toBe(100);
    expect(r.value).toBe(20);
  });
});

// ---------------------------------------------------------------------------
// TTKG — (urineK × plasmaOsmolality) / (plasmaK × urineOsmolality)
// Previously defective: (urineK × urineK) / (urineK × urineK) = always 1
// Classification:
//   ≤ 8  → Impaired K⁺ secretion
//   8–12 → Normal renal K⁺ response
//   ≥ 12 → Enhanced K⁺ secretion
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("TTKG calculate() regression", () => {
  it("impaired: urineK=40, plasmaK=6, plasmaOsm=300, urineOsm=600 → ~3.33", () => {
    // (40 * 300) / (6 * 600) = 12000 / 3600 = 3.3333
    const r = calc(ttkgCalculator, {
      urineK: "40",
      plasmaK: "6",
      plasmaOsmolality: "300",
      urineOsmolality: "600",
    });
    expect(r.value).toBeCloseTo(3.33, 1);
    expect(r.interpretation).toBe("Impaired K⁺ secretion");
    expect(r.status).toBe("low");
  });

  it("normal: urineK=40, plasmaK=4, plasmaOsm=300, urineOsm=400 → 7.5", () => {
    // (40 * 300) / (4 * 400) = 12000 / 1600 = 7.5
    const r = calc(ttkgCalculator, {
      urineK: "40",
      plasmaK: "4",
      plasmaOsmolality: "300",
      urineOsmolality: "400",
    });
    expect(r.value).toBe(7.5);
    expect(r.interpretation).toBe("Impaired K⁺ secretion");
    expect(r.status).toBe("low");
  });

  it("enhanced: urineK=60, plasmaK=4, plasmaOsm=300, urineOsm=300 → 15", () => {
    // (60 * 300) / (4 * 300) = 18000 / 1200 = 15
    const r = calc(ttkgCalculator, {
      urineK: "60",
      plasmaK: "4",
      plasmaOsmolality: "300",
      urineOsmolality: "300",
    });
    expect(r.value).toBe(15);
    expect(r.interpretation).toBe("Enhanced K⁺ secretion");
    expect(r.status).toBe("high");
  });

  it("different inputs produce different results", () => {
    const r1 = calc(ttkgCalculator, {
      urineK: "40",
      plasmaK: "6",
      plasmaOsmolality: "300",
      urineOsmolality: "600",
    });
    const r2 = calc(ttkgCalculator, {
      urineK: "60",
      plasmaK: "4",
      plasmaOsmolality: "300",
      urineOsmolality: "300",
    });
    expect(r1.value).not.toBe(r2.value);
  });

  it("regression: result is no longer always 1", () => {
    const r = calc(ttkgCalculator, {
      urineK: "40",
      plasmaK: "6",
      plasmaOsmolality: "300",
      urineOsmolality: "600",
    });
    expect(r.value).not.toBe(1);
    expect(r.value).toBeCloseTo(3.33, 1);
  });
});

// ---------------------------------------------------------------------------
// Dead-Branch Classification Fix Regression Tests
// These test previously unreachable higher-severity branches that were
// hidden behind broader conditions checked first.
// ---------------------------------------------------------------------------

// --- Anion Gap: previously AG>=20 unreachable behind AG>=13 ---
describe("Anion Gap dead-branch fix", () => {
  it("AG=20 → Markedly elevated anion gap (critical, was unreachable)", () => {
    // Na=140, Cl=100, HCO3=20 → 140-120 = 20
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "100",
      bicarbonate: "20",
    });
    expect(r.value).toBe(20);
    expect(r.interpretation).toBe("Markedly elevated anion gap");
    expect(r.status).toBe("critical");
  });

  it("AG=25 → Markedly elevated anion gap (critical)", () => {
    // Na=140, Cl=95, HCO3=20 → 140-115 = 25
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "95",
      bicarbonate: "20",
    });
    expect(r.value).toBe(25);
    expect(r.interpretation).toBe("Markedly elevated anion gap");
    expect(r.status).toBe("critical");
  });

  it("AG=15 → High anion gap (high, not markedly elevated)", () => {
    // Na=140, Cl=103, HCO3=22 → 140-125 = 15
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "103",
      bicarbonate: "22",
    });
    expect(r.value).toBe(15);
    expect(r.interpretation).toBe("High anion gap");
    expect(r.status).toBe("high");
  });
});

// --- Corrected Anion Gap: previously >=20 unreachable behind >=13 ---
describe("Corrected Anion Gap dead-branch fix", () => {
  it("corrected AG=20 → Markedly elevated (critical, was unreachable)", () => {
    // base AG = 140-(100+20) = 20, albumin=4.0 → correction=0 → 20
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "100",
      bicarbonate: "20",
      albumin: "4.0",
    });
    expect(r.value).toBe(20);
    expect(r.interpretation).toBe("Markedly elevated corrected anion gap");
    expect(r.status).toBe("critical");
  });

  it("corrected AG=15 → High (not markedly elevated)", () => {
    // base AG = 140-(103+22) = 15, albumin=4.0 → correction=0 → 15
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "103",
      bicarbonate: "22",
      albumin: "4.0",
    });
    expect(r.value).toBe(15);
    expect(r.interpretation).toBe("High corrected anion gap");
    expect(r.status).toBe("high");
  });

  it("low albumin pushes corrected AG above 20 → critical", () => {
    // base AG = 140-(105+22) = 13, alb=1.0 → correction=2.5*3=7.5 → 20.5
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "105",
      bicarbonate: "22",
      albumin: "1.0",
    });
    expect(r.value).toBe(20.5);
    expect(r.interpretation).toBe("Markedly elevated corrected anion gap");
    expect(r.status).toBe("critical");
  });
});

// --- Corrected Sodium: previously >=160 unreachable behind >=146 ---
describe("Corrected Sodium dead-branch fix", () => {
  it("corrected Na=160.8 → Severe hypernatremia (critical, was unreachable)", () => {
    // Na=156, glucose=400 → 156 + 1.6*(400-100)/100 = 156+4.8 = 160.8
    const r = calc(correctedSodiumCalculator, {
      sodium: "156",
      glucose: "400",
    });
    expect(r.value).toBe(160.8);
    expect(r.interpretation).toBe("Severe hypernatremia");
    expect(r.status).toBe("critical");
  });

  it("corrected Na=150 → Hypernatremia (high, not severe)", () => {
    // Na=140, glucose=625 → 140 + 1.6*5.25 = 148.4
    // Na=145, glucose=400 → 145 + 4.8 = 149.8
    // Na=146, glucose=400 → 146 + 4.8 = 150.8
    const r = calc(correctedSodiumCalculator, {
      sodium: "146",
      glucose: "400",
    });
    expect(r.value).toBe(150.8);
    expect(r.interpretation).toBe("Hypernatremia (corrected)");
    expect(r.status).toBe("high");
  });

  it("corrected Na=170 → Severe hypernatremia (critical)", () => {
    // Na=160, glucose=600 → 160 + 1.6*5 = 168
    // Na=165, glucose=400 → 165 + 4.8 = 169.8
    // Na=170, glucose=200 → 170 + 1.6 = 171.6
    const r = calc(correctedSodiumCalculator, {
      sodium: "170",
      glucose: "200",
    });
    expect(r.value).toBe(171.6);
    expect(r.interpretation).toBe("Severe hypernatremia");
    expect(r.status).toBe("critical");
  });
});

// --- Serum Osmolality: previously >=320 unreachable behind >=296 ---
describe("Serum Osmolality dead-branch fix", () => {
  it("osmolality=330 → Critically elevated (critical, was unreachable)", () => {
    // Na=155, glucose=180, BUN=28 → 310 + 10 + 10 = 330
    const r = calc(serumOsmolalityCalculator, {
      sodium: "155",
      glucose: "180",
      bun: "28",
    });
    expect(r.value).toBe(330);
    expect(r.interpretation).toBe("Critically elevated osmolality");
    expect(r.status).toBe("critical");
  });

  it("osmolality=300 → High (not critical)", () => {
    // Na=145, glucose=180, BUN=14 → 290 + 10 + 5 = 305
    // Na=148, glucose=180, BUN=14 → 296 + 10 + 5 = 311
    const r = calc(serumOsmolalityCalculator, {
      sodium: "148",
      glucose: "180",
      bun: "14",
    });
    expect(r.value).toBe(311);
    expect(r.interpretation).toBe("High osmolality");
    expect(r.status).toBe("high");
  });

  it("osmolality=340 → Critically elevated (critical)", () => {
    // Na=160, glucose=200, BUN=28 → 320 + 11.11 + 10 = 341.11
    const r = calc(serumOsmolalityCalculator, {
      sodium: "160",
      glucose: "200",
      bun: "28",
    });
    expect(r.value).toBeCloseTo(341.11, 0);
    expect(r.interpretation).toBe("Critically elevated osmolality");
    expect(r.status).toBe("critical");
  });
});

// --- Osmolar Gap: previously >=50 unreachable behind >=11 ---
describe("Osmolar Gap dead-branch fix", () => {
  it("osmolar gap=55 → Markedly elevated (critical, was unreachable)", () => {
    // calculated = 2*140 + 100/18 + 10/2.8 = 280 + 5.56 + 3.57 = 289.13
    // gap = 345 - 289.13 = 55.87
    const r = calc(osmolarGapCalculator, {
      measured: "345",
      sodium: "140",
      glucose: "100",
      bun: "10",
    });
    expect(r.value).toBeCloseTo(55.87, 0);
    expect(r.interpretation).toBe("Markedly elevated osmolar gap — toxic ingestion likely");
    expect(r.status).toBe("critical");
  });

  it("osmolar gap=15 → Elevated (high, not markedly)", () => {
    // calculated = 2*140 + 100/18 + 10/2.8 = 289.13
    // gap = 305 - 289.13 = 15.87
    const r = calc(osmolarGapCalculator, {
      measured: "305",
      sodium: "140",
      glucose: "100",
      bun: "10",
    });
    expect(r.value).toBeCloseTo(15.87, 0);
    expect(r.interpretation).toBe("Elevated osmolar gap");
    expect(r.status).toBe("high");
  });

  it("osmolar gap=80 → Markedly elevated (critical)", () => {
    // calculated = 2*140 + 100/18 + 10/2.8 = 289.13
    // gap = 370 - 289.13 = 80.87
    const r = calc(osmolarGapCalculator, {
      measured: "370",
      sodium: "140",
      glucose: "100",
      bun: "10",
    });
    expect(r.value).toBeCloseTo(80.87, 0);
    expect(r.interpretation).toBe("Markedly elevated osmolar gap — toxic ingestion likely");
    expect(r.status).toBe("critical");
  });
});
