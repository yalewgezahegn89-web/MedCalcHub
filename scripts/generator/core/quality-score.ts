/**
 * Knowledge Quality Score Engine
 *
 * Assigns a quality score (0–100) to every calculator
 * knowledge definition and produces a library quality
 * report.
 *
 * Each calculator starts at 100 and deductions are
 * applied for deficiencies. Score is clamped to [0, 100].
 */

import type {
  CalculatorSuggestion,
  ClassificationRule,
} from "./calculator-intelligence";

import {
  calculatorKnowledge,
} from "../knowledge";

import {
  validateKnowledge,
} from "./knowledge-validator";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface QualityResult {
  slug: string;
  score: number;
  grade: string;
  deductions: number;
  issues: string[];
}

interface GradeBand {
  min: number;
  max: number;
  grade: string;
}

const GRADE_BANDS: GradeBand[] = [
  { min: 95, max: 100, grade: "A+" },
  { min: 90, max: 94, grade: "A" },
  { min: 85, max: 89, grade: "B+" },
  { min: 80, max: 84, grade: "B" },
  { min: 70, max: 79, grade: "C" },
  { min: 60, max: 69, grade: "D" },
  { min: 0, max: 59, grade: "F" },
];

// ─────────────────────────────────────────────────
// Grade assignment
// ─────────────────────────────────────────────────

function assignGrade(score: number): string {
  for (const band of GRADE_BANDS) {
    if (score >= band.min && score <= band.max) {
      return band.grade;
    }
  }
  return "F";
}

// ─────────────────────────────────────────────────
// Clamp
// ─────────────────────────────────────────────────

function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, value));
}

// ─────────────────────────────────────────────────
// Calculate quality for a single calculator
// ─────────────────────────────────────────────────

