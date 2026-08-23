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
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Beta-Cell Function Assessment Tools","calculators":[{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Estimating beta-cell function from fasting labs.","limitation":"Not validated in type 1 diabetes or on exogenous insulin."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Estimating insulin resistance.","limitation":"Measures resistance, not secretion."},{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick sensitivity estimate.","limitation":"Inverse of HOMA-IR; does not assess beta cells."}]},

  references: [
    "MedCalcHub Clinical References",
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