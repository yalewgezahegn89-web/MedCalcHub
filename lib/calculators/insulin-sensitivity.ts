import type { CalculatorDefinition } from "./calculator.types";
import { calculateInsulinSensitivity } from "./utils/endocrinology";

export const insulinSensitivityCalculator: CalculatorDefinition = {
  id: "insulin-sensitivity",

  slug: "insulin-sensitivity",

  name: "Insulin Sensitivity",

  shortName: "IS",

  description: "Provides a simple estimate of insulin sensitivity from HOMA-IR.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Insulin sensitivity = 1 / HOMA-IR",

  normalRange: "> 0.4",

  referenceRanges: [
    { label: "Higher sensitivity", range: "> 0.4" },
  ],

  clinicalNotes:
    "This estimate is inversely related to insulin resistance and may be used as a simple screening metric.",

  references: [
    "Endocrine Society clinical references",
    "Metabolic syndrome references",
  ],

  warnings: [
    "Interpretation should be made with fasting glucose and insulin values in context.",
  ],

  keywords: ["Insulin Sensitivity", "HOMA-IR", "Endocrinology"],

  inputs: [
    {
      id: "homaIr",
      label: "HOMA-IR",
      type: "number",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
  ],

  calculate(values) {
    const homaIr = parseFloat(values.homaIr);

    const sensitivity = calculateInsulinSensitivity(homaIr);

    return {
      value: sensitivity,
      interpretation: sensitivity > 0.4 ? "Higher insulin sensitivity" : "Lower insulin sensitivity",
      status: sensitivity > 0.4 ? "normal" : "high",
    };
  },
};
