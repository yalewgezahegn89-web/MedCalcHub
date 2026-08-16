"use client";

import { calculatorRegistry } from "@/lib/calculators/registry";

import {
  MAX_COMPARISON,
  buildSuggestedGroups,
} from "@/lib/comparison";

const SUGGESTED_GROUP_LIMIT = 6;

type ComparisonSelectorProps = {
  selected: string[];
  onChange: (slugs: string[]) => void;
};

export function ComparisonSelector({
  selected,
  onChange,
}: ComparisonSelectorProps) {
  const suggestedGroups = buildSuggestedGroups().slice(
    0,
    SUGGESTED_GROUP_LIMIT,
  );
  const atLimit = selected.length >= MAX_COMPARISON;

  function toggleCalculator(slug: string) {
    if (selected.includes(slug)) {
      onChange(selected.filter((value) => value !== slug));
      return;
    }

    if (atLimit) return;
    onChange([...selected, slug]);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="text-lg font-semibold">
        Select calculators to compare
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        You can compare up to {MAX_COMPARISON} calculators.
      </p>

      <p
        aria-live="polite"
        className={
          atLimit
            ? "mt-2 text-sm font-medium text-blue-600 dark:text-blue-400"
            : "mt-2 text-sm text-slate-500 dark:text-slate-400"
        }
      >
        {selected.length} of {MAX_COMPARISON} selected
      </p>

      {suggestedGroups.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Quick compare
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedGroups.map((group) => (
              <button
                key={group.slugs.join("-")}
                type="button"
                onClick={() => onChange(group.slugs)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:hover:border-blue-400 dark:hover:text-blue-300"
              >
                {group.name} ({group.slugs.length})
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {calculatorRegistry.map((calculator) => {
          const checked = selected.includes(calculator.slug);
          const disabled = atLimit && !checked;

          return (
            <label
              key={calculator.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-500 dark:border-slate-700"
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() =>
                  toggleCalculator(calculator.slug)
                }
              />

              <div>
                <div className="font-medium">
                  {calculator.name}
                </div>

                <div className="text-sm text-slate-500">
                  {calculator.category}
                </div>
              </div>
            </label>
          );
        })}
      </div>

    </div>
  );
}
