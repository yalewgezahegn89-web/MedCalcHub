import type { CalculatorDefinition } from "./calculator.types";
import { calculateCorrectedSodium } from "./utils/internal-medicine";

export const correctedSodiumCalculator: CalculatorDefinition = {
  id: "corrected-sodium",

  slug: "corrected-sodium",

  name: "Corrected Sodium",

  shortName: "Na Corr",

  description:
    "Corrects serum sodium for hyperglycemia using the conventional correction factor.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Corrected sodium = measured sodium + 1.6 × (glucose − 100) / 100",

  normalRange: "135–145 mmol/L",

  clinicalNotes:
    "Hyperglycemia can lower measured serum sodium; corrected serum sodium is often used when interpreting hyponatremia.",

  references: [
    "Clinical electrolyte guidelines",
    "Internal medicine references",
  ],

  warnings: [
    "This is a rough correction and should be interpreted alongside the clinical picture.",
  ],

  keywords: [
    "Corrected Sodium",
    "Hyperglycemia",
    "Hyponatremia",
    "Electrolytes",
  ],

  inputs: [
    {
      id: "sodium",
      label: "Measured Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 160,
      step: 1,
    },
    {
      id: "glucose",
      label: "Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 80,
      max: 800,
      step: 1,
    },
  ],

  calculate(values) {
    const sodium = parseFloat(values.sodium);
    const glucose = parseFloat(values.glucose);

    const corrected = calculateCorrectedSodium(sodium, glucose);

    return {
      value: corrected,
      unit: "mmol/L",
      interpretation: "Corrected serum sodium",
      status: "normal",
    };
  },
};
