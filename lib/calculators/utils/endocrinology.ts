/**
 * CDC 2000 BMI-for-age LMS parameters.
 *
 * Source: Kuczmarski RJ, Ogden CL, Guo SS, et al. 2000 CDC Growth Charts
 * for the United States: Methods and Development. Vital Health Stat 11.
 * 2002;(246):1-190.
 *
 * Data at 6-month intervals from 24 to 240 months (ages 2–20 years).
 * L = Box-Cox power, M = median, S = coefficient of variation.
 */

interface LmsEntry {
  age: number; // age in months
  L: number;
  M: number;
  S: number;
}

const BOYS_LMS: readonly LmsEntry[] = [
  { age: 24, L: 1.4822, M: 16.534, S: 0.08679 },
  { age: 30, L: 1.4079, M: 16.100, S: 0.08244 },
  { age: 36, L: 1.3380, M: 15.790, S: 0.07923 },
  { age: 42, L: 1.2787, M: 15.550, S: 0.07688 },
  { age: 48, L: 1.2260, M: 15.370, S: 0.07517 },
  { age: 54, L: 1.1796, M: 15.230, S: 0.07393 },
  { age: 60, L: 1.1373, M: 15.130, S: 0.07299 },
  { age: 66, L: 1.1004, M: 15.070, S: 0.07222 },
  { age: 72, L: 1.0668, M: 15.050, S: 0.07154 },
  { age: 78, L: 1.0367, M: 15.070, S: 0.07091 },
  { age: 84, L: 1.0088, M: 15.120, S: 0.07034 },
  { age: 90, L: 0.9832, M: 15.210, S: 0.06984 },
  { age: 96, L: 0.9593, M: 15.340, S: 0.06942 },
  { age: 102, L: 0.9371, M: 15.510, S: 0.06909 },
  { age: 108, L: 0.9160, M: 15.720, S: 0.06886 },
  { age: 114, L: 0.8961, M: 15.970, S: 0.06874 },
  { age: 120, L: 0.8773, M: 16.260, S: 0.06873 },
  { age: 126, L: 0.8594, M: 16.590, S: 0.06885 },
  { age: 132, L: 0.8424, M: 16.960, S: 0.06910 },
  { age: 138, L: 0.8262, M: 17.360, S: 0.06949 },
  { age: 144, L: 0.8107, M: 17.800, S: 0.07002 },
  { age: 150, L: 0.7960, M: 18.270, S: 0.07069 },
  { age: 156, L: 0.7820, M: 18.770, S: 0.07149 },
  { age: 162, L: 0.7686, M: 19.300, S: 0.07242 },
  { age: 168, L: 0.7559, M: 19.850, S: 0.07347 },
  { age: 174, L: 0.7437, M: 20.430, S: 0.07463 },
  { age: 180, L: 0.7321, M: 21.030, S: 0.07590 },
  { age: 186, L: 0.7210, M: 21.650, S: 0.07727 },
  { age: 192, L: 0.7103, M: 22.290, S: 0.07873 },
  { age: 198, L: 0.7001, M: 22.950, S: 0.08028 },
  { age: 204, L: 0.6903, M: 23.620, S: 0.08191 },
  { age: 210, L: 0.6809, M: 24.310, S: 0.08361 },
  { age: 216, L: 0.6719, M: 25.010, S: 0.08539 },
  { age: 222, L: 0.6632, M: 25.720, S: 0.08722 },
  { age: 228, L: 0.6549, M: 26.440, S: 0.08912 },
  { age: 234, L: 0.6469, M: 27.170, S: 0.09106 },
  { age: 240, L: 0.6393, M: 27.910, S: 0.09304 },
];

const GIRLS_LMS: readonly LmsEntry[] = [
  { age: 24, L: 1.4428, M: 16.122, S: 0.08594 },
  { age: 30, L: 1.3750, M: 15.738, S: 0.08244 },
  { age: 36, L: 1.3140, M: 15.431, S: 0.07971 },
  { age: 42, L: 1.2589, M: 15.181, S: 0.07761 },
  { age: 48, L: 1.2083, M: 14.983, S: 0.07603 },
  { age: 54, L: 1.1623, M: 14.834, S: 0.07486 },
  { age: 60, L: 1.1202, M: 14.724, S: 0.07401 },
  { age: 66, L: 1.0813, M: 14.647, S: 0.07342 },
  { age: 72, L: 1.0452, M: 14.600, S: 0.07304 },
  { age: 78, L: 1.0117, M: 14.579, S: 0.07283 },
  { age: 84, L: 0.9804, M: 14.583, S: 0.07278 },
  { age: 90, L: 0.9511, M: 14.612, S: 0.07287 },
  { age: 96, L: 0.9236, M: 14.665, S: 0.07311 },
  { age: 102, L: 0.8978, M: 14.742, S: 0.07349 },
  { age: 108, L: 0.8735, M: 14.842, S: 0.07402 },
  { age: 114, L: 0.8506, M: 14.965, S: 0.07470 },
  { age: 120, L: 0.8289, M: 15.110, S: 0.07553 },
  { age: 126, L: 0.8084, M: 15.278, S: 0.07650 },
  { age: 132, L: 0.7889, M: 15.469, S: 0.07761 },
  { age: 138, L: 0.7703, M: 15.683, S: 0.07886 },
  { age: 144, L: 0.7525, M: 15.920, S: 0.08024 },
  { age: 150, L: 0.7355, M: 16.181, S: 0.08175 },
  { age: 156, L: 0.7191, M: 16.466, S: 0.08339 },
  { age: 162, L: 0.7034, M: 16.776, S: 0.08516 },
  { age: 168, L: 0.6882, M: 17.111, S: 0.08705 },
  { age: 174, L: 0.6736, M: 17.471, S: 0.08905 },
  { age: 180, L: 0.6595, M: 17.857, S: 0.09117 },
  { age: 186, L: 0.6458, M: 18.268, S: 0.09340 },
  { age: 192, L: 0.6325, M: 18.703, S: 0.09573 },
  { age: 198, L: 0.6197, M: 19.162, S: 0.09817 },
  { age: 204, L: 0.6072, M: 19.645, S: 0.10071 },
  { age: 210, L: 0.5951, M: 20.151, S: 0.10334 },
  { age: 216, L: 0.5833, M: 20.680, S: 0.10607 },
  { age: 222, L: 0.5718, M: 21.231, S: 0.10889 },
  { age: 228, L: 0.5607, M: 21.804, S: 0.11179 },
  { age: 234, L: 0.5498, M: 22.399, S: 0.11478 },
  { age: 240, L: 0.5392, M: 23.015, S: 0.11785 },
];

