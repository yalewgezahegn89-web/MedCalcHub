import type { CalculatorDefinition } from "./calculator.types";

export const curb65Calculator: CalculatorDefinition = {
  id: "curb-65",

  slug: "curb-65",

  name: "CURB-65",

  shortName: "CURB-65",

  description:
    "Estimates mortality risk in community-acquired pneumonia.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "CURB-65",
    "Pneumonia",
    "CAP",
    "Emergency",
  ],

  warnings: [
    "CURB-65 is intended for severity assessment and should not replace clinical judgment.",
  ],

  formula: "CURB-65 = confusion + urea > 7 mmol/L + respiratory rate ≥ 30 + BP systolic < 90 or diastolic ≤ 60 + age ≥ 65",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0",
    },
    {
      label: "Moderate risk",
      range: "1–2",
    },
    {
      label: "High risk",
      range: "3–5",
    },
  ],

  clinicalNotes:
    "Higher CURB-65 scores are associated with increased mortality risk in community-acquired pneumonia.",

  references: [
    "Lim WS, et al. Thorax. 2003.",
    "British Thoracic Society",
  ],

  inputs: [
    {
      id: "ageOver65",
      label: "Age 65 or older",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "confusion",
      label: "Confusion or disorientation",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "bun",
      label: "Urea/BUN",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 40,
      step: 0.1,
    },
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
      id: "diastolicBp",
      label: "Diastolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 20,
      max: 140,
      step: 1,
    },
  ],

  calculate(values) {
    let score = 0;
    if (values.ageOver65 === "yes") score += 1;
    if (values.confusion === "yes") score += 1;
    if (parseFloat(values.bun) > 7) score += 1;
    if (parseFloat(values.respiratoryRate) >= 30) score += 1;
    if (parseFloat(values.systolicBp) < 90 || parseFloat(values.diastolicBp) <= 60) score += 1;

    let interpretation = "Low mortality risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 3) {
      interpretation = "High mortality risk; consider hospitalization and escalation";
      status = "critical";
    } else if (score >= 1) {
      interpretation = "Moderate mortality risk";
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
