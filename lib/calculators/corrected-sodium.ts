import type { CalculatorDefinition } from "./calculator.types";

export const correctedSodiumCalculator: CalculatorDefinition = {
  id: "corrected-sodium",

  slug: "corrected-sodium",

  name: "Corrected Sodium",

  shortName: "corrected-sodium",

  description:
    "Corrects serum sodium for hyperglycemia using the conventional correction factor. Hyperglycemia draws water into the extracellular space, diluting sodium; this correction estimates what sodium would be at a normal glucose level.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Sodium", "Hyperglycemia", "Electrolytes", "Glucose", "Hyponatremia"],

  formula: "Corrected Sodium = Measured Sodium + 1.6 × (Glucose − 100) / 100",

  normalRange: "135–145 mmol/L",

  referenceRanges: [
  {
    label: "Hyponatremia (corrected)",
    range: "<134.1",
  },
  {
    label: "Normal corrected sodium",
    range: "135–145",
  },
  {
    label: "Hypernatremia (corrected)",
    range: "≥146",
  },
  {
    label: "Severe hypernatremia",
    range: "≥160",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Sodium Calculator Should I Use?","calculators":[{"name":"Corrected Sodium","href":"/calculators/corrected-sodium","bestFor":"Assessing true sodium in hyperglycemia.","limitation":"Approximate correction; less reliable at extreme glucose values."},{"name":"Sodium Deficit","href":"/calculators/sodium-deficit","bestFor":"Planning hyponatremia correction.","limitation":"Estimates deficit, not corrected sodium."},{"name":"Free Water Deficit","href":"/calculators/free-water-deficit","bestFor":"Estimating water replacement in hypernatremia.","limitation":"Does not correct sodium for glucose."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["sodium-deficit","free-water-deficit","serum-osmolality","anion-gap"],

  inputs: [
  {
    id: "sodium",
    label: "Measured Sodium",
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
    interpretation: "Measured Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sodium))
) {
  return {
    value: 0,
    interpretation: "Invalid Measured Sodium.",
    status: "critical",
  };
}


if (Number(values.sodium) < 0) {
  return {
    value: 0,
    interpretation: "Measured Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sodium) === 0) {
  return {
    value: 0,
    interpretation: "Measured Sodium cannot be zero.",
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



const sodium = Number(values.sodium);
const na = sodium;
const glucose = Number(values.glucose);


  const result =
    sodium + 1.6 * (glucose - 100) / 100;


  
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

else if (result >= 160) {

  interpretation =
    "Severe hypernatremia";

  status =
    "critical";

  referenceRange =
  "≥160";
}


else if (result >= 146) {

  interpretation =
    "Hypernatremia (corrected)";

  status =
    "high";

  referenceRange =
  "≥146";
}


else if (result >= 135) {

  interpretation =
    "Normal corrected sodium";

  status =
    "normal";

  referenceRange =
  "135–145";
}


else {

  interpretation =
    "Hyponatremia (corrected)";

  status =
    "low";

  referenceRange =
  "<134.1";
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