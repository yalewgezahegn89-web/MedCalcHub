import type { CalculatorDefinition } from "./calculator.types";

export const anionGapCalculator: CalculatorDefinition = {
  id: "anion-gap",

  slug: "anion-gap",

  name: "Anion Gap",

  shortName: "AG",

  description:
    "Calculates the serum anion gap using sodium, chloride, and bicarbonate.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Anion Gap",
    "Metabolic Acidosis",
    "Electrolytes",
    "Acid Base",
  ],

  warnings: [
    "Interpret the anion gap together with the clinical picture and serum albumin.",
  ],

  formula:
    "Anion Gap = Na − (Cl + HCO₃)",

  normalRange: "8–12 mmol/L",

  clinicalNotes:
    "The anion gap helps differentiate high anion gap metabolic acidosis from normal anion gap metabolic acidosis.",

  references: [
    "Kraut JA, Madias NE.",
    "UpToDate",
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
      id: "chloride",
      label: "Chloride",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 50,
      max: 180,
      step: 1,
    },
    {
      id: "bicarbonate",
      label: "Bicarbonate (HCO₃)",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 2,
      max: 50,
      step: 1,
    },
  ],

  calculate(values) {
    const na = parseFloat(values.sodium);
    const cl = parseFloat(values.chloride);
    const hco3 = parseFloat(values.bicarbonate);

    const ag = na - (cl + hco3);

    const rounded = Math.round(ag * 10) / 10;

    let interpretation: string;
    let status: "low" | "normal" | "high";

    if (rounded < 8) {
      interpretation = "Low anion gap";
      status = "low";
    } else if (rounded <= 12) {
      interpretation = "Normal anion gap";
      status = "normal";
    } else {
      interpretation = "High anion gap";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mmol/L",
      interpretation,
      status,
    };
  },
};