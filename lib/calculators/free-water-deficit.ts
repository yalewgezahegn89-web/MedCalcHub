import type { CalculatorDefinition } from "./calculator.types";

export const freeWaterDeficitCalculator: CalculatorDefinition = {
  id: "free-water-deficit",

  slug: "free-water-deficit",

  name: "Free Water Deficit",

  shortName: "FWD",

  description:
    "Estimates the amount of free water needed to correct hypernatremia.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Free water deficit",
    "Hypernatremia",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "Replacement should be guided by ongoing losses and the patient’s clinical status.",
  ],

  formula: "Free Water Deficit = Total Body Water × ((Serum Na / 140) - 1)",

  normalRange: "0 L",

  referenceRanges: [
    {
      label: "No deficit",
      range: "0 L",
    },
    {
      label: "Mild deficit",
      range: "1–3 L",
    },
    {
      label: "Severe deficit",
      range: ">3 L",
    },
  ],

  clinicalNotes:
    "Free water deficit estimates the amount of water required to correct hypernatremia.",

  references: [
    "Adrogue HJ, et al. N Engl J Med. 2000.",
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
      min: 120,
      max: 180,
      step: 1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);
    const serumSodium = parseFloat(values.serumSodium);
    const totalBodyWater = weight * 0.6;
    const deficit = totalBodyWater * ((serumSodium / 140) - 1);
    const rounded = Math.round(deficit * 10) / 10;

    let interpretation = "No free water deficit";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 3) {
      interpretation = "Severe free water deficit";
      status = "critical";
    } else if (rounded > 1) {
      interpretation = "Mild to moderate free water deficit";
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
