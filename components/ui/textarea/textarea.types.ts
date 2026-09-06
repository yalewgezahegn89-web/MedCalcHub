import type { ComponentProps } from "react";

export type TextareaProps = ComponentProps<"textarea"> & {
  error?: boolean;
};