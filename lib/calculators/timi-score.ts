import type { CalculatorDefinition } from "./calculator.types";

export const timiScoreCalculator: CalculatorDefinition = {
  id: "timi-score",

  slug: "timi-score",

  name: "TIMI Score",

  shortName: "TIMI",

  description:
    "Predicts mortality and ischemic events in acute coronary syndrome.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "TIMI",
    "ACS",
    "Acute Coronary Syndrome",
    "Cardiology",
  ],

  warnings: [
    "The TIMI score is a prognostic tool and should be interpreted with full clinical assessment.",
  ],

  formula: "TIMI = Age ≥65 + ≥3 risk factors + known CAD + aspirin use + severe angina + ST deviation + elevated biomarkers",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–1",
    },
    {
      label: "Intermediate risk",
      range: "2",
    },
    {
      label: "High risk",
      range: "3+",
    },
  ],

  clinicalNotes:
    "Higher TIMI scores suggest greater short-term risk of adverse cardiac events.",

  references: [
    "Antman EM, et al. JAMA. 2000.",
    "ACS risk scoring",
  ],

  inputs: [
    {
      id: "age",
      label: "Age 65 or older",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "riskFactors",
      label: "Three or more risk factors",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "knownCad",
      label: "Known coronary artery disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "aspirinUse",
      label: "Aspirin use in prior 7 days",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "severeAngina",
      label: "Severe angina in prior 24 hours",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "stDeviation",
      label: "ST-segment deviation",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "biomarkers",
      label: "Elevated cardiac biomarkers",
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

    if (values.age === "yes") score += 1;
    if (values.riskFactors === "yes") score += 1;
    if (values.knownCad === "yes") score += 1;
    if (values.aspirinUse === "yes") score += 1;
    if (values.severeAngina === "yes") score += 1;
    if (values.stDeviation === "yes") score += 1;
    if (values.biomarkers === "yes") score += 1;

    let interpretation = "Low risk of adverse cardiac events";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 3) {
      interpretation = "High risk of adverse cardiac events";
      status = "critical";
    } else if (score === 2) {
      interpretation = "Intermediate risk; continue monitoring";
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
