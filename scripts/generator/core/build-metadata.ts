import { suggestCalculator } from "./calculator-intelligence";

export function buildMetadata(
  calculatorName: string,
) {

  const suggestion =
    suggestCalculator(
      calculatorName,
    );


  const slug =
    calculatorName
      .toLowerCase()
      .replace(
        " calculator",
        "",
      )
      .replace(
        /\s+/g,
        "-",
      )
      .trim();


  return {

    name:
      calculatorName,

    shortName:
      calculatorName.replace(
        / Calculator$/i,
        "",
      ),

    slug,

    category:
      suggestion.category ??
      "General",

    specialty:
      suggestion.specialty ??
      "General Medicine",

    description:
      suggestion.description ??
      "",

    formula:
      suggestion.formula ??
      "",

    normalRange:
      suggestion.normalRange ??
      "",

    keywords:
      suggestion.keywords
        ? [...suggestion.keywords]
        : [],

    inputs:
      suggestion.inputs
        ? [...suggestion.inputs]
        : [],

    classification:
      suggestion.classification
        ? [...suggestion.classification]
        : [],

    clinicalGuidance:
      suggestion.clinicalGuidance ??
      suggestion.clinical ??
      {},

    clinical:
      suggestion.clinical ??
      suggestion.clinicalGuidance ??
      {},

    faq:
      suggestion.faq
        ? [...suggestion.faq]
        : [],

    comparison:
      suggestion.comparison ?? {
        title: "",
        calculators: [],
      },

    evidence:
      suggestion.evidence ?? {},

    relatedCalculators:
      suggestion.relatedCalculators
        ? [...suggestion.relatedCalculators]
        : [],

    reference:
      "MedCalcHub Clinical References",

    reviewedBy:
      "MedCalcHub Clinical Team",

    featured:
      false,

  };

}