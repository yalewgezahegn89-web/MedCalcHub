"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { AlertProps, AlertVariant } from "./alert.types";

const variantStyles: Record<AlertVariant, string> = {
  default:
    "bg-muted text-muted-foreground border-border",
  info:
    "bg-primary/10 text-primary border-primary/20",
  success:
    "bg-success/10 text-success border-success/20",
  warning:
    "bg-warning/10 text-warning border-warning/20",
  destructive:
    "bg-destructive/10 text-destructive border-destructive/20",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    { className, variant = "default", role = "alert", children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          "relative w-full rounded-lg border p-4",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Alert.displayName = "Alert";
