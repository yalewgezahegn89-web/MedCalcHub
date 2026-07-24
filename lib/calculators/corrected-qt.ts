import type { CalculatorDefinition } from "./calculator.types";
import { calculateCorrectedQt } from "./utils/endocrinology";

export const correctedQtCalculator: CalculatorDefinition = {
  id: "corrected-qt",

  slug: "corrected-qt",

  name: "Corrected QT",

  shortName: "QTc",

  description: "Corrects the QT interval for heart rate using the Bazett formula.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "QTc = QT / sqrt(RR)",

  normalRange: "< 460 ms in women and < 450 ms in men",

  clinicalNotes:
    "QTc is used to assess prolongation risk, particularly in patients with electrolyte abnormalities or medication exposure.",

  references: [
    "Cardiology references",
    "ECG interpretation references",
  ],

  warnings: [
    "Use in conjunction with clinical context and the patient's medication list.",
  ],

  keywords: ["Corrected QT", "QTc", "ECG", "Electrolytes"],

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
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 30,
      max: 200,
      step: 1,
    },
  ],

  calculate(values) {
    const qt = parseFloat(values.qt);
    const heartRate = parseFloat(values.heartRate);

    const correctedQt = calculateCorrectedQt(qt, heartRate);

    return {
      value: correctedQt,
      unit: "ms",
      interpretation: "Corrected QT interval",
      status: "normal",
    };
  },
};
