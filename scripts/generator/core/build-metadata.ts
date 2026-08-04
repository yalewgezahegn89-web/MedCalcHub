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
      suggestion.clinicalGuidance
        ? {
            advice:
              suggestion.clinicalGuidance.advice
                ? [...suggestion.clinicalGuidance.advice]
                : undefined,
            warnings:
              suggestion.clinicalGuidance.warnings
                ? [...suggestion.clinicalGuidance.warnings]
                : undefined,
            followUp:
              suggestion.clinicalGuidance.followUp
                ? [...suggestion.clinicalGuidance.followUp]
                : undefined,
          }
        : undefined,

    reference:
      "MedCalcHub Clinical References",

    reviewedBy:
      "MedCalcHub Clinical Team",

    featured:
      false,

  };

}