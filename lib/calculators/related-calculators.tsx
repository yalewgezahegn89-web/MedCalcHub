import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { relatedCalculators } from "@/lib/calculators/related";

type Props = {
  slug: string;
};

export function RelatedCalculators({ slug }: Props) {
  const related = relatedCalculators[slug];

  if (!related || related.length === 0) {
    return null;
  }

  const calculators = related
    .map((id) =>
      calculatorRegistry.find((calc) => calc.id === id),
    )
    .filter(Boolean);

  return (
    <section className="mt-10 rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Related Calculators
      </h2>

      <div className="space-y-3">
        {calculators.map((calc) => (
          <Link
            key={calc!.id}
            href={`/calculators/${calc!.slug}`}
            className="block rounded-lg border p-3 transition hover:bg-gray-50 dark:hover:bg-zinc-900"
          >
            <div className="font-medium">
              {calc!.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {calc!.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}