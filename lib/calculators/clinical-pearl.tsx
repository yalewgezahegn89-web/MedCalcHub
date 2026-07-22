import { clinicalPearls } from "@/lib/calculators/clinical-pearls";

type Props = {
  slug: string;
};

export function ClinicalPearl({ slug }: Props) {
  const pearl = clinicalPearls[slug];

  if (!pearl) {
    return null;
  }

  return (
    <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
      <h2 className="mb-3 text-lg font-semibold">
        💡 Clinical Pearl
      </h2>

      <p className="leading-7 text-sm">
        {pearl}
      </p>
    </section>
  );
}