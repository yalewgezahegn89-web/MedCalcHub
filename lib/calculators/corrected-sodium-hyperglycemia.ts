import type { CalculatorDefinition } from "./calculator.types";

export const correctedSodiumHyperglycemiaCalculator: CalculatorDefinition = {
  id: "corrected-sodium-hyperglycemia",

  slug: "corrected-sodium-hyperglycemia",

  name: "Corrected Sodium for Hyperglycemia",

  shortName: "Corrected Na",

  description:
    "Corrects serum sodium for hyperglycemia.",

  category: "Nephrology",

  specialty: "nephrology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Corrected sodium",
    "Hyperglycemia",
    "Renal",
    "Nephrology",
  ],

  warnings: [
    "This correction is an approximation and should be interpreted with the clinical context.",
  ],

  formula: "Corrected Na = Measured Na + 1.6 × (Glucose - 100) / 100",

  normalRange: "135–145 mmol/L",

  referenceRanges: [
    {
      label: "Hyponatremia",
      range: "<135 mmol/L",
    },
    {
      label: "Normal",
      range: "135–145 mmol/L",
    },
    {
      label: "Hypernatremia",
      range: ">145 mmol/L",
    },
  ],

  clinicalNotes:
    "Hyperglycemia can lower measured serum sodium concentration through dilutional effects.",

  references: [
    "Hillier TA, et al. Ann Intern Med. 1999.",
    "Electrolyte correction references",
  ],

  inputs: [
    {
      id: "measuredSodium",
      label: "Measured Serum Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 170,
      step: 1,
    },
    {
      id: "glucose",
      label: "Serum Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 80,
      max: 800,
      step: 1,
    },
  ],

  calculate(values) {
    const measuredSodium = parseFloat(values.measuredSodium);
    const glucose = parseFloat(values.glucose);

    const correctedSodium = measuredSodium + 1.6 * ((glucose - 100) / 100);
    const rounded = Math.round(correctedSodium * 10) / 10;

    let interpretation = "Normal corrected sodium";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded < 135) {
      interpretation = "Hyponatremia after correction";
      status = "low";
    } else if (rounded > 145) {
      interpretation = "Hypernatremia after correction";
      status = "high";
    }

    return {
      value: rounded,
      unit: "mmol/L",
      interpretation,
      status,
    };
  },
};
