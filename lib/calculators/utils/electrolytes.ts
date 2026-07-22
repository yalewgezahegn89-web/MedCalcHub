export function calculateAnionGap(
  sodium: number,
  chloride: number,
  bicarbonate: number,
): number {
  const ag = sodium - (chloride + bicarbonate);

  return Math.round(ag * 10) / 10;
}

export function calculateCorrectedAnionGap(
  sodium: number,
  chloride: number,
  bicarbonate: number,
  albumin: number,
): number {
  const ag = calculateAnionGap(
    sodium,
    chloride,
    bicarbonate,
  );

  const corrected =
    ag + 2.5 * (4 - albumin);

  return Math.round(corrected * 10) / 10;
}

export function calculateCorrectedCalcium(
  calcium: number,
  albumin: number,
): number {
  const corrected =
    calcium + 0.8 * (4 - albumin);

  return Math.round(corrected * 10) / 10;
}