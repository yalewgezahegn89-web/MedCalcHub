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

export const wintersFormulaCalculator: CalculatorDefinition = {
  id: "winters-formula",

  slug: "winters-formula",

  name: "Winter's Formula (Expected PaCO2 in Metabolic Acidosis)",

  shortName: "Winter's Formula",

  description:
    "Calculates the expected compensatory respiratory response to a primary metabolic acidosis: expected PaCO2 = 1.5 × HCO3 + 8 ± 2 mmHg. It is used to determine whether the respiratory response is appropriate, inadequate (respiratory acidosis), or excessive (respiratory alkalosis).",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Winter's Formula",
    "Winters",
    "PaCO2",
    "Metabolic Acidosis",
    "Respiratory Compensation",
    "Acid-Base",
    "ABG",
    "HCO3",
    "Renal Tubular Acidosis",
    "DKA",
  ],

  formula:
    "Expected PaCO2 (mmHg) = 1.5 × HCO3 (mEq/L) + 8 ± 2",

  normalRange: "Expected PaCO2 ± 2 mmHg",

  referenceRanges: [
    {
      label: "Appropriate compensation",
      range: "Measured PaCO2 within expected ± 2",
      context: "primary metabolic acidosis",
    },
    {
      label: "Inadequate compensation",
      range: "Measured PaCO2 above expected + 2",
      context: "concurrent respiratory acidosis",
    },
    {
      label: "Excessive compensation",
      range: "Measured PaCO2 below expected − 2",
      context: "concurrent respiratory alkalosis",
    },
  ],

  classification: [
    {
      label: "Low",
      range: "Measured PaCO2 below expected − 2 (excessive compensation)",
      color: "orange",
    },
    {
      label: "Normal",
      range: "Measured PaCO2 within expected ± 2",
      color: "green",
    },
    {
      label: "High",
      range: "Measured PaCO2 above expected + 2 (inadequate compensation)",
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Apply Winter's formula only when a primary metabolic acidosis is confirmed (low HCO3 with low pH).",
      "If the measured PaCO2 is lower than expected, compensation is appropriate; if higher, a concurrent respiratory acidosis exists; if lower than expected, a concurrent respiratory alkalosis exists.",
      "Use the equation with the limits (measured PaCO2 between expected + 2 and expected − 2) to allow for respiratory variability.",
    ],
    warnings: [
      "The formula is not valid in metabolic alkalosis or when HCO3 is normal or elevated.",
      "Compensation is a physiologic response — never assume a co-existing disorder without correlating with pH and clinical context.",
      "Rapidly changing acid-base status can make the ABG lag behind the chemistry panel.",
    ],
    followUp: [
      "If the measured PaCO2 exceeds the expected range, evaluate for respiratory acidosis (e.g., hypoventilation, neuromuscular disease, sedation).",
      "If the measured PaCO2 is below the expected range, evaluate for respiratory alkalosis (e.g., pain, hypoxia, sepsis).",
      "Recheck ABG and electrolytes after treating the underlying metabolic acidosis.",
    ],
  },

  clinicalNotes:
    "Winter's formula is a compensation equation: it predicts the physiologic ventilatory response (approximately 1.5 × HCO3 + 8 ± 2 mmHg), not a target to be achieved.",

  evidence: {
    source: "Original derivation (peer-reviewed)",
    reference:
      "Albert MS, Dell RB, Winters RW. Quantitative displacement of acid-base equilibrium in metabolic acidosis. Ann Intern Med. 1967;66(2):312-322.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Albert MS, et al. Ann Intern Med. 1967;66(2):312-322.",
      "Bushinsky DA. Acid-base. In: Brenner & Rector's The Kidney. Elsevier; 2020.",
    ],
  },

  faq: [
    {
      question: "When is Winter's formula used?",
      answer:
        "It is used in confirmed primary metabolic acidosis to check whether the respiratory compensation is appropriate, incomplete (suggesting concurrent respiratory acidosis), or excessive (suggesting concurrent respiratory alkalosis).",
    },
    {
      question: "What does an unexpectedly high PaCO2 mean?",
      answer:
        "If the measured PaCO2 is more than 2 mmHg above the expected value, compensation is inadequate, and a concurrent respiratory acidosis should be considered — for example, in patients who cannot mount a full ventilatory response.",
    },
    {
      question: "Does the formula apply in metabolic alkalosis?",
      answer:
        "No. Winter's formula applies only to primary metabolic acidosis. In metabolic alkalosis the expected compensation follows a different relationship (PaCO2 ≈ 0.7 × HCO3 + 20, capped at ~55 mmHg).",
    },
  ],

  comparison: undefined,

  references: [
    "Albert MS, Dell RB, Winters RW. Ann Intern Med. 1967;66(2):312-322.",
  ],

  relatedCalculators: [
    "anion-gap",
    "corrected-anion-gap",
    "anion-gap-delta-ratio",
  ],

  inputs: [
    {
      id: "bicarbonate",
      label: "Bicarbonate (HCO3)",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 1,
      max: 23,
      helpText: "Winter's formula applies only to metabolic acidosis (HCO3 < 24 mEq/L).",
    },
    {
      id: "pco2",
      label: "Measured PaCO2",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const hco3 = positive(values, "bicarbonate", "Bicarbonate");
    if ("err" in hco3) return critical(hco3.err);
    const pco2 = positive(values, "pco2", "PaCO2");
    if ("err" in pco2) return critical(pco2.err);

    if (hco3.n >= 24) {
      return critical(
        "Bicarbonate is ≥ 24 mEq/L — there is no metabolic acidosis, so Winter's formula is not applicable.",
      );
    }

    const expected = 1.5 * hco3.n + 8;
    const expectedRounded = Number(expected.toFixed(1));
    const low = expectedRounded - 2;
    const high = expectedRounded + 2;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (pco2.n > high) {
      interpretation = `Measured PaCO2 (${pco2.n} mmHg) is above the expected range (${low}–${high} mmHg) — compensation is inadequate; consider a concurrent respiratory acidosis.`;
      status = "high";
      referenceRange = `${low}–${high}`;
    } else if (pco2.n < low) {
      interpretation = `Measured PaCO2 (${pco2.n} mmHg) is below the expected range (${low}–${high} mmHg) — compensation is excessive; consider a concurrent respiratory alkalosis.`;
      status = "low";
      referenceRange = `${low}–${high}`;
    } else {
      interpretation = `Measured PaCO2 (${pco2.n} mmHg) is within the expected range (${low}–${high} mmHg) — appropriate respiratory compensation for the metabolic acidosis.`;
      status = "normal";
      referenceRange = `${low}–${high}`;
    }

    return {
      value: expectedRounded,
      unit: "mmHg",
      interpretation,
      status,
      referenceRange,
    };
  },
};
