import { type ReactNode } from "react";
import Link from "next/link";
import {
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Activity,
  Bone,
  Droplets,
  Pill,
  ShieldPlus,
  Microscope,
  ScanLine,
  Wind,
  Venus,
} from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";
import { SpecialtyCard } from "@/components/home/specialty-card";

import {
  getSpecialties,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";

const specialtyVisuals: Record<string, { icon: ReactNode; color: string }> = {
  Cardiology: {
    icon: <Heart className="h-7 w-7 text-white" />,
    color: "bg-red-500",
  },
  Neurology: {
    icon: <Brain className="h-7 w-7 text-white" />,
    color: "bg-purple-500",
  },
  "Internal Medicine": {
    icon: <Stethoscope className="h-7 w-7 text-white" />,
    color: "bg-blue-500",
  },
  Pediatrics: {
    icon: <Baby className="h-7 w-7 text-white" />,
    color: "bg-green-500",
  },
  "Emergency Medicine": {
    icon: <Activity className="h-7 w-7 text-white" />,
    color: "bg-orange-500",
  },
  Nephrology: {
    icon: <Droplets className="h-7 w-7 text-white" />,
    color: "bg-emerald-500",
  },
  Endocrinology: {
    icon: <Pill className="h-7 w-7 text-white" />,
    color: "bg-amber-500",
  },
  Orthopedics: {
    icon: <Bone className="h-7 w-7 text-white" />,
    color: "bg-slate-600",
  },
  "Critical Care": {
    icon: <ShieldPlus className="h-7 w-7 text-white" />,
    color: "bg-rose-600",
  },
  Gastroenterology: {
    icon: <ScanLine className="h-7 w-7 text-white" />,
    color: "bg-cyan-500",
  },
  "General Medicine": {
    icon: <Stethoscope className="h-7 w-7 text-white" />,
    color: "bg-teal-500",
  },
  Obstetrics: {
    icon: <Venus className="h-7 w-7 text-white" />,
    color: "bg-pink-500",
  },
  Pulmonology: {
    icon: <Wind className="h-7 w-7 text-white" />,
    color: "bg-indigo-500",
  },
};

const defaultVisual = {
  icon: <Microscope className="h-7 w-7 text-white" />,
  color: "bg-slate-500",
};

function specialtyToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function BrowseSpecialties() {
  const specialties = getSpecialties();

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Browse by Specialty"
        description="Choose your medical specialty to quickly find the most relevant calculators."
        action={
          <Link
            href="/specialties"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            See all specialties
          </Link>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {specialties.map((name) => {
          const count = getCalculatorsBySpecialty(name).length;
          const { icon, color } =
            specialtyVisuals[name] ?? defaultVisual;

          return (
            <SpecialtyCard
              key={name}
              title={name}
              description={`Browse all ${name} calculators.`}
              href={`/specialties/${specialtyToSlug(name)}`}
              icon={icon}
              color={color}
              calculatorCount={count}
            />
          );
        })}
      </div>
    </section>
  );
}
