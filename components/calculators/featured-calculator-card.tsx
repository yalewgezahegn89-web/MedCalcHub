import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Star,
} from "lucide-react";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  calculator: CalculatorDefinition;
};

export function FeaturedCalculatorCard({
  calculator,
}: Props) {
  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">

        <div className="rounded-xl bg-blue-100 p-3">
          <Calculator className="h-6 w-6 text-blue-700" />
        </div>

        {calculator.featured && (
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            Featured
          </span>
        )}

      </div>

      <div className="mt-5">

        <div className="mb-3 flex flex-wrap gap-2">

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {calculator.category}
          </span>

          {calculator.specialty && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {calculator.specialty}
            </span>
          )}

        </div>

        <h3 className="text-lg font-bold transition-colors group-hover:text-blue-600">
          {calculator.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
          {calculator.description}
        </p>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm font-medium text-blue-600">
          Open Calculator
        </span>

        <ArrowRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1" />

      </div>
    </Link>
  );
}