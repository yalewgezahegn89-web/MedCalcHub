import type { CalculatorDefinition } from "./calculator.types";
import { ckdEpi2021Calculator } from "./ckd-epi-2021";
import { curb65Calculator } from "./curb-65";
import { gcsCalculator } from "./gcs";
import { shockIndexCalculator } from "./shock-index";
import { news2Calculator } from "./news2";
import { qsofaCalculator } from "./qsofa";
import { mapCalculator } from "./map";
import { heartRateCalculator } from "./heart-rate";

import { childPughCalculator } from "./child-pugh";
import { bmiCalculator } from "./bmi";
import { bsaCalculator } from "./bsa";
import { ibwCalculator } from "./ibw";
import { adjbwCalculator } from "./adjbw";
import { lbmCalculator } from "./lbm";

import { cockcroftGaultCalculator } from "./cockcroft-gault";
import { bunCreatinineRatioCalculator } from "./bun-creatinine-ratio";
import { mdrdCalculator } from "./mdrd";
import { acrCalculator } from "./acr";

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
import { feureaCalculator } from "./feurea";
import { ttkgCalculator } from "./ttkg";
import { calciumPhosphateProductCalculator } from "./calcium-phosphate-product";
import { fractionalExcretionCalculator } from "./fractional-excretion-calculator";

import { homaIrCalculator } from "./homa-ir";
import { homaBCalculator } from "./homa-b";
import { insulinSensitivityCalculator } from "./insulin-sensitivity";
import { estimatedAverageGlucoseCalculator } from "./estimated-average-glucose";
import { a1cEagConverterCalculator } from "./a1c-eag-converter";

import { ldlCholesterolCalculator } from "./ldl-cholesterol";
import { nonHdlCholesterolCalculator } from "./non-hdl-cholesterol";
import { albuminGlobulinRatioCalculator } from "./albumin-globulin-ratio";
import { tygIndexCalculator } from "./tyg-index";
import { triglycerideHdlRatioCalculator } from "./triglyceride-hdl-ratio";
import { quickiCalculator } from "./quicki";
import { wintersFormulaCalculator } from "./winters-formula";
import { anionGapDeltaRatioCalculator } from "./anion-gap-delta-ratio";
import { urineAnionGapCalculator } from "./urine-anion-gap";
import { ktVCalculator } from "./kt-v";
import { feuaCalculator } from "./fractional-excretion-uric-acid";
import { fepCalculator } from "./fractional-excretion-phosphate";
import { fecaCalculator } from "./fractional-excretion-calcium";
import { rfiCalculator } from "./renal-failure-index";
import { urineOsmolalGapCalculator } from "./urine-osmolal-gap";
import { freeWaterClearanceCalculator } from "./free-water-clearance";
import { electrolyteFreeWaterClearanceCalculator } from "./electrolyte-free-water-clearance";
import { upcrCalculator } from "./urine-protein-creatinine-ratio";
import { creatinineClearance24hCalculator } from "./creatinine-clearance-24h";

import { totalCholesterolHdlRatioCalculator } from "./total-cholesterol-hdl-ratio";
import { atherogenicIndexPlasmaCalculator } from "./atherogenic-index-of-plasma";
import { apobApoa1RatioCalculator } from "./apob-apoa1-ratio";

import { respiratoryCompensationCalculator } from "./respiratory-compensation";
import { metabolicAlkalosisCompensationCalculator } from "./metabolic-alkalosis-compensation";

import { freeThyroxineIndexCalculator } from "./free-thyroxine-index";
import { metabolicSyndromeAtp3Calculator } from "./metabolic-syndrome-atp3";

import { correctedQtCalculator } from "./corrected-qt";

import { thyroidDoseCalculator } from "./thyroid-dose";
import { levothyroxineDoseCalculator } from "./levothyroxine-dose";
import { adrenalSteroidConverterCalculator } from "./adrenal-steroid-converter";

import { bmiForPediatricsCalculator } from "./bmi-for-pediatrics";
import { waistToHipRatioCalculator } from "./waist-to-hip-ratio";

import { aaGradientCalculator } from "./a-a-gradient";
import { oxygenIndexCalculator } from "./oxygen-index";
import { pfRatioCalculator } from "./pf-ratio";
import { roxIndexCalculator } from "./rox-index";

import { apriCalculator } from "./apri";
import { fib4Calculator } from "./fib-4";
import { glasgowBlatchfordCalculator } from "./glasgow-blatchford-score";
import { maddreyCalculator } from "./maddrey-discriminant-function";
import { meldCalculator } from "./meld";
import { meldNaCalculator } from "./meld-na";
import { nafldFibrosisCalculator } from "./nafld-fibrosis-score";
import { rockallCalculator } from "./rockall-score";

import { eddCalculator } from "./edd";
import { gestationalAgeCalculator } from "./gestational-age";

import { percRuleCalculator } from "./perc-rule";
import { wellsPeCalculator } from "./wells-pe";
import { wellsDvtCalculator } from "./wells-dvt";
import { heartScoreCalculator } from "./heart-score";
import { sofaScoreCalculator } from "./sofa-score";
import { sirsCriteriaCalculator } from "./sirs-criteria";
import { crb65Calculator } from "./crb-65";
import { psiPortCalculator } from "./psi-port";
import { rtsCalculator } from "./rts";
import { parklandFormulaCalculator } from "./parkland-formula";

