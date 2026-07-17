import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input"> & {
  error?: boolean;
};
