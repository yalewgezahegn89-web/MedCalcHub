/**
 * Recommendation Engine
 *
 * Scores and ranks calculators based on medical
 * relevance using the Knowledge Graph, Dependency
 * Graph, and Navigation Engine.
 *
 * This engine MUST NOT modify generated calculators,
 * templates, parser, dispatcher, formula builders,
 * or UI.
 *
 * It only analyzes the knowledge graph and generates
 * recommendation metadata.
 */

import {
  calculatorKnowledge,
} from "../knowledge";
import {
  buildDependencyGraph,
} from "./dependency-graph";
import type {
  DependencyGraph,
  CalculatorNode,
} from "./dependency-graph";
import type {
  CalculatorSuggestion,
} from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────

export interface Recommendation {
  slug: string;
  score: number;
  reasons: string[];
}

export interface RecommendationResult {
  calculator: string;
  recommendations: Recommendation[];
}

export interface RecommendationMap {
  calculators: Record<
    string,
    RecommendationResult
  >;
}

// ─────────────────────────────────────────────────
// Scoring Weights
// ─────────────────────────────────────────────────

const WEIGHTS = {
  sharedInput: 40,
  sameSpecialty: 20,
  sameCategory: 15,
  relatedCalculator: 10,
  comparisonCalculator: 10,
  parent: 15,
  child: 15,
  sibling: 10,
  sharedEvidenceSource: 5,
  sharedClinicalGuidance: 5,
} as const;

const MAX_RECOMMENDATIONS = 5;
const MAX_SCORE = 100;

// ─────────────────────────────────────────────────
// Recommendation Builder
// ─────────────────────────────────────────────────

/**
 * Build recommendations for all calculators.
 *
 * Scores each candidate based on:
 * - Shared inputs (+40 per match)
 * - Same specialty (+20)
 * - Same category (+15)
 * - Related calculator (+10)
 * - Comparison calculator (+10)
 * - Parent in dependency graph (+15)
 * - Child in dependency graph (+15)
 * - Sibling in dependency graph (+10)
 * - Shared evidence source (+5)
 * - Shared clinical guidance (+5)
 *
 * Capped at 100. Top 5 kept. Sorted by score
 * descending, alphabetically for ties.
 */
export function buildRecommendations(): RecommendationMap {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  const graph: DependencyGraph =
    buildDependencyGraph();

  const allSlugs = Object.keys(knowledge).sort();

  // Build input ID index for quick shared-input lookup
  const inputIndex: Record<
    string,
    Set<string>
  > = {};

  for (const slug of allSlugs) {
    const entry = knowledge[slug];
    if (entry.inputs) {
      for (const inp of entry.inputs as readonly {
        id: string;
      }[]) {
        if (!inputIndex[inp.id]) {
          inputIndex[inp.id] = new Set();
        }
        inputIndex[inp.id].add(slug);
      }
    }
  }

  const calculators: Record<
    string,
    RecommendationResult
  > = {};

  for (const slug of allSlugs) {
    const entry = knowledge[slug];
    const node: CalculatorNode | undefined =
      graph.nodes[slug];

    const candidates =
      new Map<string, { score: number; reasons: string[] }>();

    function ensureCandidate(
      cSlug: string,
    ) {
      if (!candidates.has(cSlug)) {
        candidates.set(cSlug, {
          score: 0,
          reasons: [],
        });
      }
    }

    // ── Shared Inputs ──
    if (entry.inputs) {
      for (const inp of entry.inputs as readonly {
        id: string;
      }[]) {
        const users = inputIndex[inp.id];
        if (users) {
          for (const otherSlug of users) {
            if (
              otherSlug !== slug &&
              allSlugs.includes(otherSlug)
            ) {
              ensureCandidate(otherSlug);
              const c = candidates.get(
                otherSlug,
              )!;
              c.score += WEIGHTS.sharedInput;
              c.reasons.push(
                `Shares ${inp.id} input`,
              );
            }
          }
        }
      }
    }

    // ── Same Specialty ──
    const specialty = entry.specialty || "";
    if (specialty) {
      for (const otherSlug of allSlugs) {
        if (
          otherSlug !== slug &&
          knowledge[otherSlug]
            .specialty === specialty
        ) {
          ensureCandidate(otherSlug);
          const c = candidates.get(
            otherSlug,
          )!;
          c.score += WEIGHTS.sameSpecialty;
          c.reasons.push("Same specialty");
        }
      }
    }

    // ── Same Category ──
    const category = entry.category || "";
    if (category) {
      for (const otherSlug of allSlugs) {
        if (
          otherSlug !== slug &&
          knowledge[otherSlug]
            .category === category
        ) {
          ensureCandidate(otherSlug);
          const c = candidates.get(
            otherSlug,
          )!;
          c.score += WEIGHTS.sameCategory;
          c.reasons.push("Same category");
        }
      }
    }

    // ── Related Calculator ──
    if (entry.relatedCalculators) {
      for (const rel of entry.relatedCalculators) {
        if (
          allSlugs.includes(rel) &&
          rel !== slug
        ) {
          ensureCandidate(rel);
          const c = candidates.get(rel)!;
          c.score +=
            WEIGHTS.relatedCalculator;
          c.reasons.push(
            "Clinically related",
          );
        }
      }
    }

    // ── Comparison Calculator ──
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
          ensureCandidate(compId);
          const c = candidates.get(compId)!;
          c.score +=
            WEIGHTS.comparisonCalculator;
          c.reasons.push(
            "Comparison calculator",
          );
        }
      }
    }

    // ── Dependency Graph ──
    if (node) {
      // Parent
      for (const parent of node.parents) {
        if (parent !== slug) {
          ensureCandidate(parent);
          const c = candidates.get(parent)!;
          c.score += WEIGHTS.parent;
          c.reasons.push(
            "Parent in dependency graph",
          );
        }
      }

      // Child
      for (const child of node.children) {
        if (child !== slug) {
          ensureCandidate(child);
          const c = candidates.get(child)!;
          c.score += WEIGHTS.child;
          c.reasons.push(
            "Child in dependency graph",
          );
        }
      }

      // Siblings (same parent)
      for (const parent of node.parents) {
        const parentNode =
          graph.nodes[parent];
        if (parentNode) {
          for (const sib of parentNode.children) {
            if (
              sib !== slug &&
              !node.parents.includes(sib) &&
              !node.children.includes(sib)
            ) {
              ensureCandidate(sib);
              const c =
                candidates.get(sib)!;
              c.score += WEIGHTS.sibling;
              c.reasons.push(
                "Sibling in dependency graph",
              );
            }
          }
        }
      }
    }

    // ── Shared Evidence Source ──
    const evidenceSource =
      entry.evidence?.source || "";
    if (evidenceSource) {
      for (const otherSlug of allSlugs) {
        if (otherSlug !== slug) {
          const otherEntry =
            knowledge[otherSlug];
          if (
            otherEntry.evidence?.source ===
            evidenceSource
          ) {
            ensureCandidate(otherSlug);
            const c = candidates.get(
              otherSlug,
            )!;
            c.score +=
              WEIGHTS.sharedEvidenceSource;
            c.reasons.push(
              "Shared evidence source",
            );
          }
        }
      }
    }

    // ── Shared Clinical Guidance ──
    const hasGuidance =
      !!entry.clinicalGuidance;
    if (hasGuidance) {
      for (const otherSlug of allSlugs) {
        if (otherSlug !== slug) {
          const otherEntry =
            knowledge[otherSlug];
          if (otherEntry.clinicalGuidance) {
            ensureCandidate(otherSlug);
            const c = candidates.get(
              otherSlug,
            )!;
            c.score +=
              WEIGHTS.sharedClinicalGuidance;
            c.reasons.push(
              "Shared clinical guidance",
            );
          }
        }
      }
    }

    // ── Deduplicate reasons and cap score ──
    const ranked: Recommendation[] = [];

    for (const [
      cSlug,
      data,
    ] of candidates.entries()) {
      const uniqueReasons = [
        ...new Set(data.reasons),
      ];
      const cappedScore = Math.min(
        data.score,
        MAX_SCORE,
      );

      if (uniqueReasons.length > 0) {
        ranked.push({
          slug: cSlug,
          score: cappedScore,
          reasons: uniqueReasons,
        });
      }
    }

    // Sort: highest score first, alphabetically for ties
    ranked.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.slug.localeCompare(b.slug);
    });

    // Keep top 5
    const top = ranked.slice(
      0,
      MAX_RECOMMENDATIONS,
    );

    calculators[slug] = {
      calculator: slug,
      recommendations: top,
    };
  }

  return { calculators };
}

