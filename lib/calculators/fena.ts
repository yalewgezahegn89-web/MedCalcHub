import type { CalculatorDefinition } from "./calculator.types";
import { calculateFENa } from "./utils/internal-medicine";

export const fenaCalculator: CalculatorDefinition = {
  id: "fena",

  slug: "fractional-excretion-sodium",

  name: "FENa",

  shortName: "FENa",

  description:
    "Calculates the fractional excretion of sodium for renal evaluation.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "FENa = (Urine Na / Plasma Na) ÷ (Urine Cr / Plasma Cr) × 100",

  normalRange: "< 1% in prerenal azotemia",

  clinicalNotes:
    "FENa is commonly used to distinguish prerenal azotemia from acute tubular necrosis.",

  references: [
    "Renal physiology references",
    "Clinical nephrology references",
  ],

  warnings: [
    "Interpretation should be made with urine studies and clinical context.",
  ],

  keywords: [
    "FENa",
    "Fractional Excretion Sodium",
    "Renal",
    "AKI",
  ],

  inputs: [
    {
      id: "urineNa",
      label: "Urine Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 300,
      step: 1,
    },
    {
      id: "plasmaNa",
      label: "Plasma Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 180,
      step: 1,
    },
    {
      id: "urineCr",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "plasmaCr",
      label: "Plasma Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
  ],

  calculate(values) {
    const urineNa = parseFloat(values.urineNa);
    const plasmaNa = parseFloat(values.plasmaNa);
    const urineCr = parseFloat(values.urineCr);
    const plasmaCr = parseFloat(values.plasmaCr);

    const fena = calculateFENa(urineNa, plasmaNa, urineCr, plasmaCr);

    return {
      value: fena,
      unit: "%",
      interpretation: "Estimated fractional excretion of sodium",
      status: "normal",
    };
  },
};
