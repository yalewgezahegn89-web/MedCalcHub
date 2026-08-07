/**
 * Impact Analysis Engine
 *
 * Determines what parts of the MedCalcHub ecosystem
 * are affected whenever a calculator or knowledge
 * definition changes.
 *
 * This engine performs analysis only. It must NOT
 * modify calculators, templates, parser, dispatcher,
 * formula builders, or UI.
 */

import {
  calculatorKnowledge,
} from "../knowledge";
import {
  buildDependencyGraph,
} from "./dependency-graph";
import type {
  DependencyGraph,
} from "./dependency-graph";
import {
  buildNavigation,
} from "./navigation";
import {
  buildRecommendations,
} from "./recommendation-engine";
import type {
  CalculatorSuggestion,
} from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────

export interface ImpactResult {
  calculator: string;
  affected: {
    generatedCalculator: boolean;
    tests: boolean;
    navigation: boolean;
    seo: boolean;
    recommendations: boolean;
    dependencyGraph: boolean;
    documentation: boolean;
    relatedCalculators: string[];
    comparisonCalculators: string[];
  };
  totalImpactScore: number;
}

export interface ImpactMap {
  calculators: Record<string, ImpactResult>;
}

// ─────────────────────────────────────────────────
// Scoring Weights
// ─────────────────────────────────────────────────

const WEIGHTS = {
  generatedCalculator: 20,
  tests: 10,
  navigation: 10,
  seo: 5,
  recommendations: 10,
  dependencyGraph: 15,
  documentation: 5,
  relatedCalculator: 3,
  comparisonCalculator: 5,
} as const;

const MAX_SCORE = 100;

// ─────────────────────────────────────────────────
// Impact Analyzer
// ─────────────────────────────────────────────────

/**
 * Analyze impact for all calculators.
 */
