import type {
  CalculatorInputDefinition,
  ClassificationRule,
} from "../../../types";

import {
  parseFormula,
} from "../formula-parser";

import {
  buildInterpretation,
} from "../interpreter/build-interpretation";
import {
  buildValidation,
} from "../build-validation";
import {
  buildVariableMap,
} from "../build-variable-map";

export interface AlgebraicFormula {
  type: "algebraic";
  expression?: string;
}

export interface FormulaContext {
  inputs: readonly CalculatorInputDefinition[];
  name?: string;
  category?: string;
  classification?: readonly ClassificationRule[];
}

export function buildAlgebraicFormula(
  formula: AlgebraicFormula,
  context: FormulaContext,
): string {

  const sourceExpression = formula.expression ?? "";

  const parsed = parseFormula(sourceExpression);

  const declarations = buildVariableMap(context.inputs);

  const expression = parsed.expression;

  return `
calculate(
  values: Record<string, string>,
) {

${buildValidation(context.inputs)}


${declarations}


  const result =
    ${expression};


  ${buildInterpretation({
    name: context.name ?? "",
    category: context.category ?? "",
    classification: context.classification ?? [],
  })}



return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},
`;
}