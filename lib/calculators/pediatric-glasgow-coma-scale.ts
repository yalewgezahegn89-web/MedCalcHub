import type { CalculatorDefinition } from "./calculator.types";

export const pediatricGlasgowComaScaleCalculator: CalculatorDefinition = {
  id: "pediatric-glasgow-coma-scale",

  slug: "pediatric-glasgow-coma-scale",

  name: "Pediatric Glasgow Coma Scale",

  shortName: "PGCS",

  description:
    "Adapts the Glasgow Coma Scale for pediatric patients using age-appropriate eye, verbal, and motor responses.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Pediatric GCS",
    "Glasgow Coma Scale",
    "Pediatrics",
    "Emergency",
  ],

  warnings: [
    "This version is a simplified pediatric adaptation and should be interpreted with the clinical context.",
  ],

  formula: "PGCS = Eye Opening + Verbal Response + Motor Response",

  normalRange: "15 points",

  referenceRanges: [
    {
      label: "Severe impairment",
      range: "3–8",
    },
    {
      label: "Moderate impairment",
      range: "9–12",
    },
    {
      label: "Mild impairment",
      range: "13–14",
    },
    {
      label: "Normal",
      range: "15",
    },
  ],

  clinicalNotes:
    "A pediatric Glasgow Coma Scale provides a rapid estimate of consciousness in children and infants.",

  references: [
    "James HE. 1986.",
    "Pediatric neurology references",
  ],

  inputs: [
    {
      id: "eye",
      label: "Eye Opening",
      type: "number",
      required: true,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: "verbal",
      label: "Verbal Response",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      step: 1,
    },
    {
      id: "motor",
      label: "Motor Response",
      type: "number",
      required: true,
      min: 1,
      max: 6,
      step: 1,
    },
  ],

  calculate(values) {
    const eye = parseInt(values.eye, 10);
    const verbal = parseInt(values.verbal, 10);
    const motor = parseInt(values.motor, 10);

    const total = eye + verbal + motor;

    let interpretation = "Normal pediatric level of consciousness";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (total < 15) {
      interpretation = total < 9 ? "Severe impairment of consciousness" : "Reduced level of consciousness";
      status = total < 9 ? "critical" : "low";
    }

    return {
      value: total,
      unit: "points",
      interpretation,
      status,
    };
  },
};
