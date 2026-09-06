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

  specialty: "Internal Medicine",

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
    "Basal metabolic rate is the energy required to sustain basic physiologic functions at rest and typically accounts for the largest share of total daily energy expenditure. The Mifflin-St Jeor equation estimates BMR in adults; total energy expenditure requires applying an activity factor. Estimates are approximate and should be used as a starting point for individualized nutrition assessment.",

  references: [
    "Mifflin MD, St Jeor ST, Hill LA, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241–247.",
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
      interpretation: "Estimated basal metabolic rate",
      status: "normal",
    };
  },
};
