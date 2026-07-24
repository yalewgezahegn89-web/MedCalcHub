import type { CalculatorDefinition } from "./calculator.types";

export const cardiacIndexCalculator: CalculatorDefinition = {
  id: "cardiac-index",

  slug: "cardiac-index",

  name: "Cardiac Index",

  shortName: "CI",

  description:
    "Calculates cardiac index from cardiac output and body surface area.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Cardiac Index",
    "Hemodynamics",
    "Cardiology",
    "BSA",
  ],

  warnings: [
    "Cardiac index is an estimate and should be interpreted in the context of the patient’s size and clinical condition.",
  ],

  formula: "Cardiac Index = Cardiac Output / Body Surface Area",

  normalRange: "2.5–4.0 L/min/m²",

  referenceRanges: [
    {
      label: "Low",
      range: "<2.5 L/min/m²",
    },
    {
      label: "Normal",
      range: "2.5–4.0 L/min/m²",
    },
    {
      label: "High",
      range: ">4.0 L/min/m²",
    },
  ],

  clinicalNotes:
    "Cardiac index provides a normalized measure of cardiac performance relative to body size.",

  references: [
    "Hemodynamics texts",
    "Cardiology physiology",
  ],

  inputs: [
    {
      id: "cardiacOutput",
      label: "Cardiac Output",
      type: "number",
      unit: "L/min",
      required: true,
      min: 1,
      max: 20,
      step: 0.1,
    },
    {
      id: "bsa",
      label: "Body Surface Area",
      type: "number",
      unit: "m²",
      required: true,
      min: 0.5,
      max: 3,
      step: 0.01,
    },
  ],

  calculate(values) {
    const cardiacOutput = parseFloat(values.cardiacOutput);
    const bsa = parseFloat(values.bsa);
    const cardiacIndex = bsa > 0 ? cardiacOutput / bsa : 0;
    const rounded = Math.round(cardiacIndex * 10) / 10;

    let interpretation = "Normal cardiac index";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 2.5) {
      interpretation = "Low cardiac index";
      status = "critical";
    } else if (rounded > 4.0) {
      interpretation = "High cardiac index";
      status = "high";
    }

    return {
      value: rounded,
      unit: "L/min/m²",
      interpretation,
      status,
    };
  },
};
