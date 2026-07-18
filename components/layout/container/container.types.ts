import type { ComponentProps } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps = ComponentProps<"div"> & {
  size?: ContainerSize;
};