function calculateSingleQuality(
  slug: string,
  knowledge: CalculatorSuggestion,
  validationErrors: number,
  validationWarnings: number,
): QualityResult {
  let score = 100;
  const issues: string[] = [];

  // Rule: Description missing (-15)
  if (
    !knowledge.description ||
    knowledge.description.trim() === ""
  ) {
    score -= 15;
    issues.push("Missing description (-15)");
  }

  // Rule: Inputs missing (-20)
  if (
    !knowledge.inputs ||
    knowledge.inputs.length === 0
  ) {
    score -= 20;
    issues.push("Missing inputs (-20)");
  }

  // Rule: Formula missing (-20)
  if (!knowledge.formula) {
    score -= 20;
    issues.push("Formula missing (-20)");
  }

  // Rule: Evidence missing (-5)
  if (
    !knowledge.evidence ||
    Object.keys(knowledge.evidence).length === 0
  ) {
    score -= 5;
    issues.push("Evidence missing (-5)");
  }

  // Rule: FAQ missing (-5)
  if (
    !knowledge.faq ||
    knowledge.faq.length === 0
  ) {
    score -= 5;
    issues.push("FAQ missing (-5)");
  }

  // Rule: Related calculators missing (-3)
  if (
    !knowledge.relatedCalculators ||
    knowledge.relatedCalculators.length === 0
  ) {
    score -= 3;
    issues.push(
      "Related calculators missing (-3)",
    );
  }

  // Rule: Comparisons missing (-3)
  if (
    !knowledge.comparison ||
    !knowledge.comparison.calculators ||
    knowledge.comparison.calculators.length === 0
  ) {
    score -= 3;
    issues.push("Comparisons missing (-3)");
  }

  // Rule: Clinical guidance missing (-5)
  if (!knowledge.clinicalGuidance) {
    score -= 5;
    issues.push(
      "Clinical guidance missing (-5)",
    );
  } else {
    const cg = knowledge.clinicalGuidance;
    const hasAny =
      (cg.advice && cg.advice.length > 0) ||
      (cg.warnings && cg.warnings.length > 0) ||
      (cg.followUp && cg.followUp.length > 0);
    if (!hasAny) {
      score -= 5;
      issues.push(
        "Clinical guidance missing (-5)",
      );
    }
  }

  // Rule: Classification missing (-8)
  if (
    !knowledge.classification ||
    knowledge.classification.length === 0
  ) {
    score -= 8;
    issues.push("Classification missing (-8)");
  }

  // Rule: Validation warning (-2 each)
  if (validationWarnings > 0) {
    const deduction = validationWarnings * 2;
    score -= deduction;
    issues.push(
      `Validation warnings: ${validationWarnings} (-${deduction})`,
    );
  }

  // Rule: Validation error (-10 each)
  if (validationErrors > 0) {
    const deduction = validationErrors * 10;
    score -= deduction;
    issues.push(
      `Validation errors: ${validationErrors} (-${deduction})`,
    );
  }

  // Rule: Duplicate FAQ (-2)
  if (knowledge.faq && knowledge.faq.length > 1) {
    const seen = new Set<string>();
    let dupCount = 0;
    for (const item of knowledge.faq) {
      const q = item.question.toLowerCase().trim();
      if (seen.has(q)) {
        dupCount++;
      }
      seen.add(q);
    }
    if (dupCount > 0) {
      score -= 2;
      issues.push(
        `Duplicate FAQ questions: ${dupCount} (-2)`,
      );
    }
  }

  // Rule: Duplicate Evidence (-2)
  if (
    knowledge.evidence &&
    knowledge.evidence.references &&
    knowledge.evidence.references.length > 1
  ) {
    const seen = new Set<string>();
    let dupCount = 0;
    for (const ref of knowledge.evidence
      .references) {
      const norm = ref.toLowerCase().trim();
      if (seen.has(norm)) {
        dupCount++;
      }
      seen.add(norm);
    }
    if (dupCount > 0) {
      score -= 2;
      issues.push(
        `Duplicate evidence references: ${dupCount} (-2)`,
      );
    }
  }

  // Rule: Broken Related Calculator (-5)
  if (knowledge.relatedCalculators) {
    const knownSlugs = new Set(
      Object.keys(calculatorKnowledge),
    );
    let brokenCount = 0;
    for (const rel of knowledge
      .relatedCalculators) {
      if (!knownSlugs.has(rel)) {
        brokenCount++;
      }
    }
    if (brokenCount > 0) {
      score -= 5;
      issues.push(
        `Broken related calculators: ${brokenCount} (-5)`,
      );
    }
  }

  // Rule: Broken Comparison Calculator (-5)
  if (
    knowledge.comparison &&
    knowledge.comparison.calculators
  ) {
    const knownSlugs = new Set(
      Object.keys(calculatorKnowledge),
    );
    let brokenCount = 0;
    for (const comp of knowledge.comparison
      .calculators) {
      const compId = comp.id ?? "";
      if (compId && !knownSlugs.has(compId)) {
        brokenCount++;
      }
    }
    if (brokenCount > 0) {
      score -= 5;
      issues.push(
        `Broken comparison calculators: ${brokenCount} (-5)`,
      );
    }
  }

  // Clamp to [0, 100]
  score = clamp(score, 0, 100);

  const deductions = 100 - score;

  return {
    slug,
    score,
    grade: assignGrade(score),
    deductions,
    issues,
  };
}

// ─────────────────────────────────────────────────
// Public: Calculate knowledge quality for all
// ─────────────────────────────────────────────────

/**
 * Calculate quality scores for every calculator
 * knowledge definition.
 *
 * Returns an array of QualityResult sorted by
 * score descending.
 */
export function calculateKnowledgeQuality(): readonly QualityResult[] {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  // Run knowledge validator to get error/warning
  // counts per calculator
  const validation = validateKnowledge();

  // Count errors/warnings per calculator path
  const errorCounts = new Map<string, number>();
  const warnCounts = new Map<string, number>();

  for (const e of validation.errors) {
    const path = e.path ?? "";
    errorCounts.set(
      path,
      (errorCounts.get(path) ?? 0) + 1,
    );
  }

  for (const w of validation.warnings) {
    const path = w.path ?? "";
    warnCounts.set(
      path,
      (warnCounts.get(path) ?? 0) + 1,
    );
  }

  const results: QualityResult[] = [];

  for (const [slug, entry] of Object.entries(
    knowledge,
  )) {
    const errors = errorCounts.get(slug) ?? 0;
    const warnings = warnCounts.get(slug) ?? 0;

    results.push(
      calculateSingleQuality(
        slug,
        entry,
        errors,
        warnings,
      ),
    );
  }

  // Sort by score descending, then alphabetically
  results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.slug.localeCompare(b.slug);
  });

  return results;
}

