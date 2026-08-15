import type { CalculatorDefinition } from "./calculator.types";
import { calculateHarrisBenedict } from "./utils/internal-medicine";

export const harrisBenedictCalculator: CalculatorDefinition = {
  id: "harris-benedict",

  slug: "harris-benedict",

  name: "Harris-Benedict",

  shortName: "H-B",

  description:
    "Estimates basal metabolic rate using the Harris-Benedict equation.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "BMR = 88.362 + 13.397 × weight + 4.799 × height − 5.677 × age (male) or 447.593 + 9.247 × weight + 3.098 × height − 4.33 × age (female)",

  normalRange: "~1,400–2,000 kcal/day depending on body size",

  referenceRanges: [
    {
      label: "Adults",
      range: "Varies by sex and body size",
    },
  ],

  clinicalNotes:
    "The Harris-Benedict equation remains a common tool for estimating energy expenditure.",

  references: [
    "Harris JA, Benedict FG.",
    "Clinical nutrition references",
  ],

  warnings: [
    "This estimate is not a substitute for individualized metabolic assessment.",
  ],

  keywords: [
    "Harris-Benedict",
    "Basal Metabolic Rate",
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

    if (values.sex !== "male" && values.sex !== "female") {
      return {
        value: 0,
        interpretation: "Sex is required.",
        status: "critical",
      };
    }

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(weight) ||
      !Number.isFinite(height) ||
      age <= 0 ||
      weight <= 0 ||
      height <= 0
    ) {
      return {
        value: 0,
        interpretation: "Age, weight, and height are required.",
        status: "critical",
      };
    }

    const bmr = calculateHarrisBenedict(values.sex, age, weight, height);

    return {
      value: bmr,
      unit: "kcal/day",
      interpretation: "Estimated basal metabolic rate",
      status: "normal",
    };
  },
};
