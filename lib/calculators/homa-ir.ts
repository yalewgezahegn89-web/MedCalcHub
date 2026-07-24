import type { CalculatorDefinition } from "./calculator.types";
import { calculateHomaIr } from "./utils/endocrinology";

export const homaIrCalculator: CalculatorDefinition = {
  id: "homa-ir",

  slug: "homa-ir",

  name: "HOMA-IR",

  shortName: "HOMA-IR",

  description: "Estimates insulin resistance from fasting glucose and fasting insulin.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "HOMA-IR = (Glucose × Insulin) / 405",

  normalRange: "< 2.5",

  referenceRanges: [
    { label: "Normal", range: "< 2.5" },
    { label: "Insulin resistance", range: "> 2.5" },
  ],

  clinicalNotes:
    "HOMA-IR is a surrogate marker of insulin resistance and is commonly used in metabolic syndrome assessment.",

  references: [
    "Matthews DR, et al.",
    "Endocrine Society clinical references",
  ],

  warnings: [
    "This is a screening estimate and should be interpreted with fasting laboratory values and clinical context.",
  ],

  keywords: ["HOMA-IR", "Insulin Resistance", "Metabolic Syndrome", "Endocrinology"],

  inputs: [
    {
      id: "glucose",
      label: "Fasting Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 40,
      max: 400,
      step: 1,
    },
    {
      id: "insulin",
      label: "Fasting Insulin",
      type: "number",
      unit: "µU/mL",
      required: true,
      min: 1,
      max: 400,
      step: 0.1,
    },
  ],

  calculate(values) {
    const glucose = parseFloat(values.glucose);
    const insulin = parseFloat(values.insulin);

    const homaIr = calculateHomaIr(glucose, insulin);

    return {
      value: homaIr,
      interpretation: homaIr < 2.5 ? "Normal insulin sensitivity" : "Elevated insulin resistance",
      status: homaIr < 2.5 ? "normal" : "high",
    };
  },
};
