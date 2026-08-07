import { calculatorKnowledge } from "../knowledge";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { GeneratorOptions } from "../../types";

export class ValidationError extends Error {
  calculator: string;

  constructor(
    calculator: string,
    reason: string,
  ) {
    super(
      `\n❌ ERROR\nCalculator: ${calculator}\nReason: ${reason}`,
    );
    this.calculator = calculator;
    this.name = "ValidationError";
  }
}

function requireField(
  slug: string,
  field: string,
  value: unknown,
): void {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) &&
      value.length === 0)
  ) {
    throw new ValidationError(
      slug,
      `Missing required field: ${field}`,
    );
  }
}

function checkClassificationOverlap(
  slug: string,
  classification: readonly {
    min?: number;
    max?: number;
    label: string;
  }[],
): void {
  for (
    let i = 0;
    i < classification.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < classification.length;
      j++
    ) {
      const a = classification[i];
      const b = classification[j];

      const aMin = a.min ?? -Infinity;
      const aMax = a.max ?? Infinity;
      const bMin = b.min ?? -Infinity;
      const bMax = b.max ?? Infinity;

      if (aMin <= bMax && bMin <= aMax) {
        const aRange =
          a.min !== undefined &&
          a.max !== undefined
            ? `${a.min}–${a.max}`
            : a.min !== undefined
              ? `≥${a.min}`
              : `<${(a.max ?? 0) + 0.1}`;

        const bRange =
          b.min !== undefined &&
          b.max !== undefined
            ? `${b.min}–${b.max}`
            : b.min !== undefined
              ? `≥${b.min}`
              : `<${(b.max ?? 0) + 0.1}`;

        throw new ValidationError(
          slug,
          `Classification ranges overlap:\n  ${a.label}: ${aRange}\n  ${b.label}: ${bRange}`,
        );
      }
    }
  }
}

function checkComparisonHref(
  slug: string,
  comparison: {
    title?: string;
    calculators: {
      name: string;
      href: string;
      use?: string;
    }[];
  },
): void {
  for (const calc of comparison.calculators) {
    if (
      !calc.href.startsWith("/calculators/")
    ) {
      throw new ValidationError(
        slug,
        `Invalid comparison href format for "${calc.name}": "${calc.href}". Expected format: /calculators/<slug>`,
      );
    }
  }
}

function getAllRegisteredSlugs(): string[] {
  const knowledgeSlugs = Object.keys(
    calculatorKnowledge,
  );

  try {
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
    const registrySlugs = slugMatches.map(
      (m) => m.replace(/id:\s*"/, "").replace(/"$/, ""),
    );
    return [
      ...new Set([
        ...knowledgeSlugs,
        ...registrySlugs,
      ]),
    ];
  } catch {
    return knowledgeSlugs;
  }
}

function checkRelatedCalculators(
  slug: string,
  relatedCalculators: readonly string[],
): void {
  const allSlugs = getAllRegisteredSlugs();

  for (const ref of relatedCalculators) {
    if (!allSlugs.includes(ref)) {
      throw new ValidationError(
        slug,
        `relatedCalculators references unknown slug: "${ref}". Known slugs: ${allSlugs.join(", ")}`,
      );
    }
  }
}

export function validateKnowledge(
  options: GeneratorOptions,
): void {
  const slug = options.slug;

  // Core fields (always required)
  requireField(slug, "formula", options.formula);
  requireField(
    slug,
    "category",
    options.category,
  );
  requireField(
    slug,
    "specialty",
    options.specialty,
  );

  // Inputs
  requireField(slug, "inputs", options.inputs);
  if (
    options.inputs &&
    options.inputs.length > 0
  ) {
    for (const input of options.inputs) {
      if (!input.id || !input.label) {
        throw new ValidationError(
          slug,
          `Input missing required "id" or "label" field`,
        );
      }
    }
  }

  // V2 fields: validate only if at least one V2 field is present
  // (partial V2 knowledge means all V2 fields should be complete)
  const hasV2Data =
    hasOwnKeys(options.clinicalGuidance) ||
    hasOwnKeys(options.evidence) ||
    (options.faq && options.faq.length > 0);

  if (hasV2Data) {
    requireField(
      slug,
      "clinicalGuidance",
      options.clinicalGuidance,
    );
    requireField(
      slug,
      "evidence",
      options.evidence,
    );
    requireField(slug, "faq", options.faq);
  }

  // Classification overlap
  if (
    options.classification &&
    options.classification.length > 0
  ) {
    checkClassificationOverlap(
      slug,
      options.classification,
    );
  }

  // relatedCalculators
  if (
    options.relatedCalculators &&
    options.relatedCalculators.length > 0
  ) {
    checkRelatedCalculators(
      slug,
      options.relatedCalculators,
    );
  }

  // comparison href
  if (options.comparison) {
    checkComparisonHref(
      slug,
      options.comparison,
    );
  }
}

function hasOwnKeys(
  obj: unknown,
): boolean {
  if (
    obj === undefined ||
    obj === null ||
    typeof obj !== "object"
  ) {
    return false;
  }
  return Object.keys(obj).length > 0;
}
