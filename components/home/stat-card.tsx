import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function StatCard({
  title,
  value,
  description,
  href,
  icon: Icon,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-blue-100 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />

      </div>

      <div className="mt-6">

        <p className="text-4xl font-bold text-slate-900">
          {value}
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>
    </Link>
  );
}