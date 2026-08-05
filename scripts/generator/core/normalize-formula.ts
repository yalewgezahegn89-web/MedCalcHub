import type { FormulaDefinition } from "../../types";

export function normalizeFormula(
  formula: FormulaDefinition
) {
  if (typeof formula === "string") {
    return {
      type: "algebraic" as const,
      expression: formula,
    };
  }

  return formula;
}