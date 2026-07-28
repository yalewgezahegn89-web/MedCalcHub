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

      {calculator.evidence && (
  <EvidenceCard
    source={calculator.evidence.source}
    reference={calculator.evidence.reference}
    reviewedBy={calculator.evidence.reviewedBy}
    version={calculator.evidence.version}
    updatedAt={calculator.evidence.updatedAt}
    link={calculator.evidence.link}
  />
)}

      <ReferenceRanges
        normalRange={calculator.normalRange}
        referenceRanges={
          calculator.referenceRanges
        }
      />

      <RelatedCalculators
  related={calculator.relatedCalculators}
/>

    </div>
  );
}