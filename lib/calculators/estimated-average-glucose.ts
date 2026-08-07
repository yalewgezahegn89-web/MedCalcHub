import type { CalculatorDefinition } from "./calculator.types";

export const estimatedAverageGlucoseCalculator: CalculatorDefinition = {
  id: "estimated-average-glucose",

  slug: "estimated-average-glucose",

  name: "estimated-average-glucose",

  shortName: "estimated-average-glucose",

  description:
    "Estimates mean plasma glucose from HbA1c using the ADAG formula validated by the American Diabetes Association.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

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

  clinicalGuidance: {
    advice: ["Use eAG to translate HbA1c into a unit (mg/dL) that patients already understand from home glucose monitoring.","eAG represents the average glucose over the preceding 2–3 months.","The ADA recommends an HbA1c target of < 7% (eAG ≈ 154 mg/dL) for most non-pregnant adults with diabetes."],
    warnings: ["eAG may be inaccurate in conditions affecting red blood cell lifespan (e.g. iron deficiency anaemia, sickle cell trait, pregnancy).","This formula is derived from continuous glucose monitoring studies and may differ from self-monitored blood glucose averages.","Use as a guide only; individual glucose targets should be personalized."],
    followUp: ["If eAG is above target, review current diabetes management including diet, exercise, and medications.","Consider continuous glucose monitoring for more detailed glycemic assessment.","Recheck HbA1c in 3 months after therapy changes."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"ADA / ADAG Study","reference":"Nathan DM, Steffes MW, et al. International multicenter A1c-derived average glucose (ADAG) study. Diabetes Care. 2008;31:1913–1917.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Nathan DM, et al. Diabetes Care. 2008;31:1913–1917.","ADA Standards of Care in Diabetes. 2025."]},

  faq: [{"question":"What is estimated average glucose?","answer":"eAG converts your HbA1c into an average blood glucose value in mg/dL over the past 2–3 months, making it easier to compare with home glucose readings."},{"question":"What HbA1c equals an eAG of 126 mg/dL?","answer":"An eAG of 126 mg/dL corresponds to an HbA1c of approximately 6.0%."},{"question":"Is eAG the same as average blood glucose?","answer":"eAG is a statistical estimate of average glucose validated by CGM studies. It may not exactly match simple averages of finger-stick measurements."}],

  comparison: {"title":"Glycemic Assessment Tools","calculators":[{"name":"Estimated Average Glucose","href":"/calculators/estimated-average-glucose","bestFor":"Converting A1c to mg/dL average.","limitation":"Affected by conditions altering red cell lifespan."},{"name":"HbA1c ↔ eAG","href":"/calculators/a1c-eag-converter","bestFor":"Bidirectional A1c ↔ eAG conversion.","limitation":"Same underlying formula."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Assessing insulin resistance.","limitation":"Different glycemic measure."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["a1c-eag-converter","homa-ir","homa-b"],

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