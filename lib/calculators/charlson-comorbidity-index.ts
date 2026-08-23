import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function yesNo(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (v !== "no" && v !== "yes") return { err: `Invalid ${label} selection.` };
  return { n: v === "yes" ? 1 : 0 };
}

function selectOption(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { n: Number(v) };
}

const COMORBIDITIES: Array<{ id: string; label: string; weight: number }> = [
  { id: "myocardialInfarction", label: "Myocardial infarction", weight: 1 },
  { id: "congestiveHeartFailure", label: "Congestive heart failure", weight: 1 },
  { id: "peripheralVascularDisease", label: "Peripheral vascular disease", weight: 1 },
  { id: "cerebrovascularDisease", label: "Cerebrovascular disease", weight: 1 },
  { id: "dementia", label: "Dementia", weight: 1 },
  { id: "chronicPulmonaryDisease", label: "Chronic pulmonary disease", weight: 1 },
  { id: "connectiveTissueDisease", label: "Connective tissue disease", weight: 1 },
  { id: "pepticUlcer", label: "Peptic ulcer disease", weight: 1 },
  { id: "mildLiverDisease", label: "Mild liver disease", weight: 1 },
  { id: "diabetesNoComplications", label: "Diabetes without end-organ damage", weight: 1 },
  { id: "hemiplegia", label: "Hemiplegia or paraplegia", weight: 2 },
  { id: "moderateSevereRenalDisease", label: "Moderate or severe renal disease", weight: 2 },
  { id: "diabetesEndOrganDamage", label: "Diabetes with end-organ damage", weight: 2 },
  { id: "anyMalignancy", label: "Any malignancy (without metastasis)", weight: 2 },
  { id: "leukemia", label: "Leukemia", weight: 2 },
  { id: "lymphoma", label: "Lymphoma", weight: 2 },
  { id: "moderateSevereLiverDisease", label: "Moderate or severe liver disease", weight: 3 },
  { id: "metastaticSolidTumor", label: "Metastatic solid tumor", weight: 6 },
  { id: "aids", label: "AIDS", weight: 6 },
];

const AGE_ADJUST = [
  { value: "0", points: 0, label: "Under 50 years" },
  { value: "1", points: 1, label: "50–59 years" },
  { value: "2", points: 2, label: "60–69 years" },
  { value: "3", points: 3, label: "70–79 years" },
  { value: "4", points: 4, label: "80 years or older" },
];

function tenYearSurvival(score: number): number {
  return Math.pow(0.983, Math.exp(0.9 * score)) * 100;
}

