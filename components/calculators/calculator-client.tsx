"use client";

import { notFound } from "next/navigation";

import { CalculatorForm } from "@/components/calculators/calculator-form";
import { ClinicalNotes } from "@/components/calculators/clinical-notes";
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

  return (
    <div className="space-y-6">
      <CalculatorForm calculator={calculator} />
      <ClinicalNotes
        formula={calculator.formula}
        normalRange={calculator.normalRange}
        clinicalNotes={calculator.clinicalNotes}
        references={calculator.references}
      />
    </div>
  );
}