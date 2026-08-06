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

  keywords: [],

  formula: "Score = Altered Mental Status + SBP ≤100 + RR ≥22",

  normalRange: "0–3 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
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


if (
  values.respiratory_rate === "" ||
  values.respiratory_rate === undefined
) {
  return {
    value: 0,
    interpretation: "Respiratory Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.respiratory_rate))
) {
  return {
    value: 0,
    interpretation: "Invalid Respiratory Rate.",
    status: "critical",
  };
}


if (Number(values.respiratory_rate) < 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(values.respiratory_rate) === 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be zero.",
    status: "critical",
  };
}


if (
  values.mental_status === "" ||
  values.mental_status === undefined
) {
  return {
    value: 0,
    interpretation: "Altered Mental Status is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.mental_status))
) {
  return {
    value: 0,
    interpretation: "Invalid Altered Mental Status.",
    status: "critical",
  };
}


if (Number(values.mental_status) < 0) {
  return {
    value: 0,
    interpretation: "Altered Mental Status cannot be negative.",
    status: "critical",
  };
}


if (Number(values.mental_status) === 0) {
  return {
    value: 0,
    interpretation: "Altered Mental Status cannot be zero.",
    status: "critical",
  };
}



const sbp = Number(values.sbp);
const systolicBloodPressure = sbp;
const respiratory_rate = Number(values.respiratory_rate);
const mental_status = Number(values.mental_status);


  const result =
    mental_status + sbp <;


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};