import type { CalculatorDefinition } from "./calculator.types";

export const cockcroftGaultCalculator: CalculatorDefinition = {
  id: "cockcroft-gault",

  slug: "cockcroft-gault",

  name: "Cockcroft-Gault Equation",

  shortName: "cockcroft-gault",

  description:
    "Estimates creatinine clearance (CrCl) for medication dosing using the Cockcroft-Gault equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Creatinine Clearance", "Kidney", "Renal", "Drug Dosing", "Kidney Function", "Nephrology"],

  formula: "CrCl = ((140 − age) × weight) / (72 × creatinine) × 0.85 (if female)",

  normalRange: "90–120 mL/min",

  referenceRanges: [
  {
    label: "Normal renal function",
    range: "≥90",
  },
  {
    label: "Mild renal impairment",
    range: "60–89",
  },
  {
    label: "Moderate renal impairment",
    range: "30–59",
  },
  {
    label: "Severe renal impairment",
    range: "15–29",
  },
  {
    label: "Kidney failure",
    range: "<15",
  }
],

  clinicalGuidance: {
    advice: ["Use actual body weight unless adjusted body weight is clinically indicated (e.g. obesity).","Cockcroft-Gault remains the preferred equation for many drug dosing recommendations.","Use stable serum creatinine; avoid using values during acute kidney injury for chronic dosing."],
    warnings: ["Not recommended for unstable kidney function or acute kidney injury.","Overestimates creatinine clearance in elderly patients with low muscle mass.","Does not provide direct GFR estimation; use CKD-EPI for CKD staging."],
    followUp: ["Verify drug-specific dosing guidelines for renal adjustment thresholds.","Monitor renal function periodically in patients with CrCl < 50 mL/min."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Original Publication","reference":"Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.","reviewedBy":"MedCalcHub Clinical Team","version":"1976","updatedAt":"2026-07","references":["Cockcroft DW, Gault MH. Nephron. 1976;16:31-41.","KDIGO Clinical Practice Guideline."]},

  faq: [{"question":"When should I use Cockcroft-Gault instead of CKD-EPI?","answer":"Use Cockcroft-Gault when adjusting medication doses, as many drug labels still reference CrCl from this equation."},{"question":"What weight should I use in the Cockcroft-Gault equation?","answer":"Use actual body weight by default. Adjusted body weight may be used in obese patients per institutional guidelines."}],

  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","bestFor":"Medication dosing adjustment.","limitation":"Less accurate for estimating true GFR."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Routine kidney function assessment and CKD staging.","limitation":"Not preferred for medication dosing."},{"name":"MDRD","href":"/calculators/mdrd","bestFor":"Historical comparison.","limitation":"Largely replaced by CKD-EPI."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["ckd-epi-2021","mdrd","bun-creatinine-ratio"],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
  },
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
  },
  {
    id: "sex",
    label: "Sex",
    type: "select",
    required: true,
    options: [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" },
    ],
  },
  {
    id: "creatinine",
    label: "Serum Creatinine",
    type: "number",
    unit: "mg/dL",
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
  values.weight === "" ||
  values.weight === undefined
) {
  return {
    value: 0,
    interpretation: "Weight is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.weight))
) {
  return {
    value: 0,
    interpretation: "Invalid Weight.",
    status: "critical",
  };
}


if (Number(values.weight) < 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be negative.",
    status: "critical",
  };
}


if (Number(values.weight) === 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be zero.",
    status: "critical",
  };
}


if (
  values.sex === "" ||
  values.sex === undefined
) {
  return {
    value: 0,
    interpretation: "Sex is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sex))
) {
  return {
    value: 0,
    interpretation: "Invalid Sex.",
    status: "critical",
  };
}


if (Number(values.sex) < 0) {
  return {
    value: 0,
    interpretation: "Sex cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sex) === 0) {
  return {
    value: 0,
    interpretation: "Sex cannot be zero.",
    status: "critical",
  };
}


if (
  values.creatinine === "" ||
  values.creatinine === undefined
) {
  return {
    value: 0,
    interpretation: "Serum Creatinine is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.creatinine))
) {
  return {
    value: 0,
    interpretation: "Invalid Serum Creatinine.",
    status: "critical",
  };
}


if (Number(values.creatinine) < 0) {
  return {
    value: 0,
    interpretation: "Serum Creatinine cannot be negative.",
    status: "critical",
  };
}


if (Number(values.creatinine) === 0) {
  return {
    value: 0,
    interpretation: "Serum Creatinine cannot be zero.",
    status: "critical",
  };
}



const age = Number(values.age);
const weight = Number(values.weight);
const wt = weight;
const sex = Number(values.sex);
const creatinine = Number(values.creatinine);


  const isFemale = values.sex === "2" || values.sex?.toLowerCase() === "female";
  const result =
    ((140 - age) * weight) / (72 * creatinine) * (isFemale ? 0.85 : 1);


  
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

if (false) {}


else if (result >= 90) {

  interpretation =
    "Normal renal function";

  status =
    "normal";

  referenceRange =
  "≥90";
}


else if (result >= 60) {

  interpretation =
    "Mild renal impairment";

  status =
    "normal";

  referenceRange =
  "60–89";
}


else if (result >= 30) {

  interpretation =
    "Moderate renal impairment";

  status =
    "low";

  referenceRange =
  "30–59";
}


else if (result >= 15) {

  interpretation =
    "Severe renal impairment";

  status =
    "low";

  referenceRange =
  "15–29";
}


else {

  interpretation =
    "Kidney failure";

  status =
    "critical";

  referenceRange =
  "<15";
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