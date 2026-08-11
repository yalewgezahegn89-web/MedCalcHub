import type { CalculatorDefinition } from "./calculator.types";

export const mapCalculator: CalculatorDefinition = {
  id: "map",

  slug: "map",

  name: "map",

  shortName: "map",

  description:
    "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Mean Arterial Pressure", "Blood Pressure", "MAP", "Cardiology", "Cardiovascular", "Hemodynamics"],

  formula: "(sbp + 2 * dbp) / 3",

  normalRange: "70-100 mmHg",

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
    label: "SBP",
    type: "number",
    unit: "mmHg",
    required: true,
  },
  {
    id: "dbp",
    label: "DBP",
    type: "number",
    unit: "mmHg",
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
    interpretation: "SBP is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sbp))
) {
  return {
    value: 0,
    interpretation: "Invalid SBP.",
    status: "critical",
  };
}


if (Number(values.sbp) < 0) {
  return {
    value: 0,
    interpretation: "SBP cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sbp) === 0) {
  return {
    value: 0,
    interpretation: "SBP cannot be zero.",
    status: "critical",
  };
}


if (
  values.dbp === "" ||
  values.dbp === undefined
) {
  return {
    value: 0,
    interpretation: "DBP is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.dbp))
) {
  return {
    value: 0,
    interpretation: "Invalid DBP.",
    status: "critical",
  };
}


if (Number(values.dbp) < 0) {
  return {
    value: 0,
    interpretation: "DBP cannot be negative.",
    status: "critical",
  };
}


if (Number(values.dbp) === 0) {
  return {
    value: 0,
    interpretation: "DBP cannot be zero.",
    status: "critical",
  };
}



const sbp = Number(values.sbp);
const systolicBloodPressure = sbp;
const dbp = Number(values.dbp);
const diastolicBloodPressure = dbp;


  const result =
    (sbp + 2 * dbp) / 3;


  
const interpretation =
  "Clinical interpretation pending.";

const status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

const referenceRange =
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