import type { CalculatorDefinition } from "./calculator.types";

export const sodiumDeficitCalculator: CalculatorDefinition = {
  id: "sodium-deficit",

  slug: "sodium-deficit",

  name: "Sodium Deficit",

  shortName: "Na Deficit",

  description:
    "Estimates sodium deficit in hyponatremia.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Sodium deficit",
    "Hyponatremia",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "Replacement should be individualized and monitored closely.",
  ],

  formula: "Na deficit = Total body water × (desired Na - current Na)",

  normalRange: "0 mmol",

  referenceRanges: [
    {
      label: "No deficit",
      range: "0 mmol",
    },
    {
      label: "Mild deficit",
      range: "100–400 mmol",
    },
    {
      label: "Moderate/severe deficit",
      range: ">400 mmol",
    },
  ],

  clinicalNotes:
    "A sodium deficit estimate helps guide replacement in symptomatic hyponatremia.",

  references: [
    "Adrogue HJ, Madias NE. N Engl J Med. 2000.",
    "Fluid electrolyte references",
  ],

  inputs: [
    {
      id: "weight",
      label: "Body Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 200,
      step: 0.1,
    },
    {
      id: "currentSodium",
      label: "Current Serum Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 150,
      step: 1,
    },
    {
      id: "desiredSodium",
      label: "Desired Serum Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 120,
      max: 150,
      step: 1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);
    const currentSodium = parseFloat(values.currentSodium);
    const desiredSodium = parseFloat(values.desiredSodium);
    const totalBodyWater = weight * 0.6;

    const deficit = totalBodyWater * (desiredSodium - currentSodium);
    const rounded = Math.round(deficit);

    let interpretation = "No sodium deficit";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 400) {
      interpretation = "Large sodium deficit; urgent reassessment required";
      status = "critical";
    } else if (rounded > 100) {
      interpretation = "Moderate sodium deficit";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mmol",
      interpretation,
      status,
    };
  },
};
