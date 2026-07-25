import type { CalculatorDefinition } from "./calculator.types";

export const oxygenSaturationIndexCalculator: CalculatorDefinition = {
  id: "oxygen-saturation-index",

  slug: "oxygen-saturation-index",

  name: "Oxygen Saturation Index",

  shortName: "OSI",

  description:
    "Calculates Oxygen Saturation Index using FiO₂, mean airway pressure, and oxygen saturation to assess oxygenation severity when PaO₂ is unavailable.",

  category: "Pulmonology",

specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Oxygen Saturation Index",
    "OSI",
    "ARDS",
    "ICU",
    "PICU",
    "NICU",
    "Mechanical Ventilation",
  ],

  warnings: [
    "Used primarily in mechanically ventilated patients.",
    "Interpret with clinical status and ventilator settings.",
  ],

  formula:
    "OSI = (FiO₂ × Mean Airway Pressure × 100) ÷ SpO₂",

  referenceRanges: [
    {
      label: "Mild Oxygenation Impairment",
      range: "<5",
    },
    {
      label: "Moderate Oxygenation Impairment",
      range: "5–10",
    },
    {
      label: "Severe Oxygenation Impairment",
      range: ">10",
    },
  ],

  clinicalNotes:
    "OSI is a non-invasive surrogate for Oxygen Index and is useful when arterial blood gas measurement is not available.",

  references: [
    "Rice TW et al. Crit Care Med.",
    "Pediatric ARDS Consensus Conference.",
  ],

  inputs: [
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
      id: "map",
      label: "Mean Airway Pressure",
      type: "number",
      unit: "cmH₂O",
      required: true,
      min: 1,
      max: 50,
      step: 0.5,
    },
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
  ],

  calculate(values) {    const fio2 = parseFloat(values.fio2);
    const map = parseFloat(values.map);
    const spo2 = parseFloat(values.spo2);

    const osi = (fio2 * map * 100) / spo2;
    const score = Math.round(osi * 100) / 100;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score < 5) {
      interpretation =
        "Mild oxygenation impairment.";
      status = "normal";
    } else if (score <= 10) {
      interpretation =
        "Moderate oxygenation impairment.";
      status = "high";
    } else {
      interpretation =
        "Severe oxygenation impairment. Consider escalation of ventilatory support.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};