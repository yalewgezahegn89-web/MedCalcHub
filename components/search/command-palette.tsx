"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Command } from "lucide-react";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) {
      return calculatorRegistry.slice(0, 10);
    }

    const q = query.toLowerCase();

    return calculatorRegistry
      .filter((calc) => {
        return (
          calc.name.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.category.toLowerCase().includes(q) ||
          (calc.keywords ?? []).some((k) =>
            k.toLowerCase().includes(q),
          )
        );
      })
      .slice(0, 10);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center gap-3 border-b px-4 py-4">
          <Search className="h-5 w-5 text-slate-400" />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators..."
            className="flex-1 border-none bg-transparent outline-none"
          />

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border px-2 py-1 text-xs"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto">

          {results.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b px-5 py-4 hover:bg-slate-50"
            >
              <div>
                <div className="font-medium">
                  {calc.name}
                </div>

                <div className="text-sm text-slate-500">
                  {calc.category}
                </div>
              </div>

              <Command className="h-4 w-4 text-slate-400" />
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}