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

export const metabolicAlkalosisCompensationCalculator: CalculatorDefinition = {
  id: "metabolic-alkalosis-compensation",

  slug: "metabolic-alkalosis-compensation",

  name: "Metabolic Alkalosis Compensation (Expected PaCO₂)",

  shortName: "Metabolic Alkalosis Compensation",

  description:
    "Calculates the expected arterial PaCO₂ in metabolic alkalosis (PaCO₂ ≈ 40 + 0.6 × (HCO₃ − 24)) to assess whether respiratory compensation is appropriate or whether a concurrent respiratory disorder is present.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Metabolic Alkalosis",
    "Compensation",
    "Expected PaCO2",
    "Respiratory Compensation",
    "Acid Base",
    "Bicarbonate",
    "Mixed Acid Base Disorder",
    "Internal Medicine",
  ],

  formula:
    "Expected PaCO₂ = 40 + 0.6 × (HCO₃ − 24), capped near 55 mmHg; ±5 mmHg is considered appropriate compensation",

  normalRange: "PaCO₂ within ±5 mmHg of the expected value",

  referenceRanges: [
    {
      label: "Appropriate compensation",
      range: "expected PaCO₂ ±5 mmHg",
      context: "classic metabolic alkalosis rule",
    },
    {
      label: "Limits of compensation",
      range: "PaCO₂ rarely exceeds ~55 mmHg",
      context: "compensatory ceiling",
    },
  ],

  classification: [
    {
      label: "Appropriate respiratory compensation",
      range: "within ±5",
      color: "green",
    },
    {
      label: "Concurrent respiratory disorder possible",
      range: "outside ±5",
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use for patients with confirmed metabolic alkalosis (elevated HCO₃ with alkalemia).",
      "Expected PaCO₂ = 40 + 0.6 × (HCO₃ − 24); the measured PaCO₂ should be within ~5 mmHg of this value.",
      "If the measured PaCO₂ is well below expected, consider a concurrent respiratory alkalosis; if far above, consider a concurrent respiratory acidosis.",
    ],
    warnings: [
      "This formula requires HCO₃ > 24 mEq/L; it is not applicable to metabolic acidosis or to patients on ventilatory support with fixed ventilation.",
      "Compensation is capped — PaCO₂ rarely rises above ~55 mmHg regardless of the bicarbonate, so the formula is less reliable at extreme HCO₃ values.",
      "Chronic obstructive pulmonary disease or sedating medications can blunt the expected ventilatory response.",
    ],
    followUp: [
      "Investigate the cause of metabolic alkalosis (vomiting, diuretics, hyperaldosteronism, chloride depletion) and correct it.",
      "Re-evaluate the acid–base status after chloride and potassium repletion.",
    ],
  },

  clinicalNotes:
    "In metabolic alkalosis, hypoventilation is the physiologic compensation and produces a rise in PaCO₂ of roughly 0.6 mmHg per 1 mEq/L rise in bicarbonate. The respiratory response has a ceiling near 55 mmHg.",

  evidence: {
    source: "Classic acid–base physiology / expert-derived rule",
    reference:
      "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
      "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
    ],
  },

  faq: [
    {
      question: "Why is the expected PaCO₂ capped?",
      answer:
        "The ventilatory response has an upper limit — PaCO₂ rarely exceeds ~55 mmHg in pure metabolic alkalosis even at very high bicarbonates — so the linear rule flattens at the extreme.",
    },
    {
      question: "What does a PaCO₂ below expected suggest?",
      answer:
        "It suggests a coexisting respiratory alkalosis (e.g., pain, anxiety, hypoxemia, or over-breathing). A PaCO₂ well above expected suggests a coexisting respiratory acidosis.",
    },
  ],

  comparison: undefined,

  references: [
    "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
    "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
  ],

  relatedCalculators: [
    "respiratory-compensation",
    "anion-gap",
    "serum-osmolality",
  ],

  inputs: [
    {
      id: "bicarbonate",
      label: "Serum Bicarbonate (HCO₃)",
      type: "number",
      unit: "mEq/L",
      required: true,
      min: 1,
    },
    {
      id: "measuredPaCO2",
      label: "Measured Arterial PaCO₂",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const hco3 = positive(values, "bicarbonate", "Bicarbonate");
    if ("err" in hco3) return critical(hco3.err);
    const measuredPaco2 = positive(values, "measuredPaCO2", "Measured PaCO₂");
    if ("err" in measuredPaco2) return critical(measuredPaco2.err);

    if (hco3.n <= 24) {
      return critical(
        "This calculator applies to metabolic alkalosis (HCO₃ > 24 mEq/L). The entered bicarbonate is not consistent with metabolic alkalosis.",
      );
    }

    const expected = Math.min(40 + 0.6 * (hco3.n - 24), 55);
    const deviation = measuredPaco2.n - expected;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (deviation >= -5 && deviation <= 5) {
      interpretation = `Expected PaCO₂ = ${expected.toFixed(1)} mmHg. The measured value (${measuredPaco2.n.toFixed(1)}) is within ±5 mmHg — appropriate respiratory compensation for metabolic alkalosis.`;
      status = "normal";
      referenceRange = "within ±5";
    } else if (deviation < -5) {
      interpretation = `Expected PaCO₂ = ${expected.toFixed(1)} mmHg. The measured PaCO₂ (${measuredPaco2.n.toFixed(1)}) is more than 5 mmHg below expected — consider a concurrent respiratory alkalosis.`;
      status = "critical";
      referenceRange = "outside ±5";
    } else {
      interpretation = `Expected PaCO₂ = ${expected.toFixed(1)} mmHg. The measured PaCO₂ (${measuredPaco2.n.toFixed(1)}) is more than 5 mmHg above expected — consider a concurrent respiratory acidosis or a blunted ventilatory response.`;
      status = "critical";
      referenceRange = "outside ±5";
    }

    return {
      value: Number(expected.toFixed(1)),
      unit: "mmHg",
      interpretation,
      status,
      referenceRange,
      score: Number(deviation.toFixed(1)),
    };
  },
};
