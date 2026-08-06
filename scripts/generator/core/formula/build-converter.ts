import type {
  FormulaContext,
} from "./build-algebraic";

import type {
  NormalizedFormula,
} from "../normalize-formula";

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
 * Configuration for a converter formula.
 *
 * Converts a numeric input between units using
 * predefined conversion expressions.
 */
export interface ConverterConfig {
  /**
   * The input ID whose value is being converted.
   */
  inputKey: string;

  /**
   * The input ID of the unit selector whose string
   * value determines which conversion branch to use.
   */
  outputUnitKey: string;

  /**
   * Map from unit key (matching the selector's option
   * value) to a JavaScript expression string applied
   * to the input value.
   *
   * Example:
   *   { "mmol": "value * 18", "mgdl": "value / 18" }
   */
  conversions: Record<string, string>;
}

/**
 * Build a calculate() function body for a converter
 * formula type.
 *
 * Converter formulas transform a numeric input value
 * between measurement units using a switch statement
 * keyed on the selected output unit.
 *
 * @returns TypeScript source code for the calculate()
 *   function, matching the CalculatorResult shape.
 */
export function buildConverterFormula(
  formula: NormalizedFormula,
  context: FormulaContext,
): string {

  const config: ConverterConfig =
    (formula.config as unknown as ConverterConfig) ?? {};

  const inputKey =
    config.inputKey?.replaceAll("-", "_") ?? "";

  const outputUnitKey =
    config.outputUnitKey?.replaceAll("-", "_") ?? "";

  const conversions = config.conversions ?? {};

  const declarations =
    buildVariableMap(context.inputs);

  // ── Build switch statement ───────────────────────
  const caseEntries = Object.entries(conversions);

  let switchCode: string;

  if (caseEntries.length > 0 && inputKey && outputUnitKey) {
    const caseLines = caseEntries.map(
      ([unit, expr]) => {
        // Replace "value" placeholder in expression
        // with the actual input variable
        const resolvedExpr = expr.replace(
          /\bvalue\b/g,
          inputKey,
        );
        return `    case ${JSON.stringify(unit)}:\n      result = ${resolvedExpr};\n      break;`;
      },
    );

    switchCode = `
  switch (values.${outputUnitKey}) {

${caseLines.join("\n\n")}

    default:
      result = ${inputKey};
  }
`;
  } else {
    // Fallback: return raw input
    switchCode = `
  result = ${inputKey || "0"};
`;
  }

  // ── Assemble full calculate() function ───────────
  return `
calculate(
  values: Record<string, string>,
) {

${buildValidation(context.inputs)}


${declarations}

  let result: number = 0;

  ${buildInterpretation({
    name: context.name ?? "",
    category: context.category ?? "",
    classification: context.classification ?? [],
  })}


${switchCode}


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