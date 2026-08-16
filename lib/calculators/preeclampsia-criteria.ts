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

function isYes(value: string | undefined) {
  return value === "yes";
}

export const preeclampsiaCriteriaCalculator: CalculatorDefinition = {
  id: "preeclampsia-criteria",

  slug: "preeclampsia-criteria",

  name: "Preeclampsia Criteria (ACOG 2020)",

  shortName: "Preeclampsia",

  description:
    "Assesses the diagnostic criteria for preeclampsia and the presence of severe features using ACOG Practice Bulletin No. 222 (2020): hypertension after 20 weeks with proteinuria or end-organ dysfunction, with severe features including BP ≥ 160/110, thrombocytopenia, renal insufficiency, liver involvement, pulmonary edema, and cerebral/visual symptoms.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Preeclampsia",
    "Preeclampsia Criteria",
    "Gestational Hypertension",
    "Severe Features",
    "ACOG",
    "Proteinuria",
    "Thrombocytopenia",
    "Pregnancy",
    "Hypertension",
    "Obstetrics",
  ],

  formula:
    "Preeclampsia = hypertension (≥ 140/90 after 20 weeks) + proteinuria (≥ 300 mg/24h, PCR ≥ 0.3, or dipstick ≥ 2+) OR end-organ dysfunction; severe features counted individually",

  normalRange:
    "Severe features: SBP ≥ 160 or DBP ≥ 110; platelets < 100,000/µL; creatinine > 1.1 mg/dL or doubling; transaminases ≥ 2× ULN; pulmonary edema; new headache unresponsive to medication; visual symptoms.",

  referenceRanges: [
    {
      label: "No preeclampsia",
      range: "0 features",
      context: "criteria not met",
    },
    {
      label: "Preeclampsia",
      range: "0 severe features",
      context: "without severe features",
    },
    {
      label: "Preeclampsia with severe features",
      range: "≥ 1 severe feature",
      context: "prompt delivery planning",
    },
  ],

  classification: [
    {
      label: "No preeclampsia",
      range: "0 features",
      max: 0,
      color: "green",
    },
    {
      label: "Preeclampsia",
      range: "0 severe features",
      min: 0,
      max: 0,
      color: "yellow",
    },
    {
      label: "Preeclampsia with severe features",
      range: "≥ 1 severe feature",
      min: 1,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Diagnose preeclampsia as new-onset hypertension (SBP ≥ 140 or DBP ≥ 90 on two occasions ≥ 4 hours apart) after 20 weeks with proteinuria OR, in the absence of proteinuria, new-onset hypertension plus thrombocytopenia, renal insufficiency, impaired liver function, pulmonary edema, or cerebral/visual symptoms.",
      "Count severe features carefully — each has management and delivery-timing implications.",
      "A diagnosis of preeclampsia with severe features typically warrants hospital care and delivery planning (often at ≥ 34 weeks).",
    ],
    warnings: [
      "Severe hypertension (SBP ≥ 160 or DBP ≥ 110) sustained ≥ 15 minutes is an emergency — treat promptly regardless of the total feature count.",
      "Eclampsia (seizures) can occur with or without severe features and mandates magnesium sulfate.",
      "Headache, visual changes, and epigastric/RUQ pain are red-flag symptoms.",
    ],
    followUp: [
      "Preeclampsia without severe features: maternal and fetal surveillance, serial BP and labs, delivery at 37 weeks.",
      "Preeclampsia with severe features: inpatient management, magnesium sulfate for seizure prophylaxis, and delivery based on gestational age.",
      "Persistent postpartum hypertension/eclampsia requires ongoing monitoring.",
    ],
  },

  clinicalNotes:
    "ACOG PB 222 (2020) defines preeclampsia as gestational hypertension (≥ 140/90 after 20 weeks) accompanied by proteinuria (≥ 300 mg/24 h, protein:creatinine ≥ 0.3, or dipstick ≥ 2+) or, without proteinuria, by end-organ dysfunction (thrombocytopenia < 100,000, creatinine > 1.1 or doubling, transaminases ≥ 2× ULN, pulmonary edema, new headache unresponsive to treatment, or visual symptoms). Severe features additionally include SBP ≥ 160 or DBP ≥ 110. This calculator counts severe features and reports preeclampsia status.",
  evidence: {
    source: "National specialty guideline",
    reference:
      "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
      "American College of Obstetricians and Gynecologists. Gestational hypertension and preeclampsia: ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
    ],
  },

  faq: [
    {
      question: "Can preeclampsia be diagnosed without proteinuria?",
      answer:
        "Yes — new-onset hypertension plus any of thrombocytopenia, renal insufficiency, liver involvement, pulmonary edema, or cerebral/visual symptoms meets criteria even without proteinuria.",
    },
    {
      question: "What counts as a severe feature?",
      answer:
        "SBP ≥ 160 or DBP ≥ 110; platelets < 100,000/µL; creatinine > 1.1 mg/dL or doubling; transaminases ≥ 2× ULN; pulmonary edema; new headache unresponsive to medication; and visual symptoms.",
    },
  ],

  comparison: undefined,

  references: [
    "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
  ],

  relatedCalculators: [
    "hellp-syndrome",
    "magnesium-sulfate-preeclampsia",
    "gestational-weight-gain",
    "ebl-obstetric",
  ],

  inputs: [
    {
      id: "sbp",
      label: "Systolic Blood Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 1,
    },
    {
      id: "dbp",
      label: "Diastolic Blood Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 1,
    },
    {
      id: "proteinuria",
      label: "Proteinuria (≥ 300 mg/24 h, PCR ≥ 0.3, or dipstick ≥ 2+)",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "platelets",
      label: "Platelets",
      type: "number",
      unit: "×10³/µL",
      required: true,
      min: 1,
    },
    {
      id: "creatinine",
      label: "Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      step: 0.1,
    },
    {
      id: "transaminases",
      label: "AST/ALT ≥ 2× ULN (impaired liver function)",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "ruqPain",
      label: "Severe persistent RUQ/epigastric pain",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "pulmonaryEdema",
      label: "Pulmonary edema",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "headache",
      label: "New-onset headache unresponsive to medication",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "visual",
      label: "Visual symptoms (scotomata, blurred vision)",
      type: "select",
      required: true,
      options: [
        { label: "Absent", value: "no" },
        { label: "Present", value: "yes" },
      ],
      defaultValue: "no",
    },
  ],

  calculate(values: Record<string, string>) {
    const sbp = positive(values, "sbp", "Systolic blood pressure");
    if ("err" in sbp) return critical(sbp.err);
    const dbp = positive(values, "dbp", "Diastolic blood pressure");
    if ("err" in dbp) return critical(dbp.err);
    if (dbp.n > sbp.n) {
      return critical("Diastolic blood pressure cannot exceed systolic blood pressure.");
    }
    const platelets = positive(values, "platelets", "Platelets");
    if ("err" in platelets) return critical(platelets.err);
    const creatinine = positive(values, "creatinine", "Serum creatinine");
    if ("err" in creatinine) return critical(creatinine.err);

    const selectIds = [
      "proteinuria",
      "transaminases",
      "ruqPain",
      "pulmonaryEdema",
      "headache",
      "visual",
    ];
    for (const id of selectIds) {
      const v = values[id];
      if (v !== "yes" && v !== "no") {
        return critical(`${id.replace(/([A-Z])/g, " $1").toLowerCase()} selection is required.`);
      }
    }

    const hypertension = sbp.n >= 140 || dbp.n >= 90;
    const proteinuria = isYes(values.proteinuria);

    const thrombocytopenia = platelets.n < 100;
    const renalInsufficiency = creatinine.n > 1.1;
    const liverInvolvement = isYes(values.transaminases) || isYes(values.ruqPain);
    const pulmonaryEdema = isYes(values.pulmonaryEdema);
    const headache = isYes(values.headache);
    const visual = isYes(values.visual);

    const severeSbpDbp = sbp.n >= 160 || dbp.n >= 110;

    const endOrgan =
      thrombocytopenia || renalInsufficiency || liverInvolvement ||
      pulmonaryEdema || headache || visual;

    const preeclampsia = hypertension && (proteinuria || endOrgan);

    const severeFeatures: string[] = [];
    if (severeSbpDbp) {
      severeFeatures.push(
        `Severe hypertension (${sbp.n.toFixed(0)}/${dbp.n.toFixed(0)} mmHg ≥ 160/110)`,
      );
    }
    if (thrombocytopenia) {
      severeFeatures.push(
        `Thrombocytopenia (${platelets.n.toFixed(0)} ×10³/µL < 100)`,
      );
    }
    if (renalInsufficiency) {
      severeFeatures.push(
        `Renal insufficiency (creatinine ${creatinine.n.toFixed(1)} mg/dL > 1.1)`,
      );
    }
    if (liverInvolvement) {
      severeFeatures.push("Impaired liver function (transaminases ≥ 2× ULN or severe RUQ/epigastric pain)");
    }
    if (pulmonaryEdema) {
      severeFeatures.push("Pulmonary edema");
    }
    if (headache) {
      severeFeatures.push("New-onset headache unresponsive to medication");
    }
    if (visual) {
      severeFeatures.push("Visual symptoms");
    }

    const count = severeFeatures.length;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (preeclampsia && count >= 1) {
      interpretation =
        `Preeclampsia WITH severe features — ${count} severe feature${count > 1 ? "s" : ""} present (${
          severeFeatures.join("; ")
        }). ` +
        "Warrants inpatient management, magnesium sulfate seizure prophylaxis, and delivery planning.";
      status = "critical";
      referenceRange = "≥1 severe feature";
    } else if (preeclampsia) {
      interpretation =
        `Preeclampsia WITHOUT severe features (hypertension with proteinuria${
          endOrgan ? "/end-organ dysfunction" : ""
        }). ` +
        "Manage with maternal and fetal surveillance; delivery typically planned at 37 weeks.";
      status = "high";
      referenceRange = "0 severe features";
    } else if (count >= 1) {
      interpretation =
        `${count} severe feature${count > 1 ? "s" : ""} present (${
          severeFeatures.join("; ")
        }) but preeclampsia criteria (hypertension after 20 weeks plus proteinuria/end-organ dysfunction) are not fully met. ` +
        "Evaluate other causes and correlate with the full clinical picture.";
      status = "high";
      referenceRange = "features without confirmed preeclampsia";
    } else {
      interpretation =
        `No preeclampsia criteria met (BP ${sbp.n.toFixed(0)}/${dbp.n.toFixed(0)} mmHg, no proteinuria, no severe features).`;
      status = "normal";
      referenceRange = "0 features";
    }

    return {
      value: count,
      unit: "severe features",
      interpretation,
      status,
      referenceRange,
      score: count,
      advice: severeFeatures,
    };
  },
};
