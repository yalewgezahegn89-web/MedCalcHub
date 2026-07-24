import type { CalculatorDefinition } from "./calculator.types";

export const pulsePressureCalculator: CalculatorDefinition = {
  id: "pulse-pressure",

  slug: "pulse-pressure",

  name: "Pulse Pressure",

  shortName: "PP",

  description:
    "Calculates pulse pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Pulse Pressure",
    "Blood Pressure",
    "Hemodynamics",
    "Cardiology",
  ],

  warnings: [
    "Pulse pressure is a simple hemodynamic marker and should be interpreted with the broader clinical picture.",
  ],

  formula: "Pulse Pressure = Systolic BP - Diastolic BP",

  normalRange: "30–50 mmHg",

  referenceRanges: [
    {
      label: "Low",
      range: "<30 mmHg",
    },
    {
      label: "Normal",
      range: "30–50 mmHg",
    },
    {
      label: "High",
      range: ">50 mmHg",
    },
  ],

  clinicalNotes:
    "A widened pulse pressure can be seen in conditions such as aortic regurgitation or arteriosclerosis, whereas a narrow pulse pressure may reflect poor cardiac output or tamponade.",

  references: [
    "Cardiology physiology references",
    "Hemodynamics texts",
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
    const pulsePressure = systolic - diastolic;

    let interpretation = "Normal pulse pressure";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (pulsePressure < 30) {
      interpretation = "Narrow pulse pressure";
      status = "low";
    } else if (pulsePressure > 50) {
      interpretation = "Widened pulse pressure";
      status = "high";
    }

    return {
      value: pulsePressure,
      unit: "mmHg",
      interpretation,
      status,
    };
  },
};
