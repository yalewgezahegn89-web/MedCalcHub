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

export const creatinineClearance24hCalculator: CalculatorDefinition = {
  id: "creatinine-clearance-24h",

  slug: "creatinine-clearance-24h",

  name: "Creatinine Clearance from 24-Hour Urine (CrCl)",

  shortName: "24h CrCl",

  description:
    "Calculates creatinine clearance from a 24-hour urine collection using urine creatinine, serum creatinine, and 24-hour urine volume. It is the classic timed-collection estimate of GFR.",

  category: "Nephrology",

  specialty: "Nephrology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Creatinine Clearance",
    "24 Hour Urine",
    "CrCl",
    "Glomerular Filtration Rate",
    "GFR",
    "Timed Urine Collection",
    "Renal Function",
    "Nephrology",
  ],

  formula:
    "CrCl (mL/min) = (Urine Creatinine × 24h Urine Volume) ÷ (Serum Creatinine × 1440)",

  normalRange:
    "Approximately 85–125 mL/min in healthy young adults; declines with age",

  referenceRanges: [
    {
      label: "Normal",
      range: "≥90 mL/min",
      context: "young healthy adults (varies by age/sex)",
    },
    {
      label: "Mildly reduced",
      range: "60–89 mL/min",
      context: "CKD G2",
    },
    {
      label: "Moderately reduced",
      range: "30–59 mL/min",
      context: "CKD G3",
    },
    {
      label: "Severely reduced",
      range: "15–29 mL/min",
      context: "CKD G4",
    },
    {
      label: "Kidney failure",
      range: "<15 mL/min",
      context: "CKD G5",
    },
  ],

  classification: [
    {
      label: "Normal",
      range: "≥90",
      min: 90,
      color: "green",
    },
    {
      label: "Mildly reduced",
      range: "60–89",
      min: 60,
      max: 89,
      color: "yellow",
    },
    {
      label: "Moderately reduced",
      range: "30–59",
      min: 30,
      max: 59,
      color: "orange",
    },
    {
      label: "Severely reduced",
      range: "15–29",
      min: 15,
      max: 29,
      color: "red",
    },
    {
      label: "Kidney failure",
      range: "<15",
      max: 14.99,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use a complete 24-hour collection; incomplete collection underestimates clearance and creatinine excretion.",
      "CrCl overestimates true GFR because creatinine is also secreted by the renal tubules, especially at low GFR.",
      "The Cockcroft-Gault and CKD-EPI formulas are alternatives when a timed collection is not feasible.",
    ],
    warnings: [
      "Verify collection completeness with the expected daily creatinine excretion (roughly 15–20 mg/kg/day in men, 10–15 mg/kg/day in women).",
      "Serum creatinine must be stable during the collection; changing renal function invalidates the estimate.",
      "Large muscle mass, high meat intake, and some medications (cimetidine, trimethoprim) alter serum creatinine and creatinine secretion.",
    ],
    followUp: [
      "When an estimated GFR (e.g., CKD-EPI) and measured CrCl disagree, recheck collection completeness.",
      "For drug dosing, use the estimating equation recommended by the local formulary rather than a single 24h CrCl.",
    ],
  },

  clinicalNotes:
    "The timed 24-hour creatinine clearance is the classical bedside estimate of GFR. Because of collection errors and tubular creatinine secretion, it is less commonly used than estimating equations but remains useful in select settings (e.g., extremes of body habitus).",

  evidence: {
    source: "Classic renal physiology definition",
    reference:
      "Levey AS, et al. Expressing the Modification of Diet in Renal Disease Study equation for estimating glomerular filtration rate with standardized serum creatinine values. Clin Chem. 2007;53(4):766-772.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Levey AS, et al. Clin Chem. 2007;53(4):766-772.",
      "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.",
    ],
  },

  faq: [
    {
      question: "Why does CrCl overestimate true GFR?",
      answer:
        "Creatinine is filtered and also actively secreted by proximal tubules, so urinary creatinine clearance exceeds the true filtration rate by roughly 10–20%, with a larger gap at low GFR.",
    },
    {
      question: "How do I check whether the 24-hour collection was complete?",
      answer:
        "Compare the collection's total creatinine (urine creatinine × volume) with the expected daily excretion (~15–20 mg/kg/day in men, 10–15 mg/kg/day in women). Wide deviations suggest over- or under-collection.",
    },
  ],

  comparison: undefined,

  references: [
    "Levey AS, et al. Clin Chem. 2007;53(4):766-772.",
    "Cockcroft DW, Gault MH. Nephron. 1976;16(1):31-41.",
  ],

  relatedCalculators: [
    "ckd-epi-2021",
    "cockcroft-gault",
    "urine-protein-creatinine-ratio",
    "albumin-creatinine-ratio",
  ],

  inputs: [
    {
      id: "urineCreatinine",
      label: "Urine Creatinine (24h)",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "urineVolume",
      label: "24-Hour Urine Volume",
      type: "number",
      unit: "mL/24h",
      required: true,
      min: 1,
    },
    {
      id: "serumCreatinine",
      label: "Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const ucr = positive(values, "urineCreatinine", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);
    const vol = positive(values, "urineVolume", "24-hour urine volume");
    if ("err" in vol) return critical(vol.err);
    const scr = positive(values, "serumCreatinine", "Serum creatinine");
    if ("err" in scr) return critical(scr.err);

    const crcl = (ucr.n * vol.n) / (scr.n * 1440);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (crcl >= 90) {
      interpretation =
        "CrCl ≥ 90 mL/min — normal creatinine clearance. Note: overestimates true GFR due to tubular creatinine secretion.";
      status = "normal";
      referenceRange = "≥90";
    } else if (crcl >= 60) {
      interpretation =
        "CrCl 60–89 mL/min — mildly reduced (CKD G2 range by estimated GFR); consider age-appropriate reference.";
      status = "high";
      referenceRange = "60–89";
    } else if (crcl >= 30) {
      interpretation =
        "CrCl 30–59 mL/min — moderately reduced (CKD G3 range); monitor and manage complications.";
      status = "high";
      referenceRange = "30–59";
    } else if (crcl >= 15) {
      interpretation =
        "CrCl 15–29 mL/min — severely reduced (CKD G4 range); prepare for renal replacement planning.";
      status = "critical";
      referenceRange = "15–29";
    } else {
      interpretation =
        "CrCl < 15 mL/min — kidney failure (CKD G5 range); evaluate for renal replacement therapy.";
      status = "critical";
      referenceRange = "<15";
    }

    return {
      value: Number(crcl.toFixed(1)),
      unit: "mL/min",
      interpretation,
      status,
      referenceRange,
      score: Number(crcl.toFixed(1)),
    };
  },
};
