/**
 * Documentation Plugin
 *
 * Automatically generates Markdown documentation
 * for the calculator library under /docs.
 *
 * This plugin MUST NOT modify calculators.
 * It only generates documentation.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { GeneratorPlugin } from "./types";
import { calculatorKnowledge } from "../knowledge";
import type { CalculatorSuggestion } from "../core/calculator-intelligence";
import {
  buildNavigation,
} from "../core/navigation";
import {
  buildDependencyGraph,
} from "../core/dependency-graph";
import {
  getGeneratorConfig,
} from "../core/config";

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function formatDisplayName(
  slug: string,
): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() +
        w.slice(1),
    )
    .join(" ");
}

function ensureDir(
  dir: string,
): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
}

function writeFile(
  filePath: string,
  content: string,
): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(
    filePath,
    content,
    "utf-8",
  );
}

function slugToLink(
  slug: string,
): string {
  return `[${formatDisplayName(slug)}](calculators/${slug}.md)`;
}

// ─────────────────────────────────────────────────
// Calculator Page Generator
// ─────────────────────────────────────────────────

function generateCalculatorPage(
  slug: string,
  entry: CalculatorSuggestion,
): string {
  const name = formatDisplayName(slug);
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");
  lines.push(`- **Slug**: \`${slug}\``);
  lines.push(
    `- **Category**: ${entry.category || "N/A"}`,
  );
  lines.push(
    `- **Specialty**: ${entry.specialty || "N/A"}`,
  );

  if (entry.description) {
    lines.push("");
    lines.push(`> ${entry.description}`);
  }

  // Formula
  if (entry.formula) {
    lines.push("");
    lines.push("## Formula");
    lines.push("");
    lines.push(`\`\`\`${entry.formula}\`\`\``);
  }

  // Inputs
  if (entry.inputs && entry.inputs.length > 0) {
    lines.push("");
    lines.push("## Inputs");
    lines.push("");
    lines.push(
      "| Input | Type | Unit | Required |",
    );
    lines.push(
      "|-------|------|------|----------|",
    );

    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        label?: string;
        type?: string;
        unit?: string;
        required?: boolean;
      };
      lines.push(
        `| ${inpObj.label || inpObj.id} | ${inpObj.type || "number"} | ${inpObj.unit || "—"} | ${inpObj.required ? "Yes" : "No"} |`,
      );
    }
  }

  // Validation
  if (entry.inputs && entry.inputs.length > 0) {
    lines.push("");
    lines.push("## Validation");
    lines.push("");
    lines.push("| Input | Min | Max | Required |");
    lines.push(
      "|-------|-----|-----|----------|",
    );

    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        label?: string;
        min?: number;
        max?: number;
        required?: boolean;
      };
      lines.push(
        `| ${inpObj.label || inpObj.id} | ${inpObj.min !== undefined ? String(inpObj.min) : "—"} | ${inpObj.max !== undefined ? String(inpObj.max) : "—"} | ${inpObj.required ? "Yes" : "No"} |`,
      );
    }
  }

  // Classification
  if (
    entry.classification &&
    entry.classification.length > 0
  ) {
    lines.push("");
    lines.push("## Classification");
    lines.push("");
    lines.push("| Range | Label | Status |");
    lines.push(
      "|-------|-------|--------|",
    );

    for (const cls of entry.classification) {
      const clsObj = cls as {
        range?: string;
        label?: string;
        status?: string;
      };
      lines.push(
        `| ${clsObj.range || "—"} | ${clsObj.label || "—"} | ${clsObj.status || "—"} |`,
      );
    }
  }

  // Clinical Guidance
  const cg = entry.clinicalGuidance as Record<
    string,
    unknown
  > | undefined;

  if (cg) {
    lines.push("");
    lines.push("## Clinical Guidance");

    if (
      Array.isArray(cg.advice) &&
      cg.advice.length > 0
    ) {
      lines.push("");
      lines.push("### Advice");
      lines.push("");

      for (const item of cg.advice) {
        lines.push(`- ${item}`);
      }
    }

    if (
      Array.isArray(cg.warnings) &&
      cg.warnings.length > 0
    ) {
      lines.push("");
      lines.push("### Warnings");
      lines.push("");

      for (const item of cg.warnings) {
        lines.push(`- ${item}`);
      }
    }

    if (
      Array.isArray(cg.followUp) &&
      cg.followUp.length > 0
    ) {
      lines.push("");
      lines.push("### Follow-up");
      lines.push("");

      for (const item of cg.followUp) {
        lines.push(`- ${item}`);
      }
    }
  }

  // Evidence
  if (entry.evidence) {
    lines.push("");
    lines.push("## Evidence");
    lines.push("");

    const ev =
      entry.evidence as Record<
        string,
        unknown
      >;

    if (ev.source) {
      lines.push(
        `- **Source**: ${ev.source}`,
      );
    }

    if (ev.reference) {
      lines.push(
        `- **Reference**: ${ev.reference}`,
      );
    }

    if (ev.reviewedBy) {
      lines.push(
        `- **Reviewed by**: ${ev.reviewedBy}`,
      );
    }

    if (ev.updatedAt) {
      lines.push(
        `- **Updated**: ${ev.updatedAt}`,
      );
    }

    if (
      Array.isArray(ev.references) &&
      ev.references.length > 0
    ) {
      lines.push("");

      for (const ref of ev.references) {
        lines.push(`- ${ref}`);
      }
    }
  }

  // FAQ
  if (
    entry.faq &&
    entry.faq.length > 0
  ) {
    lines.push("");
    lines.push("## FAQ");
    lines.push("");

    for (const faqItem of entry.faq) {
      const faq = faqItem as {
        question: string;
        answer: string;
      };
      lines.push(
        `**Q: ${faq.question}**`,
      );
      lines.push("");
      lines.push(faq.answer);
      lines.push("");
    }
  }

  // Related Calculators
  if (
    entry.relatedCalculators &&
    entry.relatedCalculators.length > 0
  ) {
    lines.push("");
    lines.push("## Related Calculators");
    lines.push("");

    for (const rel of entry.relatedCalculators) {
      lines.push(`- ${slugToLink(rel)}`);
    }
  }

  // Comparison Calculators
  if (
    entry.comparison &&
    entry.comparison.calculators &&
    entry.comparison.calculators.length > 0
  ) {
    lines.push("");
    lines.push("## Comparison Calculators");
    lines.push("");

    for (const comp of entry.comparison
      .calculators) {
      const compId =
        (comp as { id?: string }).id || "";

      if (compId) {
        lines.push(`- ${slugToLink(compId)}`);
      }
    }
  }

  lines.push("");
  return lines.join("\n");
}

// ─────────────────────────────────────────────────
// Index Page Generators
// ─────────────────────────────────────────────────

function generateCalculatorsIndex(
  slugs: string[],
  knowledge: Record<
    string,
    CalculatorSuggestion
  >,
): string {
  const lines: string[] = [];

  lines.push("# Calculators");
  lines.push("");
  lines.push(
    `Total: **${slugs.length}** calculators`,
  );
  lines.push("");
  lines.push(
    "| Calculator | Category | Specialty |",
  );
  lines.push(
    "|------------|----------|-----------|",
  );

  for (const slug of slugs) {
    const entry = knowledge[slug];
    lines.push(
      `| [${formatDisplayName(slug)}](calculators/${slug}.md) | ${entry.category || "N/A"} | ${entry.specialty || "N/A"} |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}

function generateCategoriesIndex(
  slugs: string[],
  knowledge: Record<
    string,
    CalculatorSuggestion
  >,
): string {
  const lines: string[] = [];

  lines.push("# Categories");
  lines.push("");

  const byCategory: Record<
    string,
    string[]
  > = {};

  for (const slug of slugs) {
    const cat =
      knowledge[slug].category || "Uncategorized";

    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }

    byCategory[cat].push(slug);
  }

  const cats = Object.keys(byCategory).sort();

  for (const cat of cats) {
    lines.push(`## ${cat}`);
    lines.push("");
    const catSlugs = byCategory[cat].sort();

    for (const slug of catSlugs) {
      lines.push(`- ${slugToLink(slug)}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateSpecialtiesIndex(
  slugs: string[],
  knowledge: Record<
    string,
    CalculatorSuggestion
  >,
): string {
  const lines: string[] = [];

  lines.push("# Specialties");
  lines.push("");

  const bySpecialty: Record<
    string,
    string[]
  > = {};

  for (const slug of slugs) {
    const spec =
      knowledge[slug].specialty || "General";

    if (!bySpecialty[spec]) {
      bySpecialty[spec] = [];
    }

    bySpecialty[spec].push(slug);
  }

  const specs = Object.keys(bySpecialty).sort();

  for (const spec of specs) {
    lines.push(`## ${spec}`);
    lines.push("");
    const specSlugs =
      bySpecialty[spec].sort();

    for (const slug of specSlugs) {
      lines.push(`- ${slugToLink(slug)}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateCoverageDoc(
  slugs: string[],
  knowledge: Record<
    string,
    CalculatorSuggestion
  >,
): string {
  const lines: string[] = [];

  lines.push("# Coverage Report");
  lines.push("");

  // Count calculators with/without knowledge
  const withKnowledge = slugs.filter(
    (s) => !!knowledge[s],
  );
  const withoutKnowledge = slugs.filter(
    (s) => !knowledge[s],
  );

  lines.push(
    `**Total Calculators**: ${slugs.length}`,
  );
  lines.push(
    `**With Knowledge**: ${withKnowledge.length}`,
  );
  lines.push(
    `**Without Knowledge**: ${withoutKnowledge.length}`,
  );
  lines.push("");

  // Per-category breakdown
  const byCategory: Record<
    string,
    number
  > = {};

  for (const slug of slugs) {
    const cat =
      knowledge[slug]?.category || "Unknown";

    byCategory[cat] =
      (byCategory[cat] || 0) + 1;
  }

  lines.push("## By Category");
  lines.push("");

  for (const [
    cat,
    count,
  ] of Object.entries(byCategory).sort()) {
    lines.push(`- **${cat}**: ${count}`);
  }

  lines.push("");

  if (withoutKnowledge.length > 0) {
    lines.push("## Without Knowledge");
    lines.push("");

    for (const slug of withoutKnowledge.sort()) {
      lines.push(`- \`${slug}\``);
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateQualityDoc(
  slugs: string[],
  knowledge: Record<
    string,
    CalculatorSuggestion
  >,
): string {
  const lines: string[] = [];

  lines.push("# Quality Report");
  lines.push("");

  // Calculate basic quality scores
  const scores: {
    slug: string;
    score: number;
  }[] = [];

  for (const slug of slugs) {
    let score = 0;
    const entry = knowledge[slug];

    if (!entry) {
      scores.push({ slug, score: 0 });
      continue;
    }

    if (entry.description) score += 20;
    if (entry.formula) score += 20;
    if (entry.inputs && entry.inputs.length > 0)
      score += 15;
    if (entry.keywords && entry.keywords.length > 0)
      score += 10;
    if (entry.clinicalGuidance) score += 15;
    if (entry.evidence) score += 10;
    if (entry.faq && entry.faq.length > 0)
      score += 10;

    scores.push({
      slug,
      score: Math.min(score, 100),
    });
  }

  const sorted = [...scores].sort(
    (a, b) => b.score - a.score,
  );

  const avgScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (sum, s) => sum + s.score,
            0,
          ) / scores.length,
        )
      : 0;

  lines.push(
    `**Average Score**: ${avgScore}`,
  );
  lines.push(
    `**Total Calculators**: ${scores.length}`,
  );
  lines.push("");

  // Grade distribution
  const gradeCount: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  for (const calc of scores) {
    const grade =
      calc.score >= 90
        ? "A"
        : calc.score >= 80
          ? "B"
          : calc.score >= 70
            ? "C"
            : calc.score >= 60
              ? "D"
              : "F";

    gradeCount[grade]++;
  }

  lines.push("## Grade Distribution");
  lines.push("");

  for (const [
    grade,
    count,
  ] of Object.entries(gradeCount)) {
    lines.push(`- **${grade}**: ${count}`);
  }

  lines.push("");

  lines.push("## Top Calculators");
  lines.push("");

  for (
    let i = 0;
    i < Math.min(5, sorted.length);
    i++
  ) {
    lines.push(
      `1. ${slugToLink(sorted[i].slug)} — ${sorted[i].score}`,
    );
  }

  lines.push("");

  lines.push("## Lowest Calculators");
  lines.push("");

  for (
    let i = Math.max(0, sorted.length - 5);
    i < sorted.length;
    i++
  ) {
    lines.push(
      `${i + 1}. ${slugToLink(sorted[i].slug)} — ${sorted[i].score}`,
    );
  }

  lines.push("");
  return lines.join("\n");
}

function generateNavigationDoc(
  slugs: string[],
): string {
  const lines: string[] = [];

  lines.push("# Navigation");
  lines.push("");

  const nav = buildNavigation();

  for (const slug of slugs) {
    const entry =
      nav.calculators[slug];

    if (!entry) continue;

    lines.push(
      `## ${formatDisplayName(slug)}`,
    );
    lines.push("");

    if (entry.previous) {
      lines.push(
        `- **Previous**: ${slugToLink(entry.previous)}`,
      );
    }

    if (entry.next) {
      lines.push(
        `- **Next**: ${slugToLink(entry.next)}`,
      );
    }

    if (entry.related.length > 0) {
      lines.push(`- **Related**: ${entry.related.map(slugToLink).join(", ")}`);
    }

    if (entry.seeAlso.length > 0) {
      lines.push(`- **See Also**: ${entry.seeAlso.map(slugToLink).join(", ")}`);
    }

    if (entry.breadcrumbs.length > 0) {
      lines.push(
        `- **Breadcrumbs**: ${entry.breadcrumbs.join(" → ")}`,
      );
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateDependencyDoc(): string {
  const lines: string[] = [];

  lines.push("# Dependency Graph");
  lines.push("");

  const graph = buildDependencyGraph();

  const totalNodes =
    Object.keys(graph.nodes).length;

  lines.push(`**Total Nodes**: ${totalNodes}`);
  lines.push(
    `**Orphan Calculators**: ${graph.orphanCalculators.length}`,
  );
  lines.push(
    `**Circular Dependencies**: ${graph.circularDependencies.length}`,
  );
  lines.push("");

  // Statistics
  if (graph.statistics) {
    lines.push("## Statistics");
    lines.push("");
    lines.push(
      `- **Total**: ${graph.statistics.totalCalculators}`,
    );
    lines.push(
      `- **Connected**: ${graph.statistics.connectedCalculators}`,
    );
    lines.push(
      `- **Orphans**: ${graph.statistics.orphanCalculators}`,
    );
    lines.push(
      `- **Circular Groups**: ${graph.statistics.circularGroups}`,
    );
    lines.push(
      `- **Average Connections**: ${graph.statistics.averageConnections}`,
    );
    lines.push("");
  }

  // Largest clusters
  if (
    graph.clusters &&
    Object.keys(graph.clusters).length > 0
  ) {
    lines.push("## Clusters");
    lines.push("");

    const clusterEntries = Object.entries(
      graph.clusters,
    ).sort(
      (a, b) => b[1].length - a[1].length,
    );

    for (const [
      name,
      members,
    ] of clusterEntries) {
      lines.push(
        `- **${name}**: ${members.length} calculators`,
      );
    }

    lines.push("");
  }

  if (graph.orphanCalculators.length > 0) {
    lines.push("## Orphan Calculators");
    lines.push("");

    for (const slug of graph.orphanCalculators.sort()) {
      lines.push(`- ${slugToLink(slug)}`);
    }

    lines.push("");
  }

  if (graph.circularDependencies.length > 0) {
    lines.push("## Circular Dependencies");
    lines.push("");

    for (const cycle of graph.circularDependencies) {
      lines.push(`- ${cycle.join(" → ")}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateReadme(
  slugs: string[],
): string {
  const lines: string[] = [];

  lines.push("# MedCalcHub Documentation");
  lines.push("");
  lines.push(
    `> Auto-generated by Generator V6`,
  );
  lines.push("");
  lines.push(
    `**Total Calculators**: ${slugs.length}`,
  );
  lines.push(
    `**Generated**: ${new Date().toISOString().split("T")[0]}`,
  );
  lines.push("");
  lines.push("## Documentation");
  lines.push("");
  lines.push(
    "- [All Calculators](calculators.md)",
  );
  lines.push(
    "- [Categories](categories.md)",
  );
  lines.push(
    "- [Specialties](specialties.md)",
  );
  lines.push(
    "- [Coverage](coverage.md)",
  );
  lines.push(
    "- [Quality](quality.md)",
  );
  lines.push(
    "- [Navigation](navigation.md)",
  );
  lines.push(
    "- [Dependency Graph](dependency.md)",
  );
  lines.push("");
  lines.push("## Calculators");
  lines.push("");

  for (const slug of slugs) {
    lines.push(`- ${slugToLink(slug)}`);
  }

  lines.push("");
  return lines.join("\n");
}

// ─────────────────────────────────────────────────
// Plugin
// ─────────────────────────────────────────────────

const plugin: GeneratorPlugin = {
  name: "Documentation",
  order: 95,
  enabled: true,
  execute(_context) {
    const config = getGeneratorConfig();
    const docsDir = path.resolve(
      process.cwd(),
      config.generator.docsDirectory,
    );
    const calculatorsDir = path.resolve(
      docsDir,
      "calculators",
    );

    const knowledge =
      calculatorKnowledge as Record<
        string,
        CalculatorSuggestion
      >;

    const slugs =
      Object.keys(knowledge).sort();

    // Ensure directories exist
    ensureDir(docsDir);
    ensureDir(calculatorsDir);

    // Generate individual calculator pages
    for (const slug of slugs) {
      const entry = knowledge[slug];
      const content = generateCalculatorPage(
        slug,
        entry,
      );

      writeFile(
        path.join(
          calculatorsDir,
          `${slug}.md`,
        ),
        content,
      );
    }

    // Generate index files
    writeFile(
      path.join(docsDir, "calculators.md"),
      generateCalculatorsIndex(slugs, knowledge),
    );

    writeFile(
      path.join(docsDir, "categories.md"),
      generateCategoriesIndex(slugs, knowledge),
    );

    writeFile(
      path.join(docsDir, "specialties.md"),
      generateSpecialtiesIndex(slugs, knowledge),
    );

    writeFile(
      path.join(docsDir, "coverage.md"),
      generateCoverageDoc(slugs, knowledge),
    );

    writeFile(
      path.join(docsDir, "quality.md"),
      generateQualityDoc(slugs, knowledge),
    );

    writeFile(
      path.join(docsDir, "navigation.md"),
      generateNavigationDoc(slugs),
    );

    writeFile(
      path.join(docsDir, "dependency.md"),
      generateDependencyDoc(),
    );

    writeFile(
      path.join(docsDir, "README.md"),
      generateReadme(slugs),
    );

    console.log(
      `📄 Generated ${slugs.length} calculator docs + 8 index files`,
    );
  },
};

export default plugin;