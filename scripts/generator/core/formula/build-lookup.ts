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
 * A single entry in a lookup table.
 *
 * Range-based entries match when:
 *   (min is undefined OR lookupValue >= min)
 *   AND (max is undefined OR lookupValue <= max)
 *
 * The first matching entry sets the result value.
 */
export interface LookupTableEntry {
  min?: number;
  max?: number;
  value: number;
  label?: string;
  status?:
    | "normal"
    | "low"
    | "high"
    | "critical";
}

/**
 * Configuration for a lookup formula.
 *
 * Supports two modes:
 * - table: inline lookup table evaluated at runtime
 * - source: external data source reference (reserved
 *   for future use)
 */
export interface LookupConfig {
  /**
   * Inline lookup table. Each entry maps a numeric range
   * to a result value.
   */
  table?: LookupTableEntry[];

  /**
   * External data source identifier. Used for future
   * integration with API or database lookups.
   * When provided without a table, generates a placeholder
   * that throws at runtime.
   */
  source?: string;

  /**
   * The input ID to use as the lookup key.
   * Defaults to the first input if not specified.
   */
  inputKey?: string;
}

/**
 * Build a calculate() function body for a lookup-based
 * formula.
 *
 * Lookup formulas evaluate the input against a reference
 * table of ranges and return the matching result value.
 *
 * Supported config options:
 * - table: inline array of LookupTableEntry objects
 * - source: external data source reference (placeholder)
 * - inputKey: which input to use as the lookup key
 *
 * @returns TypeScript source code for the calculate()
 *   function, matching the CalculatorResult shape.
 */
export function buildLookupFormula(
  formula: NormalizedFormula,
  context: FormulaContext,
): string {

  const config: LookupConfig =
    (formula.config as unknown as LookupConfig) ?? {};

  const table = config.table ?? [];

  const inputKey =
    config.inputKey ??
    context.inputs[0]?.id?.replaceAll("-", "_") ??
    "";

  const declarations =
    buildVariableMap(context.inputs);

  // ── Build lookup result computation ──────────────
  let lookupCode: string;

  if (table.length > 0) {
    const entryLines = table.map((entry, i) => {
      const conditions: string[] = [];

      if (entry.min !== undefined) {
        conditions.push(
          `lookupValue >= ${entry.min}`,
        );
      }

      if (entry.max !== undefined) {
        conditions.push(
          `lookupValue <= ${entry.max}`,
        );
      }

      const val = entry.value;

      if (i === 0) {
        return `if (${conditions.join(" && ")}) { lookupResult = ${val}; }`;
      }
      return `else if (${conditions.join(" && ")}) { lookupResult = ${val}; }`;
    });

    lookupCode = `
  const lookupValue = ${inputKey};
  let lookupResult = 0;
  ${entryLines.join("\n  ")}
  const result = lookupResult;
`;
  } else if (config.source) {
    // Source-based lookup: placeholder that indicates
    // the external data source has not been integrated
    lookupCode = `
  throw new Error(
    "Lookup source \\"${config.source}\\" is not yet implemented.",
  );
`;
  } else {
    // Fallback: return the raw input value
    lookupCode = `
  const result = ${inputKey};
`;
  }

  // ── Assemble full calculate() function ───────────
  return `
calculate(
  values: Record<string, string>,
) {

${buildValidation(context.inputs)}


${declarations}

${lookupCode}

  
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