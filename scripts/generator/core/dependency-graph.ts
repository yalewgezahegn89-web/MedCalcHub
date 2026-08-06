/**
 * Dependency Graph Engine
 *
 * Analyzes relationships between all calculators and
 * produces a complete graph of dependencies.
 *
 * This engine MUST NOT modify calculators. It only
 * analyzes and reports relationships.
 */

import type {
  CalculatorSuggestion,
} from "./calculator-intelligence";

import {
  calculatorKnowledge,
} from "../knowledge";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface CalculatorNode {
  slug: string;
  category: string;
  specialty: string;
  related: string[];
  comparisons: string[];
  parents: string[];
  children: string[];
  references: string[];
}

export interface DependencyGraph {
  nodes: Record<string, CalculatorNode>;
  orphanCalculators: string[];
  circularDependencies: string[][];
  clusters: Record<string, string[]>;
  statistics: {
    totalCalculators: number;
    connectedCalculators: number;
    orphanCalculators: number;
    circularGroups: number;
    averageConnections: number;
  };
}

// ─────────────────────────────────────────────────
// Graph Construction
// ─────────────────────────────────────────────────

/**
 * Build the full dependency graph from the
 * calculator knowledge base.
 */
export function buildDependencyGraph(): DependencyGraph {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;

  const nodes: Record<
    string,
    CalculatorNode
  > = {};

  // Phase 1: Create all nodes
  for (const [slug, entry] of Object.entries(
    knowledge,
  )) {
    nodes[slug] = {
      slug,
      category: entry.category ?? "",
      specialty: entry.specialty ?? "",
      related: [],
      comparisons: [],
      parents: [],
      children: [],
      references: [],
    };
  }

  // Phase 2: Fill relationships from knowledge
  for (const [slug, entry] of Object.entries(
    knowledge,
  )) {
    const node = nodes[slug];

    // Related calculators
    if (entry.relatedCalculators) {
      for (const rel of entry.relatedCalculators) {
        if (
          nodes[rel] &&
          !node.related.includes(rel)
        ) {
          node.related.push(rel);
        }
      }
    }

    // Comparison calculators
    if (
      entry.comparison &&
      entry.comparison.calculators
    ) {
      for (const comp of entry.comparison
        .calculators) {
        const compId = comp.id ?? "";
        if (
          compId &&
          nodes[compId] &&
          !node.comparisons.includes(compId)
        ) {
          node.comparisons.push(compId);
        }
      }
    }
  }

  // Phase 3: Build parent/children (reciprocal)
  for (const [slug, node] of Object.entries(
    nodes,
  )) {
    // From related
    for (const rel of node.related) {
      if (nodes[rel]) {
        if (!nodes[rel].children.includes(slug)) {
          nodes[rel].children.push(slug);
        }
        if (!node.parents.includes(rel)) {
          node.parents.push(rel);
        }
      }
    }

    // From comparisons
    for (const comp of node.comparisons) {
      if (nodes[comp]) {
        if (!nodes[comp].children.includes(slug)) {
          nodes[comp].children.push(slug);
        }
        if (!node.parents.includes(comp)) {
          node.parents.push(comp);
        }
      }
    }
  }

  // Phase 4: Find orphan calculators
  const orphanCalculators: string[] = [];

  for (const [slug, node] of Object.entries(
    nodes,
  )) {
    const hasOutgoing =
      node.related.length > 0 ||
      node.comparisons.length > 0;
    const hasIncoming =
      node.parents.length > 0;

    if (!hasOutgoing && !hasIncoming) {
      orphanCalculators.push(slug);
    }
  }

  orphanCalculators.sort();

  // Phase 5: Detect circular dependencies
  const circularDependencies =
    detectCircularDeps(nodes);

  // Phase 6: Build clusters by category
  const clusters: Record<
    string,
    string[]
  > = {};

  for (const [slug, node] of Object.entries(
    nodes,
  )) {
    const cat = node.category || "Unknown";
    if (!clusters[cat]) {
      clusters[cat] = [];
    }
    clusters[cat].push(slug);
  }

  for (const cat of Object.keys(clusters)) {
    clusters[cat].sort();
  }

  // Phase 7: Compute statistics
  const totalCalculators =
    Object.keys(nodes).length;
  const connectedCalculators =
    totalCalculators - orphanCalculators.length;

  let totalConnections = 0;
  for (const node of Object.values(nodes)) {
    totalConnections +=
      node.related.length +
      node.comparisons.length;
  }

  const averageConnections =
    totalCalculators > 0
      ? totalConnections / totalCalculators
      : 0;

  return {
    nodes,
    orphanCalculators,
    circularDependencies,
    clusters,
    statistics: {
      totalCalculators,
      connectedCalculators,
      orphanCalculators: orphanCalculators.length,
      circularGroups: circularDependencies.length,
      averageConnections: Math.round(
        averageConnections * 10,
      ) / 10,
    },
  };
}

