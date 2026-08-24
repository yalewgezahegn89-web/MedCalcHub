"use client";

import Link from "next/link";
import {
  Calculator,
  Droplets,
  Pill,
  Stethoscope,
  HeartPulse,
  Microscope,
  Activity,
  FlaskConical,
  PersonStanding,
  Bug,
  TestTube,
  Brain,
  VenusAndMars,
  Dna,
  Baby,
  Wind,
  Moon,
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
  Anthropometry: {
    icon: <Calculator className="h-7 w-7 text-white" />,
    color: "bg-orange-500",
  },
  Emergency: {
    icon: <Activity className="h-7 w-7 text-white" />,
    color: "bg-red-500",
  },
  Gastroenterology: {
    icon: <FlaskConical className="h-7 w-7 text-white" />,
    color: "bg-teal-500",
  },
  Geriatrics: {
    icon: <PersonStanding className="h-7 w-7 text-white" />,
    color: "bg-violet-500",
  },
  "Infectious Disease": {
    icon: <Bug className="h-7 w-7 text-white" />,
    color: "bg-lime-600",
  },
  Laboratory: {
    icon: <TestTube className="h-7 w-7 text-white" />,
    color: "bg-slate-500",
  },
  "Mental Health": {
    icon: <Brain className="h-7 w-7 text-white" />,
    color: "bg-purple-500",
  },
  Nephrology: {
    icon: <Droplets className="h-7 w-7 text-white" />,
    color: "bg-cyan-500",
  },
  Neurology: {
    icon: <Brain className="h-7 w-7 text-white" />,
    color: "bg-indigo-500",
  },
  "Obstetrics & Gynecology": {
    icon: <VenusAndMars className="h-7 w-7 text-white" />,
    color: "bg-pink-500",
  },
  Oncology: {
    icon: <Dna className="h-7 w-7 text-white" />,
    color: "bg-rose-500",
  },
  Pediatrics: {
    icon: <Baby className="h-7 w-7 text-white" />,
    color: "bg-green-500",
  },
  Pulmonology: {
    icon: <Wind className="h-7 w-7 text-white" />,
    color: "bg-sky-500",
  },
  "Sleep Medicine": {
    icon: <Moon className="h-7 w-7 text-white" />,
    color: "bg-indigo-600",
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
        title="Explore by Clinical Area"
        description="Find calculators organized by medical topic."
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