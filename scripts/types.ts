<<<<<<< HEAD
import type {
  CalculatorClinicalGuidance,
  CalculatorEvidence,
  FAQItem,
  ComparisonItem,
  CalculatorInputDefinition,
} from "../lib/calculators/calculator.types";
=======
import type { FAQItem, ComparisonItem } from "../lib/calculators/calculator.types";


export interface KnowledgeComparisonMetadata {
  title?: string;
  calculators: ComparisonItem[];
}

export interface ClinicalGuidance {
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

export type { CalculatorInputDefinition } from "../lib/calculators/calculator.types";

export interface Evidence {

  source?: string;

  reference?: string;

  reviewedBy?: string;

  version?: string;

  updatedAt?: string;

  link?: string;

  references?: string[];

}

/**
 * Supported formula types for the Generator formula engine.
 *
 * Each type will have its own builder in future commits.
 * Currently only "algebraic" is implemented.
 */
export type FormulaType =
  | "algebraic"
  | "score"
  | "descriptive"
  | "lookup"
  | "conditional"
  | "converter"
  | "composite";

export type FormulaDefinition =
  | string
  | {
      type: FormulaType;

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

  clinicalGuidance?: CalculatorClinicalGuidance;

  faq?: readonly FAQItem[];

  comparison?: ComparisonItem;

  clinical?: CalculatorClinicalGuidance;

  evidence?: CalculatorEvidence;

  relatedCalculators?: readonly string[];

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



<<<<<<< HEAD
=======
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
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
