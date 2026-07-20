import type { ChangeEvent } from "react";
import type { CalculatorInput } from "@/lib/calculators";

export interface FormFieldProps {
  input: CalculatorInput;
  inputId: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}