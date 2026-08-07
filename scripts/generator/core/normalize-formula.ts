import type { FormulaDefinition, FormulaType } from "../../types";

/**
 * Normalized formula object used by all downstream
 * builders and the dispatcher.
 */
export interface NormalizedFormula {
  type: FormulaType;
  expression?: string;
  description?: string;
  config?: Record<string, unknown>;
}

/**
 * Normalize a FormulaDefinition into a consistent
 * NormalizedFormula object.
 *
 * - String formulas default to "algebraic" type
 * - Object formulas preserve the explicit type
 * - Unknown or missing types default to "algebraic"
 */
export function normalizeFormula(
  formula: FormulaDefinition,
): NormalizedFormula {
  if (typeof formula === "string") {
    return {
      type: "algebraic",
      expression: formula,
    };
  }

  return {
    type: formula.type ?? "algebraic",
    expression: formula.expression,
    description: formula.description,
    config: formula.config,
  };
}
