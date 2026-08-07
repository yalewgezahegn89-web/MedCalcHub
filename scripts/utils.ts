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

export function serializeTypeScriptValue(
  value: unknown,
  fallback = "undefined",
  indent = 2,
) {
  if (value === undefined) {
    return fallback;
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "object") {
    const json = JSON.stringify(value, null, 2);
    const padding = " ".repeat(indent);
    return json.replace(/\n/g, "\n" + padding);
  }

  return String(value);
}
