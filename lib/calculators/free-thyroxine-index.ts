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

export const freeThyroxineIndexCalculator: CalculatorDefinition = {
  id: "free-thyroxine-index",

  slug: "free-thyroxine-index",

  name: "Free Thyroxine Index (FTI / T7)",

  shortName: "FTI",

  description:
    "Calculates the free thyroxine index (FTI or T7) from total T4 and the T3 resin uptake, an indirect estimate of free thyroid hormone used when direct free T4 assays are unavailable or when binding-protein status is in question.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Free Thyroxine Index",
    "FTI",
    "T7",
    "T4",
    "T3 Resin Uptake",
    "Thyroid Function",
    "Hyperthyroidism",
    "Hypothyroidism",
    "Thyroid Binding Proteins",
    "Endocrinology",
  ],

  formula: "FTI = Total T4 (µg/dL) × T3 Resin Uptake (%) ÷ 100",

  normalRange: "Adult reference range is typically ~1.0–4.5 (assay-dependent; usually interpreted with the T4 Uptake)",

  referenceRanges: [
    {
      label: "Low",
      range: "<1.0",
      context: "typical adult reference (varies by assay)",
    },
    {
      label: "Normal",
      range: "1.0–4.5",
      context: "typical adult reference (varies by assay)",
    },
    {
      label: "High",
      range: ">4.5",
      context: "typical adult reference (varies by assay)",
    },
  ],

  classification: [
    {
      label: "Low",
      range: "<1.0",
      max: 0.99,
      color: "red",
    },
    {
      label: "Normal",
      range: "1.0–4.5",
      min: 1.0,
      max: 4.5,
      color: "green",
    },
    {
      label: "High",
      range: ">4.5",
      min: 4.51,
      color: "yellow",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use total T4 and T3 resin uptake (or thyroid hormone-binding ratio, THBR) measured on the same sample.",
      "The FTI corrects total T4 for changes in thyroid hormone-binding proteins (e.g., pregnancy, estrogens, oral contraceptives, illness, and some drugs).",
      "Interpret the FTI with TSH, clinical status, and pregnancy context.",
    ],
    warnings: [
      "The reference interval (1.0–4.5) is assay- and laboratory-specific; always use the performing laboratory's range.",
      "Direct free T4 assays have largely replaced FTI in most modern laboratories; FTI remains useful where free T4 is not available or binding-protein artifacts are suspected.",
      "Pregnancy changes binding proteins markedly; use trimester-specific free T4 assays or thyroglobulin-based assessment when available.",
    ],
    followUp: [
      "If the FTI is abnormal, confirm thyroid status with TSH and repeat testing; consider direct free T4, free T3, and thyroid antibody testing as clinically indicated.",
      "Recheck after adjusting thyroid hormone replacement or when interfering conditions (illness, medication) resolve.",
    ],
  },

  clinicalNotes:
    "The free thyroxine index (FTI = total T4 × T3 uptake) estimates the free (active) T4 fraction when direct assays are unavailable. It is a well-established, long-standing endocrine laboratory index that corrects for variations in thyroid hormone-binding proteins.",

  evidence: {
    source: "Established laboratory index (peer-reviewed)",
    reference:
      "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum. Test definition, www.mayocliniclabs.com.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum.",
      "Surks MI, et al. American Thyroid Association guidelines for use of laboratory tests in thyroid disorders. JAMA. 1990;263(11):1529-1532.",
    ],
  },

  faq: [
    {
      question: "How is FTI different from free T4?",
      answer:
        "Free T4 is a direct (or calculated) measure of unbound T4. FTI is an indirect index derived by multiplying total T4 by the T3 resin uptake, used when direct free T4 measurement is not available or binding-protein effects are confounding.",
    },
    {
      question: "What causes the FTI to be falsely abnormal?",
      answer:
        "Abnormalities in thyroid hormone-binding proteins (pregnancy, estrogens, androgens, liver disease, nephrotic syndrome) and drugs (salicylates, phenytoin, heparin) can alter total T4 and T3 uptake, changing the FTI even when free hormone is normal.",
    },
  ],

  comparison: undefined,

  references: [
    "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum.",
    "Surks MI, et al. JAMA. 1990;263(11):1529-1532.",
  ],

  relatedCalculators: [
    "levothyroxine-dose",
    "metabolic-syndrome-atp3",
  ],

  inputs: [
    {
      id: "totalT4",
      label: "Total T4",
      type: "number",
      unit: "µg/dL",
      required: true,
      min: 1,
      step: 0.1,
    },
    {
      id: "t3Uptake",
      label: "T3 Resin Uptake",
      type: "number",
      unit: "%",
      required: true,
      min: 1,
      step: 0.1,
      helpText: "The T3 resin uptake (or thyroid hormone-binding ratio), typically 25–35%.",
    },
  ],

  calculate(values: Record<string, string>) {
    const t4 = positive(values, "totalT4", "Total T4");
    if ("err" in t4) return critical(t4.err);
    const uptake = positive(values, "t3Uptake", "T3 resin uptake");
    if ("err" in uptake) return critical(uptake.err);

    const fti = (t4.n * uptake.n) / 100;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (fti < 1.0) {
      interpretation =
        "FTI < 1.0 — low free thyroxine index, consistent with hypothyroidism (assay-dependent reference; confirm with TSH).";
      status = "low";
      referenceRange = "<1.0";
    } else if (fti <= 4.5) {
      interpretation =
        "FTI 1.0–4.5 — within the typical adult reference range. Interpret with TSH and clinical status.";
      status = "normal";
      referenceRange = "1.0–4.5";
    } else {
      interpretation =
        "FTI > 4.5 — high free thyroxine index, consistent with hyperthyroidism (assay-dependent reference; confirm with TSH and clinical status).";
      status = "high";
      referenceRange = ">4.5";
    }

    return {
      value: Number(fti.toFixed(1)),
      unit: "index",
      interpretation,
      status,
      referenceRange,
      score: Number(fti.toFixed(1)),
    };
  },
};
