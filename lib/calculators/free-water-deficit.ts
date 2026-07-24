import type { CalculatorDefinition } from "./calculator.types";
import { calculateFreeWaterDeficit } from "./utils/internal-medicine";

export const freeWaterDeficitCalculator: CalculatorDefinition = {
  id: "free-water-deficit",

  slug: "free-water-deficit",

  name: "Free Water Deficit",

  shortName: "FWD",

  description:
    "Estimates free water deficit in hypernatremia.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Free water deficit = TBW × (Current Na / Desired Na − 1)",

  normalRange: "0 L",

  clinicalNotes:
    "This estimate helps guide correction of hypernatremia.",

  references: [
    "Clinical electrolyte guidelines",
    "Internal medicine references",
  ],

  warnings: [
    "Correction should be individualized and monitored closely.",
  ],

  keywords: [
    "Free Water Deficit",
    "Hypernatremia",
    "Electrolytes",
    "Fluids",
  ],

  inputs: [
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 300,
      step: 0.1,
    },
    {
      id: "currentNa",
      label: "Current Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 120,
      max: 180,
      step: 1,
    },
    {
      id: "desiredNa",
      label: "Desired Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 120,
      max: 180,
      step: 1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);
    const currentNa = parseFloat(values.currentNa);
    const desiredNa = parseFloat(values.desiredNa);

    const deficit = calculateFreeWaterDeficit(weight, currentNa, desiredNa);

    return {
      value: deficit,
      unit: "L",
      interpretation: "Estimated free water deficit",
      status: "normal",
    };
  },
};
