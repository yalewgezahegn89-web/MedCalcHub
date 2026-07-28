import type { CalculatorDefinition } from "../calculator.types";

export const calculatorTemplate: CalculatorDefinition = {
  id: "calculator-id",

  slug: "calculator-slug",

  name: "Calculator Name",

  shortName: "Short Name",

  description:
    "Calculator description.",

  category: "General",

  specialty: "General",

  featured: false,

  version: "1.0",

  updatedAt: "2026-07",

  keywords: [],

  formula: "",

  normalRange: "",

  referenceRanges: [],

  clinicalNotes: "",

  references: [],

  inputs: [],

  calculate(values) {
    return {
      value: "",
      interpretation: "",
      status: "normal",
    };
  },
};