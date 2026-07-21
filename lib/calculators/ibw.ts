import type { CalculatorDefinition } from "./calculator.types";

export const ibwCalculator: CalculatorDefinition = {
  id: "ibw",

  slug: "ideal-body-weight",

  name: "Ideal Body Weight",

  shortName: "IBW",

  description: "Calculates Ideal Body Weight using the Devine formula.",

  category: "General",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: ["IBW", "Ideal Body Weight", "Devine", "Height", "Weight"],

  warnings: [
    "Ideal body weight is an estimate and should be interpreted within the clinical context.",
  ],

  inputs: [
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
  id: "height",
  label: "Height",
  type: "number",
  placeholder: "Enter height",
      unit: "cm",
      required: true,
      min: 100,
      max: 250,
      step: 0.1,
    },
  ],

  calculate(values) {
    const sex = values.sex;
    const heightCm = parseFloat(values.height);

    const inches = heightCm / 2.54;
    let ibw: number;

    if (sex === "male") {
      ibw = 50 + 2.3 * (inches - 60);
    } else {
      ibw = 45.5 + 2.3 * (inches - 60);
    }

    const rounded = Math.max(0, Math.round(ibw * 10) / 10);

    return {
      value: rounded,
      unit: "kg",
      interpretation:
  "Estimated ideal body weight using the Devine formula.",
      status: "normal",
    };
  },
};
