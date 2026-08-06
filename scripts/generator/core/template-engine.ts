/**
 * Knowledge Template Engine
 *
 * Automatically creates a complete knowledge definition
 * skeleton for a new calculator. Dramatically reduces
 * manual work when adding new calculators.
 *
 * Generates a complete CalculatorKnowledge object with
 * intelligent placeholders based on category, specialty,
 * and calculator name.
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

export interface TemplateOptions {
  slug: string;
  name: string;
  category: string;
  specialty: string;
}

export interface TemplateResult {
  slug: string;
  name: string;
  category: string;
  specialty: string;
  knowledge: CalculatorSuggestion;
  filePath: string;
}

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

/**
 * Convert a slug like "corrected-calcium" to
 * "Corrected Calcium".
 */
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

/**
 * Map category to default specialty.
 */
function defaultSpecialty(
  category: string,
): string {
  const map: Record<string, string> = {
    Emergency: "Emergency Medicine",
    Laboratory: "Internal Medicine",
    Cardiology: "Cardiology",
    Nephrology: "Nephrology",
    Anthropometry: "Internal Medicine",
    "Critical Care": "Critical Care Medicine",
    Endocrinology: "Endocrinology",
  };

  return map[category] ?? "Internal Medicine";
}

/**
 * Map category to file name.
 */
function categoryToFileName(
  category: string,
): string {
  const map: Record<string, string> = {
    Emergency: "emergency",
    Laboratory: "laboratory",
    Cardiology: "cardiology",
    Nephrology: "nephrology",
    Anthropometry: "anthropometry",
    "Critical Care": "critical-care",
    Endocrinology: "endocrinology",
  };

  return map[category] ?? "other";
}

// ─────────────────────────────────────────────────
// Template Generation
// ─────────────────────────────────────────────────

/**
 * Generate a complete knowledge definition template
 * for a new calculator.
 */
export function generateKnowledgeTemplate(
  options: TemplateOptions,
): TemplateResult {
  const {
    slug,
    name,
    category,
    specialty,
  } = options;

  const title = name || slugToTitle(slug);
  const resolvedSpecialty =
    specialty || defaultSpecialty(category);

  const knowledge: CalculatorSuggestion = {
    category,
    specialty: resolvedSpecialty,
    description:
      "TODO: Add calculator description.",
    formula: {
      type: "algebraic",
      expression: "",
    },
    normalRange: "",
    keywords: [slug, category.toLowerCase()],
    inputs: [],
    classification: [
      {
        label: "Normal",
        status: "normal",
      },
    ],
    faq: [
      {
        question: `What is ${title}?`,
        answer: "TODO",
      },
      {
        question: `When should ${title} be used?`,
        answer: "TODO",
      },
      {
        question: `What does an elevated ${title} mean?`,
        answer: "TODO",
      },
    ],
    evidence: {
      source: "Primary Clinical Reference",
      reference: "TODO",
    },
    clinicalGuidance: {
      advice: ["TODO: Add clinical advice."],
      warnings: ["TODO: Add clinical warnings."],
      followUp: [
        "TODO: Add follow-up guidance.",
      ],
    },
    relatedCalculators: [],
    comparison: undefined,
  };

  const fileName = categoryToFileName(category);
  const filePath =
    `scripts/generator/knowledge/${fileName}.ts`;

  return {
    slug,
    name: title,
    category,
    specialty: resolvedSpecialty,
    knowledge,
    filePath,
  };
}

/**
 * Check if a calculator slug already exists in
 * the knowledge base.
 */
export function slugExists(slug: string): boolean {
  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;
  return slug in knowledge;
}

/**
 * Print a formatted template summary showing the
 * generated knowledge skeleton.
 */
export function printTemplateSummary(
  result: TemplateResult,
): void {
  const line = "═".repeat(50);
  const thinLine = "─".repeat(50);

  console.log("");
  console.log(line);
  console.log("    Knowledge Template Generated");
  console.log(line);
  console.log("");

  console.log(
    `  Slug:         ${result.slug}`,
  );
  console.log(
    `  Name:         ${result.name}`,
  );
  console.log(
    `  Category:     ${result.category}`,
  );
  console.log(
    `  Specialty:    ${result.specialty}`,
  );
  console.log(
    `  Output File:  ${result.filePath}`,
  );
  console.log("");

  console.log(thinLine);
  console.log("  Generated Knowledge Object:");
  console.log(thinLine);
  console.log("");

  // Pretty-print the knowledge object
  const k = result.knowledge;
  const formulaObj =
    typeof k.formula === "object"
      ? k.formula
      : null;
  console.log("  {");
  console.log(
    `    description: "${k.description}",`,
  );
  console.log(
    `    formula: { type: "${formulaObj?.type ?? "algebraic"}", expression: "" },`,
  );
  console.log(
    `    inputs: [],`,
  );
  console.log(
    `    classification: [`,
  );
  for (const c of k.classification ?? []) {
    console.log(
      `      { label: "${c.label}", status: "${c.status}" },`,
    );
  }
  console.log(`    ],`);
  console.log(
    `    faq: [`,
  );
  for (const f of k.faq ?? []) {
    console.log(
      `      { question: "${f.question}", answer: "${f.answer}" },`,
    );
  }
  console.log(`    ],`);
  console.log(
    `    clinicalGuidance: {`,
  );
  console.log(
    `      advice: ["TODO"],`,
  );
  console.log(
    `      warnings: ["TODO"],`,
  );
  console.log(
    `      followUp: ["TODO"],`,
  );
  console.log(`    },`);
  console.log(`  }`);
  console.log("");

  console.log(thinLine);
  console.log("  Next Steps:");
  console.log(thinLine);
  console.log("");
  console.log(
    `  1. Add inputs to the knowledge definition`,
  );
  console.log(
    `  2. Set the correct formula type and expression`,
  );
  console.log(
    `  3. Fill in TODO placeholders`,
  );
  console.log(
    `  4. Run: npm run generate -- ${result.slug}`,
  );
  console.log("");
  console.log(line);
  console.log("");
}