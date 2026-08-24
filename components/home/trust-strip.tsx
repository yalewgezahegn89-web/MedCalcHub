import { BookOpen, Calculator, LayoutGrid, Stethoscope } from "lucide-react";

import { calculatorRegistry, getCategories } from "@/lib/calculators/registry";

export function TrustStrip() {
  const calculatorCount = calculatorRegistry.length;
  const categoryCount = getCategories().length;

  const items = [
    {
      icon: Calculator,
      label: `${calculatorCount} calculators`,
      caption: "Free clinical tools",
    },
    {
      icon: LayoutGrid,
      label: `${categoryCount} clinical areas`,
      caption: "Organized by topic",
    },
    {
      icon: BookOpen,
      label: "Evidence-based",
      caption: "Referenced sources",
    },
    {
      icon: Stethoscope,
      label: "Decision support",
      caption: "For healthcare professionals",
    },
  ];

  return (
    <section aria-label="Platform overview">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-4 dark:border-slate-800 dark:bg-slate-800">
        {items.map(({ icon: Icon, label, caption }) => (
          <li
            key={label}
            className="flex items-center gap-3 bg-white px-4 py-4 dark:bg-slate-900"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60">
              <Icon
                className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                {label}
              </span>
              <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                {caption}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
