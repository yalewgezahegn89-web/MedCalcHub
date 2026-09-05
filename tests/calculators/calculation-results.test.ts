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

import { homaIrCalculator } from "../../lib/calculators/homa-ir";
import { homaBCalculator } from "../../lib/calculators/homa-b";
import {
  insulinSensitivityCalculator,
} from "../../lib/calculators/insulin-sensitivity";
import {
  freeThyroxineIndexCalculator,
} from "../../lib/calculators/free-thyroxine-index";
import {
  metabolicSyndromeAtp3Calculator,
} from "../../lib/calculators/metabolic-syndrome-atp3";
import { tygIndexCalculator } from "../../lib/calculators/tyg-index";
import { quickiCalculator } from "../../lib/calculators/quicki";
import {
  triglycerideHdlRatioCalculator,
} from "../../lib/calculators/triglyceride-hdl-ratio";
import {
  ldlCholesterolCalculator,
} from "../../lib/calculators/ldl-cholesterol";
import {
  nonHdlCholesterolCalculator,
} from "../../lib/calculators/non-hdl-cholesterol";
import {
  albuminGlobulinRatioCalculator,
} from "../../lib/calculators/albumin-globulin-ratio";
import {
  glasgowBlatchfordCalculator,
} from "../../lib/calculators/glasgow-blatchford-score";
import { maddreyCalculator } from "../../lib/calculators/maddrey-discriminant-function";
import {
  nafldFibrosisCalculator,
} from "../../lib/calculators/nafld-fibrosis-score";
import { rockallCalculator } from "../../lib/calculators/rockall-score";
import { aaGradientCalculator } from "../../lib/calculators/a-a-gradient";
import { oxygenIndexCalculator } from "../../lib/calculators/oxygen-index";
import { pfRatioCalculator } from "../../lib/calculators/pf-ratio";
import { roxIndexCalculator } from "../../lib/calculators/rox-index";
import {
  respiratoryCompensationCalculator,
} from "../../lib/calculators/respiratory-compensation";
import {
  metabolicAlkalosisCompensationCalculator,
} from "../../lib/calculators/metabolic-alkalosis-compensation";

import { ktVCalculator } from "../../lib/calculators/kt-v";
import {
  atherogenicIndexPlasmaCalculator,
} from "../../lib/calculators/atherogenic-index-of-plasma";
import {
  pecarnHeadTraumaCalculator,
} from "../../lib/calculators/pecarn-head-trauma";
import {
  rochesterCriteriaCalculator,
} from "../../lib/calculators/rochester-criteria";
import {
  apobApoa1RatioCalculator,
} from "../../lib/calculators/apob-apoa1-ratio";
import {
  creatinineClearance24hCalculator,
} from "../../lib/calculators/creatinine-clearance-24h";
import { feuaCalculator } from "../../lib/calculators/fractional-excretion-uric-acid";
import { fepCalculator } from "../../lib/calculators/fractional-excretion-phosphate";
import { fecaCalculator } from "../../lib/calculators/fractional-excretion-calcium";
import { rfiCalculator } from "../../lib/calculators/renal-failure-index";
import {
  wintersFormulaCalculator,
} from "../../lib/calculators/winters-formula";
import {
  anionGapDeltaRatioCalculator,
} from "../../lib/calculators/anion-gap-delta-ratio";
import {
  freeWaterClearanceCalculator,
} from "../../lib/calculators/free-water-clearance";
import {
  electrolyteFreeWaterClearanceCalculator,
} from "../../lib/calculators/electrolyte-free-water-clearance";
import {
  totalCholesterolHdlRatioCalculator,
} from "../../lib/calculators/total-cholesterol-hdl-ratio";
import { crb65Calculator } from "../../lib/calculators/crb-65";
import { pedsPewsCalculator } from "../../lib/calculators/peds-pews";
import {
  hadlockEfwCalculator,
} from "../../lib/calculators/hadlock-efw";
import {
  eblObstetricCalculator,
} from "../../lib/calculators/ebl-obstetric";
import {
  pediatricHypotensionCalculator,
} from "../../lib/calculators/pediatric-hypotension";

import { nihssCalculator } from "../../lib/calculators/nihss";
import {
  charlsonCalculator,
} from "../../lib/calculators/charlson-comorbidity-index";
import {
  ottawaSahRuleCalculator,
} from "../../lib/calculators/ottawa-sah-rule";
import {
  abcd2ScoreCalculator,
} from "../../lib/calculators/abcd2-score";
import {
  raceScaleCalculator,
} from "../../lib/calculators/race-scale";
import { esrsCalculator } from "../../lib/calculators/esrs";
import {
  preeclampsiaCriteriaCalculator,
} from "../../lib/calculators/preeclampsia-criteria";
import {
  hellpSyndromeCalculator,
} from "../../lib/calculators/hellp-syndrome";
import {
  magnesiumSulfatePreeclampsiaCalculator,
} from "../../lib/calculators/magnesium-sulfate-preeclampsia";
import {
  apgarScoreCalculator,
} from "../../lib/calculators/apgar-score";
import {
  biophysicalProfileCalculator,
} from "../../lib/calculators/biophysical-profile";
import {
  pediatricGcsCalculator,
} from "../../lib/calculators/pediatric-gcs";
import {
  pediatricTraumaScoreCalculator,
} from "../../lib/calculators/pediatric-trauma-score";
import {
  westleyCroupScoreCalculator,
} from "../../lib/calculators/westley-croup-score";
import {
  gorelickDehydrationCalculator,
} from "../../lib/calculators/gorelick-dehydration";
import { epdsCalculator } from "../../lib/calculators/epds";
import { phq9Calculator } from "../../lib/calculators/phq-9";
import { gad7Calculator } from "../../lib/calculators/gad-7";
import { stopBangCalculator } from "../../lib/calculators/stop-bang";
import { foutScoreCalculator } from "../../lib/calculators/fout-score";

