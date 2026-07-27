"use client";

import { useState } from "react";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import { SectionHeader } from "@/components/ui/section-header";

import {
  ComparisonGrid,
  ComparisonSelector,
  ComparisonTable,
} from "@/components/comparison";

export default function ComparisonPage() {
  const [selected, setSelected] = useState<
    CalculatorDefinition[]
  >([]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

      <SectionHeader
        title="Calculator Comparison"
        description="Compare medical calculators side by side to choose the most appropriate tool for your patient."
      />

      <ComparisonSelector
        onChange={setSelected}
      />

      <ComparisonGrid
        calculators={selected}
      />

      <ComparisonTable
        calculators={selected}
      />

    </main>
  );
}