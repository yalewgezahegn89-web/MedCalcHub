import Link from "next/link";

import {
  HeartPulse,
  Brain,
  Stethoscope,
  Baby,
  Activity,
  Droplets,
  Pill,
  Bone,
  ShieldPlus,
  Microscope,
} from "lucide-react";

const specialtyIcons: Record<string, any> = {
  "Cardiology": HeartPulse,
  "Neurology": Brain,
  "Internal Medicine": Stethoscope,
  "Pediatrics": Baby,
  "Emergency Medicine": Activity,
  "Nephrology": Droplets,
  "Endocrinology": Pill,
  "Orthopedics": Bone,
  "Critical Care": ShieldPlus,
};

type Props = {
  name: string;
  slug: string;
  count: number;
};

export function SpecialtyGridCard({
  name,
  slug,
  count,
}: Props) {
  const Icon =
    specialtyIcons[name] ?? Microscope;

  return (
    <Link
      href={`/specialties/${slug}`}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-blue-100 p-3">
          <Icon className="h-7 w-7 text-blue-700" />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {count}
        </span>

      </div>

      <h3 className="mt-5 text-lg font-bold transition-colors group-hover:text-blue-600">
        {name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Browse calculators for {name}.
      </p>

    </Link>
  );
}