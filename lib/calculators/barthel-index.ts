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

export const barthelIndexCalculator: CalculatorDefinition = {
  id: "barthel",

  slug: "barthel",

  name: "Barthel Index",

  shortName: "Barthel Index",

  description:
    "The Barthel Index (Mahoney & Barthel 1965) measures functional independence in activities of daily living across ten domains (feeding, bathing, grooming, dressing, bowels, bladder, toilet use, transfers, mobility, stairs), yielding a total of 0–100. Higher scores reflect greater independence: 0–20 total dependence, 21–60 severe, 61–90 moderate, 91–99 slight dependence, and 100 independence. It is widely used in stroke, rehabilitation, and geriatric care, including the Shah 1989 modification for ordinal scoring.",

  category: "Geriatrics",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Barthel Index",
    "Activities of daily living",
    "ADL",
    "Functional assessment",
    "Rehabilitation",
    "Geriatrics",
    "Stroke",
    "Disability",
  ],

  formula:
    "Barthel total = Feeding (0/5/10) + Bathing (0/5) + Grooming (0/5) + Dressing (0/5/10) + Bowels (0/5/10) + Bladder (0/5/10) + Toilet use (0/5/10) + Transfers (0/5/10/15) + Mobility (0/5/10/15) + Stairs (0/5/10) → 0–100.",

  normalRange:
    "100 = independent. 91–99 slight dependence, 61–90 moderate dependence, 21–60 severe dependence, 0–20 total dependence.",

  referenceRanges: [
    {
      label: "Independent",
      range: "100",
      context: "Fully independent in ADLs",
    },
    {
      label: "Slight dependence",
      range: "91–99",
      context: "Minimal assistance needed",
    },
    {
      label: "Moderate dependence",
      range: "61–90",
      context: "Moderate assistance needed",
    },
    {
      label: "Severe dependence",
      range: "21–60",
      context: "Major assistance needed",
    },
    {
      label: "Total dependence",
      range: "0–20",
      context: "Completely dependent in ADLs",
    },
  ],

  classification: [
    {
      label: "Independent",
      range: "100",
      min: 100,
      max: 100,
      color: "green",
    },
    {
      label: "Slight dependence",
      range: "91–99",
      min: 91,
      max: 99,
      color: "green",
    },
    {
      label: "Moderate dependence",
      range: "61–90",
      min: 61,
      max: 90,
      color: "yellow",
    },
    {
      label: "Severe dependence",
      range: "21–60",
      min: 21,
      max: 60,
      color: "orange",
    },
    {
      label: "Total dependence",
      range: "0–20",
      min: 0,
      max: 20,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Score the patient's actual current performance over the preceding 24–48 hours, not what they could do in ideal circumstances.",
      "Where a task requires supervision for safety, award the lower (dependent) score.",
      "Use the score at admission and at intervals to track functional recovery, especially after stroke and in rehabilitation.",
    ],
    warnings: [
      "The Barthel Index focuses on physical disability in ADLs and does not measure cognitive impairment, communication, or caregiver burden.",
      "A ceiling effect limits sensitivity in highly independent patients — consider the Modified Barthel or other instruments in that population.",
      "Variants with different item weights (e.g., original 0–100 vs. Shah ordinal) are not directly interchangeable.",
    ],
    followUp: [
      "Re-assess the Barthel Index at fixed intervals (e.g., admission, discharge, and follow-up) to document change.",
      "Combine with a cognitive screen (e.g., MMSE/MoCA) for a fuller functional picture.",
    ],
  },

  clinicalNotes:
    "The Barthel Index was originally described by Mahoney and Barthel in 1965 as a simple ordinal scale of independence in activities of daily living. Ten domains are scored: feeding (0/5/10), bathing (0/5), grooming (0/5), dressing (0/5/10), bowels (0/5/10), bladder (0/5/10), toilet use (0/5/10), transfers (0/5/10/15), mobility (0/5/10/15), and stairs (0/5/10), for a total of 0–100. Shah and colleagues (1989) introduced a five-level modification of the item scoring to improve sensitivity. The scale is widely used to quantify disability after stroke, in rehabilitation, and in geriatric medicine; the bands of total (0–20), severe (21–60), moderate (61–90), slight (91–99), and independent (100) dependence aid interpretation.",
  evidence: {
    source: "Original scale (Mahoney & Barthel 1965) with Shah 1989 modification",
    reference:
      "Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-65.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-65.",
      "Shah S, Vanclay F, Cooper B. Improving the sensitivity of the Barthel Index for stroke rehabilitation. J Clin Epidemiol. 1989;42(8):703-709.",
      "Collin C, Wade DT, Davies S, Horne V. The Barthel ADL Index: a reliability study. Int Disabil Stud. 1988;10(2):61-63.",
    ],
  },

  faq: [
    {
      question: "What does a Barthel Index of 100 mean?",
      answer:
        "A score of 100 indicates full independence in all ten activities of daily living measured by the scale, though the index does not assess cognition or complex instrumental activities.",
    },
    {
      question: "What is the difference between the original and modified Barthel Index?",
      answer:
        "The Shah 1989 modification expands the item scoring to five levels per item to improve sensitivity in detecting change, while retaining the same 0–100 total.",
    },
  ],

  references: [
    "Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-65.",
    "Shah S, Vanclay F, Cooper B. Improving the sensitivity of the Barthel Index for stroke rehabilitation. J Clin Epidemiol. 1989;42(8):703-709.",
  ],

  relatedCalculators: [],

  inputs: [
    {
      id: "feeding",
      label: "Feeding",
      type: "select",
      required: true,
      options: [
        { label: "0 — Unable; needs help with feeding", value: "0" },
        { label: "5 — Needs help cutting, spreading butter, or preparing food", value: "5" },
        { label: "10 — Independent (food within reach)", value: "10" },
      ],
      defaultValue: "0",
    },
    {
      id: "bathing",
      label: "Bathing",
      type: "select",
      required: true,
      options: [
        { label: "0 — Dependent (needs help)", value: "0" },
        { label: "5 — Independent (bath or shower)", value: "5" },
      ],
      defaultValue: "0",
    },
    {
      id: "grooming",
      label: "Grooming",
      type: "select",
      required: true,
      options: [
        { label: "0 — Needs help with personal care (face, hair, teeth, shaving)", value: "0" },
        { label: "5 — Independent (face, hair, teeth, shaving)", value: "5" },
      ],
      defaultValue: "0",
    },
    {
      id: "dressing",
      label: "Dressing",
      type: "select",
      required: true,
      options: [
        { label: "0 — Dependent", value: "0" },
        { label: "5 — Needs help, but can do about half unaided", value: "5" },
        { label: "10 — Independent (buttons, zips, laces)", value: "10" },
      ],
      defaultValue: "0",
    },
    {
      id: "bowels",
      label: "Bowels",
      type: "select",
      required: true,
      options: [
        { label: "0 — Incontinent (or needs enemas/suppositories)", value: "0" },
        { label: "5 — Occasional accident (once a week or less)", value: "5" },
        { label: "10 — Continent", value: "10" },
      ],
      defaultValue: "0",
    },
    {
      id: "bladder",
      label: "Bladder",
      type: "select",
      required: true,
      options: [
        { label: "0 — Incontinent (or catheterized and unable to manage)", value: "0" },
        { label: "5 — Occasional accident (max once per 24 hours)", value: "5" },
        { label: "10 — Continent", value: "10" },
      ],
      defaultValue: "0",
    },
    {
      id: "toiletUse",
      label: "Toilet use",
      type: "select",
      required: true,
      options: [
        { label: "0 — Dependent", value: "0" },
        { label: "5 — Needs some help, but can do something alone", value: "5" },
        { label: "10 — Independent (on and off, wiping, dressing)", value: "10" },
      ],
      defaultValue: "0",
    },
    {
      id: "transfers",
      label: "Transfers (bed to chair and back)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Unable; no sitting balance", value: "0" },
        { label: "5 — Major help (physical, one or two people); can sit", value: "5" },
        { label: "10 — Minor help (verbal or physical)", value: "10" },
        { label: "15 — Independent", value: "15" },
      ],
      defaultValue: "0",
    },
    {
      id: "mobility",
      label: "Mobility (walking or wheelchair)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Immobile", value: "0" },
        { label: "5 — Wheelchair independent, including corners", value: "5" },
        { label: "10 — Walks with help of one person (verbal or physical)", value: "10" },
        { label: "15 — Independent (may use any aid, e.g., a stick)", value: "15" },
      ],
      defaultValue: "0",
    },
    {
      id: "stairs",
      label: "Stairs",
      type: "select",
      required: true,
      options: [
        { label: "0 — Unable", value: "0" },
        { label: "5 — Needs help (verbal, physical, carrying aid)", value: "5" },
        { label: "10 — Independent", value: "10" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const items = [
      selectOption(values, "feeding", "Feeding", ["0", "5", "10"]),
      selectOption(values, "bathing", "Bathing", ["0", "5"]),
      selectOption(values, "grooming", "Grooming", ["0", "5"]),
      selectOption(values, "dressing", "Dressing", ["0", "5", "10"]),
      selectOption(values, "bowels", "Bowels", ["0", "5", "10"]),
      selectOption(values, "bladder", "Bladder", ["0", "5", "10"]),
      selectOption(values, "toiletUse", "Toilet use", ["0", "5", "10"]),
      selectOption(values, "transfers", "Transfers", ["0", "5", "10", "15"]),
      selectOption(values, "mobility", "Mobility", ["0", "5", "10", "15"]),
      selectOption(values, "stairs", "Stairs", ["0", "5", "10"]),
    ];
    for (const item of items) {
      if ("err" in item) return critical(item.err);
    }

    const total = items.reduce((sum, item) => ("err" in item ? sum : sum + item.n), 0);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total === 100) {
      interpretation =
        `Barthel Index ${total}/100 — INDEPENDENT. ` +
        "The patient is fully independent in all measured activities of daily living.";
      status = "normal";
      referenceRange = "100";
    } else if (total >= 91) {
      interpretation =
        `Barthel Index ${total}/100 — SLIGHT dependence. ` +
        "Minimal assistance is required; the patient manages most activities independently.";
      status = "normal";
      referenceRange = "91–99";
    } else if (total >= 61) {
      interpretation =
        `Barthel Index ${total}/100 — MODERATE dependence. ` +
        "Moderate assistance with activities of daily living is required; plan rehabilitation and support services accordingly.";
      status = "high";
      referenceRange = "61–90";
    } else if (total >= 21) {
      interpretation =
        `Barthel Index ${total}/100 — SEVERE dependence. ` +
        "Major assistance with daily activities is required; substantial caregiving support and rehabilitation input are needed.";
      status = "critical";
      referenceRange = "21–60";
    } else {
      interpretation =
        `Barthel Index ${total}/100 — TOTAL dependence. ` +
        "The patient is completely dependent in activities of daily living; full nursing and caregiver support are required.";
      status = "critical";
      referenceRange = "0–20";
    }

    return {
      value: total,
      unit: "/100",
      interpretation,
      status,
      referenceRange,
      score: total,
      followUp: [
        "Re-assess at fixed intervals (e.g., admission, discharge, and follow-up) to document functional change.",
        "Combine with a cognitive screen and instrumental ADL assessment for a complete functional picture.",
      ],
    };
  },
};
