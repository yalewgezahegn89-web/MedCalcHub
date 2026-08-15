import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

function readSelect(
  value: string | undefined,
  allowed: string[],
): string | null {
  if (value === "" || value === undefined) return null;
  return allowed.includes(value) ? value : null;
}

export const h2fpefCalculator: CalculatorDefinition = {
  id: "h2fpef",

  slug: "h2fpef",

  name: "H2FPEF Score",

  shortName: "H2FPEF",

  description:
    "H2FPEF score for estimating the probability of heart failure with preserved ejection fraction (HFpEF) in patients with unexplained dyspnea (score 0–9).",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["H2FPEF", "HFpEF", "Heart Failure", "Diastolic Dysfunction", "Dyspnea", "Echocardiography", "Cardiology"],

  formula:
    "Heavy (BMI >30) (2) + Hypertensive (≥2 antihypertensives) (1) + Fibrillation (AF, paroxysmal or persistent) (3) + Pulmonary hypertension (PASP >35 mmHg) (1) + Elderly (age >60) (1) + Filling pressure (E/e' >9) (1) = total 0–9",

  normalRange: "0–9 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "H2FPEF score estimates the probability of HFpEF in patients with unexplained dyspnea: 0–1 (low, ~6% probability), 2–5 (intermediate, ~10–46%), 6–9 (high, ~67–95% probability of HFpEF). The score was derived and validated in patients referred for unexplained exertional dyspnea and includes atrial fibrillation (3 points) as the strongest predictor.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Reddy YNV, et al. A simple, evidence-based approach to help guide diagnosis of heart failure with preserved ejection fraction. Circulation. 2018;138(9):861-870.",
  ],

  relatedCalculators: ["heart-score", "timi", "grace"],

  inputs: [
  {
    id: "afib",
    label: "Atrial fibrillation (paroxysmal or persistent)",
    type: "select",
    required: true,
    options: [
      { label: "No (0)", value: "0" },
      { label: "Yes (3)", value: "3" },
    ],
  },
  {
    id: "bmi",
    label: "Body mass index (BMI)",
    type: "number",
    unit: "kg/m²",
    required: true,
    min: 10,
    max: 80,
    step: 0.1,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
    min: 16,
    max: 120,
    step: 1,
  },
  {
    id: "antihypertensives",
    label: "Number of antihypertensive medications",
    type: "select",
    required: true,
    options: [
      { label: "0–1 medications (0)", value: "0" },
      { label: "≥ 2 medications (1)", value: "1" },
    ],
  },
  {
    id: "e-e-ratio",
    label: "E/e' ratio (septal e' averaged with lateral e')",
    type: "select",
    required: true,
    options: [
      { label: "≤ 9 (0)", value: "0" },
      { label: "> 9 (1)", value: "1" },
    ],
  },
  {
    id: "pasp",
    label: "Pulmonary artery systolic pressure (PASP)",
    type: "select",
    required: true,
    options: [
      { label: "≤ 35 mmHg (0)", value: "0" },
      { label: "> 35 mmHg (1)", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const afib = readSelect(values["afib"], ["0", "3"]);
    if (afib === null) {
      return critical("Atrial fibrillation status is required.");
    }

    const bmi = readNumber(values["bmi"], "Body mass index");
    if (bmi === null || bmi <= 0) {
      return critical("BMI must be a positive number.");
    }

    const age = readNumber(values["age"], "Age");
    if (age === null || age <= 0) {
      return critical("Age must be a positive number.");
    }

    const antihypertensives = readYesNo(values["antihypertensives"]);
    if (antihypertensives === null) {
      return critical("Antihypertensive medication count is required.");
    }

    const eRatio = readYesNo(values["e-e-ratio"]);
    if (eRatio === null) {
      return critical("E/e' ratio is required.");
    }

    const pasp = readYesNo(values["pasp"]);
    if (pasp === null) {
      return critical("Pulmonary artery systolic pressure is required.");
    }

    let score = Number(afib);

    if (bmi > 30) {
      score += 2;
    }
    if (age > 60) {
      score += 1;
    }
    score += antihypertensives;
    score += eRatio;
    score += pasp;

    if (score <= 1) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `H2FPEF score ${score} — LOW probability of HFpEF (approximately 6%). ` +
          "Consider alternative causes of dyspnea.",
        status: "normal",
      };
    }

    if (score <= 5) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `H2FPEF score ${score} — INTERMEDIATE probability of HFpEF (approximately 10–46%). ` +
          "Consider further testing such as invasive hemodynamic assessment or exercise testing if HFpEF remains suspected.",
        status: "high",
      };
    }

    return {
      value: score,
      unit: "/9",
      interpretation:
        `H2FPEF score ${score} — HIGH probability of HFpEF (approximately 67–95%). ` +
        "HFpEF is very likely; proceed with HFpEF treatment.",
      status: "critical",
    };
  },
};