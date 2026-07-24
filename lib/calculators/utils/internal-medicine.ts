export function calculateMifflinStJeor(
  sex: string,
  age: number,
  weightKg: number,
  heightCm: number,
): number {
  const bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  return Math.round(bmr * 10) / 10;
}

export function calculateHarrisBenedict(
  sex: string,
  age: number,
  weightKg: number,
  heightCm: number,
): number {
  const bmr =
    sex === "male"
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;

  return Math.round(bmr * 10) / 10;
}

export function calculateCalorieRequirement(
  bmr: number,
  activityFactor: number,
): number {
  return Math.round(bmr * activityFactor);
}

export function calculateFluidRequirement(weightKg: number): number {
  return Math.round(weightKg * 35);
}

export function calculateMaintenanceFluids(weightKg: number): number {
  let rate = 0;

  if (weightKg <= 10) {
    rate = weightKg * 100;
  } else if (weightKg <= 20) {
    rate = 1000 + (weightKg - 10) * 50;
  } else {
    rate = 1500 + (weightKg - 20) * 20;
  }

  return Math.round(rate);
}

export function calculateFreeWaterDeficit(
  weightKg: number,
  currentNa: number,
  desiredNa: number,
): number {
  const totalBodyWater = weightKg * 0.6;
  const deficit = totalBodyWater * (currentNa / desiredNa - 1);

  return Math.max(0, Math.round(deficit * 10) / 10);
}

export function calculateSodiumDeficit(
  weightKg: number,
  currentNa: number,
  desiredNa: number,
): number {
  const totalBodyWater = weightKg * 0.6;
  const deficit = totalBodyWater * (desiredNa - currentNa);

  return Math.max(0, Math.round(deficit * 10) / 10);
}

export function calculateCorrectedSodium(
  sodium: number,
  glucose: number,
): number {
  const correction = glucose > 100 ? 1.6 * ((glucose - 100) / 100) : 0;

  return Math.round((sodium + correction) * 10) / 10;
}

export function calculateBunCreatinineRatio(
  bun: number,
  creatinine: number,
): number {
  if (creatinine === 0) {
    return 0;
  }

  return Math.round((bun / creatinine) * 10) / 10;
}

export function calculateFENa(
  urineNa: number,
  plasmaNa: number,
  urineCr: number,
  plasmaCr: number,
): number {
  if (plasmaNa === 0 || plasmaCr === 0) {
    return 0;
  }

  return Math.round(((urineNa / plasmaNa) / (urineCr / plasmaCr)) * 100 * 10) / 10;
}

export function calculateFEUrea(
  urineUrea: number,
  plasmaUrea: number,
  urineCr: number,
  plasmaCr: number,
): number {
  if (plasmaUrea === 0 || plasmaCr === 0) {
    return 0;
  }

  return Math.round(((urineUrea / plasmaUrea) / (urineCr / plasmaCr)) * 100 * 10) / 10;
}

export function calculateTTKG(
  urineK: number,
  plasmaK: number,
  urineOsmolality: number,
  plasmaOsmolality: number,
): number {
  if (plasmaK === 0 || urineOsmolality === 0) {
    return 0;
  }

  return Math.round(((urineK * plasmaOsmolality) / (plasmaK * urineOsmolality)) * 100) / 100;
}

export function calculateCalciumPhosphateProduct(
  calcium: number,
  phosphate: number,
): number {
  return Math.round(calcium * phosphate * 10) / 10;
}

export function calculateFractionalExcretion(
  urineNa: number,
  plasmaNa: number,
  urineCr: number,
  plasmaCr: number,
): number {
  return calculateFENa(urineNa, plasmaNa, urineCr, plasmaCr);
}
