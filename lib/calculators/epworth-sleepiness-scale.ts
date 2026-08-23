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

const CHANCE_OPTIONS = [
  { label: "0 — Would never doze", value: "0" },
  { label: "1 — Slight chance of dozing", value: "1" },
  { label: "2 — Moderate chance of dozing", value: "2" },
  { label: "3 — High chance of dozing", value: "3" },
];

export const epworthCalculator: CalculatorDefinition = {
  id: "epworth",

  slug: "epworth",

  name: "Epworth Sleepiness Scale",

  shortName: "ESS",

  description:
    "The Epworth Sleepiness Scale (Johns 1991) measures daytime sleepiness by asking how likely the patient is to doze in eight common situations, each scored 0–3 (total 0–24). Higher scores indicate greater sleep propensity: 0–10 normal, 11–14 mild, 15–17 moderate, and ≥ 18 severe excessive daytime sleepiness.",

  category: "Sleep Medicine",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Epworth Sleepiness Scale",
    "ESS",
    "Sleepiness",
    "Daytime somnolence",
    "Sleep apnea",
    "Sleep medicine",
    "Excessive daytime sleepiness",
  ],

  formula:
    "ESS = sum of dozing likelihood for 8 situations (each 0–3) → 0–24. 0–10 normal, 11–14 mild, 15–17 moderate, ≥ 18 severe excessive daytime sleepiness.",

  normalRange:
    "0–10 indicates normal sleepiness. 11–14 mild, 15–17 moderate, and ≥ 18 severe excessive daytime sleepiness; scores ≥ 11 warrant evaluation for sleep disorders such as obstructive sleep apnea.",

  referenceRanges: [
    {
      label: "Normal",
      range: "0–10",
      context: "Normal daytime sleepiness",
    },
    {
      label: "Mild",
      range: "11–14",
      context: "Mild excessive daytime sleepiness",
    },
    {
      label: "Moderate",
      range: "15–17",
      context: "Moderate excessive daytime sleepiness",
    },
    {
      label: "Severe",
      range: "18–24",
      context: "Severe excessive daytime sleepiness",
    },
  ],

  classification: [
    {
      label: "Normal",
      range: "0–10",
      min: 0,
      max: 10,
      color: "green",
    },
    {
      label: "Mild",
      range: "11–14",
      min: 11,
      max: 14,
      color: "yellow",
    },
    {
      label: "Moderate",
      range: "15–17",
      min: 15,
      max: 17,
      color: "orange",
    },
    {
      label: "Severe",
      range: "18–24",
      min: 18,
      max: 24,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Epworth Sleepiness Scale was introduced by Murray Johns in 1991 to measure the general level of daytime sleepiness. Patients rate their chance of dozing in eight situations — sitting and reading; watching television; sitting inactive in a public place; riding as a car passenger for an hour without a break; lying down to rest in the afternoon; sitting and talking to someone; sitting quietly after lunch without alcohol; and sitting in a car while stopped in traffic. Each is scored 0 (would never doze) to 3 (high chance of dozing), giving a total of 0–24. A score of 11–14 indicates mild, 15–17 moderate, and 18–24 severe excessive daytime sleepiness. The ESS is widely used in the assessment of obstructive sleep apnea and other sleep disorders.",




  comparison: {
    title: "Sleep-disordered breathing screening",
    calculators: [
      {
        name: "STOP-BANG OSA Screening Score",
        href: "/calculators/stop-bang",
        use: "OSA risk stratification from history and anthropometrics",
        bestFor: "Rapid screening for obstructive sleep apnea risk",
      },
      {
        name: "BMI",
        href: "/calculators/bmi",
        use: "Body mass index, a key OSA risk factor",
        bestFor: "Assessing obesity-related risk",
      },
    ],
  },

  references: [
    "Johns MW. A new method for measuring daytime sleepiness: the Epworth sleepiness scale. Sleep. 1991;14(6):540-545.",
    "Johns MW. Daytime sleepiness, snoring, and obstructive sleep apnea. The Epworth Sleepiness Scale. Chest. 1993;103(1):30-36.",
  ],

  relatedCalculators: ["stop-bang", "bmi"],

  inputs: [
    {
      id: "ess1",
      label: "Sitting and reading",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess2",
      label: "Watching TV",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess3",
      label: "Sitting inactive in a public place (e.g., a theater or meeting)",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess4",
      label: "As a passenger in a car for an hour without a break",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess5",
      label: "Lying down to rest in the afternoon when circumstances permit",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess6",
      label: "Sitting and talking to someone",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess7",
      label: "Sitting quietly after a lunch without alcohol",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
    {
      id: "ess8",
      label: "In a car, while stopped for a few minutes in traffic",
      type: "select",
      required: true,
      options: CHANCE_OPTIONS,
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const items: NumOrErr[] = [];
    for (let i = 0; i < 8; i++) {
      items.push(
        selectOption(values, `ess${i + 1}`, `Situation ${i + 1}`, ["0", "1", "2", "3"]),
      );
    }
    for (const item of items) {
      if ("err" in item) return critical(item.err);
    }

    const total = items.reduce((sum, item) => ("err" in item ? sum : sum + item.n), 0);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total <= 10) {
      interpretation =
        `ESS ${total}/24 — NORMAL daytime sleepiness (0–10). ` +
        "Daytime sleep propensity is within the normal range; continue to review sleep complaints if they persist despite a normal score.";
      status = "normal";
      referenceRange = "0–10";
    } else if (total <= 14) {
      interpretation =
        `ESS ${total}/24 — MILD excessive daytime sleepiness (11–14). ` +
        "Elevated sleep propensity suggests the need for sleep disorder evaluation, particularly obstructive sleep apnea.";
      status = "high";
      referenceRange = "11–14";
    } else if (total <= 17) {
      interpretation =
        `ESS ${total}/24 — MODERATE excessive daytime sleepiness (15–17). ` +
        "Moderate sleep propensity warrants sleep medicine evaluation and testing for sleep-disordered breathing.";
      status = "high";
      referenceRange = "15–17";
    } else {
      interpretation =
        `ESS ${total}/24 — SEVERE excessive daytime sleepiness (18–24). ` +
        "Severe daytime sleepiness raises significant safety concerns; urgent sleep medicine evaluation and consideration of OSA testing are indicated.";
      status = "critical";
      referenceRange = "18–24";
    }

    return {
      value: total,
      unit: "/24",
      interpretation,
      status,
      referenceRange,
      score: total,
      warnings: [
        "Counsel about driving safety — falling asleep while driving is dangerous at any ESS score.",
      ],
    };
  },
};
