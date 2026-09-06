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



  clinicalNotes:
    "The Cockcroft-Gault equation estimates creatinine clearance (CrCl) from age, weight, sex, and serum creatinine. It was the first widely adopted method for estimating renal function before direct GFR measurement became practical, and it remains embedded in many medication dosing guidelines. The equation outputs an absolute CrCl in mL/min using actual body weight, adjusted for sex.\n\nThe estimated creatinine clearance should not be equated with measured GFR or with eGFR reported by MDRD or CKD-EPI. Those equations report GFR normalized to body surface area (mL/min/1.73m2), whereas Cockcroft-Gault outputs an absolute clearance (mL/min). Different equations also require different serum creatinine units (notably mg/dL versus micromol/L); for the standard form of this equation, creatinine must be entered in mg/dL. Converting from micromol/L requires dividing by 88.4 before entry.\n\nThe estimate is most reliable in adults with stable renal function and body weight near the population average. It becomes progressively less accurate at extremes of body size, in the very old or very young, with impaired muscle mass, amputation, pregnancy, ascites, severe edema, or rapidly changing renal function. Patients with significantly abnormal weight should have dosing decisions cross-referenced against the specific equation recommended in the source guideline.\n\nThis estimate supports clinical decision-making in a medication dosing context and is not a diagnosis of kidney disease. Transplant recipients, patients with unusual body composition, or anyone with rapidly changing creatinine should have dosing confirmed against the guideline-appropriate equation. Specialist review may be warranted when the result is discordant with the clinical picture.",





  comparison: {"title":"Which Kidney Calculator Should I Use?","calculators":[{"name":"Cockcroft-Gault","href":"/calculators/cockcroft-gault","bestFor":"Medication dosing adjustment.","limitation":"Less accurate for estimating true GFR."},{"name":"CKD-EPI 2021","href":"/calculators/ckd-epi-2021","bestFor":"Routine kidney function assessment and CKD staging.","limitation":"Not preferred for medication dosing."},{"name":"MDRD","href":"/calculators/mdrd","bestFor":"Historical comparison.","limitation":"Largely replaced by CKD-EPI."}]},

  references: [
    "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.",
    "KDIGO 2024 Working Group. Kidney Disease: Improving Global Outcomes (KDIGO) 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117-S314.",
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
  "Result calculated. Interpret in clinical context.";

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