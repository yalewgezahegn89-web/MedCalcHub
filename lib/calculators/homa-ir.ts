import type { CalculatorDefinition } from "./calculator.types";

export const homaIrCalculator: CalculatorDefinition = {
  id: "homa-ir",

  slug: "homa-ir",

  name: "HOMA-IR Calculator",

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



  clinicalNotes:
    "HOMA-IR estimates insulin resistance from fasting plasma glucose and fasting serum insulin. In the fasting steady state, a higher insulin level relative to the accompanying glucose reflects reduced tissue responsiveness to insulin; the index expresses this relationship as (glucose × insulin) / 405, with glucose in mg/dL and insulin in µU/mL.\n\nA higher value indicates greater insulin resistance. Although a cutoff near 2.5 is often cited, there is no universally accepted diagnostic threshold, and measured values vary with the insulin assay used and with population characteristics. HOMA-IR is most useful as a tool for tracking change within the same person over time (e.g., response to lifestyle or pharmacologic interventions) rather than as a threshold-based diagnostic test.\n\nThe estimate depends on a true fasting sample and a reliable insulin assay; differences in assay standardization limit comparability across laboratories and studies. It is unreliable in type 1 diabetes, in patients receiving exogenous insulin, and whenever the fasting steady-state assumption does not hold. HOMA-IR should not be used alone to diagnose diabetes or insulin resistance; it is best interpreted together with the clinical picture, glucose tolerance data, and the broader metabolic evaluation.",





  comparison: {"title":"Insulin Resistance Assessment Tools","calculators":[{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Estimating insulin resistance from fasting labs.","limitation":"Requires fasting samples; not validated in type 1 diabetes."},{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Estimating pancreatic beta-cell function.","limitation":"Reflects secretion, not resistance."},{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick inverse estimate of insulin sensitivity.","limitation":"Derived from HOMA-IR; same fasting requirement."}]},

  references: [
    "Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
  ],

  relatedCalculators: ["homa-b","insulin-sensitivity","estimated-average-glucose"],

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