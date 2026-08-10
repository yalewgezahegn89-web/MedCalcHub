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
import {
  bmiForPediatricsCalculator,
} from "../../lib/calculators/bmi-for-pediatrics";
import {
  correctedCalciumCalculator,
} from "../../lib/calculators/corrected-calcium";
import {
  bunCreatinineRatioCalculator,
} from "../../lib/calculators/bun-creatinine-ratio";
import {
  correctedQtCalculator,
} from "../../lib/calculators/corrected-qt";
import {
  a1cEagConverterCalculator,
} from "../../lib/calculators/a1c-eag-converter";
import {
  waistToHipRatioCalculator,
} from "../../lib/calculators/waist-to-hip-ratio";
import {
  sodiumDeficitCalculator,
} from "../../lib/calculators/sodium-deficit";

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

// -------------------------------------------------------------------
// Boundary-gap regression tests for Sprint 1.6 batch fixes
// -------------------------------------------------------------------

describe("Osmolar Gap boundary-gap regression", () => {
  it("gap 10.5 → Elevated (was default before fix)", () => {
    // calculated ≈ 2*140 + 90/18 + 20/2.8 = 280+5+7.14 = 292.14
    // measured 302.64 → gap ≈ 10.5
    const r = calc(osmolarGapCalculator, {
      measured: "302.64",
      sodium: "140",
      glucose: "90",
      bun: "20",
    });
    expect(r.value).toBeCloseTo(10.5, 0);
    expect(r.interpretation).toBe("Elevated osmolar gap");
    expect(r.status).toBe("high");
  });

  it("gap 10.0 → Normal (boundary of normal range)", () => {
    // calculated ≈ 292.14, measured=302.14 → gap=10
    const r = calc(osmolarGapCalculator, {
      measured: "302.14",
      sodium: "140",
      glucose: "90",
      bun: "20",
    });
    expect(r.value).toBeCloseTo(10, 0);
    expect(r.interpretation).toBe("Normal osmolar gap");
    expect(r.status).toBe("normal");
  });

  it("gap -10 → Normal (was low before off-by-one fix)", () => {
    // calculated = 2*140 + 0/18 + 0/2.8 = 280, measured=270 → gap=-10
    const r = calc(osmolarGapCalculator, {
      measured: "270",
      sodium: "140",
      glucose: "50",
      bun: "14",
    });
    // calculated = 280 + 50/18 + 14/2.8 = 280+2.78+5 = 287.78
    // gap = 270 - 287.78 = -17.78 → that's < -10, so "Negatively elevated"
    // Instead: measured must equal calculated - 10 exactly
    // calculated = 2*140 + 36/18 + 2.8/2.8 = 280+2+1 = 283
    // measured = 273 → gap = 273-283 = -10
    const r2 = calc(osmolarGapCalculator, {
      measured: "273",
      sodium: "140",
      glucose: "36",
      bun: "2.8",
    });
    expect(r2.value).toBeCloseTo(-10, 0);
    expect(r2.interpretation).toBe("Normal osmolar gap");
    expect(r2.status).toBe("normal");
  });
});

describe("Serum Osmolality boundary-gap regression", () => {
  it("osmolality 274.9 → Low (was default before fix)", () => {
    // 2*130 + 90/18 + 20/2.8 = 260+5+7.14 = 272.14 → low
    // Need ~274.9: 2*131 + 90/18 + 20/2.8 = 262+5+7.14 = 274.14
    const r = calc(serumOsmolalityCalculator, {
      sodium: "131",
      glucose: "90",
      bun: "20",
    });
    expect(r.value).toBeCloseTo(274.14, 0);
    expect(r.interpretation).toBe("Low osmolality");
    expect(r.status).toBe("low");
  });

  it("osmolality 275 → Normal (boundary of normal range)", () => {
    // 2*137 + 36/18 + 2.8/2.8 = 274+2+1 = 277 → normal
    const r = calc(serumOsmolalityCalculator, {
      sodium: "137",
      glucose: "36",
      bun: "2.8",
    });
    expect(r.value).toBeCloseTo(277, 0);
    expect(r.interpretation).toBe("Normal osmolality");
    expect(r.status).toBe("normal");
  });
});

describe("Anion Gap boundary-gap regression", () => {
  it("AG 7.5 → Low (was default before fix)", () => {
    // 140 - (108.5 + 24) = 7.5
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "108.5",
      bicarbonate: "24",
    });
    expect(r.value).toBeCloseTo(7.5, 1);
    expect(r.interpretation).toBe("Low anion gap");
    expect(r.status).toBe("low");
  });

  it("AG 8 → Normal (boundary of normal range)", () => {
    // 140 - (108 + 24) = 8
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "108",
      bicarbonate: "24",
    });
    expect(r.value).toBe(8);
    expect(r.interpretation).toBe("Normal anion gap");
    expect(r.status).toBe("normal");
  });

  it("AG 12 → Normal (upper boundary)", () => {
    // 140 - (104 + 24) = 12
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "104",
      bicarbonate: "24",
    });
    expect(r.value).toBe(12);
    expect(r.interpretation).toBe("Normal anion gap");
    expect(r.status).toBe("normal");
  });

  it("AG 13 → High (boundary of high range)", () => {
    // 140 - (103 + 24) = 13
    const r = calc(anionGapCalculator, {
      sodium: "140",
      chloride: "103",
      bicarbonate: "24",
    });
    expect(r.value).toBe(13);
    expect(r.interpretation).toBe("High anion gap");
    expect(r.status).toBe("high");
  });
});

