import type { CalculatorDefinition } from "./calculator.types";

export const correctedMagnesiumCalculator: CalculatorDefinition = {
  id: "corrected-magnesium",

  slug: "corrected-magnesium",

  name: "Corrected Magnesium (Albumin-Adjusted)",

  shortName: "Corrected Mg",

  description:
    "Adjusts measured serum magnesium for hypoalbuminemia. When serum albumin is low, measured total magnesium is falsely reduced because less magnesium is bound to proteins. This correction estimates the physiologically relevant magnesium level.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "Magnesium",
    "Albumin",
    "Hypomagnesemia",
    "Hypermagnesemia",
    "Electrolytes",
    "Hypoalbuminemia",
    "Corrected Magnesium",
    "Kroll",
    "Elin",
  ],

  formula:
    "Corrected Mg (mmol/L) = Measured Mg (mmol/L) + 0.005 × (40 − Albumin in g/L)",

  normalRange: "0.75–1.05 mmol/L",

  referenceRanges: [
    {
      label: "Severe hypomagnesemia",
      range: "<0.50",
      unit: "mmol/L",
    },
    {
      label: "Moderate hypomagnesemia",
      range: "0.50–0.65",
      unit: "mmol/L",
    },
    {
      label: "Mild hypomagnesemia",
      range: "0.66–0.74",
      unit: "mmol/L",
    },
    {
      label: "Normal magnesium",
      range: "0.75–1.05",
      unit: "mmol/L",
    },
    {
      label: "Mild hypermagnesemia",
      range: "1.06–1.50",
      unit: "mmol/L",
    },
    {
      label: "Moderate hypermagnesemia",
      range: "1.51–2.00",
      unit: "mmol/L",
    },
    {
      label: "Severe hypermagnesemia",
      range: ">2.00",
      unit: "mmol/L",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use this correction when serum albumin is low (e.g. critical illness, liver disease, nephrotic syndrome, malnutrition) and the measured total magnesium appears falsely low.",
      "The corrected magnesium is an estimate; direct ionized magnesium measurement is the gold standard when available.",
      "The correction assumes a normal albumin of 40 g/L (4.0 g/dL). Results become less reliable when albumin is extremely low (<20 g/L).",
    ],
    warnings: [
      "This correction is not validated in neonates or pediatric populations.",
      "Concurrent acid-base disturbances, hyperphosphatemia, and assay variability can reduce correction accuracy.",
      "Serum magnesium does not reflect intracellular levels; a normal serum level does not exclude total body magnesium depletion.",
      "The correction assumes a linear relationship between albumin and magnesium binding, which may not hold at extreme albumin values.",
    ],
    followUp: [
      "If corrected magnesium is low, evaluate for causes of hypomagnesemia (GI losses, renal wasting, medications, malnutrition).",
      "If corrected magnesium is high, evaluate for causes of hypermagnesemia (renal failure, excessive supplementation, magnesium-containing antacids).",
      "Consider measuring ionized magnesium directly when clinical suspicion is high and ionized testing is available.",
    ],
  },

  clinicalNotes:
    "Approximately 25–30% of serum magnesium binds to albumin. When albumin falls, measured total magnesium decreases proportionally even though ionized (biologically active) magnesium may remain normal. The Kroll-Elin correction normalizes the measured value to a reference albumin of 40 g/L. This is analogous to the well-established corrected calcium formula but uses a different coefficient reflecting magnesium's lower protein-binding fraction.",

  evidence: {
    source: "Clinical Chemistry",
    reference:
      "Kroll MH, Elin RJ. Relationships between magnesium and protein concentrations in serum. Clin Chem. 1985;31(2):326-327.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Kroll MH, Elin RJ. Relationships between magnesium and protein concentrations in serum. Clin Chem. 1985;31(2):326-327.",
      "Huijgen HJ, et al. The fraction of free magnesium in serum. Clin Chem Lab Med. 2000;38(12):1229-1233.",
      "Costello RB, et al. Perspective: The case for an evidence-based reference interval for serum magnesium. Adv Nutr. 2016;7(6):977-993.",
    ],
  },

  faq: [
    {
      question: "Why should I correct magnesium for albumin?",
      answer:
        "About 25–30% of serum magnesium is bound to albumin. When albumin is low (hypoalbuminemia), measured total magnesium appears falsely low even though ionized magnesium may be normal. The correction estimates what total magnesium would be at a normal albumin of 40 g/L.",
    },
    {
      question: "What does a corrected magnesium below normal mean?",
      answer:
        "A corrected magnesium below 0.75 mmol/L suggests true hypomagnesemia. Common causes include gastrointestinal losses (vomiting, diarrhea), renal wasting (diuretics), malnutrition, alcohol use disorder, and critical illness. Hypomagnesemia can cause cardiac arrhythmias, seizures, and refractory hypokalemia.",
    },
    {
      question: "Is ionized magnesium better than corrected magnesium?",
      answer:
        "Yes. Ionized (free) magnesium directly measures the biologically active fraction and is not affected by albumin. However, ionized magnesium assays require specialized analyzers that are not available in all clinical settings. The corrected magnesium is a practical alternative.",
    },
    {
      question: "How does this differ from corrected calcium?",
      answer:
        "Both correct for albumin-binding effects, but they use different coefficients. Calcium uses 0.8 (g/dL units) because ~40–50% of calcium binds to albumin. Magnesium uses 0.005 (g/L units) because only ~25–30% binds to albumin. They are distinct analytes with distinct clinical implications.",
    },
    {
      question: "When should I NOT use this correction?",
      answer:
        "Avoid using this correction in neonates (different binding dynamics), when ionized magnesium testing is available and reliable, or when acid-base disturbances or hyperphosphatemia are present (these alter magnesium binding independently of albumin).",
    },
  ],

  comparison: {
    title: "Albumin-Correction Calculators",
    calculators: [
      {
        name: "Corrected Magnesium",
        href: "/calculators/corrected-magnesium",
        bestFor: "Interpreting magnesium in hypoalbuminemic patients.",
        limitation: "Does not replace ionized magnesium measurement.",
      },
      {
        name: "Corrected Calcium",
        href: "/calculators/corrected-calcium",
        bestFor: "Correcting total calcium for hypoalbuminemia.",
        limitation: "Different analyte; does not assess magnesium status.",
      },
      {
        name: "Anion Gap",
        href: "/calculators/anion-gap",
        bestFor: "Screening for high anion gap metabolic acidosis.",
        limitation: "Does not directly assess magnesium.",
      },
    ],
  },

  references: [
    "Kroll MH, Elin RJ. Clin Chem. 1985;31(2):326-327.",
    "Huijgen HJ, et al. Clin Chem Lab Med. 2000;38(12):1229-1233.",
    "Costello RB, et al. Adv Nutr. 2016;7(6):977-993.",
  ],

  relatedCalculators: [
    "corrected-calcium",
    "anion-gap",
    "corrected-sodium",
  ],

  inputs: [
    {
      id: "magnesium",
      label: "Measured Serum Magnesium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
    },
    {
      id: "albumin",
      label: "Serum Albumin",
      type: "number",
      unit: "g/L",
      required: true,
      min: 0,
      max: 80,
      step: 0.1,
    },
  ],

  calculate(values: Record<string, string>) {
    if (values.magnesium === "" || values.magnesium === undefined) {
      return {
        value: 0,
        interpretation: "Measured Serum Magnesium is required.",
        status: "critical" as const,
      };
    }
    if (Number.isNaN(Number(values.magnesium))) {
      return {
        value: 0,
        interpretation: "Invalid Measured Serum Magnesium.",
        status: "critical" as const,
      };
    }
    if (Number(values.magnesium) < 0) {
      return {
        value: 0,
        interpretation: "Measured Serum Magnesium cannot be negative.",
        status: "critical" as const,
      };
    }
    if (Number(values.magnesium) === 0) {
      return {
        value: 0,
        interpretation: "Measured Serum Magnesium cannot be zero.",
        status: "critical" as const,
      };
    }

    if (values.albumin === "" || values.albumin === undefined) {
      return {
        value: 0,
        interpretation: "Serum Albumin is required.",
        status: "critical" as const,
      };
    }
    if (Number.isNaN(Number(values.albumin))) {
      return {
        value: 0,
        interpretation: "Invalid Serum Albumin.",
        status: "critical" as const,
      };
    }
    if (Number(values.albumin) < 0) {
      return {
        value: 0,
        interpretation: "Serum Albumin cannot be negative.",
        status: "critical" as const,
      };
    }
    if (Number(values.albumin) === 0) {
      return {
        value: 0,
        interpretation: "Serum Albumin cannot be zero.",
        status: "critical" as const,
      };
    }

    const magnesium = Number(values.magnesium);
    const albumin = Number(values.albumin);

    const result = magnesium + 0.005 * (40 - albumin);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (result < 0.5) {
      interpretation =
        "Severe hypomagnesemia. Urgent magnesium replacement is typically indicated. Evaluate for underlying causes and monitor for cardiac arrhythmias and seizures.";
      status = "critical";
    } else if (result <= 0.65) {
      interpretation =
        "Moderate hypomagnesemia. Magnesium supplementation is usually warranted. Investigate renal wasting, GI losses, or inadequate intake.";
      status = "high";
    } else if (result < 0.75) {
      interpretation =
        "Mild hypomagnesemia. Consider supplementation if symptomatic or if concurrent hypokalemia or hypocalcemia is present.";
      status = "high";
    } else if (result <= 1.05) {
      interpretation =
        "Normal corrected magnesium. No indication for magnesium supplementation based on this value alone.";
      status = "normal";
    } else if (result <= 1.5) {
      interpretation =
        "Mild hypermagnesemia. Usually asymptomatic. Check renal function and review magnesium-containing medications or supplements.";
      status = "low";
    } else if (result <= 2.0) {
      interpretation =
        "Moderate hypermagnesemia. Monitor for hypotension, bradycardia, and diminished deep tendon reflexes. Evaluate renal function.";
      status = "high";
    } else {
      interpretation =
        "Severe hypermagnesemia. Risk of respiratory failure, cardiac arrest, and complete heart block. Urgent intervention may be required.";
      status = "critical";
    }

    const referenceRange = "0.75–1.05 mmol/L";

    return {
      value: Number(result.toFixed(2)),
      interpretation,
      status,
      referenceRange,
    };
  },
};
