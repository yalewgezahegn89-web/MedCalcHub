import type { CalculatorDefinition } from "./calculator.types";

export const ascvdRiskCalculator: CalculatorDefinition = {
  id: "ascvd-risk",

  slug: "ascvd-risk",

  name: "ASCVD Risk Score",

  shortName: "ASCVD",

  description:
    "Estimates 10-year atherosclerotic cardiovascular disease risk.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "ASCVD",
    "Cardiovascular Risk",
    "Risk Score",
    "Cardiology",
  ],

  warnings: [
    "This is a simplified risk estimate and should not replace formal ASCVD risk assessment.",
  ],

  formula: "ASCVD risk = age + cholesterol + HDL + systolic BP + smoking + diabetes",

  normalRange: "<7.5% 10-year risk",

  referenceRanges: [
    {
      label: "Low risk",
      range: "<7.5%",
    },
    {
      label: "Borderline risk",
      range: "7.5–19.9%",
    },
    {
      label: "High risk",
      range: "≥20%",
    },
  ],

  clinicalNotes:
    "The ASCVD risk score helps estimate the probability of future atherosclerotic cardiovascular events.",

  references: [
    "Goff DC Jr, et al. Circulation. 2014.",
    "AHA/ACC guidelines",
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

    const risk = Math.min(100, Math.max(0, age * 0.4 + totalCholesterol * 0.08 - hdl * 0.08 + systolicBp * 0.08 + smoking * 12 + diabetes * 10));
    const rounded = Math.round(risk * 10) / 10;

    let interpretation = "Low 10-year ASCVD risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded >= 20) {
      interpretation = "High 10-year ASCVD risk";
      status = "critical";
    } else if (rounded >= 7.5) {
      interpretation = "Borderline to intermediate 10-year ASCVD risk";
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
