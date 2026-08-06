import type {
  FormulaDefinition,
} from "../../../types";

import type {
  FormulaContext,
} from "./build-algebraic";

import type {
  NormalizedFormula,
} from "../normalize-formula";

import {
  normalizeFormula,
} from "../normalize-formula";

import {
  buildAlgebraicFormula,
} from "./build-algebraic";
import {
  buildScoreFormula,
} from "./build-score";
import {
  buildDescriptiveFormula,
} from "./build-descriptive";
import {
  buildCompositeFormula,
} from "./build-composite";
import {
  buildLookupFormula,
} from "./build-lookup";
import {
  buildConditionalFormula,
} from "./build-conditional";
import {
  buildConverterFormula,
} from "./build-converter";

/**
 * Formula type display names for error messages.
 */
const FORMULA_TYPE_LABELS: Record<string, string> = {
  algebraic: "Algebraic",
  score: "Score",
  descriptive: "Descriptive",
  lookup: "Lookup",
  conditional: "Conditional",
  converter: "Converter",
  composite: "Composite",
};

/**
 * Dispatch a FormulaDefinition to the appropriate
 * formula builder based on its type.
 *
 * Currently only "algebraic" is implemented. All other
 * types throw a descriptive error indicating they are
 * not yet implemented.
 */
export function buildFormula(
  formula: FormulaDefinition,
  context: FormulaContext,
): string {

  const normalized: NormalizedFormula =
    normalizeFormula(formula);

  switch (normalized.type) {

    case "algebraic":
      return buildAlgebraicFormula(
        normalized as { type: "algebraic"; expression?: string },
        context,
      );

    case "score":
      return buildScoreFormula(context);

    case "descriptive":
      return buildDescriptiveFormula(context);
    case "composite":
      return buildCompositeFormula(context);

    case "lookup":
      return buildLookupFormula(
        normalized,
        context,
      );

    case "conditional":
      return buildConditionalFormula(
        normalized,
        context,
      );

    case "converter":
      return buildConverterFormula(
        normalized,
        context,
      );

    default: {
      const _exhaustive: never = normalized.type;
      throw new Error(
        `Unknown formula type "${String(_exhaustive)}".`,
      );
    }
  }
}
