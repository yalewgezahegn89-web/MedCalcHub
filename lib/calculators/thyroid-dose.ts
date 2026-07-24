import type { CalculatorDefinition } from "./calculator.types";
import { calculateThyroidDose } from "./utils/endocrinology";

export const thyroidDoseCalculator: CalculatorDefinition = {
  id: "thyroid-dose",

  slug: "thyroid-dose",

  name: "Thyroid Dose",

  shortName: "Thyroid",

  description: "Estimates thyroid hormone replacement dose from body weight.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Dose = 1.6 μg/kg/day",

  normalRange: "Variable by patient and clinical context",

  clinicalNotes:
    "This is a simple dosing estimate and often requires adjustment based on thyroid function tests and patient response.",

  references: [
    "Endocrinology dosing references",
    "Clinical thyroid practice guidelines",
  ],

  warnings: [
    "Do not use this as a substitute for individualized dosing.",
  ],

  keywords: ["Thyroid Dose", "Levothyroxine", "Endocrinology"],

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

    const dose = calculateThyroidDose(weight);

    return {
      value: dose,
      unit: "μg/day",
      interpretation: "Estimated thyroid hormone dose",
      status: "normal",
    };
  },
};
