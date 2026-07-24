import type { CalculatorDefinition } from "./calculator.types";

export const shockIndexCalculator: CalculatorDefinition = {
  id: "shock-index",

  slug: "shock-index",

  name: "Shock Index",

  shortName: "SI",

  description:
    "A rapid bedside indicator of hemodynamic compromise based on heart rate divided by systolic blood pressure.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Shock Index",
    "Shock",
    "Hemodynamics",
    "Emergency",
  ],

  warnings: [
    "The shock index is a screening metric and should be interpreted with the full clinical context.",
  ],

  formula: "Shock Index = Heart Rate ÷ Systolic BP",

  normalRange: "0.5–0.7",

  referenceRanges: [
    {
      label: "Normal",
      range: "0.5–0.7",
    },
    {
      label: "Elevated",
      range: ">0.7",
    },
    {
      label: "Severe shock",
      range: ">1.0",
    },
  ],

  clinicalNotes:
    "An elevated shock index suggests relative tachycardia and may reflect hypovolemia, sepsis, or other shock states.",

  references: [
    "Allgöwer M, et al. 1967.",
    "Emergency medicine references",
  ],

  inputs: [
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
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 220,
      step: 1,
    },
  ],

  calculate(values) {
    const heartRate = parseFloat(values.heartRate);
    const systolicBp = parseFloat(values.systolicBp);

    const index = systolicBp > 0 ? Number((heartRate / systolicBp).toFixed(2)) : 0;

    let interpretation = "Normal shock index";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (index > 1.0) {
      interpretation = "Severe shock or marked hemodynamic compromise";
      status = "critical";
    } else if (index > 0.7) {
      interpretation = "Elevated shock index; investigate for shock";
      status = "high";
    }

    return {
      value: index,
      unit: "ratio",
      interpretation,
      status,
    };
  },
};
