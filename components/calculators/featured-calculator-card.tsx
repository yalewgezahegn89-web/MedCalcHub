import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import { CalculatorCard } from "./calculator-card";

type Props = {
  calculator: CalculatorDefinition;
};

export function FeaturedCalculatorCard({
  calculator,
}: Props) {
  return (
    <CalculatorCard
      calculator={calculator}
      showDescription
    />
  );
}