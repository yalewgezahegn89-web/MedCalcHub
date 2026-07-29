import type { CalculatorInputDefinition } from "../../types";

export function buildCalculate(
  inputs: CalculatorInputDefinition[],
): string {
  const variables = inputs
    .filter((i) => i.type === "number")
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