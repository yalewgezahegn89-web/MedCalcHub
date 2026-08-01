export function buildCalculate(): string {
  return `
calculate(
  values: Record<string, string>,
) {

  const result = "";

  return {
    value: result,
    interpretation:
      "Clinical interpretation pending.",
    status: "normal",
  };
},
`;
}