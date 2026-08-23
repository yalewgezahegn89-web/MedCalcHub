import type { CalculatorDefinition } from "./calculator.types";

export const adrenalSteroidConverterCalculator: CalculatorDefinition = {
  id: "adrenal-steroid-converter",

  slug: "adrenal-steroid-converter",

  name: "Adrenal Steroid Converter",

  shortName: "adrenal-steroid-converter",

  description:
    "Converts between equivalent glucocorticoid and mineralocorticoid doses of commonly used adrenal steroids.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Prednisone-equivalent dose = dose × equivalence factor",

  normalRange: "Dose-dependent",

  referenceRanges: [
  {
    label: "Low-dose glucocorticoid",
    range: "≤7.5",
  },
  {
    label: "Moderate-dose glucocorticoid",
    range: "7.5–20",
  },
  {
    label: "High-dose glucocorticoid",
    range: ">20",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Steroid Conversion Reference","calculators":[{"name":"Adrenal Steroid Converter","href":"/calculators/adrenal-steroid-converter","bestFor":"Converting between equivalent steroid doses.","limitation":"Approximate equivalences only."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["levothyroxine-dose"],

  inputs: [
  {
    id: "dose",
    label: "Dose",
    type: "number",
    unit: "mg",
    required: true,
  },
  {
    id: "steroid",
    label: "Source Steroid",
    type: "select",
    required: true,
    options: [
      { label: "Hydrocortisone", value: "hydrocortisone" },
      { label: "Cortisone", value: "cortisone" },
      { label: "Prednisone", value: "prednisone" },
      { label: "Prednisolone", value: "prednisolone" },
      { label: "Methylprednisolone", value: "methylprednisolone" },
      { label: "Triamcinolone", value: "triamcinolone" },
      { label: "Dexamethasone", value: "dexamethasone" },
      { label: "Betamethasone", value: "betamethasone" },
    ],
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.dose === "" ||
  values.dose === undefined
) {
  return {
    value: 0,
    interpretation: "Dose is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.dose))
) {
  return {
    value: 0,
    interpretation: "Invalid Dose.",
    status: "critical",
  };
}


if (Number(values.dose) < 0) {
  return {
    value: 0,
    interpretation: "Dose cannot be negative.",
    status: "critical",
  };
}


if (Number(values.dose) === 0) {
  return {
    value: 0,
    interpretation: "Dose cannot be zero.",
    status: "critical",
  };
}


if (
  values.steroid === "" ||
  values.steroid === undefined
) {
  return {
    value: 0,
    interpretation: "Source Steroid is required.",
    status: "critical",
  };
}


const steroidEquivalence: Record<string, number> = {
  hydrocortisone: 0.25,
  cortisone: 0.2,
  prednisone: 1,
  prednisolone: 1,
  methylprednisolone: 1.25,
  triamcinolone: 1.25,
  dexamethasone: 6.667,
  betamethasone: 6.667,
};

const factor = steroidEquivalence[values.steroid];

if (factor === undefined) {
  return {
    value: 0,
    interpretation: "Invalid Source Steroid.",
    status: "critical",
  };
}



const dose = Number(values.dose);


  const result =
    dose * factor;


  
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


else if (result <= 7.5) {

  interpretation =
    "Low-dose glucocorticoid";

  status =
    "normal";

  referenceRange =
  "≤7.5";
}


else if (result <= 20) {

  interpretation =
    "Moderate-dose glucocorticoid";

  status =
    "high";

  referenceRange =
  "7.5–20";
}


else {

  interpretation =
    "High-dose glucocorticoid";

  status =
    "critical";

  referenceRange =
  ">20";
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