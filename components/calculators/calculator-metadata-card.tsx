import Link from "next/link";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  calculator: CalculatorDefinition;
};

function toCategorySlug(category: string) {
  return `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;
}

function toSpecialtySlug(specialty: string) {
  return `/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`;
}

export function CalculatorMetadataCard({
  calculator,
}: Props) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
      <h2 className="mb-5 text-xl font-semibold">
        Calculator Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        <div>
          <p className="text-sm text-slate-500">
            Specialty
          </p>

          {calculator.specialty ? (
            <Link
              href={toSpecialtySlug(calculator.specialty)}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {calculator.specialty}
            </Link>
          ) : (
            <p className="font-medium">General</p>
          )}
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Category
          </p>

          <Link
            href={toCategorySlug(calculator.category)}
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {calculator.category}
          </Link>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Difficulty
          </p>

          <p className="font-medium">
            {calculator.difficulty ?? "Basic"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Estimated Time
          </p>

          <p className="font-medium">
            {calculator.estimatedTime ?? "30 seconds"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Version
          </p>

          <p className="font-medium">
            {calculator.version ?? "1.0"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Last Updated
          </p>

          <p className="font-medium">
            {calculator.updatedAt ?? "—"}
          </p>
        </div>

      </div>

      {calculator.formula && (
        <div className="mt-8">
          <p className="mb-2 text-sm text-slate-500">
            Formula
          </p>

          <div className="rounded-lg bg-slate-100 p-4 font-mono text-sm dark:bg-zinc-900">
            {calculator.formula}
          </div>
        </div>
      )}

      {calculator.keywords?.length ? (
        <div className="mt-8">
          <p className="mb-3 text-sm text-slate-500">
            Keywords
          </p>

          <div className="flex flex-wrap gap-2">
            {calculator.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border px-3 py-1 text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}