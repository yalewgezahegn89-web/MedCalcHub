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

export const pediatricTraumaScoreCalculator: CalculatorDefinition = {
  id: "pediatric-trauma-score",

  slug: "pediatric-trauma-score",

  name: "Pediatric Trauma Score (PTS)",

  shortName: "PTS",

  description:
    "Scores pediatric trauma severity across six components (weight, airway, systolic blood pressure, mental status, open wounds, skeletal injury), each scored +2 (minor), +1 (moderate), or −1 (severe), for a total of −6 to +12. Lower scores predict higher mortality and the need for transfer to a pediatric trauma center.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Pediatric Trauma Score",
    "PTS",
    "Trauma",
    "Pediatric Trauma",
    "Injury Severity",
    "Triage",
    "Child",
    "Pediatrics",
    "Trauma Center",
  ],

  formula:
    "PTS = Weight + Airway + Systolic BP + CNS + Open Wound + Skeletal → total −6 to +12 (each component +2 / +1 / −1)",

  normalRange:
    "−6 to +12; a score ≥ 8 predicts low mortality (< 1%) and routine care, whereas a score < 8 identifies children at higher risk who should be transferred to a pediatric trauma center.",

  referenceRanges: [
    {
      label: "Low risk",
      range: "8–12",
      context: "Predicted mortality < 1%",
    },
    {
      label: "Intermediate risk",
      range: "4–7",
      context: "Significant injury; consider transfer",
    },
    {
      label: "High risk",
      range: "−6–3",
      context: "Severe injury; urgent transfer to a pediatric trauma center",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "8–12",
      min: 8,
      max: 12,
      color: "green",
    },
    {
      label: "Intermediate risk",
      range: "4–7",
      min: 4,
      max: 7,
      color: "yellow",
    },
    {
      label: "High risk",
      range: "−6–3",
      min: -6,
      max: 3,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Pediatric Trauma Score (Tepas 1988) was developed to provide a rapid, physiologic-and-anatomic triage tool specific to children, who cannot be triaged with adult trauma scoring alone. Each of six components is scored +2, +1, or −1: weight > 20 kg (+2), 10–20 kg (+1), < 10 kg (−1); normal airway (+2), maintainable (+1), unmaintainable (−1); SBP > 90 (+2), 50–90 (+1), < 50 (−1); awake (+2), obtunded (+1), coma/decerebrate (−1); no open wound (+2), minor (+1), major/penetrating (−1); no skeletal injury (+2), closed fracture (+1), open/multiple (−1). Scores < 8 identify children with substantially increased mortality who warrant pediatric trauma center care.",




  comparison: {
    title: "Pediatric trauma scoring",
    calculators: [
      {
        name: "Revised Trauma Score (RTS)",
        href: "/calculators/rts",
        use: "Physiologic trauma triage in adults and older children",
        bestFor: "Field triage with GCS, SBP, and respiratory rate",
      },
      {
        name: "Pediatric Glasgow Coma Scale",
        href: "/calculators/pediatric-gcs",
        use: "Quantifying neurologic impairment",
        bestFor: "CNS component assessment",
      },
    ],
  },

  references: [
    "Tepas JJ 3rd, Ramenofsky ML, Mollitt DL, et al. The Pediatric Trauma Score as a predictor of injury severity in the injured child. J Pediatr Surg. 1987;22(1):14-18.",
    "American College of Surgeons. Resources for Optimal Care of the Injured Patient. Chicago, IL: ACS; 2022.",
  ],

  relatedCalculators: ["rts", "pediatric-gcs", "parkland-formula"],

  inputs: [
    {
      id: "weight",
      label: "Weight",
      type: "select",
      required: true,
      options: [
        { label: "+2 – > 20 kg", value: "2" },
        { label: "+1 – 10–20 kg", value: "1" },
        { label: "−1 – < 10 kg", value: "-1" },
      ],
      defaultValue: "2",
    },
    {
      id: "airway",
      label: "Airway",
      type: "select",
      required: true,
      options: [
        { label: "+2 – Normal, maintainable", value: "2" },
        { label: "+1 – Maintainable (positioning, oral/nasal airway)", value: "1" },
        { label: "−1 – Unmaintainable (intubation required)", value: "-1" },
      ],
      defaultValue: "2",
    },
    {
      id: "sbp",
      label: "Systolic Blood Pressure",
      type: "select",
      required: true,
      options: [
        { label: "+2 – > 90 mmHg", value: "2" },
        { label: "+1 – 50–90 mmHg", value: "1" },
        { label: "−1 – < 50 mmHg or non-palpable pulse", value: "-1" },
      ],
      defaultValue: "2",
      helpText: "Use the pediatric blood pressure in mmHg.",
    },
    {
      id: "cns",
      label: "Central Nervous System (Mental Status)",
      type: "select",
      required: true,
      options: [
        { label: "+2 – Awake", value: "2" },
        { label: "+1 – Obtunded or any loss of consciousness", value: "1" },
        { label: "−1 – Coma or decerebrate/decorticate posturing", value: "-1" },
      ],
      defaultValue: "2",
    },
    {
      id: "openWound",
      label: "Open Wound",
      type: "select",
      required: true,
      options: [
        { label: "+2 – None", value: "2" },
        { label: "+1 – Minor (abrasion, small laceration)", value: "1" },
        { label: "−1 – Major, penetrating, or soft-tissue avulsion", value: "-1" },
      ],
      defaultValue: "2",
    },
    {
      id: "skeletal",
      label: "Skeletal Injury",
      type: "select",
      required: true,
      options: [
        { label: "+2 – None", value: "2" },
        { label: "+1 – Closed fracture", value: "1" },
        { label: "−1 – Open or multiple fractures", value: "-1" },
      ],
      defaultValue: "2",
    },
  ],

  calculate(values: Record<string, string>) {
    const weight = selectOption(values, "weight", "Weight", ["2", "1", "-1"]);
    if ("err" in weight) return critical(weight.err);
    const airway = selectOption(values, "airway", "Airway", ["2", "1", "-1"]);
    if ("err" in airway) return critical(airway.err);
    const sbp = selectOption(values, "sbp", "Systolic blood pressure", ["2", "1", "-1"]);
    if ("err" in sbp) return critical(sbp.err);
    const cns = selectOption(values, "cns", "Central nervous system", ["2", "1", "-1"]);
    if ("err" in cns) return critical(cns.err);
    const openWound = selectOption(values, "openWound", "Open wound", ["2", "1", "-1"]);
    if ("err" in openWound) return critical(openWound.err);
    const skeletal = selectOption(values, "skeletal", "Skeletal injury", ["2", "1", "-1"]);
    if ("err" in skeletal) return critical(skeletal.err);

    const score =
      weight.n + airway.n + sbp.n + cns.n + openWound.n + skeletal.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (score >= 8) {
      interpretation =
        `Pediatric Trauma Score ${score} (−6 to +12) — LOW RISK. ` +
        "Predicted mortality is low (< 1%); routine emergency department care with continued reassessment is appropriate.";
      status = "normal";
      referenceRange = "8–12";
    } else if (score >= 4) {
      interpretation =
        `Pediatric Trauma Score ${score} (−6 to +12) — INTERMEDIATE RISK. ` +
        "The child has a significant injury burden; activate the trauma team and strongly consider transfer to a pediatric trauma center.";
      status = "high";
      referenceRange = "4–7";
    } else {
      interpretation =
        `Pediatric Trauma Score ${score} (−6 to +12) — HIGH RISK. ` +
        "This child is at high risk of death from their injuries; initiate full resuscitation and expedite transfer to a pediatric trauma center.";
      status = "critical";
      referenceRange = "−6–3";
    }

    return {
      value: score,
      unit: "/12",
      interpretation,
      status,
      referenceRange,
      score,
    };
  },
};
