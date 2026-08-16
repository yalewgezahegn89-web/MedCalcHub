import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function positive(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n < 0) return { err: `${label} must be a non-negative number.` };
  return { n };
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

export const bishopScoreCalculator: CalculatorDefinition = {
  id: "bishop-score",

  slug: "bishop-score",

  name: "Bishop Score",

  shortName: "Bishop",

  description:
    "Scores cervical readiness for induction of labor (Bishop 1964). Five components (dilatation, effacement, station, consistency, position) are each scored 0–3 (or 0–2) and summed to a total of 0–13; higher scores predict a higher likelihood of successful induction and vaginal delivery.",

  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Bishop Score",
    "Cervical Ripeness",
    "Cervical Ripening",
    "Induction of Labor",
    "Labor Induction",
    "Dilatation",
    "Effacement",
    "Station",
    "OB",
    "Obstetrics",
  ],

  formula:
    "Bishop = Dilatation (0–3) + Effacement (0–3) + Station (0–3) + Consistency (0–2) + Position (0–2) → total 0–13",

  normalRange:
    "0–13; a score ≥ 8 is traditionally considered favorable for induction, and a modified score ≥ 6 is often used as the threshold for a reasonable chance of successful induction.",

  referenceRanges: [
    {
      label: "Unfavorable",
      range: "0–5",
      context: "traditional Bishop",
    },
    {
      label: "Intermediate",
      range: "6–7",
      context: "traditional Bishop",
    },
    {
      label: "Favorable",
      range: "8–13",
      context: "traditional Bishop",
    },
  ],

  classification: [
    {
      label: "Unfavorable",
      range: "0–5",
      min: 0,
      max: 5,
      color: "red",
    },
    {
      label: "Intermediate",
      range: "6–7",
      min: 6,
      max: 7,
      color: "yellow",
    },
    {
      label: "Favorable",
      range: "8–13",
      min: 8,
      max: 13,
      color: "green",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use the score together with the clinical indication for induction and gestational age; a favorable cervix increases the likelihood of successful induction and reduces induction-to-delivery time.",
      "A score ≥ 8 (traditional) or ≥ 6 (modified) is generally considered favorable; lower scores suggest cervical ripening (pharmacologic or mechanical) before oxytocin.",
      "Document each component at the same examination.",
    ],
    warnings: [
      "The Bishop score is one of several predictors of induction success; parity, prior vaginal delivery, gestational age, and fetal status also matter.",
      "Serial scoring over time is more informative than a single value.",
      "Do not use the score alone to decide on mode or timing of delivery; maternal and fetal indications always take precedence.",
    ],
    followUp: [
      "If the cervix is unfavorable, plan cervical ripening (prostaglandins, balloon catheter) and reassess before oxytocin.",
      "Reassess the score periodically if induction is planned or underway.",
    ],
  },

  clinicalNotes:
    "The Bishop score (1964) quantifies cervical favorability for induction using dilatation, effacement, fetal station, consistency, and position. Scores ≥ 8 are traditionally considered favorable; a modified Bishop score ≥ 6 is commonly used as an acceptable threshold in current practice. It is a bedside examination score, not a diagnostic test.",
  evidence: {
    source: "Established clinical scoring system",
    reference:
      "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
      "ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.",
    ],
  },

  faq: [
    {
      question: "What is a good Bishop score for induction?",
      answer:
        "A score of 8 or higher is traditionally considered favorable; a modified Bishop score of 6 or higher is often used as the threshold at which induction is likely to succeed.",
    },
    {
      question: "What if the Bishop score is low?",
      answer:
        "A low score (unfavorable cervix) suggests cervical ripening is warranted before oxytocin, using pharmacologic agents or mechanical methods, then reassessment.",
    },
  ],

  comparison: undefined,

  references: [
    "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
    "ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.",
  ],

  relatedCalculators: [
    "gestational-age",
    "edd",
    "biophysical-profile",
    "gestational-weight-gain",
  ],

  inputs: [
    {
      id: "dilation",
      label: "Cervical Dilatation",
      type: "select",
      required: true,
      options: [
        { label: "0 cm (score 0)", value: "0" },
        { label: "1 cm (score 1)", value: "1" },
        { label: "2 cm (score 2)", value: "2" },
        { label: "≥ 3 cm (score 3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "effacement",
      label: "Cervical Effacement",
      type: "select",
      required: true,
      options: [
        { label: "0–30% (score 0)", value: "0" },
        { label: "40–50% (score 1)", value: "1" },
        { label: "60–70% (score 2)", value: "2" },
        { label: "≥ 80% (score 3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "station",
      label: "Fetal Station",
      type: "select",
      required: true,
      options: [
        { label: "−3 (score 0)", value: "0" },
        { label: "−2 (score 1)", value: "1" },
        { label: "−1 or 0 (score 2)", value: "2" },
        { label: "+1 or +2 (score 3)", value: "3" },
      ],
      defaultValue: "0",
      helpText: "Station relative to the ischial spines (cm).",
    },
    {
      id: "consistency",
      label: "Cervical Consistency",
      type: "select",
      required: true,
      options: [
        { label: "Firm (score 0)", value: "0" },
        { label: "Medium (score 1)", value: "1" },
        { label: "Soft (score 2)", value: "2" },
      ],
      defaultValue: "0",
    },
    {
      id: "position",
      label: "Cervical Position",
      type: "select",
      required: true,
      options: [
        { label: "Posterior (score 0)", value: "0" },
        { label: "Mid (score 1)", value: "1" },
        { label: "Anterior (score 2)", value: "2" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const dilation = selectOption(values, "dilation", "Cervical dilatation", [
      "0",
      "1",
      "2",
      "3",
    ]);
    if ("err" in dilation) return critical(dilation.err);
    const effacement = selectOption(values, "effacement", "Cervical effacement", [
      "0",
      "1",
      "2",
      "3",
    ]);
    if ("err" in effacement) return critical(effacement.err);
    const station = selectOption(values, "station", "Fetal station", [
      "0",
      "1",
      "2",
      "3",
    ]);
    if ("err" in station) return critical(station.err);
    const consistency = selectOption(
      values,
      "consistency",
      "Cervical consistency",
      ["0", "1", "2"],
    );
    if ("err" in consistency) return critical(consistency.err);
    const position = selectOption(values, "position", "Cervical position", [
      "0",
      "1",
      "2",
    ]);
    if ("err" in position) return critical(position.err);

    const score =
      dilation.n + effacement.n + station.n + consistency.n + position.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (score >= 8) {
      interpretation =
        `Bishop score ${score}/13 — FAVORABLE cervix. ` +
        "High likelihood of successful induction and vaginal delivery; oxytocin induction is reasonable.";
      status = "normal";
      referenceRange = "8–13";
    } else if (score >= 6) {
      interpretation =
        `Bishop score ${score}/13 — INTERMEDIATE cervix. ` +
        "A modified Bishop score ≥ 6 is considered favorable by many practitioners; induction is reasonable but success is not guaranteed.";
      status = "normal";
      referenceRange = "6–7";
    } else {
      interpretation =
        `Bishop score ${score}/13 — UNFAVORABLE cervix. ` +
        "Lower likelihood of successful induction; cervical ripening (pharmacologic or mechanical) is typically recommended before oxytocin, with reassessment.";
      status = "high";
      referenceRange = "0–5";
    }

    return {
      value: score,
      unit: "/13",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
