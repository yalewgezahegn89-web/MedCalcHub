import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type SpecialtyCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
  calculatorCount?: number;
};

export function SpecialtyCard({
  title,
  description,
  href,
  icon,
  color,
  calculatorCount,
}: SpecialtyCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        <span aria-hidden="true">{icon}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {calculatorCount !== undefined && (
        <div className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          {calculatorCount} calculators
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Explore
        </span>

        <ArrowRight className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400" />
      </div>
    </Link>
  );
}