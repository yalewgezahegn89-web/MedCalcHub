"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { CalculatorDefinition } from "@/lib/calculators";

type Props = {
  calculators: CalculatorDefinition[];
};

export function CalculatorSearch({
  calculators,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return calculators;

    const search = query.toLowerCase();

    return calculators.filter((calc) => {
      return (
        calc.name.toLowerCase().includes(search) ||
        calc.category.toLowerCase().includes(search) ||
        calc.description.toLowerCase().includes(search) ||
        calc.keywords?.some((k) =>
          k.toLowerCase().includes(search),
        )
      );
    });
  }, [query, calculators]);

  return (
    <>
      <input
        type="text"
        placeholder="Search calculators..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-8 w-full rounded-xl border px-4 py-3"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border p-5 transition hover:bg-muted"
          >
            <h3 className="font-semibold">
              {calculator.name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <div className="mt-4 text-xs text-muted-foreground">
              {calculator.category}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}