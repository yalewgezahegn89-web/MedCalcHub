import type {
  CalculatorInputDefinition,
  FormulaDefinition,
  FormulaType,
  GeneratorOptions,
} from "../../types";

import { parseFormula } from "./formula-parser";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

/**
 * Severity of a validation finding.
 */
export type ValidationSeverity =
  | "error"
  | "warning";

/**
 * A single validation finding (error or warning).
 */
export interface ValidationFinding {
  severity: ValidationSeverity;
  code: string;
  message: string;
  path?: string;
}

/**
 * Structured validation result returned by
 * validateCalculator().
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationFinding[];
  warnings: ValidationFinding[];
}

// ─────────────────────────────────────────────────
// Error / warning codes
// ─────────────────────────────────────────────────

const CODES = {
  // Errors
  UNKNOWN_VARIABLE:
    "UNKNOWN_VARIABLE",
  MISSING_INPUT:
    "MISSING_INPUT",
  UNUSED_INPUT:
    "UNUSED_INPUT",
  DUPLICATE_INPUT_ID:
    "DUPLICATE_INPUT_ID",
  INVALID_FORMULA_TYPE:
    "INVALID_FORMULA_TYPE",
  MISSING_CONFIG:
    "MISSING_CONFIG",
  INVALID_CONDITIONS:
    "INVALID_CONDITIONS",
  INVALID_LOOKUP_TABLE:
    "INVALID_LOOKUP_TABLE",
  EMPTY_CONVERTER:
    "EMPTY_CONVERTER",
  INVALID_CONFIG_FIELD:
    "INVALID_CONFIG_FIELD",
  NO_INPUTS:
    "NO_INPUTS",
  NO_FORMULA:
    "NO_FORMULA",
} as const;

// ─────────────────────────────────────────────────
// Valid formula types
// ─────────────────────────────────────────────────

const VALID_FORMULA_TYPES: FormulaType[] = [
  "algebraic",
  "score",
  "descriptive",
  "lookup",
  "conditional",
  "converter",
  "composite",
];

// ─────────────────────────────────────────────────
// JavaScript reserved words that cannot be input IDs
// ─────────────────────────────────────────────────

const JS_RESERVED = new Set([
  "break",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "in",
  "instanceof",
  "new",
  "return",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "class",
  "const",
  "enum",
  "export",
  "extends",
  "import",
  "super",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity",
  "values",
  "result",
  "status",
  "interpretation",
  "referenceRange",
  "score",
]);

// ─────────────────────────────────────────────────
// Built-in JS globals and Math members
// ─────────────────────────────────────────────────

const JS_BUILTINS = new Set([
  "Math",
  "Number",
  "String",
  "Boolean",
  "Array",
  "Object",
  "Date",
  "RegExp",
  "parseInt",
  "parseFloat",
  "isNaN",
  "isFinite",
  "abs",
  "ceil",
  "floor",
  "round",
  "max",
  "min",
  "sqrt",
  "pow",
  "log",
  "exp",
  "sin",
  "cos",
  "tan",
  "PI",
  "E",
]);

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function error(
  code: string,
  message: string,
  path?: string,
): ValidationFinding {
  return {
    severity: "error",
    code,
    message,
    path,
  };
}

function warning(
  code: string,
  message: string,
  path?: string,
): ValidationFinding {
  return {
    severity: "warning",
    code,
    message,
    path,
  };
}

/**
 * Collect all unique variable names from an algebraic
 * formula expression.
 */
function extractVariables(
  expression: string,
): string[] {
  const parsed = parseFormula(expression);
  return parsed.variables;
}

/**
 * Resolve a variable name to its canonical input ID
 * via the medical alias dictionary (simplified inline).
 */
function resolveToInputId(
  variable: string,
  inputIds: Set<string>,
): string | null {
  if (inputIds.has(variable)) return variable;

  // Check if it's a known JS builtin
  if (JS_BUILTINS.has(variable)) return null;

  return null;
}

// ─────────────────────────────────────────────────
// Main validation function
// ─────────────────────────────────────────────────

