"use client";
import { notFound } from "next/navigation";

import { CalculatorForm } from "@/components/calculators/calculator-form";
import { CalculatorHeader } from "@/components/calculators/header";
import { calculatorRegistry } from "@/lib/calculators/registry";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export default function CalculatorPage({
  params,
}: CalculatorPageProps) {
  const { slug } = params;

  const calculator = calculatorRegistry.find(
    (calc) => calc.slug === slug,
  );

  if (!calculator) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <CalculatorHeader
        title={calculator.name}
        description={calculator.description}
      />

      <CalculatorForm calculator={calculator} />
    </main>
  );
}