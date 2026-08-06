import type { CalculatorDefinition } from "./calculator.types";

export const freeWaterDeficitCalculator: CalculatorDefinition = {
  id: "free-water-deficit",

  slug: "free-water-deficit",

  name: "free-water-deficit",

  shortName: "free-water-deficit",

  description:
    "Estimates free water deficit in hypernatremia. Helps quantify the amount of free water needed to restore normal sodium levels.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Free Water Deficit = TBW × (Current Na / Target Na − 1)",

  normalRange: "0 L",

  referenceRanges: [
  {
    label: "No deficit",
    range: "<0.1",
  },
  {
    label: "Mild free water deficit",
    range: "0–3",
  },
  {
    label: "Moderate free water deficit",
    range: "3–7",
  },
  {
    label: "Severe free water deficit",
    range: "≥7",
  }
],

  clinicalGuidance: {
    advice: ["Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.","This estimate represents the free water deficit only; do not forget to continue ongoing maintenance fluids.","Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours to avoid cerebral edema."],
    warnings: ["The formula does not account for ongoing losses (GI, renal, insensible), which must be added to the replacement rate.","Rapid correction of hypernatremia can cause cerebral edema, which can be fatal.","In patients with underlying brain injury, rapid reduction in serum osmolality is particularly dangerous."],
    followUp: ["Monitor serum sodium every 2–4 hours during correction.","If sodium correction is too rapid, reduce the rate and reassess.","After achieving the target, identify and treat the underlying cause of hypernatremia (e.g. inadequate free water intake, diabetes insipidus, osmotic diuresis)."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Nephrology / Internal Medicine","reference":"Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1493–1499.","Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65."]},

  faq: [{"question":"How is the free water deficit calculated?","answer":"The free water deficit is calculated as: TBW × (Current Na / Target Na − 1), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total liters of free water needed."},{"question":"How fast should I correct hypernatremia?","answer":"Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours. Faster correction risks cerebral edema as water shifts into brain cells."},{"question":"Should I use D5W or hypotonic saline?","answer":"D5W (which becomes free water after glucose metabolism) or hypotonic saline (0.45% NaCl) are commonly used. The choice depends on the patient's volume status—hypotonic saline for hypovolemic hypernatremia, D5W for euvolemic or hypervolemic patients."},{"question":"What if the patient has ongoing losses?","answer":"Add estimated ongoing losses (GI losses, urinary output) to the calculated deficit. Ongoing losses must be replaced in addition to the free water deficit."}],

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
const currentNa = Number(values.currentNa);
const desiredNa = Number(values.desiredNa);


  const result =
    tbw * (desiredNa sodium / Target sodium - 1);


  
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
  "<0.1";
}


else if (result >= 0 && result <= 3) {

  interpretation =
    "Mild free water deficit";

  status =
    "low";

  referenceRange =
  "0–3";
}


else if (result >= 3 && result <= 7) {

  interpretation =
    "Moderate free water deficit";

  status =
    "high";

  referenceRange =
  "3–7";
}


else if (result >= 7) {

  interpretation =
    "Severe free water deficit";

  status =
    "critical";

  referenceRange =
  "≥7";
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