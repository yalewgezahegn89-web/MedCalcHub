import type {
  FormulaContext,
} from "./build-algebraic";

/**
 * Build a calculate() function body for a composite
 * formula type.
 *
 * Composite formulas use a staged calculation model
 * where multiple intermediate steps are evaluated
 * before producing a final result. Full step execution
 * is not yet implemented — this builder emits a
 * calculate() that throws at runtime, creating the
 * architectural pathway without incorrect code generation.
 *
 * @returns TypeScript source code for the calculate()
 *   function that throws a descriptive error.
 */
export function buildCompositeFormula(
  _context: FormulaContext,
): string {
  return `
calculate(
  values: Record<string, string>,
) {
  throw new Error(
    "Composite formulas require custom staged implementation.",
  );
},
`;
}