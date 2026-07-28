export type InputFieldType =
  | "number"
  | "text"
  | "select";

export type CalculatorInputOption = {
  label: string;
  value: string;
};

export type CalculatorInput = {
  id: string;
  label: string;
  type: InputFieldType;
  placeholder?: string;
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: CalculatorInputOption[];
  defaultValue?: string;
  helpText?: string;
};

export type ReferenceRange = {
  label: string;
  range: string;
};

export type Classification = {
  label: string;
  range: string;
  min?: number;
  max?: number;
  color?:
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "gray";
};

export type CalculatorResult = {
  value: string | number;
  unit?: string;
  score?: number;
  interpretation?: string;
  status?:
    | "normal"
    | "low"
    | "high"
    | "critical";
};

/* -------------------------------------------------------------------------- */
/*                              Registry V2 Types                             */
/* -------------------------------------------------------------------------- */

export type CalculatorEvidence = {
  source: string;
  reference?: string;
  link?: string;
  reviewedBy?: string;
  version?: string;
  updatedAt?: string;
};

export type CalculatorClinicalGuidance = {
  pearl?: string;
  commonMistakes?: string[];
  clinicalUse?: string[];
  contraindications?: string[];
  followUp?: string[];
};

export type CalculatorFaqItem = {
  question: string;
  answer: string;
};

export type CalculatorComparison = {
  title: string;
  calculators: {
    name: string;
    href: string;
    use: string;
  }[];
};

export type CalculatorDefinition = {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;

  category: string;
  specialty?: string;
  subcategory?: string;

  difficulty?:
    | "Basic"
    | "Intermediate"
    | "Advanced";

  tags?: string[];

  estimatedTime?: string;

  author?: string;

  reviewedBy?: string;

  featured?: boolean;

  updatedAt?: string;

  version?: string;

  keywords?: string[];

  warnings?: string[];

  formula?: string;

  normalRange?: string;

  referenceRanges?: ReferenceRange[];

  classification?: Classification[];

  clinicalNotes?: string;

  references?: string[];

  /* ---------------------- Registry V2 ---------------------- */

  clinical?: CalculatorClinicalGuidance;

  evidence?: CalculatorEvidence;

  relatedCalculators?: string[];

  faq?: CalculatorFaqItem[];

  comparison?: CalculatorComparison;

  /* --------------------------------------------------------- */

  inputs: CalculatorInput[];

  calculate(
    values: Record<string, string>,
  ): CalculatorResult;
};