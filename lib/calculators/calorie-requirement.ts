import type { CalculatorDefinition } from "./calculator.types";
import { calculateCalorieRequirement } from "./utils/internal-medicine";

export const calorieRequirementCalculator: CalculatorDefinition = {
  id: "calorie-requirement",

  slug: "calorie-requirement",

  name: "Calorie Requirement",

  shortName: "Calories",

  description:
    "Estimates daily calorie requirement from basal metabolic rate and activity level.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Calories = BMR × Activity Factor",

  normalRange: "Variable by activity level and goals",

  referenceRanges: [
    {
      label: "Sedentary",
      range: "1.2× BMR",
    },
    {
      label: "Moderate",
      range: "1.55× BMR",
    },
    {
      label: "Active",
      range: "1.725× BMR",
    },
  ],

  clinicalNotes:
    "Daily calorie needs vary with activity, age, illness, and clinical context.",

  references: [
    "Institute of Medicine",
    "Clinical nutrition references",
  ],

  warnings: [
    "This is an estimate and should be adjusted by clinical judgment.",
  ],

  keywords: [
    "Calorie Requirement",
    "Nutrition",
    "Energy",
    "Metabolism",
  ],

  inputs: [
    {
      id: "bmr",
      label: "Basal Metabolic Rate",
      type: "number",
      unit: "kcal/day",
      required: true,
      min: 800,
      max: 5000,
      step: 1,
    },
    {
      id: "activity",
      label: "Activity Factor",
      type: "number",
      required: true,
      min: 1,
      max: 2.5,
      step: 0.05,
    },
  ],

  calculate(values) {
    const bmr = parseFloat(values.bmr);
    const activity = parseFloat(values.activity);

    if (
      !Number.isFinite(bmr) ||
      !Number.isFinite(activity) ||
      bmr <= 0 ||
      activity <= 0
    ) {
      return {
        value: 0,
        interpretation: "Basal metabolic rate and activity factor are required.",
        status: "critical",
      };
    }

    const calories = calculateCalorieRequirement(bmr, activity);

    return {
      value: calories,
      unit: "kcal/day",
      interpretation: "Estimated daily calorie requirement",
      status: "normal",
    };
  },
};
