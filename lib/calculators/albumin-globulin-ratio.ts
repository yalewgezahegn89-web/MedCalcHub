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

export const albuminGlobulinRatioCalculator: CalculatorDefinition = {
  id: "albumin-globulin-ratio",

  slug: "albumin-globulin-ratio",

  name: "Albumin to Globulin Ratio (A/G)",

  shortName: "A/G Ratio",

  description:
    "Calculates the albumin to globulin ratio from serum albumin and total protein (A/G ratio = albumin / (total protein − albumin)). The ratio is used as a screening aid in the evaluation of liver disease, nephrotic syndrome, and monoclonal gammopathies, alongside the absolute albumin and globulin values.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Albumin",
    "Globulin",
    "A/G Ratio",
    "Total Protein",
    "Liver Disease",
    "Monoclonal Gammopathy",
    "Nephrotic Syndrome",
    "Serum Protein",
  ],

  formula:
    "Globulin = Total protein − Albumin; A/G ratio = Albumin ÷ Globulin",

  normalRange: "1.0–2.0 (reference varies by laboratory)",

  referenceRanges: [
    {
      label: "Low",
      range: "< 1.0",
      context: "typical adult reference",
    },
    {
      label: "Normal",
      range: "1.0–2.0",
      context: "typical adult reference",
    },
    {
      label: "High",
      range: "> 2.0",
      context: "typical adult reference",
    },
  ],

  classification: [
    {
      label: "Low",
      range: "<1.0",
      max: 0.99,
      color: "yellow",
    },
    {
      label: "Normal",
      range: "1.0–2.0",
      min: 1,
      max: 2,
      color: "green",
    },
    {
      label: "High",
      range: ">2.0",
      min: 2.01,
      color: "yellow",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Always interpret the A/G ratio alongside the absolute albumin and total protein values; a normal ratio can mask concurrent low albumin and low globulin.",
      "A low ratio (globulin predominance) may reflect reduced albumin (liver disease, nephrotic syndrome, malnutrition) or increased globulins (chronic inflammation, monoclonal gammopathy).",
      "Confirm the reference interval of the local laboratory, as normal ranges vary with the method used.",
    ],
    warnings: [
      "The ratio is a derived screening tool and cannot distinguish among the causes of hypoalbuminemia or hyperglobulinemia.",
      "Abnormal total protein with albumin within range suggests a globulin abnormality, not an albumin problem.",
      "Hemolyzed or improperly processed samples can artifactually alter measured protein fractions.",
    ],
    followUp: [
      "If the ratio is low, check the absolute values: serum protein electrophoresis is indicated when globulins are elevated.",
      "If the ratio is low from hypoalbuminemia, evaluate liver function, urine protein, and nutritional status.",
      "Repeat testing if the result is unexpected or inconsistent with the clinical picture.",
    ],
  },

  clinicalNotes:
    "The A/G ratio is a derived screening parameter from the basic metabolic chemistry panel and is most informative when the component values are reported together.",

  evidence: {
    source: "Standard clinical chemistry reference",
    reference:
      "Tietz Textbook of Clinical Chemistry and Molecular Diagnostics (Rifai N, Horvath AR, Wittwer CT, eds). Elsevier; 6th ed. 2018.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Rifai N, et al. Tietz Textbook of Clinical Chemistry. 6th ed. 2018.",
      "Busher JT. Serum albumin and globulin. In: Walker HK, Hall WD, Hurst JW, eds. Clinical Methods. 3rd ed. Butterworths; 1990.",
    ],
  },

  faq: [
    {
      question: "What does a low A/G ratio mean?",
      answer:
        "A low ratio means globulin predominates relative to albumin. It occurs with reduced albumin (liver disease, nephrotic syndrome, malnutrition, inflammation) or increased globulins (infection, autoimmune disease, multiple myeloma). The absolute values must be reviewed together.",
    },
    {
      question: "Why is the ratio also reported with the component values?",
      answer:
        "The ratio alone can be misleading. For example, a patient with both low albumin and low globulin may have a normal ratio despite significant hypoproteinemia. Always interpret the ratio with the absolute values.",
    },
    {
      question: "Is the A/G ratio reliable for screening for myeloma?",
      answer:
        "It is a useful trigger for further testing, but serum protein electrophoresis and immunofixation are the diagnostic tests for monoclonal gammopathies.",
    },
  ],

  comparison: undefined,

  references: [
    "Rifai N, et al. Tietz Textbook of Clinical Chemistry and Molecular Diagnostics. 6th ed. Elsevier; 2018.",
  ],

  relatedCalculators: [
    "corrected-calcium",
    "child-pugh",
    "meld",
    "fib-4",
  ],

  inputs: [
    {
      id: "albumin",
      label: "Serum Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 1,
    },
    {
      id: "totalProtein",
      label: "Total Protein",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const albumin = positive(values, "albumin", "Albumin");
    if ("err" in albumin) return critical(albumin.err);
    const total = positive(values, "totalProtein", "Total protein");
    if ("err" in total) return critical(total.err);

    const globulin = total.n - albumin.n;

    if (globulin <= 0) {
      return critical(
        "Globulin (total protein − albumin) must be positive. Check that total protein is greater than albumin.",
      );
    }

    const ratio = albumin.n / globulin;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (ratio < 1) {
      interpretation =
        "Low albumin to globulin ratio — globulins predominate. Review absolute albumin and total protein values.";
      status = "low";
      referenceRange = "<1.0";
    } else if (ratio <= 2) {
      interpretation = "Normal albumin to globulin ratio.";
      status = "normal";
      referenceRange = "1.0–2.0";
    } else {
      interpretation =
        "High albumin to globulin ratio — albumin predominates. Review absolute values; an elevated ratio is uncommon and often reflects low globulins.";
      status = "high";
      referenceRange = ">2.0";
    }

    return {
      value: Number(ratio.toFixed(2)),
      unit: "ratio",
      interpretation,
      status,
      referenceRange,
      globulin: Number(globulin.toFixed(2)),
    };
  },
};
