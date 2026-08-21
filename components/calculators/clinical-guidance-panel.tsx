import { ClinicalPearlCard } from "./clinical-pearl-card";
import { CommonMistakesCard } from "./common-mistakes-card";

type Props = {
  pearl?: string;
  mistakes?: readonly string[];
};

export function ClinicalGuidancePanel({
  pearl,
  mistakes = [],
}: Props) {
  if (!pearl && mistakes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      {pearl && (
        <ClinicalPearlCard
          pearl={pearl}
        />
      )}

      {mistakes.length > 0 && (
        <CommonMistakesCard
          mistakes={mistakes}
        />
      )}
    </section>
  );
}