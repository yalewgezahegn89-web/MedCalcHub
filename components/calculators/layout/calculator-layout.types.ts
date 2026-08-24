import type { ComponentProps, ReactNode } from "react";

export type CalculatorLayoutProps =
  Omit<ComponentProps<"section">, "title"> & {
    title: string;
    description?: string;
    children: ReactNode;

    specialty?: string;
    category?: string;

    // NEW
    actions?: ReactNode;

    updatedAt?: string;
  };