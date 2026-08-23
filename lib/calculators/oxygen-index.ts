import type { CalculatorDefinition } from "./calculator.types";

export const oxygenIndexCalculator: CalculatorDefinition = {
  id: "oxygen-index",

  slug: "oxygen-index",

  name: "Oxygen Index",

  shortName: "OI",

  description:
    "Calculates the Oxygen Index to assess severity of hypoxemic respiratory failure in mechanically ventilated patients.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Oxygen Index",
    "OI",
    "ARDS",
    "Mechanical Ventilation",
    "Neonatology",
    "PICU",
    "ICU",
  ],



  formula:
    "OI = (FiO₂ × Mean Airway Pressure × 100) ÷ PaO₂",

  referenceRanges: [
    {
      label: "Mild",
      range: "<5",
    },
    {
      label: "Moderate",
      range: "5–15",
    },
    {
      label: "Severe",
      range: "16–25",
    },
    {
      label: "Very Severe",
      range: ">25",
    },
  ],

  clinicalNotes:
    "A higher Oxygen Index indicates more severe oxygenation failure and is commonly used in neonatal and pediatric intensive care.",

  references: [
    "AAP Neonatal Guidelines.",
    "ATS Mechanical Ventilation Guidance.",
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
      id: "pao2",
      label: "PaO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 10,
      max: 600,
      step: 1,
    },
  ],

  calculate(values) {    const fio2 = parseFloat(values.fio2);
    const map = parseFloat(values.map);
    const pao2 = parseFloat(values.pao2);

    const oi = (fio2 * map * 100) / pao2;
    const score = Math.round(oi * 100) / 100;

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
    } else if (score < 16) {
      interpretation =
        "Moderate oxygenation impairment.";
      status = "high";
    } else if (score <= 25) {
      interpretation =
        "Severe oxygenation impairment.";
      status = "critical";
    } else {
      interpretation =
        "Very severe oxygenation impairment. Consider advanced ventilatory support.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};