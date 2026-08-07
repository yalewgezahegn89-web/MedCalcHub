/**
 * Incremental Generation Engine
 *
 * Regenerates ONLY calculators whose knowledge
 * definitions have changed. Avoids rewriting
 * unchanged files.
 *
 * This engine MUST NOT modify calculator logic.
 * It only determines what needs regeneration.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import type { CalculatorSuggestion } from "./calculator-intelligence";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface CacheEntry {
  calculators: Record<string, string>;
  version: string;
  generated: string;
}

interface IncrementalResult {
  total: number;
  generated: string[];
  skipped: string[];
  deleted: string[];
  duration: number;
}

// ─────────────────────────────────────────────────
// Paths
// ─────────────────────────────────────────────────

const CACHE_FILE = path.resolve(
  process.cwd(),
  ".generator-cache.json",
);

const CALCULATORS_DIR = path.resolve(
  process.cwd(),
  "lib",
  "calculators",
);

const TESTS_DIR = path.resolve(
  process.cwd(),
  "tests",
  "calculators",
);

const DOCS_DIR = path.resolve(
  process.cwd(),
  "docs",
);

const EXPORTS_DIR = path.resolve(
  process.cwd(),
  "exports",
);

const LOCALES_DIR = path.resolve(
  process.cwd(),
  "locales",
);

// ─────────────────────────────────────────────────
// Hash Calculation
// ─────────────────────────────────────────────────

/**
 * Calculate a deterministic SHA-256 hash for a
 * calculator's knowledge data.
 */
export function calculateKnowledgeHash(
  slug: string,
  entry: CalculatorSuggestion,
): string {
  const hashData = {
    slug,
    description: entry.description || "",
    formula: entry.formula
      ? typeof entry.formula === "string"
        ? entry.formula
        : JSON.stringify(entry.formula)
      : "",
    inputs: entry.inputs
      ? entry.inputs.map((inp) => {
          const obj = inp as Record<string, unknown>;
          return {
            id: obj.id,
            label: obj.label,
            type: obj.type,
            unit: obj.unit,
            required: obj.required,
            min: obj.min,
            max: obj.max,
          };
        })
      : [],
    classification: entry.classification
      ? entry.classification.map((cls) => {
          const obj = cls as unknown as Record<string, unknown>;
          return {
            label: obj.label,
            range: obj.range,
            status: obj.status,
            min: obj.min,
            max: obj.max,
          };
        })
      : [],
    faq: entry.faq
      ? entry.faq.map((f) => {
          const obj = f as Record<string, string>;
          return {
            question: obj.question,
            answer: obj.answer,
          };
        })
      : [],
    evidence: entry.evidence
      ? JSON.stringify(entry.evidence)
      : "",
    clinicalGuidance: entry.clinicalGuidance
      ? JSON.stringify(entry.clinicalGuidance)
      : "",
    relatedCalculators: entry.relatedCalculators
      ? [...entry.relatedCalculators].sort()
      : [],
    comparison: entry.comparison
      ? JSON.stringify(entry.comparison)
      : "",
  };

  const content = JSON.stringify(hashData, null, 0);

  return crypto
    .createHash("sha256")
    .update(content, "utf-8")
    .digest("hex");
}

// ─────────────────────────────────────────────────
// Cache Operations
// ─────────────────────────────────────────────────

/**
 * Load the generation cache from disk.
 */
export function loadGenerationCache(): Record<
  string,
  string
> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(
        CACHE_FILE,
        "utf-8",
      );

      const cache: CacheEntry =
        JSON.parse(content);

      return cache.calculators || {};
    }
  } catch {
    // Return empty cache on error
  }

  return {};
}

/**
 * Save the generation cache to disk.
 */
export function saveGenerationCache(
  calculators: Record<string, string>,
): void {
  const cache: CacheEntry = {
    version: "1.0",
    generated: new Date().toISOString(),
    calculators,
  };

  fs.writeFileSync(
    CACHE_FILE,
    JSON.stringify(cache, null, 2) + "\n",
    "utf-8",
  );
}

// ─────────────────────────────────────────────────
// Change Detection
// ─────────────────────────────────────────────────

/**
 * Detect which calculators have changed since the
 * last generation.
 */
export function detectChangedCalculators(
  knowledge: Record<string, CalculatorSuggestion>,
): string[] {
  const cache = loadGenerationCache();
  const changed: string[] = [];

  const slugs = Object.keys(knowledge).sort();

  for (const slug of slugs) {
    const entry = knowledge[slug];
    const currentHash = calculateKnowledgeHash(
      slug,
      entry,
    );
    const cachedHash = cache[slug];

    if (currentHash !== cachedHash) {
      changed.push(slug);
    }
  }

  return changed;
}

