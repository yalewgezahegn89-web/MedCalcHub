import type { CalculatorDefinition } from "./calculator.types";

export const bsaCalculator: CalculatorDefinition = {
  id: "bsa",

  slug: "bsa",

  name: "bsa",

  shortName: "bsa",

  description:
    "Calculates Body Surface Area (Mosteller formula).",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-02",

  keywords: [],

  formula: "BSA = √((height × weight) / 3600)",

  normalRange: "Typical adult: 1.4–2.2 m²",

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
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


const weight =
    Number(values.weight);

const height =
    Number(values.height);


  const result =
    Math.sqrt((height * weight) / 3600);


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,
};
},

};