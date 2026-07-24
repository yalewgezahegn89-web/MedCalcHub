import type { CalculatorDefinition } from "./calculator.types";
import { calculateCalciumPhosphateProduct } from "./utils/internal-medicine";

export const calciumPhosphateProductCalculator: CalculatorDefinition = {
  id: "calcium-phosphate-product",

  slug: "calcium-phosphate-product",

  name: "Calcium-Phosphate Product",

  shortName: "Ca × Phos",

  description:
    "Calculates the calcium-phosphate product used in renal risk assessment.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Ca × Phosphate",

  normalRange: "< 55 mg²/dL²",

  clinicalNotes:
    "An elevated calcium-phosphate product is associated with vascular calcification risk.",

  references: [
    "Nephrology references",
    "Clinical practice guidelines",
  ],

  warnings: [
    "This should be interpreted with the patient's renal and mineral metabolism status.",
  ],

  keywords: [
    "Calcium-Phosphate Product",
    "Phosphate",
    "Renal",
    "Mineral Metabolism",
  ],

  inputs: [
    {
      id: "calcium",
      label: "Calcium",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 2,
      max: 20,
      step: 0.1,
    },
    {
      id: "phosphate",
      label: "Phosphate",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 20,
      step: 0.1,
    },
  ],

  calculate(values) {
    const calcium = parseFloat(values.calcium);
    const phosphate = parseFloat(values.phosphate);

    const product = calculateCalciumPhosphateProduct(calcium, phosphate);

    return {
      value: product,
      unit: "mg²/dL²",
      interpretation: "Estimated calcium-phosphate product",
      status: "normal",
    };
  },
};
