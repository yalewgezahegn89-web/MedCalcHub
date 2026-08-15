import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const rcriCalculator: CalculatorDefinition = {
  id: "rcri",

  slug: "rcri",

  name: "Revised Cardiac Risk Index (RCRI)",

  shortName: "RCRI",

  description:
    "Revised Cardiac Risk Index (Lee index) for estimating the risk of major perioperative cardiac complications (MI, pulmonary edema, VF or primary cardiac arrest, complete heart block) in patients undergoing non-cardiac surgery.",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["RCRI", "Revised Cardiac Risk Index", "Perioperative", "Preoperative", "Cardiac Risk", "Lee Index", "Non-Cardiac Surgery", "Cardiology"],

  formula:
    "High-risk surgery (1) + Ischemic heart disease (1) + Congestive heart failure (1) + Cerebrovascular disease (1) + Insulin-treated diabetes (1) + Preoperative creatinine > 2 mg/dL (1) = total 0–6",

  normalRange: "0–6 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "RCRI predicts major cardiac events within 30 days of non-cardiac surgery: 0 predictors ~0.4%, 1 predictor ~0.9%, 2 predictors ~7%, ≥3 predictors ~11%. It guides perioperative cardiac risk stratification but should be combined with functional capacity assessment and the surgical procedure risk.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Lee TH, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999;100(10):1043-1049.",
  ],

  relatedCalculators: ["heart-score", "timi", "ascvd"],

  inputs: [
  {
    id: "high-risk-surgery",
    label: "High-risk surgery (intraperitoneal, intrathoracic, or supraringuinal vascular)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "ischemic-heart-disease",
    label: "Ischemic heart disease (prior MI, positive stress test, current angina, nitrate use, prior CABG/PCI)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "chf",
    label: "Congestive heart failure (history, pulmonary edema, paroxysmal nocturnal dyspnea, S3, bilateral rales, CXR redistribution)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "cerebrovascular",
    label: "Cerebrovascular disease (prior TIA or stroke)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "insulin-diabetes",
    label: "Insulin-treated diabetes mellitus",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "creatinine",
    label: "Preoperative creatinine > 2 mg/dL",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const predictors: Array<{ id: string; label: string }> = [
      { id: "high-risk-surgery", label: "High-risk surgery" },
      { id: "ischemic-heart-disease", label: "Ischemic heart disease" },
      { id: "chf", label: "Congestive heart failure" },
      { id: "cerebrovascular", label: "Cerebrovascular disease" },
      { id: "insulin-diabetes", label: "Insulin-treated diabetes" },
      { id: "creatinine", label: "Creatinine > 2 mg/dL" },
    ];

    let score = 0;
    for (const predictor of predictors) {
      const value = readYesNo(values[predictor.id]);
      if (value === null) {
        return critical(`${predictor.label} is required.`);
      }
      score += value;
    }

    if (score === 0) {
      return {
        value: score,
        unit: "/6",
        interpretation:
          `RCRI score ${score} — LOW risk. Predicted rate of major perioperative cardiac events approximately 0.4%.`,
        status: "normal",
      };
    }

    if (score === 1) {
      return {
        value: score,
        unit: "/6",
        interpretation:
          `RCRI score ${score} — LOW-MODERATE risk. Predicted rate of major perioperative cardiac events approximately 0.9%.`,
        status: "high",
      };
    }

    if (score === 2) {
      return {
        value: score,
        unit: "/6",
        interpretation:
          `RCRI score ${score} — MODERATE risk. Predicted rate of major perioperative cardiac events approximately 7%.`,
        status: "high",
      };
    }

    return {
      value: score,
      unit: "/6",
      interpretation:
        `RCRI score ${score} — HIGH risk. Predicted rate of major perioperative cardiac events approximately 11%. ` +
        "Consider perioperative cardiology input and individualized management of cardiac risk factors.",
      status: "critical",
    };
  },
};