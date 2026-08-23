import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export const sirsCriteriaCalculator: CalculatorDefinition = {
  id: "sirs-criteria",

  slug: "sirs-criteria",

  name: "SIRS Criteria",

  shortName: "SIRS",

  description:
    "Systemic Inflammatory Response Syndrome (SIRS) criteria — the presence of two or more criteria (temperature, heart rate, respiratory rate, white blood cell count) indicates SIRS.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["SIRS", "Sepsis", "Systemic Inflammatory Response Syndrome", "Infection", "Emergency", "WBC", "Fever"],

  formula:
    "Criteria met: temperature >38 °C or <36 °C (+1) + heart rate >90/min (+1) + respiratory rate >20/min or PaCO2 <32 mmHg (+1) + WBC >12,000 or <4,000/µL or >10% bands (+1)",

  normalRange: "0–4 criteria",

  referenceRanges: [],



  clinicalNotes:
    "SIRS is present when ≥2 of 4 criteria are met. Sepsis is SIRS plus a confirmed or suspected source of infection. Note: the Sepsis-3 consensus now defines sepsis as life-threatening organ dysfunction (SOFA increase ≥2) and no longer requires SIRS criteria, but SIRS remains useful for early recognition and screening.",





  comparison: undefined,

  references: [
    "Bone RC, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. Chest. 1992;101(6):1644-1655.",
    "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
  ],

  relatedCalculators: ["qsofa", "sofa-score"],

  inputs: [
  {
    id: "temperature",
    label: "Temperature",
    type: "number",
    unit: "°C",
    required: true,
    min: 30,
    max: 44,
    step: 0.1,
  },
  {
    id: "heart-rate",
    label: "Heart rate",
    type: "number",
    unit: "bpm",
    required: true,
    min: 20,
    max: 300,
    step: 1,
  },
  {
    id: "respiratory-rate",
    label: "Respiratory rate",
    type: "number",
    unit: "breaths/min",
    required: true,
    min: 4,
    max: 80,
    step: 1,
  },
  {
    id: "wbc",
    label: "White blood cell count",
    type: "number",
    unit: "×10⁹/L",
    required: true,
    min: 0,
    max: 200,
    step: 0.1,
  }
],

  calculate(values: Record<string, string>) {
    const temperature = readNumber(values["temperature"], "Temperature");
    if (temperature === null) {
      return critical("Temperature is required.");
    }
    if (temperature < 30 || temperature > 44) {
      return critical("Temperature must be between 30 and 44 °C.");
    }

    const heartRate = readNumber(values["heart-rate"], "Heart rate");
    if (heartRate === null) {
      return critical("Heart rate is required.");
    }
    if (heartRate < 20 || heartRate > 300) {
      return critical("Heart rate must be between 20 and 300 bpm.");
    }

    const respiratoryRate = readNumber(values["respiratory-rate"], "Respiratory rate");
    if (respiratoryRate === null) {
      return critical("Respiratory rate is required.");
    }
    if (respiratoryRate < 4 || respiratoryRate > 80) {
      return critical("Respiratory rate must be between 4 and 80 breaths/min.");
    }

    const wbc = readNumber(values["wbc"], "WBC");
    if (wbc === null) {
      return critical("White blood cell count is required.");
    }
    if (wbc < 0) {
      return critical("White blood cell count cannot be negative.");
    }

    const met: string[] = [];
    let count = 0;

    if (temperature > 38 || temperature < 36) {
      met.push(`Temperature ${temperature} °C`);
      count += 1;
    }
    if (heartRate > 90) {
      met.push(`Heart rate ${heartRate} bpm`);
      count += 1;
    }
    if (respiratoryRate > 20) {
      met.push(`Respiratory rate ${respiratoryRate} breaths/min`);
      count += 1;
    }
    if (wbc > 12 || wbc < 4) {
      met.push(`WBC ${wbc} ×10⁹/L`);
      count += 1;
    }

    if (count >= 2) {
      return {
        value: count,
        unit: "/4 criteria",
        score: count,
        interpretation:
          `SIRS PRESENT — ${count}/4 criteria met: ${met.join("; ")}. ` +
          "Evaluate for infection and consider sepsis workup.",
        status: "high",
        warnings: [
          "SIRS is sensitive but nonspecific — it reflects a systemic inflammatory response, whatever its cause.",
          "Non-infectious conditions (trauma, burns, surgery, pancreatitis, and other inflammatory states) commonly produce SIRS.",
          "SIRS alone should not be used to diagnose sepsis; Sepsis-3 defines sepsis as organ dysfunction from a dysregulated response to infection.",
        ],
        advice: [
          `An elevated SIRS count (${count}/4) should trigger clinical assessment for infection and for non-infectious inflammatory causes, interpreted alongside vital signs, examination, and available investigations.`,
        ],
        followUp: [
          "Assess for a source of infection and consider blood cultures before antimicrobial decisions where appropriate.",
          "Reassess the criteria as the clinical picture evolves and evaluate with the full clinical context rather than the count alone.",
        ],
      };
    }

    return {
      value: count,
      unit: "/4 criteria",
      score: count,
      interpretation:
        `SIRS criteria not met (${count}/4). ` +
        (met.length > 0 ? `Met: ${met.join("; ")}.` : "No criteria met."),
      status: "normal",
      warnings: [
        "SIRS is sensitive but nonspecific — fewer than 2 criteria do not exclude serious infection or sepsis.",
        "Non-infectious inflammatory conditions can produce individual SIRS criteria.",
      ],
      advice: [
        "Continue clinical assessment based on the overall presentation; absence of SIRS does not remove the need to evaluate concerning features.",
      ],
      followUp: [
        "Repeat assessment if the clinical condition changes or new abnormalities develop in temperature, heart rate, respiratory rate, or white cell count.",
      ],
    };
  },
};
