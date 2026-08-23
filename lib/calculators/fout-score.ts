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

export const foutScoreCalculator: CalculatorDefinition = {
  id: "fout-score",

  slug: "fout-score",

  name: "FOUR Score",

  shortName: "FOUR Score",

  description:
    "The FOUR (Full Outline of Unresponsiveness) score assesses coma depth using four components — Eye response, Motor response, Brainstem reflexes, and Respiration — each scored 0–4 for a total of 0–16. Lower scores indicate deeper coma and higher in-hospital mortality.",

  category: "Neurology",

  specialty: "Neurology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "FOUR Score",
    "FOUR",
    "Full Outline of Unresponsiveness",
    "Coma",
    "Coma scale",
    "Consciousness",
    "Glasgow Coma Scale",
    "Brainstem",
    "Neurology",
    "Critical Care",
    "Intensive care",
  ],

  formula:
    "FOUR = Eye (0–4) + Motor (0–4) + Brainstem (0–4) + Respiration (0–4) → total 0–16",

  normalRange:
    "16 = fully responsive and intact brainstem/respiratory function. Lower totals indicate deeper impairment; 0–4 is associated with the highest in-hospital mortality.",

  referenceRanges: [
    {
      label: "Relatively favorable",
      range: "13–16",
      context: "Preserved responsiveness and brainstem function",
    },
    {
      label: "Intermediate",
      range: "9–12",
      context: "Moderate impairment",
    },
    {
      label: "Poor",
      range: "5–8",
      context: "Severe impairment",
    },
    {
      label: "Very poor",
      range: "0–4",
      context: "Deep coma; highest in-hospital mortality",
    },
  ],

  classification: [
    {
      label: "Relatively favorable",
      range: "13–16",
      min: 13,
      max: 16,
      color: "green",
    },
    {
      label: "Intermediate",
      range: "9–12",
      min: 9,
      max: 12,
      color: "yellow",
    },
    {
      label: "Poor",
      range: "5–8",
      min: 5,
      max: 8,
      color: "orange",
    },
    {
      label: "Very poor",
      range: "0–4",
      min: 0,
      max: 4,
      color: "red",
    },
  ],



  clinicalNotes:
    "The FOUR score was introduced by Wijdicks and colleagues (Neurology 2005) as an alternative to the Glasgow Coma Scale for patients with impaired consciousness. It grades eye response (from open with tracking or blinking to command, down to remain closed to pain), motor response (from command following such as thumbs-up, fist, or peace sign, down to no response or myoclonus status), brainstem reflexes (pupillary, corneal, and cough), and respiration (regular, Cheyne-Stokes, irregular, or dependent on/absent above the ventilator rate). The total ranges from 0 to 16, with lower scores associated with higher in-hospital mortality, and it avoids the GCS limitation of untestable verbal items in intubated patients.",




  comparison: {
    title: "Coma and consciousness assessment",
    calculators: [
      {
        name: "Glasgow Coma Scale",
        href: "/calculators/gcs",
        use: "Standard consciousness assessment with verbal component",
        bestFor: "Rapid trauma triage and monitoring",
      },
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Quantifying focal neurologic deficit in stroke",
        bestFor: "Focal deficit rather than coma depth",
      },
    ],
  },

  references: [
    "Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: The FOUR score. Ann Neurol. 2005;58(4):585-593.",
    "Wijdicks EFM. The bare essentials: coma. Pract Neurol. 2010;10(1):51-60.",
  ],

  relatedCalculators: [
    "gcs",
    "nihss",
    "modified-rankin-scale",
    "hunt-hess-scale",
  ],

  inputs: [
    {
      id: "eye",
      label: "E — Eye Response",
      type: "select",
      required: true,
      options: [
        { label: "4 — Eyelids open; tracking or blinking to command", value: "4" },
        { label: "3 — Eyelids open but not tracking", value: "3" },
        { label: "2 — Eyelids open to loud voice", value: "2" },
        { label: "1 — Eyelids open to pain", value: "1" },
        { label: "0 — Eyelids remain closed with pain", value: "0" },
      ],
      defaultValue: "4",
    },
    {
      id: "motor",
      label: "M — Motor Response",
      type: "select",
      required: true,
      options: [
        { label: "4 — Thumbs-up, fist, or peace sign on command", value: "4" },
        { label: "3 — Localizing to pain", value: "3" },
        { label: "2 — Flexion response to pain", value: "2" },
        { label: "1 — Extension response to pain", value: "1" },
        { label: "0 — No response to pain or generalized myoclonus status", value: "0" },
      ],
      defaultValue: "4",
    },
    {
      id: "brainstem",
      label: "B — Brainstem Reflexes",
      type: "select",
      required: true,
      options: [
        { label: "4 — Pupil and corneal reflexes present", value: "4" },
        { label: "3 — One pupil wide and fixed", value: "3" },
        { label: "2 — Pupil or corneal reflex absent", value: "2" },
        { label: "1 — Pupil and corneal reflexes absent", value: "1" },
        { label: "0 — Pupil, corneal, and cough reflexes absent", value: "0" },
      ],
      defaultValue: "4",
    },
    {
      id: "respiration",
      label: "R — Respiration",
      type: "select",
      required: true,
      options: [
        { label: "4 — Not intubated; regular breathing", value: "4" },
        { label: "3 — Not intubated; Cheyne-Stokes breathing", value: "3" },
        { label: "2 — Not intubated; irregular breathing", value: "2" },
        { label: "1 — Breathes above ventilator rate", value: "1" },
        { label: "0 — Breathes at ventilator rate or apnea", value: "0" },
      ],
      defaultValue: "4",
    },
  ],

  calculate(values: Record<string, string>) {
    const eye = selectOption(values, "eye", "Eye response", ["0", "1", "2", "3", "4"]);
    if ("err" in eye) return critical(eye.err);
    const motor = selectOption(values, "motor", "Motor response", ["0", "1", "2", "3", "4"]);
    if ("err" in motor) return critical(motor.err);
    const brainstem = selectOption(values, "brainstem", "Brainstem reflexes", ["0", "1", "2", "3", "4"]);
    if ("err" in brainstem) return critical(brainstem.err);
    const respiration = selectOption(values, "respiration", "Respiration", ["0", "1", "2", "3", "4"]);
    if ("err" in respiration) return critical(respiration.err);

    const score = eye.n + motor.n + brainstem.n + respiration.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score >= 13) {
      interpretation =
        `FOUR ${score}/16 — RELATIVELY FAVORABLE status. ` +
        "Consciousness and brainstem function are largely preserved; continue to identify and treat the underlying cause.";
      status = "normal";
      referenceRange = "13–16";
    } else if (score >= 9) {
      interpretation =
        `FOUR ${score}/16 — INTERMEDIATE impairment. ` +
        "Moderate depression of consciousness; monitor closely and reassess serially.";
      status = "high";
      referenceRange = "9–12";
    } else if (score >= 5) {
      interpretation =
        `FOUR ${score}/16 — POOR status. ` +
        "Severe impairment of consciousness with significant mortality risk; urgent evaluation of the cause is required.";
      status = "high";
      referenceRange = "5–8";
    } else {
      interpretation =
        `FOUR ${score}/16 — VERY POOR status. ` +
        "Deep coma with the highest in-hospital mortality. Manage in a critical care setting; discuss prognosis with the family and care team.";
      status = "critical";
      referenceRange = "0–4";
    }

    return {
      value: score,
      unit: "/16",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
