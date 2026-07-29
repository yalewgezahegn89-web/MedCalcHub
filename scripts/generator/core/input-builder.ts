import type {
  CalculatorInputDefinition,
} from "../../types";

export function buildInputs(
  inputs: CalculatorInputDefinition[],
): string {
  if (inputs.length === 0) {
    return "[]";
  }

  return `[
${inputs
  .map(
    (input) => `  {
    id: "${input.id}",
    label: "${input.label}",
    type: "${input.type}",${
      input.unit
        ? `\n    unit: "${input.unit}",`
        : ""
    }
    required: ${input.required ?? false},
  }`,
  )
  .join(",\n")}
]`;
}