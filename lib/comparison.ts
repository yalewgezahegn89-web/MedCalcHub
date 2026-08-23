import type {
  CalculatorDefinition,
  ComparisonItem,
} from "@/lib/calculators/calculator.types";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { clinicalContentRegistry } from "@/lib/clinical-content";

export const MAX_COMPARISON = 3;

export const COMPARISON_PARAM = "c";

export const MISSING_VALUE = "—";

export type ComparisonRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  specialty: string;
  purpose: string;
  limitation: string;
  inputs: string[];
  formula: string;
  clinicalNotes: string;
  referenceCount: number;
};

export type ComparisonGroup = {
  name: string;
  slugs: string[];
};

function getSlugByValue(value: string): string | undefined {
  const bySlug = calculatorRegistry.find(
    (calculator) => calculator.slug === value,
  );
  if (bySlug) return bySlug.slug;
  const byId = calculatorRegistry.find(
    (calculator) => calculator.id === value,
  );
  return byId?.slug;
}

export function normalizeSelection(values: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const value of values) {
    if (!value) continue;
    const slug = getSlugByValue(value);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    normalized.push(slug);
    if (normalized.length >= MAX_COMPARISON) break;
  }

  return normalized;
}

export function decodeSelection(
  searchParams: URLSearchParams,
): string[] {
  return normalizeSelection(searchParams.getAll(COMPARISON_PARAM));
}

export function encodeSelection(values: string[]): URLSearchParams {
  const params = new URLSearchParams();

  for (const slug of normalizeSelection(values)) {
    params.append(COMPARISON_PARAM, slug);
  }

  return params;
}

export function getComparisonQuery(values: string[]): string {
  return encodeSelection(values).toString();
}

export function resolveSelectedCalculators(
  slugs: string[],
): CalculatorDefinition[] {
  const selected = new Set(normalizeSelection(slugs));

  return calculatorRegistry.filter((calculator) =>
    selected.has(calculator.slug),
  );
}

function resolveComparisonItems(
  calculator: CalculatorDefinition,
): ComparisonItem[] {
  return calculator.comparison?.calculators ?? [];
}

function findSelfItem(
  calculator: CalculatorDefinition,
): ComparisonItem | undefined {
  return resolveComparisonItems(calculator).find((item) =>
    item.href?.endsWith(`/calculators/${calculator.slug}`),
  );
}

export function prepareComparisonRows(
  calculators: CalculatorDefinition[],
): ComparisonRow[] {
  return calculators.map((calculator) => {
    const selfItem = findSelfItem(calculator);
    const content = clinicalContentRegistry[calculator.slug];

    return {
      id: calculator.id,
      slug: calculator.slug,
      name: calculator.name,
      category: calculator.category,
      specialty: calculator.specialty ?? MISSING_VALUE,
      purpose:
        selfItem?.bestFor ??
        selfItem?.use ??
        content?.clinicalPurpose ??
        MISSING_VALUE,
      limitation:
        selfItem?.limitation ??
        content?.limitations?.[0] ??
        MISSING_VALUE,
      inputs: calculator.inputs.map((input) => input.label),
      formula: calculator.formula ?? MISSING_VALUE,
      clinicalNotes: calculator.clinicalNotes ?? MISSING_VALUE,
      referenceCount: calculator.references?.length ?? 0,
    };
  });
}

function resolveComparisonTitle(
  calculator: CalculatorDefinition,
): string {
  return (
    calculator.comparison?.title ??
    clinicalContentRegistry[calculator.slug]?.comparison?.title ??
    ""
  );
}

export function getComparisonGroup(
  calculator: CalculatorDefinition,
): ComparisonGroup {
  const items = resolveComparisonItems(calculator);
  const contentItems =
    clinicalContentRegistry[calculator.slug]?.comparison?.calculators ??
    [];
  const candidate = [calculator.slug];

  for (const item of [...items, ...contentItems]) {
    const slug = item.href?.replace("/calculators/", "");
    if (slug) candidate.push(slug);
  }

  return {
    name: resolveComparisonTitle(calculator) || calculator.name,
    slugs: normalizeSelection(candidate),
  };
}

export function getComparisonGroupBySlug(
  slug: string,
): ComparisonGroup {
  const calculator = calculatorRegistry.find(
    (candidate) => candidate.slug === slug,
  );
  if (!calculator) return { name: "", slugs: [] };
  return getComparisonGroup(calculator);
}

export function buildSuggestedGroups(): ComparisonGroup[] {
  const seen = new Set<string>();
  const groups: ComparisonGroup[] = [];

  for (const calculator of calculatorRegistry) {
    const group = getComparisonGroup(calculator);
    if (group.slugs.length < 2) continue;

    const key = [...group.slugs].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    groups.push(group);
  }

  groups.sort((a, b) => {
    if (b.slugs.length !== a.slugs.length) {
      return b.slugs.length - a.slugs.length;
    }
    const aIndex = calculatorRegistry.findIndex(
      (calculator) => calculator.slug === a.slugs[0],
    );
    const bIndex = calculatorRegistry.findIndex(
      (calculator) => calculator.slug === b.slugs[0],
    );
    return aIndex - bIndex;
  });

  return groups;
}

export function shouldShowSafetyNote(
  calculators: CalculatorDefinition[],
): boolean {
  const categories = new Set(
    calculators.map((calculator) => calculator.category),
  );
  const specialties = new Set(
    calculators
      .map((calculator) => calculator.specialty)
      .filter((specialty): specialty is string => Boolean(specialty)),
  );

  return categories.size > 1 || specialties.size > 1;
}
