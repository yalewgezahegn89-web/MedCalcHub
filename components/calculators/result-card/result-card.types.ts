import type { ComponentProps, ReactNode } from "react";

export type ResultCardStatus = "normal" | "low" | "high" | "critical";

export type ResultCardProps = ComponentProps<"div"> & {
  label: string;
  value: string | number;
  unit?: string;
  interpretation?: string;
  status?: ResultCardStatus;
  children?: ReactNode;
};
