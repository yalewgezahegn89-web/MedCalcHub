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

export const fecaCalculator: CalculatorDefinition = {
  id: "fractional-excretion-calcium",

  slug: "fractional-excretion-calcium",

  name: "Fractional Excretion of Calcium (FECa / Calcium–Creatinine Clearance Ratio)",

  shortName: "FECa",

  description:
    "Calculates the fractional excretion of calcium (calcium–creatinine clearance ratio, CCCR) to help distinguish familial hypocalciuric hypercalcemia (FHH) from primary hyperparathyroidism in patients with hypercalcemia and non-suppressed PTH.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Fractional Excretion of Calcium",
    "FECa",
    "Calcium Creatinine Clearance Ratio",
    "CCCR",
    "Familial Hypocalciuric Hypercalcemia",
    "FHH",
    "Primary Hyperparathyroidism",
    "Hypercalcemia",
    "Nephrology",
  ],

  formula:
    "FECa (%) = (Urine Calcium × Plasma Creatinine) ÷ (Serum Calcium × Urine Creatinine) × 100",

  normalRange: "FECa < 1% (CCCR < 0.01) suggests FHH; CCCR < 0.02 captures ~98% of FHH",

  referenceRanges: [
    {
      label: "FHH likely (CCCR < 0.01)",
      range: "<1%",
      context: "hypercalcemia with PTH-dependent disease",
    },
    {
      label: "Gray zone (some FHH)",
      range: "1–2%",
      context: "consider genetic testing if suspicion high",
    },
    {
      label: "Primary hyperparathyroidism more likely",
      range: ">2%",
      context: "PTH-dependent hypercalcemia",
    },
  ],

  classification: [
    {
      label: "FHH likely",
      range: "<1%",
      max: 0.99,
      color: "green",
    },
    {
      label: "Gray zone",
      range: "1–2%",
      min: 1,
      max: 2,
      color: "yellow",
    },
    {
      label: "Primary hyperparathyroidism more likely",
      range: ">2%",
      min: 2.01,
      color: "red",
    },
  ],



  clinicalNotes:
    "FECa is the renal calcium clearance expressed relative to creatinine clearance. In FHH, the calcium-sensing receptor is reset, causing relative hypocalciuria despite hypercalcemia. NICE recommends measuring urine calcium excretion (including the calcium:creatinine clearance ratio) to exclude FHH before proceeding to surgery for primary hyperparathyroidism.",





  comparison: undefined,

  references: [
    "Christiansen C, et al. Clin Endocrinol (Oxf). 2008;69(4):572-578.",
    "Marx SJ. Familial hypocalciuric hypercalcemia. StatPearls. 2024.",
  ],

  relatedCalculators: [
    "urine-protein-creatinine-ratio",
    "calcium-phosphate-product",
    "corrected-calcium",
  ],

  inputs: [
    {
      id: "urineCalcium",
      label: "Urine Calcium",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
    },
    {
      id: "serumCalcium",
      label: "Serum Calcium",
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
    const uca = positive(values, "urineCalcium", "Urine calcium");
    if ("err" in uca) return critical(uca.err);
    const sca = positive(values, "serumCalcium", "Serum calcium");
    if ("err" in sca) return critical(sca.err);
    const ucr = positive(values, "urineCr", "Urine creatinine");
    if ("err" in ucr) return critical(ucr.err);
    const scr = positive(values, "plasmaCr", "Plasma creatinine");
    if ("err" in scr) return critical(scr.err);

    const feca = (uca.n * scr.n) / (sca.n * ucr.n) * 100;
    const cccr = feca / 100;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (feca < 1) {
      interpretation =
        "FECa < 1% (CCCR < 0.01) — relative hypocalciuria; familial hypocalciuric hypercalcemia (FHH) is likely. Exclude vitamin D deficiency, thiazides, and lithium.";
      status = "low";
      referenceRange = "<1%";
    } else if (feca <= 2) {
      interpretation =
        "FECa 1–2% (CCCR 0.01–0.02) — gray zone; some FHH patients fall in this range. Consider CASR gene testing if FHH is suspected.";
      status = "normal";
      referenceRange = "1–2%";
    } else {
      interpretation =
        "FECa > 2% (CCCR > 0.02) — primary hyperparathyroidism is more likely in PTH-dependent hypercalcemia. FHH is less probable.";
      status = "high";
      referenceRange = ">2%";
    }

    return {
      value: Number(feca.toFixed(2)),
      unit: "%",
      interpretation,
      status,
      referenceRange,
      score: Number(cccr.toFixed(4)),
    };
  },
};
