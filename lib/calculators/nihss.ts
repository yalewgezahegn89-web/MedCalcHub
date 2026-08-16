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

export const nihssCalculator: CalculatorDefinition = {
  id: "nihss",

  slug: "nihss",

  name: "NIH Stroke Scale",

  shortName: "NIHSS",

  description:
    "The National Institutes of Health Stroke Scale quantifies neurologic impairment after acute stroke by scoring 15 examination items (level of consciousness, orientation, commands, gaze, visual fields, facial palsy, motor arm and leg, ataxia, sensory, language, dysarthria, and extinction). The total ranges 0–42; higher scores indicate more severe deficit.",

  category: "Neurology",

  specialty: "Neurology",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "NIH Stroke Scale",
    "NIHSS",
    "Stroke",
    "Neurologic deficit",
    "Acute stroke",
    "Stroke severity",
    "National Institutes of Health Stroke Scale",
    "Neurology",
    "Cerebrovascular",
    "Aphasia",
  ],

  formula:
    "NIHSS = Sum of 15 item scores (1a/1b/1c + gaze + visual + facial + motor arm L/R + motor leg L/R + ataxia + sensory + language + dysarthria + extinction) → total 0–42",

  normalRange:
    "0 = no stroke symptoms. 1–4 minor; 5–15 moderate; 16–20 moderate–severe; 21–42 severe.",

  referenceRanges: [
    {
      label: "No stroke symptoms",
      range: "0",
      context: "Normal examination",
    },
    {
      label: "Minor stroke",
      range: "1–4",
      context: "Mild neurologic deficit",
    },
    {
      label: "Moderate stroke",
      range: "5–15",
      context: "Clearly identifiable deficit",
    },
    {
      label: "Moderate–severe stroke",
      range: "16–20",
      context: "Severe deficit; prolonged recovery expected",
    },
    {
      label: "Severe stroke",
      range: "21–42",
      context: "Major deficit; high risk of poor outcome",
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
      label: "Minor",
      range: "1–4",
      min: 1,
      max: 4,
      color: "green",
    },
    {
      label: "Moderate",
      range: "5–15",
      min: 5,
      max: 15,
      color: "yellow",
    },
    {
      label: "Moderate–severe",
      range: "16–20",
      min: 16,
      max: 20,
      color: "orange",
    },
    {
      label: "Severe",
      range: "21–42",
      min: 21,
      max: 42,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Administer the scale in a standardized fashion at presentation and serially to track change over time.",
      "Score the best response obtainable; for the motor items, score each arm and each leg separately.",
      "Record the first score before any reperfusion treatment when possible, as the score is used to stratify therapy eligibility.",
    ],
    warnings: [
      "A score of 2 or more on item 1a is one of several exclusions for thrombolysis outside of research settings — always follow current national acute stroke guidelines.",
      "NIHSS has known ceiling and floor effects and does not capture all stroke symptoms (e.g., isolated posterior circulation findings).",
      "Intubation, sedation, language barriers, and aphasia can confound the verbal items.",
    ],
    followUp: [
      "Repeat the NIHSS at intervals and after any change in neurologic status.",
      "Escalate any worsening of ≥ 2 points, which indicates neurologic deterioration and warrants urgent re-imaging.",
    ],
  },

  clinicalNotes:
    "The NIH Stroke Scale was developed in 1989 (Brott et al.) as a 15-item standardized neurologic examination for use in acute stroke trials and has become the standard bedside tool for quantifying stroke severity and tracking change over time. Higher scores indicate greater impairment, and the baseline score is a strong predictor of outcome and of eligibility for reperfusion therapies. The motor items (5 and 6) are scored for both arms and both legs, giving a maximum contribution of 16 from the four motor sub-scores.",
  evidence: {
    source: "Clinical scoring system validated in acute stroke",
    reference:
      "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
      "Lyden P, Brott T, Tilley B, et al. Improved reliability of the NIH Stroke Scale using video training. Stroke. 1994;25(11):2220-2226.",
    ],
  },

  faq: [
    {
      question: "What NIHSS score indicates a severe stroke?",
      answer:
        "Conventionally, scores of 0 are no symptoms, 1–4 are minor, 5–15 moderate, 16–20 moderate–severe, and 21–42 severe stroke.",
    },
    {
      question: "Should the NIHSS be repeated?",
      answer:
        "Yes. Serial scoring is recommended because a change of 2 or more points signals clinical deterioration or improvement.",
    },
  ],

  comparison: {
    title: "Stroke and neurologic severity scales",
    calculators: [
      {
        name: "Modified Rankin Scale",
        href: "/calculators/modified-rankin-scale",
        use: "Functional disability and outcome after stroke",
        bestFor: "Long-term outcome assessment rather than acute severity",
      },
      {
        name: "FOUR Score",
        href: "/calculators/fout-score",
        use: "Coma depth assessment in the ICU",
        bestFor: "Comatose patients where the verbal items of the NIHSS are not testable",
      },
    ],
  },

  references: [
    "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
    "Lyden P, Brott T, Tilley B, et al. Improved reliability of the NIH Stroke Scale using video training. Stroke. 1994;25(11):2220-2226.",
  ],

  relatedCalculators: [
    "modified-rankin-scale",
    "abcd2-score",
    "race-scale",
    "fout-score",
    "gcs",
    "hunt-hess-scale",
  ],

  inputs: [
    {
      id: "loc",
      label: "1a — Level of Consciousness",
      type: "select",
      required: true,
      options: [
        { label: "0 — Alert", value: "0" },
        { label: "1 — Not alert but arousable by minor stimulation", value: "1" },
        { label: "2 — Not alert; requires repeated or strong stimulation", value: "2" },
        { label: "3 — Unresponsive; only reflex responses", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "locQuestions",
      label: "1b — LOC Questions (month and age)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Answers both correctly", value: "0" },
        { label: "1 — Answers one correctly", value: "1" },
        { label: "2 — Answers neither correctly", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "locCommands",
      label: "1c — LOC Commands (open/close eyes; grip/release)",
      type: "select",
      required: true,
      options: [
        { label: "0 — Performs both correctly", value: "0" },
        { label: "1 — Performs one correctly", value: "1" },
        { label: "2 — Performs neither correctly", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "gaze",
      label: "2 — Best Gaze",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal", value: "0" },
        { label: "1 — Partial gaze palsy", value: "1" },
        { label: "2 — Forced deviation or total gaze paresis", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "visual",
      label: "3 — Visual Fields",
      type: "select",
      required: true,
      options: [
        { label: "0 — No visual loss", value: "0" },
        { label: "1 — Partial hemianopia", value: "1" },
        { label: "2 — Complete hemianopia", value: "2" },
        { label: "3 — Bilateral hemianopia (blind, cortical blindness)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "facial",
      label: "4 — Facial Palsy",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal symmetric movements", value: "0" },
        { label: "1 — Minor paralysis (flattened nasolabial fold)", value: "1" },
        { label: "2 — Partial paralysis (lower face)", value: "2" },
        { label: "3 — Complete paralysis of one or both sides", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "armLeft",
      label: "5a — Motor Arm Left",
      type: "select",
      required: true,
      options: [
        { label: "0 — No drift (holds for 10 s)", value: "0" },
        { label: "1 — Drift but does not hit bed", value: "1" },
        { label: "2 — Some effort against gravity", value: "2" },
        { label: "3 — No effort against gravity (falls)", value: "3" },
        { label: "4 — No movement", value: "4" },
      ],
      defaultValue: "0",
    },
    {
      id: "armRight",
      label: "5b — Motor Arm Right",
      type: "select",
      required: true,
      options: [
        { label: "0 — No drift (holds for 10 s)", value: "0" },
        { label: "1 — Drift but does not hit bed", value: "1" },
        { label: "2 — Some effort against gravity", value: "2" },
        { label: "3 — No effort against gravity (falls)", value: "3" },
        { label: "4 — No movement", value: "4" },
      ],
      defaultValue: "0",
    },
    {
      id: "legLeft",
      label: "6a — Motor Leg Left",
      type: "select",
      required: true,
      options: [
        { label: "0 — No drift (holds for 5 s)", value: "0" },
        { label: "1 — Drift but does not hit bed", value: "1" },
        { label: "2 — Some effort against gravity", value: "2" },
        { label: "3 — No effort against gravity (falls)", value: "3" },
        { label: "4 — No movement", value: "4" },
      ],
      defaultValue: "0",
    },
    {
      id: "legRight",
      label: "6b — Motor Leg Right",
      type: "select",
      required: true,
      options: [
        { label: "0 — No drift (holds for 5 s)", value: "0" },
        { label: "1 — Drift but does not hit bed", value: "1" },
        { label: "2 — Some effort against gravity", value: "2" },
        { label: "3 — No effort against gravity (falls)", value: "3" },
        { label: "4 — No movement", value: "4" },
      ],
      defaultValue: "0",
    },
    {
      id: "ataxia",
      label: "7 — Limb Ataxia",
      type: "select",
      required: true,
      options: [
        { label: "0 — Absent", value: "0" },
        { label: "1 — Present in one limb", value: "1" },
        { label: "2 — Present in two limbs", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "sensory",
      label: "8 — Sensory",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal; no sensory loss", value: "0" },
        { label: "1 — Mild–moderate loss (less sharp on affected side)", value: "1" },
        { label: "2 — Severe or total sensory loss", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "language",
      label: "9 — Best Language",
      type: "select",
      required: true,
      options: [
        { label: "0 — No aphasia; normal", value: "0" },
        { label: "1 — Mild–moderate aphasia", value: "1" },
        { label: "2 — Severe aphasia", value: "2" },
        { label: "3 — Mute or global aphasia", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "dysarthria",
      label: "10 — Dysarthria",
      type: "select",
      required: true,
      options: [
        { label: "0 — Normal articulation", value: "0" },
        { label: "1 — Mild–moderate slurring", value: "1" },
        { label: "2 — Severe; unintelligible or mute", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "extinction",
      label: "11 — Extinction and Inattention",
      type: "select",
      required: true,
      options: [
        { label: "0 — No abnormality", value: "0" },
        { label: "1 — Visual, tactile, auditory, or spatial inattention", value: "1" },
        { label: "2 — Profound hemi-inattention in more than one modality", value: "2" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const loc = selectOption(values, "loc", "Level of consciousness", ["0", "1", "2", "3"]);
    if ("err" in loc) return critical(loc.err);
    const locQuestions = selectOption(values, "locQuestions", "LOC questions", ["0", "1", "2"]);
    if ("err" in locQuestions) return critical(locQuestions.err);
    const locCommands = selectOption(values, "locCommands", "LOC commands", ["0", "1", "2"]);
    if ("err" in locCommands) return critical(locCommands.err);
    const gaze = selectOption(values, "gaze", "Best gaze", ["0", "1", "2"]);
    if ("err" in gaze) return critical(gaze.err);
    const visual = selectOption(values, "visual", "Visual fields", ["0", "1", "2", "3"]);
    if ("err" in visual) return critical(visual.err);
    const facial = selectOption(values, "facial", "Facial palsy", ["0", "1", "2", "3"]);
    if ("err" in facial) return critical(facial.err);
    const armLeft = selectOption(values, "armLeft", "Motor arm left", ["0", "1", "2", "3", "4"]);
    if ("err" in armLeft) return critical(armLeft.err);
    const armRight = selectOption(values, "armRight", "Motor arm right", ["0", "1", "2", "3", "4"]);
    if ("err" in armRight) return critical(armRight.err);
    const legLeft = selectOption(values, "legLeft", "Motor leg left", ["0", "1", "2", "3", "4"]);
    if ("err" in legLeft) return critical(legLeft.err);
    const legRight = selectOption(values, "legRight", "Motor leg right", ["0", "1", "2", "3", "4"]);
    if ("err" in legRight) return critical(legRight.err);
    const ataxia = selectOption(values, "ataxia", "Limb ataxia", ["0", "1", "2"]);
    if ("err" in ataxia) return critical(ataxia.err);
    const sensory = selectOption(values, "sensory", "Sensory", ["0", "1", "2"]);
    if ("err" in sensory) return critical(sensory.err);
    const language = selectOption(values, "language", "Best language", ["0", "1", "2", "3"]);
    if ("err" in language) return critical(language.err);
    const dysarthria = selectOption(values, "dysarthria", "Dysarthria", ["0", "1", "2"]);
    if ("err" in dysarthria) return critical(dysarthria.err);
    const extinction = selectOption(values, "extinction", "Extinction and inattention", ["0", "1", "2"]);
    if ("err" in extinction) return critical(extinction.err);

    const score =
      loc.n +
      locQuestions.n +
      locCommands.n +
      gaze.n +
      visual.n +
      facial.n +
      armLeft.n +
      armRight.n +
      legLeft.n +
      legRight.n +
      ataxia.n +
      sensory.n +
      language.n +
      dysarthria.n +
      extinction.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score === 0) {
      interpretation =
        "NIHSS 0/42 — NO stroke symptoms. Continue standard acute stroke workup and secondary prevention per current guidelines.";
      status = "normal";
      referenceRange = "0";
    } else if (score <= 4) {
      interpretation =
        `NIHSS ${score}/42 — MINOR stroke. ` +
        "Deficit is mild; determine eligibility for reperfusion therapy and complete the diagnostic workup.";
      status = "normal";
      referenceRange = "1–4";
    } else if (score <= 15) {
      interpretation =
        `NIHSS ${score}/42 — MODERATE stroke. ` +
        "Clearly identifiable deficit; evaluate for reperfusion eligibility and admit for neurologic monitoring.";
      status = "high";
      referenceRange = "5–15";
    } else if (score <= 20) {
      interpretation =
        `NIHSS ${score}/42 — MODERATE–SEVERE stroke. ` +
        "Severe deficit with high risk of prolonged disability; urgent specialist evaluation and stroke-unit care.";
      status = "high";
      referenceRange = "16–20";
    } else {
      interpretation =
        `NIHSS ${score}/42 — SEVERE stroke. ` +
        "Major deficit; highest risk of poor outcome. Manage on the stroke unit with early rehabilitation and multidisciplinary care.";
      status = "critical";
      referenceRange = "21–42";
    }

    return {
      value: score,
      unit: "/42",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
