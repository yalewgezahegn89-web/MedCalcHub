import type { CalculatorDefinition } from "../calculator.types";

export const ckdEpiCalculator: CalculatorDefinition = {
  id: "ckd-epi",

  slug: "ckd-epi",

  name: "CKD-EPI Calculator",

  shortName: "CKD-EPI Calculator",

  description:
    "Estimates glomerular filtration rate (eGFR) using the CKD-EPI equation.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-07-31",

  keywords: [],

  formula: "CKD-EPI 2021 Creatinine Equation",

  normalRange: ">90 mL/min/1.73m²",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "KDIGO 2024 CKD Guideline",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "2",
    label: "2",
    type: "2",
    required: false,
  },
  {
    id: "2",
    label: "2",
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