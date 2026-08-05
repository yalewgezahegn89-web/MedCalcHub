import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorLayout } from "@/components/calculators/layout/calculator-layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";
import { CalculatorMetadataCard } from "@/components/calculators/calculator-metadata-card";
import { ClinicalGuidancePanel } from "@/components/calculators/clinical-guidance-panel";
import { EvidenceCard } from "@/components/calculators/evidence-card";
import { CalculatorComparison } from "@/components/calculators/calculator-comparison";
import { CalculatorFAQ } from "@/components/calculators/calculator-faq";
import { ReferenceRanges } from "@/components/calculators/reference-ranges";
import { RelatedCalculators } from "@/components/calculators/related-calculators";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { buildCalculatorSEO } from "@/lib/seo/calculator-seo";
import { buildCalculatorJsonLd } from "@/lib/seo/jsonld";

type CalculatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;

  const calculator = calculatorRegistry.find(
    (calc) => calc.slug === slug,
  );

  if (!calculator) {
    return {
      title: "Calculator Not Found",
    };
  }

  return buildCalculatorSEO(calculator);
}

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

  const jsonLd = buildCalculatorJsonLd(calculator);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <CalculatorLayout
        title={calculator.name}
        description={calculator.description}
      >
        <CalculatorClient slug={calculator.slug} />

        <CalculatorMetadataCard
          calculator={calculator}
        />

        <ReferenceRanges
          normalRange={calculator.normalRange}
          referenceRanges={calculator.referenceRanges}
        />

        <ClinicalGuidancePanel
          pearl={calculator.clinical?.pearl}
          mistakes={calculator.clinical?.commonMistakes}
          notes={calculator.clinicalNotes}
        />

        <EvidenceCard
          source={
            calculator.references?.[0] ??
            "Medical Literature"
          }
          reference={calculator.references?.join(", ")}
          reviewedBy="MedCalcHub Clinical Team"
          version={calculator.version}
          updatedAt={calculator.updatedAt}
        />

        <CalculatorComparison
          slug={calculator.slug}
          comparison={calculator.comparison}
        />

        <CalculatorFAQ
          slug={calculator.slug}
        />

        <RelatedCalculators
          related={calculator.relatedCalculators}
        />
      </CalculatorLayout>
    </>
  );
}