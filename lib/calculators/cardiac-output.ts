import type { CalculatorDefinition } from "./calculator.types";

export const cardiacOutputCalculator: CalculatorDefinition = {
  id: "cardiac-output",

  slug: "cardiac-output",

  name: "Cardiac Output",

  shortName: "CO",

  description:
    "Calculates cardiac output from stroke volume and heart rate.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Cardiac Output",
    "Hemodynamics",
    "Cardiology",
    "Stroke Volume",
  ],

  warnings: [
    "Cardiac output is an estimate based on the inputs provided and should be interpreted clinically.",
  ],

  formula: "Cardiac Output = Stroke Volume × Heart Rate",

  normalRange: "4–8 L/min",

  referenceRanges: [
    {
      label: "Low output",
      range: "<4 L/min",
    },
    {
      label: "Normal",
      range: "4–8 L/min",
    },
    {
      label: "High output",
      range: ">8 L/min",
    },
  ],

  clinicalNotes:
    "Cardiac output reflects the volume of blood pumped by the heart per minute and is central to hemodynamic assessment.",

  references: [
    "Hemodynamics texts",
    "Cardiology physiology",
  ],

  inputs: [
    {
      id: "strokeVolume",
      label: "Stroke Volume",
      type: "number",
      unit: "mL/beat",
      required: true,
      min: 20,
      max: 200,
      step: 1,
    },
    {
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
  ],

  calculate(values) {
    const strokeVolume = parseFloat(values.strokeVolume);
    const heartRate = parseFloat(values.heartRate);
    const cardiacOutput = strokeVolume * heartRate / 1000;
    const rounded = Math.round(cardiacOutput * 10) / 10;

    let interpretation = "Normal cardiac output";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 4) {
      interpretation = "Low cardiac output";
      status = "critical";
    } else if (rounded > 8) {
      interpretation = "High cardiac output";
      status = "high";
    }

    return {
      value: rounded,
      unit: "L/min",
      interpretation,
      status,
    };
  },
};
