import type { FAQItem, ComparisonItem } from "../../../lib/calculators/calculator.types";
import {
  calculatorKnowledge,
} from "../knowledge";


export interface KnowledgeComparisonMetadata {
  title?: string;
  calculators: readonly ComparisonItem[];
}


export interface ClassificationRule {

  min?: number;

  max?: number;

  label: string;

  status:
    | "normal"
    | "low"
    | "high"
    | "critical";
}

export interface ClinicalGuidance {

  advice?: readonly string[];

  warnings?: readonly string[];

  followUp?: readonly string[];
}

export interface CalcEvidence {

  source?: string;

  reference?: string;

  reviewedBy?: string;

  version?: string;

  updatedAt?: string;

  link?: string;

  references?: readonly string[];

}

export interface CalculatorSuggestion {

  category?: string;

  specialty?: string;

  description?: string;

  formula?: string;

  normalRange?: string;

  keywords?: readonly string[];

  inputs?: readonly unknown[];

  classification?: readonly ClassificationRule[];

  clinicalGuidance?: ClinicalGuidance;

  evidence?: CalcEvidence;

  faq?: readonly FAQItem[];

  comparison?: KnowledgeComparisonMetadata;

  relatedCalculators?: readonly string[];

}



function normalizeKey(
  name: string,
): string {

  return name
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
}



export function suggestCalculator(
  calculatorName: string,
): Partial<CalculatorSuggestion> {

  const key =
    normalizeKey(
      calculatorName,
    );


  const knowledge =
    calculatorKnowledge as Record<
      string,
      CalculatorSuggestion
    >;



  if (knowledge[key]) {
    return knowledge[key];
  }



  for (
    const candidate of Object.keys(
      knowledge,
    )
  ) {

    if (
      key.includes(candidate) ||
      candidate.includes(key)
    ) {

      return knowledge[candidate];

    }

  }



  return {};

}