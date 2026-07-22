import type { CalculatorDefinition } from "./calculator.types";

export const serumOsmolalityCalculator: CalculatorDefinition = {
  id: "serum-osmolality",

  slug: "serum-osmolality",

  name: "Serum Osmolality",

  shortName: "Osmolality",

  description:
    "Calculates the estimated serum osmolality using sodium, glucose, and blood urea nitrogen (BUN).",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Serum Osmolality",
    "Calculated Osmolality",
    "Electrolytes",
    "Renal",
    "Toxicology",
  ],

  warnings: [
    "Formula assumes glucose is in mg/dL and BUN is in mg/dL.",
  ],

  formula:
    "Calculated Osmolality = 2 × Na + Glucose / 18 + BUN / 2.8",

  normalRange: "275–295 mOsm/kg",

  clinicalNotes:
    "Estimated serum osmolality is useful in evaluating electrolyte disorders, dehydration, toxic alcohol ingestion, and osmolar gap.",

  references: [
    "UpToDate",
    "Tintinalli's Emergency Medicine",
  ],

  inputs: [
    {
      id: "sodium",
      label: "Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 80,
      max: 200,
      step: 1,
    },
    {
      id: "glucose",
      label: "Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 20,
      max: 1200,
      step: 1,
    },
    {
      id: "bun",
      label: "BUN",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 300,
      step: 1,
    },
  ],

  calculate(values) {
    const sodium = parseFloat(values.sodium);
    const glucose = parseFloat(values.glucose);
    const bun = parseFloat(values.bun);

    const osmolality =
      2 * sodium +
      glucose / 18 +
      bun / 2.8;

    const rounded =
      Math.round(osmolality * 10) / 10;

    let interpretation: string;
    let status: "low" | "normal" | "high";

    if (rounded < 275) {
      interpretation = "Low serum osmolality";
      status = "low";
    } else if (rounded <= 295) {
      interpretation = "Normal serum osmolality";
      status = "normal";
    } else {
      interpretation = "High serum osmolality";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mOsm/kg",
      interpretation,
      status,
    };
  },
};