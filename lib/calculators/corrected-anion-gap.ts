import type { CalculatorDefinition } from "./calculator.types";

export const correctedAnionGapCalculator: CalculatorDefinition = {
  id: "corrected-anion-gap",

  slug: "corrected-anion-gap",

  name: "Albumin-Corrected Anion Gap",

  shortName: "Corrected AG",

  description:
    "Calculates the albumin-corrected anion gap.",

  category: "Renal",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Corrected Anion Gap",
    "Albumin",
    "Metabolic Acidosis",
    "Electrolytes",
  ],

  warnings: [
    "Albumin should be entered in g/dL.",
  ],

  formula:
    "Corrected AG = (Na − (Cl + HCO₃)) + 2.5 × (4 − Albumin)",

  normalRange: "8–12 mmol/L",

  clinicalNotes:
    "Correcting the anion gap for hypoalbuminemia improves detection of high anion gap metabolic acidosis.",

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
    {
      id: "albumin",
      label: "Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 0.5,
      max: 6,
      step: 0.1,
    },
  ],

  calculate(values) {
    const na = parseFloat(values.sodium);
    const cl = parseFloat(values.chloride);
    const hco3 = parseFloat(values.bicarbonate);
    const albumin = parseFloat(values.albumin);

    const ag = na - (cl + hco3);

    const corrected =
      ag + 2.5 * (4 - albumin);

    const rounded =
      Math.round(corrected * 10) / 10;

    let interpretation: string;
    let status: "low" | "normal" | "high";

    if (rounded < 8) {
      interpretation = "Low corrected anion gap";
      status = "low";
    } else if (rounded <= 12) {
      interpretation = "Normal corrected anion gap";
      status = "normal";
    } else {
      interpretation = "High corrected anion gap";
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