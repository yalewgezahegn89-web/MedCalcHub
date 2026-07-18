import type { CalculatorDefinition } from "./calculator.types";

export const calculatorRegistry: CalculatorDefinition[] = [];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === id);
}
