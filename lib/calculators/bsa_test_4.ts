import type { CalculatorDefinition } from "./calculator.types";

export const bsaTest4Calculator: CalculatorDefinition = {
  id: "bsa-test-4",

  slug: "bsa-test-4",

  name: "Body Surface Area",

  shortName: "BSA",

  description:
    "Calculates Body Surface Area using the Mosteller formula.",

  category: "Anthropometry",

  featured: false,

  formula:
    "BSA = √((Height(cm) × Weight(kg)) / 3600)",

  normalRange:
    "Typical adult BSA: 1.4–2.2 m²",

  keywords: [
    "BSA",
    "Body Surface Area",
    "Mosteller",
    "height",
    "weight",
  ],

  inputs: [
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      max: 300,
      step: 0.1,
    },

    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 1,
      max: 500,
      step: 0.1,
    },
  ],

  calculate(values) {
    const height = Number(values.height);
    const weight = Number(values.weight);

    const bsa = Math.sqrt(
      (height * weight) / 3600,
    );

    const rounded =
      Math.round(bsa * 100) / 100;

    return {
      value: rounded,
      unit: "m²",
      interpretation:
        "Calculated Body Surface Area",
      status: "normal",
    };
  },
};