import type { InputHTMLAttributes } from "react";

export interface SearchBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}