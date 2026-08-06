import type { CalculatorInputDefinition } from "../../types";

import {
  medicalAliases,
} from "./medical-aliases";

/**
 * Build variable declarations for the calculate()
 * function.
 *
 * For each input:
 * - generates a `const variable = Number(values.variable)`
 *   declaration
 * - applies unit conversion if defined
 * - generates additional alias declarations for any
 *   medical aliases that map to this input ID
 *
 * Aliases never overwrite exact input ID declarations;
 * they only create extra bindings so that expression
 * variables like "Target Na" resolve to the correct
 * input.
 */
export function buildVariableMap(
  inputs: readonly CalculatorInputDefinition[],
): string {
  const declarations: string[] = [];

  // Build a reverse map: input ID → list of alias
  // variable names that resolve to it
  const aliasByTarget: Record<string, string[]> = {};
  for (const [alias, targetId] of Object.entries(medicalAliases)) {
    const normalizedTarget = targetId.replaceAll("-", "_");
    if (!aliasByTarget[normalizedTarget]) {
      aliasByTarget[normalizedTarget] = [];
    }
    aliasByTarget[normalizedTarget].push(alias);
  }

  for (const input of inputs) {
    const variable = input.id.replaceAll("-", "_");

    let conversion = "";

    if (input.conversion) {
      if (input.conversion.type === "divide") {
        conversion = ` / ${input.conversion.factor}`;
      }

      if (input.conversion.type === "multiply") {
        conversion = ` * ${input.conversion.factor}`;
      }
    }

    // Primary declaration from input ID
    declarations.push(
      `const ${variable} = Number(values.${variable})${conversion};`,
    );

    // Alias declarations: for each alias that maps to
    // this input ID, generate an alias variable.
    // Alias names are converted to valid camelCase
    // identifiers (e.g. "Target Na" → "targetNa")
    const aliases = aliasByTarget[variable] ?? [];
    for (const alias of aliases) {
      // Convert alias to a valid camelCase identifier:
      // split on whitespace, lowercase first word,
      // capitalize subsequent words, join
      const aliasVar = alias
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 0)
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() +
              w.slice(1).toLowerCase(),
        )
        .join("");

      // Skip if the alias variable is the same as the
      // input variable (no duplication)
      if (!aliasVar || aliasVar === variable) continue;

      // Skip if alias matches the input variable
      // exactly (e.g. "SBP" → "sbp" when input is sbp)
      if (aliasVar === input.id) continue;

      declarations.push(
        `const ${aliasVar} = ${variable};`,
      );
    }
  }

  return declarations.join("\n");
}
