import type { CalculatorDefinition } from "./calculator.types";

export const curb65Calculator: CalculatorDefinition = {
  id: "curb-65",

  slug: "curb-65",

  name: "curb-65",

  shortName: "curb-65",

  description:
    "CURB-65 severity score for community-acquired pneumonia.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Pneumonia", "CURB-65", "Community Acquired Pneumonia", "Emergency", "Respiratory", "Severity"],

  formula:
    "Confusion + Urea > 7 mmol/L + RR ≥ 30/min + SBP < 90 or DBP ≤ 60 mmHg + Age ≥ 65",

  normalRange: "0–5",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "CURB-65 stratifies severity in community-acquired pneumonia. Scores of 0–1 are typically managed as outpatients; 2 suggests hospital admission; ≥ 3 suggests severe pneumonia and consideration of ICU admission. Interpret alongside clinical judgement.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax 2003;58(5):377-382.",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
  },
  {
    id: "confusion",
    label: "New-Onset Confusion",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "urea",
    label: "Urea",
    type: "number",
    unit: "mmol/L",
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
    id: "sbp",
    label: "Systolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.age === "" ||
  values.age === undefined
) {
  return {
    value: 0,
    interpretation: "Age is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.age))
) {
  return {
    value: 0,
    interpretation: "Invalid Age.",
    status: "critical",
  };
}


if (Number(values.age) < 0) {
  return {
    value: 0,
    interpretation: "Age cannot be negative.",
    status: "critical",
  };
}


if (Number(values.age) === 0) {
  return {
    value: 0,
    interpretation: "Age cannot be zero.",
    status: "critical",
  };
}


const confusionRaw = values.confusion;

if (
  confusionRaw === "" ||
  confusionRaw === undefined
) {
  return {
    value: 0,
    interpretation: "New-Onset Confusion is required.",
    status: "critical",
  };
}

const confusion = Number(confusionRaw);

if (
  !Number.isFinite(confusion) ||
  (confusion !== 0 && confusion !== 1)
) {
  return {
    value: 0,
    interpretation: "Invalid New-Onset Confusion.",
    status: "critical",
  };
}


if (
  values.urea === "" ||
  values.urea === undefined
) {
  return {
    value: 0,
    interpretation: "Urea is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urea))
) {
  return {
    value: 0,
    interpretation: "Invalid Urea.",
    status: "critical",
  };
}


if (Number(values.urea) < 0) {
  return {
    value: 0,
    interpretation: "Urea cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urea) === 0) {
  return {
    value: 0,
    interpretation: "Urea cannot be zero.",
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



const age = Number(values.age);
const urea = Number(values.urea);
const respiratoryRate = Number(respiratoryRateRaw);
const sbp = Number(values.sbp);

// CURB-65 criteria (each worth 1 point):
//   - New-onset confusion
//   - Urea > 7 mmol/L
//   - Respiratory rate ≥ 30/min
//   - SBP < 90 mmHg
//   - Age ≥ 65
let score = 0;
if (confusion === 1) score += 1;
if (urea > 7) score += 1;
if (respiratoryRate >= 30) score += 1;
if (sbp < 90) score += 1;
if (age >= 65) score += 1;

const result = Math.min(score, 5);


let interpretation: string;
let status:
  "normal" |
  "low" |
  "high" |
  "critical";

switch (result) {
  case 0:
    interpretation =
      "CURB-65 0 – Low severity. Suitable for outpatient management.";
    status = "normal";
    break;
  case 1:
    interpretation =
      "CURB-65 1 – Low severity. Usually suitable for outpatient management.";
    status = "low";
    break;
  case 2:
    interpretation =
      "CURB-65 2 – Moderate severity. Strongly consider hospital admission.";
    status = "low";
    break;
  default:
    interpretation =
      "CURB-65 ≥ 3 – Severe pneumonia. Consider urgent hospital/ICU admission.";
    status = "high";
    break;
}

const referenceRange =
  "0–5";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};