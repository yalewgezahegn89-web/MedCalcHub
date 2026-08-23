import type { CalculatorDefinition } from "./calculator.types";

export const pfRatioCalculator: CalculatorDefinition = {
  id: "pf-ratio",

  slug: "pf-ratio",

  name: "PaO₂ / FiO₂ Ratio",

  shortName: "P/F Ratio",

  description:
    "Calculates the arterial oxygen partial pressure to inspired oxygen fraction ratio for assessment of hypoxemia and ARDS severity.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "PF Ratio",
    "PaO2 FiO2",
    "ARDS",
    "Berlin Definition",
    "ICU",
    "Hypoxemia",
  ],



  formula:
    "P/F Ratio = PaO₂ ÷ FiO₂",

  referenceRanges: [
    {
      label: "Normal",
      range: ">400",
    },
    {
      label: "Mild Oxygenation Deficit",
      range: "301–400",
    },
    {
      label: "Mild ARDS",
      range: "201–300",
    },
    {
      label: "Moderate ARDS",
      range: "101–200",
    },
    {
      label: "Severe ARDS",
      range: "≤100",
    },
  ],

  clinicalNotes:
    "The P/F Ratio is widely used to quantify hypoxemia and classify ARDS severity according to the Berlin Definition.",

  references: [
    "ARDS Definition Task Force. JAMA. 2012.",
    "ATS Clinical Practice Guidelines.",
  ],

  inputs: [
    {
      id: "pao2",
      label: "PaO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 10,
      max: 700,
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
  ],

  calculate(values) {    const pao2 = parseFloat(values.pao2);
    const fio2 = parseFloat(values.fio2);

    const ratio = pao2 / fio2;
    const score = Math.round(ratio);

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score > 400) {
      interpretation =
        "Normal oxygenation.";
      status = "normal";
    } else if (score > 300) {
      interpretation =
        "Mild impairment of oxygenation.";
      status = "high";
    } else if (score > 200) {
      interpretation =
        "Mild ARDS (Berlin Definition, with appropriate PEEP).";
      status = "high";
    } else if (score > 100) {
      interpretation =
        "Moderate ARDS (Berlin Definition, with appropriate PEEP).";
      status = "critical";
    } else {
      interpretation =
        "Severe ARDS (Berlin Definition, with appropriate PEEP).";
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