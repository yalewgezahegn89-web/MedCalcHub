import type { CalculatorDefinition } from "./calculator.types";
import { calculatePediatricBmi, classifyPediatricBmi } from "./utils/endocrinology";

export const bmiForPediatricsCalculator: CalculatorDefinition = {
  id: "bmi-for-pediatrics",

  slug: "bmi-for-pediatrics",

  name: "BMI for Pediatrics",

  shortName: "Peds BMI",

  description: "Calculates BMI for pediatric patients using weight and height.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "BMI = weight (kg) / height (m)^2",

  normalRange: "Age- and sex-specific percentiles are recommended",

  clinicalNotes:
    "Pediatric BMI should be interpreted using age- and sex-specific percentiles rather than adult thresholds.",

  references: [
    "CDC growth charts",
    "Pediatric obesity guidelines",
  ],

  warnings: [
    "Use age- and sex-specific percentile references for clinical interpretation.",
  ],

  keywords: ["Pediatrics", "BMI", "Growth", "Pediatric Obesity"],

  inputs: [
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 3,
      max: 200,
      step: 0.1,
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 40,
      max: 220,
      step: 0.1,
    },
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);

    const bmi = calculatePediatricBmi(weight, height);
    const classification = classifyPediatricBmi(bmi);

    return {
      value: bmi,
      unit: "kg/m²",
      interpretation: classification,
      status: "normal",
    };
  },
};
