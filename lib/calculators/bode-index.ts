import type { CalculatorDefinition } from "./calculator.types";

export const bodeIndexCalculator: CalculatorDefinition = {
  id: "bode-index",

  slug: "bode-index",

  name: "BODE Index",

  shortName: "BODE",

  description:
    "Predicts mortality risk in patients with chronic obstructive pulmonary disease (COPD).",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "BODE",
    "COPD",
    "Mortality",
    "Pulmonology",
    "6MWD",
    "mMRC",
  ],

  warnings: [
    "Validated only for patients with COPD.",
    "Requires spirometry and 6-minute walk distance.",
  ],

  formula:
    "Total score = BMI + FEV₁ + mMRC Dyspnea + 6-Minute Walk Distance",

  clinicalNotes:
    "Higher BODE scores are associated with increased mortality and hospitalization in COPD.",

  references: [
    "Celli BR et al. N Engl J Med. 2004.",
    "GOLD COPD Guidelines.",
  ],

  inputs: [
    {
      id: "bmi",
      label: "BMI",
      type: "number",
      unit: "kg/m²",
      required: true,
      min: 10,
      max: 60,
      step: 0.1,
    },
    {
      id: "fev1",
      label: "FEV₁ (% Predicted)",
      type: "number",
      unit: "%",
      required: true,
      min: 10,
      max: 120,
      step: 1,
    },
    {
      id: "mmrc",
      label: "mMRC Dyspnea Grade",
      type: "select",
      required: true,
      options: [
        {
          label: "0–1",
          value: "0",
        },
        {
          label: "2",
          value: "1",
        },
        {
          label: "3",
          value: "2",
        },
        {
          label: "4",
          value: "3",
        },
      ],
    },
    {
      id: "walk",
      label: "6-Minute Walk Distance",
      type: "number",
      unit: "meters",
      required: true,
      min: 0,
      max: 800,
      step: 1,
    },

  ],

  calculate(values) {    let score = 0;

    // BMI
    const bmi = parseFloat(values.bmi);
    if (bmi <= 21) {
      score += 1;
    }

    // FEV1 (% predicted)
    const fev1 = parseFloat(values.fev1);

    if (fev1 >= 65) {
      score += 0;
    } else if (fev1 >= 50) {
      score += 1;
    } else if (fev1 >= 36) {
      score += 2;
    } else {
      score += 3;
    }

    // mMRC Dyspnea
    score += parseInt(values.mmrc);

    // 6-Minute Walk Distance
    const walk = parseFloat(values.walk);

    if (walk >= 350) {
      score += 0;
    } else if (walk >= 250) {
      score += 1;
    } else if (walk >= 150) {
      score += 2;
    } else {
      score += 3;
    }

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score <= 2) {
      interpretation =
        "Low mortality risk (BODE Quartile 1).";
      status = "normal";
    } else if (score <= 4) {
      interpretation =
        "Moderate mortality risk (BODE Quartile 2).";
      status = "high";
    } else if (score <= 6) {
      interpretation =
        "High mortality risk (BODE Quartile 3).";
      status = "high";
    } else {
      interpretation =
        "Very high mortality risk (BODE Quartile 4).";
      status = "critical";
    }

    return {
      value: score,
      unit: "/10",
      interpretation,
      status,
    };
  },
};