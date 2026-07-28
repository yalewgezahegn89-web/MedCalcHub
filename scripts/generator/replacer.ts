import type { GeneratorOptions } from "./types";
import { calculatorVariable } from "./utils";

export function replacePlaceholders(
  content: string,
  options: GeneratorOptions,
) {
  return content
    .replaceAll(
      "calculator-id",
      options.slug,
    )
    .replaceAll(
      "calculator-slug",
      options.slug,
    )
    .replaceAll(
      "Calculator Name",
      options.name,
    )
    .replaceAll(
      "Short Name",
      options.name,
    )
    .replaceAll(
      '"General"',
      `"${options.category}"`,
    )
    .replaceAll(
      "calculatorTemplate",
      calculatorVariable(options.slug),
    );
}