import type { CalculatorDefinition } from "./calculator.types";
import {
  calculateAdjustedBodyWeight,
  calculateDevineIBW,
} from "./utils/body-weight";

export const adjbwCalculator: CalculatorDefinition = {
  id: "adjbw",

  slug: "adjusted-body-weight",

  name: "Adjusted Body Weight",

  shortName: "AdjBW",

  description:
    "Calculates Adjusted Body Weight using the Devine Ideal Body Weight formula.",

  category: "General",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Adjusted Body Weight",
    "AdjBW",
    "Devine",
    "Obesity",
    "Drug Dosing",
  ],

  warnings: [
    "Adjusted body weight is primarily used for medication dosing in overweight and obese adults.",
  ],

  formula: "AdjBW = IBW + 0.4 × (Actual Weight − IBW)",

  clinicalNotes:
    "Adjusted Body Weight is commonly used when dosing medications in overweight and obese patients because actual body weight may overestimate dosing while ideal body weight may underestimate it.",

  references: [
    "ClinCalc Drug Dosing Reference",
    "ASHP Clinical Guidelines",
  ],

  inputs: [
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 100,
      max: 250,
      step: 0.1,
    },
    {
      id: "weight",
      label: "Actual Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 400,
      step: 0.1,
    },
  ],

  calculate(values) {
    const ibw = calculateDevineIBW(
      values.sex,
      parseFloat(values.height),
    );

    const adjbw = calculateAdjustedBodyWeight(
      ibw,
      parseFloat(values.weight),
    );

    return {
      value: adjbw,
      unit: "kg",
      interpretation:
        "Estimated adjusted body weight for medication dosing.",
      status: "normal",
    };
  },
};
