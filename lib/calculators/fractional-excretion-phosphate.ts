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

export const fepCalculator: CalculatorDefinition = {
  id: "fractional-excretion-phosphate",

  slug: "fractional-excretion-phosphate",

  name: "Fractional Excretion of Phosphate (FEP)",

  shortName: "FEP",

  description:
    "Calculates the fractional excretion of phosphate (FEP) to localize the cause of hypophosphatemia: a high FEP indicates renal phosphate wasting, whereas a low FEP suggests redistribution or extrarenal loss.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Fractional Excretion of Phosphate",
    "FEP",
    "FEPO4",
    "Phosphate",
    "Phosphorus",
    "Hypophosphatemia",
    "Renal Phosphate Wasting",
    "FGF23",
    "Fanconi",
    "Nephrology",
  ],

  formula:
    "FEP (%) = (Urine Phosphate × Plasma Creatinine) ÷ (Serum Phosphate × Urine Creatinine) × 100",

  normalRange: "~10–20% in healthy adults; interpretation is most useful in hypophosphatemia",

  referenceRanges: [
    {
      label: "Non-renal cause of hypophosphatemia",
      range: "<5%",
      context: "during hypophosphatemia",
    },
    {
      label: "Renal phosphate wasting",
      range: "5–20%",
      context: "during hypophosphatemia",
    },
    {
      label: "Markedly elevated (pronounced renal wasting)",
      range: ">20%",
      context: "e.g., Fanconi syndrome, tumor-induced osteomalacia",
    },
  ],

  classification: [
    {
      label: "Non-renal cause (hypophosphatemia)",
      range: "<5%",
      max: 4.99,
      color: "green",
    },
    {
      label: "Renal phosphate wasting",
      range: "5–20%",
      min: 5,
      max: 20,
      color: "yellow",
    },
    {
      label: "Markedly elevated",
      range: ">20%",
      min: 20.01,
      color: "red",
    },
  ],



  clinicalNotes:
    "FEP estimates proximal tubular phosphate handling. It is most valuable in the evaluation of hypophosphatemia to separate renal phosphate wasting from redistribution or gastrointestinal losses.",





  comparison: undefined,

  references: [
    "Broadus AE, et al. J Clin Invest. 1983;72(1):119-126.",
    "Imel EA, Econs MJ. Approach to the hypophosphatemic patient. J Clin Endocrinol Metab. 2012;97(3):696-706.",
  ],

  relatedCalculators: [
    "fractional-excretion-calcium",
    "calcium-phosphate-product",
    "urine-anion-gap",
  ],

  inputs: [
    {
      id: "urinePhosphate",
      label: "Urine Phosphate",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "serumPhosphate",
      label: "Serum Phosphate",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "urineCr",
      label: "Urine Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "plasmaCr",
      label: "Plasma Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const up = positive(values, "urinePhosphate", "Urine phosphate");
    if ("err" in up) return critical(up.err);
    const sp = positive(values, "serumPhosphate", "Serum phosphate");
    if ("err" in sp) return critical(sp.err);
    const ucr = positive(values, "urineCr", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);
    const scr = positive(values, "plasmaCr", "Plasma creatinine");
    if ("err" in scr) return critical(scr.err);

    const fep = (up.n * scr.n) / (sp.n * ucr.n) * 100;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (fep < 5) {
      interpretation =
        "FEP < 5% — with hypophosphatemia this suggests a non-renal cause (redistribution or gastrointestinal loss).";
      status = "low";
      referenceRange = "<5%";
    } else if (fep <= 20) {
      interpretation =
        "FEP 5–20% — with hypophosphatemia this indicates renal phosphate wasting (e.g., FGF23 excess, Fanconi syndrome).";
      status = "normal";
      referenceRange = "5–20%";
    } else {
      interpretation =
        "FEP > 20% — pronounced renal phosphate wasting; consider Fanconi syndrome, tumor-induced osteomalacia, or primary FGF23-mediated disorders.";
      status = "high";
      referenceRange = ">20%";
    }

    return {
      value: Number(fep.toFixed(2)),
      unit: "%",
      interpretation,
      status,
      referenceRange,
      score: Number(fep.toFixed(2)),
    };
  },
};
