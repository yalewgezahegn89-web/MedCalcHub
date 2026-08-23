export type InputFieldType =
  | "number"
  | "text"
  | "select";


export type CalculatorInputOption = {
  label: string;
  value: string;
};
export type FAQItem = {
  question: string;
  answer: string;
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


  conversion?: {

    type:
      | "divide"
      | "multiply";

    factor: number;

  };

};


export type CalculatorInputDefinition =
  CalculatorInput;



export type ReferenceRangeSex = "male" | "female" | "all";

export type ReferenceRangePopulation = "adult" | "pediatric" | "all";

export type ReferenceRangeAgeUnit = "years" | "months" | "days";

export type ReferenceRangeAgeGroup = {
    min?: number;
    max?: number;
    unit?: ReferenceRangeAgeUnit;
};

export type ReferenceRange = {

    label: string;

    range: string;

    unit?: string;

    /** Biological/clinical sex-specific interpretation. */
    sex?: ReferenceRangeSex;

    /** Population group (adult/pediatric/all). */
    population?: ReferenceRangePopulation;

    /** Partial or bounded age range. */
    ageGroup?: ReferenceRangeAgeGroup;

    /** Pregnancy-specific designation. Absent = no pregnancy designation supplied. */
    pregnancy?: boolean;

    /** Clinical context such as "fasting", "non-fasting", "resting", "acute illness". */
    context?: string;

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



/**
 * Rendered clinical-insight channel for a calculator.
 * Surfaced via ClinicalGuidancePanel on the calculator page.
 */
export type CalculatorClinicalInsight = {
  pearl?: string;
  commonMistakes?: string[];
};

export type CalculatorEvidence = {

  source?: string;

  reference?: string;

  reviewedBy?: string;

  version?: string;

  updatedAt?: string;

  link?: string;

  references?: string[];

};

export type ComparisonItem = {
  id?: string;
  name: string;
  href: string;
  use?: string;
  bestFor?: string;
  limitation?: string;
};

export type ComparisonMetadata = {
  title?: string;
  calculators?: ComparisonItem[];
};



export type CalculatorResult = {

  value:
    | string
    | number;


  unit?: string;


  score?: number;


  interpretation?: string;


  status?:
    | "normal"
    | "low"
    | "high"
    | "critical";


  advice?: string[];

  warnings?: string[];

  followUp?: string[];

};



export interface CalculatorDefinition {


  id: string;


  slug: string;


  name: string;


  shortName: string;



  description: string;



  category: string;



  specialty?: string;



  featured?: boolean;



  version?: string;



  updatedAt?: string;



  keywords?: string[];



  difficulty?: string;



  estimatedTime?: string;



  formula?: string;



  normalRange?: string;



  referenceRanges?: ReferenceRange[];



  classification?: Classification[];



  clinicalNotes?: string;



  clinical?: CalculatorClinicalInsight;

  comparison?: ComparisonMetadata;

  references?: string[];



  relatedCalculators?: string[];



  inputs: CalculatorInput[];



  calculate(

    values: Record<string,string>,

  ): CalculatorResult;


}