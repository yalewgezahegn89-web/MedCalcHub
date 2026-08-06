import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const laboratoryKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  // ── Corrected Calcium ──────────────────────────────
  "corrected-calcium": {
    category: "Laboratory",
    specialty: "Internal Medicine",
    description:
      "Calculates corrected total serum calcium adjusted for hypoalbuminemia. In hypoalbuminemia, measured total calcium is falsely low because less calcium is protein-bound; this correction estimates the physiologically active total calcium.",
    formula:
      "Corrected Calcium = calcium + 0.8 * (4 - albumin)",
    normalRange: "8.5–10.5 mg/dL",
    keywords: [
      "corrected calcium",
      "albumin",
      "calcium",
      "laboratory",
      "electrolytes",
      "hypocalcemia",
      "hypercalcemia",
      "hypoalbuminemia",
    ],
    inputs: [
      {
        id: "calcium",
        label: "Measured Calcium",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "albumin",
        label: "Albumin",
        type: "number",
        unit: "g/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use this correction when serum albumin is low (e.g. nephrotic syndrome, liver disease, malnutrition) and the measured total calcium appears falsely normal or low.",
        "The corrected calcium is an estimate; ionized (free) calcium measurement is the gold standard when available.",
        "This formula assumes albumin is 4.0 g/dL as normal; results become less reliable when albumin is < 2.0 g/dL.",
      ],
      warnings: [
        "This correction is not validated for hypercalcemia—ionized calcium is preferred in that setting.",
        "Does not account for changes in serum pH, which also affect calcium binding to albumin.",
        "The factor 0.8 may not apply across all patient populations; some institutions use 0.7 or 0.73.",
      ],
      followUp: [
        "If corrected calcium is abnormal, confirm with ionized calcium measurement.",
        "Evaluate for underlying causes: hypoalbuminemia, hyperparathyroidism, vitamin D deficiency, malignancy.",
        "In critically ill patients, measure ionized calcium directly rather than relying on correction.",
      ],
    },
    evidence: {
      source: "NACB / Lab Medicine",
      reference:
        "Pay DA, et al. Corrected calcium in hypercalcaemia and hypocalcaemia. Ann Clin Biochem. 2004;41:486–488.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Pay DA, et al. Ann Clin Biochem. 2004;41:486–488.",
        "NACB Guidelines on Calcium and Phosphate Measurement.",
        "KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017.",
      ],
    },
    faq: [
      {
        question: "Why correct calcium for albumin?",
        answer:
          "About 40–50% of serum calcium is bound to albumin. When albumin is low (e.g. liver disease, nephrotic syndrome), total calcium appears falsely low even though ionized (biologically active) calcium may be normal. The correction factor estimates what total calcium would be at a normal albumin of 4.0 g/dL.",
      },
      {
        question: "What does a corrected calcium above normal mean?",
        answer:
          "A corrected calcium > 10.5 mg/dL suggests true hypercalcemia. Common causes include primary hyperparathyroidism, malignancy, vitamin D toxicity, and granulomatous disease. Confirm with ionized calcium and investigate accordingly.",
      },
      {
        question: "Is ionized calcium better than corrected calcium?",
        answer:
          "Yes. Ionized (free) calcium directly measures the physiologically active fraction and is not affected by albumin. It is the preferred test, but the correction is useful when ionized calcium measurement is unavailable.",
      },
      {
        question: "Can this formula be used in children?",
        answer:
          "The formula is validated in adults. Neonatal and paediatric reference ranges and correction factors differ; consult local guidelines for those populations.",
      },
    ],
    comparison: {
      title: "Related Calcium / Mineral Metabolism Calculators",
      calculators: [
        {
          name: "Corrected Calcium",
          href: "/calculators/corrected-calcium",
          bestFor: "Correcting total calcium in hypoalbuminemia.",
          limitation:
            "Does not replace ionized calcium measurement.",
        },
        {
          name: "Calcium-Phosphate Product",
          href: "/calculators/calcium-phosphate-product",
          bestFor:
            "Assessing vascular calcification risk in CKD.",
          limitation:
            "Does not assess albumin or calcium correction.",
        },
        {
          name: "Albumin-to-Creatinine Ratio",
          href: "/calculators/albumin-creatinine-ratio",
          bestFor: "CKD screening and staging.",
          limitation:
            "Assesses albuminuria, not serum calcium status.",
        },
      ],
    },
    relatedCalculators: [
      "calcium-phosphate-product",
      "albumin-creatinine-ratio",
      "ckd-epi-2021",
      "anion-gap",
    ],
    classification: [
      {
        max: 8.4,
        label: "Hypocalcemia",
        status: "low",
      },
      {
        min: 8.5,
        max: 10.5,
        label: "Normal corrected calcium",
        status: "normal",
      },
      {
        min: 10.6,
        label: "Hypercalcemia",
        status: "high",
      },
      {
        min: 12.5,
        label: "Severe hypercalcemia",
        status: "critical",
      },
    ],
  },

  // ── Anion Gap ──────────────────────────────────────
  "anion-gap": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Calculates the serum anion gap using sodium, chloride, and bicarbonate. The anion gap helps differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).",
    formula:
      "Anion Gap = Na − (Cl + HCO₃)",
    normalRange: "8–12 mmol/L",
    keywords: [
      "anion gap",
      "metabolic acidosis",
      "electrolytes",
      "acid base",
      "acidosis",
    ],
    inputs: [
      {
        id: "sodium",
        label: "Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "chloride",
        label: "Chloride",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "bicarbonate",
        label: "Bicarbonate (HCO₃)",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "An anion gap > 12 mmol/L in the context of metabolic acidosis suggests a high anion gap metabolic acidosis (MUDPILES mnemonic: methanol, uremia, DKA, propylene glycol, isoniazid, lactic acidosis, ethylene glycol, salicylates).",
        "Always interpret the anion gap alongside serum albumin—hypoalbuminemia falsely lowers the anion gap and can mask a HAGMA.",
        "Use the corrected anion gap calculator when albumin is low.",
      ],
      warnings: [
        "The anion gap is not reliable in isolation; interpret with arterial blood gas, serum electrolytes, and clinical context.",
        "Hypernatremia, hypokalemia, hypercalcemia, and hypermagnesemia can all artifactually increase the anion gap.",
        "Lithium, bromide, and iodide can cause spurious elevation of the measured anion gap.",
      ],
      followUp: [
        "If the anion gap is elevated, search for the underlying cause (lactic acidosis, ketoacidosis, toxic ingestions, renal failure).",
        "If the cause is unclear, check lactate, ketones, BUN/creatinine, and consider a toxic alcohol screen.",
        "Reassess the anion gap after treatment to confirm resolution.",
      ],
    },
    evidence: {
      source: "Critical Care Medicine",
      reference:
        "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174.",
        "Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.",
      ],
    },
    faq: [
      {
        question: "What does an elevated anion gap mean?",
        answer:
          "An elevated anion gap (> 12 mmol/L) in the setting of metabolic acidosis suggests accumulation of unmeasured anions such as lactate, ketoacids, or toxic metabolites. Common causes include lactic acidosis, diabetic ketoacidosis, renal failure, and toxic alcohol ingestion.",
      },
      {
        question: "What does a low anion gap mean?",
        answer:
          "A low anion gap (< 8 mmol/L) may indicate hypoalbuminemia, lithium or bromide toxicity, or laboratory error. It can also be seen with hypercalcemia, hypermagnesemia, or hyperkalemia.",
      },
      {
        question: "Why should I correct for albumin?",
        answer:
          "About 80% of the normal anion gap is accounted for by albumin. In hypoalbuminemia, the anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. For every 1 g/dL drop in albumin below 4.0, the expected anion gap decreases by approximately 2.5 mmol/L.",
      },
      {
        question: "When should I use the corrected anion gap?",
        answer:
          "Use the albumin-corrected anion gap when the patient has known or suspected hypoalbuminemia (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition).",
      },
    ],
    comparison: {
      title: "Which Acid-Base Calculator Should I Use?",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          bestFor:
            "Screening for high anion gap metabolic acidosis.",
          limitation:
            "Does not account for hypoalbuminemia.",
        },
        {
          name: "Albumin-Corrected Anion Gap",
          href: "/calculators/corrected-anion-gap",
          bestFor:
            "Detecting hidden HAGMA in hypoalbuminemic patients.",
          limitation:
            "Requires albumin measurement.",
        },
        {
          name: "Serum Osmolality",
          href: "/calculators/serum-osmolality",
          bestFor:
            "Assessing osmolality in toxic ingestions and electrolyte disorders.",
          limitation:
            "Does not directly measure the anion gap.",
        },
      ],
    },
    relatedCalculators: [
      "corrected-anion-gap",
      "serum-osmolality",
      "osmolar-gap",
      "corrected-calcium",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        max: 7,
        label: "Low anion gap",
        status: "low",
      },
      {
        min: 8,
        max: 12,
        label: "Normal anion gap",
        status: "normal",
      },
      {
        min: 13,
        label: "High anion gap",
        status: "high",
      },
      {
        min: 20,
        label: "Markedly elevated anion gap",
        status: "critical",
      },
    ],
  },

  // ── Albumin-Corrected Anion Gap ────────────────────
  "corrected-anion-gap": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Calculates the albumin-corrected anion gap. In hypoalbuminemia, the measured anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. This correction adjusts for the albumin contribution.",
    formula:
      "Corrected AG = (Na − (Cl + HCO₃)) + 2.5 × (4 − Albumin)",
    normalRange: "8–12 mmol/L",
    keywords: [
      "corrected anion gap",
      "albumin",
      "metabolic acidosis",
      "electrolytes",
      "acid base",
    ],
    inputs: [
      {
        id: "sodium",
        label: "Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "chloride",
        label: "Chloride",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "bicarbonate",
        label: "Bicarbonate (HCO₃)",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "albumin",
        label: "Albumin",
        type: "number",
        unit: "g/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use the corrected anion gap whenever serum albumin is low (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition) to unmask a hidden high anion gap metabolic acidosis.",
        "For every 1 g/dL decrease in albumin below 4.0, the expected anion gap decreases by ~2.5 mmol/L.",
        "This is especially important in ICU patients where hypoalbuminemia is common and a HAGMA may be missed on uncorrected values.",
      ],
      warnings: [
        "This correction factor (2.5) is derived from the assumption that each g/dL of albumin contributes ~2.5 mmol/L to the anion gap; exact values may vary.",
        "The correction does not account for other proteins or anions that contribute to the gap.",
        "Very low albumin (< 2.0 g/dL) may reduce the reliability of the correction.",
      ],
      followUp: [
        "If the corrected anion gap is elevated, pursue the same differential diagnosis as for a standard high anion gap acidosis.",
        "Check lactate, ketones, and renal function; consider a toxic alcohol screen if clinically indicated.",
        "Reassess after treatment to confirm normalization.",
      ],
    },
    evidence: {
      source: "Critical Care Medicine",
      reference:
        "Figge J, et al. Hypoalbuminemia and the anion gap. Crit Care Med. 1998;26:1807–1810.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Figge J, et al. Crit Care Med. 1998;26:1807–1810.",
        "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174.",
      ],
    },
    faq: [
      {
        question: "Why does hypoalbuminemia lower the anion gap?",
        answer:
          "Albumin is a negatively charged protein that contributes significantly to the normal anion gap (~75% of the gap in health). When albumin is low, fewer unmeasured negative charges are present, so the calculated anion gap decreases even if the underlying acid-base status is unchanged.",
      },
      {
        question: "What correction factor is used?",
        answer:
          "The standard correction adds 2.5 mmol/L to the measured anion gap for every 1 g/dL that serum albumin falls below 4.0 g/dL. Some studies suggest using 2.4 or 2.8 depending on the population.",
      },
      {
        question: "When should I suspect a missed HAGMA?",
        answer:
        "Consider a missed HAGMA when a patient is critically ill with acidosis, has a normal-appearing uncorrected anion gap, and has a low serum albumin. Apply the correction and reassess.",
      },
    ],
    comparison: {
      title: "Which Anion Gap Calculator Should I Use?",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          bestFor:
            "Standard screening in patients with normal albumin.",
          limitation:
            "Falsely low in hypoalbuminemia.",
        },
        {
          name: "Albumin-Corrected Anion Gap",
          href: "/calculators/corrected-anion-gap",
          bestFor:
            "Detecting hidden HAGMA in hypoalbuminemic patients.",
          limitation:
            "Correction is approximate; interpret in context.",
        },
        {
          name: "Serum Osmolality",
          href: "/calculators/serum-osmolality",
          bestFor:
            "Assessing osmolality in toxic ingestions.",
          limitation:
            "Does not directly assess the anion gap.",
        },
      ],
    },
    relatedCalculators: [
      "anion-gap",
      "serum-osmolality",
      "osmolar-gap",
      "bun-creatinine-ratio",
      "corrected-calcium",
    ],
    classification: [
      {
        max: 7,
        label: "Low corrected anion gap",
        status: "low",
      },
      {
        min: 8,
        max: 12,
        label: "Normal corrected anion gap",
        status: "normal",
      },
      {
        min: 13,
        label: "High corrected anion gap",
        status: "high",
      },
      {
        min: 20,
        label: "Markedly elevated corrected anion gap",
        status: "critical",
      },
    ],
  },

  // ── Serum Osmolality ───────────────────────────────
  "serum-osmolality": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Calculates the estimated serum osmolality using sodium, glucose, and blood urea nitrogen (BUN). Useful in evaluating electrolyte disorders, dehydration, toxic alcohol ingestion, and calculating the osmolar gap.",
    formula:
      "Calculated Osmolality = 2 × Na + Glucose / 18 + BUN / 2.8",
    normalRange: "275–295 mOsm/kg",
    keywords: [
      "serum osmolality",
      "calculated osmolality",
      "electrolytes",
      "osmolality",
      "toxicology",
      "dehydration",
    ],
    inputs: [
      {
        id: "sodium",
        label: "Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "glucose",
        label: "Glucose",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "bun",
        label: "BUN",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Serum osmolality is most useful when measured and calculated values are compared to identify unmeasured osmoles (osmolar gap).",
        "Use this calculator alongside the Osmolar Gap calculator when toxic alcohol ingestion is suspected.",
        "In hypernatremia, serum osmolality helps guide the rate of correction.",
      ],
      warnings: [
        "This formula uses glucose and BUN in mg/dL; results will be incorrect if different units are entered.",
        "The formula does not account for ethanol, which contributes to effective osmolality. Add ethanol correction if needed: Ethanol / 4.6.",
        "Measured osmolality must be obtained from the laboratory to calculate the osmolar gap.",
      ],
      followUp: [
        "If osmolality is elevated, check serum sodium, glucose, and BUN for the primary cause.",
        "If the osmolar gap is elevated (measured > calculated), consider toxic alcohol ingestion and obtain specific assays.",
        "In hyperosmolality, assess volume status and guide fluid correction.",
      ],
    },
    evidence: {
      source: "Emergency Medicine / Nephrology",
      reference:
        "Dorwart WV, Chalmers T. Comparison of methods for calculating serum osmolality from chemical concentrations, and the prognostic value of such calculations. Clin Chem. 1975;21:190–194.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Dorwart WV, Chalmers T. Clin Chem. 1975;21:190–194.",
        "Tintinalli's Emergency Medicine, 9th Ed.",
        "UpToDate: Serum osmolality.",
      ],
    },
    faq: [
      {
        question: "What is normal serum osmolality?",
        answer:
          "Normal serum osmolality is approximately 275–295 mOsm/kg. Values below this suggest dilutional hyponatremia; values above suggest dehydration, hyperglycemia, or ingestion of osmotically active substances.",
      },
      {
        question: "When should I order a measured osmolality?",
        answer:
          "Order a measured osmolality when toxic alcohol ingestion is suspected, when the calculated osmolality does not explain the clinical picture, or when you need to calculate the osmolar gap.",
      },
      {
        question: "What does a high calculated osmolality mean?",
        answer:
          "A high calculated osmolality suggests hypernatremia, hyperglycemia, elevated BUN (uremia), or ingestion of osmotically active substances. The differential depends on the clinical context.",
      },
    ],
    comparison: {
      title: "Which Osmolality Calculator Should I Use?",
      calculators: [
        {
          name: "Serum Osmolality",
          href: "/calculators/serum-osmolality",
          bestFor:
            "Estimating serum osmolality from basic labs.",
          limitation:
            "Does not account for ethanol or unmeasured osmoles.",
        },
        {
          name: "Osmolar Gap",
          href: "/calculators/osmolar-gap",
          bestFor:
            "Detecting toxic alcohol ingestion.",
          limitation:
            "Requires a measured osmolality from the lab.",
        },
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor:
            "Adjusting sodium for hyperglycemia.",
          limitation:
            "Assesses sodium, not total osmolality.",
        },
      ],
    },
    relatedCalculators: [
      "osmolar-gap",
      "corrected-sodium",
      "anion-gap",
      "sodium-deficit",
    ],
    classification: [
      {
        max: 274,
        label: "Low osmolality",
        status: "low",
      },
      {
        min: 275,
        max: 295,
        label: "Normal osmolality",
        status: "normal",
      },
      {
        min: 296,
        label: "High osmolality",
        status: "high",
      },
      {
        min: 320,
        label: "Critically elevated osmolality",
        status: "critical",
      },
    ],
  },

  // ── Osmolar Gap ────────────────────────────────────
  "osmolar-gap": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Calculates the osmolar gap as the difference between measured and calculated serum osmolality. An elevated osmolar gap may suggest toxic alcohol ingestion (methanol, ethylene glycol) or other osmotically active substances.",
    formula:
      "measured - (2 * sodium + glucose / 18 + bun / 2.8)",
    normalRange: "-10 to +10 mOsm/kg",
    keywords: [
      "osmolar gap",
      "toxic alcohol",
      "methanol",
      "ethylene glycol",
      "toxicology",
      "electrolytes",
    ],
    inputs: [
      {
        id: "measured",
        label: "Measured Osmolality",
        type: "number",
        unit: "mOsm/kg",
        required: true,
      },
      {
        id: "sodium",
        label: "Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "glucose",
        label: "Glucose",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "bun",
        label: "BUN",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "An osmolar gap > 10 mOsm/kg in the context of a suspected toxic ingestion should raise concern for toxic alcohols (methanol, ethylene glycol, isopropanol) or other ingestions (propylene glycol, ethanol).",
        "Always interpret the osmolar gap alongside the anion gap—both may be elevated in toxic alcohol ingestions.",
        "A normal osmolar gap does not completely exclude toxic ingestion, particularly in delayed presentations where metabolism has occurred.",
      ],
      warnings: [
        "The measured osmolality must be obtained from the laboratory; do not use the calculated value.",
        "Ethanol elevates osmolality. If ethanol is present, subtract its contribution (Ethanol / 4.6) before interpreting the gap.",
        "DKA, starvation, renal failure, and recent alcohol intoxication can all affect the osmolar gap.",
      ],
      followUp: [
        "If the osmolar gap is elevated and toxic ingestion is suspected, obtain serum toxic alcohol levels (methanol, ethylene glycol, isopropanol).",
        "Consider fomepizole or ethanol therapy if a toxic alcohol ingestion is confirmed or strongly suspected.",
        "Repeat the osmolar gap after treatment to confirm resolution.",
      ],
    },
    evidence: {
      source: "Emergency Medicine / Toxicology",
      reference:
        "Brent J, et al. Fomepizole for the treatment of methanol poisoning. N Engl J Med. 2001;344:424–429.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Brent J, et al. N Engl J Med. 2001;344:424–429.",
        "Tintinalli's Emergency Medicine, 9th Ed.",
        "UpToDate: Osmolar gap.",
      ],
    },
    faq: [
      {
        question: "What does an elevated osmolar gap mean?",
        answer:
          "An elevated osmolar gap (> 10 mOsm/kg) indicates the presence of unmeasured osmotically active substances. In the emergency setting, this may suggest toxic alcohol ingestion (methanol, ethylene glycol), ethanol, or propylene glycol. Other causes include DKA, uremia, and alcohol intoxication.",
      },
      {
        question: "Can the osmolar gap be normal in toxic ingestion?",
        answer:
          "Yes. In delayed presentations of toxic alcohol ingestion, the parent alcohol may have been metabolized to its toxic metabolites, normalizing the osmolar gap while toxicity persists. The anion gap may be elevated in these cases.",
      },
      {
        question: "What is the normal osmolar gap?",
        answer:
          "A normal osmolar gap is generally considered to be between -10 and +10 mOsm/kg. Values above this range are considered elevated.",
      },
    ],
    comparison: {
      title: "Which Toxicology Calculator Should I Use?",
      calculators: [
        {
          name: "Osmolar Gap",
          href: "/calculators/osmolar-gap",
          bestFor:
            "Detecting unmeasured osmoles in toxic ingestion.",
          limitation:
            "Requires a measured osmolality from the lab.",
        },
        {
          name: "Serum Osmolality",
          href: "/calculators/serum-osmolality",
          bestFor:
            "Estimating calculated osmolality.",
          limitation:
            "Does not detect unmeasured osmoles.",
        },
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          bestFor:
            "Detecting high anion gap metabolic acidosis.",
          limitation:
            "May be normal in early toxic alcohol ingestion.",
        },
      ],
    },
    relatedCalculators: [
      "serum-osmolality",
      "anion-gap",
      "corrected-anion-gap",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        max: -10,
        label: "Negatively elevated gap (lab error or dilutional)",
        status: "low",
      },
      {
        min: -10,
        max: 10,
        label: "Normal osmolar gap",
        status: "normal",
      },
      {
        min: 11,
        label: "Elevated osmolar gap",
        status: "high",
      },
      {
        min: 50,
        label: "Markedly elevated osmolar gap — toxic ingestion likely",
        status: "critical",
      },
    ],
  },

  // ── Corrected Sodium ───────────────────────────────
  "corrected-sodium": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Corrects serum sodium for hyperglycemia using the conventional correction factor. Hyperglycemia draws water into the extracellular space, diluting sodium; this correction estimates what sodium would be at a normal glucose level.",
    formula:
      "Corrected Sodium = Measured Sodium + 1.6 × (Glucose − 100) / 100",
    normalRange: "135–145 mmol/L",
    keywords: [
      "corrected sodium",
      "hyperglycemia",
      "hyponatremia",
      "electrolytes",
      "sodium",
      "diabetic ketoacidosis",
    ],
    inputs: [
      {
        id: "sodium",
        label: "Measured Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "glucose",
        label: "Glucose",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use corrected sodium in patients with significant hyperglycemia (e.g. diabetic ketoacidosis, hyperosmolar hyperglycemic state) to assess the true sodium status.",
        "A normal corrected sodium with a low measured sodium indicates true dilutional hyponatremia; a low corrected sodium indicates true coexisting hyponatremia.",
        "For every 100 mg/dL increase in glucose above 100, sodium decreases by approximately 1.6 mmol/L.",
      ],
      warnings: [
        "This correction factor (1.6) is the conventional value; some references use 2.0–2.4 for extreme hyperglycemia.",
        "The formula assumes glucose is in mg/dL; results will be incorrect if mmol/L is used.",
        "This correction is less accurate in patients with concurrent disorders affecting water and sodium handling (e.g. renal failure, SIADH).",
      ],
      followUp: [
        "If corrected sodium is high, the patient has true hypernatremia; assess free water deficit.",
        "If corrected sodium is low, treat the underlying hyponatremia alongside hyperglycemia management.",
        "Recheck sodium as glucose normalizes during treatment, especially in DKA.",
      ],
    },
    evidence: {
      source: "Internal Medicine / Endocrinology",
      reference:
        "Hillier TA, et al. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399–403.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Hillier TA, et al. Am J Med. 1999;106:399–403.",
        "Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.",
      ],
    },
    faq: [
      {
        question: "Why does hyperglycemia lower sodium?",
        answer:
          "High glucose increases serum osmolality, drawing water from the intracellular to the extracellular space. This dilutes the serum sodium, causing a falsely low measured value. The corrected sodium estimates what the sodium would be at a normal glucose.",
      },
      {
        question: "What correction factor should I use?",
        answer:
          "The conventional correction factor is 1.6 mmol/L for every 100 mg/dL increase in glucose above 100 mg/dL. For very high glucose (> 400 mg/dL), some experts use a factor of 2.0–2.4.",
      },
      {
        question: "When should I correct sodium for glucose?",
        answer:
          "Correct sodium whenever glucose is significantly elevated (> 200 mg/dL), especially in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS), to accurately assess the patient's true sodium status.",
      },
    ],
    comparison: {
      title: "Which Sodium Calculator Should I Use?",
      calculators: [
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor:
            "Assessing true sodium in hyperglycemia.",
          limitation:
            "Approximate correction; less reliable at extreme glucose values.",
        },
        {
          name: "Sodium Deficit",
          href: "/calculators/sodium-deficit",
          bestFor:
            "Planning hyponatremia correction.",
          limitation:
            "Estimates deficit, not corrected sodium.",
        },
        {
          name: "Free Water Deficit",
          href: "/calculators/free-water-deficit",
          bestFor:
            "Estimating water replacement in hypernatremia.",
          limitation:
            "Does not correct sodium for glucose.",
        },
      ],
    },
    relatedCalculators: [
      "sodium-deficit",
      "free-water-deficit",
      "serum-osmolality",
      "anion-gap",
    ],
    classification: [
      {
        max: 134,
        label: "Hyponatremia (corrected)",
        status: "low",
      },
      {
        min: 135,
        max: 145,
        label: "Normal corrected sodium",
        status: "normal",
      },
      {
        min: 146,
        label: "Hypernatremia (corrected)",
        status: "high",
      },
      {
        min: 160,
        label: "Severe hypernatremia",
        status: "critical",
      },
    ],
  },

  // ── Sodium Deficit ─────────────────────────────────
  "sodium-deficit": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Estimates sodium deficit for hyponatremia correction planning. Helps determine the total amount of sodium needed to raise serum sodium to a target level.",
    formula:
      "Sodium Deficit = 0.6 * weight * (desiredNa - currentNa)",
    normalRange: "0 mmol",
    keywords: [
      "sodium deficit",
      "hyponatremia",
      "electrolytes",
      "sodium",
      "fluid management",
    ],
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
      {
        id: "currentNa",
        label: "Current Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "desiredNa",
        label: "Desired Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.",
        "This estimate represents the TOTAL sodium deficit; do not attempt to correct the full deficit rapidly.",
        "Limit sodium correction to 8–10 mmol/L in the first 24 hours and 18 mmol/L in 48 hours to reduce the risk of osmotic demyelination syndrome (ODS).",
      ],
      warnings: [
        "Rapid correction of hyponatremia can cause osmotic demyelination syndrome (ODS), a devastating neurological complication.",
        "The calculated deficit does not account for ongoing losses or ongoing free water intake.",
        "In severe symptomatic hyponatremia, use hypertonic saline and follow institutional protocols rather than relying solely on this formula.",
      ],
      followUp: [
        "Check serum sodium every 2–4 hours during active correction to ensure safe rates.",
        "If sodium correction is too rapid, consider D5W infusion or desmopressin to slow or reverse the correction.",
        "After achieving the target, identify and treat the underlying cause of hyponatremia.",
      ],
    },
    evidence: {
      source: "Nephrology / Internal Medicine",
      reference:
        "Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1581–1589.",
        "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65.",
      ],
    },
    faq: [
      {
        question: "How is the sodium deficit calculated?",
        answer:
          "The sodium deficit is calculated as: TBW × (Target Na − Current Na), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total millimoles of sodium needed to reach the target.",
      },
      {
        question: "How fast should I correct sodium?",
        answer:
          "For chronic hyponatremia, limit correction to 8–10 mmol/L in 24 hours and 18 mmol/L in 48 hours to avoid osmotic demyelination syndrome. For acute, severely symptomatic hyponatremia, a more rapid correction may be warranted using hypertonic saline.",
      },
      {
        question: "What if I overshoot the target?",
        answer:
          "If sodium is corrected too rapidly, immediately slow or stop sodium replacement. D5W infusion and/or desmopressin (DDAVP) can be used to bring the sodium back down to a safe range.",
      },
    ],
    comparison: {
      title: "Which Sodium Disorder Calculator Should I Use?",
      calculators: [
        {
          name: "Sodium Deficit",
          href: "/calculators/sodium-deficit",
          bestFor:
            "Planning hyponatremia correction in chronic hyponatremia.",
          limitation:
            "Does not account for ongoing losses or intake.",
        },
        {
          name: "Free Water Deficit",
          href: "/calculators/free-water-deficit",
          bestFor:
            "Estimating water replacement in hypernatremia.",
          limitation:
            "Addresses hypernatremia, not hyponatremia.",
        },
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor:
            "Assessing true sodium in hyperglycemia.",
          limitation:
            "Does not estimate the sodium deficit.",
        },
      ],
    },
    relatedCalculators: [
      "free-water-deficit",
      "corrected-sodium",
      "serum-osmolality",
      "fluid-requirement",
    ],
    classification: [
      {
        max: -100,
        label: "Deficit below normal range",
        status: "low",
      },
      {
        min: -100,
        max: 0,
        label: "Normal (no deficit)",
        status: "normal",
      },
      {
        min: 0,
        label: "Sodium deficit present",
        status: "high",
      },
      {
        min: 500,
        label: "Large sodium deficit",
        status: "critical",
      },
    ],
  },

  // ── Free Water Deficit ─────────────────────────────
  "free-water-deficit": {
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    description:
      "Estimates free water deficit in hypernatremia. Helps quantify the amount of free water needed to restore normal sodium levels.",
    formula:
      "Free Water Deficit = 0.6 * weight * (currentNa / desiredNa - 1)",
    normalRange: "0 L",
    keywords: [
      "free water deficit",
      "hypernatremia",
      "dehydration",
      "electrolytes",
      "sodium",
      "fluid management",
    ],
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
      {
        id: "currentNa",
        label: "Current Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "desiredNa",
        label: "Desired Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.",
        "This estimate represents the free water deficit only; do not forget to continue ongoing maintenance fluids.",
        "Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours to avoid cerebral edema.",
      ],
      warnings: [
        "The formula does not account for ongoing losses (GI, renal, insensible), which must be added to the replacement rate.",
        "Rapid correction of hypernatremia can cause cerebral edema, which can be fatal.",
        "In patients with underlying brain injury, rapid reduction in serum osmolality is particularly dangerous.",
      ],
      followUp: [
        "Monitor serum sodium every 2–4 hours during correction.",
        "If sodium correction is too rapid, reduce the rate and reassess.",
        "After achieving the target, identify and treat the underlying cause of hypernatremia (e.g. inadequate free water intake, diabetes insipidus, osmotic diuresis).",
      ],
    },
    evidence: {
      source: "Nephrology / Internal Medicine",
      reference:
        "Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1493–1499.",
        "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65.",
      ],
    },
    faq: [
      {
        question: "How is the free water deficit calculated?",
        answer:
          "The free water deficit is calculated as: TBW × (Current Na / Target Na − 1), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total liters of free water needed.",
      },
      {
        question: "How fast should I correct hypernatremia?",
        answer:
          "Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours. Faster correction risks cerebral edema as water shifts into brain cells.",
      },
      {
        question: "Should I use D5W or hypotonic saline?",
        answer:
          "D5W (which becomes free water after glucose metabolism) or hypotonic saline (0.45% NaCl) are commonly used. The choice depends on the patient's volume status—hypotonic saline for hypovolemic hypernatremia, D5W for euvolemic or hypervolemic patients.",
      },
      {
        question: "What if the patient has ongoing losses?",
        answer:
          "Add estimated ongoing losses (GI losses, urinary output) to the calculated deficit. Ongoing losses must be replaced in addition to the free water deficit.",
      },
    ],
    comparison: {
      title: "Which Sodium Disorder Calculator Should I Use?",
      calculators: [
        {
          name: "Free Water Deficit",
          href: "/calculators/free-water-deficit",
          bestFor:
            "Estimating water replacement in hypernatremia.",
          limitation:
            "Does not account for ongoing losses.",
        },
        {
          name: "Sodium Deficit",
          href: "/calculators/sodium-deficit",
          bestFor:
            "Planning hyponatremia correction.",
          limitation:
            "Addresses hyponatremia, not hypernatremia.",
        },
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor:
            "Assessing true sodium in hyperglycemia.",
          limitation:
            "Does not estimate the free water deficit.",
        },
      ],
    },
    relatedCalculators: [
      "sodium-deficit",
      "corrected-sodium",
      "serum-osmolality",
      "maintenance-fluids",
    ],
    classification: [
      {
        max: 0,
        label: "No deficit",
        status: "normal",
      },
      {
        min: 0,
        max: 3,
        label: "Mild free water deficit",
        status: "low",
      },
      {
        min: 3,
        max: 7,
        label: "Moderate free water deficit",
        status: "high",
      },
      {
        min: 7,
        label: "Severe free water deficit",
        status: "critical",
      },
    ],
  },
};