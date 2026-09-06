import type { CalculatorDefinition } from "./calculator.types";

export const homaBCalculator: CalculatorDefinition = {
  id: "homa-b",

  slug: "homa-b",

  name: "HOMA-B Calculator",

  shortName: "homa-b",

  description:
    "Estimates pancreatic beta-cell function from fasting plasma glucose and fasting serum insulin using the HOMA equation.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["HOMA-B", "Beta Cell Function", "Diabetes", "Insulin", "Pancreatic", "Glucose"],

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



  clinicalNotes:
    "HOMA-B estimates pancreatic beta-cell function from fasting glucose and insulin. It models the expected insulin output for a given fasting glucose: for any glucose level, a higher fasting insulin implies greater beta-cell responsiveness, expressed here as (20 × insulin) / (glucose − 3.5) with glucose in mmol/L and insulin in µU/mL. The result is reported in percent units.\n\nThe value is an indirect, fasting-based estimate of secretion, not a direct measurement of beta-cell mass or of the dynamic insulin response to a meal or glucose load. Because the index is computed relative to the prevailing fasting glucose, interpretation depends on the glucose level itself as well as on assay calibration and the fasting state.\n\nHOMA-B is not reliable in type 1 diabetes, in patients on exogenous insulin, or in acute illness, and it has limited comparability across populations and disease states. It should not be used as a standalone measure of beta-cell reserve; it is best paired with HOMA-IR and clinical evaluation to separate beta-cell dysfunction from insulin resistance.",





  comparison: {"title":"Beta-Cell Function Assessment Tools","calculators":[{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Estimating beta-cell function from fasting labs.","limitation":"Not validated in type 1 diabetes or on exogenous insulin."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Estimating insulin resistance.","limitation":"Measures resistance, not secretion."},{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick sensitivity estimate.","limitation":"Inverse of HOMA-IR; does not assess beta cells."}]},

  references: [
    "Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
  ],

  relatedCalculators: ["homa-ir","insulin-sensitivity","estimated-average-glucose"],

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

if (glucose <= 3.5) {
  return {
    value: 0,
    interpretation: "Glucose must be greater than 3.5 mmol/L for HOMA-B calculation.",
    status: "critical" as const,
  };
}

  const result =
    (20 * insulin) / (glucose - 3.5);


  
let interpretation: string;

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


else {

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