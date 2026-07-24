import type { CalculatorDefinition } from "./calculator.types";
import { calculateEstimatedAverageGlucose } from "./utils/endocrinology";

export const estimatedAverageGlucoseCalculator: CalculatorDefinition = {
  id: "estimated-average-glucose",

  slug: "estimated-average-glucose",

  name: "Estimated Average Glucose",

  shortName: "eAG",

  description: "Estimates average glucose from glycated hemoglobin (A1c).",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "eAG = 28.7 × A1c − 46.7",

  normalRange: "~70–140 mg/dL",

  referenceRanges: [
    { label: "Target range", range: "~70–140 mg/dL" },
  ],

  clinicalNotes:
    "Estimated average glucose is used to translate glycated hemoglobin into an average daily glucose value.",

  references: [
    "ADA clinical guidelines",
    "Diabetes care references",
  ],

  warnings: [
    "This is an estimate and should not replace glucose monitoring or laboratory interpretation.",
  ],

  keywords: ["Estimated Average Glucose", "eAG", "HbA1c", "Diabetes"],

  inputs: [
    {
      id: "a1c",
      label: "Hemoglobin A1c",
      type: "number",
      unit: "%",
      required: true,
      min: 4,
      max: 14,
      step: 0.1,
    },
  ],

  calculate(values) {
    const a1c = parseFloat(values.a1c);

    const eag = calculateEstimatedAverageGlucose(a1c);

    return {
      value: eag,
      unit: "mg/dL",
      interpretation: "Estimated average glucose",
      status: "normal",
    };
  },
};
