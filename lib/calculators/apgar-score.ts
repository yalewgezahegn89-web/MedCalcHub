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

export const apgarScoreCalculator: CalculatorDefinition = {
  id: "apgar-score",

  slug: "apgar-score",

  name: "Apgar Score (Newborn)",

  shortName: "Apgar",

  description:
    "Scores newborn condition at 1 and 5 minutes using the five Apgar signs (Appearance, Pulse, Grimace, Activity, Respiration), each scored 0–2 for a total of 0–10 (Apgar 1953). Higher scores indicate better transition to extrauterine life.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Apgar",
    "Apgar Score",
    "Newborn Assessment",
    "Neonatal Assessment",
    "Appearance",
    "Pulse",
    "Grimace",
    "Activity",
    "Respiration",
    "Newborn",
    "Neonatology",
    "Pediatrics",
  ],

  formula:
    "Apgar = Appearance (0–2) + Pulse (0–2) + Grimace (0–2) + Activity (0–2) + Respiration (0–2) → total 0–10",

  normalRange:
    "7–10 reassuring; 4–6 moderately depressed; 0–3 severely depressed. Scores are recorded at 1 and 5 minutes and every 5 minutes thereafter until 20 minutes if the 5-minute score is below 7.",

  referenceRanges: [
    {
      label: "Reassuring",
      range: "7–10",
      context: "At 1 and 5 minutes",
    },
    {
      label: "Moderately depressed",
      range: "4–6",
      context: "May require stimulation and observation",
    },
    {
      label: "Severely depressed",
      range: "0–3",
      context: "Requires immediate resuscitation",
    },
  ],

  classification: [
    {
      label: "Reassuring",
      range: "7–10",
      min: 7,
      max: 10,
      color: "green",
    },
    {
      label: "Moderately depressed",
      range: "4–6",
      min: 4,
      max: 6,
      color: "yellow",
    },
    {
      label: "Severely depressed",
      range: "0–3",
      min: 0,
      max: 3,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Apgar score (Virginia Apgar, 1953) evaluates five signs — Appearance (color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), and Respiration — each scored 0–2. The AAP/AHA (2015) recommend that the Apgar score be reported but not used alone to drive resuscitation decisions; ventilation and heart-rate assessment take precedence. It remains the standard universal newborn assessment tool at 1 and 5 minutes of life.",




  comparison: {
    title: "Neonatal assessment tools",
    calculators: [
      {
        name: "Pediatric Glasgow Coma Scale",
        href: "/calculators/pediatric-gcs",
        use: "Neurologic assessment in an older or ill infant/child",
        bestFor: "Quantifying depressed consciousness in infants and children",
      },
      {
        name: "Biophysical Profile (BPP)",
        href: "/calculators/biophysical-profile",
        use: "Antepartum fetal well-being before delivery",
        bestFor: "Prenatal fetal surveillance",
      },
    ],
  },

  references: [
    "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
    "AAP Committee on Fetus and Newborn, ACOG Committee on Obstetric Practice. The Apgar score. Pediatrics. 2015;136(4):819-822.",
  ],

  relatedCalculators: ["pediatric-gcs", "biophysical-profile", "pediatric-hypotension"],

  inputs: [
    {
      id: "appearance",
      label: "Appearance (Color)",
      type: "select",
      required: true,
      options: [
        { label: "0 – Blue or pale all over", value: "0" },
        { label: "1 – Pink body, blue extremities (acrocyanosis)", value: "1" },
        { label: "2 – Completely pink", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "pulse",
      label: "Pulse (Heart Rate)",
      type: "select",
      required: true,
      options: [
        { label: "0 – Absent", value: "0" },
        { label: "1 – < 100 beats per minute", value: "1" },
        { label: "2 – ≥ 100 beats per minute", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "grimace",
      label: "Grimace (Reflex Irritability)",
      type: "select",
      required: true,
      options: [
        { label: "0 – No response to stimulation", value: "0" },
        { label: "1 – Grimace or weak cry", value: "1" },
        { label: "2 – Cry, cough, or withdrawal", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "activity",
      label: "Activity (Muscle Tone)",
      type: "select",
      required: true,
      options: [
        { label: "0 – Limp (floppy)", value: "0" },
        { label: "1 – Some flexion of extremities", value: "1" },
        { label: "2 – Active movement", value: "2" },
      ],
      defaultValue: "2",
    },
    {
      id: "respiration",
      label: "Respiration (Breathing)",
      type: "select",
      required: true,
      options: [
        { label: "0 – Absent", value: "0" },
        { label: "1 – Weak, irregular, or gasping", value: "1" },
        { label: "2 – Strong, vigorous cry", value: "2" },
      ],
      defaultValue: "2",
    },
  ],

  calculate(values: Record<string, string>) {
    const appearance = selectOption(values, "appearance", "Appearance", ["0", "1", "2"]);
    if ("err" in appearance) return critical(appearance.err);
    const pulse = selectOption(values, "pulse", "Pulse", ["0", "1", "2"]);
    if ("err" in pulse) return critical(pulse.err);
    const grimace = selectOption(values, "grimace", "Grimace", ["0", "1", "2"]);
    if ("err" in grimace) return critical(grimace.err);
    const activity = selectOption(values, "activity", "Activity", ["0", "1", "2"]);
    if ("err" in activity) return critical(activity.err);
    const respiration = selectOption(values, "respiration", "Respiration", ["0", "1", "2"]);
    if ("err" in respiration) return critical(respiration.err);

    const score =
      appearance.n + pulse.n + grimace.n + activity.n + respiration.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score >= 7) {
      interpretation =
        `Apgar score ${score}/10 — REASSURING. ` +
        "The newborn is transitioning well; continue routine newborn care and reassess at 5 minutes.";
      status = "normal";
      referenceRange = "7–10";
    } else if (score >= 4) {
      interpretation =
        `Apgar score ${score}/10 — MODERATELY DEPRESSED. ` +
        "Provide gentle stimulation, warm, and position the airway; reassess frequently. Scores below 7 at 5 minutes warrant continued monitoring and consideration of resuscitative support.";
      status = "high";
      referenceRange = "4–6";
    } else {
      interpretation =
        `Apgar score ${score}/10 — SEVERELY DEPRESSED. ` +
        "The newborn requires immediate, active resuscitation per neonatal resuscitation guidelines (PEEP/PICU algorithm) — begin the resuscitation sequence now.";
      status = "critical";
      referenceRange = "0–3";
    }

    return {
      value: score,
      unit: "/10",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
