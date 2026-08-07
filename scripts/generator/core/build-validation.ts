import type {
  CalculatorInputDefinition,
} from "../../types";


export function buildValidation(
  inputs: readonly CalculatorInputDefinition[],
): string {

  const lines: string[] = [];

  for (const input of inputs) {

    const variable =
      input.id.replaceAll("-", "_");

    const rules =
      input.validation ?? {};

    const allowNegative =
      rules.allowNegative ?? false;

    const allowZero =
      rules.allowZero ?? false;


    // Required / empty check
    lines.push(`
if (
  values.${variable} === "" ||
  values.${variable} === undefined
) {
  return {
    value: 0,
    interpretation: "${input.label} is required.",
    status: "critical",
  };
}
`);


    // Numeric check
    lines.push(`
if (
  Number.isNaN(Number(values.${variable}))
) {
  return {
    value: 0,
    interpretation: "Invalid ${input.label}.",
    status: "critical",
  };
}
`);

    const numVar = `Number(values.${variable})`;


    // Negative check
    if (!allowNegative) {
      lines.push(`
if (${numVar} < 0) {
  return {
    value: 0,
    interpretation: "${input.label} cannot be negative.",
    status: "critical",
  };
}
`);
    }


    // Zero check
    if (!allowZero) {
      lines.push(`
if (${numVar} === 0) {
  return {
    value: 0,
    interpretation: "${input.label} cannot be zero.",
    status: "critical",
  };
}
`);
    }


    // Minimum check
    if (rules.minimum !== undefined) {
      lines.push(`
if (${numVar} < ${rules.minimum}) {
  return {
    value: 0,
    interpretation: "${input.label} must be at least ${rules.minimum}.",
    status: "critical",
  };
}
`);
    }


    // Maximum check
    if (rules.maximum !== undefined) {
      lines.push(`
if (${numVar} > ${rules.maximum}) {
  return {
    value: 0,
    interpretation: "${input.label} must be at most ${rules.maximum}.",
    status: "critical",
  };
}
`);
    }

  }

  return lines.join("\n");
}