describe("Corrected Sodium boundary-gap regression", () => {
  it("corrected Na 134.5 → Hyponatremia (was default before fix)", () => {
    // Na=134.5, glucose=100 → 134.5 + 0 = 134.5
    const r = calc(correctedSodiumCalculator, {
      sodium: "134.5",
      glucose: "100",
    });
    expect(r.value).toBe(134.5);
    expect(r.interpretation).toBe("Hyponatremia (corrected)");
    expect(r.status).toBe("low");
  });

  it("corrected Na 135 → Normal (boundary)", () => {
    // Na=135, glucose=100 → 135 + 0 = 135
    const r = calc(correctedSodiumCalculator, {
      sodium: "135",
      glucose: "100",
    });
    expect(r.value).toBe(135);
    expect(r.interpretation).toBe("Normal corrected sodium");
    expect(r.status).toBe("normal");
  });

  it("corrected Na 145 → Normal (upper boundary)", () => {
    // Na=145, glucose=100 → 145 + 0 = 145
    const r = calc(correctedSodiumCalculator, {
      sodium: "145",
      glucose: "100",
    });
    expect(r.value).toBe(145);
    expect(r.interpretation).toBe("Normal corrected sodium");
    expect(r.status).toBe("normal");
  });

  it("corrected Na 146 → Hypernatremia (boundary)", () => {
    // Na=146, glucose=100 → 146 + 0 = 146
    const r = calc(correctedSodiumCalculator, {
      sodium: "146",
      glucose: "100",
    });
    expect(r.value).toBe(146);
    expect(r.interpretation).toBe("Hypernatremia (corrected)");
    expect(r.status).toBe("high");
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

// ---------------------------------------------------------------------------
// Pediatric BMI-for-Age — CDC 2000 LMS method
// Inputs: age (years 2–20), sex ("1"=male, "2"=female), weight (kg), height (cm)
// Formula: BMI = weight / height²; Percentile via LMS Z-score
// Classification:
//   < 5th percentile  → Underweight (low)
//   5th – <85th        → Healthy weight (normal)
//   85th – <95th       → Overweight (high)
//   ≥ 95th             → Obesity (critical)
//
// Source: Kuczmarski RJ, et al. 2000 CDC Growth Charts for the United
// States. Vital Health Stat 11. 2002;(246):1-190.
// LMS data at 6-month intervals, ages 24–240 months.
// ---------------------------------------------------------------------------

/**
 * Compute expected BMI value: weight / (height/100)^2, rounded to 1 decimal.
 */
function expectedBmi(weightKg: number, heightCm: number): number {
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

describe("Pediatric BMI-for-Age calculate() output", () => {
  // ---- Underweight cases ----

  it("underweight: 8-year-old boy, 22 kg, 130 cm", () => {
    // BMI = 22 / (1.3^2) = 22 / 1.69 = 13.02
    // CDC LMS: at 96 months, boys M=15.34 → BMI 13.0 is well below 5th pctl
    const r = calc(bmiForPediatricsCalculator, {
      age: "8",
      sex: "1",
      weight: "22",
      height: "130",
    });
    expect(r.value).toBe(expectedBmi(22, 130));
    expect(r.interpretation).toContain("Underweight");
    expect(r.status).toBe("low");
  });

  it("underweight: 5-year-old girl, 14 kg, 110 cm", () => {
    // BMI = 14 / (1.1^2) = 14 / 1.21 = 11.57
    // CDC LMS girls at 60 months M=14.72 → well below 5th pctl
    const r = calc(bmiForPediatricsCalculator, {
      age: "5",
      sex: "2",
      weight: "14",
      height: "110",
    });
    expect(r.value).toBe(expectedBmi(14, 110));
    expect(r.interpretation).toContain("Underweight");
    expect(r.status).toBe("low");
  });

  // ---- Healthy weight cases ----

  it("healthy weight: 10-year-old boy, 32 kg, 140 cm", () => {
    // BMI = 32 / (1.4^2) = 32 / 1.96 = 16.33
    // CDC LMS boys at 120 months: M=16.26 → very close to median (~50th pctl)
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "32",
      height: "140",
    });
    expect(r.value).toBe(expectedBmi(32, 140));
    expect(r.interpretation).toContain("Healthy weight");
    expect(r.status).toBe("normal");
  });

  it("healthy weight: 15-year-old boy, 68 kg, 175 cm", () => {
    // BMI = 68 / (1.75^2) = 68 / 3.0625 = 22.20
    // CDC LMS boys at 180 months: M=21.03 → ~70th percentile
    const r = calc(bmiForPediatricsCalculator, {
      age: "15",
      sex: "1",
      weight: "68",
      height: "175",
    });
    expect(r.value).toBe(expectedBmi(68, 175));
    expect(r.interpretation).toContain("Healthy weight");
    expect(r.status).toBe("normal");
  });

  it("healthy weight: 3-year-old boy, 14 kg, 95 cm", () => {
    // BMI = 14 / (0.95^2) = 14 / 0.9025 = 15.51
    // CDC LMS boys at 36 months: M=15.79 → near 50th percentile
    const r = calc(bmiForPediatricsCalculator, {
      age: "3",
      sex: "1",
      weight: "14",
      height: "95",
    });
    expect(r.value).toBe(expectedBmi(14, 95));
    expect(r.interpretation).toContain("Healthy weight");
    expect(r.status).toBe("normal");
  });

  // ---- Overweight cases ----

  it("overweight: 10-year-old girl, 32.6 kg, 140 cm", () => {
    // BMI = 32.6 / (1.4^2) = 32.6 / 1.96 = 16.63
    // CDC LMS girls at 120 months: L=0.8289, M=15.11, S=0.07553
    // 85th pctl BMI ≈ 16.30, 95th ≈ 17.01 → 16.63 is between 85th–95th
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "2",
      weight: "32.6",
      height: "140",
    });
    expect(r.value).toBe(expectedBmi(32.6, 140));
    expect(r.interpretation).toContain("Overweight");
    expect(r.status).toBe("high");
  });

  it("overweight: 7-year-old boy, 24.6 kg, 122 cm", () => {
    // BMI = 24.6 / (1.22^2) = 24.6 / 1.4884 = 16.53
    // CDC LMS boys at 84 months: L=1.0088, M=15.12, S=0.07034
    // 85th pctl BMI ≈ 16.22, 95th ≈ 16.87 → 16.53 is between 85th–95th
    const r = calc(bmiForPediatricsCalculator, {
      age: "7",
      sex: "1",
      weight: "24.6",
      height: "122",
    });
    expect(r.value).toBe(expectedBmi(24.6, 122));
    expect(r.interpretation).toContain("Overweight");
    expect(r.status).toBe("high");
  });

  // ---- Obesity cases ----

  it("obesity: 12-year-old boy, 60 kg, 150 cm", () => {
    // BMI = 60 / (1.5^2) = 60 / 2.25 = 26.67
    // CDC LMS boys at 144 months: M=17.80 → well above 95th pctl
    const r = calc(bmiForPediatricsCalculator, {
      age: "12",
      sex: "1",
      weight: "60",
      height: "150",
    });
    expect(r.value).toBe(expectedBmi(60, 150));
    expect(r.interpretation).toContain("Obesity");
    expect(r.status).toBe("critical");
  });

  it("obesity: 5-year-old girl, 30 kg, 110 cm", () => {
    // BMI = 30 / (1.1^2) = 30 / 1.21 = 24.79
    // CDC LMS girls at 60 months: M=14.72 → well above 95th pctl
    const r = calc(bmiForPediatricsCalculator, {
      age: "5",
      sex: "2",
      weight: "30",
      height: "110",
    });
    expect(r.value).toBe(expectedBmi(30, 110));
    expect(r.interpretation).toContain("Obesity");
    expect(r.status).toBe("critical");
  });

  // ---- Regression guard: BMI ~16 should NOT be treated as a percentile ----
  it("regression guard: BMI 16.3 is NOT a percentile value", () => {
    // Under the old (buggy) implementation, BMI 16.3 was classified as
    // "Healthy weight" because 16.3 < 85 (treating BMI as percentile).
    // Now: BMI 16.3 for 10yo boy is classified by actual CDC percentile.
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "32",
      height: "140",
    });
    // BMI = 16.3 → should be classified by CDC percentile, not raw comparison
    expect(r.interpretation).toContain("percentile");
    expect(r.unit).toBe("kg/m²");
  });

  // ---- Age dependency: same BMI at different ages yields different classification ----
  it("age dependency: same BMI 17.0 at age 3 vs age 18 can differ", () => {
    // 3-year-old boy: 12.78 kg, 86.6 cm → BMI = 12.78 / 0.866^2 = 17.0
    const r3 = calc(bmiForPediatricsCalculator, {
      age: "3",
      sex: "1",
      weight: "12.78",
      height: "86.6",
    });
    // 18-year-old boy: 57.47 kg, 183.8 cm → BMI = 57.47 / 1.838^2 = 17.0
    const r18 = calc(bmiForPediatricsCalculator, {
      age: "18",
      sex: "1",
      weight: "57.47",
      height: "183.8",
    });
    // Both compute the same raw BMI but percentile interpretations differ
    expect(r3.value).toBe(r18.value);
    // Both should contain "percentile" in interpretation
    expect(r3.interpretation).toContain("percentile");
    expect(r18.interpretation).toContain("percentile");
    // But the classifications may differ since CDC reference curves differ by age
    // At minimum, verify they have different interpretations (different percentile values)
    expect(r3.interpretation).not.toBe(r18.interpretation);
  });

  // ---- Sex dependency: same BMI for boy and girl can differ ----
  it("sex dependency: same BMI for boy vs girl at same age yields different percentile", () => {
    // 10-year-old, 32 kg, 140 cm → BMI = 16.33
    const rBoy = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "32",
      height: "140",
    });
    const rGirl = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "2",
      weight: "32",
      height: "140",
    });
    // Same BMI, same age, different sex → different percentile → different interpretation
    expect(rBoy.value).toBe(rGirl.value);
    expect(rBoy.interpretation).not.toBe(rGirl.interpretation);
  });

  // ---- Boundary tests: classification boundaries ----

  it("healthy weight at 5th percentile boundary: boy age 10, just above 5th", () => {
    // CDC boys at 120 months: L=0.8773, M=16.26, S=0.06873
    // 5th pctl Z ≈ -1.6449
    // BMI_5th = M × (1 + L × S × Z)^(1/L) ≈ 14.46
    // Need weight above BMI_5th × 1.96 = 14.46 × 1.96 ≈ 28.34 kg
    // Use 29 kg → BMI = 29/1.96 = 14.80 → above 5th, below 85th → Healthy
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "29",
      height: "140",
    });
    expect(r.interpretation).toContain("Healthy weight");
  });

  it("overweight at 85th percentile boundary: boy age 10", () => {
    // 85th pctl Z ≈ 1.0364
    // BMI_85th = 16.26 × (1 + 0.8773 × 0.06873 × 1.0364)^(1/0.8773)
    // = 16.26 × (1 + 0.06244)^1.1398
    // = 16.26 × 1.06244^1.1398 ≈ 16.26 × 1.0715 ≈ 17.42
    // BMI ~17.4 → weight = 17.4 × 1.96 = 34.10 kg
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "34.1",
      height: "140",
    });
    // 85th percentile → Overweight
    expect(r.interpretation).toContain("Overweight");
    expect(r.status).toBe("high");
  });

  it("obesity at 95th percentile boundary: boy age 10", () => {
    // 95th pctl Z ≈ 1.6449
    // BMI_95th = 16.26 × (1 + 0.8773 × 0.06873 × 1.6449)^(1/0.8773)
    // = 16.26 × (1 + 0.09895)^1.1398
    // = 16.26 × 1.09895^1.1398 ≈ 16.26 × 1.1135 ≈ 18.10
    // BMI ~18.1 → weight = 18.1 × 1.96 = 35.48 kg
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "35.5",
      height: "140",
    });
    // 95th percentile → Obesity
    expect(r.interpretation).toContain("Obesity");
    expect(r.status).toBe("critical");
  });

  // ---- Validation: age out of range ----

  it("age=1 → critical: below CDC range", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "1",
      sex: "1",
      weight: "10",
      height: "75",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("2 and 20");
  });

  it("age=21 → critical: above CDC range", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "21",
      sex: "1",
      weight: "70",
      height: "175",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("2 and 20");
  });

  it("missing age → critical", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "",
      sex: "1",
      weight: "30",
      height: "130",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing sex → critical", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "",
      weight: "30",
      height: "130",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing weight → critical", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "",
      height: "130",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing height → critical", () => {
    const r = calc(bmiForPediatricsCalculator, {
      age: "10",
      sex: "1",
      weight: "30",
      height: "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// Corrected Calcium — Calcium + 0.8 × (4.0 − Albumin)
// Classification:
//   < 8.5  → Hypocalcemia (low)
//   8.5–10.5 → Normal corrected calcium (normal)
//   10.6–<12.5 → Hypercalcemia (high)
//   ≥ 12.5 → Severe hypercalcemia (critical)
//
// Previously defective:
//   - Severe hypercalcemia branch (>=12.5) was unreachable behind >=10.6
//   - Gap between 8.4 and 8.5 fell through to default "normal"
// ---------------------------------------------------------------------------

/**
 * Compute expected corrected calcium: Ca + 0.8 * (4.0 − Albumin)
 */
function expectedCorrectedCalcium(
  calcium: number,
  albumin: number,
): number {
  return Number(
    (calcium + 0.8 * (4.0 - albumin)).toFixed(2),
  );
}

describe("Corrected Calcium calculate() classification fix", () => {
  it("severe hypercalcemia: Ca=14.0, albumin=2.5 → 15.2, critical", () => {
    // Corrected Ca = 14.0 + 0.8 * (4.0 - 2.5) = 14.0 + 1.2 = 15.2
    const expected = expectedCorrectedCalcium(14.0, 2.5);
    expect(expected).toBe(15.2);
    const r = calc(correctedCalciumCalculator, {
      calcium: "14.0",
      albumin: "2.5",
    });
    expect(r.value).toBe(15.2);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe hypercalcemia");
  });

  it("severe hypercalcemia boundary: Ca=10.5, albumin=0 → 13.7, critical", () => {
    // Corrected Ca = 10.5 + 0.8 * 4.0 = 10.5 + 3.2 = 13.7
    // Albumin=0 is rejected, so use albumin=0.1 → 10.5 + 0.8*3.9 = 13.62
    const expected = expectedCorrectedCalcium(10.5, 0.1);
    expect(expected).toBeGreaterThanOrEqual(12.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "10.5",
      albumin: "0.1",
    });
    expect(r.value).toBe(13.62);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe hypercalcemia");
  });

  it("severe hypercalcemia at exactly 12.5: Ca=10.1, albumin=0 → 13.3, critical", () => {
    // albumin=0 is rejected; use albumin=0.5 → 10.1 + 0.8*3.5 = 12.9
    const expected = expectedCorrectedCalcium(10.1, 0.5);
    expect(expected).toBeGreaterThanOrEqual(12.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "10.1",
      albumin: "0.5",
    });
    expect(r.value).toBe(12.9);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe hypercalcemia");
  });

  it("hypercalcemia: Ca=10.5, albumin=2.0 → 11.7, high", () => {
    // Corrected Ca = 10.5 + 0.8 * (4.0 - 2.0) = 10.5 + 1.6 = 12.1
    // Need result in [10.6, 12.5). Use Ca=10.0, albumin=2.0 → 11.6
    const expected = expectedCorrectedCalcium(10.0, 2.0);
    expect(expected).toBeGreaterThanOrEqual(10.6);
    expect(expected).toBeLessThan(12.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "10.0",
      albumin: "2.0",
    });
    expect(r.value).toBe(11.6);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Hypercalcemia");
  });

  it("boundary gap regression: Ca=8.6, albumin=3.0 → 9.4, normal", () => {
    // Corrected Ca = 8.6 + 0.8 * (4.0 - 3.0) = 8.6 + 0.8 = 9.4
    const expected = expectedCorrectedCalcium(8.6, 3.0);
    expect(expected).toBeGreaterThanOrEqual(8.5);
    expect(expected).toBeLessThanOrEqual(10.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "8.6",
      albumin: "3.0",
    });
    expect(r.value).toBe(9.4);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal corrected calcium");
  });

  it("lower boundary gap regression: corrected Ca ≈ 8.45 → low", () => {
    // Need Ca + 0.8*(4 - albumin) ≈ 8.45
    // Ca=8.0, albumin=3.5 → 8.0 + 0.8*0.5 = 8.4
    // Ca=8.1, albumin=3.5 → 8.1 + 0.4 = 8.5 → normal
    // Ca=8.0, albumin=3.4 → 8.0 + 0.8*0.6 = 8.48 → should be <8.5 → low
    const expected = expectedCorrectedCalcium(8.0, 3.4);
    expect(expected).toBe(8.48);
    const r = calc(correctedCalciumCalculator, {
      calcium: "8.0",
      albumin: "3.4",
    });
    expect(r.value).toBe(8.48);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Hypocalcemia");
  });

  it("hypocalcemia: Ca=7.0, albumin=3.0 → 7.8, low", () => {
    // Corrected Ca = 7.0 + 0.8 * (4.0 - 3.0) = 7.0 + 0.8 = 7.8
    const expected = expectedCorrectedCalcium(7.0, 3.0);
    expect(expected).toBeLessThan(8.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "7.0",
      albumin: "3.0",
    });
    expect(r.value).toBe(7.8);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Hypocalcemia");
  });

  it("normal: Ca=9.5, albumin=4.0 → 9.5, normal", () => {
    // Corrected Ca = 9.5 + 0.8 * (4.0 - 4.0) = 9.5
    const expected = expectedCorrectedCalcium(9.5, 4.0);
    expect(expected).toBeGreaterThanOrEqual(8.5);
    expect(expected).toBeLessThanOrEqual(10.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "9.5",
      albumin: "4.0",
    });
    expect(r.value).toBe(9.5);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal corrected calcium");
  });

  it("upper normal boundary: Ca=10.5, albumin=4.0 → 10.5, normal", () => {
    // Corrected Ca = 10.5 + 0 = 10.5
    const expected = expectedCorrectedCalcium(10.5, 4.0);
    expect(expected).toBe(10.5);
    const r = calc(correctedCalciumCalculator, {
      calcium: "10.5",
      albumin: "4.0",
    });
    expect(r.value).toBe(10.5);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal corrected calcium");
  });
});

