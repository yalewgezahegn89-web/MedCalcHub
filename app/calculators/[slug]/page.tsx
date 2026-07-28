import { notFound } from "next/navigation";

import { CalculatorLayout } from "@/components/calculators/layout/calculator-layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";
import { ClinicalGuidancePanel } from "@/components/calculators/clinical-guidance-panel";
import { EvidenceCard } from "@/components/calculators/evidence-card";
import { CalculatorComparison } from "@/components/calculators/calculator-comparison";
import { ReferenceRanges } from "@/components/calculators/reference-ranges";
import { RelatedCalculators } from "@/components/calculators/related-calculators";

import { calculatorRegistry } from "@/lib/calculators/registry";

type CalculatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CalculatorPage({
  params,
}: CalculatorPageProps) {
  const { slug } = await params;

  const calculator = calculatorRegistry.find(
    (calc) => calc.slug === slug,
  );

  if (!calculator) {
    notFound();
  }

  return (
    <CalculatorLayout
      title={calculator.name}
      description={calculator.description}
    >
      <CalculatorClient slug={calculator.slug} />

      <ReferenceRanges
        normalRange={calculator.normalRange}
        referenceRanges={calculator.referenceRanges}
      />

      <ClinicalGuidancePanel
        pearl={calculator.clinical?.pearl}
        mistakes={calculator.clinical?.commonMistakes}
        notes={calculator.clinicalNotes}
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

      <CalculatorComparison
        slug={calculator.id}
      />

      <RelatedCalculators
        related={calculator.relatedCalculators}
      />
    </CalculatorLayout>
  );
}