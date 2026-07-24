import type { CalculatorDefinition } from "./calculator.types";
import { calculateFEUrea } from "./utils/internal-medicine";

export const feUreaCalculator: CalculatorDefinition = {
  id: "feurea",

  slug: "fractional-excretion-urea",

  name: "FEUrea",

  shortName: "FEUrea",

  description:
    "Calculates the fractional excretion of urea for renal evaluation.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "FEUrea = (Urine Urea / Plasma Urea) ÷ (Urine Cr / Plasma Cr) × 100",

  normalRange: "< 35% in prerenal azotemia",

  clinicalNotes:
    "FEUrea can be useful when diuretics are present and FENa is less reliable.",

  references: [
    "Renal physiology references",
    "Clinical nephrology references",
  ],

  warnings: [
    "Interpretation should be made with clinical context and urine studies.",
  ],

  keywords: [
    "FEUrea",
    "Fractional Excretion Urea",
    "Renal",
    "AKI",
  ],

  inputs: [
    {
      id: "urineUrea",
      label: "Urine Urea",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "plasmaUrea",
      label: "Plasma Urea",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 200,
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
    const urineUrea = parseFloat(values.urineUrea);
    const plasmaUrea = parseFloat(values.plasmaUrea);
    const urineCr = parseFloat(values.urineCr);
    const plasmaCr = parseFloat(values.plasmaCr);

    const feUrea = calculateFEUrea(urineUrea, plasmaUrea, urineCr, plasmaCr);

    return {
      value: feUrea,
      unit: "%",
      interpretation: "Estimated fractional excretion of urea",
      status: "normal",
    };
  },
};
