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

  keywords: [],

  formula: "Confusion + Urea + Respiratory Rate + Blood Pressure + Age ≥65",

  normalRange: "0–5",

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
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
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
const respiratory_rate = Number(values.respiratory_rate);
const sbp = Number(values.sbp);
const systolicBloodPressure = sbp;


  const result =
    65;


  
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