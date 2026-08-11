import { calculatorRegistry } from "@/lib/calculators/registry";
import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

/**
 * Sprint 1.7 — Related Calculator Discovery
 *
 * Provides programmatic discovery of related calculators using:
 * 1. Manual relatedCalculators field (if populated)
 * 2. Shared specialty
 * 3. Shared category
 * 4. Shared keywords
 *
 * Always excludes the current calculator.
 * Results are deterministic and de-duplicated.
 */

export interface RelatedOptions {
  /** Maximum related calculators to return. Default: 5 */
  limit?: number;
}

const DEFAULT_LIMIT = 5;

export function getRelatedCalculators(
  calculator: CalculatorDefinition,
  options: RelatedOptions = {},
): CalculatorDefinition[] {
  const limit = options.limit ?? DEFAULT_LIMIT;

  const manualIds = calculator.relatedCalculators ?? [];

  if (manualIds.length > 0) {
    const manualRelated = manualIds
      .map((id) =>
        calculatorRegistry.find((c) => c.id === id),
      )
      .filter(
        (c): c is CalculatorDefinition =>
          c !== undefined && c.id !== calculator.id,
      );

    if (manualRelated.length > 0) {
      return manualRelated.slice(0, limit);
    }
  }

  return discoverByMetadata(calculator, limit);
}

function discoverByMetadata(
  calculator: CalculatorDefinition,
  limit: number,
): CalculatorDefinition[] {
  const seen = new Set<string>([calculator.id]);
  const scored: Array<{
    calc: CalculatorDefinition;
    score: number;
  }> = [];

  for (const candidate of calculatorRegistry) {
    if (seen.has(candidate.id)) continue;
    seen.add(candidate.id);

    let score = 0;

    if (
      candidate.specialty &&
      calculator.specialty &&
      candidate.specialty.toLowerCase() ===
        calculator.specialty.toLowerCase()
    ) {
      score += 10;
    }

    if (
      candidate.category.toLowerCase() ===
      calculator.category.toLowerCase()
    ) {
      score += 5;
    }

    const calcKeywords = new Set(
      (calculator.keywords ?? []).map((k) =>
        k.toLowerCase(),
      ),
    );
    const sharedKeywords = (candidate.keywords ?? []).filter(
      (k) => calcKeywords.has(k.toLowerCase()),
    );
    score += sharedKeywords.length;

    if (score > 0) {
      scored.push({ calc: candidate, score });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.calc.name.localeCompare(b.calc.name);
  });

  return scored
    .slice(0, limit)
    .map((s) => s.calc);
}