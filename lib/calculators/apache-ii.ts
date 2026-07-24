import type { CalculatorDefinition } from "./calculator.types";

export const apacheIiCalculator: CalculatorDefinition = {
  id: "apache-ii",

  slug: "apache-ii",

  name: "APACHE II",

  shortName: "APACHE II",

  description:
    "An ICU severity scoring system estimating disease severity and mortality risk.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "APACHE II",
    "Critical Care",
    "ICU",
    "Severity",
  ],

  warnings: [
    "APACHE II is a severity score and should not be used alone for clinical decision-making.",
  ],

  formula: "APACHE II = age points + chronic health points + physiological points",

  normalRange: "0–10 points",

  referenceRanges: [
    {
      label: "Low severity",
      range: "0–10",
    },
    {
      label: "Moderate severity",
      range: "11–20",
    },
    {
      label: "High severity",
      range: "21+",
    },
  ],

  clinicalNotes:
    "Higher APACHE II scores correlate with increased mortality risk in ICU patients.",

  references: [
    "Knaus WA, et al. Crit Care Med. 1985.",
    "ICU severity scoring",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 16,
      max: 120,
      step: 1,
    },
    {
      id: "gcs",
      label: "Glasgow Coma Scale",
      type: "number",
      required: true,
      min: 3,
      max: 15,
      step: 1,
    },
    {
      id: "meanArterialPressure",
      label: "Mean Arterial Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 20,
      max: 200,
      step: 1,
    },
    {
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
    {
      id: "respiratoryRate",
      label: "Respiratory Rate",
      type: "number",
      unit: "breaths/min",
      required: true,
      min: 8,
      max: 80,
      step: 1,
    },
    {
      id: "temperature",
      label: "Temperature",
      type: "number",
      unit: "°C",
      required: true,
      min: 30,
      max: 42,
      step: 0.1,
    },
    {
      id: "chronicHealth",
      label: "Chronic health status",
      type: "select",
      required: true,
      options: [
        { label: "No severe organ insufficiency", value: "none" },
        { label: "Moderate organ insufficiency", value: "moderate" },
        { label: "Severe organ insufficiency", value: "severe" },
      ],
    },
  ],

  calculate(values) {
    const age = parseFloat(values.age);
    const gcs = parseFloat(values.gcs);
    const map = parseFloat(values.meanArterialPressure);
    const heartRate = parseFloat(values.heartRate);
    const respiratoryRate = parseFloat(values.respiratoryRate);
    const temperature = parseFloat(values.temperature);
    const chronicHealth = values.chronicHealth;

    let agePoints = 0;
    if (age >= 45) agePoints += 2;
    if (age >= 55) agePoints += 3;
    if (age >= 65) agePoints += 5;
    if (age >= 75) agePoints += 6;

    let physiologicalPoints = 0;
    if (gcs < 15) physiologicalPoints += 15 - gcs;
    if (map < 70) physiologicalPoints += 5;
    if (heartRate < 70 || heartRate > 110) physiologicalPoints += 2;
    if (respiratoryRate < 12 || respiratoryRate > 24) physiologicalPoints += 2;
    if (temperature < 36 || temperature > 38.5) physiologicalPoints += 2;

    let chronicHealthPoints = 0;
    if (chronicHealth === "moderate") chronicHealthPoints = 2;
    if (chronicHealth === "severe") chronicHealthPoints = 5;

    const score = agePoints + chronicHealthPoints + physiologicalPoints;

    let interpretation = "Low ICU severity score";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 21) {
      interpretation = "High severity and likely increased mortality risk";
      status = "critical";
    } else if (score >= 11) {
      interpretation = "Moderate severity; close monitoring warranted";
      status = "high";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
