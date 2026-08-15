import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const timiCalculator: CalculatorDefinition = {
  id: "timi",

  slug: "timi",

  name: "TIMI Risk Score (UA/NSTEMI)",

  shortName: "TIMI UA/NSTEMI",

  description:
    "TIMI risk score for unstable angina / non-ST-elevation myocardial infarction, estimating 14-day risk of all-cause mortality, new or recurrent MI, or severe recurrent ischemia requiring urgent revascularization.",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["TIMI", "Unstable Angina", "NSTEMI", "ACS", "Acute Coronary Syndrome", "Risk Stratification", "Cardiology"],

  formula:
    "1 point each: age ≥65, ≥3 CAD risk factors, known CAD (stenosis ≥50%), aspirin use in past 7 days, ≥2 anginal events in 24h, ST-segment deviation, elevated cardiac markers (total 0–7)",

  normalRange: "0–7 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "TIMI UA/NSTEMI score stratifies 14-day risk of the composite of all-cause mortality, new or recurrent MI, or severe recurrent ischemia requiring urgent revascularization. 0–1: low risk (~4.7%); 2–4: intermediate risk (~8.3–19.9%); 5–7: high risk (~26.2–40.9%).",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.",
  ],

  relatedCalculators: ["heart-score", "grace", "h2fpef"],

  inputs: [
  {
    id: "age-65",
    label: "Age ≥ 65 years",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "risk-factors",
    label: "≥ 3 risk factors for CAD (hypertension, diabetes, dyslipidemia, smoking, family history of premature CAD)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "known-cad",
    label: "Known coronary disease (stenosis ≥ 50%)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "aspirin",
    label: "Aspirin use in the past 7 days",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "anginal-events",
    label: "≥ 2 anginal events in the past 24 hours",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "ecg-changes",
    label: "ST-segment deviation on admission ECG",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "troponin",
    label: "Elevated cardiac biomarkers (troponin)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const criteria: Array<{ id: string; label: string }> = [
      { id: "age-65", label: "Age ≥ 65" },
      { id: "risk-factors", label: "≥ 3 CAD risk factors" },
      { id: "known-cad", label: "Known CAD" },
      { id: "aspirin", label: "Aspirin use (7 days)" },
      { id: "anginal-events", label: "≥ 2 anginal events (24h)" },
      { id: "ecg-changes", label: "ST-segment deviation" },
      { id: "troponin", label: "Elevated biomarkers" },
    ];

    let score = 0;
    for (const criterion of criteria) {
      const value = readYesNo(values[criterion.id]);
      if (value === null) {
        return critical(`${criterion.label} is required.`);
      }
      score += value;
    }

    if (score <= 1) {
      return {
        value: score,
        unit: "/7",
        interpretation:
          `TIMI risk score ${score} — LOW risk. 14-day risk of death, MI, or urgent revascularization approximately 4.7%. ` +
          "Early discharge with outpatient follow-up may be considered in suitable patients.",
        status: "normal",
      };
    }

    if (score <= 4) {
      return {
        value: score,
        unit: "/7",
        interpretation:
          `TIMI risk score ${score} — INTERMEDIATE risk. 14-day risk of death, MI, or urgent revascularization approximately 8.3–19.9%. ` +
          "Admit and initiate guideline-directed medical therapy; consider early invasive strategy.",
        status: "high",
      };
    }

    return {
      value: score,
      unit: "/7",
      interpretation:
        `TIMI risk score ${score} — HIGH risk. 14-day risk of death, MI, or urgent revascularization approximately 26.2–40.9%. ` +
        "Consider urgent invasive strategy and intensive antithrombotic therapy.",
      status: "critical",
    };
  },
};