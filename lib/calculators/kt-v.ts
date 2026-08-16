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
  if (n <= 0) return { err: `${label} must be a positive number.` };
  return { n };
}

function nonNegative(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n < 0) return { err: `${label} cannot be negative.` };
  return { n };
}

export const ktVCalculator: CalculatorDefinition = {
  id: "kt-v",

  slug: "kt-v",

  name: "Kt/V (Daugirdas Second Generation spKt/V)",

  shortName: "spKt/V",

  description:
    "Calculates single-pool Kt/V (spKt/V) for hemodialysis adequacy using the Daugirdas second-generation formula. KDOQI defines a minimum delivered spKt/V of 1.2 per treatment for patients treated three times weekly, with a target of 1.4.",

  category: "Nephrology",

  specialty: "Nephrology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Kt/V",
    "spKt/V",
    "Daugirdas",
    "Hemodialysis",
    "Dialysis Adequacy",
    "Urea Kinetic Modeling",
    "BUN",
    "Nephrology",
  ],

  formula:
    "spKt/V = −ln(R − 0.008 × t) + (4 − 3.5 × R) × (UF ÷ W)  where R = post/pre BUN ratio, t = treatment time (h), UF = ultrafiltrate (L), W = post-dialysis weight (kg)",

  normalRange: "≥ 1.2 (KDOQI minimum delivered dose; target 1.4)",

  referenceRanges: [
    {
      label: "Adequate",
      range: "≥ 1.2",
      context: "thrice-weekly hemodialysis (KDOQI)",
    },
    {
      label: "Below target",
      range: "1.0–1.19",
      context: "thrice-weekly hemodialysis",
    },
    {
      label: "Inadequate",
      range: "< 1.0",
      context: "thrice-weekly hemodialysis",
    },
  ],

  classification: [
    {
      label: "Adequate",
      range: "≥1.2",
      min: 1.2,
      color: "green",
    },
    {
      label: "Below target",
      range: "1.0–1.19",
      min: 1,
      max: 1.19,
      color: "yellow",
    },
    {
      label: "Inadequate",
      range: "<1.0",
      max: 0.99,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Measure pre- and post-dialysis BUN on the same treatment and record the exact dialysis time and net ultrafiltration.",
      "Use post-dialysis weight (kg) and ultrafiltrate in liters; the formula is the second-generation Daugirdas equation.",
      "KDOQI recommends a minimum delivered spKt/V of 1.2 for three-times-weekly dialysis; if using twice-weekly schedules, other adequacy targets apply.",
      "For Kt/V targets in alternative schedules, consider the standardized Kt/V (stdKt/V) or equivalent renal urea clearance.",
    ],
    warnings: [
      "This formula assumes three-times-weekly hemodialysis with a 4-hour session in mind; it does not apply to peritoneal dialysis.",
      "Rebound of urea after dialysis is not captured by single-pool Kt/V; this is acceptable for routine monitoring.",
      "Post-dialysis BUN must be sampled correctly (after blood pump slowed for ~1 minute) to avoid underestimating Kt/V.",
    ],
    followUp: [
      "If spKt/V is below target, review access recirculation, dialysis prescription (time, blood and dialysate flow), and ultrafiltration volume.",
      "Recheck after prescription changes; address vascular access dysfunction when adequacy is persistently low.",
      "In patients with significant residual renal function, incorporate residual renal urea clearance into total clearance.",
    ],
  },

  clinicalNotes:
    "Single-pool Kt/V (spKt/V) is the standard measure of hemodialysis urea removal. The Daugirdas second-generation equation corrects for ultrafiltration and treatment time and is the KDOQI-recommended method.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Daugirdas JT. Second generation logarithmic estimates of single-pool variable volume Kt/V: an analysis of error. J Am Soc Nephrol. 1993;4(5):1205-1213.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Daugirdas JT. J Am Soc Nephrol. 1993;4(5):1205-1213.",
      "National Kidney Foundation. KDOQI Clinical Practice Guideline for Hemodialysis Adequacy: 2015 update. Am J Kidney Dis. 2015;66(5):884-930.",
    ],
  },

  faq: [
    {
      question: "What does Kt/V measure?",
      answer:
        "Kt/V is a dimensionless measure of dialysis dose: K is urea clearance (mL/min), t is treatment time (min), and V is the volume of distribution of urea (mL). spKt/V is the single-pool estimate from pre- and post-dialysis BUN.",
    },
    {
      question: "What is the difference between spKt/V and eKt/V?",
      answer:
        "spKt/V does not account for post-dialysis urea rebound, while equilibrated Kt/V (eKt/V) does. The difference is small at lower doses but grows at higher doses; spKt/V is the KDOQI standard for routine monitoring.",
    },
    {
      question: "Can this formula be used for peritoneal dialysis?",
      answer:
        "No. This calculator implements the Daugirdas equation for hemodialysis. Peritoneal dialysis adequacy uses weekly Kt/V targets (e.g., Kt/V ≥ 1.7/week).",
    },
  ],

  comparison: undefined,

  references: [
    "Daugirdas JT. J Am Soc Nephrol. 1993;4(5):1205-1213.",
    "KDOQI Hemodialysis Adequacy 2015 Update. Am J Kidney Dis. 2015;66(5):884-930.",
  ],

  relatedCalculators: [
    "ckd-epi-2021",
    "mdrd",
    "cockcroft-gault",
    "bun-creatinine-ratio",
  ],

  inputs: [
    {
      id: "preBun",
      label: "Pre-Dialysis BUN",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "postBun",
      label: "Post-Dialysis BUN",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "ultrafiltrate",
      label: "Ultrafiltration Volume",
      type: "number",
      unit: "L",
      required: true,
      min: 0,
    },
    {
      id: "treatmentTime",
      label: "Treatment Time",
      type: "number",
      unit: "hours",
      required: true,
      min: 1,
    },
    {
      id: "postWeight",
      label: "Post-Dialysis Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const pre = positive(values, "preBun", "Pre-dialysis BUN");
    if ("err" in pre) return critical(pre.err);
    const post = positive(values, "postBun", "Post-dialysis BUN");
    if ("err" in post) return critical(post.err);
    const uf = nonNegative(values, "ultrafiltrate", "Ultrafiltration volume");
    if ("err" in uf) return critical(uf.err);
    const t = positive(values, "treatmentTime", "Treatment time");
    if ("err" in t) return critical(t.err);
    const w = positive(values, "postWeight", "Post-dialysis weight");
    if ("err" in w) return critical(w.err);

    if (post.n >= pre.n) {
      return critical(
        "Post-dialysis BUN must be lower than pre-dialysis BUN. Check that the values are from the correct samples.",
      );
    }

    const r = post.n / pre.n;
    const arg = r - 0.008 * t.n;

    if (arg <= 0) {
      return critical(
        "The urea reduction ratio term (R − 0.008 × t) is not positive — check the BUN values and treatment time.",
      );
    }

    const ktv = -Math.log(arg) + (4 - 3.5 * r) * (uf.n / w.n);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ktv >= 1.2) {
      interpretation =
        "spKt/V ≥ 1.2 — meets the KDOQI minimum delivered dialysis dose for three-times-weekly hemodialysis (target 1.4).";
      status = "normal";
      referenceRange = "≥1.2";
    } else if (ktv >= 1) {
      interpretation =
        "spKt/V 1.0–1.19 — below the KDOQI minimum delivered target; consider prescription or access review.";
      status = "high";
      referenceRange = "1.0–1.19";
    } else {
      interpretation =
        "spKt/V < 1.0 — inadequate dialysis dose; urgent review of access, prescription, and compliance is warranted.";
      status = "critical";
      referenceRange = "<1.0";
    }

    return {
      value: Number(ktv.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
      score: Number(ktv.toFixed(2)),
    };
  },
};
