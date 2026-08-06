import type { CalculatorDefinition } from "./calculator.types";

export const homaBCalculator: CalculatorDefinition = {
  id: "homa-b",

  slug: "homa-b",

  name: "homa-b",

  shortName: "homa-b",

  description:
    "Estimates pancreatic beta-cell function from fasting plasma glucose and fasting serum insulin using the HOMA equation.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "HOMA-B = (20 * insulin) / (glucose - 3.5)",

  normalRange: "100–200%",

  referenceRanges: [
  {
    label: "Severe beta-cell dysfunction",
    range: "<50.1",
  },
  {
    label: "Reduced beta-cell function",
    range: "50–100",
  },
  {
    label: "Normal beta-cell function",
    range: "100–200",
  },
  {
    label: "Hyperinsulinemia",
    range: "≥200",
  }
],

  clinicalGuidance: {
    advice: ["HOMA-B < 50% suggests significant beta-cell dysfunction and may indicate progression toward insulin-dependent diabetes.","Pair with HOMA-IR to distinguish beta-cell failure from insulin resistance.","Useful in tracking beta-cell decline in type 2 diabetes over time."],
    warnings: ["HOMA-B values are not directly comparable across studies using different insulin assays.","In newly diagnosed type 2 diabetes, HOMA-B may be transiently elevated due to glucotoxicity-driven hyperinsulinemia.","Not validated for use in type 1 diabetes or patients on exogenous insulin."],
    followUp: ["If HOMA-B is low, consider progression of diabetes and possible need for insulin therapy.","Pair with C-peptide measurement for a more direct assessment of beta-cell function.","Monitor HbA1c and fasting glucose longitudinally."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Endocrine Society / ADA","reference":"Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Matthews DR, et al. Diabetologia. 1985;28:412–419.","ADA Standards of Care in Diabetes. 2025.","UK Prospective Diabetes Study (UKPDS)."]},

  faq: [{"question":"What does a low HOMA-B mean?","answer":"A HOMA-B below 100% suggests reduced beta-cell function, meaning the pancreas is producing less insulin than expected for the glucose level. This is common in progressive type 2 diabetes."},{"question":"How is HOMA-B different from HOMA-IR?","answer":"HOMA-B estimates how well the pancreas produces insulin (beta-cell function), while HOMA-IR estimates how well the body responds to it (insulin resistance)."},{"question":"What is normal HOMA-B?","answer":"A normal HOMA-B is approximately 100–200%. Values below 50% indicate significant beta-cell dysfunction."}],

  comparison: {"title":"Beta-Cell Function Assessment Tools","calculators":[{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Estimating beta-cell function from fasting labs.","limitation":"Not validated in type 1 diabetes or on exogenous insulin."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Estimating insulin resistance.","limitation":"Measures resistance, not secretion."},{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick sensitivity estimate.","limitation":"Inverse of HOMA-IR; does not assess beta cells."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["homa-ir","insulin-sensitivity","a1c-eag-converter","estimated-average-glucose"],

  inputs: [
  {
    id: "glucose",
    label: "Fasting Glucose",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "insulin",
    label: "Fasting Insulin",
    type: "number",
    unit: "µU/mL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.glucose === "" ||
  values.glucose === undefined
) {
  return {
    value: 0,
    interpretation: "Fasting Glucose is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.glucose))
) {
  return {
    value: 0,
    interpretation: "Invalid Fasting Glucose.",
    status: "critical",
  };
}


if (Number(values.glucose) < 0) {
  return {
    value: 0,
    interpretation: "Fasting Glucose cannot be negative.",
    status: "critical",
  };
}


if (Number(values.glucose) === 0) {
  return {
    value: 0,
    interpretation: "Fasting Glucose cannot be zero.",
    status: "critical",
  };
}


if (
  values.insulin === "" ||
  values.insulin === undefined
) {
  return {
    value: 0,
    interpretation: "Fasting Insulin is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.insulin))
) {
  return {
    value: 0,
    interpretation: "Invalid Fasting Insulin.",
    status: "critical",
  };
}


if (Number(values.insulin) < 0) {
  return {
    value: 0,
    interpretation: "Fasting Insulin cannot be negative.",
    status: "critical",
  };
}


if (Number(values.insulin) === 0) {
  return {
    value: 0,
    interpretation: "Fasting Insulin cannot be zero.",
    status: "critical",
  };
}



const glucose = Number(values.glucose);
const insulin = Number(values.insulin);


  const result =
    (20 * insulin) / (glucose - 3.5);


  
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


else if (result <= 50) {

  interpretation =
    "Severe beta-cell dysfunction";

  status =
    "critical";

  referenceRange =
  "<50.1";
}


else if (result >= 50 && result <= 100) {

  interpretation =
    "Reduced beta-cell function";

  status =
    "low";

  referenceRange =
  "50–100";
}


else if (result >= 100 && result <= 200) {

  interpretation =
    "Normal beta-cell function";

  status =
    "normal";

  referenceRange =
  "100–200";
}


else if (result >= 200) {

  interpretation =
    "Hyperinsulinemia";

  status =
    "high";

  referenceRange =
  "≥200";
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