import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",
  name: "Body Mass Index",
  description: "Calculates Body Mass Index using height and weight.",
  category: "General",

  inputs: [
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
    },
  ],

  calculate(values) {
    const heightCm = parseFloat(values.height);
    const weight = parseFloat(values.weight);

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const rounded = Math.round(bmi * 10) / 10;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (rounded < 18.5) {
      interpretation = "Underweight";
      status = "low";
    } else if (rounded < 25) {
      interpretation = "Normal weight";
      status = "normal";
    } else if (rounded < 30) {
      interpretation = "Overweight";
      status = "high";
    } else {
      interpretation = "Obesity";
      status = "critical";
    }

    return {
      value: rounded,
      unit: "kg/m²",
      interpretation,
      status,
    };
  },
};
