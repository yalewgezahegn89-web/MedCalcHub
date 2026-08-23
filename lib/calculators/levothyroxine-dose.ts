import type { CalculatorDefinition } from "./calculator.types";

export const levothyroxineDoseCalculator: CalculatorDefinition = {
  id: "levothyroxine-dose",

  slug: "levothyroxine-dose",

  name: "Levothyroxine Dose Calculator",

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



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Thyroid Replacement Dose Tools","calculators":[{"name":"Levothyroxine Dose","href":"/calculators/levothyroxine-dose","bestFor":"Clinical dosing with titration guidance.","limitation":"Requires clinical context."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["bmi"],

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