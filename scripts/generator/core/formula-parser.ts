import { translateFunctions } from "./function-translator";
export interface ParsedFormula {
  variables: string[];
  expression: string;
}

function normalizeEncoding(
  expression: string,
): string {
  return expression
    .replaceAll("Ã—", "×")
    .replaceAll("Ãƒâ€”", "×")
    .replaceAll("Ã·", "÷")
    .replaceAll("ÃƒÂ·", "÷")
    .replaceAll("âˆš", "√")
    .replaceAll("âˆ’", "-")
    .replaceAll("â€“", "-");
}

function normalizePowers(
  expression: string,
): string {

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)Â²/g,
    "($1 * $1)",
  );

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)²/g,
    "($1 * $1)",
  );

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)Â³/g,
    "($1 * $1 * $1)",
  );

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)³/g,
    "($1 * $1 * $1)",
  );

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)\^2/g,
    "($1 * $1)",
  );

  expression = expression.replace(
    /([A-Za-z_][A-Za-z0-9_]*)\^3/g,
    "($1 * $1 * $1)",
  );

  return expression;
}

export function parseFormula(
  formula: string,
): ParsedFormula {

  let expression = formula;

  // Remove everything before "="
  if (expression.includes("=")) {
    expression =
      expression.split("=")[1].trim();
  }

  expression =
    normalizeEncoding(expression);

  expression = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("√", "sqrt");

  expression =
    normalizePowers(expression);

  expression =
    expression.replace(/\s+/g, " ").trim();

  // Translate functions
  expression =
    translateFunctions(expression);

  const matches =
    expression.match(
      /[A-Za-z_][A-Za-z0-9_]*/g,
    ) ?? [];

  const variables =
    [...new Set(matches)]
      .map((v) => v.toLowerCase());

  return {
    variables,
    expression,
  };
}