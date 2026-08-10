import type { CalculatorDefinition } from "./calculator.types";

export const correctedSodiumCalculator: CalculatorDefinition = {
  id: "corrected-sodium",

  slug: "corrected-sodium",

  name: "corrected-sodium",

  shortName: "corrected-sodium",

  description:
    "Corrects serum sodium for hyperglycemia using the conventional correction factor. Hyperglycemia draws water into the extracellular space, diluting sodium; this correction estimates what sodium would be at a normal glucose level.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

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

  clinicalGuidance: {
    advice: ["Use corrected sodium in patients with significant hyperglycemia (e.g. diabetic ketoacidosis, hyperosmolar hyperglycemic state) to assess the true sodium status.","A normal corrected sodium with a low measured sodium indicates true dilutional hyponatremia; a low corrected sodium indicates true coexisting hyponatremia.","For every 100 mg/dL increase in glucose above 100, sodium decreases by approximately 1.6 mmol/L."],
    warnings: ["This correction factor (1.6) is the conventional value; some references use 2.0–2.4 for extreme hyperglycemia.","The formula assumes glucose is in mg/dL; results will be incorrect if mmol/L is used.","This correction is less accurate in patients with concurrent disorders affecting water and sodium handling (e.g. renal failure, SIADH)."],
    followUp: ["If corrected sodium is high, the patient has true hypernatremia; assess free water deficit.","If corrected sodium is low, treat the underlying hyponatremia alongside hyperglycemia management.","Recheck sodium as glucose normalizes during treatment, especially in DKA."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Internal Medicine / Endocrinology","reference":"Hillier TA, et al. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399–403.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Hillier TA, et al. Am J Med. 1999;106:399–403.","Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589."]},

  faq: [{"question":"Why does hyperglycemia lower sodium?","answer":"High glucose increases serum osmolality, drawing water from the intracellular to the extracellular space. This dilutes the serum sodium, causing a falsely low measured value. The corrected sodium estimates what the sodium would be at a normal glucose."},{"question":"What correction factor should I use?","answer":"The conventional correction factor is 1.6 mmol/L for every 100 mg/dL increase in glucose above 100 mg/dL. For very high glucose (> 400 mg/dL), some experts use a factor of 2.0–2.4."},{"question":"When should I correct sodium for glucose?","answer":"Correct sodium whenever glucose is significantly elevated (> 200 mg/dL), especially in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS), to accurately assess the patient's true sodium status."}],

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


else if (result < 135) {

  interpretation =
    "Hyponatremia (corrected)";

  status =
    "low";

  referenceRange =
  "<134.1";
}


else if (result <= 145) {

  interpretation =
    "Normal corrected sodium";

  status =
    "normal";

  referenceRange =
  "135–145";
}


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





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};