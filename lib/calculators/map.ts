import type { CalculatorDefinition } from "../calculator.types";

export const mapCalculator: CalculatorDefinition = {
  id: "map",

  slug: "map",

  name: "MAP Calculator",

  shortName: "MAP Calculator",

  description:
    "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-07-31",

  keywords: [],

  formula: "MAP = (SBP + 2 × DBP) / 3",

  normalRange: "70–100 mmHg",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "American Heart Association",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "1",
    label: "1",
    type: "1",
    required: false,
  }
],

  calculate(values) {
  

  return {
    value: "",
    interpretation: "",
    status: "normal",
  };
}