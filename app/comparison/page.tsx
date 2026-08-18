"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SectionHeader } from "@/components/ui/section-header";

import {
  ComparisonGrid,
  ComparisonSelector,
  ComparisonTable,
} from "@/components/comparison";

import {
  decodeSelection,
  encodeSelection,
  resolveSelectedCalculators,
  shouldShowSafetyNote,
} from "@/lib/comparison";

function ComparisonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSlugs = decodeSelection(searchParams);
  const calculators = resolveSelectedCalculators(selectedSlugs);

  function handleSelectionChange(slugs: string[]) {
    const query = encodeSelection(slugs).toString();
    router.replace(query ? `/comparison?${query}` : "/comparison", {
      scroll: false,
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

      <SectionHeader
        title="Calculator Comparison"
        description="Compare medical calculators side by side to choose the most appropriate tool for your patient."
      />

      <ComparisonSelector
        selected={selectedSlugs}
        onChange={handleSelectionChange}
      />

      {calculators.length >= 2 && shouldShowSafetyNote(calculators) && (
        <p
          role="note"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
        >
          These calculators serve different clinical purposes. Compare
          their methods and intended uses; do not assume their results are
          interchangeable.
        </p>
      )}

      <ComparisonGrid
        calculators={calculators}
      />

      <ComparisonTable
        calculators={calculators}
      />

    </div>
  );
}

export default function ComparisonPageWithSuspense() {
  return (
    <Suspense fallback={null}>
      <ComparisonPage />
    </Suspense>
  );
}
