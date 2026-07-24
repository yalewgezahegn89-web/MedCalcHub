import type { CalculatorDefinition } from "./calculator.types";
import { calculateLevothyroxineDose } from "./utils/endocrinology";

export const levothyroxineDoseCalculator: CalculatorDefinition = {
  id: "levothyroxine-dose",

  slug: "levothyroxine-dose",

  name: "Levothyroxine Dose",

  shortName: "LT4",

  description: "Estimates levothyroxine replacement dose from body weight.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Dose = 1.6 μg/kg/day",

  normalRange: "Variable by patient and clinical context",

  clinicalNotes:
    "Levothyroxine dosing is commonly adjusted based on TSH and clinical response.",

  references: [
    "Endocrinology dosing references",
    "Clinical thyroid practice guidelines",
  ],

  warnings: [
    "Individualize dosing carefully, especially in older adults and patients with cardiovascular disease.",
  ],

  keywords: ["Levothyroxine Dose", "LT4", "Thyroid", "Endocrinology"],

  inputs: [
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
  ],

  calculate(values) {
    const weight = parseFloat(values.weight);

    const dose = calculateLevothyroxineDose(weight);

    return {
      value: dose,
      unit: "μg/day",
      interpretation: "Estimated levothyroxine dose",
      status: "normal",
    };
  },
};
