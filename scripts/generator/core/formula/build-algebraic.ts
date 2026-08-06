import type {
  CalculatorInputDefinition,
  ClassificationRule,
} from "../../../types";

import {
  parseFormula,
} from "../formula-parser";

import {
  sanitizeExpression,
} from "./sanitize-expression";

import {
  buildInterpretation,
} from "../interpreter/build-interpretation";
import {
  buildValidation,
} from "../build-validation";
import {
  buildVariableMap,
} from "../build-variable-map";

import {
  medicalAliases,
  resolveAlias,
} from "../medical-aliases";

export interface AlgebraicFormula {
  type: "algebraic";
  expression?: string;
}

export interface FormulaContext {
  inputs: readonly CalculatorInputDefinition[];
  name?: string;
  category?: string;
  classification?: readonly ClassificationRule[];
}

/**
 * Strip non-alphanumeric chars from a string for fuzzy matching.
 */
function stripNonAlpha(s: string): string {
  return s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

/**
 * Build a mapping from expression variable names to input IDs.
 *
 * Handles cases where the formula uses display names (e.g. "Na",
 * "HCO₃", "Measured Sodium") that must map to input IDs
 * (e.g. "sodium", "bicarbonate").
 */
function buildExpressionToInputMap(
  expression: string,
  inputs: readonly CalculatorInputDefinition[],
): string {
  let mapped = expression;

  // Sort inputs by label length descending so longer
  // labels match first (e.g. "Measured Sodium" before "Sodium")
  const sorted = [...inputs].sort(
    (a, b) =>
      (b.label ?? b.id).length -
      (a.label ?? a.id).length,
  );

  // Build a word-level synonym map from the centralized
  // medical alias dictionary, enabling term-by-term
  // matching when full label matching fails
  const TERM_SYNONYMS: Record<string, string[]> = {
    "na": ["sodium"],
    "sodium": ["na"],
    "k": ["potassium"],
    "potassium": ["k"],
    "cl": ["chloride"],
    "chloride": ["cl"],
    "hco3": ["bicarbonate", "hco"],
    "bicarbonate": ["hco3", "hco"],
    "ca": ["calcium"],
    "calcium": ["ca"],
    "cr": ["creatinine"],
    "creatinine": ["cr"],
    "sbp": ["blood", "pressure", "systolic"],
    "rr": ["respiratory", "rate"],
    "spo2": ["oxygen", "saturation"],
    "gcs": ["glasgow", "coma", "score"],
    "tbw": ["total", "body", "water"],
    "heart": ["hr"],
    "rate": ["hr"],
  };

  /**
   * Normalize a term for comparison: lowercase, strip
   * non-alphanumeric.
   */
  function normalizeTerm(term: string): string {
    const clean = stripNonAlpha(term);
    return clean;
  }

  function termMatches(
    exprTerm: string,
    labelTerm: string,
  ): boolean {
    const a = normalizeTerm(exprTerm);
    const b = normalizeTerm(labelTerm);

    if (a === b) return true;
    if (a.includes(b) || b.includes(a)) return true;

    // Check synonyms
    const synA = TERM_SYNONYMS[a] ?? [];
    if (synA.some((s) => b.includes(s))) return true;

    const synB = TERM_SYNONYMS[b] ?? [];
    if (synB.some((s) => a.includes(s))) return true;

    return false;
  }

  for (const input of sorted) {
    const inputId = input.id.replaceAll("-", "_");
    const label = input.label ?? inputId;

    // Strategy 1: Try full label regex with flexible whitespace
    const labelParts = label.split(/\s+/).map(
      (p) => stripNonAlpha(p),
    ).filter((p) => p.length >= 2);

    if (labelParts.length >= 1) {
      const flexibleParts = labelParts.map(
        (p) => p.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        ),
      );
      const labelRegex = new RegExp(
        flexibleParts.join("\\s*"),
        "gi",
      );
      if (labelRegex.test(mapped)) {
        labelRegex.lastIndex = 0;
        mapped = mapped.replace(labelRegex, inputId);
        continue;
      }
    }

    // Strategy 2: Try each word of the label individually
    // against each word of the expression, using synonym
    // matching (e.g. "Na" matches "Sodium" input label)
    for (const labelWord of labelParts) {
      if (labelWord.length < 2) continue;

      // Try exact word match first
      const escaped = labelWord.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      const wordRegex = new RegExp(
        "\\b" + escaped + "\\b",
        "gi",
      );
      if (wordRegex.test(mapped)) {
        wordRegex.lastIndex = 0;
        mapped = mapped.replace(wordRegex, inputId);
        continue;
      }

      // Try synonym match: check if any expression
      // word matches this label word via synonyms
      const exprWords = mapped.split(
        /\s*([+\-*/(),])\s*|\s+/,
      ).filter(Boolean);
      for (const ew of exprWords) {
        if (
          ew.length >= 2 &&
          termMatches(ew, labelWord)
        ) {
          // Replace the matched expression word
          const ewEscaped = ew.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&",
          );
          const synRegex = new RegExp(
            "\\b" + ewEscaped + "\\b",
            "g",
          );
          if (synRegex.test(mapped)) {
            synRegex.lastIndex = 0;
            mapped = mapped.replace(synRegex, inputId);
          }
        }
      }
    }
  }

  // Fallback: try the centralized medical alias
  // dictionary for any remaining unmatched multi-word
  // or single-word variables. Try longest aliases first
  // to avoid partial matches.
  const aliasEntries = Object.entries(medicalAliases)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [alias, targetId] of aliasEntries) {
    // Convert alias name to camelCase for matching
    // (same transform as build-variable-map.ts uses
    // for variable declarations)
    const aliasCamel = alias
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

    // Skip if the camelCase alias equals the target
    // (the input ID is already handled)
    if (aliasCamel === targetId) continue;

    // Replace the alias in the expression with the
    // target input ID
    const escaped = alias.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    // Build a flexible regex that allows whitespace
    // variations between alias words
    const aliasWords = alias.split(/\s+/);
    if (aliasWords.length >= 2) {
      const pattern = aliasWords
        .map((w) => w.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        ))
        .join("\\s+");
      const regex = new RegExp(pattern, "gi");
      if (regex.test(mapped)) {
        regex.lastIndex = 0;
        mapped = mapped.replace(regex, targetId);
      }
    } else {
      // Single-word alias: use word boundary
      const regex = new RegExp(
        "\\b" + escaped + "\\b",
        "g",
      );
      if (regex.test(mapped)) {
        regex.lastIndex = 0;
        mapped = mapped.replace(regex, targetId);
      }
    }

    // Also try the camelCase form as a variable name
    // in the expression
    const camelEscaped = aliasCamel.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    const camelRegex = new RegExp(
      "\\b" + camelEscaped + "\\b",
      "g",
    );
    if (camelRegex.test(mapped)) {
      camelRegex.lastIndex = 0;
      mapped = mapped.replace(camelRegex, targetId);
    }
  }

  return mapped;
}

export function buildAlgebraicFormula(
  formula: AlgebraicFormula,
  context: FormulaContext,
): string {

  const sourceExpression = formula.expression ?? "";

  const sanitized = sanitizeExpression(sourceExpression);

  const parsed = parseFormula(sanitized);

  const declarations = buildVariableMap(context.inputs);

  // Map expression variables to input IDs
  const expression = buildExpressionToInputMap(
    parsed.expression,
    context.inputs,
  );

  return `
calculate(
  values: Record<string, string>,
) {

${buildValidation(context.inputs)}


${declarations}


  const result =
    ${expression};


  ${buildInterpretation({
    name: context.name ?? "",
    category: context.category ?? "",
    classification: context.classification ?? [],
  })}



return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},
`;
}