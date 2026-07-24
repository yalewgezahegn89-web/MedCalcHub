import type { CalculatorDefinition } from "./calculator.types";

export const glasgowComaScaleCalculator: CalculatorDefinition = {
  id: "glasgow-coma-scale",

  slug: "glasgow-coma-scale",

  name: "Glasgow Coma Scale",

  shortName: "GCS",

  description:
    "Assesses level of consciousness using eye opening, verbal response, and motor response scores.",

  category: "Emergency",

  specialty: "emergency",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "GCS",
    "Glasgow Coma Scale",
    "Consciousness",
    "Neurology",
    "Emergency",
  ],

  warnings: [
    "The score can be affected by sedation, intubation, facial trauma, or intoxication.",
  ],

  formula: "GCS = Eye Opening + Verbal Response + Motor Response",

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
    "The Glasgow Coma Scale is a rapid bedside assessment of neurological status and is commonly used in emergency and critical care settings.",

  references: [
    "Teasdale G, Jennett B.",
    "Neurosurgery",
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

    let status: "normal" | "low" | "high" | "critical" = "normal";
    let interpretation = "Alert and oriented with a normal GCS score";

    if (total < 15) {
      status = total < 9 ? "critical" : "low";
      interpretation = total < 9
        ? "Severe impairment of consciousness"
        : "Reduced level of consciousness";
    }

    return {
      value: total,
      unit: "points",
      interpretation,
      status,
    };
  },
};
