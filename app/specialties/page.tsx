import Link from "next/link";

import { Card } from "@/components/ui/card";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { specialtyRegistry } from "@/lib/specialties/registry";

export default function SpecialtiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 space-y-3">
        <h1 className="text-4xl font-bold">Browse by Specialty</h1>
        <p className="max-w-2xl text-muted-foreground">
          Explore medical calculators organized by specialty and clinical domain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specialtyRegistry.map((specialty) => {
          const count = calculatorRegistry.filter(
            (calculator) => calculator.specialty === specialty.slug,
          ).length;

          return (
            <Link key={specialty.slug} href={`/specialties/${specialty.slug}`} className="block h-full">
              <Card className="h-full p-6 transition hover:border-primary hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{specialty.icon}</div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{specialty.name}</h2>
                    <p className="text-sm text-muted-foreground">{specialty.description}</p>
                    <div className="text-sm font-medium text-primary">
                      {count} calculator{count === 1 ? "" : "s"} →
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}