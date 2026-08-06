import type { GeneratorOptions } from "./types";
import { sanitizeIdentifier } from "./generator/core/sanitize-identifier";

export function toPascalCase(text: string) {
  return text
    .split("-")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join("");
}

export function calculatorVariable(
  slug: string,
) {
  return sanitizeIdentifier(slug) + "Calculator";
}

export function normalizeOptions(
  options: GeneratorOptions,
) {
  return {
    ...options,

    slug: options.slug.toLowerCase(),
  };
}