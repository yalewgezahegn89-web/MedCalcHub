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

  // squared
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)Â²/g,
      "($1 * $1)",
    );


  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)²/g,
      "($1 * $1)",
    );


  // cubed
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)Â³/g,
      "($1 * $1 * $1)",
    );


  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)³/g,
      "($1 * $1 * $1)",
    );


  // ^2
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)\^2/g,
      "($1 * $1)",
    );


  // ^3
  expression =
    expression.replace(
      /([A-Za-z_][A-Za-z0-9_]*)\^3/g,
      "($1 * $1 * $1)",
    );


  return expression;
}



function normalizeRoots(
  expression: string,
): string {

  return expression.replace(
    /√\((.*?)\)/g,
    "Math.sqrt($1)",
  );
}



export function parseFormula(
  formula: string,
): ParsedFormula {

  let expression =
    formula;


  // Remove formula name
  if (
    expression.includes("=")
  ) {

    expression =
      expression
        .split("=")[1]
        .trim();

  }


  expression =
    normalizeEncoding(
      expression,
    );


  expression =
    expression
      .replaceAll("×", "*")
      .replaceAll("÷", "/");


  expression =
    normalizePowers(
      expression,
    );


  expression =
    normalizeRoots(
      expression,
    );


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