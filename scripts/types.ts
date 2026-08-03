import type {
  CalculatorClinicalGuidance,
  CalculatorEvidence,
  FAQItem,
  ComparisonItem,
  CalculatorInputDefinition,
} from "../lib/calculators/calculator.types";

export type { CalculatorInputDefinition } from "../lib/calculators/calculator.types";

export interface GeneratorOptions {

  name: string;

  shortName: string;

  slug: string;

  category: string;

  specialty: string;

  description: string;

  formula: string;

  normalRange: string;

  keywords: string[];

  reference: string;

  reviewedBy: string;

  featured?: boolean;

  inputs?: CalculatorInputDefinition[];

  clinicalGuidance?: CalculatorClinicalGuidance;

  faq?: readonly FAQItem[];

  comparison?: ComparisonItem;

  clinical?: CalculatorClinicalGuidance;

  evidence?: CalculatorEvidence;

  relatedCalculators?: readonly string[];

  /**
   * Automatic clinical classification rules
   *
   * Example:
   *
   * classification:[
   *   {
   *     min:18.5,
   *     max:24.9,
   *     label:"Normal weight",
   *     status:"normal"
   *   }
   * ]
   */
  classification?: readonly ClassificationRule[];


  /**
   * Allow updating existing calculators.
   *
   * Default:
   * false = create only
   *
   * true:
   * overwrite/update existing calculator
   */
  force?: boolean;

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



