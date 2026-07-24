import type { CalculatorDefinition } from "./calculator.types";
import { calculateEstimatedAverageGlucose, calculateA1cFromEag } from "./utils/endocrinology";

export const a1cEagConverterCalculator: CalculatorDefinition = {
  id: "a1c-eag-converter",

  slug: "a1c-eag-converter",

  name: "A1c ↔ eAG Converter",

  shortName: "A1c/eAG",

  description: "Converts between hemoglobin A1c and estimated average glucose.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "eAG = 28.7 × A1c − 46.7; A1c = (eAG + 46.7) / 28.7",

  normalRange: "A1c 4–14%, eAG 70–140 mg/dL",

  clinicalNotes:
    "This converter provides a simple way to estimate average glucose from A1c and vice versa.",

  references: [
    "ADA clinical guidelines",
    "Diabetes care references",
  ],

  warnings: [
    "Use laboratory values and clinical context for patient-specific decisions.",
  ],

  keywords: ["A1c", "eAG", "Hemoglobin A1c", "Diabetes"],

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
      interpretation: "Estimated average glucose from A1c",
      status: "normal",
    };
  },
};
