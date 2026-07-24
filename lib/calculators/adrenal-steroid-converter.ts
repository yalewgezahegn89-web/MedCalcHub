import type { CalculatorDefinition } from "./calculator.types";
import { convertAdrenalSteroid } from "./utils/endocrinology";

export const adrenalSteroidConverterCalculator: CalculatorDefinition = {
  id: "adrenal-steroid-converter",

  slug: "adrenal-steroid-converter",

  name: "Adrenal Steroid Converter",

  shortName: "Steroid Conv",

  description: "Converts between common glucocorticoid doses.",

  category: "Endocrinology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "Equivalent dose = dose × potency ratio",

  normalRange: "Variable by clinical context",

  clinicalNotes:
    "This converter provides an approximate equivalence between hydrocortisone, prednisone, and dexamethasone.",

  references: [
    "Endocrinology references",
    "Glucocorticoid equivalence tables",
  ],

  warnings: [
    "Potency conversions are approximate and should not replace clinical judgment.",
  ],

  keywords: ["Adrenal Steroid Converter", "Prednisone", "Hydrocortisone", "Dexamethasone"],

  inputs: [
    {
      id: "dose",
      label: "Dose",
      type: "number",
      unit: "mg",
      required: true,
      min: 0.1,
      max: 200,
      step: 0.1,
    },
    {
      id: "from",
      label: "From",
      type: "select",
      required: true,
      options: [
        { label: "Hydrocortisone", value: "hydrocortisone" },
        { label: "Prednisone", value: "prednisone" },
        { label: "Dexamethasone", value: "dexamethasone" },
      ],
    },
    {
      id: "to",
      label: "To",
      type: "select",
      required: true,
      options: [
        { label: "Hydrocortisone", value: "hydrocortisone" },
        { label: "Prednisone", value: "prednisone" },
        { label: "Dexamethasone", value: "dexamethasone" },
      ],
    },
  ],

  calculate(values) {
    const dose = parseFloat(values.dose);

    const converted = convertAdrenalSteroid(dose, values.from, values.to);

    return {
      value: converted,
      unit: "mg",
      interpretation: "Equivalent steroid dose",
      status: "normal",
    };
  },
};
