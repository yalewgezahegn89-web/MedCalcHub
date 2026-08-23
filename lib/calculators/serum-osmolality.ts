import type { CalculatorDefinition } from "./calculator.types";

export const serumOsmolalityCalculator: CalculatorDefinition = {
  id: "serum-osmolality",

  slug: "serum-osmolality",

  name: "Serum Osmolality",

  shortName: "serum-osmolality",

  description:
    "Calculates the estimated serum osmolality using sodium, glucose, and blood urea nitrogen (BUN). Useful in evaluating electrolyte disorders, dehydration, toxic alcohol ingestion, and calculating the osmolar gap.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Osmolality", "Electrolytes", "Sodium", "Glucose", "BUN", "Hyponatremia", "Toxicology"],

  formula: "Calculated Osmolality = 2 × Na + Glucose / 18 + BUN / 2.8",

  normalRange: "275–295 mOsm/kg",

  referenceRanges: [
  {
    label: "Low osmolality",
    range: "<274.1",
  },
  {
    label: "Normal osmolality",
    range: "275–295",
  },
  {
    label: "High osmolality",
    range: "≥296",
  },
  {
    label: "Critically elevated osmolality",
    range: "≥320",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Osmolality Calculator Should I Use?","calculators":[{"name":"Serum Osmolality","href":"/calculators/serum-osmolality","bestFor":"Estimating serum osmolality from basic labs.","limitation":"Does not account for ethanol or unmeasured osmoles."},{"name":"Osmolar Gap","href":"/calculators/osmolar-gap","bestFor":"Detecting toxic alcohol ingestion.","limitation":"Requires a measured osmolality from the lab."},{"name":"Corrected Sodium","href":"/calculators/corrected-sodium","bestFor":"Adjusting sodium for hyperglycemia.","limitation":"Assesses sodium, not total osmolality."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["osmolar-gap","corrected-sodium","anion-gap","sodium-deficit"],

  inputs: [
  {
    id: "sodium",
    label: "Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "glucose",
    label: "Glucose",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "bun",
    label: "BUN",
    type: "number",
    unit: "mg/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.sodium === "" ||
  values.sodium === undefined
) {
  return {
    value: 0,
    interpretation: "Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sodium))
) {
  return {
    value: 0,
    interpretation: "Invalid Sodium.",
    status: "critical",
  };
}


if (Number(values.sodium) < 0) {
  return {
    value: 0,
    interpretation: "Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sodium) === 0) {
  return {
    value: 0,
    interpretation: "Sodium cannot be zero.",
    status: "critical",
  };
}


if (
  values.glucose === "" ||
  values.glucose === undefined
) {
  return {
    value: 0,
    interpretation: "Glucose is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.glucose))
) {
  return {
    value: 0,
    interpretation: "Invalid Glucose.",
    status: "critical",
  };
}


if (Number(values.glucose) < 0) {
  return {
    value: 0,
    interpretation: "Glucose cannot be negative.",
    status: "critical",
  };
}


if (Number(values.glucose) === 0) {
  return {
    value: 0,
    interpretation: "Glucose cannot be zero.",
    status: "critical",
  };
}


if (
  values.bun === "" ||
  values.bun === undefined
) {
  return {
    value: 0,
    interpretation: "BUN is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.bun))
) {
  return {
    value: 0,
    interpretation: "Invalid BUN.",
    status: "critical",
  };
}


if (Number(values.bun) < 0) {
  return {
    value: 0,
    interpretation: "BUN cannot be negative.",
    status: "critical",
  };
}


if (Number(values.bun) === 0) {
  return {
    value: 0,
    interpretation: "BUN cannot be zero.",
    status: "critical",
  };
}



const sodium = Number(values.sodium);
const na = sodium;
const glucose = Number(values.glucose);
const bun = Number(values.bun);


  const result =
    2 * sodium + glucose / 18 + bun / 2.8;


  
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


else if (result >= 320) {

  interpretation =
    "Critically elevated osmolality";

  status =
    "critical";

  referenceRange =
  "≥320";
}


else if (result >= 296) {

  interpretation =
    "High osmolality";

  status =
    "high";

  referenceRange =
  "≥296";
}


else if (result >= 275) {

  interpretation =
    "Normal osmolality";

  status =
    "normal";

  referenceRange =
  "275–295";
}


else {

  interpretation =
    "Low osmolality";

  status =
    "low";

  referenceRange =
  "<274.1";
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