"use client";

import { notFound } from "next/navigation";

import { CalculatorForm } from "@/components/calculators/calculator-form";
import { calculatorRegistry } from "@/lib/calculators/registry";

type CalculatorClientProps = {
  slug: string;
};

export function CalculatorClient({
  slug,
}: CalculatorClientProps) {
  const calculator = calculatorRegistry.find(
    (calc) => calc.slug === slug,
  );

  if (!calculator) {
    notFound();
  }

  return <CalculatorForm calculator={calculator} />;
}