import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
};

export function StatCard({
  icon,
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {icon}
      </div>

      <div className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}