import type { CalculatorDefinition } from "./calculator.types";

export const rockallCalculator: CalculatorDefinition = {
  id: "rockall",

  slug: "rockall-score",

  name: "Rockall Score",

  shortName: "Rockall",

  description:
    "Predicts mortality and risk of rebleeding after upper gastrointestinal bleeding.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Rockall",
    "Upper GI Bleeding",
    "UGIB",
    "Endoscopy",
    "Mortality",
    "Rebleeding",
  ],



  formula:
    "Composite score using Age, Shock, Comorbidity, Diagnosis and Endoscopic Stigmata.",

  referenceRanges: [
    {
      label: "Low Risk",
      range: "0–2",
    },
    {
      label: "Moderate Risk",
      range: "3–4",
    },
    {
      label: "High Risk",
      range: "≥5",
    },
  ],

  clinicalNotes:
    "Higher Rockall Scores are associated with increased mortality and recurrent bleeding.",

  references: [
    "Rockall TA et al. Gut. 1996.",
    "ESGE Guideline.",
    "NICE Upper GI Bleeding Guideline.",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "select",
      required: true,
      options: [
        {
          label: "<60 years",
          value: "0",
        },
        {
          label: "60–79 years",
          value: "1",
        },
        {
          label: "≥80 years",
          value: "2",
        },
      ],
    },
    {
      id: "shock",
      label: "Shock",
      type: "select",
      required: true,
      options: [
        {
          label: "No shock",
          value: "0",
        },
        {
          label: "Pulse >100 bpm",
          value: "1",
        },
        {
          label: "SBP <100 mmHg",
          value: "2",
        },
      ],
    },
    {
      id: "comorbidity",
      label: "Comorbidity",
      type: "select",
      required: true,
      options: [
        {
          label: "None",
          value: "0",
        },
        {
          label: "Heart failure / IHD",
          value: "2",
        },
        {
          label: "Renal failure / Liver failure / Metastatic cancer",
          value: "3",
        },
      ],
    },
    {
      id: "diagnosis",
      label: "Endoscopic Diagnosis",
      type: "select",
      required: true,
      options: [
        {
          label: "Mallory-Weiss / No lesion",
          value: "0",
        },
        {
          label: "All other diagnoses",
          value: "1",
        },
        {
          label: "Upper GI malignancy",
          value: "2",
        },
      ],
    },
    {
      id: "stigmata",
      label: "Major Stigmata of Recent Hemorrhage",
      type: "select",
      required: true,
      options: [
        {
          label: "None / Dark spot only",
          value: "0",
        },
        {
          label: "Blood in upper GI tract / Adherent clot / Visible vessel / Active bleeding",
          value: "2",
        },
      ],
    },
  ],

  calculate(values) {    const score =
      parseInt(values.age) +
      parseInt(values.shock) +
      parseInt(values.comorbidity) +
      parseInt(values.diagnosis) +
      parseInt(values.stigmata);

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score <= 2) {
      interpretation =
        "Low risk of mortality and rebleeding.";
      status = "normal";
    } else if (score <= 4) {
      interpretation =
        "Moderate risk. Close monitoring is recommended.";
      status = "high";
    } else {
      interpretation =
        "High risk of mortality and recurrent bleeding. Urgent specialist management is required.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};