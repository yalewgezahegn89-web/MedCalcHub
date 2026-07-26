import { CalculatorHeader } from "./calculator-header";
import { ClinicalDescription } from "./clinical-description";
import { FormulaCard } from "./formula-card";
import { EvidenceCard } from "./evidence-card";
import { ReferenceRanges } from "./reference-ranges";
import { RelatedCalculators } from "./related-calculators";

import { CalculatorForm } from "./calculator-form/calculator-form";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  calculator: CalculatorDefinition;
};

export function CalculatorPage({
  calculator,
}: Props) {
  return (
    <div className="space-y-8">

      <CalculatorHeader
        calculator={calculator}
      />

      <ClinicalDescription
        description={calculator.description}
      />

      {calculator.formula && (
        <FormulaCard
          formula={calculator.formula}
        />
      )}

      <CalculatorForm
        calculator={calculator}
      />

      {(calculator.evidence ||
        calculator.reference) && (
        <EvidenceCard
          source={
            calculator.evidence ??
            calculator.reference ??
            ""
          }
        />
      )}

      <ReferenceRanges
        normalRange={calculator.normalRange}
        referenceRanges={
          calculator.referenceRanges
        }
      />

      <RelatedCalculators
        slug={calculator.slug}
      />

    </div>
  );
}