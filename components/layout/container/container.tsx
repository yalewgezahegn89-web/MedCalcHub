"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { ContainerProps, ContainerSize } from "./container.types";

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { className, size = "lg", children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
