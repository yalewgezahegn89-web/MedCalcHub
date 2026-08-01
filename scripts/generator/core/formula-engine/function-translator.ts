export function translateFunctions(
  expression: string,
): string {

  return expression

    .replace(/\bsqrt\s*\(/gi, "Math.sqrt(")

    .replace(/\bpow\s*\(/gi, "Math.pow(")

    .replace(/\bmin\s*\(/gi, "Math.min(")

    .replace(/\bmax\s*\(/gi, "Math.max(")

    .replace(/\babs\s*\(/gi, "Math.abs(")

    .replace(/\blog\s*\(/gi, "Math.log(")

    .replace(/\bexp\s*\(/gi, "Math.exp(")

    .replace(/\bsin\s*\(/gi, "Math.sin(")

    .replace(/\bcos\s*\(/gi, "Math.cos(")

    .replace(/\btan\s*\(/gi, "Math.tan(");
}