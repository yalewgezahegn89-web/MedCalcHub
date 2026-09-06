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
    "Estimated average glucose (eAG) is derived from the ADAG study equation relating glycated hemoglobin to average glucose: eAG (mg/dL) = 28.7 × HbA1c − 46.7. HbA1c reflects average glycemia over the preceding 2–3 months, and eAG translates it into the mg/dL units that patients see on home glucose meters.\n\nAn eAG value is a statistical estimate based on a studied population, not a direct glucose measurement, and it corresponds imperfectly to finger-stick or meter averages in any individual. It also does not convey glucose variability or the occurrence of hypoglycemic episodes.\n\nHbA1c-derived estimates assume normal red blood cell survival and unaltered hemoglobin. Hemoglobin variants, anemia, and any condition that shortens or lengthens red cell lifespan (e.g., hemolysis, recent transfusion, iron deficiency) can distort HbA1c and therefore eAG. For this reason, eAG should be interpreted alongside self-monitored glucose (SMBG) or continuous glucose monitoring (CGM) data and the full clinical context whenever possible.",





  comparison: {"title":"Glycemic Assessment Tools","calculators":[{"name":"Estimated Average Glucose","href":"/calculators/estimated-average-glucose","bestFor":"Converting A1c to mg/dL average.","limitation":"Affected by conditions altering red cell lifespan."},{"name":"HOMA-IR","href":"/calculators/homa-ir","bestFor":"Assessing insulin resistance.","limitation":"Different glycemic measure."}]},

  references: [
    "Nathan DM, et al. Translating the A1C assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.",
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