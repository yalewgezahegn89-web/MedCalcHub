import type { CalculatorSuggestion } from "../core/calculator-intelligence";

export const nephrologyKnowledge: Record<
  string,
  CalculatorSuggestion
> = {
  // ── CKD-EPI 2021 ───────────────────────────────────
  "ckd-epi-2021": {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation.",
    formula:
      "eGFR = 142 * pow(min(creatinine / 0.9, 1), -0.302) * pow(max(creatinine / 0.9, 1), -1.2) * pow(0.9938, age) * 1.012",
    normalRange: "≥90 mL/min/1.73 m²",
    keywords: [
      "CKD-EPI",
      "eGFR",
      "creatinine",
      "renal",
      "kidney",
      "CKD",
    ],
    relatedCalculators: [
      "cockcroft-gault",
      "mdrd",
      "bun-creatinine-ratio",
    ],
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        required: true,
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "creatinine",
        label: "Serum Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use CKD-EPI 2021 (race-free) as the preferred equation for estimating GFR in clinical practice.",
        "Interpret eGFR alongside albuminuria (ACR) for CKD staging per KDIGO guidelines.",
        "Repeat testing after 3 months to confirm chronicity before diagnosing CKD.",
      ],
      warnings: [
        "CKD-EPI is an estimate and may be inaccurate in extremes of muscle mass, amputees, or pregnancy.",
        "Do not use CKD-EPI for medication dosing without checking drug-specific guidance; Cockcroft-Gault may be required.",
      ],
      followUp: [
        "If eGFR < 60 mL/min/1.73 m², repeat within 3 months to assess for chronicity.",
        "Evaluate for albuminuria with urine ACR in all patients with reduced eGFR.",
        "Refer to nephrology if eGFR < 30 or rapidly declining.",
      ],
    },
    evidence: {
      source: "NKF / KDIGO",
      reference:
        "Inker LA, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. NEJM. 2021;385:1737-1749.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2021",
      updatedAt: "2026-07",
      references: [
        "Inker LA, et al. NEJM. 2021.",
        "KDIGO 2024 Clinical Practice Guideline for CKD.",
      ],
    },
    faq: [
      {
        question: "What does eGFR measure?",
        answer:
          "eGFR estimates how well the kidneys are filtering waste from the blood, expressed in mL/min/1.73 m².",
      },
      {
        question:
          "Why was the race variable removed from CKD-EPI?",
        answer:
          "The 2021 equation removed race because including it was not scientifically justified and contributed to health disparities in CKD detection.",
      },
      {
        question: "Is CKD-EPI better than MDRD?",
        answer:
          "Yes. CKD-EPI is more accurate at higher GFR values and is now the preferred equation in most guidelines.",
      },
    ],
    comparison: {
      title: "Which Kidney Calculator Should I Use?",
      calculators: [
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor:
            "Routine estimation of kidney function and CKD staging.",
          limitation: "Not intended for medication dosing.",
        },
        {
          name: "Cockcroft-Gault",
          href: "/calculators/cockcroft-gault",
          bestFor: "Drug dosing adjustment.",
          limitation: "Less accurate for estimating true GFR.",
        },
        {
          name: "MDRD",
          href: "/calculators/mdrd",
          bestFor: "Historical comparison.",
          limitation: "Reduced accuracy at higher GFR.",
        },
      ],
    },
    relatedCalculators: [
      "cockcroft-gault",
      "mdrd",
      "albumin-creatinine-ratio",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        min: 90,
        label: "G1: Normal or high",
        status: "normal",
      },
      {
        min: 60,
        max: 89,
        label: "G2: Mildly decreased",
        status: "normal",
      },
      {
        min: 45,
        max: 59,
        label: "G3a: Mild to moderate",
        status: "low",
      },
      {
        min: 30,
        max: 44,
        label: "G3b: Moderate to severe",
        status: "low",
      },
      {
        min: 15,
        max: 29,
        label: "G4: Severely decreased",
        status: "low",
      },
      {
        max: 14,
        label: "G5: Kidney failure",
        status: "critical",
      },
    ],
  },

  // ── Cockcroft-Gault ─────────────────────────────────
  "cockcroft-gault": {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Estimates creatinine clearance (CrCl) for medication dosing using the Cockcroft-Gault equation.",
    formula:
      "CrCl = ((140 - age) * weight) / (72 * creatinine) * 0.85",
    normalRange: "90–120 mL/min",
    keywords: [
      "cockcroft-gault",
      "creatinine clearance",
      "CrCl",
      "drug dosing",
      "renal",
    ],
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        required: true,
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "creatinine",
        label: "Serum Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Use actual body weight unless adjusted body weight is clinically indicated (e.g. obesity).",
        "Cockcroft-Gault remains the preferred equation for many drug dosing recommendations.",
        "Use stable serum creatinine; avoid using values during acute kidney injury for chronic dosing.",
      ],
      warnings: [
        "Not recommended for unstable kidney function or acute kidney injury.",
        "Overestimates creatinine clearance in elderly patients with low muscle mass.",
        "Does not provide direct GFR estimation; use CKD-EPI for CKD staging.",
      ],
      followUp: [
        "Verify drug-specific dosing guidelines for renal adjustment thresholds.",
        "Monitor renal function periodically in patients with CrCl < 50 mL/min.",
      ],
    },
    evidence: {
      source: "Original Publication",
      reference:
        "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1976",
      updatedAt: "2026-07",
      references: [
        "Cockcroft DW, Gault MH. Nephron. 1976;16:31-41.",
        "KDIGO Clinical Practice Guideline.",
      ],
    },
    faq: [
      {
        question:
          "When should I use Cockcroft-Gault instead of CKD-EPI?",
        answer:
          "Use Cockcroft-Gault when adjusting medication doses, as many drug labels still reference CrCl from this equation.",
      },
      {
        question:
          "What weight should I use in the Cockcroft-Gault equation?",
        answer:
          "Use actual body weight by default. Adjusted body weight may be used in obese patients per institutional guidelines.",
      },
    ],
    comparison: {
      title: "Which Kidney Calculator Should I Use?",
      calculators: [
        {
          name: "Cockcroft-Gault",
          href: "/calculators/cockcroft-gault",
          bestFor: "Medication dosing adjustment.",
          limitation:
            "Less accurate for estimating true GFR.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Routine kidney function assessment and CKD staging.",
          limitation:
            "Not preferred for medication dosing.",
        },
        {
          name: "MDRD",
          href: "/calculators/mdrd",
          bestFor: "Historical comparison.",
          limitation: "Largely replaced by CKD-EPI.",
        },
      ],
    },
    relatedCalculators: [
      "ckd-epi-2021",
      "mdrd",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        min: 90,
        label: "Normal renal function",
        status: "normal",
      },
      {
        min: 60,
        max: 89,
        label: "Mild renal impairment",
        status: "normal",
      },
      {
        min: 30,
        max: 59,
        label: "Moderate renal impairment",
        status: "low",
      },
      {
        min: 15,
        max: 29,
        label: "Severe renal impairment",
        status: "low",
      },
      {
        max: 14,
        label: "Kidney failure",
        status: "critical",
      },
    ],
  },

  // ── MDRD ─────────────────────────────────────────────
  mdrd: {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Estimates glomerular filtration rate using the 4-variable MDRD equation.",
    formula:
      "eGFR = 175 * pow(creatinine, -1.154) * pow(age, -0.203) * 0.742",
    normalRange: "≥90 mL/min/1.73 m²",
    keywords: [
      "MDRD",
      "eGFR",
      "kidney",
      "renal",
      "creatinine",
    ],
    inputs: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        required: true,
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "creatinine",
        label: "Serum Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "MDRD has largely been replaced by CKD-EPI for routine GFR estimation.",
        "May still be encountered in older laboratory reports and historical records.",
      ],
      warnings: [
        "The MDRD equation tends to underestimate GFR at higher kidney function (>60 mL/min).",
        "Less accurate than CKD-EPI and should not be used for new clinical decisions when CKD-EPI is available.",
      ],
      followUp: [
        "If transitioning from MDRD to CKD-EPI, note that eGFR values may differ and trend direction should be considered.",
      ],
    },
    evidence: {
      source: "NKF / Levey et al.",
      reference:
        "Levey AS, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130:461-470.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1999",
      updatedAt: "2026-07",
      references: [
        "Levey AS, et al. Ann Intern Med. 1999;130:461-470.",
        "KDIGO 2024 Clinical Practice Guideline for CKD.",
      ],
    },
    faq: [
      {
        question: "Is MDRD still used clinically?",
        answer:
          "Most laboratories have transitioned to CKD-EPI, but MDRD may still appear on older reports. CKD-EPI is now preferred.",
      },
      {
        question:
          "Why is MDRD less accurate at higher GFR?",
        answer:
          "The MDRD equation was developed in patients with known CKD and was not validated in healthy individuals, leading to underestimation at higher GFR values.",
      },
    ],
    comparison: {
      title: "Which Kidney Calculator Should I Use?",
      calculators: [
        {
          name: "MDRD",
          href: "/calculators/mdrd",
          bestFor: "Historical comparison with older lab results.",
          limitation:
            "Largely replaced by CKD-EPI for clinical use.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Current clinical practice and CKD staging.",
          limitation: "Not intended for medication dosing.",
        },
        {
          name: "Cockcroft-Gault",
          href: "/calculators/cockcroft-gault",
          bestFor: "Medication dosing.",
          limitation: "Less accurate for true GFR.",
        },
      ],
    },
    relatedCalculators: [
      "ckd-epi-2021",
      "cockcroft-gault",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        min: 90,
        label: "G1: Normal or high",
        status: "normal",
      },
      {
        min: 60,
        max: 89,
        label: "G2: Mildly decreased",
        status: "normal",
      },
      {
        min: 45,
        max: 59,
        label: "G3a: Mild to moderate",
        status: "low",
      },
      {
        min: 30,
        max: 44,
        label: "G3b: Moderate to severe",
        status: "low",
      },
      {
        min: 15,
        max: 29,
        label: "G4: Severely decreased",
        status: "low",
      },
      {
        max: 14,
        label: "G5: Kidney failure",
        status: "critical",
      },
    ],
  },

  // ── Albumin-to-Creatinine Ratio (ACR) ───────────────
  "albumin-creatinine-ratio": {
    category: "Nephrology",
    specialty: "Nephrology",
    description:
      "Calculates urine albumin-to-creatinine ratio (ACR) for CKD screening and staging.",
    formula:
      "ACR = albumin / creatinine",
    normalRange: "<30 mg/g",
    keywords: [
      "ACR",
      "albumin",
      "creatinine",
      "kidney",
      "CKD",
      "proteinuria",
    ],
    inputs: [
      {
        id: "albumin",
        label: "Urine Albumin",
        type: "number",
        unit: "mg/L",
        required: true,
      },
      {
        id: "creatinine",
        label: "Urine Creatinine",
        type: "number",
        unit: "g/L",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "Persistent albuminuria is one of the earliest indicators of chronic kidney disease and should always be interpreted together with eGFR.",
        "ACR is recommended for CKD screening in patients with diabetes, hypertension, or family history of kidney disease.",
      ],
      warnings: [
        "Diagnosing CKD from a single abnormal ACR result.",
        "Ignoring transient albuminuria caused by fever, exercise, or urinary tract infection.",
        "Using ACR alone without assessing kidney function (eGFR).",
      ],
      followUp: [
        "Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months.",
        "If ACR > 30 mg/g, repeat testing and evaluate eGFR for CKD staging.",
      ],
    },
    evidence: {
      source: "KDIGO",
      reference:
        "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2024",
      updatedAt: "2026-07",
      link: "https://kdigo.org/guidelines/ckd-evaluation-and-management/",
    },
    faq: [
      {
        question:
          "What is the Albumin-to-Creatinine Ratio (ACR)?",
        answer:
          "The Albumin-to-Creatinine Ratio estimates the amount of albumin excreted in urine while correcting for urine concentration using creatinine.",
      },
      {
        question: "Why is ACR important?",
        answer:
          "ACR is one of the earliest markers of kidney damage and is recommended for screening chronic kidney disease, especially in patients with diabetes or hypertension.",
      },
      {
        question: "What is considered a normal ACR?",
        answer:
          "An ACR below 30 mg/g is considered normal or mildly increased (A1).",
      },
      {
        question: "When should ACR be repeated?",
        answer:
          "Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months.",
      },
    ],
    comparison: {
      title: "Which Kidney Calculator Should I Use?",
      calculators: [
        {
          name: "Albumin-to-Creatinine Ratio (ACR)",
          href: "/calculators/albumin-creatinine-ratio",
          use: "Detects and stages albuminuria.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          use: "Estimates glomerular filtration rate.",
        },
        {
          name: "Cockcroft-Gault",
          href: "/calculators/cockcroft-gault",
          use: "Medication dose adjustment.",
        },
        {
          name: "MDRD",
          href: "/calculators/mdrd",
          use: "Legacy GFR equation.",
        },
      ],
    },
    relatedCalculators: [
      "ckd-epi-2021",
      "cockcroft-gault",
      "mdrd",
      "fena",
      "feurea",
      "ttkg",
    ],
    classification: [
      {
        max: 29,
        label: "A1: Normal to mildly increased",
        status: "normal",
      },
      {
        min: 30,
        max: 300,
        label: "A2: Moderately increased",
        status: "high",
      },
      {
        min: 301,
        label: "A3: Severely increased",
        status: "critical",
      },
    ],
  },

  // ── BUN / Creatinine Ratio ──────────────────────────
  "bun-creatinine-ratio": {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Calculates the Blood Urea Nitrogen to Creatinine ratio to help differentiate causes of kidney dysfunction.",
    formula: "BUN = bun / creatinine",
    normalRange: "10:1 – 20:1",
    keywords: [
      "BUN",
      "creatinine",
      "renal",
      "kidney",
      "azotemia",
    ],
    inputs: [
      {
        id: "bun",
        label: "Blood Urea Nitrogen",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "creatinine",
        label: "Serum Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "An elevated BUN/Creatinine ratio may suggest prerenal azotemia, gastrointestinal bleeding, or dehydration, but should always be interpreted in clinical context.",
        "Use alongside urinalysis and urine electrolytes for a more complete picture of renal function.",
      ],
      warnings: [
        "Interpret the ratio together with the clinical presentation; it is not diagnostic in isolation.",
        "High-protein diets, corticosteroids, and GI bleeding can elevate BUN independently of kidney function.",
      ],
      followUp: [
        "If the ratio is elevated, assess volume status and consider urine sodium and fractional excretion of sodium.",
        "If prerenal causes are excluded, evaluate for intrinsic renal or postrenal etiologies.",
      ],
    },
    evidence: {
      source: "NKF / KDIGO",
      reference:
        "KDIGO Clinical Practice Guideline for the Evaluation and Management of CKD.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2024",
      updatedAt: "2026-07",
      references: [
        "KDIGO Clinical Practice Guideline.",
        "National Kidney Foundation.",
      ],
    },
    faq: [
      {
        question:
          "What does a high BUN/Creatinine ratio mean?",
        answer:
          "A ratio >20:1 may suggest prerenal azotemia (e.g. dehydration, heart failure), GI bleeding, or high protein intake.",
      },
      {
        question:
          "What does a low BUN/Creatinine ratio mean?",
        answer:
          "A ratio <10:1 may indicate intrinsic renal disease, liver disease, malnutrition, or a low-protein diet.",
      },
    ],
    comparison: {
      title: "Which Kidney Calculator Should I Use?",
      calculators: [
        {
          name: "BUN/Creatinine Ratio",
          href: "/calculators/bun-creatinine-ratio",
          bestFor:
            "Differentiating prerenal from intrinsic renal causes.",
          limitation:
            "Not a direct measure of kidney function.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Estimating GFR for CKD staging.",
          limitation: "Does not differentiate etiology.",
        },
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor: "Confirming prerenal vs. intrinsic AKI.",
          limitation:
            "Affected by diuretic use.",
        },
      ],
    },
    relatedCalculators: [
      "ckd-epi-2021",
      "cockcroft-gault",
      "fena",
      "feurea",
    ],
    classification: [
      {
        max: 9,
        label: "Low ratio",
        status: "low",
      },
      {
        min: 10,
        max: 20,
        label: "Normal ratio",
        status: "normal",
      },
      {
        min: 21,
        label: "Elevated ratio",
        status: "high",
      },
    ],
  },

  // ── FENa ─────────────────────────────────────────────
  fena: {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Calculates the fractional excretion of sodium to distinguish prerenal azotemia from acute tubular necrosis.",
    formula:
      "FENa = (urinena / plasmana) / (urinecr / plasmacr) * 100",
    normalRange: "< 1% in prerenal azotemia",
    keywords: [
      "FENa",
      "fractional excretion sodium",
      "renal",
      "AKI",
      "prerenal",
    ],
    inputs: [
      {
        id: "urineNa",
        label: "Urine Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "plasmaNa",
        label: "Plasma Sodium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "urineCr",
        label: "Urine Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "plasmaCr",
        label: "Plasma Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "FENa < 1% suggests prerenal azotemia; FENa > 2% suggests intrinsic renal injury (e.g. acute tubular necrosis).",
        "Use urine studies and clinical context to guide interpretation.",
      ],
      warnings: [
        "FENa may be unreliable in patients receiving diuretics, which increase urinary sodium excretion.",
        "In the elderly and in chronic kidney disease, FENa may not accurately distinguish prerenal from intrinsic causes.",
      ],
      followUp: [
        "If FENa is equivocal (1–2%), consider FEUrea as a complementary test.",
        "Repeat urine electrolytes if the clinical picture does not match the initial result.",
      ],
    },
    evidence: {
      source: "Nephrology Literature",
      reference:
        "Carvounis CP, et al. Significance of fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62:1184-1191.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2002",
      updatedAt: "2026-07",
      references: [
        "Renal physiology references",
        "Clinical nephrology references",
      ],
    },
    faq: [
      {
        question: "What does FENa < 1% mean?",
        answer:
          "A FENa < 1% suggests prerenal azotemia, meaning the kidneys are appropriately retaining sodium in response to decreased perfusion.",
      },
      {
        question: "When is FENa unreliable?",
        answer:
          "FENa is unreliable in patients on diuretics, in chronic kidney disease, and in the elderly. Consider FEUrea in these situations.",
      },
    ],
    comparison: {
      title: "Which Renal Assessment Should I Use?",
      calculators: [
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor:
            "Distinguishing prerenal azotemia from ATN in AKI.",
          limitation:
            "Unreliable with diuretic use.",
        },
        {
          name: "FEUrea",
          href: "/calculators/feurea",
          bestFor:
            "Renal assessment when diuretics are present.",
          limitation:
            "Less widely validated than FENa.",
        },
        {
          name: "BUN/Creatinine Ratio",
          href: "/calculators/bun-creatinine-ratio",
          bestFor: "Rapid bedside assessment.",
          limitation:
            "Not a direct tubular function test.",
        },
      ],
    },
    relatedCalculators: [
      "feurea",
      "bun-creatinine-ratio",
      "fractional-excretion-calculator",
      "ttkg",
    ],
    classification: [
      {
        max: 1,
        label: "Prerenal azotemia",
        status: "low",
      },
      {
        min: 1,
        max: 2,
        label: "Indeterminate",
        status: "normal",
      },
      {
        min: 2,
        label: "Intrinsic renal injury (ATN)",
        status: "high",
      },
    ],
  },

  // ── FEUrea ───────────────────────────────────────────
  feurea: {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Calculates the fractional excretion of urea for renal evaluation, particularly useful when diuretics are present.",
    formula:
      "FEUrea = (urineurea / plasmaurea) / (urinecr / plasmacr) * 100",
    normalRange: "< 35% in prerenal azotemia",
    keywords: [
      "FEUrea",
      "fractional excretion urea",
      "renal",
      "AKI",
      "prerenal",
    ],
    inputs: [
      {
        id: "urineUrea",
        label: "Urine Urea",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "plasmaUrea",
        label: "Plasma Urea",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "urineCr",
        label: "Urine Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "plasmaCr",
        label: "Plasma Creatinine",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "FEUrea can be useful when diuretics are present and FENa is less reliable.",
        "FEUrea < 35% suggests prerenal azotemia; > 50% suggests intrinsic renal injury.",
      ],
      warnings: [
        "FEUrea is less widely validated than FENa and should be used as a complementary test.",
        "Protein intake and corticosteroids can affect urea handling and may alter the ratio.",
      ],
      followUp: [
        "If FEUrea is equivocal, combine with clinical assessment and other urine biomarkers.",
        "Consider renal ultrasound if intrinsic renal injury is suspected.",
      ],
    },
    evidence: {
      source: "Nephrology Literature",
      reference:
        "Pépin MN, et al. Reassessment of the fractional excretion of urea for the differential diagnosis of acute renal failure. Clin Invest Med. 2007;30:E163-167.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2007",
      updatedAt: "2026-07",
      references: [
        "Renal physiology references",
        "Clinical nephrology references",
      ],
    },
    faq: [
      {
        question:
          "When should I use FEUrea instead of FENa?",
        answer:
          "Use FEUrea when the patient has received diuretics, which can increase urinary sodium and make FENa unreliable.",
      },
      {
        question: "What does FEUrea > 50% mean?",
        answer:
          "A FEUrea > 50% suggests intrinsic renal injury such as acute tubular necrosis.",
      },
    ],
    comparison: {
      title: "Which Renal Assessment Should I Use?",
      calculators: [
        {
          name: "FEUrea",
          href: "/calculators/feurea",
          bestFor:
            "Renal assessment when diuretics are present.",
          limitation:
            "Less widely validated than FENa.",
        },
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor:
            "Distinguishing prerenal azotemia from ATN.",
          limitation:
            "Unreliable with diuretic use.",
        },
        {
          name: "BUN/Creatinine Ratio",
          href: "/calculators/bun-creatinine-ratio",
          bestFor: "Rapid bedside assessment.",
          limitation:
            "Not a direct tubular function test.",
        },
      ],
    },
    relatedCalculators: [
      "fena",
      "bun-creatinine-ratio",
      "fractional-excretion-calculator",
      "ttkg",
    ],
    classification: [
      {
        max: 35,
        label: "Prerenal azotemia",
        status: "low",
      },
      {
        min: 35,
        max: 50,
        label: "Indeterminate",
        status: "normal",
      },
      {
        min: 50,
        label: "Intrinsic renal injury (ATN)",
        status: "high",
      },
    ],
  },

  // ── TTKG ─────────────────────────────────────────────
  ttkg: {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Calculates the transtubular potassium gradient to assess renal potassium handling.",
    formula:
      "TTKG = (urinek * plasmaosmolality) / (plasmak * urineosmolality)",
    normalRange: "8–12",
    keywords: [
      "TTKG",
      "potassium",
      "electrolytes",
      "renal",
      "hyperkalemia",
    ],
    inputs: [
      {
        id: "urineK",
        label: "Urine Potassium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "plasmaK",
        label: "Plasma Potassium",
        type: "number",
        unit: "mmol/L",
        required: true,
      },
      {
        id: "urineOsmolality",
        label: "Urine Osmolality",
        type: "number",
        unit: "mOsm/kg",
        required: true,
      },
      {
        id: "plasmaOsmolality",
        label: "Plasma Osmolality",
        type: "number",
        unit: "mOsm/kg",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "TTKG is used to assess the renal response to potassium handling, particularly in the evaluation of hyperkalemia.",
        "A TTKG > 10 in the setting of hyperkalemia suggests intact aldosterone-mediated potassium secretion.",
        "A TTKG < 8 in hyperkalemia suggests impaired distal potassium secretion (e.g. hypoaldosteronism, AKI).",
      ],
      warnings: [
        "Interpretation may be affected by diuretics and other renal conditions.",
        "Some experts have questioned the physiological validity of TTKG; use in conjunction with clinical assessment.",
      ],
      followUp: [
        "If TTKG suggests impaired potassium secretion, evaluate aldosterone and renin levels.",
        "Consider renal biopsy if intrinsic tubular disease is suspected.",
      ],
    },
    evidence: {
      source: "Nephrology Literature",
      reference:
        "Kamel KS, et al. Transtubular potassium gradient in the assessment of hyperkalemia. J Am Soc Nephrol. 2001;12:1839-1844.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2001",
      updatedAt: "2026-07",
      references: [
        "Clinical electrolyte guidelines",
        "Nephrology references",
      ],
    },
    faq: [
      {
        question:
          "What does a low TTKG mean in hyperkalemia?",
        answer:
          "A low TTKG (< 8) in the setting of hyperkalemia suggests impaired aldosterone-mediated potassium secretion, possibly due to hypoaldosteronism or distal tubular dysfunction.",
      },
      {
        question: "Is TTKG still used clinically?",
        answer:
          "TTKG remains a useful bedside tool but some experts have questioned its physiological basis. It should be used alongside other clinical data.",
      },
    ],
    comparison: {
      title: "Which Potassium Assessment Should I Use?",
      calculators: [
        {
          name: "TTKG",
          href: "/calculators/ttkg",
          bestFor:
            "Assessing renal potassium secretion in hyperkalemia.",
          limitation:
            "Physiological validity has been questioned.",
        },
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor:
            "Assessing sodium handling in AKI.",
          limitation: "Does not assess potassium.",
        },
        {
          name: "FEUrea",
          href: "/calculators/feurea",
          bestFor:
            "Prerenal vs. intrinsic AKI when on diuretics.",
          limitation: "Does not assess potassium.",
        },
      ],
    },
    relatedCalculators: [
      "fena",
      "feurea",
      "bun-creatinine-ratio",
    ],
    classification: [
      {
        max: 8,
        label: "Impaired K⁺ secretion",
        status: "low",
      },
      {
        min: 8,
        max: 12,
        label: "Normal renal K⁺ response",
        status: "normal",
      },
      {
        min: 12,
        label: "Enhanced K⁺ secretion",
        status: "high",
      },
    ],
  },

  // ── Calcium × Phosphate Product ──────────────────────
  "calcium-phosphate-product": {
    category: "Nephrology",
    specialty: "Internal Medicine",
    description:
      "Calculates the calcium-phosphate product used in renal risk assessment for vascular calcification.",
    formula: "CaP = calcium * phosphate",
    normalRange: "< 55 mg²/dL²",
    keywords: [
      "calcium phosphate product",
      "phosphate",
      "renal",
      "mineral metabolism",
      "vascular calcification",
    ],
    inputs: [
      {
        id: "calcium",
        label: "Calcium",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
      {
        id: "phosphate",
        label: "Phosphate",
        type: "number",
        unit: "mg/dL",
        required: true,
      },
    ],
    clinicalGuidance: {
      advice: [
        "An elevated calcium-phosphate product (> 55 mg²/dL²) is associated with an increased risk of vascular calcification and cardiovascular morbidity.",
        "This product is particularly important to monitor in patients with chronic kidney disease and those on dialysis.",
      ],
      warnings: [
        "This should be interpreted with the patient's renal and mineral metabolism status.",
        "Treat phosphate elevation rather than calcium alone to reduce the calcium-phosphate product.",
      ],
      followUp: [
        "If elevated, assess dietary phosphorus intake and consider phosphate binders.",
        "Monitor parathyroid hormone (PTH) and vitamin D levels in CKD patients.",
      ],
    },
    evidence: {
      source: "Nephrology Literature",
      reference:
        "KDIGO CKD-MBD Guideline. Improving global outcomes (KDIGO) CKD-MBD update. Kidney Int Suppl. 2017;7:1-59.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2017",
      updatedAt: "2026-07",
      references: [
        "Nephrology references",
        "Clinical practice guidelines",
      ],
    },
    faq: [
      {
        question:
          "What does an elevated calcium-phosphate product mean?",
        answer:
          "A product > 55 mg²/dL² indicates an increased risk of metastatic calcification and vascular calcification, especially in CKD patients.",
      },
      {
        question:
          "How do you lower the calcium-phosphate product?",
        answer:
          "Reduce dietary phosphorus, use phosphate binders, and optimize dialysis adequacy. Avoid excessive calcium-based binders.",
      },
    ],
    comparison: {
      title: "Which Mineral Metabolism Calculator Should I Use?",
      calculators: [
        {
          name: "Calcium-Phosphate Product",
          href: "/calculators/calcium-phosphate-product",
          bestFor:
            "Assessing vascular calcification risk in CKD.",
          limitation:
            "Does not directly measure PTH or vitamin D status.",
        },
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Estimating kidney function.",
          limitation:
            "Does not assess mineral metabolism.",
        },
      ],
    },
    relatedCalculators: [
      "ckd-epi-2021",
      "cockcroft-gault",
      "albumin-creatinine-ratio",
    ],
    classification: [
      {
        max: 55,
        label: "Acceptable",
        status: "normal",
      },
      {
        min: 55,
        max: 70,
        label: "Elevated — increased calcification risk",
        status: "high",
      },
      {
        min: 70,
        label: "Critically elevated — high calcification risk",
        status: "critical",
      },
    ],
  },
};