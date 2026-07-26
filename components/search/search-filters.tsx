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
    <div className="mb-8 flex flex-wrap gap-3">
      <button
        onClick={() => onChange("All")}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition",
          active === "All"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white hover:bg-slate-100",
        )}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            active === category
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-slate-100",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}