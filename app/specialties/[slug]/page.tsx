import { notFound } from "next/navigation";

import { SpecialtyGrid } from "@/components/specialties/specialty-grid";
import { SpecialtyHeader } from "@/components/specialties/specialty-header";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { getSpecialtyBySlug } from "@/lib/specialties/registry";

type SpecialtyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpecialtyDetailPage({ params }: SpecialtyDetailPageProps) {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  const calculators = calculatorRegistry.filter(
    (calculator) => calculator.specialty === slug,
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="space-y-8">
        <SpecialtyHeader specialty={specialty} count={calculators.length} />
        <SpecialtyGrid calculators={calculators} />
      </div>
    </main>
  );
}
