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

export const stopBangCalculator: CalculatorDefinition = {
  id: "stop-bang",

  slug: "stop-bang",

  name: "STOP-BANG OSA Screening Score",

  shortName: "STOP-BANG",

  description:
    "The STOP-BANG score (Chung 2008/2012) is an eight-item screening tool for obstructive sleep apnea (OSA). Each of the eight items (Snoring, Tiredness, Observed apnea, high blood Pressure, BMI > 35, Age > 50, Neck circumference > 40 cm, male Gender) scores 1 point (total 0–8). Scores of 3–4 indicate intermediate and 5–8 high OSA risk; a score ≥ 3 is highly sensitive for moderate (93%) and severe (100%) OSA and can help rule out disease when negative.",

  category: "Sleep Medicine",

  specialty: "General Medicine",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "STOP-BANG",
    "Sleep apnea",
    "Obstructive sleep apnea",
    "OSA",
    "Screening",
    "Snoring",
    "Apnea",
    "Sleep medicine",
  ],

  formula:
    "STOP-BANG = Snoring (1) + Tiredness/sleepiness (1) + Observed apnea (1) + high blood Pressure (1) + BMI > 35 kg/m² (1) + Age > 50 (1) + Neck > 40 cm (1) + male Gender (1) → total 0–8. 0–2 low, 3–4 intermediate, 5–8 high risk for OSA.",

  normalRange:
    "0–2 low OSA risk; 3–4 intermediate risk; 5–8 high risk. A score < 3 has a high negative likelihood value for clinically significant OSA.",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–2",
      context: "Low probability of OSA",
    },
    {
      label: "Intermediate",
      range: "3–4",
      context: "Intermediate probability of OSA",
    },
    {
      label: "High risk",
      range: "5–8",
      context: "High probability of OSA; low score < 3 helps rule out moderate–severe OSA",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "0–2",
      min: 0,
      max: 2,
      color: "green",
    },
    {
      label: "Intermediate",
      range: "3–4",
      min: 3,
      max: 4,
      color: "yellow",
    },
    {
      label: "High risk",
      range: "5–8",
      min: 5,
      max: 8,
      color: "red",
    },
  ],



  clinicalNotes:
    "The STOP-BANG questionnaire was introduced by Chung and colleagues in 2008 for preoperative OSA screening and expanded in 2012. Four STOP items (Snoring, Tiredness, Observed apnea, high blood Pressure) are derived from history, and four BANG items (BMI > 35 kg/m², Age > 50 years, Neck circumference > 40 cm, male Gender) from physical examination. At a threshold of ≥ 3, the score is 93.1% sensitive for moderate OSA and 100% sensitive for severe OSA, making it an effective rule-out tool, though its specificity is lower. Scores of 5–8 are associated with a markedly increased probability of moderate-to-severe OSA.",




  comparison: {
    title: "Sleep-disordered breathing screening",
    calculators: [
      {
        name: "Epworth Sleepiness Scale",
        href: "/calculators/epworth",
        use: "Daytime sleep propensity",
        bestFor: "Quantifying subjective daytime sleepiness",
      },
      {
        name: "BMI",
        href: "/calculators/bmi",
        use: "Body mass index, a major OSA risk factor",
        bestFor: "Assessing obesity-related OSA risk",
      },
    ],
  },

  references: [
    "Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology. 2008;108(5):812-821.",
    "Chung F, Subramanyam R, Liao P, Sasaki E, Shapiro C, Sun Y. High STOP-Bang score indicates a high probability of obstructive sleep apnoea. Br J Anaesth. 2012;108(5):768-775.",
  ],

  relatedCalculators: ["epworth", "bmi"],

  inputs: [
    {
      id: "snoring",
      label: "Snoring (loud, heard through closed doors)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "tired",
      label: "Tiredness or sleepiness during the day",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Feeling sleepy during the day, falling asleep while driving, or frequently feeling tired.",
    },
    {
      id: "observedApnea",
      label: "Observed apnea (someone has witnessed you stop breathing while asleep)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "bloodPressure",
      label: "High blood pressure (treated for hypertension or diagnosed hypertension)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "bmi",
      label: "BMI greater than 35 kg/m²",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "age",
      label: "Age over 50 years",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "neck",
      label: "Neck circumference greater than 40 cm",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "gender",
      label: "Male gender",
      type: "select",
      required: true,
      options: [
        { label: "No (female)", value: "no" },
        { label: "Yes (male)", value: "yes" },
      ],
      defaultValue: "no",
    },
  ],

  calculate(values: Record<string, string>) {
    const snoring = yesNo(values, "snoring", "Snoring");
    if ("err" in snoring) return critical(snoring.err);
    const tired = yesNo(values, "tired", "Tiredness");
    if ("err" in tired) return critical(tired.err);
    const observedApnea = yesNo(values, "observedApnea", "Observed apnea");
    if ("err" in observedApnea) return critical(observedApnea.err);
    const bloodPressure = yesNo(values, "bloodPressure", "High blood pressure");
    if ("err" in bloodPressure) return critical(bloodPressure.err);
    const bmi = yesNo(values, "bmi", "BMI > 35 kg/m²");
    if ("err" in bmi) return critical(bmi.err);
    const age = yesNo(values, "age", "Age > 50 years");
    if ("err" in age) return critical(age.err);
    const neck = yesNo(values, "neck", "Neck circumference > 40 cm");
    if ("err" in neck) return critical(neck.err);
    const gender = yesNo(values, "gender", "Male gender");
    if ("err" in gender) return critical(gender.err);

    const yes = (v: NumOrErr) => ("err" in v ? 0 : v.n);
    const total =
      yes(snoring) +
      yes(tired) +
      yes(observedApnea) +
      yes(bloodPressure) +
      yes(bmi) +
      yes(age) +
      yes(neck) +
      yes(gender);

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (total <= 2) {
      interpretation =
        `STOP-BANG ${total}/8 — LOW OSA risk. ` +
        "Scores below 3 have a high negative likelihood value for moderate-to-severe obstructive sleep apnea and help rule out disease; continue routine care and re-screen if risk factors change.";
      status = "normal";
      referenceRange = "0–2";
    } else if (total <= 4) {
      interpretation =
        `STOP-BANG ${total}/8 — INTERMEDIATE OSA risk. ` +
        "A score of 3–4 indicates intermediate probability of obstructive sleep apnea; a score ≥ 3 is ~93% sensitive for moderate and 100% sensitive for severe OSA. Consider objective sleep testing when clinically indicated.";
      status = "high";
      referenceRange = "3–4";
    } else {
      interpretation =
        `STOP-BANG ${total}/8 — HIGH OSA risk. ` +
        "Scores of 5–8 indicate high probability of moderate-to-severe obstructive sleep apnea and warrant confirmatory testing (polysomnography or home sleep apnea test).";
      status = "critical";
      referenceRange = "5–8";
    }

    return {
      value: total,
      unit: "/8",
      interpretation,
      status,
      referenceRange,
      score: total,
      followUp: [
        "Arrange objective testing for intermediate- or high-risk patients when clinically indicated.",
        "Advise on weight loss, positional therapy, and driving safety while awaiting evaluation.",
      ],
    };
  },
};
