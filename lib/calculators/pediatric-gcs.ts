import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
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

export const pediatricGcsCalculator: CalculatorDefinition = {
  id: "pediatric-gcs",

  slug: "pediatric-gcs",

  name: "Pediatric Glasgow Coma Scale",

  shortName: "Pediatric GCS",

  description:
    "Age-modified Glasgow Coma Scale for infants and children, using the same eye (1–4) and motor (1–6) components as the adult scale but an age-appropriate verbal response (1–5). Sum ranges 3–15; lower scores indicate more severe impairment of consciousness.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Pediatric Glasgow Coma Scale",
    "Pediatric GCS",
    "GCS",
    "Glasgow Coma Scale",
    "Child",
    "Infant",
    "Consciousness",
    "Neurology",
    "Trauma",
    "Pediatrics",
    "Head Injury",
  ],

  formula:
    "Pediatric GCS = Eye (1–4) + Verbal (1–5, age-appropriate) + Motor (1–6) → total 3–15",

  normalRange:
    "15/15 in a fully alert child. 13–15 mild injury; 9–12 moderate; 3–8 severe (coma).",

  referenceRanges: [
    {
      label: "Mild impairment",
      range: "13–15",
      context: "Minor head injury; low risk of significant TBI",
    },
    {
      label: "Moderate impairment",
      range: "9–12",
      context: "Requires close neurologic monitoring",
    },
    {
      label: "Severe impairment (coma)",
      range: "3–8",
      context: "Airway protection; intubation often indicated",
    },
  ],

  classification: [
    {
      label: "Mild",
      range: "13–15",
      min: 13,
      max: 15,
      color: "green",
    },
    {
      label: "Moderate",
      range: "9–12",
      min: 9,
      max: 12,
      color: "yellow",
    },
    {
      label: "Severe",
      range: "3–8",
      min: 3,
      max: 8,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Use the age-appropriate verbal description that best fits the child's best response to the strongest stimulus.",
      "Record the best response in each category and sum to the total score.",
      "A GCS of 8 or less indicates severe injury and the need for airway protection and urgent neurosurgical evaluation.",
    ],
    warnings: [
      "The pediatric scale differs from the adult scale ONLY in the verbal component; eye and motor scoring are identical.",
      "In pre-verbal children, the verbal component relies on age-appropriate behaviors (smile, consolability, cry pattern) — use the descriptors exactly.",
      "The score is confounded by sedation, intubation, paralysis, and intoxication; document any such factors.",
    ],
    followUp: [
      "Repeat scoring over time; a declining score is more concerning than a single low score.",
      "GCS < 15 with suspected trauma should trigger evaluation per pediatric head-injury decision rules (e.g., PECARN).",
    ],
  },

  clinicalNotes:
    "The Pediatric Glasgow Coma Scale modifies only the verbal component of the adult GCS to be developmentally appropriate for infants and pre-verbal children. The most widely used version assigns 5 points to an interactive infant who smiles, fixes, and follows; 4 to consolable crying; 3 to inconsolable crying; 2 to moaning or restless agitation; and 1 to no verbal response. The eye (4) and motor (6) components are identical to the adult scale, giving a total of 3–15.",
  evidence: {
    source: "Established clinical scoring system",
    reference:
      "James HE, Trauner D. The Glasgow Coma Scale. In: James HE, Anas NG, Perkin RM, eds. Brain Insults in Infants and Children. Orlando, FL: Grune & Stratton; 1985:179-182.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "James HE, Trauner D. The Glasgow Coma Scale. In: James HE, Anas NG, Perkin RM, eds. Brain Insults in Infants and Children. Orlando, FL: Grune & Stratton; 1985:179-182.",
      "American College of Surgeons. Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed. Chicago, IL: ACS; 2018.",
    ],
  },

  faq: [
    {
      question: "What is the difference between the pediatric and adult GCS?",
      answer:
        "Only the verbal component differs. In infants and pre-verbal children, the verbal score uses age-appropriate behaviors (smiling, consolability, cry quality) instead of orientation and speech.",
    },
    {
      question: "What score indicates coma?",
      answer:
        "A pediatric GCS of 8 or less indicates coma and warrants airway protection, usually by endotracheal intubation, and urgent evaluation.",
    },
  ],

  comparison: {
    title: "Pediatric consciousness assessment",
    calculators: [
      {
        name: "Glasgow Coma Scale (Adult)",
        href: "/calculators/gcs",
        use: "Consciousness assessment in older children (able to orient) and adults",
        bestFor: "Age-appropriate verbal scoring",
      },
      {
        name: "PECARN Minor Head Trauma",
        href: "/calculators/pecarn-head-trauma",
        use: "CT decision-making in minor head trauma",
        bestFor: "Estimating the risk of clinically important traumatic brain injury",
      },
    ],
  },

  references: [
    "James HE, Trauner D. The Glasgow Coma Scale. In: James HE, Anas NG, Perkin RM, eds. Brain Insults in Infants and Children. Orlando, FL: Grune & Stratton; 1985:179-182.",
    "American College of Surgeons. Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed. Chicago, IL: ACS; 2018.",
  ],

  relatedCalculators: ["gcs", "pecarn-head-trauma", "pediatric-trauma-score"],

  inputs: [
    {
      id: "eye",
      label: "Eye Opening",
      type: "select",
      required: true,
      options: [
        { label: "4 – Spontaneous", value: "4" },
        { label: "3 – To speech or sound", value: "3" },
        { label: "2 – To pain", value: "2" },
        { label: "1 – None", value: "1" },
      ],
      defaultValue: "4",
    },
    {
      id: "verbal",
      label: "Verbal Response (Age-Appropriate)",
      type: "select",
      required: true,
      options: [
        {
          label: "5 – Smiles, coos, babbles, fixes and follows; oriented to sound",
          value: "5",
        },
        {
          label: "4 – Consolable crying; less than usual interaction; appropriate words",
          value: "4",
        },
        {
          label: "3 – Inconsolable crying or persistent screaming; inappropriate words",
          value: "3",
        },
        {
          label: "2 – Restless, agitated, moaning; incomprehensible sounds",
          value: "2",
        },
        { label: "1 – No verbal response", value: "1" },
      ],
      defaultValue: "5",
    },
    {
      id: "motor",
      label: "Motor Response",
      type: "select",
      required: true,
      options: [
        { label: "6 – Obeys commands or normal spontaneous movement", value: "6" },
        { label: "5 – Localizes to pain", value: "5" },
        { label: "4 – Withdraws to pain", value: "4" },
        { label: "3 – Abnormal flexion (decorticate)", value: "3" },
        { label: "2 – Abnormal extension (decerebrate)", value: "2" },
        { label: "1 – None", value: "1" },
      ],
      defaultValue: "6",
    },
  ],

  calculate(values: Record<string, string>) {
    const eye = selectOption(values, "eye", "Eye opening", ["1", "2", "3", "4"]);
    if ("err" in eye) return critical(eye.err);
    const verbal = selectOption(values, "verbal", "Verbal response", ["1", "2", "3", "4", "5"]);
    if ("err" in verbal) return critical(verbal.err);
    const motor = selectOption(values, "motor", "Motor response", ["1", "2", "3", "4", "5", "6"]);
    if ("err" in motor) return critical(motor.err);

    const score = eye.n + verbal.n + motor.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score >= 13) {
      interpretation =
        `Pediatric GCS ${score}/15 — MILD impairment. ` +
        "The child is largely responsive; continue neurologic monitoring and evaluate for the cause of any reduction from full consciousness.";
      status = "normal";
      referenceRange = "13–15";
    } else if (score >= 9) {
      interpretation =
        `Pediatric GCS ${score}/15 — MODERATE impairment. ` +
        "The child requires close neurologic monitoring and urgent evaluation of the underlying cause (trauma, metabolic, infection, intoxication).";
      status = "high";
      referenceRange = "9–12";
    } else {
      interpretation =
        `Pediatric GCS ${score}/15 — SEVERE impairment (coma). ` +
        "Airway protection (intubation) is typically indicated; urgent resuscitation, neuroimaging, and neurosurgical/ICU referral are warranted.";
      status = "critical";
      referenceRange = "3–8";
    }

    return {
      value: score,
      unit: "/15",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
