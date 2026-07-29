import type { CalculatorInputDefinition } from "../../types";
import { suggestCalculationCode } from "./formula-intelligence";

export function buildCalculate(
  calculatorName: string,
  inputs: CalculatorInputDefinition[],
): string {
  const intelligentCode =
    suggestCalculationCode(calculatorName);

  if (
    !intelligentCode.includes(
      'value: ""',
    )
  ) {
    return `calculate(values) {
  ${intelligentCode}
}`;
  }

  const variables = inputs
    .filter(
      (i) => i.type === "number",
    )
    .map(
      (i) =>
        `const ${i.id} = Number(values.${i.id});`,
    )
    .join("\n  ");

  return `calculate(values) {
  ${variables}

  return {
    value: "",
    interpretation: "",
    status: "normal",
  };
}`;
}