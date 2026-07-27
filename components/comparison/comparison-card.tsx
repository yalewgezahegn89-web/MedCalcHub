"use client";

import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type ComparisonCardProps = {
  calculator: CalculatorDefinition;
};

export function ComparisonCard({
  calculator,
}: ComparisonCardProps) {
  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Scale className="h-5 w-5" />
        </div>

        <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
      </div>

      <h3 className="text-lg font-bold">
        {calculator.name}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
        {calculator.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">
          {calculator.category}
        </span>

        {calculator.specialty && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {calculator.specialty}
          </span>
        )}
      </div>
    </Link>
  );
}