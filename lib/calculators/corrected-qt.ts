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

  referenceRanges: [
    { label: "Normal QTc", range: "<450 ms (men) / <460 ms (women)" },
    { label: "Prolonged QTc", range: "450–499 ms (men) / 460–499 ms (women)" },
    { label: "Markedly prolonged QTc", range: "≥500 ms" },
  ],

  clinicalNotes:
    "QTc is used to assess prolongation risk, particularly in patients with electrolyte abnormalities or medication exposure.",

  references: [
    "Cardiology references",
    "ECG interpretation references",
  ],

  warnings: [
    "Use in conjunction with clinical context and the patient's medication list.",
  ],

  keywords: ["Corrected QT", "QTc", "ECG", "Electrolytes", "Cardiology", "Arrhythmia", "Torsades de Pointes", "QT Prolongation", "Cardiac"],

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
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "1" },
        { label: "Female", value: "2" },
      ],
    },
  ],

  calculate(values) {
    if (values.qt === "" || values.qt === undefined) {
      return {
        value: 0,
        interpretation: "QT interval is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(Number(values.qt))) {
      return {
        value: 0,
        interpretation: "Invalid QT interval.",
        status: "critical",
      };
    }

    if (values.heartRate === "" || values.heartRate === undefined) {
      return {
        value: 0,
        interpretation: "Heart rate is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(Number(values.heartRate))) {
      return {
        value: 0,
        interpretation: "Invalid heart rate.",
        status: "critical",
      };
    }

    if (values.sex === "" || values.sex === undefined) {
      return {
        value: 0,
        interpretation: "Sex is required for sex-specific QTc classification.",
        status: "critical",
      };
    }

    const qt = parseFloat(values.qt);
    const heartRate = parseFloat(values.heartRate);
    const isMale = values.sex === "1";

    const correctedQt = calculateCorrectedQt(qt, heartRate);

    const upperNormal = isMale ? 450 : 460;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (correctedQt < upperNormal) {
      interpretation = "Normal QTc";
      status = "normal";
      referenceRange = isMale ? "<450 ms" : "<460 ms";
    } else if (correctedQt < 500) {
      interpretation = "Prolonged QTc";
      status = "high";
      referenceRange = isMale ? "450–499 ms" : "460–499 ms";
    } else {
      interpretation = "Markedly prolonged QTc";
      status = "critical";
      referenceRange = "≥500 ms";
    }

    return {
      value: correctedQt,
      unit: "ms",
      interpretation,
      status,
      referenceRange,
    };
  },
};