/**
 * Validate a calculator definition before generation.
 *
 * Checks for:
 * - Unknown variables in algebraic formulas
 * - Missing / unused / duplicate inputs
 * - Invalid formula type
 * - Missing required config fields
 * - Invalid conditional / lookup / converter config
 *
 * @returns Structured validation result with errors
 *   and warnings. Errors block generation; warnings
 *   do not.
 */
export function validateCalculator(
  options: Partial<GeneratorOptions>,
): ValidationResult {
  const errors: ValidationFinding[] = [];
  const warnings: ValidationFinding[] = [];

  // ── Basic presence checks ────────────────────────
  if (!options.name) {
    errors.push(
      error(
        CODES.NO_FORMULA,
        "Calculator name is required.",
        "name",
      ),
    );
  }

  if (!options.inputs || options.inputs.length === 0) {
    errors.push(
      error(
        CODES.NO_INPUTS,
        "At least one input is required.",
        "inputs",
      ),
    );
  }

  if (!options.formula) {
    errors.push(
      error(
        CODES.NO_FORMULA,
        "Formula definition is required.",
        "formula",
      ),
    );
  }

  // Stop early if basics are missing
  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      warnings,
    };
  }

  const inputs =
    options.inputs as CalculatorInputDefinition[];
  const formula =
    options.formula as FormulaDefinition;

  // ── Input validation ─────────────────────────────
  const inputIds = new Set<string>();
  const inputIdsHyphen = new Set<string>();

  for (const input of inputs) {
    // Duplicate check
    if (inputIdsHyphen.has(input.id)) {
      errors.push(
        error(
          CODES.DUPLICATE_INPUT_ID,
          `Duplicate input ID "${input.id}". Each input must have a unique ID.`,
          `inputs[${input.id}]`,
        ),
      );
    }
    inputIdsHyphen.add(input.id);

    const normalizedId = input.id
      .replaceAll("-", "_")
      .toLowerCase();
    inputIds.add(normalizedId);

    // Check for JS reserved words
    if (JS_RESERVED.has(normalizedId)) {
      warnings.push(
        warning(
          CODES.INVALID_CONFIG_FIELD,
          `Input ID "${input.id}" is a JavaScript reserved word and may cause generation issues.`,
          `inputs[${input.id}].id`,
        ),
      );
    }
  }

  // ── Formula type validation ──────────────────────
  const formulaType: FormulaType | undefined =
    typeof formula === "string"
      ? "algebraic"
      : formula.type;

  if (
    typeof formula === "object" &&
    formula.type &&
    !VALID_FORMULA_TYPES.includes(formula.type)
  ) {
    errors.push(
      error(
        CODES.INVALID_FORMULA_TYPE,
        `Invalid formula type "${formula.type}". Valid types: ${VALID_FORMULA_TYPES.join(", ")}`,
        "formula.type",
      ),
    );
  }

  // ── Type-specific validation ─────────────────────
  if (typeof formula === "string") {
    // Algebraic (string form): check variables
    validateAlgebraicVariables(
      formula,
      inputIds,
      errors,
      warnings,
    );
  } else if (typeof formula === "object") {
    const type = formula.type ?? "algebraic";
    const config = formula.config;

    switch (type) {
      case "algebraic":
        if (formula.expression) {
          validateAlgebraicVariables(
            formula.expression,
            inputIds,
            errors,
            warnings,
          );
        }
        break;

      case "conditional":
        validateConditionalConfig(
          config,
          inputIds,
          errors,
          warnings,
        );
        break;

      case "lookup":
        validateLookupConfig(
          config,
          inputIds,
          errors,
          warnings,
        );
        break;

      case "converter":
        validateConverterConfig(
          config,
          inputIds,
          errors,
          warnings,
        );
        break;

      case "score":
      case "descriptive":
      case "composite":
        // These types don't require formula-specific
        // config validation
        break;
    }
  }

  // ── Unused input warnings ────────────────────────
  if (typeof formula === "string") {
    checkUnusedInputs(
      formula,
      inputIds,
      inputs,
      warnings,
    );
  } else if (
    typeof formula === "object" &&
    formula.expression
  ) {
    checkUnusedInputs(
      formula.expression,
      inputIds,
      inputs,
      warnings,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ─────────────────────────────────────────────────
// Algebraic variable checks
// ─────────────────────────────────────────────────

function validateAlgebraicVariables(
  expression: string,
  inputIds: Set<string>,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): void {
  const variables = extractVariables(expression);

  for (const variable of variables) {
    const resolved = resolveToInputId(
      variable,
      inputIds,
    );

    if (
      resolved === null &&
      !JS_BUILTINS.has(variable)
    ) {
      // Check if it might be a JS keyword or number
      if (/^\d+$/.test(variable)) continue;

      errors.push(
        error(
          CODES.UNKNOWN_VARIABLE,
          `Unknown variable "${variable}" in formula. No matching input found.`,
          "formula.expression",
        ),
      );
    }
  }
}

// ─────────────────────────────────────────────────
// Unused input check
// ─────────────────────────────────────────────────

function checkUnusedInputs(
  expression: string,
  inputIds: Set<string>,
  inputs: CalculatorInputDefinition[],
  warnings: ValidationFinding[],
): void {
  const variables = extractVariables(expression);
  const usedVars = new Set(
    variables.map((v) => v.toLowerCase()),
  );

  // Also consider alias mappings that resolve to inputs
  for (const input of inputs) {
    const normalizedId = input.id
      .replaceAll("-", "_")
      .toLowerCase();

    // Check if the input ID or a common alias form is
    // referenced
    if (!usedVars.has(normalizedId)) {
      // Check common alias patterns
      const camelLabel = (
        input.label ?? input.id
      )
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 0)
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() +
              w.slice(1).toLowerCase(),
        )
        .join("");

      if (
        camelLabel &&
        !usedVars.has(camelLabel.toLowerCase())
      ) {
        warnings.push(
          warning(
            CODES.UNUSED_INPUT,
            `Input "${input.id}" (${input.label}) may not be used in the formula.`,
            `inputs[${input.id}]`,
          ),
        );
      }
    }
  }
}

