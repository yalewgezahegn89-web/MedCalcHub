import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const psiPortCalculator: CalculatorDefinition = {
  id: "psi-port",

  slug: "psi-port",

  name: "PSI / PORT Score",

  shortName: "PSI",

  description:
    "Pneumonia Severity Index (PSI / PORT score) for 30-day mortality risk stratification in community-acquired pneumonia to guide site-of-care decisions.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["PSI", "PORT", "Pneumonia", "CAP", "Pneumonia Severity Index", "Mortality", "Community-Acquired Pneumonia", "Risk Stratification"],

  formula:
    "Points: age (+years) + sex (female −10) + comorbidity/risk items (+10–30) + vital signs (+10–20) + labs (+10–30); class I (age <50, no comorbidities, no risk findings) or class II ≤70, III 71–90, IV 91–130, V >130",

  normalRange: "0–395+ points (classes I–V)",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "PSI class I–II (score ≤70): low mortality (~0.1–0.6%), consider outpatient management. Class III (71–90): low-intermediate risk (~0.9–2.8%), consider brief observation or inpatient. Class IV (91–130): moderate risk (~8–9%), admit. Class V (>130): high risk (~27–31%), admit and consider ICU. Only the pH, BUN, sodium, glucose, hematocrit and PaO2 inputs can be left blank; all others are required.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Fine MJ, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336(4):243-250.",
    "Fine MJ, et al. Prognosis and outcomes of patients with community-acquired pneumonia: a meta-analysis. JAMA. 1996;275(2):134-141.",
  ],

  relatedCalculators: ["curb-65", "crb-65"],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
    min: 18,
    max: 110,
    step: 1,
  },
  {
    id: "sex",
    label: "Sex",
    type: "select",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    id: "nursing-home",
    label: "Nursing home resident",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "neoplastic-disease",
    label: "Neoplastic disease",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "liver-disease",
    label: "Liver disease",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "chf",
    label: "Congestive heart failure",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "cerebrovascular",
    label: "Cerebrovascular disease",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "renal-disease",
    label: "Renal disease",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "ams",
    label: "Altered mental status",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
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
    id: "sbp",
    label: "Systolic blood pressure",
    type: "number",
    unit: "mmHg",
    required: true,
    min: 50,
    max: 250,
    step: 1,
  },
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
    id: "ph",
    label: "Arterial pH",
    type: "number",
    unit: "pH",
    min: 6.5,
    max: 7.8,
    step: 0.01,
  },
  {
    id: "bun",
    label: "BUN",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 1,
    max: 200,
    step: 1,
  },
  {
    id: "sodium",
    label: "Sodium",
    type: "number",
    unit: "mmol/L",
    required: true,
    min: 100,
    max: 180,
    step: 1,
  },
  {
    id: "glucose",
    label: "Glucose",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 20,
    max: 1000,
    step: 1,
  },
  {
    id: "hematocrit",
    label: "Hematocrit",
    type: "number",
    unit: "%",
    required: true,
    min: 5,
    max: 70,
    step: 0.1,
  },
  {
    id: "pao2",
    label: "Arterial PaO2",
    type: "number",
    unit: "mmHg",
    min: 20,
    max: 200,
    step: 1,
  },
  {
    id: "pleural-effusion",
    label: "Pleural effusion on imaging",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const age = readNumber(values["age"], "Age");
    if (age === null) {
      return critical("Age is required.");
    }
    if (age < 18 || age > 110) {
      return critical("Age must be between 18 and 110 years.");
    }

    const sex = values["sex"];
    if (sex !== "male" && sex !== "female") {
      return critical("Sex is required.");
    }

    const binaryItems: Array<{ id: string; points: number; label: string }> = [
      { id: "nursing-home", points: 10, label: "Nursing home residency" },
      { id: "neoplastic-disease", points: 30, label: "Neoplastic disease" },
      { id: "liver-disease", points: 20, label: "Liver disease" },
      { id: "chf", points: 10, label: "Congestive heart failure" },
      { id: "cerebrovascular", points: 10, label: "Cerebrovascular disease" },
      { id: "renal-disease", points: 10, label: "Renal disease" },
      { id: "ams", points: 20, label: "Altered mental status" },
      { id: "pleural-effusion", points: 10, label: "Pleural effusion" },
    ];

    let score = age + (sex === "female" ? -10 : 0);
    let hasRiskFinding = false;
    let hasComorbidity = false;

    for (const item of binaryItems) {
      const raw = readYesNo(values[item.id]);
      if (raw === null) {
        return critical(`${item.label} is required.`);
      }
      if (raw === 1) {
        score += item.points;
        if (item.id === "pleural-effusion") hasRiskFinding = true;
        else hasComorbidity = true;
      }
    }

    const rr = readNumber(values["respiratory-rate"], "Respiratory rate");
    if (rr === null) {
      return critical("Respiratory rate is required.");
    }
    if (rr < 4 || rr > 80) {
      return critical("Respiratory rate must be between 4 and 80 breaths/min.");
    }
    if (rr >= 30) {
      score += 20;
      hasRiskFinding = true;
    }

    const sbp = readNumber(values["sbp"], "Systolic blood pressure");
    if (sbp === null) {
      return critical("Systolic blood pressure is required.");
    }
    if (sbp < 50 || sbp > 250) {
      return critical("Systolic blood pressure must be between 50 and 250 mmHg.");
    }
    if (sbp < 90) {
      score += 20;
      hasRiskFinding = true;
    }

    const temperature = readNumber(values["temperature"], "Temperature");
    if (temperature === null) {
      return critical("Temperature is required.");
    }
    if (temperature < 30 || temperature > 44) {
      return critical("Temperature must be between 30 and 44 °C.");
    }
    if (temperature < 35 || temperature >= 40) {
      score += 15;
      hasRiskFinding = true;
    }

    const heartRate = readNumber(values["heart-rate"], "Heart rate");
    if (heartRate === null) {
      return critical("Heart rate is required.");
    }
    if (heartRate < 20 || heartRate > 300) {
      return critical("Heart rate must be between 20 and 300 bpm.");
    }
    if (heartRate >= 125) {
      score += 10;
      hasRiskFinding = true;
    }

    const phRaw = readNumber(values["ph"], "Arterial pH");
    if (phRaw !== null && (phRaw < 6.5 || phRaw > 7.8)) {
      return critical("Arterial pH must be between 6.5 and 7.8.");
    }
    if (phRaw !== null && phRaw < 7.35) {
      score += 30;
      hasRiskFinding = true;
    }

    const bun = readNumber(values["bun"], "BUN");
    if (bun === null) {
      return critical("BUN is required.");
    }
    if (bun < 1 || bun > 200) {
      return critical("BUN must be between 1 and 200 mg/dL.");
    }
    if (bun >= 30) {
      score += 20;
      hasRiskFinding = true;
    }

    const sodium = readNumber(values["sodium"], "Sodium");
    if (sodium === null) {
      return critical("Sodium is required.");
    }
    if (sodium < 100 || sodium > 180) {
      return critical("Sodium must be between 100 and 180 mmol/L.");
    }
    if (sodium < 130) {
      score += 20;
      hasRiskFinding = true;
    }

    const glucose = readNumber(values["glucose"], "Glucose");
    if (glucose === null) {
      return critical("Glucose is required.");
    }
    if (glucose < 20 || glucose > 1000) {
      return critical("Glucose must be between 20 and 1000 mg/dL.");
    }
    if (glucose >= 250) {
      score += 10;
      hasRiskFinding = true;
    }

    const hematocrit = readNumber(values["hematocrit"], "Hematocrit");
    if (hematocrit === null) {
      return critical("Hematocrit is required.");
    }
    if (hematocrit < 5 || hematocrit > 70) {
      return critical("Hematocrit must be between 5 and 70%.");
    }
    if (hematocrit < 30) {
      score += 10;
      hasRiskFinding = true;
    }

    const pao2 = readNumber(values["pao2"], "Arterial PaO2");
    if (pao2 !== null && (pao2 < 20 || pao2 > 200)) {
      return critical("Arterial PaO2 must be between 20 and 200 mmHg.");
    }
    if (pao2 !== null && pao2 < 60) {
      score += 10;
      hasRiskFinding = true;
    }

    const isClassI =
      age < 50 &&
      !hasComorbidity &&
      !hasRiskFinding;

    let interpretation: string;
    let status: "normal" | "high" | "critical";

    if (isClassI) {
      interpretation =
        `PSI class I (age <50, no comorbidities, no risk findings) — LOW mortality risk (~0.1%). ` +
        "Consider outpatient management.";
      status = "normal";
    } else if (score <= 70) {
      interpretation =
        `PSI class II (score ${score}) — LOW mortality risk (~0.6%). ` +
        "Consider outpatient management.";
      status = "normal";
    } else if (score <= 90) {
      interpretation =
        `PSI class III (score ${score}) — LOW-INTERMEDIATE mortality risk (~0.9–2.8%). ` +
        "Consider brief observation or inpatient admission.";
      status = "high";
    } else if (score <= 130) {
      interpretation =
        `PSI class IV (score ${score}) — MODERATE mortality risk (~8–9%). ` +
        "Admit to hospital.";
      status = "high";
    } else {
      interpretation =
        `PSI class V (score ${score}) — HIGH mortality risk (~27–31%). ` +
        "Admit; strongly consider ICU level of care.";
      status = "critical";
    }

    const psiWarnings = [
      "The PSI estimates 30-day mortality/severity for community-acquired pneumonia and should support disposition decisions rather than replace clinical judgment.",
      "Social factors, oxygen requirements, ability to take oral intake, reliability of follow-up, and other acute considerations may legitimately modify disposition.",
      "Arterial blood gas values (pH, PaO2) are optional inputs; when omitted the score may underestimate severity.",
    ];

    if (isClassI) {
      return {
        value: score,
        unit: "points",
        score,
        interpretation,
        status,
        warnings: psiWarnings,
        advice: [
          "Class I patients are candidates for outpatient care when oxygenation, oral intake, and social circumstances are favorable.",
        ],
        followUp: [
          "Arrange appropriate outpatient review and advise return precautions for worsening dyspnea, fever, or confusion.",
        ],
      };
    }

    if (score <= 70) {
      return {
        value: score,
        unit: "points",
        score,
        interpretation,
        status,
        warnings: psiWarnings,
        advice: [
          "Low-risk class supports outpatient management in suitable patients; verify oxygenation and social safety before discharge.",
        ],
        followUp: [
          "Provide clear follow-up and return precautions; reassess if the clinical course deviates from expectations.",
        ],
      };
    }

    const bandAdvice =
      status === "critical"
        ? "High-mortality class warrants hospital admission with assessment for critical-care involvement."
        : "This class generally merits inpatient care or structured observation depending on the class band and clinical trajectory.";

    return {
      value: score,
      unit: "points",
      score,
      interpretation,
      status,
      warnings: psiWarnings,
      advice: [bandAdvice],
      followUp: [
        "Reassess frequently during the first hours after presentation; deterioration despite a moderate initial class should trigger escalation.",
      ],
    };
  },
};
