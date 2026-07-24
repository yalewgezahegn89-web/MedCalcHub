import type { CalculatorDefinition } from "./calculator.types";
import { calculateHomaB } from "./utils/endocrinology";

export const homaBCalculator: CalculatorDefinition = {
  id: "homa-b",

  slug: "homa-b",

  name: "HOMA-B",

  shortName: "HOMA-B",

  description: "Estimates pancreatic beta-cell function from fasting glucose and fasting insulin.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "HOMA-B = (20 × Insulin) / (Glucose − 3.5)",

  normalRange: "~100–200%",

  referenceRanges: [
    { label: "Typical range", range: "~100–200%" },
  ],

  clinicalNotes:
    "HOMA-B provides a simple estimate of beta-cell function and is commonly used in diabetes evaluation.",

  references: [
    "Matthews DR, et al.",
    "Diabetes care references",
  ],

  warnings: [
    "Interpretation should be paired with fasting glucose, insulin, and clinical context.",
  ],

  keywords: ["HOMA-B", "Beta-cell function", "Endocrinology", "Diabetes"],

  inputs: [
    {
      id: "glucose",
      label: "Fasting Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 40,
      max: 400,
      step: 1,
    },
    {
      id: "insulin",
      label: "Fasting Insulin",
      type: "number",
      unit: "µU/mL",
      required: true,
      min: 1,
      max: 400,
      step: 0.1,
    },
  ],

  calculate(values) {
    const glucose = parseFloat(values.glucose);
    const insulin = parseFloat(values.insulin);

    const homaB = calculateHomaB(glucose, insulin);

    return {
      value: homaB,
      interpretation: "Estimated beta-cell function",
      status: "normal",
    };
  },
};
