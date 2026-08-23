import type { CalculatorDefinition } from "./calculator.types";

export const roxIndexCalculator: CalculatorDefinition = {
  id: "rox-index",

  slug: "rox-index",

  name: "ROX Index",

  shortName: "ROX",

  description:
    "Predicts success of high-flow nasal cannula (HFNC) therapy in acute hypoxemic respiratory failure.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "ROX Index",
    "HFNC",
    "High Flow Nasal Cannula",
    "Respiratory Failure",
    "COVID",
    "Pulmonology",
    "ICU",
  ],

  warnings: [
    "Use in patients receiving High-Flow Nasal Cannula (HFNC).",
    "Clinical judgment should always guide escalation of respiratory support.",
  ],

  formula:
    "ROX = (SpO₂ / FiO₂) ÷ Respiratory Rate",

  referenceRanges: [
    {
      label: "High Risk of HFNC Failure",
      range: "<3.85",
    },
    {
      label: "Intermediate",
      range: "3.85–4.87",
    },
    {
      label: "Likely HFNC Success",
      range: "≥4.88",
    },
  ],

  clinicalNotes:
    "The ROX Index helps predict whether patients with acute hypoxemic respiratory failure receiving HFNC are likely to require intubation.",

  references: [
    "Roca O et al. J Crit Care. 2016.",
    "ERS Clinical Practice Guidelines.",
  ],

  inputs: [
    {
      id: "spo2",
      label: "SpO₂",
      type: "number",
      unit: "%",
      required: true,
      min: 50,
      max: 100,
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
      id: "rr",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 5,
      max: 80,
      step: 1,
    },
  ],

  calculate(values) {    const spo2 = parseFloat(values.spo2);
    const fio2 = parseFloat(values.fio2);
    const rr = parseFloat(values.rr);

    const rox = (spo2 / fio2) / rr;
    const score = Math.round(rox * 100) / 100;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score >= 4.88) {
      interpretation =
        "Likely HFNC success. Low risk of intubation.";
      status = "normal";
    } else if (score >= 3.85) {
      interpretation =
        "Intermediate risk. Close monitoring and reassessment are recommended.";
      status = "high";
    } else {
      interpretation =
        "High risk of HFNC failure. Consider early escalation of respiratory support.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    }; 
  },
};