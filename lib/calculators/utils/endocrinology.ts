export function calculateHomaIr(
  glucoseMgDl: number,
  insulinUiuMl: number,
): number {
  const homa = (glucoseMgDl * insulinUiuMl) / 405;
  return Math.round(homa * 100) / 100;
}

export function calculateHomaB(
  glucoseMgDl: number,
  insulinUiuMl: number,
): number {
  if (glucoseMgDl <= 3.5) {
    return 0;
  }

  const homaB = (20 * insulinUiuMl) / (glucoseMgDl - 3.5);
  return Math.round(homaB * 10) / 10;
}

export function calculateInsulinSensitivity(homaIr: number): number {
  return Math.round((1 / homaIr) * 100) / 100;
}

export function calculateEstimatedAverageGlucose(a1c: number): number {
  return Math.round((28.7 * a1c - 46.7) * 10) / 10;
}

export function calculateA1cFromEag(eag: number): number {
  return Math.round(((eag + 46.7) / 28.7) * 100) / 100;
}

export function calculateCorrectedQt(qtMs: number, heartRateBpm: number): number {
  if (heartRateBpm <= 0) {
    return qtMs;
  }

  const rrSeconds = 60 / heartRateBpm;
  const correctedQt = qtMs / Math.sqrt(rrSeconds / 1);

  return Math.round(correctedQt * 10) / 10;
}

export function calculateThyroidDose(weightKg: number): number {
  return Math.round(1.6 * weightKg * 10) / 10;
}

export function calculateLevothyroxineDose(weightKg: number): number {
  return Math.round(1.6 * weightKg * 10) / 10;
}

export function convertAdrenalSteroid(
  dose: number,
  from: string,
  to: string,
): number {
  const potencies: Record<string, number> = {
    hydrocortisone: 1,
    prednisone: 4,
    dexamethasone: 30,
  };

  const fromDose = dose * potencies[from] || 0;
  const converted = fromDose / potencies[to];

  return Math.round(converted * 100) / 100;
}

export function calculatePediatricBmi(weightKg: number, heightCm: number): number {
  if (heightCm <= 0) {
    return 0;
  }

  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function classifyPediatricBmi(bmi: number): string {
  if (bmi < 5) {
    return "Underweight";
  }

  if (bmi < 85) {
    return "Healthy weight";
  }

  if (bmi < 95) {
    return "Overweight";
  }

  return "Obesity";
}
