import type { CalculatorInputDefinition } from "../../types";

export function buildVariableMap(
  inputs: readonly CalculatorInputDefinition[]
): string {
  const declarations = inputs.map((input) => {
    const variable = input.id.replaceAll("-", "_");

    let conversion = "";

    if (input.conversion) {
      if (input.conversion.type === "divide") {
        conversion = ` / ${input.conversion.factor}`;
      }

      if (input.conversion.type === "multiply") {
        conversion = ` * ${input.conversion.factor}`;
      }
    }

    return `const ${variable} = Number(values.${variable})${conversion};`;
  });

  return declarations.join("\n");
}