// ─────────────────────────────────────────────────
// Conditional config validation
// ─────────────────────────────────────────────────

function validateConditionalConfig(
  config: Record<string, unknown> | undefined,
  _inputIds: Set<string>,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): void {
  if (!config) {
    errors.push(
      error(
        CODES.MISSING_CONFIG,
        "Conditional formula requires config.conditions.",
        "formula.config",
      ),
    );
    return;
  }

  const conditions = config.conditions as
    | unknown[]
    | undefined;

  if (
    !Array.isArray(conditions) ||
    conditions.length === 0
  ) {
    errors.push(
      error(
        CODES.INVALID_CONDITIONS,
        "Conditional formula requires a non-empty config.conditions array.",
        "formula.config.conditions",
      ),
    );
    return;
  }

  for (let i = 0; i < conditions.length; i++) {
    const cond = conditions[i] as Record<
      string,
      unknown
    > | null;
    const path = `formula.config.conditions[${i}]`;

    if (!cond || typeof cond !== "object") {
      errors.push(
        error(
          CODES.INVALID_CONDITIONS,
          `Condition at index ${i} must be an object.`,
          path,
        ),
      );
      continue;
    }

    if (
      typeof cond.when !== "string" ||
      cond.when.trim().length === 0
    ) {
      errors.push(
        error(
          CODES.INVALID_CONDITIONS,
          `Condition at index ${i} requires a non-empty "when" string.`,
          path,
        ),
      );
    }

    if (
      cond.value === undefined ||
      cond.value === null
    ) {
      errors.push(
        error(
          CODES.INVALID_CONDITIONS,
          `Condition at index ${i} requires a "value".`,
          path,
        ),
      );
    }

    if (
      cond.status !== undefined &&
      !["normal", "low", "high", "critical"].includes(
        cond.status as string,
      )
    ) {
      warnings.push(
        warning(
          CODES.INVALID_CONDITIONS,
          `Condition at index ${i} has invalid status "${cond.status}". Valid: normal, low, high, critical.`,
          path,
        ),
      );
    }
  }
}

// ─────────────────────────────────────────────────
// Lookup config validation
// ─────────────────────────────────────────────────

