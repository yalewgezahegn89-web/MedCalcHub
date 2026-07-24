import type { CalculatorDefinition } from "./calculator.types";
import { calculateTTKG } from "./utils/internal-medicine";

export const ttkgCalculator: CalculatorDefinition = {
  id: "ttkg",

  slug: "ttkg",

  name: "TTKG",

  shortName: "TTKG",

  description:
    "Calculates the transtubular potassium gradient.",

  category: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "TTKG = (Urine K × Plasma Osmolality) ÷ (Plasma K × Urine Osmolality)",

  normalRange: "8–12",

  clinicalNotes:
    "TTKG is used to assess the renal response to potassium handling.",

  references: [
    "Clinical electrolyte guidelines",
    "Nephrology references",
  ],

  warnings: [
    "Interpretation may be affected by diuretics and other renal conditions.",
  ],

  keywords: [
    "TTKG",
    "Potassium",
    "Electrolytes",
    "Renal",
  ],

  inputs: [
    {
      id: "urineK",
      label: "Urine Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 200,
      step: 1,
    },
    {
      id: "plasmaK",
      label: "Plasma Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 1,
      max: 8,
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
    {
      id: "plasmaOsmolality",
      label: "Plasma Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 150,
      max: 400,
      step: 1,
    },
  ],

  calculate(values) {
    const urineK = parseFloat(values.urineK);
    const plasmaK = parseFloat(values.plasmaK);
    const urineOsmolality = parseFloat(values.urineOsmolality);
    const plasmaOsmolality = parseFloat(values.plasmaOsmolality);

    const ttkg = calculateTTKG(
      urineK,
      plasmaK,
      urineOsmolality,
      plasmaOsmolality,
    );

    return {
      value: ttkg,
      interpretation: "Estimated transtubular potassium gradient",
      status: "normal",
    };
  },
};
