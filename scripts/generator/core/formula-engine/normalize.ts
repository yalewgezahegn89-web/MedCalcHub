/**
 * Normalizes medical formulas into a consistent format
 * before parsing them into executable TypeScript.
 */

export function normalizeFormula(
  formula: string,
): string {

  let expression = formula;

  // Remove everything before "="
  if (expression.includes("=")) {
    expression =
      expression.split("=")[1].trim();
  }

  // Multiplication
  expression = expression
    .replaceAll("×", "*")
    .replaceAll("✕", "*")
    .replaceAll("x", "*");

  // Division
  expression = expression
    .replaceAll("÷", "/");

  // Minus
  expression = expression
    .replaceAll("−", "-")
    .replaceAll("–", "-")
    .replaceAll("—", "-");

  // Powers
  expression = expression
    .replaceAll("²", "^2")
    .replaceAll("³", "^3");

  // Square root symbol
  expression = expression
    .replaceAll("√", "sqrt");

  // Remove repeated spaces
  expression = expression
    .replace(/\s+/g, " ")
    .trim();

  return expression;
}