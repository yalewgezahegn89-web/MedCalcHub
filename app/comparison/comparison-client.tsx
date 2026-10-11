"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

export function ComparisonClient() {
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
    <>
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
    </>
  );
}
