import type { CalculatorDefinition } from "./calculator.types";

export const sodiumDeficitCalculator: CalculatorDefinition = {
  id: "sodium-deficit",

  slug: "sodium-deficit",

  name: "sodium-deficit",

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

  clinicalGuidance: {
    advice: ["Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.","This estimate represents the TOTAL sodium deficit; do not attempt to correct the full deficit rapidly.","Limit sodium correction to 8–10 mmol/L in the first 24 hours and 18 mmol/L in 48 hours to reduce the risk of osmotic demyelination syndrome (ODS)."],
    warnings: ["Rapid correction of hyponatremia can cause osmotic demyelination syndrome (ODS), a devastating neurological complication.","The calculated deficit does not account for ongoing losses or ongoing free water intake.","In severe symptomatic hyponatremia, use hypertonic saline and follow institutional protocols rather than relying solely on this formula."],
    followUp: ["Check serum sodium every 2–4 hours during active correction to ensure safe rates.","If sodium correction is too rapid, consider D5W infusion or desmopressin to slow or reverse the correction.","After achieving the target, identify and treat the underlying cause of hyponatremia."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Nephrology / Internal Medicine","reference":"Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1581–1589.","Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65."]},

  faq: [{"question":"How is the sodium deficit calculated?","answer":"The sodium deficit is calculated as: TBW × (Target Na − Current Na), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total millimoles of sodium needed to reach the target."},{"question":"How fast should I correct sodium?","answer":"For chronic hyponatremia, limit correction to 8–10 mmol/L in 24 hours and 18 mmol/L in 48 hours to avoid osmotic demyelination syndrome. For acute, severely symptomatic hyponatremia, a more rapid correction may be warranted using hypertonic saline."},{"question":"What if I overshoot the target?","answer":"If sodium is corrected too rapidly, immediately slow or stop sodium replacement. D5W infusion and/or desmopressin (DDAVP) can be used to bring the sodium back down to a safe range."}],

  comparison: {"title":"Which Sodium Disorder Calculator Should I Use?","calculators":[{"name":"Sodium Deficit","href":"/calculators/sodium-deficit","bestFor":"Planning hyponatremia correction in chronic hyponatremia.","limitation":"Does not account for ongoing losses or intake."},{"name":"Free Water Deficit","href":"/calculators/free-water-deficit","bestFor":"Estimating water replacement in hypernatremia.","limitation":"Addresses hypernatremia, not hyponatremia."},{"name":"Corrected Sodium","href":"/calculators/corrected-sodium","bestFor":"Assessing true sodium in hyperglycemia.","limitation":"Does not estimate the sodium deficit."}]},

  references: [
    "MedCalcHub Clinical References",
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