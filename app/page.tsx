import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { BrowseSpecialties } from "@/components/home/browse-specialties";
import { TrendingCalculators } from "@/components/home/trending-calculators";
import { RecentCalculators } from "@/components/home/recent-calculators";

import { SectionHeader } from "@/components/ui/section-header";
import { CalculatorCard } from "@/components/calculators/calculator-card";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function HomePage() {
  const featuredCalculators = calculatorRegistry
    .filter((calculator) => calculator.featured)
    .slice(0, 8);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-10">
      <Hero />

      <Stats />

      <BrowseSpecialties />

      <section className="space-y-8">
        <SectionHeader
          title="Featured Calculators"
          description="Evidence-based calculators frequently used in clinical practice."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCalculators.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              calculator={calculator}
            />
          ))}
        </div>
      </section>

      <TrendingCalculators />

      <RecentCalculators />
    </main>
  );
}