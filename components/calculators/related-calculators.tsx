import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

type Props = {
  related?: string[];
};

export function RelatedCalculators({
  related,
}: Props) {
  if (!related || related.length === 0) {
    return null;
  }

  const calculators = related
    .map((id) =>
      calculatorRegistry.find(
        (calc) => calc.id === id,
      ),
    )
    .filter(Boolean);

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
      <h2 className="mb-6 text-2xl font-bold">
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