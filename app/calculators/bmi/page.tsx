import { bmiCalculator } from "@/lib/calculators/bmi";
import { CalculatorLayout } from "@/components/calculators/layout";
import { CalculatorForm } from "@/components/calculators/calculator-form";

export default function BMICalculatorPage() {
  return (
    <CalculatorLayout
      title={bmiCalculator.name}
      description={bmiCalculator.description}
    >
      <CalculatorForm calculator={bmiCalculator} />
    </CalculatorLayout>
  );
}
