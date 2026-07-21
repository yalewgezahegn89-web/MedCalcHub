export function calculateDevineIBW(sex: string, heightCm: number): number {
  const inches = heightCm / 2.54;
  let ibw: number;

  if (sex === "male") {
    ibw = 50 + 2.3 * (inches - 60);
  } else {
    ibw = 45.5 + 2.3 * (inches - 60);
  }

  const rounded = Math.round(ibw * 10) / 10;

  return Math.max(0, rounded);
}

export function calculateAdjustedBodyWeight(
  ibw: number,
  actualWeight: number,
): number {
  const adjbw = ibw + 0.4 * (actualWeight - ibw);
  const rounded = Math.round(adjbw * 10) / 10;

  return Math.max(0, rounded);
}
