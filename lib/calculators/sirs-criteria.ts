import type { CalculatorDefinition } from "./calculator.types";

export const sirsCriteriaCalculator: CalculatorDefinition = {
  id: "sirs-criteria",

  slug: "sirs-criteria",

  name: "SIRS Criteria",

  shortName: "SIRS",

  description:
    "Identifies systemic inflammatory response syndrome using temperature, heart rate, respiratory rate, and white blood cell count.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "SIRS",
    "Sepsis",
    "Inflammation",
    "Emergency",
  ],

  warnings: [
    "SIRS criteria support screening for inflammation but are not specific for infection or sepsis.",
  ],

  formula: "SIRS = temperature + heart rate + respiratory rate + WBC criteria",

  normalRange: "0 criteria",

  referenceRanges: [
    {
      label: "No SIRS",
      range: "0–1",
    },
    {
      label: "SIRS present",
      range: "2+",
    },
  ],

  clinicalNotes:
    "Meeting two or more SIRS criteria suggests a systemic inflammatory response and warrants further evaluation.",

  references: [
    "Bone RC, et al. Chest. 1992.",
    "Sepsis and SIRS literature",
  ],

  inputs: [
    {
      id: "temperature",
      label: "Temperature",
      type: "number",
      unit: "°C",
      required: true,
      min: 30,
      max: 42,
      step: 0.1,
    },
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
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 8,
      max: 80,
      step: 1,
    },
    {
      id: "wbc",
      label: "White Blood Cell Count",
      type: "number",
      unit: "×10³/µL",
      required: true,
      min: 1,
      max: 50,
      step: 0.1,
    },
  ],

  calculate(values) {
    const temperature = parseFloat(values.temperature);
    const heartRate = parseFloat(values.heartRate);
    const respiratoryRate = parseFloat(values.respiratoryRate);
    const wbc = parseFloat(values.wbc);

    let score = 0;
    if (temperature < 36 || temperature > 38) score += 1;
    if (heartRate > 90) score += 1;
    if (respiratoryRate > 20) score += 1;
    if (wbc < 4 || wbc > 12) score += 1;

    let interpretation = "No SIRS criteria present";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 2) {
      interpretation = "SIRS criteria met; evaluate for infection or systemic inflammation";
      status = "high";
    }

    return {
      value: score,
      unit: "criteria",
      interpretation,
      status,
    };
  },
};
