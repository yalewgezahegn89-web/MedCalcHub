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

export const urineOsmolalGapCalculator: CalculatorDefinition = {
  id: "urine-osmolal-gap",

  slug: "urine-osmolal-gap",

  name: "Urine Osmolal Gap (UOG)",

  shortName: "Urine Osmolal Gap",

  description:
    "Calculates the urine osmolal gap — the difference between measured and estimated urine osmolality — to detect unmeasured osmoles in the urine (e.g., ethylene glycol, mannitol, or other toxins).",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Urine Osmolal Gap",
    "UOG",
    "Urine Osmolality",
    "Osmolar Gap",
    "Unmeasured Osmoles",
    "Ethylene Glycol",
    "Mannitol",
    "Toxicity",
    "Nephrology",
  ],

  formula:
    "Estimated UOsm = 2 × (Urine Na + Urine K) + (Urine Urea ÷ 2.8) + (Urine Glucose ÷ 18); UOG = Measured UOsm − Estimated UOsm",

  normalRange: "Near zero (typically < 10 mOsm/kg) in health",

  referenceRanges: [
    {
      label: "Normal",
      range: "≤10 mOsm/kg",
      context: "no significant unmeasured osmoles",
    },
    {
      label: "Elevated (unmeasured osmoles)",
      range: ">10 mOsm/kg",
      context: "e.g., ethylene glycol, mannitol, low-molecular-weight alcohols",
    },
  ],

  classification: [
    {
      label: "Normal",
      range: "≤10",
      max: 10,
      color: "green",
    },
    {
      label: "Elevated (unmeasured osmoles)",
      range: ">10",
      min: 10.01,
      color: "red",
    },
  ],



  clinicalNotes:
    "The urine osmolal gap detects osmotically active solutes that are not routinely measured. It is a helpful adjunct when toxic alcohol poisoning is suspected and the serum osmolar gap is unreliable or negative.",





  comparison: undefined,

  references: [
    "Kraut JA, Kurtz I. Clin J Am Soc Nephrol. 2008;3(1):208-225.",
    "Hoffman RS, et al. Am J Emerg Med. 1993;11(5):543-547.",
  ],

  relatedCalculators: [
    "osmolar-gap",
    "serum-osmolality",
    "free-water-clearance",
    "electrolyte-free-water-clearance",
  ],

  inputs: [
    {
      id: "urineOsmolality",
      label: "Measured Urine Osmolality",
      type: "number",
      unit: "mOsm/kg",
      required: true,
      min: 1,
    },
    {
      id: "urineSodium",
      label: "Urine Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
    },
    {
      id: "urinePotassium",
      label: "Urine Potassium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
    },
    {
      id: "urineUrea",
      label: "Urine Urea",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
    {
      id: "urineGlucose",
      label: "Urine Glucose",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0,
    },
  ],

  calculate(values: Record<string, string>) {
    const uosm = positive(values, "urineOsmolality", "Measured urine osmolality");
    if ("err" in uosm) return critical(uosm.err);
    const una = nonNegative(values, "urineSodium", "Urine sodium");
    if ("err" in una) return critical(una.err);
    const uk = nonNegative(values, "urinePotassium", "Urine potassium");
    if ("err" in uk) return critical(uk.err);
    const uurea = nonNegative(values, "urineUrea", "Urine urea");
    if ("err" in uurea) return critical(uurea.err);
    const uglu = nonNegative(values, "urineGlucose", "Urine glucose");
    if ("err" in uglu) return critical(uglu.err);

    const calculatedOsm = 2 * (una.n + uk.n) + uurea.n / 2.8 + uglu.n / 18;
    const uog = uosm.n - calculatedOsm;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (uog <= 10) {
      interpretation =
        "Urine osmolal gap ≤ 10 mOsm/kg — no significant unmeasured osmoles detected.";
      status = "normal";
      referenceRange = "≤10";
    } else {
      interpretation =
        "Urine osmolal gap > 10 mOsm/kg — unmeasured osmoles present (e.g., ethylene glycol, methanol, mannitol). Confirm with specific assays.";
      status = "high";
      referenceRange = ">10";
    }

    return {
      value: Number(uog.toFixed(2)),
      unit: "mOsm/kg",
      interpretation,
      status,
      referenceRange,
      score: Number(uog.toFixed(2)),
    };
  },
};
