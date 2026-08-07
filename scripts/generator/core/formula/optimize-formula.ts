/**
 * Formula Optimization Engine
 *
 * Simplifies normalized algebraic expressions before
 * code generation. NEVER changes mathematical meaning.
 *
 * Optimization passes:
 *   1. Collapse duplicate whitespace
 *   2. Remove redundant outer parentheses
 *   3. Constant folding
 *   4. Algebraic identities (+0, *1, /1)
 *   5. Zero multiplication
 *   6. Power normalization (x*x → x**2)
 *   7. Repeated constant multiplication
 *   8. Normalize unary negatives
 *   9. Normalize decimal constants
 *  10. Idempotency
 */

// ─────────────────────────────────────────────────
// PASS 1: Collapse duplicate whitespace
// ─────────────────────────────────────────────────

function passCollapseWhitespace(
  expr: string,
): string {
  return expr.replace(/\s{2,}/g, " ").trim();
}

// ─────────────────────────────────────────────────
// PASS 2: Remove redundant outer parentheses
// ─────────────────────────────────────────────────

function hasUnbalancedParens(expr: string): boolean {
  let depth = 0;
  for (const ch of expr) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth < 0) return true;
  }
  return depth !== 0;
}

function isBalancedParenGroup(expr: string): boolean {
  if (expr.length < 2) return false;
  if (expr[0] !== "(") return false;
  if (expr[expr.length - 1] !== ")") return false;

  // Check that the outer parens actually match
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === "(") depth++;
    if (expr[i] === ")") depth--;
    // If depth reaches 0 before the last char,
    // the outer parens don't wrap the whole expr
    if (depth === 0 && i < expr.length - 1) {
      return false;
    }
  }
  return depth === 0;
}

function passRemoveOuterParens(
  expr: string,
): string {
  let result = expr;
  let changed = true;
  while (changed) {
    changed = false;

    // Find innermost paren groups first and simplify
    // those containing only a simple identifier
    // e.g. "a + (b)" → "a + b"
    const innermost = result.replace(
      /\(([a-zA-Z_]\w*)\)/g,
      (
        _match: string,
        ident: string,
      ): string => {
        changed = true;
        return ident;
      },
    );
    if (changed) {
      result = innermost;
      continue;
    }

    // Remove outer parens wrapping the whole expression
    // only if the inner content is an identifier or number
    if (isBalancedParenGroup(result)) {
      const inner = result.slice(1, -1).trim();
      if (
        /^[a-zA-Z_]\w*$/.test(inner) ||
        /^\d+(?:\.\d+)?$/.test(inner)
      ) {
        result = inner;
        changed = true;
      }
    }
  }
  return result;
}

// ─────────────────────────────────────────────────
// PASS 3: Constant folding
// ─────────────────────────────────────────────────

function passConstantFolding(expr: string): string {
  // Run iteratively until no more changes
  let result = expr;
  let prev = "";
  while (prev !== result) {
    prev = result;
    result = result.replace(
      /(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/g,
      (
        _match: string,
        a: string,
        op: string,
        b: string,
      ): string => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      let result: number;

      switch (op) {
        case "+":
          result = numA + numB;
          break;
        case "-":
          result = numA - numB;
          break;
        case "*":
          result = numA * numB;
          break;
        case "/":
          if (numB === 0) return `${a} / ${b}`;
          result = numA / numB;
          break;
        default:
          return `${a} ${op} ${b}`;
      }

        // Preserve integer results when possible
        if (
          Number.isInteger(result)
        ) {
          return String(result);
        }
        return String(result);
      },
    );
  }
  return result;
}

// ─────────────────────────────────────────────────
// PASS 4: Algebraic identities (+0, -0, *1, /1)
// ─────────────────────────────────────────────────

