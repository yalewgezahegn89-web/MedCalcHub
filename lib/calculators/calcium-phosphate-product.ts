import type { CalculatorDefinition } from "./calculator.types";

export const calciumPhosphateProductCalculator: CalculatorDefinition = {
  id: "calcium-phosphate-product",

  slug: "calcium-phosphate-product",

  name: "Calcium-Phosphate Product",

  shortName: "calcium-phosphate-product",

  description:
    "Calculates the calcium-phosphate product used in renal risk assessment for vascular calcification.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Calcium Phosphate Product", "CKD", "Kidney", "Renal", "Hyperparathyroidism", "Metastatic Calcification"],

  formula: "CaP = calcium * phosphate",

  normalRange: "< 55 mg²/dL²",

  referenceRanges: [
  {
    label: "Acceptable",
    range: "<55.1",
  },
  {
    label: "Elevated — increased calcification risk",
    range: "55–70",
  },
  {
    label: "Critically elevated — high calcification risk",
    range: "≥70",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Mineral Metabolism Calculator Should I Use?","calculators":[{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not directly measure PTH or vitamin D status."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Estimating kidney function.","limitation":"Does not assess mineral metabolism."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["ckd-epi-2021","cockcroft-gault","albumin-creatinine-ratio"],

  inputs: [
  {
    id: "calcium",
    label: "Calcium",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "phosphate",
    label: "Phosphate",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.calcium === "" ||
  values.calcium === undefined
) {
  return {
    value: 0,
    interpretation: "Calcium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.calcium))
) {
  return {
    value: 0,
    interpretation: "Invalid Calcium.",
    status: "critical",
  };
}


if (Number(values.calcium) < 0) {
  return {
    value: 0,
    interpretation: "Calcium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.calcium) === 0) {
  return {
    value: 0,
    interpretation: "Calcium cannot be zero.",
    status: "critical",
  };
}


if (
  values.phosphate === "" ||
  values.phosphate === undefined
) {
  return {
    value: 0,
    interpretation: "Phosphate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.phosphate))
) {
  return {
    value: 0,
    interpretation: "Invalid Phosphate.",
    status: "critical",
  };
}


if (Number(values.phosphate) < 0) {
  return {
    value: 0,
    interpretation: "Phosphate cannot be negative.",
    status: "critical",
  };
}


if (Number(values.phosphate) === 0) {
  return {
    value: 0,
    interpretation: "Phosphate cannot be zero.",
    status: "critical",
  };
}



const calcium = Number(values.calcium);
const ca = calcium;
const phosphate = Number(values.phosphate);


  const result =
    calcium * phosphate;


  
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

if (result < 55) {

  interpretation =
    "Acceptable";

  status =
    "normal";

  referenceRange =
  "<55.1";
}


else if (result <= 70) {

  interpretation =
    "Elevated — increased calcification risk";

  status =
    "high";

  referenceRange =
  "55–70";
}


else {

  interpretation =
    "Critically elevated — high calcification risk";

  status =
    "critical";

  referenceRange =
  "≥70";
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