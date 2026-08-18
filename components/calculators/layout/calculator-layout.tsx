"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/layout/container";

import { CalculatorHeader } from "@/components/calculators/header";

import type { CalculatorLayoutProps } from "./calculator-layout.types";

export const CalculatorLayout = forwardRef<
  HTMLElement,
  CalculatorLayoutProps
>(function CalculatorLayout(
  {
    className,
    title,
    description,
    specialty,
    category,
    actions,
    children,
    ...props
  },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(
        "py-8 sm:py-12 lg:py-16",
        className,
      )}
      {...props}
    >
      <Container>
        <CalculatorHeader
          title={title}
          description={description ?? ""}
          specialty={specialty}
          category={category}
          actions={actions}
          updatedAt={new Date().getFullYear().toString()}
        />

        <div className="mt-8">
          {children}
        </div>
      </Container>
    </section>
  );
});

CalculatorLayout.displayName = "CalculatorLayout";