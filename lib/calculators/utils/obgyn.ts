export function calculateEdd(lastMenstrualPeriod: string): string {
  const date = new Date(lastMenstrualPeriod);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const edd = new Date(date);
  edd.setDate(date.getDate() + 280);
  return edd.toISOString().split("T")[0];
}

export function calculateGestationalAge(weeks: number, days: number): number {
  return weeks + days / 7;
}

export function calculateBishopScore(
  dilationCm: number,
  effacementPct: number,
  station: number,
  consistency: number,
  position: number,
): number {
  return dilationCm + effacementPct / 25 + station + consistency + position;
}

export function calculateApgar(
  heartRate: number,
  respiration: number,
  muscleTone: number,
  reflexIrritability: number,
  color: number,
): number {
  return heartRate + respiration + muscleTone + reflexIrritability + color;
}

export function calculatePregnancyWeightGain(
  prePregnancyWeightKg: number,
  currentWeightKg: number,
): number {
  return Math.round((currentWeightKg - prePregnancyWeightKg) * 10) / 10;
}

export function calculateVbacRisk(
  priorCesarean: number,
  priorVaginalDelivery: number,
): number {
  return Math.round((priorVaginalDelivery / Math.max(priorCesarean + priorVaginalDelivery, 1)) * 100);
}

export function calculatePostpartumHemorrhageRisk(
  parity: number,
  priorPph: number,
  macrosomia: number,
): number {
  return Math.round((parity * 5 + priorPph * 20 + macrosomia * 10) * 10) / 10;
}

export function calculatePreeclampsiaRisk(
  nulliparity: number,
  familyHistory: number,
  priorPreeclampsia: number,
  multipleGestation: number,
  bmi: number,
): number {
  return Math.round((nulliparity * 5 + familyHistory * 2 + priorPreeclampsia * 6 + multipleGestation * 5 + bmi / 10) * 10) / 10;
}

export function calculateEstimatedFetalWeight(
  bpdCm: number,
  hcCm: number,
  acCm: number,
  flCm: number,
): number {
  const efw = (-1.326 + 0.001 * (bpdCm * bpdCm * acCm) + 0.005 * (hcCm * acCm) + 0.016 * (flCm * acCm));
  return Math.round(efw * 10) / 10;
}

export function calculateAmnioticFluidIndex(
  deepestPocket1: number,
  deepestPocket2: number,
  deepestPocket3: number,
  deepestPocket4: number,
): number {
  return Math.round((deepestPocket1 + deepestPocket2 + deepestPocket3 + deepestPocket4) * 10) / 10;
}
