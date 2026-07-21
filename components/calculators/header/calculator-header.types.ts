import type { HTMLAttributes } from "react";

export interface CalculatorHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  updatedAt?: string;
}