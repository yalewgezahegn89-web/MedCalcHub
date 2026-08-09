"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";
import { addRecentCalculator } from "@/lib/recent";

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

useEffect(() => {
  if (calculator) {
    addRecentCalculator(calculator.id);
  }
}, [calculator]);

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