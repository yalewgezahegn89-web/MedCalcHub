import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const cardiologyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  map: {
    category: "Cardiology",
    specialty: "Emergency Medicine",
    description:
      "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",
    formula:
      "(sbp + 2 * dbp) / 3",
    normalRange:
      "70-100 mmHg",
    keywords: [
      "map",
      "mean arterial pressure",
      "blood pressure",
      "sbp",
      "dbp",
      "hemodynamics",
    ],
    inputs: [
      {
        id: "sbp",
        label: "SBP",
        type: "number",
        unit: "mmHg",
        required: true,
      },
      {
        id: "dbp",
        label: "DBP",
        type: "number",
        unit: "mmHg",
        required: true,
      },
    ],
  },

  "heart-rate": {
    category: "Cardiology",
    specialty: "Emergency Medicine",
    description:
      "Calculates heart rate from the number of beats counted over a measured time interval.",
    formula:
      "beats / time",
    normalRange:
      "60-100 bpm",
    keywords: [
      "heart rate",
      "pulse",
      "bpm",
      "cardiology",
      "vital signs",
    ],
    inputs: [
      {
        id: "beats",
        label: "Number of Beats",
        type: "number",
        unit: "beats",
        required: true,
      },
      {
        id: "time",
        label: "Time",
        type: "number",
        unit: "minutes",
        required: true,
      },
    ],
  },
};