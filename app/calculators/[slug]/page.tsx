import { CalculatorLayout } from "@/components/calculators/layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";
import { ClinicalPearl } from "@/components/calculators/clinical-pearl";
import { ReferenceRange } from "@/components/calculators/reference-range";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { notFound } from "next/navigation";

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
      <CalculatorClient slug={slug} />

      <ReferenceRange
        normalRange={calculator.normalRange}
        referenceRanges={calculator.referenceRanges}
      />

      <ClinicalPearl
        slug={calculator.id}
      />

      <RelatedCalculators
        slug={calculator.id}
      />
    </CalculatorLayout>
  );
}