export const charlsonCalculator: CalculatorDefinition = {
  id: "charlson",

  slug: "charlson",

  name: "Charlson Comorbidity Index (CCI)",

  shortName: "CCI",

  description:
    "The Charlson Comorbidity Index (Charlson 1987) predicts one-year and ten-year mortality from a weighted count of 19 comorbidities (weights 1, 2, 3, and 6) plus an age adjustment (per decade over 40, 1994). Higher scores indicate greater comorbidity burden and lower estimated ten-year survival, with wide application as a case-mix adjustment in outcomes research and clinical prognostication.",

  category: "Internal Medicine",

  specialty: "General Medicine",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Charlson Comorbidity Index",
    "CCI",
    "Comorbidity",
    "Charlson",
    "10-year survival",
    "Prognosis",
    "Case mix",
  ],

  formula:
    "CCI = sum of comorbidity weights (MI 1, CHF 1, PVD 1, CVD 1, dementia 1, COPD 1, connective tissue disease 1, peptic ulcer 1, mild liver disease 1, diabetes without complications 1; hemiplegia 2, moderate/severe renal disease 2, diabetes with end-organ damage 2, any malignancy 2, leukemia 2, lymphoma 2; moderate/severe liver disease 3; metastatic solid tumor 6, AIDS 6) + age adjustment (50–59 +1, 60–69 +2, 70–79 +3, ≥ 80 +4). Estimated 10-year survival = 0.983^(e^(0.9 × CCI)) × 100%.",

  normalRange:
    "0 = no comorbidity burden; 1–2 = low; 3–4 = moderate; ≥ 5 = high. Higher scores correspond to sharply lower estimated ten-year survival (e.g., 4 → ~53%, 5 → ~21%).",

  referenceRanges: [
    {
      label: "No comorbidity",
      range: "0",
      context: "No significant comorbidity burden",
    },
    {
      label: "Low",
      range: "1–2",
      context: "Low comorbidity burden",
    },
    {
      label: "Moderate",
      range: "3–4",
      context: "Moderate comorbidity burden",
    },
    {
      label: "High",
      range: "5+",
      context: "High comorbidity burden",
    },
  ],

  classification: [
    {
      label: "No comorbidity",
      range: "0",
      min: 0,
      max: 0,
      color: "green",
    },
    {
      label: "Low",
      range: "1–2",
      min: 1,
      max: 2,
      color: "green",
    },
    {
      label: "Moderate",
      range: "3–4",
      min: 3,
      max: 4,
      color: "yellow",
    },
    {
      label: "High",
      range: "≥ 5",
      min: 5,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Charlson Comorbidity Index was published by Mary Charlson and colleagues in 1987 as a method of classifying comorbid conditions to predict short-term (one-year) mortality. Nineteen conditions are assigned weights of 1, 2, 3, or 6 based on their adjusted relative risk of death; in the derivation cohort, one-year mortality rose from 12% at score 0 to 26% at 1–2, 52% at 3–4, and 85% at scores ≥ 5. In 1994 the index was age-adjusted by adding one point per decade over age 40, and an exponential model (10-year survival = 0.983^e^(0.9 × score)) was validated, yielding 10-year survivals of approximately 96%, 90%, 77%, 53%, and 21% for scores 1 through 5. The CCI is one of the most widely used comorbidity measures in clinical research.",




  references: [
    "Charlson ME, Pompei P, Ales KL, MacKenzie CR. A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chronic Dis. 1987;40(5):373-383.",
    "Charlson M, Szatrowski TP, Peterson J, Gold J. Validation of a combined comorbidity index. J Clin Epidemiol. 1994;47(11):1245-1251.",
  ],

  relatedCalculators: [],

  inputs: [
    {
      id: "ageGroup",
      label: "Age",
      type: "select",
      required: true,
      options: AGE_ADJUST.map((a) => ({ label: a.label, value: a.value })),
      defaultValue: "0",
    },
    ...COMORBIDITIES.map((c) => ({
      id: c.id,
      label: c.label,
      type: "select" as const,
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    })),
  ],

  calculate(values: Record<string, string>) {
    const ageGroup = selectOption(values, "ageGroup", "Age", ["0", "1", "2", "3", "4"]);
    if ("err" in ageGroup) return critical(ageGroup.err);

    const comorbidityResults: NumOrErr[] = [];
    for (const c of COMORBIDITIES) {
      comorbidityResults.push(yesNo(values, c.id, c.label));
    }
    for (const result of comorbidityResults) {
      if ("err" in result) return critical(result.err);
    }

    let comorbidityScore = 0;
    for (let i = 0; i < COMORBIDITIES.length; i++) {
      const result = comorbidityResults[i];
      if (!("err" in result) && result.n === 1) {
        comorbidityScore += COMORBIDITIES[i].weight;
      }
    }

    const ageAdjust =
      AGE_ADJUST.find((a) => a.value === ageGroup.n.toString())?.points ?? 0;
    const score = comorbidityScore + ageAdjust;
    const survival = tenYearSurvival(score);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score === 0) {
      interpretation =
        `CCI ${score} (age-adjusted) — NO significant comorbidity burden. ` +
        `Estimated 10-year survival ≈ ${survival.toFixed(1)}%. No age adjustment applies.`;
      status = "normal";
      referenceRange = "0";
    } else if (score <= 2) {
      interpretation =
        `CCI ${score} (age-adjusted) — LOW comorbidity burden. ` +
        `Estimated 10-year survival ≈ ${survival.toFixed(1)}%. The comorbidity burden is low; survival is driven mainly by the index disease and other factors.`;
      status = "normal";
      referenceRange = "1–2";
    } else if (score <= 4) {
      interpretation =
        `CCI ${score} (age-adjusted) — MODERATE comorbidity burden. ` +
        `Estimated 10-year survival ≈ ${survival.toFixed(1)}%. Comorbidity meaningfully lowers predicted survival and should be weighed in treatment decisions.`;
      status = "high";
      referenceRange = "3–4";
    } else {
      interpretation =
        `CCI ${score} (age-adjusted) — HIGH comorbidity burden. ` +
        `Estimated 10-year survival ≈ ${survival.toFixed(1)}%. High comorbidity burden is associated with markedly reduced survival; weigh goals of care accordingly.`;
      status = "critical";
      referenceRange = "≥ 5";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
      referenceRange,
      score,
      advice: [
        "The ten-year survival estimate is a population-level prediction (0.983^e^(0.9 × score)) and should not be used to predict an individual outcome.",
      ],
    };
  },
};
