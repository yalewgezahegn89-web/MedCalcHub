import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function yesNo(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (v !== "no" && v !== "yes") return { err: `Invalid ${label} selection.` };
  return { n: v === "yes" ? 1 : 0 };
}

function selectOption(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { n: Number(v) };
}

const GAS_PROBABILITY = [
  { score: 0, probability: "≈ 2.5%" },
  { score: 1, probability: "≈ 5.1%" },
  { score: 2, probability: "≈ 11.2%" },
  { score: 3, probability: "≈ 27.8%" },
  { score: 4, probability: "≈ 52.8%" },
];

export const centorCalculator: CalculatorDefinition = {
  id: "centor",

  slug: "centor",

  name: "Modified Centor (McIsaac) Score",

  shortName: "Modified Centor",

  description:
    "The Modified Centor score (McIsaac 1998) estimates the probability of group A streptococcal (GAS) pharyngitis. Four criteria (fever > 38°C, absence of cough, tonsillar exudates, tender anterior cervical adenopathy) score 1 point each, with an age adjustment (3–14 years +1, 15–44 years 0, ≥ 45 years −1); the total is clamped to 0–4. Scores of 0–1 suggest low, 2–3 intermediate, and 4 high GAS probability, guiding rapid antigen testing and treatment decisions.",

  category: "Infectious Disease",

  specialty: "General Medicine",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Modified Centor",
    "McIsaac",
    "Streptococcal pharyngitis",
    "Strep throat",
    "Group A streptococcus",
    "GAS",
    "Tonsillitis",
    "Sore throat",
  ],

  formula:
    "Score = Fever > 38°C (1) + Absence of cough (1) + Tonsillar exudates (1) + Tender anterior cervical adenopathy (1) + Age adjustment (3–14 y +1; 15–44 y 0; ≥ 45 y −1), clamped to 0–4. Estimated GAS probability: 0 ≈ 2.5%, 1 ≈ 5.1%, 2 ≈ 11.2%, 3 ≈ 27.8%, 4 ≈ 52.8%.",

  normalRange:
    "0–1 low GAS probability (no testing); 2–3 intermediate (test with RADT/culture and treat only if positive); 4 high GAS probability (test and treat only if positive per IDSA guidelines).",

  referenceRanges: [
    {
      label: "Low probability",
      range: "0–1",
      context: "No GAS testing or antibiotics recommended",
    },
    {
      label: "Intermediate",
      range: "2–3",
      context: "Test (RADT ± culture); treat only if positive",
    },
    {
      label: "High probability",
      range: "4",
      context: "Test and treat only if positive (IDSA)",
    },
  ],

  classification: [
    {
      label: "Low probability",
      range: "0–1",
      min: 0,
      max: 1,
      color: "green",
    },
    {
      label: "Intermediate",
      range: "2–3",
      min: 2,
      max: 3,
      color: "yellow",
    },
    {
      label: "High probability",
      range: "4",
      min: 4,
      max: 4,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Centor criteria were described by Centor and colleagues in 1981 for identifying adults with group A streptococcal pharyngitis; the estimated GAS probability rose from ~2.5% with no criteria to ~55.7% with all four. McIsaac and colleagues (1998) modified the score by adding an age adjustment — one additional point for ages 3–14, no adjustment for 15–44, and subtracting one point for ages ≥ 45 — and validated the modified score in a large primary-care cohort, finding GAS positivity of approximately 2.5% at score 0, 5.1% at 1, 11.2% at 2, 27.8% at 3, and 52.8% at 4. The IDSA 2012 guideline uses these scores to guide rapid antigen testing and antibiotic use.",




  references: [
    "McIsaac WJ, White D, Tannenbaum D, Low DE. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ. 1998;158(1):75-83.",
    "Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-246.",
  ],

  relatedCalculators: [],

  inputs: [
    {
      id: "fever",
      label: "Fever (> 38°C / 100.4°F)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "absenceOfCough",
      label: "Absence of cough",
      type: "select",
      required: true,
      options: [
        { label: "Cough present", value: "no" },
        { label: "No cough", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Scores 1 point when the patient does not have a cough (cough suggests a viral illness).",
    },
    {
      id: "tonsillarExudates",
      label: "Tonsillar exudates or swelling",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "cervicalAdenopathy",
      label: "Tender anterior cervical lymphadenopathy",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "ageGroup",
      label: "Age",
      type: "select",
      required: true,
      options: [
        { label: "3–14 years (+1)", value: "1" },
        { label: "15–44 years (0)", value: "0" },
        { label: "45 years or older (−1)", value: "-1" },
      ],
      defaultValue: "0",
    },
  ],

  calculate(values: Record<string, string>) {
    const fever = yesNo(values, "fever", "Fever");
    if ("err" in fever) return critical(fever.err);
    const absenceOfCough = yesNo(values, "absenceOfCough", "Absence of cough");
    if ("err" in absenceOfCough) return critical(absenceOfCough.err);
    const tonsillarExudates = yesNo(values, "tonsillarExudates", "Tonsillar exudates");
    if ("err" in tonsillarExudates) return critical(tonsillarExudates.err);
    const cervicalAdenopathy = yesNo(values, "cervicalAdenopathy", "Tender cervical adenopathy");
    if ("err" in cervicalAdenopathy) return critical(cervicalAdenopathy.err);
    const ageGroup = selectOption(values, "ageGroup", "Age", ["1", "0", "-1"]);
    if ("err" in ageGroup) return critical(ageGroup.err);

    const yes = (v: NumOrErr) => ("err" in v ? 0 : v.n);
    const raw =
      yes(fever) +
      yes(absenceOfCough) +
      yes(tonsillarExudates) +
      yes(cervicalAdenopathy) +
      ageGroup.n;

    const score = Math.max(0, Math.min(4, raw));
    const probability = GAS_PROBABILITY.find((p) => p.score === score);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score <= 1) {
      interpretation =
        `Modified Centor ${score}/4 — LOW probability of group A streptococcal pharyngitis (${probability?.probability}). ` +
        "GAS is unlikely; no testing or antibiotics are recommended. Manage symptomatically.";
      status = "normal";
      referenceRange = "0–1";
    } else if (score <= 3) {
      interpretation =
        `Modified Centor ${score}/4 — INTERMEDIATE probability of GAS pharyngitis (${probability?.probability}). ` +
        "Perform a rapid antigen detection test (with culture follow-up in children and adolescents) and treat with antibiotics only if GAS is confirmed.";
      status = "high";
      referenceRange = "2–3";
    } else {
      interpretation =
        `Modified Centor ${score}/4 — HIGH probability of GAS pharyngitis (${probability?.probability}). ` +
        "Confirm with a rapid antigen detection test and/or culture and treat only if positive, per IDSA recommendations.";
      status = "critical";
      referenceRange = "4";
    }

    return {
      value: score,
      unit: "/4",
      interpretation,
      status,
      referenceRange,
      score,
      followUp: [
        "Provide supportive care and analgesia for all patients.",
        "If a culture is pending after a negative rapid test, follow up on the result and treat only if it grows GAS.",
      ],
    };
  },
};
