import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export const rtsCalculator: CalculatorDefinition = {
  id: "rts",

  slug: "rts",

  name: "Revised Trauma Score",

  shortName: "RTS",

  description:
    "Revised Trauma Score (RTS) using coded Glasgow Coma Scale, systolic blood pressure, and respiratory rate to triage trauma patients and predict survival.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["RTS", "Revised Trauma Score", "Trauma", "Triage", "GCS", "Glasgow Coma Scale", "Emergency", "Survival"],

  formula:
    "0.9368 × GCS code + 0.7326 × SBP code + 0.2908 × RR code, where each parameter is coded 0–4 (total range 0–7.8408)",

  normalRange: "0–7.8408",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "RTS is a triage tool used in trauma systems. An RTS <4 predicts survival probability <70% and warrants consideration of transfer to a trauma center. Coding: GCS 13–15=4, 9–12=3, 6–8=2, 4–5=1, 3=0; SBP >89=4, 76–89=3, 50–75=2, 1–49=1, 0=0; RR 10–29=4, >29=3, 6–9=2, 1–5=1, 0=0.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Champion HR, et al. A revision of the Trauma Score. J Trauma. 1989;29(5):623-629.",
  ],

  relatedCalculators: ["gcs", "shock-index"],

  inputs: [
  {
    id: "gcs",
    label: "Glasgow Coma Scale",
    type: "number",
    unit: "points",
    required: true,
    min: 3,
    max: 15,
    step: 1,
  },
  {
    id: "sbp",
    label: "Systolic blood pressure",
    type: "number",
    unit: "mmHg",
    required: true,
    min: 0,
    max: 250,
    step: 1,
  },
  {
    id: "rr",
    label: "Respiratory rate",
    type: "number",
    unit: "breaths/min",
    required: true,
    min: 0,
    max: 60,
    step: 1,
  }
],

  calculate(values: Record<string, string>) {
    const gcs = readNumber(values["gcs"], "Glasgow Coma Scale");
    if (gcs === null) {
      return critical("Glasgow Coma Scale is required.");
    }
    if (gcs < 3 || gcs > 15) {
      return critical("GCS must be between 3 and 15.");
    }

    const sbp = readNumber(values["sbp"], "Systolic blood pressure");
    if (sbp === null) {
      return critical("Systolic blood pressure is required.");
    }
    if (sbp < 0 || sbp > 250) {
      return critical("Systolic blood pressure must be between 0 and 250 mmHg.");
    }

    const rr = readNumber(values["rr"], "Respiratory rate");
    if (rr === null) {
      return critical("Respiratory rate is required.");
    }
    if (rr < 0 || rr > 60) {
      return critical("Respiratory rate must be between 0 and 60 breaths/min.");
    }

    let gcsCode: number;
    if (gcs >= 13) gcsCode = 4;
    else if (gcs >= 9) gcsCode = 3;
    else if (gcs >= 6) gcsCode = 2;
    else if (gcs >= 4) gcsCode = 1;
    else gcsCode = 0;

    let sbpCode: number;
    if (sbp > 89) sbpCode = 4;
    else if (sbp >= 76) sbpCode = 3;
    else if (sbp >= 50) sbpCode = 2;
    else if (sbp >= 1) sbpCode = 1;
    else sbpCode = 0;

    let rrCode: number;
    if (rr >= 10 && rr <= 29) rrCode = 4;
    else if (rr > 29) rrCode = 3;
    else if (rr >= 6) rrCode = 2;
    else if (rr >= 1) rrCode = 1;
    else rrCode = 0;

    const rts =
      0.9368 * gcsCode +
      0.7326 * sbpCode +
      0.2908 * rrCode;

    const rounded = Math.round(rts * 10000) / 10000;

    const rtsWarnings = [
      "The Revised Trauma Score is a physiologic severity and triage tool, not a definitive diagnostic assessment.",
      "Scoring must not delay immediate trauma stabilization — airway, breathing, hemorrhage control, and circulation come first.",
    ];

    if (rts < 4) {
      return {
        value: rounded,
        unit: "RTS",
        score: rounded,
        interpretation:
          `RTS ${rounded} — high likelihood of poor outcome (predicted survival <70%). ` +
          "Strongly consider transfer to a trauma center.",
        status: "critical",
        warnings: rtsWarnings,
        advice: [
          "Use this as an adjunct to the primary survey; initiate stabilization and arrange trauma-center transfer in parallel rather than sequentially.",
        ],
        followUp: [
          "Reassess serially — physiologic improvement or deterioration after resuscitation changes both the score and triage implications.",
        ],
      };
    }

    if (rts < 7.84) {
      return {
        value: rounded,
        unit: "RTS",
        score: rounded,
        interpretation:
          `RTS ${rounded} — moderate physiologic derangement. ` +
          "Evaluate for trauma center transfer per local protocols.",
        status: "high",
        warnings: rtsWarnings,
        advice: [
          "Interpret alongside injury mechanism, anatomic findings, and local triage criteria rather than the score alone.",
        ],
        followUp: [
          "Repeat the assessment after initial resuscitation and whenever physiology changes.",
        ],
      };
    }

    return {
      value: rounded,
      unit: "RTS",
      score: rounded,
      interpretation:
        `RTS ${rounded} — minor physiologic derangement; standard trauma care.`,
      status: "normal",
      warnings: [
        ...rtsWarnings,
        "A normal RTS does not exclude significant anatomic injury — mechanism and examination findings still drive evaluation.",
      ],
      advice: [
        "Continue standard trauma assessment including appropriate imaging based on mechanism and examination.",
      ],
      followUp: [
        "Reassess if hemodynamics or consciousness change at any point during evaluation.",
      ],
    };
  },
};
