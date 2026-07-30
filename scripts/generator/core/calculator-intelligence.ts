import { calculatorKnowledge } from "../knowledge";

export interface CalculatorSuggestion {
  category?: string;
  specialty?: string;
  description?: string;
  formula?: string;
  normalRange?: string;
keywords?: readonly string[];  inputs?: readonly unknown[];
}

function normalizeKey(
  name: string,
): string {
  return name
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-")
    .trim();
}

export function suggestCalculator(
  calculatorName: string,
): Partial<CalculatorSuggestion> {
  const key = normalizeKey(calculatorName);

  return (
    calculatorKnowledge[key as keyof typeof calculatorKnowledge] ??
    {}
  );
}