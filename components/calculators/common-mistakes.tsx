import { CommonMistakesCard } from "./common-mistakes-card";

type Props = {
  mistakes?: string[];
};

export function CommonMistakes({
  mistakes,
}: Props) {
  if (!mistakes || mistakes.length === 0) {
    return null;
  }

  return (
    <CommonMistakesCard
      mistakes={mistakes}
    />
  );
}