import { timiCalculator } from "./timi";
import { graceCalculator } from "./grace";
import { cha2ds2VascCalculator } from "./cha2ds2-vasc";
import { hasBledCalculator } from "./has-bled";
import { rcriCalculator } from "./rcri";
import { ascvdCalculator } from "./ascvd";
import { daptCalculator } from "./dapt";
import { h2fpefCalculator } from "./h2fpef";

export const calculatorRegistry: CalculatorDefinition[] = [
  ckdEpi2021Calculator,
  curb65Calculator,
  gcsCalculator,
  shockIndexCalculator,
  news2Calculator,
  qsofaCalculator,
  mapCalculator,
  heartRateCalculator,

  bmiCalculator,
  bsaCalculator,
  ibwCalculator,
  adjbwCalculator,
  lbmCalculator,

  cockcroftGaultCalculator,

  childPughCalculator,

  bunCreatinineRatioCalculator,
  mdrdCalculator,
  acrCalculator,

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
  feureaCalculator,
  ttkgCalculator,
  calciumPhosphateProductCalculator,
  fractionalExcretionCalculator,

  feuaCalculator,
  fepCalculator,
  fecaCalculator,
  rfiCalculator,
  urineOsmolalGapCalculator,
  freeWaterClearanceCalculator,
  electrolyteFreeWaterClearanceCalculator,
  upcrCalculator,
  creatinineClearance24hCalculator,

  totalCholesterolHdlRatioCalculator,
  atherogenicIndexPlasmaCalculator,
  apobApoa1RatioCalculator,

  respiratoryCompensationCalculator,
  metabolicAlkalosisCompensationCalculator,

  homaIrCalculator,
  homaBCalculator,
  insulinSensitivityCalculator,
  estimatedAverageGlucoseCalculator,
  a1cEagConverterCalculator,

  ldlCholesterolCalculator,
  nonHdlCholesterolCalculator,
  albuminGlobulinRatioCalculator,
  tygIndexCalculator,
  triglycerideHdlRatioCalculator,
  quickiCalculator,
  wintersFormulaCalculator,
  anionGapDeltaRatioCalculator,
  urineAnionGapCalculator,
  ktVCalculator,

  correctedQtCalculator,

  thyroidDoseCalculator,
  levothyroxineDoseCalculator,
  adrenalSteroidConverterCalculator,
  freeThyroxineIndexCalculator,
  metabolicSyndromeAtp3Calculator,

  bmiForPediatricsCalculator,

  waistToHipRatioCalculator,

  aaGradientCalculator,
  oxygenIndexCalculator,
  pfRatioCalculator,
  roxIndexCalculator,

  apriCalculator,
  fib4Calculator,
  glasgowBlatchfordCalculator,
  maddreyCalculator,
  meldCalculator,
  meldNaCalculator,
  nafldFibrosisCalculator,
  rockallCalculator,

  eddCalculator,
  gestationalAgeCalculator,

  percRuleCalculator,
  wellsPeCalculator,
  wellsDvtCalculator,
  heartScoreCalculator,
  sofaScoreCalculator,
  sirsCriteriaCalculator,
  crb65Calculator,
  psiPortCalculator,
  rtsCalculator,
  parklandFormulaCalculator,

  timiCalculator,
  graceCalculator,
  cha2ds2VascCalculator,
  hasBledCalculator,
  rcriCalculator,
  ascvdCalculator,
  daptCalculator,
  h2fpefCalculator,
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find(
    (calc) => calc.id === id,
  );
}

export function getFeaturedCalculators() {
  return calculatorRegistry.filter(
    (calculator) => calculator.featured,
  );
}

export function getCalculatorsByCategory(
  category: string,
) {
  return calculatorRegistry.filter(
    (calculator) =>
      calculator.category.toLowerCase() ===
      category.toLowerCase(),
  );
}

export function getCalculatorsBySpecialty(
  specialty: string,
) {
  return calculatorRegistry.filter(
    (calculator) =>
      calculator.specialty?.toLowerCase() ===
      specialty.toLowerCase(),
  );
}

export function searchCalculators(
  query: string,
) {
  const search = query.toLowerCase();

  return calculatorRegistry.filter(
    (calculator) =>
      calculator.name
        .toLowerCase()
        .includes(search) ||
      calculator.description
        .toLowerCase()
        .includes(search) ||
      calculator.category
        .toLowerCase()
        .includes(search) ||
      calculator.specialty
        ?.toLowerCase()
        .includes(search) ||
      calculator.tags?.some((tag) =>
        tag.toLowerCase().includes(search),
      ) ||
      calculator.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(search),
      ),
  );
}

export function getSpecialties() {
  const specialties = calculatorRegistry
    .map((calculator) => calculator.specialty)
    .filter(
      (specialty): specialty is string =>
        Boolean(specialty),
    );

  return [...new Set(specialties)].sort();
}

export function getCategories() {
  const categories = calculatorRegistry.map(
    (calculator) => calculator.category,
  );

  return [...new Set(categories)].sort();
}