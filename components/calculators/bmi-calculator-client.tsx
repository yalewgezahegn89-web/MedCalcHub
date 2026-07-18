"use client";

import { CalculatorForm } from "@/components/calculators/calculator-form";
import { bmiCalculator } from "@/lib/calculators/bmi";

export function BMICalculatorClient() {
  return <CalculatorForm calculator={bmiCalculator} />;
}