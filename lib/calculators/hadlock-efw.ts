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

export const hadlockEfwCalculator: CalculatorDefinition = {
  id: "hadlock-efw",

  slug: "hadlock-efw",

  name: "Hadlock Estimated Fetal Weight",

  shortName: "Hadlock EFW",

  description:
    "Estimates fetal weight from four standard ultrasound biometric measurements (BPD, head circumference, abdominal circumference, and femur length) using the Hadlock four-parameter formula (1985). Output is the estimated fetal weight in grams, with the characteristic ±1 SD error of approximately 7.5%.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Hadlock",
    "Estimated Fetal Weight",
    "EFW",
    "Fetal Weight",
    "Biparietal Diameter",
    "Head Circumference",
    "Abdominal Circumference",
    "Femur Length",
    "Fetal Biometry",
    "Obstetric Ultrasound",
  ],

  formula:
    "log₁₀(EFW) = 1.3596 − 0.00386(AC × FL) + 0.0064(HC) + 0.00061(BPD × AC) + 0.0424(AC) + 0.174(FL); EFW in grams",

  normalRange:
    "Fetal weight depends on gestational age; the formula error is ±1 SD ≈ 7.5% (about ±8% in the original report).",

  referenceRanges: [
    {
      label: "Estimated fetal weight",
      range: "grams",
      context: "Hadlock 4-parameter model (BPD, HC, AC, FL)",
    },
  ],

  classification: [],

  clinicalGuidance: {
    advice: [
      "Use BPD, HC, AC, and FL measured in centimeters on a high-quality fetal ultrasound.",
      "EFW is used together with gestational age to detect growth restriction (EFW < 10th percentile) or macrosomia (EFW ≥ 4000–4500 g).",
      "Compare serial measurements over time; a single EFW is only a snapshot.",
    ],
    warnings: [
      "All EFW formulas carry substantial error (1 SD ≈ 7.5–15%); do not treat a single value as exact.",
      "Formula accuracy declines at the extremes (growth restriction and macrosomia) and in late gestation.",
      "Measurements are operator-dependent — poor images give unreliable EFW.",
    ],
    followUp: [
      "For suspected growth restriction or macrosomia, confirm with serial growth scans, Doppler studies, and amniotic fluid assessment.",
      "Use EFW together with fetal status surveillance (BPP, NST) when abnormal growth is suspected.",
    ],
  },

  clinicalNotes:
    "The Hadlock four-parameter model (1985, Am J Obstet Gynecol 151:333-337) estimates fetal weight from biparietal diameter, head circumference, abdominal circumference, and femur length: log₁₀ EFW = 1.3596 − 0.00386(AC × FL) + 0.0064(HC) + 0.00061(BPD × AC) + 0.0424(AC) + 0.174(FL). The reported error is ±1 SD ≈ 7.5%. This calculator implements the full four-parameter model; all four inputs are required.",
  evidence: {
    source: "Published fetal biometry formula",
    reference:
      "Hadlock FP, et al. Estimation of fetal weight with the use of head, body, and femur measurements — a prospective study. Am J Obstet Gynecol. 1985;151(3):333-337.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Hadlock FP, et al. Am J Obstet Gynecol. 1985;151(3):333-337.",
      "ACOG Practice Bulletin No. 227: Fetal growth restriction. Obstet Gynecol. 2021;137(2):e16-e28.",
    ],
  },

  faq: [
    {
      question: "How accurate is the Hadlock formula?",
      answer:
        "The 1 SD error is approximately 7.5% (roughly ±250 g near term). This means a computed EFW of 3000 g should be read as approximately 2775–3225 g.",
    },
    {
      question: "Why are all four measurements required?",
      answer:
        "This calculator uses the four-parameter Hadlock model (BPD, HC, AC, FL), which has better accuracy than models using fewer measurements. Three-parameter and two-parameter variants exist but are less precise.",
    },
  ],

  comparison: undefined,

  references: [
    "Hadlock FP, et al. Am J Obstet Gynecol. 1985;151(3):333-337.",
  ],

  relatedCalculators: [
    "gestational-age",
    "edd",
    "biophysical-profile",
    "gestational-weight-gain",
  ],

  inputs: [
    {
      id: "bpd",
      label: "Biparietal Diameter (BPD)",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      step: 0.1,
    },
    {
      id: "hc",
      label: "Head Circumference (HC)",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      step: 0.1,
    },
    {
      id: "ac",
      label: "Abdominal Circumference (AC)",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      step: 0.1,
    },
    {
      id: "fl",
      label: "Femur Length (FL)",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      step: 0.1,
    },
  ],

  calculate(values: Record<string, string>) {
    const bpd = positive(values, "bpd", "Biparietal diameter");
    if ("err" in bpd) return critical(bpd.err);
    const hc = positive(values, "hc", "Head circumference");
    if ("err" in hc) return critical(hc.err);
    const ac = positive(values, "ac", "Abdominal circumference");
    if ("err" in ac) return critical(ac.err);
    const fl = positive(values, "fl", "Femur length");
    if ("err" in fl) return critical(fl.err);

    const log10Efw =
      1.3596 -
      0.00386 * ac.n * fl.n +
      0.0064 * hc.n +
      0.00061 * bpd.n * ac.n +
      0.0424 * ac.n +
      0.174 * fl.n;

    const efw = Math.pow(10, log10Efw);
    const efwRounded = Math.round(efw);
    const efwLb = efw * 0.00220462;
    const sd = efwRounded * 0.075;

    const interpretation =
      `Estimated fetal weight ${efwRounded.toLocaleString()} g (~${efwLb.toFixed(1)} lb), ` +
      `±1 SD ≈ ±${Math.round(sd).toLocaleString()} g (7.5%). ` +
      "Compare with gestational-age growth charts; a single estimate is not exact and serial measurements are preferred.";

    return {
      value: efwRounded,
      unit: "g",
      interpretation,
      status: "normal",
      score: efwRounded,
      referenceRange: "± 1 SD ≈ 7.5%",
    };
  },
};
