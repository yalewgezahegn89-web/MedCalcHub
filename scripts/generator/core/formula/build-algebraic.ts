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
 * Common medical abbreviations → input ID patterns.
 *
 * Used as a fallback when label/ID matching fails.
 */
const MEDICAL_ABBREVIATIONS: Record<string, string> = {
  "Na": "sodium",
  "K": "potassium",
  "Cl": "chloride",
  "HCO3": "bicarbonate",
  "Ca": "calcium",
  "Mg": "magnesium",
  "Cr": "creatinine",
  "BUN": "bun",
  "HR": "heart_rate",
  "SBP": "sbp",
  "DBP": "dbp",
  "RR": "respiratory_rate",
  "SpO2": "spo2",
  "GCS": "gcs",
  "Albumin": "albumin",
  "TBW": "tbw",
  "SCr": "serum_creatinine",
  "Wt": "weight",
  "Ht": "height",
  "BSA": "bsa",
  "BMI": "bmi",
  "IBW": "ibw",
  "EBW": "ebw",
  "ABW": "adjbw",
  "INR": "inr",
  "LDL": "ldl",
  "HDL": "hdl",
  "TSH": "tsh",
  "eGFR": "egfr",
  "FE": "fe",
  "FeNa": "fena",
  "KtV": "ktv",
  "UOsm": "urine_osmolality",
  "SOsm": "serum_osmolality",
};

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

  // Build a word-level synonym map for medical terms
  // so "Na" matches "Sodium" and vice versa
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
   * non-alphanumeric, apply synonyms.
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
          termMatches(ew, labelWord) &&
          !MEDICAL_ABBREVIATIONS[ew]
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

  // Fallback: try medical abbreviations for any remaining
  // unmatched variables
  const words = mapped.split(/(\b)/);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (MEDICAL_ABBREVIATIONS[word]) {
      words[i] = MEDICAL_ABBREVIATIONS[word];
    }
  }
  mapped = words.join("");

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