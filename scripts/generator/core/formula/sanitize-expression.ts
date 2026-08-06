/**
 * Centralized formula expression sanitizer.
 *
 * Normalizes Unicode mathematical symbols to their ASCII equivalents
 * so that all downstream parsing and code generation receives clean,
 * compiler-safe expressions.
 */

const UNICODE_REPLACEMENTS: Array<[RegExp, string]> = [
  // Minus variants → hyphen-minus
  [/\u2212/g, "-"], // − MINUS SIGN
  [/\u2013/g, "-"], // – EN DASH
  [/\u2014/g, "-"], // — EM DASH

  // Multiplication variants → asterisk
  [/\u00D7/g, "*"], // × MULTIPLICATION SIGN
  [/\u22C5/g, "*"], // ⋅ DOT OPERATOR
  [/\u00B7/g, "*"], // · MIDDLE DOT

  // Division → slash
  [/\u00F7/g, "/"], // ÷ DIVISION SIGN

  // Comparison operators
  [/\u2265/g, ">="], // ≥ GREATER-THAN OR EQUAL TO
  [/\u2264/g, "<="], // ≤ LESS-THAN OR EQUAL TO
  [/\u2260/g, "!="], // ≠ NOT EQUAL TO

  // Square root (not an operator replacement, but normalize encoding)
  [/\u221A/g, "sqrt"], // √ SQUARE ROOT

  // Unicode subscript digits → ASCII digits
  [/\u2080/g, "0"], // ₀ SUBSCRIPT ZERO
  [/\u2081/g, "1"], // ₁ SUBSCRIPT ONE
  [/\u2082/g, "2"], // ₂ SUBSCRIPT TWO
  [/\u2083/g, "3"], // ₃ SUBSCRIPT THREE
  [/\u2084/g, "4"], // ₄ SUBSCRIPT FOUR
  [/\u2085/g, "5"], // ₅ SUBSCRIPT FIVE
  [/\u2086/g, "6"], // ₆ SUBSCRIPT SIX
  [/\u2087/g, "7"], // ₇ SUBSCRIPT SEVEN
  [/\u2088/g, "8"], // ₈ SUBSCRIPT EIGHT
  [/\u2089/g, "9"], // ₉ SUBSCRIPT NINE

  // Unicode superscript digits → ASCII digits
  [/\u00B2/g, "2"], // ² SUPERSCRIPT TWO
  [/\u00B3/g, "3"], // ³ SUPERSCRIPT THREE

  // Additional superscript handling from formula-parser patterns
  [/\u00B9/g, "1"], // ¹ SUPERSCRIPT ONE
];

const UNICODE_WHITESPACE: RegExp = /[\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u202F\u205F\u3000]/g;

/**
 * Sanitize a formula expression by replacing Unicode mathematical
 * operators with their ASCII equivalents and normalizing whitespace.
 *
 * This must be called BEFORE parseFormula() to ensure the parser
 * and code generator receive only ASCII-safe tokens.
 */
export function sanitizeExpression(
  expression: string,
): string {
  let result = expression;

  // Replace Unicode mathematical symbols
  for (const [pattern, replacement] of UNICODE_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  // Normalize Unicode whitespace to regular space
  result = result.replace(UNICODE_WHITESPACE, " ");

  // Collapse repeated spaces
  result = result.replace(/ {2,}/g, " ");

  // Trim
  result = result.trim();

  return result;
}