// ─────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────

/**
 * Print a formatted recommendation engine report
 * to the console.
 */
export function printRecommendationReport(): void {
  const map = buildRecommendations();

  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  const slugs =
    Object.keys(map.calculators).sort();
  const count = slugs.length;

  let totalRecs = 0;
  let highestScore = 0;
  let lowestScore = Infinity;
  let scoredCount = 0;

  const scoreMap: [string, number][] = [];

  for (const slug of slugs) {
    const entry = map.calculators[slug];
    totalRecs += entry.recommendations.length;

    for (const rec of entry.recommendations) {
      if (rec.score > highestScore) {
        highestScore = rec.score;
      }
      if (rec.score < lowestScore) {
        lowestScore = rec.score;
      }
      scoredCount++;
      scoreMap.push([slug, rec.score]);
    }
  }

  const avgRecs =
    count > 0
      ? Math.round(
          (totalRecs / count) * 10,
        ) / 10
      : 0;

  // Top connected calculators (by total score of their recommendations)
  const slugTotalScore: Record<
    string,
    number
  > = {};
  for (const slug of slugs) {
    const entry = map.calculators[slug];
    let total = 0;
    for (const rec of entry.recommendations) {
      total += rec.score;
    }
    slugTotalScore[slug] = total;
  }

  const topConnected = Object.entries(
    slugTotalScore,
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  console.log("");
  console.log(line);
  console.log(
    "  Recommendation Engine Report",
  );
  console.log(line);
  console.log("");
  console.log(
    `  Calculators Processed          ${count}`,
  );
  console.log(
    `  Average Recommendations        ${avgRecs}`,
  );
  console.log(
    `  Highest Recommendation Score   ${scoredCount > 0 ? highestScore : "N/A"}`,
  );
  console.log(
    `  Lowest Recommendation Score    ${scoredCount > 0 ? lowestScore : "N/A"}`,
  );
  console.log("");
  console.log(thinLine);
  console.log("  Top Connected Calculators");
  console.log(thinLine);

  for (const [
    slug,
    total,
  ] of topConnected) {
    const displayName = slug
      .split("-")
      .map(
        (w) =>
          w.charAt(0).toUpperCase() +
          w.slice(1),
      )
      .join(" ");
    console.log(
      `  ${displayName} (${total})`,
    );
  }

  console.log("");
  console.log(line);
  console.log("");
}