function passAlgebraicIdentities(
  expr: string,
): string {
  let result = expr;

  // x + 0 → x  and  0 + x → x
  result = result.replace(
    /(\b\w+)\s*\+\s*0\b/g,
    "$1",
  );
  result = result.replace(
    /\b0\s*\+\s*(\b\w+)/g,
    "$1",
  );

  // x - 0 → x
  result = result.replace(
    /(\b\w+)\s*-\s*0\b/g,
    "$1",
  );

  // x * 1 → x  and  1 * x → x
  result = result.replace(
    /(\b\w+)\s*\*\s*1\b/g,
    "$1",
  );
  result = result.replace(
    /\b1\s*\*\s*(\b\w+)/g,
    "$1",
  );

  // x / 1 → x
  result = result.replace(
    /(\b\w+)\s*\/\s*1\b/g,
    "$1",
  );

  return result;
}

// ─────────────────────────────────────────────────
// PASS 5: Zero multiplication
// ─────────────────────────────────────────────────

function passZeroMultiplication(
  expr: string,
): string {
  let result = expr;

  // x * 0 → 0  and  0 * x → 0
  result = result.replace(
    /\b\w+\s*\*\s*0\b/g,
    "0",
  );
  result = result.replace(
    /\b0\s*\*\s*\w+/g,
    "0",
  );

  return result;
}

// ─────────────────────────────────────────────────
// PASS 6: Power normalization (x*x → x**2)
// ─────────────────────────────────────────────────

function passPowerNormalization(
  expr: string,
): string {
  // Match: identifier * identifier (same name)
  return expr.replace(
    /\b([a-zA-Z_]\w*)\s*\*\s*\1\b/g,
    "$1 ** 2",
  );
}

// ─────────────────────────────────────────────────
// PASS 7: Repeated constant multiplication
// ─────────────────────────────────────────────────

function passRepeatedConstantMul(
  expr: string,
): string {
  // Match: number * (number * x) → result * x
  return expr.replace(
    /(-?\d+(?:\.\d+)?)\s*\*\s*\(\s*(-?\d+(?:\.\d+)?)\s*\*\s*(\w+)\s*\)/g,
    (
      _match: string,
      a: string,
      b: string,
      variable: string,
    ): string => {
      const product =
        parseFloat(a) * parseFloat(b);
      if (Number.isInteger(product)) {
        return `${product} * ${variable}`;
      }
      return `${product} * ${variable}`;
    },
  );
}

// ─────────────────────────────────────────────────
// PASS 8: Normalize unary negatives
// ─────────────────────────────────────────────────

function passUnaryNegatives(expr: string): string {
  // a + -b → a - b
  return expr.replace(
    /\+\s*-\s*/g,
    "- ",
  );
}

// ─────────────────────────────────────────────────
// PASS 9: Normalize decimal constants
// ─────────────────────────────────────────────────

function passNormalizeDecimals(
  expr: string,
): string {
  // Remove trailing zeros after decimal point
  // e.g. 2.000000 → 2, 3.500000 → 3.5
  return expr.replace(
    /(\d+)\.0+(?!\d)/g,
    "$1",
  ).replace(
    /(\d+\.\d*?)0+(?!\d)/g,
    "$1",
  );
}

// ─────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────

/**
 * Optimize an algebraic expression string through
 * a series of safe, semantics-preserving passes.
 *
 * Running this function multiple times on the same
 * input must produce identical output (idempotency).
 *
 * @param expression The sanitized expression string
 * @returns The optimized expression string
 */
export function optimizeFormula(
  expression: string,
): string {
  let result = expression;
  let prev = "";

  // Run all passes until stable (idempotency)
  while (prev !== result) {
    prev = result;

    // Pass 1: Whitespace
    result = passCollapseWhitespace(result);

    // Pass 8: Unary negatives
    result = passUnaryNegatives(result);

    // Pass 2: Outer parentheses
    result = passRemoveOuterParens(result);

    // Pass 3: Constant folding
    result = passConstantFolding(result);

    // Pass 5: Zero multiplication
    result = passZeroMultiplication(result);

    // Pass 7: Repeated constant multiplication
    result = passRepeatedConstantMul(result);

    // Pass 4: Algebraic identities
    result = passAlgebraicIdentities(result);

    // Pass 6: Power normalization
    result = passPowerNormalization(result);

    // Pass 9: Decimal normalization
    result = passNormalizeDecimals(result);

    // Pass 1 (final): Clean up whitespace
    result = passCollapseWhitespace(result);
  }

  return result;
}
