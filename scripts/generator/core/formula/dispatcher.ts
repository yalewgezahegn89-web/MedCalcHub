import type {
  FormulaDefinition,
} from "../../../types";

import type {
  FormulaContext,
} from "./build-algebraic";

import {
  normalizeFormula,
} from "../normalize-formula";

import {
  buildAlgebraicFormula,
} from "./build-algebraic";

export function buildFormula(
  formula: FormulaDefinition,
  context: FormulaContext,
): string {

  const normalized =
    normalizeFormula(formula);

  switch (normalized.type) {

    case "algebraic":
      return buildAlgebraicFormula(
        normalized as { type: "algebraic"; expression?: string },
        context,
      );

    case "conditional":
      throw new Error(
        "Conditional formulas not implemented yet.",
      );

    case "lookup":
      throw new Error(
        "Lookup formulas not implemented yet.",
      );

    case "composite":
      throw new Error(
        "Composite formulas not implemented yet.",
      );

    case "descriptive":
      throw new Error(
        "Descriptive formulas not implemented yet.",
      );

    default:
      throw new Error(
        "Unknown formula type.",
      );
  }
}