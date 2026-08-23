import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
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

const GRADE_OPTIONS = [
  {
    label: "0 — Fully active, able to carry on all predisease activities without restriction",
    value: "0",
  },
  {
    label: "1 — Restricted in physically strenuous activity but ambulatory; able to carry out work of a light or sedentary nature (e.g., light housework, office work)",
    value: "1",
  },
  {
    label: "2 — Ambulatory and capable of all self-care but unable to carry out any work activities; up and about more than 50% of waking hours",
    value: "2",
  },
  {
    label: "3 — Capable of only limited self-care; confined to bed or chair more than 50% of waking hours",
    value: "3",
  },
  {
    label: "4 — Completely disabled; cannot carry on any self-care; totally confined to bed or chair",
    value: "4",
  },
  {
    label: "5 — Dead",
    value: "5",
  },
];

export const ecogCalculator: CalculatorDefinition = {
  id: "ecog",

  slug: "ecog",

  name: "ECOG Performance Status",

  shortName: "ECOG PS",

  description:
    "The ECOG (Eastern Cooperative Oncology Group) performance status (Oken 1982) grades a patient's functional capability on a single scale from 0 (fully active) to 5 (dead). It is a cornerstone of oncology decision-making — used to select patients for chemotherapy and clinical trials, dose-intensity treatments, and estimate prognosis — and is widely applied in geriatrics and general medicine for patients with chronic or serious illness.",

  category: "Oncology",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "ECOG",
    "Performance status",
    "ECOG performance status",
    "Functional status",
    "Oncology",
    "Chemotherapy eligibility",
    "WHO performance status",
    "Zubrod",
  ],

  formula:
    "ECOG PS is a single ordinal grade: 0 = fully active; 1 = restricted in strenuous activity but ambulatory; 2 = ambulatory, capable of all self-care, unable to work; 3 = capable of only limited self-care, bed/chair > 50% of waking hours; 4 = completely disabled, totally confined to bed/chair; 5 = dead.",

  normalRange:
    "ECOG 0–1 indicates good functional status and is conventionally used as a threshold for many chemotherapy regimens and clinical trials; ECOG 2–4 indicates increasing functional limitation and ECOG 5 death.",

  referenceRanges: [
    {
      label: "Fully active",
      range: "0",
      context: "No functional restriction",
    },
    {
      label: "Ambulatory, light work only",
      range: "1",
      context: "Restricted in strenuous activity",
    },
    {
      label: "Self-care, unable to work",
      range: "2",
      context: "Ambulatory > 50% of waking hours",
    },
    {
      label: "Limited self-care",
      range: "3",
      context: "Confined to bed/chair > 50% of waking hours",
    },
    {
      label: "Completely disabled",
      range: "4",
      context: "Totally confined to bed/chair",
    },
    {
      label: "Dead",
      range: "5",
      context: "Deceased",
    },
  ],

  classification: [
    {
      label: "Fully active",
      range: "0",
      min: 0,
      max: 0,
      color: "green",
    },
    {
      label: "Ambulatory, light work only",
      range: "1",
      min: 1,
      max: 1,
      color: "green",
    },
    {
      label: "Self-care, unable to work",
      range: "2",
      min: 2,
      max: 2,
      color: "yellow",
    },
    {
      label: "Limited self-care",
      range: "3",
      min: 3,
      max: 3,
      color: "orange",
    },
    {
      label: "Completely disabled",
      range: "4",
      min: 4,
      max: 4,
      color: "red",
    },
    {
      label: "Dead",
      range: "5",
      min: 5,
      max: 5,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Eastern Cooperative Oncology Group (ECOG) performance status, also known as the WHO or Zubrod score, was published by Oken and colleagues in 1982. It uses a single grade from 0 (fully active) to 4 (completely disabled), with 5 denoting death, to describe a patient's level of function in daily activities. Because poor performance status independently predicts reduced tolerance of chemotherapy and worse survival across most cancers, ECOG PS is used to select patients for treatment and clinical trials (commonly requiring ECOG 0–1 or 0–2), to adjust treatment intensity, and to estimate prognosis. It is quick to administer, reproducible, and remains one of the most widely used functional measures in oncology.",




  references: [
    "Oken MM, Creech RH, Tormey DC, et al. Toxicity and response criteria of the Eastern Cooperative Oncology Group. Am J Clin Oncol. 1982;5(6):649-655.",
    "Zubrod CG, Schneiderman M, Frei E, et al. Appraisal of methods for the study of chemotherapy of cancer in man: comparative therapeutic trial of nitrogen mustard and triethylene thiophosphoramide. J Chronic Dis. 1960;11(1):7-33.",
  ],

  relatedCalculators: [],

  inputs: [
    {
      id: "grade",
      label: "ECOG performance status grade",
      type: "select",
      required: true,
      options: GRADE_OPTIONS,
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const grade = selectOption(values, "grade", "ECOG grade", ["0", "1", "2", "3", "4", "5"]);
    if ("err" in grade) return critical(grade.err);

    const total = grade.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total === 0) {
      interpretation =
        `ECOG ${total}/5 — FULLY ACTIVE. ` +
        "The patient is able to carry on all predisease activities without restriction.";
      status = "normal";
      referenceRange = "0";
    } else if (total === 1) {
      interpretation =
        `ECOG ${total}/5 — AMBULATORY, restricted in strenuous activity. ` +
        "The patient can carry out light or sedentary work; this is a good functional status for most treatment regimens.";
      status = "normal";
      referenceRange = "1";
    } else if (total === 2) {
      interpretation =
        `ECOG ${total}/5 — AMBULATORY, capable of all self-care but unable to work. ` +
        "The patient is up and about more than 50% of waking hours; some regimens and trials allow treatment at this level.";
      status = "high";
      referenceRange = "2";
    } else if (total === 3) {
      interpretation =
        `ECOG ${total}/5 — CAPABLE OF ONLY LIMITED SELF-CARE. ` +
        "The patient is confined to bed or chair more than 50% of waking hours; intensive therapy is generally poorly tolerated and supportive care is often prioritized.";
      status = "high";
      referenceRange = "3";
    } else if (total === 4) {
      interpretation =
        `ECOG ${total}/5 — COMPLETELY DISABLED. ` +
        "The patient cannot carry on any self-care and is totally confined to bed or chair; focus on comfort and supportive care.";
      status = "critical";
      referenceRange = "4";
    } else {
      interpretation =
        `ECOG ${total}/5 — DECEASED. ` +
        "Grade 5 indicates death and is recorded only for survival analyses.";
      status = "critical";
      referenceRange = "5";
    }

    return {
      value: total,
      unit: "/5",
      interpretation,
      status,
      referenceRange,
      score: total,
      advice: [
        "Re-assess ECOG PS at every treatment decision point; a decline should prompt evaluation of reversible causes and a goals-of-care discussion.",
      ],
    };
  },
};
