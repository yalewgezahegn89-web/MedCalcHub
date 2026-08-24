import Link from "next/link";

import { SectionHeader } from "@/components/ui/section-header";
import { CalculatorCard } from "@/components/calculators/calculator-card";

import {
  calculatorRegistry,
} from "@/lib/calculators/registry";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

export const POPULAR_CALCULATOR_SLUGS = [
  "bmi",
  "ckd-epi-2021",
  "cha2ds2-vasc",
  "gcs",
  "news2",
  "curb-65",
  "heart-score",
  "sofa-score",
] as const;

export function getPopularCalculators(): CalculatorDefinition[] {
  const seen = new Set<string>();

  return POPULAR_CALCULATOR_SLUGS.flatMap((slug) => {
    if (seen.has(slug)) {
      return [];
    }
    seen.add(slug);

    const calculator = calculatorRegistry.find(
      (entry) => entry.slug === slug,
    );

    return calculator ? [calculator] : [];
  });
}

export function PopularCalculators() {
  const popular = getPopularCalculators();

  return (
    <section>
      <SectionHeader
        title="Popular Clinical Tools"
        description="Quick access to commonly used medical calculators."
        action={
          <Link
            href="/calculators"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Browse all calculators
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {popular.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
            compact
          />
        ))}
      </div>
    </section>
  );
}
