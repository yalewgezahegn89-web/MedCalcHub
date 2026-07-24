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
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === calc.id);
}