// ─────────────────────────────────────────────────
// Circular Dependency Detection
// ─────────────────────────────────────────────────

function detectCircularDeps(
  nodes: Record<string, CalculatorNode>,
): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(
    slug: string,
    path: string[],
  ) {
    if (inStack.has(slug)) {
      // Found a cycle — extract it
      const cycleStart = path.indexOf(slug);
      if (cycleStart >= 0) {
        const cycle = path
          .slice(cycleStart)
          .concat(slug);
        // Normalize: sort and deduplicate
        const normalized = [...new Set(cycle)];
        // Check if we already have this cycle
        const key = normalized
          .sort()
          .join(",");
        if (
          !cycles.some(
            (c) =>
              c
                .sort()
                .join(",") === key,
          )
        ) {
          cycles.push(normalized);
        }
      }
      return;
    }

    if (visited.has(slug)) return;

    visited.add(slug);
    inStack.add(slug);
    path.push(slug);

    const node = nodes[slug];
    if (node) {
      const neighbors = [
        ...node.related,
        ...node.comparisons,
      ];
      for (const next of neighbors) {
        if (nodes[next]) {
          dfs(next, [...path]);
        }
      }
    }

    inStack.delete(slug);
  }

  for (const slug of Object.keys(nodes)) {
    if (!visited.has(slug)) {
      dfs(slug, []);
    }
  }

  return cycles;
}

// ─────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────

/**
 * Print a formatted dependency graph report.
 */
export function printDependencyGraphReport(): void {
  const graph = buildDependencyGraph();

  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  console.log("");
  console.log(line);
  console.log(
    "    Dependency Graph Report",
  );
  console.log(line);
  console.log("");

  console.log(
    `  Total Calculators     ${graph.statistics.totalCalculators}`,
  );
  console.log(
    `  Connected             ${graph.statistics.connectedCalculators}`,
  );
  console.log(
    `  Orphans               ${graph.statistics.orphanCalculators}`,
  );
  console.log(
    `  Circular Groups       ${graph.statistics.circularGroups}`,
  );
  console.log(
    `  Average Connections   ${graph.statistics.averageConnections}`,
  );
  console.log("");

  // Largest categories
  console.log(thinLine);
  console.log("  Largest Categories");
  console.log(thinLine);

  const sortedCats = Object.entries(
    graph.clusters,
  )
    .sort(
      (a, b) => b[1].length - a[1].length,
    )
    .slice(0, 5);

  for (const [cat, slugs] of sortedCats) {
    console.log(
      `  ${cat} (${slugs.length})`,
    );
  }
  console.log("");

  // Orphan calculators
  if (graph.orphanCalculators.length > 0) {
    console.log(thinLine);
    console.log("  Orphan Calculators");
    console.log(thinLine);

    for (const slug of graph.orphanCalculators) {
      console.log(`  • ${slug}`);
    }
    console.log("");
  }

  // Circular dependencies
  console.log(thinLine);
  console.log("  Circular Dependencies");
  console.log(thinLine);

  if (graph.circularDependencies.length === 0) {
    console.log("  None");
  } else {
    for (const cycle of graph.circularDependencies) {
      console.log(
        `  ${cycle.join(" → ")}`,
      );
    }
  }

  console.log("");
  console.log(line);
  console.log("");
}