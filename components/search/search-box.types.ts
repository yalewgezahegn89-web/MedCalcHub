import type { InputHTMLAttributes, ReactNode } from "react";

export interface SearchBoxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange"
  > {
  value: string;

  onChange: (value: string) => void;

  onSubmit?: () => void;

  icon?: ReactNode;

  button?: ReactNode;

  loading?: boolean;
}