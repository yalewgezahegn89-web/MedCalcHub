"use client";

import { cn } from "@/lib/utils/cn";

type SearchFiltersProps = {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
};

export default function SearchFilters({
  categories,
  active,
  onChange,
}: SearchFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filter calculators by category">
      <button
        onClick={() => onChange("All")}
        aria-pressed={active === "All"}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition min-h-[44px]",
          active === "All"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600",
        )}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          aria-pressed={active === category}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition min-h-[44px]",
            active === category
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