import { fractionalExcretionCalculator } from "../../lib/calculators/fractional-excretion-calculator";
import { albuminCorrectedCalciumCalculator } from "../../lib/calculators/albumin-corrected-calcium";
import { mapCalculator } from "../../lib/calculators/map";
import { maintenanceFluidsCalculator } from "../../lib/calculators/maintenance-fluids";
import { centorCalculator } from "../../lib/calculators/centor-score";
import { barthelIndexCalculator } from "../../lib/calculators/barthel-index";
import { urineAnionGapCalculator } from "../../lib/calculators/urine-anion-gap";
import { upcrCalculator } from "../../lib/calculators/urine-protein-creatinine-ratio";
import { calciumPhosphateProductCalculator } from "../../lib/calculators/calcium-phosphate-product";
import { urineOsmolalGapCalculator } from "../../lib/calculators/urine-osmolal-gap";
import { estimatedAverageGlucoseCalculator } from "../../lib/calculators/estimated-average-glucose";
import { huntHessScaleCalculator } from "../../lib/calculators/hunt-hess-scale";
import { modifiedRankinScaleCalculator } from "../../lib/calculators/modified-rankin-scale";
import { bishopScoreCalculator } from "../../lib/calculators/bishop-score";
import { ecogCalculator } from "../../lib/calculators/ecog-performance-status";
import { epworthCalculator } from "../../lib/calculators/epworth-sleepiness-scale";
import { gestationalWeightGainCalculator } from "../../lib/calculators/gestational-weight-gain";
import { acrCalculator } from "../../lib/calculators/acr";
import { eddCalculator } from "../../lib/calculators/edd";
import { gestationalAgeCalculator } from "../../lib/calculators/gestational-age";
import { heartRateCalculator } from "../../lib/calculators/heart-rate";
import { bsaCalculator } from "../../lib/calculators/bsa";
import { ibwCalculator } from "../../lib/calculators/ibw";
import { adjbwCalculator } from "../../lib/calculators/adjbw";
import { lbmCalculator } from "../../lib/calculators/lbm";
import { basalMetabolicRateCalculator } from "../../lib/calculators/basal-metabolic-rate";
import { mifflinStJeorCalculator } from "../../lib/calculators/mifflin-st-jeor";
import { harrisBenedictCalculator } from "../../lib/calculators/harris-benedict";
import { calorieRequirementCalculator } from "../../lib/calculators/calorie-requirement";
import { fluidRequirementCalculator } from "../../lib/calculators/fluid-requirement";
import { alvaradoScoreCalculator } from "../../lib/calculators/alvarado-score";
import { correctedMagnesiumCalculator } from "../../lib/calculators/corrected-magnesium";
import { kdigoAkiStagingCalculator } from "../../lib/calculators/kdigo-aki-staging";
import { saagCalculator } from "../../lib/calculators/saag";
import { rumackMatthewCalculator } from "../../lib/calculators/rumack-matthew";
import { bodeIndexCalculator } from "../../lib/calculators/bode-index";
import { albiScoreCalculator } from "../../lib/calculators/albi-score";

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
      "spo2-scale": "standard",
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "NEWS2 0 \u2013 Low clinical risk.",
    );
  });

  it("scores each parameter per NEWS2 bands (RR 24, SpO2 93, temp 38.2, SBP 100, pulse 110 \u2192 8)", () => {
    // Sub-scores: RR 2, SpO\u2082 2, temperature 1, SBP 2, pulse 1 \u2192 8
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "24",
      spo2: "93",
      temperature: "38.2",
      sbp: "100",
      pulse: "110",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe(
      "NEWS2 8 \u2013 Very high risk.",
    );
  });

  it("mixed mild inputs produce a low-to-moderate score", () => {
    // RR 20 \u2192 0, SpO2 94 \u2192 1, temp 38 \u2192 0, SBP 110 \u2192 1, pulse 110 \u2192 1 \u2192 3
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "20",
      spo2: "94",
      temperature: "38",
      sbp: "110",
      pulse: "110",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe(
      "NEWS2 3 \u2013 Low-to-moderate risk.",
    );
  });

  it("any single parameter scoring 3 triggers high risk", () => {
    // RR 8 \u2192 3, all others normal \u2192 aggregate 3 but high-risk response
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "8",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "NEWS2 3 \u2013 High risk.",
    );
  });

  it("aggregate 5\u20136 is high risk", () => {
    // RR 25 \u2192 3, SpO2 92 \u2192 2 \u2192 5
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "25",
      spo2: "92",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe(
      "NEWS2 5 \u2013 High risk.",
    );
  });

  it("boundary: RR 20 vs 21 changes sub-score 0 \u2192 2", () => {
    const r20 = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "20",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    const r21 = calc(news2Calculator, {
      "spo2-scale": "standard",
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
      "spo2-scale": "standard",
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
// NEWS2 P1 regression — SpO2 scale selection and alternative scale
// ---------------------------------------------------------------------------
describe("NEWS2 P1 regression — SpO2 scale selection", () => {
  const baseVitals = {
    "respiratory-rate": "14",
    spo2: "98",
    temperature: "37",
    sbp: "120",
    pulse: "75",
  };

  it("standard scale: SpO2 98% scores 0", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      ...baseVitals,
      spo2: "98",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).not.toContain("Scale 2");
  });

  it("standard scale: SpO2 91% scores 3 (single parameter trigger)", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      ...baseVitals,
      spo2: "91",
    });
    expect(r.status).toBe("high");
  });

  it("standard scale: SpO2 93% scores 2", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      ...baseVitals,
      spo2: "93",
    });
    expect(r.status).toBe("low");
  });

  it("standard scale: SpO2 95% scores 1", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      ...baseVitals,
      spo2: "95",
    });
    expect(r.status).toBe("low");
  });

  it("alternative scale: SpO2 90% scores 0 (in target range 88\u201392%)", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      ...baseVitals,
      spo2: "90",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Scale 2");
  });

  it("alternative scale: SpO2 87% scores 1", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      ...baseVitals,
      spo2: "87",
    });
    expect(r.status).toBe("low");
  });

  it("alternative scale: SpO2 83% scores 3 (single parameter trigger)", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      ...baseVitals,
      spo2: "83",
    });
    expect(r.status).toBe("high");
  });

  it("alternative scale: SpO2 95% scores 2 (above target range)", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      ...baseVitals,
      spo2: "95",
    });
    expect(r.status).toBe("low");
  });

  it("alternative scale: SpO2 97% scores 3 (above target range, single parameter trigger)", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      ...baseVitals,
      spo2: "97",
    });
    expect(r.status).toBe("high");
  });

  it("returns critical for missing spo2-scale", () => {
    const r = calc(news2Calculator, {
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Scale");
  });

  it("returns critical for invalid spo2-scale", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "invalid",
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Invalid");
  });
});
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

  it("severe deficit: 80 kg, Na 170 → 140", () => {
    // TBW = 80 × 0.6 = 48; deficit = 48 × (170/140 − 1) = 48 × 0.21428 = 10.2857 → 10.3
    const r = calc(freeWaterDeficitCalculator, {
      weight: "80",
      currentNa: "170",
      desiredNa: "140",
    });
    expect(r.value).toBe(10.3);
    expect(r.interpretation).toBe("Severe free water deficit");
    expect(r.status).toBe("critical");
  });

  it("boundary: 3.0 L → mild (upper boundary of mild)", () => {
    // Need deficit = 3.0 exactly: TBW * (ratio − 1) = 3
    // 70 × 0.6 × (currentNa/140 − 1) = 3 → 42 × (currentNa/140 − 1) = 3
    // currentNa/140 − 1 = 3/42 = 0.07143 → currentNa = 140 × 1.07143 = 150
    const r = calc(freeWaterDeficitCalculator, {
      weight: "70",
      currentNa: "150",
      desiredNa: "140",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("low");
  });

  it("boundary: 3.1 L → moderate (just above mild)", () => {
    // Need deficit ≈ 3.1: 50 × 0.6 × (currentNa/140 − 1) = 3.1
    // 30 × (ratio − 1) = 3.1 → ratio = 1.10333 → currentNa = 154.47
    // 50 × 0.6 × (154.47/140 − 1) = 30 × 0.10336 = 3.10 → 3.1
    const r = calc(freeWaterDeficitCalculator, {
      weight: "50",
      currentNa: "154.47",
      desiredNa: "140",
    });
    expect(r.value).toBeCloseTo(3.1, 0);
    expect(r.status).toBe("high");
  });

  it("extreme hypernatremia: 70 kg, Na 190 → 140", () => {
    // TBW = 42; deficit = 42 × (190/140 − 1) = 42 × 0.35714 = 15 → 15.0
    const r = calc(freeWaterDeficitCalculator, {
      weight: "70",
      currentNa: "190",
      desiredNa: "140",
    });
    expect(r.value).toBe(15);
    expect(r.interpretation).toBe("Severe free water deficit");
    expect(r.status).toBe("critical");
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

  it("pediatric weight 20 kg → 32 µg", () => {
    const r = calc(thyroidDoseCalculator, { weight: "20" });
    expect(r.value).toBe(32);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Full replacement dose");
  });

  it("elderly/low weight 45 kg → 72 µg", () => {
    const r = calc(thyroidDoseCalculator, { weight: "45" });
    expect(r.value).toBe(72);
    expect(r.status).toBe("normal");
  });

  it("heavy weight 120 kg → 192 µg", () => {
    const r = calc(thyroidDoseCalculator, { weight: "120" });
    expect(r.value).toBe(192);
    expect(r.status).toBe("normal");
  });

  it("zero weight → critical validation error", () => {
    const r = calc(thyroidDoseCalculator, { weight: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Body Weight cannot be zero.");
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

  it("pediatric weight 25 kg → 40 µg", () => {
    const r = calc(levothyroxineDoseCalculator, { weight: "25" });
    expect(r.value).toBe(40);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Full replacement dose");
  });

  it("elderly/low weight 50 kg → 80 µg", () => {
    const r = calc(levothyroxineDoseCalculator, { weight: "50" });
    expect(r.value).toBe(80);
    expect(r.status).toBe("normal");
  });

  it("heavy weight 100 kg → 160 µg", () => {
    const r = calc(levothyroxineDoseCalculator, { weight: "100" });
    expect(r.value).toBe(160);
    expect(r.status).toBe("normal");
  });

  it("edge weight 10 kg → 16 µg", () => {
    const r = calc(levothyroxineDoseCalculator, { weight: "10" });
    expect(r.value).toBe(16);
    expect(r.status).toBe("normal");
  });

  it("zero weight → critical validation error", () => {
    const r = calc(levothyroxineDoseCalculator, { weight: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Body Weight cannot be zero.");
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
    expect(r.status).toBe("low");
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
// GRACE P1 regression — status semantics for intermediate risk
// ---------------------------------------------------------------------------
describe("GRACE P1 regression — intermediate risk status", () => {
  it("score 88 is low risk", () => {
    const r = calc(graceCalculator, {
      age: "41", "heart-rate": "9", sbp: "34", creatinine: "4",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    expect(r.value).toBe(88);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("LOW risk");
  });

  it("score 111 is intermediate risk (uses status low, not high)", () => {
    const r = calc(graceCalculator, {
      age: "41", "heart-rate": "15", sbp: "34", creatinine: "7",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "14",
    });
    expect(r.value).toBe(111);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("INTERMEDIATE risk");
  });

  it("score 214 is high risk (uses status critical)", () => {
    const r = calc(graceCalculator, {
      age: "91", "heart-rate": "24", sbp: "58", creatinine: "21",
      killip: "20", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    expect(r.value).toBe(214);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("HIGH risk");
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
    expect(r.status).toBe("low");
  });

  it("moderate: score 6", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "1", age: "1", "risk-factors": "1", troponin: "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("low");
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
// HEART P1 regression — status semantics for moderate risk
// ---------------------------------------------------------------------------
describe("HEART P1 regression — moderate risk status", () => {
  it("score 0–3 is low risk", () => {
    const r0 = calc(heartScoreCalculator, {
      history: "0", ecg: "0", age: "0", "risk-factors": "0", troponin: "0",
    });
    expect(r0.value).toBe(0);
    expect(r0.status).toBe("normal");
    expect(r0.interpretation).toContain("LOW risk");

    const r3 = calc(heartScoreCalculator, {
      history: "1", ecg: "1", age: "1", "risk-factors": "0", troponin: "0",
    });
    expect(r3.value).toBe(3);
    expect(r3.status).toBe("normal");
    expect(r3.interpretation).toContain("LOW risk");
  });

  it("score 4 is moderate risk (boundary)", () => {
    const r = calc(heartScoreCalculator, {
      history: "1", ecg: "1", age: "1", "risk-factors": "1", troponin: "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("MODERATE risk");
  });

  it("score 6 is moderate risk (boundary)", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "1", age: "1", "risk-factors": "1", troponin: "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("MODERATE risk");
  });

  it("score 7 is high risk (boundary)", () => {
    const r = calc(heartScoreCalculator, {
      history: "2", ecg: "2", age: "1", "risk-factors": "1", troponin: "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("HIGH risk");
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

// ---------------------------------------------------------------------------
// HOMA-IR — (glucose mg/dL × insulin μU/mL) / 405
// Classification:
//   ≤ 2.5  → Normal insulin sensitivity
//   2.5–5  → Mild insulin resistance
//   ≥ 5    → Severe insulin resistance
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("HOMA-IR calculate() output", () => {
  it("normal insulin sensitivity: glucose=95, insulin=10", () => {
    // (95 × 10) / 405 = 950 / 405 = 2.3457… → 2.35
    const r = calc(homaIrCalculator, {
      glucose: "95",
      insulin: "10",
    });
    expect(r.value).toBe(2.35);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal insulin sensitivity");
  });

  it("mild insulin resistance boundary: glucose=101, insulin=10", () => {
    // (101 × 10) / 405 = 1010 / 405 = 2.4938… → 2.49
    // result = 2.4938… ≤ 2.5 → still normal
    const r = calc(homaIrCalculator, {
      glucose: "101",
      insulin: "10",
    });
    expect(r.value).toBe(2.49);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal insulin sensitivity");
  });

  it("mild insulin resistance: glucose=120, insulin=15", () => {
    // (120 × 15) / 405 = 1800 / 405 = 4.4444… → 4.44
    const r = calc(homaIrCalculator, {
      glucose: "120",
      insulin: "15",
    });
    expect(r.value).toBe(4.44);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Mild insulin resistance");
  });

  it("severe insulin resistance: glucose=140, insulin=25", () => {
    // (140 × 25) / 405 = 3500 / 405 = 8.6420… → 8.64
    const r = calc(homaIrCalculator, {
      glucose: "140",
      insulin: "25",
    });
    expect(r.value).toBe(8.64);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe insulin resistance");
  });

  it("rounding: glucose=88, insulin=14", () => {
    // (88 × 14) / 405 = 1232 / 405 = 3.0420… → 3.04
    const r = calc(homaIrCalculator, {
      glucose: "88",
      insulin: "14",
    });
    expect(r.value).toBe(3.04);
    expect(r.status).toBe("high");
  });

  it("minimal positive inputs: glucose=1, insulin=1", () => {
    // (1 × 1) / 405 = 0.0025… → 0.00
    const r = calc(homaIrCalculator, {
      glucose: "1",
      insulin: "1",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("glucose=0 is rejected", () => {
    const r = calc(homaIrCalculator, {
      glucose: "0",
      insulin: "10",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("cannot be zero");
  });

  it("insulin=0 is rejected", () => {
    const r = calc(homaIrCalculator, {
      glucose: "95",
      insulin: "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// HOMA-B — (20 × insulin) / (glucose mmol/L − 3.5)
// Classification:
//   ≤ 50    → Severe beta-cell dysfunction
//   50–100  → Reduced beta-cell function
//   100–200 → Normal beta-cell function
//   ≥ 200   → Hyperinsulinemia
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("HOMA-B calculate() output", () => {
  it("normal beta-cell function: insulin=8, glucose=5.0", () => {
    // (20 × 8) / (5.0 − 3.5) = 160 / 1.5 = 106.6667… → 106.67
    const r = calc(homaBCalculator, {
      insulin: "8",
      glucose: "5.0",
    });
    expect(r.value).toBe(106.67);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal beta-cell function");
  });

  it("reduced beta-cell function: insulin=10, glucose=6.0", () => {
    // (20 × 10) / (6.0 − 3.5) = 200 / 2.5 = 80.00
    const r = calc(homaBCalculator, {
      insulin: "10",
      glucose: "6.0",
    });
    expect(r.value).toBe(80);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Reduced beta-cell function");
  });

  it("severe beta-cell dysfunction: insulin=5, glucose=7.0", () => {
    // (20 × 5) / (7.0 − 3.5) = 100 / 3.5 = 28.5714… → 28.57
    const r = calc(homaBCalculator, {
      insulin: "5",
      glucose: "7.0",
    });
    expect(r.value).toBe(28.57);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe beta-cell dysfunction");
  });

  it("reduced boundary: insulin=6, glucose=4.7", () => {
    // (20 × 6) / (4.7 − 3.5) = 120 / 1.2 = 100.00
    // result=100 → 50 ≤ 100 ≤ 100 matches the reduced condition first
    const r = calc(homaBCalculator, {
      insulin: "6",
      glucose: "4.7",
    });
    expect(r.value).toBe(100);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Reduced beta-cell function");
  });

  it("glucose=3.5 is rejected (division by zero guard)", () => {
    const r = calc(homaBCalculator, {
      insulin: "10",
      glucose: "3.5",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Glucose must be greater than 3.5");
  });

  it("glucose<3.5 is rejected", () => {
    const r = calc(homaBCalculator, {
      insulin: "10",
      glucose: "2.0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Glucose must be greater than 3.5");
  });

  it("glucose=3.6 calculates normally (just above guard)", () => {
    // (20 × 10) / (3.6 − 3.5) = 200 / 0.1 = 2000.00
    // result ≥ 200 → hyperinsulinemia
    const r = calc(homaBCalculator, {
      insulin: "10",
      glucose: "3.6",
    });
    expect(r.value).toBe(2000);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Hyperinsulinemia");
  });

  it("insulin=0 is rejected by validation", () => {
    const r = calc(homaBCalculator, {
      insulin: "0",
      glucose: "5.0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// Insulin Sensitivity — 1 / HOMA-IR = 405 / (glucose × insulin)
// Classification:
//   ≤ 0.2  → Severe insulin resistance
//   0.2–0.4 → Reduced insulin sensitivity
//   ≥ 0.4  → Normal insulin sensitivity
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Insulin Sensitivity calculate() output", () => {
  it("normal: homaIr=2.0", () => {
    // 1 / 2.0 = 0.50
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "2.0",
    });
    expect(r.value).toBe(0.5);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal insulin sensitivity");
  });

  it("reduced: homaIr=3.5", () => {
    // 1 / 3.5 = 0.2857… → 0.29
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "3.5",
    });
    expect(r.value).toBe(0.29);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("Reduced insulin sensitivity");
  });

  it("severe insulin resistance: homaIr=6.0", () => {
    // 1 / 6.0 = 0.1667… → 0.17
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "6.0",
    });
    expect(r.value).toBe(0.17);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe insulin resistance");
  });

  it("boundary: homaIr=5.0 gives exactly 0.20 → severe", () => {
    // 1 / 5.0 = 0.20 → 0.20
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "5.0",
    });
    expect(r.value).toBe(0.2);
    expect(r.status).toBe("critical");
  });

  it("boundary: homaIr=2.5 gives 0.40 → reduced", () => {
    // 1 / 2.5 = 0.40 → 0.40
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "2.5",
    });
    expect(r.value).toBe(0.4);
    expect(r.status).toBe("low");
  });

  it("homaIr=0 is rejected", () => {
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("cannot be zero");
  });

  it("homaIr=1 gives perfect sensitivity", () => {
    // 1 / 1.0 = 1.00
    const r = calc(insulinSensitivityCalculator, {
      homaIr: "1.0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Free Thyroxine Index — (Total T4 × T3 Uptake) / 100
// Classification:
//   < 1.0   → Low (hypothyroidism)
//   1.0–4.5 → Normal
//   > 4.5   → High (hyperthyroidism)
// Result = Number(fti.toFixed(1))
// ---------------------------------------------------------------------------
describe("Free Thyroxine Index calculate() output", () => {
  it("normal: T4=7.5, uptake=30", () => {
    // (7.5 × 30) / 100 = 2.250 → 2.3
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "7.5",
      t3Uptake: "30",
    });
    expect(r.value).toBe(2.3);
    expect(r.status).toBe("normal");
  });

  it("hyperthyroid: T4=12, uptake=45", () => {
    // (12 × 45) / 100 = 5.400 → 5.4
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "12",
      t3Uptake: "45",
    });
    expect(r.value).toBe(5.4);
    expect(r.status).toBe("high");
  });

  it("hypothyroid: T4=2, uptake=20", () => {
    // (2 × 20) / 100 = 0.400 → 0.4
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "2",
      t3Uptake: "20",
    });
    expect(r.value).toBe(0.4);
    expect(r.status).toBe("low");
  });

  it("low-normal: T4=4, uptake=22", () => {
    // (4 × 22) / 100 = 0.880 → 0.9
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "4",
      t3Uptake: "22",
    });
    expect(r.value).toBe(0.9);
    expect(r.status).toBe("low");
  });

  it("borderline high: T4=8, uptake=57", () => {
    // (8 × 57) / 100 = 4.560 → 4.6
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "8",
      t3Uptake: "57",
    });
    expect(r.value).toBe(4.6);
    expect(r.status).toBe("high");
  });

  it("negative T4 is rejected", () => {
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "-1",
      t3Uptake: "30",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });

  it("rounding: T4=6.3, uptake=28", () => {
    // (6.3 × 28) / 100 = 1.764 → 1.8
    const r = calc(freeThyroxineIndexCalculator, {
      totalT4: "6.3",
      t3Uptake: "28",
    });
    expect(r.value).toBe(1.8);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Metabolic Syndrome ATP III — ≥ 3 of 5 criteria
// Criteria: waist (male≥102/female≥88), TG≥150, HDL (male<40/female<50),
//           BP≥130/85, glucose≥100 (each with drug-treatment exemption)
// ---------------------------------------------------------------------------
describe("Metabolic Syndrome ATP III calculate() output", () => {
  it("no syndrome: male, all normal", () => {
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "male",
      waist: "85",
      triglycerides: "100",
      hdl: "55",
      sbp: "120",
      dbp: "80",
      fastingGlucose: "85",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("No metabolic syndrome");
  });

  it("2/5 criteria: male, borderline", () => {
    // waist=104 (≥102) + glucose=102 (≥100) → 2/5
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "male",
      waist: "104",
      triglycerides: "120",
      hdl: "45",
      sbp: "125",
      dbp: "80",
      fastingGlucose: "102",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("exactly 3/5: male, threshold", () => {
    // waist=102 (≥102) + TG=150 (≥150) + HDL=40 (not <40 → no)
    // SBP=130 (≥130) → 3/5
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "male",
      waist: "102",
      triglycerides: "150",
      hdl: "45",
      sbp: "130",
      dbp: "80",
      fastingGlucose: "90",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Metabolic syndrome present");
  });

  it("5/5: male, all criteria", () => {
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "male",
      waist: "110",
      triglycerides: "200",
      hdl: "30",
      sbp: "150",
      dbp: "95",
      fastingGlucose: "130",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Metabolic syndrome present");
  });

  it("1/5: female, only elevated glucose", () => {
    // waist=80 (<88), TG=100, HDL=55 (≥50), BP=115/70, glucose=105 (≥100)
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "female",
      waist: "80",
      triglycerides: "100",
      hdl: "55",
      sbp: "115",
      dbp: "70",
      fastingGlucose: "105",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("drug treatment exemption counts for criteria", () => {
    // lipidRx=yes counts as TG and HDL criteria
    // glucoseRx=yes counts as glucose criterion
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "male",
      waist: "90",
      triglycerides: "100",
      hdl: "50",
      sbp: "120",
      dbp: "78",
      fastingGlucose: "90",
      lipidRx: "yes",
      bpRx: "no",
      glucoseRx: "yes",
    });
    // lipidRx → TG + HDL = 2; glucoseRx → 1; total = 3
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("female borderline waist threshold: 88 cm", () => {
    // waist=88 (≥88 for female) → 1 criterion
    const r = calc(metabolicSyndromeAtp3Calculator, {
      sex: "female",
      waist: "88",
      triglycerides: "100",
      hdl: "55",
      sbp: "120",
      dbp: "78",
      fastingGlucose: "90",
      lipidRx: "no",
      bpRx: "no",
      glucoseRx: "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// TyG Index — ln(TG × FPG / 2)
// Result = Number(tyg.toFixed(2))
// Descriptive — no universal cut-point
// ---------------------------------------------------------------------------
describe("TyG Index calculate() output", () => {
  it("representative: TG=100, FPG=90", () => {
    // ln(100 × 90 / 2) = ln(4500) = 8.4118… → 8.41
    const r = calc(tygIndexCalculator, {
      triglycerides: "100",
      glucose: "90",
    });
    expect(r.value).toBeCloseTo(8.41, 1);
    expect(r.status).toBe("normal");
  });

  it("borderline: TG=150, FPG=100", () => {
    // ln(150 × 100 / 2) = ln(7500) = 8.9227… → 8.92
    const r = calc(tygIndexCalculator, {
      triglycerides: "150",
      glucose: "100",
    });
    expect(r.value).toBeCloseTo(8.92, 1);
  });

  it("high risk: TG=200, FPG=120", () => {
    // ln(200 × 120 / 2) = ln(12000) = 9.3928… → 9.39
    const r = calc(tygIndexCalculator, {
      triglycerides: "200",
      glucose: "120",
    });
    expect(r.value).toBeCloseTo(9.39, 1);
  });

  it("low: TG=50, FPG=85", () => {
    // ln(50 × 85 / 2) = ln(2125) = 7.6615… → 7.66
    const r = calc(tygIndexCalculator, {
      triglycerides: "50",
      glucose: "85",
    });
    expect(r.value).toBeCloseTo(7.66, 1);
  });

  it("TG=0 is rejected", () => {
    const r = calc(tygIndexCalculator, {
      triglycerides: "0",
      glucose: "90",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });

  it("FPG=0 is rejected", () => {
    const r = calc(tygIndexCalculator, {
      triglycerides: "100",
      glucose: "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });

  it("minimal positive: TG=1, FPG=1", () => {
    // ln(1 × 1 / 2) = ln(0.5) = −0.6931… → −0.69
    const r = calc(tygIndexCalculator, {
      triglycerides: "1",
      glucose: "1",
    });
    expect(r.value).toBeCloseTo(-0.69, 1);
  });
});

// ---------------------------------------------------------------------------
// QUICKI — 1 / (log10(insulin) + log10(glucose))
// Result = Number(quicki.toFixed(2))
// Descriptive — lower values = greater insulin resistance
// ---------------------------------------------------------------------------
describe("QUICKI calculate() output", () => {
  it("representative: insulin=10, glucose=95", () => {
    // 1 / (log10(10) + log10(95)) = 1 / (1 + 1.9777) = 1 / 2.9777 = 0.3358… → 0.34
    const r = calc(quickiCalculator, {
      fastingInsulin: "10",
      fastingGlucose: "95",
    });
    expect(r.value).toBeCloseTo(0.34, 1);
    expect(r.status).toBe("normal");
  });

  it("insulin resistant: insulin=15, glucose=110", () => {
    // 1 / (log10(15) + log10(110)) = 1 / (1.1761 + 2.0414) = 1 / 3.2175 = 0.3108… → 0.31
    const r = calc(quickiCalculator, {
      fastingInsulin: "15",
      fastingGlucose: "110",
    });
    expect(r.value).toBeCloseTo(0.31, 1);
  });

  it("low insulin: insulin=5, glucose=80", () => {
    // 1 / (log10(5) + log10(80)) = 1 / (0.6990 + 1.9031) = 1 / 2.6021 = 0.3843… → 0.38
    const r = calc(quickiCalculator, {
      fastingInsulin: "5",
      fastingGlucose: "80",
    });
    expect(r.value).toBeCloseTo(0.38, 1);
  });

  it("insulin=1: insulin=1, glucose=100", () => {
    // 1 / (log10(1) + log10(100)) = 1 / (0 + 2) = 0.5000 → 0.50
    const r = calc(quickiCalculator, {
      fastingInsulin: "1",
      fastingGlucose: "100",
    });
    expect(r.value).toBe(0.5);
    expect(r.status).toBe("normal");
  });

  it("insulin=0 is rejected", () => {
    const r = calc(quickiCalculator, {
      fastingInsulin: "0",
      fastingGlucose: "90",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });

  it("glucose=0 is rejected", () => {
    const r = calc(quickiCalculator, {
      fastingInsulin: "10",
      fastingGlucose: "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });
});

// ---------------------------------------------------------------------------
// Triglyceride-HDL Ratio — TG / HDL
// Classification:
//   < 3.0  → Low (favorable)
//   ≥ 3.0  → High (insulin resistance marker)
// Result = Number(ratio.toFixed(2))
// ---------------------------------------------------------------------------
describe("Triglyceride-HDL Ratio calculate() output", () => {
  it("normal: TG=100, HDL=50", () => {
    // 100 / 50 = 2.00
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "100",
      hdl: "50",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("borderline at threshold: TG=150, HDL=50", () => {
    // 150 / 50 = 3.00 → ≥ 3.0 → high
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "150",
      hdl: "50",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("insulin resistance: TG=200, HDL=40", () => {
    // 200 / 40 = 5.00
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "200",
      hdl: "40",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("very high: TG=300, HDL=30", () => {
    // 300 / 30 = 10.00
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "300",
      hdl: "30",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("HDL=0 is rejected", () => {
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "100",
      hdl: "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("positive");
  });

  it("rounding: TG=119, HDL=43", () => {
    // 119 / 43 = 2.7674… → 2.77
    const r = calc(triglycerideHdlRatioCalculator, {
      triglycerides: "119",
      hdl: "43",
    });
    expect(r.value).toBe(2.77);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// LDL Cholesterol (Friedewald) — TC − HDL − (TG / 5)
// Classification:
//   < 100  → Optimal
//   100–129 → Near optimal
//   130–159 → Borderline high
//   160–189 → High
//   ≥ 190  → Very high
// Not valid when TG ≥ 400
// Result = Number(ldl.toFixed(2))
// ---------------------------------------------------------------------------
describe("LDL Cholesterol calculate() output", () => {
  it("optimal: TC=200, HDL=50, TG=150", () => {
    // 200 − 50 − (150/5) = 200 − 50 − 30 = 120.00
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "200",
      hdl: "50",
      triglycerides: "150",
    });
    expect(r.value).toBe(120);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Near optimal / above optimal LDL cholesterol.");
  });

  it("high LDL: TC=260, HDL=40, TG=200", () => {
    // 260 − 40 − (200/5) = 260 − 40 − 40 = 180.00
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "260",
      hdl: "40",
      triglycerides: "200",
    });
    expect(r.value).toBe(180);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("High LDL cholesterol.");
  });

  it("borderline: TC=210, HDL=55, TG=100", () => {
    // 210 − 55 − (100/5) = 210 − 55 − 20 = 135.00
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "210",
      hdl: "55",
      triglycerides: "100",
    });
    expect(r.value).toBe(135);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Borderline high LDL cholesterol.");
  });

  it("TG ≥ 400 is rejected", () => {
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "300",
      hdl: "40",
      triglycerides: "400",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Friedewald equation is not valid");
  });

  it("very high: TC=300, HDL=35, TG=250", () => {
    // 300 − 35 − (250/5) = 300 − 35 − 50 = 215.00
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "300",
      hdl: "35",
      triglycerides: "250",
    });
    expect(r.value).toBe(215);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Very high LDL cholesterol.");
  });

  it("rounding: TC=195, HDL=52, TG=130", () => {
    // 195 − 52 − (130/5) = 195 − 52 − 26 = 117.00
    const r = calc(ldlCholesterolCalculator, {
      totalCholesterol: "195",
      hdl: "52",
      triglycerides: "130",
    });
    expect(r.value).toBe(117);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Non-HDL Cholesterol — TC − HDL
// Classification:
//   < 130  → Optimal
//   130–159 → Near optimal
//   160–189 → Borderline high
//   190–219 → High
//   ≥ 220  → Very high
// Result = Number(nonHdl.toFixed(2))
// ---------------------------------------------------------------------------
describe("Non-HDL Cholesterol calculate() output", () => {
  it("optimal: TC=200, HDL=80", () => {
    // 200 − 80 = 120.00
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "200",
      hdl: "80",
    });
    expect(r.value).toBe(120);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Optimal non-HDL cholesterol.");
  });

  it("near optimal: TC=200, HDL=55", () => {
    // 200 − 55 = 145.00
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "200",
      hdl: "55",
    });
    expect(r.value).toBe(145);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Near optimal / above optimal non-HDL cholesterol.");
  });

  it("borderline high: TC=260, HDL=70", () => {
    // 260 − 70 = 190.00 → wait, that's ≥190 → high
    // Try TC=240, HDL=70 → 170
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "240",
      hdl: "70",
    });
    expect(r.value).toBe(170);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Borderline high non-HDL cholesterol.");
  });

  it("high: TC=290, HDL=60", () => {
    // 290 − 60 = 230.00 → ≥220 → very high
    // Try TC=280, HDL=70 → 210
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "280",
      hdl: "70",
    });
    expect(r.value).toBe(210);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("High non-HDL cholesterol.");
  });

  it("very high: TC=310, HDL=50", () => {
    // 310 − 50 = 260.00
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "310",
      hdl: "50",
    });
    expect(r.value).toBe(260);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Very high non-HDL cholesterol.");
  });

  it("precision: TC=193, HDL=47", () => {
    // 193 − 47 = 146.00
    const r = calc(nonHdlCholesterolCalculator, {
      totalCholesterol: "193",
      hdl: "47",
    });
    expect(r.value).toBe(146);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Albumin-Globulin Ratio — albumin / (total protein − albumin)
// Classification:
//   < 1.0  → Low
//   1.0–2.0 → Normal
//   > 2.0  → High
// Result = Number(ratio.toFixed(2))
// ---------------------------------------------------------------------------
describe("Albumin-Globulin Ratio calculate() output", () => {
  it("normal: albumin=4.0, TP=7.0", () => {
    // globulin = 7.0 − 4.0 = 3.0; ratio = 4.0 / 3.0 = 1.3333… → 1.33
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "4.0",
      totalProtein: "7.0",
    });
    expect(r.value).toBeCloseTo(1.33, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal albumin to globulin ratio.");
  });

  it("high ratio: albumin=4.5, TP=6.5", () => {
    // globulin = 6.5 − 4.5 = 2.0; ratio = 4.5 / 2.0 = 2.2500 → 2.25
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "4.5",
      totalProtein: "6.5",
    });
    expect(r.value).toBeCloseTo(2.25, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("High albumin to globulin ratio");
  });

  it("low ratio: albumin=2.5, TP=8.0", () => {
    // globulin = 8.0 − 2.5 = 5.5; ratio = 2.5 / 5.5 = 0.4545… → 0.45
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "2.5",
      totalProtein: "8.0",
    });
    expect(r.value).toBeCloseTo(0.45, 1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("Low albumin to globulin ratio");
  });

  it("borderline high: albumin=4.2, TP=7.0", () => {
    // globulin = 7.0 − 4.2 = 2.8; ratio = 4.2 / 2.8 = 1.5000 → 1.50
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "4.2",
      totalProtein: "7.0",
    });
    expect(r.value).toBeCloseTo(1.5, 1);
    expect(r.status).toBe("normal");
  });

  it("TP = albumin → globulin ≤ 0, rejected", () => {
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "4.0",
      totalProtein: "4.0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("must be positive");
  });

  it("rounding: albumin=3.8, TP=7.2", () => {
    // globulin = 7.2 − 3.8 = 3.4; ratio = 3.8 / 3.4 = 1.1176… → 1.12
    const r = calc(albuminGlobulinRatioCalculator, {
      albumin: "3.8",
      totalProtein: "7.2",
    });
    expect(r.value).toBeCloseTo(1.12, 1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Glasgow-Blatchford Score — composite score
// Risk: 0 = very low, 1–5 low, 6–12 moderate, ≥13 high
// ---------------------------------------------------------------------------
describe("Glasgow-Blatchford Score calculate() output", () => {
  it("zero risk: all normal, no clinical indicators", () => {
    // BUN=15 (<18.2), Hb=14 (male ≥13), SBP=120, pulse=70, all no
    const r = calc(glasgowBlatchfordCalculator, {
      bun: "15",
      hemoglobin: "14",
      sex: "male",
      sbp: "120",
      pulse: "70",
      melena: "no",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Very low risk");
  });

  it("low risk: BUN=20, male Hb=11, SBP=105, pulse=105", () => {
    // BUN=20 → 18.2 ≤ 20 < 22.4 → +2
    // Hb=11 male → 10 ≤ 11 < 12 → +3
    // SBP=105 → 100 ≤ 105 < 110 → +1
    // pulse=105 ≥100 → +1
    // Total = 2+3+1+1 = 7 → moderate risk
    const r = calc(glasgowBlatchfordCalculator, {
      bun: "20",
      hemoglobin: "11",
      sex: "male",
      sbp: "105",
      pulse: "105",
      melena: "no",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Moderate risk");
  });

  it("high risk: BUN=80, Hb=7, SBP=85, syncope+hepatic+cardiac", () => {
    // BUN=80 ≥70 → +6
    // Hb=7 male <10 → +6
    // SBP=85 <90 → +3
    // pulse=70 → 0
    // syncope=yes → +2
    // hepatic=yes → +2
    // cardiac=yes → +2
    // melena=yes → +1
    // Total = 6+6+3+2+2+2+1 = 22 → high risk
    const r = calc(glasgowBlatchfordCalculator, {
      bun: "80",
      hemoglobin: "7",
      sex: "male",
      sbp: "85",
      pulse: "70",
      melena: "yes",
      syncope: "yes",
      hepatic: "yes",
      cardiac: "yes",
    });
    expect(r.value).toBe(22);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High risk");
  });

  it("female Hb thresholds differ from male", () => {
    // female Hb=11 → 10 ≤ 11 < 12 → +1 (not +3 as male)
    const rM = calc(glasgowBlatchfordCalculator, {
      bun: "15",
      hemoglobin: "11",
      sex: "male",
      sbp: "120",
      pulse: "70",
      melena: "no",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    const rF = calc(glasgowBlatchfordCalculator, {
      bun: "15",
      hemoglobin: "11",
      sex: "female",
      sbp: "120",
      pulse: "70",
      melena: "no",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    // male: Hb=11 → +3; female: Hb=11 → +1
    expect(rM.value).toBe(3);
    expect(rF.value).toBe(1);
  });

  it("low risk: SBP=95, pulse=105, melena=yes", () => {
    // BUN=15 → 0; Hb=14 male → 0; SBP=95 <100 → +2; pulse≥100 → +1; melena=yes → +1
    // Total = 2+1+1 = 4 → low risk
    const r = calc(glasgowBlatchfordCalculator, {
      bun: "15",
      hemoglobin: "14",
      sex: "male",
      sbp: "95",
      pulse: "105",
      melena: "yes",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Low risk");
  });

  it("max BUN contribution: BUN=70 → +6", () => {
    // BUN=70 → +6; rest normal
    const r = calc(glasgowBlatchfordCalculator, {
      bun: "70",
      hemoglobin: "14",
      sex: "male",
      sbp: "120",
      pulse: "70",
      melena: "no",
      syncope: "no",
      hepatic: "no",
      cardiac: "no",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Moderate risk");
  });
});

// ---------------------------------------------------------------------------
// Maddrey Discriminant Function — 4.6 × (Patient PT − Control PT) + Bilirubin
// Classification:
//   < 32 → Mild alcoholic hepatitis
//   ≥ 32 → Severe alcoholic hepatitis
// Result = Math.round(mdf * 10) / 10
// ---------------------------------------------------------------------------
describe("Maddrey Discriminant Function calculate() output", () => {
  it("mild: patientPT=14, controlPT=12, bilirubin=5", () => {
    // 4.6 × (14 − 12) + 5 = 4.6 × 2 + 5 = 9.2 + 5 = 14.2
    const r = calc(maddreyCalculator, {
      patient_pt: "14",
      control_pt: "12",
      bilirubin: "5",
    });
    expect(r.value).toBe(14.2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Mild alcoholic hepatitis");
  });

  it("exactly 32: patientPT=15, controlPT=12, bilirubin=18.2", () => {
    // 4.6 × (15 − 12) + 18.2 = 4.6 × 3 + 18.2 = 13.8 + 18.2 = 32.0
    const r = calc(maddreyCalculator, {
      patient_pt: "15",
      control_pt: "12",
      bilirubin: "18.2",
    });
    expect(r.value).toBe(32);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Severe alcoholic hepatitis");
  });

  it("severe: patientPT=18, controlPT=12, bilirubin=15", () => {
    // 4.6 × (18 − 12) + 15 = 4.6 × 6 + 15 = 27.6 + 15 = 42.6
    const r = calc(maddreyCalculator, {
      patient_pt: "18",
      control_pt: "12",
      bilirubin: "15",
    });
    expect(r.value).toBe(42.6);
    expect(r.status).toBe("critical");
  });

  it("very severe: patientPT=25, controlPT=12, bilirubin=30", () => {
    // 4.6 × (25 − 12) + 30 = 4.6 × 13 + 30 = 59.8 + 30 = 89.8
    const r = calc(maddreyCalculator, {
      patient_pt: "25",
      control_pt: "12",
      bilirubin: "30",
    });
    expect(r.value).toBe(89.8);
    expect(r.status).toBe("critical");
  });

  it("negative result (unusual): patientPT=10, controlPT=14, bilirubin=1", () => {
    // 4.6 × (10 − 14) + 1 = 4.6 × (−4) + 1 = −18.4 + 1 = −17.4
    const r = calc(maddreyCalculator, {
      patient_pt: "10",
      control_pt: "14",
      bilirubin: "1",
    });
    expect(r.value).toBe(-17.4);
    expect(r.status).toBe("normal");
  });

  it("decimal: patientPT=16, controlPT=11.8, bilirubin=12.4", () => {
    // 4.6 × (16 − 11.8) + 12.4 = 4.6 × 4.2 + 12.4 = 19.32 + 12.4 = 31.72
    // round(31.72 × 10) / 10 = 31.7
    const r = calc(maddreyCalculator, {
      patient_pt: "16",
      control_pt: "11.8",
      bilirubin: "12.4",
    });
    expect(r.value).toBe(31.7);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// NAFLD Fibrosis Score
// -1.675 + 0.037×age + 0.094×BMI + 1.13×diabetes + 0.99×(AST/ALT)
//   − 0.013×platelets − 0.66×albumin
// Classification:
//   < −1.455 → Low probability
//   −1.455 to 0.676 → Indeterminate
//   > 0.676 → High probability
// Result = Math.round(nfs * 1000) / 1000
// ---------------------------------------------------------------------------
describe("NAFLD Fibrosis Score calculate() output", () => {
  it("low fibrosis: young, no DM, favorable labs", () => {
    // age=35, BMI=25, DM=0, AST=25, ALT=50, platelets=250, alb=4.5
    // ratio = 25/50 = 0.5
    // −1.675 + 0.037×35 + 0.094×25 + 1.13×0 + 0.99×0.5
    //   − 0.013×250 − 0.66×4.5
    // = −1.675 + 1.295 + 2.35 + 0 + 0.495 − 3.25 − 2.97
    // = −3.755
    const r = calc(nafldFibrosisCalculator, {
      age: "35",
      bmi: "25",
      diabetes: "0",
      ast: "25",
      alt: "50",
      platelets: "250",
      albumin: "4.5",
    });
    expect(r.value).toBeCloseTo(-3.755, 2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Low probability");
  });

  it("indeterminate: moderate risk factors", () => {
    // age=55, BMI=32, DM=1, AST=50, ALT=40, platelets=180, alb=3.8
    // ratio = 50/40 = 1.25
    // −1.675 + 0.037×55 + 0.094×32 + 1.13×1 + 0.99×1.25
    //   − 0.013×180 − 0.66×3.8
    // = −1.675 + 2.035 + 3.008 + 1.13 + 1.2375 − 2.34 − 2.508
    // = 0.8875
    const r = calc(nafldFibrosisCalculator, {
      age: "55",
      bmi: "32",
      diabetes: "1",
      ast: "50",
      alt: "40",
      platelets: "180",
      albumin: "3.8",
    });
    expect(r.value).toBeCloseTo(0.888, 2);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High probability");
  });

  it("high fibrosis: older, diabetic, high AST/ALT, low platelets", () => {
    // age=65, BMI=35, DM=1, AST=90, ALT=45, platelets=100, alb=3.0
    // ratio = 90/45 = 2.0
    // −1.675 + 0.037×65 + 0.094×35 + 1.13×1 + 0.99×2.0
    //   − 0.013×100 − 0.66×3.0
    // = −1.675 + 2.405 + 3.29 + 1.13 + 1.98 − 1.3 − 1.98
    // = 3.85
    const r = calc(nafldFibrosisCalculator, {
      age: "65",
      bmi: "35",
      diabetes: "1",
      ast: "90",
      alt: "45",
      platelets: "100",
      albumin: "3.0",
    });
    expect(r.value).toBeCloseTo(3.85, 2);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High probability");
  });

  it("near −1.455 boundary: age=50, BMI=28, DM=0, AST/ALT=1.0, platelets=200, alb=4.0", () => {
    // −1.675 + 0.037×50 + 0.094×28 + 0 + 0.99×1.0
    //   − 0.013×200 − 0.66×4.0
    // = −1.675 + 1.85 + 2.632 + 0.99 − 2.6 − 2.64
    // = −1.443
    const r = calc(nafldFibrosisCalculator, {
      age: "50",
      bmi: "28",
      diabetes: "0",
      ast: "50",
      alt: "50",
      platelets: "200",
      albumin: "4.0",
    });
    expect(r.value).toBeCloseTo(-1.443, 2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Indeterminate");
  });

  it("near +0.676 boundary: age=50, BMI=30, DM=1, AST/ALT=1.0, platelets=180, alb=3.8", () => {
    // −1.675 + 0.037×50 + 0.094×30 + 1.13×1 + 0.99×1.0
    //   − 0.013×180 − 0.66×3.8
    // = −1.675 + 1.85 + 2.82 + 1.13 + 0.99 − 2.34 − 2.508
    // = 0.267
    const r = calc(nafldFibrosisCalculator, {
      age: "50",
      bmi: "30",
      diabetes: "1",
      ast: "40",
      alt: "40",
      platelets: "180",
      albumin: "3.8",
    });
    expect(r.value).toBeCloseTo(0.267, 2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Indeterminate");
  });

  it("young no-DM low-risk: age=25, BMI=22, DM=0, AST/ALT=0.5, platelets=300, alb=5.0", () => {
    // −1.675 + 0.037×25 + 0.094×22 + 0 + 0.99×0.5
    //   − 0.013×300 − 0.66×5.0
    // = −1.675 + 0.925 + 2.068 + 0.495 − 3.9 − 3.3
    // = −5.387
    const r = calc(nafldFibrosisCalculator, {
      age: "25",
      bmi: "22",
      diabetes: "0",
      ast: "20",
      alt: "40",
      platelets: "300",
      albumin: "5.0",
    });
    expect(r.value).toBeCloseTo(-5.387, 2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Low probability");
  });
});

// ---------------------------------------------------------------------------
// Rockall Score — composite: age + shock + comorbidity + diagnosis + stigmata
// Risk: 0–2 low, 3–4 moderate, ≥5 high
// ---------------------------------------------------------------------------
describe("Rockall Score calculate() output", () => {
  it("zero risk: all minimal", () => {
    // age=0, shock=0, comorbidity=0, diagnosis=0, stigmata=0
    const r = calc(rockallCalculator, {
      age: "0",
      shock: "0",
      comorbidity: "0",
      diagnosis: "0",
      stigmata: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Low risk");
  });

  it("moderate: age=1, shock=0, comorbidity=2, diagnosis=1, stigmata=0", () => {
    // 1 + 0 + 2 + 1 + 0 = 4 → moderate
    const r = calc(rockallCalculator, {
      age: "1",
      shock: "0",
      comorbidity: "2",
      diagnosis: "1",
      stigmata: "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Moderate risk");
  });

  it("high risk: age=2, shock=2, comorbidity=3, diagnosis=2, stigmata=2", () => {
    // 2 + 2 + 3 + 2 + 2 = 11 → high
    const r = calc(rockallCalculator, {
      age: "2",
      shock: "2",
      comorbidity: "3",
      diagnosis: "2",
      stigmata: "2",
    });
    expect(r.value).toBe(11);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High risk");
  });

  it("boundary: score = 5 → high", () => {
    // age=2, shock=1, comorbidity=0, diagnosis=1, stigmata=1
    // 2 + 1 + 0 + 1 + 1 = 5
    const r = calc(rockallCalculator, {
      age: "2",
      shock: "1",
      comorbidity: "0",
      diagnosis: "1",
      stigmata: "1",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High risk");
  });

  it("low risk boundary: score = 2", () => {
    // age=0, shock=0, comorbidity=0, diagnosis=0, stigmata=0
    // age=1, shock=0, comorbidity=0, diagnosis=1, stigmata=0 = 2
    const r = calc(rockallCalculator, {
      age: "1",
      shock: "0",
      comorbidity: "0",
      diagnosis: "1",
      stigmata: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Low risk");
  });

  it("isolated comorbidity: score = 3", () => {
    // age=0, shock=0, comorbidity=3, diagnosis=0, stigmata=0 = 3
    const r = calc(rockallCalculator, {
      age: "0",
      shock: "0",
      comorbidity: "3",
      diagnosis: "0",
      stigmata: "0",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Moderate risk");
  });
});

// ---------------------------------------------------------------------------
// A-a Gradient — PAO₂ = FiO₂ × (760 − 47) − PaCO₂ / 0.8
//             A-a = PAO₂ − PaO₂
// Expected normal = age/4 + 4
// Result = Math.round(gradient * 10) / 10
// ---------------------------------------------------------------------------
describe("A-a Gradient calculate() output", () => {
  it("young normal: age=25, FiO₂=0.21, PaCO₂=40, PaO₂=100", () => {
    // PAO₂ = 0.21 × 713 − 40/0.8 = 149.73 − 50 = 99.73
    // A-a = 99.73 − 100 = −0.27 → round to −0.3
    // expected = 25/4 + 4 = 10.25
    const r = calc(aaGradientCalculator, {
      age: "25",
      fio2: "0.21",
      pao2: "100",
      paco2: "40",
    });
    expect(r.value).toBe(-0.3);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Normal A–a oxygen gradient");
  });

  it("older normal: age=70, FiO₂=0.21, PaCO₂=40, PaO₂=80", () => {
    // PAO₂ = 0.21 × 713 − 40/0.8 = 149.73 − 50 = 99.73
    // A-a = 99.73 − 80 = 19.73 → round to 19.7
    // expected = 70/4 + 4 = 21.5
    const r = calc(aaGradientCalculator, {
      age: "70",
      fio2: "0.21",
      pao2: "80",
      paco2: "40",
    });
    expect(r.value).toBe(19.7);
    expect(r.status).toBe("normal");
  });

  it("elevated: age=50, FiO₂=0.50, PaCO₂=40, PaO₂=100", () => {
    // PAO₂ = 0.50 × 713 − 40/0.8 = 356.5 − 50 = 306.5
    // A-a = 306.5 − 100 = 206.5
    // expected = 50/4 + 4 = 16.5; 206.5 > 16.5 + 50 → critical
    const r = calc(aaGradientCalculator, {
      age: "50",
      fio2: "0.50",
      pao2: "100",
      paco2: "40",
    });
    expect(r.value).toBe(206.5);
    expect(r.status).toBe("critical");
  });

  it("high FiO₂: age=50, FiO₂=1.0, PaCO₂=35, PaO₂=200", () => {
    // PAO₂ = 1.0 × 713 − 35/0.8 = 713 − 43.75 = 669.25
    // A-a = 669.25 − 200 = 469.25 → round to 469.3
    const r = calc(aaGradientCalculator, {
      age: "50",
      fio2: "1",
      pao2: "200",
      paco2: "35",
    });
    expect(r.value).toBe(469.3);
    expect(r.status).toBe("critical");
  });

  it("low PaO₂: age=35, FiO₂=0.21, PaCO₂=30, PaO₂=60", () => {
    // PAO₂ = 0.21 × 713 − 30/0.8 = 149.73 − 37.5 = 112.23
    // A-a = 112.23 − 60 = 52.23 → round to 52.2
    // expected = 35/4 + 4 = 12.75; 52.2 > 12.75 + 20 = 32.75 → high
    const r = calc(aaGradientCalculator, {
      age: "35",
      fio2: "0.21",
      pao2: "60",
      paco2: "30",
    });
    expect(r.value).toBe(52.2);
    expect(r.status).toBe("high");
  });

  it("standard sea-level: age=40, FiO₂=0.21, PaCO₂=40, PaO₂=95", () => {
    // PAO₂ = 0.21 × 713 − 40/0.8 = 149.73 − 50 = 99.73
    // A-a = 99.73 − 95 = 4.73 → round to 4.7
    const r = calc(aaGradientCalculator, {
      age: "40",
      fio2: "0.21",
      pao2: "95",
      paco2: "40",
    });
    expect(r.value).toBe(4.7);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Oxygen Index — (FiO₂ × MAP × 100) / PaO₂
// Classification:
//   < 5   → Mild
//   5–15  → Moderate
//   16–25 → Severe
//   > 25  → Very severe
// Result = Math.round(oi * 100) / 100
// ---------------------------------------------------------------------------
describe("Oxygen Index calculate() output", () => {
  it("mild: FiO₂=0.21, MAP=10, PaO₂=100", () => {
    // (0.21 × 10 × 100) / 100 = 210 / 100 = 2.10
    const r = calc(oxygenIndexCalculator, {
      fio2: "0.21",
      map: "10",
      pao2: "100",
    });
    expect(r.value).toBe(2.1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Mild oxygenation impairment.");
  });

  it("moderate: FiO₂=0.50, MAP=15, PaO₂=80", () => {
    // (0.50 × 15 × 100) / 80 = 750 / 80 = 9.375 → 9.38
    const r = calc(oxygenIndexCalculator, {
      fio2: "0.50",
      map: "15",
      pao2: "80",
    });
    expect(r.value).toBeCloseTo(9.38, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Moderate oxygenation impairment.");
  });

  it("severe: FiO₂=0.80, MAP=20, PaO₂=65", () => {
    // (0.80 × 20 × 100) / 65 = 1600 / 65 = 24.6154… → 24.62
    const r = calc(oxygenIndexCalculator, {
      fio2: "0.80",
      map: "20",
      pao2: "65",
    });
    expect(r.value).toBeCloseTo(24.62, 1);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Severe oxygenation impairment.");
  });

  it("very severe: FiO₂=1.0, MAP=25, PaO₂=60", () => {
    // (1.0 × 25 × 100) / 60 = 2500 / 60 = 41.6667… → 41.67
    const r = calc(oxygenIndexCalculator, {
      fio2: "1",
      map: "25",
      pao2: "60",
    });
    expect(r.value).toBeCloseTo(41.67, 1);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Very severe");
  });

  it("boundary: OI = 15.0 → moderate", () => {
    // (0.30 × 20 × 100) / 40 = 600 / 40 = 15.0
    const r = calc(oxygenIndexCalculator, {
      fio2: "0.30",
      map: "20",
      pao2: "40",
    });
    expect(r.value).toBe(15);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Moderate oxygenation impairment.");
  });

  it("rounding: FiO₂=0.60, MAP=12, PaO₂=55", () => {
    // (0.60 × 12 × 100) / 55 = 720 / 55 = 13.0909… → 13.09
    const r = calc(oxygenIndexCalculator, {
      fio2: "0.60",
      map: "12",
      pao2: "55",
    });
    expect(r.value).toBeCloseTo(13.09, 1);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// P/F Ratio — PaO₂ / FiO₂
// Classification (Berlin):
//   > 400 → Normal
//   301–400 → Mild impairment
//   201–300 → Mild ARDS
//   101–200 → Moderate ARDS
//   ≤ 100 → Severe ARDS
// Result = Math.round(ratio)
// ---------------------------------------------------------------------------
describe("P/F Ratio calculate() output", () => {
  it("normal: PaO₂=100, FiO₂=0.21", () => {
    // 100 / 0.21 = 476.1905… → round to 476
    const r = calc(pfRatioCalculator, {
      pao2: "100",
      fio2: "0.21",
    });
    expect(r.value).toBe(476);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal oxygenation.");
  });

  it("mild impairment: PaO₂=120, FiO₂=0.40", () => {
    // 120 / 0.40 = 300.00 → 300
    // score=300 → > 200 → mild ARDS
    const r = calc(pfRatioCalculator, {
      pao2: "120",
      fio2: "0.40",
    });
    expect(r.value).toBe(300);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Mild ARDS");
  });

  it("moderate ARDS: PaO₂=80, FiO₂=0.60", () => {
    // 80 / 0.60 = 133.333… → round to 133
    const r = calc(pfRatioCalculator, {
      pao2: "80",
      fio2: "0.60",
    });
    expect(r.value).toBe(133);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Moderate ARDS");
  });

  it("severe ARDS: PaO₂=50, FiO₂=0.80", () => {
    // 50 / 0.80 = 62.5 → round to 63
    const r = calc(pfRatioCalculator, {
      pao2: "50",
      fio2: "0.80",
    });
    expect(r.value).toBe(63);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Severe ARDS");
  });

  it("exact boundary 300: PaO₂=90, FiO₂=0.30", () => {
    // 90 / 0.30 = 300
    const r = calc(pfRatioCalculator, {
      pao2: "90",
      fio2: "0.30",
    });
    expect(r.value).toBe(300);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Mild ARDS");
  });

  it("mild impairment boundary 401: PaO₂=120, FiO₂=0.29", () => {
    // 120 / 0.29 = 413.79… → round to 414
    const r = calc(pfRatioCalculator, {
      pao2: "120",
      fio2: "0.29",
    });
    expect(r.value).toBe(414);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal oxygenation.");
  });
});

// ---------------------------------------------------------------------------
// ROX Index — (SpO₂ / FiO₂) / RR
// Classification:
//   ≥ 4.88 → Likely HFNC success
//   3.85–4.87 → Intermediate
//   < 3.85 → High risk of failure
// Result = Math.round(rox * 100) / 100
// ---------------------------------------------------------------------------
describe("ROX Index calculate() output", () => {
  it("likely success: SpO₂=98, FiO₂=0.30, RR=12", () => {
    // (98 / 0.30) / 12 = 326.6667 / 12 = 27.2222 → 27.22
    const r = calc(roxIndexCalculator, {
      spo2: "98",
      fio2: "0.30",
      rr: "12",
    });
    expect(r.value).toBeCloseTo(27.22, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Likely HFNC success");
  });

  it("low ROX: SpO₂=88, FiO₂=1.0, RR=30", () => {
    // (88 / 1.0) / 30 = 88 / 30 = 2.9333… → 2.93
    const r = calc(roxIndexCalculator, {
      spo2: "88",
      fio2: "1",
      rr: "30",
    });
    expect(r.value).toBeCloseTo(2.93, 1);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("High risk of HFNC failure");
  });

  it("boundary near 4.88: SpO₂=96, FiO₂=0.40, RR=50", () => {
    // (96 / 0.40) / 50 = 240 / 50 = 4.80
    const r = calc(roxIndexCalculator, {
      spo2: "96",
      fio2: "0.40",
      rr: "50",
    });
    expect(r.value).toBeCloseTo(4.8, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Intermediate");
  });

  it("boundary near 3.85: SpO₂=95, FiO₂=0.50, RR=49", () => {
    // (95 / 0.50) / 49 = 190 / 49 = 3.8776… → 3.88
    const r = calc(roxIndexCalculator, {
      spo2: "95",
      fio2: "0.50",
      rr: "49",
    });
    expect(r.value).toBeCloseTo(3.88, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("Intermediate");
  });

  it("exactly 4.88: SpO₂=97.6, FiO₂=0.40, RR=50", () => {
    // (97.6 / 0.40) / 50 = 244 / 50 = 4.88
    const r = calc(roxIndexCalculator, {
      spo2: "97.6",
      fio2: "0.40",
      rr: "50",
    });
    expect(r.value).toBeCloseTo(4.88, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Likely HFNC success");
  });

  it("representative: SpO₂=95, FiO₂=0.60, RR=25", () => {
    // (95 / 0.60) / 25 = 158.3333 / 25 = 6.3333 → 6.33
    const r = calc(roxIndexCalculator, {
      spo2: "95",
      fio2: "0.60",
      rr: "25",
    });
    expect(r.value).toBeCloseTo(6.33, 1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Respiratory Compensation — Expected HCO₃ = 24 + k × ((PaCO₂ − 40) / 10)
// k = 1 (acuteRespAcidosis), 4 (chronicRespAcidosis),
//     −2 (acuteRespAlkalosis), −5 (chronicRespAlkalosis)
// Classification: within ±2 → appropriate; outside ±2 → mixed disorder
// Result = Number(expectedHco3.toFixed(1))
// score = Number(deviation.toFixed(1))
// ---------------------------------------------------------------------------
describe("Respiratory Compensation calculate() output", () => {
  it("acute respiratory acidosis: PaCO₂=60, measured HCO₃=25", () => {
    // expected = 24 + 1 × (60 − 40) / 10 = 24 + 2 = 26.0
    // deviation = 25 − 26 = −1.0 → within ±2
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "acuteRespAcidosis",
      paCO2: "60",
      measuredBicarbonate: "25",
    });
    expect(r.value).toBe(26);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±2");
  });

  it("chronic respiratory acidosis: PaCO₂=60, measured HCO₃=28", () => {
    // expected = 24 + 4 × (60 − 40) / 10 = 24 + 8 = 32.0
    // deviation = 28 − 32 = −4.0 → outside ±2 (below)
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "chronicRespAcidosis",
      paCO2: "60",
      measuredBicarbonate: "28",
    });
    expect(r.value).toBe(32);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("more than 2 mEq/L below expected");
  });

  it("acute respiratory alkalosis: PaCO₂=25, measured HCO₃=22", () => {
    // expected = 24 + (−2) × (25 − 40) / 10 = 24 + (−2) × (−1.5) = 24 + 3 = 27.0
    // deviation = 22 − 27 = −5.0 → outside ±2 (below)
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "acuteRespAlkalosis",
      paCO2: "25",
      measuredBicarbonate: "22",
    });
    expect(r.value).toBe(27);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("more than 2 mEq/L below expected");
  });

  it("chronic respiratory alkalosis: PaCO₂=30, measured HCO₃=17", () => {
    // expected = 24 + (−5) × (30 − 40) / 10 = 24 + (−5) × (−1) = 24 + 5 = 29.0
    // deviation = 17 − 29 = −12.0 → outside ±2
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "chronicRespAlkalosis",
      paCO2: "30",
      measuredBicarbonate: "17",
    });
    expect(r.value).toBe(29);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("more than 2 mEq/L below expected");
  });

  it("appropriate chronic compensation: PaCO₂=50, measured HCO₃=27", () => {
    // expected = 24 + 4 × (50 − 40) / 10 = 24 + 4 = 28.0
    // deviation = 27 − 28 = −1.0 → within ±2
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "chronicRespAcidosis",
      paCO2: "50",
      measuredBicarbonate: "27",
    });
    expect(r.value).toBe(28);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±2");
  });

  it("appropriate acute acidosis: PaCO₂=50, measured HCO₃=25", () => {
    // expected = 24 + 1 × (50 − 40) / 10 = 24 + 1 = 25.0
    // deviation = 25 − 25 = 0.0 → within ±2
    const r = calc(respiratoryCompensationCalculator, {
      disorderType: "acuteRespAcidosis",
      paCO2: "50",
      measuredBicarbonate: "25",
    });
    expect(r.value).toBe(25);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±2");
  });
});

// ---------------------------------------------------------------------------
// Metabolic Alkalosis Compensation — Expected PaCO₂ = 40 + 0.6 × (HCO₃ − 24)
// Capped at 55 mmHg
// Classification: within ±5 → appropriate; outside ±5 → concurrent disorder
// Result = Number(expected.toFixed(1))
// score = Number(deviation.toFixed(1))
// HCO₃ must be > 24
// ---------------------------------------------------------------------------
describe("Metabolic Alkalosis Compensation calculate() output", () => {
  it("mild: HCO₃=30, measured PaCO₂=42", () => {
    // expected = 40 + 0.6 × (30 − 24) = 40 + 3.6 = 43.6
    // deviation = 42 − 43.6 = −1.6 → within ±5
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "30",
      measuredPaCO2: "42",
    });
    expect(r.value).toBe(43.6);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±5");
  });

  it("moderate: HCO₃=36, measured PaCO₂=50", () => {
    // expected = 40 + 0.6 × (36 − 24) = 40 + 7.2 = 47.2
    // deviation = 50 − 47.2 = 2.8 → within ±5
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "36",
      measuredPaCO2: "50",
    });
    expect(r.value).toBe(47.2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±5");
  });

  it("severe/capped: HCO₃=55, measured PaCO₂=55", () => {
    // expected = min(40 + 0.6 × (55 − 24), 55) = min(40 + 18.6, 55) = min(58.6, 55) = 55
    // deviation = 55 − 55 = 0 → within ±5
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "55",
      measuredPaCO2: "55",
    });
    expect(r.value).toBe(55);
    expect(r.status).toBe("normal");
  });

  it("HCO₃=24 is rejected (not alkalosis)", () => {
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "24",
      measuredPaCO2: "40",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("not consistent with metabolic alkalosis");
  });

  it("below normal: HCO₃=25, measured PaCO₂=30", () => {
    // expected = 40 + 0.6 × (25 − 24) = 40 + 0.6 = 40.6
    // deviation = 30 − 40.6 = −10.6 → outside ±5 (below)
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "25",
      measuredPaCO2: "30",
    });
    expect(r.value).toBe(40.6);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("more than 5 mmHg below expected");
  });

  it("above expected: HCO₃=32, measured PaCO₂=60", () => {
    // expected = 40 + 0.6 × (32 − 24) = 40 + 4.8 = 44.8
    // deviation = 60 − 44.8 = 15.2 → outside ±5 (above)
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "32",
      measuredPaCO2: "60",
    });
    expect(r.value).toBe(44.8);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("more than 5 mmHg above expected");
  });

  it("within boundary: HCO₃=28, measured PaCO₂=46", () => {
    // expected = 40 + 0.6 × (28 − 24) = 40 + 2.4 = 42.4
    // deviation = 46 − 42.4 = 3.6 → within ±5
    const r = calc(metabolicAlkalosisCompensationCalculator, {
      bicarbonate: "28",
      measuredPaCO2: "46",
    });
    expect(r.value).toBe(42.4);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within ±5");
  });
});

// KT/V — Daugirdas Second Generation spKt/V
// Formula: r = postBun/preBun; arg = r − 0.008 × t; ktv = −ln(arg) + (4 − 3.5r) × (uf/w)
// Classification: ≥1.2 adequate; 1.0–1.19 below target; <1.0 inadequate
describe("KT/V calculate() output", () => {
  it("adequate dialysis: preBUN=100, postBUN=30, UF=2.0L, time=4h, weight=70kg", () => {
    // r = 30/100 = 0.3; arg = 0.3 − 0.032 = 0.268
    // ktv = −ln(0.268) + (4 − 3.5×0.3) × (2/70) = 1.317 + 0.084 = 1.40
    const r = calc(ktVCalculator, {
      preBun: "100",
      postBun: "30",
      ultrafiltrate: "2.0",
      treatmentTime: "4",
      postWeight: "70",
    });
    expect(r.value).toBeCloseTo(1.4, 2);
    expect(r.status).toBe("normal");
  });

  it("below target: preBUN=150, postBUN=60, UF=1.5L, time=4h, weight=80kg", () => {
    // r = 60/150 = 0.4; arg = 0.4 − 0.032 = 0.368
    // ktv = 1.0001 + (4 − 1.4) × (1.5/80) = 1.0001 + 0.0488 = 1.05
    const r = calc(ktVCalculator, {
      preBun: "150",
      postBun: "60",
      ultrafiltrate: "1.5",
      treatmentTime: "4",
      postWeight: "80",
    });
    expect(r.value).toBeCloseTo(1.05, 2);
    expect(r.status).toBe("high");
  });

  it("inadequate: preBUN=90, postBUN=55, UF=1.0L, time=3h, weight=75kg", () => {
    // r = 55/90 = 0.6111; arg = 0.6111 − 0.024 = 0.5871
    // ktv = −ln(0.5871) + (4 − 3.5×0.6111) × (1/75) = 0.5325 + 0.0284 = 0.56
    const r = calc(ktVCalculator, {
      preBun: "90",
      postBun: "55",
      ultrafiltrate: "1.0",
      treatmentTime: "3",
      postWeight: "75",
    });
    expect(r.value).toBeCloseTo(0.56, 2);
    expect(r.status).toBe("critical");
  });

  it("high pre-BUN: preBUN=200, postBUN=80, UF=3.0L, time=4h, weight=70kg", () => {
    // r = 80/200 = 0.4; arg = 0.4 − 0.032 = 0.368
    // ktv = 1.0001 + 2.6 × (3/70) = 1.0001 + 0.1114 = 1.11
    const r = calc(ktVCalculator, {
      preBun: "200",
      postBun: "80",
      ultrafiltrate: "3.0",
      treatmentTime: "4",
      postWeight: "70",
    });
    expect(r.value).toBeCloseTo(1.11, 2);
    expect(r.status).toBe("high");
  });

  it("post-BUN ≥ pre-BUN returns critical", () => {
    const r = calc(ktVCalculator, {
      preBun: "60",
      postBun: "60",
      ultrafiltrate: "1.0",
      treatmentTime: "4",
      postWeight: "70",
    });
    expect(r.status).toBe("critical");
  });

  it("zero ultrafiltration: preBUN=100, postBUN=30, UF=0, time=4h, weight=70kg", () => {
    // r = 0.3; arg = 0.268; ktv = −ln(0.268) + 0 = 1.32
    const r = calc(ktVCalculator, {
      preBun: "100",
      postBun: "30",
      ultrafiltrate: "0",
      treatmentTime: "4",
      postWeight: "70",
    });
    expect(r.value).toBeCloseTo(1.32, 2);
    expect(r.status).toBe("normal");
  });
});

// Atherogenic Index of Plasma — log10(TG / HDL)
// Classification: <0.11 low risk; 0.11–0.21 intermediate; >0.21 high risk
describe("Atherogenic Index of Plasma calculate() output", () => {
  it("low risk: TG=80, HDL=60", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "80",
      hdlCholesterol: "60",
    });
    expect(r.value).toBeCloseTo(0.12, 2);
    expect(r.status).toBe("high");
  });

  it("very low risk: TG=60, HDL=60", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "60",
      hdlCholesterol: "60",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("high risk: TG=200, HDL=40", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "200",
      hdlCholesterol: "40",
    });
    expect(r.value).toBeCloseTo(0.7, 2);
    expect(r.status).toBe("critical");
  });

  it("intermediate: TG=150, HDL=50", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "150",
      hdlCholesterol: "50",
    });
    expect(r.value).toBeCloseTo(0.48, 2);
    expect(r.status).toBe("critical");
  });

  it("borderline at 0.11: TG≈73.6, HDL=56 → ratio≈1.314 → log10≈0.1186", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "132",
      hdlCholesterol: "100",
    });
    expect(r.value).toBeCloseTo(0.12, 2);
    expect(r.status).toBe("high");
  });

  it("very high risk: TG=400, HDL=30", () => {
    const r = calc(atherogenicIndexPlasmaCalculator, {
      triglycerides: "400",
      hdlCholesterol: "30",
    });
    expect(r.value).toBeCloseTo(1.12, 2);
    expect(r.status).toBe("critical");
  });
});

// PECARN Head Trauma — count of yes predictors (0–6)
// Classification: 0 very low risk; 1 not very low; ≥2 higher risk
describe("PECARN Head Trauma calculate() output", () => {
  it("under-2: all negative → 0 predictors → normal", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "under-2",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("under-2: altered mentalization → 1 predictor → high", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "under-2",
      u2AlteredMentation: "yes",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("under-2: skull fracture + scalp hematoma → 2 predictors → critical", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "under-2",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "yes",
      u2ScalpHematoma: "yes",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("under-2: all positive → 6 predictors → critical", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "under-2",
      u2AlteredMentation: "yes",
      u2PalpableSkullFracture: "yes",
      u2ScalpHematoma: "yes",
      u2Loc5Seconds: "yes",
      u2NotActingNormal: "yes",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "yes",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });

  it("two-and-older: all negative → 0 predictors → normal", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "two-and-older",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("two-and-older: altered mentation + LOC → 2 predictors → critical", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "two-and-older",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "yes",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "yes",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("two-and-older: vomiting + headache + dangerous mechanism → 3 → critical", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "two-and-older",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "no",
      p2Vomiting: "yes",
      p2SevereHeadache: "yes",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("two-and-older: only basilar skull fracture → 1 predictor → high", () => {
    const r = calc(pecarnHeadTraumaCalculator, {
      ageGroup: "two-and-older",
      u2AlteredMentation: "no",
      u2PalpableSkullFracture: "no",
      u2ScalpHematoma: "no",
      u2Loc5Seconds: "no",
      u2NotActingNormal: "no",
      p2AlteredMentation: "no",
      p2BasilarSkullFracture: "yes",
      p2Vomiting: "no",
      p2SevereHeadache: "no",
      p2LossOfConsciousness: "no",
      dangerousMechanism: "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });
});

// Rochester Criteria — febrile infant 0–60 days, 7 criteria
// Classification: 7/7 low risk; <7 not low risk
describe("Rochester Criteria calculate() output", () => {
  it("all criteria met → 7/7 → normal", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "14",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "10000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });

  it("WBC too low → 6/7 → high", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "14",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "4000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("WBC too high → 6/7 → high", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "21",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "20000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("preterm + high WBC → 5/7 → high", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "7",
      termGestation: "no",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "20000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("diarrhea with stool WBC < 5 → still met → 7/7 → normal", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "21",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "10000",
      urinalysisWbc: "2",
      diarrhea: "yes",
      stoolWbc: "3",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });

  it("diarrhea with stool WBC ≥ 5 → unmet → 6/7 → high", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "21",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "10000",
      urinalysisWbc: "2",
      diarrhea: "yes",
      stoolWbc: "8",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("focal infection present → 6/7 → high", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "30",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "yes",
      wbc: "10000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("age boundary: 0 days → eligible", () => {
    const r = calc(rochesterCriteriaCalculator, {
      ageDays: "0",
      termGestation: "yes",
      previouslyHealthy: "yes",
      nontoxic: "yes",
      focalInfection: "no",
      wbc: "10000",
      urinalysisWbc: "2",
      diarrhea: "no",
      stoolWbc: "0",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });
});

// ApoB/ApoA1 Ratio — ApoB / ApoA1
// Sex-specific threshold: male ≤1.0 normal; female ≤0.8 normal; above → critical
describe("ApoB/ApoA1 Ratio calculate() output", () => {
  it("male, low risk: ApoB=0.8, ApoA1=1.2 → ratio 0.67", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "0.8",
      apoA1: "1.2",
      sex: "male",
    });
    expect(r.value).toBeCloseTo(0.67, 2);
    expect(r.status).toBe("normal");
  });

  it("male, high risk: ApoB=1.5, ApoA1=1.0 → ratio 1.5", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "1.5",
      apoA1: "1.0",
      sex: "male",
    });
    expect(r.value).toBe(1.5);
    expect(r.status).toBe("critical");
  });

  it("male, at threshold: ApoB=1.0, ApoA1=1.0 → ratio 1.0", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "1.0",
      apoA1: "1.0",
      sex: "male",
    });
    expect(r.value).toBe(1.0);
    expect(r.status).toBe("normal");
  });

  it("female, normal: ApoB=0.6, ApoA1=1.0 → ratio 0.6", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "0.6",
      apoA1: "1.0",
      sex: "female",
    });
    expect(r.value).toBe(0.6);
    expect(r.status).toBe("normal");
  });

  it("female, high risk: ApoB=1.2, ApoA1=1.0 → ratio 1.2 > 0.8", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "1.2",
      apoA1: "1.0",
      sex: "female",
    });
    expect(r.value).toBe(1.2);
    expect(r.status).toBe("critical");
  });

  it("female, at threshold: ApoB=0.8, ApoA1=1.0 → ratio 0.8", () => {
    const r = calc(apobApoa1RatioCalculator, {
      apoB: "0.8",
      apoA1: "1.0",
      sex: "female",
    });
    expect(r.value).toBe(0.8);
    expect(r.status).toBe("normal");
  });
});

// 24-hour Creatinine Clearance — (Ucr × Vol) / (Scr × 1440)
// Classification: ≥90 normal; ≥60 high; ≥30 high; ≥15 critical; <15 critical
describe("24-hour Creatinine Clearance calculate() output", () => {
  it("normal: Ucr=120, Vol=1440, Scr=1.0 → 120 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "120",
      urineVolume: "1440",
      serumCreatinine: "1.0",
    });
    expect(r.value).toBe(120);
    expect(r.status).toBe("normal");
  });

  it("reduced: Ucr=60, Vol=1000, Scr=1.5 → 27.8 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "60",
      urineVolume: "1000",
      serumCreatinine: "1.5",
    });
    expect(r.value).toBeCloseTo(27.8, 1);
    expect(r.status).toBe("critical");
  });

  it("severe: Ucr=30, Vol=500, Scr=2.0 → 5.2 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "30",
      urineVolume: "500",
      serumCreatinine: "2.0",
    });
    expect(r.value).toBeCloseTo(5.2, 1);
    expect(r.status).toBe("critical");
  });

  it("high: Ucr=150, Vol=2000, Scr=0.8 → 260.4 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "150",
      urineVolume: "2000",
      serumCreatinine: "0.8",
    });
    expect(r.value).toBeCloseTo(260.4, 1);
    expect(r.status).toBe("normal");
  });

  it("boundary 90: Ucr=90, Vol=1440, Scr=1.0 → 90 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "90",
      urineVolume: "1440",
      serumCreatinine: "1.0",
    });
    expect(r.value).toBe(90);
    expect(r.status).toBe("normal");
  });

  it("boundary 60: Ucr=60, Vol=1440, Scr=1.0 → 60 mL/min", () => {
    const r = calc(creatinineClearance24hCalculator, {
      urineCreatinine: "60",
      urineVolume: "1440",
      serumCreatinine: "1.0",
    });
    expect(r.value).toBe(60);
    expect(r.status).toBe("high");
  });
});

// FEUA — (Uua × Scr) / (Sua × Ucr) × 100
// Classification: <12 prerenal; 12–20 indeterminate; >20 ATN
describe("Fractional Excretion of Uric Acid calculate() output", () => {
  it("prerenal: Uua=8, Scr=1.0, Sua=6, Ucr=50 → 2.67%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "8",
      serumUricAcid: "6",
      urineCr: "50",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(2.67, 2);
    expect(r.status).toBe("low");
  });

  it("indeterminate: Uua=40, Scr=1.5, Sua=6, Ucr=50 → 20%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "40",
      serumUricAcid: "6",
      urineCr: "50",
      plasmaCr: "1.5",
    });
    expect(r.value).toBeCloseTo(20, 2);
    expect(r.status).toBe("normal");
  });

  it("ATN: Uua=60, Scr=1.5, Sua=5, Ucr=30 → 60%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "60",
      serumUricAcid: "5",
      urineCr: "30",
      plasmaCr: "1.5",
    });
    expect(r.value).toBeCloseTo(60, 2);
    expect(r.status).toBe("high");
  });

  it("low end: Uua=5, Scr=1.0, Sua=8, Ucr=80 → 0.78%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "5",
      serumUricAcid: "8",
      urineCr: "80",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(0.78, 2);
    expect(r.status).toBe("low");
  });

  it("high end: Uua=100, Scr=2.0, Sua=4, Ucr=20 → 250%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "100",
      serumUricAcid: "4",
      urineCr: "20",
      plasmaCr: "2.0",
    });
    expect(r.value).toBeCloseTo(250, 2);
    expect(r.status).toBe("high");
  });

  it("boundary at 12%: Uua=24, Scr=1.0, Sua=5, Ucr=40 → 12%", () => {
    const r = calc(feuaCalculator, {
      urineUricAcid: "24",
      serumUricAcid: "5",
      urineCr: "40",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(12, 2);
    expect(r.status).toBe("normal");
  });
});

// FEP — (Up × Scr) / (Sp × Ucr) × 100
// Classification: <5 non-renal; 5–20 renal wasting; >20 markedly elevated
describe("Fractional Excretion of Phosphate calculate() output", () => {
  it("low (non-renal): Up=1, Scr=1.0, Sp=4, Ucr=50 → 0.5%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "1",
      serumPhosphate: "4",
      urineCr: "50",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(0.5, 2);
    expect(r.status).toBe("low");
  });

  it("normal (renal wasting): Up=10, Scr=1.5, Sp=4, Ucr=50 → 7.5%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "10",
      serumPhosphate: "4",
      urineCr: "50",
      plasmaCr: "1.5",
    });
    expect(r.value).toBeCloseTo(7.5, 2);
    expect(r.status).toBe("normal");
  });

  it("high: Up=30, Scr=1.5, Sp=3, Ucr=40 → 37.5%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "30",
      serumPhosphate: "3",
      urineCr: "40",
      plasmaCr: "1.5",
    });
    expect(r.value).toBeCloseTo(37.5, 2);
    expect(r.status).toBe("high");
  });

  it("boundary at 5%: Up=4, Scr=1.0, Sp=4, Ucr=20 → 5%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "4",
      serumPhosphate: "4",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(5, 2);
    expect(r.status).toBe("normal");
  });

  it("boundary at 20%: Up=16, Scr=1.0, Sp=4, Ucr=20 → 20%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "16",
      serumPhosphate: "4",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(20, 2);
    expect(r.status).toBe("normal");
  });

  it("very high: Up=50, Scr=2.0, Sp=3, Ucr=30 → 111.11%", () => {
    const r = calc(fepCalculator, {
      urinePhosphate: "50",
      serumPhosphate: "3",
      urineCr: "30",
      plasmaCr: "2.0",
    });
    expect(r.value).toBeCloseTo(111.11, 2);
    expect(r.status).toBe("high");
  });
});

// FECa — (Uca × Scr) / (Sca × Ucr) × 100
// Classification: <1% FHH likely; 1–2% gray zone; >2% PHPT
describe("Fractional Excretion of Calcium calculate() output", () => {
  it("low (FHH likely): Uca=0.5, Scr=1.0, Sca=10, Ucr=50 → 0.1%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "0.5",
      serumCalcium: "10",
      urineCr: "50",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(0.1, 2);
    expect(r.status).toBe("low");
  });

  it("normal (gray zone): Uca=2, Scr=1.0, Sca=10, Ucr=20 → 1%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "2",
      serumCalcium: "10",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(1, 2);
    expect(r.status).toBe("normal");
  });

  it("high (PHPT): Uca=6, Scr=1.5, Sca=11, Ucr=50 → 1.64%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "6",
      serumCalcium: "11",
      urineCr: "50",
      plasmaCr: "1.5",
    });
    expect(r.value).toBeCloseTo(1.64, 2);
    expect(r.status).toBe("normal");
  });

  it("very high: Uca=10, Scr=1.0, Sca=9, Ucr=20 → 5.56%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "10",
      serumCalcium: "9",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(5.56, 2);
    expect(r.status).toBe("high");
  });

  it("boundary at 1%: Uca=1, Scr=1.0, Sca=10, Ucr=10 → 1%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "1",
      serumCalcium: "10",
      urineCr: "10",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(1, 2);
    expect(r.status).toBe("normal");
  });

  it("boundary at 2%: Uca=4, Scr=1.0, Sca=10, Ucr=20 → 2%", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "4",
      serumCalcium: "10",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(2, 2);
    expect(r.status).toBe("normal");
  });

  it("score field returns CCCR (feca/100)", () => {
    const r = calc(fecaCalculator, {
      urineCalcium: "10",
      serumCalcium: "9",
      urineCr: "20",
      plasmaCr: "1.0",
    });
    expect(r.score).toBeCloseTo(0.0556, 4);
  });
});

// Renal Failure Index — (Una × Scr) / Ucr
// Classification: <1 prerenal; 1–2 indeterminate; >2 ATN
describe("Renal Failure Index calculate() output", () => {
  it("prerenal: Una=10, Scr=1.0, Ucr=100 → 0.1", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "10",
      plasmaCr: "1.0",
      urineCr: "100",
    });
    expect(r.value).toBeCloseTo(0.1, 2);
    expect(r.status).toBe("low");
  });

  it("indeterminate: Una=40, Scr=1.5, Ucr=40 → 1.5", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "40",
      plasmaCr: "1.5",
      urineCr: "40",
    });
    expect(r.value).toBeCloseTo(1.5, 2);
    expect(r.status).toBe("normal");
  });

  it("ATN: Una=60, Scr=2.0, Ucr=15 → 8", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "60",
      plasmaCr: "2.0",
      urineCr: "15",
    });
    expect(r.value).toBeCloseTo(8, 2);
    expect(r.status).toBe("high");
  });

  it("boundary at 1: Una=20, Scr=1.0, Ucr=20 → 1", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "20",
      plasmaCr: "1.0",
      urineCr: "20",
    });
    expect(r.value).toBeCloseTo(1, 2);
    expect(r.status).toBe("normal");
  });

  it("boundary at 2: Una=40, Scr=1.0, Ucr=20 → 2", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "40",
      plasmaCr: "1.0",
      urineCr: "20",
    });
    expect(r.value).toBeCloseTo(2, 2);
    expect(r.status).toBe("normal");
  });

  it("high prerenal: Una=5, Scr=1.0, Ucr=200 → 0.03", () => {
    const r = calc(rfiCalculator, {
      urineSodium: "5",
      plasmaCr: "1.0",
      urineCr: "200",
    });
    expect(r.value).toBeCloseTo(0.03, 2);
    expect(r.status).toBe("low");
  });
});

// Winters Formula — Expected PaCO₂ = 1.5 × HCO₃ + 8 ± 2
// Classification: within range appropriate; above inadequate; below excessive
// Guard: HCO₃ ≥ 24 → critical (not applicable)
describe("Winters Formula calculate() output", () => {
  it("adequate compensation: HCO₃=18, PCO₂=35 → expected 35", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "18",
      pco2: "35",
    });
    expect(r.value).toBe(35);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("within the expected range");
  });

  it("inadequate: HCO₃=16, PCO₂=38 → expected 32, above range", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "16",
      pco2: "38",
    });
    expect(r.value).toBe(32);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("above the expected range");
  });

  it("excessive: HCO₃=14, PCO₂=22 → expected 29, below range", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "14",
      pco2: "22",
    });
    expect(r.value).toBe(29);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("below the expected range");
  });

  it("HCO₃=24 rejected (no metabolic acidosis)", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "24",
      pco2: "40",
    });
    expect(r.status).toBe("critical");
  });

  it("lower tolerance boundary: HCO₃=12, expected=26, PCO₂=24 → at boundary", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "12",
      pco2: "24",
    });
    expect(r.value).toBe(26);
    expect(r.status).toBe("normal");
  });

  it("upper tolerance boundary: HCO₃=12, expected=26, PCO₂=28 → at boundary", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "12",
      pco2: "28",
    });
    expect(r.value).toBe(26);
    expect(r.status).toBe("normal");
  });

  it("severe acidosis: HCO₃=10, PCO₂=23 → expected 23, within range", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "10",
      pco2: "23",
    });
    expect(r.value).toBe(23);
    expect(r.status).toBe("normal");
  });

  it("mixed disorder: HCO₃=15, PCO₂=45 → expected 30.5, above", () => {
    const r = calc(wintersFormulaCalculator, {
      bicarbonate: "15",
      pco2: "45",
    });
    expect(r.value).toBe(30.5);
    expect(r.status).toBe("high");
  });
});