export function analyzeImpact(): ImpactMap {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  const graph: DependencyGraph =
    buildDependencyGraph();

  const navigation = buildNavigation();
  const recommendations =
    buildRecommendations();

  // Build reverse index: which calculators
  // reference this calculator as a recommendation
  const recommendedBy: Record<
    string,
    Set<string>
  > = {};

  for (const [
    slug,
    recResult,
  ] of Object.entries(
    recommendations.calculators,
  )) {
    for (const rec of recResult.recommendations) {
      if (!recommendedBy[rec.slug]) {
        recommendedBy[rec.slug] = new Set();
      }
      recommendedBy[rec.slug].add(slug);
    }
  }

  const allSlugs = Object.keys(knowledge).sort();
  const calculators: Record<
    string,
    ImpactResult
  > = {};

  for (const slug of allSlugs) {
    const entry = knowledge[slug];
    const node = graph.nodes[slug];
    const nav =
      navigation.calculators[slug];

    // ── Related Calculators ──
    const relatedSet = new Set<string>();
    if (entry.relatedCalculators) {
      for (const rel of entry.relatedCalculators) {
        if (rel !== slug && allSlugs.includes(rel)) {
          relatedSet.add(rel);
        }
      }
    }

    // Also include dependency graph relationships
    if (node) {
      for (const rel of [
        ...node.related,
        ...node.parents,
        ...node.children,
      ]) {
        if (rel !== slug && allSlugs.includes(rel)) {
          relatedSet.add(rel);
        }
      }
    }
    const relatedCalculators = [
      ...relatedSet,
    ].sort();

    // ── Comparison Calculators ──
    const comparisonSet = new Set<string>();
    if (
      entry.comparison &&
      entry.comparison.calculators
    ) {
      for (const comp of entry.comparison
        .calculators) {
        const compId = comp.id ?? "";
        if (
          compId &&
          compId !== slug &&
          allSlugs.includes(compId)
        ) {
          comparisonSet.add(compId);
        }
      }
    }
    const comparisonCalculators = [
      ...comparisonSet,
    ].sort();

    // ── Affected flags ──
    const generatedCalculator = true;
    const tests = true;
    const documentation = true;
    const seo = true;

    const navigationAffected =
      !!nav &&
      (nav.related.length > 0 ||
        (nav.previous !== undefined) ||
        (nav.next !== undefined));

    const recommendationsAffected =
      !!recommendedBy[slug] &&
      recommendedBy[slug].size > 0;

    const dependencyGraphAffected =
      !!node &&
      (node.parents.length > 0 ||
        node.children.length > 0);

    // ── Score ──
    let score = 0;

    score += WEIGHTS.generatedCalculator;
    score += WEIGHTS.tests;
    score += WEIGHTS.documentation;
    score += WEIGHTS.seo;

    if (navigationAffected) {
      score += WEIGHTS.navigation;
    }
    if (recommendationsAffected) {
      score += WEIGHTS.recommendations;
    }
    if (dependencyGraphAffected) {
      score += WEIGHTS.dependencyGraph;
    }

    score +=
      relatedCalculators.length *
      WEIGHTS.relatedCalculator;
    score +=
      comparisonCalculators.length *
      WEIGHTS.comparisonCalculator;

    const totalImpactScore = Math.min(
      score,
      MAX_SCORE,
    );

    calculators[slug] = {
      calculator: slug,
      affected: {
        generatedCalculator,
        tests,
        navigation: navigationAffected,
        seo,
        recommendations: recommendationsAffected,
        dependencyGraph: dependencyGraphAffected,
        documentation,
        relatedCalculators,
        comparisonCalculators,
      },
      totalImpactScore,
    };
  }

  return { calculators };
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

/**
 * Convert a slug like "anion-gap" to "Anion Gap".
 */
function formatDisplayName(
  slug: string,
): string {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

// ─────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────

/**
 * Print a formatted impact analysis report
 * to the console.
 */
export function printImpactReport(): void {
  const map = analyzeImpact();

  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  const slugs =
    Object.keys(map.calculators).sort();

  // Compute stats
  let totalScore = 0;
  let highestScore = 0;
  let highestSlug = "";
  let lowestScore = Infinity;
  let lowestSlug = "";
  let mostConnectedSlug = "";
  let mostConnectedCount = 0;

  for (const slug of slugs) {
    const entry = map.calculators[slug];
    const score = entry.totalImpactScore;
    totalScore += score;

    if (score > highestScore) {
      highestScore = score;
      highestSlug = slug;
    }
    if (score < lowestScore) {
      lowestScore = score;
      lowestSlug = slug;
    }

    const connectionCount =
      entry.affected.relatedCalculators.length +
      entry.affected.comparisonCalculators.length;

    if (connectionCount > mostConnectedCount) {
      mostConnectedCount = connectionCount;
      mostConnectedSlug = slug;
    }
  }

  const avgImpact =
    slugs.length > 0
      ? Math.round(
          (totalScore / slugs.length) * 10,
        ) / 10
      : 0;

  // Top 10 highest impact
  const sorted = [...slugs].sort(
    (a, b) =>
      map.calculators[b].totalImpactScore -
      map.calculators[a].totalImpactScore,
  );

  console.log("");
  console.log(line);
  console.log("  Impact Analysis Report");
  console.log(line);
  console.log("");
  console.log(
    `  Highest Impact Calculator    ${formatDisplayName(highestSlug)} (${highestScore})`,
  );
  console.log(
    `  Lowest Impact Calculator     ${formatDisplayName(lowestSlug)} (${lowestScore})`,
  );
  console.log(
    `  Average Impact               ${avgImpact}`,
  );
  console.log(
    `  Most Connected               ${formatDisplayName(mostConnectedSlug)} (${mostConnectedCount})`,
  );
  console.log("");
  console.log(thinLine);
  console.log("  Top 10 Highest Impact");
  console.log(thinLine);

  for (
    let i = 0;
    i < Math.min(10, sorted.length);
    i++
  ) {
    const slug = sorted[i];
    const entry = map.calculators[slug];
    console.log(
      `  ${String(i + 1).padStart(2)}. ${formatDisplayName(slug)} (${entry.totalImpactScore})`,
    );
  }

  console.log("");
  console.log(line);
  console.log("");
}