import type { CalculatorDefinition } from "./calculator.types";

export const calciumPhosphateProductCalculator: CalculatorDefinition = {
  id: "calcium-phosphate-product",

  slug: "calcium-phosphate-product",

  name: "Calcium-Phosphate Product",

  shortName: "Ca × P",

  description:
    "Calculates the calcium-phosphate product as a marker for soft tissue calcification risk.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Calcium phosphate",
    "CKD",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "The calcium-phosphate product is a risk marker and should be interpreted alongside renal function and clinical status.",
  ],

  formula: "Ca × P = Calcium × Phosphate",

  normalRange: "<55 mg²/dL²",

  referenceRanges: [
    {
      label: "Low risk",
      range: "<55 mg²/dL²",
    },
    {
      label: "Elevated risk",
      range: "≥55 mg²/dL²",
    },
  ],

  clinicalNotes:
    "An elevated calcium-phosphate product is associated with increased risk of vascular calcification in chronic kidney disease.",

  references: [
    "Block GA, et al. Kidney Int. 1998.",
    "CKD mineral bone disorder",
  ],

  inputs: [
    {
      id: "calcium",
      label: "Serum Calcium",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 4,
      max: 20,
      step: 0.1,
    },
    {
      id: "phosphate",
      label: "Serum Phosphate",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 12,
      step: 0.1,
    },
  ],

  calculate(values) {
    const calcium = parseFloat(values.calcium);
    const phosphate = parseFloat(values.phosphate);
    const product = calcium * phosphate;
    const rounded = Math.round(product * 10) / 10;

    let interpretation = "Calcium-phosphate product within low-risk range";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded >= 55) {
      interpretation = "Elevated calcium-phosphate product; vascular calcification risk increased";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mg²/dL²",
      interpretation,
      status,
    };
  },
};
