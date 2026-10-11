import { Suspense } from "react";
import Link from "next/link";

import { SectionHeader } from "@/components/ui/section-header";

import { ComparisonClient } from "./comparison-client";

export default function ComparisonPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

      <SectionHeader
        title="Calculator Comparison"
        description="Compare medical calculators side by side to choose the most appropriate tool for your patient."
      />

      <div className="max-w-3xl space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
        <p>
          Comparisons earn their place when two calculators
          look interchangeable but are not. Selecting up to
          three tools lines them up across the rows that
          usually decide the choice: what question each one
          answers, which inputs it demands, the formula
          behind the result, the clinical area it belongs
          to, its stated limitations, and how many sources
          each entry cites.
        </p>

        <p>
          Pay particular attention to the purpose and
          limitation rows. Two scores can both be about
          bleeding risk, or both produce a number between
          zero and ten, and still have been derived from
          different populations and used to make different
          decisions. Outputs are only comparable when the
          tools were built to answer the same clinical
          question — otherwise a higher score in one column
          means something entirely different from a higher
          score in the next.
        </p>

        <p>
          If you are still looking for the right starting
          point, browse{" "}
          <Link
            href="/calculators"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            all calculators
          </Link>
          , drill into a subject via{" "}
          <Link
            href="/categories"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            categories
          </Link>
          , or start from your clinical area under{" "}
          <Link
            href="/specialties"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            specialties
          </Link>
          .
        </p>
      </div>

      <Suspense fallback={null}>
        <ComparisonClient />
      </Suspense>

    </div>
  );
}