/**
 * Linearly interpolate LMS values at a given age (in months).
 */
function interpolateLms(
  table: readonly LmsEntry[],
  ageMonths: number,
): { L: number; M: number; S: number } {
  // Clamp to table range
  if (ageMonths <= table[0].age) {
    return { L: table[0].L, M: table[0].M, S: table[0].S };
  }
  if (ageMonths >= table[table.length - 1].age) {
    const last = table[table.length - 1];
    return { L: last.L, M: last.M, S: last.S };
  }

  // Find the two bracketing entries
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (ageMonths >= a.age && ageMonths <= b.age) {
      const t = (ageMonths - a.age) / (b.age - a.age);
      return {
        L: a.L + t * (b.L - a.L),
        M: a.M + t * (b.M - a.M),
        S: a.S + t * (b.S - a.S),
      };
    }
  }

  // Fallback (should never reach here)
  const last = table[table.length - 1];
  return { L: last.L, M: last.M, S: last.S };
}

/**
 * Approximate the standard normal cumulative distribution function.
 *
 * Abramowitz & Stegun approximation, accurate to ~7.5 × 10⁻⁸.
 */
function standardNormalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z >= 0 ? 1 : -1;
  const absZ = Math.abs(z);
  const t = 1.0 / (1.0 + p * absZ);
  const expTerm = Math.exp((-absZ * absZ) / 2);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * expTerm;
  return 0.5 * (1.0 + sign * y);
}

/**
 * Calculate BMI-for-age Z-score using the CDC 2000 LMS method.
 *
 * @param bmi - Body mass index (kg/m²)
 * @param ageMonths - Age in months (24–240, i.e. 2–20 years)
 * @param sex - "male" or "female"
 * @returns Z-score (number), or NaN if age is out of range
 */
export function cdcBmiZScore(
  bmi: number,
  ageMonths: number,
  sex: string,
): number {
  if (ageMonths < 24 || ageMonths > 240 || bmi <= 0) {
    return Number.NaN;
  }

  const table = sex === "female" ? GIRLS_LMS : BOYS_LMS;
  const { L, M, S } = interpolateLms(table, ageMonths);

  if (L !== 0) {
    return (Math.pow(bmi / M, L) - 1) / (L * S);
  }
  return Math.log(bmi / M) / S;
}

/**
 * Calculate BMI-for-age percentile (0–100) using CDC 2000 LMS method.
 *
 * @param bmi - Body mass index (kg/m²)
 * @param ageMonths - Age in months (24–240, i.e. 2–20 years)
 * @param sex - "male" or "female"
 * @returns Percentile (0–100), or NaN if age is out of range
 */
export function cdcBmiPercentile(
  bmi: number,
  ageMonths: number,
  sex: string,
): number {
  const z = cdcBmiZScore(bmi, ageMonths, sex);
  if (Number.isNaN(z)) {
    return Number.NaN;
  }
  return standardNormalCDF(z) * 100;
}

/**
 * Classify a BMI percentile into CDC weight-status categories.
 *
 * CDC classification:
 *   < 5th percentile   → Underweight
 *   5th – <85th        → Healthy weight
 *   85th – <95th       → Overweight
 *   ≥ 95th             → Obesity
 */
export function classifyBmiPercentile(percentile: number): string {
  if (percentile < 5) {
    return "Underweight";
  }
  if (percentile < 85) {
    return "Healthy weight";
  }
  if (percentile < 95) {
    return "Overweight";
  }
  return "Obesity";
}

// ---------------------------------------------------------------------------
// Original utility functions (unchanged)
// ---------------------------------------------------------------------------

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

export function calculateCorrectedQt(
  qtMs: number,
  heartRateBpm: number,
): number {
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

export function calculatePediatricBmi(
  weightKg: number,
  heightCm: number,
): number {
  if (heightCm <= 0) {
    return 0;
  }

  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * @deprecated Use classifyBmiPercentile() with cdcBmiPercentile() instead.
 * This function incorrectly treats raw BMI values as percentiles.
 * Retained for backward compatibility during migration.
 */
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