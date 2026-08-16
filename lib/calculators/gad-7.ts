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

const FREQ_OPTIONS = [
  { label: "0 — Not at all", value: "0" },
  { label: "1 — Several days", value: "1" },
  { label: "2 — More than half the days", value: "2" },
  { label: "3 — Nearly every day", value: "3" },
];

export const gad7Calculator: CalculatorDefinition = {
  id: "gad-7",

  slug: "gad-7",

  name: "Generalized Anxiety Disorder 7-Item Scale (GAD-7)",

  shortName: "GAD-7",

  description:
    "The GAD-7 (Spitzer 2006) screens for and grades the severity of generalized anxiety symptoms over the prior two weeks. Seven items are each scored 0–3 (total 0–21), with a cut-point of 10 maximizing sensitivity (~89%) and specificity (~82%) for generalized anxiety disorder; scores fall into minimal, mild, moderate, and severe bands.",

  category: "Mental Health",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "GAD-7",
    "Anxiety",
    "Generalized anxiety disorder",
    "Anxiety screening",
    "Mental health",
    "GAD",
  ],

  formula:
    "GAD-7 total = sum of 7 item scores (each 0–3, over the past 2 weeks) → 0–21. 0–4 minimal, 5–9 mild, 10–14 moderate, 15–21 severe.",

  normalRange:
    "0–9 (no/minimal to mild anxiety symptoms). A total ≥ 10 is the recommended cut-point for generalized anxiety disorder.",

  referenceRanges: [
    {
      label: "Minimal",
      range: "0–4",
      context: "Minimal anxiety symptoms",
    },
    {
      label: "Mild",
      range: "5–9",
      context: "Mild anxiety symptoms; watchful waiting",
    },
    {
      label: "Moderate",
      range: "10–14",
      context: "Moderate anxiety; consider treatment",
    },
    {
      label: "Severe",
      range: "15–21",
      context: "Severe anxiety; active treatment",
    },
  ],

  classification: [
    {
      label: "Minimal",
      range: "0–4",
      min: 0,
      max: 4,
      color: "green",
    },
    {
      label: "Mild",
      range: "5–9",
      min: 5,
      max: 9,
      color: "green",
    },
    {
      label: "Moderate",
      range: "10–14",
      min: 10,
      max: 14,
      color: "yellow",
    },
    {
      label: "Severe",
      range: "15–21",
      min: 15,
      max: 21,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Ask the patient to rate each symptom over the past two weeks using the four frequency options.",
      "A cut-point of 10 optimizes sensitivity (~89%) and specificity (~82%) for generalized anxiety disorder.",
      "Use the GAD-7 together with the PHQ-9, because anxiety and depression frequently co-occur.",
    ],
    warnings: [
      "The GAD-7 screens for generalized anxiety disorder but does not exclude panic disorder, social anxiety, OCD, or other anxiety disorders.",
      "Symptoms due to medical illness, substance use, or medication side effects should be considered.",
    ],
    followUp: [
      "Re-score after 4–8 weeks of treatment to monitor response.",
      "Refer for specialty evaluation when symptoms are severe, atypical, or refractory to first-line treatment.",
    ],
  },

  clinicalNotes:
    "The Generalized Anxiety Disorder-7 (GAD-7) was developed by Spitzer, Kroenke, and colleagues in 2006 as a brief self-report scale for detecting probable generalized anxiety disorder and grading its severity. Each of the seven items is rated 0 (not at all) to 3 (nearly every day) for the past two weeks, for a total of 0–21. A cut-point of 10 yields a sensitivity of 89% and a specificity of 82% for generalized anxiety disorder. Severity bands are 0–4 (minimal), 5–9 (mild), 10–14 (moderate), and 15–21 (severe). Because anxiety and depression often co-exist, the GAD-7 is commonly administered alongside the PHQ-9.",
  evidence: {
    source: "Original validation cohort (Spitzer 2006)",
    reference:
      "Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
      "Kroenke K, Spitzer RL, Williams JB, Monahan PO, Löwe B. Anxiety disorders in primary care: prevalence, impairment, comorbidity, and detection. Ann Intern Med. 2007;146(5):317-325.",
    ],
  },

  faq: [
    {
      question: "What GAD-7 score indicates generalized anxiety disorder?",
      answer:
        "A score of 10 or more is the recommended cut-point, with approximately 89% sensitivity and 82% specificity for generalized anxiety disorder.",
    },
    {
      question: "Can the GAD-7 rule out other anxiety disorders?",
      answer:
        "No. The GAD-7 focuses on generalized anxiety and does not exclude panic disorder, social anxiety disorder, OCD, or specific phobias.",
    },
  ],

  comparison: {
    title: "Mental health screening",
    calculators: [
      {
        name: "Patient Health Questionnaire-9 (PHQ-9)",
        href: "/calculators/phq-9",
        use: "Depression symptom screening and severity",
        bestFor: "Patients with prominent depressive symptoms",
      },
      {
        name: "Edinburgh Postnatal Depression Scale (EPDS)",
        href: "/calculators/epds",
        use: "Perinatal depression screening",
        bestFor: "Pregnant and postpartum patients",
      },
    ],
  },

  references: [
    "Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
    "Kroenke K, Spitzer RL, Williams JB, Monahan PO, Löwe B. Anxiety disorders in primary care: prevalence, impairment, comorbidity, and detection. Ann Intern Med. 2007;146(5):317-325.",
  ],

  relatedCalculators: ["phq-9", "epds"],

  inputs: [
    {
      id: "gad1",
      label: "Feeling nervous, anxious, or on edge",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad2",
      label: "Not being able to stop or control worrying",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad3",
      label: "Worrying too much about different things",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad4",
      label: "Trouble relaxing",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad5",
      label: "Being so restless that it is hard to sit still",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad6",
      label: "Becoming easily annoyed or irritable",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "gad7",
      label: "Feeling afraid, as if something awful might happen",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const items: NumOrErr[] = [];
    for (let i = 0; i < 7; i++) {
      items.push(
        selectOption(values, `gad${i + 1}`, `Item ${i + 1}`, ["0", "1", "2", "3"]),
      );
    }
    for (const item of items) {
      if ("err" in item) return critical(item.err);
    }

    const total = items.reduce((sum, item) => ("err" in item ? sum : sum + item.n), 0);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total <= 4) {
      interpretation =
        `GAD-7 ${total}/21 — MINIMAL anxiety symptoms (0–4). ` +
        "A score of 0–4 indicates minimal anxiety; no treatment is indicated, but re-screen if symptoms persist or worsen.";
      status = "normal";
      referenceRange = "0–4";
    } else if (total <= 9) {
      interpretation =
        `GAD-7 ${total}/21 — MILD anxiety symptoms (5–9). ` +
        "Mild symptoms are unlikely to represent generalized anxiety disorder; consider watchful waiting and re-screening at follow-up.";
      status = "normal";
      referenceRange = "5–9";
    } else if (total <= 14) {
      interpretation =
        `GAD-7 ${total}/21 — MODERATE anxiety symptoms (10–14). ` +
        "A GAD-7 ≥ 10 is the recommended cut-point for generalized anxiety disorder (sensitivity ~89%, specificity ~82%); consider initiating treatment and monitoring response.";
      status = "high";
      referenceRange = "10–14";
    } else {
      interpretation =
        `GAD-7 ${total}/21 — SEVERE anxiety symptoms (15–21). ` +
        "Severe symptoms warrant active treatment and consideration of specialty mental health referral.";
      status = "critical";
      referenceRange = "15–21";
    }

    return {
      value: total,
      unit: "/21",
      interpretation,
      status,
      referenceRange,
      score: total,
      followUp: [
        "Re-score the GAD-7 after 4–8 weeks of treatment to assess response.",
        "Because anxiety and depression co-occur frequently, consider administering the PHQ-9 as well.",
      ],
    };
  },
};
