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



export type CalculatorClinicalGuidance = {

  advice?: string[];

  warnings?: string[];

  followUp?: string[];

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



  tags?: string[];



  difficulty?: string;



  estimatedTime?: string;



  warnings?: string[];



  advice?: string[];



  followUp?: string[];



  formula?: string;



  normalRange?: string;



  referenceRanges?: ReferenceRange[];



  classification?: Classification[];



  clinicalNotes?: string;



  clinicalGuidance?: CalculatorClinicalGuidance;



  clinical?: CalculatorClinicalGuidance;



  evidence?: CalculatorEvidence;

  faq?: FAQItem[];
comparison?: unknown;
  references?: string[];



  relatedCalculators?: string[];



  inputs: CalculatorInput[];



  calculate(

    values: Record<string,string>,

  ): CalculatorResult;


}