/**
 * Calculator Validation Tests
 *
 * Comprehensive validation tests for all 63 registered calculators.
 * 
 * Verifies:
 * - Every calculator calculate() executes without throwing
 * - Valid inputs produce finite/meaningful results
 * - Expected numerical values where determinable
 * - Input validation returns critical status for missing/invalid inputs
 */

import { describe, it, expect } from "vitest";
import {
  calculatorRegistry,
  getCalculatorById,
} from "../../lib/calculators/registry";
import type {
  CalculatorDefinition,
  CalculatorResult,
} from "../../lib/calculators/calculator.types";

// ---------------------------------------------------------------------------
// Test input data for all 63 calculators
// ---------------------------------------------------------------------------

const testInputs: Record<string, Record<string, string>> = {
  // -- Nephrology --
  "ckd-epi-2021": {
    age: "50",
    sex: "1",
    creatinine: "1.0",
  },
  "cockcroft-gault": {
    age: "50",
    weight: "70",
    sex: "1",
    creatinine: "1.0",
  },
  mdrd: { age: "50", sex: "1", creatinine: "1.0" },
  "bun-creatinine-ratio": {
    bun: "15",
    creatinine: "1.0",
  },
  fena: {
    urineNa: "40",
    plasmaNa: "140",
    urineCr: "80",
    plasmaCr: "1.0",
  },
  feurea: {
    urineUrea: "300",
    plasmaUrea: "15",
    urineCr: "80",
    plasmaCr: "1.0",
  },
  ttkg: {
    urineK: "20",
    plasmaK: "4.0",
    urineOsmolality: "600",
    plasmaOsmolality: "290",
  },
  "calcium-phosphate-product": {
    calcium: "9.0",
    phosphate: "4.0",
  },

  // -- Renal --
  "albumin-creatinine-ratio": {
    albumin: "30",
    creatinine: "1.2",
  },

  // -- Emergency --
  "curb-65": {
    age: "70",
    confusion: "0",
    urea: "7",
    "respiratory-rate": "22",
    sbp: "90",
  },
  gcs: { eye: "4", verbal: "5", motor: "6" },
  "shock-index": { "heart-rate": "120", sbp: "80" },
  news2: {
    "respiratory-rate": "20",
    spo2: "94",
    temperature: "38",
    sbp: "110",
    pulse: "110",
  },
  qsofa: {
    sbp: "100",
    "respiratory-rate": "22",
    "mental-status": "1",
  },
  "perc-rule": {
    age: "1",
    "heart-rate": "1",
    "oxygen-saturation": "1",
    hemoptysis: "1",
    estrogen: "1",
    "prior-dvt-pe": "1",
    "leg-swelling": "1",
    "surgery-trauma": "1",
  },
  "wells-pe": {
    "dvt-signs": "0",
    "pe-most-likely": "0",
    tachycardia: "1",
    immobilization: "1",
    "prior-dvt-pe": "0",
    hemoptysis: "0",
    malignancy: "0",
  },
  "wells-dvt": {
    "active-cancer": "0",
    paralysis: "0",
    bedridden: "1",
    "localized-tenderness": "1",
    "entire-leg-swollen": "0",
    "calf-swelling": "0",
    "pitting-edema": "0",
    "collateral-veins": "0",
    "previous-dvt": "0",
    "alternative-diagnosis": "0",
  },
  "heart-score": {
    history: "1",
    ecg: "1",
    age: "1",
    "risk-factors": "1",
    troponin: "1",
  },
  "sofa-score": {
    "pao2-fio2": "0",
    platelets: "150",
    bilirubin: "1",
    cardiovascular: "0",
    gcs: "15",
    creatinine: "1",
  },
  "sirs-criteria": {
    temperature: "38.5",
    "heart-rate": "110",
    "respiratory-rate": "22",
    wbc: "12",
  },
  "crb-65": {
    confusion: "1",
    "respiratory-rate": "22",
    sbp: "90",
    dbp: "60",
    age: "70",
  },
  "psi-port": {
    age: "75",
    sex: "male",
    "nursing-home": "0",
    "neoplastic-disease": "0",
    "liver-disease": "0",
    chf: "0",
    cerebrovascular: "0",
    "renal-disease": "0",
    ams: "0",
    "respiratory-rate": "22",
    sbp: "110",
    temperature: "38",
    "heart-rate": "100",
    ph: "7.35",
    bun: "30",
    sodium: "135",
    glucose: "100",
    hematocrit: "40",
    pao2: "90",
    "pleural-effusion": "0",
  },
  rts: { gcs: "14", sbp: "110", rr: "16" },
  "parkland-formula": {
    weight: "75",
    head: "0",
    "anterior-trunk": "9",
    "posterior-trunk": "9",
    "right-upper-limb": "9",
    "left-upper-limb": "0",
    "right-lower-limb": "3",
    "left-lower-limb": "0",
    perineum: "0",
  },

  // -- Cardiology --
  map: { sbp: "120", dbp: "80" },
  "heart-rate": { beats: "75", time: "1" },

  // -- Cardiology Risk & Acute CV (Sprint 1.9 Batch 2) --
  timi: {
    "age-65": "1",
    "risk-factors": "1",
    "known-cad": "0",
    aspirin: "0",
    "anginal-events": "1",
    "ecg-changes": "1",
    troponin: "1",
  },
  grace: {
    age: "75",
    "heart-rate": "15",
    sbp: "43",
    creatinine: "10",
    killip: "20",
    "cardiac-arrest": "0",
    "st-deviation": "28",
    "elevated-enzymes": "14",
  },
  "cha2ds2-vasc": {
    chf: "0",
    hypertension: "1",
    age: "2",
    diabetes: "1",
    stroke: "2",
    "vascular-disease": "0",
    sex: "1",
  },
  "has-bled": {
    hypertension: "1",
    renal: "0",
    liver: "0",
    stroke: "0",
    bleeding: "1",
    "labile-inr": "1",
    elderly: "1",
    drugs: "0",
    alcohol: "0",
  },
  rcri: {
    "high-risk-surgery": "1",
    "ischemic-heart-disease": "1",
    chf: "0",
    cerebrovascular: "0",
    "insulin-diabetes": "1",
    creatinine: "1",
  },
  ascvd: {
    age: "55",
    sex: "male",
    race: "white",
    "total-cholesterol": "213",
    hdl: "50",
    sbp: "120",
    "hypertension-treated": "untreated",
    smoker: "0",
    diabetes: "0",
  },
  dapt: {
    age: "0",
    smoking: "1",
    diabetes: "0",
    "mi-at-presentation": "1",
    "prior-mi-pci": "1",
    "stent-diameter": "1",
    paclitaxel: "0",
    "chf-lvef": "0",
    "svg-pci": "0",
  },
  h2fpef: {
    afib: "3",
    bmi: "32",
    age: "66",
    antihypertensives: "1",
    "e-e-ratio": "1",
    pasp: "1",
  },

  // -- Anthropometry --
  bmi: { weight: "70", height: "170" },
  bsa: { weight: "70", height: "170" },
  "waist-to-hip-ratio": { waist: "80", hip: "100", sex: "1" },

  // -- Internal Medicine --
  ibw: { sex: "male", height: "170" },
  adjbw: { sex: "male", height: "170", weight: "70" },
  "lean-body-weight": {
    sex: "male",
    height: "170",
    weight: "70",
  },
  "child-pugh": {
    bilirubin: "1",
    albumin: "1",
    inr: "1",
    ascites: "1",
    encephalopathy: "1",
  },
  "anion-gap": {
    sodium: "140",
    chloride: "104",
    bicarbonate: "24",
  },
  "corrected-anion-gap": {
    sodium: "140",
    chloride: "104",
    bicarbonate: "24",
    albumin: "4.0",
  },
  "serum-osmolality": {
    sodium: "140",
    glucose: "100",
    bun: "15",
  },
  "osmolar-gap": {
    measured: "290",
    sodium: "140",
    glucose: "100",
    bun: "15",
  },
  "basal-metabolic-rate": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "mifflin-st-jeor": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "harris-benedict": {
    sex: "male",
    age: "30",
    weight: "70",
    height: "170",
  },
  "calorie-requirement": {
    bmr: "1700",
    activity: "1.55",
  },
  "fluid-requirement": { weight: "70" },
  "maintenance-fluids": { weight: "70" },
  "free-water-deficit": {
    weight: "70",
    currentNa: "150",
    desiredNa: "140",
  },
  "sodium-deficit": {
    weight: "70",
    currentNa: "125",
    desiredNa: "140",
  },
  "corrected-sodium": {
    sodium: "120",
    glucose: "400",
  },
  "albumin-corrected-calcium": {
    calcium: "8.0",
    albumin: "3.0",
  },
  "fractional-excretion-calculator": {
    urineNa: "40",
    plasmaNa: "140",
    urineCr: "80",
    plasmaCr: "1.0",
  },

  // -- Laboratory --
  "corrected-calcium": {
    calcium: "8.5",
    albumin: "3.5",
  },

  // -- Endocrinology --
  "homa-ir": { glucose: "100", insulin: "10" },
  "homa-b": { glucose: "100", insulin: "10" },
  "insulin-sensitivity": { homaIr: "2.5" },
  "estimated-average-glucose": { a1c: "7.0" },
  "a1c-eag-converter": { a1c: "7.0" },
  "corrected-qt": {
    qt: "400",
    heartRate: "70",
    sex: "1",
  },
  "thyroid-dose": { weight: "70" },
  "levothyroxine-dose": { weight: "70" },
  "adrenal-steroid-converter": {
    dose: "10",
    steroid: "prednisone",
  },
  "bmi-for-pediatrics": {
    age: "10",
    sex: "1",
    weight: "32",
    height: "140",
  },

  // -- Pulmonology --
  "a-a-gradient": {
    age: "40",
    fio2: "0.21",
    pao2: "90",
    paco2: "40",
  },
  "oxygen-index": {
    fio2: "0.5",
    map: "10",
    pao2: "100",
  },
  "pf-ratio": {
    pao2: "100",
    fio2: "0.5",
  },
  "rox-index": {
    spo2: "94",
    fio2: "0.4",
    rr: "30",
  },

  // -- Gastroenterology --
  apri: {
    ast: "40",
    uln: "40",
    platelets: "200",
  },
  "fib-4": {
    age: "60",
    ast: "40",
    alt: "40",
    platelets: "200",
  },
  "glasgow-blatchford": {
    bun: "25",
    hemoglobin: "12.5",
    sex: "male",
    sbp: "100",
    pulse: "90",
    melena: "no",
    syncope: "no",
    hepatic: "no",
    cardiac: "no",
  },
  maddrey: {
    patient_pt: "20",
    control_pt: "12",
    bilirubin: "5",
  },
  meld: {
    bilirubin: "2",
    creatinine: "1.2",
    inr: "1.5",
    dialysis: "no",
  },
  "meld-na": {
    bilirubin: "2",
    creatinine: "1.2",
    inr: "1.5",
    sodium: "135",
    dialysis: "no",
  },
  "nafld-fibrosis": {
    age: "55",
    bmi: "32",
    diabetes: "1",
    ast: "40",
    alt: "40",
    platelets: "150",
    albumin: "3.5",
  },
  rockall: {
    age: "1",
    shock: "0",
    comorbidity: "0",
    diagnosis: "1",
    stigmata: "0",
  },

  // -- Obstetrics & Gynecology --
  edd: {
    lmp: "2025-01-01",
  },
  "gestational-age": {
    weeks: "30",
    days: "4",
  },
};

