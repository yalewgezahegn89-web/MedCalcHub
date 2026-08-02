import type {
  ClassificationRule,
} from "../../types";

export function buildReferenceRanges(
  classification: readonly ClassificationRule[],
): string {

  if (
    !classification ||
    classification.length === 0
  ) {
    return "[]";
  }

  return `[
${classification
  .map((rule) => {

    let range = "";

    if (
      rule.min !== undefined &&
      rule.max !== undefined
    ) {

      range =
        `${rule.min}–${rule.max}`;

    }

    else if (
      rule.min !== undefined
    ) {

      range =
        `≥${rule.min}`;

    }

    else if (
      rule.max !== undefined
    ) {

      range =
        `<${rule.max + 0.1}`;

    }

    return `  {
    label: "${rule.label}",
    range: "${range}",
  }`;

  })
  .join(",\n")}
]`;

}