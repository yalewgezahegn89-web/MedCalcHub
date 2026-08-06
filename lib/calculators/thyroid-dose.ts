import type { CalculatorDefinition } from "./calculator.types";

export const thyroidDoseCalculator: CalculatorDefinition = {
  id: "thyroid-dose",

  slug: "thyroid-dose",

  name: "thyroid-dose",

  shortName: "thyroid-dose",

  description:
    "Estimates the starting levothyroxine replacement dose for hypothyroidism based on lean body weight.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Dose = 1.6 * weight",

  normalRange: "1.0–2.0 µg/kg/day",

  referenceRanges: [
  {
    label: "Conservative dose",
    range: "<1.1",
  },
  {
    label: "Moderate dose",
    range: "1–1.6",
  },
  {
    label: "Full replacement dose",
    range: "≥1.6",
  }
],

  clinicalGuidance: {
    advice: ["The standard full replacement dose is approximately 1.6 µg/kg/day of levothyroxine.","Elderly patients and those with cardiac disease should start at 25–50 µg/day and titrate slowly.","Adjust dose based on TSH levels checked 6–8 weeks after initiation or dose change."],
    warnings: ["This is an estimate only; individual needs vary significantly based on aetiology, thyroid reserve, and comorbidities.","Overtreatment in elderly patients increases risk of atrial fibrillation and osteoporosis.","Levothyroxine absorption is affected by food, iron, calcium, and proton pump inhibitors."],
    followUp: ["Check TSH and free T4 in 6–8 weeks after starting therapy.","Titrate dose in 12.5–25 µg increments until TSH is within target.","Monitor TSH every 6–12 months once stable."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"ATA / ETA","reference":"Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Jonklaas J, et al. Thyroid. 2014;24:1670–1751.","ATA Guidelines for Hypothyroidism. 2014.","ETA Clinical Practice Guidelines."]},

  faq: [{"question":"What is the standard dose of levothyroxine?","answer":"The full replacement dose is approximately 1.6 µg/kg/day, but many patients require less, especially the elderly or those with residual thyroid function."},{"question":"When should levothyroxine be taken?","answer":"Take on an empty stomach, 30–60 minutes before breakfast, with water only. Separate from calcium, iron, and PPIs by at least 4 hours."},{"question":"How often should TSH be checked?","answer":"TSH should be checked 6–8 weeks after any dose change and every 6–12 months once stable."}],

  comparison: {"title":"Thyroid Replacement Dose Tools","calculators":[{"name":"Thyroid Dose","href":"/calculators/thyroid-dose","bestFor":"Full replacement dose estimation.","limitation":"Weight-based estimate only."},{"name":"Levothyroxine Dose","href":"/calculators/levothyroxine-dose","bestFor":"Patient-specific dosing with titration.","limitation":"Requires more clinical input."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["levothyroxine-dose","bmi"],

  inputs: [
  {
    id: "weight",
    label: "Body Weight",
    type: "number",
    unit: "kg",
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
    interpretation: "Body Weight is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.weight))
) {
  return {
    value: 0,
    interpretation: "Invalid Body Weight.",
    status: "critical",
  };
}


if (Number(values.weight) < 0) {
  return {
    value: 0,
    interpretation: "Body Weight cannot be negative.",
    status: "critical",
  };
}


if (Number(values.weight) === 0) {
  return {
    value: 0,
    interpretation: "Body Weight cannot be zero.",
    status: "critical",
  };
}



const weight = Number(values.weight);
const wt = weight;


  const result =
    1.6 * weight;


  
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


else if (result <= 1) {

  interpretation =
    "Conservative dose";

  status =
    "low";

  referenceRange =
  "<1.1";
}


else if (result >= 1 && result <= 1.6) {

  interpretation =
    "Moderate dose";

  status =
    "normal";

  referenceRange =
  "1–1.6";
}


else if (result >= 1.6) {

  interpretation =
    "Full replacement dose";

  status =
    "high";

  referenceRange =
  "≥1.6";
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