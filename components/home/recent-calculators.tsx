"use client";

import { useEffect, useState } from "react";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { getRecentCalculators } from "@/lib/recent";

import { SectionHeader } from "@/components/ui/section-header";
import { CalculatorCard } from "@/components/calculators/calculator-card";

export function RecentCalculators() {
  const [recent, setRecent] = useState(
    calculatorRegistry.slice(0, 4),
  );

  useEffect(() => {
    const ids = getRecentCalculators();

    if (ids.length === 0) return;

    const calculators = ids
  .map((id) =>
    calculatorRegistry.find(
      (calculator) => calculator.id === id,
    ),
  )
  .filter(
    (
      calculator,
    ): calculator is (typeof calculatorRegistry)[number] =>
      calculator !== undefined,
  );

if (calculators.length > 0) {
  setRecent(calculators);
}
  }, []);

  return (
    <section className="space-y-8">
      <SectionHeader
        title="🕒 Recently Used"
        description="Quick access to calculators you've recently opened."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {recent.map((calculator) => (
  <CalculatorCard
    key={calculator.id}
    calculator={calculator}
  />
))}
      </div>
    </section>
  );
}