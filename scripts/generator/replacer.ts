import type { GeneratorOptions } from "./types";
import { calculatorVariable } from "./utils";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function replacePlaceholders(
  content: string,
  options: GeneratorOptions,
) {
  return content

    // Existing placeholders
    .replaceAll("calculator-id", options.slug)
    .replaceAll("calculator-slug", options.slug)
    .replaceAll("Calculator Name", options.name)
    .replaceAll("Short Name", options.name)
    .replaceAll('"General"', `"${options.category}"`)
    .replaceAll(
      "calculatorTemplate",
      calculatorVariable(options.slug),
    )

    // Smart placeholders (Sprint 32)
    .replaceAll("{{NAME}}", options.name)
    .replaceAll("{{SLUG}}", options.slug)
    .replaceAll("{{CATEGORY}}", options.category)
    .replaceAll("{{SPECIALTY}}", options.specialty)
    .replaceAll("{{DATE}}", today())

    // Default values
    .replaceAll(
      "{{DESCRIPTION}}",
      `Calculates ${options.name} for clinical decision support.`,
    )

    .replaceAll(
      "{{FORMULA}}",
      "Formula to be completed.",
    )

    .replaceAll(
      "{{NORMAL_RANGE}}",
      "Refer to clinical guideline.",
    )

    .replaceAll(
      "{{CLINICAL_NOTES}}",
      "Interpret results together with the patient's clinical presentation.",
    )

    .replaceAll(
      "{{REFERENCE}}",
      "Primary clinical guideline.",
    );
}