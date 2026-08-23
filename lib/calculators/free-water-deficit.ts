import type { CalculatorDefinition } from "./calculator.types";
import { calculateFreeWaterDeficit } from "./utils/internal-medicine";

export const freeWaterDeficitCalculator: CalculatorDefinition = {
  id: "free-water-deficit",

  slug: "free-water-deficit",

  name: "Free Water Deficit",

  shortName: "free-water-deficit",

  description:
    "Estimates free water deficit in hypernatremia. Helps quantify the amount of free water needed to restore normal sodium levels.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Free Water Deficit", "Hypernatremia", "Electrolytes", "Sodium", "Fluid Management", "Dehydration"],

  formula: "Free Water Deficit = 0.6 * weight * (currentNa / desiredNa - 1)",

  normalRange: "0 L",

  referenceRanges: [
  {
    label: "No deficit",
    range: "≤0",
  },
  {
    label: "Mild free water deficit",
    range: "0.1–3",
  },
  {
    label: "Moderate free water deficit",
    range: "3.1–7",
  },
  {
    label: "Severe free water deficit",
    range: ">7",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Sodium Disorder Calculator Should I Use?","calculators":[{"name":"Free Water Deficit","href":"/calculators/free-water-deficit","bestFor":"Estimating water replacement in hypernatremia.","limitation":"Does not account for ongoing losses."},{"name":"Sodium Deficit","href":"/calculators/sodium-deficit","bestFor":"Planning hyponatremia correction.","limitation":"Addresses hyponatremia, not hypernatremia."},{"name":"Corrected Sodium","href":"/calculators/corrected-sodium","bestFor":"Assessing true sodium in hyperglycemia.","limitation":"Does not estimate the free water deficit."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["sodium-deficit","corrected-sodium","serum-osmolality","maintenance-fluids"],

  inputs: [
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
  },
  {
    id: "currentNa",
    label: "Current Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "desiredNa",
    label: "Desired Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.weight === "" ||
  values.weight === undefined
) {
  return {
    value: 0,
    interpretation: "Weight is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.weight))
) {
  return {
    value: 0,
    interpretation: "Invalid Weight.",
    status: "critical",
  };
}


if (Number(values.weight) < 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be negative.",
    status: "critical",
  };
}


if (Number(values.weight) === 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be zero.",
    status: "critical",
  };
}


if (
  values.currentNa === "" ||
  values.currentNa === undefined
) {
  return {
    value: 0,
    interpretation: "Current Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.currentNa))
) {
  return {
    value: 0,
    interpretation: "Invalid Current Sodium.",
    status: "critical",
  };
}


if (Number(values.currentNa) < 0) {
  return {
    value: 0,
    interpretation: "Current Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.currentNa) === 0) {
  return {
    value: 0,
    interpretation: "Current Sodium cannot be zero.",
    status: "critical",
  };
}


if (
  values.desiredNa === "" ||
  values.desiredNa === undefined
) {
  return {
    value: 0,
    interpretation: "Desired Sodium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.desiredNa))
) {
  return {
    value: 0,
    interpretation: "Invalid Desired Sodium.",
    status: "critical",
  };
}


if (Number(values.desiredNa) < 0) {
  return {
    value: 0,
    interpretation: "Desired Sodium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.desiredNa) === 0) {
  return {
    value: 0,
    interpretation: "Desired Sodium cannot be zero.",
    status: "critical",
  };
}



const weight = Number(values.weight);
const wt = weight;
const currentNa = Number(values.currentNa);
const currentSodium = currentNa;
const desiredNa = Number(values.desiredNa);
const targetNa = desiredNa;
const targetSodium = desiredNa;
const desiredSodium = desiredNa;


  const result =
    calculateFreeWaterDeficit(weight, currentNa, desiredNa);


  
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


else if (result <= 0) {

  interpretation =
    "No deficit";

  status =
    "normal";

  referenceRange =
  "≤0";
}


else if (result <= 3) {

  interpretation =
    "Mild free water deficit";

  status =
    "low";

  referenceRange =
  "0.1–3";
}


else if (result <= 7) {

  interpretation =
    "Moderate free water deficit";

  status =
    "high";

  referenceRange =
  "3.1–7";
}


else {

  interpretation =
    "Severe free water deficit";

  status =
    "critical";

  referenceRange =
  ">7";
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