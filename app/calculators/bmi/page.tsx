import { bmiCalculator } from "@/lib/calculators/bmi";
import { CalculatorLayout } from "@/components/calculators/layout";
import { BMICalculatorClient } from "@/components/calculators/bmi-calculator-client";

export default function BMICalculatorPage() {
  return (
    <CalculatorLayout
      title={bmiCalculator.name}
      description={bmiCalculator.description}
    >
      <BMICalculatorClient />
    </CalculatorLayout>
  );
}
