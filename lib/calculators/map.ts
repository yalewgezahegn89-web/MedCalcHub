import type { CalculatorDefinition } from "./calculator.types";

export const mapCalculator: CalculatorDefinition = {
  id: "map",

  slug: "map",

  name: "map",

  shortName: "map",

  description:
    "Calculates Mean Arterial Pressure from systolic and diastolic blood pressure.",

  category: "Cardiology",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-01",

  keywords: [],

  formula: "MAP = (SBP + 2 × DBP) / 3",

  normalRange: "70-100 mmHg",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "sbp",
    label: "Systolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  },
  {
    id: "dbp",
    label: "Diastolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {

const sbp =
    Number(values.sbp);

const dbp =
    Number(values.dbp);

  const result =
    (sbp + 2 * dbp) / 3;

  return {
    value:
      Number(result.toFixed(2)),
    interpretation:
      "Clinical interpretation pending.",
    status: "normal",
  };
},

};