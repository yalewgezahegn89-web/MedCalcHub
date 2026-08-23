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



  clinicalNotes:
    "Approximately 25–30% of serum magnesium binds to albumin. When albumin falls, measured total magnesium decreases proportionally even though ionized (biologically active) magnesium may remain normal. The Kroll-Elin correction normalizes the measured value to a reference albumin of 40 g/L. This is analogous to the well-established corrected calcium formula but uses a different coefficient reflecting magnesium's lower protein-binding fraction.",





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
