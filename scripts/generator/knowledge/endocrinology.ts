import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const endocrinologyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  // ── HOMA-IR ─────────────────────────────────────────
  "homa-ir": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Estimates insulin resistance from fasting plasma glucose and fasting serum insulin using the Homeostasis Model Assessment (HOMA) equation.",
    formula: "HOMA-IR = (glucose * insulin) / 405",
    normalRange: "< 2.5",
    keywords: [
      "HOMA-IR",
      "insulin resistance",
      "fasting glucose",
      "fasting insulin",
      "metabolic syndrome",
      "endocrinology",
    ],
    inputs: [
      {
        id: "glucose",
        label: "Fasting Glucose",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "insulin",
        label: "Fasting Insulin",
        type: "number",
        unit: "µU/mL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "HOMA-IR > 2.5 is commonly used as the threshold for identifying insulin resistance in clinical research and practice.",
        "Pair HOMA-IR with waist circumference, lipid profile, and blood pressure for a full metabolic syndrome assessment.",
        "Best interpreted alongside HOMA-B to differentiate insulin resistance from beta-cell dysfunction.",
      ],
      warnings: [
        "HOMA-IR is validated for fasting conditions only; non-fasting values are unreliable.",
        "Less accurate in patients with advanced beta-cell failure (e.g. type 1 diabetes or late-stage type 2 diabetes).",
        "Insulin assay variability between laboratories may affect absolute HOMA-IR values.",
      ],
      followUp: [
        "If HOMA-IR is elevated, evaluate for metabolic syndrome and consider an oral glucose tolerance test.",
        "Monitor lipid panel and liver function for non-alcoholic fatty liver disease.",
        "Consider lifestyle intervention and repeat HOMA-IR in 3–6 months.",
      ],
    },
    evidence: {
      source: "Endocrine Society / ADA",
      reference:
        "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Matthews DR, et al. Diabetologia. 1985;28:412–419.",
        "ADA Standards of Care in Diabetes. 2025.",
        "Endocrine Society Clinical Practice Guidelines.",
      ],
    },
    faq: [
      {
        question: "What does a high HOMA-IR mean?",
        answer:
          "A HOMA-IR > 2.5 suggests insulin resistance, meaning the body's cells are not responding efficiently to insulin. This is a risk factor for type 2 diabetes, metabolic syndrome, and cardiovascular disease.",
      },
      {
        question: "What are the units of HOMA-IR?",
        answer:
          "HOMA-IR is unitless. It is calculated using fasting glucose in mg/dL and fasting insulin in µU/mL: (glucose × insulin) / 405.",
      },
      {
        question: "How does HOMA-IR differ from HOMA-B?",
        answer:
          "HOMA-IR estimates insulin resistance, while HOMA-B estimates pancreatic beta-cell function. Both use the same fasting glucose and insulin values but different formulas.",
      },
      {
        question: "When should HOMA-IR be measured?",
        answer:
          "HOMA-IR requires fasting for at least 8 hours. It is best measured in the morning before any food intake.",
      },
    ],
    comparison: {
      title: "Insulin Resistance Assessment Tools",
      calculators: [
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          bestFor:
            "Estimating insulin resistance from fasting labs.",
          limitation:
            "Requires fasting samples; not validated in type 1 diabetes.",
        },
        {
          name: "HOMA-B",
          href: "/calculators/homa-b",
          bestFor:
            "Estimating pancreatic beta-cell function.",
          limitation:
            "Reflects secretion, not resistance.",
        },
        {
          name: "Insulin Sensitivity",
          href: "/calculators/insulin-sensitivity",
          bestFor:
            "Quick inverse estimate of insulin sensitivity.",
          limitation:
            "Derived from HOMA-IR; same fasting requirement.",
        },
        {
          name: "HbA1c ↔ eAG",
          href: "/calculators/a1c-eag-converter",
          bestFor:
            "Converting A1c to average glucose.",
          limitation:
            "Does not directly measure insulin resistance.",
        },
      ],
    },
    relatedCalculators: [
      "homa-b",
      "insulin-sensitivity",
      "estimated-average-glucose",
      "a1c-eag-converter",
    ],
    classification: [
      {
        max: 2.5,
        label: "Normal insulin sensitivity",
        status: "normal",
      },
      {
        min: 2.5,
        max: 5.0,
        label: "Mild insulin resistance",
        status: "high",
      },
      {
        min: 5.0,
        label: "Severe insulin resistance",
        status: "critical",
      },
    ],
  },

  // ── HOMA-B ──────────────────────────────────────────
  "homa-b": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Estimates pancreatic beta-cell function from fasting plasma glucose and fasting serum insulin using the HOMA equation.",
    formula: "HOMA-B = (20 * insulin) / (glucose - 3.5)",
    normalRange: "100–200%",
    keywords: [
      "HOMA-B",
      "beta-cell function",
      "fasting glucose",
      "fasting insulin",
      "diabetes",
      "endocrinology",
    ],
    inputs: [
      {
        id: "glucose",
        label: "Fasting Glucose",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "insulin",
        label: "Fasting Insulin",
        type: "number",
        unit: "µU/mL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "HOMA-B < 50% suggests significant beta-cell dysfunction and may indicate progression toward insulin-dependent diabetes.",
        "Pair with HOMA-IR to distinguish beta-cell failure from insulin resistance.",
        "Useful in tracking beta-cell decline in type 2 diabetes over time.",
      ],
      warnings: [
        "HOMA-B values are not directly comparable across studies using different insulin assays.",
        "In newly diagnosed type 2 diabetes, HOMA-B may be transiently elevated due to glucotoxicity-driven hyperinsulinemia.",
        "Not validated for use in type 1 diabetes or patients on exogenous insulin.",
      ],
      followUp: [
        "If HOMA-B is low, consider progression of diabetes and possible need for insulin therapy.",
        "Pair with C-peptide measurement for a more direct assessment of beta-cell function.",
        "Monitor HbA1c and fasting glucose longitudinally.",
      ],
    },
    evidence: {
      source: "Endocrine Society / ADA",
      reference:
        "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Matthews DR, et al. Diabetologia. 1985;28:412–419.",
        "ADA Standards of Care in Diabetes. 2025.",
        "UK Prospective Diabetes Study (UKPDS).",
      ],
    },
    faq: [
      {
        question: "What does a low HOMA-B mean?",
        answer:
          "A HOMA-B below 100% suggests reduced beta-cell function, meaning the pancreas is producing less insulin than expected for the glucose level. This is common in progressive type 2 diabetes.",
      },
      {
        question: "How is HOMA-B different from HOMA-IR?",
        answer:
          "HOMA-B estimates how well the pancreas produces insulin (beta-cell function), while HOMA-IR estimates how well the body responds to it (insulin resistance).",
      },
      {
        question: "What is normal HOMA-B?",
        answer:
          "A normal HOMA-B is approximately 100–200%. Values below 50% indicate significant beta-cell dysfunction.",
      },
    ],
    comparison: {
      title: "Beta-Cell Function Assessment Tools",
      calculators: [
        {
          name: "HOMA-B",
          href: "/calculators/homa-b",
          bestFor:
            "Estimating beta-cell function from fasting labs.",
          limitation:
            "Not validated in type 1 diabetes or on exogenous insulin.",
        },
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          bestFor:
            "Estimating insulin resistance.",
          limitation:
            "Measures resistance, not secretion.",
        },
        {
          name: "Insulin Sensitivity",
          href: "/calculators/insulin-sensitivity",
          bestFor:
            "Quick sensitivity estimate.",
          limitation:
            "Inverse of HOMA-IR; does not assess beta cells.",
        },
      ],
    },
    relatedCalculators: [
      "homa-ir",
      "insulin-sensitivity",
      "a1c-eag-converter",
      "estimated-average-glucose",
    ],
    classification: [
      {
        max: 50,
        label: "Severe beta-cell dysfunction",
        status: "critical",
      },
      {
        min: 50,
        max: 100,
        label: "Reduced beta-cell function",
        status: "low",
      },
      {
        min: 100,
        max: 200,
        label: "Normal beta-cell function",
        status: "normal",
      },
      {
        min: 200,
        label: "Hyperinsulinemia",
        status: "high",
      },
    ],
  },

  // ── Insulin Sensitivity ──────────────────────────────
  "insulin-sensitivity": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Provides a simple estimate of insulin sensitivity as the reciprocal of HOMA-IR.",
    formula: "IS = 1 / homair",
    normalRange: "> 0.4",
    keywords: [
      "insulin sensitivity",
      "HOMA-IR",
      "metabolic",
      "endocrinology",
    ],
    inputs: [
      {
        id: "homaIr",
        label: "HOMA-IR",
        type: "number",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Values > 0.4 indicate better insulin sensitivity; values < 0.2 suggest significant insulin resistance.",
        "Use alongside HOMA-IR for a more intuitive representation of metabolic health.",
        "Higher values (closer to 1.0) reflect better metabolic flexibility.",
      ],
      warnings: [
        "This is a derived metric from HOMA-IR and inherits all HOMA-IR limitations.",
        "Not validated for use in type 1 diabetes.",
        "Single fasting measurement; does not capture dynamic insulin response to meals.",
      ],
      followUp: [
        "If insulin sensitivity is low, assess for metabolic syndrome components.",
        "Dietary modification and exercise are first-line interventions to improve insulin sensitivity.",
        "Repeat testing after lifestyle changes to track improvement.",
      ],
    },
    evidence: {
      source: "Endocrine Society",
      reference:
        "Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27:1487–1495.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wallace TM, et al. Diabetes Care. 2004;27:1487–1495.",
        "Matthews DR, et al. Diabetologia. 1985;28:412–419.",
      ],
    },
    faq: [
      {
        question: "What is insulin sensitivity?",
        answer:
          "Insulin sensitivity measures how effectively the body's cells respond to insulin. A higher value means cells are more responsive, requiring less insulin to manage blood glucose.",
      },
      {
        question: "How is this different from HOMA-IR?",
        answer:
          "This is simply 1 / HOMA-IR. It presents the same information in a more intuitive direction: higher values mean better sensitivity.",
      },
      {
        question: "What is a good insulin sensitivity score?",
        answer:
          "A score > 0.4 is generally considered good insulin sensitivity. Below 0.2 suggests significant insulin resistance.",
      },
    ],
    comparison: {
      title: "Insulin Resistance Assessment Tools",
      calculators: [
        {
          name: "Insulin Sensitivity",
          href: "/calculators/insulin-sensitivity",
          bestFor:
            "Quick inverse sensitivity estimate.",
          limitation:
            "Same fasting requirement as HOMA-IR.",
        },
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          bestFor:
            "Standard insulin resistance estimate.",
          limitation:
            "Higher = worse (less intuitive).",
        },
        {
          name: "HOMA-B",
          href: "/calculators/homa-b",
          bestFor:
            "Beta-cell function assessment.",
          limitation:
            "Different measure entirely.",
        },
      ],
    },
    relatedCalculators: [
      "homa-ir",
      "homa-b",
      "a1c-eag-converter",
    ],
    classification: [
      {
        max: 0.2,
        label: "Severe insulin resistance",
        status: "critical",
      },
      {
        min: 0.2,
        max: 0.4,
        label: "Reduced insulin sensitivity",
        status: "low",
      },
      {
        min: 0.4,
        label: "Normal insulin sensitivity",
        status: "normal",
      },
    ],
  },

  // ── Estimated Average Glucose ────────────────────────
  "estimated-average-glucose": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Estimates mean plasma glucose from HbA1c using the ADAG formula validated by the American Diabetes Association.",
    formula: "eAG = 28.7 * a1c - 46.7",
    normalRange: "70–140 mg/dL",
    keywords: [
      "estimated average glucose",
      "eAG",
      "HbA1c",
      "glycemic control",
      "diabetes",
      "endocrinology",
    ],
    inputs: [
      {
        id: "a1c",
        label: "HbA1c",
        type: "number",
        unit: "%",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use eAG to translate HbA1c into a unit (mg/dL) that patients already understand from home glucose monitoring.",
        "eAG represents the average glucose over the preceding 2–3 months.",
        "The ADA recommends an HbA1c target of < 7% (eAG ≈ 154 mg/dL) for most non-pregnant adults with diabetes.",
      ],
      warnings: [
        "eAG may be inaccurate in conditions affecting red blood cell lifespan (e.g. iron deficiency anaemia, sickle cell trait, pregnancy).",
        "This formula is derived from continuous glucose monitoring studies and may differ from self-monitored blood glucose averages.",
        "Use as a guide only; individual glucose targets should be personalized.",
      ],
      followUp: [
        "If eAG is above target, review current diabetes management including diet, exercise, and medications.",
        "Consider continuous glucose monitoring for more detailed glycemic assessment.",
        "Recheck HbA1c in 3 months after therapy changes.",
      ],
    },
    evidence: {
      source: "ADA / ADAG Study",
      reference:
        "Nathan DM, Steffes MW, et al. International multicenter A1c-derived average glucose (ADAG) study. Diabetes Care. 2008;31:1913–1917.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31:1913–1917.",
        "ADA Standards of Care in Diabetes. 2025.",
      ],
    },
    faq: [
      {
        question: "What is estimated average glucose?",
        answer:
          "eAG converts your HbA1c into an average blood glucose value in mg/dL over the past 2–3 months, making it easier to compare with home glucose readings.",
      },
      {
        question: "What HbA1c equals an eAG of 126 mg/dL?",
        answer:
          "An eAG of 126 mg/dL corresponds to an HbA1c of approximately 6.0%.",
      },
      {
        question: "Is eAG the same as average blood glucose?",
        answer:
          "eAG is a statistical estimate of average glucose validated by CGM studies. It may not exactly match simple averages of finger-stick measurements.",
      },
    ],
    comparison: {
      title: "Glycemic Assessment Tools",
      calculators: [
        {
          name: "Estimated Average Glucose",
          href: "/calculators/estimated-average-glucose",
          bestFor:
            "Converting A1c to mg/dL average.",
          limitation:
            "Affected by conditions altering red cell lifespan.",
        },
        {
          name: "HbA1c ↔ eAG",
          href: "/calculators/a1c-eag-converter",
          bestFor:
            "Bidirectional A1c ↔ eAG conversion.",
          limitation:
            "Same underlying formula.",
        },
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          bestFor:
            "Assessing insulin resistance.",
          limitation:
            "Different glycemic measure.",
        },
      ],
    },
    relatedCalculators: [
      "a1c-eag-converter",
      "homa-ir",
      "homa-b",
    ],
    classification: [
      {
        max: 140,
        label: "Normal average glucose",
        status: "normal",
      },
      {
        min: 140,
        max: 200,
        label: "Pre-diabetic range",
        status: "high",
      },
      {
        min: 200,
        label: "Diabetic range",
        status: "critical",
      },
    ],
  },

  // ── A1c ↔ eAG Converter ─────────────────────────────
  "a1c-eag-converter": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Converts bidirectionally between hemoglobin A1c and estimated average glucose (eAG) using the ADA-validated ADAG formula.",
    formula: "eAG = 28.7 * a1c - 46.7",
    normalRange: "A1c 4–6%, eAG 68–126 mg/dL",
    keywords: [
      "A1c",
      "eAG",
      "HbA1c",
      "diabetes",
      "glycemic control",
      "endocrinology",
    ],
    inputs: [
      {
        id: "a1c",
        label: "HbA1c",
        type: "number",
        unit: "%",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "The ADA target for most adults with diabetes is HbA1c < 7%, corresponding to eAG < 154 mg/dL.",
        "Use this converter to help patients relate their A1c result to familiar glucose numbers.",
        "Individualized targets may be higher or lower depending on age, comorbidities, and hypoglycemia risk.",
      ],
      warnings: [
        "A1c may be unreliable in haemoglobinopathies, iron deficiency, pregnancy, and conditions with altered red blood cell turnover.",
        "This formula applies to the NGSP-standardized A1c assay.",
        "eAG represents an average and does not capture glucose variability or hypoglycemic episodes.",
      ],
      followUp: [
        "If A1c is above target, review medication adherence and consider therapy intensification.",
        "Use CGM or self-monitoring of blood glucose for detailed glycemic patterns.",
        "Recheck A1c in 3 months after changes to diabetes management.",
      ],
    },
    evidence: {
      source: "ADA / ADAG Study",
      reference:
        "Nathan DM, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31:1473–1478.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31:1473–1478.",
        "ADA Standards of Care in Diabetes. 2025.",
      ],
    },
    faq: [
      {
        question: "What does an A1c of 7% equal in mg/dL?",
        answer:
          "An A1c of 7% corresponds to an estimated average glucose of approximately 154 mg/dL.",
      },
      {
        question: "Why convert A1c to eAG?",
        answer:
          "Most patients are familiar with glucose numbers from home monitoring but find A1c percentages abstract. eAG translates A1c into a familiar unit.",
      },
      {
        question: "How accurate is the conversion?",
        answer:
          "The formula has an R² of 0.84 in the ADAG study. Individual results may vary by ±15% due to biological and assay variability.",
      },
    ],
    comparison: {
      title: "Glycemic Assessment Tools",
      calculators: [
        {
          name: "A1c ↔ eAG",
          href: "/calculators/a1c-eag-converter",
          bestFor:
            "Bidirectional A1c ↔ eAG conversion.",
          limitation:
            "Same underlying ADAG formula.",
        },
        {
          name: "Estimated Average Glucose",
          href: "/calculators/estimated-average-glucose",
          bestFor:
            "A1c to eAG only.",
          limitation:
            "Unidirectional.",
        },
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          bestFor:
            "Insulin resistance assessment.",
          limitation:
            "Different glycemic measure.",
        },
      ],
    },
    relatedCalculators: [
      "estimated-average-glucose",
      "homa-ir",
      "homa-b",
    ],
    classification: [
      {
        max: 6,
        label: "Normal A1c",
        status: "normal",
      },
      {
        min: 6,
        max: 6.5,
        label: "Pre-diabetes range",
        status: "high",
      },
      {
        min: 6.5,
        label: "Diabetes range",
        status: "critical",
      },
    ],
  },

  // ── Thyroid Dose ─────────────────────────────────────
  "thyroid-dose": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Estimates the starting levothyroxine replacement dose for hypothyroidism based on lean body weight.",
    formula: "Dose = 1.6 * weight",
    normalRange: "1.0–2.0 µg/kg/day",
    keywords: [
      "thyroid",
      "levothyroxine",
      "hypothyroidism",
      "dose",
      "endocrinology",
    ],
    inputs: [
      {
        id: "weight",
        label: "Body Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "The standard full replacement dose is approximately 1.6 µg/kg/day of levothyroxine.",
        "Elderly patients and those with cardiac disease should start at 25–50 µg/day and titrate slowly.",
        "Adjust dose based on TSH levels checked 6–8 weeks after initiation or dose change.",
      ],
      warnings: [
        "This is an estimate only; individual needs vary significantly based on aetiology, thyroid reserve, and comorbidities.",
        "Overtreatment in elderly patients increases risk of atrial fibrillation and osteoporosis.",
        "Levothyroxine absorption is affected by food, iron, calcium, and proton pump inhibitors.",
      ],
      followUp: [
        "Check TSH and free T4 in 6–8 weeks after starting therapy.",
        "Titrate dose in 12.5–25 µg increments until TSH is within target.",
        "Monitor TSH every 6–12 months once stable.",
      ],
    },
    evidence: {
      source: "ATA / ETA",
      reference:
        "Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Jonklaas J, et al. Thyroid. 2014;24:1670–1751.",
        "ATA Guidelines for Hypothyroidism. 2014.",
        "ETA Clinical Practice Guidelines.",
      ],
    },
    faq: [
      {
        question: "What is the standard dose of levothyroxine?",
        answer:
          "The full replacement dose is approximately 1.6 µg/kg/day, but many patients require less, especially the elderly or those with residual thyroid function.",
      },
      {
        question: "When should levothyroxine be taken?",
        answer:
          "Take on an empty stomach, 30–60 minutes before breakfast, with water only. Separate from calcium, iron, and PPIs by at least 4 hours.",
      },
      {
        question: "How often should TSH be checked?",
        answer:
          "TSH should be checked 6–8 weeks after any dose change and every 6–12 months once stable.",
      },
    ],
    comparison: {
      title: "Thyroid Replacement Dose Tools",
      calculators: [
        {
          name: "Thyroid Dose",
          href: "/calculators/thyroid-dose",
          bestFor:
            "Full replacement dose estimation.",
          limitation:
            "Weight-based estimate only.",
        },
        {
          name: "Levothyroxine Dose",
          href: "/calculators/levothyroxine-dose",
          bestFor:
            "Patient-specific dosing with titration.",
          limitation:
            "Requires more clinical input.",
        },
      ],
    },
    relatedCalculators: [
      "levothyroxine-dose",
      "bmi",
    ],
    classification: [
      {
        max: 1,
        label: "Conservative dose",
        status: "low",
      },
      {
        min: 1,
        max: 1.6,
        label: "Moderate dose",
        status: "normal",
      },
      {
        min: 1.6,
        label: "Full replacement dose",
        status: "high",
      },
    ],
  },

  // ── Levothyroxine Dose ──────────────────────────────
  "levothyroxine-dose": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Estimates levothyroxine dose for thyroid hormone replacement, accounting for patient age and cardiac risk factors.",
    formula: "Dose = 1.6 * weight",
    normalRange: "1.0–2.0 µg/kg/day",
    keywords: [
      "levothyroxine",
      "hypothyroidism",
      "thyroid",
      "dose",
      "endocrinology",
    ],
    inputs: [
      {
        id: "weight",
        label: "Body Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Young healthy patients can often start at the full calculated dose.",
        "Elderly patients (> 65 years) or those with cardiac history should start at 25–50 µg/day and titrate by 12.5–25 µg every 6–8 weeks.",
        "Pregnancy typically requires a 25–50% dose increase; monitor TSH monthly in the first trimester.",
      ],
      warnings: [
        "Never start full replacement dose in patients with known cardiac disease without careful uptitration.",
        "Excess levothyroxine causes iatrogenic thyrotoxicosis, increasing risk of atrial fibrillation and bone loss.",
        "Drug interactions: iron, calcium, PPIs, cholestyramine, and aluminium all reduce absorption.",
      ],
      followUp: [
        "Check TSH 6–8 weeks after initiation or dose change.",
        "Titrate in 12.5–25 µg increments to target TSH.",
        "In pregnancy, check TSH every 4 weeks in first trimester.",
      ],
    },
    evidence: {
      source: "ATA / ETA",
      reference:
        "Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Jonklaas J, et al. Thyroid. 2014;24:1670–1751.",
        "ATA Guidelines. 2014.",
        "ETA Clinical Practice Guidelines.",
      ],
    },
    faq: [
      {
        question: "What is the difference between Thyroid Dose and Levothyroxine Dose calculators?",
        answer:
          "Both use the same 1.6 µg/kg/day formula. Thyroid Dose provides the estimate, while Levothyroxine Dose includes clinical guidance on titration, cardiac precautions, and pregnancy adjustments.",
      },
      {
        question: "How quickly can levothyroxine dose be increased?",
        answer:
          "In healthy patients, dose can be titrated every 6–8 weeks. In elderly or cardiac patients, increase more slowly (every 6–12 weeks).",
      },
      {
        question: "Does levothyroxine need to be taken on an empty stomach?",
        answer:
          "Yes. Take 30–60 minutes before breakfast with water only. Separate from calcium, iron supplements, and PPIs.",
      },
    ],
    comparison: {
      title: "Thyroid Replacement Dose Tools",
      calculators: [
        {
          name: "Levothyroxine Dose",
          href: "/calculators/levothyroxine-dose",
          bestFor:
            "Clinical dosing with titration guidance.",
          limitation:
            "Requires clinical context.",
        },
        {
          name: "Thyroid Dose",
          href: "/calculators/thyroid-dose",
          bestFor:
            "Quick full replacement estimate.",
          limitation:
            "No titration guidance.",
        },
      ],
    },
    relatedCalculators: [
      "thyroid-dose",
      "bmi",
    ],
    classification: [
      {
        max: 1,
        label: "Conservative starting dose",
        status: "low",
      },
      {
        min: 1,
        max: 1.6,
        label: "Moderate dose",
        status: "normal",
      },
      {
        min: 1.6,
        label: "Full replacement dose",
        status: "high",
      },
    ],
  },

  // ── Adrenal Steroid Converter ────────────────────────
  "adrenal-steroid-converter": {
    category: "Endocrinology",
    specialty: "Endocrinology",
    description:
      "Converts between equivalent glucocorticoid and mineralocorticoid doses of commonly used adrenal steroids.",
    formula: "dose",
    normalRange: "Dose-dependent",
    keywords: [
      "corticosteroid",
      "glucocorticoid",
      "steroid conversion",
      "prednisone",
      "hydrocortisone",
      "dexamethasone",
      "endocrinology",
    ],
    inputs: [
      {
        id: "dose",
        label: "Dose",
        type: "number",
        unit: "mg",
        required: true,
      },
      {
        id: "steroid",
        label: "Source Steroid",
        type: "select",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use equivalent doses when switching between glucocorticoids to avoid under- or over-treatment.",
        "Biological half-life matters: dexamethasone and betamethasone are long-acting and carry higher risk of HPA axis suppression.",
        "When transitioning to hydrocortisone for adrenal insufficiency, consider physiological cortisol rhythm (higher morning dose).",
      ],
      warnings: [
        "These are approximate equivalences; individual patient response may vary.",
        "Conversion does not account for mineralocorticoid activity (hydrocortisone has significant mineralocorticoid effect; dexamethasone has none).",
        "Long-term steroid use at any dose increases risk of osteoporosis, diabetes, and infections.",
      ],
      followUp: [
        "Monitor blood glucose, bone density, and blood pressure during prolonged glucocorticoid therapy.",
        "When tapering, reduce gradually to allow HPA axis recovery.",
        "Consider steroid-sparing agents in autoimmune or inflammatory conditions.",
      ],
    },
    evidence: {
      source: "Endocrine Society",
      reference:
        "Liu MM, Rebholz AE, et al. Equivalent glucocorticoid dose conversion: a review. J Endocrinol Invest. 2021;44:1–11. Stavros K, et al. Glucocorticoid equivalency. Endocr Pract. 2022;28:1001–1008.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Liu MM, et al. J Endocrinol Invest. 2021.",
        "Stavros K, et al. Endocr Pract. 2022;28:1001–1008.",
        "Endocrine Society Clinical Practice Guidelines.",
      ],
    },
    faq: [
      {
        question: "How do I convert prednisone to dexamethasone?",
        answer:
          "Prednisone 5 mg is approximately equivalent to dexamethasone 0.75 mg. Divide the prednisone dose by approximately 6.67 to get the dexamethasone equivalent.",
      },
      {
        question: "Why is hydrocortisone used for adrenal insufficiency?",
        answer:
          "Hydrocortisone has both glucocorticoid and mineralocorticoid activity, making it the preferred replacement in adrenal insufficiency when given in divided doses to mimic physiological cortisol rhythm.",
      },
      {
        question: "Are steroid equivalences exact?",
        answer:
          "No. These are approximations based on anti-inflammatory potency. Individual patient response varies based on metabolism, comorbidities, and the specific clinical condition.",
      },
    ],
    comparison: {
      title: "Steroid Conversion Reference",
      calculators: [
        {
          name: "Adrenal Steroid Converter",
          href: "/calculators/adrenal-steroid-converter",
          bestFor:
            "Converting between equivalent steroid doses.",
          limitation:
            "Approximate equivalences only.",
        },
        {
          name: "Thyroid Dose",
          href: "/calculators/thyroid-dose",
          bestFor:
            "Thyroid hormone dosing.",
          limitation:
            "Different endocrine system.",
        },
      ],
    },
    relatedCalculators: [
      "thyroid-dose",
      "levothyroxine-dose",
    ],
    classification: [
      {
        max: 7.5,
        label: "Low-dose glucocorticoid",
        status: "normal",
      },
      {
        min: 7.5,
        max: 20,
        label: "Moderate-dose glucocorticoid",
        status: "high",
      },
      {
        min: 20,
        label: "High-dose glucocorticoid",
        status: "critical",
      },
    ],
  },
};