import type { CalculatorDefinition } from "./calculator.types";

export const homaIrCalculator: CalculatorDefinition = {
  id: "homa-ir",

  slug: "homa-ir",

  name: "homa-ir",

  shortName: "homa-ir",

  description:
    "Estimates insulin resistance from fasting plasma glucose and fasting serum insulin using the Homeostasis Model Assessment (HOMA) equation.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["HOMA-IR", "Insulin Resistance", "Diabetes", "Metabolic Syndrome", "Glucose", "Insulin"],

  formula: "HOMA-IR = (glucose * insulin) / 405",

  normalRange: "< 2.5",

  referenceRanges: [
  {
    label: "Normal insulin sensitivity",
    range: "<2.6",
  },
  {
    label: "Mild insulin resistance",
    range: "2.5–5",
  },
  {
    label: "Severe insulin resistance",
    range: "≥5",
  }
],

  clinicalGuidance: {
    advice: ["HOMA-IR > 2.5 is commonly used as the threshold for identifying insulin resistance in clinical research and practice.","Pair HOMA-IR with waist circumference, lipid profile, and blood pressure for a full metabolic syndrome assessment.","Best interpreted alongside HOMA-B to differentiate insulin resistance from beta-cell dysfunction."],
    warnings: ["HOMA-IR is validated for fasting conditions only; non-fasting values are unreliable.","Less accurate in patients with advanced beta-cell failure (e.g. type 1 diabetes or late-stage type 2 diabetes).","Insulin assay variability between laboratories may affect absolute HOMA-IR values."],
    followUp: ["If HOMA-IR is elevated, evaluate for metabolic syndrome and consider an oral glucose tolerance test.","Monitor lipid panel and liver function for non-alcoholic fatty liver disease.","Consider lifestyle intervention and repeat HOMA-IR in 3–6 months."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Endocrine Society / ADA","reference":"Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Matthews DR, et al. Diabetologia. 1985;28:412–419.","ADA Standards of Care in Diabetes. 2025.","Endocrine Society Clinical Practice Guidelines."]},

  faq: [{"question":"What does a high HOMA-IR mean?","answer":"A HOMA-IR > 2.5 suggests insulin resistance, meaning the body's cells are not responding efficiently to insulin. This is a risk factor for type 2 diabetes, metabolic syndrome, and cardiovascular disease."},{"question":"What are the units of HOMA-IR?","answer":"HOMA-IR is unitless. It is calculated using fasting glucose in mg/dL and fasting insulin in µU/mL: (glucose × insulin) / 405."},{"question":"How does HOMA-IR differ from HOMA-B?","answer":"HOMA-IR estimates insulin resistance, while HOMA-B estimates pancreatic beta-cell function. Both use the same fasting glucose and insulin values but different formulas."},{"question":"When should HOMA-IR be measured?","answer":"HOMA-IR requires fasting for at least 8 hours. It is best measured in the morning before any food intake."}],

  comparison: {"title":"Insulin Resistance Assessment Tools","calculators":[{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Estimating insulin resistance from fasting labs.","limitation":"Requires fasting samples; not validated in type 1 diabetes."},{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Estimating pancreatic beta-cell function.","limitation":"Reflects secretion, not resistance."},{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick inverse estimate of insulin sensitivity.","limitation":"Derived from HOMA-IR; same fasting requirement."},{"name":"HbA1c ↔ eAG","href":"/calculators/a1c-eag-converter","bestFor":"Converting A1c to average glucose.","limitation":"Does not directly measure insulin resistance."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["homa-b","insulin-sensitivity","estimated-average-glucose","a1c-eag-converter"],

  inputs: [
  {
    id: "glucose",
    label: "Fasting Glucose",
    type: "number",
    unit: "mg/dL",
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
    (glucose * insulin) / 405;


  
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


else if (result <= 2.5) {

  interpretation =
    "Normal insulin sensitivity";

  status =
    "normal";

  referenceRange =
  "<2.6";
}


else if (result >= 2.5 && result <= 5) {

  interpretation =
    "Mild insulin resistance";

  status =
    "high";

  referenceRange =
  "2.5–5";
}


else if (result >= 5) {

  interpretation =
    "Severe insulin resistance";

  status =
    "critical";

  referenceRange =
  "≥5";
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