import type { CalculatorDefinition } from "./calculator.types";

export const sodiumDeficitCalculator: CalculatorDefinition = {
  id: "sodium-deficit",

  slug: "sodium-deficit",

  name: "Sodium Deficit",

  shortName: "sodium-deficit",

  description:
    "Estimates sodium deficit for hyponatremia correction planning. Helps determine the total amount of sodium needed to raise serum sodium to a target level.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Sodium Deficit", "Hyponatremia", "Electrolytes", "Sodium", "Fluid Management"],

  formula: "Sodium Deficit = 0.6 * weight * (desiredNa - currentNa)",

  normalRange: "0 mmol",

  referenceRanges: [
  {
    label: "Deficit below normal range",
    range: "<-100",
  },
  {
    label: "Normal (no deficit)",
    range: "-100–0",
  },
  {
    label: "Sodium deficit present",
    range: "≥0",
  },
  {
    label: "Large sodium deficit",
    range: "≥500",
  }
],



  clinicalNotes:
    "This calculator estimates total body sodium deficit using the Adrogué–Madias formula: deficit = 0.6 × body weight (kg) × (target Na⁺ − current Na⁺). The 0.6 factor approximates total body water as a fraction of body weight and assumes a relatively homogeneous distribution of sodium deficit throughout body water compartments.\n\nThe calculated value represents a theoretical estimate of sodium deficit at the time of calculation, not a prescription for the amount or rate of sodium replacement. Actual correction depends on the cause of hyponatremia (hypovolemic, euvolemic, hypervolemic), symptom severity, chronicity of the sodium derangement, volume status, choice of replacement fluid, rate of correction strategy, and ongoing monitoring. The deficit must be distributed over time with attention to avoiding overly rapid correction, which carries a risk of osmotic demyelination syndrome.\n\nCritical limitations: The formula uses a fixed distribution factor that does not account for age, sex, body composition, or the underlying pathophysiology. It does not estimate ongoing sodium losses, gastrointestinal or urinary. It should not be used to set a rigid replacement target. In acute symptomatic hyponatremia, treatment decisions must be guided by clinical urgency and specialist input, not by a calculated deficit alone. This tool is intended for clinical planning support, not as a replacement for individualized management.",





  comparison: {"title":"Which Sodium Disorder Calculator Should I Use?","calculators":[{"name":"Sodium Deficit","href":"/calculators/sodium-deficit","bestFor":"Planning hyponatremia correction in chronic hyponatremia.","limitation":"Does not account for ongoing losses or intake."},{"name":"Free Water Deficit","href":"/calculators/free-water-deficit","bestFor":"Estimating water replacement in hypernatremia.","limitation":"Addresses hypernatremia, not hyponatremia."},{"name":"Corrected Sodium","href":"/calculators/corrected-sodium","bestFor":"Assessing true sodium in hyperglycemia.","limitation":"Does not estimate the sodium deficit."}]},

  references: [
    "Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.",
  ],

  relatedCalculators: ["free-water-deficit","corrected-sodium","serum-osmolality","fluid-requirement"],

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
    0.6 * weight * (desiredNa - currentNa);


  
let interpretation =
  "Result calculated. Interpret in clinical context.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";

if (false) {}

else if (result < -100) {

  interpretation =
    "Deficit below normal range";

  status =
    "low";

  referenceRange =
  "<-100";
}


else if (result <= 0) {

  interpretation =
    "Normal (no deficit)";

  status =
    "normal";

  referenceRange =
  "-100–0";
}

else if (result >= 500) {

  interpretation =
    "Large sodium deficit";

  status =
    "critical";

  referenceRange =
  "≥500";
}


else {

  interpretation =
    "Sodium deficit present";

  status =
    "high";

  referenceRange =
  "≥0";
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