import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const laboratoryKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  "corrected-calcium": {
    category: "Laboratory",
    specialty: "Internal Medicine",
    description:
      "Calculates corrected serum calcium based on albumin concentration.",
    formula:
      "Corrected Calcium = Measured Calcium + 0.8 × (4 − Albumin)",
    normalRange:
      "8.5–10.5 mg/dL",
    clinicalGuidance: {
      advice: [
        "Corrected calcium adjusts for the effect of albumin on total calcium measurement.",
        "This correction is essential when albumin is low, as total calcium may appear falsely normal.",
      ],
      warnings: [
        "This correction assumes albumin of 4.0 g/dL as normal. It may not be accurate in hypoalbuminemia due to other causes.",
        "Ionized calcium measurement is preferred when available and is not affected by albumin.",
      ],
      followUp: [
        "If corrected calcium is abnormal, check ionized calcium and PTH levels.",
        "Consider vitamin D deficiency, malignancy, or primary hyperparathyroidism as causes.",
      ],
    },
    classification: [
      { max: 6.9, label: "Severe hypocalcemia", status: "critical" },
      { min: 7.0, max: 8.4, label: "Hypocalcemia", status: "low" },
      { min: 8.5, max: 10.5, label: "Normal", status: "normal" },
      { min: 10.6, max: 12.0, label: "Hypercalcemia", status: "high" },
      { min: 12.1, label: "Severe hypercalcemia", status: "critical" },
    ],
    relatedCalculators: [
      "anion-gap",
      "calcium-phosphate-product",
    ],
    faq: [
      {
        question: "Why correct calcium for albumin?",
        answer: "About 40% of serum calcium is bound to albumin. When albumin is low (e.g., in liver disease, nephrotic syndrome, malnutrition), total calcium appears falsely low. Corrected calcium estimates what the total calcium would be with a normal albumin.",
      },
      {
        question: "What is the corrected calcium formula?",
        answer: "Corrected Calcium = Measured Calcium + 0.8 × (4.0 − Measured Albumin). This assumes 4.0 g/dL is normal albumin.",
      },
    ],
    comparison: {
      title: "Calcium and Electrolyte Calculators",
      calculators: [
        { name: "Anion Gap", href: "/calculators/anion-gap", use: "Metabolic acidosis evaluation" },
        { name: "Calcium-Phosphate Product", href: "/calculators/calcium-phosphate-product", use: "Calcification risk" },
      ],
    },
    evidence: {
      source: "Clinical Guidelines",
      reference: "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990.",
      references: [
        "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990;27:497-503.",
        "Labriola L, et al. New formula for correcting total calcium for albumin. Nephrol Dial Transplant. 2007.",
      ],
    },
    keywords: [
      "corrected calcium",
      "albumin",
      "calcium",
      "laboratory",
      "electrolytes",
    ],
    inputs: [
      {
        id: "calcium",
        label: "Measured Calcium",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "albumin",
        label: "Albumin",
        type: "number",
        unit: "g/dL",
        required: true,
      },
    ],
  },
};