import type { CalculatorDefinition } from "./calculator.types";

export const ratePressureProductCalculator: CalculatorDefinition = {
  id: "rate-pressure-product",

  slug: "rate-pressure-product",

  name: "Rate Pressure Product",

  shortName: "RPP",

  description:
    "Calculates the rate-pressure product as a surrogate of myocardial oxygen demand.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Rate Pressure Product",
    "Myocardial Oxygen Demand",
    "Cardiology",
  ],

  warnings: [
    "Rate pressure product is a surrogate marker and should be interpreted with the wider clinical context.",
  ],

  formula: "RPP = Heart Rate × Systolic BP",

  normalRange: "<10,000",

  referenceRanges: [
    {
      label: "Normal",
      range: "<10,000",
    },
    {
      label: "Elevated",
      range: "10,000–15,000",
    },
    {
      label: "High",
      range: ">15,000",
    },
  ],

  clinicalNotes:
    "The rate-pressure product reflects myocardial oxygen demand and is often used in stress testing and ischemia assessment.",

  references: [
    "Cardiology physiology references",
    "Exercise testing literature",
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
      max: 260,
      step: 1,
    },
  ],

  calculate(values) {
    const heartRate = parseFloat(values.heartRate);
    const systolicBp = parseFloat(values.systolicBp);
    const rpp = heartRate * systolicBp;

    let interpretation = "Normal myocardial oxygen demand";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rpp > 15000) {
      interpretation = "High myocardial oxygen demand";
      status = "critical";
    } else if (rpp > 10000) {
      interpretation = "Elevated myocardial oxygen demand";
      status = "high";
    }

    return {
      value: rpp,
      unit: "bpm·mmHg",
      interpretation,
      status,
    };
  },
};
