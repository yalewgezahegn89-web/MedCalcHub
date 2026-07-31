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
      "MAP = (SBP + 2 × DBP) / 3",
    normalRange:
      "70–100 mmHg",
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
        label: "Systolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
      {
        id: "dbp",
        label: "Diastolic Blood Pressure",
        type: "number",
        unit: "mmHg",
        required: true,
      },
    ],
  },
};