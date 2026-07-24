import type { CalculatorDefinition } from "./calculator.types";

export const framinghamRiskCalculator: CalculatorDefinition = {
  id: "framingham-risk",

  slug: "framingham-risk",

  name: "Framingham Risk Score",

  shortName: "Framingham",

  description:
    "Estimates 10-year cardiovascular risk based on traditional risk factors.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Framingham",
    "Cardiovascular Risk",
    "Risk Score",
    "Cardiology",
  ],

  warnings: [
    "This is a simplified risk estimate and should not replace formal risk assessment.",
  ],

  formula: "Framingham risk = age + cholesterol + HDL + systolic BP + smoking + diabetes",

  normalRange: "<10% 10-year risk",

  referenceRanges: [
    {
      label: "Low risk",
      range: "<10%",
    },
    {
      label: "Intermediate risk",
      range: "10–20%",
    },
    {
      label: "High risk",
      range: ">20%",
    },
  ],

  clinicalNotes:
    "The Framingham score provides a population-based estimate of 10-year cardiovascular risk.",

  references: [
    "Wilson PW, et al. Circulation. 1998.",
    "Cardiovascular prevention",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 20,
      max: 90,
      step: 1,
    },
    {
      id: "totalCholesterol",
      label: "Total cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 120,
      max: 400,
      step: 1,
    },
    {
      id: "hdl",
      label: "HDL cholesterol",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 20,
      max: 120,
      step: 1,
    },
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 80,
      max: 220,
      step: 1,
    },
    {
      id: "smoking",
      label: "Smoking",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "diabetes",
      label: "Diabetes",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values) {
    const age = parseFloat(values.age);
    const totalCholesterol = parseFloat(values.totalCholesterol);
    const hdl = parseFloat(values.hdl);
    const systolicBp = parseFloat(values.systolicBp);
    const smoking = values.smoking === "yes" ? 1 : 0;
    const diabetes = values.diabetes === "yes" ? 1 : 0;

    const risk = Math.min(100, Math.max(0, (age * 0.6 + totalCholesterol * 0.1 - hdl * 0.1 + systolicBp * 0.1 + smoking * 10 + diabetes * 8)));
    const rounded = Math.round(risk * 10) / 10;

    let interpretation = "Low 10-year cardiovascular risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 20) {
      interpretation = "High 10-year cardiovascular risk";
      status = "critical";
    } else if (rounded > 10) {
      interpretation = "Intermediate 10-year cardiovascular risk";
      status = "high";
    }

    return {
      value: rounded,
      unit: "%",
      interpretation,
      status,
    };
  },
};
