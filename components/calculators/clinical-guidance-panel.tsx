import { ClinicalPearlCard } from "./clinical-pearl-card";
import { CommonMistakesCard } from "./common-mistakes-card";

type Props = {
  pearl?: string;
  mistakes?: string[];
  notes?: string;
};

export function ClinicalGuidancePanel({
  pearl,
  mistakes = [],
  notes,
}: Props) {
  if (!pearl && mistakes.length === 0 && !notes) {
    return null;
  }

  return (
    <section className="space-y-8">
      {pearl && (
        <ClinicalPearlCard
          pearl={pearl}
        />
      )}

      <CommonMistakesCard
        mistakes={mistakes}
      />

      {notes && (
        <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
          <h2 className="mb-4 text-xl font-bold">
            📖 Clinical Notes
          </h2>

          <p className="leading-7 text-muted-foreground">
            {notes}
          </p>
        </section>
      )}
    </section>
  );
}