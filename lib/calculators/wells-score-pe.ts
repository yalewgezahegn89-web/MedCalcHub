import type { CalculatorDefinition } from "./calculator.types";

export const wellsScorePeCalculator: CalculatorDefinition = {
  id: "wells-score-pe",

  slug: "wells-score-pe",

  name: "Wells Score for PE",

  shortName: "Wells PE",

  description:
    "Estimates pre-test probability of pulmonary embolism.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Wells",
    "Pulmonary Embolism",
    "PE",
    "Emergency",
  ],

  warnings: [
    "This score is a probabilistic assessment and does not replace diagnostic testing.",
  ],

  formula: "Wells PE score = clinical signs + alternative diagnosis + tachycardia + surgery/immobilization + hemoptysis + malignancy + DVT history",

  normalRange: "0–1 points",

  referenceRanges: [
    {
      label: "Low probability",
      range: "0–1",
    },
    {
      label: "Intermediate probability",
      range: "2–6",
    },
    {
      label: "High probability",
      range: "7+",
    },
  ],

  clinicalNotes:
    "The Wells score helps determine whether pulmonary embolism is likely and guides diagnostic workup.",

  references: [
    "Wells PS, et al. Thromb Haemost. 2000.",
    "ACC/AHA guidelines",
  ],

  inputs: [
    {
      id: "signs",
      label: "Clinical signs of DVT",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "alternativeDiagnosis",
      label: "Alternative diagnosis less likely",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "tachycardia",
      label: "Heart rate > 100 bpm",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "immobilization",
      label: "Recent surgery or immobilization",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "hemoptysis",
      label: "Hemoptysis",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "malignancy",
      label: "Malignancy",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "dvtHistory",
      label: "History of DVT",
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
    if (values.signs === "yes") score += 3;
    if (values.alternativeDiagnosis === "yes") score += 3;
    if (values.tachycardia === "yes") score += 1.5;
    if (values.immobilization === "yes") score += 1.5;
    if (values.hemoptysis === "yes") score += 1;
    if (values.malignancy === "yes") score += 1;
    if (values.dvtHistory === "yes") score += 1.5;

    const rounded = Math.round(score * 10) / 10;

    let interpretation = "Low probability of PE";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded >= 7) {
      interpretation = "High probability of PE";
      status = "critical";
    } else if (rounded >= 2) {
      interpretation = "Intermediate probability of PE";
      status = "high";
    }

    return {
      value: rounded,
      unit: "points",
      interpretation,
      status,
    };
  },
};
