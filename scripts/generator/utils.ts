import { GeneratorOptions } from "./types";

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
  return (
    slug
      .replace(/-([a-z])/g, (_, c) =>
        c.toUpperCase(),
      ) + "Calculator"
  );
}

export function normalizeOptions(
  options: GeneratorOptions,
) {
  return {
    ...options,

    slug: options.slug.toLowerCase(),
  };
}