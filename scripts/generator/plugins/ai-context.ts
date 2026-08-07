/**
 * AI Context Export Plugin
 *
 * Generates structured JSON knowledge for every
 * calculator, designed for AI assistants, RAG
 * systems, chatbots, LLMs, and clinical decision
 * support.
 *
 * This plugin MUST NOT modify calculators.
 * It only exports structured AI knowledge.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { GeneratorPlugin } from "./types";
import { calculatorKnowledge } from "../knowledge";
import type {
  CalculatorSuggestion,
} from "../core/calculator-intelligence";
import { buildNavigation } from "../core/navigation";
import {
  getGeneratorConfig,
} from "../core/config";

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(
  filePath: string,
  content: string,
): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function formatDisplayName(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

// ─────────────────────────────────────────────────
// AI Context Builder
// ─────────────────────────────────────────────────

interface AiInput {
  id: string;
  label: string;
  unit: string;
  required: boolean;
}

interface AiClassification {
  label: string;
  status: string;
  min: number;
  max: number;
}

interface AiClinicalGuidance {
  advice: string[];
  warnings: string[];
  followUp: string[];
}

interface AiNavigation {
  previous: string;
  next: string;
  seeAlso: string[];
}

interface AiContext {
  slug: string;
  title: string;
  category: string;
  specialty: string;
  description: string;
  purpose: string;
  formula: {
    type: string;
    expression: string;
  };
  inputs: AiInput[];
  classification: AiClassification[];
  clinicalGuidance: AiClinicalGuidance;
  faq: { question: string; answer: string }[];
  evidence: string[];
  relatedCalculators: string[];
  comparisonCalculators: string[];
  navigation: AiNavigation;
}

function buildAiContext(
  slug: string,
  entry: CalculatorSuggestion,
  navMap: Record<
    string,
    { previous?: string; next?: string; seeAlso: string[] }
  >,
): AiContext {
  const nav = navMap[slug] || {
    previous: "",
    next: "",
    seeAlso: [],
  };

  // Inputs
  const inputs: AiInput[] = [];

  if (entry.inputs) {
    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        label?: string;
        unit?: string;
        required?: boolean;
      };
      inputs.push({
        id: inpObj.id,
        label:
          inpObj.label ||
          formatDisplayName(inpObj.id),
        unit: inpObj.unit || "",
        required: inpObj.required || false,
      });
    }
  }

  // Classification
  const classification: AiClassification[] = [];

  if (entry.classification) {
    for (const cls of entry.classification) {
      const clsObj = cls as {
        label?: string;
        status?: string;
        min?: number;
        max?: number;
      };
      classification.push({
        label: clsObj.label || "",
        status: clsObj.status || "",
        min: clsObj.min ?? 0,
        max: clsObj.max ?? 0,
      });
    }
  }

  // Clinical Guidance
  const cg = entry.clinicalGuidance as Record<
    string,
    string[]
  > | undefined;

  const clinicalGuidance: AiClinicalGuidance = {
    advice: cg?.advice
      ? [...cg.advice]
      : [],
    warnings: cg?.warnings
      ? [...cg.warnings]
      : [],
    followUp: cg?.followUp
      ? [...cg.followUp]
      : [],
  };

  // FAQ
  const faq: { question: string; answer: string }[] =
    [];

  if (entry.faq) {
    for (const f of entry.faq) {
      const faqItem = f as {
        question: string;
        answer: string;
      };
      faq.push({
        question: faqItem.question,
        answer: faqItem.answer,
      });
    }
  }

  // Evidence
  const evidence: string[] = [];

  if (entry.evidence) {
    const ev = entry.evidence as Record<
      string,
      unknown
    >;

    if (ev.source) {
      evidence.push(String(ev.source));
    }

    if (ev.reference) {
      evidence.push(String(ev.reference));
    }

    if (
      Array.isArray(ev.references)
    ) {
      for (const ref of ev.references) {
        evidence.push(String(ref));
      }
    }
  }

  // Comparison calculators
  const comparisonCalculators: string[] = [];

  if (
    entry.comparison &&
    entry.comparison.calculators
  ) {
    for (const comp of entry.comparison
      .calculators) {
      const compId =
        (comp as { id?: string }).id || "";

      if (compId) {
        comparisonCalculators.push(compId);
      }
    }
  }

  // Purpose — derive from description
  const purpose = entry.description
    ? `Used to ${entry.description.toLowerCase()}`
    : "";

  // Formula — extract from FormulaDefinition object
  const formulaObj = entry.formula as
    | {
        type?: string;
        expression?: string;
        description?: string;
      }
    | undefined;

  return {
    slug,
    title: formatDisplayName(slug),
    category: entry.category || "",
    specialty: entry.specialty || "",
    description: entry.description || "",
    purpose,
    formula: {
      type: formulaObj?.type || "none",
      expression: formulaObj?.expression || "",
    },
    inputs,
    classification,
    clinicalGuidance,
    faq,
    evidence,
    relatedCalculators: entry.relatedCalculators
      ? [...entry.relatedCalculators]
      : [],
    comparisonCalculators,
    navigation: {
      previous: nav.previous || "",
      next: nav.next || "",
      seeAlso: nav.seeAlso || [],
    },
  };
}

// ─────────────────────────────────────────────────
// Plugin
// ─────────────────────────────────────────────────

const plugin: GeneratorPlugin = {
  name: "AI Context Export",
  order: 98,
  enabled: true,
  execute(_context) {
    const config = getGeneratorConfig();
    const aiDir = path.resolve(
      process.cwd(),
      config.generator.exportsDirectory,
      "ai",
    );
    const docsDir = path.resolve(
      process.cwd(),
      config.generator.docsDirectory,
    );

    const knowledge =
      calculatorKnowledge as Record<
        string,
        CalculatorSuggestion
      >;

    const slugs =
      Object.keys(knowledge).sort();

    // Build navigation map
    const nav = buildNavigation();
    const navMap: Record<
      string,
      {
        previous?: string;
        next?: string;
        seeAlso: string[];
      }
    > = {};

    for (const slug of slugs) {
      const navEntry = nav.calculators[slug];

      if (navEntry) {
        navMap[slug] = {
          previous: navEntry.previous,
          next: navEntry.next,
          seeAlso: navEntry.seeAlso,
        };
      }
    }

    // Ensure directory
    ensureDir(aiDir);

    // Generate AI context for each calculator
    for (const slug of slugs) {
      const entry = knowledge[slug];
      const ctx = buildAiContext(
        slug,
        entry,
        navMap,
      );

      writeFile(
        path.join(aiDir, `${slug}.json`),
        JSON.stringify(ctx, null, 2) + "\n",
      );
    }

    // Generate index
    const index = {
      generated: new Date().toISOString(),
      calculatorCount: slugs.length,
      version: "1.0",
      calculators: slugs,
    };

    writeFile(
      path.join(aiDir, "index.json"),
      JSON.stringify(index, null, 2) + "\n",
    );

    // Generate documentation
    const docLines: string[] = [];

    docLines.push("# AI Context Export");
    docLines.push("");
    docLines.push("## Purpose");
    docLines.push("");
    docLines.push(
      "Structured JSON knowledge for every calculator, designed for AI assistants, RAG systems, chatbots, LLMs, and clinical decision support.",
    );
    docLines.push("");

    docLines.push("## JSON Schema");
    docLines.push("");
    docLines.push("```json");
    docLines.push("{");
    docLines.push('  "slug": "string",');
    docLines.push('  "title": "string",');
    docLines.push('  "category": "string",');
    docLines.push('  "specialty": "string",');
    docLines.push('  "description": "string",');
    docLines.push('  "purpose": "string",');
    docLines.push('  "formula": { "type": "string", "expression": "string" },');
    docLines.push('  "inputs": [{ "id": "string", "label": "string", "unit": "string", "required": boolean }],');
    docLines.push('  "classification": [{ "label": "string", "status": "string", "min": number, "max": number }],');
    docLines.push('  "clinicalGuidance": { "advice": [...], "warnings": [...], "followUp": [...] },');
    docLines.push('  "faq": [{ "question": "string", "answer": "string" }],');
    docLines.push('  "evidence": ["string"],');
    docLines.push('  "relatedCalculators": ["string"],');
    docLines.push('  "comparisonCalculators": ["string"],');
    docLines.push('  "navigation": { "previous": "string", "next": "string", "seeAlso": ["string"] }');
    docLines.push("}");
    docLines.push("```");
    docLines.push("");

    docLines.push("## How AI Should Use the Data");
    docLines.push("");
    docLines.push("1. **Load the index** (`exports/ai/index.json`) to discover all calculators");
    docLines.push("2. **Load individual context** (`exports/ai/<slug>.json`) for detailed knowledge");
    docLines.push("3. **Use the description and purpose** to explain what the calculator does");
    docLines.push("4. **Use clinical guidance** to provide medical advice context");
    docLines.push("5. **Use classification** to interpret results");
    docLines.push("6. **Use navigation** to suggest related calculators");
    docLines.push("");

    docLines.push("## Example Prompts");
    docLines.push("");
    docLines.push("### Explain a Calculator");
    docLines.push("");
    docLines.push('```');
    docLines.push('User: "What is BMI?"');
    docLines.push('AI: Load bmi.json → Use title, description, purpose, inputs');
    docLines.push('```');
    docLines.push("");
    docLines.push("### Interpret Results");
    docLines.push("");
    docLines.push('```');
    docLines.push('User: "My BMI is 32"');
    docLines.push('AI: Load bmi.json → Use classification to classify as "Obese"');
    docLines.push('```');
    docLines.push("");
    docLines.push("### Suggest Related");
    docLines.push("");
    docLines.push('```');
    docLines.push('User: "What other calculators should I use?"');
    docLines.push('AI: Load bmi.json → Use navigation.seeAlso and relatedCalculators');
    docLines.push('```');
    docLines.push("");

    docLines.push("## Example RAG Workflow");
    docLines.push("");
    docLines.push("1. **Index**: Load all `exports/ai/*.json` files into vector database");
    docLines.push("2. **Embed**: Create embeddings from `title`, `description`, `purpose`, `clinicalGuidance`");
    docLines.push("3. **Retrieve**: On user query, find most relevant calculator(s)");
    docLines.push("4. **Generate**: Use retrieved context to generate accurate response");
    docLines.push("5. **Navigate**: Use navigation data to suggest follow-up calculators");
    docLines.push("");

    docLines.push("## Future MCP Integration");
    docLines.push("");
    docLines.push("This data can be served via MCP (Model Context Protocol) tools:");
    docLines.push("");
    docLines.push("```typescript");
    docLines.push("// Example MCP tool definition");
    docLines.push("mcp.tool({");
    docLines.push('  name: "get_calculator_context",');
    docLines.push('  description: "Get AI context for a medical calculator",');
    docLines.push("  input: { slug: z.string() },");
    docLines.push("  handler: async ({ slug }) => {");
    docLines.push("    return readJSON(`exports/ai/${slug}.json`);");
    docLines.push("  }");
    docLines.push("});");
    docLines.push("```");
    docLines.push("");

    writeFile(
      path.join(docsDir, "ai-context.md"),
      docLines.join("\n"),
    );

    console.log(
      `🤖 Generated ${slugs.length} AI context files`,
    );
  },
};

export default plugin;