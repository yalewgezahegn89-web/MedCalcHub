"use client";

import { useState } from "react";

import { SectionHeader } from "@/components/ui/section-header";

import {
  ComparisonGrid,
  ComparisonSelector,
} from "@/components/comparison";

import { resolveSelectedCalculators } from "@/lib/comparison";

export default function ComparisonPage() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

      <SectionHeader
        title="Calculator Comparison"
        description="Compare multiple medical calculators side by side."
      />

      <ComparisonSelector
        selected={selected}
        onChange={setSelected}
      />

      <ComparisonGrid
        calculators={resolveSelectedCalculators(selected)}
      />

    </main>
  );
}
