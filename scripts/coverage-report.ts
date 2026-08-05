import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  calculatorKnowledge,
} from "./generator/knowledge";

interface CalculatorReport {
  id: string;
  slug: string;
  name: string;
  category: string;
  specialty: string;
  hasKnowledge: boolean;
  hasEvidence: boolean;
  hasFaq: boolean;
  hasClinicalGuidance: boolean;
  hasRelatedCalculators: boolean;
  hasComparison: boolean;
  hasClassification: boolean;
}

interface SpecialtyGroup {
  specialty: string;
  calculators: CalculatorReport[];
  total: number;
  v2Count: number;
  legacyCount: number;
  missingEvidence: number;
  missingFaq: number;
  missingClinicalGuidance: number;
  missingRelatedCalculators: number;
  missingComparison: number;
  missingClassification: number;
}

interface CoverageReport {
  generatedAt: string;
  total: number;
  v2: number;
  legacy: number;
  v2Percentage: number;
  missingKnowledge: number;
  missingEvidence: number;
  missingFaq: number;
  missingClinicalGuidance: number;
  missingRelatedCalculators: number;
  missingComparison: number;
  missingClassification: number;
  bySpecialty: SpecialtyGroup[];
}

function extractIdFromImport(
  line: string,
): string | null {
  const match = line.match(
    /import\s*\{[^}]*\}\s*from\s*"\.\/([^"]+)"/,
  );
  return match ? match[1] : null;
}

function getAllRegistrySlugs(): string[] {
  const registryPath = resolve(
    process.cwd(),
    "lib/calculators/registry.ts",
  );
  const content = readFileSync(
    registryPath,
    "utf-8",
  );
  const slugMatches =
    content.match(/id:\s*"([^"]+)"/g) ?? [];
  return slugMatches.map((m) =>
    m.replace(/id:\s*"/, "").replace(/"$/, ""),
  );
}

