import type { FAQItem, ComparisonItem } from "../lib/calculators/calculator.types";


export interface KnowledgeComparisonMetadata {
  title?: string;
  calculators: ComparisonItem[];
}

export interface ClinicalGuidance {

  advice?: readonly string[];

  warnings?: readonly string[];

  followUp?: readonly string[];

}

export interface Evidence {

  source?: string;

  reference?: string;

  reviewedBy?: string;

  version?: string;

  updatedAt?: string;

  link?: string;

  references?: string[];

}

export type FormulaDefinition =
  | string
  | {
      type:
        | "algebraic"
        | "conditional"
        | "lookup"
        | "composite"
        | "descriptive";

      expression?: string;

      description?: string;

      config?: Record<string, unknown>;
    };

export interface GeneratorOptions {

  name: string;

  shortName: string;

  slug: string;

  category: string;

  specialty: string;

  description: string;

  formula: FormulaDefinition;

  normalRange: string;

  keywords: string[];

  reference: string;

  reviewedBy: string;

  featured?: boolean;

  inputs?: CalculatorInputDefinition[];

  clinicalGuidance?: ClinicalGuidance;

  evidence?: Evidence;

  faq?: FAQItem[];

  comparison?: KnowledgeComparisonMetadata;

  relatedCalculators?: string[];

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



export interface InputValidationRule {

  allowNegative?: boolean;

  allowZero?: boolean;

  minimum?: number;

  maximum?: number;

}


export interface CalculatorInputDefinition {

  id: string;

  label: string;

  type:
    | "number"
    | "text"
    | "select";

  unit?: string;

  placeholder?: string;

  required?: boolean;


  /**
   * Automatic unit conversion
   *
   * Example:
   *
   * Height cm → meter
   *
   * conversion:{
   *   type:"divide",
   *   factor:100
   * }
   */
  conversion?: {

    type:
      | "divide"
      | "multiply";

    factor: number;

  };


  /**
   * Configurable input validation rules.
   *
   * If omitted, defaults apply:
   * allowNegative = false
   * allowZero = false
   */
  validation?: InputValidationRule;

}
