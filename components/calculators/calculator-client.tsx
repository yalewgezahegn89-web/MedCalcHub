"use client";

import { notFound } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { addRecentCalculator } from "@/lib/recent";
import { getSavedCalculation } from "@/lib/saved-calculations";

import { CalculatorForm } from "@/components/calculators/calculator-form";
import { ClinicalNotes } from "@/components/calculators/clinical-notes";
import { calculatorRegistry } from "@/lib/calculators/registry";

type CalculatorClientProps = {
  slug: string;
};

export function CalculatorClient({
  slug,
}: CalculatorClientProps) {
  const searchParams = useSearchParams();
  const restoreId = searchParams.get("restore");

  const calculator = calculatorRegistry.find(
  (calc) => calc.slug === slug,
  );

  useEffect(() => {
    if (calculator) {
      addRecentCalculator(calculator.id);
    }
  }, [calculator]);

  const initialValues = useMemo(() => {
    if (!restoreId || !calculator) {
      return undefined;
    }

    const saved = getSavedCalculation(restoreId);

    if (
      !saved ||
      saved.calculatorId !== calculator.id
    ) {
      return undefined;
    }

    return saved.values;
  }, [restoreId, calculator]);

  if (!calculator) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CalculatorForm
        calculator={calculator}
        initialValues={initialValues}
      />
      <ClinicalNotes
        formula={calculator.formula}
        normalRange={calculator.normalRange}
        clinicalNotes={calculator.clinicalNotes}
        references={calculator.references}
      />
    </div>
  );
}