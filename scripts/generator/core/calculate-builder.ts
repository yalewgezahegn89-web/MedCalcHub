import type {
  CalculatorInputDefinition,
} from "../../types";

import {
  parseFormula,
} from "./formula-parser";


function buildDeclaration(
  input: CalculatorInputDefinition,
): string {

  const variable =
    input.id.replaceAll("-", "_");

  let conversion = "";

  if (input.conversion) {

    if (
      input.conversion.type === "divide"
    ) {
      conversion =
        ` / ${input.conversion.factor}`;
    }

    if (
      input.conversion.type === "multiply"
    ) {
      conversion =
        ` * ${input.conversion.factor}`;
    }
  }

  return `
const ${variable} =
    Number(values.${variable})${conversion};`;
}



export function buildCalculate(
  formula: string,
  inputs: CalculatorInputDefinition[],
): string {

  const parsed =
    parseFormula(formula);


  const declarations =
    inputs
      .map(
        (input) =>
          buildDeclaration(input),
      )
      .join("\n");


  let expression =
    parsed.expression;


  for (const input of inputs) {

    const variable =
      input.id.replaceAll("-", "_");


    expression =
      expression.replace(
        new RegExp(
          input.label,
          "gi",
        ),
        variable,
      );


    expression =
      expression.replace(
        new RegExp(
          variable.toUpperCase(),
          "g",
        ),
        variable,
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

    status:
      "normal",
  };
},
`;
}