import type { CalculatorDefinition } from "./calculator.types";

export const a1cEagConverterCalculator: CalculatorDefinition = {
  id: "a1c-eag-converter",

  slug: "a1c-eag-converter",

  name: "a1c-eag-converter",

  shortName: "a1c-eag-converter",

  description:
    "Converts bidirectionally between hemoglobin A1c and estimated average glucose (eAG) using the ADA-validated ADAG formula.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["HbA1c", "Hemoglobin A1c", "Glycated Hemoglobin", "Diabetes", "Glucose", "Blood Sugar", "A1c"],

  formula: "eAG = 28.7 * a1c - 46.7",

  normalRange: "A1c 4–6%, eAG 68–126 mg/dL",

  referenceRanges: [
  {
    label: "Normal A1c",
    range: "<6.1",
  },
  {
    label: "Pre-diabetes range",
    range: "6–6.5",
  },
  {
    label: "Diabetes range",
    range: "≥6.5",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Glycemic Assessment Tools","calculators":[{"name":"A1c ↔ eAG","href":"/calculators/a1c-eag-converter","bestFor":"Bidirectional A1c ↔ eAG conversion.","limitation":"Same underlying ADAG formula."},{"name":"Estimated Average Glucose","href":"/calculators/estimated-average-glucose","bestFor":"A1c to eAG only.","limitation":"Unidirectional."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Insulin resistance assessment.","limitation":"Different glycemic measure."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["estimated-average-glucose","homa-ir","homa-b"],

  inputs: [
  {
    id: "a1c",
    label: "HbA1c",
    type: "number",
    unit: "%",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.a1c === "" ||
  values.a1c === undefined
) {
  return {
    value: 0,
    interpretation: "HbA1c is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.a1c))
) {
  return {
    value: 0,
    interpretation: "Invalid HbA1c.",
    status: "critical",
  };
}


if (Number(values.a1c) < 0) {
  return {
    value: 0,
    interpretation: "HbA1c cannot be negative.",
    status: "critical",
  };
}


if (Number(values.a1c) === 0) {
  return {
    value: 0,
    interpretation: "HbA1c cannot be zero.",
    status: "critical",
  };
}



const a1c = Number(values.a1c);


  const result =
    28.7 * a1c - 46.7;


  
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


else if (a1c < 6) {

  interpretation =
    "Normal A1c";

  status =
    "normal";

  referenceRange =
  "<6.1";
}

else if (a1c < 6.5) {

  interpretation =
    "Pre-diabetes range";

  status =
    "high";

  referenceRange =
  "6–6.5";
}


else {

  interpretation =
    "Diabetes range";

  status =
    "critical";

  referenceRange =
  "≥6.5";
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