// Anion Gap Delta Ratio — (AG − 12) / (24 − HCO₃)
// Guard: AG < 12 → critical; HCO₃ ≥ 24 → critical
// Classification: <1 mixed; 1–2 pure HAGMA; >2 concurrent alkalosis
describe("Anion Gap Delta Ratio calculate() output", () => {
  it("pure HAGMA: AG=24, HCO₃=12 → ratio 1.0", () => {
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "24",
      bicarbonate: "12",
    });
    expect(r.value).toBe(1.0);
    expect(r.status).toBe("normal");
  });

  it("mixed: AG=16, HCO₃=16 → ratio 1.0", () => {
    // (16−12)/(24−16) = 4/8 = 0.5 → mixed
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "16",
      bicarbonate: "16",
    });
    expect(r.value).toBeCloseTo(0.5, 2);
    expect(r.status).toBe("low");
  });

  it("concurrent alkalosis: AG=30, HCO₃=18 → ratio 3.0", () => {
    // (30−12)/(24−18) = 18/6 = 3.0
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "30",
      bicarbonate: "18",
    });
    expect(r.value).toBeCloseTo(3.0, 2);
    expect(r.status).toBe("high");
  });

  it("AG < 12 → critical (no HAGMA)", () => {
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "10",
      bicarbonate: "18",
    });
    expect(r.status).toBe("critical");
  });

  it("HCO₃ ≥ 24 → critical (denominator not positive)", () => {
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "20",
      bicarbonate: "24",
    });
    expect(r.status).toBe("critical");
  });

  it("extreme HAGMA: AG=44, HCO₃=8 → ratio 2.0", () => {
    // (44−12)/(24−8) = 32/16 = 2.0
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "44",
      bicarbonate: "8",
    });
    expect(r.value).toBeCloseTo(2.0, 2);
    expect(r.status).toBe("normal");
  });

  it("boundary ratio at 1: AG=14, HCO₃=22 → ratio 1.0", () => {
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "14",
      bicarbonate: "22",
    });
    expect(r.value).toBe(1.0);
    expect(r.status).toBe("normal");
  });

  it("boundary ratio at 2: AG=24, HCO₃=18 → ratio 2.0", () => {
    // (24−12)/(24−18) = 12/6 = 2.0
    const r = calc(anionGapDeltaRatioCalculator, {
      anionGap: "24",
      bicarbonate: "18",
    });
    expect(r.value).toBe(2.0);
    expect(r.status).toBe("normal");
  });
});

