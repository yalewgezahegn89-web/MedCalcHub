/**
 * Auto-Fix Engine
 *
 * Automatically repairs common knowledge-definition
 * issues detected by the Knowledge Validator.
 *
 * Operates on the in-memory `calculatorKnowledge`
 * object. All fixes are idempotent — running twice
 * must not create duplicates.
 */

import type {
  CalculatorSuggestion,
  ClassificationRule,
} from "./calculator-intelligence";

import type {
  FAQItem,
} from "../../../lib/calculators/calculator.types";

import {
  calculatorKnowledge,
} from "../knowledge";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface AutoFixResult {
  slug: string;
  fixesApplied: string[];
  count: number;
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

/**
 * Get calculator slugs that share the same
 * category or specialty.
 */
function getRelatedSlugs(
  entry: CalculatorSuggestion,
  allEntries: Record<
    string,
    CalculatorSuggestion
  >,
  maxCount: number,
): string[] {
  const related: string[] = [];

  for (const [slug, other] of Object.entries(
    allEntries,
  )) {
    if (related.length >= maxCount) break;

    const sameCategory =
      entry.category &&
      other.category &&
      entry.category === other.category;
    const sameSpecialty =
      entry.specialty &&
      other.specialty &&
      entry.specialty === other.specialty;

    if (sameCategory || sameSpecialty) {
      related.push(slug);
    }
  }

  return related.slice(0, maxCount);
}

/**
 * Get calculator slugs that share at least one
 * input field ID with the given entry.
 */
function getComparisonSlugs(
  entry: CalculatorSuggestion,
  allEntries: Record<
    string,
    CalculatorSuggestion
  >,
): string[] {
  const entryInputIds = new Set(
    (entry.inputs ?? [])
      .map((i) => (i as Record<string, unknown>).id)
      .filter(Boolean),
  );

  if (entryInputIds.size === 0) return [];

  const matches: string[] = [];

  for (const [slug, other] of Object.entries(
    allEntries,
  )) {
    const otherInputIds = new Set(
      (other.inputs ?? [])
        .map(
          (i) =>
            (i as Record<string, unknown>).id,
        )
        .filter(Boolean),
    );

    // Check for intersection
    for (const id of otherInputIds) {
      if (entryInputIds.has(id as string)) {
        matches.push(slug);
        break;
      }
    }
  }

  return matches;
}

// ─────────────────────────────────────────────────
// Auto-fix functions (one per rule)
// ─────────────────────────────────────────────────

/**
 * Fix 1: Missing FAQ
 * Idempotent: only adds if FAQ is empty/missing.
 */
function fixMissingFAQ(
  slug: string,
  entry: CalculatorSuggestion,
): string | null {
  if (
    entry.faq &&
    entry.faq.length > 0
  ) {
    return null;
  }

  const name = titleCase(slug);
  entry.faq = [
    {
      question: `What is ${name}?`,
      answer: "TODO: Add FAQ answer.",
    },
  ];

  return "Added FAQ";
}

/**
 * Fix 2: Missing Evidence
 * Idempotent: only adds if evidence is empty/missing.
 */
function fixMissingEvidence(
  entry: CalculatorSuggestion,
): string | null {
  if (
    entry.evidence &&
    Object.keys(entry.evidence).length > 0
  ) {
    return null;
  }

  entry.evidence = {
    source: "TODO",
    reference: "TODO",
  };

  return "Added Evidence";
}

/**
 * Fix 3: Missing Related Calculators
 * Idempotent: only adds if relatedCalculators is
 * empty/missing.
 */
function fixMissingRelated(
  entry: CalculatorSuggestion,
  allEntries: Record<
    string,
    CalculatorSuggestion
  >,
): string | null {
  if (
    entry.relatedCalculators &&
    entry.relatedCalculators.length > 0
  ) {
    return null;
  }

  const related = getRelatedSlugs(
    entry,
    allEntries,
    5,
  );

  if (related.length === 0) return null;

  entry.relatedCalculators = related;

  return `Added ${related.length} related calculators`;
}

/**
 * Fix 4: Missing Comparisons
 * Idempotent: only adds if comparison is missing
 * or has no calculators.
 */
function fixMissingComparisons(
  entry: CalculatorSuggestion,
  allEntries: Record<
    string,
    CalculatorSuggestion
  >,
): string | null {
  if (
    entry.comparison &&
    entry.comparison.calculators &&
    entry.comparison.calculators.length > 0
  ) {
    return null;
  }

  const matches = getComparisonSlugs(
    entry,
    allEntries,
  );

  if (matches.length === 0) return null;

  entry.comparison = {
    title: `${titleCase(entry.category ?? "")} Comparison`,
    calculators: matches.map((slug) => ({
      id: slug,
      name: titleCase(slug),
      href: `/calculators/${slug}`,
    })),
  };

  return `Added ${matches.length} comparison calculators`;
}

/**
 * Fix 5: Missing Clinical Guidance
 * Idempotent: only adds if clinicalGuidance is
 * missing or empty.
 */
function fixMissingClinicalGuidance(
  entry: CalculatorSuggestion,
): string | null {
  const cg = entry.clinicalGuidance;

  if (cg) {
    const hasAny =
      (cg.advice && cg.advice.length > 0) ||
      (cg.warnings &&
        cg.warnings.length > 0) ||
      (cg.followUp &&
        cg.followUp.length > 0);
    if (hasAny) return null;
  }

  entry.clinicalGuidance = {
    advice: ["TODO: Add clinical advice."],
    warnings: ["TODO: Add clinical warnings."],
    followUp: ["TODO: Add follow-up guidance."],
  };

  return "Added Clinical Guidance";
}

/**
 * Fix 6: Empty Classification Label
 * Idempotent: only replaces truly empty labels.
 */
function fixEmptyClassificationLabel(
  entry: CalculatorSuggestion,
): string | null {
  if (
    !entry.classification ||
    entry.classification.length === 0
  ) {
    return null;
  }

  let fixed = false;

  for (const rule of entry.classification) {
    if (
      !rule.label ||
      rule.label.trim() === ""
    ) {
      (
        rule as ClassificationRule
      ).label = "Unclassified";
      fixed = true;
    }
  }

  return fixed
    ? "Fixed empty classification labels"
    : null;
}

/**
 * Fix 7: Duplicate FAQ Questions
 * Idempotent: keeps first occurrence only.
 */
function fixDuplicateFAQ(
  entry: CalculatorSuggestion,
): string | null {
  if (
    !entry.faq ||
    entry.faq.length <= 1
  ) {
    return null;
  }

  const seen = new Set<string>();
  const unique: FAQItem[] = [];
  let removed = 0;

  for (const item of entry.faq) {
    const q = item.question.toLowerCase().trim();
    if (!seen.has(q)) {
      seen.add(q);
      unique.push(item);
    } else {
      removed++;
    }
  }

  if (removed === 0) return null;

  entry.faq = unique;

  return `Removed ${removed} duplicate FAQ`;
}

/**
 * Fix 8: Duplicate Evidence References
 * Idempotent: keeps first occurrence only.
 */
function fixDuplicateEvidence(
  entry: CalculatorSuggestion,
): string | null {
  if (
    !entry.evidence ||
    !entry.evidence.references ||
    entry.evidence.references.length <= 1
  ) {
    return null;
  }

  const seen = new Set<string>();
  const unique: string[] = [];
  let removed = 0;

  for (const ref of entry.evidence.references) {
    const norm = ref.toLowerCase().trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      unique.push(ref);
    } else {
      removed++;
    }
  }

  if (removed === 0) return null;

  entry.evidence = {
    ...entry.evidence,
    references: unique,
  };

  return `Removed ${removed} duplicate evidence`;
}

