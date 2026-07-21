import { CalculatorLayout } from "@/components/calculators/layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";
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
    </CalculatorLayout>
  );
}