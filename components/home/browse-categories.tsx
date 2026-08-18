"use client";

import Link from "next/link";
import {
  Calculator,
  Droplets,
  Pill,
  Stethoscope,
  HeartPulse,
  Microscope,
} from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";
import { SpecialtyCard } from "@/components/home/specialty-card";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";

const categoryVisuals: Record<string, { icon: React.ReactNode; color: string }> = {
  General: {
    icon: <Calculator className="h-7 w-7 text-white" />,
    color: "bg-cyan-600",
  },
  Renal: {
    icon: <Droplets className="h-7 w-7 text-white" />,
    color: "bg-emerald-600",
  },
  Endocrinology: {
    icon: <Pill className="h-7 w-7 text-white" />,
    color: "bg-amber-600",
  },
  "Internal Medicine": {
    icon: <Stethoscope className="h-7 w-7 text-white" />,
    color: "bg-blue-600",
  },
  Cardiology: {
    icon: <HeartPulse className="h-7 w-7 text-white" />,
    color: "bg-rose-600",
  },
};

const defaultVisual = {
  icon: <Microscope className="h-7 w-7 text-white" />,
  color: "bg-slate-600",
};

function categoryToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function BrowseCategories() {
  const categories = getCategories();

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Browse by Category"
        description="Explore clinical calculators organized by medical topic."
        action={
          <Link
            href="/categories"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            See all categories
          </Link>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((name) => {
          const count = getCalculatorsByCategory(name).length;
          const { icon, color } =
            categoryVisuals[name] ?? defaultVisual;

          return (
            <SpecialtyCard
              key={name}
              title={name}
              description={`Browse all ${name} calculators.`}
              href={`/categories/${categoryToSlug(name)}`}
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