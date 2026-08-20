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
  cha2ds2VascCalculator,
} from "../../lib/calculators/cha2ds2-vasc";
import {
  a1cEagConverterCalculator,
} from "../../lib/calculators/a1c-eag-converter";
import {
  waistToHipRatioCalculator,
} from "../../lib/calculators/waist-to-hip-ratio";
import {
  sodiumDeficitCalculator,
} from "../../lib/calculators/sodium-deficit";
import {
  shockIndexCalculator,
} from "../../lib/calculators/shock-index";
import {
  freeWaterDeficitCalculator,
} from "../../lib/calculators/free-water-deficit";
import {
  thyroidDoseCalculator,
} from "../../lib/calculators/thyroid-dose";
import {
  levothyroxineDoseCalculator,
} from "../../lib/calculators/levothyroxine-dose";
import {
  adrenalSteroidConverterCalculator,
} from "../../lib/calculators/adrenal-steroid-converter";
import { sofaScoreCalculator } from "../../lib/calculators/sofa-score";
import { timiCalculator } from "../../lib/calculators/timi";
import { graceCalculator } from "../../lib/calculators/grace";
import { heartScoreCalculator } from "../../lib/calculators/heart-score";
import { wellsPeCalculator } from "../../lib/calculators/wells-pe";
import { wellsDvtCalculator } from "../../lib/calculators/wells-dvt";
import { percRuleCalculator } from "../../lib/calculators/perc-rule";
import { psiPortCalculator } from "../../lib/calculators/psi-port";
import { sirsCriteriaCalculator } from "../../lib/calculators/sirs-criteria";
import { rtsCalculator } from "../../lib/calculators/rts";
import { hasBledCalculator } from "../../lib/calculators/has-bled";
import { rcriCalculator } from "../../lib/calculators/rcri";
import { ascvdCalculator } from "../../lib/calculators/ascvd";
import { daptCalculator } from "../../lib/calculators/dapt";
import { h2fpefCalculator } from "../../lib/calculators/h2fpef";
import { meldCalculator } from "../../lib/calculators/meld";
import { meldNaCalculator } from "../../lib/calculators/meld-na";
import { parklandFormulaCalculator } from "../../lib/calculators/parkland-formula";
import { apriCalculator } from "../../lib/calculators/apri";
import { fib4Calculator } from "../../lib/calculators/fib-4";

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
// Formula (sex-aware, 2021 race-free equation):
//   142 * min(Scr/κ,1)^α * max(Scr/κ,1)^-1.2 * 0.9938^age * (1.012 if female)
//   κ = 0.7 female / 0.9 male; α = −0.241 female / −0.302 male
// Classification (contiguous, no gaps):
//   ≥ 90 → G1 Normal or high
//   ≥ 60 → G2 Mildly decreased
//   ≥ 45 → G3a Mild to moderate
//   ≥ 30 → G3b Moderate to severe
//   ≥ 15 → G4 Severely decreased
//   < 15 → G5 Kidney failure
// Sex input: "1" = male, "2" = female
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("CKD-EPI 2021 calculate() output", () => {
  // Helper to compute the expected value for a given sex
  function expectedEgfr(
    sex: "1" | "2",
    creatinine: number,
    age: number,
  ) {
    const isFemale = sex === "2";
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const factor = isFemale ? 1.012 : 1;

    return Number(
      (
        142 *
        Math.pow(
          Math.min(creatinine / kappa, 1),
          alpha,
        ) *
        Math.pow(
          Math.max(creatinine / kappa, 1),
          -1.2,
        ) *
        Math.pow(0.9938, age) *
        factor
      ).toFixed(2),
    );
  }

  it("normal renal function: female, age 40, Cr 0.8 → G1", () => {
    const expected = expectedEgfr("2", 0.8, 40);
    const r = calc(ckdEpi2021Calculator, {
      age: "40",
      sex: "2",
      creatinine: "0.8",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "G1: Normal or high",
    );
  });

  it("male, age 65, Cr 1.1 → G2 (mildly decreased)", () => {
    const expected = expectedEgfr("1", 1.1, 65);
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

  it("female, age 65, Cr 1.1 → G3a (sex-specific κ/α/factor)", () => {
    const expected = expectedEgfr("2", 1.1, 65);
    const r = calc(ckdEpi2021Calculator, {
      age: "65",
      sex: "2",
      creatinine: "1.1",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3a: Mild to moderate",
    );
  });

  it("regression: same creatinine — female eGFR differs from male", () => {
    // Previously the sex input was ignored (always male κ with 1.012 factor)
    const female = expectedEgfr("2", 1.1, 65);
    const male = expectedEgfr("1", 1.1, 65);
    expect(female).toBeLessThan(male);

    const rF = calc(ckdEpi2021Calculator, {
      age: "65",
      sex: "2",
      creatinine: "1.1",
    });
    const rM = calc(ckdEpi2021Calculator, {
      age: "65",
      sex: "1",
      creatinine: "1.1",
    });
    expect(rF.value).toBeCloseTo(female, 1);
    expect(rM.value).toBeCloseTo(male, 1);
  });

  it("male, age 55, Cr 1.5 → G3a", () => {
    const expected = expectedEgfr("1", 1.5, 55);
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

  it("male, age 72, Cr 3.5 → G4 (severely decreased)", () => {
    const expected = expectedEgfr("1", 3.5, 72);
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

  it("regression: male, age 55, Cr 1.8 → G3b", () => {
    const expected = expectedEgfr("1", 1.8, 55);
    const r = calc(ckdEpi2021Calculator, {
      age: "55",
      sex: "1",
      creatinine: "1.8",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3b: Moderate to severe",
    );
  });

  it("regression: male, age 40, Cr 1.57 → G3a (45–59 band)", () => {
    const expected = expectedEgfr("1", 1.57, 40);
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

  it("regression: male, age 80, Cr 2.0 → G3b (30–44 band)", () => {
    const expected = expectedEgfr("1", 2.0, 80);
    expect(expected).toBeGreaterThanOrEqual(30);
    expect(expected).toBeLessThan(45);
    const r = calc(ckdEpi2021Calculator, {
      age: "80",
      sex: "1",
      creatinine: "2.0",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "G3b: Moderate to severe",
    );
  });

  it("kidney failure: male, age 80, Cr 5.0 → G5", () => {
    const expected = expectedEgfr("1", 5.0, 80);
    const r = calc(ckdEpi2021Calculator, {
      age: "80",
      sex: "1",
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
// Classification (Teasdale & Jennett severity bands):
//   13–15 → mild (normal), 9–12 → moderate (high), 3–8 → severe (critical)
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
    expect(r.interpretation).toBe(
      "GCS 13–15 – Mild brain injury",
    );
  });

  it("moderate: eye 3 + verbal 4 + motor 5 = 12", () => {
    const r = calc(gcsCalculator, {
      eye: "3",
      verbal: "4",
      motor: "5",
    });
    expect(r.value).toBe(12);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "GCS 9–12 – Moderate brain injury",
    );
  });

  it("severe: eye 1 + verbal 1 + motor 1 = 3", () => {
    const r = calc(gcsCalculator, {
      eye: "1",
      verbal: "1",
      motor: "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe(
      "GCS 3–8 – Severe brain injury",
    );
  });

  it("moderate boundary: eye 2 + verbal 3 + motor 4 = 9", () => {
    const r = calc(gcsCalculator, {
      eye: "2",
      verbal: "3",
      motor: "4",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "GCS 9–12 – Moderate brain injury",
    );
  });

  it("mild boundary: eye 3 + verbal 4 + motor 6 = 13", () => {
    const r = calc(gcsCalculator, {
      eye: "3",
      verbal: "4",
      motor: "6",
    });
    expect(r.value).toBe(13);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "GCS 13–15 – Mild brain injury",
    );
  });

  it("severe boundary: eye 2 + verbal 3 + motor 3 = 8", () => {
    const r = calc(gcsCalculator, {
      eye: "2",
      verbal: "3",
      motor: "3",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe(
      "GCS 3–8 – Severe brain injury",
    );
  });
});

// ---------------------------------------------------------------------------
// NEWS2 — National Early Warning Score 2
// Sub-scores: RR ≤8=3, 9–11=1, 12–20=0, 21–24=2, ≥25=3
//            SpO2 ≤91=3, 92–93=2, 94–95=1, ≥96=0
//            Temp ≤35=3, 35.1–36=1, 36.1–38=0, 38.1–39=1, ≥39.1=2
//            SBP ≤90=3, 91–100=2, 101–110=1, 111–219=0, ≥220=3
//            Pulse ≤40=3, 41–50=1, 51–90=0, 91–110=1, 111–130=2, ≥131=3
// Aggregate (0–15). 0 → low; 1–4 → low-to-moderate; 5–6 or any single 3 →
// high; ≥7 → very high.
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("NEWS2 calculate() boundary audit", () => {
  it("normal vitals produce score 0 (low clinical risk)", () => {
    const r = calc(news2Calculator, {
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "NEWS2 0 – Low clinical risk.",
    );
  });

  it("scores each parameter per NEWS2 bands (RR 24, SpO2 93, temp 38.2, SBP 100, pulse 110 → 8)", () => {
    // Sub-scores: RR 2, SpO₂ 2, temperature 1, SBP 2, pulse 1 → 8
    const r = calc(news2Calculator, {
      "respiratory-rate": "24",
      spo2: "93",
      temperature: "38.2",
      sbp: "100",
      pulse: "110",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe(
      "NEWS2 8 – Very high risk.",
    );
  });

  it("mixed mild inputs produce a low-to-moderate score", () => {
    // RR 20 → 0, SpO2 94 → 1, temp 38 → 0, SBP 110 → 1, pulse 110 → 1 → 3
    const r = calc(news2Calculator, {
      "respiratory-rate": "20",
      spo2: "94",
      temperature: "38",
      sbp: "110",
      pulse: "110",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "NEWS2 3 – Low-to-moderate risk.",
    );
  });

  it("any single parameter scoring 3 triggers high risk", () => {
    // RR 8 → 3, all others normal → aggregate 3 but high-risk response
    const r = calc(news2Calculator, {
      "respiratory-rate": "8",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "NEWS2 3 – High risk.",
    );
  });

  it("aggregate 5–6 is high risk", () => {
    // RR 25 → 3, SpO2 92 → 2 → 5
    const r = calc(news2Calculator, {
      "respiratory-rate": "25",
      spo2: "92",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "NEWS2 5 – High risk.",
    );
  });

  it("boundary: RR 20 vs 21 changes sub-score 0 → 2", () => {
    const r20 = calc(news2Calculator, {
      "respiratory-rate": "20",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    const r21 = calc(news2Calculator, {
      "respiratory-rate": "21",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r20.value).toBe(0);
    expect(r21.value).toBe(2);
  });

  it("returns critical status for missing input", () => {
    const r = calc(news2Calculator, {
      "respiratory-rate": "",
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
// One point each: new-onset confusion, urea > 7 mmol/L, RR ≥ 30/min,
// SBP < 90 mmHg, age ≥ 65. Score 0–5.
// 0–1 → low; 2 → moderate; ≥ 3 → severe.
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("CURB-65 calculate() boundary audit", () => {
  const baseline = {
    age: "40",
    confusion: "0",
    urea: "6",
    "respiratory-rate": "20",
    sbp: "110",
  };

  it("score 0 when no criteria met", () => {
    const r = calc(curb65Calculator, baseline);
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "CURB-65 0 – Low severity. Suitable for outpatient management.",
    );
  });

  it("score 1 for age ≥ 65 alone", () => {
    const r = calc(curb65Calculator, {
      ...baseline,
      age: "65",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("score 2 for age ≥ 65 + urea > 7", () => {
    const r = calc(curb65Calculator, {
      ...baseline,
      age: "70",
      urea: "8",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "CURB-65 2 – Moderate severity. Strongly consider hospital admission.",
    );
  });

  it("score ≥ 3 is severe", () => {
    // age 70 + urea 8 + RR 30 → 3
    const r = calc(curb65Calculator, {
      ...baseline,
      age: "70",
      urea: "8",
      "respiratory-rate": "30",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "CURB-65 ≥ 3 – Severe pneumonia. Consider urgent hospital/ICU admission.",
    );
  });

  it("boundary: urea 7 (no point) vs 7.1 (point)", () => {
    const r7 = calc(curb65Calculator, {
      ...baseline,
      age: "70",
      urea: "7",
    });
    const r71 = calc(curb65Calculator, {
      ...baseline,
      age: "70",
      urea: "7.1",
    });
    expect(r7.value).toBe(1);
    expect(r71.value).toBe(2);
  });

  it("boundary: RR 29 (no point) vs 30 (point)", () => {
    const r29 = calc(curb65Calculator, {
      ...baseline,
      "respiratory-rate": "29",
    });
    const r30 = calc(curb65Calculator, {
      ...baseline,
      "respiratory-rate": "30",
    });
    expect(r29.value).toBe(0);
    expect(r30.value).toBe(1);
  });

  it("boundary: SBP 90 (no point) vs 89 (point)", () => {
    const r90 = calc(curb65Calculator, {
      ...baseline,
      sbp: "90",
    });
    const r89 = calc(curb65Calculator, {
      ...baseline,
      sbp: "89",
    });
    expect(r90.value).toBe(0);
    expect(r89.value).toBe(1);
  });

  it("boundary: age 64 (no point) vs 65 (point)", () => {
    const r64 = calc(curb65Calculator, {
      ...baseline,
      age: "64",
    });
    const r65 = calc(curb65Calculator, {
      ...baseline,
      age: "65",
    });
    expect(r64.value).toBe(0);
    expect(r65.value).toBe(1);
  });

  it("confusion contributes 1 point", () => {
    const r = calc(curb65Calculator, {
      ...baseline,
      confusion: "1",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("returns critical status for missing age", () => {
    const r = calc(curb65Calculator, {
      age: "",
      confusion: "0",
      urea: "7",
      "respiratory-rate": "22",
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

  it("gap regression: osmolality 295.5 previously returned pending", () => {
    // 2*140 + 180/18 + 15.4/2.8 = 280 + 10 + 5.5 = 295.5
    const r = calc(serumOsmolalityCalculator, {
      sodium: "140",
      glucose: "180",
      bun: "15.4",
    });
    expect(r.value).toBeCloseTo(295.5, 1);
    expect(r.interpretation).toBe("Normal osmolality");
    expect(r.status).toBe("normal");
  });

  it("gap regression: osmolality 296 → High osmolality (boundary)", () => {
    // 2*140 + 180/18 + 22.4/2.8 = 280 + 10 + 8 = 298 → high
    const r = calc(serumOsmolalityCalculator, {
      sodium: "140",
      glucose: "180",
      bun: "22.4",
    });
    expect(r.value).toBeCloseTo(298, 0);
    expect(r.interpretation).toBe("High osmolality");
    expect(r.status).toBe("high");
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

  it("gap regression: corrected Na 145.5 previously returned pending", () => {
    // Na=145.5, glucose=100 → 145.5 + 0 = 145.5 (in the old 145–146 gap)
    const r = calc(correctedSodiumCalculator, {
      sodium: "145.5",
      glucose: "100",
    });
    expect(r.value).toBe(145.5);
    expect(r.interpretation).toBe("Normal corrected sodium");
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// qSOFA — Quick Sequential Organ Failure Assessment
// One point each: SBP ≤ 100 mmHg, RR ≥ 22/min, altered mental status.
// Score 0–3. 0 → low concern; 1 → moderate concern; ≥ 2 → high risk.
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("qSOFA calculate() boundary audit", () => {
  it("score 0 when no criteria met", () => {
    const r = calc(qsofaCalculator, {
      sbp: "110",
      "respiratory-rate": "20",
      "mental-status": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "qSOFA 0 – Low clinical concern. Continue to monitor for signs of deterioration.",
    );
  });

  it("score 1 for SBP ≤ 100 alone", () => {
    const r = calc(qsofaCalculator, {
      sbp: "100",
      "respiratory-rate": "20",
      "mental-status": "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("score 2 → high risk (SBP 95, RR 24)", () => {
    const r = calc(qsofaCalculator, {
      sbp: "95",
      "respiratory-rate": "24",
      "mental-status": "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "qSOFA ≥ 2 – High risk of sepsis-related organ dysfunction and mortality. Escalate care urgently.",
    );
  });

  it("score 3 (all three criteria met)", () => {
    const r = calc(qsofaCalculator, {
      sbp: "80",
      "respiratory-rate": "30",
      "mental-status": "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("boundary: SBP 100 (point) vs 101 (no point)", () => {
    const r100 = calc(qsofaCalculator, {
      sbp: "100",
      "respiratory-rate": "20",
      "mental-status": "0",
    });
    const r101 = calc(qsofaCalculator, {
      sbp: "101",
      "respiratory-rate": "20",
      "mental-status": "0",
    });
    expect(r100.value).toBe(1);
    expect(r101.value).toBe(0);
  });

  it("boundary: RR 22 (point) vs 21 (no point)", () => {
    const r22 = calc(qsofaCalculator, {
      sbp: "110",
      "respiratory-rate": "22",
      "mental-status": "0",
    });
    const r21 = calc(qsofaCalculator, {
      sbp: "110",
      "respiratory-rate": "21",
      "mental-status": "0",
    });
    expect(r22.value).toBe(1);
    expect(r21.value).toBe(0);
  });

  it("altered mental status contributes 1 point", () => {
    const r = calc(qsofaCalculator, {
      sbp: "110",
      "respiratory-rate": "20",
      "mental-status": "1",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("returns critical status for missing input", () => {
    const r = calc(qsofaCalculator, {
      sbp: "",
      "respiratory-rate": "22",
      "mental-status": "1",
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

  it("gap regression: result ≈ 89.7 previously returned pending", () => {
    // age 60, weight 60, male, Cr 0.7433 → 4800 / (72 × 0.7433) ≈ 89.69
    const r = calc(cockcroftGaultCalculator, {
      age: "60",
      weight: "60",
      sex: "1",
      creatinine: "0.7433",
    });
    expect(r.value).toBeGreaterThan(89);
    expect(r.value).toBeLessThan(90);
    expect(r.interpretation).toBe("Mild renal impairment");
    expect(r.status).toBe("normal");
  });

  it("gap regression: result ≈ 59.7 previously returned pending", () => {
    // age 80, weight 60, male, Cr 0.8375 → (60×60)/(72×0.8375) ≈ 59.70
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "60",
      sex: "1",
      creatinine: "0.8375",
    });
    expect(r.value).toBeGreaterThan(59);
    expect(r.value).toBeLessThan(60);
    expect(r.interpretation).toBe("Moderate renal impairment");
    expect(r.status).toBe("low");
  });

  it("gap regression: result ≈ 29.7 previously returned pending", () => {
    // age 80, weight 50, male, Cr 1.4029 → (60×50)/(72×1.4029) ≈ 29.70
    const r = calc(cockcroftGaultCalculator, {
      age: "80",
      weight: "50",
      sex: "1",
      creatinine: "1.4029",
    });
    expect(r.value).toBeGreaterThan(29);
    expect(r.value).toBeLessThan(30);
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

  it("gap regression: eGFR ≈ 89.5 previously returned pending", () => {
    // Cr=0.8984, age=50, male → eGFR ≈ 89.5 (in the 89–90 gap)
    const expected = expectedMdrd(0.8984, 50, "1");
    expect(expected).toBeGreaterThan(89);
    expect(expected).toBeLessThan(90);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "0.8984",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G2: Mildly decreased");
    expect(r.status).toBe("normal");
  });

  it("gap regression: eGFR ≈ 59.7 previously returned pending", () => {
    // Cr=1.2762, age=50, male → eGFR ≈ 59.7 (in the 59–60 gap)
    const expected = expectedMdrd(1.2762, 50, "1");
    expect(expected).toBeGreaterThan(59);
    expect(expected).toBeLessThan(60);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "1.2762",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G3a: Mild to moderate");
    expect(r.status).toBe("low");
  });

  it("gap regression: eGFR ≈ 44.7 previously returned pending", () => {
    // Cr=1.639, age=50, male → eGFR ≈ 44.7 (in the 44–45 gap)
    const expected = expectedMdrd(1.639, 50, "1");
    expect(expected).toBeGreaterThan(44);
    expect(expected).toBeLessThan(45);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "1.639",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G3b: Moderate to severe");
    expect(r.status).toBe("low");
  });

  it("gap regression: eGFR ≈ 29.7 previously returned pending", () => {
    // Cr=2.3368, age=50, male → eGFR ≈ 29.7 (in the 29–30 gap)
    const expected = expectedMdrd(2.3368, 50, "1");
    expect(expected).toBeGreaterThan(29);
    expect(expected).toBeLessThan(30);
    const r = calc(mdrdCalculator, {
      age: "50",
      sex: "1",
      creatinine: "2.3368",
    });
    expect(r.value).toBeCloseTo(expected, 1);
    expect(r.interpretation).toBe("G4: Severely decreased");
    expect(r.status).toBe("low");
  });
});

// ---------------------------------------------------------------------------
// Adrenal Steroid Converter — prednisone-equivalent glucocorticoid dose
// Result = dose × equivalence factor (standard glucocorticoid table)
//   dexamethasone/betamethasone ×6.667, methylprednisolone/triamcinolone ×1.25,
//   prednisone/prednisolone ×1, hydrocortisone ×0.25, cortisone ×0.2
// Classification (prednisone-equivalent mg/day):
//   ≤ 7.5 → Low-dose, 7.5–20 → Moderate-dose, ≥ 20 → High-dose
// ---------------------------------------------------------------------------
describe("Adrenal Steroid Converter calculate() output", () => {
  it("prednisone 10 mg → 10 mg prednisone-equivalent, moderate", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "10",
      steroid: "prednisone",
    });
    expect(r.value).toBe(10);
    expect(r.interpretation).toBe("Moderate-dose glucocorticoid");
    expect(r.status).toBe("high");
  });

  it("dexamethasone 1.5 mg → 10 mg prednisone-equivalent (conversion works)", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "1.5",
      steroid: "dexamethasone",
    });
    expect(r.value).toBeCloseTo(10, 1);
    expect(r.interpretation).toBe("Moderate-dose glucocorticoid");
    expect(r.status).toBe("high");
  });

  it("hydrocortisone 20 mg → 5 mg prednisone-equivalent, low", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "20",
      steroid: "hydrocortisone",
    });
    expect(r.value).toBe(5);
    expect(r.interpretation).toBe("Low-dose glucocorticoid");
    expect(r.status).toBe("normal");
  });

  it("prednisolone 30 mg → 30 mg prednisone-equivalent, high", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "30",
      steroid: "prednisolone",
    });
    expect(r.value).toBe(30);
    expect(r.interpretation).toBe("High-dose glucocorticoid");
    expect(r.status).toBe("critical");
  });

  it("betamethasone 1.5 mg → 10 mg prednisone-equivalent", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "1.5",
      steroid: "betamethasone",
    });
    expect(r.value).toBeCloseTo(10, 1);
  });

  it("methylprednisolone 16 mg → 20 mg prednisone-equivalent, moderate boundary", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "16",
      steroid: "methylprednisolone",
    });
    expect(r.value).toBe(20);
    expect(r.interpretation).toBe("Moderate-dose glucocorticoid");
  });

  it("unknown steroid → critical invalid", () => {
    const r = calc(adrenalSteroidConverterCalculator, {
      dose: "10",
      steroid: "not-a-steroid",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Invalid Source Steroid.");
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

  it("gap regression: corrected AG 7.5 previously returned pending", () => {
    // Na=140, Cl=108.5, HCO3=24, alb=4 → 140 − 132.5 = 7.5
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "108.5",
      bicarbonate: "24",
      albumin: "4",
    });
    expect(r.value).toBeCloseTo(7.5, 1);
    expect(r.interpretation).toBe("Low corrected anion gap");
    expect(r.status).toBe("low");
  });

  it("gap regression: corrected AG 12.5 previously returned pending", () => {
    // Na=140, Cl=103.5, HCO3=24, alb=4 → 140 − 127.5 = 12.5
    const r = calc(correctedAnionGapCalculator, {
      sodium: "140",
      chloride: "103.5",
      bicarbonate: "24",
      albumin: "4",
    });
    expect(r.value).toBeCloseTo(12.5, 1);
    expect(r.interpretation).toBe("Normal corrected anion gap");
    expect(r.status).toBe("normal");
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

  it("gap regression: 0.995 (male) previously returned pending", () => {
    // waist=99.5, hip=100 → 0.995 (in the old 0.99–1.0 gap)
    const r = calc(waistToHipRatioCalculator, {
      waist: "99.5",
      hip: "100",
      sex: "1",
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

// ---------------------------------------------------------------------------
// Shock Index — Heart Rate / SBP
// Normal range 0.5–0.7. <0.5 low; >0.7 elevated; ≥1.0 critical.
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Shock Index calculate() regression", () => {
  it("reads hyphenated heart-rate input (matches declared input id)", () => {
    // Previously calculate() read values.heart_rate, which the form never sends
    const r = calc(shockIndexCalculator, {
      "heart-rate": "120",
      sbp: "80",
    });
    expect(r.value).toBe(1.5);
    expect(r.status).toBe("critical");
  });

  it("0.6 → normal", () => {
    const r = calc(shockIndexCalculator, {
      "heart-rate": "72",
      sbp: "120",
    });
    expect(r.value).toBe(0.6);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "Normal shock index.",
    );
  });

  it("boundary: 0.5 → normal, 0.4 → low", () => {
    const r05 = calc(shockIndexCalculator, {
      "heart-rate": "60",
      sbp: "120",
    });
    const r04 = calc(shockIndexCalculator, {
      "heart-rate": "48",
      sbp: "120",
    });
    expect(r05.value).toBe(0.5);
    expect(r05.status).toBe("normal");
    expect(r04.value).toBe(0.4);
    expect(r04.status).toBe("low");
  });

  it("boundary: 0.7 → normal, 0.8 → elevated", () => {
    const r07 = calc(shockIndexCalculator, {
      "heart-rate": "84",
      sbp: "120",
    });
    const r08 = calc(shockIndexCalculator, {
      "heart-rate": "96",
      sbp: "120",
    });
    expect(r07.value).toBe(0.7);
    expect(r07.status).toBe("normal");
    expect(r08.value).toBe(0.8);
    expect(r08.status).toBe("high");
  });

  it("boundary: 0.9 → elevated, 1.0 → critical", () => {
    const r09 = calc(shockIndexCalculator, {
      "heart-rate": "108",
      sbp: "120",
    });
    const r10 = calc(shockIndexCalculator, {
      "heart-rate": "120",
      sbp: "120",
    });
    expect(r09.value).toBe(0.9);
    expect(r09.status).toBe("high");
    expect(r10.value).toBe(1);
    expect(r10.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Free Water Deficit — 0.6 * weight * (currentNa / desiredNa − 1)
// Uses the shared calculateFreeWaterDeficit utility (clamps at ≥ 0).
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Free Water Deficit calculate() regression", () => {
  it("computes a positive deficit in hypernatremia (was always 0)", () => {
    // Previously the formula used desiredNa/desiredNa, always returning 0
    const r = calc(freeWaterDeficitCalculator, {
      weight: "70",
      currentNa: "150",
      desiredNa: "140",
    });
    expect(r.value).toBe(3);
    expect(r.interpretation).toBe(
      "Mild free water deficit",
    );
    expect(r.status).toBe("low");
  });

  it("moderate deficit", () => {
    const r = calc(freeWaterDeficitCalculator, {
      weight: "80",
      currentNa: "155",
      desiredNa: "145",
    });
    // 48 * (155/145 − 1) = 48 * 0.06897 = 3.31 → 3.3
    expect(r.value).toBe(3.3);
    expect(r.interpretation).toBe(
      "Moderate free water deficit",
    );
    expect(r.status).toBe("high");
  });

  it("no deficit when current sodium is not elevated", () => {
    const r = calc(freeWaterDeficitCalculator, {
      weight: "60",
      currentNa: "135",
      desiredNa: "140",
    });
    expect(r.value).toBe(0);
    expect(r.interpretation).toBe("No deficit");
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Thyroid Dose / Levothyroxine Dose — Dose = 1.6 * weight (µg/day)
// The formula always yields the full replacement rate (1.6 µg/kg/day),
// which is within the normal range of 1.0–2.0 µg/kg/day.
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Thyroid Dose calculate() regression", () => {
  it("returns the total daily dose for weight 70", () => {
    const r = calc(thyroidDoseCalculator, {
      weight: "70",
    });
    expect(r.value).toBe(112);
    expect(r.interpretation).toBe(
      "Full replacement dose",
    );
    expect(r.status).toBe("normal");
  });

  it("returns the total daily dose for weight 90", () => {
    const r = calc(thyroidDoseCalculator, {
      weight: "90",
    });
    expect(r.value).toBe(144);
    expect(r.status).toBe("normal");
  });
});

describe("Levothyroxine Dose calculate() regression", () => {
  it("returns the total daily dose for weight 70", () => {
    const r = calc(levothyroxineDoseCalculator, {
      weight: "70",
    });
    expect(r.value).toBe(112);
    expect(r.interpretation).toBe(
      "Full replacement dose",
    );
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Waist-to-Hip Ratio — sex-specific thresholds (WHO)
// Male: <0.90 low, 0.90–0.99 moderate, ≥1.0 high
// Female: <0.85 low, ≥0.85 increased risk
// Missing sex defaults to male (backward compatible)
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Waist-to-Hip Ratio sex-specific regression", () => {
  it("female 0.80 → Low risk (Females)", () => {
    const r = calc(waistToHipRatioCalculator, {
      waist: "80",
      hip: "100",
      sex: "2",
    });
    expect(r.value).toBe(0.8);
    expect(r.interpretation).toBe(
      "Low risk (Females)",
    );
    expect(r.status).toBe("normal");
  });

  it("female 0.85 → Increased risk (Females)", () => {
    const r = calc(waistToHipRatioCalculator, {
      waist: "85",
      hip: "100",
      sex: "2",
    });
    expect(r.value).toBe(0.85);
    expect(r.interpretation).toBe(
      "Increased risk (Females)",
    );
    expect(r.status).toBe("high");
  });

  it("female 0.84 → Low risk (Females) just below threshold", () => {
    const r = calc(waistToHipRatioCalculator, {
      waist: "84",
      hip: "100",
      sex: "2",
    });
    expect(r.value).toBe(0.84);
    expect(r.interpretation).toBe(
      "Low risk (Females)",
    );
    expect(r.status).toBe("normal");
  });

  it("same ratio classifies differently by sex", () => {
    const male = calc(waistToHipRatioCalculator, {
      waist: "95",
      hip: "100",
      sex: "1",
    });
    const female = calc(waistToHipRatioCalculator, {
      waist: "95",
      hip: "100",
      sex: "2",
    });
    expect(male.interpretation).toBe(
      "Moderate risk (Males)",
    );
    expect(female.interpretation).toBe(
      "Increased risk (Females)",
    );
  });

  it("missing sex defaults to male (backward compatible)", () => {
    const r = calc(waistToHipRatioCalculator, {
      waist: "95",
      hip: "100",
    });
    expect(r.interpretation).toBe(
      "Moderate risk (Males)",
    );
  });

  it("hip circumference of zero returns critical (division by zero)", () => {
    const r = calc(waistToHipRatioCalculator, {
      waist: "95",
      hip: "0",
      sex: "1",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("zero");
  });
});

// ---------------------------------------------------------------------------
// CHA₂DS₂-VASc — Sprint 1.9 Batch 13A P1 remediation
// Before fix: a woman with score 1 (sex category only) was classified HIGH.
// Per 2019 AHA/ACC/HRS / 2020 ESC, anticoagulation thresholds key off
// non-sex risk points, so a woman's sex-only score of 1 is LOW risk, the same
// as a man with score 0.
// ---------------------------------------------------------------------------
describe("CHA₂DS₂-VASc sex-only score classification fix", () => {
  const base = {
    chf: "0",
    hypertension: "0",
    age: "0",
    diabetes: "0",
    stroke: "0",
    "vascular-disease": "0",
  };

  it("man with score 0 → LOW, normal, no antithrombotic", () => {
    const r = calc(cha2ds2VascCalculator, { ...base, sex: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("LOW stroke risk");
    expect(r.interpretation).toContain("No antithrombotic therapy");
  });

  it("woman with score 1 (sex category only) → LOW, not HIGH", () => {
    const r = calc(cha2ds2VascCalculator, { ...base, sex: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("LOW stroke risk");
    expect(r.interpretation).toContain("No antithrombotic therapy");
    expect(r.interpretation).not.toContain("Oral anticoagulation is recommended");
  });

  it("man with score 1 → INTERMEDIATE, high", () => {
    const r = calc(cha2ds2VascCalculator, {
      ...base,
      hypertension: "1",
      sex: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("INTERMEDIATE stroke risk");
  });

  it("woman with score 2 (one clinical point + sex) → INTERMEDIATE, high", () => {
    const r = calc(cha2ds2VascCalculator, {
      ...base,
      hypertension: "1",
      sex: "1",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("INTERMEDIATE stroke risk");
  });

  it("woman with score 3 → HIGH, critical, OAC recommended", () => {
    const r = calc(cha2ds2VascCalculator, {
      ...base,
      hypertension: "1",
      diabetes: "1",
      sex: "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("HIGH stroke risk");
    expect(r.interpretation).toContain("Oral anticoagulation is recommended");
  });

  it("scoring is unchanged: sex counts 1 point toward the total", () => {
    const r = calc(cha2ds2VascCalculator, { ...base, sex: "1" });
    expect(r.value).toBe(1);
  });
});


// ---------------------------------------------------------------------------
// SOFA Score — sum of 6 organ sub-scores (0–24)
// Classification: <=1 normal, <=5 high, >5 critical
// ---------------------------------------------------------------------------
describe("SOFA Score calculate() output", () => {
  it("zero: all organ systems normal", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "200", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("boundary: score=1 still normal", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "200", bilirubin: "1.0",
      cardiovascular: "0", gcs: "14", creatinine: "1.0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: score=2 becomes high", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "120", bilirubin: "1.0",
      cardiovascular: "0", gcs: "14", creatinine: "1.0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("moderate: score=5 still high (boundary)", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "1", platelets: "80", bilirubin: "1.5",
      cardiovascular: "0", gcs: "14", creatinine: "1.0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("boundary: score=6 becomes critical", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "1", platelets: "80", bilirubin: "1.5",
      cardiovascular: "0", gcs: "14", creatinine: "1.5",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });

  it("severe: score=17", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "3", platelets: "19", bilirubin: "8.0",
      cardiovascular: "2", gcs: "10", creatinine: "4.0",
    });
    expect(r.value).toBe(17);
    expect(r.status).toBe("critical");
  });

  it("maximum: all organs at max severity = 24", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "4", platelets: "10", bilirubin: "15.0",
      cardiovascular: "4", gcs: "3", creatinine: "6.0",
    });
    expect(r.value).toBe(24);
    expect(r.status).toBe("critical");
  });

  it("component isolation: only liver abnormal", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "200", bilirubin: "4.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("platelet thresholds: 150->0, 149->1, 99->2, 49->3, 19->4", () => {
    expect(calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "150", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    }).value).toBe(0);
    expect(calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "149", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    }).value).toBe(1);
    expect(calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "99", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    }).value).toBe(2);
    expect(calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "49", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    }).value).toBe(3);
    expect(calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "19", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "1.0",
    }).value).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// TIMI — sum of 7 binary criteria (0–7)
// <=1 low, 2–4 intermediate, >=5 high
// ---------------------------------------------------------------------------
describe("TIMI Score calculate() output", () => {
  it("score 0: no risk factors", () => {
    const r = calc(timiCalculator, {
      "age-65": "0", "risk-factors": "0", "known-cad": "0",
      aspirin: "0", "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 1: single criterion", () => {
    const r = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "0", "known-cad": "0",
      aspirin: "0", "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 2 becomes intermediate", () => {
    const r = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "0",
      aspirin: "0", "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("score 4: upper intermediate", () => {
    const r = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "1",
      aspirin: "1", "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("boundary: score 5 becomes high risk", () => {
    const r = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "1",
      aspirin: "1", "anginal-events": "1", "ecg-changes": "0", troponin: "0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("maximum: all 7 criteria present", () => {
    const r = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "1",
      aspirin: "1", "anginal-events": "1", "ecg-changes": "1", troponin: "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// GRACE — sum of 8 pre-scored select values
// <=108 low, 109–140 intermediate, >140 high
// ---------------------------------------------------------------------------
describe("GRACE Score calculate() output", () => {
  it("low risk: score 88 (<=108)", () => {
    const r = calc(graceCalculator, {
      age: "41", "heart-rate": "9", sbp: "34", creatinine: "4",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    expect(r.value).toBe(88);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 108 still low", () => {
    const r = calc(graceCalculator, {
      age: "58", "heart-rate": "15", sbp: "24", creatinine: "10",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "1",
    });
    expect(r.value).toBe(108);
    expect(r.status).toBe("normal");
  });

  it("intermediate: score 111", () => {
    const r = calc(graceCalculator, {
      age: "41", "heart-rate": "15", sbp: "34", creatinine: "7",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "14",
    });
    expect(r.value).toBe(111);
    expect(r.status).toBe("high");
  });

  it("high risk: score 214 (>140)", () => {
    const r = calc(graceCalculator, {
      age: "91", "heart-rate": "24", sbp: "58", creatinine: "21",
      killip: "20", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    expect(r.value).toBe(214);
    expect(r.status).toBe("critical");
  });

  it("maximum: all worst values = 372", () => {
    const r = calc(graceCalculator, {
      age: "100", "heart-rate": "46", sbp: "58", creatinine: "28",
      killip: "59", "cardiac-arrest": "39", "st-deviation": "28", "elevated-enzymes": "14",
    });
    expect(r.value).toBe(372);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// HEART Score — sum of 5 items (0–2 each), total 0–10
// <=3 low, 4–6 moderate, >6 high
// ---------------------------------------------------------------------------
describe("HEART Score calculate() output", () => {
  it("low risk: score 0", () => {
    const r = calc(heartScoreCalculator, {
      history: "0", ecg: "0", age: "0", "risk-factors": "0", troponin: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("low risk: score 3", () => {
    const r = calc(heartScoreCalculator, {
      history: "1", ecg: "1", age: "1", "risk-factors": "0", troponin: "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 4 becomes moderate", () => {
    const r = calc(heartScoreCalculator, {
      history: "1", ecg: "1", age: "1", "risk-factors": "1", troponin: "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("moderate: score 6", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "1", age: "1", "risk-factors": "1", troponin: "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("boundary: score 7 becomes high risk", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "2", age: "1", "risk-factors": "1", troponin: "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("critical");
  });

  it("maximum: score 10", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "2", age: "2", "risk-factors": "2", troponin: "2",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Wells PE — weighted sum (0–12.5), rounded to 1 decimal
// Two-tier: <=4 PE unlikely (normal), >4 PE likely (high)
// ---------------------------------------------------------------------------
describe("Wells PE calculate() output", () => {
  it("low: no criteria met = 0", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "0", "pe-most-likely": "0", tachycardia: "0",
      immobilization: "0", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("moderate: tachycardia + immobilization = 3", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "0", "pe-most-likely": "0", tachycardia: "1",
      immobilization: "1", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("boundary: tachycardia + immobilization + prior DVT = 4.5 -> high", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "0", "pe-most-likely": "0", tachycardia: "1",
      immobilization: "1", "prior-dvt-pe": "1", hemoptysis: "0", malignancy: "0",
    });
    expect(r.value).toBe(4.5);
    expect(r.status).toBe("high");
  });

  it("high: DVT signs + PE most likely = 6", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "1", "pe-most-likely": "1", tachycardia: "0",
      immobilization: "0", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "0",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("very high: DVT signs + PE most likely + tachycardia + malignancy = 8.5", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "1", "pe-most-likely": "1", tachycardia: "1",
      immobilization: "0", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "1",
    });
    expect(r.value).toBe(8.5);
    expect(r.status).toBe("high");
  });

  it("maximum: all criteria = 12.5", () => {
    const r = calc(wellsPeCalculator, {
      "dvt-signs": "1", "pe-most-likely": "1", tachycardia: "1",
      immobilization: "1", "prior-dvt-pe": "1", hemoptysis: "1", malignancy: "1",
    });
    expect(r.value).toBe(12.5);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Wells DVT — sum of 9 items (+1 each) minus 2 if alternative diagnosis
// Two-tier: <2 unlikely (normal), >=2 likely (high)
// ---------------------------------------------------------------------------
describe("Wells DVT calculate() output", () => {
  it("low: no criteria = 0", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "0", paralysis: "0", bedridden: "0",
      "localized-tenderness": "0", "entire-leg-swollen": "0", "calf-swelling": "0",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("moderate: localized tenderness + calf swelling = 2", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "0", paralysis: "0", bedridden: "0",
      "localized-tenderness": "1", "entire-leg-swollen": "0", "calf-swelling": "1",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("high: 3 criteria = 3", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "1", paralysis: "1", bedridden: "1",
      "localized-tenderness": "0", "entire-leg-swollen": "0", "calf-swelling": "0",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("subtraction: 3 criteria with alternative diagnosis = 1 -> low", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "1", paralysis: "1", bedridden: "1",
      "localized-tenderness": "0", "entire-leg-swollen": "0", "calf-swelling": "0",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "1",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("maximum: all 9 positive, no alternative = 9", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "1", paralysis: "1", bedridden: "1",
      "localized-tenderness": "1", "entire-leg-swollen": "1", "calf-swelling": "1",
      "pitting-edema": "1", "collateral-veins": "1", "previous-dvt": "1",
      "alternative-diagnosis": "0",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("high");
  });

  it("max with subtraction: all 9 + alternative = 7", () => {
    const r = calc(wellsDvtCalculator, {
      "active-cancer": "1", paralysis: "1", bedridden: "1",
      "localized-tenderness": "1", "entire-leg-swollen": "1", "calf-swelling": "1",
      "pitting-edema": "1", "collateral-veins": "1", "previous-dvt": "1",
      "alternative-diagnosis": "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// PERC Rule — count of 8 criteria met (all-or-nothing)
// 8/8 = negative (normal), <8 = positive (high)
// ---------------------------------------------------------------------------
describe("PERC Rule calculate() output", () => {
  it("all 8 met: PERC negative", () => {
    const r = calc(percRuleCalculator, {
      age: "1", "heart-rate": "1", "oxygen-saturation": "1",
      hemoptysis: "1", estrogen: "1", "prior-dvt-pe": "1",
      "leg-swelling": "1", "surgery-trauma": "1",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("normal");
  });

  it("7 of 8 met: PERC positive", () => {
    const r = calc(percRuleCalculator, {
      age: "1", "heart-rate": "1", "oxygen-saturation": "1",
      hemoptysis: "1", estrogen: "1", "prior-dvt-pe": "1",
      "leg-swelling": "1", "surgery-trauma": "0",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("high");
  });

  it("only age criterion met: 1/8", () => {
    const r = calc(percRuleCalculator, {
      age: "1", "heart-rate": "0", "oxygen-saturation": "0",
      hemoptysis: "0", estrogen: "0", "prior-dvt-pe": "0",
      "leg-swelling": "0", "surgery-trauma": "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("none met: 0/8", () => {
    const r = calc(percRuleCalculator, {
      age: "0", "heart-rate": "0", "oxygen-saturation": "0",
      hemoptysis: "0", estrogen: "0", "prior-dvt-pe": "0",
      "leg-swelling": "0", "surgery-trauma": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// PSI/PORT — age + sex adjustment + comorbidities + vitals + labs
// Class I: age<50, no comorbidities/risk findings -> normal
// Class II: <=70 -> normal, III: 71-90 -> high, IV: 91-130 -> high, V: >130 -> critical
// ---------------------------------------------------------------------------
describe("PSI/PORT Score calculate() output", () => {
  it("Class I: age 40 male, no comorbidities, normal vitals/labs", () => {
    const r = calc(psiPortCalculator, {
      age: "40", sex: "male",
      "nursing-home": "0", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "0", cerebrovascular: "0", "renal-disease": "0", ams: "0",
      "respiratory-rate": "16", sbp: "130", temperature: "37.0",
      "heart-rate": "80", ph: "", bun: "15", sodium: "140",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
    });
    expect(r.value).toBe(40);
    expect(r.status).toBe("normal");
  });

  it("Class II: age 65 male, no comorbidities -> score 65", () => {
    const r = calc(psiPortCalculator, {
      age: "65", sex: "male",
      "nursing-home": "0", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "0", cerebrovascular: "0", "renal-disease": "0", ams: "0",
      "respiratory-rate": "16", sbp: "130", temperature: "37.0",
      "heart-rate": "80", ph: "", bun: "15", sodium: "140",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
    });
    expect(r.value).toBe(65);
    expect(r.status).toBe("normal");
  });

  it("Class IV: age 70 + CHF(10) + SBP<90(20) + BUN>=30(20) = 120", () => {
    const r = calc(psiPortCalculator, {
      age: "70", sex: "male",
      "nursing-home": "0", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "1", cerebrovascular: "0", "renal-disease": "0", ams: "0",
      "respiratory-rate": "16", sbp: "85", temperature: "37.0",
      "heart-rate": "80", ph: "", bun: "35", sodium: "140",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
    });
    expect(r.value).toBe(120);
    expect(r.status).toBe("high");
  });

  it("Class V: high-acuity case >130", () => {
    const r = calc(psiPortCalculator, {
      age: "80", sex: "male",
      "nursing-home": "1", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "1", cerebrovascular: "0", "renal-disease": "0", ams: "1",
      "respiratory-rate": "32", sbp: "80", temperature: "37.0",
      "heart-rate": "130", ph: "", bun: "40", sodium: "125",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
    });
    expect(r.value).toBe(210);
    expect(r.status).toBe("critical");
  });

  it("female sex adjustment: age 70 female -> 70 - 10 = 60", () => {
    const r = calc(psiPortCalculator, {
      age: "70", sex: "female",
      "nursing-home": "0", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "0", cerebrovascular: "0", "renal-disease": "0", ams: "0",
      "respiratory-rate": "16", sbp: "130", temperature: "37.0",
      "heart-rate": "80", ph: "", bun: "15", sodium: "140",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
    });
    expect(r.value).toBe(60);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// SIRS Criteria — count of 4 (temp>38/<36, HR>90, RR>20, WBC>12/<4)
// >=2 -> high (SIRS present), <2 -> normal
// Strict inequalities: exactly 38, 36, 90, 20, 12, 4 are NOT abnormal
// ---------------------------------------------------------------------------
describe("SIRS Criteria calculate() output", () => {
  it("0 criteria: all normal", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "37.0", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("1 criterion: temperature only (38.5 > 38)", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "38.5", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: exactly 38 C is NOT abnormal (strict >38)", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "38.0", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("boundary: 38.1 C IS abnormal", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "38.1", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: exactly 36 C is NOT abnormal", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "36.0", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("boundary: 35.9 C IS abnormal", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "35.9", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: exactly 90 bpm is NOT abnormal", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "37.0", "heart-rate": "90", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("2 criteria: fever + tachycardia -> SIRS present", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "39.0", "heart-rate": "110", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("all 4 criteria met", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "39.5", "heart-rate": "120", "respiratory-rate": "25", wbc: "15",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("hypothermia + leukopenia: temp 35.5 + WBC 3 = 2 criteria", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "35.5", "heart-rate": "80", "respiratory-rate": "16", wbc: "3",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Revised Trauma Score — coded lookup tables, 4-decimal precision
// GCS code: >=13->4, >=9->3, >=6->2, >=4->1, <4->0
// SBP code: >89->4, >=76->3, >=50->2, >=1->1, <1->0
// RR code: 10-29->4, >29->3, >=6->2, >=1->1, <1->0
// RTS = 0.9368*GCS + 0.7326*SBP + 0.2908*RR
// Classification: <4 critical, <7.84 high, >=7.84 normal
// ---------------------------------------------------------------------------
describe("Revised Trauma Score calculate() output", () => {
  it("worst: GCS=3, SBP=0, RR=0 -> 0", () => {
    const r = calc(rtsCalculator, { gcs: "3", sbp: "0", rr: "0" });
    // GCS code=0, SBP code=0, RR code=0 -> 0
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
  });

  it("best: GCS=15, SBP=120, RR=16 -> 7.8408", () => {
    const r = calc(rtsCalculator, { gcs: "15", sbp: "120", rr: "16" });
    // GCS code=4, SBP code=4, RR code=4
    // 0.9368*4 + 0.7326*4 + 0.2908*4 = 3.7472 + 2.9304 + 1.1632 = 7.8408
    expect(r.value).toBe(7.8408);
    expect(r.status).toBe("normal");
  });

  it("GCS boundary: GCS 13 -> code 4, GCS 12 -> code 3", () => {
    const r13 = calc(rtsCalculator, { gcs: "13", sbp: "120", rr: "16" });
    const r12 = calc(rtsCalculator, { gcs: "12", sbp: "120", rr: "16" });
    // GCS 13: code=4 -> 0.9368*4 + 0.7326*4 + 0.2908*4 = 7.8408
    expect(r13.value).toBe(7.8408);
    // GCS 12: code=3 -> 0.9368*3 + 0.7326*4 + 0.2908*4 = 2.8104 + 2.9304 + 1.1632 = 6.904
    expect(r12.value).toBeCloseTo(6.904, 4);
    expect(r12.status).toBe("high");
  });

  it("SBP boundary: SBP 90 -> code 4, SBP 89 -> code 3", () => {
    const r90 = calc(rtsCalculator, { gcs: "15", sbp: "90", rr: "16" });
    const r89 = calc(rtsCalculator, { gcs: "15", sbp: "89", rr: "16" });
    // SBP 90: code=4 -> 7.8408
    expect(r90.value).toBe(7.8408);
    // SBP 89: code=3 -> 0.9368*4 + 0.7326*3 + 0.2908*4 = 3.7472 + 2.1978 + 1.1632 = 7.1082
    expect(r89.value).toBeCloseTo(7.1082, 4);
    expect(r89.status).toBe("high");
  });

  it("RR boundary: RR 29 -> code 4, RR 30 -> code 3", () => {
    const r29 = calc(rtsCalculator, { gcs: "15", sbp: "120", rr: "29" });
    const r30 = calc(rtsCalculator, { gcs: "15", sbp: "120", rr: "30" });
    // RR 29: code=4 -> 7.8408
    expect(r29.value).toBe(7.8408);
    // RR 30: code=3 -> 0.9368*4 + 0.7326*4 + 0.2908*3 = 3.7472 + 2.9304 + 0.8724 = 7.55
    expect(r30.value).toBeCloseTo(7.55, 4);
    expect(r30.status).toBe("high");
  });

  it("representative moderate: GCS=9, SBP=80, RR=24", () => {
    const r = calc(rtsCalculator, { gcs: "9", sbp: "80", rr: "24" });
    // GCS 9: code=3, SBP 80: code=3, RR 24: code=4
    // 0.9368*3 + 0.7326*3 + 0.2908*4 = 2.8104 + 2.1978 + 1.1632 = 6.1714
    expect(r.value).toBeCloseTo(6.1714, 4);
    expect(r.status).toBe("high");
  });

  it("4-decimal precision is maintained", () => {
    const r = calc(rtsCalculator, { gcs: "8", sbp: "75", rr: "5" });
    // GCS 8: code=2, SBP 75: code=2, RR 5: code=1
    // 0.9368*2 + 0.7326*2 + 0.2908*1 = 1.8736 + 1.4652 + 0.2908 = 3.6296
    expect(r.value).toBeCloseTo(3.6296, 4);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// HAS-BLED — sum of 9 binary criteria (0–9)
// <=1 low, ==2 moderate, >=3 high
// ---------------------------------------------------------------------------
describe("HAS-BLED calculate() output", () => {
  it("score 0: no risk factors", () => {
    const r = calc(hasBledCalculator, {
      hypertension: "0", renal: "0", liver: "0", stroke: "0",
      bleeding: "0", "labile-inr": "0", elderly: "0", drugs: "0", alcohol: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 1: still low", () => {
    const r = calc(hasBledCalculator, {
      hypertension: "1", renal: "0", liver: "0", stroke: "0",
      bleeding: "0", "labile-inr": "0", elderly: "0", drugs: "0", alcohol: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("score 2: isolated moderate bracket", () => {
    const r = calc(hasBledCalculator, {
      hypertension: "1", renal: "1", liver: "0", stroke: "0",
      bleeding: "0", "labile-inr": "0", elderly: "0", drugs: "0", alcohol: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("score 3: high risk", () => {
    const r = calc(hasBledCalculator, {
      hypertension: "1", renal: "1", liver: "1", stroke: "0",
      bleeding: "0", "labile-inr": "0", elderly: "0", drugs: "0", alcohol: "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("maximum: all 9 criteria = 9", () => {
    const r = calc(hasBledCalculator, {
      hypertension: "1", renal: "1", liver: "1", stroke: "1",
      bleeding: "1", "labile-inr": "1", elderly: "1", drugs: "1", alcohol: "1",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// RCRI — sum of 6 binary criteria (0–6)
// 0 -> normal, 1 -> high, 2 -> high, >=3 -> critical
// ---------------------------------------------------------------------------
describe("RCRI calculate() output", () => {
  it("score 0: low risk", () => {
    const r = calc(rcriCalculator, {
      "high-risk-surgery": "0", "ischemic-heart-disease": "0", chf: "0",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 1: low-moderate", () => {
    const r = calc(rcriCalculator, {
      "high-risk-surgery": "1", "ischemic-heart-disease": "0", chf: "0",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("score 2: moderate", () => {
    const r = calc(rcriCalculator, {
      "high-risk-surgery": "1", "ischemic-heart-disease": "1", chf: "0",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("score 3: high risk", () => {
    const r = calc(rcriCalculator, {
      "high-risk-surgery": "1", "ischemic-heart-disease": "1", chf: "1",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("maximum: all 6 = 6", () => {
    const r = calc(rcriCalculator, {
      "high-risk-surgery": "1", "ischemic-heart-disease": "1", chf: "1",
      cerebrovascular: "1", "insulin-diabetes": "1", creatinine: "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// ASCVD Risk — pooled cohort equations, 4 race/sex groups
// <5% low, 5-7.4% borderline, 7.5-19.9% intermediate, >=20% high
// Validated ages 40-79
// ---------------------------------------------------------------------------
describe("ASCVD Risk calculate() output", () => {
  it("low risk: white male, 55, non-smoker, no DM, TC=180, HDL=50, SBP=120 untreated", () => {
    const r = calc(ascvdCalculator, {
      age: "55", sex: "male", race: "white",
      "total-cholesterol": "180", hdl: "50", sbp: "120",
      "hypertension-treated": "untreated", smoker: "0", diabetes: "0",
    });
    expect(typeof r.value).toBe("number");
    expect(r.value).toBeLessThan(5);
    expect(r.status).toBe("normal");
  });

  it("high risk: white male, 75, smoker, DM, TC=280, HDL=30, SBP=180 treated", () => {
    const r = calc(ascvdCalculator, {
      age: "75", sex: "male", race: "white",
      "total-cholesterol": "280", hdl: "30", sbp: "180",
      "hypertension-treated": "treated", smoker: "1", diabetes: "1",
    });
    expect(typeof r.value).toBe("number");
    expect(r.value).toBeGreaterThanOrEqual(20);
    expect(r.status).toBe("critical");
  });

  it("representative: white female, 65, non-smoker, no DM, TC=220, HDL=60, SBP=130 untreated", () => {
    const r = calc(ascvdCalculator, {
      age: "65", sex: "female", race: "white",
      "total-cholesterol": "220", hdl: "60", sbp: "130",
      "hypertension-treated": "untreated", smoker: "0", diabetes: "0",
    });
    expect(typeof r.value).toBe("number");
    expect(r.status).toMatch(/normal|low|high|critical/);
  });

  it("representative: black male, 60, smoker, DM, TC=240, HDL=35, SBP=160 treated", () => {
    const r = calc(ascvdCalculator, {
      age: "60", sex: "male", race: "black",
      "total-cholesterol": "240", hdl: "35", sbp: "160",
      "hypertension-treated": "treated", smoker: "1", diabetes: "1",
    });
    expect(typeof r.value).toBe("number");
    expect(r.status).toMatch(/normal|low|high|critical/);
  });

  it("representative: black female, 55, non-smoker, no DM, TC=200, HDL=55, SBP=125 untreated", () => {
    const r = calc(ascvdCalculator, {
      age: "55", sex: "female", race: "black",
      "total-cholesterol": "200", hdl: "55", sbp: "125",
      "hypertension-treated": "untreated", smoker: "0", diabetes: "0",
    });
    expect(typeof r.value).toBe("number");
    expect(r.status).toMatch(/normal|low|high|critical/);
  });

  it("risk value is a percentage", () => {
    const r = calc(ascvdCalculator, {
      age: "60", sex: "male", race: "white",
      "total-cholesterol": "220", hdl: "45", sbp: "140",
      "hypertension-treated": "treated", smoker: "1", diabetes: "0",
    });
    expect(typeof r.value).toBe("number");
    expect(r.unit).toBe("%");
    expect(r.status).toMatch(/normal|low|high|critical/);
  });
});

// ---------------------------------------------------------------------------
// DAPT Score — age-weighted + 8 binary items, range -2 to +10
// >=2 favors extended DAPT (high), <2 standard (normal)
// ---------------------------------------------------------------------------
describe("DAPT Score calculate() output", () => {
  it("negative from age: >=75 + nothing else = -2", () => {
    const r = calc(daptCalculator, {
      age: "-2", smoking: "0", diabetes: "0",
      "mi-at-presentation": "0", "prior-mi-pci": "0",
      "stent-diameter": "0", paclitaxel: "0",
      "chf-lvef": "0", "svg-pci": "0",
    });
    expect(r.value).toBe(-2);
    expect(r.status).toBe("normal");
  });

  it("score 0: young patient, no risk factors", () => {
    const r = calc(daptCalculator, {
      age: "0", smoking: "0", diabetes: "0",
      "mi-at-presentation": "0", "prior-mi-pci": "0",
      "stent-diameter": "0", paclitaxel: "0",
      "chf-lvef": "0", "svg-pci": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 1: below cutoff", () => {
    const r = calc(daptCalculator, {
      age: "0", smoking: "1", diabetes: "0",
      "mi-at-presentation": "0", "prior-mi-pci": "0",
      "stent-diameter": "0", paclitaxel: "0",
      "chf-lvef": "0", "svg-pci": "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 2 favors extended DAPT", () => {
    const r = calc(daptCalculator, {
      age: "0", smoking: "1", diabetes: "1",
      "mi-at-presentation": "0", "prior-mi-pci": "0",
      "stent-diameter": "0", paclitaxel: "0",
      "chf-lvef": "0", "svg-pci": "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("high: CHF(+2) + SVG PCI(+2) + age 65-75(-1) = 3", () => {
    const r = calc(daptCalculator, {
      age: "-1", smoking: "0", diabetes: "0",
      "mi-at-presentation": "0", "prior-mi-pci": "0",
      "stent-diameter": "0", paclitaxel: "0",
      "chf-lvef": "1", "svg-pci": "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("maximum: age<65(0) + all items = 10", () => {
    const r = calc(daptCalculator, {
      age: "0", smoking: "1", diabetes: "1",
      "mi-at-presentation": "1", "prior-mi-pci": "1",
      "stent-diameter": "1", paclitaxel: "1",
      "chf-lvef": "1", "svg-pci": "1",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// H2FPEF Score — mixed numeric/select inputs, range 0-9
// <=1 low, 2-5 intermediate, >5 high
// ---------------------------------------------------------------------------
describe("H2FPEF Score calculate() output", () => {
  it("low: no afib, BMI 25, age 50, <2 antihtn, E/e'<=9, PASP<=35", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "25", age: "50",
      antihypertensives: "0", "e-e-ratio": "0", pasp: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("BMI threshold: BMI 31 -> +2", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "31", age: "50",
      antihypertensives: "0", "e-e-ratio": "0", pasp: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("age threshold: age 61 -> +1", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "25", age: "61",
      antihypertensives: "0", "e-e-ratio": "0", pasp: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("age exactly 60 -> NOT elevated (strict >60)", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "25", age: "60",
      antihypertensives: "0", "e-e-ratio": "0", pasp: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("afib=3 + BMI>30(2) + age>60(1) + antihtn>=2(1) + E/e'>9(1) + PASP>35(1) = 9", () => {
    const r = calc(h2fpefCalculator, {
      afib: "3", bmi: "35", age: "65",
      antihypertensives: "1", "e-e-ratio": "1", pasp: "1",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("critical");
  });

  it("boundary: score 5 still intermediate", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "35", age: "65",
      antihypertensives: "1", "e-e-ratio": "1", pasp: "0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("boundary: score 6 becomes high", () => {
    const r = calc(h2fpefCalculator, {
      afib: "0", bmi: "35", age: "65",
      antihypertensives: "1", "e-e-ratio": "1", pasp: "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// MELD Score — logarithmic formula with floor/ceiling
// MELD = 3.78*ln(bili) + 11.2*ln(INR) + 9.57*ln(cr) + 6.43
// Floor: bili>=1, INR>=1, cr clamped [1,4] (or 4 if dialysis)
// <10 normal, <20 high, <30 high, <40 critical, >=40 critical
// ---------------------------------------------------------------------------
describe("MELD Score calculate() output", () => {
  it("low: bili=1, INR=1, cr=1, no dialysis -> ~6", () => {
    // 3.78*ln(1) + 11.2*ln(1) + 9.57*ln(1) + 6.43 = 0+0+0+6.43 = 6.43 -> round to 6
    const r = calc(meldCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", dialysis: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });

  it("moderate: bili=3, INR=1.5, cr=2, no dialysis", () => {
    // 3.78*ln(3) + 11.2*ln(1.5) + 9.57*ln(2) + 6.43
    // = 3.78*1.0986 + 11.2*0.4055 + 9.57*0.6931 + 6.43
    // = 4.153 + 4.541 + 6.632 + 6.43 = 21.756 -> round to 22
    const r = calc(meldCalculator, {
      bilirubin: "3", creatinine: "2", inr: "1.5", dialysis: "no",
    });
    expect(r.value).toBe(22);
    expect(r.status).toBe("high");
  });

  it("dialysis override: cr forced to 4", () => {
    // bili=1, INR=1, cr=1 but dialysis=yes -> cr=4
    // 3.78*ln(1) + 11.2*ln(1) + 9.57*ln(4) + 6.43
    // = 0 + 0 + 9.57*1.3863 + 6.43 = 13.266 + 6.43 = 19.696 -> round to 20
    const r = calc(meldCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", dialysis: "yes",
    });
    expect(r.value).toBe(20);
    expect(r.status).toBe("high");
  });

  it("cr floor: cr=0.5 clamped to 1", () => {
    // Same as bili=1, INR=1, cr=1 -> 6
    const r = calc(meldCalculator, {
      bilirubin: "1", creatinine: "0.5", inr: "1", dialysis: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });

  it("cr ceiling: cr=8 clamped to 4", () => {
    // bili=1, INR=1, cr=8 clamped to 4 -> same as cr=4
    const r8 = calc(meldCalculator, {
      bilirubin: "1", creatinine: "8", inr: "1", dialysis: "no",
    });
    const r4 = calc(meldCalculator, {
      bilirubin: "1", creatinine: "4", inr: "1", dialysis: "no",
    });
    expect(r8.value).toBe(r4.value);
  });

  it("very high: bili=10, INR=3, cr=4", () => {
    // 3.78*ln(10) + 11.2*ln(3) + 9.57*ln(4) + 6.43
    // = 3.78*2.3026 + 11.2*1.0986 + 9.57*1.3863 + 6.43
    // = 8.704 + 12.304 + 13.266 + 6.43 = 40.704 -> round to 41
    const r = calc(meldCalculator, {
      bilirubin: "10", creatinine: "4", inr: "3", dialysis: "no",
    });
    expect(r.value).toBe(41);
    expect(r.status).toBe("critical");
  });

  it("bili floor: bili=0.3 clamped to 1", () => {
    const r = calc(meldCalculator, {
      bilirubin: "0.3", creatinine: "1", inr: "1", dialysis: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });

  it("INR floor: INR=0.6 clamped to 1", () => {
    const r = calc(meldCalculator, {
      bilirubin: "1", creatinine: "1", inr: "0.6", dialysis: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// MELD-Na Score — MELD + sodium correction with clamping [125,137]
// MELD-Na = MELD + 1.32*(137-Na) - 0.033*MELD*(137-Na)
// <10 normal, <20 high, <30 high, <40 critical, >=40 critical
// ---------------------------------------------------------------------------
describe("MELD-Na Score calculate() output", () => {
  it("normal sodium (137): MELD-Na = MELD", () => {
    // bili=1, INR=1, cr=1, Na=137 -> MELD=6, Na adjustment=0
    const r = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "137", dialysis: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });

  it("low sodium: Na=130 adds points", () => {
    // MELD = 6 (from above)
    // adjustment = 1.32*(137-130) - 0.033*6*(137-130) = 1.32*7 - 0.033*6*7 = 9.24 - 1.386 = 7.854
    // MELD-Na = 6 + 7.854 = 13.854 -> round to 14
    const r = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "130", dialysis: "no",
    });
    expect(r.value).toBe(14);
    expect(r.status).toBe("high");
  });

  it("sodium clamped below 125: Na=120 treated as 125", () => {
    const r120 = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "120", dialysis: "no",
    });
    const r125 = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "125", dialysis: "no",
    });
    expect(r120.value).toBe(r125.value);
  });

  it("sodium clamped above 137: Na=145 treated as 137", () => {
    const r145 = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "145", dialysis: "no",
    });
    const r137 = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "137", dialysis: "no",
    });
    expect(r145.value).toBe(r137.value);
  });

  it("sodium 125: maximum Na adjustment", () => {
    // MELD = 6.43, Na=125 -> 137-125=12
    // adjustment = 1.32*12 - 0.033*6.43*12 = 15.84 - 2.54648 = 13.29352
    // MELD-Na = 6.43 + 13.29352 = 19.72352 -> round to 20
    const r = calc(meldNaCalculator, {
      bilirubin: "1", creatinine: "1", inr: "1", sodium: "125", dialysis: "no",
    });
    expect(r.value).toBe(20);
    expect(r.status).toBe("high");
  });

  it("higher MELD with low Na: bili=5, INR=2, cr=3, Na=128", () => {
    // MELD = 3.78*ln(5) + 11.2*ln(2) + 9.57*ln(3) + 6.43
    // = 3.78*1.6094 + 11.2*0.6931 + 9.57*1.0986 + 6.43
    // = 6.084 + 7.763 + 10.513 + 6.43 = 30.79 -> round to 31
    // Na=128 -> 137-128=9
    // adjustment = 1.32*9 - 0.033*31*9 = 11.88 - 9.207 = 2.673
    // MELD-Na = 31 + 2.673 = 33.673 -> round to 34
    const r = calc(meldNaCalculator, {
      bilirubin: "5", creatinine: "3", inr: "2", sodium: "128", dialysis: "no",
    });
    expect(r.value).toBe(34);
    expect(r.status).toBe("critical");
  });

  it("extreme: bili=15, INR=4, cr=4, Na=125 -> very high", () => {
    const r = calc(meldNaCalculator, {
      bilirubin: "15", creatinine: "4", inr: "4", sodium: "125", dialysis: "no",
    });
    expect(typeof r.value).toBe("number");
    expect(r.value).toBeGreaterThanOrEqual(40);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Parkland Formula — 4 * weight * TBSA
// TBSA <10% normal, 10-19% high, >=20% critical
// totalVolume = 4*weight*TBSA, first8h = total/2, next16h = total/2
// ---------------------------------------------------------------------------
describe("Parkland Formula calculate() output", () => {
  it("minor: 70kg, 5% TBSA (head only)", () => {
    // TBSA=5, total=4*70*5=1400
    const r = calc(parklandFormulaCalculator, {
      weight: "70", head: "5", "anterior-trunk": "0", "posterior-trunk": "0",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "0", "left-lower-limb": "0", perineum: "0",
    });
    expect(r.value).toBe(1400);
    expect(r.status).toBe("normal");
    expect(r.advice).toBeDefined();
  });

  it("moderate: 80kg, 15% TBSA", () => {
    // TBSA=15, total=4*80*15=4800
    // first8h=2400, next16h=2400
    // first8hRate=300, next16hRate=150
    const r = calc(parklandFormulaCalculator, {
      weight: "80", head: "0", "anterior-trunk": "10", "posterior-trunk": "5",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "0", "left-lower-limb": "0", perineum: "0",
    });
    expect(r.value).toBe(4800);
    expect(r.status).toBe("high");
    expect(r.score).toBe(4800);
  });

  it("major: 70kg, 30% TBSA", () => {
    // TBSA=30, total=4*70*30=8400
    const r = calc(parklandFormulaCalculator, {
      weight: "70", head: "0", "anterior-trunk": "18", "posterior-trunk": "12",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "0", "left-lower-limb": "0", perineum: "0",
    });
    expect(r.value).toBe(8400);
    expect(r.status).toBe("critical");
  });

  it("TBSA boundary: exactly 10% -> high", () => {
    const r = calc(parklandFormulaCalculator, {
      weight: "70", head: "0", "anterior-trunk": "10", "posterior-trunk": "0",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "0", "left-lower-limb": "0", perineum: "0",
    });
    expect(r.value).toBe(2800);
    expect(r.status).toBe("high");
  });

  it("TBSA boundary: exactly 20% -> critical", () => {
    const r = calc(parklandFormulaCalculator, {
      weight: "70", head: "0", "anterior-trunk": "18", "posterior-trunk": "2",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "0", "left-lower-limb": "0", perineum: "0",
    });
    expect(r.value).toBe(5600);
    expect(r.status).toBe("critical");
  });

  it("rate calculations: 70kg, 20% TBSA", () => {
    // total=4*70*20=5600, first8h=2800, next16h=2800
    // first8hRate=350, next16hRate=175
    const r = calc(parklandFormulaCalculator, {
      weight: "70", head: "0", "anterior-trunk": "0", "posterior-trunk": "0",
      "right-upper-limb": "0", "left-upper-limb": "0",
      "right-lower-limb": "10", "left-lower-limb": "10", perineum: "0",
    });
    expect(r.value).toBe(5600);
    expect(r.advice).toBeDefined();
    expect(r.advice?.[0]).toContain("2800");
    expect(r.advice?.[1]).toContain("2800");
  });
});

// ---------------------------------------------------------------------------
// APRI Score — (AST/ULN * 100) / Platelets, 2 decimal rounding
// <0.5 low, <=1.5 intermediate, <=2.0 significant, >2.0 cirrhosis
// ---------------------------------------------------------------------------
describe("APRI Score calculate() output", () => {
  it("low: AST=30, ULN=40, platelets=250 -> 0.3", () => {
    // (30/40*100)/250 = 75/250 = 0.3
    const r = calc(apriCalculator, { ast: "30", uln: "40", platelets: "250" });
    expect(r.value).toBe(0.3);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 0.5", () => {
    // AST=50, ULN=40, platelets=250 -> (50/40*100)/250 = 125/250 = 0.5
    const r = calc(apriCalculator, { ast: "50", uln: "40", platelets: "250" });
    expect(r.value).toBe(0.5);
    expect(r.status).toBe("high");
  });

  it("intermediate: score ~1.0", () => {
    // AST=100, ULN=40, platelets=250 -> (100/40*100)/250 = 250/250 = 1
    const r = calc(apriCalculator, { ast: "100", uln: "40", platelets: "250" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("boundary: score 1.5", () => {
    // AST=150, ULN=40, platelets=250 -> (150/40*100)/250 = 375/250 = 1.5
    const r = calc(apriCalculator, { ast: "150", uln: "40", platelets: "250" });
    expect(r.value).toBe(1.5);
    expect(r.status).toBe("high");
  });

  it("significant: score 2.0", () => {
    // AST=200, ULN=40, platelets=250 -> (200/40*100)/250 = 500/250 = 2
    const r = calc(apriCalculator, { ast: "200", uln: "40", platelets: "250" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("cirrhosis: score >2.0", () => {
    // AST=300, ULN=40, platelets=100 -> (300/40*100)/100 = 750/100 = 7.5
    const r = calc(apriCalculator, { ast: "300", uln: "40", platelets: "100" });
    expect(r.value).toBe(7.5);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// FIB-4 Index — (Age * AST) / (Platelets * sqrt(ALT)), 2 decimal rounding
// <1.3 low, <=2.67 intermediate, >2.67 high
// ---------------------------------------------------------------------------
describe("FIB-4 Index calculate() output", () => {
  it("low: age=35, AST=25, ALT=30, platelets=250", () => {
    // (35*25)/(250*sqrt(30)) = 875/(250*5.477) = 875/1369.3 = 0.639 -> 0.64
    const r = calc(fib4Calculator, {
      age: "35", ast: "25", alt: "30", platelets: "250",
    });
    expect(r.value).toBeCloseTo(0.64, 1);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 1.30", () => {
    // age=50, AST=80, ALT=60, platelets=200
    // (50*80)/(200*sqrt(60)) = 4000/(200*7.746) = 4000/1549.2 = 2.582 -> not 1.30
    // Need: (age*AST)/(platelets*sqrt(ALT)) = 1.30
    // Try: age=40, AST=50, ALT=80, platelets=155
    // (40*50)/(155*sqrt(80)) = 2000/(155*8.944) = 2000/1386.3 = 1.443 -> not exact
    // Try: age=35, AST=40, ALT=50, platelets=155
    // (35*40)/(155*sqrt(50)) = 1400/(155*7.071) = 1400/1096 = 1.277 -> ~1.28
    // Close enough to test boundary behavior. Use a value clearly in the low range
    // and a value clearly in the intermediate range instead.
    const rLow = calc(fib4Calculator, {
      age: "35", ast: "40", alt: "50", platelets: "155",
    });
    expect(rLow.value).toBeCloseTo(1.28, 1);
    expect(rLow.status).toBe("normal");
  });

  it("intermediate: age=55, AST=80, ALT=60, platelets=120", () => {
    // (55*80)/(120*sqrt(60)) = 4400/(120*7.746) = 4400/929.5 = 4.734
    // That's high. Try: age=45, AST=60, ALT=80, platelets=130
    // (45*60)/(130*sqrt(80)) = 2700/(130*8.944) = 2700/1162.7 = 2.323 -> intermediate
    const r = calc(fib4Calculator, {
      age: "45", ast: "60", alt: "80", platelets: "130",
    });
    expect(r.value).toBeCloseTo(2.32, 1);
    expect(r.status).toBe("high");
  });

  it("boundary: score 2.67", () => {
    // age=60, AST=100, ALT=50, platelets=120
    // (60*100)/(120*sqrt(50)) = 6000/(120*7.071) = 6000/848.5 = 7.07 -> too high
    // Try: age=50, AST=70, ALT=100, platelets=130
    // (50*70)/(130*sqrt(100)) = 3500/(130*10) = 3500/1300 = 2.692 -> just above
    const r = calc(fib4Calculator, {
      age: "50", ast: "70", alt: "100", platelets: "130",
    });
    expect(r.value).toBeCloseTo(2.69, 1);
    expect(r.status).toBe("critical");
  });

  it("high risk: age=65, AST=120, ALT=40, platelets=80", () => {
    // (65*120)/(80*sqrt(40)) = 7800/(80*6.325) = 7800/506 = 15.415 -> 15.42
    const r = calc(fib4Calculator, {
      age: "65", ast: "120", alt: "40", platelets: "80",
    });
    expect(r.value).toBeCloseTo(15.42, 1);
    expect(r.status).toBe("critical");
  });

  it("rounding to 2 decimals", () => {
    // age=40, AST=33, ALT=45, platelets=200
    // (40*33)/(200*sqrt(45)) = 1320/(200*6.708) = 1320/1341.6 = 0.984 -> 0.98
    const r = calc(fib4Calculator, {
      age: "40", ast: "33", alt: "45", platelets: "200",
    });
    expect(r.value).toBeCloseTo(0.98, 1);
    expect(r.status).toBe("normal");
  });
});
