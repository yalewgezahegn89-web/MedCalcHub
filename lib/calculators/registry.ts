import type { CalculatorDefinition } from "./calculator.types";
import { childPughCalculator } from "./child-pugh";
import { bmiCalculator } from "./bmi";
import { bsaCalculator } from "./bsa";
import { ibwCalculator } from "./ibw";
import { adjbwCalculator } from "./adjbw";
import { lbmCalculator } from "./lbm";
import { cockcroftGaultCalculator } from "./cockcroft-gault";
import { bunCreatinineRatioCalculator } from "./bun-creatinine-ratio";
import { ckdEpi2021Calculator } from "./ckd-epi-2021";
import { mdrdCalculator } from "./mdrd";
import { correctedCalciumCalculator } from "./corrected-calcium";
import { anionGapCalculator } from "./anion-gap";
import { correctedAnionGapCalculator } from "./corrected-anion-gap";
import { serumOsmolalityCalculator } from "./serum-osmolality";
import { osmolarGapCalculator } from "./osmolar-gap";
import { basalMetabolicRateCalculator } from "./basal-metabolic-rate";
import { mifflinStJeorCalculator } from "./mifflin-st-jeor";
import { harrisBenedictCalculator } from "./harris-benedict";
import { calorieRequirementCalculator } from "./calorie-requirement";
import { fluidRequirementCalculator } from "./fluid-requirement";
import { maintenanceFluidsCalculator } from "./maintenance-fluids";
import { freeWaterDeficitCalculator } from "./free-water-deficit";
import { sodiumDeficitCalculator } from "./sodium-deficit";
import { correctedSodiumCalculator } from "./corrected-sodium";
import { albuminCorrectedCalciumCalculator } from "./albumin-corrected-calcium";
import { fenaCalculator } from "./fena";
import { feUreaCalculator } from "./feurea";
import { ttkgCalculator } from "./ttkg";
import { calciumPhosphateProductCalculator } from "./calcium-phosphate-product";
import { fractionalExcretionCalculator } from "./fractional-excretion-calculator";
import { homaIrCalculator } from "./homa-ir";
import { homaBCalculator } from "./homa-b";
import { insulinSensitivityCalculator } from "./insulin-sensitivity";
import { estimatedAverageGlucoseCalculator } from "./estimated-average-glucose";
import { a1cEagConverterCalculator } from "./a1c-eag-converter";
import { correctedQtCalculator } from "./corrected-qt";
import { thyroidDoseCalculator } from "./thyroid-dose";
import { levothyroxineDoseCalculator } from "./levothyroxine-dose";
import { adrenalSteroidConverterCalculator } from "./adrenal-steroid-converter";
import { bmiForPediatricsCalculator } from "./bmi-for-pediatrics";

export const calculatorRegistry: CalculatorDefinition[] = [
  bmiCalculator,
  bsaCalculator,
  ibwCalculator,
  adjbwCalculator,
  lbmCalculator,
  cockcroftGaultCalculator,
  childPughCalculator,
  bunCreatinineRatioCalculator,
  ckdEpi2021Calculator,
  mdrdCalculator,
  correctedCalciumCalculator,
  anionGapCalculator,
  correctedAnionGapCalculator,
  serumOsmolalityCalculator,
  osmolarGapCalculator,
  basalMetabolicRateCalculator,
  mifflinStJeorCalculator,
  harrisBenedictCalculator,
  calorieRequirementCalculator,
  fluidRequirementCalculator,
  maintenanceFluidsCalculator,
  freeWaterDeficitCalculator,
  sodiumDeficitCalculator,
  correctedSodiumCalculator,
  albuminCorrectedCalciumCalculator,
  fenaCalculator,
  feUreaCalculator,
  ttkgCalculator,
  calciumPhosphateProductCalculator,
  fractionalExcretionCalculator,
  homaIrCalculator,
  homaBCalculator,
  insulinSensitivityCalculator,
  estimatedAverageGlucoseCalculator,
  a1cEagConverterCalculator,
  correctedQtCalculator,
  thyroidDoseCalculator,
  levothyroxineDoseCalculator,
  adrenalSteroidConverterCalculator,
  bmiForPediatricsCalculator,
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === id);
}