import type {
  CalculatorInputDefinition,
  FormulaDefinition,
  GeneratorOptions,
} from "../../types";

import { writeGeneratedFile } from "../../file-writer";

import { suggestCalculator } from "./calculator-intelligence";

import type {
  CalculatorSuggestion,
  ClassificationRule,
} from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join("");
}

function getFormulaType(
  formula: FormulaDefinition | undefined,
): string {
  if (!formula) return "none";
  if (typeof formula === "string") return "algebraic";
  return formula.type ?? "algebraic";
}

/**
 * Build the import path for the calculator module.
 */
function getImportPath(slug: string): string {
  return `../../lib/calculators/${slug}`;
}

// ─────────────────────────────────────────────────
// Input test value generators
// ─────────────────────────────────────────────────

function generateValidInputValues(
  inputs: readonly CalculatorInputDefinition[],
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const input of inputs) {
    if (input.type === "select") {
      values[input.id] = "option1";
    } else if (input.type === "text") {
      values[input.id] = "test";
    } else {
      values[input.id] = "50";
    }
  }
  return values;
}

function generateInvalidInputValues(
  inputs: readonly CalculatorInputDefinition[],
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const input of inputs) {
    if (input.type === "number") {
      values[input.id] = "invalid_number";
    } else {
      values[input.id] = "";
    }
  }
  return values;
}

function generateEmptyInputValues(
  inputs: readonly CalculatorInputDefinition[],
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const input of inputs) {
    values[input.id] = "";
  }
  return values;
}

// ─────────────────────────────────────────────────
// Smart test case generators
// ─────────────────────────────────────────────────

/**
 * Generate test cases based on classification rules
 * (e.g. BMI ranges: underweight, normal, overweight).
 */
function generateClassificationTests(
  classification: readonly ClassificationRule[],
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  if (classification.length === 0) return [];

  const tests: string[] = [];
  const firstNumberInput =
    inputs.find((i) => i.type === "number")?.id ??
    inputs[0]?.id ??
    "value";

  for (const rule of classification) {
    // Generate a representative value for each range
    let testValue = "50";
    if (rule.min !== undefined && rule.max !== undefined) {
      testValue = String(
        Math.round((rule.min + rule.max) / 2),
      );
    } else if (rule.min !== undefined) {
      testValue = String(rule.min + 1);
    } else if (rule.max !== undefined) {
      testValue = String(Math.max(rule.max - 1, 0));
    }

    const values = generateValidInputValues(inputs);
    values[firstNumberInput] = testValue;

    tests.push(`
    it("should classify ${rule.label.toLowerCase()} (${testValue})", () => {
      const values: Record<string, string> = ${JSON.stringify(values, null, 6)};
      const result = calculator(values);
      expect(result.status).toBe("${rule.status}");
    });`);
  }

  return tests;
}

/**
 * Generate test cases for score calculators with
 * low / medium / high scenarios.
 */
