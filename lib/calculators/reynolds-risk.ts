import type { CalculatorDefinition } from "./calculator.types";

export const reynoldsRiskCalculator: CalculatorDefinition = {
  id: "reynolds-risk",

  slug: "reynolds-risk",

  name: "Reynolds Risk Score",

  shortName: "Reynolds",

  description:
    "Estimates 10-year cardiovascular risk using inflammatory and lipid markers.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Reynolds",
    "Cardiovascular Risk",
    "C-reactive protein",
    "Cardiology",
  ],

  warnings: [
    "This is a simplified risk estimate and should not replace formal cardiovascular risk assessment.",
  ],

  formula: "Reynolds risk = age + systolic BP + hsCRP + total cholesterol + HDL + smoking",

  normalRange: "<5% 10-year risk",

  referenceRanges: [
    {
      label: "Low risk",
      range: "<5%",
    },
    {
      label: "Intermediate risk",
      range: "5–10%",
    },
    {
      label: "High risk",
      range: ">10%",
    },
  ],

  clinicalNotes:
    "The Reynolds score combines traditional risk factors with high-sensitivity CRP to estimate cardiovascular risk.",

  references: [
    "Ridker PM, et al. Circulation. 2007.",
    "Cardiovascular risk prediction",
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
      id: "hsCreactiveProtein",
      label: "High-sensitivity CRP",
      type: "number",
      unit: "mg/L",
      required: true,
      min: 0.1,
      max: 30,
      step: 0.1,
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
      id: "smoking",
      label: "Smoking",
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
    const systolicBp = parseFloat(values.systolicBp);
    const hsCreactiveProtein = parseFloat(values.hsCreactiveProtein);
    const totalCholesterol = parseFloat(values.totalCholesterol);
    const hdl = parseFloat(values.hdl);
    const smoking = values.smoking === "yes" ? 1 : 0;

    const risk = Math.min(100, Math.max(0, age * 0.4 + systolicBp * 0.05 + hsCreactiveProtein * 1.5 + totalCholesterol * 0.05 - hdl * 0.05 + smoking * 10));
    const rounded = Math.round(risk * 10) / 10;

    let interpretation = "Low 10-year cardiovascular risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 10) {
      interpretation = "High 10-year cardiovascular risk";
      status = "critical";
    } else if (rounded > 5) {
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
