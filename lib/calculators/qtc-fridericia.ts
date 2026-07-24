import type { CalculatorDefinition } from "./calculator.types";

export const qtcFridericiaCalculator: CalculatorDefinition = {
  id: "qtc-fridericia",

  slug: "qtc-fridericia",

  name: "QTc Fridericia",

  shortName: "QTc Fridericia",

  description:
    "Corrects the QT interval for heart rate using the Fridericia formula.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "QTc",
    "Fridericia",
    "ECG",
    "Cardiology",
  ],

  warnings: [
    "QTc correction is an estimate and should be interpreted in the clinical context.",
  ],

  formula: "QTc = QT / RR^(1/3)",

  normalRange: "<450 ms",

  referenceRanges: [
    {
      label: "Normal",
      range: "<450 ms",
    },
    {
      label: "Borderline prolonged",
      range: "450–479 ms",
    },
    {
      label: "Prolonged",
      range: "≥480 ms",
    },
  ],

  clinicalNotes:
    "A prolonged QTc interval is associated with increased risk of ventricular arrhythmias.",

  references: [
    "Fridericia LS. Acta Med Scand. 1920.",
    "Cardiac electrophysiology",
  ],

  inputs: [
    {
      id: "qt",
      label: "QT Interval",
      type: "number",
      unit: "ms",
      required: true,
      min: 200,
      max: 800,
      step: 1,
    },
    {
      id: "rr",
      label: "RR Interval",
      type: "number",
      unit: "ms",
      required: true,
      min: 300,
      max: 2000,
      step: 1,
    },
  ],

  calculate(values) {
    const qt = parseFloat(values.qt);
    const rr = parseFloat(values.rr);
    const qtc = qt / Math.pow(rr / 1000, 1 / 3);
    const rounded = Math.round(qtc);

    let interpretation = "Normal QTc";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded >= 480) {
      interpretation = "Prolonged QTc interval";
      status = "critical";
    } else if (rounded >= 450) {
      interpretation = "Borderline prolonged QTc interval";
      status = "high";
    }

    return {
      value: rounded,
      unit: "ms",
      interpretation,
      status,
    };
  },
};
