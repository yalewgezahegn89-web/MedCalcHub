import type { CalculatorDefinition } from "./calculator.types";
import { calculateCorrectedCalcium } from "./utils/electrolytes";

export const correctedCalciumCalculator: CalculatorDefinition = {
  id: "corrected-calcium",

  slug: "corrected-calcium",

  name: "Corrected Calcium",

  shortName: "Ca Corr",

  description:
    "Calculates corrected serum calcium using the Payne formula.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Corrected Calcium",
    "Calcium",
    "Albumin",
    "Payne Formula",
    "Electrolytes",
  ],

  warnings: [
    "The corrected calcium formula is an estimate and may be inaccurate in critically ill patients.",
  ],

  formula:
    "Corrected Calcium = Measured Calcium + 0.8 × (4 − Albumin)",

  normalRange: "8.5–10.5 mg/dL",

  clinicalNotes:
    "Corrected calcium estimates the serum calcium concentration after adjusting for low albumin levels.",

  references: [
    "Payne RB, et al.",
    "UpToDate",
  ],

  inputs: [
    {
      id: "calcium",
      label: "Measured Calcium",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 2,
      max: 20,
      step: 0.1,
    },
    {
      id: "albumin",
      label: "Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 0.5,
      max: 6,
      step: 0.1,
    },
  ],

  calculate(values) {
    const calcium = parseFloat(values.calcium);
    const albumin = parseFloat(values.albumin);

    const rounded = calculateCorrectedCalcium(
      calcium,
      albumin,
    );

    let interpretation: string;
    let status: "low" | "normal" | "high";

    if (rounded < 8.5) {
      interpretation = "Hypocalcemia";
      status = "low";
    } else if (rounded <= 10.5) {
      interpretation = "Normal corrected calcium";
      status = "normal";
    } else {
      interpretation = "Hypercalcemia";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mg/dL",
      interpretation,
      status,
    };
  },
};