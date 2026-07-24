import type { CalculatorDefinition } from "./calculator.types";

export const waterExcessCalculator: CalculatorDefinition = {
  id: "water-excess",

  slug: "water-excess",

  name: "Water Excess Calculator",

  shortName: "Water Excess",

  description:
    "Estimates excess body water in hyponatremia.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Water excess",
    "Hyponatremia",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "Water excess estimates should be interpreted with the clinical picture and ongoing fluid losses.",
  ],

  formula: "Water excess = Total body water × (1 - (Na / 140))",

  normalRange: "0 L",

  referenceRanges: [
    {
      label: "No excess",
      range: "0 L",
    },
    {
      label: "Mild excess",
      range: "1–3 L",
    },
    {
      label: "Severe excess",
      range: ">3 L",
    },
  ],

  clinicalNotes:
    "Water excess helps quantify excess free water in hyponatremia.",

  references: [
    "Adrogue HJ, Madias NE. N Engl J Med. 2000.",
    "Fluid and electrolyte disorders",
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
      id: "serumSodium",
      label: "Serum Sodium",
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
    const serumSodium = parseFloat(values.serumSodium);
    const totalBodyWater = weight * 0.6;
    const excess = totalBodyWater * (1 - (serumSodium / 140));
    const rounded = Math.round(excess * 10) / 10;

    let interpretation = "No water excess";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 3) {
      interpretation = "Severe water excess";
      status = "critical";
    } else if (rounded > 1) {
      interpretation = "Mild to moderate water excess";
      status = "high";
    }

    return {
      value: rounded,
      unit: "L",
      interpretation,
      status,
    };
  },
};
