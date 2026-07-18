import type { ComponentProps } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

export type HeadingProps<T extends HeadingLevel = "h2"> = {
  as?: T;
  size?: HeadingSize;
} & ComponentProps<T>;
