import type { CalculatorDefinition } from "./calculator.types";

export const insulinSensitivityCalculator: CalculatorDefinition = {
  id: "insulin-sensitivity",

  slug: "insulin-sensitivity",

  name: "insulin-sensitivity",

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

  clinicalGuidance: {
    advice: ["Values > 0.4 indicate better insulin sensitivity; values < 0.2 suggest significant insulin resistance.","Use alongside HOMA-IR for a more intuitive representation of metabolic health.","Higher values (closer to 1.0) reflect better metabolic flexibility."],
    warnings: ["This is a derived metric from HOMA-IR and inherits all HOMA-IR limitations.","Not validated for use in type 1 diabetes.","Single fasting measurement; does not capture dynamic insulin response to meals."],
    followUp: ["If insulin sensitivity is low, assess for metabolic syndrome components.","Dietary modification and exercise are first-line interventions to improve insulin sensitivity.","Repeat testing after lifestyle changes to track improvement."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Endocrine Society","reference":"Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27:1487–1495.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Wallace TM, et al. Diabetes Care. 2004;27:1487–1495.","Matthews DR, et al. Diabetologia. 1985;28:412–419."]},

  faq: [{"question":"What is insulin sensitivity?","answer":"Insulin sensitivity measures how effectively the body's cells respond to insulin. A higher value means cells are more responsive, requiring less insulin to manage blood glucose."},{"question":"How is this different from HOMA-IR?","answer":"This is simply 1 / HOMA-IR. It presents the same information in a more intuitive direction: higher values mean better sensitivity."},{"question":"What is a good insulin sensitivity score?","answer":"A score > 0.4 is generally considered good insulin sensitivity. Below 0.2 suggests significant insulin resistance."}],

  comparison: {"title":"Insulin Resistance Assessment Tools","calculators":[{"name":"Insulin Sensitivity","href":"/calculators/insulin-sensitivity","bestFor":"Quick inverse sensitivity estimate.","limitation":"Same fasting requirement as HOMA-IR."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Standard insulin resistance estimate.","limitation":"Higher = worse (less intuitive)."},{"name":"HOMA-B","href":"/calculators/homa-b","bestFor":"Beta-cell function assessment.","limitation":"Different measure entirely."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["homa-ir","homa-b","a1c-eag-converter"],

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


else if (result >= 0.4) {

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