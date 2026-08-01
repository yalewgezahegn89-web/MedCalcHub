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
}