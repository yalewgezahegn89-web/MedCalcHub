export interface ParsedFormula {
  variables: string[];
  expression: string;
}


function normalizePowers(
  expression: string,
): string {

  // variable²
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)²/g,
      "($1 * $1)",
    );


  // variable³
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)³/g,
      "($1 * $1 * $1)",
    );


  // variable^2
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)\^2/g,
      "($1 * $1)",
    );


  // variable^3
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)\^3/g,
      "($1 * $1 * $1)",
    );


  return expression;
}


export function parseFormula(
  formula: string,
): ParsedFormula {

  let expression =
    formula;


  // Remove everything before =
  if (
    expression.includes("=")
  ) {
    expression =
      expression
        .split("=")[1]
        .trim();
  }


  // Normalize operators
  expression =
    expression
      .replaceAll("×", "*")
      .replaceAll("Ã—", "*")
      .replaceAll("÷", "/")
      .replaceAll("Ã·", "/")
      .replaceAll("−", "-")
      .replaceAll("–", "-");


  // Normalize powers
  expression =
    normalizePowers(
      expression,
    );


  // Remove extra spaces
  expression =
    expression.replace(
      /\s+/g,
      " ",
    );


  const matches =
    expression.match(
      /[A-Za-z_][A-Za-z0-9_]*/g,
    ) ?? [];


  const variables =
    [
      ...new Set(matches),
    ]
      .map(
        (v) =>
          v.toLowerCase(),
      );


  return {
    variables,
    expression,
  };
}