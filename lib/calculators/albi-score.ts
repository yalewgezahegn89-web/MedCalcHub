import type { CalculatorDefinition } from "./calculator.types";

export const albiScoreCalculator: CalculatorDefinition = {
  id: "albi-score",

  slug: "albi-score",

  name: "ALBI Score (Albumin-Bilirubin)",

  shortName: "ALBI Score",

  description:
    "Objective prognostic assessment of liver function using serum albumin and bilirubin. Primarily validated in hepatocellular carcinoma (HCC) for stratifying prognosis and guiding treatment decisions.",

  category: "Gastroenterology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "ALBI",
    "Albumin",
    "Bilirubin",
    "Liver Function",
    "HCC",
    "Hepatocellular Carcinoma",
    "Prognosis",
    "Gastroenterology",
    "Hepatology",
  ],

  formula:
    "ALBI = (log10(bilirubin [µmol/L]) × −0.372) + (albumin [g/L] × −0.198) + 4.90",

  normalRange: "Grade I (≤ −2.60)",

  referenceRanges: [
    {
      label: "Grade I (best prognosis)",
      range: "≤ −2.60",
    },
    {
      label: "Grade II (intermediate prognosis)",
      range: "−2.60 to −1.39",
    },
    {
      label: "Grade III (worst prognosis)",
      range: "> −1.39",
    },
  ],

  clinicalGuidance: {
    advice: [
      "ALBI Grade I (≤ −2.60): Best liver function. Favorable prognosis. May be candidates for curative therapies (resection, transplantation, ablation).",
      "ALBI Grade II (−2.60 to −1.39): Intermediate liver function. Intermediate prognosis. Treatment decisions should incorporate tumor stage, performance status, and comorbidities.",
      "ALBI Grade III (> −1.39): Worst liver function. Poor prognosis. Consider systemic therapy or best supportive care rather than aggressive locoregional treatments.",
      "ALBI score is objective and reproducible, unlike the Child-Pugh score which incorporates subjective components (ascites, encephalopathy grading).",
    ],
    warnings: [
      "ALBI was primarily validated in HCC patients. Use in non-HCC liver disease should be interpreted with caution.",
      "ALBI does not account for portal hypertension complications (varices, ascites) or hepatic encephalopathy.",
      "Extreme values of albumin (<20 g/L or >55 g/L) or bilirubin (<5 or >500 µmol/L) may produce less reliable results.",
      "This calculator does not replace comprehensive clinical assessment for treatment decisions in liver disease.",
    ],
    followUp: [
      "ALBI Grade I: Proceed with curative treatment if tumor staging is appropriate. Reassess ALBI periodically.",
      "ALBI Grade II: Multidisciplinary tumor board discussion recommended. Consider locoregional therapy if liver function permits.",
      "ALBI Grade III: Consider systemic therapy options with favorable safety profiles. Implement supportive care measures. Palliative care referral may be appropriate.",
    ],
  },

  clinicalNotes:
    "The ALBI score was published by Johnson et al. in 2014 (J Clin Oncol 32:3378-3386) as an objective alternative to the Child-Pugh score for assessing liver function in HCC. Unlike Child-Pugh, ALBI uses only two objective laboratory values (albumin and bilirubin), eliminating the subjective components of ascites, encephalopathy, and nutritional status. ALBI has been validated in multiple international cohorts and is increasingly incorporated into HCC staging systems and treatment algorithms.",

  evidence: {
    source: "Gastroenterology",
    reference:
      "Johnson PJ, Berhane S, Kagebayashi C, et al. Assessment of liver function in patients with hepatocellular carcinoma: a new evidence-based approach — the ALBI grade. J Clin Oncol. 2015;33(6):550-558.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Johnson PJ, Berhane S, Kagebayashi C, et al. J Clin Oncol. 2015;33(6):550-558.",
      "Chan AWH, Kumada T, Toyoda H, et al. Integration of albumin-bilirubin score into Barcelona Clinic Liver Cancer staging system for hepatocellular carcinoma. Hepatology. 2021;73(1):123-133.",
      "Hiraoka A, Kumada T, Kudo M, et al. Albumin-Bilirubin (ALBI) Grade as an Alternative to Child-Pugh Score for Classification of Liver Function in Hepatocellular Carcinoma. Liver Cancer. 2017;6(2):112-119.",
    ],
  },

  faq: [
    {
      question: "What is the ALBI score?",
      answer:
        "The ALBI (Albumin-Bilirubin) score is an objective prognostic tool for assessing liver function using only serum albumin and bilirubin. It was developed as a more reproducible alternative to the Child-Pugh score, eliminating subjective components like ascites and encephalopathy grading.",
    },
    {
      question: "What are the ALBI grades?",
      answer:
        "ALBI Grade I (≤ −2.60): Best prognosis, ~25% 1-year mortality. ALBI Grade II (−2.60 to −1.39): Intermediate prognosis, ~50% 1-year mortality. ALBI Grade III (> −1.39): Worst prognosis, ~75% 1-year mortality. These were derived from HCC patient cohorts.",
    },
    {
      question: "How does ALBI compare to Child-Pugh?",
      answer:
        "ALBI uses only two objective lab values (albumin and bilirubin), while Child-Pugh includes subjective components (ascites, encephalopathy, nutritional status). ALBI is more reproducible and has been shown to predict outcomes similarly or better than Child-Pugh in HCC patients.",
    },
    {
      question: "Can ALBI be used for non-HCC liver disease?",
      answer:
        "ALBI was primarily validated in HCC patients. While it may provide useful prognostic information in other liver diseases (cirrhosis, hepatitis), its use outside HCC should be interpreted with caution as it has not been as extensively validated in these populations.",
    },
    {
      question: "What units does the ALBI formula use?",
      answer:
        "The ALBI formula uses bilirubin in µmol/L (SI units; multiply mg/dL by 17.1 to convert) and albumin in g/L (multiply g/dL by 10 to convert).",
    },
  ],

  comparison: {
    title: "Liver Function Assessment Tools",
    calculators: [
      {
        name: "ALBI Score",
        href: "/calculators/albi-score",
        bestFor:
          "Objective, reproducible liver function assessment in HCC patients.",
        limitation:
          "Primarily validated in HCC; does not account for portal hypertension or encephalopathy.",
      },
      {
        name: "Child-Pugh Score",
        href: "/calculators/child-pugh",
        bestFor:
          "Comprehensive liver function assessment including clinical features (ascites, encephalopathy).",
        limitation:
          "Includes subjective components; less reproducible than ALBI.",
      },
      {
        name: "MELD Score",
        href: "/calculators/meld-score",
        bestFor:
          "Short-term mortality prediction and transplant prioritization.",
        limitation:
          "Focused on short-term prognosis rather than overall liver function classification.",
      },
    ],
  },

  relatedCalculators: [
    "child-pugh",
    "meld-score",
    "meld-na-score",
    "apri-score",
    "fib-4-index",
    "albumin-globulin-ratio",
  ],

  inputs: [
    {
      id: "bilirubin",
      label: "Total Bilirubin",
      type: "number",
      unit: "µmol/L",
      required: true,
      min: 0,
      max: 1000,
      step: 0.1,
      helpText:
        "Total serum bilirubin in µmol/L. For mg/dL, multiply by 17.1 to convert.",
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
      helpText:
        "Serum albumin in g/L. For g/dL, multiply by 10 to convert.",
    },
  ],

  calculate(values: Record<string, string>) {
    const bilirubinRaw = values.bilirubin;
    const albuminRaw = values.albumin;

    if (bilirubinRaw === "" || bilirubinRaw === undefined) {
      return {
        value: 0,
        interpretation: "Bilirubin is required.",
        status: "critical" as const,
      };
    }
    if (albuminRaw === "" || albuminRaw === undefined) {
      return {
        value: 0,
        interpretation: "Albumin is required.",
        status: "critical" as const,
      };
    }

    const bilirubin = Number(bilirubinRaw);
    const albumin = Number(albuminRaw);

    if (Number.isNaN(bilirubin) || Number.isNaN(albumin)) {
      return {
        value: 0,
        interpretation: "Both values must be valid numbers.",
        status: "critical" as const,
      };
    }
    if (bilirubin <= 0 || albumin <= 0) {
      return {
        value: 0,
        interpretation: "Both bilirubin and albumin must be greater than zero.",
        status: "critical" as const,
      };
    }

    const albi =
      Math.round(
        (Math.log10(bilirubin) * -0.372 + albumin * -0.198 + 4.90) * 100
      ) / 100;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let grade: string;

    if (albi <= -2.6) {
      grade = "Grade I";
      interpretation =
        `ALBI score = ${albi.toFixed(2)} (Grade I — best prognosis). Estimated 1-year survival approximately 75%. This patient has preserved liver function and may be a candidate for curative therapies (resection, transplantation, ablation) if tumor staging is appropriate.`;
      status = "normal";
    } else if (albi <= -1.39) {
      grade = "Grade II";
      interpretation =
        `ALBI score = ${albi.toFixed(2)} (Grade II — intermediate prognosis). Estimated 1-year survival approximately 50%. Treatment decisions should incorporate tumor stage, performance status, and comorbidities. Multidisciplinary tumor board discussion is recommended.`;
      status = "low";
    } else {
      grade = "Grade III";
      interpretation =
        `ALBI score = ${albi.toFixed(2)} (Grade III — worst prognosis). Estimated 1-year survival approximately 25%. Consider systemic therapy with favorable safety profiles or best supportive care. Aggressive locoregional treatments may carry higher risk of liver decompensation.`;
      status = "critical";
    }

    return {
      value: albi,
      interpretation,
      status,
      referenceRange: `ALBI Grade I ≤ −2.60 | Grade II −2.60 to −1.39 | Grade III > −1.39 (${grade})`,
    };
  },
};
