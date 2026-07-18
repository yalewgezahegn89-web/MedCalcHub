"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { BadgeProps, BadgeVariant, BadgeSize } from "./badge.types";

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-muted text-muted-foreground",
  primary:
    "bg-primary text-primary-foreground",
  secondary:
    "bg-muted text-muted-foreground",
  success:
    "bg-success text-white",
  warning:
    "bg-warning text-white",
  destructive:
    "bg-destructive text-white",
  outline:
    "border border-border bg-transparent text-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-5 px-1.5 text-[0.625rem] leading-5",
  md: "h-6 px-2 text-xs leading-6",
  lg: "h-7 px-2.5 text-sm leading-7",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center whitespace-nowrap rounded-full font-medium",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
