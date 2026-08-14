import type { CalculatorDefinition } from "./calculator.types";

export const qsofaCalculator: CalculatorDefinition = {
  id: "qsofa",

  slug: "qsofa",

  name: "qsofa",

  shortName: "qsofa",

  description:
    "Quick Sequential Organ Failure Assessment (qSOFA) for identifying patients at high risk of poor outcomes from suspected infection.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["qSOFA", "Sepsis", "Emergency", "Organ Dysfunction", "Sepsis Screening", "Critical Care"],

  formula:
    "Altered mentation (1 point) + RR ≥ 22/min (1 point) + SBP ≤ 100 mmHg (1 point)",

  normalRange: "0–3 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "qSOFA (quick SOFA) uses three bedside criteria to identify adults with suspected infection who are likely to have poor outcomes. A score ≥ 2 identifies patients at greater risk of death or prolonged ICU stay.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis. JAMA 2016;315(8):762-774.",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "sbp",
    label: "Systolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  },
  {
    id: "respiratory-rate",
    label: "Respiratory Rate",
    type: "number",
    unit: "/min",
    required: true,
  },
  {
    id: "mental-status",
    label: "Altered Mental Status",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.sbp === "" ||
  values.sbp === undefined
) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sbp))
) {
  return {
    value: 0,
    interpretation: "Invalid Systolic Blood Pressure.",
    status: "critical",
  };
}


if (Number(values.sbp) < 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sbp) === 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be zero.",
    status: "critical",
  };
}


const respiratoryRateRaw = values["respiratory-rate"];

if (
  respiratoryRateRaw === "" ||
  respiratoryRateRaw === undefined
) {
  return {
    value: 0,
    interpretation: "Respiratory Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(respiratoryRateRaw))
) {
  return {
    value: 0,
    interpretation: "Invalid Respiratory Rate.",
    status: "critical",
  };
}


if (Number(respiratoryRateRaw) < 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(respiratoryRateRaw) === 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be zero.",
    status: "critical",
  };
}


const mentalStatusRaw = values["mental-status"];

if (
  mentalStatusRaw === "" ||
  mentalStatusRaw === undefined
) {
  return {
    value: 0,
    interpretation: "Altered Mental Status is required.",
    status: "critical",
  };
}


const mentalStatus = Number(mentalStatusRaw);

if (
  !Number.isFinite(mentalStatus) ||
  (mentalStatus !== 0 && mentalStatus !== 1)
) {
  return {
    value: 0,
    interpretation: "Invalid Altered Mental Status.",
    status: "critical",
  };
}



const sbp = Number(values.sbp);
const respiratoryRate = Number(respiratoryRateRaw);

// qSOFA criteria (each worth 1 point):
//   - SBP ≤ 100 mmHg
//   - RR ≥ 22/min
//   - Altered mentation
let score = 0;
if (sbp <= 100) score += 1;
if (respiratoryRate >= 22) score += 1;
if (mentalStatus === 1) score += 1;

const result = Math.min(score, 3);


let interpretation: string;
let status:
  "normal" |
  "low" |
  "high" |
  "critical";

switch (result) {
  case 0:
    interpretation =
      "qSOFA 0 – Low clinical concern. Continue to monitor for signs of deterioration.";
    status = "normal";
    break;
  case 1:
    interpretation =
      "qSOFA 1 – Moderate concern. Monitor closely and reassess frequently.";
    status = "low";
    break;
  default:
    interpretation =
      "qSOFA ≥ 2 – High risk of sepsis-related organ dysfunction and mortality. Escalate care urgently.";
    status = "high";
    break;
}

const referenceRange =
  "0–3";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};