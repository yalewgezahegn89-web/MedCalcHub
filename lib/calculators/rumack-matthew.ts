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



  clinicalNotes:
    "The Rumack-Matthew nomogram was published in 1975 (Pediatrics 55:871-876) and is the standard tool for determining NAC treatment in acute acetaminophen ingestion in the United States. The nomogram uses a semi-log plot of serum acetaminophen concentration versus time since ingestion, with a treatment line derived from reported cases of hepatotoxicity. The treatment line represents the minimum acetaminophen level associated with potential hepatotoxicity at each time point.",





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
