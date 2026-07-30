import type { CalculatorDefinition } from "../calculator.types";

export const bsaTest-4Calculator: CalculatorDefinition = {
  id: "bsa-test-4",

  slug: "bsa-test-4",

  name: "BSA Calculator",

  shortName: "BSA Calculator",

  description:
    "Calculates Body Surface Area (Mosteller formula).",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-07-30",

  keywords: [],

  formula: "BSA = √((height × weight) / 3600)",

  normalRange: "Typical adult: 1.4–2.2 m²",

  referenceRanges: [],

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "Mosteller RD. Simplified Calculation of Body Surface Area. N Engl J Med. 1987;317(17):1098.",
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

  calculate(values) {
  const weight = Number(values.weight);
  const height = Number(values.height);

  return {
    value: "",
    interpretation: "",
    status: "normal",
  };
}