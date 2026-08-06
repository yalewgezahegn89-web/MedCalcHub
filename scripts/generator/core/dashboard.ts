import type { FormulaType } from "../../types";

import {
  calculatorKnowledge,
} from "../knowledge";

import type {
  CalculatorSuggestion,
} from "./calculator-intelligence";

import {
  validateCalculator,
} from "./validator";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface CoverageReport {
  total: number;
  formulaDistribution: Record<string, number>;
  metadataCoverage: {
    faq: number;
    evidence: number;
    clinicalNotes: number;
    comparisons: number;
    relatedCalculators: number;
    inputs: number;
    classification: number;
  };
  validationSummary: {
    totalErrors: number;
    totalWarnings: number;
    calculatorsWithErrors: number;
    calculatorsWithWarnings: number;
  };
  categoryCoverage: Record<string, number>;
  specialtyCoverage: Record<string, number>;
  problems: string[];
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

const VALID_FORMULA_TYPES: FormulaType[] = [
  "algebraic",
  "score",
  "lookup",
  "conditional",
  "converter",
  "composite",
  "descriptive",
];

function getFormulaType(
  entry: CalculatorSuggestion,
): string {
  const f = entry.formula;
  if (!f) return "none";
  if (typeof f === "string") return "algebraic";
  return f.type ?? "algebraic";
}

function countBy<T extends Record<string, unknown>>(
  entries: T[],
  keyFn: (item: T) => string,
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const entry of entries) {
    const key = keyFn(entry);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function formatCount(
  label: string,
  count: number,
  total: number,
): string {
  const pct =
    total > 0
      ? Math.round((count / total) * 100)
      : 0;
  const bar = "█".repeat(
    Math.round(pct / 5),
  );
  const empty = "░".repeat(20 - Math.round(pct / 5));
  return `  ${label.padEnd(22)} ${String(count).padStart(4)} (${String(pct).padStart(3)}%) ${bar}${empty}`;
}

// ─────────────────────────────────────────────────
// Core analysis
// ─────────────────────────────────────────────────

function analyze(): CoverageReport {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;
  const entries = Object.entries(knowledge);
  const total = entries.length;

  // Formula type distribution
  const formulaDistribution: Record<
    string,
    number
  > = {};
  for (const type of VALID_FORMULA_TYPES) {
    formulaDistribution[type] = 0;
  }
  formulaDistribution["none"] = 0;

  for (const [, entry] of entries) {
    const ft = getFormulaType(entry);
    formulaDistribution[ft] =
      (formulaDistribution[ft] ?? 0) + 1;
  }

  // Metadata coverage
  let faqCount = 0;
  let evidenceCount = 0;
  let clinicalNotesCount = 0;
  let comparisonCount = 0;
  let relatedCount = 0;
  let inputsCount = 0;
  let classificationCount = 0;

  for (const [, entry] of entries) {
    if (
      entry.faq &&
      Array.isArray(entry.faq) &&
      entry.faq.length > 0
    )
      faqCount++;
    if (entry.evidence) evidenceCount++;
    if (entry.description) clinicalNotesCount++;
    if (entry.comparison) comparisonCount++;
    if (
      entry.relatedCalculators &&
      Array.isArray(entry.relatedCalculators) &&
      entry.relatedCalculators.length > 0
    )
      relatedCount++;
    if (
      entry.inputs &&
      Array.isArray(entry.inputs) &&
      entry.inputs.length > 0
    )
      inputsCount++;
    if (
      entry.classification &&
      Array.isArray(entry.classification) &&
      entry.classification.length > 0
    )
      classificationCount++;
  }

  // Validation summary
  let totalErrors = 0;
  let totalWarnings = 0;
  let calcsWithErrors = 0;
  let calcsWithWarnings = 0;

  for (const [, entry] of entries) {
    const result = validateCalculator({
      name: entry.description ?? "",
      inputs: entry.inputs as any,
      formula: entry.formula as any,
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    if (result.errors.length > 0) calcsWithErrors++;
    if (result.warnings.length > 0)
      calcsWithWarnings++;
  }

  // Category and specialty coverage
  const catCounts: Record<string, number> = {};
  const specCounts: Record<string, number> = {};
  for (const [, entry] of entries) {
    const cat =
      entry.category ?? "Uncategorized";
    catCounts[cat] = (catCounts[cat] ?? 0) + 1;

    const spec =
      entry.specialty ?? "Unspecified";
    specCounts[spec] =
      (specCounts[spec] ?? 0) + 1;
  }

  // Potential problems
  const problems: string[] = [];

  // Duplicate slugs (not possible with Record, but
  // check for slug-like collisions)
  const slugs = entries.map(([k]) => k);
  const slugSet = new Set(slugs);
  if (slugs.length > slugSet.size) {
    problems.push(
      `⚠ ${slugs.length - slugSet.size} duplicate calculator slugs detected`,
    );
  }

  // Missing metadata
  const noDescription = entries.filter(
    ([, e]) => !e.description,
  ).length;
  if (noDescription > 0) {
    problems.push(
      `⚠ ${noDescription} calculator(s) missing description`,
    );
  }

  const noFormula = entries.filter(
    ([, e]) => !e.formula,
  ).length;
  if (noFormula > 0) {
    problems.push(
      `⚠ ${noFormula} calculator(s) missing formula`,
    );
  }

  const noInputs = entries.filter(
    ([, e]) =>
      !e.inputs ||
      !Array.isArray(e.inputs) ||
      e.inputs.length === 0,
  ).length;
  if (noInputs > 0) {
    problems.push(
      `⚠ ${noInputs} calculator(s) missing inputs`,
    );
  }

  const noFaq = entries.length - faqCount;
  if (noFaq > 0) {
    problems.push(
      `⚠ ${noFaq} calculator(s) missing FAQ`,
    );
  }

  const noEvidence = entries.length - evidenceCount;
  if (noEvidence > 0) {
    problems.push(
      `⚠ ${noEvidence} calculator(s) missing evidence`,
    );
  }

  const noComparison =
    entries.length - comparisonCount;
  if (noComparison > 0) {
    problems.push(
      `⚠ ${noComparison} calculator(s) missing comparisons`,
    );
  }

  const noRelated =
    entries.length - relatedCount;
  if (noRelated > 0) {
    problems.push(
      `⚠ ${noRelated} calculator(s) missing related calculators`,
    );
  }

  return {
    total,
    formulaDistribution,
    metadataCoverage: {
      faq: faqCount,
      evidence: evidenceCount,
      clinicalNotes: clinicalNotesCount,
      comparisons: comparisonCount,
      relatedCalculators: relatedCount,
      inputs: inputsCount,
      classification: classificationCount,
    },
    validationSummary: {
      totalErrors,
      totalWarnings,
      calculatorsWithErrors: calcsWithErrors,
      calculatorsWithWarnings: calcsWithWarnings,
    },
    categoryCoverage: catCounts,
    specialtyCoverage: specCounts,
    problems,
  };
}

// ─────────────────────────────────────────────────
// Report printer
// ─────────────────────────────────────────────────

/**
 * Generate and print the knowledge coverage report
 * to the console.
 */
export function printCoverageReport(): void {
  const report = analyze();
  const t = report.total;

  console.log("");
  console.log("═══════════════════════════════════════");
  console.log("       Knowledge Coverage Report");
  console.log("═══════════════════════════════════════");

  // ── Total ──────────────────────────────────────
  console.log("");
  console.log(`📊 Total Calculators: ${t}`);

  // ── Formula Type Distribution ──────────────────
  console.log("");
  console.log("📐 Formula Type Distribution:");
  for (const [type, count] of Object.entries(
    report.formulaDistribution,
  ).sort((a, b) => b[1] - a[1])) {
    if (count > 0) {
      console.log(
        formatCount(type, count, t),
      );
    }
  }

  // ── Metadata Coverage ─────────────────────────
  console.log("");
  console.log("📋 Metadata Coverage:");
  const mc = report.metadataCoverage;
  console.log(
    formatCount("FAQ", mc.faq, t),
  );
  console.log(
    formatCount("Evidence", mc.evidence, t),
  );
  console.log(
    formatCount(
      "Clinical Notes",
      mc.clinicalNotes,
      t,
    ),
  );
  console.log(
    formatCount("Comparisons", mc.comparisons, t),
  );
  console.log(
    formatCount(
      "Related Calculators",
      mc.relatedCalculators,
      t,
    ),
  );
  console.log(
    formatCount(
      "Inputs Defined",
      mc.inputs,
      t,
    ),
  );
  console.log(
    formatCount(
      "Classification",
      mc.classification,
      t,
    ),
  );

  // ── Validation Summary ────────────────────────
  console.log("");
  console.log("🔍 Validation Summary:");
  const vs = report.validationSummary;
  console.log(
    `  Errors:                   ${vs.totalErrors} across ${vs.calculatorsWithErrors} calculator(s)`,
  );
  console.log(
    `  Warnings:                 ${vs.totalWarnings} across ${vs.calculatorsWithWarnings} calculator(s)`,
  );

  // ── Category Coverage ─────────────────────────
  console.log("");
  console.log("🏷  Category Coverage:");
  const sortedCats = Object.entries(
    report.categoryCoverage,
  ).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCats) {
    console.log(
      formatCount(cat, count, t),
    );
  }

  // ── Specialty Coverage ────────────────────────
  console.log("");
  console.log("🩺 Specialty Coverage:");
  const sortedSpecs = Object.entries(
    report.specialtyCoverage,
  ).sort((a, b) => b[1] - a[1]);
  for (const [spec, count] of sortedSpecs) {
    console.log(
      formatCount(spec, count, t),
    );
  }

  // ── Potential Problems ────────────────────────
  console.log("");
  console.log("⚡ Potential Problems:");
  if (report.problems.length === 0) {
    console.log("  ✅ No issues detected");
  } else {
    for (const problem of report.problems) {
      console.log(`  ${problem}`);
    }
  }

  console.log("");
  console.log("═══════════════════════════════════════");
  console.log("");
}