function loadAllCalculators(): CalculatorReport[] {
  const registryPath = resolve(
    process.cwd(),
    "lib/calculators/registry.ts",
  );
  const content = readFileSync(
    registryPath,
    "utf-8",
  );

  const calculators: CalculatorReport[] = [];
  const seen = new Set<string>();

  const lines = content.split("\n");

  for (const line of lines) {
    const importMatch = line.match(
      /import\s*\{[^}]*\}\s*from\s*"\.\/([^"]+)"/,
    );
    if (!importMatch) continue;

    const filePath = importMatch[1];
    if (
      filePath === "calculator.types" ||
      filePath.startsWith("utils/") ||
      filePath.startsWith("faqs/") ||
      filePath.startsWith("comparisons/") ||
      filePath.startsWith("related/") ||
      filePath.startsWith("evidence/") ||
      filePath.startsWith("clinical/") ||
      seen.has(filePath)
    ) continue;

    seen.add(filePath);

    try {
      const calcPath = resolve(
        process.cwd(),
        `lib/calculators/${filePath}.ts`,
      );
      const calcContent = readFileSync(
        calcPath,
        "utf-8",
      );

      const idMatch =
        calcContent.match(/id:\s*"([^"]+)"/);
      const nameMatch =
        calcContent.match(/name:\s*"([^"]+)"/);
      const categoryMatch =
        calcContent.match(
          /category:\s*"([^"]+)"/,
        );
      const specialtyMatch =
        calcContent.match(
          /specialty:\s*"([^"]+)"/,
        );

      const id = idMatch?.[1] ?? filePath;
      const slug = id;

      const hasEvidence =
        /evidence:\s*\{/.test(calcContent) &&
        /"source"\s*:/.test(calcContent);
      const hasFaq =
        /faq:\s*\[/.test(calcContent) &&
        /question/.test(calcContent);
      const hasClinicalGuidance =
        /clinicalGuidance:\s*\{/.test(
          calcContent,
        ) &&
        /advice\s*:/.test(calcContent);
      const hasRelatedCalculators =
        /relatedCalculators:\s*\[/.test(
          calcContent,
        );
      const hasComparison =
        /comparison:\s*\{/.test(calcContent);
      const hasClassification =
        /classification:\s*\[/.test(
          calcContent,
        ) &&
        /label\s*:/.test(calcContent);

      const knowledgeKey = slug;
      const hasKnowledge =
        knowledgeKey in calculatorKnowledge;

      calculators.push({
        id,
        slug,
        name:
          nameMatch?.[1] ?? filePath,
        category:
          categoryMatch?.[1] ?? "Unknown",
        specialty:
          specialtyMatch?.[1] ?? "Unknown",
        hasKnowledge,
        hasEvidence,
        hasFaq,
        hasClinicalGuidance,
        hasRelatedCalculators,
        hasComparison,
        hasClassification,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return calculators;
}

function buildReport(): CoverageReport {
  const calculators = loadAllCalculators();
  const total = calculators.length;

  const v2 = calculators.filter(
    (c) =>
      c.hasEvidence &&
      c.hasFaq &&
      c.hasClinicalGuidance,
  ).length;

  const missingKnowledge = calculators.filter(
    (c) => !c.hasKnowledge,
  ).length;
  const missingEvidence = calculators.filter(
    (c) => !c.hasEvidence,
  ).length;
  const missingFaq = calculators.filter(
    (c) => !c.hasFaq,
  ).length;
  const missingClinicalGuidance =
    calculators.filter(
      (c) => !c.hasClinicalGuidance,
    ).length;
  const missingRelatedCalculators =
    calculators.filter(
      (c) => !c.hasRelatedCalculators,
    ).length;
  const missingComparison = calculators.filter(
    (c) => !c.hasComparison,
  ).length;
  const missingClassification =
    calculators.filter(
      (c) => !c.hasClassification,
    ).length;

  const specialtyMap = new Map<
    string,
    CalculatorReport[]
  >();
  for (const calc of calculators) {
    const existing =
      specialtyMap.get(calc.specialty) ?? [];
    existing.push(calc);
    specialtyMap.set(calc.specialty, existing);
  }

  const bySpecialty: SpecialtyGroup[] = [];
  for (const [
    specialty,
    specs,
  ] of specialtyMap) {
    const specV2 = specs.filter(
      (c) =>
        c.hasEvidence &&
        c.hasFaq &&
        c.hasClinicalGuidance,
    ).length;

    bySpecialty.push({
      specialty,
      calculators: specs,
      total: specs.length,
      v2Count: specV2,
      legacyCount: specs.length - specV2,
      missingEvidence: specs.filter(
        (c) => !c.hasEvidence,
      ).length,
      missingFaq: specs.filter(
        (c) => !c.hasFaq,
      ).length,
      missingClinicalGuidance: specs.filter(
        (c) => !c.hasClinicalGuidance,
      ).length,
      missingRelatedCalculators: specs.filter(
        (c) => !c.hasRelatedCalculators,
      ).length,
      missingComparison: specs.filter(
        (c) => !c.hasComparison,
      ).length,
      missingClassification: specs.filter(
        (c) => !c.hasClassification,
      ).length,
    });
  }

  bySpecialty.sort((a, b) =>
    a.specialty.localeCompare(b.specialty),
  );

  return {
    generatedAt: new Date().toISOString(),
    total,
    v2,
    legacy: total - v2,
    v2Percentage: Number(
      ((v2 / total) * 100).toFixed(1),
    ),
    missingKnowledge,
    missingEvidence,
    missingFaq,
    missingClinicalGuidance,
    missingRelatedCalculators,
    missingComparison,
    missingClassification,
    bySpecialty,
  };
}

function generateMarkdown(
  report: CoverageReport,
): string {
  const lines: string[] = [];

  lines.push("# Calculator V2 Coverage Report");
  lines.push("");
  lines.push(
    `Generated: ${report.generatedAt}`,
  );
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  lines.push(
    `| Metric | Value |`,
  );
  lines.push(
    `|--------|-------|`,
  );
  lines.push(
    `| Total calculators | ${report.total} |`,
  );
  lines.push(
    `| V2 calculators | ${report.v2} (${report.v2Percentage}%) |`,
  );
  lines.push(
    `| Legacy calculators | ${report.legacy} (${(100 - report.v2Percentage).toFixed(1)}%) |`,
  );
  lines.push("");

  lines.push("## Missing V2 Features");
  lines.push("");
  lines.push(
    `| Feature | Missing | Coverage |`,
  );
  lines.push(
    `|---------|---------|----------|`,
  );
  lines.push(
    `| Knowledge entry | ${report.missingKnowledge} | ${((1 - report.missingKnowledge / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| Evidence | ${report.missingEvidence} | ${((1 - report.missingEvidence / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| FAQ | ${report.missingFaq} | ${((1 - report.missingFaq / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| Clinical Guidance | ${report.missingClinicalGuidance} | ${((1 - report.missingClinicalGuidance / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| Related Calculators | ${report.missingRelatedCalculators} | ${((1 - report.missingRelatedCalculators / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| Comparison | ${report.missingComparison} | ${((1 - report.missingComparison / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push(
    `| Classification | ${report.missingClassification} | ${((1 - report.missingClassification / report.total) * 100).toFixed(1)}% |`,
  );
  lines.push("");

  lines.push("## By Specialty");
  lines.push("");

  for (const group of report.bySpecialty) {
    const specV2Pct =
      group.total > 0
        ? (
            (group.v2Count / group.total) *
            100
          ).toFixed(1)
        : "0.0";

    lines.push(`### ${group.specialty}`);
    lines.push("");
    lines.push(
      `**Total:** ${group.total} | **V2:** ${group.v2Count} (${specV2Pct}%) | **Legacy:** ${group.legacyCount}`,
    );
    lines.push("");

    if (
      group.missingEvidence +
        group.missingFaq +
        group.missingClinicalGuidance +
        group.missingRelatedCalculators +
        group.missingComparison +
        group.missingClassification >
      0
    ) {
      lines.push(
        `Missing: Evidence=${group.missingEvidence} FAQ=${group.missingFaq} Guidance=${group.missingClinicalGuidance} Related=${group.missingRelatedCalculators} Comparison=${group.missingComparison} Classification=${group.missingClassification}`,
      );
      lines.push("");
    }

    lines.push(
      `| Calculator | V2 | Evidence | FAQ | Guidance | Related | Comparison | Classification |`,
    );
    lines.push(
      `|------------|-----|----------|-----|----------|---------|------------|----------------|`,
    );

    for (const calc of group.calculators) {
      const v2 =
        calc.hasEvidence &&
        calc.hasFaq &&
        calc.hasClinicalGuidance
          ? "✓"
          : "✗";
      lines.push(
        `| ${calc.name} | ${v2} | ${calc.hasEvidence ? "✓" : "✗"} | ${calc.hasFaq ? "✓" : "✗"} | ${calc.hasClinicalGuidance ? "✓" : "✗"} | ${calc.hasRelatedCalculators ? "✓" : "✗"} | ${calc.hasComparison ? "✓" : "✗"} | ${calc.hasClassification ? "✓" : "✗"} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const report = buildReport();

  const jsonPath = resolve(
    process.cwd(),
    "coverage-report.json",
  );
  const mdPath = resolve(
    process.cwd(),
    "coverage-report.md",
  );

  writeFileSync(
    jsonPath,
    JSON.stringify(report, null, 2),
    "utf-8",
  );
  writeFileSync(
    mdPath,
    generateMarkdown(report),
    "utf-8",
  );

  console.log(
    `✅ Coverage report generated.`,
  );
  console.log(
    `   JSON: ${jsonPath}`,
  );
  console.log(
    `   MD:   ${mdPath}`,
  );
  console.log(
    `   Total: ${report.total} | V2: ${report.v2} (${report.v2Percentage}%) | Legacy: ${report.legacy}`,
  );
}

main();