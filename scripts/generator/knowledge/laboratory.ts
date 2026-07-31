import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const laboratoryKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  "corrected-calcium": {
    category: "Laboratory",
    specialty: "Internal Medicine",
    description:
      "Calculates corrected serum calcium based on albumin concentration.",
    formula:
      "Corrected Calcium = Measured Calcium + 0.8 × (4 − Albumin)",
    normalRange:
      "8.5–10.5 mg/dL",
    keywords: [
      "corrected calcium",
      "albumin",
      "calcium",
      "laboratory",
      "electrolytes",
    ],
    inputs: [
      {
        id: "calcium",
        label: "Measured Calcium",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "albumin",
        label: "Albumin",
        type: "number",
        unit: "g/dL",
        required: true,
      },
    ],
  },
};