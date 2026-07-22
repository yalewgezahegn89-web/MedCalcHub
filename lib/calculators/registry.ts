import type { CalculatorDefinition } from "./calculator.types";

import { bmiCalculator } from "./bmi";
import { bsaCalculator } from "./bsa";
import { ibwCalculator } from "./ibw";
import { adjbwCalculator } from "./adjbw";
import { lbmCalculator } from "./lbm";
import { cockcroftGaultCalculator } from "./cockcroft-gault";
import { bunCreatinineRatioCalculator } from "./bun-creatinine-ratio";
import { ckdEpi2021Calculator } from "./ckd-epi-2021";

export const calculatorRegistry: CalculatorDefinition[] = [
  bmiCalculator,
  bsaCalculator,
  ibwCalculator,
  adjbwCalculator,
  lbmCalculator,
  cockcroftGaultCalculator,
  bunCreatinineRatioCalculator,
  ckdEpi2021Calculator,
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === id);
}