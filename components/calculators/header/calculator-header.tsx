"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";

import type { CalculatorHeaderProps } from "./calculator-header.types";

export const CalculatorHeader = forwardRef<
  HTMLDivElement,
  CalculatorHeaderProps
>(function CalculatorHeader(
  {
    className,
    title,
    description,
    updatedAt,
    ...props
  },
  ref,
) {
  return (
    <Card
      ref={ref}
      className={cn("p-6 space-y-3", className)}
      {...props}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>
      </div>

      {updatedAt && (
        <p className="text-sm text-muted-foreground">
          Last updated: {updatedAt}
        </p>
      )}
    </Card>
  );
});

CalculatorHeader.displayName = "CalculatorHeader";