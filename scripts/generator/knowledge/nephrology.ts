import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const nephrologyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  "ckd-epi": {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Estimates glomerular filtration rate (eGFR) using the CKD-EPI equation.",
    formula:
      "CKD-EPI 2021 Creatinine Equation",
    normalRange:
      ">90 mL/min/1.73m²",
    keywords: [
      "ckd",
      "egfr",
      "creatinine",
      "renal",
      "kidney",
    ],
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        required: true,
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "creatinine",
        label: "Serum Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
  },
};