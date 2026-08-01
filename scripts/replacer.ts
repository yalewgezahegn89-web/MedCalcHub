import type { GeneratorOptions } from "./types";
import { calculatorVariable } from "./utils";
import { buildInputs } from "./generator/core/input-builder";
import { buildCalculate } from "./generator/core/calculate-builder";

function today() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

export function replacePlaceholders(
  content: string,
  options: GeneratorOptions,
) {
  return content

    // Legacy placeholders
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
      options.shortName,
    )
    .replaceAll(
      '"General"',
      `"${options.category}"`,
    )
    .replaceAll(
      "calculatorTemplate",
      calculatorVariable(options.slug),
    )

    // Smart placeholders
    .replaceAll(
      "{{NAME}}",
      options.name,
    )
    .replaceAll(
      "{{SHORT_NAME}}",
      options.shortName,
    )
    .replaceAll(
      "{{SLUG}}",
      options.slug,
    )
    .replaceAll(
      "{{CATEGORY}}",
      options.category,
    )
    .replaceAll(
      "{{SPECIALTY}}",
      options.specialty,
    )
    .replaceAll(
      "{{DATE}}",
      today(),
    )

    // Metadata
    .replaceAll(
      "{{DESCRIPTION}}",
      options.description,
    )
    .replaceAll(
      "{{FORMULA}}",
      options.formula,
    )
    .replaceAll(
      "{{NORMAL_RANGE}}",
      options.normalRange,
    )
    .replaceAll(
      "{{CLINICAL_NOTES}}",
      "Interpret results together with the patient's clinical presentation.",
    )
    .replaceAll(
      "{{REFERENCE}}",
      options.reference,
    )
    .replaceAll(
      "{{REVIEWED_BY}}",
      options.reviewedBy,
    )
    .replaceAll(
      "{{FEATURED}}",
      String(options.featured),
    )
    .replaceAll(
      "{{KEYWORDS}}",
      options.keywords
        .map((k) => `"${k}"`)
        .join(", "),
    )

    // Inputs
    .replaceAll(
      "{{INPUTS}}",
      buildInputs(
        options.inputs ?? [],
      ),
    )

    // Calculator logic
    .replaceAll(
      "{{CALCULATE}}",
      buildCalculate(
        options.formula,
        options.inputs ?? [],
      ),
    );
}