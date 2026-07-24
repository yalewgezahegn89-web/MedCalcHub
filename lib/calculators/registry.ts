import type { CalculatorDefinition } from "./calculator.types";

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
import { calciumPhosphateProductCalculator } from "./calcium-phosphate-product";
import { correctedSodiumHyperglycemiaCalculator } from "./corrected-sodium-hyperglycemia";
import { estimatedPlasmaOsmolalityCalculator } from "./estimated-plasma-osmolality";
import { fractionalExcretionSodiumCalculator } from "./fractional-excretion-sodium";
import { fractionalExcretionUreaCalculator } from "./fractional-excretion-urea";
import { freeWaterDeficitCalculator } from "./free-water-deficit";
import { maintenanceFluidCalculator } from "./maintenance-fluid";
import { sodiumDeficitCalculator } from "./sodium-deficit";
import { ttkgCalculator } from "./ttkg";
import { urineAnionGapCalculator } from "./urine-anion-gap";
import { waterExcessCalculator } from "./water-excess";
import { glasgowComaScaleCalculator } from "./glasgow-coma-scale";
import { qsofaCalculator } from "./qsofa";
import { sofaScoreCalculator } from "./sofa-score";
import { news2Calculator } from "./news2";
import { curb65Calculator } from "./curb-65";
import { wellsScorePeCalculator } from "./wells-score-pe";
import { wellsScoreDvtCalculator } from "./wells-score-dvt";
import { revisedTraumaScoreCalculator } from "./revised-trauma-score";
import { shockIndexCalculator } from "./shock-index";
import { pediatricGlasgowComaScaleCalculator } from "./pediatric-glasgow-coma-scale";
import { apacheIiCalculator } from "./apache-ii";
import { sirsCriteriaCalculator } from "./sirs-criteria";
import { sepsisScreeningCalculator } from "./sepsis-screening";
import { mewsCalculator } from "./mews";
import { ascvdRiskCalculator } from "./ascvd-risk";
import { cardiacIndexCalculator } from "./cardiac-index";
import { cardiacOutputCalculator } from "./cardiac-output";
import { cha2ds2VascCalculator } from "./cha2ds2-vasc";
import { dukeTreadmillScoreCalculator } from "./duke-treadmill-score";
import { framinghamRiskCalculator } from "./framingham-risk";
import { graceScoreCalculator } from "./grace-score";
import { hasBledCalculator } from "./has-bled";
import { heartScoreCalculator } from "./heart-score";
import { killipClassCalculator } from "./killip-class";
import { meanArterialPressureCalculator } from "./mean-arterial-pressure";
import { pulsePressureCalculator } from "./pulse-pressure";
import { qtcBazettCalculator } from "./qtc-bazett";
import { qtcFridericiaCalculator } from "./qtc-fridericia";
import { ratePressureProductCalculator } from "./rate-pressure-product";
import { reynoldsRiskCalculator } from "./reynolds-risk";
import { shockClassCalculator } from "./shock-class";
import { timiScoreCalculator } from "./timi-score";
import { apacheIiiCalculator } from "./apache-iii";
import { apacheIvCalculator } from "./apache-iv";
import { sapsIiCalculator } from "./saps-ii";
import { sapsIiiCalculator } from "./saps-iii";
import { modsScoreCalculator } from "./mods-score";
import { lordsScoreCalculator } from "./lods-score";
import { nutricScoreCalculator } from "./nutric-score";
import { fourScoreCalculator } from "./four-score";
import { roxIndexCalculator } from "./rox-index";
import { hacorScoreCalculator } from "./hacor-score";
import { bisapCalculator } from "./bisap";
import { ransonCriteriaCalculator } from "./ranson-criteria";
import { glasgowBlatchfordCalculator } from "./glasgow-blatchford";
import { rockallScoreCalculator } from "./rockall-score";
import { meldCalculator } from "./meld";
import { meldNaCalculator } from "./meld-na";
import { childPughCalculator } from "./child-pugh";

export const calculatorRegistry: CalculatorDefinition[] = [
  bmiCalculator,
  bsaCalculator,
  ibwCalculator,
  adjbwCalculator,
  lbmCalculator,
  cockcroftGaultCalculator,
  bunCreatinineRatioCalculator,
  ckdEpi2021Calculator,
  mdrdCalculator,
  correctedCalciumCalculator,
  anionGapCalculator,
  correctedAnionGapCalculator,
  serumOsmolalityCalculator,
  osmolarGapCalculator,
  calciumPhosphateProductCalculator,
  correctedSodiumHyperglycemiaCalculator,
  estimatedPlasmaOsmolalityCalculator,
  fractionalExcretionSodiumCalculator,
  fractionalExcretionUreaCalculator,
  freeWaterDeficitCalculator,
  maintenanceFluidCalculator,
  sodiumDeficitCalculator,
  ttkgCalculator,
  urineAnionGapCalculator,
  waterExcessCalculator,
  glasgowComaScaleCalculator,
  qsofaCalculator,
  sofaScoreCalculator,
  news2Calculator,
  curb65Calculator,
  wellsScorePeCalculator,
  wellsScoreDvtCalculator,
  revisedTraumaScoreCalculator,
  shockIndexCalculator,
  pediatricGlasgowComaScaleCalculator,
  apacheIiCalculator,
  sirsCriteriaCalculator,
  sepsisScreeningCalculator,
  mewsCalculator,
  ascvdRiskCalculator,
  cardiacIndexCalculator,
  cardiacOutputCalculator,
  cha2ds2VascCalculator,
  dukeTreadmillScoreCalculator,
  framinghamRiskCalculator,
  graceScoreCalculator,
  hasBledCalculator,
  heartScoreCalculator,
  killipClassCalculator,
  meanArterialPressureCalculator,
  pulsePressureCalculator,
  qtcBazettCalculator,
  qtcFridericiaCalculator,
  ratePressureProductCalculator,
  reynoldsRiskCalculator,
  shockClassCalculator,
  timiScoreCalculator,
  apacheIiiCalculator,
  apacheIvCalculator,
  sapsIiCalculator,
  sapsIiiCalculator,
  modsScoreCalculator,
  lordsScoreCalculator,
  nutricScoreCalculator,
  fourScoreCalculator,
  roxIndexCalculator,
  hacorScoreCalculator,
  bisapCalculator,
  ransonCriteriaCalculator,
  glasgowBlatchfordCalculator,
  rockallScoreCalculator,
  meldCalculator,
  meldNaCalculator,
  childPughCalculator,
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === id);
}