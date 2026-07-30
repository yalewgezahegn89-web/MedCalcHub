export const nephrologyKnowledge = {
  "ckd-epi-egfr": {
    category: "Nephrology",
    specialty: "Renal Medicine",
    description:
      "Estimates glomerular filtration rate using the CKD-EPI 2021 creatinine equation.",
    formula:
      "eGFR = 142 × min(Scr/k,1)^α × max(Scr/k,1)^-1.200 × 0.9938^Age × 1.012 [if female]",
    normalRange:
      "≥90 mL/min/1.73m²",
    keywords: [
      "ckd",
      "egfr",
      "kidney function",
      "creatinine",
      "renal",
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
} as const;