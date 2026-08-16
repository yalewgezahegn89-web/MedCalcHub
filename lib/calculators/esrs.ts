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

export const esrsCalculator: CalculatorDefinition = {
  id: "esrs",

  slug: "esrs",

  name: "Essen Stroke Risk Score",

  shortName: "ESRS",

  description:
    "The Essen Stroke Risk Score (ESRS) estimates the long-term risk of recurrent stroke in patients with a history of ischemic stroke or TIA. Points are awarded for age, hypertension, diabetes, prior myocardial infarction, other cardiovascular disease, peripheral arterial disease, smoking, and prior ischemic events; the total ranges 0–9.",

  category: "Neurology",

  specialty: "Neurology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Essen Stroke Risk Score",
    "ESRS",
    "Stroke risk",
    "Recurrent stroke",
    "Secondary prevention",
    "Antiplatelet",
    "TIA",
    "Ischemic stroke",
    "Neurology",
  ],

  formula:
    "ESRS = Age (65–75: 1; > 75: 2) + Hypertension (1) + Diabetes (1) + Prior MI (1) + Other CVD except MI/atrial fibrillation (1) + Peripheral arterial disease (1) + Smoking (1) + Prior ischemic stroke/TIA (1) → total 0–9",

  normalRange:
    "0–9. Scores of 0–2 indicate low risk; 3 or more indicate high risk of recurrent ischemic stroke and warrant aggressive secondary prevention.",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–2",
      context: "Lower long-term recurrent stroke risk",
    },
    {
      label: "High risk",
      range: "3–9",
      context: "Higher recurrent stroke risk; aggressive secondary prevention",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "0–2",
      min: 0,
      max: 2,
      color: "green",
    },
    {
      label: "High risk",
      range: "3–9",
      min: 3,
      max: 9,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Score patients with a history of ischemic stroke or TIA to guide the intensity of secondary prevention.",
      "Apply current guideline-based treatment regardless of the score — the score supports treatment intensity decisions.",
      "In patients with atrial fibrillation, anticoagulation rather than antiplatelet therapy is indicated.",
    ],
    warnings: [
      "The ESRS was derived from the CAPRIE cohort and does not capture all predictors of recurrence.",
      "Do not use the ESRS to decide on anticoagulation for atrial fibrillation — use stroke risk scores validated for AF (e.g., CHA2DS2-VASc).",
      "A low score does not remove the need for optimal secondary prevention.",
    ],
    followUp: [
      "Optimize blood pressure, lipids, glucose, and lifestyle in all patients.",
      "Reassess risk and treatment adherence at follow-up visits.",
    ],
  },

  clinicalNotes:
    "The Essen Stroke Risk Score was developed from the CAPRIE trial cohort of patients with prior ischemic events to predict the risk of recurrent ischemic stroke and to identify patients who might benefit from more intensive antiplatelet or antithrombotic therapy. Points are assigned for age 65–75 (1) and > 75 (2), hypertension, diabetes, prior myocardial infarction, other cardiovascular disease (excluding myocardial infarction and atrial fibrillation), peripheral arterial disease, smoking, and a prior ischemic stroke or TIA. Scores of 3 or more are considered high risk.",
  evidence: {
    source: "Derivation cohort (CAPRIE); validation in stroke populations",
    reference:
      "Diener HC, Ringleb PA, Savi P. Clopidogrel for the secondary prevention of stroke. Expert Opin Pharmacother. 2005;6(5):755-764.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Diener HC, Ringleb PA, Savi P. Clopidogrel for the secondary prevention of stroke. Expert Opin Pharmacother. 2005;6(5):755-764.",
      "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
    ],
  },

  faq: [
    {
      question: "How is the ESRS different from ABCD2?",
      answer:
        "ABCD2 predicts the 2-day stroke risk after a TIA, while the ESRS predicts long-term recurrent stroke risk in patients who have already had an ischemic stroke or TIA.",
    },
    {
      question: "Does the ESRS replace CHA2DS2-VASc in atrial fibrillation?",
      answer:
        "No. In atrial fibrillation, use an AF-specific tool such as CHA2DS2-VASc to guide anticoagulation.",
    },
  ],

  comparison: {
    title: "Stroke risk assessment",
    calculators: [
      {
        name: "ABCD2 Score for TIA",
        href: "/calculators/abcd2-score",
        use: "Very early (2-day) stroke risk after TIA",
        bestFor: "Acute TIA triage",
      },
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Quantifying acute stroke severity",
        bestFor: "Acute neurologic deficit assessment",
      },
    ],
  },

  references: [
    "Diener HC, Ringleb PA, Savi P. Clopidogrel for the secondary prevention of stroke. Expert Opin Pharmacother. 2005;6(5):755-764.",
    "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
  ],

  relatedCalculators: [
    "abcd2-score",
    "nihss",
    "modified-rankin-scale",
    "race-scale",
  ],

  inputs: [
    {
      id: "ageGroup",
      label: "Age",
      type: "select",
      required: true,
      options: [
        { label: "0 — Under 65 years", value: "0" },
        { label: "1 — 65 to 75 years", value: "1" },
        { label: "2 — Over 75 years", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "hypertension",
      label: "Hypertension",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "diabetes",
      label: "Diabetes Mellitus",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "priorMi",
      label: "Prior Myocardial Infarction",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "otherCvd",
      label: "Other Cardiovascular Disease (excluding MI and atrial fibrillation)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "pad",
      label: "Peripheral Arterial Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "smoking",
      label: "Current Smoker",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "priorTiaStroke",
      label: "Prior Ischemic Stroke or TIA",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
  ],

  calculate(values: Record<string, string>) {
    const ageGroup = selectOption(values, "ageGroup", "Age", ["0", "1", "2"]);
    if ("err" in ageGroup) return critical(ageGroup.err);
    const hypertension = yesNo(values, "hypertension", "Hypertension");
    if ("err" in hypertension) return critical(hypertension.err);
    const diabetes = yesNo(values, "diabetes", "Diabetes");
    if ("err" in diabetes) return critical(diabetes.err);
    const priorMi = yesNo(values, "priorMi", "Prior myocardial infarction");
    if ("err" in priorMi) return critical(priorMi.err);
    const otherCvd = yesNo(values, "otherCvd", "Other cardiovascular disease");
    if ("err" in otherCvd) return critical(otherCvd.err);
    const pad = yesNo(values, "pad", "Peripheral arterial disease");
    if ("err" in pad) return critical(pad.err);
    const smoking = yesNo(values, "smoking", "Smoking");
    if ("err" in smoking) return critical(smoking.err);
    const priorTiaStroke = yesNo(values, "priorTiaStroke", "Prior ischemic stroke or TIA");
    if ("err" in priorTiaStroke) return critical(priorTiaStroke.err);

    const yes = (v: NumOrErr) => ("err" in v ? 0 : v.n);
    const score =
      ageGroup.n +
      yes(hypertension) +
      yes(diabetes) +
      yes(priorMi) +
      yes(otherCvd) +
      yes(pad) +
      yes(smoking) +
      yes(priorTiaStroke);

    let interpretation: string;
    let status: "normal" | "high";
    let referenceRange: string;

    if (score <= 2) {
      interpretation =
        `ESRS ${score}/9 — LOW recurrent stroke risk. ` +
        "Maintain optimal secondary prevention (blood pressure, lipids, glucose, antiplatelet therapy, and lifestyle).";
      status = "normal";
      referenceRange = "0–2";
    } else {
      interpretation =
        `ESRS ${score}/9 — HIGH recurrent stroke risk. ` +
        "Aggressive secondary prevention is warranted; consider intensive risk-factor management and individualized antithrombotic therapy.";
      status = "high";
      referenceRange = "3–9";
    }

    return {
      value: score,
      unit: "/9",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
