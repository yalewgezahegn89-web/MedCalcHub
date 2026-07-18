import type { CalculatorDefinition } from "./calculator.types";
import { bmiCalculator } from "./bmi";

export const calculatorRegistry: CalculatorDefinition[] = [bmiCalculator];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === id);
}
