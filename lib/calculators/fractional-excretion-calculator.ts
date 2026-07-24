import type { CalculatorDefinition } from "./calculator.types";
import { calculateFractionalExcretion } from "./utils/internal-medicine";

export const fractionalExcretionCalculator: CalculatorDefinition = {
  id: "fractional-excretion-calculator",

  slug: "fractional-excretion-calculator",

  name: "Fractional Excretion Calculator",

  shortName: "FE",

  description:
    "Calculates fractional excretion of sodium as a renal assessment tool.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "FE = (Urine Na / Plasma Na) ÷ (Urine Cr / Plasma Cr) × 100",

  normalRange: "< 1% in prerenal azotemia",

  clinicalNotes:
    "Fractional excretion helps distinguish prerenal azotemia from intrinsic renal injury.",

  references: [
    "Renal physiology references",
    "Clinical nephrology references",
  ],

  warnings: [
    "Interpretation should always be made in the context of renal function and urine chemistry.",
  ],

  keywords: [
    "Fractional Excretion",
    "Renal",
    "AKI",
    "FENa",
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

    const fe = calculateFractionalExcretion(urineNa, plasmaNa, urineCr, plasmaCr);

    return {
      value: fe,
      unit: "%",
      interpretation: "Estimated fractional excretion",
      status: "normal",
    };
  },
};