function generateScoreTests(
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  const tests: string[] = [];
  const numberInputs = inputs.filter(
    (i) => i.type === "number",
  );

  if (numberInputs.length === 0) return tests;

  // Low score: all inputs at minimum
  const lowValues = generateValidInputValues(inputs);
  for (const input of numberInputs) {
    lowValues[input.id] = "0";
  }
  tests.push(`
    it("should handle low score (all inputs at 0)", () => {
      const values: Record<string, string> = ${JSON.stringify(lowValues, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);

  // Medium score
  const medValues = generateValidInputValues(inputs);
  for (const input of numberInputs) {
    medValues[input.id] = "3";
  }
  tests.push(`
    it("should handle medium score", () => {
      const values: Record<string, string> = ${JSON.stringify(medValues, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);

  // High score
  const highValues = generateValidInputValues(inputs);
  for (const input of numberInputs) {
    highValues[input.id] = "15";
  }
  tests.push(`
    it("should handle high score", () => {
      const values: Record<string, string> = ${JSON.stringify(highValues, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);

  return tests;
}

/**
 * Generate test cases for lookup calculators — one
 * for each lookup table range.
 */
function generateLookupTests(
  formula: FormulaDefinition,
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  if (typeof formula === "string") return [];
  const config = formula.config as Record<
    string,
    unknown
  > | undefined;
  const table = config?.table as
    | Array<Record<string, unknown>>
    | undefined;
  if (!table || table.length === 0) return [];

  const tests: string[] = [];
  const firstInput =
    inputs.find((i) => i.type === "number")?.id ??
    inputs[0]?.id ??
    "value";

  for (let i = 0; i < table.length; i++) {
    const entry = table[i];
    let testValue = "50";
    if (
      entry.min !== undefined &&
      entry.max !== undefined
    ) {
      testValue = String(
        Math.round(
          ((entry.min as number) +
            (entry.max as number)) /
            2,
        ),
      );
    } else if (entry.min !== undefined) {
      testValue = String(
        (entry.min as number) + 1,
      );
    } else if (entry.max !== undefined) {
      testValue = String(
        Math.max((entry.max as number) - 1, 0),
      );
    }

    const values = generateValidInputValues(inputs);
    values[firstInput] = testValue;

    tests.push(`
    it("should match lookup range ${i + 1} (input: ${testValue})", () => {
      const values: Record<string, string> = ${JSON.stringify(values, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);
  }

  return tests;
}

/**
 * Generate test cases for conditional calculators —
 * one for each branch.
 */
function generateConditionalTests(
  formula: FormulaDefinition,
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  if (typeof formula === "string") return [];
  const config = formula.config as Record<
    string,
    unknown
  > | undefined;
  const conditions = config?.conditions as
    | Array<Record<string, unknown>>
    | undefined;
  if (!conditions || conditions.length === 0) return [];

  const tests: string[] = [];
  const firstInput =
    inputs.find((i) => i.type === "number")?.id ??
    inputs[0]?.id ??
    "value";

  for (let i = 0; i < conditions.length; i++) {
    const cond = conditions[i];
    const label =
      typeof cond.value === "string"
        ? cond.value
        : `branch ${i + 1}`;

    // Try to extract a numeric threshold from the
    // "when" expression
    const when = String(cond.when ?? "");
    const match = when.match(
      /(\d+(?:\.\d+)?)/,
    );
    const testValue = match ? match[1] : "50";

    const values = generateValidInputValues(inputs);
    values[firstInput] = testValue;

    tests.push(`
    it("should handle condition: ${label.replace(/"/g, '\\"')} (${testValue})", () => {
      const values: Record<string, string> = ${JSON.stringify(values, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);
  }

  return tests;
}

/**
 * Generate test cases for converter calculators —
 * one for every conversion unit.
 */
function generateConverterTests(
  formula: FormulaDefinition,
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  if (typeof formula === "string") return [];
  const config = formula.config as Record<
    string,
    unknown
  > | undefined;
  const conversions = config?.conversions as
    | Record<string, string>
    | undefined;
  if (!conversions) return [];

  const tests: string[] = [];
  const unitInput = String(
    config?.outputUnitKey ?? "unit",
  );
  const valueInput = String(
    config?.inputKey ?? "value",
  );

  for (const [unit] of Object.entries(conversions)) {
    const values = generateValidInputValues(inputs);
    values[valueInput] = "100";
    values[unitInput] = unit;

    tests.push(`
    it("should convert to ${unit}", () => {
      const values: Record<string, string> = ${JSON.stringify(values, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`);
  }

  return tests;
}

// ─────────────────────────────────────────────────
// Validation tests
// ─────────────────────────────────────────────────

function generateValidationTests(
  inputs: readonly CalculatorInputDefinition[],
): string[] {
  const tests: string[] = [];

  // Invalid number
  const invalidValues = generateInvalidInputValues(inputs);
  tests.push(`
    it("should reject invalid input", () => {
      const values: Record<string, string> = ${JSON.stringify(invalidValues, null, 6)};
      expect(() => calculator(values)).toThrow();
    });`);

  // Empty values
  const emptyValues = generateEmptyInputValues(inputs);
  tests.push(`
    it("should handle empty values", () => {
      const values: Record<string, string> = ${JSON.stringify(emptyValues, null, 6)};
      expect(() => calculator(values)).toThrow();
    });`);

  // NaN values
  const nanValues = generateValidInputValues(inputs);
  for (const input of inputs) {
    if (input.type === "number") {
      nanValues[input.id] = "NaN";
    }
  }
  tests.push(`
    it("should handle NaN values", () => {
      const values: Record<string, string> = ${JSON.stringify(nanValues, null, 6)};
      expect(() => calculator(values)).toThrow();
    });`);

  // Negative values for number inputs
  const negValues = generateValidInputValues(inputs);
  const hasNegativeTest = inputs.some(
    (i) =>
      i.type === "number" &&
      i.validation?.minimum !== undefined &&
      i.validation.minimum >= 0,
  );
  if (hasNegativeTest) {
    for (const input of inputs) {
      if (
        input.type === "number" &&
        input.validation?.minimum !== undefined &&
        input.validation.minimum >= 0
      ) {
        negValues[input.id] = "-1";
      }
    }
    tests.push(`
    it("should handle negative values when prohibited", () => {
      const values: Record<string, string> = ${JSON.stringify(negValues, null, 6)};
      expect(() => calculator(values)).toThrow();
    });`);
  }

  return tests;
}

// ─────────────────────────────────────────────────
// Main test file builder
// ─────────────────────────────────────────────────

function buildTestFile(
  options: GeneratorOptions,
  knowledge: CalculatorSuggestion,
): string {
  const slug = options.slug;
  const name = options.name;
  const formula = options.formula;
  const inputs =
    options.inputs as CalculatorInputDefinition[];
  const classification =
    knowledge.classification ?? [];

  const formulaType = getFormulaType(formula);
  const importPath = getImportPath(slug);

  // ── Build test cases ────────────────────────────

  // Default valid / invalid / empty tests
  const validValues = generateValidInputValues(inputs);
  const validTest = `
    it("should calculate correctly with valid input", () => {
      const values: Record<string, string> = ${JSON.stringify(validValues, null, 6)};
      const result = calculator(values);
      expect(result).toHaveProperty("value");
      expect(typeof result.value).toBe("number");
    });`;

  const validationTests =
    generateValidationTests(inputs);

  // ── Type-specific tests ─────────────────────────
  let smartTests: string[] = [];

  if (classification.length > 0) {
    smartTests = smartTests.concat(
      generateClassificationTests(
        classification,
        inputs,
      ),
    );
  }

  if (formulaType === "score") {
    smartTests = smartTests.concat(
      generateScoreTests(inputs),
    );
  }

  if (formulaType === "lookup" && formula) {
    smartTests = smartTests.concat(
      generateLookupTests(formula, inputs),
    );
  }

  if (formulaType === "conditional" && formula) {
    smartTests = smartTests.concat(
      generateConditionalTests(formula, inputs),
    );
  }

  if (formulaType === "converter" && formula) {
    smartTests = smartTests.concat(
      generateConverterTests(formula, inputs),
    );
  }

  // ── Assemble test file ─────────────────────────
  const allTests = [
    validTest,
    ...smartTests,
    ...validationTests,
  ];

  return `import { describe, it, expect } from "vitest";
import { calculator } from "${importPath}";

describe("${name}", () => {
${allTests.join("\n")}
});
`;
}

// ─────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────

/**
 * Generate unit tests for a calculator.
 *
 * Writes the test file to:
 *   tests/calculators/<slug>.test.ts
 *
 * @param options The generator options for the
 *   calculator being generated.
 */
export function generateCalculatorTests(
  options: GeneratorOptions,
): void {
  const slug = options.slug;
  const name = options.name;

  const knowledge = suggestCalculator(
    name,
  ) as CalculatorSuggestion;

  const content = buildTestFile(options, knowledge);

  const outputPath = `tests/calculators/${slug}.test.ts`;

  writeGeneratedFile(outputPath, content);
}