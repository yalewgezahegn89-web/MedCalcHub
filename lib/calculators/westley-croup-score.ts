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

export const westleyCroupScoreCalculator: CalculatorDefinition = {
  id: "westley-croup-score",

  slug: "westley-croup-score",

  name: "Westley Croup Score",

  shortName: "Westley Croup",

  description:
    "Scores croup severity using the five-component Westley scale (1978): level of consciousness, cyanosis, stridor, air entry, and retractions, summed from 0–17. Higher scores indicate more severe upper-airway obstruction and impending respiratory failure.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Westley Croup Score",
    "Croup",
    "Viral Croup",
    "Laryngotracheobronchitis",
    "Stridor",
    "Respiratory Distress",
    "Child",
    "Pediatrics",
    "Upper Airway Obstruction",
  ],

  formula:
    "Westley = Consciousness (0/5) + Cyanosis (0/4/5) + Stridor (0/1/2) + Air Entry (0/1/2) + Retractions (0/1/2/3) → total 0–17",

  normalRange:
    "0–17; ≤ 2 mild, 3–7 moderate, ≥ 8 severe. Severe croup indicates impending respiratory failure and requires urgent airway management.",

  referenceRanges: [
    {
      label: "Mild",
      range: "0–2",
      context: "Outpatient management typically safe",
    },
    {
      label: "Moderate",
      range: "3–7",
      context: "Consider dexamethasone ± nebulized epinephrine",
    },
    {
      label: "Severe",
      range: "8–17",
      context: "Impending respiratory failure; urgent/ICU management",
    },
  ],

  classification: [
    {
      label: "Mild",
      range: "0–2",
      min: 0,
      max: 2,
      color: "green",
    },
    {
      label: "Moderate",
      range: "3–7",
      min: 3,
      max: 7,
      color: "yellow",
    },
    {
      label: "Severe",
      range: "8–17",
      min: 8,
      max: 17,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Score each component based on the worst finding observed while the child is calm and, for stridor/cyanosis, when agitated.",
      "Administer dexamethasone to essentially all children with croup; add nebulized epinephrine for moderate-to-severe or worsening stridor at rest.",
      "A score of 8 or higher, or any component with the maximal value, signals impending airway compromise — involve senior clinicians and ICU early.",
    ],
    warnings: [
      "Do not allow the child to become distressed during assessment; agitation worsens stridor and airway edema.",
      "Suspected bacterial tracheitis, foreign body, epiglottitis, or angioedema must be excluded — these mimic croup and progress differently.",
      "A child who is drowsy or cyanotic at rest has critical obstruction regardless of the total score.",
    ],
    followUp: [
      "Observe for 3–4 hours after nebulized epinephrine for rebound stridor.",
      "Admit children with persistent stridor at rest, hypoxemia, or scores in the moderate-to-severe range.",
    ],
  },

  clinicalNotes:
    "The Westley croup score (1978) quantifies severity of viral laryngotracheobronchitis (croup) using level of consciousness, cyanosis, stridor, air entry, and chest-wall retractions. Mild croup (score ≤ 2) is typically managed as an outpatient with a single dose of dexamethasone; moderate croup (3–7) adds nebulized epinephrine when stridor is present at rest; severe croup (≥ 8) implies impending respiratory failure with marked retractions, cyanosis, or depressed consciousness and requires urgent airway management and ICU support. The score is a research and bedside severity tool, not a substitute for continuous clinical reassessment.",
  evidence: {
    source: "Original derivation study",
    reference:
      "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
      "Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-339.",
    ],
  },

  faq: [
    {
      question: "When is nebulized epinephrine indicated?",
      answer:
        "Nebulized epinephrine is indicated for stridor at rest (moderate-to-severe croup). A single dose of dexamethasone should be given to essentially all children with croup.",
    },
    {
      question: "How high does the score need to be before admission?",
      answer:
        "Persistent stridor at rest, hypoxemia, or a score in the moderate-to-severe range (3 or higher with concerning features, ≥ 8 for severe) generally warrant admission for observation and treatment.",
    },
  ],

  comparison: {
    title: "Pediatric respiratory severity tools",
    calculators: [
      {
        name: "Pediatric Early Warning Score (PEWS)",
        href: "/calculators/peds-pews",
        use: "General deterioration in ward patients",
        bestFor: "Detecting decompensation across respiratory, cardiovascular, and behavioral domains",
      },
      {
        name: "Westley Croup Score",
        href: "/calculators/westley-croup-score",
        use: "Croup-specific severity",
        bestFor: "Targeting croup management decisions",
      },
    ],
  },

  references: [
    "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
    "Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-339.",
  ],

  relatedCalculators: ["peds-pews", "pf-ratio", "rox-index"],

  inputs: [
    {
      id: "consciousness",
      label: "Level of Consciousness",
      type: "select",
      required: true,
      options: [
        { label: "0 – Normal (including when asleep)", value: "0" },
        { label: "5 – Disoriented", value: "5" },
      ],
      defaultValue: "0",
    },
    {
      id: "cyanosis",
      label: "Cyanosis",
      type: "select",
      required: true,
      options: [
        { label: "0 – None", value: "0" },
        { label: "4 – Cyanosis when agitated", value: "4" },
        { label: "5 – Cyanosis at rest", value: "5" },
      ],
      defaultValue: "0",
    },
    {
      id: "stridor",
      label: "Stridor",
      type: "select",
      required: true,
      options: [
        { label: "0 – None", value: "0" },
        { label: "1 – Stridor when agitated", value: "1" },
        { label: "2 – Stridor at rest", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "airEntry",
      label: "Air Entry",
      type: "select",
      required: true,
      options: [
        { label: "0 – Normal", value: "0" },
        { label: "1 – Decreased", value: "1" },
        { label: "2 – Markedly decreased", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "retractions",
      label: "Chest-Wall Retractions",
      type: "select",
      required: true,
      options: [
        { label: "0 – None", value: "0" },
        { label: "1 – Mild (intercostal)", value: "1" },
        { label: "2 – Moderate (subcostal)", value: "2" },
        { label: "3 – Severe (with tracheal tug / nasal flaring)", value: "3" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const consciousness = selectOption(values, "consciousness", "Level of consciousness", ["0", "5"]);
    if ("err" in consciousness) return critical(consciousness.err);
    const cyanosis = selectOption(values, "cyanosis", "Cyanosis", ["0", "4", "5"]);
    if ("err" in cyanosis) return critical(cyanosis.err);
    const stridor = selectOption(values, "stridor", "Stridor", ["0", "1", "2"]);
    if ("err" in stridor) return critical(stridor.err);
    const airEntry = selectOption(values, "airEntry", "Air entry", ["0", "1", "2"]);
    if ("err" in airEntry) return critical(airEntry.err);
    const retractions = selectOption(values, "retractions", "Retractions", ["0", "1", "2", "3"]);
    if ("err" in retractions) return critical(retractions.err);

    const score =
      consciousness.n + cyanosis.n + stridor.n + airEntry.n + retractions.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score <= 2) {
      interpretation =
        `Westley croup score ${score}/17 — MILD croup. ` +
        "Typically safe to manage as an outpatient with a single dose of dexamethasone; educate the family on red-flag symptoms.";
      status = "normal";
      referenceRange = "0–2";
    } else if (score <= 7) {
      interpretation =
        `Westley croup score ${score}/17 — MODERATE croup. ` +
        "Give dexamethasone; add nebulized epinephrine for stridor at rest and observe for rebound. Admission may be warranted for persistent symptoms.";
      status = "high";
      referenceRange = "3–7";
    } else {
      interpretation =
        `Westley croup score ${score}/17 — SEVERE croup. ` +
        "Impending respiratory failure — involve senior clinicians and intensive care immediately; prepare for airway management and nebulized epinephrine.";
      status = "critical";
      referenceRange = "8–17";
    }

    return {
      value: score,
      unit: "/17",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