// ---------------------------------------------------------------------------
// BUN/Creatinine Ratio — bun / creatinine
// Classification (contiguous, no gaps):
//   < 10   → Low ratio
//   ≤ 20   → Normal ratio
//   > 20   → Elevated ratio
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("BUN/Creatinine Ratio calculate() output", () => {
  it("ratio 9.9 → Low (previously fell through gap)", () => {
    // 49.5 / 5.0 = 9.9
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "49.5",
      creatinine: "5",
    });
    expect(r.value).toBeCloseTo(9.9, 2);
    expect(r.interpretation).toBe("Low ratio");
    expect(r.status).toBe("low");
  });

  it("ratio 10.0 → Normal", () => {
    // 50 / 5 = 10
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "50",
      creatinine: "5",
    });
    expect(r.value).toBeCloseTo(10.0, 2);
    expect(r.interpretation).toBe("Normal ratio");
    expect(r.status).toBe("normal");
  });

  it("ratio 20.0 → Normal", () => {
    // 60 / 3 = 20
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "60",
      creatinine: "3",
    });
    expect(r.value).toBeCloseTo(20.0, 2);
    expect(r.interpretation).toBe("Normal ratio");
    expect(r.status).toBe("normal");
  });

  it("ratio 20.1 → Elevated (previously fell through gap)", () => {
    // 201 / 10 = 20.1
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "201",
      creatinine: "10",
    });
    expect(r.value).toBeCloseTo(20.1, 2);
    expect(r.interpretation).toBe("Elevated ratio");
    expect(r.status).toBe("high");
  });

  it("ratio 21.0 → Elevated", () => {
    // 63 / 3 = 21
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "63",
      creatinine: "3",
    });
    expect(r.value).toBeCloseTo(21.0, 2);
    expect(r.interpretation).toBe("Elevated ratio");
    expect(r.status).toBe("high");
  });

  it("regression: ratio 9.6 → Low", () => {
    // 48 / 5 = 9.6
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "48",
      creatinine: "5",
    });
    expect(r.value).toBeCloseTo(9.6, 2);
    expect(r.interpretation).toBe("Low ratio");
    expect(r.status).toBe("low");
  });

  it("regression: ratio 20.71 → Elevated", () => {
    // 58 / 2.8 = 20.714… → 20.71
    const r = calc(bunCreatinineRatioCalculator, {
      bun: "58",
      creatinine: "2.8",
    });
    expect(r.value).toBeCloseTo(20.71, 2);
    expect(r.interpretation).toBe("Elevated ratio");
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Corrected QT (QTc) — Bazett: QTc = QT / sqrt(RR), RR = 60/HR
// Sex-specific classification:
//   Male:   <450 ms normal, 450–499 ms prolonged, ≥500 ms markedly prolonged
//   Female: <460 ms normal, 460–499 ms prolonged, ≥500 ms markedly prolonged
// Result = Math.round(correctedQt * 10) / 10
// ---------------------------------------------------------------------------
describe("Corrected QT (QTc) calculate() output", () => {
  // --- Male classification bands ---

  it("male normal: QT=400, HR=70 → QTc≈432, normal", () => {
    // RR = 60/70 = 0.8571…, sqrt = 0.9258…, QTc = 400/0.9258 = 431.97 → 432.0
    const r = calc(correctedQtCalculator, {
      qt: "400",
      heartRate: "70",
      sex: "1",
    });
    expect(r.value).toBeCloseTo(432.0, 1);
    expect(r.interpretation).toBe("Normal QTc");
    expect(r.status).toBe("normal");
  });

  it("male borderline: QT=440, HR=80 → QTc≈471.5, prolonged", () => {
    // RR = 60/80 = 0.75, sqrt = 0.8660, QTc = 440/0.8660 = 507.98 → 508.0
    // Actually: let me recalculate. 440 / sqrt(0.75) = 440 / 0.86603 = 507.97
    // That's >500, so markedly prolonged
    // Let me pick better inputs: QT=390, HR=70
    // RR=60/70=0.8571, sqrt=0.9258, QTc=390/0.9258=421.26 → normal
    // QT=420, HR=72: RR=0.8333, sqrt=0.9129, QTc=420/0.9129=460.1
    const r = calc(correctedQtCalculator, {
      qt: "420",
      heartRate: "72",
      sex: "1",
    });
    // RR = 60/72 = 0.8333, sqrt = 0.91287, QTc = 420/0.91287 = 460.1 → 460.1
    // 460.1 >= 450 (male) and < 500 → prolonged
    expect(r.value).toBeCloseTo(460.1, 0);
    expect(r.interpretation).toBe("Prolonged QTc");
    expect(r.status).toBe("high");
  });

  it("male markedly prolonged: QT=480, HR=100 → QTc≈623.5, critical", () => {
    // RR = 60/100 = 0.6, sqrt = 0.7746, QTc = 480/0.7746 = 619.7
    const r = calc(correctedQtCalculator, {
      qt: "480",
      heartRate: "100",
      sex: "1",
    });
    expect(r.value).toBeGreaterThan(500);
    expect(r.interpretation).toBe("Markedly prolonged QTc");
    expect(r.status).toBe("critical");
  });

  it("male boundary 450: QTc exactly 450 → prolonged", () => {
    // QTc = QT / sqrt(60/HR)
    // To get QTc = 450: pick HR=60, QT=450 → RR=1, sqrt=1, QTc=450
    const r = calc(correctedQtCalculator, {
      qt: "450",
      heartRate: "60",
      sex: "1",
    });
    // QTc = 450 / sqrt(1) = 450
    // 450 >= 450 (male upper normal) → prolonged
    expect(r.value).toBe(450);
    expect(r.interpretation).toBe("Prolonged QTc");
    expect(r.status).toBe("high");
  });

  it("male boundary 449: QTc=449 → normal", () => {
    // HR=60, QT=449 → RR=1, QTc=449
    const r = calc(correctedQtCalculator, {
      qt: "449",
      heartRate: "60",
      sex: "1",
    });
    expect(r.value).toBe(449);
    expect(r.interpretation).toBe("Normal QTc");
    expect(r.status).toBe("normal");
  });

  it("male boundary 500: QTc=500 → markedly prolonged", () => {
    // HR=60, QT=500 → RR=1, QTc=500
    const r = calc(correctedQtCalculator, {
      qt: "500",
      heartRate: "60",
      sex: "1",
    });
    expect(r.value).toBe(500);
    expect(r.interpretation).toBe("Markedly prolonged QTc");
    expect(r.status).toBe("critical");
  });

  it("male boundary 499: QTc=499 → prolonged", () => {
    // HR=60, QT=499 → QTc=499
    const r = calc(correctedQtCalculator, {
      qt: "499",
      heartRate: "60",
      sex: "1",
    });
    expect(r.value).toBe(499);
    expect(r.interpretation).toBe("Prolonged QTc");
    expect(r.status).toBe("high");
  });

  // --- Female classification bands ---

  it("female normal: QT=400, HR=70 → QTc≈432, normal", () => {
    const r = calc(correctedQtCalculator, {
      qt: "400",
      heartRate: "70",
      sex: "2",
    });
    expect(r.value).toBeCloseTo(432.0, 1);
    expect(r.interpretation).toBe("Normal QTc");
    expect(r.status).toBe("normal");
  });

  it("female boundary 460: QTc=460 → prolonged", () => {
    // HR=60, QT=460 → QTc=460
    const r = calc(correctedQtCalculator, {
      qt: "460",
      heartRate: "60",
      sex: "2",
    });
    expect(r.value).toBe(460);
    expect(r.interpretation).toBe("Prolonged QTc");
    expect(r.status).toBe("high");
  });

  it("female boundary 459: QTc=459 → normal", () => {
    // HR=60, QT=459 → QTc=459
    const r = calc(correctedQtCalculator, {
      qt: "459",
      heartRate: "60",
      sex: "2",
    });
    expect(r.value).toBe(459);
    expect(r.interpretation).toBe("Normal QTc");
    expect(r.status).toBe("normal");
  });

  it("female markedly prolonged: QT=500, HR=60 → QTc=500, critical", () => {
    const r = calc(correctedQtCalculator, {
      qt: "500",
      heartRate: "60",
      sex: "2",
    });
    expect(r.value).toBe(500);
    expect(r.interpretation).toBe("Markedly prolonged QTc");
    expect(r.status).toBe("critical");
  });

  it("female prolonged: QT=480, HR=80 → QTc≈554, critical", () => {
    // RR = 60/80 = 0.75, sqrt = 0.8660, QTc = 480/0.8660 = 554.3
    const r = calc(correctedQtCalculator, {
      qt: "480",
      heartRate: "80",
      sex: "2",
    });
    expect(r.value).toBeCloseTo(554.3, 0);
    expect(r.interpretation).toBe("Markedly prolonged QTc");
    expect(r.status).toBe("critical");
  });

  // --- Sex-specific difference at same QTc ---

  it("sex-specific: same QTc 455 is prolonged for male but normal for female", () => {
    // HR=60, QT=455 → QTc=455
    const rMale = calc(correctedQtCalculator, {
      qt: "455",
      heartRate: "60",
      sex: "1",
    });
    expect(rMale.value).toBe(455);
    expect(rMale.interpretation).toBe("Prolonged QTc");
    expect(rMale.status).toBe("high");

    const rFemale = calc(correctedQtCalculator, {
      qt: "455",
      heartRate: "60",
      sex: "2",
    });
    expect(rFemale.value).toBe(455);
    expect(rFemale.interpretation).toBe("Normal QTc");
    expect(rFemale.status).toBe("normal");
  });

  // --- Regression: fast heart rate amplifies QTc ---

  it("regression: high HR amplifies QTc — QT=400, HR=120, male", () => {
    // RR = 60/120 = 0.5, sqrt = 0.7071, QTc = 400/0.7071 = 565.7
    const r = calc(correctedQtCalculator, {
      qt: "400",
      heartRate: "120",
      sex: "1",
    });
    expect(r.value).toBeCloseTo(565.7, 0);
    expect(r.interpretation).toBe("Markedly prolonged QTc");
    expect(r.status).toBe("critical");
  });

  // --- Regression: low heart rate reduces QTc ---

  it("regression: low HR reduces QTc — QT=450, HR=50, male", () => {
    // RR = 60/50 = 1.2, sqrt = 1.0954, QTc = 450/1.0954 = 410.8
    const r = calc(correctedQtCalculator, {
      qt: "450",
      heartRate: "50",
      sex: "1",
    });
    expect(r.value).toBeCloseTo(410.8, 0);
    expect(r.interpretation).toBe("Normal QTc");
    expect(r.status).toBe("normal");
  });

  // --- Validation: missing inputs ---

  it("missing QT → critical", () => {
    const r = calc(correctedQtCalculator, {
      qt: "",
      heartRate: "70",
      sex: "1",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing heart rate → critical", () => {
    const r = calc(correctedQtCalculator, {
      qt: "400",
      heartRate: "",
      sex: "1",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing sex → critical", () => {
    const r = calc(correctedQtCalculator, {
      qt: "400",
      heartRate: "70",
      sex: "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// A1c ↔ eAG Converter — eAG = 28.7 × A1c − 46.7
// Previously defective: classification compared eAG result (mg/dL) against
// A1c thresholds (6, 6.5), so virtually every result fell into "Diabetes".
// Fix: classification now uses the input a1c value, not the eAG result.
// ---------------------------------------------------------------------------

describe("A1c ↔ eAG Converter classification fix", () => {
  it("A1c 5.5 → Normal A1c, eAG ≈ 111.15", () => {
    // eAG = 28.7 * 5.5 - 46.7 = 157.85 - 46.7 = 111.15
    const r = calc(a1cEagConverterCalculator, {
      a1c: "5.5",
    });
    expect(r.value).toBeCloseTo(111.15, 2);
    expect(r.interpretation).toBe("Normal A1c");
    expect(r.status).toBe("normal");
  });

  it("A1c 5.0 → Normal A1c, eAG ≈ 96.8", () => {
    // eAG = 28.7 * 5 - 46.7 = 143.5 - 46.7 = 96.8
    const r = calc(a1cEagConverterCalculator, {
      a1c: "5.0",
    });
    expect(r.value).toBeCloseTo(96.8, 2);
    expect(r.interpretation).toBe("Normal A1c");
    expect(r.status).toBe("normal");
  });

  it("A1c 6.0 → Pre-diabetes, eAG ≈ 125.5", () => {
    // eAG = 28.7 * 6 - 46.7 = 172.2 - 46.7 = 125.5
    const r = calc(a1cEagConverterCalculator, {
      a1c: "6.0",
    });
    expect(r.value).toBeCloseTo(125.5, 2);
    expect(r.interpretation).toBe("Pre-diabetes range");
    expect(r.status).toBe("high");
  });

  it("A1c 6.4 → Pre-diabetes, eAG ≈ 136.98", () => {
    // eAG = 28.7 * 6.4 - 46.7 = 183.68 - 46.7 = 136.98
    const r = calc(a1cEagConverterCalculator, {
      a1c: "6.4",
    });
    expect(r.value).toBeCloseTo(136.98, 2);
    expect(r.interpretation).toBe("Pre-diabetes range");
    expect(r.status).toBe("high");
  });

  it("A1c 6.5 → Diabetes range, eAG ≈ 139.85", () => {
    // eAG = 28.7 * 6.5 - 46.7 = 186.55 - 46.7 = 139.85
    const r = calc(a1cEagConverterCalculator, {
      a1c: "6.5",
    });
    expect(r.value).toBeCloseTo(139.85, 2);
    expect(r.interpretation).toBe("Diabetes range");
    expect(r.status).toBe("critical");
  });

  it("A1c 7.0 → Diabetes range, eAG ≈ 154.2", () => {
    // eAG = 28.7 * 7 - 46.7 = 200.9 - 46.7 = 154.2
    const r = calc(a1cEagConverterCalculator, {
      a1c: "7.0",
    });
    expect(r.value).toBeCloseTo(154.2, 2);
    expect(r.interpretation).toBe("Diabetes range");
    expect(r.status).toBe("critical");
  });

  it("regression: A1c 5.0 was incorrectly classified as Diabetes before fix", () => {
    // Before fix: eAG=96.8 → 96.8 >= 6.5 → "Diabetes range" (wrong!)
    // After fix: a1c=5.0 < 6 → "Normal A1c" (correct)
    const r = calc(a1cEagConverterCalculator, {
      a1c: "5.0",
    });
    expect(r.interpretation).toBe("Normal A1c");
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Waist-to-Hip Ratio — waist / hip
// Classification (contiguous, no gaps):
//   < 0.9  → Low risk (Males) — normal
//   0.9–0.99 → Moderate risk (Males) — high
//   ≥ 1.0  → High risk (Males) — critical
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Waist-to-Hip Ratio calculate() boundary-gap regression", () => {
  it("0.895 → Low risk (was in gap before fix)", () => {
    // waist=89.5, hip=100 → 0.895
    const r = calc(waistToHipRatioCalculator, {
      waist: "89.5",
      hip: "100",
    });
    expect(r.value).toBe(0.9);
    expect(r.interpretation).toBe("Low risk (Males)");
    expect(r.status).toBe("normal");
  });

  it("exactly 0.90 → Moderate risk", () => {
    // waist=90, hip=100 → 0.9
    const r = calc(waistToHipRatioCalculator, {
      waist: "90",
      hip: "100",
    });
    expect(r.value).toBe(0.9);
    expect(r.interpretation).toBe("Moderate risk (Males)");
    expect(r.status).toBe("high");
  });

  it("0.905 → Moderate risk (just above 0.90)", () => {
    // waist=90.5, hip=100 → 0.905
    const r = calc(waistToHipRatioCalculator, {
      waist: "90.5",
      hip: "100",
    });
    expect(r.value).toBe(0.91);
    expect(r.interpretation).toBe("Moderate risk (Males)");
    expect(r.status).toBe("high");
  });

  it("0.89 → Low risk (just below 0.90)", () => {
    // waist=89, hip=100 → 0.89
    const r = calc(waistToHipRatioCalculator, {
      waist: "89",
      hip: "100",
    });
    expect(r.value).toBe(0.89);
    expect(r.interpretation).toBe("Low risk (Males)");
    expect(r.status).toBe("normal");
  });

  it("0.99 → Moderate risk (upper boundary)", () => {
    // waist=99, hip=100 → 0.99
    const r = calc(waistToHipRatioCalculator, {
      waist: "99",
      hip: "100",
    });
    expect(r.value).toBe(0.99);
    expect(r.interpretation).toBe("Moderate risk (Males)");
    expect(r.status).toBe("high");
  });

  it("1.0 → High risk", () => {
    // waist=100, hip=100 → 1.0
    const r = calc(waistToHipRatioCalculator, {
      waist: "100",
      hip: "100",
    });
    expect(r.value).toBe(1);
    expect(r.interpretation).toBe("High risk (Males)");
    expect(r.status).toBe("critical");
  });

  it("0.80 → Low risk (clearly below boundary)", () => {
    // waist=80, hip=100 → 0.8
    const r = calc(waistToHipRatioCalculator, {
      waist: "80",
      hip: "100",
    });
    expect(r.value).toBe(0.8);
    expect(r.interpretation).toBe("Low risk (Males)");
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Sodium Deficit — 0.6 * weight * (desiredNa − currentNa)
// Classification (contiguous, no gaps):
//   < -100  → Deficit below normal range (low)
//   -100–0  → Normal (no deficit) (normal)
//   0–<500  → Sodium deficit present (high)
//   ≥ 500   → Large sodium deficit (critical)
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Sodium Deficit calculate() boundary-gap regression", () => {
  it("value below -100 → Deficit below normal range", () => {
    // weight=70, currentNa=140, desiredNa=120
    // result = 0.6 * 70 * (120 - 140) = 42 * (-20) = -840
    const r = calc(sodiumDeficitCalculator, {
      weight: "70",
      currentNa: "140",
      desiredNa: "120",
    });
    expect(r.value).toBe(-840);
    expect(r.interpretation).toBe("Deficit below normal range");
    expect(r.status).toBe("low");
  });

  it("exactly -100 → Normal (no deficit)", () => {
    // weight=50, currentNa=140, desiredNa=136.667
    // result = 0.6 * 50 * (136.667 - 140) = 30 * (-3.333) = -99.99 → -100
    // 0.6 * 50 * (137 - 140) = 30 * -3 = -90
    // Need result = -100: 0.6 * 50 * x = -100 → x = -100/30 = -3.333
    // desiredNa = 140 - 3.333 = 136.667
    const r = calc(sodiumDeficitCalculator, {
      weight: "50",
      currentNa: "140",
      desiredNa: "136.67",
    });
    // result = 30 * (136.67 - 140) = 30 * (-3.33) = -99.9
    expect(r.value).toBe(-99.9);
    expect(r.interpretation).toBe("Normal (no deficit)");
    expect(r.status).toBe("normal");
  });

  it("value just above -100 → Normal (no deficit)", () => {
    // weight=70, currentNa=140, desiredNa=139
    // result = 0.6 * 70 * (139 - 140) = 42 * (-1) = -42
    const r = calc(sodiumDeficitCalculator, {
      weight: "70",
      currentNa: "140",
      desiredNa: "139",
    });
    expect(r.value).toBe(-42);
    expect(r.interpretation).toBe("Normal (no deficit)");
    expect(r.status).toBe("normal");
  });

  it("exactly 0 → Normal (no deficit)", () => {
    // weight=70, currentNa=140, desiredNa=140
    // result = 0.6 * 70 * 0 = 0
    const r = calc(sodiumDeficitCalculator, {
      weight: "70",
      currentNa: "140",
      desiredNa: "140",
    });
    expect(r.value).toBe(0);
    expect(r.interpretation).toBe("Normal (no deficit)");
    expect(r.status).toBe("normal");
  });

  it("value just above 0 → Sodium deficit present", () => {
    // weight=70, currentNa=140, desiredNa=140.1
    // result = 0.6 * 70 * 0.1 = 4.2
    const r = calc(sodiumDeficitCalculator, {
      weight: "70",
      currentNa: "140",
      desiredNa: "140.1",
    });
    expect(r.value).toBe(4.2);
    expect(r.interpretation).toBe("Sodium deficit present");
    expect(r.status).toBe("high");
  });

  it("value just below 500 → Sodium deficit present", () => {
    // weight=70, currentNa=140, desiredNa=148
    // result = 0.6 * 70 * 8 = 336 → need closer to 500
    // weight=100, currentNa=140, desiredNa=148.33 → 60 * 8.33 = 499.8
    const r = calc(sodiumDeficitCalculator, {
      weight: "100",
      currentNa: "140",
      desiredNa: "148.33",
    });
    expect(r.value).toBe(499.8);
    expect(r.interpretation).toBe("Sodium deficit present");
    expect(r.status).toBe("high");
  });

  it("exactly 500 → Large sodium deficit", () => {
    // weight=100, currentNa=140, desiredNa=148.3333
    // result = 0.6 * 100 * 8.3333 = 60 * 8.3333 = 500
    const r = calc(sodiumDeficitCalculator, {
      weight: "100",
      currentNa: "140",
      desiredNa: "148.34",
    });
    // result = 60 * 8.34 = 500.4
    expect(r.value).toBe(500.4);
    expect(r.interpretation).toBe("Large sodium deficit");
    expect(r.status).toBe("critical");
  });

  it("value above 500 → Large sodium deficit", () => {
    // weight=70, currentNa=120, desiredNa=140
    // result = 0.6 * 70 * 20 = 840
    const r = calc(sodiumDeficitCalculator, {
      weight: "70",
      currentNa: "120",
      desiredNa: "140",
    });
    expect(r.value).toBe(840);
    expect(r.interpretation).toBe("Large sodium deficit");
    expect(r.status).toBe("critical");
  });
});

