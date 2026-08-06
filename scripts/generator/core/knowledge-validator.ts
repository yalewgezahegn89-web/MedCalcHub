/**
 * Medical Knowledge Consistency Validator
 *
 * Analyzes every calculator knowledge definition before
 * generation and detects medical content inconsistencies.
 *
 * Checks 15 rules covering classification integrity,
 * metadata completeness, and reference validity.
 */

import type {
  ValidationFinding,
  ValidationResult,
} from "./validator";

import {
  calculatorKnowledge,
} from "../knowledge";

import type {
  CalculatorSuggestion,
  ClassificationRule,
} from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Error / warning codes
// ─────────────────────────────────────────────────

const CODES = {
  // Errors
  OVERLAPPING_RANGES:
    "OVERLAPPING_RANGES",
  EMPTY_INTERPRETATION:
    "EMPTY_INTERPRETATION",
  EMPTY_RECOMMENDATION:
    "EMPTY_RECOMMENDATION",
  BROKEN_RELATED_CALC:
    "BROKEN_RELATED_CALC",
  BROKEN_COMPARISON_CALC:
    "BROKEN_COMPARISON_CALC",
  MISSING_DESCRIPTION:
    "MISSING_DESCRIPTION",
  MISSING_INPUTS:
    "MISSING_INPUTS",
  DUPLICATE_INPUT_ID:
    "DUPLICATE_INPUT_ID",

  // Warnings
  GAP_BETWEEN_RANGES:
    "GAP_BETWEEN_RANGES",
  DUPLICATE_CLASSIFICATION_LABEL:
    "DUPLICATE_CLASSIFICATION_LABEL",
  MISSING_EVIDENCE:
    "MISSING_EVIDENCE",
  MISSING_FAQ:
    "MISSING_FAQ",
  MISSING_RELATED_CALCULATORS:
    "MISSING_RELATED_CALCULATORS",
  DUPLICATE_FAQ_QUESTION:
    "DUPLICATE_FAQ_QUESTION",
  DUPLICATE_EVIDENCE_REF:
    "DUPLICATE_EVIDENCE_REF",
} as const;

// ─────────────────────────────────────────────────
// Helper: extract numeric bounds from a label
// like "18–25" or "18 - 25" or "≥30" or "<10"
// ─────────────────────────────────────────────────

interface NumericRange {
  min: number | null;
  max: number | null;
}

function parseRangeFromRule(
  rule: ClassificationRule,
): NumericRange {
  // Use explicit min/max if provided
  if (
    rule.min !== undefined &&
    rule.max !== undefined
  ) {
    return {
      min: rule.min,
      max: rule.max,
    };
  }

  // Parse from label text
  const label = rule.label;

  // Match patterns like "18–25", "18 - 25", "18-25"
  const rangeMatch = label.match(
    /(\d+(?:\.\d+)?)\s*[-–—]\s*(\d+(?:\.\d+)?)/,
  );
  if (rangeMatch) {
    return {
      min: parseFloat(rangeMatch[1]),
      max: parseFloat(rangeMatch[2]),
    };
  }

  // Match "≥30" or ">=30"
  const gteMatch = label.match(
    /[≥>=]+\s*(\d+(?:\.\d+)?)/,
  );
  if (gteMatch) {
    return {
      min: parseFloat(gteMatch[1]),
      max: null,
    };
  }

  // Match "≤10" or "<=10"
  const lteMatch = label.match(
    /[≤<=]+\s*(\d+(?:\.\d+)?)/,
  );
  if (lteMatch) {
    return {
      min: null,
      max: parseFloat(lteMatch[1]),
    };
  }

  // Match ">30"
  const gtMatch = label.match(
    />\s*(\d+(?:\.\d+)?)/,
  );
  if (gtMatch) {
    return {
      min: parseFloat(gtMatch[1]),
      max: null,
    };
  }

  // Match "<10"
  const ltMatch = label.match(
    /<\s*(\d+(?:\.\d+)?)/,
  );
  if (ltMatch) {
    return {
      min: null,
      max: parseFloat(ltMatch[1]),
    };
  }

  return { min: null, max: null };
}

