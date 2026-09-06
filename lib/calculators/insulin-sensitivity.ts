import type { CalculatorDefinition } from "./calculator.types";

export const insulinSensitivityCalculator: CalculatorDefinition = {
  id: "insulin-sensitivity",

  slug: "insulin-sensitivity",

  name: "Insulin Sensitivity",

  shortName: "insulin-sensitivity",

  description:
    "Provides a simple estimate of insulin sensitivity as the reciprocal of HOMA-IR.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Insulin Sensitivity", "HOMA", "Diabetes", "Metabolic Syndrome", "Glucose"],

  formula: "IS = 1 / homair",

  normalRange: "> 0.4",

  referenceRanges: [
  {
    label: "Severe insulin resistance",
    range: "<0.30000000000000004",
  },
  {
    label: "Reduced insulin sensitivity",
    range: "0.2–0.4",
  },
  {
    label: "Normal insulin sensitivity",
    range: "≥0.4",
  }
],



  clinicalNotes:
    "This calculator presents insulin sensitivity as the reciprocal of HOMA-IR (1 / HOMA-IR). Because a higher HOMA-IR indicates more insulin resistance, its inverse produces a value that rises as sensitivity improves, giving clinicians and patients a more intuitive direction for at-a-glance interpretation.\n\nThe result is a mathematical transformation of the HOMA-IR estimate not a direct measurement of insulin sensitivity. It inherits every assumption of HOMA-IR, including a proper fasting steady state, a reliable insulin assay, and accurate glucose values, and it is not equivalent to a hyperinsulinemic euglycemic clamp, an oral glucose tolerance test, or other dynamic measures of insulin action.\n\nThresholds commonly shown with this index (for example a value above 0.4 indicating normal sensitivity) are illustrative rather than universally validated cutoffs. The index is unreliable in type 1 diabetes or with exogenous insulin use and does not capture meal-related or dynamic insulin responses. It should be interpreted as a quick companion to HOMA-IR and the clinical context, not as a standalone diagnosis of insulin resistance or diabetes.",





  comparison: {"title":"Insulin Resistance Assessment Tools","calculators":[{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick inverse sensitivity estimate.","limitation":"Same fasting requirement as HOMA-IR."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Standard insulin resistance estimate.","limitation":"Higher = worse (less intuitive)."},{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Beta-cell function assessment.","limitation":"Different measure entirely."}]},

  references: [
    "Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
  ],

  relatedCalculators: ["homa-ir","homa-b"],

  inputs: [
  {
    id: "homaIr",
    label: "HOMA-IR",
    type: "number",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.homaIr === "" ||
  values.homaIr === undefined
) {
  return {
    value: 0,
    interpretation: "HOMA-IR is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.homaIr))
) {
  return {
    value: 0,
    interpretation: "Invalid HOMA-IR.",
    status: "critical",
  };
}


if (Number(values.homaIr) < 0) {
  return {
    value: 0,
    interpretation: "HOMA-IR cannot be negative.",
    status: "critical",
  };
}


if (Number(values.homaIr) === 0) {
  return {
    value: 0,
    interpretation: "HOMA-IR cannot be zero.",
    status: "critical",
  };
}



const homaIr = Number(values.homaIr);


  const result =
    1 / homaIr;


  
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


else if (result <= 0.2) {

  interpretation =
    "Severe insulin resistance";

  status =
    "critical";

  referenceRange =
  "<0.30000000000000004";
}


else if (result >= 0.2 && result <= 0.4) {

  interpretation =
    "Reduced insulin sensitivity";

  status =
    "low";

  referenceRange =
  "0.2–0.4";
}


else {

  interpretation =
    "Normal insulin sensitivity";

  status =
    "normal";

  referenceRange =
  "≥0.4";
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