"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/layout/heading";
import type { CalculatorLayoutProps } from "./calculator-layout.types";

export const CalculatorLayout = forwardRef<HTMLElement, CalculatorLayoutProps>(
  function CalculatorLayout(
  { className, title, description, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cn("py-8 sm:py-12 lg:py-16", className)} {...props}>
      <Container>
        <div className="space-y-4 sm:space-y-6">
          <Heading size="xl">
            {title}
          </Heading>

          {description && (
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 sm:mt-8">{children}</div>
      </Container>
    </section>
  );
});

CalculatorLayout.displayName = "CalculatorLayout";
