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

export const abcd2ScoreCalculator: CalculatorDefinition = {
  id: "abcd2-score",

  slug: "abcd2-score",

  name: "ABCD2 Score for TIA",

  shortName: "ABCD2",

  description:
    "The ABCD2 score stratifies the short-term risk of stroke after a transient ischemic attack (TIA) using Age, Blood pressure, Clinical features, Duration of symptoms, and Diabetes. The total ranges 0–7 and estimates the 2-day risk of subsequent stroke.",

  category: "Neurology",

  specialty: "Neurology",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "ABCD2 Score",
    "ABCD2",
    "TIA",
    "Transient ischemic attack",
    "Stroke risk",
    "Short-term stroke risk",
    "Neurology",
    "Cerebrovascular",
    "Risk stratification",
  ],

  formula:
    "ABCD2 = Age ≥ 60 (1) + BP ≥ 140/90 (1) + Clinical features (weakness 2, speech-only 1, other 0) + Duration (≥ 60 min 2, 10–59 min 1, < 10 min 0) + Diabetes (1) → total 0–7",

  normalRange:
    "Total 0–7. 2-day stroke risk: 0–3 → 1.0%; 4–5 → 4.1%; 6–7 → 8.1%.",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–3",
      context: "2-day stroke risk ≈ 1.0%",
    },
    {
      label: "Moderate risk",
      range: "4–5",
      context: "2-day stroke risk ≈ 4.1%",
    },
    {
      label: "High risk",
      range: "6–7",
      context: "2-day stroke risk ≈ 8.1%",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "0–3",
      min: 0,
      max: 3,
      color: "green",
    },
    {
      label: "Moderate risk",
      range: "4–5",
      min: 4,
      max: 5,
      color: "yellow",
    },
    {
      label: "High risk",
      range: "6–7",
      min: 6,
      max: 7,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Score the patient within the first hours after symptom onset using the worst clinical features during the event.",
      "Classify clinical features as unilateral weakness, speech disturbance without weakness, or other symptoms.",
      "Duration refers to the total length of the TIA symptoms.",
    ],
    warnings: [
      "ABCD2 is a risk-stratification aid, not a substitute for prompt specialist evaluation and neuroimaging.",
      "All patients with a suspected TIA need urgent assessment regardless of the score, because even low scores do not exclude stroke.",
      "The original cohort predates modern rapid imaging pathways; other tools (e.g., imaging-based risk) may be preferred in some centers.",
    ],
    followUp: [
      "Arrange urgent TIA clinic or hospital assessment with carotid imaging and treatment (antiplatelet therapy, statin, blood-pressure control).",
      "Higher scores warrant more urgent evaluation, typically same-day.",
    ],
  },

  clinicalNotes:
    "The ABCD2 score was derived and validated by Johnston and colleagues (Lancet 2007) from multiple TIA cohorts and is among the most widely used clinical tools for TIA risk stratification. Age 60 years or older adds 1 point; blood pressure ≥ 140/90 mmHg adds 1; unilateral weakness adds 2 and speech disturbance without weakness adds 1; symptoms lasting ≥ 60 minutes add 2, 10–59 minutes add 1, and under 10 minutes add 0; and diabetes adds 1. The 2-day stroke risk ranges from about 1% (score 0–3) to about 8% (score 6–7).",
  evidence: {
    source: "Derivation and validation cohort (Lancet 2007)",
    reference:
      "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
      "Rothwell PM, Giles MF, Flossmann E, et al. A simple score (ABCD) to identify individuals at high early risk of stroke after transient ischaemic attack. Lancet. 2005;366(9479):29-36.",
    ],
  },

  faq: [
    {
      question: "What does a low ABCD2 score mean?",
      answer:
        "A score of 0–3 is associated with a 2-day stroke risk of about 1.0%. Patients still need urgent specialist evaluation, but the risk is lower.",
    },
    {
      question: "Does ABCD2 replace imaging?",
      answer:
        "No. ABCD2 is an adjunct for triage; diffusion-weighted MRI and carotid imaging provide additional risk information and are part of modern TIA pathways.",
    },
  ],

  comparison: {
    title: "Stroke risk prediction",
    calculators: [
      {
        name: "Essen Stroke Risk Score",
        href: "/calculators/esrs",
        use: "Long-term recurrent stroke risk in secondary prevention",
        bestFor: "Chronic anticoagulant/antiplatelet decisions after stroke",
      },
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Quantifying neurologic deficit at the time of acute stroke",
        bestFor: "Severity assessment when a stroke has occurred",
      },
    ],
  },

  references: [
    "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
    "Rothwell PM, Giles MF, Flossmann E, et al. A simple score (ABCD) to identify individuals at high early risk of stroke after transient ischaemic attack. Lancet. 2005;366(9479):29-36.",
  ],

  relatedCalculators: [
    "esrs",
    "nihss",
    "race-scale",
    "modified-rankin-scale",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "select",
      required: true,
      options: [
        { label: "0 — Under 60 years", value: "0" },
        { label: "1 — 60 years or older", value: "1" },
      ],
      defaultValue: "0",
    },
    {
      id: "bloodPressure",
      label: "Blood Pressure at Presentation",
      type: "select",
      required: true,
      options: [
        { label: "0 — < 140/90 mmHg", value: "0" },
        { label: "1 — ≥ 140/90 mmHg", value: "1" },
      ],
      defaultValue: "0",
    },
    {
      id: "clinicalFeatures",
      label: "Clinical Features During TIA",
      type: "select",
      required: true,
      options: [
        { label: "2 — Unilateral weakness", value: "2" },
        { label: "1 — Speech disturbance without weakness", value: "1" },
        { label: "0 — Other symptoms only", value: "0" },
      ],
      defaultValue: "0",
    },
    {
      id: "duration",
      label: "Duration of Symptoms",
      type: "select",
      required: true,
      options: [
        { label: "2 — 60 minutes or longer", value: "2" },
        { label: "1 — 10 to 59 minutes", value: "1" },
        { label: "0 — Under 10 minutes", value: "0" },
      ],
      defaultValue: "0",
    },
    {
      id: "diabetes",
      label: "Diabetes Mellitus",
      type: "select",
      required: true,
      options: [
        { label: "0 — No", value: "0" },
        { label: "1 — Yes", value: "1" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const age = selectOption(values, "age", "Age", ["0", "1"]);
    if ("err" in age) return critical(age.err);
    const bloodPressure = selectOption(values, "bloodPressure", "Blood pressure", ["0", "1"]);
    if ("err" in bloodPressure) return critical(bloodPressure.err);
    const clinicalFeatures = selectOption(values, "clinicalFeatures", "Clinical features", ["0", "1", "2"]);
    if ("err" in clinicalFeatures) return critical(clinicalFeatures.err);
    const duration = selectOption(values, "duration", "Duration of symptoms", ["0", "1", "2"]);
    if ("err" in duration) return critical(duration.err);
    const diabetes = selectOption(values, "diabetes", "Diabetes", ["0", "1"]);
    if ("err" in diabetes) return critical(diabetes.err);

    const score = age.n + bloodPressure.n + clinicalFeatures.n + duration.n + diabetes.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score <= 3) {
      interpretation =
        `ABCD2 ${score}/7 — LOW short-term stroke risk. ` +
        "Estimated 2-day stroke risk ≈ 1.0%. Still arrange urgent specialist assessment, carotid imaging, and secondary prevention.";
      status = "normal";
      referenceRange = "0–3";
    } else if (score <= 5) {
      interpretation =
        `ABCD2 ${score}/7 — MODERATE short-term stroke risk. ` +
        "Estimated 2-day stroke risk ≈ 4.1%. Arrange urgent (same-day) specialist evaluation and secondary prevention.";
      status = "high";
      referenceRange = "4–5";
    } else {
      interpretation =
        `ABCD2 ${score}/7 — HIGH short-term stroke risk. ` +
        "Estimated 2-day stroke risk ≈ 8.1%. Expedite same-day specialist assessment and initiation of secondary prevention.";
      status = "critical";
      referenceRange = "6–7";
    }

    return {
      value: score,
      unit: "/7",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
