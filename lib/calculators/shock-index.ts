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

const shockWarnings = [
  "The Shock Index is a screening hemodynamic indicator, not a diagnosis — it does not identify the cause of hemodynamic abnormality.",
  "Heart rate and systolic blood pressure can be affected by medications (beta-blockers, vasopressors), rhythm, and other conditions, which may mask or mimic an abnormal index.",
];

let bandAdvice: string;
let bandFollowUp: string[];

if (result < 0.5) {

  interpretation =
    "Low shock index.";

  status =
    "low";

  referenceRange =
  "<0.5";

  bandAdvice =
    "Interpret in context: a low index with bradycardia, medication effect, or raised intracranial pressure requires clinical correlation rather than reassurance.";
  bandFollowUp = [
    "Repeat assessment when vitals or clinical status change.",
  ];
}

else if (result <= 0.7) {

  interpretation =
    "Normal shock index.";

  status =
    "normal";

  referenceRange =
    "0.5\u20130.7";

  bandAdvice =
    "A normal index does not exclude evolving blood loss or sepsis — correlate with the full clinical picture and trends over time.";
  bandFollowUp = [
    "Reassess when hemodynamics evolve or after any intervention.",
  ];
}

else if (result < 1) {

  interpretation =
    "Elevated shock index \u2013 investigate for hypoperfusion.";

  status =
    "high";

  referenceRange =
    "0.7\u20130.9";

  bandAdvice =
    "An elevated index should prompt clinical reassessment for causes of hypoperfusion in the appropriate context, including hemorrhage and sepsis.";
  bandFollowUp = [
    "Repeat the index as part of ongoing monitoring; a rising trend is more concerning than any single value.",
  ];
}

else {

  interpretation =
    "High shock index \u2013 significant hemodynamic compromise.";

  status =
    "critical";

  referenceRange =
    "\u22651.0";

  bandAdvice =
    "This level suggests significant hemodynamic compromise and warrants immediate clinical evaluation of perfusion and its cause.";
  bandFollowUp = [
    "Reassess frequently during resuscitation to track response.",
  ];
}




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,

  warnings: shockWarnings,

  advice: [bandAdvice],

  followUp: bandFollowUp,
};
},

};