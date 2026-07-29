export function suggestCalculationCode(
  calculatorName: string,
): string {
  const key = calculatorName
    .toLowerCase()
    .replace(" calculator", "")
    .trim();

  switch (key) {
    case "bmi":
      return `
const weight = Number(values.weight);
const height = Number(values.height);

const bmi =
  weight / Math.pow(height / 100, 2);

return {
  value: bmi.toFixed(1),
  interpretation: "",
  status: "normal",
};
`.trim();

    default:
      return `
return {
  value: "",
  interpretation: "",
  status: "normal",
};
`.trim();
  }
}