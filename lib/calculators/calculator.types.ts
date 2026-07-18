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

export type CalculatorResult = {
  value: string | number;
  unit?: string;
  interpretation?: string;
  status?: "normal" | "low" | "high" | "critical";
};

export type CalculatorDefinition = {
  id: string;
  name: string;
  description: string;
  category: string;
  slug?: string;
  warnings?: string[];

  inputs: CalculatorInput[];

  calculate(values: Record<string, string>): CalculatorResult;
};
