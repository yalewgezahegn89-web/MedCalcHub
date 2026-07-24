import type { CalculatorDefinition } from "./calculator.types";

export const ttkgCalculator: CalculatorDefinition = {
  id: "ttkg",

  slug: "ttkg",

  name: "Transtubular Potassium Gradient",

  shortName: "TTKG",

  description:
    "Estimates renal potassium secretion in the cortical collecting duct.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "TTKG",
    "Potassium",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "TTKG interpretation is affected by urine collection quality and diuretic use.",
  ],

  formula: "TTKG = (Urine K × Plasma Osmolality) / (Plasma K × Urine Osmolality)",

  normalRange: "8–9",

  referenceRanges: [
    {
      label: "Normal",
      range: "8–9",
    },
    {
      label: "Low",
      range: "<5",
    },
    {
      label: "High",
      range: ">10",
    },
  ],

  clinicalNotes:
    "TTKG helps assess renal potassium handling, especially in evaluating hypokalemia or hyperkalemia.",

  references: [
    "West ML, et al. Kidney Int. 1986.",
    "Nephrology electrolyte references",
  ],

  inputs: [
    {
      id: "urinePotassium",
      label: "Urine Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
      max: 300,
      step: 1,
    },
    {
      id: "plasmaOsmolality",
      label: "Plasma Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 200,
      max: 400,
      step: 1,
    },
    {
      id: "plasmaPotassium",
      label: "Plasma Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 10,
      step: 0.1,
    },
    {
      id: "urineOsmolality",
      label: "Urine Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 50,
      max: 1200,
      step: 1,
    },
  ],

  calculate(values) {
    const urinePotassium = parseFloat(values.urinePotassium);
    const plasmaOsmolality = parseFloat(values.plasmaOsmolality);
    const plasmaPotassium = parseFloat(values.plasmaPotassium);
    const urineOsmolality = parseFloat(values.urineOsmolality);

    const ttkg = plasmaPotassium > 0 && urineOsmolality > 0
      ? (urinePotassium * plasmaOsmolality) / (plasmaPotassium * urineOsmolality)
      : 0;
    const rounded = Math.round(ttkg * 10) / 10;

    let interpretation = "Normal renal potassium handling";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 5) {
      interpretation = "Low TTKG; reduced potassium secretion";
      status = "low";
    } else if (rounded > 10) {
      interpretation = "High TTKG; increased potassium secretion";
      status = "high";
    }

    return {
      value: rounded,
      unit: "ratio",
      interpretation,
      status,
    };
  },
};
