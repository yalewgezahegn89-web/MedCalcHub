export type InputFieldType = "number" | "text" | "select";

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
};

export type ReferenceRange = {
  label: string;
  range: string;
};

export type CalculatorResult = {
  value: string | number;
  unit?: string;
  interpretation?: string;
  status?: "normal" | "low" | "high" | "critical";
};

export type CalculatorDefinition = {
  id: string;

  slug?: string;

  name: string;

  shortName?: string;

  description: string;

  category: string;

  featured?: boolean;

  updatedAt?: string;

  version?: string;

  keywords?: string[];

  warnings?: string[];

  formula?: string;

  normalRange?: string;

  referenceRanges?: ReferenceRange[];

  clinicalNotes?: string;

  references?: string[];

  inputs: CalculatorInput[];

  calculate(values: Record<string, string>): CalculatorResult;
};