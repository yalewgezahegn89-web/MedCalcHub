import type { CalculatorDefinition } from "./calculator.types";
import { calculateSodiumDeficit } from "./utils/internal-medicine";

export const sodiumDeficitCalculator: CalculatorDefinition = {
  id: "sodium-deficit",

  slug: "sodium-deficit",

  name: "Sodium Deficit",

  shortName: "Na Deficit",

  description:
    "Estimates sodium deficit for hyponatremia correction planning.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Sodium deficit = TBW × (Desired Na − Current Na)",

  normalRange: "0 mmol",

  clinicalNotes:
    "This estimate supports planning hyponatremia correction but should be tailored to the patient.",

  references: [
    "Clinical electrolyte guidelines",
    "Internal medicine references",
  ],

  warnings: [
    "Rapid correction of hyponatremia can be harmful.",
  ],

  keywords: [
    "Sodium Deficit",
    "Hyponatremia",
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
      min: 100,
      max: 150,
      step: 1,
    },
    {
      id: "desiredNa",
      label: "Desired Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 150,
      step: 1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);
    const currentNa = parseFloat(values.currentNa);
    const desiredNa = parseFloat(values.desiredNa);

    const deficit = calculateSodiumDeficit(weight, currentNa, desiredNa);

    return {
      value: deficit,
      unit: "mmol",
      interpretation: "Estimated sodium deficit",
      status: "normal",
    };
  },
};
