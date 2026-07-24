import type { CalculatorDefinition } from "./calculator.types";

export const sepsisScreeningCalculator: CalculatorDefinition = {
  id: "sepsis-screening",

  slug: "sepsis-screening",

  name: "Sepsis Screening",

  shortName: "Sepsis",

  description:
    "Screens for sepsis using SIRS, qSOFA, and clinical suspicion of infection.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Sepsis",
    "Screening",
    "SIRS",
    "qSOFA",
    "Emergency",
  ],

  warnings: [
    "This screening tool should not replace formal sepsis evaluation and treatment.",
  ],

  formula: "Sepsis screen = SIRS criteria + qSOFA + suspected infection",

  normalRange: "0–1 positive signals",

  referenceRanges: [
    {
      label: "Low concern",
      range: "0–1",
    },
    {
      label: "Intermediate concern",
      range: "2",
    },
    {
      label: "High concern",
      range: "3",
    },
  ],

  clinicalNotes:
    "A higher score suggests increasing concern for sepsis and the need for urgent evaluation.",

  references: [
    "Sepsis-3 guidelines",
    "Surviving Sepsis Campaign",
  ],

  inputs: [
    {
      id: "sirs",
      label: "SIRS criteria met",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "qsofa",
      label: "qSOFA criteria met",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "suspectedInfection",
      label: "Suspected infection",
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
    if (values.sirs === "yes") score += 1;
    if (values.qsofa === "yes") score += 1;
    if (values.suspectedInfection === "yes") score += 1;

    let interpretation = "Low concern for sepsis";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 3) {
      interpretation = "High concern for sepsis; urgent evaluation and treatment warranted";
      status = "critical";
    } else if (score === 2) {
      interpretation = "Intermediate concern; continue monitoring and assess for sepsis";
      status = "high";
    } else if (score === 1) {
      interpretation = "Low to moderate concern; reassess clinically";
      status = "low";
    }

    return {
      value: score,
      unit: "signals",
      interpretation,
      status,
    };
  },
};
