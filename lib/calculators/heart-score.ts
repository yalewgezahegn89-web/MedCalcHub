import type { CalculatorDefinition } from "./calculator.types";

export const heartScoreCalculator: CalculatorDefinition = {
  id: "heart-score",

  slug: "heart-score",

  name: "HEART Score",

  shortName: "HEART",

  description:
    "Estimates 6-week risk of major adverse cardiac events in chest pain patients.",

  category: "Cardiology",

  specialty: "cardiology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "HEART",
    "Chest Pain",
    "ACS",
    "Cardiology",
    "Emergency",
  ],

  warnings: [
    "The HEART score is a risk stratification aid and should not replace clinical judgment or cardiac testing.",
  ],

  formula: "HEART = History + ECG + Age + Risk factors + Troponin",

  normalRange: "0–3 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–3",
    },
    {
      label: "Intermediate risk",
      range: "4–6",
    },
    {
      label: "High risk",
      range: "7–10",
    },
  ],

  clinicalNotes:
    "Higher HEART scores correlate with a greater likelihood of acute coronary syndrome and need for urgent evaluation.",

  references: [
    "Backus BE, et al. Eur Heart J. 2010.",
    "Cardiology risk stratification",
  ],

  inputs: [
    {
      id: "history",
      label: "History is highly suspicious",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "ecg",
      label: "ECG is mildly or severely abnormal",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
      step: 1,
    },
    {
      id: "riskFactors",
      label: "Risk factors present",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "troponin",
      label: "Troponin elevated",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values) {
    let score = 0;

    if (values.history === "yes") score += 2;
    if (values.ecg === "yes") score += 1;
    if (parseFloat(values.age) > 65) score += 2;
    if (values.riskFactors === "yes") score += 1;
    if (values.troponin === "yes") score += 2;

    let interpretation = "Low risk of major adverse cardiac events";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 7) {
      interpretation = "High risk; urgent cardiac evaluation warranted";
      status = "critical";
    } else if (score >= 4) {
      interpretation = "Intermediate risk; continue monitoring and testing";
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
