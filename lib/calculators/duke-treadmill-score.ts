import type { CalculatorDefinition } from "./calculator.types";

export const dukeTreadmillScoreCalculator: CalculatorDefinition = {
  id: "duke-treadmill-score",

  slug: "duke-treadmill-score",

  name: "Duke Treadmill Score",

  shortName: "DTS",

  description:
    "Assesses prognosis in patients undergoing treadmill exercise testing.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Duke Treadmill Score",
    "Exercise Stress Test",
    "Cardiology",
  ],

  warnings: [
    "The Duke treadmill score is a prognostic estimate and should be interpreted with exercise-test context.",
  ],

  formula: "DTS = exercise time - (5 × max ST deviation) - (4 × angina index)",

  normalRange: ">5 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: ">5",
    },
    {
      label: "Intermediate risk",
      range: "-10 to 4",
    },
    {
      label: "High risk",
      range: "<-10",
    },
  ],

  clinicalNotes:
    "Higher Duke treadmill scores indicate better prognosis, while more negative scores indicate higher risk.",

  references: [
    "Mark DB, et al. Circulation. 1987.",
    "Exercise stress testing",
  ],

  inputs: [
    {
      id: "exerciseMinutes",
      label: "Exercise time",
      type: "number",
      unit: "min",
      required: true,
      min: 0,
      max: 30,
      step: 0.1,
    },
    {
      id: "maxStDeviation",
      label: "Maximum ST deviation",
      type: "number",
      unit: "mm",
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
    },
    {
      id: "anginaIndex",
      label: "Angina during test",
      type: "select",
      required: true,
      options: [
        { label: "None", value: "0" },
        { label: "Non-limiting", value: "1" },
        { label: "Limiting", value: "2" },
      ],
    },
  ],

  calculate(values) {
    const exerciseMinutes = parseFloat(values.exerciseMinutes);
    const maxStDeviation = parseFloat(values.maxStDeviation);
    const anginaIndex = parseFloat(values.anginaIndex);

    const score = exerciseMinutes - 5 * maxStDeviation - 4 * anginaIndex;
    const rounded = Math.round(score * 10) / 10;

    let interpretation = "Low risk on exercise testing";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < -10) {
      interpretation = "High risk on exercise testing";
      status = "critical";
    } else if (rounded <= 4) {
      interpretation = "Intermediate risk on exercise testing";
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