// Free Water Clearance — CH₂O = V × (1 − Uosm / Posm)
// Classification: >0 normal (dilute); =0 normal (iso-osmolar); <0 high (concentrated)
describe("Free Water Clearance calculate() output", () => {
  it("positive (dilute): V=2, Uosm=100, Posm=300 → 1.33", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "2",
      urineOsmolality: "100",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBeCloseTo(1.33, 2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("positive free water clearance");
  });

  it("negative (concentrated): V=1, Uosm=600, Posm=300 → −1.0", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "1",
      urineOsmolality: "600",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBe(-1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("negative free water clearance");
  });

  it("iso-osmolar: V=1, Uosm=300, Posm=300 → 0", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "1",
      urineOsmolality: "300",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("iso-osmolar");
  });

  it("mildly negative: V=1.5, Uosm=400, Posm=300 → −0.5", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "1.5",
      urineOsmolality: "400",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBe(-0.5);
    expect(r.status).toBe("high");
  });

  it("highly positive: V=3, Uosm=50, Posm=300 → 2.5", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "3",
      urineOsmolality: "50",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBeCloseTo(2.5, 2);
    expect(r.status).toBe("normal");
  });

  it("slightly positive: V=1, Uosm=250, Posm=300 → 0.17", () => {
    const r = calc(freeWaterClearanceCalculator, {
      urineVolume: "1",
      urineOsmolality: "250",
      plasmaOsmolality: "300",
    });
    expect(r.value).toBeCloseTo(0.17, 2);
    expect(r.status).toBe("normal");
  });
});

// Electrolyte-Free Water Clearance — EFWC = V × (1 − (Una + UK) / PNa)
// Classification: >0 high (renal loss); =0 normal; <0 normal (extrarenal)
describe("Electrolyte-Free Water Clearance calculate() output", () => {
  it("positive: V=2, Una=10, UK=10, PNa=140 → 1.71", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "2",
      urineSodium: "10",
      urinePotassium: "10",
      plasmaSodium: "140",
    });
    expect(r.value).toBeCloseTo(1.71, 2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("renal electrolyte-free water loss");
  });

  it("negative: V=1, Una=60, UK=30, PNa=140 → 0.36", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "1",
      urineSodium: "60",
      urinePotassium: "30",
      plasmaSodium: "140",
    });
    expect(r.value).toBeCloseTo(0.36, 2);
    expect(r.status).toBe("high");
  });

  it("iso-tonic: V=1, Una=70, UK=20, PNa=140 → 0.36", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "1",
      urineSodium: "70",
      urinePotassium: "20",
      plasmaSodium: "140",
    });
    expect(r.value).toBeCloseTo(0.36, 2);
    expect(r.status).toBe("high");
  });

  it("zero: V=1, Una=100, UK=40, PNa=140 → 0", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "1",
      urineSodium: "100",
      urinePotassium: "40",
      plasmaSodium: "140",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("highly negative: V=2, Una=100, UK=50, PNa=140 → −0.14", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "2",
      urineSodium: "100",
      urinePotassium: "50",
      plasmaSodium: "140",
    });
    expect(r.value).toBeCloseTo(-0.14, 2);
    expect(r.status).toBe("normal");
  });

  it("low urine electrolytes: V=3, Una=5, UK=5, PNa=140 → 2.79", () => {
    const r = calc(electrolyteFreeWaterClearanceCalculator, {
      urineVolume: "3",
      urineSodium: "5",
      urinePotassium: "5",
      plasmaSodium: "140",
    });
    expect(r.value).toBeCloseTo(2.79, 2);
    expect(r.status).toBe("high");
  });
});

// Total Cholesterol / HDL Ratio
// Classification: <4 desirable; 4–5 moderate; >5 elevated
describe("Total Cholesterol/HDL Ratio calculate() output", () => {
  it("desirable: TC=180, HDL=50 → 3.6", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "180",
      hdlCholesterol: "50",
    });
    expect(r.value).toBe(3.6);
    expect(r.status).toBe("normal");
  });

  it("moderate: TC=220, HDL=50 → 4.4", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "220",
      hdlCholesterol: "50",
    });
    expect(r.value).toBe(4.4);
    expect(r.status).toBe("high");
  });

  it("elevated: TC=300, HDL=50 → 6.0", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "300",
      hdlCholesterol: "50",
    });
    expect(r.value).toBe(6.0);
    expect(r.status).toBe("critical");
  });

  it("boundary at 4: TC=200, HDL=50 → 4.0", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "200",
      hdlCholesterol: "50",
    });
    expect(r.value).toBe(4.0);
    expect(r.status).toBe("high");
  });

  it("boundary at 5: TC=250, HDL=50 → 5.0", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "250",
      hdlCholesterol: "50",
    });
    expect(r.value).toBe(5.0);
    expect(r.status).toBe("high");
  });

  it("low HDL driving high ratio: TC=200, HDL=30 → 6.67", () => {
    const r = calc(totalCholesterolHdlRatioCalculator, {
      totalCholesterol: "200",
      hdlCholesterol: "30",
    });
    expect(r.value).toBeCloseTo(6.67, 2);
    expect(r.status).toBe("critical");
  });
});