/**
 * Detect calculators that have been deleted from
 * knowledge but still exist in cache.
 */
export function removeDeletedCalculators(
  knowledge: Record<string, CalculatorSuggestion>,
): string[] {
  const cache = loadGenerationCache();
  const deleted: string[] = [];

  for (const slug of Object.keys(cache)) {
    if (!knowledge[slug]) {
      deleted.push(slug);

      // Delete generated files
      deleteFile(
        path.join(
          CALCULATORS_DIR,
          `${slug}.ts`,
        ),
      );

      deleteFile(
        path.join(
          TESTS_DIR,
          `${slug}.test.ts`,
        ),
      );

      deleteFile(
        path.join(
          DOCS_DIR,
          "calculators",
          `${slug}.md`,
        ),
      );

      // Delete export files
      deleteFile(
        path.join(
          EXPORTS_DIR,
          "fhir",
          `${slug}.json`,
        ),
      );

      deleteFile(
        path.join(
          EXPORTS_DIR,
          "hl7",
          `${slug}.json`,
        ),
      );

      deleteFile(
        path.join(
          EXPORTS_DIR,
          "ai",
          `${slug}.json`,
        ),
      );

      // Delete locale files
      const languages = [
        "en",
        "am",
        "fr",
        "es",
        "ar",
        "pt",
      ];

      for (const lang of languages) {
        deleteFile(
          path.join(
            LOCALES_DIR,
            lang,
            "calculators",
            `${slug}.json`,
          ),
        );
      }
    }
  }

  return deleted;
}

/**
 * Delete a file if it exists.
 */
function deleteFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // Ignore deletion errors
  }
}

// ─────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────

/**
 * Print the incremental generation report.
 */
export function printIncrementalReport(
  result: IncrementalResult,
): void {
  const lines: string[] = [];

  lines.push("");
  lines.push(
    "══════════════════════════════════════",
  );
  lines.push("");
  lines.push(
    "  Incremental Generation Report",
  );
  lines.push("");
  lines.push(
    "══════════════════════════════════════",
  );
  lines.push("");
  lines.push(
    `  Total Calculators    ${String(result.total).padStart(8)}`,
  );
  lines.push(
    `  Generated            ${String(result.generated.length).padStart(8)}`,
  );
  lines.push(
    `  Skipped              ${String(result.skipped.length).padStart(8)}`,
  );
  lines.push(
    `  Deleted              ${String(result.deleted.length).padStart(8)}`,
  );
  lines.push(
    `  Generation Time      ${String(result.duration + " ms").padStart(8)}`,
  );
  lines.push("");
  lines.push(
    "══════════════════════════════════════",
  );
  lines.push("");

  if (result.generated.length > 0) {
    lines.push("  Generated calculators:");

    for (const slug of result.generated) {
      lines.push(`    ✓ ${slug}`);
    }

    lines.push("");
  }

  if (result.deleted.length > 0) {
    lines.push("  Deleted calculators:");

    for (const slug of result.deleted) {
      lines.push(`    ✗ ${slug}`);
    }

    lines.push("");
  }

  console.log(lines.join("\n"));
}

// ─────────────────────────────────────────────────
// Full Incremental Run
// ─────────────────────────────────────────────────

/**
 * Run the full incremental generation cycle.
 * Returns which calculators need regeneration.
 */
export function runIncrementalCycle(
  knowledge: Record<string, CalculatorSuggestion>,
): IncrementalResult {
  const startTime = Date.now();

  const allSlugs =
    Object.keys(knowledge).sort();

  // Detect changed calculators
  const changed =
    detectChangedCalculators(knowledge);

  // Detect and remove deleted calculators
  const deleted =
    removeDeletedCalculators(knowledge);

  // Skipped = unchanged
  const skipped = allSlugs.filter(
    (slug) => !changed.includes(slug),
  );

  // Update cache with current hashes
  const cache = loadGenerationCache();
  const newCache: Record<string, string> = {};

  for (const slug of allSlugs) {
    newCache[slug] = calculateKnowledgeHash(
      slug,
      knowledge[slug],
    );
  }

  saveGenerationCache(newCache);

  const duration = Date.now() - startTime;

  return {
    total: allSlugs.length,
    generated: changed,
    skipped,
    deleted,
    duration,
  };
}