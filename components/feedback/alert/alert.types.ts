import type { ComponentProps } from "react";

export type AlertVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "destructive";

export type AlertProps = ComponentProps<"div"> & {
  variant?: AlertVariant;
};
