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

export const phq9Calculator: CalculatorDefinition = {
  id: "phq-9",

  slug: "phq-9",

  name: "Patient Health Questionnaire-9 (PHQ-9)",

  shortName: "PHQ-9",

  description:
    "The PHQ-9 (Kroenke 2001) screens for and grades the severity of depressive symptoms over the prior two weeks. Nine DSM-based items are each scored 0–3 (total 0–27), with cut-points for minimal, mild, moderate, moderately severe, and severe depression; a score ≥ 10 has ~88% sensitivity and ~88% specificity for major depression. Item 9 screens for suicidal ideation and warrants urgent evaluation when endorsed.",

  category: "Mental Health",

  specialty: "General Medicine",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "PHQ-9",
    "Depression",
    "Depression screening",
    "Major depressive disorder",
    "Patient health questionnaire",
    "Mental health",
    "PHQ",
    "Suicidality",
  ],

  formula:
    "PHQ-9 total = sum of 9 item scores (each 0–3, over the past 2 weeks) → 0–27. 0–4 minimal, 5–9 mild, 10–14 moderate, 15–19 moderately severe, 20–27 severe.",

  normalRange:
    "0–9 (no/minimal to mild symptoms). A total ≥ 10 is the recommended threshold for major depressive disorder and warrants treatment and follow-up.",

  referenceRanges: [
    {
      label: "None/Minimal",
      range: "0–4",
      context: "Minimal depressive symptoms",
    },
    {
      label: "Mild",
      range: "5–9",
      context: "Mild symptoms; consider watchful waiting with follow-up",
    },
    {
      label: "Moderate",
      range: "10–14",
      context: "Moderate depression; initiate or adjust treatment",
    },
    {
      label: "Moderately severe",
      range: "15–19",
      context: "Moderately severe depression; active treatment",
    },
    {
      label: "Severe",
      range: "20–27",
      context: "Severe depression; intensive treatment and urgent review",
    },
  ],

  classification: [
    {
      label: "None/Minimal",
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
      label: "Moderately severe",
      range: "15–19",
      min: 15,
      max: 19,
      color: "orange",
    },
    {
      label: "Severe",
      range: "20–27",
      min: 20,
      max: 27,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Patient Health Questionnaire-9 is the 9-item depression module of the PRIME-MD diagnostic instrument. Each item corresponds to one of the nine DSM-5 criteria for major depressive disorder and is scored 0 (not at all) to 3 (nearly every day) for the previous two weeks, giving a total of 0–27. A cut-point of 10 maximizes combined sensitivity (~88%) and specificity (~88%) for major depressive disorder. Severity bands are 0–4 (minimal), 5–9 (mild), 10–14 (moderate), 15–19 (moderately severe), and 20–27 (severe). Item 9 explicitly probes suicidal ideation and, when endorsed, requires urgent evaluation regardless of the total score.",




  comparison: {
    title: "Mental health screening",
    calculators: [
      {
        name: "Generalized Anxiety Disorder 7-Item Scale (GAD-7)",
        href: "/calculators/gad-7",
        use: "Anxiety symptom screening and severity",
        bestFor: "Patients with prominent anxiety symptoms",
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
    "Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.",
    "Spitzer RL, Kroenke K, Williams JB. Validation and utility of a self-report version of PRIME-MD: the PHQ primary care study. JAMA. 1999;282(18):1737-1744.",
  ],

  relatedCalculators: ["gad-7", "epds"],

  inputs: [
    {
      id: "phq1",
      label: "Little interest or pleasure in doing things",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq2",
      label: "Feeling down, depressed, or hopeless",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq3",
      label: "Trouble falling or staying asleep, or sleeping too much",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq4",
      label: "Feeling tired or having little energy",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq5",
      label: "Poor appetite or overeating",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq6",
      label: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq7",
      label: "Trouble concentrating on things, such as reading the newspaper or watching television",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq8",
      label: "Moving or speaking so slowly that other people could have noticed; or the opposite — being so fidgety or restless that you have been moving around more than usual",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "phq9",
      label: "Thoughts that you would be better off dead, or of hurting yourself in some way",
      type: "select",
      required: true,
      options: FREQ_OPTIONS,
      defaultValue: "0",
      helpText: "Any endorsement (1 or higher) warrants an immediate suicide risk assessment.",
    },
  ],

  calculate(values: Record<string, string>) {
    const items: NumOrErr[] = [];
    const labels = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
      "Item 9",
    ];
    for (let i = 0; i < 9; i++) {
      items.push(
        selectOption(values, `phq${i + 1}`, labels[i], ["0", "1", "2", "3"]),
      );
    }
    for (const item of items) {
      if ("err" in item) return critical(item.err);
    }

    const total = items.reduce((sum, item) => ("err" in item ? sum : sum + item.n), 0);
    const item9 = ("err" in items[8] ? 0 : items[8].n);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total <= 4) {
      interpretation =
        `PHQ-9 ${total}/27 — MINIMAL depressive symptoms (0–4). ` +
        "A total below 5 suggests no or minimal depressive symptoms; no treatment is indicated, but re-screen if symptoms persist or worsen.";
      status = "normal";
      referenceRange = "0–4";
    } else if (total <= 9) {
      interpretation =
        `PHQ-9 ${total}/27 — MILD depressive symptoms (5–9). ` +
        "Mild symptoms are unlikely to represent major depression; consider watchful waiting, supportive counseling, and re-screening at follow-up.";
      status = "normal";
      referenceRange = "5–9";
    } else if (total <= 14) {
      interpretation =
        `PHQ-9 ${total}/27 — MODERATE depressive symptoms (10–14). ` +
        "A PHQ-9 ≥ 10 has ~88% sensitivity and ~88% specificity for major depression; initiate or adjust treatment and schedule follow-up to assess response.";
      status = "high";
      referenceRange = "10–14";
    } else if (total <= 19) {
      interpretation =
        `PHQ-9 ${total}/27 — MODERATELY SEVERE depressive symptoms (15–19). ` +
        "Active treatment is warranted; consider combination therapy and involvement of specialty mental health services.";
      status = "critical";
      referenceRange = "15–19";
    } else {
      interpretation =
        `PHQ-9 ${total}/27 — SEVERE depressive symptoms (20–27). ` +
        "Intensive treatment is indicated; arrange urgent follow-up and consider specialty mental health referral.";
      status = "critical";
      referenceRange = "20–27";
    }

    const warnings: string[] = [];
    if (item9 >= 1) {
      warnings.push(
        "Item 9 (thoughts of being better off dead or of self-harm) was endorsed. Perform an immediate suicide risk assessment and arrange urgent management per local protocol.",
      );
    }

    return {
      value: total,
      unit: "/27",
      interpretation,
      status,
      referenceRange,
      score: total,
      warnings,
      followUp: [
        "Re-score the PHQ-9 after 4–8 weeks of treatment; a reduction of at least 5 points indicates meaningful improvement.",
        "Escalate persistent scores ≥ 15 or any self-harm ideation to specialty mental health care.",
      ],
    };
  },
};