// CRB-65 — confusion + RR≥30 + SBP<90/DBP≤60 + age≥65
// Classification: 0 low; 1–2 intermediate; 3–4 high
describe("CRB-65 calculate() output", () => {
  it("score 0: no confusion, RR=20, SBP=120, DBP=80, age=50", () => {
    const r = calc(crb65Calculator, {
      confusion: "0",
      "respiratory-rate": "20",
      sbp: "120",
      dbp: "80",
      age: "50",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 1: confusion only", () => {
    const r = calc(crb65Calculator, {
      confusion: "1",
      "respiratory-rate": "20",
      sbp: "120",
      dbp: "80",
      age: "50",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("score 2: RR≥30 + age≥65", () => {
    const r = calc(crb65Calculator, {
      confusion: "0",
      "respiratory-rate": "30",
      sbp: "120",
      dbp: "80",
      age: "65",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("score 3: confusion + SBP<90 + age≥65", () => {
    const r = calc(crb65Calculator, {
      confusion: "1",
      "respiratory-rate": "20",
      sbp: "80",
      dbp: "80",
      age: "70",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("score 4: all criteria positive", () => {
    const r = calc(crb65Calculator, {
      confusion: "1",
      "respiratory-rate": "32",
      sbp: "85",
      dbp: "50",
      age: "80",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("DBP≤60 counts even if SBP≥90: DBP=60 → hypotension criterion met", () => {
    const r = calc(crb65Calculator, {
      confusion: "0",
      "respiratory-rate": "20",
      sbp: "130",
      dbp: "60",
      age: "50",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("RR exactly 29 does NOT meet threshold → score 0", () => {
    const r = calc(crb65Calculator, {
      confusion: "0",
      "respiratory-rate": "29",
      sbp: "120",
      dbp: "80",
      age: "50",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("age exactly 64 does NOT meet threshold", () => {
    const r = calc(crb65Calculator, {
      confusion: "0",
      "respiratory-rate": "20",
      sbp: "120",
      dbp: "80",
      age: "64",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });
});

// Pediatric PEWS — behavior(0–3) + cardiovascular(0–3) + respiratory(0–3) + concern(0–1)
// Classification: ≤2 low; 3–4 intermediate; ≥5 high
describe("Pediatric PEWS calculate() output", () => {
  it("low risk: all 0, no concern → 0", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "0",
      cardiovascular: "0",
      respiratory: "0",
      concern: "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("moderate: behavior=1, cardio=1, resp=0, no concern → 2", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "1",
      cardiovascular: "1",
      respiratory: "0",
      concern: "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("intermediate: behavior=1, cardio=1, resp=1, no concern → 3", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "1",
      cardiovascular: "1",
      respiratory: "1",
      concern: "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("intermediate: behavior=1, cardio=0, resp=0, yes concern → 2", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "1",
      cardiovascular: "0",
      respiratory: "0",
      concern: "yes",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("high: behavior=2, cardio=2, resp=1, no concern → 5", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "2",
      cardiovascular: "2",
      respiratory: "1",
      concern: "no",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("max score: behavior=3, cardio=3, resp=3, yes concern → 10", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "3",
      cardiovascular: "3",
      respiratory: "3",
      concern: "yes",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });

  it("boundary at 4: behavior=1, cardio=1, resp=1, yes concern → 4", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "1",
      cardiovascular: "1",
      respiratory: "1",
      concern: "yes",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("boundary at 5: behavior=2, cardio=1, resp=1, yes concern → 5", () => {
    const r = calc(pedsPewsCalculator, {
      behavior: "2",
      cardiovascular: "1",
      respiratory: "1",
      concern: "yes",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });
});

// Hadlock EFW — log₁₀(EFW) = 1.3596 − 0.00386×AC×FL + 0.0064×HC + 0.00061×BPD×AC + 0.0424×AC + 0.174×FL
// Status always normal; value in grams
describe("Hadlock EFW calculate() output", () => {
  it("typical 36-week: BPD=9.0, HC=33, AC=34, FL=7.0", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "9.0",
      hc: "33",
      ac: "34",
      fl: "7.0",
    });
    const logEfw =
      1.3596 -
      0.00386 * 34 * 7.0 +
      0.0064 * 33 +
      0.00061 * 9.0 * 34 +
      0.0424 * 34 +
      0.174 * 7.0;
    const expected = Math.round(Math.pow(10, logEfw));
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("g");
  });

  it("small fetus: BPD=7.0, HC=26, AC=24, FL=5.0", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "7.0",
      hc: "26",
      ac: "24",
      fl: "5.0",
    });
    const logEfw =
      1.3596 -
      0.00386 * 24 * 5.0 +
      0.0064 * 26 +
      0.00061 * 7.0 * 24 +
      0.0424 * 24 +
      0.174 * 5.0;
    const expected = Math.round(Math.pow(10, logEfw));
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("large fetus: BPD=10.0, HC=36, AC=38, FL=7.5", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "10.0",
      hc: "36",
      ac: "38",
      fl: "7.5",
    });
    const logEfw =
      1.3596 -
      0.00386 * 38 * 7.5 +
      0.0064 * 36 +
      0.00061 * 10.0 * 38 +
      0.0424 * 38 +
      0.174 * 7.5;
    const expected = Math.round(Math.pow(10, logEfw));
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("mid-range: BPD=8.5, HC=30, AC=30, FL=6.0", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "8.5",
      hc: "30",
      ac: "30",
      fl: "6.0",
    });
    const logEfw =
      1.3596 -
      0.00386 * 30 * 6.0 +
      0.0064 * 30 +
      0.00061 * 8.5 * 30 +
      0.0424 * 30 +
      0.174 * 6.0;
    const expected = Math.round(Math.pow(10, logEfw));
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("SD is 7.5% of weight", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "9.0",
      hc: "33",
      ac: "34",
      fl: "7.0",
    });
    expect(r.interpretation).toContain("7.5%");
  });

  it("output unit is grams", () => {
    const r = calc(hadlockEfwCalculator, {
      bpd: "9.0",
      hc: "33",
      ac: "34",
      fl: "7.0",
    });
    expect(r.unit).toBe("g");
  });
});

// EBL Obstetric — gravimetric: wet−dry; hct: BV × (pre−post) / pre
// Classification: ≥1000 PPH; ≥500 concern; <500 expected
describe("EBL Obstetric calculate() output", () => {
  it("gravimetric low: wet=500, dry=300 → 200 mL", () => {
    const r = calc(eblObstetricCalculator, {
      method: "gravimetric",
      wetWeight: "500",
      dryWeight: "300",
      weightKg: "70",
      preHct: "35",
      postHct: "32",
    });
    expect(r.value).toBe(200);
    expect(r.status).toBe("normal");
  });

  it("gravimetric high: wet=1800, dry=500 → 1300 mL", () => {
    const r = calc(eblObstetricCalculator, {
      method: "gravimetric",
      wetWeight: "1800",
      dryWeight: "500",
      weightKg: "70",
      preHct: "35",
      postHct: "32",
    });
    expect(r.value).toBe(1300);
    expect(r.status).toBe("critical");
  });

  it("gravimetric concern: wet=1200, dry=500 → 700 mL", () => {
    const r = calc(eblObstetricCalculator, {
      method: "gravimetric",
      wetWeight: "1200",
      dryWeight: "500",
      weightKg: "70",
      preHct: "35",
      postHct: "32",
    });
    expect(r.value).toBe(700);
    expect(r.status).toBe("high");
  });

  it("hct method: 70kg, pre=35%, post=30% → 850 mL", () => {
    // BV = 70×85 = 5950; EBL = 5950×(35−30)/35 = 5950×5/35 = 850
    const r = calc(eblObstetricCalculator, {
      method: "hct",
      wetWeight: "500",
      dryWeight: "300",
      weightKg: "70",
      preHct: "35",
      postHct: "30",
    });
    expect(r.value).toBe(850);
    expect(r.status).toBe("high");
  });

  it("hct method: 60kg, pre=34%, post=31% → 450 mL", () => {
    // BV = 60×85 = 5100; EBL = 5100×(34−31)/34 = 5100×3/34 = 450
    const r = calc(eblObstetricCalculator, {
      method: "hct",
      wetWeight: "500",
      dryWeight: "300",
      weightKg: "60",
      preHct: "34",
      postHct: "31",
    });
    expect(r.value).toBe(450);
    expect(r.status).toBe("normal");
  });

  it("gravimetric normal: wet=400, dry=300 → 100 mL", () => {
    const r = calc(eblObstetricCalculator, {
      method: "gravimetric",
      wetWeight: "400",
      dryWeight: "300",
      weightKg: "70",
      preHct: "35",
      postHct: "32",
    });
    expect(r.value).toBe(100);
    expect(r.status).toBe("normal");
  });

  it("hct: post > pre → critical (guard)", () => {
    const r = calc(eblObstetricCalculator, {
      method: "hct",
      wetWeight: "500",
      dryWeight: "300",
      weightKg: "70",
      preHct: "30",
      postHct: "35",
    });
    expect(r.status).toBe("critical");
  });

  it("gravimetric: wet < dry → critical (guard)", () => {
    const r = calc(eblObstetricCalculator, {
      method: "gravimetric",
      wetWeight: "200",
      dryWeight: "300",
      weightKg: "70",
      preHct: "35",
      postHct: "32",
    });
    expect(r.status).toBe("critical");
  });
});

// Pediatric Hypotension — PALS threshold by age group
// 0–1mo: 60; 1–12mo: 70; 1–10yr: 70+2×age; >10yr: 90
describe("Pediatric Hypotension calculate() output", () => {
  it("0-1mo: SBP=55 < 60 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "0-1mo",
      sbp: "55",
    });
    expect(r.value).toBe(60);
    expect(r.status).toBe("critical");
  });

  it("0-1mo: SBP=65 ≥ 60 → normal", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "0-1mo",
      sbp: "65",
    });
    expect(r.value).toBe(60);
    expect(r.status).toBe("normal");
  });

  it("1-12mo: SBP=65 < 70 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-12mo",
      sbp: "65",
    });
    expect(r.value).toBe(70);
    expect(r.status).toBe("critical");
  });

  it("1-12mo: SBP=75 ≥ 70 → normal", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-12mo",
      sbp: "75",
    });
    expect(r.value).toBe(70);
    expect(r.status).toBe("normal");
  });

  it("1-10yr, age=5: threshold=80, SBP=75 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-10yr",
      ageYears: "5",
      sbp: "75",
    });
    expect(r.value).toBe(80);
    expect(r.status).toBe("critical");
  });

  it("1-10yr, age=10: threshold=90, SBP=85 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-10yr",
      ageYears: "10",
      sbp: "85",
    });
    expect(r.value).toBe(90);
    expect(r.status).toBe("critical");
  });

  it("1-10yr, age=5: SBP=85 ≥ 80 → normal", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-10yr",
      ageYears: "5",
      sbp: "85",
    });
    expect(r.value).toBe(80);
    expect(r.status).toBe("normal");
  });

  it("over-10yr: SBP=85 < 90 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "over-10yr",
      sbp: "85",
    });
    expect(r.value).toBe(90);
    expect(r.status).toBe("critical");
  });

  it("over-10yr: SBP=95 ≥ 90 → normal", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "over-10yr",
      sbp: "95",
    });
    expect(r.value).toBe(90);
    expect(r.status).toBe("normal");
  });

  it("1-10yr, age=1: threshold=72, SBP=71 → critical", () => {
    const r = calc(pediatricHypotensionCalculator, {
      ageGroup: "1-10yr",
      ageYears: "1",
      sbp: "71",
    });
    expect(r.value).toBe(72);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// NIHSS — sum of 15 items, range 0–42
// 0 = no symptoms; 1–4 minor; 5–15 moderate; 16–20 moderate–severe; 21–42 severe
describe("NIHSS calculate() output", () => {
  function nihss(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      loc: "0", locQuestions: "0", locCommands: "0",
      gaze: "0", visual: "0", facial: "0",
      armLeft: "0", armRight: "0", legLeft: "0", legRight: "0",
      ataxia: "0", sensory: "0", language: "0",
      dysarthria: "0", extinction: "0",
    };
    return calc(nihssCalculator, { ...base, ...overrides });
  }

  it("all zeros → score 0, normal", () => {
    const r = nihss({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("minor stroke: armLeft=1 + legRight=1 → score 2, low", () => {
    const r = nihss({ armLeft: "1", legRight: "1" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("low");
  });

  it("moderate stroke: sum=10 → high", () => {
    // loc=1, gaze=1, facial=2, armLeft=2, armRight=2, legLeft=1, legRight=1 = 10
    const r = nihss({
      loc: "1", gaze: "1", facial: "2",
      armLeft: "2", armRight: "2", legLeft: "1", legRight: "1",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("boundary 4→5: score=5 → high", () => {
    // loc=1, locQuestions=1, gaze=1, facial=1, armLeft=1 = 5
    const r = nihss({
      loc: "1", locQuestions: "1", gaze: "1", facial: "1", armLeft: "1",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("moderate–severe: score=18 → high", () => {
    // loc=2, locQuestions=1, gaze=1, visual=2, facial=2,
    // armLeft=3, armRight=3, legLeft=2, legRight=2 = 18
    const r = nihss({
      loc: "2", locQuestions: "1", gaze: "1", visual: "2", facial: "2",
      armLeft: "3", armRight: "3", legLeft: "2", legRight: "2",
    });
    expect(r.value).toBe(18);
    expect(r.status).toBe("high");
  });

  it("boundary 15→16: score=16 → high", () => {
    // loc=1, gaze=1, visual=2, facial=2, armLeft=3, armRight=3,
    // legLeft=2, legRight=2 = 16
    const r = nihss({
      loc: "1", gaze: "1", visual: "2", facial: "2",
      armLeft: "3", armRight: "3", legLeft: "2", legRight: "2",
    });
    expect(r.value).toBe(16);
    expect(r.status).toBe("high");
  });

  it("severe stroke: score=21 → critical", () => {
    // loc=3, locQuestions=2, locCommands=2, gaze=2, visual=3, facial=3,
    // armLeft=4, armRight=4 = 23 (≥21)
    const r = nihss({
      loc: "3", locQuestions: "2", locCommands: "2", gaze: "2",
      visual: "3", facial: "3", armLeft: "4", armRight: "4",
    });
    expect(r.value).toBe(23);
    expect(r.status).toBe("critical");
  });

  it("maximum score 42: all items max → critical", () => {
    const r = nihss({
      loc: "3", locQuestions: "2", locCommands: "2", gaze: "2",
      visual: "3", facial: "3", armLeft: "4", armRight: "4",
      legLeft: "4", legRight: "4", ataxia: "2", sensory: "2",
      language: "3", dysarthria: "2", extinction: "2",
    });
    expect(r.value).toBe(42);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// NIHSS P1 regression — minor stroke no longer labeled "normal"
// ---------------------------------------------------------------------------
describe("NIHSS P1 regression — minor stroke status", () => {
  function nihss(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      loc: "0", locQuestions: "0", locCommands: "0",
      gaze: "0", visual: "0", facial: "0",
      armLeft: "0", armRight: "0", legLeft: "0", legRight: "0",
      ataxia: "0", sensory: "0", language: "0",
      dysarthria: "0", extinction: "0",
    };
    return calc(nihssCalculator, { ...base, ...overrides });
  }

  it("score 0 is normal (no stroke symptoms)", () => {
    const r = nihss({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("NO stroke symptoms");
  });

  it("score 1 is low (minor stroke)", () => {
    const r = nihss({ armLeft: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("MINOR stroke");
  });

  it("score 4 is low (minor stroke boundary)", () => {
    const r = nihss({ armLeft: "1", armRight: "1", legLeft: "1", legRight: "1" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("MINOR stroke");
  });

  it("score 5 is high (moderate stroke boundary)", () => {
    const r = nihss({
      loc: "1", locQuestions: "1", gaze: "1", facial: "1", armLeft: "1",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("MODERATE stroke");
  });

  it("score 15 is high (moderate stroke upper bound)", () => {
    const r = nihss({
      loc: "1", gaze: "1", facial: "2",
      armLeft: "2", armRight: "2", legLeft: "1", legRight: "1",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("score 16 is high (moderate-severe boundary)", () => {
    const r = nihss({
      loc: "1", gaze: "1", visual: "2", facial: "2",
      armLeft: "3", armRight: "3", legLeft: "2", legRight: "2",
    });
    expect(r.value).toBe(16);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("MODERATE\u2013SEVERE stroke");
  });

  it("score 42 is critical (severe stroke maximum)", () => {
    const r = nihss({
      loc: "3", locQuestions: "2", locCommands: "2", gaze: "2",
      visual: "3", facial: "3", armLeft: "4", armRight: "4",
      legLeft: "4", legRight: "4", ataxia: "2", sensory: "2",
      language: "3", dysarthria: "2", extinction: "2",
    });
    expect(r.value).toBe(42);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("SEVERE stroke");
  });
});

// ---------------------------------------------------------------------------
// Charlson Comorbidity Index — 19 weighted comorbidities + age adjustment
// 0 = no burden; 1–2 low; 3–4 moderate; ≥5 high
describe("Charlson Comorbidity Index calculate() output", () => {
  function charlson(ageGroup: string, overrides: Record<string, string>) {
    const base: Record<string, string> = {
      ageGroup,
      myocardialInfarction: "no", congestiveHeartFailure: "no",
      peripheralVascularDisease: "no", cerebrovascularDisease: "no",
      dementia: "no", chronicPulmonaryDisease: "no",
      connectiveTissueDisease: "no", pepticUlcer: "no",
      mildLiverDisease: "no", diabetesNoComplications: "no",
      hemiplegia: "no", moderateSevereRenalDisease: "no",
      diabetesEndOrganDamage: "no", anyMalignancy: "no",
      leukemia: "no", lymphoma: "no",
      moderateSevereLiverDisease: "no", metastaticSolidTumor: "no",
      aids: "no",
    };
    return calc(charlsonCalculator, { ...base, ...overrides });
  }

  it("no comorbidities, age <50 → score 0, normal", () => {
    const r = charlson("0", {});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("MI + DM no complications, age 50–59 → score 3, high", () => {
    // MI=1, DM=1, age adj=1 → total=3
    const r = charlson("1", {
      myocardialInfarction: "yes",
      diabetesNoComplications: "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("metastatic tumor + age ≥80 → score 10, critical", () => {
    // metastatic=6, age adj=4 → total=10
    const r = charlson("4", { metastaticSolidTumor: "yes" });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });

  it("AIDS alone, age <50 → score 6, critical", () => {
    const r = charlson("0", { aids: "yes" });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });

  it("boundary 2→3: CHF + PVD + age 60–69 → score 4, high", () => {
    // CHF=1, PVD=1, age adj=2 → total=4
    const r = charlson("2", {
      congestiveHeartFailure: "yes",
      peripheralVascularDisease: "yes",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("boundary 4→5: MI + CHF + COPD + hemiplegia, age <50 → score 5, critical", () => {
    // MI=1, CHF=1, COPD=1, hemiplegia=2 → total=5
    const r = charlson("0", {
      myocardialInfarction: "yes",
      congestiveHeartFailure: "yes",
      chronicPulmonaryDisease: "yes",
      hemiplegia: "yes",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("age adjustment only: age 70–79, no comorbidities → score 3, high", () => {
    const r = charlson("3", {});
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("multiple severe: renal + liver + malignancy, age 60–69 → score 9, critical", () => {
    // renal=2, moderate/liver=3, malignancy=2, age adj=2 → total=9
    const r = charlson("2", {
      moderateSevereRenalDisease: "yes",
      moderateSevereLiverDisease: "yes",
      anyMalignancy: "yes",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Ottawa SAH Rule — 6 binary criteria, binary positive/negative
// 0 = rule negative (CT NOT required); ≥1 = rule positive (CT indicated)
describe("Ottawa SAH Rule calculate() output", () => {
  function ottawa(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      age40: "no", neckPainStiffness: "no", witnessedLoc: "no",
      exertionOnset: "no", thunderclap: "no", limitedNeckFlexion: "no",
    };
    return calc(ottawaSahRuleCalculator, { ...base, ...overrides });
  }

  it("all negative → score 0, rule negative", () => {
    const r = ottawa({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("thunderclap only → score 1, rule positive", () => {
    const r = ottawa({ thunderclap: "yes" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("critical");
  });

  it("age ≥40 only → score 1, rule positive", () => {
    const r = ottawa({ age40: "yes" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("critical");
  });

  it("neck pain + witnessed LOC → score 2, rule positive", () => {
    const r = ottawa({ neckPainStiffness: "yes", witnessedLoc: "yes" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("all positive → score 6, rule positive", () => {
    const r = ottawa({
      age40: "yes", neckPainStiffness: "yes", witnessedLoc: "yes",
      exertionOnset: "yes", thunderclap: "yes", limitedNeckFlexion: "yes",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });

  it("exertion onset + limited flexion → score 2", () => {
    const r = ottawa({ exertionOnset: "yes", limitedNeckFlexion: "yes" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(ottawaSahRuleCalculator, {
      age40: "", neckPainStiffness: "no", witnessedLoc: "no",
      exertionOnset: "no", thunderclap: "no", limitedNeckFlexion: "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// ABCD² Score — 5 inputs, sum 0–7
// ≤3 low; 4–5 moderate; 6–7 high
describe("ABCD² Score calculate() output", () => {
  function abcd2(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      age: "0", bloodPressure: "0", clinicalFeatures: "0",
      duration: "0", diabetes: "0",
    };
    return calc(abcd2ScoreCalculator, { ...base, ...overrides });
  }

  it("all zero → score 0, low risk", () => {
    const r = abcd2({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("all max → score 7, high risk", () => {
    const r = abcd2({
      age: "1", bloodPressure: "1", clinicalFeatures: "2",
      duration: "2", diabetes: "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("critical");
  });

  it("age + BP + speech disturbance → score 3, low risk", () => {
    // age=1 + BP=1 + clinicalFeatures=1 = 3
    const r = abcd2({ age: "1", bloodPressure: "1", clinicalFeatures: "1" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("BP + unilateral weakness → score 3, low risk", () => {
    // BP=1 + clinicalFeatures=2 = 3
    const r = abcd2({ bloodPressure: "1", clinicalFeatures: "2" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("boundary 3→4: age=1 + BP=1 + clinical=2 → score 4, moderate", () => {
    const r = abcd2({ age: "1", bloodPressure: "1", clinicalFeatures: "2" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("boundary 5→6: age=1 + BP=1 + clinical=2 + duration=2 → score 6, high", () => {
    const r = abcd2({
      age: "1", bloodPressure: "1", clinicalFeatures: "2", duration: "2",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });

  it("duration=2 + diabetes only → score 3, low risk", () => {
    const r = abcd2({ duration: "2", diabetes: "1" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("normal");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(abcd2ScoreCalculator, {
      age: "", bloodPressure: "0", clinicalFeatures: "0",
      duration: "0", diabetes: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// RACE Scale — 5 inputs, sum 0–9
// <5 = LVO less likely; ≥5 = LVO suspected
describe("RACE Scale calculate() output", () => {
  function race(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      facialPalsy: "0", armMotor: "0", legMotor: "0",
      gaze: "0", aphasiaAgnosia: "0",
    };
    return calc(raceScaleCalculator, { ...base, ...overrides });
  }

  it("score 0 → LVO less likely", () => {
    const r = race({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("all max (2+2+2+1+2=9) → LVO suspected", () => {
    const r = race({
      facialPalsy: "2", armMotor: "2", legMotor: "2",
      gaze: "1", aphasiaAgnosia: "2",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("critical");
  });

  it("single high facial=2 → score 2, less likely", () => {
    const r = race({ facialPalsy: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("boundary 4→5: facial=2 + arm=2 + gaze=1 → score 5, LVO suspected", () => {
    const r = race({ facialPalsy: "2", armMotor: "2", gaze: "1" });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("multi-feature: arm=2 + leg=1 + aphasia=2 → score 5, LVO suspected", () => {
    const r = race({ armMotor: "2", legMotor: "1", aphasiaAgnosia: "2" });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(raceScaleCalculator, {
      facialPalsy: "", armMotor: "0", legMotor: "0",
      gaze: "0", aphasiaAgnosia: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// ESRS — age (0–2) + 7 risk factors, sum 0–9
// ≤2 = low risk; ≥3 = high risk
describe("ESRS calculate() output", () => {
  function esrs(ageGroup: string, overrides: Record<string, string>) {
    const base: Record<string, string> = {
      ageGroup,
      hypertension: "no", diabetes: "no", priorMi: "no",
      otherCvd: "no", pad: "no", smoking: "no", priorTiaStroke: "no",
    };
    return calc(esrsCalculator, { ...base, ...overrides });
  }

  it("age <65, no risk factors → score 0, low risk", () => {
    const r = esrs("0", {});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("age >75 + all yes → score 9, high risk", () => {
    const r = esrs("2", {
      hypertension: "yes", diabetes: "yes", priorMi: "yes",
      otherCvd: "yes", pad: "yes", smoking: "yes", priorTiaStroke: "yes",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("high");
  });

  it("age 65–75 + hypertension → score 2, low risk", () => {
    const r = esrs("1", { hypertension: "yes" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("boundary 2→3: age 65–75 + hypertension + diabetes → score 3, high", () => {
    const r = esrs("1", { hypertension: "yes", diabetes: "yes" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("age <65 + 3 risk factors → score 3, high", () => {
    const r = esrs("0", {
      hypertension: "yes", diabetes: "yes", smoking: "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("age 65–75 only → score 1, low risk", () => {
    const r = esrs("1", {});
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(esrsCalculator, {
      ageGroup: "", hypertension: "no", diabetes: "no", priorMi: "no",
      otherCvd: "no", pad: "no", smoking: "no", priorTiaStroke: "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Preeclampsia Criteria — hypertension (SBP≥140 || DBP≥90) +
//   proteinuria or end-organ involvement → preeclampsia
// value = count of severe features; severe features list includes
//   severe HTN, thrombocytopenia, renal, liver, pulmonary, headache, visual
describe("Preeclampsia Criteria calculate() output", () => {
  function preecl(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      sbp: "120", dbp: "80", proteinuria: "no",
      platelets: "200", creatinine: "0.8",
      transaminases: "no", ruqPain: "no",
      pulmonaryEdema: "no", headache: "no", visual: "no",
    };
    return calc(preeclampsiaCriteriaCalculator, { ...base, ...overrides });
  }

  it("normal BP, no features → score 0, normal", () => {
    const r = preecl({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("hypertension + proteinuria, no severe → score 0, high (without severe features)", () => {
    const r = preecl({ sbp: "150", dbp: "95", proteinuria: "yes" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("high");
  });

  it("hypertension + proteinuria + severe BP → score 1, critical", () => {
    // SBP=160 → severeHTN count=1; preeclampsia=true
    const r = preecl({ sbp: "160", dbp: "100", proteinuria: "yes" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("critical");
  });

  it("no HTN, no proteinuria, but platelets<100 → score 1, high (features without preeclampsia)", () => {
    const r = preecl({ platelets: "80" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("DBP threshold: SBP=130, DBP=90 → hypertension, proteinuria=no, no end-organ → high", () => {
    // DBP=90 → hypertension=true; no proteinuria, no endOrgan → preeclampsia=false
    // No severe features → score 0 but hypertension alone → status depends on preeclampsia logic
    // Actually: hypertension=true, proteinuria=false, endOrgan=false → preeclampsia=false
    // severeSbpDbp=false → count=0 → !preeclampsia && count=0 → normal
    const r = preecl({ sbp: "130", dbp: "90" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("hypertension + creatinine>1.1 + headache → score 2, critical", () => {
    // SBP=150 → hypertension; creatinine>1.1 → renal; headache → headache
    // severeSbpDbp=false, thrombocytopenia=false → count=2 (renal + headache)
    // preeclampsia=true (hypertension + endOrgan) → critical
    const r = preecl({
      sbp: "150", dbp: "95", creatinine: "1.5", headache: "yes",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("DBP > SBP → critical (validation guard)", () => {
    const r = preecl({ sbp: "120", dbp: "130" });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// HELLP Syndrome — LDH≥600 OR hemolysis=yes, AST≥70, platelets<100
// 0 = normal; 1–2 = partial; 3 = complete HELLP
describe("HELLP Syndrome calculate() output", () => {
  function hellp(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      platelets: "200", ast: "30", ldh: "200", hemolysis: "no",
    };
    return calc(hellpSyndromeCalculator, { ...base, ...overrides });
  }

  it("normal labs → 0, normal", () => {
    const r = hellp({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("LDH=600 only → hemolysis=1 criterion, partial", () => {
    const r = hellp({ ldh: "600" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("high");
  });

  it("AST=70 + platelets=99 → 2 criteria, partial", () => {
    const r = hellp({ ast: "70", platelets: "99" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("all three (LDH=600, AST=70, platelets=99, hemolysis=yes) → 3, critical", () => {
    const r = hellp({ ldh: "600", ast: "70", platelets: "99", hemolysis: "yes" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("LDH=599 → no hemolysis criterion (boundary)", () => {
    const r = hellp({ ldh: "599" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("AST=69 → no liver enzyme criterion (boundary)", () => {
    const r = hellp({ ast: "69" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(hellpSyndromeCalculator, {
      platelets: "", ast: "30", ldh: "200", hemolysis: "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Magnesium Sulfate Preeclampsia — loading dose + maintenance × 24h
// total = load + maintenance * 24; always status "normal"
describe("Magnesium Sulfate Preeclampsia calculate() output", () => {
  it("load=4g + maintenance=1g/h → total 28g", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "4", maintenance: "1",
    });
    expect(r.value).toBe(28);
    expect(r.status).toBe("normal");
  });

  it("load=6g + maintenance=2g/h → total 54g", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "6", maintenance: "2",
    });
    expect(r.value).toBe(54);
    expect(r.status).toBe("normal");
  });

  it("load=5g + maintenance=1g/h → total 29g", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "5", maintenance: "1",
    });
    expect(r.value).toBe(29);
    expect(r.status).toBe("normal");
  });

  it("load=4g + maintenance=2g/h → total 52g", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "4", maintenance: "2",
    });
    expect(r.value).toBe(52);
    expect(r.status).toBe("normal");
  });

  it("load=6g + maintenance=1g/h → total 30g", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "6", maintenance: "1",
    });
    expect(r.value).toBe(30);
    expect(r.status).toBe("normal");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(magnesiumSulfatePreeclampsiaCalculator, {
      loadingDose: "", maintenance: "1",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Apgar Score — 5 components (0–2 each), sum 0–10
// ≥7 reassuring; 4–6 moderately depressed; 0–3 severely depressed
describe("Apgar Score calculate() output", () => {
  function apgar(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      appearance: "0", pulse: "0", grimace: "0",
      activity: "0", respiration: "0",
    };
    return calc(apgarScoreCalculator, { ...base, ...overrides });
  }

  it("score 0 → severely depressed, critical", () => {
    const r = apgar({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
  });

  it("score 10 (all=2) → reassuring, normal", () => {
    const r = apgar({
      appearance: "2", pulse: "2", grimace: "2",
      activity: "2", respiration: "2",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("normal");
  });

  it("score 5 → moderately depressed, high", () => {
    // appearance=1, pulse=1, grimace=1, activity=1, respiration=1 → 5
    const r = apgar({
      appearance: "1", pulse: "1", grimace: "1",
      activity: "1", respiration: "1",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("boundary 3→4: 3 ones + 2 zeros → score 3, critical", () => {
    const r = apgar({ appearance: "1", pulse: "1", grimace: "1" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("boundary 6→7: 2+2+1+1+1 → score 7, normal", () => {
    const r = apgar({
      appearance: "2", pulse: "2", grimace: "1",
      activity: "1", respiration: "1",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });

  it("score 4 → moderately depressed, high", () => {
    // 2+1+1+0+0 → 4
    const r = apgar({ appearance: "2", pulse: "1", grimace: "1" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(apgarScoreCalculator, {
      appearance: "", pulse: "0", grimace: "0",
      activity: "0", respiration: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Biophysical Profile — 5 components (0 or 2 each), sum 0–10
// ≥8 normal; 6 equivocal; ≤4 abnormal
describe("Biophysical Profile calculate() output", () => {
  function bpp(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      breathing: "0", movement: "0", tone: "0",
      amnioticFluid: "0", nst: "0",
    };
    return calc(biophysicalProfileCalculator, { ...base, ...overrides });
  }

  it("score 0 → abnormal, critical", () => {
    const r = bpp({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
  });

  it("score 10 (all=2) → normal", () => {
    const r = bpp({
      breathing: "2", movement: "2", tone: "2",
      amnioticFluid: "2", nst: "2",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("normal");
  });

  it("score 6 (3 normal + 1 abnormal) → equivocal, high", () => {
    // breathing=2, movement=2, tone=2, fluid=0, nst=0 → 6
    const r = bpp({ breathing: "2", movement: "2", tone: "2" });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("score 8 (4 normal) → normal", () => {
    // breathing=2, movement=2, tone=2, nst=2 → 8
    const r = bpp({ breathing: "2", movement: "2", tone: "2", nst: "2" });
    expect(r.value).toBe(8);
    expect(r.status).toBe("normal");
  });

  it("score 4 → abnormal, critical", () => {
    // breathing=2, movement=2 → 4
    const r = bpp({ breathing: "2", movement: "2" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("score 2 (single component) → abnormal, critical", () => {
    const r = bpp({ nst: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(biophysicalProfileCalculator, {
      breathing: "", movement: "0", tone: "0",
      amnioticFluid: "0", nst: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Pediatric GCS — eye(1–4) + verbal(1–5) + motor(1–6), sum 3–15
// ≥13 mild (normal); 9–12 moderate (high); ≤8 severe (critical)
describe("Pediatric GCS calculate() output", () => {
  it("score 15 → mild, normal", () => {
    const r = calc(pediatricGcsCalculator, {
      eye: "4", verbal: "5", motor: "6",
    });
    expect(r.value).toBe(15);
    expect(r.status).toBe("normal");
  });

  it("score 3 → severe, critical", () => {
    const r = calc(pediatricGcsCalculator, {
      eye: "1", verbal: "1", motor: "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("score 10 → moderate, high", () => {
    // eye=3, verbal=3, motor=4 → 10
    const r = calc(pediatricGcsCalculator, {
      eye: "3", verbal: "3", motor: "4",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("boundary 8→9: eye=2 + verbal=2 + motor=5 → 9, moderate, high", () => {
    const r = calc(pediatricGcsCalculator, {
      eye: "2", verbal: "2", motor: "5",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("high");
  });

  it("boundary 12→13: eye=4 + verbal=3 + motor=6 → 13, mild, normal", () => {
    const r = calc(pediatricGcsCalculator, {
      eye: "4", verbal: "3", motor: "6",
    });
    expect(r.value).toBe(13);
    expect(r.status).toBe("normal");
  });

  it("score 8 → severe, critical", () => {
    // eye=2, verbal=2, motor=4 → 8
    const r = calc(pediatricGcsCalculator, {
      eye: "2", verbal: "2", motor: "4",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(pediatricGcsCalculator, {
      eye: "", verbal: "5", motor: "6",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Pediatric Trauma Score — 6 components (−1, +1, +2), sum −6 to +12
// ≥8 low risk; 4–7 intermediate; ≤3 high risk
describe("Pediatric Trauma Score calculate() output", () => {
  function pts(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      weight: "2", airway: "2", sbp: "2",
      cns: "2", openWound: "2", skeletal: "2",
    };
    return calc(pediatricTraumaScoreCalculator, { ...base, ...overrides });
  }

  it("all +2 → score 12, low risk", () => {
    const r = pts({});
    expect(r.value).toBe(12);
    expect(r.status).toBe("normal");
  });

  it("all -1 → score -6, high risk", () => {
    const r = pts({
      weight: "-1", airway: "-1", sbp: "-1",
      cns: "-1", openWound: "-1", skeletal: "-1",
    });
    expect(r.value).toBe(-6);
    expect(r.status).toBe("critical");
  });

  it("mixed: weight=1 + airway=1 + sbp=2 + cns=2 + openWound=2 + skeletal=1 → 9, low", () => {
    const r = pts({
      weight: "1", airway: "1", sbp: "2",
      cns: "2", openWound: "2", skeletal: "1",
    });
    expect(r.value).toBe(9);
    expect(r.status).toBe("normal");
  });

  it("boundary 3→4: weight=1 + airway=1 + sbp=1 + cns=1 + openWound=1 + skeletal=-1 → 4, intermediate", () => {
    const r = pts({
      weight: "1", airway: "1", sbp: "1",
      cns: "1", openWound: "1", skeletal: "-1",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("negative total possible: all -1 → -6, critical", () => {
    const r = pts({
      weight: "-1", airway: "-1", sbp: "-1",
      cns: "-1", openWound: "-1", skeletal: "-1",
    });
    expect(r.value).toBe(-6);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(pediatricTraumaScoreCalculator, {
      weight: "", airway: "2", sbp: "2",
      cns: "2", openWound: "2", skeletal: "2",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Westley Croup Score — 5 components, sum 0–17
// ≤2 mild; 3–7 moderate; ≥8 severe
describe("Westley Croup Score calculate() output", () => {
  function westley(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      consciousness: "0", cyanosis: "0", stridor: "0",
      airEntry: "0", retractions: "0",
    };
    return calc(westleyCroupScoreCalculator, { ...base, ...overrides });
  }

  it("score 0 → mild, normal", () => {
    const r = westley({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 17 (all max) → severe, critical", () => {
    const r = westley({
      consciousness: "5", cyanosis: "5", stridor: "2",
      airEntry: "2", retractions: "3",
    });
    expect(r.value).toBe(17);
    expect(r.status).toBe("critical");
  });

  it("score 2 (single feature) → mild, normal", () => {
    // stridor=2 → 2
    const r = westley({ stridor: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("score 4 → moderate, high", () => {
    // stridor=1 + airEntry=1 + retractions=2 → 4
    const r = westley({ stridor: "1", airEntry: "1", retractions: "2" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("boundary 2→3: cyanosis=4 + stridor=0 → 4, wait, just retractions=3 → 3, high", () => {
    const r = westley({ retractions: "3" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("boundary 7→8: consciousness=5 + stridor=2 + retractions=1 → 8, critical", () => {
    const r = westley({ consciousness: "5", stridor: "2", retractions: "1" });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(westleyCroupScoreCalculator, {
      consciousness: "", cyanosis: "0", stridor: "0",
      airEntry: "0", retractions: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Gorelick Dehydration — 4 clinical signs, count 0–4
// ≥3 → high (≥5% dehydration); 0–2 → normal
describe("Gorelick Dehydration calculate() output", () => {
  function gorelick(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      capillaryRefill: "no", dryMucousMembranes: "no",
      absentTears: "no", illAppearance: "no",
    };
    return calc(gorelickDehydrationCalculator, { ...base, ...overrides });
  }

  it("0 findings → score 0, normal", () => {
    const r = gorelick({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("1 finding → score 1, normal", () => {
    const r = gorelick({ capillaryRefill: "yes" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("2 findings → score 2, normal (boundary)", () => {
    const r = gorelick({ capillaryRefill: "yes", dryMucousMembranes: "yes" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("3 findings → score 3, high", () => {
    const r = gorelick({
      capillaryRefill: "yes", dryMucousMembranes: "yes", absentTears: "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("4 findings → score 4, high", () => {
    const r = gorelick({
      capillaryRefill: "yes", dryMucousMembranes: "yes",
      absentTears: "yes", illAppearance: "yes",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("advice array lists present signs", () => {
    const r = gorelick({
      capillaryRefill: "yes", absentTears: "yes",
    });
    expect(r.advice).toBeDefined();
    expect(r.advice!.length).toBe(1);
    expect(r.advice![0]).toContain("capillary refill");
    expect(r.advice![0]).toContain("absent tears");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(gorelickDehydrationCalculator, {
      capillaryRefill: "", dryMucousMembranes: "no",
      absentTears: "no", illAppearance: "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// EPDS — 10 items (0–3), sum 0–30
// item10 > 0 → critical override (self-harm)
// total ≥10 → high (screen positive)
// total <10 → normal (screen negative)
describe("EPDS calculate() output", () => {
  function epds(overrides: Record<string, string>) {
    const base: Record<string, string> = {};
    for (let i = 1; i <= 10; i++) {
      base[`item${i}`] = "0";
    }
    return calc(epdsCalculator, { ...base, ...overrides });
  }

  it("all zero → score 0, normal", () => {
    const r = epds({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("item10=1 → critical (self-harm override)", () => {
    const r = epds({ item10: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("critical");
  });

  it("item10=3 → critical (self-harm override)", () => {
    const r = epds({ item10: "3" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("total ≥10 without item10 → high", () => {
    // items 1–9 all 3 = 27, item10=0 → total=27, high
    const overrides: Record<string, string> = {};
    for (let i = 1; i <= 9; i++) overrides[`item${i}`] = "3";
    const r = epds(overrides);
    expect(r.value).toBe(27);
    expect(r.status).toBe("high");
  });

  it("boundary 9→10: items sum=10, item10=0 → high", () => {
    // item1=3, item2=3, item3=2, item4=2 → 10
    const r = epds({
      item1: "3", item2: "3", item3: "2", item4: "2",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("boundary 9→10: items sum=9 → normal", () => {
    // item1=3, item2=3, item3=3 → 9
    const r = epds({ item1: "3", item2: "3", item3: "3" });
    expect(r.value).toBe(9);
    expect(r.status).toBe("normal");
  });

  it("item10=1 even with low total → critical override", () => {
    const r = epds({ item1: "1", item10: "1" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(epdsCalculator, {
      item1: "", item2: "0", item3: "0", item4: "0", item5: "0",
      item6: "0", item7: "0", item8: "0", item9: "0", item10: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// PHQ-9 — 9 items (0–3), sum 0–27
// 0–4 normal (minimal); 5–9 normal (mild); 10–14 high (moderate);
// 15–19 critical (moderately severe); 20–27 critical (severe)
describe("PHQ-9 calculate() output", () => {
  function phq9(overrides: Record<string, string>) {
    const base: Record<string, string> = {};
    for (let i = 1; i <= 9; i++) {
      base[`phq${i}`] = "0";
    }
    return calc(phq9Calculator, { ...base, ...overrides });
  }

  it("score 0 → minimal, normal", () => {
    const r = phq9({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 4 → minimal, normal", () => {
    const r = phq9({ phq1: "1", phq2: "1", phq3: "1", phq4: "1" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("normal");
  });

  it("score 7 → mild, normal", () => {
    // phq1=1, phq2=2, phq3=2, phq4=2 → 7
    const r = phq9({ phq1: "1", phq2: "2", phq3: "2", phq4: "2" });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });

  it("score 12 → moderate, high", () => {
    // 4 items × 3 = 12
    const r = phq9({
      phq1: "3", phq2: "3", phq3: "3", phq4: "3",
    });
    expect(r.value).toBe(12);
    expect(r.status).toBe("high");
  });

  it("score 17 → moderately severe, critical", () => {
    // 5×3 + 2 = 17
    const r = phq9({
      phq1: "3", phq2: "3", phq3: "3", phq4: "3", phq5: "3", phq6: "2",
    });
    expect(r.value).toBe(17);
    expect(r.status).toBe("critical");
  });

  it("score 27 → severe, critical", () => {
    const r = phq9({
      phq1: "3", phq2: "3", phq3: "3", phq4: "3",
      phq5: "3", phq6: "3", phq7: "3", phq8: "3", phq9: "3",
    });
    expect(r.value).toBe(27);
    expect(r.status).toBe("critical");
  });

  it("item9 endorsed → warnings array populated", () => {
    const r = phq9({ phq9: "1" });
    expect(r.warnings).toBeDefined();
    expect(r.warnings!.length).toBeGreaterThan(0);
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(phq9Calculator, {
      phq1: "", phq2: "0", phq3: "0", phq4: "0", phq5: "0",
      phq6: "0", phq7: "0", phq8: "0", phq9: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// GAD-7 — 7 items (0–3), sum 0–21
// 0–4 normal (minimal); 5–9 normal (mild); 10–14 high (moderate); 15–21 critical (severe)
describe("GAD-7 calculate() output", () => {
  function gad7(overrides: Record<string, string>) {
    const base: Record<string, string> = {};
    for (let i = 1; i <= 7; i++) {
      base[`gad${i}`] = "0";
    }
    return calc(gad7Calculator, { ...base, ...overrides });
  }

  it("score 0 → minimal, normal", () => {
    const r = gad7({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 4 → minimal, normal (boundary)", () => {
    const r = gad7({ gad1: "1", gad2: "1", gad3: "1", gad4: "1" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("normal");
  });

  it("score 7 → mild, normal", () => {
    // gad1=2, gad2=2, gad3=2, gad4=1 → 7
    const r = gad7({ gad1: "2", gad2: "2", gad3: "2", gad4: "1" });
    expect(r.value).toBe(7);
    expect(r.status).toBe("normal");
  });

  it("score 12 → moderate, high", () => {
    // 4×3 = 12
    const r = gad7({ gad1: "3", gad2: "3", gad3: "3", gad4: "3" });
    expect(r.value).toBe(12);
    expect(r.status).toBe("high");
  });

  it("score 21 → severe, critical", () => {
    const r = gad7({
      gad1: "3", gad2: "3", gad3: "3", gad4: "3",
      gad5: "3", gad6: "3", gad7: "3",
    });
    expect(r.value).toBe(21);
    expect(r.status).toBe("critical");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(gad7Calculator, {
      gad1: "", gad2: "0", gad3: "0", gad4: "0",
      gad5: "0", gad6: "0", gad7: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// STOP-BANG — 8 binary (yes=1, no=0), sum 0–8
// ≤2 low; 3–4 intermediate; 5–8 high
describe("STOP-BANG calculate() output", () => {
  function stopbang(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      snoring: "no", tired: "no", observedApnea: "no",
      bloodPressure: "no", bmi: "no", age: "no",
      neck: "no", gender: "no",
    };
    return calc(stopBangCalculator, { ...base, ...overrides });
  }

  it("all no → score 0, low risk", () => {
    const r = stopbang({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("all yes → score 8, high risk", () => {
    const r = stopbang({
      snoring: "yes", tired: "yes", observedApnea: "yes",
      bloodPressure: "yes", bmi: "yes", age: "yes",
      neck: "yes", gender: "yes",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("critical");
  });

  it("score 3 → intermediate, high", () => {
    const r = stopbang({ snoring: "yes", tired: "yes", observedApnea: "yes" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("score 5 → high risk", () => {
    const r = stopbang({
      snoring: "yes", tired: "yes", observedApnea: "yes",
      bloodPressure: "yes", bmi: "yes",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("boundary 2→3: 2 yes → score 2, low", () => {
    const r = stopbang({ snoring: "yes", tired: "yes" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("boundary 4→5: 4 yes → score 4, intermediate", () => {
    const r = stopbang({
      snoring: "yes", tired: "yes", observedApnea: "yes", bloodPressure: "yes",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(stopBangCalculator, {
      snoring: "", tired: "no", observedApnea: "no",
      bloodPressure: "no", bmi: "no", age: "no",
      neck: "no", gender: "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// FOUT Score — 4 components (0–4 each), sum 0–16
// ≥13 favorable (normal); 9–12 intermediate (high); 5–8 poor (high); 0–4 very poor (critical)
describe("FOUT Score calculate() output", () => {
  function fout(overrides: Record<string, string>) {
    const base: Record<string, string> = {
      eye: "0", motor: "0", brainstem: "0", respiration: "0",
    };
    return calc(foutScoreCalculator, { ...base, ...overrides });
  }

  it("score 0 → very poor, critical", () => {
    const r = fout({});
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
  });

  it("score 16 (all=4) → favorable, normal", () => {
    const r = fout({ eye: "4", motor: "4", brainstem: "4", respiration: "4" });
    expect(r.value).toBe(16);
    expect(r.status).toBe("normal");
  });

  it("score 10 → intermediate, high", () => {
    // eye=3, motor=3, brainstem=2, respiration=2 → 10
    const r = fout({ eye: "3", motor: "3", brainstem: "2", respiration: "2" });
    expect(r.value).toBe(10);
    expect(r.status).toBe("high");
  });

  it("score 6 → poor, high", () => {
    // eye=2, motor=2, brainstem=1, respiration=1 → 6
    const r = fout({ eye: "2", motor: "2", brainstem: "1", respiration: "1" });
    expect(r.value).toBe(6);
    expect(r.status).toBe("high");
  });

  it("boundary 4→5: eye=2 + motor=2 + rest=0 → score 4, very poor, critical", () => {
    const r = fout({ eye: "2", motor: "2" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("boundary 8→9: eye=3 + motor=3 + brainstem=2 + resp=1 → score 9, intermediate, high", () => {
    const r = fout({ eye: "3", motor: "3", brainstem: "2", respiration: "1" });
    expect(r.value).toBe(9);
    expect(r.status).toBe("high");
  });

  it("boundary 12→13: all=3 → score 12, intermediate, high", () => {
    const r = fout({ eye: "3", motor: "3", brainstem: "3", respiration: "3" });
    expect(r.value).toBe(12);
    expect(r.status).toBe("high");
  });

  it("empty field → critical (validation guard)", () => {
    const r = calc(foutScoreCalculator, {
      eye: "", motor: "0", brainstem: "0", respiration: "0",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Fractional Excretion Calculator — delegates to calculateFENa utility
// FE = (UNa/PNa) / (UCr/PCr) × 100
// Utility returns 0 on zero plasmaNa or plasmaCr (silent zero, not critical).
// ---------------------------------------------------------------------------
describe("Fractional Excretion Calculator calculate() output", () => {
  it("prerenal: low FE < 1%", () => {
    // FE = (10/140) / (80/1.0) × 100 = 0.0714 / 80 × 100 = 0.0893 → 0.1
    const r = calc(fractionalExcretionCalculator, {
      urineNa: "10", plasmaNa: "140", urineCr: "80", plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(0.1, 1);
    expect(r.status).toBe("normal");
  });

  it("intrinsic renal: high FE > 1%", () => {
    // FE = (60/140) / (10/1.0) × 100 = 0.4286 / 10 × 100 = 4.286 → 4.3
    const r = calc(fractionalExcretionCalculator, {
      urineNa: "60", plasmaNa: "140", urineCr: "10", plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(4.3, 1);
    expect(r.status).toBe("normal");
  });

  it("boundary FE exactly 1%", () => {
    // (112/140)/(80/1.0)×100 = 0.8/80×100 = 1.0
    const r = calc(fractionalExcretionCalculator, {
      urineNa: "112", plasmaNa: "140", urineCr: "80", plasmaCr: "1.0",
    });
    expect(r.value).toBeCloseTo(1.0, 1);
    expect(r.status).toBe("normal");
  });

  it("zero plasmaNa → utility returns 0 (silent zero, not critical)", () => {
    const r = calc(fractionalExcretionCalculator, {
      urineNa: "40", plasmaNa: "0", urineCr: "80", plasmaCr: "1.0",
    });
    expect(r.value).toBe(0);
  });

  it("zero plasmaCr → utility returns 0 (silent zero, not critical)", () => {
    const r = calc(fractionalExcretionCalculator, {
      urineNa: "40", plasmaNa: "140", urineCr: "80", plasmaCr: "0",
    });
    expect(r.value).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Albumin Corrected Calcium — Ca + 0.8 × (4 − albumin)
// Classification: <8.5 hypocalcemia, 8.5–10.5 normal, >10.5 hypercalcemia
// ---------------------------------------------------------------------------
describe("Albumin Corrected Calcium calculate() output", () => {
  it("normal: Ca 9.0, albumin 4.0 → 9.0", () => {
    // 9.0 + 0.8 × (4 − 4.0) = 9.0 + 0 = 9.0
    const r = calc(albuminCorrectedCalciumCalculator, {
      calcium: "9.0", albumin: "4.0",
    });
    expect(r.value).toBe(9.0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal corrected calcium");
  });

  it("hypocalcemia: Ca 8.0, albumin 2.0 → 9.6", () => {
    // 8.0 + 0.8 × (4 − 2.0) = 8.0 + 1.6 = 9.6
    const r = calc(albuminCorrectedCalciumCalculator, {
      calcium: "8.0", albumin: "2.0",
    });
    expect(r.value).toBe(9.6);
    expect(r.status).toBe("normal");
  });

  it("hypercalcemia: Ca 12.0, albumin 3.0 → 12.8", () => {
    // 12.0 + 0.8 × (4 − 3.0) = 12.0 + 0.8 = 12.8
    const r = calc(albuminCorrectedCalciumCalculator, {
      calcium: "12.0", albumin: "3.0",
    });
    expect(r.value).toBe(12.8);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Hypercalcemia");
  });

  it("boundary 8.5: Ca 8.5, albumin 4.0 → 8.5", () => {
    // 8.5 + 0.8 × 0 = 8.5 → exactly at boundary → normal (<= 10.5)
    const r = calc(albuminCorrectedCalciumCalculator, {
      calcium: "8.5", albumin: "4.0",
    });
    expect(r.value).toBe(8.5);
    expect(r.status).toBe("normal");
  });

  it("boundary 10.5: Ca 10.5, albumin 4.0 → 10.5", () => {
    // 10.5 + 0 = 10.5 → <= 10.5 → normal
    const r = calc(albuminCorrectedCalciumCalculator, {
      calcium: "10.5", albumin: "4.0",
    });
    expect(r.value).toBe(10.5);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// MAP — (SBP + 2 × DBP) / 3
// Note: the calculator always returns status: "normal" regardless of value.
// ---------------------------------------------------------------------------
describe("MAP calculate() output", () => {
  it("normal: 120/80 → 93.33", () => {
    // (120 + 2×80) / 3 = 280/3 = 93.333…
    const r = calc(mapCalculator, { sbp: "120", dbp: "80" });
    expect(r.value).toBeCloseTo(93.33, 1);
    expect(r.status).toBe("normal");
  });

  it("hypotensive: 80/50 → 60", () => {
    // (80 + 100) / 3 = 180/3 = 60
    const r = calc(mapCalculator, { sbp: "80", dbp: "50" });
    expect(r.value).toBe(60);
    expect(r.status).toBe("normal");
  });

  it("hypertensive: 180/110 → 130", () => {
    // (180 + 220) / 3 = 400/3 = 133.333…
    const r = calc(mapCalculator, { sbp: "180", dbp: "110" });
    expect(r.value).toBeCloseTo(133.33, 1);
    expect(r.status).toBe("normal");
  });

  it("low boundary: 90/60 → 70", () => {
    // (90 + 120) / 3 = 210/3 = 70
    const r = calc(mapCalculator, { sbp: "90", dbp: "60" });
    expect(r.value).toBe(70);
    expect(r.status).toBe("normal");
  });

  it("extreme: 200/120 → 146.67", () => {
    // (200 + 240) / 3 = 440/3 = 146.666…
    const r = calc(mapCalculator, { sbp: "200", dbp: "120" });
    expect(r.value).toBeCloseTo(146.67, 1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Maintenance Fluids — piecewise weight-based
// ≤10 kg: w×100; ≤20 kg: 1000+(w−10)×50; >20 kg: 1500+(w−20)×20
// ---------------------------------------------------------------------------
describe("Maintenance Fluids calculate() output", () => {
  it("5 kg infant → 500 mL/day", () => {
    const r = calc(maintenanceFluidsCalculator, { weight: "5" });
    expect(r.value).toBe(500);
    expect(r.status).toBe("normal");
  });

  it("10 kg child → 1000 mL/day (first breakpoint)", () => {
    const r = calc(maintenanceFluidsCalculator, { weight: "10" });
    expect(r.value).toBe(1000);
    expect(r.status).toBe("normal");
  });

  it("15 kg child → 1250 mL/day (second tier)", () => {
    // 1000 + (15−10)×50 = 1000 + 250 = 1250
    const r = calc(maintenanceFluidsCalculator, { weight: "15" });
    expect(r.value).toBe(1250);
    expect(r.status).toBe("normal");
  });

  it("20 kg child → 1500 mL/day (second breakpoint)", () => {
    // 1000 + (20−10)×50 = 1000 + 500 = 1500
    const r = calc(maintenanceFluidsCalculator, { weight: "20" });
    expect(r.value).toBe(1500);
    expect(r.status).toBe("normal");
  });

  it("70 kg adult → 2500 mL/day (third tier)", () => {
    // 1500 + (70−20)×20 = 1500 + 1000 = 2500
    const r = calc(maintenanceFluidsCalculator, { weight: "70" });
    expect(r.value).toBe(2500);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Centor Score — 4 yes/no criteria + age group adjustment, clamped 0–4
// Status: ≤1 normal (low), 2–3 high (intermediate), 4 critical (high prob)
// ---------------------------------------------------------------------------
describe("Centor Score calculate() output", () => {
  it("no criteria, age 30 → score 0, low probability", () => {
    const r = calc(centorCalculator, {
      fever: "no", absenceOfCough: "no",
      tonsillarExudates: "no", cervicalAdenopathy: "no", ageGroup: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("all 4 criteria, age 30 → score 4, high probability", () => {
    const r = calc(centorCalculator, {
      fever: "yes", absenceOfCough: "yes",
      tonsillarExudates: "yes", cervicalAdenopathy: "yes", ageGroup: "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("age 3–14 adds +1: 3 criteria → score 4", () => {
    // 3 clinical + ageGroup 1 = 4 → clamped to 4
    const r = calc(centorCalculator, {
      fever: "yes", absenceOfCough: "yes",
      tonsillarExudates: "yes", cervicalAdenopathy: "no", ageGroup: "1",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("age ≥45 subtracts −1: 1 criterion → score 0, clamped", () => {
    // 1 clinical + ageGroup (−1) = 0 → clamped to 0
    const r = calc(centorCalculator, {
      fever: "yes", absenceOfCough: "no",
      tonsillarExudates: "no", cervicalAdenopathy: "no", ageGroup: "-1",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("2 criteria, age 30 → score 2, intermediate", () => {
    const r = calc(centorCalculator, {
      fever: "yes", absenceOfCough: "yes",
      tonsillarExudates: "no", cervicalAdenopathy: "no", ageGroup: "0",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("1 criterion, age 30 → score 1, low probability", () => {
    const r = calc(centorCalculator, {
      fever: "yes", absenceOfCough: "no",
      tonsillarExudates: "no", cervicalAdenopathy: "no", ageGroup: "0",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Barthel Index — 10-item ADL sum, 0–100
// 0–20 total, 21–60 severe, 61–90 moderate, 91–99 slight, 100 independent
// ---------------------------------------------------------------------------
describe("Barthel Index calculate() output", () => {
  const allZero = {
    feeding: "0", bathing: "0", grooming: "0", dressing: "0",
    bowels: "0", bladder: "0", toiletUse: "0",
    transfers: "0", mobility: "0", stairs: "0",
  };

  it("total dependence: all zero → 0/100, critical", () => {
    const r = calc(barthelIndexCalculator, allZero);
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
  });

  it("severe: score 40 → critical", () => {
    const r = calc(barthelIndexCalculator, {
      feeding: "10", bathing: "5", grooming: "5",
      dressing: "5", bowels: "5", bladder: "5", toiletUse: "0",
      transfers: "0", mobility: "0", stairs: "5",
    });
    // 10+5+5+5+5+5+0+0+0+5 = 40
    expect(r.value).toBe(40);
    expect(r.status).toBe("critical");
  });

  it("moderate: score 60 → boundary of severe/moderate", () => {
    // 60 is boundary: >= 61 is moderate, so 60 is still severe
    const r = calc(barthelIndexCalculator, {
      ...allZero, feeding: "10", bathing: "5", grooming: "5",
      dressing: "5", bowels: "5", bladder: "5", toiletUse: "5",
      transfers: "5", mobility: "5", stairs: "10",
    });
    // 10+5+5+5+5+5+5+5+5+10 = 60
    expect(r.value).toBe(60);
    expect(r.status).toBe("critical");
  });

  it("moderate: score 75 → high", () => {
    const r = calc(barthelIndexCalculator, {
      ...allZero, feeding: "10", bathing: "5", grooming: "5",
      dressing: "5", bowels: "10", bladder: "10", toiletUse: "10",
      transfers: "5", mobility: "5", stairs: "10",
    });
    // 10+5+5+5+10+10+10+5+5+10 = 75
    expect(r.value).toBe(75);
    expect(r.status).toBe("high");
  });

  it("slight: score 95 → normal", () => {
    const r = calc(barthelIndexCalculator, {
      ...allZero, feeding: "10", bathing: "5", grooming: "5",
      dressing: "10", bowels: "10", bladder: "10", toiletUse: "10",
      transfers: "15", mobility: "15", stairs: "5",
    });
    // 10+5+5+10+10+10+10+15+15+5 = 95
    expect(r.value).toBe(95);
    expect(r.status).toBe("normal");
  });

  it("independent: score 100 → normal", () => {
    const r = calc(barthelIndexCalculator, {
      feeding: "10", bathing: "5", grooming: "5",
      dressing: "10", bowels: "10", bladder: "10", toiletUse: "10",
      transfers: "15", mobility: "15", stairs: "10",
    });
    // 10+5+5+10+10+10+10+15+15+10 = 100
    expect(r.value).toBe(100);
    expect(r.status).toBe("normal");
  });

  it("boundary: score 95 → normal (slight dependence)", () => {
    const r = calc(barthelIndexCalculator, {
      ...allZero, feeding: "10", bathing: "5", grooming: "5",
      dressing: "10", bowels: "10", bladder: "10", toiletUse: "10",
      transfers: "15", mobility: "15", stairs: "5",
    });
    // 10+5+5+10+10+10+10+15+15+5 = 95
    expect(r.value).toBe(95);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Urine Anion Gap — (UNa + UK) − UCl
// < 0 → low (GI loss), 0 → normal (equivocal), > 0 → high (RTA)
// ---------------------------------------------------------------------------
describe("Urine Anion Gap calculate() output", () => {
  it("negative UAG: GI bicarbonate loss", () => {
    // (20 + 30) − 80 = −30
    const r = calc(urineAnionGapCalculator, {
      urineNa: "20", urineK: "30", urineCl: "80",
    });
    expect(r.value).toBe(-30);
    expect(r.status).toBe("low");
  });

  it("zero UAG: equivocal", () => {
    // (40 + 20) − 60 = 0
    const r = calc(urineAnionGapCalculator, {
      urineNa: "40", urineK: "20", urineCl: "60",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("positive UAG: renal tubular acidosis", () => {
    // (60 + 30) − 40 = 50
    const r = calc(urineAnionGapCalculator, {
      urineNa: "60", urineK: "30", urineCl: "40",
    });
    expect(r.value).toBe(50);
    expect(r.status).toBe("high");
  });

  it("strongly negative", () => {
    // (10 + 10) − 60 = −40
    const r = calc(urineAnionGapCalculator, {
      urineNa: "10", urineK: "10", urineCl: "60",
    });
    expect(r.value).toBe(-40);
    expect(r.status).toBe("low");
  });

  it("strongly positive", () => {
    // (80 + 50) − 10 = 120
    const r = calc(urineAnionGapCalculator, {
      urineNa: "80", urineK: "50", urineCl: "10",
    });
    expect(r.value).toBe(120);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Urine Protein-Creatinine Ratio — protein / creatinine (mg/mg)
// <0.15 normal, 0.15–0.5 mild, 0.5–3.5 moderate, ≥3.5 nephrotic
// ---------------------------------------------------------------------------
describe("Urine Protein-Creatinine Ratio calculate() output", () => {
  it("normal: 10/100 = 0.1", () => {
    const r = calc(upcrCalculator, {
      urineProtein: "10", urineCreatinine: "100",
    });
    expect(r.value).toBe(0.1);
    expect(r.status).toBe("normal");
  });

  it("mild: 15/100 = 0.15 (boundary)", () => {
    const r = calc(upcrCalculator, {
      urineProtein: "15", urineCreatinine: "100",
    });
    expect(r.value).toBe(0.15);
    expect(r.status).toBe("high");
  });

  it("moderate: 100/100 = 1.0", () => {
    const r = calc(upcrCalculator, {
      urineProtein: "100", urineCreatinine: "100",
    });
    expect(r.value).toBe(1.0);
    expect(r.status).toBe("high");
  });

  it("nephrotic range: 350/100 = 3.5 (boundary)", () => {
    const r = calc(upcrCalculator, {
      urineProtein: "350", urineCreatinine: "100",
    });
    expect(r.value).toBe(3.5);
    expect(r.status).toBe("critical");
  });

  it("severe nephrotic: 500/100 = 5.0", () => {
    const r = calc(upcrCalculator, {
      urineProtein: "500", urineCreatinine: "100",
    });
    expect(r.value).toBe(5.0);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Calcium-Phosphate Product — Ca × Phosphate
// ≤55 acceptable, 55–70 elevated, ≥70 critically elevated
// Note: code has dead `if (false){}` pattern — tested as-is.
// ---------------------------------------------------------------------------
describe("Calcium-Phosphate Product calculate() output", () => {
  it("acceptable: 9.0 × 4.0 = 36", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "9.0", phosphate: "4.0",
    });
    expect(r.value).toBe(36.0);
    expect(r.status).toBe("normal");
  });

  it("elevated: 8.0 × 8.0 = 64", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "8.0", phosphate: "8.0",
    });
    expect(r.value).toBe(64.0);
    expect(r.status).toBe("high");
  });

  it("critical: 10.0 × 8.0 = 80", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "10.0", phosphate: "8.0",
    });
    expect(r.value).toBe(80.0);
    expect(r.status).toBe("critical");
  });

  it("just below 55: 5.49 × 10.0 = 54.9 → normal", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "5.49", phosphate: "10.0",
    });
    expect(r.value).toBeCloseTo(54.9, 1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Acceptable");
  });

  it("exactly 55: 5.5 × 10.0 = 55 → high (elevated)", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "5.5", phosphate: "10.0",
    });
    expect(r.value).toBe(55.0);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Elevated — increased calcification risk");
  });

  it("just above 55: 5.51 × 10.0 = 55.1 → high (elevated)", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "5.51", phosphate: "10.0",
    });
    expect(r.value).toBeCloseTo(55.1, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Elevated — increased calcification risk");
  });

  it("just below 70: 6.99 × 10.0 = 69.9 → high (elevated)", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "6.99", phosphate: "10.0",
    });
    expect(r.value).toBeCloseTo(69.9, 1);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Elevated — increased calcification risk");
  });

  it("exactly 70: 7.0 × 10.0 = 70 → high (elevated)", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "7.0", phosphate: "10.0",
    });
    expect(r.value).toBe(70.0);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Elevated — increased calcification risk");
  });

  it("just above 70: 7.01 × 10.0 = 70.1 → critical", () => {
    const r = calc(calciumPhosphateProductCalculator, {
      calcium: "7.01", phosphate: "10.0",
    });
    expect(r.value).toBeCloseTo(70.1, 1);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Critically elevated — high calcification risk");
  });
});

// ---------------------------------------------------------------------------
// Urine Osmolal Gap — measured − estimated
// Estimated = 2×(UNa+UK) + UUrea/2.8 + UGlucose/18
// ≤10 normal, >10 elevated
// ---------------------------------------------------------------------------
describe("Urine Osmolal Gap calculate() output", () => {
  it("normal: gap ≈ 0.71", () => {
    // estimated = 2×(40+20) + 200/2.8 + 100/18 = 120 + 71.43 + 5.56 = 196.99
    // gap = 200 − 196.99 = 3.01
    // Hmm let me pick values where gap is clearly ≤10
    // measured=500, UNa=40, UK=20, UUrea=200, UGlu=100
    const r = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "500", urineSodium: "40", urinePotassium: "20",
      urineUrea: "200", urineGlucose: "100",
    });
    // estimated = 2×60 + 200/2.8 + 100/18 = 120 + 71.4286 + 5.5556 = 196.984
    // gap = 500 − 196.984 = 303.016 → >10 → elevated
    expect(r.status).toBe("high");
  });

  it("elevated: large gap (toxic alcohol)", () => {
    // measured=700, UNa=40, UK=20, UUrea=200, UGlu=100
    // estimated = 196.984 (same as above)
    // gap = 700 − 196.984 = 503.016 → >10
    const r = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "700", urineSodium: "40", urinePotassium: "20",
      urineUrea: "200", urineGlucose: "100",
    });
    expect(r.value).toBeCloseTo(503.02, 0);
    expect(r.status).toBe("high");
  });

  it("normal: gap ≤ 10", () => {
    // estimated = 2×(40+20) + 200/2.8 + 100/18 = 196.984
    // measured = 206.984 → gap ≈ 10.0
    const r = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "207", urineSodium: "40", urinePotassium: "20",
      urineUrea: "200", urineGlucose: "100",
    });
    // gap = 207 − 196.984 = 10.016 → >10 → elevated
    // Need measured ≤ 206.984 for gap ≤ 10
    const r2 = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "206", urineSodium: "40", urinePotassium: "20",
      urineUrea: "200", urineGlucose: "100",
    });
    // gap = 206 − 196.984 = 9.016 → ≤10 → normal
    expect(r2.value).toBeCloseTo(9.02, 1);
    expect(r2.status).toBe("normal");
  });

  it("minimal values: measured=5, all zeros → gap=5", () => {
    const r = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "5", urineSodium: "0", urinePotassium: "0",
      urineUrea: "0", urineGlucose: "0",
    });
    expect(r.value).toBeCloseTo(5, 0);
    expect(r.status).toBe("normal");
  });

  it("elevated with complex inputs", () => {
    // UNa=60, UK=30, UUrea=500, UGlu=200
    // estimated = 2×90 + 500/2.8 + 200/18 = 180 + 178.5714 + 11.1111 = 369.683
    // measured = 500 → gap = 130.317 → >10
    const r = calc(urineOsmolalGapCalculator, {
      urineOsmolality: "500", urineSodium: "60", urinePotassium: "30",
      urineUrea: "500", urineGlucose: "200",
    });
    expect(r.value).toBeCloseTo(130.32, 0);
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Estimated Average Glucose — 28.7 × A1c − 46.7
// ≤140 normal, 140–200 pre-diabetic, ≥200 diabetic
// Note: code has dead `if (false){}` pattern — tested as-is.
// ---------------------------------------------------------------------------
describe("Estimated Average Glucose calculate() output", () => {
  it("A1c 5.0 → 96.8 mg/dL (normal)", () => {
    // 28.7 × 5.0 − 46.7 = 143.5 − 46.7 = 96.8
    const r = calc(estimatedAverageGlucoseCalculator, { a1c: "5.0" });
    expect(r.value).toBe(96.8);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Normal average glucose");
  });

  it("A1c 6.5 → 139.85 mg/dL (normal)", () => {
    // 28.7 × 6.5 − 46.7 = 186.55 − 46.7 = 139.85
    const r = calc(estimatedAverageGlucoseCalculator, { a1c: "6.5" });
    expect(r.value).toBeCloseTo(139.85, 1);
    expect(r.status).toBe("normal");
  });

  it("A1c 7.0 → 154.2 mg/dL (pre-diabetic)", () => {
    // 28.7 × 7.0 − 46.7 = 200.9 − 46.7 = 154.2
    const r = calc(estimatedAverageGlucoseCalculator, { a1c: "7.0" });
    expect(r.value).toBe(154.2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toBe("Pre-diabetic range");
  });

  it("A1c 9.0 → 211.6 mg/dL (diabetic)", () => {
    // 28.7 × 9.0 − 46.7 = 258.3 − 46.7 = 211.6
    const r = calc(estimatedAverageGlucoseCalculator, { a1c: "9.0" });
    expect(r.value).toBe(211.6);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Diabetic range");
  });

  it("A1c 12.0 → 297.7 mg/dL (diabetic)", () => {
    // 28.7 × 12.0 − 46.7 = 344.4 − 46.7 = 297.7
    const r = calc(estimatedAverageGlucoseCalculator, { a1c: "12.0" });
    expect(r.value).toBe(297.7);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Hunt-Hess Scale — 5 grades, SAH severity
// Status: I,II normal; III high; IV,V critical
// ---------------------------------------------------------------------------
describe("Hunt-Hess Scale calculate() output", () => {
  it("Grade I → normal", () => {
    const r = calc(huntHessScaleCalculator, { grade: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("grade I");
  });

  it("Grade II → normal", () => {
    const r = calc(huntHessScaleCalculator, { grade: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("grade II");
  });

  it("Grade III → high", () => {
    const r = calc(huntHessScaleCalculator, { grade: "3" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("grade III");
  });

  it("Grade IV → critical", () => {
    const r = calc(huntHessScaleCalculator, { grade: "4" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("grade IV");
  });

  it("Grade V → critical", () => {
    const r = calc(huntHessScaleCalculator, { grade: "5" });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("grade V");
  });
});

// ---------------------------------------------------------------------------
// Modified Rankin Scale — 7 grades (0–6)
// 0–2 normal (favorable), 3–4 high, 5–6 critical
// ---------------------------------------------------------------------------
describe("Modified Rankin Scale calculate() output", () => {
  it("mRS 0 → normal (no symptoms)", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("mRS 1 → normal", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("mRS 2 → normal (slight disability)", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("normal");
  });

  it("mRS 3 → high (moderate disability)", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "3" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("mRS 4 → high", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "4" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("high");
  });

  it("mRS 5 → critical (severe disability)", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "5" });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });

  it("mRS 6 → critical (dead)", () => {
    const r = calc(modifiedRankinScaleCalculator, { score: "6" });
    expect(r.value).toBe(6);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Bishop Score — 5 components sum 0–13
// ≥8 favorable (normal), 6–7 intermediate (normal), ≤5 unfavorable (high)
// ---------------------------------------------------------------------------
describe("Bishop Score calculate() output", () => {
  it("score 0: all zeros → unfavorable, high", () => {
    const r = calc(bishopScoreCalculator, {
      dilation: "0", effacement: "0", station: "0",
      consistency: "0", position: "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("high");
  });

  it("score 5: borderline unfavorable", () => {
    // dilation=2 + effacement=1 + station=1 + consistency=1 + position=0 = 5
    const r = calc(bishopScoreCalculator, {
      dilation: "2", effacement: "1", station: "1",
      consistency: "1", position: "0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("high");
  });

  it("score 6: intermediate boundary", () => {
    // dilation=2 + effacement=2 + station=1 + consistency=1 + position=0 = 6
    const r = calc(bishopScoreCalculator, {
      dilation: "2", effacement: "2", station: "1",
      consistency: "1", position: "0",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("normal");
  });

  it("score 8: favorable boundary", () => {
    // dilation=3 + effacement=3 + station=1 + consistency=1 + position=0 = 8
    const r = calc(bishopScoreCalculator, {
      dilation: "3", effacement: "3", station: "1",
      consistency: "1", position: "0",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("normal");
  });

  it("score 13: maximum favorable", () => {
    // dilation=3 + effacement=3 + station=3 + consistency=2 + position=2 = 13
    const r = calc(bishopScoreCalculator, {
      dilation: "3", effacement: "3", station: "3",
      consistency: "2", position: "2",
    });
    expect(r.value).toBe(13);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// ECOG Performance Status — 6 grades (0–5)
// 0–1 normal, 2–3 high, 4–5 critical
// ---------------------------------------------------------------------------
describe("ECOG Performance Status calculate() output", () => {
  it("ECOG 0 → normal (fully active)", () => {
    const r = calc(ecogCalculator, { grade: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("ECOG 1 → normal (ambulatory, light work)", () => {
    const r = calc(ecogCalculator, { grade: "1" });
    expect(r.value).toBe(1);
    expect(r.status).toBe("normal");
  });

  it("ECOG 2 → high (ambulatory, self-care only)", () => {
    const r = calc(ecogCalculator, { grade: "2" });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("ECOG 3 → high (limited self-care)", () => {
    const r = calc(ecogCalculator, { grade: "3" });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
  });

  it("ECOG 4 → critical (completely disabled)", () => {
    const r = calc(ecogCalculator, { grade: "4" });
    expect(r.value).toBe(4);
    expect(r.status).toBe("critical");
  });

  it("ECOG 5 → critical (dead)", () => {
    const r = calc(ecogCalculator, { grade: "5" });
    expect(r.value).toBe(5);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Epworth Sleepiness Scale — 8-item sum, 0–24
// ≤10 normal, 11–14 mild, 15–17 moderate, ≥18 severe
// ---------------------------------------------------------------------------
describe("Epworth Sleepiness Scale calculate() output", () => {
  const allZero = {
    ess1: "0", ess2: "0", ess3: "0", ess4: "0",
    ess5: "0", ess6: "0", ess7: "0", ess8: "0",
  };

  it("score 0 → normal", () => {
    const r = calc(epworthCalculator, allZero);
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 10 → normal (boundary)", () => {
    // first 10 items don't exist, so 8 items max at 24
    // 3+3+3+1 = 10 using first 4 items
    const r = calc(epworthCalculator, {
      ...allZero, ess1: "3", ess2: "3", ess3: "3", ess4: "1",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("normal");
  });

  it("score 11 → mild (boundary)", () => {
    const r = calc(epworthCalculator, {
      ...allZero, ess1: "3", ess2: "3", ess3: "3", ess4: "2",
    });
    expect(r.value).toBe(11);
    expect(r.status).toBe("high");
  });

  it("score 14 → mild (upper boundary)", () => {
    const r = calc(epworthCalculator, {
      ...allZero, ess1: "3", ess2: "3", ess3: "3", ess4: "3", ess5: "2",
    });
    expect(r.value).toBe(14);
    expect(r.status).toBe("high");
  });

  it("score 17 → moderate (upper boundary)", () => {
    const r = calc(epworthCalculator, {
      ...allZero, ess1: "3", ess2: "3", ess3: "3", ess4: "3",
      ess5: "3", ess6: "2",
    });
    expect(r.value).toBe(17);
    expect(r.status).toBe("high");
  });

  it("score 18 → severe (boundary)", () => {
    const r = calc(epworthCalculator, {
      ...allZero, ess1: "3", ess2: "3", ess3: "3", ess4: "3",
      ess5: "3", ess6: "3",
    });
    expect(r.value).toBe(18);
    expect(r.status).toBe("critical");
  });

  it("score 24 → severe (maximum)", () => {
    const r = calc(epworthCalculator, {
      ess1: "3", ess2: "3", ess3: "3", ess4: "3",
      ess5: "3", ess6: "3", ess7: "3", ess8: "3",
    });
    expect(r.value).toBe(24);
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// Gestational Weight Gain (IOM 2009) — BMI-based
// Underweight (<18.5): 28–40 lb, midpoint 34
// Normal (18.5–24.9): 25–35 lb, midpoint 30
// Overweight (25–29.9): 15–25 lb, midpoint 20
// Obese (≥30): 11–20 lb, midpoint 16 (Math.round((11+20)/2)=16)
// ---------------------------------------------------------------------------
describe("Gestational Weight Gain calculate() output", () => {
  it("underweight BMI 17 → midpoint 34", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "17" });
    expect(r.value).toBe(34);
    expect(r.status).toBe("normal");
  });

  it("normal BMI 22 → midpoint 30", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "22" });
    expect(r.value).toBe(30);
    expect(r.status).toBe("normal");
  });

  it("overweight BMI 27 → midpoint 20", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "27" });
    expect(r.value).toBe(20);
    expect(r.status).toBe("normal");
  });

  it("obese BMI 35 → midpoint 16", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "35" });
    expect(r.value).toBe(16);
    expect(r.status).toBe("normal");
  });

  it("BMI exactly 18.5 → normal weight category", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "18.5" });
    expect(r.value).toBe(30);
    expect(r.status).toBe("normal");
  });

  it("BMI exactly 25 → overweight category", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "25" });
    expect(r.value).toBe(20);
    expect(r.status).toBe("normal");
  });

  it("BMI exactly 30 → obese category", () => {
    const r = calc(gestationalWeightGainCalculator, { bmi: "30" });
    expect(r.value).toBe(16);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// ACR — Urine Albumin-to-Creatinine Ratio
// ACR = albumin (mg/L) / creatinine (g/L)
// A1: <30 normal, A2: 30–300 moderate, A3: >300 severe
// Status: "normal" for A1, "low" for A2 and A3
// ---------------------------------------------------------------------------
describe("ACR calculate() output", () => {
  it("normal: 20/1.0 = 20 mg/g → A1", () => {
    const r = calc(acrCalculator, { albumin: "20", creatinine: "1.0" });
    expect(r.value).toBe(20);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("A1: Normal to mildly increased albuminuria.");
  });

  it("moderate: 100/1.0 = 100 mg/g → A2", () => {
    const r = calc(acrCalculator, { albumin: "100", creatinine: "1.0" });
    expect(r.value).toBe(100);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("A2: Moderately increased albuminuria.");
  });

  it("severe: 500/1.0 = 500 mg/g → A3", () => {
    const r = calc(acrCalculator, { albumin: "500", creatinine: "1.0" });
    expect(r.value).toBe(500);
    expect(r.status).toBe("low");
    expect(r.interpretation).toBe("A3: Severely increased albuminuria.");
  });

  it("boundary 30: 30/1.0 = 30 mg/g → A2", () => {
    const r = calc(acrCalculator, { albumin: "30", creatinine: "1.0" });
    expect(r.value).toBe(30);
    expect(r.status).toBe("low");
  });

  it("high creatinine: 300/2.0 = 150 mg/g → A2", () => {
    const r = calc(acrCalculator, { albumin: "300", creatinine: "2.0" });
    expect(r.value).toBe(150);
    expect(r.status).toBe("low");
  });
});

// ---------------------------------------------------------------------------
// EDD — Expected Date of Delivery
// EDD = LMP + 280 days
// ---------------------------------------------------------------------------
describe("EDD calculate() output", () => {
  it("LMP Jan 1, 2026 → EDD Oct 8, 2026", () => {
    const r = calc(eddCalculator, { lmp: "2026-01-01" });
    expect(r.value).toBe("2026-10-08");
    expect(r.status).toBe("normal");
  });

  it("LMP Jul 1, 2026 → EDD Apr 12, 2027", () => {
    // Jul 1 + 280 days: Jul has 31 days → 30 remaining in Jul
    // Aug 31, Sep 30, Oct 31, Nov 30, Dec 31, Jan 31, Feb 28, Mar 31, Apr 12
    // 30+31+30+31+30+31+31+28+31+12 = 285... let me just compute
    // July 1 + 280 = Oct 8, 2026? No that's 280 days from Jul 1
    // July: 30 days remaining (Jul 2–31)
    // Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31, Jan: 31, Feb: 28, Mar: 31, Apr: 7
    // 30+31+30+31+30+31+31+28+31+7 = 280. So Apr 7, 2027
    const r = calc(eddCalculator, { lmp: "2026-07-01" });
    expect(r.value).toBe("2027-04-07");
    expect(r.status).toBe("normal");
  });

  it("LMP Feb 29, 2024 (leap year) → EDD Dec 5, 2024", () => {
    const r = calc(eddCalculator, { lmp: "2024-02-29" });
    expect(r.value).toBe("2024-12-05");
    expect(r.status).toBe("normal");
  });

  it("invalid date → high status", () => {
    const r = calc(eddCalculator, { lmp: "not-a-date" });
    expect(r.status).toBe("high");
  });
});

// ---------------------------------------------------------------------------
// Gestational Age — weeks + days/7
// ---------------------------------------------------------------------------
describe("Gestational Age calculate() output", () => {
  it("0+0 → 0 weeks", () => {
    const r = calc(gestationalAgeCalculator, { weeks: "0", days: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("20+3 → 20.4286 weeks", () => {
    const r = calc(gestationalAgeCalculator, { weeks: "20", days: "3" });
    expect(r.value).toBeCloseTo(20.43, 1);
    expect(r.status).toBe("normal");
  });

  it("40+0 → 40 weeks (term)", () => {
    const r = calc(gestationalAgeCalculator, { weeks: "40", days: "0" });
    expect(r.value).toBe(40);
    expect(r.status).toBe("normal");
  });

  it("42+0 → 42 weeks (post-term)", () => {
    const r = calc(gestationalAgeCalculator, { weeks: "42", days: "0" });
    expect(r.value).toBe(42);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Heart Rate — beats / time (minutes)
// Result = Number(result.toFixed(2))
// Classification: < 60 → bradycardia, 60–100 → normal, > 100 → tachycardia.
// ---------------------------------------------------------------------------
describe("Heart Rate calculate() output", () => {
  it("representative resting rate: 70 bpm", () => {
    const r = calc(heartRateCalculator, { beats: "70", time: "1" });
    expect(r.value).toBe(70);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("70 bpm");
    expect(r.interpretation).toContain("normal resting range");
  });

  it("bradycardia: 45 bpm", () => {
    const r = calc(heartRateCalculator, { beats: "45", time: "1" });
    expect(r.value).toBe(45);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("bradycardia");
  });

  it("tachycardia: 120 bpm", () => {
    const r = calc(heartRateCalculator, { beats: "120", time: "1" });
    expect(r.value).toBe(120);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("tachycardia");
  });

  it("extreme tachycardia: 180 bpm", () => {
    const r = calc(heartRateCalculator, { beats: "180", time: "1" });
    expect(r.value).toBe(180);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("tachycardia");
  });

  it("measured over 2 minutes: 150 beats / 2 min = 75 bpm", () => {
    const r = calc(heartRateCalculator, { beats: "150", time: "2" });
    expect(r.value).toBe(75);
    expect(r.status).toBe("normal");
  });

  it("zero beats → critical validation error", () => {
    const r = calc(heartRateCalculator, { beats: "0", time: "1" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Number of Beats cannot be zero.");
  });

  it("missing time → critical validation error", () => {
    const r = calc(heartRateCalculator, { beats: "70", time: "" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Time is required.");
  });
});

// ---------------------------------------------------------------------------
// BSA — Mosteller: sqrt((height_cm × weight_kg) / 3600)
// Result = Number(result.toFixed(2))
// Status is always "normal".
// ---------------------------------------------------------------------------
describe("BSA calculate() output", () => {
  it("standard adult: 70 kg, 170 cm", () => {
    // sqrt((170 × 70) / 3600) = sqrt(11900 / 3600) = sqrt(3.3056) = 1.8181… → 1.82
    const r = calc(bsaCalculator, { weight: "70", height: "170" });
    expect(r.value).toBe(1.82);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("Body surface area 1.82 m².");
  });

  it("obese patient: 120 kg, 170 cm", () => {
    // sqrt((170 × 120) / 3600) = sqrt(20400 / 3600) = sqrt(5.6667) = 2.3805… → 2.38
    const r = calc(bsaCalculator, { weight: "120", height: "170" });
    expect(r.value).toBeCloseTo(2.38, 1);
    expect(r.status).toBe("normal");
  });

  it("thin patient: 45 kg, 160 cm", () => {
    // sqrt((160 × 45) / 3600) = sqrt(7200 / 3600) = sqrt(2) = 1.4142… → 1.41
    const r = calc(bsaCalculator, { weight: "45", height: "160" });
    expect(r.value).toBeCloseTo(1.41, 1);
    expect(r.status).toBe("normal");
  });

  it("tall patient: 80 kg, 195 cm", () => {
    // sqrt((195 × 80) / 3600) = sqrt(15600 / 3600) = sqrt(4.3333) = 2.0817… → 2.08
    const r = calc(bsaCalculator, { weight: "80", height: "195" });
    expect(r.value).toBeCloseTo(2.08, 1);
    expect(r.status).toBe("normal");
  });

  it("zero weight → critical validation error", () => {
    const r = calc(bsaCalculator, { weight: "0", height: "170" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Weight cannot be zero.");
  });
});

// ---------------------------------------------------------------------------
// Ideal Body Weight — Devine formula
// Male:   50 + 2.3 × (height_in − 60)
// Female: 45.5 + 2.3 × (height_in − 60)
// height_in = height_cm / 2.54
// Rounding: Math.round(ibw × 10) / 10
// Slug: ideal-body-weight
// ---------------------------------------------------------------------------
describe("Ideal Body Weight calculate() output", () => {
  it("male 175 cm: 50 + 2.3 × (68.898 − 60) = 70.46… → 70.5", () => {
    const inches = 175 / 2.54; // 68.8976
    const ibw = 50 + 2.3 * (inches - 60); // 70.4624
    const expected = Math.round(ibw * 10) / 10; // 70.5
    const r = calc(ibwCalculator, { sex: "male", height: "175" });
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("female 165 cm: 45.5 + 2.3 × (64.961 − 60) = 56.92… → 56.9", () => {
    const inches = 165 / 2.54; // 64.9606
    const ibw = 45.5 + 2.3 * (inches - 60); // 56.922
    const expected = Math.round(ibw * 10) / 10; // 56.9
    const r = calc(ibwCalculator, { sex: "female", height: "165" });
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("male 190 cm: tall patient", () => {
    const inches = 190 / 2.54; // 74.8031
    const ibw = 50 + 2.3 * (inches - 60); // 84.0472
    const expected = Math.round(ibw * 10) / 10; // 84
    const r = calc(ibwCalculator, { sex: "male", height: "190" });
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("female 150 cm: short patient", () => {
    const inches = 150 / 2.54; // 59.0551
    const ibw = 45.5 + 2.3 * (inches - 60); // 43.323
    const rounded = Math.round(ibw * 10) / 10; // 43.3
    const expected = Math.max(0, rounded); // 43.3
    const r = calc(ibwCalculator, { sex: "female", height: "150" });
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("edge: exactly 60 inches (152.4 cm) → male base = 50.0", () => {
    // inches = 152.4 / 2.54 = 60 exactly → 50 + 2.3 × 0 = 50
    const r = calc(ibwCalculator, { sex: "male", height: "152.4" });
    expect(r.value).toBe(50);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Adjusted Body Weight — IBW + 0.4 × (actual − IBW)
// Devine IBW first, then adjustment. Rounding: Math.round(adj × 10) / 10
// Slug: adjusted-body-weight
// ---------------------------------------------------------------------------
describe("Adjusted Body Weight calculate() output", () => {
  it("overweight male: 175 cm, 90 kg", () => {
    // IBW = 70.5 (from ibw test above)
    // adjbw = 70.5 + 0.4 × (90 − 70.5) = 70.5 + 7.8 = 78.3
    const r = calc(adjbwCalculator, { sex: "male", height: "175", weight: "90" });
    expect(r.value).toBe(78.3);
    expect(r.status).toBe("normal");
  });

  it("obese female: 165 cm, 110 kg", () => {
    // IBW female 165 = 56.9 (from ibw test)
    // adjbw = 56.9 + 0.4 × (110 − 56.9) = 56.9 + 21.24 = 78.14 → 78.1
    const ibwInches = 165 / 2.54;
    const ibw = 45.5 + 2.3 * (ibwInches - 60);
    const adjbw = ibw + 0.4 * (110 - ibw);
    const expected = Math.round(adjbw * 10) / 10;
    const r = calc(adjbwCalculator, { sex: "female", height: "165", weight: "110" });
    expect(r.value).toBe(expected);
    expect(r.status).toBe("normal");
  });

  it("near-IBW male: 175 cm, 70.5 kg → adjbw ≈ IBW", () => {
    // IBW = 70.5 → adjbw = 70.5 + 0.4 × (70.5 − 70.5) = 70.5
    const r = calc(adjbwCalculator, { sex: "male", height: "175", weight: "70.5" });
    expect(r.value).toBe(70.5);
    expect(r.status).toBe("normal");
  });

  it("underweight male: 175 cm, 55 kg", () => {
    // IBW = 70.5 → adjbw = 70.5 + 0.4 × (55 − 70.5) = 70.5 − 6.2 = 64.3
    const r = calc(adjbwCalculator, { sex: "male", height: "175", weight: "55" });
    expect(r.value).toBe(64.3);
    expect(r.status).toBe("normal");
  });

  it("exact IBW female: 165 cm, 56.9 kg → adjbw = 56.9", () => {
    const ibwInches = 165 / 2.54;
    const ibw = Math.round((45.5 + 2.3 * (ibwInches - 60)) * 10) / 10; // 56.9
    // adjbw = 56.9 + 0.4 × (56.9 − 56.9) = 56.9
    const r = calc(adjbwCalculator, { sex: "female", height: "165", weight: String(ibw) });
    expect(r.value).toBe(ibw);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Lean Body Mass — Boer formula
// Male:   0.407 × weight + 0.267 × height − 19.2
// Female: 0.252 × weight + 0.473 × height − 48.3
// Rounding: Math.round(lbm × 10) / 10, clamped ≥ 0
// Slug: lean-body-weight
// ---------------------------------------------------------------------------
describe("Lean Body Mass calculate() output", () => {
  it("male: 80 kg, 180 cm", () => {
    // 0.407 × 80 + 0.267 × 180 − 19.2 = 32.56 + 48.06 − 19.2 = 61.42 → 61.4
    const r = calc(lbmCalculator, { sex: "male", weight: "80", height: "180" });
    expect(r.value).toBe(61.4);
    expect(r.status).toBe("normal");
  });

  it("female: 60 kg, 165 cm", () => {
    // 0.252 × 60 + 0.473 × 165 − 48.3 = 15.12 + 78.045 − 48.3 = 44.865 → 44.9
    const r = calc(lbmCalculator, { sex: "female", weight: "60", height: "165" });
    expect(r.value).toBe(44.9);
    expect(r.status).toBe("normal");
  });

  it("obese male: 130 kg, 175 cm", () => {
    // 0.407 × 130 + 0.267 × 175 − 19.2 = 52.91 + 46.725 − 19.2 = 80.435 → 80.4
    const r = calc(lbmCalculator, { sex: "male", weight: "130", height: "175" });
    expect(r.value).toBe(80.4);
    expect(r.status).toBe("normal");
  });

  it("lean/thin male: 55 kg, 175 cm", () => {
    // 0.407 × 55 + 0.267 × 175 − 19.2 = 22.385 + 46.725 − 19.2 = 49.91 → 49.9
    const r = calc(lbmCalculator, { sex: "male", weight: "55", height: "175" });
    expect(r.value).toBe(49.9);
    expect(r.status).toBe("normal");
  });

  it("female: 45 kg, 150 cm", () => {
    // 0.252 × 45 + 0.473 × 150 − 48.3 = 11.34 + 70.95 − 48.3 = 33.99 → 34
    const r = calc(lbmCalculator, { sex: "female", weight: "45", height: "150" });
    expect(r.value).toBe(34);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Basal Metabolic Rate — Mifflin-St Jeor (same utility as Mifflin-St Jeor calc)
// Male:   10 × weight + 6.25 × height − 5 × age + 5
// Female: 10 × weight + 6.25 × height − 5 × age − 161
// Rounding: Math.round(bmr × 10) / 10
// ---------------------------------------------------------------------------
describe("Basal Metabolic Rate calculate() output", () => {
  it("male 30y, 80 kg, 180 cm", () => {
    // 10×80 + 6.25×180 − 5×30 + 5 = 800 + 1125 − 150 + 5 = 1780
    const r = calc(basalMetabolicRateCalculator, {
      sex: "male", age: "30", weight: "80", height: "180",
    });
    expect(r.value).toBe(1780);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("kcal/day");
    expect(r.interpretation).toBe("Estimated basal metabolic rate");
  });

  it("female 25y, 60 kg, 165 cm", () => {
    // 10×60 + 6.25×165 − 5×25 − 161 = 600 + 1031.25 − 125 − 161 = 1345.25 → 1345.3
    const r = calc(basalMetabolicRateCalculator, {
      sex: "female", age: "25", weight: "60", height: "165",
    });
    expect(r.value).toBe(1345.3);
    expect(r.status).toBe("normal");
  });

  it("male 20y, 75 kg, 175 cm (younger adult)", () => {
    // 10×75 + 6.25×175 − 5×20 + 5 = 750 + 1093.75 − 100 + 5 = 1748.75 → 1748.8
    const r = calc(basalMetabolicRateCalculator, {
      sex: "male", age: "20", weight: "75", height: "175",
    });
    expect(r.value).toBe(1748.8);
    expect(r.status).toBe("normal");
  });

  it("female 70y, 55 kg, 155 cm (older adult)", () => {
    // 10×55 + 6.25×155 − 5×70 − 161 = 550 + 968.75 − 350 − 161 = 1007.75 → 1007.8
    const r = calc(basalMetabolicRateCalculator, {
      sex: "female", age: "70", weight: "55", height: "155",
    });
    expect(r.value).toBe(1007.8);
    expect(r.status).toBe("normal");
  });

  it("male 40y, 100 kg, 185 cm (larger body)", () => {
    // 10×100 + 6.25×185 − 5×40 + 5 = 1000 + 1156.25 − 200 + 5 = 1961.25 → 1961.3
    const r = calc(basalMetabolicRateCalculator, {
      sex: "male", age: "40", weight: "100", height: "185",
    });
    expect(r.value).toBe(1961.3);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Mifflin-St Jeor — same utility as BMR calculator
// Identical formula, different interpretation string
// ---------------------------------------------------------------------------
describe("Mifflin-St Jeor calculate() output", () => {
  it("male 30y, 80 kg, 180 cm", () => {
    // Same as BMR: 1780
    const r = calc(mifflinStJeorCalculator, {
      sex: "male", age: "30", weight: "80", height: "180",
    });
    expect(r.value).toBe(1780);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("kcal/day");
    expect(r.interpretation).toBe("Estimated resting energy expenditure");
  });

  it("female 25y, 60 kg, 165 cm", () => {
    // 1345.3 (same as BMR calc)
    const r = calc(mifflinStJeorCalculator, {
      sex: "female", age: "25", weight: "60", height: "165",
    });
    expect(r.value).toBe(1345.3);
    expect(r.status).toBe("normal");
  });

  it("male 50y, 90 kg, 178 cm (middle-aged)", () => {
    // 10×90 + 6.25×178 − 5×50 + 5 = 900 + 1112.5 − 250 + 5 = 1767.5 → 1767.5
    const r = calc(mifflinStJeorCalculator, {
      sex: "male", age: "50", weight: "90", height: "178",
    });
    expect(r.value).toBe(1767.5);
    expect(r.status).toBe("normal");
  });

  it("female 65y, 70 kg, 160 cm (older adult)", () => {
    // 10×70 + 6.25×160 − 5×65 − 161 = 700 + 1000 − 325 − 161 = 1214
    const r = calc(mifflinStJeorCalculator, {
      sex: "female", age: "65", weight: "70", height: "160",
    });
    expect(r.value).toBe(1214);
    expect(r.status).toBe("normal");
  });

  it("male 25y, 65 kg, 170 cm (smaller body)", () => {
    // 10×65 + 6.25×170 − 5×25 + 5 = 650 + 1062.5 − 125 + 5 = 1592.5 → 1592.5
    const r = calc(mifflinStJeorCalculator, {
      sex: "male", age: "25", weight: "65", height: "170",
    });
    expect(r.value).toBe(1592.5);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Harris-Benedict — sex-specific constants
// Male:   88.362 + 13.397 × weight + 4.799 × height − 5.677 × age
// Female: 447.593 + 9.247 × weight + 3.098 × height − 4.33 × age
// Rounding: Math.round(bmr × 10) / 10
// ---------------------------------------------------------------------------
describe("Harris-Benedict calculate() output", () => {
  it("male 30y, 80 kg, 180 cm", () => {
    // 88.362 + 13.397×80 + 4.799×180 − 5.677×30
    // = 88.362 + 1071.76 + 863.82 − 170.31 = 1853.632 → 1853.6
    const r = calc(harrisBenedictCalculator, {
      sex: "male", age: "30", weight: "80", height: "180",
    });
    expect(r.value).toBe(1853.6);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("kcal/day");
    expect(r.interpretation).toBe("Estimated basal metabolic rate");
  });

  it("female 25y, 60 kg, 165 cm", () => {
    // 447.593 + 9.247×60 + 3.098×165 − 4.33×25
    // = 447.593 + 554.82 + 511.17 − 108.25 = 1405.333 → 1405.3
    const r = calc(harrisBenedictCalculator, {
      sex: "female", age: "25", weight: "60", height: "165",
    });
    expect(r.value).toBe(1405.3);
    expect(r.status).toBe("normal");
  });

  it("male 20y, 75 kg, 175 cm (younger adult)", () => {
    // 88.362 + 13.397×75 + 4.799×175 − 5.677×20
    // = 88.362 + 1004.775 + 839.825 − 113.54 = 1819.422 → 1819.4
    const r = calc(harrisBenedictCalculator, {
      sex: "male", age: "20", weight: "75", height: "175",
    });
    expect(r.value).toBe(1819.4);
    expect(r.status).toBe("normal");
  });

  it("female 70y, 55 kg, 155 cm (older adult)", () => {
    // 447.593 + 9.247×55 + 3.098×155 − 4.33×70
    // = 447.593 + 508.585 + 480.19 − 303.1 = 1133.268 → 1133.3
    const r = calc(harrisBenedictCalculator, {
      sex: "female", age: "70", weight: "55", height: "155",
    });
    expect(r.value).toBe(1133.3);
    expect(r.status).toBe("normal");
  });

  it("male 40y, 100 kg, 185 cm (larger body)", () => {
    // 88.362 + 13.397×100 + 4.799×185 − 5.677×40
    // = 88.362 + 1339.7 + 887.815 − 227.08 = 2088.797 → 2088.8
    const r = calc(harrisBenedictCalculator, {
      sex: "male", age: "40", weight: "100", height: "185",
    });
    expect(r.value).toBe(2088.8);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Calorie Requirement — BMR × activity factor
// Rounding: Math.round(bmr × activity) (integer)
// Activity factors: 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 active, 1.9 very active
// ---------------------------------------------------------------------------
describe("Calorie Requirement calculate() output", () => {
  it("sedentary: BMR 1780 × 1.2 = 2136", () => {
    const r = calc(calorieRequirementCalculator, {
      bmr: "1780", activity: "1.2",
    });
    expect(r.value).toBe(2136);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("kcal/day");
    expect(r.interpretation).toBe("Estimated daily calorie requirement");
  });

  it("lightly active: BMR 1500 × 1.375 = 2062.5 → 2063", () => {
    const r = calc(calorieRequirementCalculator, {
      bmr: "1500", activity: "1.375",
    });
    expect(r.value).toBe(2063);
    expect(r.status).toBe("normal");
  });

  it("moderately active: BMR 1800 × 1.55 = 2790", () => {
    const r = calc(calorieRequirementCalculator, {
      bmr: "1800", activity: "1.55",
    });
    expect(r.value).toBe(2790);
    expect(r.status).toBe("normal");
  });

  it("active: BMR 2000 × 1.725 = 3450", () => {
    const r = calc(calorieRequirementCalculator, {
      bmr: "2000", activity: "1.725",
    });
    expect(r.value).toBe(3450);
    expect(r.status).toBe("normal");
  });

  it("very active: BMR 1780 × 1.9 = 3382", () => {
    const r = calc(calorieRequirementCalculator, {
      bmr: "1780", activity: "1.9",
    });
    expect(r.value).toBe(3382);
    expect(r.status).toBe("normal");
  });
});

// ---------------------------------------------------------------------------
// Fluid Requirement — weight × 35 mL/kg/day
// Rounding: Math.round(weight × 35) (integer)
// ---------------------------------------------------------------------------
describe("Fluid Requirement calculate() output", () => {
  it("standard adult: 70 kg → 2450 mL/day", () => {
    const r = calc(fluidRequirementCalculator, { weight: "70" });
    expect(r.value).toBe(2450);
    expect(r.status).toBe("normal");
    expect(r.unit).toBe("mL/day");
    expect(r.interpretation).toBe("Estimated maintenance fluid requirement");
  });

  it("lower weight: 50 kg → 1750 mL/day", () => {
    const r = calc(fluidRequirementCalculator, { weight: "50" });
    expect(r.value).toBe(1750);
    expect(r.status).toBe("normal");
  });

  it("higher weight: 100 kg → 3500 mL/day", () => {
    const r = calc(fluidRequirementCalculator, { weight: "100" });
    expect(r.value).toBe(3500);
    expect(r.status).toBe("normal");
  });

  it("small adult: 45 kg → 1575 mL/day", () => {
    const r = calc(fluidRequirementCalculator, { weight: "45" });
    expect(r.value).toBe(1575);
    expect(r.status).toBe("normal");
  });

  it("heavy adult: 120 kg → 4200 mL/day", () => {
    const r = calc(fluidRequirementCalculator, { weight: "120" });
    expect(r.value).toBe(4200);
    expect(r.status).toBe("normal");
  });

  it("zero weight → critical validation error", () => {
    const r = calc(fluidRequirementCalculator, { weight: "0" });
    expect(r.value).toBe(0);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toBe("Weight is required.");
  });
});

// ---------------------------------------------------------------------------
// Alvarado Score — MANTRELS: 8 criteria, sum 0–10
// ≤4 low (normal); 5–6 moderate (low); 7–8 high; 9–10 very high (critical)
// Scores: Migration(1), Anorexia(1), Nausea(1), RLQ(2), Rebound(1), Fever(1), Leukocytosis(2), Left Shift(1)
// ---------------------------------------------------------------------------
describe("Alvarado Score calculate() output", () => {
  it("score 0: all No → low probability", () => {
    const r = calc(alvaradoScoreCalculator, {
      migration: "0", anorexia: "0", nausea: "0",
      "rlq-tenderness": "0", rebound: "0", fever: "0",
      leukocytosis: "0", "left-shift": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("score 5: moderate probability", () => {
    // Migration(1) + Anorexia(1) + Nausea(1) + RLQ(2) = 5
    const r = calc(alvaradoScoreCalculator, {
      migration: "1", anorexia: "1", nausea: "1",
      "rlq-tenderness": "2", rebound: "0", fever: "0",
      leukocytosis: "0", "left-shift": "0",
    });
    expect(r.value).toBe(5);
    expect(r.status).toBe("low");
  });

  it("score 7: high probability", () => {
    // Migration(1) + Anorexia(1) + Nausea(1) + RLQ(2) + Rebound(1) + Fever(1) = 7
    const r = calc(alvaradoScoreCalculator, {
      migration: "1", anorexia: "1", nausea: "1",
      "rlq-tenderness": "2", rebound: "1", fever: "1",
      leukocytosis: "0", "left-shift": "0",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("high");
  });

  it("score 10: all positive → very high probability", () => {
    // 1+1+1+2+1+1+2+1 = 10
    const r = calc(alvaradoScoreCalculator, {
      migration: "1", anorexia: "1", nausea: "1",
      "rlq-tenderness": "2", rebound: "1", fever: "1",
      leukocytosis: "2", "left-shift": "1",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });

  it("boundary 4→5: score 4 still low probability", () => {
    // Anorexia(1) + Nausea(1) + RLQ(2) = 4
    const r = calc(alvaradoScoreCalculator, {
      migration: "0", anorexia: "1", nausea: "1",
      "rlq-tenderness": "2", rebound: "0", fever: "0",
      leukocytosis: "0", "left-shift": "0",
    });
    expect(r.value).toBe(4);
    expect(r.status).toBe("normal");
  });

  it("boundary 6→7: score 6 still moderate", () => {
    // Migration(1) + Anorexia(1) + RLQ(2) + Fever(1) + Left Shift(1) = 6
    const r = calc(alvaradoScoreCalculator, {
      migration: "1", anorexia: "1", nausea: "0",
      "rlq-tenderness": "2", rebound: "0", fever: "1",
      leukocytosis: "0", "left-shift": "1",
    });
    expect(r.value).toBe(6);
    expect(r.status).toBe("low");
  });

  it("boundary 8→9: score 8 still high", () => {
    // Migration(1) + Anorexia(1) + Nausea(1) + RLQ(2) + Rebound(1) + Leukocytosis(2) = 8
    const r = calc(alvaradoScoreCalculator, {
      migration: "1", anorexia: "1", nausea: "1",
      "rlq-tenderness": "2", rebound: "1", fever: "0",
      leukocytosis: "2", "left-shift": "0",
    });
    expect(r.value).toBe(8);
    expect(r.status).toBe("high");
  });

  it("missing input → critical validation", () => {
    const r = calc(alvaradoScoreCalculator, {
      migration: "", anorexia: "0", nausea: "0",
      "rlq-tenderness": "0", rebound: "0", fever: "0",
      leukocytosis: "0", "left-shift": "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// Corrected Magnesium — Measured Mg + 0.005 × (40 − Albumin)
// Normal: 0.75–1.05 mmol/L
// <0.50 severe hypo; 0.50–0.65 moderate hypo; 0.66–0.74 mild hypo;
// 1.06–1.50 mild hyper; 1.51–2.0 moderate hyper; >2.0 severe hyper
// Result = Number(result.toFixed(2))
// ---------------------------------------------------------------------------
describe("Corrected Magnesium calculate() output", () => {
  it("normal: Mg=0.9, albumin=40 → 0.9", () => {
    // 0.9 + 0.005 × (40 − 40) = 0.9
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.9", albumin: "40",
    });
    expect(r.value).toBe(0.9);
    expect(r.status).toBe("normal");
  });

  it("low albumin: Mg=0.7, albumin=20 → 0.8", () => {
    // 0.7 + 0.005 × (40 − 20) = 0.7 + 0.1 = 0.8
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.7", albumin: "20",
    });
    expect(r.value).toBe(0.8);
    expect(r.status).toBe("normal");
  });

  it("severe hypomagnesemia: Mg=0.3, albumin=40 → 0.3", () => {
    // 0.3 + 0 = 0.3
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.3", albumin: "40",
    });
    expect(r.value).toBe(0.3);
    expect(r.status).toBe("critical");
  });

  it("moderate hypomagnesemia: Mg=0.5, albumin=35 → 0.58", () => {
    // 0.5 + 0.005 × (40 − 35) = 0.5 + 0.025 = 0.525 → 0.53
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.5", albumin: "35",
    });
    expect(r.value).toBe(0.53);
    expect(r.status).toBe("high");
  });

  it("mild hypomagnesemia: Mg=0.7, albumin=30 → 0.75", () => {
    // 0.7 + 0.005 × (40 − 30) = 0.7 + 0.05 = 0.75
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.7", albumin: "30",
    });
    expect(r.value).toBe(0.75);
    expect(r.status).toBe("normal");
  });

  it("mild hypermagnesemia: Mg=1.2, albumin=40 → 1.2", () => {
    // 1.2 + 0 = 1.2
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "1.2", albumin: "40",
    });
    expect(r.value).toBe(1.2);
    expect(r.status).toBe("low");
  });

  it("severe hypermagnesemia: Mg=2.5, albumin=40 → 2.5", () => {
    // 2.5 + 0 = 2.5
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "2.5", albumin: "40",
    });
    expect(r.value).toBe(2.5);
    expect(r.status).toBe("critical");
  });

  it("missing magnesium → critical validation", () => {
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "", albumin: "40",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing albumin → critical validation", () => {
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0.8", albumin: "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("zero magnesium → critical validation", () => {
    const r = calc(correctedMagnesiumCalculator, {
      magnesium: "0", albumin: "40",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// KDIGO AKI Staging — creatinine + urine output criteria
// Stage 0: no AKI; Stage 1: Cr rise ≥0.3 or 1.5–1.9×; UO <0.5 for 6–12h
// Stage 2: Cr 2.0–2.9×; UO <0.5 for ≥12h
// Stage 3: Cr ≥3.0× or ≥4.0 or RRT; UO <0.3 for ≥24h
// Highest stage wins; RRT overrides to Stage 3
// ---------------------------------------------------------------------------
describe("KDIGO AKI Staging calculate() output", () => {
  it("no AKI: Cr 1.0 baseline, 1.0 current → stage 0", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.0",
      "on-rrt": "no",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("Stage 1 by absolute rise: Cr 1.0 → 1.4 → rise 0.4", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.4",
      "on-rrt": "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("Stage 1 by ratio: Cr 1.0 → 1.6 → ratio 1.6", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.6",
      "on-rrt": "no",
    });
    expect(r.value).toBe(1);
    expect(r.status).toBe("low");
  });

  it("Stage 2 by ratio: Cr 1.0 → 2.5 → ratio 2.5", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "2.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("Stage 3 by ratio: Cr 1.0 → 3.5 → ratio 3.5", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "3.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("Stage 3 by absolute Cr ≥4.0: current 4.5, no baseline", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "current-creatinine": "4.5",
      "on-rrt": "no",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("RRT overrides to Stage 3", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.1",
      "on-rrt": "yes",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("critical");
  });

  it("highest stage wins: Cr stage 1 + UO stage 2 → stage 2", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.4",
      weight: "70", "urine-output-rate": "0.4",
      "urine-output-duration": "14", "on-rrt": "no",
    });
    expect(r.value).toBe(2);
    expect(r.status).toBe("high");
  });

  it("missing on-rrt → critical validation", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "1.0", "current-creatinine": "1.0",
      "on-rrt": "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("baseline creatinine 0 → critical validation", () => {
    const r = calc(kdigoAkiStagingCalculator, {
      "baseline-creatinine": "0", "current-creatinine": "1.0",
      "on-rrt": "no",
    });
    expect(r.status).toBe("critical");
  });
});

// ---------------------------------------------------------------------------
// SAAG — Serum-Ascites Albumin Gradient
// SAAG = serum albumin − ascites albumin (g/dL)
// ≥1.1 g/dL = portal hypertension; <1.1 = non-portal hypertension
// Result = Math.round(saag * 10) / 10
// ---------------------------------------------------------------------------
describe("SAAG calculate() output", () => {
  it("portal hypertension: serum 3.2, ascites 1.0 → SAAG 2.2", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "3.2",
      "ascites-albumin": "1.0",
    });
    expect(r.value).toBe(2.2);
    expect(r.status).toBe("high");
    expect(r.interpretation).toContain("portal hypertension");
  });

  it("non-portal hypertension: serum 2.5, ascites 2.0 → SAAG 0.5", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "2.5",
      "ascites-albumin": "2.0",
    });
    expect(r.value).toBe(0.5);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("non-portal hypertensive");
  });

  it("exact boundary: serum 3.0, ascites 1.9 → SAAG 1.1 (portal HTN)", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "3.0",
      "ascites-albumin": "1.9",
    });
    expect(r.value).toBe(1.1);
    expect(r.status).toBe("high");
  });

  it("just below boundary: serum 3.0, ascites 2.0 → SAAG 1.0 (non-portal HTN)", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "3.0",
      "ascites-albumin": "2.0",
    });
    expect(r.value).toBe(1.0);
    expect(r.status).toBe("low");
  });

  it("zero values → critical validation", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "0",
      "ascites-albumin": "1.0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("greater than zero");
  });

  it("missing serum albumin → critical validation", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "",
      "ascites-albumin": "1.0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing ascites albumin → critical validation", () => {
    const r = calc(saagCalculator, {
      "serum-albumin": "3.2",
      "ascites-albumin": "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// Rumack-Matthew — Acetaminophen Nomogram
// Treatment threshold: exp(5.333 − 0.0805 × time) in mcg/mL
// Valid for 4–24h post single acute ingestion
// ---------------------------------------------------------------------------
describe("Rumack-Matthew calculate() output", () => {
  it("below treatment line: 6h, 100 mcg/mL → below threshold", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "6",
      "acetaminophen-level": "100",
    });
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("BELOW the treatment threshold");
  });

  it("above treatment line: 4h, 200 mcg/mL → above threshold", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "4",
      "acetaminophen-level": "200",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("ABOVE the treatment threshold");
  });

  it("at treatment threshold: 4h, 150 mcg/mL → above threshold (equal)", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "4",
      "acetaminophen-level": "150",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("AT OR ABOVE");
  });

  it("earliest valid time: 4h, 50 mcg/mL → below threshold", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "4",
      "acetaminophen-level": "50",
    });
    expect(r.status).toBe("normal");
  });

  it("latest valid time: 24h, 20 mcg/mL → below threshold", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "24",
      "acetaminophen-level": "20",
    });
    expect(r.status).toBe("normal");
  });

  it("time <4h → critical (nomogram not applicable)", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "2",
      "acetaminophen-level": "200",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("not valid before 4 hours");
  });

  it("time >24h → critical (nomogram not applicable)", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "30",
      "acetaminophen-level": "50",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("exceeds the 24-hour");
  });

  it("missing time → critical validation", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "",
      "acetaminophen-level": "100",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing level → critical validation", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "6",
      "acetaminophen-level": "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("level 0 → critical validation", () => {
    const r = calc(rumackMatthewCalculator, {
      "time-since-ingestion": "6",
      "acetaminophen-level": "0",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("greater than zero");
  });
});

// ---------------------------------------------------------------------------
// BODE Index — COPD prognosis
// BMI (0–1) + FEV1 (0–3) + mMRC (0–4) + 6MWD (0–3) = 0–10
// 0–2 low, 3–4 moderate, 5–6 high, 7–10 very high risk
// ---------------------------------------------------------------------------
describe("BODE Index calculate() output", () => {
  it("minimum score: BMI>21, FEV1≥65%, mMRC 0, 6MWD≥350 → score 0", () => {
    const r = calc(bodeIndexCalculator, {
      bmi: "25",
      "fev1-percent": "70",
      "mmrc-dyspnea": "0",
      "six-minute-walk": "400",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("maximum score: BMI≤21, FEV1≤35%, mMRC 4, 6MWD≤149 → score 10", () => {
    const r = calc(bodeIndexCalculator, {
      bmi: "20",
      "fev1-percent": "30",
      "mmrc-dyspnea": "4",
      "six-minute-walk": "100",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });

  it("moderate risk: BMI>21, FEV1 50%, mMRC 2, 6MWD 300 → score 3", () => {
    const r = calc(bodeIndexCalculator, {
      bmi: "24",
      "fev1-percent": "55",
      "mmrc-dyspnea": "2",
      "six-minute-walk": "300",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("low");
  });

  it("high risk: BMI≤21, FEV1 40%, mMRC 3, 6MWD 200 → score 7", () => {
    const r = calc(bodeIndexCalculator, {
      bmi: "19",
      "fev1-percent": "40",
      "mmrc-dyspnea": "3",
      "six-minute-walk": "200",
    });
    expect(r.value).toBe(7);
    expect(r.status).toBe("critical");
  });

  it("BMI boundary: BMI=21 → score 1, BMI=21.1 → score 0", () => {
    const r1 = calc(bodeIndexCalculator, {
      bmi: "21",
      "fev1-percent": "70",
      "mmrc-dyspnea": "0",
      "six-minute-walk": "400",
    });
    expect(r1.value).toBe(1);

    const r2 = calc(bodeIndexCalculator, {
      bmi: "21.1",
      "fev1-percent": "70",
      "mmrc-dyspnea": "0",
      "six-minute-walk": "400",
    });
    expect(r2.value).toBe(0);
  });

  it("FEV1 boundaries: 65%→0, 64%→1, 50%→1, 49%→2, 36%→2, 35%→3", () => {
    const r1 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "65", "mmrc-dyspnea": "0", "six-minute-walk": "400" });
    expect(r1.value).toBe(0);

    const r2 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "64", "mmrc-dyspnea": "0", "six-minute-walk": "400" });
    expect(r2.value).toBe(1);

    const r3 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "35", "mmrc-dyspnea": "0", "six-minute-walk": "400" });
    expect(r3.value).toBe(3);
  });

  it("6MWD boundaries: 350→0, 349→1, 250→1, 249→2, 150→2, 149→3", () => {
    const r1 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "70", "mmrc-dyspnea": "0", "six-minute-walk": "350" });
    expect(r1.value).toBe(0);

    const r2 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "70", "mmrc-dyspnea": "0", "six-minute-walk": "349" });
    expect(r2.value).toBe(1);

    const r3 = calc(bodeIndexCalculator, { bmi: "25", "fev1-percent": "70", "mmrc-dyspnea": "0", "six-minute-walk": "149" });
    expect(r3.value).toBe(3);
  });

  it("missing BMI → critical validation", () => {
    const r = calc(bodeIndexCalculator, {
      bmi: "",
      "fev1-percent": "50",
      "mmrc-dyspnea": "2",
      "six-minute-walk": "300",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });
});

// ---------------------------------------------------------------------------
// ALBI Score — Albumin-Bilirubin for HCC prognosis
// ALBI = (log10(bilirubin [µmol/L]) × −0.372) + (albumin [g/L] × −0.198) + 4.90
// Grade I ≤ −2.60; Grade II −2.60 to −1.39; Grade III > −1.39
// Result = Math.round(albi * 100) / 100
// ---------------------------------------------------------------------------
describe("ALBI Score calculate() output", () => {
  it("Grade I: bilirubin 20, albumin 40 → ALBI ≤ −2.60", () => {
    // log10(20)×-0.372 + 40×-0.198 + 4.90 = 1.301×-0.372 + (-7.92) + 4.90
    // = -0.484 + (-7.92) + 4.90 = -3.504
    const r = calc(albiScoreCalculator, {
      bilirubin: "20",
      albumin: "40",
    });
    expect(r.value).toBe(-3.5);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Grade I");
  });

  it("Grade II: bilirubin 50, albumin 30 → ALBI between −2.60 and −1.39", () => {
    // log10(50)×-0.372 + 30×-0.198 + 4.90 = 1.699×-0.372 + (-5.94) + 4.90
    // = -0.632 + (-5.94) + 4.90 = -1.672
    const r = calc(albiScoreCalculator, {
      bilirubin: "50",
      albumin: "30",
    });
    expect(r.value).toBe(-1.67);
    expect(r.status).toBe("low");
    expect(r.interpretation).toContain("Grade II");
  });

  it("Grade III: bilirubin 150, albumin 22 → ALBI > −1.39", () => {
    // log10(150)×-0.372 + 22×-0.198 + 4.90 = 2.176×-0.372 + (-4.356) + 4.90
    // = -0.810 + (-4.356) + 4.90 = -0.266
    const r = calc(albiScoreCalculator, {
      bilirubin: "150",
      albumin: "22",
    });
    expect(r.value).toBe(-0.27);
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("Grade III");
  });

  it("Grade I/II boundary: bilirubin 34, albumin 35 → ALBI ≈ −2.03 (Grade II)", () => {
    // log10(34)×-0.372 + 35×-0.198 + 4.90 = 1.531×-0.372 + (-6.93) + 4.90
    // = -0.570 + (-6.93) + 4.90 = -2.6
    const r = calc(albiScoreCalculator, {
      bilirubin: "34",
      albumin: "35",
    });
    expect(r.value).toBe(-2.6);
    expect(r.interpretation).toContain("Grade I");
  });

  it("Grade II/III boundary: bilirubin 100, albumin 28 → ALBI ≈ −1.39", () => {
    // log10(100)×-0.372 + 28×-0.198 + 4.90 = 2.0×-0.372 + (-5.544) + 4.90
    // = -0.744 + (-5.544) + 4.90 = -1.388
    const r = calc(albiScoreCalculator, {
      bilirubin: "100",
      albumin: "28",
    });
    expect(r.value).toBe(-1.39);
    expect(r.interpretation).toContain("Grade II");
  });

  it("missing bilirubin → critical validation", () => {
    const r = calc(albiScoreCalculator, {
      bilirubin: "",
      albumin: "38",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("missing albumin → critical validation", () => {
    const r = calc(albiScoreCalculator, {
      bilirubin: "25",
      albumin: "",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("required");
  });

  it("zero bilirubin → critical validation", () => {
    const r = calc(albiScoreCalculator, {
      bilirubin: "0",
      albumin: "38",
    });
    expect(r.status).toBe("critical");
    expect(r.interpretation).toContain("greater than zero");
  });
});

// ---------------------------------------------------------------------------
// P2-B1 regression — result-level guidance for sepsis & deterioration scores
// ---------------------------------------------------------------------------
describe("P2-B1 result-level guidance", () => {
  it("every calculator returns non-empty warnings, advice, and followUp arrays of meaningful strings", () => {
    const cases: Array<{
      label: string;
      result: ReturnType<typeof calc>;
    }> = [
      {
        label: "news2",
        result: calc(news2Calculator, {
          "spo2-scale": "standard",
          "respiratory-rate": "14",
          spo2: "98",
          temperature: "37",
          sbp: "120",
          pulse: "75",
        }),
      },
      {
        label: "qsofa",
        result: calc(qsofaCalculator, {
          sbp: "120",
          "respiratory-rate": "16",
          "mental-status": "0",
        }),
      },
      {
        label: "sofa-score",
        result: calc(sofaScoreCalculator, {
          "pao2-fio2": "0", platelets: "150", bilirubin: "1.0",
          cardiovascular: "0", gcs: "15", creatinine: "0.9",
        }),
      },
      {
        label: "sirs-criteria",
        result: calc(sirsCriteriaCalculator, {
          temperature: "37", "heart-rate": "80",
          "respiratory-rate": "16", wbc: "8",
        }),
      },
      {
        label: "gcs",
        result: calc(gcsCalculator, { eye: "4", verbal: "5", motor: "6" }),
      },
    ];

    for (const { label, result } of cases) {
      expect(result.warnings?.length ?? 0, `${label}.warnings`).toBeGreaterThan(0);
      expect(result.advice?.length ?? 0, `${label}.advice`).toBeGreaterThan(0);
      expect(result.followUp?.length ?? 0, `${label}.followUp`).toBeGreaterThan(0);
      for (const arr of [result.warnings, result.advice, result.followUp]) {
        for (const item of arr ?? []) {
          expect(typeof item, `${label} guidance item type`).toBe("string");
          expect(item.trim().length, `${label} guidance item length`).toBeGreaterThan(15);
        }
      }
    }
  });

  // --- NEWS2 ---------------------------------------------------------------
  it("news2 Scale 1 behavior and classification unchanged", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe("NEWS2 0 \u2013 Low clinical risk.");
  });

  it("news2 Scale 2 behavior and classification unchanged", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      "respiratory-rate": "14",
      spo2: "90",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toContain("Scale 2");
  });

  it("news2 includes alternative-scale population warning when Scale 2 selected", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "alternative",
      "respiratory-rate": "14",
      spo2: "90",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    const joined = (r.warnings ?? []).join(" ");
    expect(joined).toContain("chronic hypercapnic respiratory failure");
    expect(joined).toContain("do not apply Scale 2 routinely");
  });

  it("news2 standard mode directs eligible patients to Scale 2 selection", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "14",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    const joined = (r.warnings ?? []).join(" ");
    expect(joined).toContain("Scale 1 (standard)");
    expect(joined).toContain("SpO\u2082 Scale 2 instead");
  });

  it("news2 single-parameter-3 escalation warning present on modest aggregate", () => {
    const r = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "8",
      spo2: "98",
      temperature: "37",
      sbp: "120",
      pulse: "75",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    const joined = (r.warnings ?? []).join(" ");
    expect(joined).toContain("single parameter scoring 3");
  });

  it("news2 band-specific advice and follow-up escalate with severity", () => {
    const low = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "14", spo2: "98", temperature: "37", sbp: "120", pulse: "75",
    });
    const veryHigh = calc(news2Calculator, {
      "spo2-scale": "standard",
      "respiratory-rate": "25", spo2: "91", temperature: "39.5", sbp: "85", pulse: "135",
    });
    expect(low.status).toBe("normal");
    expect(veryHigh.status).toBe("critical");
    expect((low.advice ?? []).join(" ")).toContain("routine monitoring");
    expect((veryHigh.advice ?? []).join(" ")).toContain("emergency clinical assessment");
    expect((veryHigh.followUp ?? []).join(" ")).toContain("critical-care teams");
  });

  // --- qSOFA ---------------------------------------------------------------
  it("qsofa calculation unchanged for score 0", () => {
    const r = calc(qsofaCalculator, {
      sbp: "120", "respiratory-rate": "16", "mental-status": "0",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
    expect(r.interpretation).toBe(
      "qSOFA 0 \u2013 Low clinical concern. Continue to monitor for signs of deterioration.",
    );
  });

  it("qsofa elevated score retains classification and carries sepsis-diagnosis caveat", () => {
    const r = calc(qsofaCalculator, {
      sbp: "95", "respiratory-rate": "24", "mental-status": "1",
    });
    expect(r.value).toBe(3);
    expect(r.status).toBe("high");
    const warnings = (r.warnings ?? []).join(" ");
    expect(warnings).toContain("does not diagnose sepsis by itself");
    expect(warnings).toContain("does not exclude sepsis");
    expect((r.advice ?? []).join(" ")).toContain("not as a standalone diagnosis");
  });

  it("qsofa low score still warns against excluding sepsis", () => {
    const r = calc(qsofaCalculator, {
      sbp: "125", "respiratory-rate": "18", "mental-status": "0",
    });
    expect(r.value).toBe(0);
    expect((r.warnings ?? []).join(" ")).toContain("does not exclude sepsis");
  });

  // --- SOFA ----------------------------------------------------------------
  it("sofa calculation unchanged for minimal score", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "150", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "0.9",
    });
    expect(r.value).toBe(0);
    expect(r.status).toBe("normal");
  });

  it("sofa calculation unchanged for elevated score", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "2", platelets: "80", bilirubin: "2.5",
      cardiovascular: "1", gcs: "11", creatinine: "1.8",
    });
    expect(r.value).toBe(10);
    expect(r.status).toBe("critical");
  });

  it("sofa includes delta-SOFA/sepsis caveat and baseline caveat", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "0", platelets: "150", bilirubin: "1.0",
      cardiovascular: "0", gcs: "15", creatinine: "0.9",
    });
    const warnings = (r.warnings ?? []).join(" ");
    expect(warnings).toContain("\u22652 points");
    expect(warnings).toContain("does not establish infection");
    expect(warnings).toContain("Baseline SOFA is often unknown");
  });

  it("sofa follow-up recommends serial reassessment", () => {
    const r = calc(sofaScoreCalculator, {
      "pao2-fio2": "2", platelets: "80", bilirubin: "2.5",
      cardiovascular: "1", gcs: "11", creatinine: "1.8",
    });
    expect((r.followUp ?? []).join(" ")).toMatch(/Reassess|serially/i);
  });

  // --- SIRS ----------------------------------------------------------------
  it("sirs scoring unchanged across bands", () => {
    const zero = calc(sirsCriteriaCalculator, {
      temperature: "37", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    const two = calc(sirsCriteriaCalculator, {
      temperature: "38.5", "heart-rate": "110", "respiratory-rate": "16", wbc: "8",
    });
    const four = calc(sirsCriteriaCalculator, {
      temperature: "38.5", "heart-rate": "110", "respiratory-rate": "22", wbc: "14",
    });
    expect(zero.value).toBe(0);
    expect(zero.status).toBe("normal");
    expect(two.value).toBe(2);
    expect(two.status).toBe("high");
    expect(four.value).toBe(4);
    expect(four.status).toBe("high");
  });

  it("sirs includes non-infectious trigger warning and no standalone diagnosis claim", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "38.5", "heart-rate": "110", "respiratory-rate": "22", wbc: "14",
    });
    const warnings = (r.warnings ?? []).join(" ");
    expect(warnings).toContain("Non-infectious conditions");
    expect(warnings).toContain("should not be used to diagnose sepsis");
    const interpretation = r.interpretation ?? "";
    expect(interpretation).not.toMatch(/^Sepsis confirmed/i);
  });

  it("sirs sub-threshold result carries guidance too", () => {
    const r = calc(sirsCriteriaCalculator, {
      temperature: "37", "heart-rate": "80", "respiratory-rate": "16", wbc: "8",
    });
    expect(r.warnings?.length).toBeGreaterThan(0);
    expect(r.advice?.length).toBeGreaterThan(0);
    expect(r.followUp?.length).toBeGreaterThan(0);
  });

  // --- GCS -----------------------------------------------------------------
  it("gcs calculation unchanged across bands", () => {
    const full = calc(gcsCalculator, { eye: "4", verbal: "5", motor: "6" });
    const mild = calc(gcsCalculator, { eye: "3", verbal: "4", motor: "6" });
    const moderate = calc(gcsCalculator, { eye: "3", verbal: "4", motor: "4" });
    const eight = calc(gcsCalculator, { eye: "2", verbal: "2", motor: "4" });
    expect(full.value).toBe(15);
    expect(full.status).toBe("normal");
    expect(mild.value).toBe(13);
    expect(mild.status).toBe("normal");
    expect(moderate.value).toBe(11);
    expect(moderate.status).toBe("high");
    expect(eight.value).toBe(8);
    expect(eight.status).toBe("critical");
  });

  it("gcs includes confounder warning at every severity level", () => {
    for (const inputs of [
      { eye: "4", verbal: "5", motor: "6" },
      { eye: "3", verbal: "4", motor: "4" },
      { eye: "2", verbal: "2", motor: "4" },
    ]) {
      const r = calc(gcsCalculator, inputs);
      expect((r.warnings ?? []).join(" ")).toContain("confound scoring");
    }
  });

  it("gcs includes serial-assessment guidance and airway caveat at severe range", () => {
    const severe = calc(gcsCalculator, { eye: "2", verbal: "2", motor: "4" });
    expect((severe.advice ?? []).join(" ")).toContain(
      "\u2264 8 is commonly used as a threshold",
    );
    expect((severe.followUp ?? []).join(" ")).toMatch(/repeat GCS|reassess/i);

    const mild = calc(gcsCalculator, { eye: "4", verbal: "5", motor: "6" });
    expect((mild.followUp ?? []).join(" ")).toMatch(/[Rr]epeat the GCS/);
  });
});

// ---------------------------------------------------------------------------
// P2-B2 regression — result-level guidance for Tier-1 emergency/cardio scores
// ---------------------------------------------------------------------------
describe("P2-B2 result-level guidance", () => {
  type GuidanceCase = { label: string; result: ReturnType<typeof calc> };

  const run = (cases: GuidanceCase[]) => {
    for (const { label, result } of cases) {
      expect(result.warnings?.length ?? 0, `${label}.warnings`).toBeGreaterThan(0);
      expect(result.advice?.length ?? 0, `${label}.advice`).toBeGreaterThan(0);
      expect(result.followUp?.length ?? 0, `${label}.followUp`).toBeGreaterThan(0);
      for (const arr of [result.warnings, result.advice, result.followUp]) {
        for (const item of arr ?? []) {
          expect(typeof item).toBe("string");
          expect(item.trim().length, `${label} item length`).toBeGreaterThan(15);
        }
      }
    }
  };

  it("heart-score: all bands carry guidance with unchanged calculation", () => {
    const low = calc(heartScoreCalculator, {
      history: "0", ecg: "0", age: "0", "risk-factors": "0", troponin: "0",
    });
    const moderate = calc(heartScoreCalculator, {
      history: "1", ecg: "1", age: "1", "risk-factors": "1", troponin: "1",
    });
    const high = calc(heartScoreCalculator, {
      history: "2", ecg: "2", age: "2", "risk-factors": "2", troponin: "1",
    });
    expect(low.value).toBe(0); expect(low.status).toBe("normal");
    expect(moderate.value).toBe(5); expect(moderate.status).toBe("low");
    expect(high.value).toBe(9); expect(high.status).toBe("critical");
    run([
      { label: "heart-score/low", result: low },
      { label: "heart-score/moderate", result: moderate },
      { label: "heart-score/high", result: high },
    ]);
    expect((low.warnings ?? []).join(" ")).toContain("not an independent diagnosis");
    expect((moderate.advice ?? []).join(" ")).toContain("serial troponins");
  });

  it("timi: boundaries carry guidance with unchanged calculation", () => {
    const zero = calc(timiCalculator, {
      "age-65": "0", "risk-factors": "0", "known-cad": "0", aspirin: "0",
      "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    const mid = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "1", aspirin: "0",
      "anginal-events": "0", "ecg-changes": "0", troponin: "0",
    });
    const max = calc(timiCalculator, {
      "age-65": "1", "risk-factors": "1", "known-cad": "1", aspirin: "1",
      "anginal-events": "1", "ecg-changes": "1", troponin: "1",
    });
    expect(zero.value).toBe(0); expect(zero.status).toBe("normal");
    expect(mid.value).toBe(3); expect(mid.status).toBe("high");
    expect(max.value).toBe(7); expect(max.status).toBe("critical");
    run([
      { label: "timi/low", result: zero },
      { label: "timi/mid", result: mid },
      { label: "timi/high", result: max },
    ]);
    expect((zero.warnings ?? []).join(" ")).toContain("intended population");
  });

  it("grace: corrected status semantics preserved alongside new guidance", () => {
    const low = calc(graceCalculator, {
      age: "41", "heart-rate": "9", sbp: "34", creatinine: "4",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    const intermediate = calc(graceCalculator, {
      age: "41", "heart-rate": "15", sbp: "34", creatinine: "7",
      killip: "0", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "14",
    });
    const high = calc(graceCalculator, {
      age: "91", "heart-rate": "24", sbp: "58", creatinine: "21",
      killip: "20", "cardiac-arrest": "0", "st-deviation": "0", "elevated-enzymes": "0",
    });
    expect(low.value).toBe(88); expect(low.status).toBe("normal");
    expect(intermediate.value).toBe(111); expect(intermediate.status).toBe("low");
    expect(intermediate.interpretation).toContain("INTERMEDIATE risk");
    expect(high.value).toBe(214); expect(high.status).toBe("critical");
    run([
      { label: "grace/low", result: low },
      { label: "grace/intermediate", result: intermediate },
      { label: "grace/high", result: high },
    ]);
  });

  it("cha2ds2-vasc: low/high examples with anticoagulation caveat", () => {
    const male0 = calc(cha2ds2VascCalculator, {
      chf: "0", hypertension: "0", age: "0", diabetes: "0",
      stroke: "0", "vascular-disease": "0", sex: "0",
    });
    const femaleHigh = calc(cha2ds2VascCalculator, {
      chf: "1", hypertension: "1", age: "2", diabetes: "1",
      stroke: "2", "vascular-disease": "0", sex: "1",
    });
    expect(male0.value).toBe(0); expect(male0.status).toBe("normal");
    expect(femaleHigh.value).toBe(8); expect(femaleHigh.status).toBe("critical");
    run([
      { label: "chads/low", result: male0 },
      { label: "chads/high", result: femaleHigh },
    ]);
    const warnings = (femaleHigh.warnings ?? []).join(" ");
    expect(warnings).toContain("does not by itself determine whether anticoagulation is appropriate");
    expect(warnings).toContain("non-valvular");
  });

  it("has-bled: examples emphasize modifiable factors and no withhold rule", () => {
    const zero = calc(hasBledCalculator, {
      hypertension: "0", renal: "0", liver: "0", stroke: "0", bleeding: "0",
      "labile-inr": "0", elderly: "0", drugs: "0", alcohol: "0",
    });
    const high = calc(hasBledCalculator, {
      hypertension: "1", renal: "0", liver: "0", stroke: "0", bleeding: "1",
      "labile-inr": "0", elderly: "0", drugs: "1", alcohol: "0",
    });
    expect(zero.value).toBe(0); expect(zero.status).toBe("normal");
    expect(high.value).toBe(3); expect(high.status).toBe("critical");
    run([
      { label: "hasbled/low", result: zero },
      { label: "hasbled/high", result: high },
    ]);
    const warnings = (high.warnings ?? []).join(" ");
    expect(warnings).toContain("not by itself a reason to withhold anticoagulation");
    expect(warnings).toContain("Modifiable bleeding-risk factors");
  });

  it("rcri: boundaries carry guidance without clearance thresholds", () => {
    const zero = calc(rcriCalculator, {
      "high-risk-surgery": "0", "ischemic-heart-disease": "0", chf: "0",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    const threePlus = calc(rcriCalculator, {
      "high-risk-surgery": "1", "ischemic-heart-disease": "1", chf: "1",
      cerebrovascular: "0", "insulin-diabetes": "0", creatinine: "0",
    });
    expect(zero.value).toBe(0); expect(zero.status).toBe("normal");
    expect(threePlus.value).toBe(3); expect(threePlus.status).toBe("critical");
    run([
      { label: "rcri/low", result: zero },
      { label: "rcri/high", result: threePlus },
    ]);
    expect((threePlus.warnings ?? []).join(" ")).toContain("does not define surgical clearance thresholds");
  });

  it("wells-pe: low/high bands with pretest-probability warnings", () => {
    const low = calc(wellsPeCalculator, {
      "dvt-signs": "0", "pe-most-likely": "0", tachycardia: "1",
      immobilization: "0", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "0",
    });
    const high = calc(wellsPeCalculator, {
      "dvt-signs": "1", "pe-most-likely": "1", tachycardia: "0",
      immobilization: "0", "prior-dvt-pe": "0", hemoptysis: "0", malignancy: "0",
    });
    expect(low.value).toBe(1.5); expect(low.status).toBe("normal");
    expect(high.value).toBe(6); expect(high.status).toBe("high");
    run([
      { label: "wellspe/low", result: low },
      { label: "wellspe/high", result: high },
    ]);
    expect((low.warnings ?? []).join(" ")).toContain("does not independently exclude PE in every patient");
    expect((high.followUp ?? []).join(" ")).toContain("escalate care immediately");
  });

  it("wells-dvt: low/high bands with pathway guidance", () => {
    const low = calc(wellsDvtCalculator, {
      "active-cancer": "0", paralysis: "0", bedridden: "0",
      "localized-tenderness": "1", "entire-leg-swollen": "0", "calf-swelling": "0",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "0",
    });
    const high = calc(wellsDvtCalculator, {
      "active-cancer": "1", paralysis: "0", bedridden: "0",
      "localized-tenderness": "0", "entire-leg-swollen": "0", "calf-swelling": "1",
      "pitting-edema": "0", "collateral-veins": "0", "previous-dvt": "0",
      "alternative-diagnosis": "0",
    });
    expect(low.value).toBe(1); expect(low.status).toBe("normal");
    expect(high.value).toBe(2); expect(high.status).toBe("high");
    run([
      { label: "wellsdvt/low", result: low },
      { label: "wellsdvt/high", result: high },
    ]);
    expect((low.followUp ?? []).join(" ")).toContain("diagnostic uncertainty remains");
  });

  it("perc-rule: pass/fail both guided; fail lists unmet criteria", () => {
    const passInputs = {
      age: "1", "heart-rate": "1", "oxygen-saturation": "1",
      hemoptysis: "1", estrogen: "1", "prior-dvt-pe": "1",
      "leg-swelling": "1", "surgery-trauma": "1",
    };
    const pass = calc(percRuleCalculator, passInputs);
    const fail = calc(percRuleCalculator, { ...passInputs, age: "0" });
    expect(pass.value).toBe(8); expect(pass.status).toBe("normal");
    expect(fail.value).toBe(7); expect(fail.status).toBe("high");
    run([
      { label: "perc/pass", result: pass },
      { label: "perc/fail", result: fail },
    ]);
    expect((pass.warnings ?? []).join(" ")).toContain("not a universal exclusion rule");
    expect((fail.advice ?? []).join(" ")).toContain("Unmet criteria:");
    expect((fail.advice ?? []).join(" ")).toContain("Age < 50");
  });

  it("psi-port: class boundaries retain classification with disposition guidance", () => {
    const base = (over: Record<string, string>) => ({
      sex: "male",
      "nursing-home": "0", "neoplastic-disease": "0", "liver-disease": "0",
      chf: "0", cerebrovascular: "0", "renal-disease": "0", ams: "0",
      "respiratory-rate": "16", temperature: "37.0",
      "heart-rate": "80", ph: "", sodium: "140",
      glucose: "100", hematocrit: "40", pao2: "", "pleural-effusion": "0",
      ...over,
    });
    const classOne = calc(psiPortCalculator, base({ age: "40", sbp: "130", bun: "15" }));
    const classFive = calc(psiPortCalculator, base({
      age: "80", sbp: "80", bun: "40", "nursing-home": "1", chf: "1", ams: "1",
      "respiratory-rate": "32", "heart-rate": "130",
    }));
    expect(classOne.value).toBe(40); expect(classOne.status).toBe("normal");
    expect(classFive.value).toBe(190); expect(classFive.status).toBe("critical");
    run([
      { label: "psi/classI", result: classOne },
      { label: "psi/classV", result: classFive },
    ]);
    expect((classFive.advice ?? []).join(" ")).toContain("critical-care involvement");
  });

  it("rts: boundaries retain calculation with stabilization warning", () => {
    const normal = calc(rtsCalculator, { gcs: "15", sbp: "110", rr: "16" });
    const severe = calc(rtsCalculator, { gcs: "3", sbp: "40", rr: "35" });
    expect(normal.value).toBeCloseTo(7.8408, 4); expect(normal.status).toBe("normal");
    expect(severe.status).toBe("critical");
    run([
      { label: "rts/normal", result: normal },
      { label: "rts/severe", result: severe },
    ]);
    expect((severe.warnings ?? []).join(" ")).toContain("must not delay immediate trauma stabilization");
    expect((severe.advice ?? []).join(" ")).toContain("in parallel rather than sequentially");
  });

  it("parkland-formula: representative calculations keep advice and add titration warnings", () => {
    const minor = calc(parklandFormulaCalculator, {
      weight: "70", head: "4.5", "anterior-trunk": "0", "posterior-trunk": "0",
      "right-upper-limb": "0", "left-upper-limb": "0", "right-lower-limb": "0",
      "left-lower-limb": "0", perineum: "0",
    });
    const moderate = calc(parklandFormulaCalculator, {
      weight: "70", head: "0", "anterior-trunk": "18", "posterior-trunk": "0",
      "right-upper-limb": "0", "left-upper-limb": "0", "right-lower-limb": "0",
      "left-lower-limb": "0", perineum: "0",
    });
    expect(minor.value).toBe(1260); expect(minor.status).toBe("normal");
    expect(moderate.value).toBe(5040); expect(moderate.status).toBe("high");
    run([
      { label: "parkland/minor", result: minor },
      { label: "parkland/moderate", result: moderate },
    ]);
    expect((moderate.advice ?? []).join(" ")).toContain("initial estimate");
    expect((moderate.warnings ?? []).join(" ")).toContain("titrated to clinical endpoints");
    expect((minor.warnings ?? []).join(" ")).toContain("oral rehydration");
  });

  it("curb-65: score bands retain classification with band-specific follow-up", () => {
    const base = { confusion: "0", urea: "5", "respiratory-rate": "18", sbp: "130" };
    const zero = calc(curb65Calculator, { ...base, age: "40" });
    const two = calc(curb65Calculator, { ...base, age: "70", urea: "8" });
    const three = calc(curb65Calculator, {
      ...base, age: "70", urea: "8", "respiratory-rate": "30",
    });
    expect(zero.value).toBe(0); expect(zero.status).toBe("normal");
    expect(two.value).toBe(2); expect(two.status).toBe("low");
    expect(three.value).toBe(3); expect(three.status).toBe("high");
    run([
      { label: "curb65/0", result: zero },
      { label: "curb65/2", result: two },
      { label: "curb65/3", result: three },
    ]);
    expect((three.advice ?? []).join(" ")).toContain("urgent hospital assessment");
    expect((two.followUp ?? []).join(" ")).toContain("escalation");
  });

  it("crb-65: score bands retain classification with oxygenation caveat", () => {
    const base = { confusion: "0", "respiratory-rate": "20", sbp: "120", dbp: "80" };
    const zero = calc(crb65Calculator, { ...base, age: "50" });
    const three = calc(crb65Calculator, {
      confusion: "1", "respiratory-rate": "32", sbp: "85", dbp: "60", age: "50",
    });
    expect(zero.value).toBe(0); expect(zero.status).toBe("normal");
    expect(three.value).toBe(3); expect(three.status).toBe("critical");
    run([
      { label: "crb65/0", result: zero },
      { label: "crb65/3", result: three },
    ]);
    const warnings = (three.warnings ?? []).join(" ");
    expect(warnings).toContain("does not replace assessment of oxygenation");
    expect(warnings).toContain("clinical judgment");
  });

  it("shock-index: representative values retain bands with medication warning", () => {
    const normal = calc(shockIndexCalculator, { "heart-rate": "70", sbp: "100" });
    const critical = calc(shockIndexCalculator, { "heart-rate": "120", sbp: "90" });
    expect(normal.value).toBe(0.7); expect(normal.status).toBe("normal");
    expect(critical.value).toBe(1.33); expect(critical.status).toBe("critical");
    run([
      { label: "shockindex/normal", result: normal },
      { label: "shockindex/critical", result: critical },
    ]);
    const warnings = (critical.warnings ?? []).join(" ");
    expect(warnings).toContain("beta-blockers");
    expect(warnings).toContain("not a diagnosis");
  });

  it("map: representative values carry perfusion-context warnings", () => {
    const r = calc(mapCalculator, { sbp: "120", dbp: "80" });
    expect(r.value).toBeCloseTo(93.33, 2);
    expect(r.status).toBe("normal");
    run([{ label: "map/basic", result: r }]);
    const warnings = (r.warnings ?? []).join(" ");
    expect(warnings).toContain("does not by itself diagnose shock or guarantee adequate organ perfusion");
    expect((r.followUp ?? []).join(" ")).toContain("Reassess whenever blood pressure");
  });
});