// ─────────────────────────────────────────────────
// Public: Print library quality report
// ─────────────────────────────────────────────────

/**
 * Print a formatted library quality report
 * showing overall stats, top/bottom calculators,
 * and grade distribution.
 */
export function printQualityReport(): void {
  const results = calculateKnowledgeQuality();

  if (results.length === 0) {
    console.log(
      "\n📚 No calculators to evaluate.",
    );
    return;
  }

  // Compute stats
  const totalScore = results.reduce(
    (sum, r) => sum + r.score,
    0,
  );
  const avgScore = totalScore / results.length;

  const scores = results.map((r) => r.score);
  const sortedScores = [...scores].sort(
    (a, b) => a - b,
  );
  const mid = Math.floor(
    sortedScores.length / 2,
  );
  const medianScore =
    sortedScores.length % 2 === 0
      ? (sortedScores[mid - 1] + sortedScores[mid]) /
        2
      : sortedScores[mid];

  const highestScore = sortedScores.at(-1) ?? 0;
  const lowestScore = sortedScores.at(0) ?? 0;

  const overallGrade =
    assignGrade(Math.round(avgScore));

  // Grade distribution
  const dist: Record<string, number> = {
    "A+": 0,
    A: 0,
    "B+": 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };
  for (const r of results) {
    dist[r.grade] = (dist[r.grade] ?? 0) + 1;
  }

  // Top quality (score >= 90)
  const top = results.filter(
    (r) => r.score >= 90,
  );

  // Needs attention (score < 80)
  const needs = results.filter(
    (r) => r.score < 80,
  );

  // Print report
  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  console.log("");
  console.log(line);
  console.log(
    "        Knowledge Quality Report",
  );
  console.log(line);
  console.log("");

  console.log(
    `  Overall Library Score   ${Math.round(avgScore)}%`,
  );
  console.log(`  Grade                  ${overallGrade}`);
  console.log("");

  console.log(thinLine);
  console.log("  Top Quality Calculators");
  console.log(thinLine);

  for (const r of top.slice(0, 10)) {
    const dots = ".".repeat(
      Math.max(
        1,
        40 - r.slug.length - 3,
      ),
    );
    console.log(
      `  ${r.slug} ${dots} ${r.score} ${r.grade}`,
    );
  }
  console.log("");

  if (needs.length > 0) {
    console.log(thinLine);
    console.log("  Needs Attention");
    console.log(thinLine);

    for (const r of needs) {
      const dots = ".".repeat(
        Math.max(
          1,
          40 - r.slug.length - 3,
        ),
      );
      console.log(
        `  ${r.slug} ${dots} ${r.score} ${r.grade}`,
      );
    }
    console.log("");
  }

  console.log(thinLine);
  console.log("  Statistics");
  console.log(thinLine);

  console.log(
    `  Average Score      ${avgScore.toFixed(1)}`,
  );
  console.log(
    `  Median Score       ${medianScore}`,
  );
  console.log(
    `  Highest            ${highestScore}`,
  );
  console.log(
    `  Lowest             ${lowestScore}`,
  );
  console.log(
    `  Total Calculators  ${results.length}`,
  );
  console.log("");

  console.log(thinLine);
  console.log("  Distribution");
  console.log(thinLine);

  for (const [grade, count] of Object.entries(
    dist,
  )) {
    const padded = grade.padEnd(3);
    console.log(
      `  ${padded}: ${String(count).padStart(2)}`,
    );
  }

  console.log("");
  console.log(line);
  console.log("");
}