function validateLookupConfig(
  config: Record<string, unknown> | undefined,
  _inputIds: Set<string>,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): void {
  if (!config) {
    errors.push(
      error(
        CODES.MISSING_CONFIG,
        "Lookup formula requires config with table or source.",
        "formula.config",
      ),
    );
    return;
  }

  const table = config.table as
    | unknown[]
    | undefined;
  const source = config.source as
    | string
    | undefined;

  if (
    (!table || table.length === 0) &&
    (!source || source.length === 0)
  ) {
    errors.push(
      error(
        CODES.INVALID_LOOKUP_TABLE,
        "Lookup formula requires either config.table (non-empty array) or config.source (non-empty string).",
        "formula.config",
      ),
    );
    return;
  }

  if (Array.isArray(table) && table.length > 0) {
    for (let i = 0; i < table.length; i++) {
      const entry = table[i] as Record<
        string,
        unknown
      > | null;
      const path = `formula.config.table[${i}]`;

      if (!entry || typeof entry !== "object") {
        errors.push(
          error(
            CODES.INVALID_LOOKUP_TABLE,
            `Lookup table entry at index ${i} must be an object.`,
            path,
          ),
        );
        continue;
      }

      if (typeof entry.value !== "number") {
        errors.push(
          error(
            CODES.INVALID_LOOKUP_TABLE,
            `Lookup table entry at index ${i} requires a numeric "value".`,
            path,
          ),
        );
      }

      if (
        entry.min !== undefined &&
        typeof entry.min !== "number"
      ) {
        warnings.push(
          warning(
            CODES.INVALID_LOOKUP_TABLE,
            `Lookup table entry at index ${i}: "min" should be a number.`,
            path,
          ),
        );
      }

      if (
        entry.max !== undefined &&
        typeof entry.max !== "number"
      ) {
        warnings.push(
          warning(
            CODES.INVALID_LOOKUP_TABLE,
            `Lookup table entry at index ${i}: "max" should be a number.`,
            path,
          ),
        );
      }

      if (
        entry.min !== undefined &&
        entry.max !== undefined &&
        typeof entry.min === "number" &&
        typeof entry.max === "number" &&
        entry.min > entry.max
      ) {
        warnings.push(
          warning(
            CODES.INVALID_LOOKUP_TABLE,
            `Lookup table entry at index ${i}: min (${entry.min}) exceeds max (${entry.max}).`,
            path,
          ),
        );
      }
    }
  }
}

// ─────────────────────────────────────────────────
// Converter config validation
// ─────────────────────────────────────────────────

function validateConverterConfig(
  config: Record<string, unknown> | undefined,
  _inputIds: Set<string>,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): void {
  if (!config) {
    errors.push(
      error(
        CODES.MISSING_CONFIG,
        "Converter formula requires config with inputKey, outputUnitKey, and conversions.",
        "formula.config",
      ),
    );
    return;
  }

  const inputKey = config.inputKey as
    | string
    | undefined;
  const outputUnitKey = config.outputUnitKey as
    | string
    | undefined;
  const conversions = config.conversions as
    | Record<string, unknown>
    | undefined;

  if (!inputKey) {
    errors.push(
      error(
        CODES.MISSING_CONFIG,
        "Converter config requires inputKey.",
        "formula.config.inputKey",
      ),
    );
  }

  if (!outputUnitKey) {
    errors.push(
      error(
        CODES.MISSING_CONFIG,
        "Converter config requires outputUnitKey.",
        "formula.config.outputUnitKey",
      ),
    );
  }

  if (
    !conversions ||
    typeof conversions !== "object" ||
    Object.keys(conversions).length === 0
  ) {
    errors.push(
      error(
        CODES.EMPTY_CONVERTER,
        "Converter config requires a non-empty conversions object mapping unit keys to expressions.",
        "formula.config.conversions",
      ),
    );
    return;
  }

  for (const [unit, expr] of Object.entries(
    conversions,
  )) {
    if (typeof expr !== "string" || expr.length === 0) {
      errors.push(
        error(
          CODES.EMPTY_CONVERTER,
          `Converter conversion for "${unit}" must be a non-empty expression string.`,
          `formula.config.conversions.${unit}`,
        ),
      );
    }
  }

  // Warn if no numeric conversions are defined
  if (
    conversions &&
    Object.keys(conversions).length < 2
  ) {
    warnings.push(
      warning(
        CODES.EMPTY_CONVERTER,
        "Converter has fewer than 2 conversion entries. Consider adding more unit options.",
        "formula.config.conversions",
      ),
    );
  }
}