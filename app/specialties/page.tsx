import { SpecialtyCard } from "@/components/specialties/specialty-card";
import { calculatorRegistry } from "@/lib/calculators/registry";

const specialties = [
  {
    slug: "renal",
    name: "💧 Renal",
    description: "Kidney function, electrolytes and renal calculations.",
  },
  {
    slug: "general",
    name: "🩺 General",
    description: "General clinical and anthropometric calculators.",
  },
];

export default function SpecialtiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Browse by Specialty
        </h1>

        <p className="mt-3 text-muted-foreground">
          Explore medical calculators organized by specialty.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty) => (
          <SpecialtyCard
            key={specialty.slug}
            slug={specialty.slug}
            name={specialty.name}
            description={specialty.description}
            count={
              calculatorRegistry.filter(
                (c) =>
                  c.category.toLowerCase() ===
                  specialty.slug,
              ).length
            }
          />
        ))}
      </div>
    </main>
  );
}