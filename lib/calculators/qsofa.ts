import type { CalculatorDefinition } from "./calculator.types";

export const qsofaCalculator: CalculatorDefinition = {
  id: "qsofa",

  slug: "qsofa",

  name: "qSOFA",

  shortName: "qSOFA",

  description:
    "Quick Sequential Organ Failure Assessment score for suspected sepsis.",

  category: "Emergency",

  specialty: "emergency",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "qSOFA",
    "Sepsis",
    "Shock",
    "Emergency",
    "Critical Care",
  ],

  warnings: [
    "qSOFA is a screening tool and should not replace clinical judgment or full sepsis evaluation.",
  ],

  formula: "qSOFA = (RR ≥ 22) + (SBP ≤ 100) + (GCS < 15)",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0",
    },
    {
      label: "Intermediate risk",
      range: "1",
    },
    {
      label: "High risk",
      range: "2–3",
    },
  ],

  clinicalNotes:
    "A qSOFA score of 2 or 3 suggests a higher risk of poor outcome in patients with suspected infection.",

  references: [
    "Singer M, et al. JAMA. 2016.",
    "Sepsis-3 guidelines",
  ],

  inputs: [
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 8,
      max: 60,
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
    {
      id: "gcs",
      label: "Glasgow Coma Scale",
      type: "number",
      required: true,
      min: 3,
      max: 15,
      step: 1,
    },
  ],

  calculate(values) {
    const respiratoryRate = parseFloat(values.respiratoryRate);
    const systolicBp = parseFloat(values.systolicBp);
    const gcs = parseFloat(values.gcs);

    let score = 0;
    if (respiratoryRate >= 22) score += 1;
    if (systolicBp <= 100) score += 1;
    if (gcs < 15) score += 1;

    let interpretation = "No qSOFA criteria present";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 2) {
      interpretation = "High risk of sepsis-related deterioration";
      status = "critical";
    } else if (score === 1) {
      interpretation = "Intermediate risk; monitor closely";
      status = "high";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
