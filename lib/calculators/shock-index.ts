import type { CalculatorDefinition } from "./calculator.types";

export const shockIndexCalculator: CalculatorDefinition = {
  id: "shock-index",

  slug: "shock-index",

  name: "shock-index",

  shortName: "shock-index",

  description:
    "Calculates Shock Index from heart rate and systolic blood pressure.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Shock Index", "Heart Rate", "Blood Pressure", "Hemodynamics", "Sepsis", "Trauma", "Emergency"],

  formula: "Shock Index = Heart Rate / SBP",

  normalRange: "0.5–0.7",

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
    id: "heart-rate",
    label: "Heart Rate",
    type: "number",
    unit: "bpm",
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
  values["heart-rate"] === "" ||
  values["heart-rate"] === undefined
) {
  return {
    value: 0,
    interpretation: "Heart Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values["heart-rate"]))
) {
  return {
    value: 0,
    interpretation: "Invalid Heart Rate.",
    status: "critical",
  };
}


if (Number(values["heart-rate"]) < 0) {
  return {
    value: 0,
    interpretation: "Heart Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(values["heart-rate"]) === 0) {
  return {
    value: 0,
    interpretation: "Heart Rate cannot be zero.",
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



const heartRate = Number(values["heart-rate"]);
const sbp = Number(values.sbp);


  const result =
    heartRate / sbp;


  
let interpretation: string;
let status:
  "normal" |
  "low" |
  "high" |
  "critical";
let referenceRange = "";

if (result < 0.5) {

  interpretation =
    "Low shock index.";

  status =
    "low";

  referenceRange =
  "<0.5";
}

else if (result <= 0.7) {

  interpretation =
    "Normal shock index.";

  status =
    "normal";

  referenceRange =
  "0.5–0.7";
}

else if (result < 1) {

  interpretation =
    "Elevated shock index – investigate for hypoperfusion.";

  status =
    "high";

  referenceRange =
  "0.7–0.9";
}

else {

  interpretation =
    "High shock index – significant hemodynamic compromise.";

  status =
    "critical";

  referenceRange =
  "≥1.0";
}




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};