import type { HTMLAttributes, ReactNode } from "react";

export interface CalculatorHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  updatedAt?: string;

  specialty?: string;
  featured?: boolean;
  actions?: ReactNode;
}