import type { CalculatorInputDefinition } from "../../types";
import { parseFormula } from "./formula-parser";

export function buildCalculate(
  formula: string,
  inputs: CalculatorInputDefinition[],
): string {

  const parsed =
    parseFormula(formula);

  const declarations =
    inputs
      .map(
        (input) => `const ${input.id.replaceAll("-", "_")} =
    Number(values.${input.id.replaceAll("-", "_")});`,
      )
      .join("\n\n");

  let expression =
    parsed.expression;

  for (const input of inputs) {
    const id =
      input.id.replaceAll("-", "_");

    const regex =
      new RegExp(
        input.label,
        "gi",
      );

    expression =
      expression.replace(
        regex,
        id,
      );

    expression =
      expression.replace(
        new RegExp(id.toUpperCase(), "g"),
        id,
      );
  }

  return `
calculate(
  values: Record<string, string>,
) {

${declarations}

  const result =
    ${expression};

  return {
    value:
      Number(result.toFixed(2)),
    interpretation:
      "Clinical interpretation pending.",
    status: "normal",
  };
},
`;
}