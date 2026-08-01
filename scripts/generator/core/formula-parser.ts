export interface ParsedFormula {
  variables: string[];
  expression: string;
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

  // Normalize symbols
  expression = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("^2", "*")
    .replaceAll("²", "*")
    .replace(/\s+/g, " ");

  // Find variables
  const matches =
    expression.match(/[A-Za-z]+/g) ?? [];

  const variables =
    [...new Set(matches)]
      .map(v => v.toLowerCase());

  return {
    variables,
    expression,
  };
}