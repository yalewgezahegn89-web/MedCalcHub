import type { CalculatorDefinition } from "./calculator.types";

export const estimatedAverageGlucoseCalculator: CalculatorDefinition = {
  id: "estimated-average-glucose",

  slug: "estimated-average-glucose",

  name: "Estimated Average Glucose (eAG)",

  shortName: "estimated-average-glucose",

  description:
    "Estimates mean plasma glucose from HbA1c using the ADAG formula validated by the American Diabetes Association.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["eAG", "Estimated Average Glucose", "HbA1c", "Diabetes", "Glucose", "Blood Sugar", "Glycated Hemoglobin"],

  formula: "eAG = 28.7 * a1c - 46.7",

  normalRange: "70–140 mg/dL",

  referenceRanges: [
  {
    label: "Normal average glucose",
    range: "<140.1",
  },
  {
    label: "Pre-diabetic range",
    range: "140–200",
  },
  {
    label: "Diabetic range",
    range: "≥200",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Glycemic Assessment Tools","calculators":[{"name":"Estimated Average Glucose","href":"/calculators/estimated-average-glucose","bestFor":"Converting A1c to mg/dL average.","limitation":"Affected by conditions altering red cell lifespan."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Assessing insulin resistance.","limitation":"Different glycemic measure."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["homa-ir","homa-b"],

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


else if (result <= 140) {

  interpretation =
    "Normal average glucose";

  status =
    "normal";

  referenceRange =
  "<140.1";
}


else if (result >= 140 && result <= 200) {

  interpretation =
    "Pre-diabetic range";

  status =
    "high";

  referenceRange =
  "140–200";
}


else if (result >= 200) {

  interpretation =
    "Diabetic range";

  status =
    "critical";

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