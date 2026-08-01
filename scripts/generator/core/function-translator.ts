export function translateFunctions(
  expression: string,
): string {

  return expression

    // Square root
    .replace(
      /\bsqrt\s*\(/gi,
      "Math.sqrt(",
    )

    // Powers
    .replace(
      /\bpow\s*\(/gi,
      "Math.pow(",
    )

    // Min / Max
    .replace(
      /\bmin\s*\(/gi,
      "Math.min(",
    )

    .replace(
      /\bmax\s*\(/gi,
      "Math.max(",
    )

    // Absolute value
    .replace(
      /\babs\s*\(/gi,
      "Math.abs(",
    )

    // Logarithm
    .replace(
      /\blog\s*\(/gi,
      "Math.log(",
    )

    // Exponential
    .replace(
      /\bexp\s*\(/gi,
      "Math.exp(",
    )

    // Trigonometry
    .replace(
      /\bsin\s*\(/gi,
      "Math.sin(",
    )

    .replace(
      /\bcos\s*\(/gi,
      "Math.cos(",
    )

    .replace(
      /\btan\s*\(/gi,
      "Math.tan(",
    );
}