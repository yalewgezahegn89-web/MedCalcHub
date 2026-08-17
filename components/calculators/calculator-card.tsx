

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Star,
} from "lucide-react";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import { FavoriteIndicator } from "./favorite-indicator";

type Props = {
  calculator: CalculatorDefinition;
  showDescription?: boolean;
  compact?: boolean;
};

export function CalculatorCard({
  calculator,
  showDescription = true,
  compact = false,
}: Props) {
  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
          <Calculator className="h-6 w-6 text-blue-700 dark:text-blue-400" />
        </div>

        <FavoriteIndicator id={calculator.id} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {calculator.category}
        </span>

        {calculator.specialty && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {calculator.specialty}
          </span>
        )}

        {calculator.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {calculator.name}
        </h3>

        {showDescription && (
          <p
            className={`mt-2 text-sm text-slate-600 dark:text-slate-400 ${
              compact ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {calculator.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Open Calculator
        </span>

        <ArrowRight className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400" />
      </div>
    </Link>
  );
}