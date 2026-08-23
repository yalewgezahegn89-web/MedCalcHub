import type { CalculatorDefinition } from "./calculator.types";
import { calculateMifflinStJeor } from "./utils/internal-medicine";

export const mifflinStJeorCalculator: CalculatorDefinition = {
  id: "mifflin-st-jeor",

  slug: "mifflin-st-jeor",

  name: "Mifflin-St Jeor",

  shortName: "Mifflin",

  description:
    "Estimates resting energy expenditure using the Mifflin-St Jeor formula.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "REE = 10 × weight + 6.25 × height − 5 × age ± 161",

  normalRange: "~1,400–2,000 kcal/day depending on body size",

  referenceRanges: [
    {
      label: "Adults",
      range: "Varies by sex and body size",
    },
  ],

  clinicalNotes:
    "The Mifflin-St Jeor equation is commonly used to estimate resting metabolic rate in adults.",

  references: [
    "Mifflin MD, et al.",
    "Journal of the American Dietetic Association",
  ],



  keywords: [
    "Mifflin-St Jeor",
    "Resting Energy Expenditure",
    "BMR",
    "Nutrition",
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

    const bmr = calculateMifflinStJeor(values.sex, age, weight, height);

    return {
      value: bmr,
      unit: "kcal/day",
      interpretation: "Estimated resting energy expenditure",
      status: "normal",
    };
  },
};
