import { bmiCalculator } from "@/lib/calculators/bmi";
import { CalculatorLayout } from "@/components/calculators/layout";
import { CalculatorClient } from "@/components/calculators/calculator-client";

export default function BMICalculatorPage() {
  return (
    <CalculatorLayout
      title={bmiCalculator.name}
      description={bmiCalculator.description}
    >
      <CalculatorClient slug="body-mass-index" />
    </CalculatorLayout>
  );
}