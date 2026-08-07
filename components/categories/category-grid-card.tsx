import Link from "next/link";

import {
  Activity,
  HeartPulse,
  Droplets,
  Pill,
  Stethoscope,
  Calculator,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  General: Calculator,
  Renal: Droplets,
  Endocrinology: Pill,
  "Internal Medicine": Stethoscope,
  Cardiology: HeartPulse,
};

type Props = {
  name: string;
  slug: string;
  count: number;
};

export function CategoryGridCard({
  name,
  slug,
  count,
}: Props) {
  const Icon = categoryIcons[name] ?? Activity;

  return (
    <Link
      href={`/categories/${slug}`}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-cyan-100 p-3">
          <Icon className="h-7 w-7 text-cyan-700" />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {count}
        </span>

      </div>

      <h3 className="mt-5 text-lg font-bold transition-colors group-hover:text-blue-600">
        {name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Browse all {name} calculators.
      </p>

    </Link>
  );
}