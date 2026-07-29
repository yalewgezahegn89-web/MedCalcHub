import type { CalculatorInputDefinition } from "../../types";

const presets: Record<
  string,
  CalculatorInputDefinition[]
> = {
  bmi: [
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
    },
  ],

  bsa: [
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
    },
  ],
};

export function suggestInputs(
  calculatorName: string,
): CalculatorInputDefinition[] {

  const key = calculatorName
    .toLowerCase()
    .replace(" calculator", "")
    .trim();

  return presets[key] ?? [];
}