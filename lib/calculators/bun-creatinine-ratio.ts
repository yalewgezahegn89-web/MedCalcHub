import type { CalculatorDefinition } from "./calculator.types";

export const bunCreatinineRatioCalculator: CalculatorDefinition = {
  id: "bun-creatinine-ratio",

  slug: "bun-creatinine-ratio",

  name: "BUN / Creatinine Ratio",

  shortName: "BUN:Cr",

  description:
    "Calculates the Blood Urea Nitrogen to Creatinine ratio.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "BUN",
    "Creatinine",
    "Renal",
    "Kidney",
    "Azotemia",
  ],

  warnings: [
    "Interpret the ratio together with the clinical presentation.",
  ],

  formula: "BUN ÷ Creatinine",

  clinicalNotes:
    "The BUN/Creatinine ratio helps differentiate prerenal, renal, and postrenal causes of kidney dysfunction.",

  references: [
    "KDIGO Clinical Practice Guideline",
    "National Kidney Foundation",
  ],

  inputs: [
    {
      id: "bun",
      label: "Blood Urea Nitrogen",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 300,
      step: 0.1,
    },
    {
      id: "creatinine",
      label: "Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
  ],

  calculate(values) {
    const bun = parseFloat(values.bun);
    const creatinine = parseFloat(values.creatinine);

    const ratio = bun / creatinine;
    const rounded = Math.round(ratio * 10) / 10;

    let interpretation = "Normal BUN/Creatinine ratio.";
    let status: "low" | "normal" | "high" = "normal";

    if (rounded < 10) {
      interpretation = "Low BUN/Creatinine ratio.";
      status = "low";
    } else if (rounded > 20) {
      interpretation = "Elevated BUN/Creatinine ratio.";
      status = "high";
    }

    return {
      value: rounded,
      unit: "",
      interpretation,
      status,
    };
  },
};