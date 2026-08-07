/**
 * Automatic Navigation Engine
 *
 * Builds intelligent navigation metadata for every
 * calculator using the existing Dependency Graph.
 *
 * This engine MUST NOT modify calculator logic,
 * templates, parser, dispatcher, or formula builders.
 * It only generates navigation metadata.
 */

import {
  buildDependencyGraph,
} from "./dependency-graph";
import type {
  DependencyGraph,
} from "./dependency-graph";

// ─────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────

export interface CalculatorNavigation {
  previous?: string;
  next?: string;
  related: string[];
  breadcrumbs: string[];
  seeAlso: string[];
}

export interface NavigationMap {
  calculators: Record<
    string,
    CalculatorNavigation
  >;
}

// ─────────────────────────────────────────────────
// Navigation Builder
// ─────────────────────────────────────────────────

/**
 * Build the full navigation map for all calculators.
 *
 * Rules:
 * - Previous / Next: alphabetical within each category
 * - Related: dependency graph → relatedCalculators → same category (max 5)
 * - Breadcrumbs: Home → Category → Specialty → Name
 * - See Also: same specialty, same category, not in Related (max 5)
 *
 * All arrays are sorted alphabetically. No duplicates.
 * Never includes itself.
 */
export function buildNavigation(): NavigationMap {
  const graph: DependencyGraph =
    buildDependencyGraph();

  // Group slugs by category for prev/next
  const byCategory: Record<
    string,
    string[]
  > = {};

  for (const [slug, node] of Object.entries(
    graph.nodes,
  )) {
    const cat = node.category || "Unknown";
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    byCategory[cat].push(slug);
  }

  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort();
  }

  // Build a map from slug to category for quick lookup
  const slugToCategory: Record<
    string,
    string
  > = {};

  for (const [slug, node] of Object.entries(
    graph.nodes,
  )) {
    slugToCategory[slug] =
      node.category || "Unknown";
  }

  // Build a map from slug to specialty for quick lookup
  const slugToSpecialty: Record<
    string,
    string
  > = {};

  for (const [slug, node] of Object.entries(
    graph.nodes,
  )) {
    slugToSpecialty[slug] =
      node.specialty || "";
  }

  const calculators: Record<
    string,
    CalculatorNavigation
  > = {};

  // Sort slugs for deterministic iteration order
  const allSlugs =
    Object.keys(graph.nodes).sort();

  for (const slug of allSlugs) {
    const node = graph.nodes[slug];

    // ── Previous / Next ──
    const category = slugToCategory[slug] || "";
    const siblings =
      byCategory[category] || [];
    const idx = siblings.indexOf(slug);

    const previous =
      idx > 0
        ? siblings[idx - 1]
        : undefined;
    const next =
      idx < siblings.length - 1
        ? siblings[idx + 1]
        : undefined;

    // ── Related ──
    // Priority: 1. dependency graph relationships
    //           2. existing relatedCalculators
    //           3. same category
    // Max 5. Never include itself. Never duplicate.
    const relatedSet = new Set<string>();

    // 1. Dependency graph relationships
    // (related + comparisons + parents + children)
    const depRelated = [
      ...node.related,
      ...node.comparisons,
      ...node.parents,
      ...node.children,
    ];

    for (const rel of depRelated) {
      if (
        rel !== slug &&
        graph.nodes[rel]
      ) {
        relatedSet.add(rel);
      }
    }

    // 2. Existing relatedCalculators from knowledge
    // (already captured in dependency graph via node.related,
    //  but we also check node.parents and node.children which
    //  cover comparisons too)

    // 3. Same category (fill remaining up to 5)
    if (relatedSet.size < 5) {
      const categorySlugs =
        byCategory[category] || [];
      for (const catSlug of categorySlugs) {
        if (
          relatedSet.size >= 5
        ) {
          break;
        }
        if (
          catSlug !== slug &&
          !relatedSet.has(catSlug)
        ) {
          relatedSet.add(catSlug);
        }
      }
    }

    const related = [...relatedSet]
      .slice(0, 5)
      .sort();

    // ── Breadcrumbs ──
    const specialty =
      slugToSpecialty[slug] || "";
    const displayName =
      formatDisplayName(slug);

    const breadcrumbs: string[] = [
      "Home",
      category,
    ];

    if (
      specialty &&
      specialty !== category
    ) {
      breadcrumbs.push(specialty);
    }

    breadcrumbs.push(displayName);

    // ── See Also ──
    // Same specialty + same category, not in Related
    // Max 5
    const seeAlsoSet = new Set<string>();

    // Same specialty
    if (specialty) {
      for (const otherSlug of allSlugs) {
        if (
          seeAlsoSet.size >= 5
        ) {
          break;
        }
        if (
          otherSlug !== slug &&
          !relatedSet.has(otherSlug) &&
          slugToSpecialty[otherSlug] ===
            specialty
        ) {
          seeAlsoSet.add(otherSlug);
        }
      }
    }

    // Same category (fill remaining)
    if (seeAlsoSet.size < 5) {
      const categorySlugs =
        byCategory[category] || [];
      for (const catSlug of categorySlugs) {
        if (
          seeAlsoSet.size >= 5
        ) {
          break;
        }
        if (
          catSlug !== slug &&
          !relatedSet.has(catSlug) &&
          !seeAlsoSet.has(catSlug)
        ) {
          seeAlsoSet.add(catSlug);
        }
      }
    }

    const seeAlso = [...seeAlsoSet]
      .slice(0, 5)
      .sort();

    calculators[slug] = {
      previous,
      next,
      related,
      breadcrumbs,
      seeAlso,
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
 * Print a formatted navigation report to the console.
 */
export function printNavigationReport(): void {
  const nav = buildNavigation();

  const line = "═".repeat(50);

  const slugs =
    Object.keys(nav.calculators).sort();
  const count = slugs.length;

  let totalRelated = 0;
  let totalBreadcrumbDepth = 0;
  let totalSeeAlso = 0;
  let orphanCount = 0;

  for (const slug of slugs) {
    const entry = nav.calculators[slug];
    totalRelated += entry.related.length;
    totalBreadcrumbDepth +=
      entry.breadcrumbs.length;
    totalSeeAlso += entry.seeAlso.length;

    // An "orphan" in navigation has no related
    // and no seeAlso links
    if (
      entry.related.length === 0 &&
      entry.seeAlso.length === 0
    ) {
      orphanCount++;
    }
  }

  const avgRelated =
    count > 0
      ? Math.round(
          (totalRelated / count) * 10,
        ) / 10
      : 0;
  const avgBreadcrumbDepth =
    count > 0
      ? Math.round(
          (totalBreadcrumbDepth / count) * 10,
        ) / 10
      : 0;
  const avgSeeAlso =
    count > 0
      ? Math.round(
          (totalSeeAlso / count) * 10,
        ) / 10
      : 0;

  console.log("");
  console.log(line);
  console.log("  Navigation Report");
  console.log(line);
  console.log("");

  console.log(
    `  Calculators Processed     ${count}`,
  );
  console.log(
    `  Average Related Links     ${avgRelated}`,
  );
  console.log(
    `  Average Breadcrumb Depth  ${avgBreadcrumbDepth}`,
  );
  console.log(
    `  Average See Also Links    ${avgSeeAlso}`,
  );
  console.log(
    `  Orphan Navigation         ${orphanCount === 0 ? "None" : orphanCount}`,
  );
  console.log("");
  console.log(line);
  console.log("");
}