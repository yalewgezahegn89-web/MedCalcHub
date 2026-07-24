import type { CalculatorDefinition } from "./calculator.types";
import { calculateMifflinStJeor } from "./utils/internal-medicine";

export const basalMetabolicRateCalculator: CalculatorDefinition = {
  id: "basal-metabolic-rate",

  slug: "basal-metabolic-rate",

  name: "Basal Metabolic Rate",

  shortName: "BMR",

  description:
    "Estimates basal metabolic rate using the Mifflin-St Jeor equation.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "BMR = 10 × weight + 6.25 × height − 5 × age ± 161",

  normalRange: "Varies by age, sex, and body size",

  referenceRanges: [
    {
      label: "Adult men",
      range: "~1,600–2,000 kcal/day",
    },
    {
      label: "Adult women",
      range: "~1,400–1,800 kcal/day",
    },
  ],

  clinicalNotes:
    "Basal metabolic rate is the energy required to maintain basic physiologic functions at rest.",

  references: [
    "Mifflin MD, et al.",
    "Academy of Nutrition and Dietetics",
  ],

  warnings: [
    "BMR is an estimate and should be interpreted within the clinical context.",
  ],

  keywords: [
    "Basal Metabolic Rate",
    "BMR",
    "Metabolism",
    "Nutrition",
    "Energy",
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
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
      step: 1,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 20,
      max: 300,
      step: 0.1,
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
  ],

  calculate(values) {
    const age = parseFloat(values.age);
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);

    const bmr = calculateMifflinStJeor(values.sex, age, weight, height);

    return {
      value: bmr,
      unit: "kcal/day",
      interpretation: "Estimated basal metabolic rate",
      status: "normal",
    };
  },
};
