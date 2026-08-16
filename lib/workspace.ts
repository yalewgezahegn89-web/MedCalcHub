import { calculatorRegistry } from "@/lib/calculators/registry";
import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

export function resolveWorkspaceCalculators(
  ids: string[],
): CalculatorDefinition[] {
  return ids
    .map((id) =>
      calculatorRegistry.find((calc) => calc.id === id),
    )
    .filter(
      (calc): calc is CalculatorDefinition =>
        calc !== undefined,
    );
}
