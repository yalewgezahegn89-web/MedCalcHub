"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

export function CalculatorSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const search = query.toLowerCase();

    return calculatorRegistry
      .filter((calculator) => {
        return (
          calculator.name
            .toLowerCase()
            .includes(search) ||
          calculator.description
            .toLowerCase()
            .includes(search) ||
          calculator.category
            .toLowerCase()
            .includes(search) ||
          calculator.specialty
            ?.toLowerCase()
            .includes(search) ||
          calculator.keywords?.some((keyword) =>
            keyword
              .toLowerCase()
              .includes(search),
          )
        );
      })
      .slice(0, 8);
  }, [query]);

  return (
    <section className="space-y-5">

      <input
        type="text"
        placeholder="Search calculators..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full rounded-xl border p-4"
      />

      {query && (
        <div className="space-y-3">

          {results.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No calculators found.
            </p>
          )}

          {results.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >
              <div className="font-semibold">
                {calculator.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {calculator.description}
              </div>

              <div className="mt-1 text-xs text-primary">
                {calculator.category}
                {calculator.specialty &&
                  ` • ${calculator.specialty}`}
              </div>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}