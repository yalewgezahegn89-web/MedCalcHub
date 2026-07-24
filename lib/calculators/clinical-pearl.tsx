import { clinicalPearls } from "@/lib/calculators/clinical-pearls";

type Props = {
  slug: string;
};

export function ClinicalPearl({
  slug,
}: Props) {
  const pearl = clinicalPearls[slug];

  if (!pearl) {
    return null;
  }

  return (
    <section className="rounded-xl border p-6">
      <h2 className="mb-3 text-xl font-semibold">
        💡 Clinical Pearl
      </h2>

      <p className="text-sm leading-7">
        {pearl}
      </p>
    </section>
  );
}