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

export const modifiedRankinScaleCalculator: CalculatorDefinition = {
  id: "modified-rankin-scale",

  slug: "modified-rankin-scale",

  name: "Modified Rankin Scale",

  shortName: "mRS",

  description:
    "The modified Rankin Scale (mRS) measures the degree of functional disability after a stroke or other neurologic event using six levels from 0 (no symptoms) to 5 (severe disability), plus 6 for death. It is the standard outcome measure in stroke trials.",

  category: "Neurology",

  specialty: "Neurology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Modified Rankin Scale",
    "mRS",
    "Rankin",
    "Stroke",
    "Disability",
    "Functional outcome",
    "Neurology",
    "Outcome measure",
    "Rehabilitation",
  ],

  formula:
    "mRS = 0 (no symptoms) to 5 (severe disability, bedridden), with 6 = death. No calculation required; the level is assigned from the clinical assessment.",

  normalRange:
    "0–2 is generally considered a good/favorable outcome (functional independence). 3–5 = increasing disability; 6 = death.",

  referenceRanges: [
    {
      label: "Favorable outcome",
      range: "0–2",
      context: "Functional independence (mRS 0–2)",
    },
    {
      label: "Moderate disability",
      range: "3",
      context: "Needs some help but walks unassisted",
    },
    {
      label: "Moderately severe disability",
      range: "4",
      context: "Unable to walk or attend to bodily needs without assistance",
    },
    {
      label: "Severe disability",
      range: "5",
      context: "Bedridden, incontinent, constant nursing care",
    },
    {
      label: "Dead",
      range: "6",
      context: "Death",
    },
  ],

  classification: [
    {
      label: "No symptoms",
      range: "0",
      min: 0,
      max: 0,
      color: "green",
    },
    {
      label: "No significant disability",
      range: "1",
      min: 1,
      max: 1,
      color: "green",
    },
    {
      label: "Slight disability",
      range: "2",
      min: 2,
      max: 2,
      color: "green",
    },
    {
      label: "Moderate disability",
      range: "3",
      min: 3,
      max: 3,
      color: "yellow",
    },
    {
      label: "Moderately severe disability",
      range: "4",
      min: 4,
      max: 4,
      color: "orange",
    },
    {
      label: "Severe disability",
      range: "5",
      min: 5,
      max: 5,
      color: "red",
    },
    {
      label: "Dead",
      range: "6",
      min: 6,
      max: 6,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Rankin scale was originally described by John Rankin in 1957 and modified by Warlow and colleagues during the UK-TIA trial in the 1980s; its reproducibility was first examined by van Swieten and colleagues (Stroke 1988), who reported a weighted kappa of 0.91. The modified scale runs from 0 (no symptoms) to 5 (severe disability requiring constant care) with 6 added for death. Scores of 0–2 are conventionally classified as a favorable outcome in acute stroke trials.",




  comparison: {
    title: "Stroke outcome and severity measures",
    calculators: [
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Quantifying acute neurologic impairment",
        bestFor: "Acute severity and treatment decisions",
      },
      {
        name: "Hunt and Hess Scale",
        href: "/calculators/hunt-hess-scale",
        use: "Grading clinical severity of subarachnoid hemorrhage",
        bestFor: "Prognosis after aneurysmal SAH",
      },
    ],
  },

  references: [
    "van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.",
    "Rankin J. Cerebrovascular accidents in patients over the age of 60. II. Prognosis. Scott Med J. 1957;2(5):200-215.",
  ],

  relatedCalculators: [
    "nihss",
    "hunt-hess-scale",
    "esrs",
    "abcd2-score",
  ],

  inputs: [
    {
      id: "score",
      label: "Functional Disability Level",
      type: "select",
      required: true,
      options: [
        { label: "0 — No symptoms", value: "0" },
        {
          label: "1 — No significant disability; able to carry out all usual activities despite some symptoms",
          value: "1",
        },
        {
          label: "2 — Slight disability; able to look after own affairs without assistance but unable to carry out all previous activities",
          value: "2",
        },
        {
          label: "3 — Moderate disability; requires some help but able to walk unassisted",
          value: "3",
        },
        {
          label: "4 — Moderately severe disability; unable to walk unassisted and unable to attend to own bodily needs without assistance",
          value: "4",
        },
        {
          label: "5 — Severe disability; bedridden, incontinent, requiring constant nursing care and attention",
          value: "5",
        },
        { label: "6 — Dead", value: "6" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const score = selectOption(values, "score", "Functional disability level", ["0", "1", "2", "3", "4", "5", "6"]);
    if ("err" in score) return critical(score.err);

    const mrs = score.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (mrs === 0) {
      interpretation =
        "mRS 0 — No symptoms. Fully independent with no residual disability.";
      status = "normal";
      referenceRange = "0";
    } else if (mrs === 1) {
      interpretation =
        "mRS 1 — No significant disability. Able to carry out all usual activities despite some symptoms. Favorable outcome.";
      status = "normal";
      referenceRange = "1";
    } else if (mrs === 2) {
      interpretation =
        "mRS 2 — Slight disability. Able to look after own affairs without assistance but unable to carry out all previous activities. Favorable outcome.";
      status = "normal";
      referenceRange = "2";
    } else if (mrs === 3) {
      interpretation =
        "mRS 3 — Moderate disability. Requires some help but able to walk unassisted. Unfavorable outcome; needs ongoing rehabilitation support.";
      status = "high";
      referenceRange = "3";
    } else if (mrs === 4) {
      interpretation =
        "mRS 4 — Moderately severe disability. Unable to walk unassisted and unable to attend to own bodily needs without assistance.";
      status = "high";
      referenceRange = "4";
    } else if (mrs === 5) {
      interpretation =
        "mRS 5 — Severe disability. Bedridden, incontinent, requiring constant nursing care and attention.";
      status = "critical";
      referenceRange = "5";
    } else {
      interpretation =
        "mRS 6 — Dead. This level indicates death of the patient.";
      status = "critical";
      referenceRange = "6";
    }

    return {
      value: mrs,
      unit: " (0–6)",
      interpretation,
      status,
      referenceRange,
      score: mrs,
    };
  },
};
