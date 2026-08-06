import type {
  FormulaContext,
} from "./build-algebraic";

/**
 * Build a calculate() function body for a descriptive
 * formula type.
 *
 * Descriptive formulas do not have a machine-executable
 * expression. This builder emits a calculate() that
 * throws at runtime, preventing invalid code generation
 * while allowing the generator to compile cleanly.
 *
 * @returns TypeScript source code for the calculate()
 *   function that throws a descriptive error.
 */
export function buildDescriptiveFormula(
  _context: FormulaContext,
): string {
  return `
calculate(
  values: Record<string, string>,
) {
  throw new Error(
    "Descriptive formulas require a custom implementation.",
  );
},
`;
}