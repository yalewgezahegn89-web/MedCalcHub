import type { ComponentProps } from "react";
import type { CalculatorDefinition } from "@/lib/calculators";

export type CalculatorFormProps = ComponentProps<"form"> & {
  calculator: CalculatorDefinition;
};