// ─────────────────────────────────────────────────
// Rule 1 & 2: Classification range checks
// ─────────────────────────────────────────────────

function checkClassificationRanges(
  classification: readonly ClassificationRule[],
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (classification.length === 0) {
    return findings;
  }

  const ranges: {
    rule: ClassificationRule;
    range: NumericRange;
  }[] = [];

  for (const rule of classification) {
    const range = parseRangeFromRule(rule);
    if (
      range.min !== null ||
      range.max !== null
    ) {
      ranges.push({ rule, range });
    }
  }

  // Check overlaps
  for (let i = 0; i < ranges.length; i++) {
    for (
      let j = i + 1;
      j < ranges.length;
      j++
    ) {
      const a = ranges[i];
      const b = ranges[j];

      const aMin =
        a.range.min ?? -Infinity;
      const aMax =
        a.range.max ?? Infinity;
      const bMin =
        b.range.min ?? -Infinity;
      const bMax =
        b.range.max ?? Infinity;

      // Check for overlap: ranges overlap if
      // aMin < bMax AND bMin < aMax
      if (aMin < bMax && bMin < aMax) {
        // Exclude adjacent ranges (a.max == b.min)
        // They are NOT overlaps
        const aUpper =
          a.range.max ?? Infinity;
        const bUpper =
          b.range.max ?? Infinity;
        const aLower =
          a.range.min ?? -Infinity;
        const bLower =
          b.range.min ?? -Infinity;

        const isAdjacent =
          aUpper === bLower ||
          bUpper === aLower;

        if (!isAdjacent) {
          findings.push({
            severity: "error",
            code: CODES.OVERLAPPING_RANGES,
            message:
              `Overlapping ranges: "${a.rule.label}" ` +
              `and "${b.rule.label}" in ${slug}`,
            path: slug,
          });
        }
      }

      // Check for gaps between adjacent ranges
      // A gap exists if aMax < bMin - 1 (for integer
      // ranges) or aMax < bMin (for continuous)
      if (aMax < bMin) {
        findings.push({
          severity: "warning",
          code: CODES.GAP_BETWEEN_RANGES,
          message:
            `Gap detected between ranges: "${a.rule.label}" ` +
            `and "${b.rule.label}" in ${slug}`,
          path: slug,
        });
      } else if (bMax < aMin) {
        findings.push({
          severity: "warning",
          code: CODES.GAP_BETWEEN_RANGES,
          message:
            `Gap detected between ranges: "${b.rule.label}" ` +
            `and "${a.rule.label}" in ${slug}`,
          path: slug,
        });
      }
    }
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 3: Duplicate classification labels
// ─────────────────────────────────────────────────

function checkDuplicateLabels(
  classification: readonly ClassificationRule[],
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];
  const seen = new Set<string>();

  for (const rule of classification) {
    const label = rule.label.toLowerCase().trim();
    if (seen.has(label)) {
      findings.push({
        severity: "warning",
        code: CODES.DUPLICATE_CLASSIFICATION_LABEL,
        message:
          `Duplicate classification label "${rule.label}" in ${slug}`,
        path: slug,
      });
    }
    seen.add(label);
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rules 4, 5, 6: Missing metadata
// ─────────────────────────────────────────────────

function checkMissingMetadata(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  const hasFormula = knowledge.formula !== undefined;
  const hasInputs =
    knowledge.inputs !== undefined &&
    knowledge.inputs.length > 0;
  const hasClassification =
    knowledge.classification !== undefined &&
    knowledge.classification.length > 0;

  // Rule 4: Missing evidence
  if (
    hasFormula &&
    hasInputs &&
    hasClassification &&
    (!knowledge.evidence ||
      Object.keys(knowledge.evidence).length === 0)
  ) {
    findings.push({
      severity: "warning",
      code: CODES.MISSING_EVIDENCE,
      message:
        `Missing evidence for ${slug}`,
      path: slug,
    });
  }

  // Rule 5: Missing FAQ
  if (
    !knowledge.faq ||
    knowledge.faq.length === 0
  ) {
    findings.push({
      severity: "warning",
      code: CODES.MISSING_FAQ,
      message:
        `Missing FAQ for ${slug}`,
      path: slug,
    });
  }

  // Rule 6: Missing related calculators
  if (
    !knowledge.relatedCalculators ||
    knowledge.relatedCalculators.length === 0
  ) {
    findings.push({
      severity: "warning",
      code: CODES.MISSING_RELATED_CALCULATORS,
      message:
        `Missing related calculators for ${slug}`,
      path: slug,
    });
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 7: Duplicate FAQ questions
// ─────────────────────────────────────────────────

function checkDuplicateFAQ(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (!knowledge.faq) return findings;

  const seen = new Set<string>();

  for (const item of knowledge.faq) {
    const q = item.question.toLowerCase().trim();
    if (seen.has(q)) {
      findings.push({
        severity: "warning",
        code: CODES.DUPLICATE_FAQ_QUESTION,
        message:
          `Duplicate FAQ question "${item.question}" in ${slug}`,
        path: slug,
      });
    }
    seen.add(q);
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 8: Duplicate evidence references
// ─────────────────────────────────────────────────

function checkDuplicateEvidence(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (
    !knowledge.evidence ||
    !knowledge.evidence.references
  ) {
    return findings;
  }

  const seen = new Set<string>();

  for (const ref of knowledge.evidence
    .references) {
    const normalized = ref.toLowerCase().trim();
    if (seen.has(normalized)) {
      findings.push({
        severity: "warning",
        code: CODES.DUPLICATE_EVIDENCE_REF,
        message:
          `Duplicate evidence reference "${ref}" in ${slug}`,
        path: slug,
      });
    }
    seen.add(normalized);
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 9: Empty interpretation
// ─────────────────────────────────────────────────

function checkInterpretation(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (
    !knowledge.classification ||
    knowledge.classification.length === 0
  ) {
    return findings;
  }

  // Check that every classification rule has a
  // non-empty label (which serves as the
  // interpretation text)
  for (const rule of knowledge.classification) {
    if (!rule.label || rule.label.trim() === "") {
      findings.push({
        severity: "error",
        code: CODES.EMPTY_INTERPRETATION,
        message:
          `Empty interpretation label in classification ` +
          `rule for ${slug}`,
        path: slug,
      });
    }
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 10: Empty recommendation
// ─────────────────────────────────────────────────

function checkRecommendation(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  const cg = knowledge.clinicalGuidance;

  if (!cg) return findings;

  // If clinicalGuidance exists but all fields
  // are empty, that's an issue
  const hasAdvice =
    cg.advice && cg.advice.length > 0;
  const hasWarnings =
    cg.warnings && cg.warnings.length > 0;
  const hasFollowUp =
    cg.followUp && cg.followUp.length > 0;

  if (!hasAdvice && !hasWarnings && !hasFollowUp) {
    findings.push({
      severity: "error",
      code: CODES.EMPTY_RECOMMENDATION,
      message:
        `Empty recommendation (clinicalGuidance ` +
        `has no content) for ${slug}`,
      path: slug,
    });
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rules 11 & 12: Broken related/comparison calcs
// ─────────────────────────────────────────────────

function checkBrokenReferences(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  // Collect all known calculator slugs
  const knownSlugs = new Set(
    Object.keys(calculatorKnowledge),
  );

  // Rule 11: Broken related calculator
  if (knowledge.relatedCalculators) {
    for (const related of knowledge
      .relatedCalculators) {
      if (!knownSlugs.has(related)) {
        findings.push({
          severity: "error",
          code: CODES.BROKEN_RELATED_CALC,
          message:
            `Broken related calculator reference: ` +
            `"${related}" does not exist (referenced ` +
            `by ${slug})`,
          path: slug,
        });
      }
    }
  }

  // Rule 12: Broken comparison calculator
  if (
    knowledge.comparison &&
    knowledge.comparison.calculators
  ) {
    for (const comp of knowledge.comparison
      .calculators) {
      const compId = comp.id ?? "";
      if (
        compId &&
        !knownSlugs.has(compId)
      ) {
        findings.push({
          severity: "error",
          code: CODES.BROKEN_COMPARISON_CALC,
          message:
            `Broken comparison calculator reference: ` +
            `"${compId}" does not exist ` +
            `(referenced by ${slug})`,
          path: slug,
        });
      }
    }
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 13: Missing description
// ─────────────────────────────────────────────────

function checkDescription(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (
    !knowledge.description ||
    knowledge.description.trim() === ""
  ) {
    findings.push({
      severity: "error",
      code: CODES.MISSING_DESCRIPTION,
      message: `Missing description for ${slug}`,
      path: slug,
    });
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 14: Missing inputs
// ─────────────────────────────────────────────────

function checkInputs(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (
    !knowledge.inputs ||
    knowledge.inputs.length === 0
  ) {
    findings.push({
      severity: "error",
      code: CODES.MISSING_INPUTS,
      message: `Missing inputs for ${slug}`,
      path: slug,
    });
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Rule 15: Duplicate input IDs
// ─────────────────────────────────────────────────

function checkDuplicateInputs(
  knowledge: CalculatorSuggestion,
  slug: string,
): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  if (!knowledge.inputs) return findings;

  const seen = new Set<string>();

  for (const input of knowledge.inputs) {
    const inputObj = input as Record<
      string,
      unknown
    >;
    const id = String(inputObj.id ?? "");
    if (id && seen.has(id)) {
      findings.push({
        severity: "error",
        code: CODES.DUPLICATE_INPUT_ID,
        message:
          `Duplicate input ID "${id}" in ${slug}`,
        path: slug,
      });
    }
    if (id) seen.add(id);
  }

  return findings;
}

// ─────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────

/**
 * Validate all calculator knowledge definitions for
 * medical content consistency.
 *
 * Returns a ValidationResult compatible with the
 * existing validator infrastructure.
 */
export function validateKnowledge(): ValidationResult {
  const errors: ValidationFinding[] = [];
  const warnings: ValidationFinding[] = [];

  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  for (const [slug, entry] of Object.entries(
    knowledge,
  )) {
    // Rule 1 & 2: Classification ranges
    if (entry.classification) {
      errors.push(
        ...checkClassificationRanges(
          entry.classification,
          slug,
        ).filter((f) => f.severity === "error"),
      );
      warnings.push(
        ...checkClassificationRanges(
          entry.classification,
          slug,
        ).filter((f) => f.severity === "warning"),
      );
    }

    // Rule 3: Duplicate classification labels
    if (entry.classification) {
      warnings.push(
        ...checkDuplicateLabels(
          entry.classification,
          slug,
        ),
      );
    }

    // Rules 4, 5, 6: Missing metadata
    warnings.push(
      ...checkMissingMetadata(entry, slug),
    );

    // Rule 7: Duplicate FAQ questions
    warnings.push(
      ...checkDuplicateFAQ(entry, slug),
    );

    // Rule 8: Duplicate evidence references
    warnings.push(
      ...checkDuplicateEvidence(entry, slug),
    );

    // Rule 9: Empty interpretation
    errors.push(
      ...checkInterpretation(entry, slug),
    );

    // Rule 10: Empty recommendation
    errors.push(
      ...checkRecommendation(entry, slug),
    );

    // Rules 11 & 12: Broken references
    errors.push(
      ...checkBrokenReferences(entry, slug),
    );

    // Rule 13: Missing description
    errors.push(
      ...checkDescription(entry, slug),
    );

    // Rule 14: Missing inputs
    errors.push(
      ...checkInputs(entry, slug),
    );

    // Rule 15: Duplicate input IDs
    errors.push(
      ...checkDuplicateInputs(entry, slug),
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}