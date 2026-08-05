import type {
  CalculatorInputDefinition,
  ClassificationRule,
  FormulaDefinition,
} from "../../types";

import {
  buildFormula,
} from "./formula/dispatcher";


export function buildCalculate(
  formula: FormulaDefinition,
  inputs: CalculatorInputDefinition[],
  options?: {
    name?: string;
    category?: string;
    classification?: readonly ClassificationRule[];
  },
): string {

  return buildFormula(formula, {
    inputs,
    name: options?.name,
    category: options?.category,
    classification: options?.classification,
  });

}
