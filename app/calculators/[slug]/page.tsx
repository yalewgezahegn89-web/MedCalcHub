import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorLayout } from "@/components/calculators/layout/calculator-layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";
import { CalculatorMetadataCard } from "@/components/calculators/calculator-metadata-card";
import { AdSlot } from "@/components/ads";
import { CalculatorComparison } from "@/components/calculators/calculator-comparison";
import { ReferenceRanges } from "@/components/calculators/reference-ranges";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ClinicalContentPanel } from "@/components/calculators/clinical-content-panel";
import { RelatedGuides } from "@/components/guides/related-guides";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/layout/container";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { getClinicalContent } from "@/lib/clinical-content";
import { getGuidesForCalculator } from "@/lib/guides";
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
  const clinicalContent = getClinicalContent(calculator.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Container size="lg" className="pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: calculator.name },
          ]}
        />
      </Container>

      <CalculatorLayout
        title={calculator.name}
        description={calculator.description}
        specialty={calculator.specialty}
        category={calculator.category}
        updatedAt={calculator.updatedAt}
      >
        <CalculatorClient slug={calculator.slug} />

        <AdSlot
          size="banner"
          slotId="placeholder-calc-primary"
        />

        <CalculatorMetadataCard
          calculator={calculator}
        />

        <ReferenceRanges
          normalRange={calculator.normalRange}
          referenceRanges={calculator.referenceRanges}
        />

        {clinicalContent && (
          <ClinicalContentPanel content={clinicalContent} />
        )}

        {!clinicalContent?.comparison && (
          <CalculatorComparison
            slug={calculator.slug}
            comparison={calculator.comparison}
          />
        )}

        <RelatedCalculators
          related={calculator.relatedCalculators}
          calculator={calculator}
        />

        <RelatedGuides guides={getGuidesForCalculator(calculator.slug)} />
      </CalculatorLayout>
    </>
  );
}