import type {
  CalculatorInputDefinition,
} from "../../../types";

import type {
  FormulaContext,
} from "./build-algebraic";

import {
  buildValidation,
} from "../build-validation";
import {
  buildVariableMap,
} from "../build-variable-map";
import {
  buildInterpretation,
} from "../interpreter/build-interpretation";

/**
 * Build a calculate() function body for a score-based
 * calculator.
 *
 * Score calculators sum all numeric inputs to produce
 * a single integer score. Each input contributes its
 * numeric value directly to the total.
 *
 * @returns TypeScript source code for the calculate()
 *   function, matching the CalculatorResult shape.
 */
export function buildScoreFormula(
  context: FormulaContext,
): string {
  const declarations = buildVariableMap(context.inputs);

  // Filter to numeric-only inputs (exclude "text" and
  // "select" types since scores only sum numbers)
  const numericInputs = context.inputs.filter(
    (input) => input.type === "number",
  );

  // Build the score accumulation lines
  const scoreLines = numericInputs
    .map((input) => {
      const variableName = input.id.replaceAll("-", "_");
      return `  score += ${variableName};`;
    })
    .join("\n");

  return `
calculate(
  values: Record<string, string>,
) {

${buildValidation(context.inputs)}


${declarations}


  let score = 0;
${scoreLines}


  const result = score;


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