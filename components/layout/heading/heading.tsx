"use client";

import { forwardRef, createElement } from "react";
import { cn } from "@/lib/utils/cn";
import type {
  HeadingProps,
  HeadingLevel,
  HeadingSize,
} from "./heading.types";

const sizeStyles: Record<HeadingSize, string> = {
  display: "text-2xl font-bold tracking-tight leading-tight",
  xl: "text-xl font-semibold tracking-tight leading-snug",
  lg: "text-lg font-semibold leading-snug",
  md: "text-base font-medium leading-normal",
  sm: "text-sm font-medium leading-normal",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    { as, className, size = "md", children, ...props },
    ref,
  ) {
    const tag: HeadingLevel = as ?? "h2";

    return createElement(
      tag,
      {
        ref,
        className: cn(sizeStyles[size], className),
        ...props,
      },
      children,
    );
  },
);

Heading.displayName = "Heading";
