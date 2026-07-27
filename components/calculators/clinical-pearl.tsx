import { ClinicalPearlCard } from "./clinical-pearl-card";

type Props = {
  pearl?: string;
};

export function ClinicalPearl({
  pearl,
}: Props) {
  if (!pearl) {
    return null;
  }

  return (
    <ClinicalPearlCard
      pearl={pearl}
    />
  );
}