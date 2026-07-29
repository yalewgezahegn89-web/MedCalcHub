import type {
  CalculatorInputDefinition,
} from "../../types";

export function buildInputs(
  inputs: CalculatorInputDefinition[],
) {
  return JSON.stringify(
    inputs,
    null,
    2,
  );
}