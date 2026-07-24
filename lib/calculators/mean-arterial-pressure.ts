import type { CalculatorDefinition } from "./calculator.types";

export const meanArterialPressureCalculator: CalculatorDefinition = {
  id: "mean-arterial-pressure",

  slug: "mean-arterial-pressure",

  name: "Mean Arterial Pressure",

  shortName: "MAP",

  description:
    "Calculates mean arterial pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "MAP",
    "Blood Pressure",
    "Hemodynamics",
    "Cardiology",
  ],

  warnings: [
    "MAP is an estimate of perfusion pressure and should be interpreted with the full clinical picture.",
  ],

  formula: "MAP = diastolic BP + (systolic BP - diastolic BP)/3",

  normalRange: "70–100 mmHg",

  referenceRanges: [
    {
      label: "Low perfusion",
      range: "<70 mmHg",
    },
    {
      label: "Normal",
      range: "70–100 mmHg",
    },
    {
      label: "Elevated",
      range: ">100 mmHg",
    },
  ],

  clinicalNotes:
    "MAP is a useful estimate of tissue perfusion pressure and is commonly used in critical care.",

  references: [
    "Cardiology and hemodynamics references",
    "ICU monitoring guidelines",
  ],

  inputs: [
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 260,
      step: 1,
    },
    {
      id: "diastolicBp",
      label: "Diastolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 20,
      max: 180,
      step: 1,
    },
  ],

  calculate(values) {
    const systolic = parseFloat(values.systolicBp);
    const diastolic = parseFloat(values.diastolicBp);
    const map = diastolic + (systolic - diastolic) / 3;
    const rounded = Math.round(map);

    let interpretation = "Normal mean arterial pressure";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 70) {
      interpretation = "Low mean arterial pressure; poor perfusion concern";
      status = "critical";
    } else if (rounded > 100) {
      interpretation = "Elevated mean arterial pressure";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mmHg",
      interpretation,
      status,
    };
  },
};
