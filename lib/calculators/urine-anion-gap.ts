import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
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

export const urineAnionGapCalculator: CalculatorDefinition = {
  id: "urine-anion-gap",

  slug: "urine-anion-gap",

  name: "Urine Anion Gap (UAG)",

  shortName: "Urine Anion Gap",

  description:
    "Calculates the urine anion gap: UAG = (urine sodium + urine potassium) − urine chloride. It is used to distinguish renal from extrarenal (gastrointestinal) causes of a normal anion gap (hyperchloremic) metabolic acidosis with hypokalemia and normal renal function.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Urine Anion Gap",
    "UAG",
    "Hyperchloremic Acidosis",
    "Renal Tubular Acidosis",
    "Diarrhea",
    "Bicarbonate Loss",
    "Urine Electrolytes",
    "Nephrology",
  ],

  formula:
    "Urine anion gap (mEq/L) = ( Urine Na+ + Urine K+ ) − Urine Cl−",

  normalRange: "Negative in extrarenal (GI) bicarbonate loss; positive in renal tubular acidosis",

  referenceRanges: [
    {
      label: "Negative",
      range: "< 0",
      context: "extrarenal (GI) bicarbonate loss",
    },
    {
      label: "Zero / equivocal",
      range: "≈ 0",
      context: "no reliable discrimination",
    },
    {
      label: "Positive",
      range: "> 0",
      context: "impaired renal acidification (e.g., distal RTA)",
    },
  ],

  classification: [
    {
      label: "Negative",
      range: "<0",
      max: -0.01,
      color: "green",
    },
    {
      label: "Zero",
      range: "0",
      min: -0.01,
      max: 0.01,
      color: "yellow",
    },
    {
      label: "Positive",
      range: ">0",
      min: 0.01,
      color: "orange",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use the urine anion gap only in the setting of a normal anion gap (hyperchloremic) metabolic acidosis with hypokalemia.",
      "A negative urine anion gap (typically −20 to −50 mEq/L) indicates that unmeasured cations (ammonium NH4+) are being excreted, consistent with GI bicarbonate loss.",
      "A positive or near-zero urine anion gap suggests impaired renal ammonium excretion — e.g., distal renal tubular acidosis.",
      "Urine pH, serum potassium, and the clinical history should be reviewed together with the gap.",
    ],
    warnings: [
      "The urine anion gap is not interpretable in high anion gap acidosis or in patients with renal failure, because ammonium handling is affected.",
      "The urine ammonium concentration is the direct measure of renal acid excretion; the urine anion gap is an indirect surrogate and becomes unreliable at extremes of urine sodium or chloride.",
      "Urine anion gap does not distinguish type 1 from type 2 RTA.",
    ],
    followUp: [
      "If the gap is positive, measure urine ammonium or perform acid-loading testing when RTA is suspected.",
      "If the gap is negative with severe diarrhea, assess volume status and potassium balance.",
      "Recheck serum electrolytes after correction of the underlying cause.",
    ],
  },

  clinicalNotes:
    "In normal urine, ammonium (an unmeasured cation) balances the chloride excess, so the gap is usually negative in states of GI bicarbonate loss where the kidney is excreting ammonium appropriately.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Battle DC, Hizon M, Cohen E, et al. The use of the urinary anion gap in the diagnosis of hyperchloremic metabolic acidosis. N Engl J Med. 1988;318(10):594-599.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Battle DC, et al. N Engl J Med. 1988;318(10):594-599.",
      "Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders. 6th ed. McGraw-Hill; 2013.",
    ],
  },

  faq: [
    {
      question: "When should the urine anion gap be measured?",
      answer:
        "It is most useful in a normal anion gap (hyperchloremic) metabolic acidosis with hypokalemia and normal renal function, to distinguish GI bicarbonate loss (e.g., diarrhea) from renal bicarbonate loss (e.g., distal RTA).",
    },
    {
      question: "What does a negative urine anion gap indicate?",
      answer:
        "A negative gap means the urine contains unmeasured cations (mainly ammonium), indicating the kidney is appropriately excreting acid. This points to an extrarenal cause of the acidosis, such as GI bicarbonate loss.",
    },
    {
      question: "Why is the urine anion gap unreliable in renal failure?",
      answer:
        "In renal failure, tubular ammonium excretion is impaired by the kidney disease itself, so the urine anion gap cannot distinguish renal from extrarenal causes of acidosis.",
    },
  ],

  comparison: undefined,

  references: [
    "Battle DC, et al. N Engl J Med. 1988;318(10):594-599.",
  ],

  relatedCalculators: [
    "anion-gap",
    "anion-gap-delta-ratio",
    "fena",
    "feurea",
  ],

  inputs: [
    {
      id: "urineNa",
      label: "Urine Sodium",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 0,
    },
    {
      id: "urineK",
      label: "Urine Potassium",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 0,
    },
    {
      id: "urineCl",
      label: "Urine Chloride",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 0,
    },
  ],

  calculate(values: Record<string, string>) {
    const na = nonNegative(values, "urineNa", "Urine sodium");
    if ("err" in na) return critical(na.err);
    const k = nonNegative(values, "urineK", "Urine potassium");
    if ("err" in k) return critical(k.err);
    const cl = nonNegative(values, "urineCl", "Urine chloride");
    if ("err" in cl) return critical(cl.err);

    const uag = na.n + k.n - cl.n;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (uag < 0) {
      interpretation =
        "Negative urine anion gap — consistent with appropriate renal ammonium excretion and extrarenal (gastrointestinal) bicarbonate loss in a hyperchloremic acidosis.";
      status = "low";
      referenceRange = "<0";
    } else if (uag > 0) {
      interpretation =
        "Positive urine anion gap — suggests impaired renal acidification (e.g., distal renal tubular acidosis) when a hyperchloremic acidosis is present.";
      status = "high";
      referenceRange = ">0";
    } else {
      interpretation =
        "Urine anion gap ≈ 0 — equivocal; unable to discriminate between renal and extrarenal causes.";
      status = "normal";
      referenceRange = "≈0";
    }

    return {
      value: Number(uag.toFixed(1)),
      unit: "mEq/L",
      interpretation,
      status,
      referenceRange,
    };
  },
};
