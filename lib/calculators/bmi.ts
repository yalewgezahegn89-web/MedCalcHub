import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",

  slug: "bmi",

  name: "bmi",

  shortName: "bmi",

  description:
    "Calculates Body Mass Index.",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-01",

  keywords: [],

  formula: "BMI = weight / height²",

  normalRange: "18.5–24.9 kg/m²",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
  },
  {
    id: "height",
    label: "Height",
    type: "number",
    unit: "cm",
    conversion: {
      type: "divide",
      factor: 100,
    },
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


const weight =
    Number(values.weight);

const height =
    Number(values.height) / 100;

  const result =
    weight / (height * height);

  return {
    value:
      Number(result.toFixed(2)),

    interpretation:
      "Clinical interpretation pending.",

    status:
      "normal",
  };
},

};