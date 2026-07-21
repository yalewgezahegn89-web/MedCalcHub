import type { CalculatorDefinition } from "./calculator.types";

export const bsaCalculator: CalculatorDefinition = {
  id: "bsa",

  slug: "body-surface-area",

  name: "Body Surface Area",

  shortName: "BSA",

  description:
    "Calculates Body Surface Area using the Mosteller formula.",

  category: "General",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "BSA",
    "Body Surface Area",
    "Mosteller",
    "Height",
    "Weight",
    "Chemotherapy",
  ],

  warnings: [
    "BSA is an estimate and should be interpreted within the clinical context.",
  ],

  inputs: [
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      max: 300,
      step: 0.1,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 1,
      max: 500,
      step: 0.1,
    },
  ],

  calculate(values) {
    const height = parseFloat(values.height);
    const weight = parseFloat(values.weight);

    const bsa = Math.sqrt((height * weight) / 3600);
    const rounded = Math.round(bsa * 100) / 100;

    return {
      value: rounded,
      unit: "m²",
      interpretation: "Body Surface Area",
      status: "normal",
    };
  },
};