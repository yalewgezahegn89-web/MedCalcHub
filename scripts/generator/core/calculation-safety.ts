export function buildCalculationSafety(): string {

  return `

if (
  !Number.isFinite(result)
) {

  return {
    value: 0,

    interpretation:
      "Invalid calculation result.",

    status:
      "critical",
  };

}

`;

}