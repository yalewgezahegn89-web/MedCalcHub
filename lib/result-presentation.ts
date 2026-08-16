import type { CalculatorResult } from "@/lib/calculators/calculator.types";
import {
  findClassification,
  type ClassificationItem,
} from "@/lib/calculators/utils/classification";

export type ResultSections = {
  score?: number;
  interpretation?: string;
  warnings: string[];
  advice: string[];
  followUp: string[];
};

function cleanList(items?: string[]): string[] {
  if (!items) return [];

  return items
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function prepareResultSections(
  result: CalculatorResult,
): ResultSections {
  return {
    score: result.score,
    interpretation: result.interpretation,
    warnings: cleanList(result.warnings),
    advice: cleanList(result.advice),
    followUp: cleanList(result.followUp),
  };
}

export function findResultClassification(
  value: string | number,
  items?: ClassificationItem[],
) {
  const numeric =
    typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numeric)) return undefined;

  return findClassification(numeric, items);
}

/**
 * Distinguishes validation-error results from clinically critical ones.
 *
 * Several calculators return `{ value: 0, status: "critical" }` without a
 * unit when inputs fail validation. A genuinely critical clinical result
 * is virtually always non-zero or carries a unit, so the value/unit/status
 * checks are conservative. The interpretation must also read like an
 * input-validation message (not a clinical classification such as
 * "G5: Kidney failure" or "Severe insulin resistance") before a result is
 * treated as a validation error.
 */
const VALIDATION_TEXT_PATTERN =
  /\b(is|are) required\b|cannot be (negative|zero)|cannot exceed|must be (a )?(positive|non-negative|valid) number|must be (positive|non-negative)|must be between|must not exceed|must not be (less than|greater than)|must be at (least|most)|\binvalid\b|select a valid|required input missing|not allowed|please enter a valid|unable to classify/i;

export function isValidationStyleResult(
  result: CalculatorResult,
): boolean {
  if (result.status !== "critical") return false;
  if (result.unit) return false;

  const numeric = Number(result.value);

  if (!Number.isFinite(numeric) || numeric !== 0) {
    return false;
  }

  if (!result.interpretation) return false;

  return VALIDATION_TEXT_PATTERN.test(
    result.interpretation,
  );
}

export function buildResultText(
  label: string,
  result: CalculatorResult,
): string {
  const sections = prepareResultSections(result);

  const lines: string[] = [];
  lines.push(label);
  lines.push("");
  lines.push(
    `Result: ${result.value}${
      result.unit ? ` ${result.unit}` : ""
    }`,
  );

  if (
    sections.score !== undefined &&
    String(sections.score) !== String(result.value)
  ) {
    lines.push(`Score: ${sections.score}`);
  }

  if (sections.interpretation) {
    lines.push("");
    lines.push(sections.interpretation);
  }

  const blocks: [string, string[]][] = [
    ["Warnings", sections.warnings],
    ["Advice", sections.advice],
    ["Follow-up", sections.followUp],
  ];

  for (const [heading, items] of blocks) {
    if (items.length === 0) continue;

    lines.push("");
    lines.push(`${heading}:`);

    for (const item of items) {
      lines.push(`- ${item}`);
    }
  }

  return lines.join("\n");
}
