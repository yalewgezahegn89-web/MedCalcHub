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
];

export function getCalculatorById(
  id: string,
): CalculatorDefinition | undefined {
  return calculatorRegistry.find((calc) => calc.id === calc.id);
}