/**
 * Fix 9: Missing Description
 * Idempotent: only adds if description is empty.
 */
function fixMissingDescription(
  slug: string,
  entry: CalculatorSuggestion,
): string | null {
  if (
    entry.description &&
    entry.description.trim() !== ""
  ) {
    return null;
  }

  entry.description =
    "TODO: Add calculator description.";

  return "Added placeholder description";
}

/**
 * Fix 10: Missing Classification
 * Idempotent: only adds if classification is
 * empty/missing.
 */
function fixMissingClassification(
  entry: CalculatorSuggestion,
): string | null {
  if (
    entry.classification &&
    entry.classification.length > 0
  ) {
    return null;
  }

  entry.classification = [
    {
      label: "Normal",
      status: "normal",
    },
  ];

  return "Added placeholder classification";
}

// ─────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────

/**
 * Apply all auto-fixes to every calculator
 * knowledge definition.
 *
 * Operates on the in-memory `calculatorKnowledge`
 * object. All fixes are idempotent.
 *
 * Returns results for each calculator that was
 * modified.
 */
export function autoFixKnowledge(): readonly AutoFixResult[] {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  const results: AutoFixResult[] = [];

  for (const [slug, entry] of Object.entries(
    knowledge,
  )) {
    const fixes: string[] = [];

    // Fix 1: Missing FAQ
    const f1 = fixMissingFAQ(slug, entry);
    if (f1) fixes.push(f1);

    // Fix 2: Missing Evidence
    const f2 = fixMissingEvidence(entry);
    if (f2) fixes.push(f2);

    // Fix 3: Missing Related Calculators
    const f3 = fixMissingRelated(entry, knowledge);
    if (f3) fixes.push(f3);

    // Fix 4: Missing Comparisons
    const f4 = fixMissingComparisons(
      entry,
      knowledge,
    );
    if (f4) fixes.push(f4);

    // Fix 5: Missing Clinical Guidance
    const f5 = fixMissingClinicalGuidance(entry);
    if (f5) fixes.push(f5);

    // Fix 6: Empty Classification Labels
    const f6 = fixEmptyClassificationLabel(entry);
    if (f6) fixes.push(f6);

    // Fix 7: Duplicate FAQ Questions
    const f7 = fixDuplicateFAQ(entry);
    if (f7) fixes.push(f7);

    // Fix 8: Duplicate Evidence References
    const f8 = fixDuplicateEvidence(entry);
    if (f8) fixes.push(f8);

    // Fix 9: Missing Description
    const f9 = fixMissingDescription(slug, entry);
    if (f9) fixes.push(f9);

    // Fix 10: Missing Classification
    const f10 = fixMissingClassification(entry);
    if (f10) fixes.push(f10);

    if (fixes.length > 0) {
      results.push({
        slug,
        fixesApplied: fixes,
        count: fixes.length,
      });
    }
  }

  return results;
}

/**
 * Print a formatted auto-fix report showing which
 * calculators were fixed and what was applied.
 */
export function printAutoFixReport(): void {
  const results = autoFixKnowledge();

  const totalFixes = results.reduce(
    (sum, r) => sum + r.count,
    0,
  );

  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  console.log("");
  console.log(line);
  console.log("          Auto-Fix Report");
  console.log(line);
  console.log("");

  console.log(
    `  Calculators Fixed: ${results.length}`,
  );
  console.log(
    `  Total Fixes Applied: ${totalFixes}`,
  );
  console.log("");

  if (results.length > 0) {
    console.log(thinLine);

    for (const result of results) {
      console.log(`  ${result.slug}`);
      for (const fix of result.fixesApplied) {
        console.log(`    ✓ ${fix}`);
      }
    }

    console.log("");
  }

  console.log(line);
  console.log("");
}