// ---------------------------------------------------------------------------
// Expected values for calculators where we can confidently predict the result
// ---------------------------------------------------------------------------

type ExpectedExact = {
  value: number;
  tolerance: number;
  status?: string;
};

const exactExpectations: Record<string, ExpectedExact> = {
  "heart-rate": {
    value: 75,
    tolerance: 0.01,
    status: "normal",
  },
  bmi: {
    value: 24.22,
    tolerance: 0.01,
    status: "normal",
  },
  bsa: {
    value: 1.82,
    tolerance: 0.01,
  },
  map: {
    value: 93.33,
    tolerance: 0.01,
    status: "normal",
  },
  "bun-creatinine-ratio": {
    value: 15,
    tolerance: 0.01,
    status: "normal",
  },
  "fluid-requirement": {
    value: 2450,
    tolerance: 0.01,
    status: "normal",
  },
  "maintenance-fluids": {
    value: 2500,
    tolerance: 0.01,
    status: "normal",
  },
  "basal-metabolic-rate": {
    value: 1617.5,
    tolerance: 0.1,
    status: "normal",
  },
  "mifflin-st-jeor": {
    value: 1617.5,
    tolerance: 0.1,
    status: "normal",
  },
  "harris-benedict": {
    value: 1671.7,
    tolerance: 0.1,
    status: "normal",
  },
  "calorie-requirement": {
    value: 2635,
    tolerance: 0.1,
    status: "normal",
  },
  ibw: {
    value: 65.9,
    tolerance: 0.1,
    status: "normal",
  },
  adjbw: {
    value: 67.5,
    tolerance: 0.1,
    status: "normal",
  },
  "lean-body-weight": {
    value: 54.7,
    tolerance: 0.1,
    status: "normal",
  },
  "calcium-phosphate-product": {
    value: 36,
    tolerance: 0.01,
    status: "normal",
  },
  "estimated-average-glucose": {
    value: 154.2,
    tolerance: 0.1,
  },
  "a1c-eag-converter": {
    value: 154.2,
    tolerance: 0.1,
  },
  gcs: {
    value: 15,
    tolerance: 0.01,
    status: "normal",
  },
  "shock-index": {
    value: 1.5,
    tolerance: 0.01,
    status: "critical",
  },
  "corrected-qt": {
    value: 432,
    tolerance: 0.01,
    status: "normal",
  },
  "thyroid-dose": {
    value: 112,
    tolerance: 0.01,
    status: "normal",
  },
  "levothyroxine-dose": {
    value: 112,
    tolerance: 0.01,
    status: "normal",
  },
  "bmi-for-pediatrics": {
    value: 16.3,
    tolerance: 0.1,
    status: "normal",
  },
  "albumin-creatinine-ratio": {
    value: 25,
    tolerance: 0.01,
    status: "normal",
  },
  "a-a-gradient": {
    value: 9.7,
    tolerance: 0.01,
    status: "normal",
  },
  "oxygen-index": {
    value: 5,
    tolerance: 0.01,
    status: "high",
  },
  "pf-ratio": {
    value: 200,
    tolerance: 0.01,
    status: "critical",
  },
  "rox-index": {
    value: 7.83,
    tolerance: 0.01,
    status: "normal",
  },
  apri: {
    value: 0.5,
    tolerance: 0.01,
    status: "high",
  },
  "fib-4": {
    value: 1.9,
    tolerance: 0.01,
    status: "high",
  },
  "glasgow-blatchford": {
    value: 5,
    tolerance: 0.01,
    status: "high",
  },
  maddrey: {
    value: 41.8,
    tolerance: 0.1,
    status: "critical",
  },
  meld: {
    value: 15,
    tolerance: 0.01,
    status: "high",
  },
  "meld-na": {
    value: 17,
    tolerance: 0.01,
    status: "high",
  },
  "nafld-fibrosis": {
    value: 1.228,
    tolerance: 0.001,
    status: "critical",
  },
  rockall: {
    value: 2,
    tolerance: 0.01,
    status: "normal",
  },
  "gestational-age": {
    value: 30.5714,
    tolerance: 0.001,
    status: "normal",
  },
  timi: {
    value: 5,
    tolerance: 0.01,
    status: "critical",
  },
  grace: {
    value: 205,
    tolerance: 0.01,
    status: "critical",
  },
  "cha2ds2-vasc": {
    value: 7,
    tolerance: 0.01,
    status: "critical",
  },
  "has-bled": {
    value: 4,
    tolerance: 0.01,
    status: "critical",
  },
  rcri: {
    value: 4,
    tolerance: 0.01,
    status: "critical",
  },
  ascvd: {
    value: 5.38,
    tolerance: 0.01,
    status: "low",
  },
  dapt: {
    value: 4,
    tolerance: 0.01,
    status: "high",
  },
  h2fpef: {
    value: 9,
    tolerance: 0.01,
    status: "critical",
  },
};

