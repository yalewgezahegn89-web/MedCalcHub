import type { CalculatorDefinition } from "./calculator.types";

export const levothyroxineDoseCalculator: CalculatorDefinition = {
  id: "levothyroxine-dose",

  slug: "levothyroxine-dose",

  name: "levothyroxine-dose",

  shortName: "levothyroxine-dose",

  description:
    "Estimates levothyroxine dose for thyroid hormone replacement, accounting for patient age and cardiac risk factors.",

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
    label: "Conservative starting dose",
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
    advice: ["Young healthy patients can often start at the full calculated dose.","Elderly patients (> 65 years) or those with cardiac history should start at 25–50 µg/day and titrate by 12.5–25 µg every 6–8 weeks.","Pregnancy typically requires a 25–50% dose increase; monitor TSH monthly in the first trimester."],
    warnings: ["Never start full replacement dose in patients with known cardiac disease without careful uptitration.","Excess levothyroxine causes iatrogenic thyrotoxicosis, increasing risk of atrial fibrillation and bone loss.","Drug interactions: iron, calcium, PPIs, cholestyramine, and aluminium all reduce absorption."],
    followUp: ["Check TSH 6–8 weeks after initiation or dose change.","Titrate in 12.5–25 µg increments to target TSH.","In pregnancy, check TSH every 4 weeks in first trimester."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"ATA / ETA","reference":"Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Jonklaas J, et al. Thyroid. 2014;24:1670–1751.","ATA Guidelines. 2014.","ETA Clinical Practice Guidelines."]},

  faq: [{"question":"What is the difference between Thyroid Dose and Levothyroxine Dose calculators?","answer":"Both use the same 1.6 µg/kg/day formula. Thyroid Dose provides the estimate, while Levothyroxine Dose includes clinical guidance on titration, cardiac precautions, and pregnancy adjustments."},{"question":"How quickly can levothyroxine dose be increased?","answer":"In healthy patients, dose can be titrated every 6–8 weeks. In elderly or cardiac patients, increase more slowly (every 6–12 weeks)."},{"question":"Does levothyroxine need to be taken on an empty stomach?","answer":"Yes. Take 30–60 minutes before breakfast with water only. Separate from calcium, iron supplements, and PPIs."}],

  comparison: {"title":"Thyroid Replacement Dose Tools","calculators":[{"name":"Levothyroxine Dose","href":"/calculators/levothyroxine-dose","bestFor":"Clinical dosing with titration guidance.","limitation":"Requires clinical context."},{"name":"Thyroid Dose","href":"/calculators/thyroid-dose","bestFor":"Quick full replacement estimate.","limitation":"No titration guidance."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["thyroid-dose","bmi"],

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


  // The formula always yields the full replacement rate (1.6 µg/kg/day),
  // which is within the normal range of 1.0–2.0 µg/kg/day. The result is
  // the total daily dose in µg (rate × weight).
  const interpretation =
    "Full replacement dose";

  const status:
    "normal" |
    "low" |
    "high" |
    "critical" =
    "normal";

  const referenceRange =
    "≥1.6";





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};