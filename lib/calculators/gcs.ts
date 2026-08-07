import type { CalculatorDefinition } from "./calculator.types";

export const gcsCalculator: CalculatorDefinition = {
  id: "gcs",

  slug: "gcs",

  name: "gcs",

  shortName: "gcs",

  description:
    "Glasgow Coma Scale.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Eye + Verbal + Motor",

  normalRange: "3–15",

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
    id: "eye",
    label: "Eye Opening",
    type: "select",
    required: true,
  },
  {
    id: "verbal",
    label: "Verbal Response",
    type: "select",
    required: true,
  },
  {
    id: "motor",
    label: "Motor Response",
    type: "select",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.eye === "" ||
  values.eye === undefined
) {
  return {
    value: 0,
    interpretation: "Eye Opening is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.eye))
) {
  return {
    value: 0,
    interpretation: "Invalid Eye Opening.",
    status: "critical",
  };
}


if (Number(values.eye) < 0) {
  return {
    value: 0,
    interpretation: "Eye Opening cannot be negative.",
    status: "critical",
  };
}


if (Number(values.eye) === 0) {
  return {
    value: 0,
    interpretation: "Eye Opening cannot be zero.",
    status: "critical",
  };
}


if (
  values.verbal === "" ||
  values.verbal === undefined
) {
  return {
    value: 0,
    interpretation: "Verbal Response is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.verbal))
) {
  return {
    value: 0,
    interpretation: "Invalid Verbal Response.",
    status: "critical",
  };
}


if (Number(values.verbal) < 0) {
  return {
    value: 0,
    interpretation: "Verbal Response cannot be negative.",
    status: "critical",
  };
}


if (Number(values.verbal) === 0) {
  return {
    value: 0,
    interpretation: "Verbal Response cannot be zero.",
    status: "critical",
  };
}


if (
  values.motor === "" ||
  values.motor === undefined
) {
  return {
    value: 0,
    interpretation: "Motor Response is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.motor))
) {
  return {
    value: 0,
    interpretation: "Invalid Motor Response.",
    status: "critical",
  };
}


if (Number(values.motor) < 0) {
  return {
    value: 0,
    interpretation: "Motor Response cannot be negative.",
    status: "critical",
  };
}


if (Number(values.motor) === 0) {
  return {
    value: 0,
    interpretation: "Motor Response cannot be zero.",
    status: "critical",
  };
}



const eye = Number(values.eye);
const verbal = Number(values.verbal);
const motor = Number(values.motor);


  const result =
    eye + verbal + motor;


  
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