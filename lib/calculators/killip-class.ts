import type { CalculatorDefinition } from "./calculator.types";

export const killipClassCalculator: CalculatorDefinition = {
  id: "killip-class",

  slug: "killip-class",

  name: "Killip Class",

  shortName: "Killip",

  description:
    "Classifies heart failure severity after acute myocardial infarction.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Killip",
    "Heart Failure",
    "Myocardial Infarction",
    "Cardiology",
  ],

  warnings: [
    "Killip class is a clinical severity tool and should be used with the broader bedside assessment.",
  ],

  formula: "Killip class = clinical evidence of heart failure and pulmonary edema",

  normalRange: "Class I",

  referenceRanges: [
    {
      label: "Class I",
      range: "No heart failure",
    },
    {
      label: "Class II",
      range: "Mild heart failure",
    },
    {
      label: "Class III",
      range: "Pulmonary edema",
    },
    {
      label: "Class IV",
      range: "Cardiogenic shock",
    },
  ],

  clinicalNotes:
    "Higher Killip classes reflect greater heart failure severity and poorer prognosis after MI.",

  references: [
    "Killip T, Kimball JT. Am J Cardiol. 1967.",
    "Cardiology severity scoring",
  ],

  inputs: [
    {
      id: "signs",
      label: "Clinical signs of heart failure",
      type: "select",
      required: true,
      options: [
        { label: "None", value: "none" },
        { label: "Crackles or S3", value: "mild" },
        { label: "Pulmonary edema", value: "moderate" },
        { label: "Cardiogenic shock", value: "severe" },
      ],
    },
  ],

  calculate(values) {
    const signs = values.signs;

    let score = 1;
    let interpretation = "Class I: No signs of HF";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (signs === "mild") {
      score = 2;
      interpretation = "Class II: Mild heart failure";
      status = "high";
    } else if (signs === "moderate") {
      score = 3;
      interpretation = "Class III: Pulmonary edema";
      status = "critical";
    } else if (signs === "severe") {
      score = 4;
      interpretation = "Class IV: Cardiogenic shock";
      status = "critical";
    }

    return {
      value: score,
      unit: "class",
      interpretation,
      status,
    };
  },
};