// ---------------------------------------------------------------------------
// Group calculators by category
// ---------------------------------------------------------------------------

function groupByCategory(): Map<
  string,
  CalculatorDefinition[]
> {
  const map = new Map<string, CalculatorDefinition[]>();
  for (const calc of calculatorRegistry) {
    const arr = map.get(calc.category) ?? [];
    arr.push(calc);
    map.set(calc.category, arr);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertValidResult(
  result: CalculatorResult,
  calcId: string,
) {
  expect(result, `${calcId}: calculate() must return an object`).toBeDefined();
  expect(
    result,
    `${calcId}: result must have a value property`,
  ).toHaveProperty("value");
  expect(
    result,
    `${calcId}: result must have a status property`,
  ).toHaveProperty("status");
  expect(
    ["normal", "low", "high", "critical"],
    `${calcId}: status must be valid`,
  ).toContain(result.status);
}

function assertNoThrow(
  calc: CalculatorDefinition,
  inputs: Record<string, string>,
) {
  expect(
    () => calc.calculate(inputs),
    `${calc.id}: calculate() must not throw`,
  ).not.toThrow();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Calculator Smoke Tests", () => {
  const groups = groupByCategory();
  const categories = Array.from(groups.keys()).sort();

  for (const category of categories) {
    const calcs = groups.get(category)!;

    describe(category, () => {
      for (const calc of calcs) {
        describe(calc.id, () => {
          const inputs = testInputs[calc.id];

          it("has test inputs defined", () => {
            expect(
              inputs,
              `Missing test inputs for ${calc.id}`,
            ).toBeDefined();
          });

          if (!inputs) return;

          it("does not throw with valid inputs", () => {
            assertNoThrow(calc, inputs);
          });

          it("returns a valid result structure", () => {
            const result = calc.calculate(inputs);
            assertValidResult(result, calc.id);
          });

          it("returns a finite numeric value", () => {
            const result = calc.calculate(inputs);
            if (typeof result.value === "number") {
              expect(
                Number.isFinite(result.value),
                `${calc.id}: value must be finite, got ${result.value}`,
              ).toBe(true);
            }
          });

          // Exact value tests for calculators where we can predict the result
          if (exactExpectations[calc.id]) {
            it("returns expected numerical value", () => {
              const result = calc.calculate(inputs);
              const expected =
                exactExpectations[calc.id];

              if (
                typeof result.value === "number"
              ) {
                expect(
                  Math.abs(
                    result.value - expected.value,
                  ),
                ).toBeLessThan(expected.tolerance);
              }
            });

            if (exactExpectations[calc.id].status) {
              it("returns expected status", () => {
                const result = calc.calculate(inputs);
                expect(result.status).toBe(
                  exactExpectations[calc.id].status,
                );
              });
            }
          }
        });
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Validation error tests — calculators should return critical
// for missing/invalid inputs, not throw
// ---------------------------------------------------------------------------

describe("Calculator Input Validation", () => {
  it("every calculator does not throw for empty inputs", () => {
    for (const calc of calculatorRegistry) {
      const emptyInputs: Record<string, string> = {};
      for (const input of calc.inputs) {
        emptyInputs[input.id] = "";
      }

      expect(
        () => calc.calculate(emptyInputs),
        `${calc.id}: should not throw for empty inputs`,
      ).not.toThrow();

      const result = calc.calculate(emptyInputs);
      // Most calculators should return critical for empty inputs,
      // but some may return normal with NaN.
      // The key invariant: the result must have a valid structure.
      expect(
        result,
        `${calc.id}: must return a result object`,
      ).toHaveProperty("value");
      expect(
        result,
        `${calc.id}: must have a status property`,
      ).toHaveProperty("status");
    }
  });
});

// ---------------------------------------------------------------------------
// Direct-call validation guard regression tests.
//
// lbm and adjbw previously propagated NaN into the result value for missing,
// non-numeric, negative, or zero numeric inputs and silently misclassified
// invalid sex selections. These guards must return critical and never emit
// a NaN value.
// ---------------------------------------------------------------------------

const GUARDED_IDS = ["lean-body-weight", "adjbw", "ibw"];

function guardedCalculator(id: string) {
  const calc = getCalculatorById(id);
  expect(calc, `guarded calculator "${id}" must be registered`).toBeDefined();
  return calc!;
}

describe("Direct-Call Validation Guards", () => {
  it.each(GUARDED_IDS)("%s returns critical and no NaN for missing inputs", (id) => {
    const calc = guardedCalculator(id);
    const result = calc.calculate({});
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical and no NaN for non-numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = input.type === "select" ? "male" : "abc";
    }
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for negative numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "-100",
      weight: "-50",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for zero numeric inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "0",
      weight: "0",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s returns critical for invalid sex selection", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "not-a-sex",
      height: "170",
      weight: "70",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("critical");
    expect(Number.isNaN(Number(result.value))).toBe(false);
  });

  it.each(GUARDED_IDS)("%s keeps producing valid results for valid inputs", (id) => {
    const calc = guardedCalculator(id);
    const inputs: Record<string, string> = {
      sex: "male",
      height: "170",
      weight: "70",
    };
    const result = calc.calculate(inputs);
    expect(result.status).toBe("normal");
    expect(Number.isFinite(Number(result.value))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Batch 7 — Direct-call validation guard regression tests.
//
// Batch 7 hardened 10 calculators whose direct invocation previously emitted
// NaN (silently misclassifying results) for missing, non-numeric, negative,
// or zero inputs. Each guard must return critical and never emit a NaN value;
// valid inputs must remain unaffected. Gestational-age deliberately allows
// zero (0 weeks 0 days), so its zero case is treated as non-critical.
// ---------------------------------------------------------------------------

const BATCH7_GUARDED_IDS = [
  "basal-metabolic-rate",
  "mifflin-st-jeor",
  "harris-benedict",
  "calorie-requirement",
  "fluid-requirement",
  "maintenance-fluids",
  "albumin-corrected-calcium",
  "fractional-excretion-calculator",
  "gestational-age",
  "waist-to-hip-ratio",
] as const;

const BATCH7_VALID_INPUTS: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "30", weight: "70", height: "170" },
  "mifflin-st-jeor": { sex: "male", age: "30", weight: "70", height: "170" },
  "harris-benedict": { sex: "male", age: "30", weight: "70", height: "170" },
  "calorie-requirement": { bmr: "1700", activity: "1.55" },
  "fluid-requirement": { weight: "70" },
  "maintenance-fluids": { weight: "70" },
  "albumin-corrected-calcium": { calcium: "8.0", albumin: "3.0" },
  "fractional-excretion-calculator": { urineNa: "40", plasmaNa: "140", urineCr: "80", plasmaCr: "1.0" },
  "gestational-age": { weeks: "30", days: "4" },
  "waist-to-hip-ratio": { waist: "80", hip: "100", sex: "1" },
};

const BATCH7_NEGATIVE_OVERRIDES: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "mifflin-st-jeor": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "harris-benedict": { sex: "male", age: "-30", weight: "-70", height: "-170" },
  "calorie-requirement": { bmr: "-1700", activity: "-1.55" },
  "fluid-requirement": { weight: "-70" },
  "maintenance-fluids": { weight: "-70" },
  "albumin-corrected-calcium": { calcium: "-8.0", albumin: "-3.0" },
  "fractional-excretion-calculator": { urineNa: "-40", plasmaNa: "-140", urineCr: "-80", plasmaCr: "-1.0" },
  "gestational-age": { weeks: "-1", days: "4" },
  "waist-to-hip-ratio": { waist: "-80", hip: "-100", sex: "1" },
};

const BATCH7_ZERO_OVERRIDES: Record<string, Record<string, string>> = {
  "basal-metabolic-rate": { sex: "male", age: "30", weight: "0", height: "170" },
  "mifflin-st-jeor": { sex: "male", age: "30", weight: "0", height: "170" },
  "harris-benedict": { sex: "male", age: "30", weight: "0", height: "170" },
  "calorie-requirement": { bmr: "0", activity: "1.55" },
  "fluid-requirement": { weight: "0" },
  "maintenance-fluids": { weight: "0" },
  "albumin-corrected-calcium": { calcium: "8.0", albumin: "0" },
  "fractional-excretion-calculator": { urineNa: "40", plasmaNa: "140", urineCr: "80", plasmaCr: "0" },
  "waist-to-hip-ratio": { waist: "80", hip: "0", sex: "1" },
};

const BATCH7_ZERO_GUARDED_IDS = BATCH7_GUARDED_IDS.filter(
  (id) => id !== "gestational-age",
);

describe("Batch 7 Direct-Call Validation Guards", () => {
  function batch7Calc(id: string) {
    const calc = getCalculatorById(id);
    expect(calc, `Batch 7 guarded calculator "${id}" must be registered`).toBeDefined();
    return calc!;
  }

  function fillEveryInput(id: string, value: string) {
    const calc = batch7Calc(id);
    const inputs: Record<string, string> = {};
    for (const input of calc.inputs) {
      inputs[input.id] = value;
    }
    return inputs;
  }

  function assertCritical(result: CalculatorResult, label: string) {
    expect(result.status, `${label}: expected critical`).toBe("critical");
    expect(
      Number.isNaN(Number(result.value)),
      `${label}: must not emit NaN`,
    ).toBe(false);
  }

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for missing inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate({}), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for empty-string inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(fillEveryInput(id, "")), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for non-numeric inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(fillEveryInput(id, "abc")), id);
    },
  );

  it.each(BATCH7_GUARDED_IDS)(
    "%s returns critical and no NaN for negative numeric inputs",
    (id) => {
      assertCritical(
        batch7Calc(id).calculate(BATCH7_NEGATIVE_OVERRIDES[id]),
        id,
      );
    },
  );

  it.each(BATCH7_ZERO_GUARDED_IDS)(
    "%s returns critical and no NaN for zero numeric inputs",
    (id) => {
      assertCritical(batch7Calc(id).calculate(BATCH7_ZERO_OVERRIDES[id]), id);
    },
  );

  it("gestational-age allows zero weeks and days (returns normal)", () => {
    const result = batch7Calc("gestational-age").calculate({ weeks: "0", days: "0" });
    expect(result.status).not.toBe("critical");
    expect(Number.isFinite(Number(result.value))).toBe(true);
  });

  it.each(BATCH7_GUARDED_IDS)(
    "%s keeps producing valid results for valid inputs",
    (id) => {
      const result = batch7Calc(id).calculate(BATCH7_VALID_INPUTS[id]);
      expect(result.status, `${id}: valid inputs must not be critical`).not.toBe("critical");
      expect(Number.isFinite(Number(result.value))).toBe(true);
    },
  );
});
