import type { CalculatorDefinition } from "./calculator.types";

export const maddreyCalculator: CalculatorDefinition = {
  id: "maddrey",

  slug: "maddrey-discriminant-function",

  name: "Maddrey Discriminant Function",

  shortName: "MDF",

  description:
    "Predicts severity and prognosis in alcoholic hepatitis.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Maddrey",
    "Alcoholic Hepatitis",
    "MDF",
    "Liver",
    "Hepatology",
  ],



  formula:
    "4.6 × (Patient PT − Control PT) + Total Bilirubin",

  referenceRanges: [
    {
      label: "Mild Disease",
      range: "<32",
    },
    {
      label: "Severe Alcoholic Hepatitis",
      range: "≥32",
    },
  ],

  clinicalNotes:
    "Patients with MDF ≥32 are considered to have severe alcoholic hepatitis and may benefit from corticosteroid therapy if no contraindications exist.",

  references: [
    "Maddrey WC et al.",
    "AASLD Practice Guidance.",
    "EASL Clinical Practice Guidelines.",
  ],

  inputs: [
    {
      id: "patient_pt",
      label: "Patient Prothrombin Time",
      type: "number",
      unit: "seconds",
      required: true,
      min: 1,
      max: 120,
      step: 0.1,
    },
    {
      id: "control_pt",
      label: "Control Prothrombin Time",
      type: "number",
      unit: "seconds",
      required: true,
      min: 1,
      max: 120,
      step: 0.1,
    },
    {
      id: "bilirubin",
      label: "Total Bilirubin",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 60,
      step: 0.1,
    },
  ],

  calculate(values) {    const patientPT = parseFloat(values.patient_pt);
    const controlPT = parseFloat(values.control_pt);
    const bilirubin = parseFloat(values.bilirubin);

    const mdf =
      4.6 * (patientPT - controlPT) +
      bilirubin;

    const score =
      Math.round(mdf * 10) / 10;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score < 32) {
      interpretation =
        "Mild alcoholic hepatitis. Poor short-term prognosis is less likely.";
      status = "normal";
    } else {
      interpretation =
        "Severe alcoholic hepatitis (MDF ≥32). Consider corticosteroid therapy if there are no contraindications.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    }; 
  },
};