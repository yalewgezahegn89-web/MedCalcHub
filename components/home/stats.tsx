import {
  Calculator,
  Heart,
  Activity,
  Stethoscope,
} from "lucide-react";

import { calculatorRegistry } from "@/lib/calculators/registry";

import { StatCard } from "@/components/ui/stat-card";
import { getFavorites } from "@/lib/favorites";

export function Stats() {
  const calculatorCount = calculatorRegistry.length;

  const specialties = new Set(
    calculatorRegistry
      .map((calc) => calc.specialty)
      .filter(Boolean),
  ).size;

  const favoriteCount =
    typeof window === "undefined"
      ? 0
      : getFavorites().length;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Calculator className="h-6 w-6" />}
        value={`${calculatorCount}+`}
        label="Clinical Calculators"
      />

      <StatCard
        icon={<Stethoscope className="h-6 w-6" />}
        value={specialties}
        label="Medical Specialties"
      />

      <StatCard
        icon={<Heart className="h-6 w-6" />}
        value={favoriteCount}
        label="Favorite Calculators"
      />

      <StatCard
        icon={<Activity className="h-6 w-6" />}
        value="Evidence"
        label="Evidence-Based"
      />
    </section>
  );
}