import type { CalculatorDefinition } from "./calculator.types";

export const aaGradientCalculator: CalculatorDefinition = {
  id: "a-a-gradient",

  slug: "a-a-gradient",

  name: "A–a Oxygen Gradient",

  shortName: "A–a Gradient",

  description:
    "Calculates the alveolar-arterial oxygen gradient to assess gas exchange abnormalities.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "A-a Gradient",
    "Alveolar Arterial Gradient",
    "Pulmonology",
    "Hypoxemia",
    "ABG",
    "Respiratory Failure",
  ],

  warnings: [
    "Assumes sea level (760 mmHg) and respiratory quotient (RQ = 0.8).",
    "Interpret together with the patient's age and clinical condition.",
  ],

  formula:
    "PAO₂ = FiO₂ × (760 − 47) − (PaCO₂ / 0.8); A–a Gradient = PAO₂ − PaO₂",

  referenceRanges: [
    {
      label: "Normal",
      range: "< Age/4 + 4 mmHg",
    },
    {
      label: "Elevated",
      range: "> Expected for age",
    },
  ],

  clinicalNotes:
    "An increased A–a gradient suggests V/Q mismatch, diffusion impairment, or right-to-left shunt.",

  references: [
    "West JB. Respiratory Physiology.",
    "ATS Clinical Practice.",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 1,
      max: 120,
      step: 1,
    },
    {
      id: "fio2",
      label: "FiO₂",
      type: "number",
      unit: "fraction",
      required: true,
      min: 0.21,
      max: 1,
      step: 0.01,
    },
    {
      id: "pao2",
      label: "PaO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 10,
      max: 600,
      step: 1,
    },
    {
      id: "paco2",
      label: "PaCO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 10,
      max: 150,
      step: 1,
    },
  ],

  calculate(values) {    const age = parseFloat(values.age);
    const fio2 = parseFloat(values.fio2);
    const pao2 = parseFloat(values.pao2);
    const paco2 = parseFloat(values.paco2);

    // Alveolar Gas Equation
    const alveolarO2 =
      fio2 * (760 - 47) - (paco2 / 0.8);

    const gradient =
      alveolarO2 - pao2;

    const score =
      Math.round(gradient * 10) / 10;

    const expected =
      age / 4 + 4;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score <= expected) {
      interpretation =
        "Normal A–a oxygen gradient for age.";
      status = "normal";
    } else if (score <= expected + 20) {
      interpretation =
        "Mildly elevated A–a gradient. Consider early V/Q mismatch.";
      status = "high";
    } else if (score <= expected + 50) {
      interpretation =
        "Moderately elevated A–a gradient suggesting significant impairment of oxygen transfer.";
      status = "high";
    } else {
      interpretation =
        "Severely elevated A–a gradient suggesting severe V/Q mismatch, diffusion impairment, or right-to-left shunt.";
      status = "critical";
    }

    return {
      value: score,
      unit: "mmHg",
      interpretation,
      status,
    };
  },
};