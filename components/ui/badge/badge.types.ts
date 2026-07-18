import type { ComponentProps } from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};
