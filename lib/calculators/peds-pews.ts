import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };
type StrOrErr = { s: string } | { err: string };

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

function stringSelect(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): StrOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { s: v };
}

export const pedsPewsCalculator: CalculatorDefinition = {
  id: "peds-pews",

  slug: "peds-pews",

  name: "Pediatric Early Warning Score (Brighton PEWS)",

  shortName: "PEWS",

  description:
    "Scores clinical deterioration risk on pediatric wards using the Brighton Pediatric Early Warning Score (Monaghan 2005): Behavior, Cardiovascular, and Respiratory domains (each 0–3) plus 1 additional point for persistent parent or staff concern, for a total of 0–10. Higher scores trigger escalating observation and urgent review.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Pediatric Early Warning Score",
    "PEWS",
    "Brighton PEWS",
    "Early Warning",
    "Deterioration",
    "Rapid Response",
    "Septic Shock",
    "Child",
    "Pediatrics",
    "Ward Monitoring",
  ],

  formula:
    "PEWS = Behavior (0–3) + Cardiovascular (0–3) + Respiratory (0–3) + Concern (0–1) → total 0–10. Score 0–2 low risk; 3–4 intermediate (increase observations, inform senior staff); ≥ 5 high risk (urgent medical review).",

  normalRange:
    "0–2 = low risk, routine monitoring; 3–4 = intermediate, increase observation frequency and inform senior staff; ≥ 5 = high risk, urgent medical review and consideration of transfer to a higher level of care.",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–2",
      context: "Routine monitoring",
    },
    {
      label: "Intermediate",
      range: "3–4",
      context: "Increase observation frequency; inform senior staff",
    },
    {
      label: "High risk",
      range: "5–10",
      context: "Urgent medical review; consider HDU/PICU",
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
      label: "Intermediate",
      range: "3–4",
      min: 3,
      max: 4,
      color: "yellow",
    },
    {
      label: "High risk",
      range: "5–10",
      min: 5,
      max: 10,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Brighton Pediatric Early Warning Score (Monaghan 2005) combines three domains — behavior, cardiovascular status, and respiratory status — each scored 0–3, with an additional point for persistent concern by the parent or a staff member. It is used on pediatric wards to detect early deterioration so that care can be escalated before critical decompensation. A total of 3–4 prompts increased observation and senior staff review, while a total ≥ 5 (or a score of 3 in any single domain) prompts urgent medical review and consideration of transfer to a higher level of care. PEWS systems have been associated with improved identification of deteriorating children, though specific escalation protocols vary between institutions.",




  comparison: {
    title: "Pediatric deterioration detection",
    calculators: [
      {
        name: "Westley Croup Score",
        href: "/calculators/westley-croup-score",
        use: "Croup-specific severity scoring",
        bestFor: "Upper-airway obstruction severity",
      },
      {
        name: "SIRS Criteria",
        href: "/calculators/sirs-criteria",
        use: "Systemic inflammation screening",
        bestFor: "Sepsis screening using vital signs and WBC",
      },
      {
        name: "Pediatric Hypotension (PALS) Threshold",
        href: "/calculators/pediatric-hypotension",
        use: "Age-based blood pressure threshold",
        bestFor: "Recognizing hypotensive shock",
      },
    ],
  },

  references: [
    "Monaghan A. Detecting and managing deterioration in children. Paediatr Nurs. 2005;17(1):32-35.",
    "Lambert V, Matthews A, MacDonell R, Fitzsimons J. Paediatric early warning systems for detecting and responding to clinical deterioration in children: a systematic review. BMJ Open. 2017;7(3):e014497.",
  ],

  relatedCalculators: [
    "westley-croup-score",
    "sirs-criteria",
    "pediatric-hypotension",
    "rochester-criteria",
  ],

  inputs: [
    {
      id: "behavior",
      label: "Behavior",
      type: "select",
      required: true,
      options: [
        { label: "0 – Playing / appropriate", value: "0" },
        { label: "1 – Sleeping or interacting appropriately / reduced activity", value: "1" },
        { label: "2 – Irritable / not comforted", value: "2" },
        { label: "3 – Lethargic, confused, or reduced response to pain", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "cardiovascular",
      label: "Cardiovascular",
      type: "select",
      required: true,
      options: [
        { label: "0 – Pink/flushed; capillary refill < 1 s; tachycardia ≤ 10 above normal", value: "0" },
        { label: "1 – Pale/dusky; refill 1–2 s; tachycardia 10–20 above normal", value: "1" },
        { label: "2 – Pale/dusky/ashen; refill 3 s or > 2 s with low BP; tachycardia 20–30 above normal or bradycardic", value: "2" },
        { label: "3 – Grey/ashen/mottled; refill ≥ 4 s or > 3 s with low BP; tachycardia > 30 above normal or bradycardic with low BP", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "respiratory",
      label: "Respiratory",
      type: "select",
      required: true,
      options: [
        { label: "0 – No signs; room air; normal respiratory rate", value: "0" },
        { label: "1 – Mild retractions or tachypnea; FiO₂ < 0.30; RR > 10 above normal", value: "1" },
        { label: "2 – Moderate retractions, tracheal tug, or nasal flaring; FiO₂ 0.31–0.50; RR > 20 above normal", value: "2" },
        { label: "3 – Severe retractions or grunting; FiO₂ > 0.50; RR 5 below normal", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "concern",
      label: "Persistent Parent or Staff Concern",
      type: "select",
      required: true,
      options: [
        { label: "No (+0)", value: "no" },
        { label: "Yes (+1)", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Adds 1 point when the parent/carer or a staff member has significant concern the child is deteriorating.",
    },
  ],

  calculate(values: Record<string, string>) {
    const behavior = selectOption(values, "behavior", "Behavior", ["0", "1", "2", "3"]);
    if ("err" in behavior) return critical(behavior.err);
    const cardiovascular = selectOption(values, "cardiovascular", "Cardiovascular", ["0", "1", "2", "3"]);
    if ("err" in cardiovascular) return critical(cardiovascular.err);
    const respiratory = selectOption(values, "respiratory", "Respiratory", ["0", "1", "2", "3"]);
    if ("err" in respiratory) return critical(respiratory.err);
    const concern = stringSelect(values, "concern", "Concern", ["no", "yes"]);
    if ("err" in concern) return critical(concern.err);

    const total = behavior.n + cardiovascular.n + respiratory.n + (concern.s === "yes" ? 1 : 0);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total <= 2) {
      interpretation =
        `PEWS ${total}/10 — LOW RISK. ` +
        "The child is stable for routine ward monitoring; continue the standard observation schedule and reassess the child if there is any change.";
      status = "normal";
      referenceRange = "0–2";
    } else if (total <= 4) {
      interpretation =
        `PEWS ${total}/10 — INTERMEDIATE. ` +
        "Increase the frequency of observations and inform senior staff; any single domain scored 3 or new concern should prompt more urgent review.";
      status = "high";
      referenceRange = "3–4";
    } else {
      interpretation =
        `PEWS ${total}/10 — HIGH RISK. ` +
        "Urgent medical review is required; consider activating the rapid response team and transferring the child to a higher level of care (HDU/PICU).";
      status = "critical";
      referenceRange = "5–10";
    }

    return {
      value: total,
      unit: "/10",
      interpretation,
      status,
      referenceRange,
      score: total,
    };
  },
};
