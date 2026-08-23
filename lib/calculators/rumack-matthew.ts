import type { CalculatorDefinition } from "./calculator.types";

export const rumackMatthewCalculator: CalculatorDefinition = {
  id: "rumack-matthew",

  slug: "rumack-matthew",

  name: "Rumack-Matthew Acetaminophen Nomogram",

  shortName: "Rumack-Matthew",

  description:
    "Determines whether N-acetylcysteine (NAC) treatment is indicated following a single acute acetaminophen (paracetamol) ingestion, based on the serum acetaminophen concentration and time since ingestion.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "Acetaminophen",
    "Paracetamol",
    "Rumack",
    "Matthew",
    "Nomogram",
    "NAC",
    "N-Acetylcysteine",
    "Overdose",
    "Toxicology",
    "Poisoning",
    "Emergency",
  ],

  formula:
    "Treatment threshold (mcg/mL) = exp(5.3325 − 0.0805 × hours since ingestion). Valid for 4–24 hours post single acute ingestion.",

  normalRange: "Below treatment line",

  referenceRanges: [
    {
      label: "Below treatment line",
      range: "Level < threshold at given time",
    },
    {
      label: "Above treatment line",
      range: "Level ≥ threshold at given time",
    },
  ],

  clinicalGuidance: {
    advice: [
      "The Rumack-Matthew nomogram applies only to a single acute ingestion with a known time of ingestion.",
      "Obtain a serum acetaminophen level at 4 or more hours after ingestion.",
      "If the level is at or above the treatment line at the given time, initiate NAC therapy.",
      "If the level is below the treatment line and no other concerning features are present, NAC is not indicated.",
      "Clinical toxicology consultation supersedes this calculator when clinical judgment or applicability is uncertain.",
    ],
    warnings: [
      "This nomogram does NOT apply to: repeated supratherapeutic ingestions, chronic ingestion, staggered ingestions, or unknown time of ingestion.",
      "For repeated or staggered ingestion, treat with NAC regardless of acetaminophen level (consult toxicology).",
      "The nomogram assumes the patient presents within 24 hours of ingestion. Levels obtained after 24 hours require clinical judgment.",
      "Patients presenting with hepatotoxicity (elevated AST/ALT, INR, or acidosis) should be treated with NAC regardless of level or timing.",
      "This calculator is an adjunct to clinical decision-making, not a replacement for clinical toxicology consultation.",
    ],
    followUp: [
      "If NAC is indicated: administer per institutional protocol (21-hour IV protocol or 72-hour oral protocol).",
      "Monitor hepatic function (AST, ALT, INR, bilirubin) serially for 24–72 hours.",
      "Repeat acetaminophen level at 4–6 hours if initial level was obtained before 4 hours post-ingestion.",
      "Refer to hepatology if hepatotoxicity develops (elevated INR, encephalopathy, or multi-organ failure).",
    ],
  },

  clinicalNotes:
    "The Rumack-Matthew nomogram was published in 1975 (Pediatrics 55:871-876) and is the standard tool for determining NAC treatment in acute acetaminophen ingestion in the United States. The nomogram uses a semi-log plot of serum acetaminophen concentration versus time since ingestion, with a treatment line derived from reported cases of hepatotoxicity. The treatment line represents the minimum acetaminophen level associated with potential hepatotoxicity at each time point.",

  evidence: {
    source: "Emergency Medicine",
    reference:
      "Rumack BH, Matthew H. Acetaminophen poisoning and toxicity. Pediatrics. 1975;55(6):871-876.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Rumack BH, Matthew H. Pediatrics. 1975;55(6):871-876.",
      "Smilkstein MJ, Knapp GL, Kulig KW, Rumack BH. Efficacy of oral N-acetylcysteine in the treatment of acetaminophen overdose. N Engl J Med. 1988;319(24):1557-1562.",
      "Dart RC, Erdman AR, Olson KR, et al. ACMT and AACT guidelines: Acetaminophen overdose: An evidence-based consensus guideline for out-of-hospital management. Clin Toxicol. 2006;44(1):1-18.",
    ],
  },

  faq: [
    {
      question: "What is the Rumack-Matthew nomogram?",
      answer:
        "The Rumack-Matthew nomogram is a graphical tool that plots serum acetaminophen concentration against time since ingestion. A treatment line defines the threshold above which N-acetylcysteine (NAC) treatment is recommended to prevent hepatotoxicity.",
    },
    {
      question: "When is the nomogram applicable?",
      answer:
        "The nomogram is applicable ONLY for a single acute ingestion (one time ingestion) with a KNOWN time of ingestion. It is valid for serum levels obtained 4 to 24 hours after ingestion. It does NOT apply to repeated ingestions, chronic use, or staggered ingestions.",
    },
    {
      question: "What if the time of ingestion is unknown?",
      answer:
        "If the time of ingestion is unknown, the nomogram cannot be used. In this case, obtain acetaminophen level, hepatic function tests (AST, ALT, INR), and renal function. Treat with NAC if there is any concern for toxicity, and consult toxicology.",
    },
    {
      question: "What if the level is obtained before 4 hours?",
      answer:
        "Levels obtained before 4 hours post-ingestion may not have peaked and are unreliable for ruling out toxicity. Repeat the level at 4 hours or later. If there is clinical concern, start NAC and recheck.",
    },
    {
      question: "Does this nomogram apply to sustained-release acetaminophen?",
      answer:
        "The nomogram is not validated for sustained-release formulations. For sustained-release ingestion, consider prolonged monitoring and consult toxicology, as peak levels may be delayed.",
    },
  ],

  comparison: {
    title: "Acetaminophen Overdose Assessment Tools",
    calculators: [
      {
        name: "Rumack-Matthew Nomogram",
        href: "/calculators/rumack-matthew",
        bestFor:
          "Determining NAC treatment in single acute acetaminophen ingestion.",
        limitation:
          "Only applicable for single acute ingestion with known timing, 4–24 hours post-ingestion.",
      },
      {
        name: "MELD Score",
        href: "/calculators/meld-score",
        bestFor:
          "Assessing liver disease severity once hepatotoxicity has developed.",
        limitation:
          "Does not guide initial NAC treatment decisions in acetaminophen overdose.",
      },
      {
        name: "King's College Criteria",
        href: "/calculators/meld-score",
        bestFor:
          "Determining need for liver transplant in acetaminophen-induced acute liver failure.",
        limitation:
          "Applied after hepatotoxicity develops; does not replace early NAC treatment decisions.",
      },
    ],
  },

  relatedCalculators: [
    "meld-score",
    "meld-na-score",
    "child-pugh",
    "grace",
    "heart-score",
  ],

  inputs: [
    {
      id: "time-since-ingestion",
      label: "Time Since Ingestion",
      type: "number",
      unit: "hours",
      required: true,
      min: 0,
      max: 72,
      step: 0.5,
      helpText:
        "Hours since single acute ingestion. Nomogram valid for 4–24 hours only.",
    },
    {
      id: "acetaminophen-level",
      label: "Serum Acetaminophen Level",
      type: "number",
      unit: "mcg/mL",
      required: true,
      min: 0,
      max: 3000,
      step: 1,
      helpText:
        "Serum acetaminophen (paracetamol) concentration in mcg/mL (equivalent to mg/L in SI units).",
    },
  ],

  calculate(values: Record<string, string>) {
    const timeRaw = values["time-since-ingestion"];
    const levelRaw = values["acetaminophen-level"];

    if (timeRaw === "" || timeRaw === undefined) {
      return {
        value: 0,
        interpretation:
          "Time since ingestion is required. The nomogram cannot be applied without knowing when the ingestion occurred.",
        status: "critical" as const,
      };
    }
    if (levelRaw === "" || levelRaw === undefined) {
      return {
        value: 0,
        interpretation:
          "Serum acetaminophen level is required.",
        status: "critical" as const,
      };
    }

    const time = Number(timeRaw);
    const level = Number(levelRaw);

    if (Number.isNaN(time) || Number.isNaN(level)) {
      return {
        value: 0,
        interpretation:
          "Both time and level must be valid numbers.",
        status: "critical" as const,
      };
    }
    if (time <= 0) {
      return {
        value: 0,
        interpretation:
          "Time since ingestion must be greater than zero.",
        status: "critical" as const,
      };
    }
    if (level <= 0) {
      return {
        value: 0,
        interpretation:
          "Acetaminophen level must be greater than zero.",
        status: "critical" as const,
      };
    }

    if (time < 4) {
      return {
        value: level,
        interpretation:
          `Time since ingestion is ${time.toFixed(1)} hours. The Rumack-Matthew nomogram is not valid before 4 hours post-ingestion because acetaminophen absorption may not be complete. Repeat the level at 4 hours or later. If there is clinical concern for toxicity, initiate NAC treatment.`,
        status: "critical" as const,
      };
    }

    if (time > 24) {
      return {
        value: level,
        interpretation:
          `Time since ingestion is ${time.toFixed(1)} hours, which exceeds the 24-hour nomogram window. The nomogram cannot reliably guide treatment decisions this late. If there is any concern for acetaminophen toxicity (hepatotoxicity, elevated LFTs, INR), treat with NAC and consult toxicology.`,
        status: "critical" as const,
      };
    }

    const threshold =
      Math.round(Math.exp(5.33252 - 0.08047 * time) * 10) / 10;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (level >= threshold) {
      interpretation =
        `Serum level ${level.toFixed(0)} mcg/mL at ${time.toFixed(1)} hours is AT OR ABOVE the treatment threshold of ${threshold.toFixed(1)} mcg/mL. Initiate N-acetylcysteine (NAC) therapy per institutional protocol. Monitor hepatic function serially.`;
      status = "critical";
    } else {
      interpretation =
        `Serum level ${level.toFixed(0)} mcg/mL at ${time.toFixed(1)} hours is BELOW the treatment threshold of ${threshold.toFixed(1)} mcg/mL. N-acetylcysteine (NAC) treatment is NOT indicated for this single acute ingestion with known timing. If clinical concern persists, repeat level and consult toxicology.`;
      status = "normal";
    }

    return {
      value: threshold,
      interpretation,
      status,
      referenceRange: `Treatment threshold at ${time.toFixed(1)}h: ${threshold.toFixed(1)} mcg/mL`,
    };
  },
};
