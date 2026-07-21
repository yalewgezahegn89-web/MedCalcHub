"use client";

import { useMemo, useState } from "react";

import { SearchBox } from "@/components/search";
import { searchCalculators } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const calculators = useMemo(
    () => searchCalculators(query),
    [query],
  );

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">
          Search Calculators
        </h1>

        <p className="mt-2 text-muted-foreground">
          Search by calculator name, category, or keywords.
        </p>
      </div>

      <SearchBox
        value={query}
        onChange={setQuery}
      />

      <div className="space-y-4">
        {calculators.map((calculator) => (
          <div
            key={calculator.id}
            className="rounded-lg border p-4"
          >
            <h2 className="font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Category: {calculator.category}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}