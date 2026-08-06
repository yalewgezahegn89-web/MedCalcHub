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
 * A single condition entry in a conditional formula.
 *
 * The `when` field is a JavaScript expression string
 * evaluated at runtime. The last condition in the list
 * may use `"true"` as a catch-all.
 */
export interface ConditionalEntry {
  /**
   * JavaScript condition expression, e.g. "score >= 7".
   * The final entry may be the literal string "true"
   * to act as an else clause.
   */
  when: string;

  /**
   * Result value. If numeric, assigned to `result`.
   * If string, assigned to `interpretation` with
   * `result` set to 0.
   */
  value: number | string;

  /**
   * Optional status override for this condition branch.
   */
  status?:
    | "normal"
    | "low"
    | "high"
    | "critical";
}

/**
 * Configuration for a conditional formula.
 */
export interface ConditionalConfig {
  /**
   * Ordered list of conditions evaluated top-to-bottom.
   * First match wins. Use `"true"` as the final catch-all.
   */
  conditions: ConditionalEntry[];
}

/**
 * Build a calculate() function body for a conditional
 * formula type.
 *
 * Conditional formulas evaluate a chain of if / else-if
 * / else branches, each assigning a result value and
 * optional status based on runtime variable values.
 *
 * @returns TypeScript source code for the calculate()
 *   function, matching the CalculatorResult shape.
 */
export function buildConditionalFormula(
  formula: NormalizedFormula,
  context: FormulaContext,
): string {

  const config: ConditionalConfig =
    (formula.config as unknown as ConditionalConfig) ?? {};

  const conditions = config.conditions ?? [];

  const declarations =
    buildVariableMap(context.inputs);

  // ── Build conditional chain ──────────────────────
  let conditionalCode: string;

  if (conditions.length > 0) {
    const branchLines = conditions.map((cond, i) => {
      const isLast = i === conditions.length - 1;
      const isCatchAll =
        cond.when.trim() === "true";

      const valueAssign =
        typeof cond.value === "number"
          ? `result = ${cond.value};`
          : `interpretation = ${JSON.stringify(cond.value)};\n    result = 0;`;

      const statusAssign =
        cond.status
          ? `status = ${JSON.stringify(cond.status)};`
          : "";

      const body = [
        valueAssign,
        statusAssign,
      ]
        .filter(Boolean)
        .join("\n    ");

      if (isCatchAll) {
        return `else {\n    ${body}\n  }`;
      }

      if (i === 0) {
        return `if (${cond.when}) {\n    ${body}\n  }`;
      }
      return `else if (${cond.when}) {\n    ${body}\n  }`;
    });

    conditionalCode = `
  ${branchLines.join("\n  ")}
`;
  } else {
    // No conditions defined: return raw first input
    const firstInput =
      context.inputs[0]?.id?.replaceAll(
        "-",
        "_",
      ) ?? "";
    conditionalCode = `
  result = ${firstInput};
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


${conditionalCode}


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