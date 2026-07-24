import type { CalculatorDefinition } from "./calculator.types";
import { calculateSerumOsmolality } from "./utils/electrolytes";

export const osmolarGapCalculator: CalculatorDefinition = {
  id: "osmolar-gap",

  slug: "osmolar-gap",

  name: "Osmolar Gap",

  shortName: "OG",

  description:
    "Calculates the osmolar gap using measured and calculated serum osmolality.",

  category: "Renal",

  specialty: "nephrology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Osmolar Gap",
    "Serum Osmolality",
    "Toxic Alcohol",
    "Methanol",
    "Ethylene Glycol",
  ],

  warnings: [
    "Measured osmolality must be obtained from the laboratory.",
  ],

  formula:
    "Osmolar Gap = Measured Osmolality − Calculated Osmolality",

  normalRange: "-10 to +10 mOsm/kg",

  clinicalNotes:
    "An elevated osmolar gap may suggest toxic alcohol ingestion or other osmotically active substances.",

  references: [
    "UpToDate",
    "Tintinalli's Emergency Medicine",
  ],

  inputs: [
    {
      id: "measured",
      label: "Measured Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 150,
      max: 500,
      step: 1,
    },
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
    const measured = parseFloat(values.measured);
    const sodium = parseFloat(values.sodium);
    const glucose = parseFloat(values.glucose);
    const bun = parseFloat(values.bun);

    const calculated = calculateSerumOsmolality(
      sodium,
      glucose,
      bun,
    );

    const rounded =
      Math.round((measured - calculated) * 10) / 10;

    let interpretation: string;
    let status: "low" | "normal" | "high";

    if (rounded < -10) {
      interpretation = "Low osmolar gap";
      status = "low";
    } else if (rounded <= 10) {
      interpretation = "Normal osmolar gap";
      status = "normal";
    } else {
      interpretation = "Elevated osmolar gap";
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