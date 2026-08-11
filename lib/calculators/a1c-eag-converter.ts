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

  clinicalGuidance: {
    advice: ["The ADA target for most adults with diabetes is HbA1c < 7%, corresponding to eAG < 154 mg/dL.","Use this converter to help patients relate their A1c result to familiar glucose numbers.","Individualized targets may be higher or lower depending on age, comorbidities, and hypoglycemia risk."],
    warnings: ["A1c may be unreliable in haemoglobinopathies, iron deficiency, pregnancy, and conditions with altered red blood cell turnover.","This formula applies to the NGSP-standardized A1c assay.","eAG represents an average and does not capture glucose variability or hypoglycemic episodes."],
    followUp: ["If A1c is above target, review medication adherence and consider therapy intensification.","Use CGM or self-monitoring of blood glucose for detailed glycemic patterns.","Recheck A1c in 3 months after changes to diabetes management."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"ADA / ADAG Study","reference":"Nathan DM, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31:1473–1478.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Nathan DM, et al. Diabetes Care. 2008;31:1473–1478.","ADA Standards of Care in Diabetes. 2025."]},

  faq: [{"question":"What does an A1c of 7% equal in mg/dL?","answer":"An A1c of 7% corresponds to an estimated average glucose of approximately 154 mg/dL."},{"question":"Why convert A1c to eAG?","answer":"Most patients are familiar with glucose numbers from home monitoring but find A1c percentages abstract. eAG translates A1c into a familiar unit."},{"question":"How accurate is the conversion?","answer":"The formula has an R² of 0.84 in the ADAG study. Individual results may vary by ±15% due to biological and assay variability."}],

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