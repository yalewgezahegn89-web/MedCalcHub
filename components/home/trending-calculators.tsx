import { calculatorRegistry } from "@/lib/calculators/registry";

import { SectionHeader } from "@/components/ui/section-header";
import { CalculatorCard } from "@/components/calculators/calculator-card";

export function TrendingCalculators() {
  const calculators = calculatorRegistry
    .filter((calculator) => calculator.featured)
    .slice(0, 4);

  return (
    <section className="space-y-8">
      <SectionHeader
        title="🔥 Trending Calculators"
        description="Frequently used evidence-based calculators."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
          />
        ))}
      </div>
    </section>
  );
}