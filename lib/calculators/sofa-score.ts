import type { CalculatorDefinition } from "./calculator.types";

export const sofaScoreCalculator: CalculatorDefinition = {
  id: "sofa-score",

  slug: "sofa-score",

  name: "SOFA Score",

  shortName: "SOFA",

  description:
    "Sequential Organ Failure Assessment score for multi-organ dysfunction.",

  category: "Critical Care",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "SOFA",
    "Critical Care",
    "Sepsis",
    "Organ Failure",
  ],

  warnings: [
    "The SOFA score is a severity marker and should be interpreted alongside the clinical picture and ICU context.",
  ],

  formula: "SOFA = respiratory + coagulation + hepatic + cardiovascular + neurological + renal",

  normalRange: "0–1 points",

  referenceRanges: [
    {
      label: "Mild dysfunction",
      range: "1–4",
    },
    {
      label: "Moderate dysfunction",
      range: "5–9",
    },
    {
      label: "Severe dysfunction",
      range: "10–24",
    },
  ],

  clinicalNotes:
    "A higher SOFA score reflects greater organ dysfunction and worse prognosis in critically ill patients.",

  references: [
    "Vincent JL, et al. Intensive Care Med. 1996.",
    "Sepsis guidelines",
  ],

  inputs: [
    {
      id: "pao2",
      label: "PaO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 30,
      max: 500,
      step: 1,
    },
    {
      id: "fio2",
      label: "FiO₂",
      type: "number",
      required: true,
      min: 0.21,
      max: 1,
      step: 0.01,
    },
    {
      id: "platelets",
      label: "Platelets",
      type: "number",
      unit: "×10³/µL",
      required: true,
      min: 0,
      max: 1000,
      step: 1,
    },
    {
      id: "bilirubin",
      label: "Bilirubin",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 30,
      step: 0.1,
    },
    {
      id: "map",
      label: "Mean Arterial Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 20,
      max: 160,
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
      id: "creatinine",
      label: "Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
  ],

  calculate(values) {
    const pao2 = parseFloat(values.pao2);
    const fio2 = parseFloat(values.fio2);
    const platelets = parseFloat(values.platelets);
    const bilirubin = parseFloat(values.bilirubin);
    const map = parseFloat(values.map);
    const gcs = parseFloat(values.gcs);
    const creatinine = parseFloat(values.creatinine);

    const ratio = pao2 / fio2;
    const respiratory = ratio < 100 ? 4 : ratio < 200 ? 3 : ratio < 300 ? 2 : 1;
    const coagulation = platelets < 20 ? 4 : platelets < 50 ? 3 : platelets < 100 ? 2 : platelets < 150 ? 1 : 0;
    const hepatic = bilirubin >= 12 ? 4 : bilirubin >= 6 ? 3 : bilirubin >= 2 ? 2 : bilirubin >= 1.2 ? 1 : 0;
    const cardiovascular = map < 70 ? 3 : map < 70 ? 2 : 0;
    const neurological = gcs <= 6 ? 4 : gcs <= 9 ? 3 : gcs <= 13 ? 2 : gcs <= 14 ? 1 : 0;
    const renal = creatinine >= 3.5 ? 4 : creatinine >= 2 ? 3 : creatinine >= 1.2 ? 2 : creatinine >= 1.2 ? 1 : 0;

    const score = respiratory + coagulation + hepatic + cardiovascular + neurological + renal;

    let interpretation = "No major organ dysfunction";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 10) {
      interpretation = "Severe multi-organ dysfunction";
      status = "critical";
    } else if (score >= 5) {
      interpretation = "Moderate organ dysfunction";
      status = "high";
    } else if (score > 0) {
      interpretation = "Mild organ dysfunction";
      status = "low";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
