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
    updatedAt,
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
          updatedAt={updatedAt ?? new Date().getFullYear().toString()}
        />

        <p className="mt-6 rounded-lg border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
          Clinical decision-support tool for qualified healthcare professionals.
          Results are not a diagnosis and should not replace professional
          clinical judgment.
        </p>

        <div className="mt-8">
          {children}
        </div>
      </Container>
    </section>
  );
});

CalculatorLayout.displayName = "CalculatorLayout";