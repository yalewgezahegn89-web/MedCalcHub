/**
 * Sprint 1.8 — Clinical Content Registry
 *
 * Parallel registry mapping calculator slugs to extended clinical content.
 * This registry is independent of CalculatorDefinition and calculate().
 */

import type { ClinicalContent } from "./clinical-content.types";

/**
 * Clinical content registry keyed by calculator slug.
 * Each entry contains extended educational/clinical content
 * that supplements (but does not replace) the calculator definition.
 */
export const clinicalContentRegistry: Record<
  string,
  ClinicalContent
> = {
  "anion-gap": {
    clinicalPurpose:
      "Calculates the serum anion gap to help differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).",
    howToUse: [
      "Measure serum sodium, chloride, and bicarbonate from the same blood draw.",
      "Enter each value in the appropriate field.",
      "Review the calculated anion gap and its interpretation.",
      "If serum albumin is low, also use the Albumin-Corrected Anion Gap calculator.",
    ],
    interpretation: {
      guide:
        "An anion gap of 8–12 mmol/L is normal. Values above 12 mmol/L in the context of metabolic acidosis suggest HAGMA. Values below 7 mmol/L may indicate hypoalbuminemia or laboratory error.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of metabolic acidosis",
      "Suspected toxic ingestion (methanol, ethylene glycol)",
      "Diabetic ketoacidosis workup",
      "Lactic acidosis evaluation",
      "Critically ill patients with acid-base disorders",
    ],
    whenNotToUse: [
      "As a standalone diagnostic tool without clinical context",
      "When serum albumin is significantly low without correction",
    ],
    limitations: [
      "Does not account for hypoalbuminemia — use the corrected anion gap when albumin is low.",
      "Hypernatremia, hypokalemia, hypercalcemia, and hypermagnesemia can artifactually elevate the anion gap.",
      "Lithium, bromide, and iodide can cause spurious elevation.",
      "Not reliable in isolation; must interpret with ABG, electrolytes, and clinical context.",
    ],
    example: {
      description:
        "A 54-year-old man with known diabetes presents with Kussmaul breathing. Sodium is 140 mmol/L, chloride is 105 mmol/L, bicarbonate is 12 mmol/L.",
      inputs: {
        sodium: "140",
        chloride: "105",
        bicarbonate: "12",
      },
      expectedResult:
        "Anion gap = 140 − (105 + 12) = 23 mmol/L. This is markedly elevated and suggests a high anion gap metabolic acidosis, likely diabetic ketoacidosis.",
    },
    clinicalSignificance:
      "The anion gap is a fundamental tool in acid-base interpretation. An elevated anion gap in the setting of metabolic acidosis indicates accumulation of unmeasured anions and requires urgent investigation of the underlying cause.",
    references: [
      {
        citation:
          "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.",
        level: "Expert Review",
      },
      {
        citation:
          "Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.",
        level: "Textbook",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment. Always interpret laboratory values in the context of the individual patient's clinical presentation.",
  },

  "ckd-epi-2021": {
    clinicalPurpose:
      "Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation, which removed the race variable.",
    howToUse: [
      "Enter the patient's age, sex, and serum creatinine (mg/dL).",
      "Use the most recent stable creatinine value.",
      "Review the eGFR and CKD stage.",
      "Repeat testing after 3 months to confirm chronicity before diagnosing CKD.",
    ],
    interpretation: {
      guide:
        "eGFR ≥90 is normal (G1). 60–89 is mildly decreased (G2). 45–59 is mild-to-moderate decrease (G3a). 30–44 is moderate-to-severe decrease (G3b). 15–29 is severely decreased (G4). <15 indicates kidney failure (G5).",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Routine estimation of kidney function",
      "CKD staging per KDIGO guidelines",
      "Monitoring progressive kidney disease",
      "Initial kidney function assessment",
    ],
    whenNotToUse: [
      "Medication dosing without checking drug-specific guidance (Cockcroft-Gault may be required)",
      "Acute kidney injury — use stable baseline creatinine",
      "Extremes of muscle mass without clinical correlation",
      "Pregnancy — use pregnancy-specific GFR estimation",
    ],
    limitations: [
      "CKD-EPI is an estimate; it may be inaccurate in extremes of muscle mass, amputees, or pregnancy.",
      "Do not use for medication dosing without checking drug-specific guidance.",
      "Less accurate at very high or very low GFR values.",
      "The 2021 equation does not include race, which improves equity but may differ from older equations in some populations.",
    ],
    example: {
      description:
        "A 65-year-old woman with diabetes has a serum creatinine of 1.1 mg/dL.",
      inputs: {
        age: "65",
        sex: "2",
        creatinine: "1.1",
      },
      expectedResult:
        "eGFR ≈ 56 mL/min/1.73 m², which corresponds to CKD stage G3a (mild-to-moderate decrease). Repeat in 3 months to confirm chronicity.",
    },
    clinicalSignificance:
      "eGFR is essential for CKD staging, drug dosing decisions, and monitoring kidney function over time. The 2021 CKD-EPI equation is the current standard recommended by KDIGO.",
    references: [
      {
        citation:
          "Inker LA, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385:1737-1749.",
        level: "Level I",
      },
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for CKD.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "NKF / KDIGO",
      reference:
        "Inker LA, et al. NEJM. 2021;385:1737-1749.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2021",
      references: [
        "Inker LA, et al. NEJM. 2021.",
        "KDIGO 2024 Clinical Practice Guideline for CKD.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. eGFR is an estimate and should be interpreted alongside clinical context. It does not replace direct GFR measurement or clinical judgment.",
  },

  "corrected-qt": {
    clinicalPurpose:
      "Corrects the QT interval for heart rate using the Bazett formula to assess QT prolongation risk.",
    howToUse: [
      "Measure the QT interval from the ECG (from the start of the QRS complex to the end of the T wave).",
      "Enter the QT interval in milliseconds.",
      "Enter the heart rate in beats per minute.",
      "Select the patient's sex (thresholds differ between men and women).",
      "Review the corrected QTc value and its interpretation.",
    ],
    interpretation: {
      guide:
        "QTc <450 ms (men) or <460 ms (women) is normal. 450–499 ms (men) or 460–499 ms (women) indicates prolongation. ≥500 ms indicates marked prolongation and increased risk of Torsades de Pointes.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessment of QT prolongation risk",
      "Patients with electrolyte abnormalities (hypokalemia, hypomagnesemia, hypocalcemia)",
      "Medication review for QT-prolonging drugs",
      "Pre-operative cardiac risk assessment",
      "Evaluation of syncope or family history of sudden cardiac death",
    ],
    whenNotToUse: [
      "As a standalone risk assessment without clinical context",
      "When the ECG tracing quality is poor and QT measurement is unreliable",
    ],
    limitations: [
      "The Bazett formula tends to over-correct at high heart rates and under-correct at low heart rates.",
      "QT measurement itself has significant inter-observer variability.",
      "Does not replace clinical assessment of arrhythmia risk.",
      "Other correction formulas (Fridericia, Framingham) may be more appropriate in certain clinical settings.",
    ],
    example: {
      description:
        "A 45-year-old woman has a QT interval of 460 ms and a heart rate of 72 bpm.",
      inputs: {
        qt: "460",
        heartRate: "72",
        sex: "2",
      },
      expectedResult:
        "QTc ≈ 504 ms (using Bazett formula). This is markedly prolonged (≥500 ms) and indicates increased risk of Torsades de Pointes.",
    },
    clinicalSignificance:
      "QT prolongation is a risk factor for Torsades de Pointes, a potentially fatal ventricular arrhythmia. Identifying prolonged QTc allows clinicians to address modifiable risk factors such as electrolyte abnormalities and QT-prolonging medications.",
    references: [
      {
        citation:
          "Bazett HC. An analysis of the time-relations of electrocardiograms. Heart. 1920;7:353-370.",
        level: "Original Description",
      },
      {
        citation:
          "AHA ECG Guidelines for the Interpretation of the Resting 12-Lead ECG.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. QTc interpretation should always be performed in the context of the individual patient's clinical presentation, medication list, and ECG quality.",
  },

  "bmi": {
    clinicalPurpose:
      "Calculates Body Mass Index (BMI) to screen for underweight, normal weight, overweight, and obesity categories.",
    howToUse: [
      "Enter the patient's weight in kilograms.",
      "Enter the patient's height in centimeters.",
      "Review the BMI value and weight category.",
    ],
    interpretation: {
      guide:
        "BMI <18.5 is underweight. 18.5–24.9 is normal weight. 25–29.9 is overweight. ≥30 is obesity.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
    },
    whenToUse: [
      "Initial screening for weight status in adults",
      "Population-level health assessments",
      "Baseline measurement for weight management programs",
      "Cardiovascular and metabolic risk assessment",
    ],
    whenNotToUse: [
      "As a sole diagnostic criterion for obesity in athletes or individuals with high muscle mass",
      "In very elderly patients where body composition changes may affect interpretation",
      "As a replacement for more detailed body composition analysis when clinically needed",
    ],
    limitations: [
      "Does not distinguish between fat mass and lean mass.",
      "May misclassify muscular individuals as overweight or obese.",
      "Less accurate in elderly patients, athletes, and pregnant women.",
      "Does not account for fat distribution (use waist-to-hip ratio for central obesity assessment).",
      "Pediatric BMI interpretation requires age- and sex-specific percentiles.",
    ],
    example: {
      description:
        "A 35-year-old woman weighs 68 kg and is 165 cm tall.",
      inputs: {
        weight: "68",
        height: "165",
      },
      expectedResult:
        "BMI = 68 / (1.65)² = 24.98 kg/m². This is at the upper end of normal weight, bordering on overweight.",
    },
    clinicalSignificance:
      "BMI is a widely used screening tool that correlates with metabolic risk. While not a perfect measure of body fatness, it provides a quick, inexpensive assessment that guides further clinical evaluation and intervention.",
    references: [
      {
        citation:
          "WHO. Body Mass Index — BMI. World Health Organization.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical screening purposes only. BMI is a screening tool and does not diagnose body fatness or health. Clinical decisions should be based on comprehensive patient assessment.",
  },

  "bun-creatinine-ratio": {
    clinicalPurpose:
      "Calculates the blood urea nitrogen (BUN) to serum creatinine ratio to help differentiate causes of acute kidney injury and assess hydration status.",
    howToUse: [
      "Enter the BUN value in mg/dL.",
      "Enter the serum creatinine value in mg/dL.",
      "Review the ratio and its interpretation.",
    ],
    interpretation: {
      guide:
        "A BUN/Cr ratio >20:1 suggests a prerenal cause (dehydration, heart failure, GI bleeding). A ratio of 10–20:1 is normal or suggests intrinsic renal disease. A ratio <10:1 may indicate reduced protein intake, liver disease, or overhydration.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of acute kidney injury",
      "Differentiating prerenal from intrinsic renal causes",
      "Assessment of hydration status",
      "Evaluation of elevated BUN without elevated creatinine",
    ],
    whenNotToUse: [
      "As a standalone diagnostic tool",
      "In patients on dialysis",
      "When BUN is affected by upper GI bleeding or high-protein diet",
    ],
    limitations: [
      "Upper GI bleeding, high-protein diet, corticosteroids, and tetracycline can elevate BUN independently of creatinine.",
      "Severe liver disease can lower BUN, reducing the ratio.",
      "Muscle mass affects creatinine, which can alter the ratio in elderly or muscular patients.",
      "Should be interpreted alongside urine electrolytes and clinical context.",
    ],
    example: {
      description:
        "A 70-year-old man presents with dehydration. BUN is 45 mg/dL and creatinine is 2.0 mg/dL.",
      inputs: {
        bun: "45",
        creatinine: "2.0",
      },
      expectedResult:
        "BUN/Cr ratio = 45/2 = 22.5:1. This elevated ratio suggests a prerenal cause, consistent with dehydration.",
    },
    clinicalSignificance:
      "The BUN/Cr ratio is a simple, widely available tool for assessing the likely cause of elevated creatinine. It helps guide initial management decisions in acute kidney injury, particularly in distinguishing prerenal from intrinsic renal disease.",
    references: [
      {
        citation:
          "Powers KS. Acute renal failure: Diagnostic approach and management. Pediatr Rev. 2011;32:109-118.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The BUN/Cr ratio should be interpreted in the context of the individual patient's clinical presentation and other laboratory values.",
  },

  "corrected-sodium": {
    clinicalPurpose:
      "Corrects the measured serum sodium for hyperglycemia to reveal the true sodium status in patients with significant glucose elevation.",
    howToUse: [
      "Enter the measured serum sodium in mmol/L.",
      "Enter the serum glucose in mg/dL.",
      "Review the corrected sodium value.",
    ],
    interpretation: {
      guide:
        "Corrected sodium accounts for the dilutional effect of glucose. For every 100 mg/dL increase in glucose above 100 mg/dL, sodium decreases by approximately 1.6 mmol/L. A normal corrected sodium with a low measured sodium indicates true dilutional hyponatremia.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Diabetic ketoacidosis (DKA)",
      "Hyperosmolar hyperglycemic state (HHS)",
      "Any condition with significant hyperglycemia",
      "Interpretation of sodium in uncontrolled diabetes",
    ],
    whenNotToUse: [
      "When glucose is normal or only mildly elevated",
      "As a replacement for clinical assessment of fluid status",
    ],
    limitations: [
      "The correction factor (1.6 mmol/L per 100 mg/dL glucose) is an approximation.",
      "May be less accurate at very high glucose levels (>600 mg/dL).",
      "Does not account for other osmotic agents (mannitol, glycine).",
      "Should be used alongside clinical assessment of volume status.",
    ],
    example: {
      description:
        "A 58-year-old woman with DKA has a measured sodium of 128 mmol/L and glucose of 500 mg/dL.",
      inputs: {
        sodium: "128",
        glucose: "500",
      },
      expectedResult:
        "Corrected sodium ≈ 128 + 1.6 × (500−100)/100 = 128 + 6.4 = 134.4 mmol/L. The corrected sodium is near-normal, suggesting that the low measured sodium is primarily due to glucose-driven dilution.",
    },
    clinicalSignificance:
      "In hyperglycemic states, water shifts from the intracellular to the extracellular space, diluting serum sodium. Without correction, the true sodium status may be masked, leading to inappropriate fluid management.",
    references: [
      {
        citation:
          "Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399-403.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Sodium correction is an approximation and should be interpreted alongside clinical assessment of the patient's volume and glucose status.",
  },

  "osmolar-gap": {
    clinicalPurpose:
      "Calculates the difference between measured and calculated serum osmolality to detect the presence of unmeasured osmoles, which may indicate toxic alcohol ingestion.",
    howToUse: [
      "Enter the measured serum osmolality (mOsm/kg) from the laboratory.",
      "Enter serum sodium (mmol/L), glucose (mg/dL), and BUN (mg/dL).",
      "Review the osmolar gap and its interpretation.",
    ],
    interpretation: {
      guide:
        "An osmolar gap >10 mOsm/kg may indicate the presence of unmeasured osmoles such as toxic alcohols (methanol, ethylene glycol), ethanol, or other ingestions. A normal osmolar gap does not completely exclude toxic ingestion in delayed presentations.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Suspected toxic alcohol ingestion (methanol, ethylene glycol, isopropanol)",
      "Emergency department evaluation of unknown ingestion",
      "Altered mental status with metabolic acidosis",
      "Evaluation of elevated anion gap with suspected ingestion",
    ],
    whenNotToUse: [
      "When measured osmolality is not available",
      "As a standalone diagnostic test for toxic ingestion",
      "When the clinical picture clearly points to a non-toxicological cause",
    ],
    limitations: [
      "A normal osmolar gap does not exclude toxic ingestion, particularly in delayed presentations where metabolism has occurred.",
      "Requires a measured serum osmolality from the laboratory.",
      "Ethanol ingestion elevates the osmolar gap but is not necessarily toxic.",
      "Uremia, ketoacidosis, and alcohol can also elevate the osmolar gap.",
    ],
    example: {
      description:
        "A 30-year-old man presents with altered mental status and metabolic acidosis. Measured serum osmolality is 330 mOsm/kg, sodium is 140 mmol/L, glucose is 100 mg/dL, and BUN is 15 mg/dL.",
      inputs: {
        measured: "330",
        sodium: "140",
        glucose: "100",
        bun: "15",
      },
      expectedResult:
        "Calculated osmolality ≈ 2 × 140 + 100/18 + 15/2.8 = 280 + 5.6 + 5.4 = 291 mOsm/kg. Osmolar gap ≈ 330 − 291 = 39 mOsm/kg. This elevated osmolar gap, in the context of metabolic acidosis, raises concern for unmeasured osmoles such as toxic alcohol ingestion.",
    },
    clinicalSignificance:
      "An elevated osmolar gap in the appropriate clinical setting suggests the presence of an unmeasured osmole, which may be a toxic alcohol. Early identification is critical because specific antidotes (fomepizole, ethanol) and dialysis can be life-saving.",
    references: [
      {
        citation:
          "Brent J, et al. Fomepizole for the treatment of methanol poisoning. N Engl J Med. 2001;344:424-429.",
        level: "Level I",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. An elevated osmolar gap requires urgent clinical evaluation. Do not delay treatment while awaiting laboratory confirmation.",
  },

  "news2": {
    clinicalPurpose:
      "Calculates the National Early Warning Score 2 (NEWS2) to standardize the assessment of acute illness severity and trigger appropriate clinical responses.",
    howToUse: [
      "Enter the patient's respiratory rate, SpO₂, temperature, systolic blood pressure, and heart rate.",
      "Review the aggregate NEWS2 score and the corresponding clinical response level.",
    ],
    interpretation: {
      guide:
        "A NEWS2 score of 0 indicates low clinical risk. Scores of 1–4 suggest low-to-moderate risk; evaluate by a competent registered nurse. A score of 5–6 or any single score of 3 in any parameter indicates high risk; urgent assessment by a clinician with critical care competencies. A score of ≥7 indicates very high risk; emergency assessment, likely ICU admission.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Serial monitoring of acute inpatients",
      "Identifying clinical deterioration",
      "Standardizing communication about patient acuity",
      "Triggering escalation of care",
    ],
    whenNotToUse: [
      "In patients with Do Not Escalate (DNA-CPR) orders (use modified escalation pathways)",
      "In chronic conditions where baseline values may be persistently abnormal (consider individualized NEWS2)",
      "In pediatric patients (use PEWS instead)",
    ],
    limitations: [
      "Patients with chronic respiratory disease may have persistently low SpO₂ on air; consider using target SpO₂ ranges in the supplemental oxygen scoring.",
      "Does not replace comprehensive clinical assessment.",
      "A low score does not guarantee clinical stability.",
      "Patients on long-term oxygen therapy require individualized assessment.",
    ],
    example: {
      description:
        "A 72-year-old woman on the surgical ward has respiratory rate 24/min, SpO₂ 93% on air, temperature 38.2°C, systolic BP 100 mmHg, and pulse 110 bpm, and is alert.",
      inputs: {
        "respiratory-rate": "24",
        spo2: "93",
        temperature: "38.2",
        sbp: "100",
        pulse: "110",
      },
      expectedResult:
        "NEWS2 sub-scores: RR 2, SpO₂ 2, temperature 1, SBP 2, pulse 1 — aggregate 8, indicating very high clinical risk and requiring emergency clinical assessment.",
    },
    clinicalSignificance:
      "NEWS2 provides a standardized, evidence-based approach to detecting clinical deterioration. It has been shown to improve patient outcomes by enabling early intervention before critical deterioration occurs.",
    references: [
      {
        citation:
          "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. RCP, 2017.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. NEWS2 should be used as part of a comprehensive clinical assessment and does not replace clinical judgment.",
  },

  "cockcroft-gault": {
    clinicalPurpose:
      "Estimates creatinine clearance (CrCl) to guide drug dosing adjustments, particularly for renally cleared medications.",
    howToUse: [
      "Enter the patient's age, weight (kg), and serum creatinine (mg/dL).",
      "Select the patient's sex.",
      "Review the estimated creatinine clearance.",
    ],
    interpretation: {
      guide:
        "CrCl >90 mL/min is normal. 60–89 is mildly decreased. 30–59 is moderately decreased. 15–29 is severely decreased. <15 indicates kidney failure. Use the result to adjust medication doses per drug-specific guidance.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Drug dosing for renally cleared medications (many antibiotics, anticoagulants, diabetes medications)",
      "Situations where a medication label specifically requires Cockcroft-Gault CrCl",
      "When eGFR-based dosing is not specified in drug labeling",
    ],
    whenNotToUse: [
      "For CKD staging (use CKD-EPI eGFR instead)",
      "In patients with rapidly changing renal function (use actual measured CrCl or consider real-time eGFR)",
      "As a precise measure of GFR — it is an estimate",
    ],
    limitations: [
      "Uses estimated rather than measured creatinine clearance.",
      "Weight choice matters: actual, ideal, or adjusted body weight may be appropriate depending on clinical context.",
      "Less accurate in obesity, extreme muscle mass, amputees, and unstable renal function.",
      "Many drug dosing guidelines still reference Cockcroft-Gault despite its age.",
    ],
    example: {
      description:
        "A 70-year-old man weighing 75 kg has a serum creatinine of 1.4 mg/dL.",
      inputs: {
        age: "70",
        weight: "75",
        creatinine: "1.4",
        sex: "1",
      },
      expectedResult:
        "CrCl ≈ (140 − 70) × 75 / (72 × 1.4) ≈ 52.1 mL/min. This indicates moderate renal impairment and may require dose adjustment for renally cleared drugs.",
    },
    clinicalSignificance:
      "The Cockcroft-Gault equation remains the most widely referenced method for drug dosing adjustments in renal impairment, as most drug labeling and pharmacokinetic studies used this equation for dose adjustments.",
    references: [
      {
        citation:
          "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Drug dosing decisions should always consider the individual patient's clinical context and current drug labeling.",
  },

  "homa-ir": {
    clinicalPurpose:
      "Calculates the Homeostatic Model Assessment for Insulin Resistance (HOMA-IR) to estimate insulin resistance from fasting glucose and insulin levels.",
    howToUse: [
      "Obtain fasting serum glucose (mg/dL) and fasting insulin (µU/mL).",
      "Enter both values into the calculator.",
      "Review the HOMA-IR value and interpretation.",
    ],
    interpretation: {
      guide:
        "HOMA-IR ≤2.5 is generally considered normal. Values >2.5 suggest increasing insulin resistance. Higher values indicate greater insulin resistance and metabolic risk.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Research settings assessing insulin resistance",
      "Clinical evaluation of metabolic syndrome",
      "Monitoring response to lifestyle interventions for insulin resistance",
      "Complementing HOMA-B to distinguish insulin resistance from beta-cell dysfunction",
    ],
    whenNotToUse: [
      "In type 1 diabetes (beta-cell destruction makes HOMA-IR unreliable)",
      "In patients on exogenous insulin (exogenous insulin affects the calculation)",
      "As a standalone diagnostic test for insulin resistance",
    ],
    limitations: [
      "Requires fasting samples; non-fasting values are unreliable.",
      "Less validated in certain ethnic populations and age groups.",
      "Does not replace dynamic tests such as the hyperinsulinemic-euglycemic clamp.",
      "Insulin assay variability between laboratories can affect results.",
    ],
    example: {
      description:
        "A 45-year-old woman with a family history of type 2 diabetes has a fasting glucose of 110 mg/dL and fasting insulin of 15 µU/mL.",
      inputs: {
        glucose: "110",
        insulin: "15",
      },
      expectedResult:
        "HOMA-IR = (110 × 15) / (405) ≈ 4.07. This is above the normal threshold and indicates insulin resistance; evaluation for metabolic syndrome is warranted.",
    },
    clinicalSignificance:
      "HOMA-IR provides a simple, inexpensive estimate of insulin resistance that is useful in identifying patients at risk for type 2 diabetes and cardiovascular disease, and in monitoring the effectiveness of lifestyle interventions.",
    references: [
      {
        citation:
          "Matthews DR, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412-419.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-IR is a research and screening tool and should not be used as a standalone diagnostic test. Clinical decisions should be based on comprehensive metabolic assessment.",
  },

  "curb-65": {
    clinicalPurpose:
      "Stratifies severity and 30-day mortality risk in adults with community-acquired pneumonia (CAP) to help guide site-of-care decisions.",
    howToUse: [
      "Confirm the patient has community-acquired pneumonia before applying the score.",
      "Enter the patient's age, urea, respiratory rate, and systolic blood pressure.",
      "Select whether new-onset confusion is present.",
      "Review the score and the corresponding severity-based management suggestion.",
    ],
    interpretation: {
      guide:
        "CURB-65 is scored 0–5 with one point each for new-onset confusion, urea > 7 mmol/L, respiratory rate ≥ 30/min, systolic blood pressure < 90 mmHg, and age ≥ 65. Scores of 0–1 are typically managed as outpatients; a score of 2 suggests hospital admission; a score ≥ 3 indicates severe pneumonia and consideration of ICU-level care.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Severity assessment in community-acquired pneumonia in adults",
      "Site-of-care decision (outpatient vs hospital vs ICU)",
      "Mortality risk stratification at presentation",
    ],
    whenNotToUse: [
      "Hospital-acquired or ventilator-associated pneumonia",
      "Pediatric pneumonia — CURB-65 is not validated in children",
      "As a substitute for clinical judgment in unstable patients",
      "As the sole determinant of disposition in patients with severe hypoxia or sepsis",
    ],
    limitations: [
      "Derived and validated in adults with community-acquired pneumonia; not validated in children.",
      "Urea must reflect the current presentation and can be affected by renal function, dehydration, and GI bleeding.",
      "Age contributes a fixed point regardless of comorbidity burden.",
      "Does not account for hypoxia, immunocompromise, or sepsis severity beyond hypotension.",
      "The score should be combined with clinical judgment and assessment of oxygen requirements.",
    ],
    example: {
      description:
        "A 70-year-old man with community-acquired pneumonia has no new-onset confusion, urea 8.5 mmol/L, respiratory rate 24/min, and systolic blood pressure 105 mmHg.",
      inputs: {
        age: "70",
        confusion: "0",
        urea: "8.5",
        "respiratory-rate": "24",
        sbp: "105",
      },
      expectedResult:
        "CURB-65 = 2 (age ≥ 65 and urea > 7 mmol/L). Moderate severity — strongly consider hospital admission.",
    },
    clinicalSignificance:
      "CURB-65 is a validated, widely used tool that predicts 30-day mortality in community-acquired pneumonia and helps avoid both unnecessary admission of low-risk patients and unsafe discharge of high-risk patients.",
    references: [
      {
        citation:
          "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
        level: "Derivation/Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Severity scores inform but do not replace clinical judgment, especially in patients with hypoxia, sepsis, or significant comorbidity.",
  },

  "qsofa": {
    clinicalPurpose:
      "Identifies adults with suspected infection who are at high risk of sepsis-related organ dysfunction and death, prompting escalation of care.",
    howToUse: [
      "Use in a patient with suspected infection to prompt further assessment.",
      "Measure the respiratory rate and systolic blood pressure and assess mental status.",
      "Enter each value; each criterion met scores 1 point.",
      "A score of 2 or more should prompt escalation, including assessment for organ dysfunction and consideration of ICU-level care.",
    ],
    interpretation: {
      guide:
        "qSOFA ranges from 0–3. A score of 0 is low concern, 1 indicates moderate concern, and ≥ 2 indicates high risk of sepsis-related organ dysfunction and mortality and should prompt escalation of care.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Bedside screening in patients with suspected infection outside the ICU",
      "Rapid triage in the emergency department",
      "Serial reassessment for clinical deterioration in suspected sepsis",
    ],
    whenNotToUse: [
      "As the sole diagnostic tool for sepsis — use full clinical sepsis criteria and assessment",
      "In pediatric patients — qSOFA is not validated in children",
      "As a substitute for thorough clinical assessment and vital sign monitoring",
      "In pregnancy, where physiological changes may alter normal blood pressure and respiratory rate",
    ],
    limitations: [
      "qSOFA is a screening tool, not a diagnostic test for sepsis.",
      "It has lower sensitivity than the full SOFA score; a low qSOFA does not exclude sepsis.",
      "Intended primarily for non-ICU settings; predictive value is reduced in the ICU.",
      "Does not include lactate or other biomarkers.",
      "Physiological changes in pregnancy may affect interpretation of blood pressure and respiratory rate.",
    ],
    example: {
      description:
        "A 58-year-old woman with suspected urinary sepsis has a systolic blood pressure of 95 mmHg, respiratory rate 24/min, and is alert and oriented.",
      inputs: {
        sbp: "95",
        "respiratory-rate": "24",
        "mental-status": "0",
      },
      expectedResult:
        "qSOFA = 2 (SBP ≤ 100 mmHg and RR ≥ 22/min). High risk of sepsis-related organ dysfunction — escalate care urgently.",
    },
    clinicalSignificance:
      "qSOFA provides a rapid bedside screen that, in the setting of suspected infection, flags patients at elevated risk of poor outcomes and enables earlier recognition and treatment of sepsis.",
    references: [
      {
        citation:
          "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):762-774.",
        level: "Derivation/Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. qSOFA is a screening tool and must not replace full clinical assessment or delay treatment in patients with suspected sepsis.",
  },

  "gcs": {
    clinicalPurpose:
      "Provides a standardized measure of the level of consciousness based on eye, verbal, and motor responses, widely used in trauma, neurology, and critical care.",
    howToUse: [
      "Assess the best eye, verbal, and motor response, using noxious stimulation when the patient does not respond spontaneously or to voice.",
      "Record the best response in each component.",
      "Sum the three component scores to obtain the total GCS (3–15).",
      "Repeat at intervals and document trends — a fall of 2 points is clinically significant.",
    ],
    interpretation: {
      guide:
        "GCS 13–15 is generally considered mild impairment, 9–12 moderate, and ≤ 8 severe. A GCS ≤ 8 is commonly used as a threshold for consideration of airway protection. Scores must be interpreted in the context of sedation, intoxication, and baseline neurologic status, and pediatric verbal scoring differs for pre-verbal children.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Initial and serial assessment of consciousness after head trauma",
      "Monitoring neurologic status in critical illness",
      "Standardized communication of level of consciousness",
      "Triggering consideration of airway protection in severe brain injury",
    ],
    whenNotToUse: [
      "As the sole determinant of neurologic prognosis",
      "In patients whose responses are confounded by paralysis, deep sedation, or intubation (a modified GCS should be documented instead)",
      "As a replacement for a full neurologic examination including pupils",
    ],
    limitations: [
      "Does not assess brainstem function, pupil reactivity, or focal deficits.",
      "Interobserver variability exists; the best response should be recorded.",
      "Intubation, sedation, paralysis, and language barriers confound the verbal component.",
      "Pre-verbal children require age-adjusted verbal scoring.",
      "A single score is less informative than the trend over time.",
    ],
    example: {
      description:
        "A 40-year-old man after a fall opens his eyes to speech, is confused in conversation, and localizes to pain.",
      inputs: {
        eye: "3",
        verbal: "4",
        motor: "5",
      },
      expectedResult:
        "GCS = 3 + 4 + 5 = 12, indicating moderate impairment (9–12 range). Serial reassessment is warranted.",
    },
    clinicalSignificance:
      "The Glasgow Coma Scale is one of the most widely used clinical scales; it standardizes communication about the level of consciousness and correlates with outcome after traumatic brain injury.",
    references: [
      {
        citation:
          "Teasdale G, Jennett B. Assessment of coma and impaired consciousness: a practical scale. Lancet. 1974;304(7872):81-84.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The GCS is one component of neurologic assessment and must be interpreted alongside the full clinical picture.",
  },

  "shock-index": {
    clinicalPurpose:
      "Relates heart rate to systolic blood pressure to flag patients whose heart rate is inappropriately high relative to blood pressure, indicating impaired hemodynamic reserve.",
    howToUse: [
      "Obtain heart rate (bpm) and systolic blood pressure (mmHg) at the same time.",
      "Enter both values.",
      "Compare the result against the normal range (approximately 0.5–0.7).",
      "Use serial measurements to track trends during resuscitation.",
    ],
    interpretation: {
      guide:
        "A shock index of 0.5–0.7 is generally considered normal. Values above 0.7 are commonly regarded as elevated and warrant investigation; progressively higher values indicate increasing concern for impaired hemodynamic reserve, particularly in trauma, hemorrhage, and sepsis.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Rapid bedside assessment in trauma and suspected hemorrhage",
      "Screening for occult hypoperfusion in sepsis and critical illness",
      "Monitoring response to volume resuscitation",
      "Emergency triage when hemodynamics are concerning",
    ],
    whenNotToUse: [
      "As the sole indicator of shock",
      "In patients with bradycardia, pacemakers, or arrhythmias where heart rate is not a reliable marker",
      "In children, where normal values differ by age",
      "As a replacement for blood pressure, lactate, urine output, or perfusion assessment",
    ],
    limitations: [
      "Heart rate is affected by rate-control medications, pacemakers, and autonomic dysfunction.",
      "Does not measure cardiac output, lactate, or tissue perfusion directly.",
      "Normal reference values differ in children.",
      "A single normal value does not exclude compensated shock.",
    ],
    example: {
      description:
        "A 45-year-old man after a motor vehicle accident has a heart rate of 120 bpm and a systolic blood pressure of 80 mmHg.",
      inputs: {
        "heart-rate": "120",
        sbp: "80",
      },
      expectedResult:
        "Shock Index = 120 / 80 = 1.5. This is well above the normal range (0.5–0.7) and indicates significant hemodynamic compromise requiring urgent evaluation.",
    },
    clinicalSignificance:
      "The shock index is a simple, inexpensive screening tool that can identify compensated shock before frank hypotension develops, because heart rate often rises before blood pressure falls.",
    references: [
      {
        citation:
          "Rady MY, Smithline HA, Blake H, et al. A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department. Ann Emerg Med. 1994;24(4):685-690.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The shock index is a screening adjunct and must be interpreted with full hemodynamic and clinical assessment.",
  },

  "map": {
    clinicalPurpose:
      "Calculates mean arterial pressure (MAP), the average pressure driving perfusion of vital organs, from systolic and diastolic blood pressure.",
    howToUse: [
      "Measure the systolic and diastolic blood pressure.",
      "Enter both values.",
      "Review the calculated MAP against normal values and perfusion targets.",
    ],
    interpretation: {
      guide:
        "Normal resting MAP is approximately 70–100 mmHg. In sepsis and septic shock, a MAP ≥ 65 mmHg is a commonly cited target to support organ perfusion. Very low MAP raises concern for organ hypoperfusion, while the optimal target varies with the patient's baseline blood pressure and condition.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Hemodynamic assessment in the critically ill",
      "Guiding blood pressure targets in sepsis and shock",
      "Monitoring vasopressor therapy",
      "Assessing the risk of organ hypoperfusion",
    ],
    whenNotToUse: [
      "As a substitute for full hemodynamic monitoring (cardiac output, lactate, urine output)",
      "In isolation without clinical context",
    ],
    limitations: [
      "The formula estimates MAP from a formula rather than a direct measurement.",
      "It is less reliable with wide pulse pressures or very high heart rates.",
      "Optimal MAP targets vary by patient and condition (e.g., chronic hypertension, age).",
      "Does not reflect the adequacy of cardiac output or tissue perfusion.",
    ],
    example: {
      description:
        "A 60-year-old man with septic shock has a blood pressure of 90/60 mmHg.",
      inputs: {
        sbp: "90",
        dbp: "60",
      },
      expectedResult:
        "MAP = (90 + 2 × 60) / 3 = 70 mmHg, meeting the commonly cited ≥ 65 mmHg perfusion target in sepsis.",
    },
    clinicalSignificance:
      "MAP reflects the driving pressure for organ perfusion more closely than systolic or diastolic pressure alone and is a central parameter in resuscitation and vasopressor management.",
    references: [
      {
        citation:
          "Meaney E, Alva F, Moguel R, et al. Formula and nomogram for the sphygmomanometric calculation of the mean arterial pressure. Heart. 2000;84(1):64.",
        level: "Original Description",
      },
      {
        citation:
          "Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. MAP targets should be individualized based on clinical context and institutional protocols.",
  },

  "mdrd": {
    clinicalPurpose:
      "Estimates glomerular filtration rate (eGFR) using the 4-variable MDRD equation, primarily encountered in older laboratory reports and historical comparisons.",
    howToUse: [
      "Enter the patient's age, sex, and serum creatinine (mg/dL).",
      "Review the estimated eGFR and the corresponding CKD G stage.",
      "For new clinical decisions, prefer the CKD-EPI 2021 equation when available.",
    ],
    interpretation: {
      guide:
        "MDRD eGFR is interpreted using the same KDIGO G stages as CKD-EPI: G1 ≥ 90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, and G5 < 15 mL/min/1.73 m². The equation applies a female adjustment factor (× 0.742).",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Comparing with older laboratory reports that still report MDRD eGFR",
      "Historical interpretation of eGFR trends",
      "Where CKD-EPI is unavailable",
    ],
    whenNotToUse: [
      "For new clinical decisions when CKD-EPI is available",
      "For medication dosing without drug-specific guidance (Cockcroft-Gault is commonly referenced)",
      "In acute kidney injury with unstable creatinine",
      "At extremes of body size or muscle mass without clinical correlation",
    ],
    limitations: [
      "Tends to underestimate GFR when the true GFR is above 60 mL/min/1.73 m².",
      "Was developed in patients with known CKD and is less accurate in healthy individuals.",
      "Values may differ from CKD-EPI; trends should be compared within the same equation.",
      "Less accurate at extremes of muscle mass and body habitus.",
    ],
    example: {
      description:
        "A 65-year-old woman has a serum creatinine of 1.1 mg/dL.",
      inputs: {
        age: "65",
        sex: "2",
        creatinine: "1.1",
      },
      expectedResult:
        "eGFR ≈ 175 × 1.1^-1.154 × 65^-0.203 × 0.742 ≈ 50 mL/min/1.73 m², corresponding to CKD stage G3a (45–59).",
    },
    clinicalSignificance:
      "The MDRD equation made eGFR reporting practical and remains important for interpreting older laboratory results and understanding why CKD-EPI has replaced it.",
    references: [
      {
        citation:
          "Levey AS, Bosch JP, Lewis JB, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130(6):461-470.",
        level: "Original Description",
      },
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. eGFR is an estimate and MDRD has been largely superseded by CKD-EPI for current clinical decisions.",
  },

  "fena": {
    clinicalPurpose:
      "Quantifies the fractional excretion of sodium to help distinguish prerenal azotemia from intrinsic renal injury (such as acute tubular necrosis) in acute kidney injury.",
    howToUse: [
      "Obtain a spot urine sodium and urine creatinine together with paired plasma sodium and plasma creatinine.",
      "Enter all four values.",
      "Review the FENa and its suggested category.",
      "In patients receiving diuretics, consider FEUrea instead.",
    ],
      interpretation: {
        guide:
          "FENa < 1% suggests prerenal azotemia (the kidneys are appropriately conserving sodium), 1–2% is indeterminate, and > 2% suggests intrinsic renal injury such as ATN. Interpretation is unreliable in the setting of diuretics, chronic kidney disease, and in the elderly.",
        sexSpecific: false,
        ageSpecific: false,
      },
      whenToUse: [
        "Evaluation of acute kidney injury to differentiate prerenal from intrinsic causes",
        "When paired urine and plasma electrolytes are available",
        "Complementing the BUN/Cr ratio and FEUrea",
      ],
    whenNotToUse: [
      "In patients receiving diuretics — prefer FEUrea",
      "In chronic kidney disease or the elderly, where thresholds are less reliable",
      "In acute kidney injury with rapidly changing renal function",
      "As a standalone diagnostic test",
    ],
    limitations: [
      "Diuretics increase urinary sodium excretion and invalidate the test.",
      "Chronic kidney disease and older age reduce its discriminating ability.",
      "Requires spot urine and plasma samples from the same time point.",
      "Results may be variable with obstruction and other intrinsic causes.",
      "Does not, by itself, establish the cause of acute kidney injury.",
    ],
    example: {
      description:
        "A 55-year-old man with diarrhea-induced volume depletion has a urine sodium of 20 mmol/L, plasma sodium 140 mmol/L, urine creatinine 100 mg/dL, and plasma creatinine 1.0 mg/dL.",
      inputs: {
        urineNa: "20",
        plasmaNa: "140",
        urineCr: "100",
        plasmaCr: "1.0",
      },
      expectedResult:
        "FENa = (20/140) ÷ (100/1.0) × 100 ≈ 0.14%. This low value suggests prerenal azotemia — the kidneys are conserving sodium appropriately.",
    },
    clinicalSignificance:
      "FENa is a classic bedside test that helps clinicians identify potentially reversible prerenal causes of AKI, where prompt volume resuscitation may prevent progression to intrinsic injury.",
    references: [
      {
        citation:
          "Carvounis CP, et al. Significance of the fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62(3):1184-1191.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FENa must be interpreted with the clinical context and is unreliable in patients on diuretics or with chronic kidney disease.",
  },

  "feurea": {
    clinicalPurpose:
      "Estimates the fractional excretion of urea to help distinguish prerenal azotemia from intrinsic renal injury, particularly useful when diuretics make FENa unreliable.",
    howToUse: [
      "Use when the patient is receiving diuretics or FENa is otherwise unreliable.",
      "Obtain paired urine urea, plasma urea, urine creatinine, and plasma creatinine.",
      "Enter all four values.",
      "Review the FEUrea and its suggested category.",
    ],
    interpretation: {
      guide:
        "FEUrea < 35% suggests prerenal azotemia, 35–50% is indeterminate, and > 50% suggests intrinsic renal injury such as ATN. Because urea reabsorption is less affected by diuretics than sodium, FEUrea retains diagnostic utility in patients on diuretics.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "AKI evaluation when diuretics have been given",
      "Complementing FENa in the prerenal-versus-intrinsic distinction",
      "When the BUN/Cr ratio is inconclusive",
    ],
    whenNotToUse: [
      "As a replacement for FENa when no diuretics are involved",
      "As a standalone diagnostic test",
      "In severe liver disease, where urea production is reduced",
    ],
    limitations: [
      "Less widely validated than FENa.",
      "Urea handling is influenced by protein intake, catabolic states, and corticosteroids.",
      "Reduced hepatic urea production affects both serum and urine urea.",
      "Thresholds are less well established in some populations.",
    ],
    example: {
      description:
        "A 68-year-old woman with heart failure on furosemide has a urine urea of 300 mg/dL, plasma urea 25 mg/dL, urine creatinine 100 mg/dL, and plasma creatinine 1.5 mg/dL.",
      inputs: {
        urineUrea: "300",
        plasmaUrea: "25",
        urineCr: "100",
        plasmaCr: "1.5",
      },
      expectedResult:
        "FEUrea = (300/25) ÷ (100/1.5) × 100 ≈ 18%. This value below 35% suggests prerenal azotemia.",
    },
    clinicalSignificance:
      "Because diuretics blunt the diagnostic utility of FENa, FEUrea provides a useful complementary test for the prerenal-versus-intrinsic distinction in patients on diuretics.",
    references: [
      {
        citation:
          "Pépin MN, et al. Reassessment of the fractional excretion of urea for the differential diagnosis of acute renal failure. Clin Invest Med. 2007;30(5):E163-167.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEUrea is a complementary test and must be interpreted alongside FENa, urine studies, and clinical context.",
  },

  "albumin-creatinine-ratio": {
    clinicalPurpose:
      "Quantifies urine albumin relative to urine creatinine to screen for and stage chronic kidney disease (albuminuria categories A1–A3).",
    howToUse: [
      "Obtain a spot urine sample; a first-morning void is preferred.",
      "Enter urine albumin (mg/L) and urine creatinine (g/L).",
      "Review the ACR and the corresponding albuminuria category.",
      "Confirm persistence with repeated measurements over at least 3 months before diagnosing CKD.",
    ],
    interpretation: {
      guide:
        "ACR < 30 mg/g is normal to mildly increased albuminuria (A1), 30–300 mg/g is moderately increased (A2), and > 300 mg/g is severely increased (A3). Albuminuria should be interpreted together with eGFR, and persistent elevation for at least 3 months supports a diagnosis of CKD. Pediatric reference values and pregnancy-specific criteria differ and require age- and pregnancy-appropriate interpretation.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
      pregnancy: true,
    },
    whenToUse: [
      "CKD screening in diabetes, hypertension, and cardiovascular disease",
      "CKD staging alongside eGFR",
      "Monitoring response to renin-angiotensin system blockade",
      "Risk stratification for CKD progression",
    ],
    whenNotToUse: [
      "To diagnose CKD from a single abnormal result",
      "During acute conditions causing transient albuminuria (fever, exercise, urinary tract infection, heart failure decompensation)",
      "As a replacement for eGFR assessment",
      "Without pregnancy-specific guidance in pregnant patients",
    ],
    limitations: [
      "Transient albuminuria from fever, exercise, or urinary tract infection can elevate the ratio.",
      "Urine creatinine varies with muscle mass, affecting the ratio at extremes of body habitus.",
      "First-morning voids are preferred; the collection method and urine concentration affect the result.",
      "Pediatric reference values and pregnancy-specific thresholds differ from adult non-pregnant values.",
      "Assesses albuminuria only — it does not measure kidney function (eGFR).",
    ],
    example: {
      description:
        "A 52-year-old man with type 2 diabetes has a spot urine albumin of 250 mg/L and urine creatinine of 1.0 g/L.",
      inputs: {
        albumin: "250",
        creatinine: "1.0",
      },
      expectedResult:
        "ACR = 250 / 1.0 = 250 mg/g, indicating moderately increased albuminuria (A2). Repeat measurement is needed to confirm persistence.",
    },
    clinicalSignificance:
      "ACR is a cornerstone of CKD screening and staging; it detects early kidney damage before eGFR declines and independently stratifies cardiovascular and renal risk.",
    references: [
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Persistent albuminuria and the diagnosis of CKD require confirmatory testing over at least 3 months alongside eGFR.",
  },

  "corrected-calcium": {
    clinicalPurpose:
      "Adjusts measured total serum calcium for hypoalbuminemia to estimate the physiologically relevant total calcium, since a large fraction of serum calcium is albumin-bound.",
    howToUse: [
      "Measure total serum calcium (mg/dL) and albumin (g/dL) from the same blood sample.",
      "Enter both values.",
      "Review the corrected calcium against the normal range.",
      "When ionized calcium is available, use it for clinical decisions, especially in the critically ill.",
    ],
    interpretation: {
      guide:
        "Corrected calcium < 8.5 mg/dL indicates hypocalcemia, 8.5–10.5 mg/dL is normal, ≥ 10.6 mg/dL is hypercalcemia, and ≥ 12.5 mg/dL is severe hypercalcemia. The correction assumes a normal albumin of 4.0 g/dL and becomes less reliable when albumin is below 2.0 g/dL. In neonates and children, correction factors and reference ranges differ.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: true,
    },
    whenToUse: [
      "Interpreting total calcium when serum albumin is low (liver disease, nephrotic syndrome, malnutrition)",
      "Initial assessment for possible hypocalcemia or hypercalcemia",
      "When ionized calcium measurement is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients, where ionized calcium is preferred",
      "When hypercalcemia is suspected — the correction is not validated for that setting",
      "In neonates and children, where reference ranges and correction factors differ",
      "In patients with marked acid-base disturbance, which alters calcium–albumin binding",
    ],
    limitations: [
      "Assumes a fixed relationship between albumin and calcium binding that varies across populations.",
      "Does not account for serum pH, which changes calcium–protein binding.",
      "Becomes less reliable when albumin is below 2.0 g/dL.",
      "Is not a substitute for ionized calcium measurement.",
      "The 0.8 correction factor is an estimate; some institutions use 0.7 or 0.73.",
    ],
    example: {
      description:
        "A 63-year-old woman with cirrhosis has a measured total calcium of 8.0 mg/dL and serum albumin of 2.0 g/dL.",
      inputs: {
        calcium: "8.0",
        albumin: "2.0",
      },
      expectedResult:
        "Corrected calcium = 8.0 + 0.8 × (4 − 2) = 9.6 mg/dL, within the normal range. The low measured calcium was explained by hypoalbuminemia.",
    },
    clinicalSignificance:
      "Because a large fraction of serum calcium is protein-bound, low albumin can mask true calcium status; correction helps avoid unnecessary treatment of spurious hypocalcemia.",
    references: [
      {
        citation:
          "Pay DA, et al. Corrected calcium in hypercalcaemia and hypocalcaemia. Ann Clin Biochem. 2004;41(6):486-488.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The correction is an estimate; ionized calcium is the preferred measurement in the critically ill and when hypercalcemia is suspected.",
  },

  "homa-b": {
    clinicalPurpose:
      "Estimates pancreatic beta-cell function relative to the prevailing fasting glucose, complementing HOMA-IR in the assessment of glucose–insulin homeostasis.",
    howToUse: [
      "Obtain fasting plasma glucose (mmol/L) and fasting serum insulin (µU/mL).",
      "Enter both values.",
      "Review the HOMA-B percentage against the reference ranges.",
      "Interpret together with HOMA-IR to separate beta-cell dysfunction from insulin resistance.",
    ],
    interpretation: {
      guide:
        "HOMA-B of 100–200% is generally considered normal beta-cell function; 50–100% suggests reduced function; < 50% suggests significant beta-cell dysfunction; and ≥ 200% reflects hyperinsulinemia. Values must be interpreted in the context of the patient's fasting glucose and insulin.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Estimating beta-cell function in type 2 diabetes",
      "Research and longitudinal tracking of beta-cell decline",
      "Pairing with HOMA-IR to characterize glucose handling",
    ],
    whenNotToUse: [
      "In type 1 diabetes or in patients on exogenous insulin",
      "As a diagnostic test for diabetes",
      "When the patient is not fasting",
      "As a substitute for C-peptide when precise beta-cell assessment is needed",
    ],
    limitations: [
      "Requires fasting samples; non-fasting values are unreliable.",
      "Insulin assay variability limits comparability across laboratories and studies.",
      "May be transiently elevated in newly diagnosed type 2 diabetes due to glucotoxicity.",
      "Not validated for type 1 diabetes or exogenous insulin use.",
      "Is an estimate, not a direct measure of beta-cell mass.",
    ],
    example: {
      description:
        "A 50-year-old man with type 2 diabetes has a fasting glucose of 6.0 mmol/L and fasting insulin of 10 µU/mL.",
      inputs: {
        glucose: "6.0",
        insulin: "10",
      },
      expectedResult:
        "HOMA-B = (20 × 10) / (6.0 − 3.5) = 80%, suggesting reduced beta-cell function (50–100% range).",
    },
    clinicalSignificance:
      "HOMA-B provides a practical estimate of beta-cell function from routine fasting labs and helps track the progressive beta-cell decline characteristic of type 2 diabetes.",
    references: [
      {
        citation:
          "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-B is an estimate of beta-cell function and must not be used as a standalone diagnostic test.",
  },

  "insulin-sensitivity": {
    clinicalPurpose:
      "Presents insulin resistance as its reciprocal so that higher values indicate better insulin sensitivity, providing an intuitive complement to HOMA-IR.",
    howToUse: [
      "Enter the patient's HOMA-IR value.",
      "Review the insulin sensitivity score.",
      "Higher values (toward 1.0) reflect better sensitivity.",
    ],
    interpretation: {
      guide:
        "A score > 0.4 is generally considered good insulin sensitivity; 0.2–0.4 suggests reduced sensitivity; and < 0.2 indicates significant insulin resistance.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Quick clinic or bedside estimate of insulin sensitivity",
      "Presenting HOMA-IR results in a more intuitive direction",
      "Monitoring response to lifestyle interventions",
    ],
    whenNotToUse: [
      "In type 1 diabetes",
      "In patients on exogenous insulin",
      "As a dynamic measure of the insulin response to meals",
      "As a standalone diagnostic test",
    ],
    limitations: [
      "Is derived entirely from HOMA-IR and inherits its fasting and assay limitations.",
      "Captures a single fasting measurement, not the dynamic response to meals.",
      "Not validated in type 1 diabetes.",
      "Insulin assay variability affects the result.",
    ],
    example: {
      description:
        "A 48-year-old woman has a HOMA-IR of 4.0.",
      inputs: {
        homaIr: "4.0",
      },
      expectedResult:
        "Insulin sensitivity = 1 / 4.0 = 0.25, in the reduced range (0.2–0.4), consistent with meaningful insulin resistance.",
    },
    clinicalSignificance:
      "Expressing insulin resistance as sensitivity (1/HOMA-IR) makes results more intuitive for patients and clinicians tracking improvement, since values rise as metabolic health improves.",
    references: [
      {
        citation:
          "Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27(6):1487-1495.",
        level: "Review Article",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and research purposes only. Insulin sensitivity derived from HOMA-IR is an estimate and should not be used as a standalone diagnostic test.",
  },

  "bsa": {
    clinicalPurpose:
      "Estimates body surface area using the Mosteller formula, used to normalize physiological parameters and to dose selected medications.",
    howToUse: [
      "Measure weight (kg) and height (cm).",
      "Enter both values.",
      "Review the calculated BSA in m².",
    ],
    interpretation: {
      guide:
        "Typical adult BSA ranges from approximately 1.4–2.2 m². The value is used to index physiological parameters such as cardiac output and to dose certain medications normalized to body surface area.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Dosing medications that are normalized to body surface area",
      "Indexing cardiac output, renal, or other physiological parameters",
      "Assessment of body size in clinical studies",
    ],
    whenNotToUse: [
      "As a measure of body fatness — use BMI and body composition instead",
      "In place of weight-based dosing where the drug label specifies weight-based dosing",
      "As a substitute for the direct assessment of burn surface area",
    ],
    limitations: [
      "Several BSA formulas exist (Mosteller, DuBois, Haycock) and results differ slightly between them.",
      "Assumes a fixed weight–height relationship that is less accurate at extremes of body habitus.",
      "Is not a measure of body composition.",
      "Pediatric use is common, but the formula chosen should be consistent within an institution.",
    ],
    example: {
      description:
        "A 40-year-old woman weighs 70 kg and is 170 cm tall.",
      inputs: {
        weight: "70",
        height: "170",
      },
      expectedResult:
        "BSA = √((170 × 70) / 3600) ≈ 1.82 m², within the typical adult range.",
    },
    clinicalSignificance:
      "BSA is a standard index in physiology and pharmacology, used to scale physiological variables and guide dosing of several high-risk medications.",
    references: [
      {
        citation:
          "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dosing decisions must always follow drug-specific labeling and institutional protocols.",
  },

  "ideal-body-weight": {
    clinicalPurpose:
      "Estimates ideal body weight using the Devine formula, providing a size-adjusted reference weight used in drug dosing and physiological comparisons.",
    howToUse: [
      "Select the patient's sex.",
      "Enter height in centimeters.",
      "Review the estimated ideal body weight in kg.",
    ],
    interpretation: {
      guide:
        "IBW provides a reference weight for a given height and sex; it does not define health or body composition. It is commonly used as the weight basis for certain drug-dosing calculations and for deriving adjusted body weight.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "As a size-adjusted weight for drug dosing",
      "Calculating adjusted body weight for dosing in obesity",
      "Comparing patient weight against a height-based reference",
    ],
    whenNotToUse: [
      "To diagnose obesity or underweight — use BMI",
      "As a target weight for weight-loss programs",
      "In children, where age- and height-based references are needed",
      "In patients with major amputations without adjustment",
    ],
    limitations: [
      "The Devine formula was derived for adults and is not validated in children.",
      "May underestimate for patients with high lean mass and overestimate in other body types.",
      "IBW is a mathematical reference, not a measure of health.",
      "Different formulas (Devine, Robinson, Miller, Hamwi) yield different values.",
    ],
    example: {
      description:
        "A 35-year-old man is 180 cm tall.",
      inputs: {
        sex: "male",
        height: "180",
      },
      expectedResult:
        "IBW = 50 + 2.3 × (180/2.54 − 60) ≈ 75.0 kg using the Devine formula.",
    },
    clinicalSignificance:
      "IBW is the foundation for several weight-based dosing adjustments, particularly adjusted body weight in obese patients, and is widely used in clinical pharmacy and dosing practice.",
    references: [
      {
        citation:
          "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8(11):650-655.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Ideal body weight is an estimate and dosing decisions must follow drug-specific guidance.",
  },

  "adjusted-body-weight": {
    clinicalPurpose:
      "Provides a dosing weight for overweight and obese adults by combining ideal body weight with a fraction of the excess weight, used when medications require a body-weight-adjusted dose.",
    howToUse: [
      "Confirm the patient is overweight or obese, as this adjustment is intended for that population.",
      "Select sex, and enter height and actual weight.",
      "Review the adjusted body weight in kg.",
      "Use the adjusted weight in place of actual weight only where drug-specific guidance calls for it.",
    ],
    interpretation: {
      guide:
        "Adjusted body weight falls between ideal and actual body weight. It is intended for medication dosing in overweight and obese adults, where actual weight may lead to over-dosing and ideal weight to under-dosing.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Medication dosing in overweight and obese adults where the drug label or guidance specifies adjusted weight",
      "As a size-adjusted dosing weight when actual weight overestimates the relevant lean mass",
    ],
    whenNotToUse: [
      "In normal-weight patients, where the adjustment provides no benefit",
      "For all medications — many drugs are dosed by actual weight",
      "In children, where pediatric weight references apply",
      "Without checking drug-specific dosing guidance",
    ],
    limitations: [
      "The 0.4 adjustment factor is empirical and varies by source.",
      "Applies to adults; pediatric use requires other references.",
      "Is not a measure of body composition or lean mass.",
      "Whether to use actual, ideal, or adjusted weight depends on the specific drug.",
    ],
    example: {
      description:
        "A 45-year-old man who is 180 cm tall weighs 110 kg.",
      inputs: {
        sex: "male",
        height: "180",
        weight: "110",
      },
      expectedResult:
        "AdjBW = 75.0 + 0.4 × (110 − 75.0) = 89.0 kg, the adjusted dosing weight for this patient.",
    },
    clinicalSignificance:
      "Adjusted body weight helps balance the risk of over-dosing (with actual weight) and under-dosing (with ideal weight) for weight-based medications in obesity, where both extremes carry clinical risk.",
    references: [
      {
        citation:
          "ClinCalc Drug Dosing Reference. Adjusted Body Weight.",
        level: "Reference",
      },
      {
        citation:
          "ASHP Clinical Guidelines on medication dosing in obese patients.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Medication dosing must follow drug-specific labeling, pharmacokinetics, and institutional protocols.",
  },

  "child-pugh": {
    clinicalPurpose:
      "Scores the severity and prognosis of chronic liver disease and cirrhosis using bilirubin, albumin, INR, ascites, and hepatic encephalopathy.",
    howToUse: [
      "Confirm the patient has chronic liver disease or cirrhosis before applying the score.",
      "Select the point value for total bilirubin, albumin, INR, ascites, and encephalopathy.",
      "Sum the five component scores to obtain the total (5–15 points).",
      "Use the resulting class to guide prognosis and treatment planning.",
    ],
    interpretation: {
      guide:
        "Class A (5–6 points) reflects well-compensated liver disease with an estimated 1-year survival of ≈95%. Class B (7–9 points) reflects significant functional compromise (≈80% 1-year survival). Class C (10–15 points) indicates decompensated disease with a poor prognosis (≈45% 1-year survival).",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessing prognosis in patients with cirrhosis",
      "Estimating surgical risk in patients with liver disease",
      "Evaluating candidacy for treatment and transplantation planning",
      "Monitoring disease progression over time",
    ],
    whenNotToUse: [
      "In acute liver failure without cirrhosis",
      "As the sole basis for transplantation listing — transplant candidacy requires additional evaluation",
      "In patients without confirmed chronic liver disease",
    ],
    limitations: [
      "Subject to inter-observer variability in grading ascites and encephalopathy.",
      "Does not capture portal hypertension complications such as variceal bleeding or hepatorenal syndrome.",
      "Not validated for acute liver injury.",
    ],
    example: {
      description:
        "A 58-year-old man with alcoholic cirrhosis has a bilirubin of 1.5 mg/dL (<2, 1 point), albumin 3.8 g/dL (>3.5, 1 point), INR 1.2 (<1.7, 1 point), mild ascites (2 points), and grade I–II encephalopathy (2 points).",
      inputs: {
        bilirubin: "1",
        albumin: "1",
        inr: "1",
        ascites: "2",
        encephalopathy: "2",
      },
      expectedResult:
        "Total score = 7 points, Child-Pugh Class B — significant functional compromise with an estimated 1-year survival of ≈80%.",
    },
    clinicalSignificance:
      "The Child-Pugh score stratifies the severity of cirrhosis, informs surgical and procedural risk assessment, and helps identify patients who need early referral for liver transplantation evaluation.",
    references: [
      {
        citation:
          "Pugh RNH, Murray-Lyon IM, Dawson JL, et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60(8):646-649.",
        level: "Original Description",
      },
      {
        citation:
          "Child CG, Turcotte JG. Surgery and portal hypertension. Major Probl Clin Surg. 1964;1:1-85.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Hepatology Literature",
      reference: "Pugh RNH, et al. Br J Surg. 1973;60(8):646-649.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1973",
      references: [
        "Pugh RNH, et al. Br J Surg. 1973;60(8):646-649.",
        "Child CG, Turcotte JG. Major Probl Clin Surg. 1964;1:1-85.",
        "AASLD Practice Guidance on cirrhosis.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Child-Pugh score is one component of a full prognostic assessment and does not replace specialist evaluation.",
  },

  "corrected-anion-gap": {
    clinicalPurpose:
      "Adjusts the serum anion gap for hypoalbuminemia to unmask a hidden high anion gap metabolic acidosis (HAGMA) that a low albumin would otherwise conceal.",
    howToUse: [
      "Measure serum sodium, chloride, bicarbonate, and albumin from the same blood draw.",
      "Enter each value in the appropriate field.",
      "Compare the corrected result to the reference range of 8–12 mmol/L.",
      "If elevated, pursue the same differential as for a standard high anion gap acidosis.",
    ],
    interpretation: {
      guide:
        "A corrected anion gap of 8–12 mmol/L is normal. ≥13 mmol/L indicates a high corrected anion gap, and ≥20 mmol/L is markedly elevated. Each 1 g/dL drop in albumin below 4.0 g/dL lowers the measured anion gap by roughly 2.5 mmol/L.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Hypoalbuminemic patients (critical illness, nephrotic syndrome, liver disease, malnutrition)",
      "Critically ill patients with suspected acid-base disorders",
      "Any evaluation of metabolic acidosis when albumin is low",
    ],
    whenNotToUse: [
      "When serum albumin is normal — the standard anion gap calculator is sufficient",
      "As a standalone diagnostic without ABG and clinical correlation",
    ],
    limitations: [
      "The 2.5 mmol/L correction factor is an approximation; some sources use 2.4 or 2.8.",
      "Very low albumin (<2.0 g/dL) may reduce the reliability of the correction.",
      "Does not account for other unmeasured proteins or anions.",
    ],
    example: {
      description:
        "A 62-year-old ICU patient has sodium 140 mmol/L, chloride 105 mmol/L, bicarbonate 12 mmol/L, and albumin 3.0 g/dL.",
      inputs: {
        sodium: "140",
        chloride: "105",
        bicarbonate: "12",
        albumin: "3.0",
      },
      expectedResult:
        "Corrected AG = (140 − (105 + 12)) + 2.5 × (4 − 3) = 23 + 2.5 = 25.5 mmol/L — markedly elevated, consistent with a high anion gap metabolic acidosis.",
    },
    clinicalSignificance:
      "Albumin normally contributes roughly 75% of the anion gap. In hypoalbuminemia the measured gap is falsely low, so correction is essential in critically ill patients where a HAGMA could otherwise be missed.",
    references: [
      {
        citation:
          "Figge J, Jabor A, Kazda A, et al. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.",
        level: "Primary Study",
      },
      {
        citation:
          "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Critical Care Medicine",
      reference: "Figge J, et al. Crit Care Med. 1998;26(11):1807-1810.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "Figge J, et al. Crit Care Med. 1998;26(11):1807-1810.",
        "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
      ],
    },
    faq: [
      {
        question:
          "Why does low albumin lower the measured anion gap?",
        answer:
          "Albumin is a negatively charged protein that contributes significantly to the normal anion gap. When albumin is low, there are fewer unmeasured negative charges, so the calculated gap falls even when an acidosis is present.",
      },
      {
        question:
          "What correction factor should I use?",
        answer:
          "The most common correction adds 2.5 mmol/L to the measured anion gap for every 1 g/dL that albumin falls below 4.0 g/dL. Some sources use 2.4 or 2.8 mmol/L per g/dL depending on the population.",
      },
    ],
    comparison: {
      title: "Which Anion Gap Calculator Should I Use?",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          bestFor: "Routine screening when albumin is normal.",
          limitation: "Falsely low in hypoalbuminemia.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Interpret the corrected anion gap together with arterial blood gas and the clinical context.",
  },

  "serum-osmolality": {
    clinicalPurpose:
      "Estimates serum osmolality from sodium, glucose, and blood urea nitrogen, supporting evaluation of electrolyte disorders, hydration status, and toxic ingestions.",
    howToUse: [
      "Enter serum sodium (mmol/L), glucose (mg/dL), and BUN (mg/dL).",
      "Review the calculated osmolality (normal ≈ 275–295 mOsm/kg).",
      "If a measured osmolality is available, compare it with the calculated value to derive the osmolar gap.",
    ],
    interpretation: {
      guide:
        "Normal serum osmolality is 275–295 mOsm/kg. Values below ~275 mOsm/kg suggest dilutional hyponatremia. Values ≥296 mOsm/kg are high and ≥320 mOsm/kg are critically elevated, indicating hypernatremia, hyperglycemia, uremia, or ingestion of osmotically active substances.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of hyponatremia and hypernatremia",
      "Assessment of hydration status",
      "Suspected toxic alcohol ingestion (paired with the osmolar gap)",
      "Guiding the rate of hypernatremia correction",
    ],
    whenNotToUse: [
      "Without a measured osmolality when calculating the osmolar gap",
      "When glucose and BUN are entered in different units than mg/dL",
      "As a substitute for measured osmolality when the clinical question demands it",
    ],
    limitations: [
      "Requires glucose and BUN in mg/dL; results are incorrect with other units.",
      "Does not account for ethanol — add ethanol/4.6 for effective osmolality.",
      "An elevated osmolar gap requires a measured osmolality from the laboratory.",
    ],
    example: {
      description:
        "A 45-year-old man with poor intake and nausea has sodium 140 mmol/L, glucose 200 mg/dL, and BUN 14 mg/dL.",
      inputs: {
        sodium: "140",
        glucose: "200",
        bun: "14",
      },
      expectedResult:
        "Calculated osmolality = 2(140) + 200/18 + 14/2.8 = 280 + 11.1 + 5 = 296.1 mOsm/kg — high, warranting a measured osmolality to assess the osmolar gap.",
    },
    clinicalSignificance:
      "Serum osmolality is a core component of evaluating sodium disorders, guides the interpretation of the osmolar gap for toxic alcohol exposure, and informs the rate of hypernatremia correction.",
    references: [
      {
        citation:
          "Dorwart WV, Chalmers T. Comparison of methods for calculating serum osmolality from chemical concentrations, and the prognostic value of such calculations. Clin Chem. 1975;21(2):190-194.",
        level: "Primary Study",
      },
      {
        citation:
          "UpToDate. Serum osmolality.",
        level: "Reference",
      },
    ],
    evidence: {
      source: "Emergency Medicine / Nephrology",
      reference: "Dorwart WV, Chalmers T. Clin Chem. 1975;21(2):190-194.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "Dorwart WV, Chalmers T. Clin Chem. 1975;21(2):190-194.",
        "Tintinalli's Emergency Medicine, 9th ed.",
      ],
    },
    faq: [
      {
        question:
          "What is the osmolar gap and why does it matter?",
        answer:
          "The osmolar gap is the difference between measured and calculated osmolality. An elevated gap (>10 mOsm/kg) suggests unmeasured osmotically active substances such as methanol, ethylene glycol, or ethanol.",
      },
      {
        question:
          "How does ethanol affect osmolality?",
        answer:
          "Ethanol contributes to measured osmolality but not to this calculated value. Add approximately ethanol (mg/dL)/4.6 to account for its contribution when estimating effective osmolality.",
      },
    ],
    comparison: {
      title: "Which Osmolality Calculator Should I Use?",
      calculators: [
        {
          name: "Osmolar Gap",
          href: "/calculators/osmolar-gap",
          bestFor: "Detecting toxic alcohol ingestion.",
          limitation: "Requires a measured osmolality.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Confirm critical results with a measured osmolality and interpret within the clinical context.",
  },

  "ttkg": {
    clinicalPurpose:
      "Calculates the transtubular potassium gradient (TTKG) to assess renal potassium handling, primarily in the evaluation of hyperkalemia.",
    howToUse: [
      "Collect simultaneous urine and plasma potassium, and urine and plasma osmolality.",
      "Enter urine potassium (mmol/L), plasma potassium (mmol/L), urine osmolality (mOsm/kg), and plasma osmolality (mOsm/kg).",
      "Review the TTKG against the reference range of 8–12.",
    ],
    interpretation: {
      guide:
        "A TTKG of 8–12 reflects a normal renal potassium response. In hyperkalemia, a TTKG <8 suggests impaired distal potassium secretion (e.g., hypoaldosteronism or acute kidney injury), while a value >10 suggests intact aldosterone-mediated potassium secretion.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluating hyperkalemia of unclear cause",
      "Assessing the renal response to potassium handling",
      "Differentiating hypoaldosteronism from other causes of hyperkalemia",
    ],
    whenNotToUse: [
      "In patients on potassium-wasting or potassium-sparing diuretics without caution",
      "As the sole diagnostic test — some experts question its physiological validity",
      "When urine and plasma values are not collected simultaneously",
    ],
    limitations: [
      "Interpretation may be confounded by diuretics and renal conditions.",
      "The physiological validity of TTKG has been questioned by some experts.",
      "Requires simultaneous collection of all four values for meaningful results.",
    ],
    example: {
      description:
        "A 70-year-old man with diabetic nephropathy has hyperkalemia (plasma K 5.0 mmol/L). Urine K is 40 mmol/L, urine osmolality 400 mOsm/kg, and plasma osmolality 300 mOsm/kg.",
      inputs: {
        urineK: "40",
        plasmaK: "5.0",
        urineOsmolality: "400",
        plasmaOsmolality: "300",
      },
      expectedResult:
        "TTKG = (40 × 300) / (5.0 × 400) = 12,000 / 2,000 = 6.0 — impaired K⁺ secretion (<8), suggesting hypoaldosteronism; check aldosterone and renin levels.",
    },
    clinicalSignificance:
      "TTKG helps localize the cause of hyperkalemia to the kidney by evaluating distal potassium secretion, guiding further evaluation for hypoaldosteronism and tubular disorders.",
    references: [
      {
        citation:
          "Kamel KS, Halperin ML. Transtubular potassium gradient: a useful tool in the assessment of hyperkalemia. J Am Soc Nephrol. 2001;12(8):1839-1844.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Nephrology Literature",
      reference: "Kamel KS, Halperin ML. J Am Soc Nephrol. 2001;12(8):1839-1844.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2001",
      references: [
        "Kamel KS, Halperin ML. J Am Soc Nephrol. 2001;12(8):1839-1844.",
      ],
    },
    faq: [
      {
        question:
          "What does a low TTKG mean in hyperkalemia?",
        answer:
          "A low TTKG (<8) in the setting of hyperkalemia suggests impaired distal potassium secretion, often due to hypoaldosteronism or distal tubular dysfunction.",
      },
      {
        question:
          "Is TTKG still used clinically?",
        answer:
          "TTKG remains a useful bedside tool, though some experts have questioned its physiological basis. It should be interpreted alongside other clinical data.",
      },
    ],
    comparison: {
      title: "Which Renal Function Calculator Should I Use?",
      calculators: [
        {
          name: "FENa",
          href: "/calculators/fena",
          bestFor: "Distinguishing prerenal azotemia from intrinsic AKI.",
          limitation: "Does not assess potassium handling.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. TTKG should be interpreted within the full clinical context and not used alone.",
  },

  "calcium-phosphate-product": {
    clinicalPurpose:
      "Calculates the calcium–phosphate product to assess the risk of metastatic and vascular calcification, particularly in chronic kidney disease and dialysis patients.",
    howToUse: [
      "Enter serum calcium (mg/dL) and serum phosphate (mg/dL) from the same blood draw.",
      "Review the product against the target of <55 mg²/dL².",
      "For elevated results, evaluate mineral metabolism including PTH and vitamin D.",
    ],
    interpretation: {
      guide:
        "A product <55 mg²/dL² is acceptable. Values of 55–70 mg²/dL² are elevated with increased calcification risk, and values ≥70 mg²/dL² are critically elevated with high calcification risk.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Monitoring patients with chronic kidney disease",
      "Assessing vascular calcification risk in dialysis patients",
      "Guiding management of hyperphosphatemia",
    ],
    whenNotToUse: [
      "As a substitute for assessing PTH, vitamin D, or FGF23 status",
      "In isolation without considering the renal and mineral metabolism picture",
    ],
    limitations: [
      "Does not directly measure PTH, vitamin D, or vascular calcification burden.",
      "Interpretation should always be with the patient's renal and mineral metabolism status.",
      "Historical targets have been debated; KDIGO emphasizes managing underlying mineral abnormalities.",
    ],
    example: {
      description:
        "A 65-year-old woman on hemodialysis has serum calcium 9.5 mg/dL and phosphate 6.0 mg/dL.",
      inputs: {
        calcium: "9.5",
        phosphate: "6.0",
      },
      expectedResult:
        "Calcium–phosphate product = 9.5 × 6.0 = 57 mg²/dL² — elevated, indicating increased calcification risk; review phosphorus intake and phosphate binder use.",
    },
    clinicalSignificance:
      "An elevated calcium–phosphate product is associated with increased vascular calcification and cardiovascular morbidity, making it an important monitoring target in CKD-MBD management.",
    references: [
      {
        citation:
          "KDIGO. Clinical practice guideline update for the diagnosis, evaluation, prevention, and treatment of CKD-MBD. Kidney Int Suppl. 2017;7(1):1-59.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "KDIGO",
      reference: "KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017;7(1):1-59.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2017",
      references: [
        "KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017;7(1):1-59.",
      ],
    },
    faq: [
      {
        question:
          "How do I lower an elevated calcium–phosphate product?",
        answer:
          "Reduce dietary phosphorus, use phosphate binders, and optimize dialysis adequacy. Avoid excessive calcium-based binders to prevent hypercalcemia.",
      },
      {
        question:
          "Why does the product matter in CKD?",
        answer:
          "In CKD and dialysis patients, elevated calcium and phosphate drive vascular and soft-tissue calcification, which is linked to increased cardiovascular risk.",
      },
    ],
    comparison: {
      title: "Which Mineral Metabolism Calculator Should I Use?",
      calculators: [
        {
          name: "CKD-EPI 2021",
          href: "/calculators/ckd-epi-2021",
          bestFor: "Estimating kidney function.",
          limitation: "Does not assess mineral metabolism.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Manage the underlying mineral abnormalities rather than treating the number alone.",
  },

  "a1c-eag-converter": {
    clinicalPurpose:
      "Converts between hemoglobin A1c and estimated average glucose (eAG) using the ADAG equation, helping patients relate A1c to familiar glucose readings.",
    howToUse: [
      "Enter the NGSP-standardized HbA1c value (%).",
      "Review the corresponding eAG in mg/dL.",
      "Use the ADA target of A1c <7% (eAG <154 mg/dL) for most non-pregnant adults as a starting point.",
    ],
    interpretation: {
      guide:
        "A1c <6.0% is the normal band, 6.0–6.4% is the pre-diabetes band, and ≥6.5% is diagnostic of diabetes (ADA diagnostic threshold). The ADA defines pre-diabetes as A1c 5.7–6.4%; this calculator applies a conservative normal threshold of <6.0%. An A1c of 7% corresponds to an eAG of approximately 154 mg/dL.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Explaining A1c results to patients in glucose units",
      "Setting and reviewing glycemic targets",
      "Translating between A1c and eAG in diabetes care",
    ],
    whenNotToUse: [
      "When A1c is unreliable (haemoglobinopathies, iron deficiency, pregnancy, altered red cell turnover)",
      "With assays not standardized to NGSP",
      "As a measure of glycemic variability",
    ],
    limitations: [
      "eAG is an average and does not capture glucose variability or hypoglycemic episodes.",
      "The ADAG formula applies to NGSP-standardized assays only.",
      "A1c may be falsely low or high with altered red blood cell lifespan.",
    ],
    example: {
      description:
        "A 52-year-old patient with type 2 diabetes has an HbA1c of 7.0%.",
      inputs: {
        a1c: "7",
      },
      expectedResult:
        "eAG = 28.7 × 7 − 46.7 = 154.2 mg/dL, consistent with the ADA target of <7% (eAG <154 mg/dL).",
    },
    clinicalSignificance:
      "Converting A1c to eAG translates a percentage into everyday glucose units, improving patient understanding and engagement in diabetes self-management.",
    references: [
      {
        citation:
          "Nathan DM, Kuenen J, Borg R, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.",
        level: "Primary Study",
      },
      {
        citation:
          "American Diabetes Association. Standards of Care in Diabetes. Diabetes Care. 2025.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "ADA / ADAG Study",
      reference: "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
        "ADA Standards of Care in Diabetes. 2025.",
      ],
    },
    faq: [
      {
        question:
          "What is the ADA target for most adults with diabetes?",
        answer:
          "The ADA recommends an HbA1c target of <7% (eAG <154 mg/dL) for most non-pregnant adults, with individualization based on age, comorbidities, and hypoglycemia risk.",
      },
      {
        question:
          "How accurate is the A1c to eAG conversion?",
        answer:
          "The ADAG equation explains most of the relationship between A1c and average glucose, but individual results vary with assay standardization and red cell turnover.",
      },
    ],
    comparison: {
      title: "Which Glycemic Calculator Should I Use?",
      calculators: [
        {
          name: "Estimated Average Glucose",
          href: "/calculators/estimated-average-glucose",
          bestFor: "A1c to eAG conversion only.",
          limitation: "Unidirectional.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Glycemic targets should be individualized and verified with appropriate laboratory assays.",
  },

  "estimated-average-glucose": {
    clinicalPurpose:
      "Estimates mean plasma glucose from HbA1c using the ADAG equation, translating A1c into a mg/dL value patients can compare with home glucose readings.",
    howToUse: [
      "Enter the NGSP-standardized HbA1c value (%).",
      "Review the estimated average glucose in mg/dL.",
      "Interpret against the normal range of 70–140 mg/dL and the ADA target of eAG ≈154 mg/dL.",
    ],
    interpretation: {
      guide:
        "eAG <140 mg/dL is normal, 140–200 mg/dL is the pre-diabetic range, and ≥200 mg/dL is in the diabetic range. eAG reflects average glucose over the preceding 2–3 months.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Translating A1c into familiar glucose units for patient education",
      "Assessing overall glycemic control over 2–3 months",
      "Setting and reviewing glycemic targets",
    ],
    whenNotToUse: [
      "In conditions altering red cell lifespan (iron deficiency, sickle cell trait, pregnancy)",
      "As a substitute for CGM or self-monitoring data when variability is the question",
    ],
    limitations: [
      "Derived from continuous glucose monitoring studies and may differ from finger-stick averages.",
      "Does not reflect glucose variability or hypoglycemic episodes.",
      "Affected by conditions that change red blood cell survival.",
    ],
    example: {
      description:
        "A 60-year-old patient with impaired glucose tolerance has an HbA1c of 6.0%.",
      inputs: {
        a1c: "6.0",
      },
      expectedResult:
        "eAG = 28.7 × 6.0 − 46.7 = 125.5 mg/dL — normal average glucose range.",
    },
    clinicalSignificance:
      "eAG converts A1c into a practical mg/dL value, improving patient comprehension and facilitating shared decision-making about glycemic control.",
    references: [
      {
        citation:
          "Nathan DM, Kuenen J, Borg R, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "ADA / ADAG Study",
      reference: "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "Nathan DM, et al. Diabetes Care. 2008;31(8):1473-1478.",
      ],
    },
    faq: [
      {
        question:
          "What is estimated average glucose?",
        answer:
          "eAG converts HbA1c into the estimated average blood glucose in mg/dL over the preceding 2–3 months, making it easier for patients to relate A1c to home glucose readings.",
      },
      {
        question:
          "What A1c corresponds to an eAG of 126 mg/dL?",
        answer:
          "An eAG of 126 mg/dL corresponds to an HbA1c of approximately 6.0% using the ADAG formula.",
      },
    ],
    comparison: {
      title: "Which Glycemic Calculator Should I Use?",
      calculators: [
        {
          name: "A1c ↔ eAG Converter",
          href: "/calculators/a1c-eag-converter",
          bestFor: "Bidirectional conversion.",
          limitation: "Same underlying formula.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use NGSP-standardized A1c values and interpret within the clinical context.",
  },

  "bmi-for-pediatrics": {
    clinicalPurpose:
      "Calculates BMI for children and adolescents (ages 2–20) and classifies weight status using CDC 2000 BMI-for-age percentile references.",
    howToUse: [
      "Enter the child's age (2–20 years), sex, weight (kg), and height (cm).",
      "Review the BMI and the BMI-for-age percentile.",
      "Classify using the percentile: <5th underweight, 5th–<85th healthy, 85th–<95th overweight, ≥95th obesity.",
    ],
    interpretation: {
      guide:
        "Pediatric BMI must be interpreted by age- and sex-specific percentiles, not raw BMI. Underweight <5th percentile; healthy weight 5th–<85th; overweight 85th–<95th; obesity ≥95th percentile.",
      sexSpecific: true,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Growth and weight assessment in children and adolescents aged 2–20 years",
      "Screening for overweight, obesity, and underweight",
      "Monitoring growth trajectory over time",
    ],
    whenNotToUse: [
      "In children under 2 years — use weight-for-length WHO charts",
      "Without age and sex to reference percentiles",
      "As a direct measure of body fat",
    ],
    limitations: [
      "BMI does not distinguish fat from muscle mass.",
      "Percentile references are population-based and may not apply to all ethnic groups.",
      "Clinical assessment should include growth velocity, pubertal stage, and family history.",
    ],
    example: {
      description:
        "A 10-year-old boy weighs 35 kg and is 140 cm tall.",
      inputs: {
        age: "10",
        sex: "1",
        weight: "35",
        height: "140",
      },
      expectedResult:
        "BMI = 35 / (1.40)² = 17.9 kg/m², at the 94.3rd percentile — Overweight (85th–<95th percentile).",
    },
    clinicalSignificance:
      "BMI-for-age percentiles are the standard screening tool for pediatric weight status, informing interventions for childhood obesity and its metabolic consequences.",
    references: [
      {
        citation:
          "Kuczmarski RJ, Ogden CL, Guo SS, et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital Health Stat 11. 2002;(246):1-190.",
        level: "Reference Standard",
      },
    ],
    evidence: {
      source: "CDC Growth Charts",
      reference: "Kuczmarski RJ, et al. Vital Health Stat 11. 2002;(246):1-190.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2000",
      references: [
        "Kuczmarski RJ, et al. Vital Health Stat 11. 2002;(246):1-190.",
      ],
    },
    faq: [
      {
        question:
          "Why can't I interpret a pediatric BMI like an adult BMI?",
        answer:
          "Children are still growing, so BMI changes with age and sex. Percentiles relative to age- and sex-matched CDC references are required for correct interpretation.",
      },
      {
        question:
          "When is pediatric BMI-for-age not appropriate?",
        answer:
          "BMI-for-age percentiles are not valid for children under 2 years of age, where weight-for-length charts should be used instead.",
      },
    ],
    comparison: {
      title: "Which BMI Calculator Should I Use?",
      calculators: [
        {
          name: "BMI",
          href: "/calculators/bmi",
          bestFor: "Adults with fixed BMI thresholds.",
          limitation: "Not applicable to children.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Pediatric weight assessment should also consider growth velocity, pubertal stage, and family history.",
  },

  "lean-body-weight": {
    clinicalPurpose:
      "Estimates lean body weight using the Boer formula, useful for drug dosing, anesthesia, and nutritional assessment.",
    howToUse: [
      "Select the patient's sex.",
      "Enter height (cm) and weight (kg).",
      "Review the estimated lean body weight in kg.",
      "Use it for dosing decisions only where the drug-specific guidance supports lean body weight.",
    ],
    interpretation: {
      guide:
        "Lean body weight approximates the weight of body mass excluding fat. Male: 0.407 × weight + 0.267 × height − 19.2. Female: 0.252 × weight + 0.473 × height − 48.3.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Drug dosing in medications where lean body weight is the size descriptor (e.g., certain anesthetics and antimicrobials)",
      "Nutritional and metabolic assessment",
      "Anesthesia dosing considerations",
    ],
    whenNotToUse: [
      "Where the drug label specifies actual or ideal body weight",
      "As a direct measure of body fat or muscle mass",
      "Without confirming the drug-specific dosing guidance",
    ],
    limitations: [
      "The Boer formula is an estimate validated in adult populations.",
      "May be less accurate at the extremes of body size.",
      "Does not capture hydration status or muscle mass directly.",
    ],
    example: {
      description:
        "A 40-year-old man is 180 cm tall and weighs 80 kg.",
      inputs: {
        sex: "male",
        height: "180",
        weight: "80",
      },
      expectedResult:
        "LBW = 0.407 × 80 + 0.267 × 180 − 19.2 = 61.4 kg.",
    },
    clinicalSignificance:
      "Lean body weight better reflects drug distribution volume than total body weight in some medications, reducing dosing error in patients at the extremes of body size.",
    references: [
      {
        citation:
          "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Am J Physiol. 1984;247(4):F632-F635.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Body Composition Literature",
      reference: "Boer P. Am J Physiol. 1984;247(4):F632-F635.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1984",
      references: [
        "Boer P. Am J Physiol. 1984;247(4):F632-F635.",
      ],
    },
    faq: [
      {
        question:
          "When should lean body weight be used for dosing?",
        answer:
          "Use it when the drug-specific labeling or institutional guidance specifies lean body weight as the dosing size descriptor — it is common in some anesthetic and antimicrobial regimens.",
      },
      {
        question:
          "How does lean body weight differ from ideal body weight?",
        answer:
          "Ideal body weight is a height-based reference, whereas lean body weight is an estimate of the fat-free mass and therefore also incorporates measured weight.",
      },
    ],
    comparison: {
      title: "Which Body Weight Calculator Should I Use?",
      calculators: [
        {
          name: "Ideal Body Weight",
          href: "/calculators/ideal-body-weight",
          bestFor: "Height-based dosing reference.",
          limitation: "Ignores actual weight.",
        },
        {
          name: "Adjusted Body Weight",
          href: "/calculators/adjusted-body-weight",
          bestFor: "Dosing in overweight and obese adults.",
          limitation: "Empirical adjustment factor.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dosing decisions must follow drug-specific labeling and institutional protocols.",
  },

  "mifflin-st-jeor": {
    clinicalPurpose:
      "Estimates resting energy expenditure (REE) using the Mifflin-St Jeor equation for nutritional assessment and weight management.",
    howToUse: [
      "Select sex and enter age (years), weight (kg), and height (cm).",
      "Review the estimated resting energy expenditure in kcal/day.",
      "Multiply by an activity factor to estimate total daily calorie needs.",
    ],
    interpretation: {
      guide:
        "REE is the energy required at rest. Mifflin-St Jeor: male = 10 × weight + 6.25 × height − 5 × age + 5; female = 10 × weight + 6.25 × height − 5 × age − 161.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Estimating resting energy expenditure in healthy and overweight adults",
      "Baseline for calorie planning in weight management",
      "Nutritional assessment in clinical practice",
    ],
    whenNotToUse: [
      "In critically ill patients where indirect calorimetry is preferred",
      "In children (formula validated in adults)",
      "As a substitute for individualized metabolic assessment",
    ],
    limitations: [
      "Estimate only; actual needs vary with body composition and clinical status.",
      "Less accurate at extremes of body size.",
      "Does not account for illness, activity, or thermic effect of food.",
    ],
    example: {
      description:
        "A 40-year-old man weighs 80 kg, is 180 cm tall, and is sedentary.",
      inputs: {
        sex: "male",
        age: "40",
        weight: "80",
        height: "180",
      },
      expectedResult:
        "REE = 10 × 80 + 6.25 × 180 − 5 × 40 + 5 = 1,730 kcal/day.",
    },
    clinicalSignificance:
      "The Mifflin-St Jeor equation is one of the most accurate predictive equations for resting energy expenditure and is widely used to anchor nutrition and weight-management plans.",
    references: [
      {
        citation:
          "Mifflin MD, St Jeor ST, Hill LA, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "Nutrition Literature",
      reference: "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1990",
      references: [
        "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
      ],
    },
    faq: [
      {
        question:
          "How does Mifflin-St Jeor compare to Harris-Benedict?",
        answer:
          "Mifflin-St Jeor is generally considered more accurate than the original Harris-Benedict equation in modern, overweight populations and is preferred by many nutrition guidelines.",
      },
      {
        question:
          "How do I convert REE to total daily calories?",
        answer:
          "Multiply REE by an activity factor — approximately 1.2 for sedentary, 1.375 for light activity, 1.55 for moderate, and 1.725 for active individuals.",
      },
    ],
    comparison: {
      title: "Which Energy Expenditure Calculator Should I Use?",
      calculators: [
        {
          name: "Harris-Benedict",
          href: "/calculators/harris-benedict",
          bestFor: "Historical BMR estimation.",
          limitation: "May overestimate in overweight patients.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. REE is an estimate and nutrition plans should be individualized.",
  },

  "harris-benedict": {
    clinicalPurpose:
      "Estimates basal metabolic rate (BMR) using the Harris-Benedict equation for nutritional assessment and calorie planning.",
    howToUse: [
      "Select sex and enter age (years), weight (kg), and height (cm).",
      "Review the estimated BMR in kcal/day.",
      "Multiply by an activity factor for total daily energy needs.",
    ],
    interpretation: {
      guide:
        "BMR is the energy expended at complete rest. Harris-Benedict (revised): male = 88.362 + 13.397 × weight + 4.799 × height − 5.677 × age; female = 447.593 + 9.247 × weight + 3.098 × height − 4.33 × age.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Estimating basal metabolic rate in adults",
      "Baseline calorie needs for weight management",
      "Nutritional assessment when indirect calorimetry is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients needing measured energy expenditure",
      "In children",
      "As a substitute for individualized metabolic assessment",
    ],
    limitations: [
      "May overestimate energy needs in overweight and obese patients.",
      "Estimate only; individual needs vary by body composition and clinical status.",
      "Original equation dates from 1918–1919; revised coefficients improved accuracy.",
    ],
    example: {
      description:
        "A 40-year-old man weighs 80 kg, is 180 cm tall, and is sedentary.",
      inputs: {
        sex: "male",
        age: "40",
        weight: "80",
        height: "180",
      },
      expectedResult:
        "BMR = 88.362 + 13.397 × 80 + 4.799 × 180 − 5.677 × 40 ≈ 1,796.9 kcal/day.",
    },
    clinicalSignificance:
      "The Harris-Benedict equation is a historical cornerstone of energy estimation and remains a commonly used reference for baseline calorie planning.",
    references: [
      {
        citation:
          "Harris JA, Benedict FG. A biometric study of basal metabolism in man. Washington, DC: Carnegie Institution of Washington; 1919.",
        level: "Original Description",
      },
      {
        citation:
          "Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40(1):168-182.",
        level: "Revision",
      },
    ],
    evidence: {
      source: "Nutrition Literature",
      reference: "Roza AM, Shizgal HM. Am J Clin Nutr. 1984;40(1):168-182.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1919",
      references: [
        "Harris JA, Benedict FG. Carnegie Institution of Washington. 1919.",
        "Roza AM, Shizgal HM. Am J Clin Nutr. 1984;40(1):168-182.",
      ],
    },
    faq: [
      {
        question:
          "What is the difference between BMR and REE?",
        answer:
          "BMR is measured under strictly standardized resting conditions, while REE is measured under slightly less strict conditions. In practice the terms are often used interchangeably in equations.",
      },
      {
        question:
          "How do I calculate total daily energy needs?",
        answer:
          "Multiply BMR by an activity factor (e.g., 1.2 sedentary, 1.55 moderate activity, 1.725 very active) to estimate total daily energy expenditure.",
      },
    ],
    comparison: {
      title: "Which Energy Expenditure Calculator Should I Use?",
      calculators: [
        {
          name: "Mifflin-St Jeor",
          href: "/calculators/mifflin-st-jeor",
          bestFor: "Modern REE estimation.",
          limitation: "Adult populations only.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Energy estimates should be individualized and verified clinically.",
  },

  "sodium-deficit": {
    clinicalPurpose:
      "Estimates the total sodium deficit to guide hyponatremia correction, helping clinicians plan replacement while avoiding over-correction.",
    howToUse: [
      "Enter the patient's weight (kg), current serum sodium, and target sodium (mmol/L).",
      "Review the estimated sodium deficit in mmol.",
      "Correct slowly — limit to 8–10 mmol/L in the first 24 hours to reduce the risk of osmotic demyelination.",
    ],
    interpretation: {
      guide:
        "The sodium deficit is calculated as 0.6 × weight × (target Na − current Na) using an estimated total body water of 0.6 × weight. Values are interpreted against the clinical urgency of correction rather than a fixed normal range.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Planning correction of chronic hyponatremia",
      "Estimating sodium replacement needs in hypovolemic hyponatremia",
      "Guiding the rate of sodium correction in hospitalized patients",
    ],
    whenNotToUse: [
      "As the sole guide for acute severe symptomatic hyponatremia — use hypertonic saline and institutional protocols",
      "Without accounting for ongoing losses and intake",
      "When the desired target exceeds safe correction limits",
    ],
    limitations: [
      "Uses an estimated total body water of 0.6 × weight; actual TBW varies with body composition.",
      "Does not account for ongoing free water intake or losses.",
      "Over-correction risk requires close monitoring regardless of the calculated deficit.",
    ],
    example: {
      description:
        "A 70 kg man with chronic hyponatremia has a serum sodium of 125 mmol/L; the goal is 135 mmol/L.",
      inputs: {
        weight: "70",
        currentNa: "125",
        desiredNa: "135",
      },
      expectedResult:
        "Sodium deficit = 0.6 × 70 × (135 − 125) = 420 mmol. Correct slowly, limiting the rise to 8–10 mmol/L in the first 24 hours.",
    },
    clinicalSignificance:
      "Estimating the sodium deficit helps clinicians replace sodium methodically and avoid osmotic demyelination syndrome caused by over-rapid correction.",
    references: [
      {
        citation:
          "Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.",
        level: "Review",
      },
      {
        citation:
          "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372(1):55-65.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Nephrology Literature",
      reference: "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1581-1589.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2000",
      references: [
        "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1581-1589.",
        "Sterns RH. N Engl J Med. 2015;372(1):55-65.",
      ],
    },
    faq: [
      {
        question:
          "How fast should sodium be corrected?",
        answer:
          "For chronic hyponatremia, limit correction to 8–10 mmol/L in the first 24 hours and 18 mmol/L in 48 hours to reduce the risk of osmotic demyelination syndrome.",
      },
      {
        question:
          "Why does the estimate use 0.6 × weight?",
        answer:
          "Total body water is approximately 60% of body weight in men and 50% in women. This calculator uses 0.6 × weight as a default estimate.",
      },
    ],
    comparison: {
      title: "Which Sodium Disorder Calculator Should I Use?",
      calculators: [
        {
          name: "Free Water Deficit",
          href: "/calculators/free-water-deficit",
          bestFor: "Estimating water replacement in hypernatremia.",
          limitation: "Addresses hypernatremia, not hyponatremia.",
        },
        {
          name: "Corrected Sodium",
          href: "/calculators/corrected-sodium",
          bestFor: "Adjusting sodium for hyperglycemia.",
          limitation: "Does not estimate the sodium deficit.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Sodium correction must be guided by frequent monitoring and institutional protocols.",
  },

  "heart-rate": {
    clinicalPurpose:
      "Calculates heart rate from the number of beats counted over a measured time interval.",
    howToUse: [
      "Count the number of beats over a measured interval (e.g., 15, 30, or 60 seconds).",
      "Enter the beat count and the time in minutes.",
      "Review the calculated heart rate in beats per minute.",
    ],
    interpretation: {
      guide:
        "A normal resting heart rate for adults is 60–100 bpm. Values below 60 bpm may indicate bradycardia, and values above 100 bpm may indicate tachycardia, though athletes and certain medications affect these thresholds.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Bedside calculation of heart rate from pulse counting",
      "Estimating heart rate from ECG or pulse when only a short interval is counted",
      "Rapid vital sign assessment",
    ],
    whenNotToUse: [
      "For a detailed ECG rhythm diagnosis",
      "When the rhythm is grossly irregular — a longer count interval is preferable",
    ],
    limitations: [
      "Accuracy depends on the counting interval; longer intervals are more accurate.",
      "The calculator reports beats per minute but does not diagnose the rhythm.",
      "Physiological interpretation requires clinical context (age, medications, fitness).",
    ],
    example: {
      description:
        "A nurse counts 72 beats over 1 minute in an adult patient.",
      inputs: {
        beats: "72",
        time: "1",
      },
      expectedResult:
        "Heart rate = 72 / 1 = 72 bpm, within the normal adult range of 60–100 bpm.",
    },
    clinicalSignificance:
      "Heart rate is a fundamental vital sign used to assess hemodynamic status, guide further evaluation of bradycardia or tachycardia, and monitor response to treatment.",
    references: [
      {
        citation:
          "Al-Khatib SM, et al. 2017 AHA/ACC/HRS guideline for management of patients with ventricular arrhythmias and sudden cardiac death. Circulation. 2018.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "Cardiology Literature",
      reference: "AHA/ACC Guidelines on heart rhythm and rate assessment.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      references: [
        "AHA/ACC/HRS Guideline. Circulation. 2018.",
      ],
    },
    faq: [
      {
        question:
          "What is a normal resting heart rate?",
        answer:
          "The normal resting heart rate for adults is 60–100 bpm. Well-trained athletes may have rates below 60 bpm without pathology.",
      },
      {
        question:
          "When is a longer count interval better?",
        answer:
          "For irregular rhythms such as atrial fibrillation, count over 30–60 seconds to obtain a more accurate average heart rate.",
      },
    ],
    comparison: {
      title: "Which Vital Sign Calculator Should I Use?",
      calculators: [
        {
          name: "Mean Arterial Pressure",
          href: "/calculators/map",
          bestFor: "Assessing tissue perfusion pressure.",
          limitation: "Separate from heart rate.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Heart rate interpretation requires clinical context and is not a substitute for ECG when arrhythmia is suspected.",
  },

  "waist-to-hip-ratio": {
    clinicalPurpose:
      "Calculates waist-to-hip ratio (WHR) to assess central adiposity and cardiovascular risk.",
    howToUse: [
      "Measure waist circumference at the narrowest point between the rib cage and iliac crest.",
      "Measure hip circumference at the widest point of the buttocks.",
      "Divide waist by hip to obtain the ratio.",
    ],
    interpretation: {
      guide:
        "WHR classifies central adiposity and risk using sex-specific thresholds. For males, <0.90 is low risk, 0.90–0.99 moderate risk, and ≥1.0 high risk. For females, WHO thresholds are <0.85 low risk and ≥0.85 increased risk.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Assessing central (abdominal) adiposity",
      "Cardiovascular and type 2 diabetes risk assessment",
      "Metabolic syndrome evaluation",
    ],
    whenNotToUse: [
      "As the only cardiovascular risk assessment",
      "Without standardized measurement technique",
    ],
    limitations: [
      "Measurement technique must be standardized for consistent results.",
      "Thresholds differ between sexes and populations.",
      "Should be interpreted alongside blood pressure, lipids, and glucose.",
    ],
    example: {
      description:
        "A 48-year-old man has a waist circumference of 95 cm and hip circumference of 100 cm.",
      inputs: {
        waist: "95",
        hip: "100",
      },
      expectedResult:
        "WHR = 95 / 100 = 0.95 — moderate cardiovascular risk for a male.",
    },
    clinicalSignificance:
      "Waist-to-hip ratio captures central adiposity, which is a strong predictor of cardiovascular disease and type 2 diabetes, complementing BMI in risk assessment.",
    references: [
      {
        citation:
          "World Health Organization. Waist circumference and waist-hip ratio: report of a WHO expert consultation. Geneva: WHO; 2008.",
        level: "Guideline",
      },
      {
        citation:
          "Yusuf S, et al. Obesity and the risk of myocardial infarction in 27,000 participants from 52 countries. Lancet. 2005;366(9497):1640-1649.",
        level: "Primary Study",
      },
    ],
    evidence: {
      source: "WHO",
      reference: "WHO. Waist circumference and waist-hip ratio. Geneva: WHO; 2008.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2008",
      references: [
        "WHO. Waist circumference and waist-hip ratio. 2008.",
        "Yusuf S, et al. Lancet. 2005;366(9497):1640-1649.",
      ],
    },
    faq: [
      {
        question:
          "What does waist-to-hip ratio measure?",
        answer:
          "WHR measures the distribution of body fat — specifically central or abdominal adiposity, which is a strong predictor of cardiovascular and metabolic risk.",
      },
      {
        question:
          "What are the sex-specific thresholds?",
        answer:
          "For males, WHR <0.90 is low risk, 0.90–0.99 moderate risk, and ≥1.0 high risk. For females, WHO defines <0.85 as low risk and ≥0.85 as increased risk.",
      },
    ],
    comparison: {
      title: "Which Body Composition Calculator Should I Use?",
      calculators: [
        {
          name: "BMI",
          href: "/calculators/bmi",
          bestFor: "General obesity screening.",
          limitation: "Does not capture fat distribution.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. WHR should be interpreted alongside other cardiovascular risk factors.",
  },

  "calorie-requirement": {
    clinicalPurpose:
      "Estimates total daily calorie requirement by multiplying an individual's basal metabolic rate (BMR) by an activity factor.",
    howToUse: [
      "Obtain a basal metabolic rate — for example from the Mifflin-St Jeor or Harris-Benedict calculator.",
      "Select an activity factor reflecting the patient's typical daily activity (e.g., 1.2 sedentary, 1.55 moderate, 1.725 active).",
      "Enter the BMR (kcal/day) and the chosen activity factor.",
      "Review the estimated daily calorie requirement in kcal/day.",
    ],
    interpretation: {
      guide:
        "The result estimates total daily energy expenditure. Multiplying BMR by an activity factor converts resting energy needs into a daily calorie target: sedentary ≈ 1.2× BMR, light ≈ 1.375×, moderate ≈ 1.55×, very active ≈ 1.725×, extremely active ≈ 1.9×.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Estimating daily calorie targets in nutrition and weight management",
      "Planning dietary energy goals in stable outpatients",
      "As a starting point when indirect calorimetry is unavailable",
    ],
    whenNotToUse: [
      "In critically ill patients, where measured energy expenditure (indirect calorimetry) is preferred",
      "As a substitute for individualized dietary prescription",
      "Without an appropriate BMR input — the result depends entirely on the BMR entered",
    ],
    limitations: [
      "The accuracy of the estimate depends on the accuracy of the BMR entered.",
      "Does not account for illness, fever, body composition, or ongoing metabolic stress.",
      "Activity factors are approximations and vary between individuals.",
    ],
    example: {
      description:
        "A 40-year-old man has a resting energy expenditure (Mifflin-St Jeor) of 1,730 kcal/day and is moderately active.",
      inputs: {
        bmr: "1730",
        activity: "1.55",
      },
      expectedResult:
        "Daily calorie requirement = 1,730 × 1.55 = 2,682 kcal/day.",
    },
    clinicalSignificance:
      "Daily calorie requirements are the foundation of nutrition planning; estimating them from BMR and activity lets clinicians set rational energy targets rather than relying on guesswork.",
    references: [
      {
        citation:
          "Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids (Macronutrients). Washington, DC: The National Academies Press; 2005.",
        level: "Guideline",
      },
      {
        citation:
          "Food and Agriculture Organization / World Health Organization / United Nations University. Human Energy Requirements: Report of a Joint FAO/WHO/UNU Expert Consultation. Rome: FAO; 2004.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "FAO/WHO/UNU & IOM",
      reference: "FAO/WHO/UNU Human Energy Requirements. 2004.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2004",
      references: [
        "FAO/WHO/UNU. Human Energy Requirements. 2004.",
        "Institute of Medicine. Dietary Reference Intakes for Energy. 2005.",
      ],
    },
    faq: [
      {
        question: "What is an activity factor?",
        answer:
          "An activity factor reflects how much a person moves relative to resting energy expenditure — roughly 1.2 for sedentary, 1.375 light, 1.55 moderate, 1.725 active, and 1.9 extremely active individuals.",
      },
      {
        question: "How do I get the BMR input?",
        answer:
          "BMR (or REE) can be estimated with the Mifflin-St Jeor or Harris-Benedict calculator, which use sex, age, weight, and height.",
      },
    ],
    comparison: {
      title: "Which Energy Calculators Work Together?",
      calculators: [
        {
          name: "Mifflin-St Jeor",
          href: "/calculators/mifflin-st-jeor",
          bestFor: "Estimating the resting energy expenditure input.",
          limitation: "Adult populations only.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Calorie targets are estimates and nutrition plans should be individualized.",
  },

  "fluid-requirement": {
    clinicalPurpose:
      "Estimates a simple daily maintenance fluid requirement using a fixed 35 mL/kg/day rule based on body weight.",
    howToUse: [
      "Enter the patient's weight in kg.",
      "Review the estimated maintenance fluid volume in mL/day.",
      "Adjust for clinical context — the result is a starting estimate only.",
    ],
    interpretation: {
      guide:
        "The result approximates daily maintenance fluid needs at 35 mL/kg/day. For a 70 kg adult this is 2,450 mL/day (~2.5 L), consistent with typical adult maintenance estimates.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Rough daily maintenance fluid planning in adults",
      "Estimating baseline hydration needs in stable patients",
      "As a teaching estimate for maintenance fluid volumes",
    ],
    whenNotToUse: [
      "In patients with ongoing fluid losses, fever, vomiting, diarrhea, or drains",
      "In heart failure, renal impairment, or fluid overload states",
      "As a substitute for individualized fluid prescription",
    ],
    limitations: [
      "A fixed per-kilogram estimate cannot capture individual variation in losses or clinical status.",
      "Does not account for electrolyte content or route of administration.",
      "Weight-based rules are approximations and require clinical judgment.",
    ],
    example: {
      description:
        "A 70 kg adult requires an estimate of daily maintenance fluid.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Fluid requirement = 70 × 35 = 2,450 mL/day (~2.5 L).",
    },
    clinicalSignificance:
      "Simple weight-based rules give clinicians a rapid baseline for maintenance fluid planning, helping avoid both under- and over-hydration in routine care.",
    references: [
      {
        citation:
          "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Guideline CG174. London: NICE; 2013 (updated 2017).",
        level: "Guideline",
      },
      {
        citation:
          "Clinical practice references on adult maintenance fluid management.",
        level: "Expert Consensus",
      },
    ],
    evidence: {
      source: "NICE CG174",
      reference: "NICE. Intravenous fluid therapy in adults in hospital. CG174; 2013.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "2017",
      references: [
        "NICE CG174. Intravenous fluid therapy in adults in hospital. 2013.",
      ],
    },
    faq: [
      {
        question: "Why 35 mL/kg/day?",
        answer:
          "It is a common adult approximation for daily maintenance water needs. The Maintenance Fluids calculator uses the more granular 100/50/20 weight-based rule.",
      },
    ],
    comparison: {
      title: "Which Fluid Calculator Should I Use?",
      calculators: [
        {
          name: "Maintenance Fluids",
          href: "/calculators/maintenance-fluids",
          bestFor: "Weight-based 100/50/20 maintenance rule.",
          limitation: "Assumes no significant ongoing losses.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fluid management must account for the individual's clinical status, losses, and comorbidities.",
  },

  "maintenance-fluids": {
    clinicalPurpose:
      "Estimates daily maintenance fluid volume using the weight-based 100/50/20 rule: 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg thereafter.",
    howToUse: [
      "Enter the patient's weight in kg.",
      "Review the estimated maintenance fluid volume in mL/day.",
      "Convert to an hourly rate if prescribing (divide by 24).",
    ],
    interpretation: {
      guide:
        "The 100/50/20 rule (Holliday-Segar) estimates maintenance water needs by body weight. For a 70 kg adult: 1,000 + 500 + 1,000 = 2,500 mL/day.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Estimating maintenance fluid volume in children and adults",
      "As a starting point for daily fluid prescription",
      "Teaching the classic Holliday-Segar maintenance approach",
    ],
    whenNotToUse: [
      "In patients with ongoing losses, hypovolemia, or fluid overload",
      "In heart failure, renal impairment, or states requiring fluid restriction",
      "As a substitute for individualized fluid prescription",
    ],
    limitations: [
      "The rule assumes no significant ongoing fluid losses and normal renal function.",
      "Does not provide electrolyte composition or route guidance.",
      "Designed for maintenance needs, not replacement of deficits.",
    ],
    example: {
      description:
        "A 70 kg adult needs an estimate of daily maintenance fluids.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Maintenance fluids = 100 mL/kg × 10 kg + 50 mL/kg × 10 kg + 20 mL/kg × 50 kg = 2,500 mL/day.",
    },
    clinicalSignificance:
      "The Holliday-Segar 100/50/20 rule remains a widely taught and clinically used starting point for maintenance fluid volumes across children and adults.",
    references: [
      {
        citation:
          "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832.",
        level: "Original Description",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Guideline CG174. London: NICE; 2013.",
        level: "Guideline",
      },
    ],
    evidence: {
      source: "Holliday & Segar",
      reference: "Holliday MA, Segar WE. Pediatrics. 1957;19(5):823-832.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1957",
      references: [
        "Holliday MA, Segar WE. Pediatrics. 1957;19(5):823-832.",
        "NICE CG174. Intravenous fluid therapy in adults in hospital. 2013.",
      ],
    },
    faq: [
      {
        question: "How is the 100/50/20 rule applied?",
        answer:
          "The first 10 kg of body weight contributes 100 mL/kg/day, the second 10 kg 50 mL/kg/day, and every kilogram above 20 kg contributes 20 mL/kg/day. The three amounts are summed.",
      },
      {
        question: "How do I convert mL/day to an hourly rate?",
        answer:
          "Divide the daily volume by 24. For 2,500 mL/day this is approximately 104 mL/hour.",
      },
    ],
    comparison: {
      title: "Which Fluid Calculator Should I Use?",
      calculators: [
        {
          name: "Fluid Requirement",
          href: "/calculators/fluid-requirement",
          bestFor: "Quick daily volume estimate in adults.",
          limitation: "Fixed per-kg rule; no hourly detail.",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Maintenance fluid plans must account for clinical status, losses, and organ function.",
  },

  "perc-rule": {
    clinicalPurpose:
      "Determines whether pulmonary embolism can be safely ruled out in a patient with low pre-test probability, without D-dimer or imaging.",
    howToUse: [
      "Confirm the patient has a low pre-test probability of PE (e.g., Wells PE score below 4).",
      "Assess each of the eight PERC criteria.",
      "Select Yes for each criterion that is satisfied.",
      "If all 8 are met, PE is considered ruled out.",
    ],
    interpretation: {
      guide:
        "8/8 criteria met: PERC negative, PE can be ruled out without further testing. Fewer than 8/8: PERC positive, proceed with D-dimer and/or imaging.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Adult emergency patients with suspected PE and low pre-test probability",
      "Before ordering D-dimer or CT pulmonary angiography in low-risk patients",
      "To reduce unnecessary testing and radiation exposure",
    ],
    whenNotToUse: [
      "Patients with intermediate or high pre-test probability of PE",
      "Patients with signs of hemodynamic instability or shock",
      "Pregnant patients",
      "As a stand-alone rule-out in patients with a high-risk presentation",
    ],
    limitations: [
      "The rule only applies when pre-test probability is low; it does not replace clinical judgment.",
      "Original derivation excluded pregnant patients and children.",
      "A positive PERC does not diagnose PE; it only indicates further testing is warranted.",
    ],
    example: {
      description:
        "A 35-year-old woman with pleuritic chest pain has HR 88 bpm, SpO2 97% on room air, no hemoptysis, no estrogen use, no prior DVT/PE, no leg swelling, and no recent surgery or trauma.",
      inputs: {
        age: "1",
        "heart-rate": "1",
        "oxygen-saturation": "1",
        hemoptysis: "1",
        estrogen: "1",
        "prior-dvt-pe": "1",
        "leg-swelling": "1",
        "surgery-trauma": "1",
      },
      expectedResult:
        "All 8 PERC criteria met — PERC negative. PE can be considered ruled out without D-dimer or imaging given the low pre-test probability.",
    },
    clinicalSignificance:
      "The PERC rule safely reduces unnecessary D-dimer testing and CT pulmonary angiography in low-risk patients, lowering cost and radiation exposure without missing clinically significant PE.",
    references: [
      {
        citation:
          "Kline JA, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.",
        level: "Original Derivation",
      },
      {
        citation:
          "Kline JA, et al. Impact of a rapid rule-out protocol for pulmonary embolism on the rate of screening, missed cases, and pulmonary vascular imaging in an urban US emergency department. Ann Emerg Med. 2004;44(5):490-502.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The PERC rule applies only to patients with a low pre-test probability of PE and does not replace clinical judgment.",
  },

  "wells-pe": {
    clinicalPurpose:
      "Estimates the pre-test probability of pulmonary embolism to guide D-dimer testing and imaging decisions.",
    howToUse: [
      "Assess each of the seven clinical items in the Wells criteria.",
      "Select Yes for each criterion that is present.",
      "The weighted score is totaled automatically.",
      "Use the two-tier interpretation for D-dimer-driven strategies.",
    ],
    interpretation: {
      guide:
        "Two-tier: score ≤4 = PE unlikely (negative high-sensitivity D-dimer safely excludes PE); score >4 = PE likely (proceed to CT pulmonary angiography). Three-tier: 0–1 low, 2–6 moderate, >6 high probability.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Emergency department evaluation of suspected PE",
      "Deciding whether a D-dimer test is appropriate",
      "Structuring the clinical assessment of dyspnea or pleuritic chest pain",
    ],
    whenNotToUse: [
      "Hemodynamically unstable patients who need immediate imaging or treatment",
      "Patients with an alternative confirmed diagnosis",
      "As a stand-alone test; it is a pre-test probability tool, not a diagnostic test",
    ],
    limitations: [
      "Several items ('PE most likely diagnosis') are subjective and operator-dependent.",
      "Pre-test probability tools perform differently in inpatient versus outpatient populations.",
      "The score does not replace diagnostic testing in intermediate or high probability patients.",
    ],
    example: {
      description:
        "A 40-year-old woman presents with palpitations and mild dyspnea, HR 118 bpm. She has no DVT signs, no immobilization, no prior VTE, and no malignancy; PE is not felt to be the most likely diagnosis.",
      inputs: {
        "dvt-signs": "0",
        "pe-most-likely": "0",
        tachycardia: "1",
        immobilization: "0",
        "prior-dvt-pe": "0",
        hemoptysis: "0",
        malignancy: "0",
      },
      expectedResult:
        "Wells score 1.5 — PE unlikely. A negative high-sensitivity D-dimer safely excludes PE without imaging.",
    },
    clinicalSignificance:
      "The Wells criteria enable risk-stratified testing for PE, reducing unnecessary CT angiography while maintaining diagnostic safety when paired with a high-sensitivity D-dimer.",
    references: [
      {
        citation:
          "Wells PS, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected pulmonary embolism presenting to the emergency department by using a simple clinical model and D-dimer. Ann Intern Med. 2001;135(2):98-107.",
        level: "Management Study",
      },
      {
        citation:
          "Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000;83(3):416-420.",
        level: "Original Derivation",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Wells scoring guides, but does not replace, diagnostic testing and clinical judgment.",
  },

  "wells-dvt": {
    clinicalPurpose:
      "Estimates the pre-test probability of deep vein thrombosis to guide D-dimer testing and compression ultrasound.",
    howToUse: [
      "Assess each of the nine clinical items in the Wells criteria.",
      "Select Yes for each criterion that is present.",
      "Select whether an alternative diagnosis is at least as likely as DVT (subtracts 2 points).",
      "Use the two-tier interpretation to guide testing.",
    ],
    interpretation: {
      guide:
        "Two-tier: score ≤1 = DVT unlikely (negative high-sensitivity D-dimer safely excludes DVT); score ≥2 = DVT likely (proceed to compression ultrasound). Three-tier: ≤0 low, 1–2 moderate, ≥3 high probability.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Emergency department evaluation of suspected lower extremity DVT",
      "Deciding whether to order D-dimer before ultrasound",
      "Structuring the assessment of unilateral leg swelling or pain",
    ],
    whenNotToUse: [
      "Patients with a swollen leg and hemodynamic instability suggestive of phlegmasia",
      "When clinical suspicion is high regardless of the score",
      "As a stand-alone diagnostic test",
    ],
    limitations: [
      "The alternative-diagnosis item is subjective.",
      "Performance varies in populations with a high baseline DVT prevalence.",
      "A low score does not exclude DVT when clinical suspicion remains high.",
    ],
    example: {
      description:
        "A 55-year-old man is 2 weeks post hip surgery with a swollen, tender left leg, entire-leg swelling, calf swelling, and pitting edema. No alternative diagnosis is as likely as DVT.",
      inputs: {
        "active-cancer": "0",
        paralysis: "0",
        bedridden: "1",
        "localized-tenderness": "1",
        "entire-leg-swollen": "1",
        "calf-swelling": "1",
        "pitting-edema": "1",
        "collateral-veins": "0",
        "previous-dvt": "0",
        "alternative-diagnosis": "0",
      },
      expectedResult:
        "Wells DVT score 5 — DVT likely. Proceed directly to compression ultrasound; D-dimer is not recommended.",
    },
    clinicalSignificance:
      "Wells DVT criteria allow clinicians to stratify pre-test probability, safely using D-dimer to avoid unnecessary ultrasound while not missing clinically significant thrombosis.",
    references: [
      {
        citation:
          "Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.",
        level: "Management Study",
      },
      {
        citation:
          "Wells PS, et al. Accuracy of clinical assessment of deep-vein thrombosis. Lancet. 1995;345(8960):1326-1330.",
        level: "Original Derivation",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Wells scoring guides, but does not replace, diagnostic testing and clinical judgment.",
  },

  "heart-score": {
    clinicalPurpose:
      "Risk-stratifies undifferentiated chest pain in the emergency department for 6-week risk of major adverse cardiac events (MACE).",
    howToUse: [
      "Score the five components: History, ECG, Age, Risk factors, Troponin.",
      "Each component is scored 0, 1, or 2 using the descriptions in each dropdown.",
      "Sum the five component scores for a total out of 10.",
      "Use the risk band to guide disposition and monitoring.",
    ],
    interpretation: {
      guide:
        "0–3 low risk (MACE ~1–2%): candidate for early discharge with serial troponins. 4–6 moderate risk (MACE ~12–17%): observation with serial troponins. 7–10 high risk (MACE ~50–65%): early invasive strategy and cardiology consultation.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Emergency evaluation of chest pain without ST-elevation MI",
      "Patients with a non-diagnostic ECG and initial troponin",
      "Deciding between early discharge and observation admission",
    ],
    whenNotToUse: [
      "Patients with ST-elevation MI or clearly unstable ACS",
      "Patients with an alternative high-risk diagnosis such as aortic dissection",
      "Pediatric patients",
    ],
    limitations: [
      "Component scoring has some subjectivity (history and risk factors).",
      "MACE estimates vary between validation cohorts.",
      "The score should not delay emergent management in clinically unstable patients.",
    ],
    example: {
      description:
        "A 62-year-old man with hypertension and diabetes presents with moderately suspicious chest pain, non-specific ECG changes, and a troponin 1.5 times the upper reference limit.",
      inputs: {
        history: "1",
        ecg: "1",
        age: "1",
        "risk-factors": "1",
        troponin: "1",
      },
      expectedResult:
        "HEART score 5 — moderate risk (6-week MACE ~12–17%). Admit for observation and serial troponin measurement.",
    },
    clinicalSignificance:
      "The HEART score is one of the most widely validated tools for chest pain risk stratification, helping emergency clinicians avoid both missed MACE and unnecessary admissions.",
    references: [
      {
        citation:
          "Six AJ, et al. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008;16(6):191-196.",
        level: "Original Description",
      },
      {
        citation:
          "Backus BE, et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013;168(3):2153-2158.",
        level: "Prospective Validation",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The HEART score supports, but does not replace, clinical judgment in acute coronary syndrome evaluation.",
  },

  "sofa-score": {
    clinicalPurpose:
      "Quantifies organ dysfunction across six organ systems in critically ill patients and supports the Sepsis-3 definition of sepsis.",
    howToUse: [
      "Enter the worst values in the preceding 24 hours for each organ system.",
      "For respiration and cardiovascular status, select the appropriate category.",
      "Enter platelet count, bilirubin, GCS, and creatinine values.",
      "Sum the six component scores for a total out of 24.",
    ],
    interpretation: {
      guide:
        "Each organ scores 0–4. An acute increase of ≥2 points from baseline indicates organ dysfunction consistent with sepsis (Sepsis-3). Higher total scores correlate with higher ICU mortality.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Monitoring organ dysfunction in critically ill patients",
      "Supporting the Sepsis-3 diagnosis of sepsis",
      "Serial assessment of ICU patients over time",
      "Prognostication in ICU cohorts",
    ],
    whenNotToUse: [
      "As an isolated screening test in the emergency department (use qSOFA for screening)",
      "To replace bedside clinical assessment",
    ],
    limitations: [
      "Requires laboratory values, so it cannot be computed at the bedside without results.",
      "Baseline SOFA is frequently unknown, complicating the 'increase of 2' criterion.",
      "Component thresholds were derived for adults and are not validated in children.",
    ],
    example: {
      description:
        "A septic patient has a PaO2/FiO2 of 180 mmHg, platelets 80, bilirubin 2.5 mg/dL, MAP 60 mmHg without vasopressors, GCS 11, and creatinine 1.8 mg/dL.",
      inputs: {
        "pao2-fio2": "2",
        platelets: "80",
        bilirubin: "2.5",
        cardiovascular: "1",
        gcs: "11",
        creatinine: "1.8",
      },
      expectedResult:
        "SOFA score 10 — severe organ dysfunction. Escalate organ support and reassess frequently.",
    },
    clinicalSignificance:
      "SOFA provides a validated, reproducible measure of organ failure in critical illness and is central to the Sepsis-3 consensus definition of sepsis.",
    references: [
      {
        citation:
          "Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22(7):707-710.",
        level: "Original Description",
      },
      {
        citation:
          "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
        level: "Consensus Definition",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. SOFA describes, but does not diagnose, sepsis; clinical judgment and serial assessment remain essential.",
  },

  "sirs-criteria": {
    clinicalPurpose:
      "Identifies the systemic inflammatory response syndrome by counting how many of four physiologic criteria are met.",
    howToUse: [
      "Enter the patient's temperature, heart rate, respiratory rate, and white blood cell count.",
      "Each criterion outside the normal band scores 1 point.",
      "Two or more criteria indicate SIRS.",
      "Combine with a suspected infection source to consider sepsis.",
    ],
    interpretation: {
      guide:
        "0–1 criteria: SIRS not met. 2 or more criteria: SIRS present. SIRS plus infection is consistent with the historical definition of sepsis; Sepsis-3 now requires organ dysfunction (SOFA increase ≥2).",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Early recognition of the inflammatory response in undifferentiated illness",
      "Screening for sepsis in the emergency department",
      "Teaching and audit of the historical sepsis definitions",
    ],
    whenNotToUse: [
      "As the sole definition of sepsis — Sepsis-3 requires organ dysfunction",
      "In isolation, without clinical assessment for a source of infection",
    ],
    limitations: [
      "SIRS is non-specific and is met in many non-infectious conditions (trauma, pancreatitis, surgery).",
      "The Sepsis-3 consensus removed SIRS from the formal sepsis definition.",
      "Physiologic values can be masked by beta-blockade, antipyretics, or immunosuppression.",
    ],
    example: {
      description:
        "A patient has temperature 38.5 °C, heart rate 110 bpm, respiratory rate 22/min, and WBC 14 ×10⁹/L.",
      inputs: {
        temperature: "38.5",
        "heart-rate": "110",
        "respiratory-rate": "22",
        wbc: "14",
      },
      expectedResult:
        "SIRS present — 4/4 criteria met. Evaluate for infection and consider sepsis workup.",
    },
    clinicalSignificance:
      "SIRS criteria have historically underpinned the early recognition and management of sepsis and remain a useful bedside screening framework.",
    references: [
      {
        citation:
          "Bone RC, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. Chest. 1992;101(6):1644-1655.",
        level: "Consensus Definitions",
      },
      {
        citation:
          "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
        level: "Consensus Definition",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. SIRS criteria screen for, but do not diagnose, sepsis; clinical judgment remains essential.",
  },

  "crb-65": {
    clinicalPurpose:
      "Stratifies severity and mortality risk in community-acquired pneumonia without requiring laboratory testing.",
    howToUse: [
      "Assess mental status for new confusion.",
      "Measure respiratory rate and blood pressure.",
      "Record the patient's age.",
      "Score 1 point for each criterion met: confusion, RR ≥30/min, SBP <90 or DBP ≤60 mmHg, age ≥65 years.",
    ],
    interpretation: {
      guide:
        "Score 0: low risk (mortality ~1%), consider outpatient care. Score 1–2: intermediate risk (mortality ~8%), consider hospital admission. Score 3–4: high risk (mortality ~30%), urgent admission and consider ICU.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Primary care and out-of-hospital assessment of pneumonia severity",
      "Initial triage when laboratory results are not yet available",
      "Teaching the CURB-65 family of severity scores",
    ],
    whenNotToUse: [
      "In patients with immunocompromise or severe comorbidity where lab-based scores are preferred",
      "As a substitute for clinical judgment in young adults with concerning features",
    ],
    limitations: [
      "CRB-65 omits the urea component of CURB-65, slightly reducing discrimination.",
      "Age alone drives a point in all patients over 65, which can over-score otherwise stable patients.",
      "Mortality estimates come from specific cohorts and may not generalize.",
    ],
    example: {
      description:
        "A 70-year-old man with pneumonia is confused, has a respiratory rate of 28/min, blood pressure 110/70 mmHg.",
      inputs: {
        confusion: "1",
        "respiratory-rate": "28",
        sbp: "110",
        dbp: "70",
        age: "70",
      },
      expectedResult:
        "CRB-65 score 2 — intermediate risk. Consider hospital admission.",
    },
    clinicalSignificance:
      "CRB-65 enables rapid, lab-free risk stratification of pneumonia at the point of care, guiding the decision between outpatient treatment and hospital admission.",
    references: [
      {
        citation:
          "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
        level: "Original Derivation",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Pneumonia in adults: diagnosis and management. NICE Clinical Guideline CG191. 2014.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Site-of-care decisions must integrate comorbidities, social factors, and clinical judgment.",
  },

  "psi-port": {
    clinicalPurpose:
      "Predicts 30-day mortality in community-acquired pneumonia to guide site-of-care decisions, from outpatient to ICU admission.",
    howToUse: [
      "Enter demographics, comorbidities, and vital signs.",
      "Enter available laboratory results; arterial pH and PaO2 may be left blank.",
      "The score and PSI class (I–V) are computed automatically.",
      "Use the class to inform site-of-care decisions.",
    ],
    interpretation: {
      guide:
        "Class I–II (≤70 points): low mortality (~0.1–0.6%), consider outpatient. Class III (71–90): low-intermediate risk, consider observation or inpatient. Class IV (91–130): moderate risk (~8–9%), admit. Class V (>130): high risk (~27–31%), admit and consider ICU.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Risk stratification of community-acquired pneumonia in adults",
      "Supporting discharge-versus-admission decisions",
      "Identifying patients who may need ICU-level care",
    ],
    whenNotToUse: [
      "Hospital-acquired or ventilator-associated pneumonia",
      "Immunocompromised patients outside the original validation populations",
      "Pregnant women, in whom the original cohort was not validated",
    ],
    limitations: [
      "Requires several laboratory values, making it less practical than CRB-65 at the bedside.",
      "Class I designation requires absence of all comorbidities and risk findings.",
      "The rule was derived in adults with CAP and may not generalize to all populations.",
    ],
    example: {
      description:
        "A 68-year-old nursing home man with heart failure is confused. RR 24/min, BP 100/70 mmHg, temperature 38.2 °C, HR 98 bpm, pH 7.36, BUN 35 mg/dL, sodium 131 mmol/L, glucose 150 mg/dL, hematocrit 31%, PaO2 70 mmHg, no pleural effusion.",
      inputs: {
        age: "68",
        sex: "male",
        "nursing-home": "1",
        "neoplastic-disease": "0",
        "liver-disease": "0",
        chf: "1",
        cerebrovascular: "0",
        "renal-disease": "0",
        ams: "1",
        "respiratory-rate": "24",
        sbp: "100",
        temperature: "38.2",
        "heart-rate": "98",
        ph: "7.36",
        bun: "35",
        sodium: "131",
        glucose: "150",
        hematocrit: "31",
        pao2: "70",
        "pleural-effusion": "0",
      },
      expectedResult:
        "PSI class IV (score 128) — moderate mortality risk (~8–9%). Admit to hospital.",
    },
    clinicalSignificance:
      "The PSI/PORT score is a landmark, extensively validated prediction tool that has shaped site-of-care decisions for community-acquired pneumonia for over two decades.",
    references: [
      {
        citation:
          "Fine MJ, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336(4):243-250.",
        level: "Original Derivation",
      },
      {
        citation:
          "Fine MJ, et al. Prognosis and outcomes of patients with community-acquired pneumonia: a meta-analysis. JAMA. 1996;275(2):134-141.",
        level: "Meta-Analysis",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Site-of-care decisions must integrate comorbidities, social factors, and clinical judgment.",
  },

  rts: {
    clinicalPurpose:
      "Provides an objective, coded measure of physiologic derangement in trauma patients for triage and outcome prediction.",
    howToUse: [
      "Record the Glasgow Coma Scale score (3–15).",
      "Record the systolic blood pressure in mmHg.",
      "Record the respiratory rate in breaths/min.",
      "Each parameter is coded 0–4 and weighted to produce the RTS.",
    ],
    interpretation: {
      guide:
        "RTS range 0–7.8408. An RTS below 4 is associated with a predicted survival below 70% and supports transfer to a trauma center. Values at the top of the range indicate minor physiologic derangement.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Field and emergency department triage of trauma patients",
      "Decision support for transfer to a trauma center",
      "Outcome prediction and trauma registry scoring",
    ],
    whenNotToUse: [
      "As the sole determinant of triage — anatomical injury and mechanism also matter",
      "In non-trauma medical emergencies",
    ],
    limitations: [
      "RTS captures physiologic state at a single time point; patients can deteriorate.",
      "Normal vital signs can mask severe internal injury.",
      "The score is adult-derived and requires adult thresholds.",
    ],
    example: {
      description:
        "A motor-vehicle collision patient has GCS 13, systolic blood pressure 110 mmHg, and respiratory rate 20/min.",
      inputs: {
        gcs: "13",
        sbp: "110",
        rr: "20",
      },
      expectedResult:
        "RTS 7.8408 — minor physiologic derangement; standard trauma care.",
    },
    clinicalSignificance:
      "The Revised Trauma Score is a standard triage instrument in trauma systems worldwide, combining the three most prognostic physiologic parameters into a single weighted score.",
    references: [
      {
        citation:
          "Champion HR, et al. A revision of the Trauma Score. J Trauma. 1989;29(5):623-629.",
        level: "Original Revision",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Trauma triage must integrate anatomic injury, mechanism, physiology, and institutional protocols.",
  },

  "parkland-formula": {
    clinicalPurpose:
      "Estimates the initial crystalloid resuscitation volume for adult thermal burns using weight and total body surface area burned.",
    howToUse: [
      "Estimate %TBSA burned (second- and third-degree only) using the Rule of Nines regions.",
      "Enter the patient's weight in kg.",
      "Enter the %TBSA for each body region.",
      "Review the 24-hour total, first-8-hour and next-16-hour volumes and rates.",
    ],
    interpretation: {
      guide:
        "Total volume = 4 mL/kg/%TBSA of Ringer's lactate over 24 hours: half in the first 8 hours, half over the next 16 hours. Titrate to urine output 0.5–1.0 mL/kg/h. Burns <20% TBSA generally do not require formal resuscitation.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Adults with thermal burns ≥20% TBSA",
      "Initial resuscitation planning in the emergency department",
      "Estimating early fluid needs while awaiting definitive burn care",
    ],
    whenNotToUse: [
      "Children under 30 kg — use pediatric burn formulas",
      "Electrical or chemical burns, which may require different volumes",
      "Isolated inhalation injury without cutaneous burns",
      "Ongoing resuscitation — the estimate must be continuously titrated to output",
    ],
    limitations: [
      "The 4 mL/kg/%TBSA is a starting point, not a fixed prescription.",
      "TBSA estimation varies significantly between clinicians.",
      "The formula does not account for maintenance fluids, comorbidities, or ongoing losses.",
    ],
    example: {
      description:
        "A 75 kg adult has 30% TBSA partial-thickness burns (anterior trunk 9%, posterior trunk 9%, right arm 9%, right leg 3%).",
      inputs: {
        weight: "75",
        head: "0",
        "anterior-trunk": "9",
        "posterior-trunk": "9",
        "right-upper-limb": "9",
        "left-upper-limb": "0",
        "right-lower-limb": "3",
        "left-lower-limb": "0",
        perineum: "0",
      },
      expectedResult:
        "Parkland total 9,000 mL over 24 hours: 4,500 mL (≈562.5 mL/h) in the first 8 hours, then 4,500 mL (≈281.3 mL/h) over 16 hours of Ringer's lactate.",
    },
    clinicalSignificance:
      "The Parkland formula is the most widely used burn resuscitation guideline, standardizing initial fluid therapy while emphasizing ongoing titration to physiologic endpoints.",
    references: [
      {
        citation:
          "Baxter CR. Fluid volume and electrolyte changes of the early postburn period. Clin Plast Surg. 1974;1(4):693-709.",
        level: "Original Description",
      },
      {
        citation:
          "Alvarado R, et al. Burn resuscitation. Burns. 2009;35(1):4-14.",
        level: "Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Burn resuscitation must be titrated continuously to urine output, hemodynamics, and clinical response.",
  },

  "timi": {
    clinicalPurpose:
      "Estimates 14-day risk of all-cause mortality, new or recurrent myocardial infarction, or severe recurrent ischemia requiring urgent revascularization in unstable angina / non-ST-elevation MI.",
    howToUse: [
      "Confirm the patient has unstable angina or NSTEMI.",
      "Assign 1 point for each of the seven TIMI criteria that is present.",
      "Sum the points to obtain the total score (0–7).",
      "Interpret the score against the risk strata and apply guideline-directed management.",
    ],
    interpretation: {
      guide:
        "Score 0–1: low risk (~4.7% 14-day composite event rate); 2–4: intermediate risk (~8.3–19.9%); 5–7: high risk (~26.2–40.9%). Higher scores support earlier invasive strategy and intensified antithrombotic therapy.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Risk stratification of unstable angina / NSTEMI at presentation",
      "Triaging patients to early invasive vs. conservative strategy",
      "Communicating prognosis with patients",
    ],
    whenNotToUse: [
      "ST-elevation MI — use a STEMI-specific tool",
      "As a substitute for serial ECG and troponin monitoring",
    ],
    limitations: [
      "Derived and validated in a clinical trial population (TIMI 11B), which may not reflect real-world cohorts.",
      "Does not capture dynamic ECG or biomarker evolution after presentation.",
      "Considers only a subset of prognostic factors; clinician judgment remains essential.",
    ],
    example: {
      description:
        "A 72-year-old man with hypertension and diabetes presents with recurrent chest pain over the past day, ST-segment depression on ECG, and a mildly elevated troponin. No known prior CAD and no aspirin use.",
      inputs: {
        "age-65": "1",
        "risk-factors": "1",
        "known-cad": "0",
        aspirin: "0",
        "anginal-events": "1",
        "ecg-changes": "1",
        troponin: "1",
      },
      expectedResult:
        "TIMI risk score 5 — HIGH risk (~26.2% 14-day event rate). Urgent invasive strategy and intensified antithrombotic therapy should be considered.",
    },
    clinicalSignificance:
      "The TIMI risk score is a widely used, validated bedside tool that rapidly identifies high-risk UA/NSTEMI patients who benefit most from early invasive management.",
    references: [
      {
        citation:
          "Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.",
        level: "Level I",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment or serial reassessment of the patient.",
  },

  "grace": {
    clinicalPurpose:
      "Estimates in-hospital mortality risk for patients with acute coronary syndromes (STEMI, NSTEMI, or unstable angina) using the validated GRACE model.",
    howToUse: [
      "Enter the patient's age, admission heart rate, systolic blood pressure, and serum creatinine.",
      "Select the Killip class and note whether cardiac arrest occurred at admission.",
      "Indicate ST-segment deviation and elevated cardiac enzymes on admission.",
      "Sum the points and interpret against the in-hospital mortality risk categories.",
    ],
    interpretation: {
      guide:
        "Total score ≤108: low risk (<1% in-hospital mortality); 109–140: intermediate risk (1–3%); >140: high risk (>3%). The GRACE model is the preferred risk stratification tool recommended by European and US guidelines for ACS.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Risk stratification of all ACS presentations (STEMI, NSTEMI, UA)",
      "Guiding decisions on early invasive vs. conservative management",
      "Estimating in-hospital mortality for prognosis and consent",
    ],
    whenNotToUse: [
      "Non-ACS chest pain syndromes",
      "As a substitute for continuous clinical monitoring and repeat biomarkers",
    ],
    limitations: [
      "The discrete nomogram approximates the continuous GRACE model; values between points require interpolation.",
      "The original risk model is time-limited (in-hospital); separate GRACE models exist for 6-month and discharge risk.",
      "Assumes standardized ACS care; outcomes vary with local systems and treatment.",
    ],
    example: {
      description:
        "A 78-year-old woman presents with STEMI, heart rate 110 bpm, blood pressure 110/70 mmHg, creatinine 1.4 mg/dL, Killip class II, ST-segment elevation, and positive troponin. No cardiac arrest.",
      inputs: {
        age: "75",
        "heart-rate": "15",
        sbp: "43",
        creatinine: "10",
        killip: "20",
        "cardiac-arrest": "0",
        "st-deviation": "28",
        "elevated-enzymes": "14",
      },
      expectedResult:
        "GRACE in-hospital score 205 — HIGH risk (>3% predicted in-hospital mortality). Urgent risk-directed therapy, including early invasive strategy.",
    },
    clinicalSignificance:
      "GRACE is the most extensively validated ACS risk model, using continuous physiological variables to estimate in-hospital mortality more accurately than point-score-only tools.",
    references: [
      {
        citation:
          "Granger CB, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.",
        level: "Level I",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment in the acute management of ACS.",
  },

  "cha2ds2-vasc": {
    clinicalPurpose:
      "Estimates annual ischemic stroke risk in patients with non-valvular atrial fibrillation to guide oral anticoagulation decisions.",
    howToUse: [
      "Confirm the patient has non-valvular atrial fibrillation.",
      "Assign points for heart failure, hypertension, age category, diabetes, prior stroke/TIA/thromboembolism, vascular disease, and female sex.",
      "Sum the points (0–9).",
      "Compare the score with the anticoagulation thresholds, weighing bleeding risk separately (e.g., HAS-BLED).",
    ],
    interpretation: {
      guide:
        "Score 0 (men) / 1 (women): low annual stroke risk (~0.2–0.6%) — no antithrombotic therapy recommended. Men score 1 / women score 2: consider OAC based on net clinical benefit. Men ≥2 / women ≥3: oral anticoagulation is recommended.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Stroke risk assessment in non-valvular atrial fibrillation",
      "Deciding whether to start oral anticoagulation",
      "Routine re-assessment in AF patients on or off anticoagulation",
    ],
    whenNotToUse: [
      "Valvular (especially rheumatic mitral) atrial fibrillation — anticoagulation is indicated regardless of score",
      "Patients who have already had a stroke, where risk alone should not drive a no-treatment decision",
    ],
    limitations: [
      "Estimates stroke risk only; bleeding risk (HAS-BLED) must be considered separately.",
      "Risk estimates vary with time in therapeutic range if on warfarin.",
      "Does not incorporate renal function, which is captured in other tools (e.g., CHA₂DS₂-VASc variations in some guidelines).",
    ],
    example: {
      description:
        "A 78-year-old woman with paroxysmal atrial fibrillation, hypertension, and diabetes who had a TIA 2 years ago.",
      inputs: {
        chf: "0",
        hypertension: "1",
        age: "2",
        diabetes: "1",
        stroke: "2",
        "vascular-disease": "0",
        sex: "1",
      },
      expectedResult:
        "CHA₂DS₂-VASc score 7 — HIGH stroke risk. Oral anticoagulation is recommended (e.g., DOAC).",
    },
    clinicalSignificance:
      "CHA₂DS₂-VASc refined the older CHADS₂ score by better differentiating truly low-risk patients, reducing unnecessary anticoagulation while capturing more risk factors.",
    references: [
      {
        citation:
          "Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on atrial fibrillation. Chest. 2010;137(2):263-272.",
        level: "Level II",
      },
      {
        citation:
          "January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation. Circulation. 2019;140(2):e125-e151.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Anticoagulation decisions require assessment of both stroke and bleeding risk together with patient values and preferences.",
  },

  "has-bled": {
    clinicalPurpose:
      "Estimates 1-year risk of major bleeding in patients receiving anticoagulation, most commonly for atrial fibrillation, to identify modifiable bleeding risk factors.",
    howToUse: [
      "Confirm the patient is a candidate for or currently on anticoagulation.",
      "Assign 1 point for each HAS-BLED criterion present (hypertension, renal/liver dysfunction, stroke, bleeding history, labile INR, age >65, drugs, alcohol).",
      "Sum the points (0–9).",
      "Use the result to address modifiable risk factors rather than to automatically withhold anticoagulation.",
    ],
    interpretation: {
      guide:
        "Score 0–1: low risk (~1% major bleeding per year); 2: moderate risk (~2%/year); ≥3: high risk (~4%/year). A high score flags the need to correct modifiable factors (BP control, alcohol, drug interactions, INR monitoring).",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Bleeding risk assessment when starting oral anticoagulation",
      "Periodic reassessment of bleeding risk on long-term anticoagulation",
      "Evaluating modifiable bleeding risk factors in AF patients",
    ],
    whenNotToUse: [
      "To withhold anticoagulation outright in AF — compare against stroke risk and net clinical benefit",
      "In patients with mechanical valves where anticoagulation is mandatory",
    ],
    limitations: [
      "Predicts bleeding but does not incorporate bleeding-specific lab thresholds beyond INR.",
      "Some criteria (e.g., drugs, alcohol, labile INR) depend on accurate history and INR control.",
      "Risk estimates are calibrated to warfarin-era cohorts; DOAC bleeding rates are generally lower.",
    ],
    example: {
      description:
        "A 75-year-old man on warfarin for AF has uncontrolled hypertension (SBP 165 mmHg), a history of a GI bleed 2 years ago, and time in therapeutic range of 50%.",
      inputs: {
        hypertension: "1",
        renal: "0",
        liver: "0",
        stroke: "0",
        bleeding: "1",
        "labile-inr": "1",
        elderly: "1",
        drugs: "0",
        alcohol: "0",
      },
      expectedResult:
        "HAS-BLED score 4 — HIGH bleeding risk. Address blood pressure control and INR stability, and reassess the anticoagulation strategy in the context of net clinical benefit.",
    },
    clinicalSignificance:
      "HAS-BLED is the recommended bleeding risk tool in AF guidelines; its clinical value lies in prompting correction of modifiable risk factors rather than denying anticoagulation.",
    references: [
      {
        citation:
          "Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Decisions about anticoagulation must balance stroke and bleeding risk with patient values.",
  },

  "rcri": {
    clinicalPurpose:
      "Estimates the 30-day risk of major cardiac complications (MI, pulmonary edema, ventricular fibrillation or primary cardiac arrest, complete heart block) in patients undergoing non-cardiac surgery.",
    howToUse: [
      "Confirm the surgical procedure and the patient's cardiovascular history.",
      "Assign 1 point for each of the six RCRI predictors present.",
      "Sum the points (0–6).",
      "Interpret the score together with functional capacity and surgical risk to plan perioperative management.",
    ],
    interpretation: {
      guide:
        "Score 0: ~0.4% risk; 1: ~0.9%; 2: ~7%; ≥3: ~11%. Patients with higher scores warrant closer perioperative cardiac monitoring and optimization of modifiable risk factors.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Preoperative cardiac risk stratification for non-cardiac surgery",
      "Guiding perioperative testing and monitoring intensity",
      "Informed consent discussions about surgical cardiac risk",
    ],
    whenNotToUse: [
      "Cardiac surgery — use procedure-specific risk tools",
      "As a replacement for clinical assessment of functional capacity and acute cardiac conditions",
    ],
    limitations: [
      "Derived from a predominantly male cohort from a single tertiary center in the 1990s.",
      "Does not capture age, functional capacity, or procedure-specific risk separately.",
      "Predicted risk may underestimate current event rates given changes in surgical and anesthetic practice.",
    ],
    example: {
      description:
        "A 68-year-old insulin-treated diabetic with known ischemic heart disease is scheduled for open colectomy. Preoperative creatinine is 2.2 mg/dL.",
      inputs: {
        "high-risk-surgery": "1",
        "ischemic-heart-disease": "1",
        chf: "0",
        cerebrovascular: "0",
        "insulin-diabetes": "1",
        creatinine: "1",
      },
      expectedResult:
        "RCRI score 4 — HIGH risk (~11% major cardiac events). Close perioperative cardiac monitoring and optimization of cardiac risk factors are warranted.",
    },
    clinicalSignificance:
      "RCRI remains the most widely validated and guideline-endorsed index for perioperative cardiac risk in non-cardiac surgery, framing the preoperative risk assessment.",
    references: [
      {
        citation:
          "Lee TH, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999;100(10):1043-1049.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Preoperative risk assessment must integrate the score with functional capacity, surgical risk, and the patient's clinical status.",
  },

  "ascvd": {
    clinicalPurpose:
      "Estimates 10-year risk of first atherosclerotic cardiovascular disease event (nonfatal MI, coronary heart disease death, or fatal/nonfatal stroke) using the ACC/AHA Pooled Cohort Equations.",
    howToUse: [
      "Confirm the patient is 40–79 years old and has no clinical ASCVD.",
      "Enter age, sex, race, total cholesterol, HDL cholesterol, systolic blood pressure, hypertension treatment status, smoking, and diabetes.",
      "Review the 10-year ASCVD risk percentage.",
      "Use the risk category together with risk-enhancing factors to guide statin intensity decisions.",
    ],
    interpretation: {
      guide:
        "<5%: low; 5–7.4%: borderline; 7.5–19.9%: intermediate; ≥20%: high risk. In adults 40–75 years, borderline/intermediate risk prompts a clinician–patient risk discussion, often supported by risk-enhancing factors or coronary artery calcium scoring.",
      sexSpecific: true,
      ageSpecific: true,
    },
    whenToUse: [
      "Primary prevention cardiovascular risk assessment in adults 40–79 years",
      "Initial statin decision-making per the 2018 ACC/AHA cholesterol guideline",
      "Monitoring risk over time and motivating lifestyle change",
    ],
    whenNotToUse: [
      "Patients with established clinical ASCVD — use secondary prevention pathways",
      "Patients outside the validated age and lab ranges (40–79 y; TC 130–320, HDL 20–100, SBP 90–200 mg/dL or mmHg)",
      "As a substitute for clinical judgment in high-risk phenotypes (e.g., FH, severe CKD)",
    ],
    limitations: [
      "Risk can be overestimated or underestimated in certain groups (e.g., Hispanic/Latino, South Asian, older adults).",
      "The equations were derived from US cohorts in the 1990s–2000s; contemporary cohorts may have lower event rates.",
      "Provides a 10-year estimate only; lifetime risk assessment is a separate consideration for young adults.",
    ],
    example: {
      description:
        "A 55-year-old white man, nonsmoker, without diabetes or hypertension treatment, has total cholesterol 213 mg/dL, HDL 50 mg/dL, and systolic blood pressure 120 mmHg.",
      inputs: {
        age: "55",
        sex: "male",
        race: "white",
        "total-cholesterol": "213",
        hdl: "50",
        sbp: "120",
        "hypertension-treated": "untreated",
        smoker: "0",
        diabetes: "0",
      },
      expectedResult:
        "10-year ASCVD risk ≈ 5.4% — BORDERLINE risk. A risk discussion is warranted; risk-enhancing factors may influence statin initiation.",
    },
    clinicalSignificance:
      "The Pooled Cohort Equations are the foundation of modern primary prevention statin guidelines, quantifying ASCVD risk to target preventive therapy where it provides the greatest benefit.",
    references: [
      {
        citation:
          "Goff DC Jr, et al. 2013 ACC/AHA guideline on the assessment of cardiovascular risk. J Am Coll Cardiol. 2014;63(25 Pt B):2935-2959.",
        level: "Guideline",
      },
      {
        citation:
          "Grundy SM, et al. 2018 AHA/ACC guideline on the management of blood cholesterol. Circulation. 2019;139(25):e1082-e1143.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. ASCVD risk estimates are population-based and must be interpreted in the context of the individual patient.",
  },

  "dapt": {
    clinicalPurpose:
      "Determines whether the net benefit of continuing dual antiplatelet therapy (DAPT) beyond 12 months after coronary stenting outweighs the bleeding risk, guiding DAPT duration decisions.",
    howToUse: [
      "Confirm the patient has completed 12 months of DAPT after coronary stenting and is being considered for continued treatment.",
      "Assign points for age, smoking, diabetes, MI at presentation, prior MI/PCI, small stent diameter, paclitaxel-eluting stent, CHF/LVEF <30%, and saphenous vein graft PCI.",
      "Sum the points (−2 to +10).",
      "Scores ≥2 favor extended DAPT; scores <2 favor stopping at 12 months.",
    ],
    interpretation: {
      guide:
        "Score ≥2: net benefit of extended DAPT (up to 30 months) — ischemic reduction outweighs bleeding risk. Score <2: bleeding risk outweighs ischemic benefit — standard 12-month DAPT is preferred.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Deciding whether to continue DAPT beyond 12 months after DES implantation",
      "Shared decision-making about DAPT duration after PCI",
      "Risk-benefit discussion balancing stent ischemia against major bleeding",
    ],
    whenNotToUse: [
      "Patients with high-risk ischemic indications where extended DAPT is mandated regardless of score",
      "As a substitute for bleeding risk assessment in patients with active bleeding or high-risk anatomy",
    ],
    limitations: [
      "Derived from the DAPT Study, which used specific antiplatelet regimens and stents; applicability to contemporary stents and P2Y12 inhibitors varies.",
      "Does not account for all bleeding risk factors (e.g., renal function, baseline anemia).",
      "The 2-point threshold is derived, not head-to-head validated across all populations.",
    ],
    example: {
      description:
        "A 60-year-old current smoker underwent PCI with a 2.75 mm DES for an NSTEMI, with a history of a prior PCI. No diabetes, no CHF, no SVG graft, and no paclitaxel stent.",
      inputs: {
        age: "0",
        smoking: "1",
        diabetes: "0",
        "mi-at-presentation": "1",
        "prior-mi-pci": "1",
        "stent-diameter": "1",
        paclitaxel: "0",
        "chf-lvef": "0",
        "svg-pci": "0",
      },
      expectedResult:
        "DAPT score 4 — favors EXTENDED dual antiplatelet therapy beyond 12 months. Expected ischemic reduction outweighs bleeding risk.",
    },
    clinicalSignificance:
      "The DAPT score operationalizes the trade-off between stent ischemia and major bleeding, supporting individualized, evidence-based DAPT duration decisions after stenting.",
    references: [
      {
        citation:
          "Yeh RW, et al. Development and validation of a prediction rule for benefit and harm of dual antiplatelet therapy beyond 1 year after percutaneous coronary intervention. JAMA. 2016;315(16):1735-1749.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. DAPT duration decisions must incorporate stent type, ischemic risk, bleeding risk, and patient preferences.",
  },

  "h2fpef": {
    clinicalPurpose:
      "Estimates the probability of heart failure with preserved ejection fraction (HFpEF) in patients with unexplained dyspnea, using clinical and echocardiographic features.",
    howToUse: [
      "Confirm the patient has unexplained dyspnea with a preserved (≥50%) left ventricular ejection fraction.",
      "Record atrial fibrillation status, BMI, age, number of antihypertensives, E/e' ratio, and pulmonary artery systolic pressure.",
      "Sum the points (0–9).",
      "Use the result to guide further testing or to begin HFpEF therapy.",
    ],
    interpretation: {
      guide:
        "Score 0–1: low probability of HFpEF (~6%); 2–5: intermediate (~10–46%) — consider further testing such as exercise echocardiography or invasive hemodynamics; 6–9: high probability (~67–95%) — HFpEF is very likely and treatment should be considered.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Evaluation of unexplained exertional dyspnea with preserved LVEF",
      "Determining which dyspneic patients warrant HFpEF therapy",
      "Quantifying the diagnostic likelihood of HFpEF before invasive testing",
    ],
    whenNotToUse: [
      "Patients with reduced or mid-range LVEF — classify HFrEF/HFmrEF separately",
      "As a replacement for exercise testing or invasive hemodynamics in ambiguous cases",
    ],
    limitations: [
      "Derived from a referral population evaluated for unexplained exertional dyspnea; performance in general primary care cohorts is less certain.",
      "Requires echocardiographic data (E/e', PASP) that may not be available at first assessment.",
      "Does not include resting/exercise filling pressure data that may be needed in intermediate-risk patients.",
    ],
    example: {
      description:
        "A 66-year-old woman with persistent atrial fibrillation, BMI 32, taking 3 antihypertensives, has E/e' 11 and PASP 40 mmHg on echocardiography, with unexplained dyspnea.",
      inputs: {
        afib: "3",
        bmi: "32",
        age: "66",
        antihypertensives: "1",
        "e-e-ratio": "1",
        pasp: "1",
      },
      expectedResult:
        "H2FPEF score 9 — HIGH probability of HFpEF (~95%). HFpEF is very likely; proceed with HFpEF treatment.",
    },
    clinicalSignificance:
      "H2FPEF provides a practical, evidence-based framework for diagnosing HFpEF, reducing reliance on invasive testing while accurately identifying patients likely to benefit from HFpEF therapy.",
    references: [
      {
        citation:
          "Reddy YNV, et al. A simple, evidence-based approach to help guide diagnosis of heart failure with preserved ejection fraction. Circulation. 2018;138(9):861-870.",
        level: "Level II",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The diagnosis of HFpEF requires clinical judgment and may warrant further testing in intermediate-risk patients.",
  },

  "ldl-cholesterol": {
    clinicalPurpose:
      "Estimates LDL cholesterol (LDL-C) from a fasting lipid panel using the Friedewald equation, supporting cardiovascular risk assessment and lipid-lowering treatment targets.",
    howToUse: [
      "Use a fasting sample — non-fasting triglycerides invalidate the estimate.",
      "Enter total cholesterol, HDL, and triglycerides (all in mg/dL).",
      "Calculate LDL as total cholesterol − HDL − (triglycerides ÷ 5).",
      "Compare the result against the patient's risk-based treatment target.",
    ],
    interpretation: {
      guide:
        "LDL < 100 is optimal; 100–129 near optimal/above optimal; 130–159 borderline high; 160–189 high; ≥ 190 very high. Actual treatment targets depend on the patient's ASCVD risk category.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Routine cardiovascular risk assessment",
      "Baseline and follow-up evaluation of dyslipidemia",
      "Assessment before starting or titrating statin therapy",
      "Evaluation of lipid goals in secondary prevention",
    ],
    whenNotToUse: [
      "Triglycerides ≥ 400 mg/dL — Friedewald is invalid; use direct LDL measurement",
      "Chylomicronemia or Type III hyperlipoproteinemia",
      "Non-fasting samples for estimating LDL",
      "When very precise LDL measurement is needed for decisions at borderline values",
    ],
    limitations: [
      "Assumes VLDL cholesterol ≈ triglycerides ÷ 5, which breaks down at high triglycerides and low LDL levels.",
      "Underestimates LDL at very high triglycerides and is unreliable in Type III dyslipidemia.",
      "Less accurate in non-fasting samples.",
      "Is an estimate, not a measured value; direct LDL or apolipoprotein B may be preferred when accuracy matters.",
    ],
    example: {
      description:
        "A 55-year-old man with hypertension has a fasting lipid panel: total cholesterol 240 mg/dL, HDL 50 mg/dL, triglycerides 150 mg/dL.",
      inputs: {
        totalCholesterol: "240",
        hdl: "50",
        triglycerides: "150",
      },
      expectedResult:
        "LDL = 240 − 50 − (150 ÷ 5) = 160 mg/dL — high LDL cholesterol (160–189).",
    },
    clinicalSignificance:
      "LDL cholesterol is the primary lipid target in ASCVD prevention. Accurate estimation with the Friedewald equation is central to risk stratification and to the initiation and monitoring of lipid-lowering therapy.",
    references: [
      {
        citation:
          "Friedewald WT, Levy RI, Fredrickson DS. Estimation of the concentration of low-density lipoprotein cholesterol in plasma, without use of the preparative ultracentrifuge. Clin Chem. 1972;18(6):499-502.",
        level: "Original Derivation",
      },
      {
        citation:
          "Grundy SM, et al. 2018 AHA/ACC guideline on the management of blood cholesterol. Circulation. 2019;139(25):e1082-e1143.",
        level: "Guideline",
      },
    ],
    faq: [
      {
        question: "When is the Friedewald equation invalid?",
        answer:
          "The equation is invalid when triglycerides are ≥ 400 mg/dL, in chylomicronemia, and in Type III hyperlipoproteinemia. Use direct LDL measurement instead.",
      },
      {
        question: "Why is a fasting sample required?",
        answer:
          "The equation assumes fasting triglycerides. Non-fasting triglycerides are higher and can falsely lower the calculated LDL.",
      },
    ],
    comparison: {
      title: "LDL estimation approaches",
      calculators: [
        {
          name: "Non-HDL Cholesterol",
          href: "/calculators/non-hdl-cholesterol",
          use: "Total atherogenic burden, including VLDL and remnants",
          bestFor: "Patients with elevated triglycerides",
        },
        {
          name: "Triglyceride to HDL Ratio",
          href: "/calculators/triglyceride-hdl-ratio",
          use: "Insulin resistance screening",
          bestFor: "Metabolic syndrome evaluation",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Friedewald WT, et al. Clin Chem. 1972;18(6):499-502.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. LDL treatment decisions must be based on the patient's overall cardiovascular risk and clinical judgment.",
  },

  "non-hdl-cholesterol": {
    clinicalPurpose:
      "Calculates non-HDL cholesterol (total cholesterol minus HDL), a measure of total atherogenic (apolipoprotein B-containing) particle burden used as a secondary lipid target.",
    howToUse: [
      "Enter total cholesterol and HDL (mg/dL) from the lipid panel.",
      "Subtract HDL from total cholesterol.",
      "Compare the result with the non-HDL target, typically 30 mg/dL above the LDL goal.",
    ],
    interpretation: {
      guide:
        "Non-HDL < 130 is optimal; 130–159 near optimal; 160–189 borderline high; 190–219 high; ≥ 220 very high. Targets are set 30 mg/dL above the corresponding LDL goal.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Patients with elevated triglycerides where calculated LDL is unreliable",
      "Secondary prevention where remnant cholesterol burden matters",
      "Cardiovascular risk assessment when only a non-fasting sample is available",
      "Monitoring response to lipid-lowering therapy",
    ],
    whenNotToUse: [
      "As a replacement for LDL when the primary target is LDL itself",
      "When apolipoprotein B quantification is specifically needed",
      "To diagnose hyperlipidemia subtype without the full lipid panel context",
    ],
    limitations: [
      "Non-HDL is an indirect estimate of atherogenic particle concentration, not a direct apolipoprotein B measurement.",
      "Requires plausible HDL relative to total cholesterol to produce a positive result.",
      "Population cut-points are not individual treatment targets.",
    ],
    example: {
      description:
        "A 60-year-old woman with diabetes has total cholesterol 240 mg/dL and HDL 50 mg/dL.",
      inputs: {
        totalCholesterol: "240",
        hdl: "50",
      },
      expectedResult:
        "Non-HDL cholesterol = 240 − 50 = 190 mg/dL — high (190–219).",
    },
    clinicalSignificance:
      "Non-HDL cholesterol captures all atherogenic lipoproteins, including VLDL and remnant particles missed by LDL alone. It is a useful secondary target, particularly when triglycerides are elevated.",
    references: [
      {
        citation:
          "National Cholesterol Education Program (NCEP) Expert Panel. ATP III Executive Summary. JAMA. 2001;285(19):2486-2497.",
        level: "Guideline",
      },
      {
        citation:
          "Grundy SM, et al. Implications of recent clinical trials for the NCEP ATP III guidelines. Circulation. 2004;110:227-239.",
        level: "Guideline",
      },
    ],
    faq: [
      {
        question: "Why is non-HDL used as a secondary target?",
        answer:
          "It reflects all apolipoprotein B-containing atherogenic particles and remains reliable when triglycerides are elevated, where calculated LDL becomes less accurate.",
      },
      {
        question: "How do non-HDL and LDL targets compare?",
        answer:
          "ATP III sets non-HDL goals approximately 30 mg/dL above the corresponding LDL goal.",
      },
    ],
    comparison: {
      title: "Lipid targets",
      calculators: [
        {
          name: "Calculated LDL (Friedewald Equation)",
          href: "/calculators/ldl-cholesterol",
          use: "Primary LDL-based risk assessment",
          bestFor: "Fasting samples with normal triglycerides",
        },
        {
          name: "Triglyceride to HDL Ratio",
          href: "/calculators/triglyceride-hdl-ratio",
          use: "Insulin resistance screening",
          bestFor: "Metabolic syndrome evaluation",
        },
      ],
    },
    evidence: {
      source: "National Cholesterol Education Program ATP III",
      reference:
        "NCEP ATP III Executive Summary. JAMA. 2001;285:2486-2497.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Lipid management should follow contemporary guidelines and individualized patient risk assessment.",
  },

  "albumin-globulin-ratio": {
    clinicalPurpose:
      "Calculates the albumin to globulin (A/G) ratio from serum albumin and total protein to aid in evaluating liver disease, nephrotic syndrome, and paraproteinemias.",
    howToUse: [
      "Enter serum albumin and total protein (g/dL) from the same blood draw.",
      "Compute globulin as total protein − albumin.",
      "Divide albumin by globulin for the A/G ratio.",
      "Always interpret the ratio together with the absolute albumin and globulin values.",
    ],
    interpretation: {
      guide:
        "A typical adult A/G ratio is 1.0–2.0. A low ratio reflects either reduced albumin (liver disease, nephrotic syndrome, malnutrition) or elevated globulins (chronic inflammation, monoclonal gammopathy). Reference intervals vary by laboratory.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Routine interpretation of serum protein chemistry",
      "Initial evaluation of unexplained hypoalbuminemia",
      "Screening trigger for serum protein electrophoresis when globulins are elevated",
      "Assessment of chronic liver or kidney disease with protein loss",
    ],
    whenNotToUse: [
      "As a diagnostic test for a specific disease — it is a screening aid",
      "In isolation without the absolute albumin and total protein values",
      "With hemolyzed or improperly processed samples",
    ],
    limitations: [
      "A normal ratio can mask concurrent low albumin and low globulin.",
      "The ratio cannot distinguish among the many causes of hypoalbuminemia or hyperglobulinemia.",
      "Normal ranges vary by laboratory method.",
    ],
    example: {
      description:
        "A 45-year-old man with suspected liver disease has serum albumin 4.0 g/dL and total protein 7.0 g/dL.",
      inputs: {
        albumin: "4",
        totalProtein: "7",
      },
      expectedResult:
        "Globulin = 7.0 − 4.0 = 3.0 g/dL; A/G ratio = 4.0 ÷ 3.0 = 1.33 — normal.",
    },
    clinicalSignificance:
      "The A/G ratio is a simple derived parameter that flags globulin-predominant states, prompting the appropriate workup — liver and nutritional assessment for low albumin or serum protein electrophoresis for high globulins.",
    references: [
      {
        citation:
          "Busher JT. Serum albumin and globulin. In: Walker HK, Hall WD, Hurst JW, eds. Clinical Methods: The History, Physical, and Laboratory Examinations. 3rd ed. Boston: Butterworths; 1990.",
        level: "Textbook",
      },
      {
        citation:
          "Rifai N, Horvath AR, Wittwer CT, eds. Tietz Textbook of Clinical Chemistry and Molecular Diagnostics. 6th ed. Elsevier; 2018.",
        level: "Textbook",
      },
    ],
    faq: [
      {
        question: "What causes a low A/G ratio?",
        answer:
          "A low ratio indicates globulin predominance — from reduced albumin (liver disease, nephrotic syndrome, malnutrition) or increased globulins (infection, autoimmune disease, multiple myeloma).",
      },
      {
        question: "Can a normal ratio hide an abnormality?",
        answer:
          "Yes. Concurrent low albumin and low globulin can produce a normal ratio despite significant hypoproteinemia, which is why the absolute values must always be reviewed together.",
      },
    ],
    comparison: {
      title: "Related serum protein tools",
      calculators: [
        {
          name: "Albumin-Corrected Calcium",
          href: "/calculators/albumin-corrected-calcium",
          use: "Calcium correction when albumin is abnormal",
          bestFor: "Calcium interpretation in low albumin",
        },
        {
          name: "Child-Pugh Score",
          href: "/calculators/child-pugh",
          use: "Liver disease severity and prognosis",
          bestFor: "Cirrhosis staging",
        },
      ],
    },
    evidence: {
      source: "Standard clinical chemistry reference",
      reference:
        "Busher JT. Serum albumin and globulin. Clinical Methods. 3rd ed. 1990.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Laboratory reference intervals vary; confirm with your local laboratory and interpret with clinical context.",
  },

  "tyg-index": {
    clinicalPurpose:
      "Calculates the triglyceride-glucose (TyG) index, a surrogate marker of insulin resistance derived from fasting triglycerides and fasting plasma glucose.",
    howToUse: [
      "Obtain fasting triglycerides and fasting plasma glucose (both in mg/dL).",
      "Compute TyG = ln(triglycerides × glucose ÷ 2).",
      "Compare the value with locally established population cut-points and prior results in the same patient.",
    ],
    interpretation: {
      guide:
        "There is no universally accepted TyG cut-point. Higher values indicate greater insulin resistance and higher cardiometabolic risk; published population thresholds vary widely.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Insulin resistance screening when an insulin assay is unavailable",
      "Cardiometabolic risk assessment in metabolic syndrome",
      "Population and epidemiological studies of insulin resistance",
      "Monitoring the effect of lifestyle intervention on metabolic risk",
    ],
    whenNotToUse: [
      "As a diagnostic test for diabetes — use standard glycemic criteria",
      "To replace an oral glucose tolerance test or HbA1c",
      "With non-fasting samples",
      "As a substitute for formal insulin sensitivity measurement in research protocols",
    ],
    limitations: [
      "No universal threshold — cut-points vary with population and outcome.",
      "Formula is defined for mg/dL units; using mmol/L changes the numeric value.",
      "Correlation with clamp-measured insulin sensitivity is moderate and population-dependent.",
    ],
    example: {
      description:
        "A 48-year-old man with metabolic syndrome has fasting triglycerides 150 mg/dL and fasting glucose 90 mg/dL.",
      inputs: {
        triglycerides: "150",
        glucose: "90",
      },
      expectedResult:
        "TyG index = ln((150 × 90) ÷ 2) = ln(6750) ≈ 8.82 — descriptive; compare with local population cut-points.",
    },
    clinicalSignificance:
      "The TyG index converts two routine fasting labs into a practical surrogate of insulin resistance, enabling cardiometabolic risk screening without a specialized insulin assay.",
    references: [
      {
        citation:
          "Simental-Mendía LE, Rodríguez-Morán M, Guerrero-Romero F. The product of fasting glucose and triglycerides as surrogate for identifying insulin resistance in apparently healthy subjects. Metab Syndr Relat Disord. 2008;6(4):299-304.",
        level: "Original Derivation",
      },
      {
        citation:
          "Guerrero-Romero F, et al. The product of triglycerides and glucose, a simple measure of insulin sensitivity. J Clin Endocrinol Metab. 2010;95(7):3347-3351.",
        level: "Level II",
      },
    ],
    faq: [
      {
        question: "Why does the TyG formula divide by 2?",
        answer:
          "The constants were chosen empirically so that the index correlates with euglycemic-hyperinsulinemic clamp-derived insulin sensitivity in the derivation cohort.",
      },
      {
        question: "Can TyG replace HOMA-IR?",
        answer:
          "TyG requires no insulin assay and correlates with HOMA-IR and clamp measures. Both are research-oriented surrogates; neither alone should drive clinical decisions.",
      },
    ],
    comparison: {
      title: "Insulin resistance surrogates",
      calculators: [
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          use: "Insulin resistance from fasting insulin and glucose",
          bestFor: "When an insulin assay is available",
        },
        {
          name: "QUICKI",
          href: "/calculators/quicki",
          use: "Log-transformed insulin sensitivity index",
          bestFor: "When an insulin assay is available",
        },
        {
          name: "Triglyceride to HDL Ratio",
          href: "/calculators/triglyceride-hdl-ratio",
          use: "Lipid-based insulin resistance marker",
          bestFor: "Routine lipid panels",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Simental-Mendía LE, et al. Metab Syndr Relat Disord. 2008;6(4):299-304.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TyG index is a screening surrogate and must not be used alone to diagnose diabetes or guide therapy.",
  },

  "triglyceride-hdl-ratio": {
    clinicalPurpose:
      "Calculates the triglyceride to HDL ratio (TG/HDL), a lipid-based marker of insulin resistance associated with cardiometabolic risk in overweight non-diabetic adults.",
    howToUse: [
      "Obtain fasting triglycerides and HDL cholesterol (mg/dL).",
      "Divide triglycerides by HDL.",
      "A ratio ≥ 3.0 has been associated with insulin resistance in overweight non-diabetic adults.",
      "Interpret cautiously outside this population.",
    ],
    interpretation: {
      guide:
        "TG/HDL < 3.0 is considered low risk by this marker; ≥ 3.0 is associated with insulin resistance in overweight non-diabetic adults. The cut-point is not reliable in African American populations.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Insulin resistance screening from routine lipid panels",
      "Cardiometabolic risk assessment in overweight non-diabetic adults",
      "Monitoring metabolic response to lifestyle intervention",
    ],
    whenNotToUse: [
      "As a diagnostic test for insulin resistance or diabetes",
      "In African American populations — the relationship does not hold",
      "In patients with severe hypertriglyceridemia where the ratio is dominated by triglycerides",
      "To predict cardiovascular events in isolation",
    ],
    limitations: [
      "Ethnicity-dependent validity — unreliable in African Americans (Sumner 2005).",
      "Derived in overweight non-diabetic adults; performance in other populations is uncertain.",
      "Uses mg/dL units; mmol/L inputs require conversion.",
    ],
    example: {
      description:
        "A 50-year-old overweight woman has triglycerides 150 mg/dL and HDL 40 mg/dL.",
      inputs: {
        triglycerides: "150",
        hdl: "40",
      },
      expectedResult:
        "TG/HDL ratio = 150 ÷ 40 = 3.75 — ≥ 3.0, associated with insulin resistance in overweight non-diabetic adults.",
    },
    clinicalSignificance:
      "The TG/HDL ratio provides a simple, fasting lipid-based screening marker of insulin resistance, helping identify overweight adults who may benefit from metabolic risk reduction.",
    references: [
      {
        citation:
          "McLaughlin T, Abbasi F, Cheal K, et al. Use of metabolic markers to identify overweight individuals who are insulin resistant. Ann Intern Med. 2003;139(10):802-809.",
        level: "Original Derivation",
      },
      {
        citation:
          "Sumner AE, et al. The triglyceride/high-density lipoprotein cholesterol ratio fails to predict insulin resistance in African-American women. Diabetes Care. 2005;28(6):1433-1438.",
        level: "Level II",
      },
    ],
    faq: [
      {
        question: "Why is the ratio unreliable in African Americans?",
        answer:
          "Sumner and colleagues found the TG/HDL ratio did not predict clamp-measured insulin resistance in African American cohorts, so the 3.0 cut-point should not be applied in this population.",
      },
      {
        question: "What units are required?",
        answer:
          "Both inputs must be in mg/dL. If values are in mmol/L, convert triglycerides (×88.57) and HDL (×38.67) to mg/dL first.",
      },
    ],
    comparison: {
      title: "Insulin resistance surrogates",
      calculators: [
        {
          name: "TyG Index",
          href: "/calculators/tyg-index",
          use: "Glucose and triglyceride-based index",
          bestFor: "When fasting glucose is available",
        },
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          use: "Insulin resistance from fasting insulin and glucose",
          bestFor: "When an insulin assay is available",
        },
        {
          name: "Non-HDL Cholesterol",
          href: "/calculators/non-hdl-cholesterol",
          use: "Atherogenic particle burden",
          bestFor: "Lipid treatment targets",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "McLaughlin T, et al. Ann Intern Med. 2003;139(10):802-809.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TG/HDL ratio is a screening marker with population limitations and must not be used alone for diagnosis.",
  },

  "quicki": {
    clinicalPurpose:
      "Calculates QUICKI, an insulin sensitivity index from fasting insulin and glucose: QUICKI = 1 / (log10 fasting insulin [µU/mL] + log10 fasting glucose [mg/dL]).",
    howToUse: [
      "Obtain fasting insulin (µU/mL) and fasting glucose (mg/dL).",
      "Take the base-10 logarithm of each and add them.",
      "Take the reciprocal of the sum.",
      "Interpret descriptively and in the context of the patient's metabolic risk.",
    ],
    interpretation: {
      guide:
        "Lower QUICKI values indicate greater insulin resistance. Published means: nonobese ≈ 0.38, obese ≈ 0.33, diabetic ≈ 0.30. There is no universal diagnostic cut-point.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Research and screening assessment of insulin sensitivity",
      "Metabolic risk evaluation when an insulin assay is available",
      "Tracking insulin sensitivity changes over time",
    ],
    whenNotToUse: [
      "As a diagnostic test for diabetes — use standard glycemic criteria",
      "To compare patients across different insulin assay methods",
      "As a replacement for clamp-based insulin sensitivity in research protocols",
      "In patients with insulin therapy that interferes with the assay",
    ],
    limitations: [
      "Insulin assays are not standardized across laboratories.",
      "No validated clinical cut-point exists.",
      "Fasting insulin is not a routine clinical test in most settings.",
    ],
    example: {
      description:
        "A 40-year-old woman with obesity has fasting insulin 10 µU/mL and fasting glucose 90 mg/dL.",
      inputs: {
        fastingInsulin: "10",
        fastingGlucose: "90",
      },
      expectedResult:
        "QUICKI = 1 / (log10(10) + log10(90)) = 1 / (1 + 1.9542) ≈ 0.34 — descriptive; compare with published means.",
    },
    clinicalSignificance:
      "QUICKI correlates with euglycemic-hyperinsulinemic clamp measures of insulin sensitivity using only a single fasting blood sample, enabling practical insulin resistance assessment.",
    references: [
      {
        citation:
          "Katz A, Nambi SS, Mather K, et al. Quantitative insulin sensitivity check index: a simple, accurate method for assessing insulin sensitivity in humans. J Clin Endocrinol Metab. 2000;85(7):2402-2410.",
        level: "Original Derivation",
      },
      {
        citation:
          "Muniyappa R, et al. Current approaches for assessing insulin sensitivity and resistance in vivo. Am J Physiol Endocrinol Metab. 2008;294(1):E15-E26.",
        level: "Expert Review",
      },
    ],
    faq: [
      {
        question: "How does QUICKI differ from HOMA-IR?",
        answer:
          "QUICKI uses log-transformed values, making it more stable at high insulin concentrations, where HOMA-IR can become unstable. In practice the two agree closely in most patients.",
      },
      {
        question: "What units are required?",
        answer:
          "Fasting insulin in µU/mL and glucose in mg/dL. If glucose is in mmol/L, multiply by 18.018 to convert to mg/dL.",
      },
    ],
    comparison: {
      title: "Insulin sensitivity indices",
      calculators: [
        {
          name: "HOMA-IR",
          href: "/calculators/homa-ir",
          use: "Insulin resistance from fasting insulin and glucose",
          bestFor: "Conventional resistance index",
        },
        {
          name: "Insulin Sensitivity (1/HOMA-IR)",
          href: "/calculators/insulin-sensitivity",
          use: "Sensitivity expressed as reciprocal of HOMA-IR",
          bestFor: "Sensitivity framing",
        },
        {
          name: "TyG Index",
          href: "/calculators/tyg-index",
          use: "No insulin assay required",
          bestFor: "When insulin is unavailable",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Katz A, et al. J Clin Endocrinol Metab. 2000;85(7):2402-2410.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. QUICKI is a research-oriented surrogate and must not be used alone to diagnose insulin resistance or diabetes.",
  },

  "winters-formula": {
    clinicalPurpose:
      "Calculates the expected compensatory PaCO2 in primary metabolic acidosis using Winter's formula (expected PaCO2 = 1.5 × HCO3 + 8 ± 2 mmHg), helping identify appropriate, inadequate, or excessive respiratory compensation.",
    howToUse: [
      "Confirm a primary metabolic acidosis (low HCO3 with low pH).",
      "Enter the serum bicarbonate (mEq/L) and the measured arterial PaCO2 (mmHg).",
      "Compare the measured PaCO2 with the expected range (expected value ± 2 mmHg).",
    ],
    interpretation: {
      guide:
        "If measured PaCO2 is within expected ± 2 mmHg, compensation is appropriate. Above the range: concurrent respiratory acidosis (inadequate compensation). Below the range: concurrent respiratory alkalosis (excessive compensation).",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of metabolic acidosis of any cause (DKA, lactic acidosis, renal tubular acidosis, intoxications)",
      "Assessment of the respiratory response to a falling bicarbonate",
      "Detection of mixed acid-base disorders in the ICU",
    ],
    whenNotToUse: [
      "Metabolic alkalosis or normal bicarbonate — the formula requires acidosis",
      "As a target to aim for — it predicts the physiologic response",
      "When the chemistry panel and ABG are not drawn concurrently",
    ],
    limitations: [
      "Applies only to primary metabolic acidosis (HCO3 < 24 mEq/L).",
      "The ± 2 mmHg range is a guide; individual ventilatory responses vary.",
      "Compensation develops over minutes to hours — an early ABG may underrepresent compensation.",
    ],
    example: {
      description:
        "A 32-year-old man with DKA has serum bicarbonate 10 mEq/L and arterial PaCO2 28 mmHg.",
      inputs: {
        bicarbonate: "10",
        pco2: "28",
      },
      expectedResult:
        "Expected PaCO2 = 1.5 × 10 + 8 = 23 mmHg (range 21–25). Measured 28 mmHg is above the range — compensation is inadequate, suggesting a concurrent respiratory acidosis.",
    },
    clinicalSignificance:
      "Winter's formula quantifies the expected ventilatory compensation in metabolic acidosis, allowing clinicians to detect superimposed respiratory acid-base disorders that would otherwise be missed.",
    references: [
      {
        citation:
          "Albert MS, Dell RB, Winters RW. Quantitative displacement of acid-base equilibrium in metabolic acidosis. Ann Intern Med. 1967;66(2):312-322.",
        level: "Original Derivation",
      },
      {
        citation:
          "Bushinsky DA. Acid-base disorders. In: Brenner & Rector's The Kidney. Elsevier; 2020.",
        level: "Textbook",
      },
    ],
    faq: [
      {
        question: "What if the measured PaCO2 is higher than expected?",
        answer:
          "Compensation is inadequate — evaluate for a concurrent respiratory acidosis, such as hypoventilation from sedation, neuromuscular disease, or lung disease.",
      },
      {
        question: "Does Winter's formula apply in metabolic alkalosis?",
        answer:
          "No. In metabolic alkalosis the expected compensation follows a different relationship (PaCO2 ≈ 0.7 × HCO3 + 20), capped near 55 mmHg.",
      },
    ],
    comparison: {
      title: "Acid-base interpretation tools",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          use: "Differentiate high vs normal anion gap acidosis",
          bestFor: "First-step acid-base classification",
        },
        {
          name: "Anion Gap Delta Ratio",
          href: "/calculators/anion-gap-delta-ratio",
          use: "Detect mixed acid-base disorders",
          bestFor: "High anion gap acidosis evaluation",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Albert MS, Dell RB, Winters RW. Ann Intern Med. 1967;66(2):312-322.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid-base interpretation requires correlation with pH, the clinical picture, and the timing of blood sampling.",
  },

  "anion-gap-delta-ratio": {
    clinicalPurpose:
      "Calculates the anion gap delta ratio (ΔAG/ΔHCO3) to evaluate mixed acid-base disorders in high anion gap metabolic acidosis: ΔAG/ΔHCO3 = (AG − 12) / (24 − HCO3).",
    howToUse: [
      "Confirm a high anion gap metabolic acidosis (AG > 12 with reduced bicarbonate).",
      "Enter the anion gap and bicarbonate (mEq/L).",
      "Compare the ratio with the 1.0–2.0 reference window.",
    ],
    interpretation: {
      guide:
        "Ratio < 1.0 suggests a concurrent non-anion gap (hyperchloremic) acidosis. Ratio 1.0–2.0 is consistent with a pure high anion gap acidosis. Ratio > 2.0 suggests a concurrent metabolic alkalosis or pre-existing high bicarbonate.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of high anion gap metabolic acidosis (DKA, lactic acidosis, uremia, toxin ingestion)",
      "Detection of mixed acid-base disorders in critically ill patients",
      "Assessment when bicarbonate falls more or less than expected for the gap",
    ],
    whenNotToUse: [
      "Normal or low anion gap — the delta ratio is not applicable",
      "When bicarbonate is normal or elevated (denominator not positive)",
      "As a substitute for a complete acid-base assessment with pH",
    ],
    limitations: [
      "Assumes a normal anion gap of 12 and normal bicarbonate of 24; local reference intervals differ.",
      "In lactic acidosis, the gap may transiently lag behind the bicarbonate fall.",
      "Values near the boundaries (0.9, 2.1) require clinical correlation.",
    ],
    example: {
      description:
        "A patient with diarrhea and a high anion gap acidosis has anion gap 23 mEq/L and bicarbonate 12 mEq/L.",
      inputs: {
        anionGap: "23",
        bicarbonate: "12",
      },
      expectedResult:
        "ΔAG/ΔHCO3 = (23 − 12) / (24 − 12) = 11/12 ≈ 0.92 — below 1, suggesting a mixed high anion gap plus non-anion gap acidosis.",
    },
    clinicalSignificance:
      "The delta ratio reconciles the rise in the anion gap with the fall in bicarbonate, revealing hidden mixed acid-base disorders that a simple gap value would miss.",
    references: [
      {
        citation:
          "Rastegar A. Use of the delta gap ratio in mixed acid-base disorders. J Am Soc Nephrol. 2007;18(10):2631-2636.",
        level: "Expert Review",
      },
      {
        citation:
          "Seifter JL. Acid-base disorders. In: Brenner & Rector's The Kidney. Elsevier; 2020.",
        level: "Textbook",
      },
    ],
    faq: [
      {
        question: "What does a delta ratio below 1 mean?",
        answer:
          "The bicarbonate fall exceeds the anion gap rise, indicating a concurrent non-anion gap (hyperchloremic) acidosis such as diarrhea or a renal tubular acidosis.",
      },
      {
        question: "What does a delta ratio above 2 mean?",
        answer:
          "The bicarbonate is higher than expected for the gap elevation, suggesting a concurrent metabolic alkalosis or pre-existing high bicarbonate.",
      },
    ],
    comparison: {
      title: "Acid-base interpretation tools",
      calculators: [
        {
          name: "Anion Gap",
          href: "/calculators/anion-gap",
          use: "First-step acid-base classification",
          bestFor: "Confirming a high anion gap acidosis",
        },
        {
          name: "Urine Anion Gap",
          href: "/calculators/urine-anion-gap",
          use: "Renal vs extrarenal causes of hyperchloremic acidosis",
          bestFor: "Normal anion gap acidosis",
        },
        {
          name: "Winter's Formula",
          href: "/calculators/winters-formula",
          use: "Expected respiratory compensation",
          bestFor: "Evaluating the PaCO2 response",
        },
      ],
    },
    evidence: {
      source: "Expert review and textbook standard",
      reference:
        "Rastegar A. J Am Soc Nephrol. 2007;18(10):2631-2636.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Mixed acid-base interpretation requires integration of the full chemistry panel, ABG, and clinical context.",
  },

  "urine-anion-gap": {
    clinicalPurpose:
      "Calculates the urine anion gap (UAG = [urine sodium + urine potassium] − urine chloride) to distinguish renal from extrarenal causes of a normal anion gap (hyperchloremic) metabolic acidosis.",
    howToUse: [
      "Confirm a normal anion gap (hyperchloremic) metabolic acidosis with hypokalemia and normal renal function.",
      "Enter urine sodium, potassium, and chloride (mEq/L).",
      "Compute UAG = (Na + K) − Cl.",
    ],
    interpretation: {
      guide:
        "A negative UAG (typically −20 to −50 mEq/L) indicates appropriate renal ammonium excretion, consistent with extrarenal (GI) bicarbonate loss. A positive or near-zero UAG suggests impaired renal acidification, as in distal renal tubular acidosis.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of hyperchloremic metabolic acidosis",
      "Distinguishing diarrhea (GI bicarbonate loss) from distal RTA",
      "Assessment of renal ammonium excretion when direct measurement is unavailable",
    ],
    whenNotToUse: [
      "High anion gap metabolic acidosis",
      "Acute or chronic kidney disease — tubular function is already abnormal",
      "When urine electrolytes are collected over an incomplete or non-steady-state period",
      "As a substitute for direct urine ammonium measurement",
    ],
    limitations: [
      "An indirect surrogate for urine ammonium; unreliable at extremes of urine sodium or chloride.",
      "Does not distinguish type 1 from type 2 RTA.",
      "Requires normal renal function and a hyperchloremic acidosis for meaningful interpretation.",
    ],
    example: {
      description:
        "A 30-year-old woman with severe diarrhea and hyperchloremic metabolic acidosis has urine sodium 10 mEq/L, potassium 20 mEq/L, and chloride 110 mEq/L.",
      inputs: {
        urineNa: "10",
        urineK: "20",
        urineCl: "110",
      },
      expectedResult:
        "UAG = (10 + 20) − 110 = −80 mEq/L — negative, consistent with appropriate renal ammonium excretion and gastrointestinal bicarbonate loss.",
    },
    clinicalSignificance:
      "The urine anion gap uses routine urine electrolytes to approximate ammonium excretion, helping localize the cause of hyperchloremic acidosis without specialized testing.",
    references: [
      {
        citation:
          "Battle DC, Hizon M, Cohen E, et al. The use of the urinary anion gap in the diagnosis of hyperchloremic metabolic acidosis. N Engl J Med. 1988;318(10):594-599.",
        level: "Original Derivation",
      },
      {
        citation:
          "Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders. 6th ed. McGraw-Hill; 2013.",
        level: "Textbook",
      },
    ],
    faq: [
      {
        question: "What does a negative urine anion gap indicate?",
        answer:
          "A negative gap reflects unmeasured cations (mainly ammonium) in the urine, indicating the kidney is excreting acid appropriately — consistent with extrarenal bicarbonate loss such as diarrhea.",
      },
      {
        question: "Why is the UAG unreliable in renal failure?",
        answer:
          "Kidney disease itself impairs ammonium excretion, so the urine anion gap can no longer distinguish renal from extrarenal causes of acidosis.",
      },
    ],
    comparison: {
      title: "Related renal assessment tools",
      calculators: [
        {
          name: "Anion Gap Delta Ratio",
          href: "/calculators/anion-gap-delta-ratio",
          use: "Mixed acid-base detection in HAGMA",
          bestFor: "High anion gap acidosis",
        },
        {
          name: "FENa",
          href: "/calculators/fena",
          use: "Fractional excretion of sodium in AKI",
          bestFor: "Acute kidney injury evaluation",
        },
        {
          name: "Winter's Formula",
          href: "/calculators/winters-formula",
          use: "Expected respiratory compensation",
          bestFor: "Evaluating the PaCO2 response",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Battle DC, et al. N Engl J Med. 1988;318(10):594-599.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The urine anion gap is an indirect estimate of ammonium excretion and must be interpreted with renal function and clinical context.",
  },

  "kt-v": {
    clinicalPurpose:
      "Calculates single-pool Kt/V (spKt/V) for hemodialysis adequacy using the Daugirdas second-generation formula, supporting KDOQI dialysis dosing standards.",
    howToUse: [
      "Measure pre- and post-dialysis BUN (mg/dL) on the same treatment.",
      "Record the treatment time (hours), ultrafiltration volume (L), and post-dialysis weight (kg).",
      "Compute R = post/pre BUN; then spKt/V = −ln(R − 0.008t) + (4 − 3.5R) × UF/W.",
    ],
    interpretation: {
      guide:
        "KDOQI recommends a minimum delivered spKt/V of 1.2 per treatment (target 1.4) for three-times-weekly hemodialysis. Below 1.0 indicates inadequate dialysis.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Routine monthly hemodialysis adequacy monitoring",
      "Evaluation after dialysis prescription changes",
      "Assessment when urea reduction ratio (URR) is borderline",
      "Pre- and post-access intervention adequacy assessment",
    ],
    whenNotToUse: [
      "Peritoneal dialysis — uses weekly Kt/V targets",
      "Twice-weekly or alternate hemodialysis schedules — different targets apply",
      "In-center HD with incorrect post-BUN sampling (pump recirculation) without correction",
    ],
    limitations: [
      "Single-pool estimates do not account for post-dialysis urea rebound (eKt/V does).",
      "Requires accurate post-dialysis BUN sampling technique.",
      "Assumes three-times-weekly dialysis; alternative schedules require different adequacy standards.",
    ],
    example: {
      description:
        "A 68-year-old man on thrice-weekly hemodialysis: pre-BUN 90 mg/dL, post-BUN 30 mg/dL, ultrafiltrate 2.5 L, treatment time 4 h, post-dialysis weight 75 kg.",
      inputs: {
        preBun: "90",
        postBun: "30",
        ultrafiltrate: "2.5",
        treatmentTime: "4",
        postWeight: "75",
      },
      expectedResult:
        "R = 30/90 = 0.333; spKt/V = −ln(0.333 − 0.032) + (4 − 1.167) × 2.5/75 ≈ 1.29 — adequate (≥ 1.2).",
    },
    clinicalSignificance:
      "Dialysis dose is directly linked to patient survival and quality of life. spKt/V is the KDOQI-recommended measure for verifying that patients receive an adequate minimum delivered dose.",
    references: [
      {
        citation:
          "Daugirdas JT. Second generation logarithmic estimates of single-pool variable volume Kt/V: an analysis of error. J Am Soc Nephrol. 1993;4(5):1205-1213.",
        level: "Original Derivation",
      },
      {
        citation:
          "National Kidney Foundation. KDOQI Clinical Practice Guideline for Hemodialysis Adequacy: 2015 update. Am J Kidney Dis. 2015;66(5):884-930.",
        level: "Guideline",
      },
    ],
    faq: [
      {
        question: "What is the difference between spKt/V and eKt/V?",
        answer:
          "spKt/V ignores post-dialysis urea rebound; eKt/V corrects for it. The difference is small at lower doses and grows at higher doses. spKt/V is the KDOQI standard for routine monitoring.",
      },
      {
        question: "Can this formula be used for peritoneal dialysis?",
        answer:
          "No. Peritoneal dialysis adequacy uses weekly Kt/V targets (e.g., ≥ 1.7/week) with a different calculation.",
      },
    ],
    comparison: {
      title: "Kidney function assessment tools",
      calculators: [
        {
          name: "CKD-EPI 2021 eGFR",
          href: "/calculators/ckd-epi-2021",
          use: "Estimated GFR for CKD staging",
          bestFor: "Chronic kidney disease staging",
        },
        {
          name: "MDRD eGFR",
          href: "/calculators/mdrd",
          use: "Alternative eGFR equation",
          bestFor: "Laboratory-reported eGFR",
        },
        {
          name: "Cockcroft-Gault CrCl",
          href: "/calculators/cockcroft-gault",
          use: "Creatinine clearance for drug dosing",
          bestFor: "Medication dose adjustment",
        },
      ],
    },
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Daugirdas JT. J Am Soc Nephrol. 1993;4(5):1205-1213.",
      reviewedBy: "MedCalcHub Clinical Team",
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dialysis adequacy decisions must incorporate the prescription, access function, patient status, and KDOQI guidelines.",
  },

  "fractional-excretion-uric-acid": {
    clinicalPurpose:
      "Quantifies the fractional excretion of uric acid (FEUA) to help distinguish prerenal azotemia from intrinsic renal injury in acute kidney injury, and to assess urate handling in conditions such as SIADH, tumor lysis syndrome, and Fanconi syndrome.",
    howToUse: [
      "Obtain urine and serum uric acid together with urine and serum creatinine from the same time point.",
      "Enter all four values in the appropriate fields.",
      "Review the calculated FEUA and its suggested category.",
      "Combine with FENa, FEUrea, urine microscopy, and clinical volume status.",
    ],
    interpretation: {
      guide:
        "In AKI, FEUA < 12% supports a prerenal pattern, 12–20% is indeterminate, and > 20% is more consistent with intrinsic renal injury such as ATN. In hyponatremia evaluation, a FEUA above 12% has been proposed as supporting SIADH. Thresholds overlap substantially and should not be used in isolation.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Acute kidney injury differential (prerenal vs intrinsic)",
      "When diuretics make FENa unreliable",
      "Hyponatremia evaluation where SIADH is suspected",
      "Assessment of urate handling in tumor lysis or Fanconi syndrome",
    ],
    whenNotToUse: [
      "As a standalone diagnostic test for AKI",
      "In patients receiving uricosuric drugs without accounting for their effect",
      "When serum and urine uric acid are not sampled simultaneously",
    ],
    limitations: [
      "Thresholds (12% and 20%) derive from observational AKI data and overlap substantially.",
      "FEUA is influenced by volume status, uricosuric drugs (e.g., losartan, probenecid), and renal function.",
      "Requires simultaneous urine and serum samples.",
      "Does not, by itself, establish the cause of AKI.",
    ],
    example: {
      description:
        "A 45-year-old man with early AKI has a urine uric acid of 20 mg/dL, serum uric acid 6 mg/dL, urine creatinine 80 mg/dL, and plasma creatinine 1.2 mg/dL.",
      inputs: {
        urineUricAcid: "20",
        serumUricAcid: "6",
        urineCr: "80",
        plasmaCr: "1.2",
      },
      expectedResult:
        "FEUA = (20 × 1.2) ÷ (6 × 80) × 100 = 5.0%. This value below 12% supports a prerenal pattern.",
    },
    clinicalSignificance:
      "FEUA is less affected by diuretics than FENa, making it a useful complementary index in the AKI differential and in disorders of urate excretion such as SIADH and tumor lysis syndrome.",
    references: [
      {
        citation:
          "Steinhäuslin F, et al. Fractional excretion of trace lithium and uric acid in acute renal failure. J Am Soc Nephrol. 1994;4(7):1429-1437.",
        level: "Original Description",
      },
      {
        citation:
          "Fenske W, et al. FE-urate and FE-urea in the differential diagnosis of SIADH. Eur J Clin Invest. 2010;40(6):506-513.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEUA must be interpreted with the clinical context and alongside other urinary indices.",
  },

  "fractional-excretion-phosphate": {
    clinicalPurpose:
      "Quantifies the fractional excretion of phosphate (FEP) to localize the cause of hypophosphatemia: a high FEP indicates renal phosphate wasting, whereas a low FEP favors redistribution or gastrointestinal losses.",
    howToUse: [
      "Measure urine and serum phosphate with paired urine and serum creatinine from the same time point.",
      "Enter all four values.",
      "Review the FEP and its interpretation relative to the prevailing serum phosphate.",
    ],
    interpretation: {
      guide:
        "During hypophosphatemia, a FEP above 5% indicates inappropriate renal phosphate wasting (e.g., FGF23 excess, Fanconi syndrome, tumor-induced osteomalacia). A FEP below 5% favors redistribution or gastrointestinal loss. FEP rises physiologically as GFR falls and is not useful when serum phosphate is elevated.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of hypophosphatemia",
      "Suspected renal phosphate wasting (FGF23 excess, Fanconi syndrome, tumor-induced osteomalacia)",
      "Assessment of phosphate handling in proximal tubular disorders",
    ],
    whenNotToUse: [
      "When serum phosphate is elevated (e.g., CKD), where FEP is expected to be high",
      "As a standalone diagnostic test",
      "Without simultaneous serum and urine sampling",
    ],
    limitations: [
      "The 5% threshold is a clinical convention, not a formally standardized cutoff.",
      "High dietary phosphate, vitamin D therapy, and PTH/FGF23 status all affect phosphate excretion.",
      "Requires simultaneous urine and serum samples.",
    ],
    example: {
      description:
        "A 60-year-old woman with hypophosphatemia has a urine phosphate of 50 mg/dL, serum phosphate 3.0 mg/dL, urine creatinine 80 mg/dL, and plasma creatinine 1.2 mg/dL.",
      inputs: {
        urinePhosphate: "50",
        serumPhosphate: "3.0",
        urineCr: "80",
        plasmaCr: "1.2",
      },
      expectedResult:
        "FEP = (50 × 1.2) ÷ (3.0 × 80) × 100 = 25%. This markedly elevated value indicates renal phosphate wasting.",
    },
    clinicalSignificance:
      "FEP separates renal phosphate wasting from redistribution or gastrointestinal causes of hypophosphatemia, guiding evaluation of FGF23-mediated disorders and proximal tubular disease.",
    references: [
      {
        citation:
          "Broadus AE, et al. Phosphate homeostasis and evaluation of hypophosphatemia. J Clin Invest. 1983;72(1):119-126.",
        level: "Original Description",
      },
      {
        citation:
          "Imel EA, Econs MJ. Approach to the hypophosphatemic patient. J Clin Endocrinol Metab. 2012;97(3):696-706.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEP must be interpreted with the clinical context and the prevailing serum phosphate.",
  },

  "fractional-excretion-calcium": {
    clinicalPurpose:
      "Calculates the fractional excretion of calcium (calcium–creatinine clearance ratio, CCCR) to help distinguish familial hypocalciuric hypercalcemia (FHH) from primary hyperparathyroidism in PTH-dependent hypercalcemia.",
    howToUse: [
      "Use in patients with hypercalcemia and elevated or inappropriately normal PTH.",
      "Collect spot urine calcium, urine creatinine, serum calcium, and serum creatinine at the same time.",
      "Enter all four values and review the FECa and its category.",
      "Consider CASR gene testing when the result is in the gray zone but FHH is suspected.",
    ],
    interpretation: {
      guide:
        "A FECa below 1% (CCCR < 0.01) suggests FHH; 1–2% is a gray zone where some FHH patients fall; above 2% primary hyperparathyroidism is more likely. Low urine calcium also occurs with vitamin D deficiency, thiazides, lithium, and renal insufficiency.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "PTH-dependent hypercalcemia: FHH vs primary hyperparathyroidism",
      "Preoperative screening recommended by NICE before parathyroid surgery",
      "Family history of hypercalcemia",
    ],
    whenNotToUse: [
      "In hypercalcemia with suppressed PTH (malignancy, sarcoidosis)",
      "In vitamin D deficiency or low calcium intake, which lower urine calcium",
      "As the sole basis for genetic testing decisions",
    ],
    limitations: [
      "The 1% and 2% thresholds overlap clinically; up to ~20–35% of genetically confirmed FHH may have CCCR ≥ 0.01.",
      "Thiazides, lithium, vitamin D deficiency, and renal insufficiency lower urine calcium.",
      "CASR gene analysis remains the reference standard in ambiguous cases.",
    ],
    example: {
      description:
        "A 52-year-old woman with hypercalcemia has a urine calcium of 50 mg/dL, serum calcium 10 mg/dL, urine creatinine 100 mg/dL, and plasma creatinine 1.0 mg/dL.",
      inputs: {
        urineCalcium: "50",
        serumCalcium: "10",
        urineCr: "100",
        plasmaCr: "1.0",
      },
      expectedResult:
        "FECa = (50 × 1.0) ÷ (10 × 100) × 100 = 5% (CCCR 0.05). Above 2%, primary hyperparathyroidism is more likely than FHH.",
    },
    clinicalSignificance:
      "FHH is caused by a reset calcium-sensing receptor with relative hypocalciuria despite hypercalcemia. The calcium–creatinine clearance ratio is a key discriminator that prevents unnecessary parathyroid surgery in FHH patients.",
    references: [
      {
        citation:
          "Christiansen C, et al. Discriminative power of three indices of renal calcium excretion for the distinction between familial hypocalciuric hypercalcaemia and primary hyperparathyroidism. Clin Endocrinol (Oxf). 2008;69(4):572-578.",
        level: "Validation Study",
      },
      {
        citation:
          "National Institute for Health and Care Excellence (NICE). Hyperparathyroidism (primary): diagnosis, assessment and initial management. NG132. 2019.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FECa is one component of the FHH evaluation and must be interpreted with PTH, family history, and genetic testing when indicated.",
  },

  "renal-failure-index": {
    clinicalPurpose:
      "Calculates the renal failure index (RFI), a classic urinary index using urine sodium relative to the urine:plasma creatinine ratio to help distinguish prerenal azotemia from acute tubular necrosis.",
    howToUse: [
      "Obtain spot urine sodium, urine creatinine, and plasma creatinine from the same time point.",
      "Enter all three values.",
      "Review the RFI and its suggested category.",
      "Combine with FENa, FEUrea, urine microscopy, and clinical volume assessment.",
    ],
    interpretation: {
      guide:
        "An RFI below 1 supports prerenal azotemia, 1–2 is indeterminate, and above 2 favors intrinsic renal injury such as ATN. The test shares the limitations of FENa: diuretics and saline resuscitation raise urine sodium and can produce false intrinsic-like values.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Acute kidney injury differential when urine sodium is available",
      "Complementing FENa and FEUrea in the prerenal-versus-intrinsic distinction",
      "Bedside teaching of classic urinary indices",
    ],
    whenNotToUse: [
      "In patients receiving diuretics without accounting for their effect",
      "As a standalone diagnostic test",
      "When urine output is absent or creatinine assays are non-standardized",
    ],
    limitations: [
      "Shares the limitations of FENa, including diuretic and saline-resuscitation effects.",
      "The <1/>1 convention derives from classic literature and is not a validated diagnostic threshold alone.",
      "Requires simultaneous samples.",
    ],
    example: {
      description:
        "A 60-year-old man with volume depletion and rising creatinine has a urine sodium of 40 mmol/L, plasma creatinine 1.2 mg/dL, and urine creatinine 80 mg/dL.",
      inputs: {
        urineSodium: "40",
        plasmaCr: "1.2",
        urineCr: "80",
      },
      expectedResult:
        "RFI = (40 × 1.2) ÷ 80 = 0.6. This value below 1 supports prerenal azotemia.",
    },
    clinicalSignificance:
      "The renal failure index is a classic bedside urinary index introduced in the 1960s–70s. It is essentially FENa without the plasma sodium term and remains a useful teaching and clinical adjunct in the AKI differential.",
    references: [
      {
        citation:
          "Miller TR, et al. Urinary diagnostic indices in acute renal failure: a prospective study. Ann Intern Med. 1978;89(1):47-50.",
        level: "Original Description",
      },
      {
        citation:
          "Espinel CH. The FENa test: use in the differential diagnosis of acute renal failure. JAMA. 1976;236(6):579-581.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. RFI must be interpreted with the clinical context and alongside other urinary indices.",
  },

  "urine-osmolal-gap": {
    clinicalPurpose:
      "Calculates the urine osmolal gap — the difference between measured and estimated urine osmolality — to detect unmeasured osmoles in the urine (e.g., ethylene glycol, methanol, mannitol).",
    howToUse: [
      "Use when toxic alcohol or mannitol exposure is suspected and the serum osmolar gap is unreliable or negative.",
      "Enter measured urine osmolality, urine sodium, urine potassium, urine urea, and urine glucose.",
      "Review the residual gap, which represents unmeasured osmotically active solutes.",
    ],
    interpretation: {
      guide:
        "The estimated urine osmolality is 2 × (Na + K) + urea/2.8 + glucose/18 (urea and glucose in mg/dL). A gap of 10 mOsm/kg or less is normal; a gap above 10 suggests unmeasured osmoles such as ethylene glycol or mannitol. A normal gap does not exclude toxic alcohol ingestion.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Suspected ethylene glycol or methanol poisoning",
      "Mannitol or other low-molecular-weight solute exposure",
      "When the serum osmolar gap is negative but intoxication is still suspected",
    ],
    whenNotToUse: [
      "As a replacement for serum osmolar gap or specific alcohol assays",
      "When urine electrolytes, urea, and glucose are not measured on the same sample",
    ],
    limitations: [
      "A normal gap does not exclude toxic alcohol ingestion; specific assays remain essential.",
      "The 10 mOsm/kg cutoff is a practical convention, not a standardized diagnostic threshold.",
      "Rapid alcohol metabolism can lower the gap, so early sampling matters.",
    ],
    example: {
      description:
        "A 35-year-old man with suspected ethylene glycol ingestion has a measured urine osmolality of 600 mOsm/kg, urine sodium 80 mmol/L, urine potassium 40 mmol/L, urine urea 560 mg/dL, and urine glucose 0 mg/dL.",
      inputs: {
        urineOsmolality: "600",
        urineSodium: "80",
        urinePotassium: "40",
        urineUrea: "560",
        urineGlucose: "0",
      },
      expectedResult:
        "Estimated urine osmolality = 2 × (80 + 40) + 560/2.8 + 0 = 440 mOsm/kg. The gap of 160 mOsm/kg indicates substantial unmeasured osmoles.",
    },
    clinicalSignificance:
      "The urine osmolal gap detects osmotically active solutes not captured by routine urine chemistries and complements the serum osmolar gap in the evaluation of toxic alcohol and mannitol exposure.",
    references: [
      {
        citation:
          "Kraut JA, Kurtz I. Toxic alcohol ingestions: clinical features, diagnosis, and management. Clin J Am Soc Nephrol. 2008;3(1):208-225.",
        level: "Expert Review",
      },
      {
        citation:
          "Hoffman RS, et al. Osmol and gap: a critical appraisal. Am J Emerg Med. 1993;11(5):543-547.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Suspected toxic alcohol ingestion requires specific assays and urgent clinical management regardless of the urine osmolal gap.",
  },

  "free-water-clearance": {
    clinicalPurpose:
      "Calculates renal free water clearance (CH₂O) from urine flow, urine osmolality, and plasma osmolality to characterize renal water handling in polyuria, hyponatremia, and hypernatremia.",
    howToUse: [
      "Enter urine flow, urine osmolality, and plasma osmolality from the same time point.",
      "Any consistent urine flow unit works; the result shares that unit (mL/min is shown).",
      "Review the sign of CH₂O: positive means free water excretion, negative means free water conservation.",
    ],
    interpretation: {
      guide:
        "A positive CH₂O (dilute urine, Uosm < Posm) is seen in diabetes insipidus, primary polydipsia, and after water loading. A negative CH₂O (concentrated urine, Uosm > Posm) is seen in SIADH, volume depletion, and dehydration. Because urea contributes to osmolality but not tonicity, CH₂O can mislead in high-urea osmotic diuresis — use electrolyte-free water clearance there.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of polyuria (diabetes insipidus vs polydipsia)",
      "Dysnatremia assessment and water balance",
      "Post-water-load physiology evaluation",
    ],
    whenNotToUse: [
      "In high-urea (osmotic) diuresis, where EFWC is preferable",
      "As a substitute for serum sodium and urine osmolality in isolation",
      "Without concurrent plasma and urine osmolality measurement",
    ],
    limitations: [
      "Urea contributes to urine osmolality but not tonicity, limiting CH₂O in osmotic diuresis.",
      "It is a point estimate that does not account for intake or non-renal losses.",
      "Requires accurate simultaneous osmolality measurements.",
    ],
    example: {
      description:
        "A 30-year-old man with suspected diabetes insipidus has a urine flow of 1.5 mL/min, urine osmolality 80 mOsm/kg, and plasma osmolality 290 mOsm/kg.",
      inputs: {
        urineVolume: "1.5",
        urineOsmolality: "80",
        plasmaOsmolality: "290",
      },
      expectedResult:
        "CH₂O = 1.5 × (1 − 80/290) ≈ 1.09 mL/min. This positive value indicates dilute urine with free water excretion.",
    },
    clinicalSignificance:
      "Free water clearance is a classic renal physiology metric that quantifies whether the kidney is excreting or conserving water, supporting the evaluation of polyuria and dysnatremia.",
    references: [
      {
        citation:
          "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
        level: "Textbook",
      },
      {
        citation:
          "Goldberg M. Hyponatremia. Med Clin North Am. 1981;65(2):251-269.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Water balance decisions require the full clinical picture, including intake, insensible losses, and serum sodium trends.",
  },

  "electrolyte-free-water-clearance": {
    clinicalPurpose:
      "Calculates urinary electrolyte-free water clearance (EFWC) from urine flow and urinary/plasma sodium and potassium to distinguish renal from extrarenal water losses and guide fluid therapy in dysnatremia.",
    howToUse: [
      "Enter urine flow, urine sodium, urine potassium, and plasma sodium from the same urine sample and time point.",
      "Review the EFWC: positive values indicate ongoing renal electrolyte-free water loss.",
      "Account for the ongoing loss when planning water replacement in hypernatremia.",
    ],
    interpretation: {
      guide:
        "An EFWC above 0 indicates ongoing renal electrolyte-free water loss (osmotic diuresis, diuretics, diabetes insipidus, renal failure) that tends to raise serum sodium. Values near zero or negative point to gastrointestinal or insensible losses as the source of hypernatremia. The value estimates the free water that must be replaced to prevent further sodium rise.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Hypernatremia when the source of water loss is unclear",
      "Dysnatremia with osmotic diuresis (glucose, urea, mannitol)",
      "Planning free water replacement rates",
    ],
    whenNotToUse: [
      "As a replacement for serum sodium and clinical volume assessment",
      "When urine sodium and potassium are not measured on the same urine sample as the flow rate",
    ],
    limitations: [
      "Point estimate assuming a steady plasma sodium during the collection.",
      "Does not account for water intake or non-renal losses.",
      "The formula is a classic derivation; newer Edelman-based variants exist.",
    ],
    example: {
      description:
        "A 70-year-old man with hypernatremia during an osmotic diuresis has a urine flow of 1.5 mL/min, urine sodium 80 mmol/L, urine potassium 40 mmol/L, and plasma sodium 140 mmol/L.",
      inputs: {
        urineVolume: "1.5",
        urineSodium: "80",
        urinePotassium: "40",
        plasmaSodium: "140",
      },
      expectedResult:
        "EFWC = 1.5 × (1 − (80 + 40)/140) ≈ 0.21 mL/min. This positive value indicates ongoing renal electrolyte-free water loss.",
    },
    clinicalSignificance:
      "By excluding urea, EFWC reflects the tonicity-relevant water loss and is more accurate than CH₂O in osmotic diuresis, guiding whether hypernatremia is renal in origin and how much free water is being lost.",
    references: [
      {
        citation:
          "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
        level: "Textbook",
      },
      {
        citation:
          "Nguyen MK, Kurtz I. Derivation of a new formula for calculating urinary electrolyte-free water clearance based on the Edelman equation. Am J Physiol Renal Physiol. 2005;288(1):F1-7.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fluid therapy in dysnatremia must account for the full clinical picture and serial laboratory monitoring.",
  },

  "urine-protein-creatinine-ratio": {
    clinicalPurpose:
      "Calculates the urine protein-to-creatinine ratio (UPCR) from a spot urine sample to estimate 24-hour proteinuria for CKD detection, monitoring, and nephrotic range proteinuria screening.",
    howToUse: [
      "Collect a spot (preferably first-morning) urine for protein and creatinine.",
      "Enter urine protein and urine creatinine (both in mg/dL).",
      "Review the ratio; values in mg/mg approximate grams of protein per day.",
    ],
    interpretation: {
      guide:
        "UPCR < 0.15 mg/mg is normal; 0.15–0.5 is mild; 0.5–3.5 is moderate (sub-nephrotic); and ≥ 3.5 mg/mg approximates nephrotic range proteinuria in adults (≥ 3.5 g/day). The ratio corrects for urine concentration. It does not distinguish albumin from non-albumin protein.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Detection and monitoring of proteinuria in CKD",
      "Screening for nephrotic syndrome",
      "When 24-hour urine collection is impractical",
    ],
    whenNotToUse: [
      "When gross hematuria or heavy Bence Jones protein is present (non-albumin protein alters the ratio)",
      "In early diabetic kidney disease, where albuminuria (ACR) is preferred",
      "In pediatric patients, where the nephrotic threshold differs (ratio ≥ 2.0)",
    ],
    limitations: [
      "Does not distinguish albuminuria from other proteinuria.",
      "Less reliable with gross hematuria or extreme urine dilution/concentration.",
      "Approximates but does not exactly equal 24-hour protein in all patients.",
    ],
    example: {
      description:
        "A 58-year-old man with CKD has a spot urine protein of 150 mg/dL and urine creatinine of 100 mg/dL.",
      inputs: {
        urineProtein: "150",
        urineCreatinine: "100",
      },
      expectedResult:
        "UPCR = 150 ÷ 100 = 1.5 mg/mg. This moderate (sub-nephrotic) proteinuria warrants quantification with ACR and repeat measurement.",
    },
    clinicalSignificance:
      "The spot UPCR is a validated, KDIGO-recommended surrogate for 24-hour urinary protein that simplifies the detection and monitoring of proteinuria and identifies nephrotic range disease.",
    references: [
      {
        citation:
          "National Kidney Foundation. KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int Suppl. 2013;3(1):1-150.",
        level: "Guideline",
      },
      {
        citation:
          "Ginsberg JM, et al. Use of single voided urine samples to estimate quantitative proteinuria. N Engl J Med. 1983;309(25):1543-1546.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Proteinuria results must be interpreted with the clinical context and confirmed with repeat testing when abnormal.",
  },

  "creatinine-clearance-24h": {
    clinicalPurpose:
      "Calculates creatinine clearance from a 24-hour urine collection using urine creatinine, serum creatinine, and 24-hour urine volume, providing the classic timed-collection estimate of GFR.",
    howToUse: [
      "Use a complete 24-hour collection; incomplete collection underestimates clearance.",
      "Enter urine creatinine, 24-hour urine volume, and serum creatinine.",
      "Review the CrCl and verify collection completeness against expected daily creatinine excretion.",
    ],
    interpretation: {
      guide:
        "CrCl ≥ 90 mL/min is normal in young adults, 60–89 mildly reduced (CKD G2), 30–59 moderately reduced (CKD G3), 15–29 severely reduced (CKD G4), and < 15 indicates kidney failure (CKD G5). CrCl overestimates true GFR because creatinine is also secreted by tubules, especially at low GFR.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "When a timed collection is feasible and estimating equations are unreliable (extremes of body habitus)",
      "Research protocols requiring measured GFR estimates",
      "Verifying drug-dosing estimates in select patients",
    ],
    whenNotToUse: [
      "When the 24-hour collection is incomplete or serum creatinine is unstable",
      "As a routine replacement for CKD-EPI or Cockcroft-Gault in drug dosing",
      "In acute kidney injury with rapidly changing renal function",
    ],
    limitations: [
      "Collection errors are common and underestimated clearance.",
      "Overestimates true GFR due to tubular creatinine secretion.",
      "Serum creatinine must be stable during the collection.",
    ],
    example: {
      description:
        "A 55-year-old man undergoing renal evaluation has a 24-hour urine creatinine of 80 mg/dL in a volume of 1800 mL, with a serum creatinine of 1.0 mg/dL.",
      inputs: {
        urineCreatinine: "80",
        urineVolume: "1800",
        serumCreatinine: "1.0",
      },
      expectedResult:
        "CrCl = (80 × 1800) ÷ (1.0 × 1440) = 100 mL/min. This is a normal creatinine clearance.",
    },
    clinicalSignificance:
      "The timed 24-hour creatinine clearance remains the classical bedside GFR estimate and a benchmark against which estimating equations are validated, though it requires careful collection.",
    references: [
      {
        citation:
          "Levey AS, et al. Expressing the Modification of Diet in Renal Disease Study equation for estimating glomerular filtration rate with standardized serum creatinine values. Clin Chem. 2007;53(4):766-772.",
        level: "Validation Study",
      },
      {
        citation:
          "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Collection completeness and clinical context are essential when interpreting creatinine clearance.",
  },

  "total-cholesterol-hdl-ratio": {
    clinicalPurpose:
      "Calculates the total cholesterol to HDL ratio (TC/HDL), a simple lipid-based indicator of cardiovascular risk that compares total cholesterol with the protective HDL fraction.",
    howToUse: [
      "Use a fasting lipid panel for consistency.",
      "Enter total cholesterol and HDL cholesterol (both in mg/dL).",
      "Review the ratio and its risk category.",
      "Interpret together with LDL, non-HDL cholesterol, and a global risk score.",
    ],
    interpretation: {
      guide:
        "A TC/HDL ratio below 4 is desirable, 4–5 is moderate, and above 5 is elevated and associated with higher cardiovascular risk. Values near 3.5 or lower are associated with lower risk in epidemiological cohorts. The ratio is a risk marker, not a treatment target.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Cardiovascular risk screening in primary prevention",
      "Patient education about lipid profile balance",
      "Quick bedside risk communication",
    ],
    whenNotToUse: [
      "As the sole basis for statin initiation — use validated risk scores",
      "In acute illness or with non-fasting samples without adjustment",
      "As a replacement for LDL or non-HDL cholesterol in treatment decisions",
    ],
    limitations: [
      "Does not replace LDL or non-HDL cholesterol in most modern guidelines.",
      "Non-fasting samples and acute illness can alter triglycerides and the ratio.",
      "Healthy women typically have a lower ratio than men of the same age.",
    ],
    example: {
      description:
        "A 48-year-old man has a total cholesterol of 180 mg/dL and HDL of 60 mg/dL.",
      inputs: {
        totalCholesterol: "180",
        hdlCholesterol: "60",
      },
      expectedResult:
        "TC/HDL = 180 ÷ 60 = 3.0. This value below 4 is desirable and associated with lower cardiovascular risk.",
    },
    clinicalSignificance:
      "The TC/HDL ratio summarizes the balance of atherogenic total cholesterol and protective HDL and has been used for decades in cardiovascular epidemiology (e.g., PROCAM, Framingham) as a simple risk indicator.",
    references: [
      {
        citation:
          "Stampfer MJ, et al. A prospective study of cholesterol, apolipoproteins, and the risk of myocardial infarction. N Engl J Med. 1991;325(6):373-381.",
        level: "Validation Study",
      },
      {
        citation:
          "Assmann G, et al. The role of HDL cholesterol in the metabolic syndrome. Atheroscler Suppl. 2002;3(4):35-41.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TC/HDL ratio should be interpreted within the framework of a complete cardiovascular risk assessment.",
  },

  "atherogenic-index-of-plasma": {
    clinicalPurpose:
      "Calculates the atherogenic index of plasma (AIP), the logarithmically transformed ratio of triglycerides to HDL cholesterol, reflecting the balance of atherogenic and protective lipoproteins.",
    howToUse: [
      "Use fasting triglycerides and HDL cholesterol measured on the same sample.",
      "Enter both values (any consistent unit, as the ratio is unit-independent).",
      "Review the AIP against the Dobiásová risk categories.",
    ],
    interpretation: {
      guide:
        "An AIP below 0.11 indicates low atherogenic risk, 0.11–0.21 intermediate risk, and above 0.21 high risk in the Dobiásová classification. Higher AIP correlates with smaller, denser LDL particles and increased cardiovascular risk. Cutoffs derive from the original research literature and are not a universal clinical standard.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Dyslipidemia and insulin resistance assessment",
      "Cardiovascular risk evaluation when apolipoproteins are unavailable",
      "Research applications of lipoprotein phenotype",
    ],
    whenNotToUse: [
      "As the sole basis for treatment decisions",
      "With non-fasting samples without accounting for triglyceride elevation",
      "As a replacement for LDL, non-HDL cholesterol, and global risk scores",
    ],
    limitations: [
      "The 0.11/0.21 cutoffs derive from the original Dobiásová work and are not universally standardized.",
      "Non-fasting samples and high dietary fat inflate triglycerides and raise AIP.",
      "Adjunct marker only; not a treatment target.",
    ],
    example: {
      description:
        "A 50-year-old woman has fasting triglycerides of 100 mg/dL and HDL of 80 mg/dL.",
      inputs: {
        triglycerides: "100",
        hdlCholesterol: "80",
      },
      expectedResult:
        "AIP = log10(100/80) = log10(1.25) ≈ 0.10. This value below 0.11 indicates low atherogenic risk.",
    },
    clinicalSignificance:
      "The AIP (log10 TG/HDL) is a validated marker of the triglyceride–HDL axis that correlates with LDL particle size, providing a simple, accessible proxy for atherogenic dyslipidemia.",
    references: [
      {
        citation:
          "Dobiásová M, Frohlich J. The plasma parameter log (TG/HDL-C) as an atherogenic index: correlation with lipoprotein particle size and esterification rate in apoB-lipoprotein-depleted plasma (FERHDL). Clin Biochem. 2001;34(7):583-588.",
        level: "Original Description",
      },
      {
        citation:
          "Dobiásová M. Atherogenic index of plasma [log(triglycerides/HDL-cholesterol)]: theoretical and practical implications. Clin Chem. 2004;50(7):1113-1115.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The AIP should be used as an adjunct to, not a substitute for, comprehensive lipid and cardiovascular risk assessment.",
  },

  "apob-apoa1-ratio": {
    clinicalPurpose:
      "Calculates the apolipoprotein B to apolipoprotein A1 ratio (ApoB:ApoA1), an index of the balance between atherogenic and anti-atherogenic lipoproteins used in cardiovascular risk assessment.",
    howToUse: [
      "Enter ApoB and ApoA1 in the same units (typically g/L).",
      "Select the patient's sex for the appropriate reference threshold.",
      "Review the ratio against the sex-specific reference range.",
    ],
    interpretation: {
      guide:
        "The typical reference range is 0.30–1.00 in men and 0.30–0.80 in women. A ratio above 1.0 (men) or 0.8 (women) is elevated and associated with higher cardiovascular risk. Thresholds are population conventions; use the performing laboratory's reference interval when available.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Cardiovascular risk assessment with apolipoprotein measurements",
      "When LDL particle number (ApoB) is preferred over LDL cholesterol",
      "Monitoring response to lipid-lowering therapy",
    ],
    whenNotToUse: [
      "As the sole basis for statin decisions — apply validated risk scores",
      "When ApoB and ApoA1 are measured in inconsistent units",
      "In settings where the laboratory reference interval is unknown",
    ],
    limitations: [
      "The 1.0/0.8 thresholds are population reference conventions, not guideline treatment targets.",
      "Ratios vary by assay, ethnicity, and age.",
      "Does not replace validated global cardiovascular risk scoring.",
    ],
    example: {
      description:
        "A 45-year-old man has an ApoB of 1.0 g/L and an ApoA1 of 1.4 g/L.",
      inputs: {
        apoB: "1.0",
        apoA1: "1.4",
        sex: "male",
      },
      expectedResult:
        "ApoB:ApoA1 = 1.0 ÷ 1.4 ≈ 0.71. This value is within the male reference range (0.30–1.00).",
    },
    clinicalSignificance:
      "ApoB counts the number of atherogenic particles while ApoA1 reflects the protective HDL fraction, making their ratio a strong cardiovascular risk marker studied in large cohorts such as AMORIS and INTERHEART.",
    references: [
      {
        citation:
          "Walldius G, Jungner I. The apoB/apoA-I ratio: a strong, new risk factor for cardiovascular disease and a target for lipid-lowering therapy — a review of the evidence. J Intern Med. 2006;259(5):493-519.",
        level: "Expert Review",
      },
      {
        citation:
          "Yusuf S, et al. Effect of potentially modifiable risk factors associated with myocardial infarction in 52 countries (INTERHEART). Lancet. 2004;364(9438):937-952.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use the performing laboratory's reference interval and incorporate the ratio into a complete cardiovascular risk assessment.",
  },

  "respiratory-compensation": {
    clinicalPurpose:
      "Estimates the expected serum bicarbonate during acute or chronic respiratory acidosis and alkalosis using the Winters/Merck compensation rules, to identify appropriate compensation or a mixed acid–base disorder.",
    howToUse: [
      "Select the disorder type (acute/chronic, acidosis/alkalosis).",
      "Enter the arterial PaCO₂ and the measured serum bicarbonate.",
      "Compare the measured bicarbonate to the expected range.",
      "If the measured bicarbonate deviates more than ~2 mEq/L, evaluate for a coexisting metabolic disorder.",
    ],
    interpretation: {
      guide:
        "Expected HCO₃ = 24 + k × (PaCO₂ − 40)/10, with k = 1 (acute respiratory acidosis), 4 (chronic), −2 (acute respiratory alkalosis), and −5 (chronic). The measured bicarbonate should be within about ±2 mEq/L of the expected value; larger deviations suggest a mixed acid–base disorder.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Interpreting blood gases in known respiratory acid-base disorders",
      "Detecting mixed acid–base disorders",
      "Teaching classic compensation rules",
    ],
    whenNotToUse: [
      "Within the first few hours of a respiratory change, before steady-state compensation",
      "As a replacement for a full acid–base analysis (anion gap, delta ratio)",
      "Without reliable PaCO₂ and bicarbonate measurements",
    ],
    limitations: [
      "Compensation rules are approximations; early changes may be lower than steady-state predictions.",
      "Chronic respiratory acidosis is defined by duration (> 3–5 days) as well as the gas pattern.",
      "A discordant bicarbonate requires a full acid–base workup to characterize the mixed disorder.",
    ],
    example: {
      description:
        "A 65-year-old man with acute hypercapnic respiratory failure has a PaCO₂ of 50 mmHg and a measured bicarbonate of 25 mEq/L.",
      inputs: {
        disorderType: "acuteRespAcidosis",
        paCO2: "50",
        measuredBicarbonate: "25",
      },
      expectedResult:
        "Expected HCO₃ = 24 + 1 × (50 − 40)/10 = 25 mEq/L. The measured value (25) is within ±2 mEq/L — appropriate acute respiratory compensation.",
    },
    clinicalSignificance:
      "Compensation rules quantify the normal metabolic response to chronic PaCO₂ alterations. Deviations beyond the expected range unmask mixed acid–base disorders that would otherwise be overlooked.",
    references: [
      {
        citation:
          "Merck Manual Professional Version. Respiratory Acidosis and Respiratory Alkalosis. www.merckmanuals.com.",
        level: "Expert Review",
      },
      {
        citation:
          "Brewer ED. Disorders of acid-base balance. Pediatr Clin North Am. 1990;37(2):429-447.",
        level: "Expert Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid–base interpretation requires the full clinical picture, including electrolytes, albumin, and the anion gap.",
  },

  "metabolic-alkalosis-compensation": {
    clinicalPurpose:
      "Calculates the expected arterial PaCO₂ in metabolic alkalosis (PaCO₂ ≈ 40 + 0.6 × (HCO₃ − 24)) to assess whether respiratory compensation is appropriate or a concurrent respiratory disorder is present.",
    howToUse: [
      "Confirm the patient has metabolic alkalosis (elevated HCO₃ with alkalemia).",
      "Enter the serum bicarbonate and the measured arterial PaCO₂.",
      "Compare the measured PaCO₂ to the expected value (within ~5 mmHg).",
    ],
    interpretation: {
      guide:
        "Expected PaCO₂ = 40 + 0.6 × (HCO₃ − 24), capped near 55 mmHg. The measured PaCO₂ should be within about 5 mmHg of the expected value. A value well below expected suggests a concurrent respiratory alkalosis; well above suggests a concurrent respiratory acidosis or a blunted ventilatory response.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluating respiratory compensation in metabolic alkalosis",
      "Detecting mixed acid–base disorders in alkalemia",
      "Assessing ventilatory response in chloride-depletion alkalosis",
    ],
    whenNotToUse: [
      "In metabolic acidosis (HCO₃ ≤ 24 mEq/L)",
      "In mechanically ventilated patients with fixed ventilation",
      "At extreme bicarbonate values where the cap (~55 mmHg) flattens the relationship",
    ],
    limitations: [
      "Requires HCO₃ > 24 mEq/L; not applicable to metabolic acidosis.",
      "The linear rule flattens near the 55 mmHg compensation ceiling.",
      "COPD or sedating medications can blunt the expected ventilatory response.",
    ],
    example: {
      description:
        "A 50-year-old woman with vomiting-related metabolic alkalosis has a bicarbonate of 40 mEq/L and a measured PaCO₂ of 50 mmHg.",
      inputs: {
        bicarbonate: "40",
        measuredPaCO2: "50",
      },
      expectedResult:
        "Expected PaCO₂ = 40 + 0.6 × (40 − 24) = 49.6 mmHg. The measured value (50) is within ±5 mmHg — appropriate respiratory compensation.",
    },
    clinicalSignificance:
      "Metabolic alkalosis is compensated by hypoventilation, raising PaCO₂ by roughly 0.6 mmHg per 1 mEq/L rise in bicarbonate up to a ceiling near 55 mmHg. The expected-PaCO₂ comparison detects inappropriate ventilation and mixed disorders.",
    references: [
      {
        citation:
          "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
        level: "Textbook chapter",
      },
      {
        citation:
          "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
        level: "Textbook",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid–base interpretation requires the full clinical picture and should guide, not replace, clinical judgment.",
  },

  "free-thyroxine-index": {
    clinicalPurpose:
      "Calculates the free thyroxine index (FTI or T7) from total T4 and the T3 resin uptake, an indirect estimate of free thyroid hormone used when direct free T4 assays are unavailable or binding-protein status is in question.",
    howToUse: [
      "Use total T4 and T3 resin uptake (or thyroid hormone-binding ratio) measured on the same sample.",
      "Enter both values.",
      "Review the FTI against the laboratory's reference interval and interpret with TSH and clinical status.",
    ],
    interpretation: {
      guide:
        "The typical adult reference range is approximately 1.0–4.5, though this is assay- and laboratory-specific. FTI below 1.0 is low (hypothyroidism pattern), and above 4.5 is high (hyperthyroidism pattern). The index corrects total T4 for changes in thyroid hormone-binding proteins but is largely superseded by direct free T4 assays where available.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "When direct free T4 is not available",
      "When abnormal thyroid hormone-binding proteins confound total T4 (pregnancy, estrogens, illness)",
      "Historical interpretation of thyroid function panels",
    ],
    whenNotToUse: [
      "When a direct free T4 assay is available",
      "As a replacement for TSH in thyroid function assessment",
      "Without accounting for the performing laboratory's reference interval",
    ],
    limitations: [
      "The 1.0–4.5 reference is assay- and laboratory-specific.",
      "Drugs (salicylates, phenytoin, heparin) and illness alter binding proteins and the index.",
      "Largely superseded by direct free T4 assays in modern laboratories.",
    ],
    example: {
      description:
        "A 40-year-old woman on oral estrogen has a total T4 of 8 µg/dL and a T3 resin uptake of 30%.",
      inputs: {
        totalT4: "8",
        t3Uptake: "30",
      },
      expectedResult:
        "FTI = 8 × 30/100 = 2.4. This value is within the typical adult reference range (1.0–4.5).",
    },
    clinicalSignificance:
      "The free thyroxine index was a long-standing standard for estimating free hormone when direct assays were unavailable, correcting total T4 for binding-protein variation in pregnancy, estrogen therapy, and systemic illness.",
    references: [
      {
        citation:
          "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum. www.mayocliniclabs.com.",
        level: "Laboratory Reference",
      },
      {
        citation:
          "Surks MI, et al. American Thyroid Association guidelines for use of laboratory tests in thyroid disorders. JAMA. 1990;263(11):1529-1532.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use the performing laboratory's reference interval and interpret the FTI together with TSH and clinical status.",
  },

  "metabolic-syndrome-atp3": {
    clinicalPurpose:
      "Assesses metabolic syndrome using the updated NCEP ATP III criteria, requiring at least 3 of 5 components: elevated waist circumference, elevated triglycerides (or treatment), reduced HDL (or treatment), elevated blood pressure (or treatment), and elevated fasting glucose (or treatment).",
    howToUse: [
      "Select sex and enter waist circumference, triglycerides, HDL, systolic and diastolic blood pressure, and fasting glucose.",
      "Answer whether the patient is on drug treatment for dyslipidemia, hypertension, or elevated glucose.",
      "Review the number of criteria met (≥ 3 = metabolic syndrome).",
    ],
    interpretation: {
      guide:
        "Metabolic syndrome is present when at least 3 of 5 ATP III criteria are met: waist ≥ 102 cm (men) or ≥ 88 cm (women); triglycerides ≥ 150 mg/dL or drug treatment; HDL < 40 mg/dL (men) or < 50 mg/dL (women) or drug treatment; blood pressure ≥ 130/85 mmHg or drug treatment; fasting glucose ≥ 100 mg/dL or drug treatment. This calculator uses the classic 102/88 cm waist cutoffs.",
      sexSpecific: true,
      ageSpecific: false,
    },
    whenToUse: [
      "Cardiometabolic risk clustering assessment",
      "Screening for insulin resistance-related conditions",
      "Guidance for lifestyle intervention and follow-up screening",
    ],
    whenNotToUse: [
      "As a substitute for formal 10-year cardiovascular risk scoring",
      "As a diagnostic test for diabetes, hypertension, or dyslipidemia individually",
      "In populations where ethnic-specific waist thresholds (e.g., Asian 90/80 cm) are more appropriate",
    ],
    limitations: [
      "Waist thresholds differ by population (e.g., Asian cutoffs); this calculator uses the classic ATP III values.",
      "Treatment exemptions vary among guidelines (ATP III vs IDF vs harmonized).",
      "Clusters risk factors but does not quantify 10-year cardiovascular risk.",
    ],
    example: {
      description:
        "A 50-year-old woman has a waist of 90 cm, triglycerides 160 mg/dL, HDL 45 mg/dL, blood pressure 135/85 mmHg, and fasting glucose 110 mg/dL, on no relevant drug treatment.",
      inputs: {
        sex: "female",
        waist: "90",
        triglycerides: "160",
        hdl: "45",
        sbp: "135",
        dbp: "85",
        fastingGlucose: "110",
        lipidRx: "no",
        bpRx: "no",
        glucoseRx: "no",
      },
      expectedResult:
        "All 5 ATP III criteria are met (waist, triglycerides, HDL, blood pressure, and fasting glucose), so metabolic syndrome is present.",
    },
    clinicalSignificance:
      "Metabolic syndrome identifies patients with clustered cardiometabolic risk factors who warrant aggressive lifestyle modification and screening for diabetes, hypertension, and cardiovascular disease.",
    references: [
      {
        citation:
          "Grundy SM, et al. Diagnosis and management of the metabolic syndrome: an American Heart Association/National Heart, Lung, and Blood Institute scientific statement. Circulation. 2005;112(17):2735-2752.",
        level: "Guideline",
      },
      {
        citation:
          "Alberti KG, et al. Harmonizing the metabolic syndrome: a joint interim statement of the IDF Task Force on Epidemiology and Prevention; NHLBI; AHA; WHF; IAS; IASO. Circulation. 2009;120(16):1640-1645.",
        level: "Expert Consensus",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Metabolic syndrome assessment should be combined with global cardiovascular risk scoring and clinical judgment.",
  },

  "bishop-score": {
    clinicalPurpose:
      "Scores cervical readiness for induction of labor (Bishop 1964) using dilatation, effacement, station, consistency, and position, summing to a total of 0–13 to predict the likelihood of successful induction and vaginal delivery.",
    howToUse: [
      "Perform a sterile cervical examination and record each of the five components at the same examination.",
      "Select the score for each component (dilatation 0–3, effacement 0–3, station 0–3, consistency 0–2, position 0–2).",
      "Review the total score and its interpretation (favorable ≥ 8; modified-favorable ≥ 6).",
    ],
    interpretation: {
      guide:
        "A total of 8 or higher is traditionally considered favorable for induction; a modified Bishop score of 6 or higher is used in many current protocols. Scores of 0–5 indicate an unfavorable cervix, for which cervical ripening (pharmacologic or mechanical) is typically recommended before oxytocin.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Pre-induction assessment to plan the induction method",
      "Predicting the likelihood of successful labor induction",
      "Documenting cervical status in the obstetric record",
    ],
    whenNotToUse: [
      "As a substitute for fetal or maternal indications when deciding whether to induce",
      "In the absence of a clinical indication for induction",
      "To predict the course of spontaneous labor in women not being induced",
    ],
    limitations: [
      "The score is examiner-dependent and inter-observer variability is real.",
      "Parity, gestational age, and prior vaginal delivery also influence induction success.",
      "A single value is less informative than serial assessments.",
    ],
    example: {
      description:
        "A primigravid woman at 41 weeks undergoes a pre-induction cervical exam: dilatation 2 cm (2), effacement 70% (2), station −1 (2), soft consistency (1), anterior position (1).",
      inputs: {
        dilation: "2",
        effacement: "2",
        station: "2",
        consistency: "1",
        position: "1",
      },
      expectedResult:
        "Bishop score 8/13 — favorable cervix; a high likelihood of successful induction and vaginal delivery.",
    },
    clinicalSignificance:
      "The Bishop score is the most widely used bedside assessment of cervical favorability for induction, guiding the choice between direct oxytocin and cervical ripening and informing counseling about induction success.",
    references: [
      {
        citation:
          "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
        level: "Original Description",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Induction decisions require the full clinical picture, including maternal and fetal indications, and should guide — not replace — clinical judgment.",
  },

  "biophysical-profile": {
    clinicalPurpose:
      "Scores fetal well-being using the biophysical profile (Manning 1980): fetal breathing, gross body movement, fetal tone, amniotic fluid volume, and the non-stress test, each scored 0 or 2 for a total of 0–10.",
    howToUse: [
      "Perform a 30-minute ultrasound observation of fetal breathing, movement, tone, and amniotic fluid.",
      "Record the non-stress test result during the same session.",
      "Score each component 2 (normal) or 0 (absent/abnormal) and review the total.",
    ],
    interpretation: {
      guide:
        "A score of 8–10 is reassuring; 6 is equivocal and is typically repeated within 24 hours; a score of 4 or less is abnormal and warrants obstetric evaluation and delivery planning. Reduced amniotic fluid indicates chronic compromise, while the other components reflect acute fetal status.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Antepartum fetal surveillance in high-risk pregnancies",
      "Decreased fetal movement evaluation",
      "Post-term and growth-restriction monitoring",
    ],
    whenNotToUse: [
      "As the sole test in acute fetal distress (continuous fetal monitoring is indicated)",
      "In place of gestational age-appropriate management for previable or post-term pregnancies without obstetric input",
    ],
    limitations: [
      "Operator-dependent and time-consuming (30-minute observation window).",
      "The NST component requires separate equipment and interpretation.",
      "Equivocal scores require clinical correlation and repeat testing.",
    ],
    example: {
      description:
        "A 36-week fetus with decreased movement shows: normal breathing (2), normal movement (2), normal tone (2), reduced amniotic fluid with SDP < 2 cm (0), and a reactive NST (2).",
      inputs: {
        breathing: "2",
        movement: "2",
        tone: "2",
        amnioticFluid: "0",
        nst: "2",
      },
      expectedResult:
        "BPP 8/10 — normal, reassuring fetal status; the isolated reduced amniotic fluid warrants further evaluation for the underlying cause.",
    },
    clinicalSignificance:
      "The BPP integrates acute markers of fetal oxygenation (breathing, movement, tone, NST) with a chronic marker (amniotic fluid), providing a structured, validated antepartum surveillance tool for high-risk pregnancies.",
    references: [
      {
        citation:
          "Manning FA, et al. Fetal biophysical profile scoring: a prospective study in 1,184 high-risk patients. Am J Obstet Gynecol. 1981;140(3):289-294.",
        level: "Original Description",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 145: Antepartum fetal surveillance. Obstet Gynecol. 2014;124(1):182-201.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fetal well-being assessment must be interpreted with the full clinical context by the managing obstetric provider.",
  },

  "hellp-syndrome": {
    clinicalPurpose:
      "Assesses the HELLP syndrome using the Tennessee (Sibai) criteria: hemolysis (LDH ≥ 600 U/L or schistocytes/low haptoglobin), elevated liver enzymes (AST ≥ 70 U/L), and low platelets (< 100,000/µL); complete HELLP requires all three.",
    howToUse: [
      "Enter the platelet count, AST, and LDH from the same blood draw.",
      "Indicate whether peripheral smear schistocytes or low haptoglobin (hemolysis evidence) are present.",
      "Review whether complete HELLP (3 criteria), partial HELLP (1–2 criteria), or no criteria are met.",
    ],
    interpretation: {
      guide:
        "Complete HELLP requires all three Tennessee criteria (hemolysis, AST ≥ 70 U/L, platelets < 100,000/µL). Patients meeting only some criteria are classified as partial/atypical HELLP and are managed with the same vigilance because of the risk of rapid progression.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Preeclampsia with epigastric/RUQ pain, headache, or visual symptoms",
      "Unexplained thrombocytopenia and transaminitis in pregnancy or postpartum",
      "Evaluation of suspected hypertensive disorders of pregnancy with severe features",
    ],
    whenNotToUse: [
      "As a substitute for blood pressure and urine protein assessment",
      "To exclude other causes of thrombocytopenia or liver dysfunction (thrombotic microangiopathy, hepatitis, fatty liver of pregnancy)",
    ],
    limitations: [
      "HELLP may occur without significant hypertension or proteinuria.",
      "The Tennessee criteria are one of several classification systems (Mississippi differs in severity grading).",
      "Diagnosis requires clinical correlation; laboratory values can change rapidly.",
    ],
    example: {
      description:
        "A 32-week patient with preeclampsia and RUQ pain has platelets 95 ×10³/µL, AST 85 U/L, LDH 550 U/L, and schistocytes on the peripheral smear.",
      inputs: {
        platelets: "95",
        ast: "85",
        ldh: "550",
        hemolysis: "yes",
      },
      expectedResult:
        "Complete HELLP syndrome — all three Tennessee criteria are met (hemolysis via smear evidence, AST ≥ 70, platelets < 100). Urgent delivery and multidisciplinary management are indicated.",
    },
    clinicalSignificance:
      "HELLP syndrome is a severe, rapidly progressive hypertensive disorder of pregnancy associated with maternal mortality from hepatic rupture, DIC, renal failure, and eclampsia; prompt recognition is life-saving.",
    references: [
      {
        citation:
          "Sibai BM, et al. Maternal morbidity and mortality in 442 pregnancies with hemolysis, elevated liver enzymes, and low platelets (HELLP syndrome). Am J Obstet Gynecol. 1993;169(4):1000-1006.",
        level: "Guideline / Original Description",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. HELLP syndrome is a clinical emergency; laboratory-based scoring supplements, but does not replace, urgent clinical judgment.",
  },

  "hadlock-efw": {
    clinicalPurpose:
      "Estimates fetal weight from the Hadlock four-parameter model (1985) using biparietal diameter, head circumference, abdominal circumference, and femur length, output as estimated fetal weight in grams.",
    howToUse: [
      "Obtain BPD, HC, AC, and FL from a standard fetal ultrasound biometric assessment.",
      "Enter each measurement in centimeters.",
      "Review the estimated fetal weight and its ± 1 SD (≈ 7.5%) error band.",
    ],
    interpretation: {
      guide:
        "The formula returns an estimated fetal weight with an error of approximately ± 7.5% (1 SD). Compare the result with gestational-age growth charts; an EFW below the 10th percentile suggests growth restriction, and above the 90th percentile suggests macrosomia, but serial measurements are far more reliable than a single value.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Suspected fetal growth restriction or macrosomia",
      "Gestational age dating when ultrasound biometry is performed",
      "Serial growth assessment in high-risk pregnancies",
    ],
    whenNotToUse: [
      "As an exact birth-weight predictor (all formulas carry substantial error)",
      "As a substitute for antenatal fetal surveillance when fetal status is in question",
    ],
    limitations: [
      "1 SD error ≈ 7.5% (± ~250 g near term) — treat the value as an estimate, not a measurement.",
      "Accuracy declines at the extremes of fetal size and in late gestation.",
      "Operator-dependent measurements propagate into the EFW.",
    ],
    example: {
      description:
        "A 34-week ultrasound shows BPD 9.4 cm, HC 33.0 cm, AC 32.5 cm, and FL 7.0 cm.",
      inputs: {
        bpd: "9.4",
        hc: "33.0",
        ac: "32.5",
        fl: "7.0",
      },
      expectedResult:
        "Estimated fetal weight 2,985 g (≈ 6.6 lb), ± 1 SD ≈ ± 224 g (7.5%).",
    },
    clinicalSignificance:
      "The Hadlock four-parameter formula is a widely used, externally validated method for estimating fetal weight from routine ultrasound biometry, supporting the diagnosis of growth restriction and macrosomia and informing delivery planning.",
    references: [
      {
        citation:
          "Hadlock FP, et al. Estimation of fetal weight with the use of head, body, and femur measurements — a prospective study. Am J Obstet Gynecol. 1985;151(3):333-337.",
        level: "Original Description",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 227: Fetal growth restriction. Obstet Gynecol. 2021;137(2):e16-e28.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Estimated fetal weight is inherently imprecise and must be interpreted with gestational age, growth trends, and clinical judgment.",
  },

  "preeclampsia-criteria": {
    clinicalPurpose:
      "Assesses the ACOG (2020) diagnostic criteria for preeclampsia — new-onset hypertension after 20 weeks with proteinuria or end-organ dysfunction — and counts the number of severe features present to guide management and delivery timing.",
    howToUse: [
      "Enter the systolic and diastolic blood pressures and indicate whether significant proteinuria is present.",
      "Enter platelets, creatinine, and answer whether transaminases are ≥ 2× ULN, RUQ/epigastric pain, pulmonary edema, new headache, or visual symptoms are present.",
      "Review whether preeclampsia criteria are met and the count of severe features.",
    ],
    interpretation: {
      guide:
        "Preeclampsia requires hypertension (≥ 140/90 after 20 weeks) plus proteinuria (≥ 300 mg/24 h, PCR ≥ 0.3, dipstick ≥ 2+) or, without proteinuria, any end-organ feature. Severe features — SBP ≥ 160 or DBP ≥ 110, platelets < 100,000, creatinine > 1.1, transaminases ≥ 2× ULN, pulmonary edema, new headache, or visual symptoms — warrant inpatient care and delivery planning.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Evaluation of new-onset hypertension in pregnancy after 20 weeks",
      "Diagnosis and severity classification of preeclampsia",
      "Delivery-timing decisions in hypertensive disorders of pregnancy",
    ],
    whenNotToUse: [
      "For gestational hypertension without proteinuria or end-organ dysfunction (use clinical judgment for monitoring)",
      "As a substitute for chronic hypertension or proteinuric renal disease evaluation before 20 weeks",
    ],
    limitations: [
      "Diagnosis requires hypertension after 20 weeks in a woman with previously normal blood pressure — this calculator assumes such a context.",
      "Severe features must be confirmed on repeat readings and correlated clinically.",
      "Eclampsia can occur without meeting all severe-feature criteria.",
    ],
    example: {
      description:
        "A 31-week patient has BP 150/95 mmHg, 2+ proteinuria on dipstick, platelets 150 ×10³/µL, and creatinine 0.9 mg/dL, with no other severe features.",
      inputs: {
        sbp: "150",
        dbp: "95",
        proteinuria: "yes",
        platelets: "150",
        creatinine: "0.9",
        transaminases: "no",
        ruqPain: "no",
        pulmonaryEdema: "no",
        headache: "no",
        visual: "no",
      },
      expectedResult:
        "Preeclampsia without severe features (0 severe features) — manage with maternal and fetal surveillance; delivery typically planned at 37 weeks.",
    },
    clinicalSignificance:
      "Standardized ACOG criteria for preeclampsia and its severe features drive critical decisions about inpatient management, magnesium sulfate seizure prophylaxis, antihypertensive therapy, and delivery timing, reducing maternal and perinatal morbidity.",
    references: [
      {
        citation:
          "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Preeclampsia diagnosis and management require complete clinical assessment; treat severe hypertension promptly regardless of the calculated feature count.",
  },

  "gestational-weight-gain": {
    clinicalPurpose:
      "Provides the IOM/NRC 2009 recommended total gestational weight gain and second/third-trimester weekly rate based on pre-pregnancy BMI (underweight < 18.5, normal 18.5–24.9, overweight 25–29.9, obese ≥ 30).",
    howToUse: [
      "Enter the pre-pregnancy BMI (from pre-pregnancy or first-visit weight and height).",
      "Review the recommended total gain range and 2nd/3rd-trimester rate for the BMI category.",
      "Track serial weight gain against the range at each prenatal visit.",
    ],
    interpretation: {
      guide:
        "IOM 2009 recommends total gains of 28–40 lb (underweight), 25–35 lb (normal), 15–25 lb (overweight), and 11–20 lb (obese), with 2nd/3rd-trimester rates of 1.0–1.3, 0.8–1.0, 0.5–0.7, and 0.4–0.6 lb/week respectively.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Routine prenatal counseling on weight gain",
      "Assessment of women at risk for excessive or inadequate gestational weight gain",
      "Screening for obesity-related pregnancy complications",
    ],
    whenNotToUse: [
      "For twin or higher-order multiple gestations (separate IOM ranges apply)",
      "As a substitute for individualized nutrition counseling in women with eating disorders or severe obesity",
    ],
    limitations: [
      "IOM ranges target singleton pregnancies in the general population.",
      "Recalled pre-pregnancy weight is less accurate than a measured value.",
      "The calculator returns the midpoint of the recommended range, not an individual target.",
    ],
    example: {
      description:
        "A woman with a pre-pregnancy BMI of 26 kg/m² (overweight) asks how much weight she should gain.",
      inputs: {
        bmi: "26",
      },
      expectedResult:
        "Recommended total gestational weight gain 15–25 lb (midpoint ~20 lb), at a 2nd/3rd-trimester rate of 0.5–0.7 lb/week.",
    },
    clinicalSignificance:
      "Appropriate gestational weight gain is associated with reduced risks of macrosomia, cesarean delivery, postpartum weight retention, and adverse neonatal outcomes; IOM targets guide routine prenatal counseling.",
    references: [
      {
        citation:
          "Institute of Medicine and National Research Council. Weight Gain During Pregnancy: Reexamining the Guidelines. The National Academies Press; 2009.",
        level: "Guideline",
      },
      {
        citation:
          "ACOG Committee Opinion No. 548: Weight gain during pregnancy. Obstet Gynecol. 2013;121(1):210-212.",
        level: "Committee Opinion",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Weight-gain recommendations should be individualized and integrated with nutrition counseling and clinical judgment.",
  },

  "magnesium-sulfate-preeclampsia": {
    clinicalPurpose:
      "Calculates the total 24-hour magnesium sulfate dose for seizure prophylaxis in preeclampsia with severe features or eclampsia from the IV loading dose (4–6 g) and maintenance infusion rate (1–2 g/h) per ACOG (2020).",
    howToUse: [
      "Select the planned IV loading dose (4–6 g over 20–30 minutes).",
      "Select the maintenance infusion rate (1–2 g/h, commonly 2 g/h).",
      "Review the total 24-hour dose and monitoring guidance.",
    ],
    interpretation: {
      guide:
        "The total 24-hour dose equals the loading dose plus 24 × the maintenance rate (e.g., 4 g + 2 g/h = 52 g). The therapeutic serum magnesium range is 4.8–8.4 mg/dL; loss of patellar reflexes occurs near 10 mg/dL and respiratory depression near 12 mg/dL, treated with IV calcium gluconate.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Seizure prophylaxis in preeclampsia with severe features",
      "Treatment of eclampsia",
      "Standard 24-hour postpartum magnesium protocols",
    ],
    whenNotToUse: [
      "Without an obstetric indication for magnesium therapy",
      "In the presence of significant renal impairment without dose adjustment and monitoring",
      "As a substitute for antihypertensive therapy in severe hypertension",
    ],
    limitations: [
      "Doses must be individualized, especially in renal impairment, oliguria, and extremes of body weight.",
      "This calculator computes a regimen total; it does not account for infusion duration beyond 24 hours or pharmacokinetic factors.",
      "Serum monitoring and clinical examination for toxicity remain essential.",
    ],
    example: {
      description:
        "A patient with preeclampsia with severe features is started on the standard ACOG regimen: 4 g IV loading dose and a 2 g/h maintenance infusion.",
      inputs: {
        loadingDose: "4",
        maintenance: "2",
      },
      expectedResult:
        "Total 24-hour magnesium sulfate dose 52 g (4 g load + 2 g/h × 24 h); therapeutic serum magnesium 4.8–8.4 mg/dL.",
    },
    clinicalSignificance:
      "Magnesium sulfate remains the standard of care for seizure prophylaxis in preeclampsia with severe features and for eclampsia, substantially reducing the risk of eclamptic seizures and associated mortality.",
    references: [
      {
        citation:
          "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
        level: "Guideline",
      },
      {
        citation:
          "Zuspan FP. Treatment of severe preeclampsia and eclampsia. Clin Obstet Gynecol. 1966;9(4):954-972.",
        level: "Original Description",
      },
      {
        citation:
          "Pritchard JA. The use of the magnesium ion in the management of eclamptogenic toxemias. Surg Gynecol Obstet. 1955;100(2):131-140.",
        level: "Original Description",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Magnesium sulfate therapy requires individualized dosing, monitoring for toxicity, and prompt treatment of adverse effects.",
  },

  "ebl-obstetric": {
    clinicalPurpose:
      "Estimates obstetric blood loss by the gravimetric method (weighed sponges and drapes; 1 g ≈ 1 mL) or the hematocrit-based method (EBL = estimated blood volume × (pre-Hct − post-Hct)/pre-Hct, with a pregnancy blood volume of ~85 mL/kg).",
    howToUse: [
      "Choose the estimation method (gravimetric or hematocrit-based).",
      "For gravimetric: weigh all blood-soaked materials and subtract the known dry weight.",
      "For hematocrit-based: enter maternal weight, pre-delivery and post-delivery hematocrit.",
      "Review the estimated loss against the ACOG postpartum hemorrhage threshold (≥ 1000 mL).",
    ],
    interpretation: {
      guide:
        "Cumulative blood loss ≥ 1000 mL within 24 hours (or bleeding with signs of hypovolemia) meets the ACOG definition of postpartum hemorrhage. Loss of 500–999 mL exceeds typical expectations and warrants close monitoring; < 500 mL is within the expected range for delivery.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Quantitative blood-loss tracking during vaginal or cesarean delivery",
      "Recognition of postpartum hemorrhage",
      "Documentation of cumulative obstetric blood loss",
    ],
    whenNotToUse: [
      "As a substitute for clinical assessment of hypovolemia (vital signs, urine output)",
      "In acute massive hemorrhage where hematocrit is not yet reflective of loss",
    ],
    limitations: [
      "Gravimetric estimates omit uncollected blood (floor, linens) and underestimate losses.",
      "Hematocrit-based estimates lag behind acute bleeding and are unreliable immediately after loss.",
      "Blood volume varies (70–100 mL/kg); 85 mL/kg is an approximation.",
    ],
    example: {
      description:
        "A 70 kg patient has a pre-delivery hematocrit of 36% and a post-delivery hematocrit of 30%.",
      inputs: {
        method: "hct",
        weightKg: "70",
        preHct: "36",
        postHct: "30",
      },
      expectedResult:
        "Estimated blood loss ~992 mL (BV 5,950 mL × 6/36) — above the typical expected loss; monitor closely with the hemorrhage protocol ready.",
    },
    clinicalSignificance:
      "Quantitative assessment of blood loss is a cornerstone of postpartum hemorrhage recognition and response; early identification of ≥ 1000 mL loss triggers protocol-based management that reduces maternal morbidity and mortality.",
    references: [
      {
        citation:
          "ACOG Committee Opinion No. 794: Quantitative blood loss in obstetric hemorrhage. Obstet Gynecol. 2019;134(6):e150-e156.",
        level: "Committee Opinion",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 183: Postpartum hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Blood-loss estimates are imprecise; clinical signs of hypovolemia always take precedence in hemorrhage management.",
  },

  "epds": {
    clinicalPurpose:
      "Screens for postpartum (and antenatal) depression using the 10-item Edinburgh Postnatal Depression Scale (Cox 1987), each item scored 0–3 for a total of 0–30; a total ≥ 10 is screen-positive and any positive item-10 response requires urgent assessment.",
    howToUse: [
      "Ask the patient to answer each item according to how she has felt in the past 7 days.",
      "Select the response for each of the 10 items (items 1 and 2 are reverse-worded).",
      "Review the total score, the screening result, and the item-10 self-harm flag.",
    ],
    interpretation: {
      guide:
        "A total of 10 or higher is commonly used as the screen-positive cutoff for possible depression (some settings use ≥ 13 for higher specificity). Any positive response on item 10 (thoughts of harming self) warrants immediate clinical safety assessment regardless of the total score.",
      sexSpecific: false,
      ageSpecific: false,
    },
    whenToUse: [
      "Routine postpartum depression screening at postnatal visits",
      "Antenatal depression screening",
      "Evaluation of mood symptoms in the perinatal period",
    ],
    whenNotToUse: [
      "As a diagnostic test for depression — it is a screening instrument",
      "As the sole basis for psychiatric referral in the absence of a positive score when clinical concern exists",
    ],
    limitations: [
      "Self-report instruments are subject to response bias.",
      "Cutoffs vary across settings and languages.",
      "A low score does not exclude depression in the presence of clinical concern.",
    ],
    example: {
      description:
        "A 6-week postpartum patient completes the EPDS: items scored 1, 2, 1, 2, 1, 1, 1, 1, 0, 0.",
      inputs: {
        item1: "1",
        item2: "2",
        item3: "1",
        item4: "2",
        item5: "1",
        item6: "1",
        item7: "1",
        item8: "1",
        item9: "0",
        item10: "0",
      },
      expectedResult:
        "EPDS total 10/30 — screen positive for possible postpartum depression (cutoff ≥ 10); arrange a full clinical assessment.",
    },
    clinicalSignificance:
      "Perinatal depression is common and underdiagnosed; validated screening with the EPDS, combined with follow-up assessment and treatment, improves maternal and child outcomes.",
    references: [
      {
        citation:
          "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry. 1987;150:782-786.",
        level: "Original Description",
      },
      {
        citation:
          "ACOG Committee Opinion No. 757: Screening for perinatal depression. Obstet Gynecol. 2018;132(5):e208-e212.",
        level: "Committee Opinion",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The EPDS is a screening tool; a positive screen requires full clinical assessment, and any item-10 positive response requires immediate safety evaluation.",
  },

  "apgar-score": {
    clinicalPurpose:
      "Scores newborn condition immediately after birth using the five Apgar signs — Appearance (color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), and Respiration — each scored 0–2 for a total of 0–10 (Apgar 1953).",
    howToUse: [
      "Assign a value of 0, 1, or 2 to each of the five signs at the moment of scoring, using a timer.",
      "Score at 1 minute and 5 minutes of life; repeat every 5 minutes up to 20 minutes if the 5-minute score is below 7.",
      "Sum the five components (0–10) and review the severity band.",
    ],
    interpretation: {
      guide:
        "Scores of 7–10 are reassuring; 4–6 indicate moderate depression of the newborn; 0–3 indicate severe depression requiring immediate resuscitation. Per AAP/AHA guidance, the score is used to report the newborn's condition and response to resuscitation, not alone to decide whether resuscitation is needed.",
      sexSpecific: false,
      ageSpecific: true,
    },
    whenToUse: [
      "Standard assessment of every newborn at 1 and 5 minutes of life",
      "Reporting the response to neonatal resuscitation",
      "Documentation of newborn transition in the delivery room",
    ],
    whenNotToUse: [
      "As the sole trigger for resuscitation decisions (respirations, heart rate, and color guide resuscitation)",
      "As a predictor of long-term neurologic outcome",
    ],
    limitations: [
      "Scores are lower in preterm, sedated, or congenitally abnormal infants without implying asphyxia.",
      "Inter-observer variability exists among scorers.",
      "The score is a crude index of transition, not a diagnostic test.",
    ],
    example: {
      description:
        "A term infant at 1 minute is pink all over, heart rate 130 bpm, grimaces to stimulation, has some flexion of extremities, and has a vigorous cry.",
      inputs: {
        appearance: "2",
        pulse: "2",
        grimace: "1",
        activity: "2",
        respiration: "2",
      },
      expectedResult:
        "Apgar score 9/10 — reassuring; continue routine newborn care and reassess at 5 minutes.",
    },
    clinicalSignificance:
      "The Apgar score provides a rapid, standardized, universally used snapshot of a newborn's immediate condition and response to resuscitation, facilitating communication between delivery-room teams and guiding the intensity of ongoing observation.",
    references: [
      {
        citation:
          "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
        level: "Original Description",
      },
      {
        citation:
          "AAP Committee on Fetus and Newborn, ACOG Committee on Obstetric Practice. The Apgar score. Pediatrics. 2015;136(4):819-822.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Apgar score is a reporting tool; resuscitation decisions should be guided by the newborn's respirations, heart rate, and color.",
  },

  "pediatric-gcs": {
    clinicalPurpose:
      "Quantifies the level of consciousness in infants and children using the Pediatric Glasgow Coma Scale, which modifies the verbal component for age while keeping the eye (1–4) and motor (1–6) components identical to the adult scale; total range 3–15.",
    howToUse: [
      "Score the best eye opening (1–4) using the standard descriptors.",
      "Score the best age-appropriate verbal response (1–5): smiles/coos/follows = 5, consolable crying = 4, inconsolable crying = 3, moaning/restless = 2, none = 1.",
      "Score the best motor response (1–6) and sum the three components.",
    ],
    interpretation: {
      guide:
        "Scores 13–15 indicate mild impairment; 9–12 moderate impairment requiring close monitoring; 8 or less indicates severe impairment (coma) with the need for airway protection, urgent neuroimaging, and neurosurgical/ICU referral. The pediatric scale differs from the adult scale only in the verbal component.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Assessment of depressed consciousness in infants and children",
      "Serial neurologic monitoring after head trauma or critical illness",
      "Preverbal children who cannot be scored with the adult verbal scale",
    ],
    whenNotToUse: [
      "In fully verbal older children able to orient to person, place, and time (adult GCS applies)",
      "As a substitute for pupillary and brainstem examination",
    ],
    limitations: [
      "Age-appropriate verbal scoring is subjective and varies with developmental stage.",
      "Sedation, intubation, paralysis, and intoxication confound the score.",
      "A single score is less informative than serial change.",
    ],
    example: {
      description:
        "A 9-month-old after a fall opens eyes to voice (3), cries but is consolable (4), and withdraws to pain (4).",
      inputs: {
        eye: "3",
        verbal: "4",
        motor: "4",
      },
      expectedResult:
        "Pediatric GCS 11/15 — moderate impairment; close neurologic monitoring and urgent evaluation of the underlying cause.",
    },
    clinicalSignificance:
      "The Pediatric GCS standardizes the neurologic examination in children and is widely used to grade the severity of head injury and guide airway management, neuroimaging, and referral decisions.",
    references: [
      {
        citation:
          "James HE, Trauner D. The Glasgow Coma Scale. In: James HE, Anas NG, Perkin RM, eds. Brain Insults in Infants and Children. Orlando, FL: Grune & Stratton; 1985:179-182.",
        level: "Original Description",
      },
      {
        citation:
          "American College of Surgeons. Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed. Chicago, IL: ACS; 2018.",
        level: "Course Manual",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Neurologic assessment requires serial evaluation by trained clinicians, and clinical decisions should not rest on a single score.",
  },

  "pediatric-trauma-score": {
    clinicalPurpose:
      "Scores the severity of pediatric trauma across six components — weight, airway, systolic blood pressure, mental status, open wounds, and skeletal injury — each scored +2, +1, or −1, for a total of −6 to +12 (Tepas 1988). Lower scores predict higher mortality and the need for pediatric trauma center care.",
    howToUse: [
      "Score the best observed status in each of the six components.",
      "Use pediatric blood-pressure criteria (not adult values) for the systolic component.",
      "Sum the six component scores and review the risk category.",
    ],
    interpretation: {
      guide:
        "A score ≥ 8 predicts low mortality (< 1%) and allows routine care; 4–7 indicates significant injury with a strong consideration for transfer to a pediatric trauma center; scores below 4 carry a high mortality risk and warrant urgent transfer. The score should improve with resuscitation.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Emergency department triage of the injured child",
      "Prehospital triage of pediatric trauma patients",
      "Early identification of children needing pediatric trauma center resources",
    ],
    whenNotToUse: [
      "As an outcome predictor independent of ongoing clinical reassessment",
      "In place of anatomic scoring (e.g., ISS) once the full injury pattern is known",
    ],
    limitations: [
      "Underestimates injury severity in the first minutes after injury.",
      "Penetrating mechanisms are not as well captured as in anatomic scoring systems.",
      "Component scoring requires simultaneous physiologic assessment.",
    ],
    example: {
      description:
        "A 25 kg child involved in a motor-vehicle crash has a maintainable airway, SBP 95 mmHg, is obtunded, has a minor laceration, and a closed femur fracture.",
      inputs: {
        weight: "2",
        airway: "1",
        sbp: "2",
        cns: "1",
        openWound: "1",
        skeletal: "1",
      },
      expectedResult:
        "Pediatric Trauma Score 8 (−6 to +12) — low risk; predicted mortality low, routine trauma care with continued reassessment.",
    },
    clinicalSignificance:
      "The Pediatric Trauma Score provides a rapid, child-specific triage tool that identifies injured children who benefit from pediatric trauma center resources, supporting field and ED decisions that reduce preventable death in pediatric trauma.",
    references: [
      {
        citation:
          "Tepas JJ 3rd, Ramenofsky ML, Mollitt DL, et al. The Pediatric Trauma Score as a predictor of injury severity in the injured child. J Pediatr Surg. 1987;22(1):14-18.",
        level: "Original Description",
      },
      {
        citation:
          "American College of Surgeons. Resources for Optimal Care of the Injured Patient. Chicago, IL: ACS; 2022.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Trauma triage requires continuous reassessment, and clinical judgment should always override any score-based triage recommendation.",
  },

  "westley-croup-score": {
    clinicalPurpose:
      "Scores the severity of viral croup (laryngotracheobronchitis) using the five-component Westley scale (1978): level of consciousness, cyanosis, stridor, air entry, and chest-wall retractions, for a total of 0–17. Higher scores indicate more severe upper-airway obstruction.",
    howToUse: [
      "Assess each component while keeping the child calm to avoid worsening stridor.",
      "For stridor and cyanosis, score the worst finding seen both when calm and when agitated.",
      "Sum the five components (0–17) and review the severity band.",
    ],
    interpretation: {
      guide:
        "Scores ≤ 2 indicate mild croup, usually managed as an outpatient with a single dose of dexamethasone. Scores 3–7 indicate moderate croup, adding nebulized epinephrine for stridor at rest. Scores ≥ 8 indicate severe croup with impending respiratory failure requiring urgent airway management and intensive care.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Emergency department assessment of a child with barking cough and stridor",
      "Serial monitoring of croup severity during treatment",
      "Deciding on admission, nebulized epinephrine, and ICU involvement",
    ],
    whenNotToUse: [
      "When bacterial tracheitis, epiglottitis, foreign body, or angioedema is suspected (these progress differently and require different management)",
      "As a replacement for continuous clinical observation of the airway",
    ],
    limitations: [
      "Component scoring is somewhat subjective and inter-observer variability exists.",
      "Agitation during assessment worsens stridor and can falsely elevate the score.",
      "The score captures upper-airway obstruction but not hypoxemia from other causes.",
    ],
    example: {
      description:
        "A 2-year-old with croup has stridor only when agitated, decreased air entry, and moderate subcostal retractions, with normal consciousness, no cyanosis, and no retractions at rest.",
      inputs: {
        consciousness: "0",
        cyanosis: "0",
        stridor: "1",
        airEntry: "1",
        retractions: "2",
      },
      expectedResult:
        "Westley croup score 4/17 — moderate croup; dexamethasone with nebulized epinephrine for stridor at rest, observation for rebound.",
    },
    clinicalSignificance:
      "Croup is the most common cause of acute upper-airway obstruction in children; a standardized severity score guides dexamethasone and epinephrine use, admission decisions, and early recognition of impending respiratory failure.",
    references: [
      {
        citation:
          "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
        level: "Original Description",
      },
      {
        citation:
          "Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-339.",
        level: "Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. A child who is drowsy or cyanotic at rest has critical obstruction regardless of the score; continuous airway reassessment is mandatory.",
  },

  "pecarn-head-trauma": {
    clinicalPurpose:
      "Identifies children with minor blunt head trauma at very low risk of clinically important traumatic brain injury (ciTBI) using the age-specific PECARN decision rule (Kuppermann 2009) — separate predictor sets for children under 2 years and children 2 years and older.",
    howToUse: [
      "Confirm the child meets the rule's population: blunt head trauma within 24 hours, GCS 14–15, no more than brief (< 1 minute) loss of consciousness.",
      "Select the child's age group (under 2 years or 2 years and older).",
      "Answer the six predictors for that age group; the calculator counts how many are present.",
    ],
    interpretation: {
      guide:
        "If NONE of the predictors are present, the risk of ciTBI is < 0.02% (under 2 years) or < 0.05% (2 years and older) and CT is not indicated. If one predictor is present the risk is approximately 0.9% and observation is generally preferred over CT. If two or more predictors are present, the risk is substantially higher and CT is indicated.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Children with minor blunt head trauma in the emergency department",
      "CT decision-making for head trauma in children under 18 years",
      "Reducing unnecessary head CTs in children at very low risk",
    ],
    whenNotToUse: [
      "When GCS < 14, high-energy mechanisms (e.g., polytrauma with ejection), penetrating injury, bleeding disorders, or ventriculoperitoneal shunts are present",
      "In infants under 3 months, in whom any scalp hematoma generally warrants CT regardless of the rule",
    ],
    limitations: [
      "The rule stratifies risk but does not eliminate the need for observation and return precautions.",
      "Predictor assessment relies on accurate history (e.g., LOC, acting normally) from caregivers.",
      "Validated for blunt head trauma in the specified population only.",
    ],
    example: {
      description:
        "A 14-month-old fell from a changing table (~2.5 feet) onto carpet. GCS 15, acting normally, no scalp hematoma, no LOC, no palpable fracture, no concerning mechanism.",
      inputs: {
        ageGroup: "under-2",
        u2AlteredMentation: "no",
        u2PalpableSkullFracture: "no",
        u2ScalpHematoma: "no",
        u2Loc5Seconds: "no",
        u2NotActingNormal: "no",
        dangerousMechanism: "no",
      },
      expectedResult:
        "PECARN (under 2 years) — very low risk; risk of clinically important TBI < 0.02%; CT not indicated; provide return precautions.",
    },
    clinicalSignificance:
      "The PECARN rule is one of the most extensively validated decision rules in pediatric emergency medicine, allowing clinicians to safely avoid head CT in a large proportion of children with minor head trauma while identifying those who need imaging.",
    references: [
      {
        citation:
          "Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
        level: "Derivation and Validation Study",
      },
      {
        citation:
          "Schonfeld D, Fitz BM, Nigrovic LE. Effect of the duration of emergency department observation on computed tomography use in children with minor blunt head trauma. Ann Emerg Med. 2013;62(6):597-603.",
        level: "Validation Study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The PECARN rule supports, but does not replace, clinical judgment; any child with clinical deterioration warrants CT regardless of the calculated risk.",
  },

  "rochester-criteria": {
    clinicalPurpose:
      "Risk-stratifies febrile infants aged 0–60 days for serious bacterial infection using the Rochester criteria (Jaskiewicz 1994): term gestation, previously healthy, non-toxic appearance, no focal bacterial infection, WBC 5,000–15,000/µL, urinalysis < 10 WBC/HPF, and stool < 5 WBC/HPF when diarrhea is present.",
    howToUse: [
      "Enter the infant's age in days (0–60) and answer each clinical criterion.",
      "Enter the WBC count, urinalysis WBC per high-power field, and (if diarrhea) stool WBC per high-power field.",
      "Review whether ALL seven criteria are met (low risk) or any criterion fails (not low risk).",
    ],
    interpretation: {
      guide:
        "An infant who meets all seven criteria is considered LOW RISK for serious bacterial infection and can be managed with cultures, close follow-up within 24 hours, and strict return precautions. Failing ANY criterion classifies the infant as NOT LOW RISK, warranting a full sepsis evaluation, empiric antibiotics, and admission.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Evaluation of a well-appearing febrile infant 0–60 days old (rectal temperature ≥ 38.0 °C)",
      "Deciding between outpatient management with cultures and inpatient evaluation",
      "Structured communication of febrile-infant risk factors",
    ],
    whenNotToUse: [
      "In preterm (< 37 weeks), chronically ill, or toxic-appearing infants",
      "As a substitute for blood, urine, and CSF cultures and clinical reassessment",
    ],
    limitations: [
      "The criteria were validated in a specific population and should not be generalized beyond it.",
      "They do not eliminate the risk of serious bacterial infection in the low-risk group (still < 1–2%).",
      "Contemporary febrile-infant guidelines (e.g., AAP 2021) refine management and should be used alongside this tool.",
    ],
    example: {
      description:
        "A 45-day-old, term, previously healthy infant presents with fever to 38.3 °C and appears well. WBC 9,000/µL, urinalysis 3 WBC/HPF, no diarrhea, no focal infection.",
      inputs: {
        ageDays: "45",
        termGestation: "yes",
        previouslyHealthy: "yes",
        nontoxic: "yes",
        focalInfection: "no",
        wbc: "9000",
        urinalysisWbc: "3",
        diarrhea: "no",
        stoolWbc: "0",
      },
      expectedResult:
        "Rochester criteria — LOW RISK (7/7 criteria met); obtain blood and urine cultures, arrange follow-up within 24 hours, and give strict return precautions.",
    },
    clinicalSignificance:
      "The Rochester criteria were among the first validated tools to safely identify a subset of febrile young infants at low risk of serious bacterial infection, informing outpatient management strategies and reducing unnecessary admissions while emphasizing the need for cultures and follow-up.",
    references: [
      {
        citation:
          "Jaskiewicz JA, McCarthy CA, Richardson AC, et al. Febrile infants at low risk for serious bacterial infection — an appraisal of the Rochester criteria and implications for management. Pediatrics. 1994;94(3):390-396.",
        level: "Original Description",
      },
      {
        citation:
          "Dagan R, Powell KR, Hall CB, Menegus MA. Identification of infants unlikely to have serious bacterial infection although hospitalized for suspected sepsis. J Pediatr. 1985;107(6):855-860.",
        level: "Original Description",
      },
      {
        citation:
          "Pantell RH, Roberts KB, Adams WG, et al. Evaluation and management of well-appearing febrile infants 8 to 60 days old. Pediatrics. 2021;148(2):e2021052228.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Febrile infant management must follow current institutional and AAP guidelines; cultures and reassessment are essential regardless of the calculated risk.",
  },

  "gorelick-dehydration": {
    clinicalPurpose:
      "Predicts clinically important dehydration (≥ 5% of body weight) in children with gastroenteritis using the validated 4-item Gorelick scale (1997): capillary refill > 2 seconds, dry mucous membranes, absent tears, and ill/toxic appearance.",
    howToUse: [
      "Assess each of the four clinical signs in a calm child.",
      "Indicate whether each finding is present.",
      "Review the number of positive findings (0–4) and the predicted dehydration category.",
    ],
    interpretation: {
      guide:
        "With fewer than 3 of 4 findings, clinically important dehydration (≥ 5%) is unlikely and oral rehydration is generally appropriate. With 3 or more of 4 findings, dehydration of ≥ 5% is predicted and intravenous or aggressive rehydration is typically indicated.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Assessment of a child with gastroenteritis (diarrhea and/or vomiting) for dehydration",
      "Deciding whether a child needs oral versus intravenous rehydration",
      "Rapid bedside screening in the emergency department or clinic",
    ],
    whenNotToUse: [
      "In a shocked or markedly lethargic child — begin resuscitation immediately rather than completing scoring",
      "As the sole determinant of fluid management without weight and reassessment",
    ],
    limitations: [
      "Clinical signs vary with fever, ambient temperature, and observer.",
      "The scale is most accurate at the extremes; intermediate scores require clinical correlation.",
      "Weight-based (pre-illness vs current) deficit remains the reference standard for confirming dehydration.",
    ],
    example: {
      description:
        "A 3-year-old with 2 days of diarrhea has capillary refill > 2 seconds and dry mucous membranes, but tears are present and the child appears well.",
      inputs: {
        capillaryRefill: "yes",
        dryMucousMembranes: "yes",
        absentTears: "no",
        illAppearance: "no",
      },
      expectedResult:
        "Gorelick dehydration scale — 2 of 4 findings; argues against ≥ 5% dehydration; oral rehydration and reassessment appropriate.",
    },
    clinicalSignificance:
      "Rapid, accurate identification of children with significant dehydration guides the choice between oral and intravenous rehydration in gastroenteritis, reducing both under-resuscitation and unnecessary IV placement in a common pediatric emergency presentation.",
    references: [
      {
        citation:
          "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
        level: "Original Description",
      },
      {
        citation:
          "World Health Organization. The Treatment of Diarrhoea: A Manual for Physicians and Other Senior Health Workers. 4th rev. Geneva: WHO; 2005.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Combine the score with weight change, urine output, and clinical judgment; never delay resuscitation of a shocked child to complete scoring.",
  },

  "pediatric-hypotension": {
    clinicalPurpose:
      "Provides the age-based PALS 5th-percentile systolic blood pressure threshold for pediatric hypotension (< 60 mmHg in term newborns to 1 month; < 70 mmHg in infants 1–12 months; < 70 + 2 × age in years in children 1–10 years; < 90 mmHg beyond 10 years) and compares a measured systolic blood pressure against it.",
    howToUse: [
      "Select the child's age group.",
      "For the 1–10 year group, enter the age in completed years.",
      "Enter the measured systolic blood pressure and review whether it falls below the threshold.",
    ],
    interpretation: {
      guide:
        "A measured systolic blood pressure at or above the age-specific 5th-percentile threshold is considered adequate for resuscitation purposes. A systolic blood pressure below the threshold defines hypotension by PALS criteria and warrants immediate intervention with the shock algorithm.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Recognition of hypotensive (decompensated) shock in a child",
      "PALS resuscitation training and simulation",
      "Teaching age-specific normal blood pressure values",
    ],
    whenNotToUse: [
      "For diagnosing chronic or transient hypertension",
      "As the sole marker of shock — compensated shock occurs with a normal blood pressure",
    ],
    limitations: [
      "These are resuscitation thresholds, not population blood-pressure percentiles for screening.",
      "The first-days-of-life alternative criterion (mean arterial pressure < gestational age in weeks) is not included.",
      "Interpretation requires the full clinical picture of perfusion.",
    ],
    example: {
      description:
        "A 4-year-old in the emergency department has a measured systolic blood pressure of 85 mmHg.",
      inputs: {
        ageGroup: "1-10yr",
        ageYears: "4",
        sbp: "85",
      },
      expectedResult:
        "NOT hypotensive — measured SBP 85 mmHg is at or above the PALS threshold for a 4-year-old (70 + 2 × 4 = 78 mmHg); assess for compensated shock.",
    },
    clinicalSignificance:
      "Recognizing hypotension is a cornerstone of pediatric resuscitation; age-appropriate thresholds ensure that shock is identified early and treated before cardiovascular collapse, improving outcomes in pediatric emergency and critical care.",
    references: [
      {
        citation:
          "American Heart Association. Pediatric Advanced Life Support Provider Manual. Dallas, TX: AHA; 2020.",
        level: "Guideline",
      },
      {
        citation:
          "Kleinman ME, Chameides L, Schexnayder SM, et al. Pediatric advanced life support: 2010 American Heart Association guidelines for cardiopulmonary resuscitation and emergency cardiovascular care. Pediatrics. 2010;126(5):e1361-e1399.",
        level: "Guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. A normal blood pressure does not exclude shock; always assess perfusion, mental status, and urine output alongside blood pressure.",
  },

  "peds-pews": {
    clinicalPurpose:
      "Scores the risk of clinical deterioration on pediatric wards using the Brighton Pediatric Early Warning Score (Monaghan 2005): Behavior, Cardiovascular, and Respiratory domains (each 0–3) plus 1 point for persistent parent or staff concern, for a total of 0–10.",
    howToUse: [
      "Score each of the three domains using the age-appropriate descriptors.",
      "Add 1 point if the parent/carer or a staff member has significant concern about deterioration.",
      "Sum the total (0–10) and act on the escalation threshold.",
    ],
    interpretation: {
      guide:
        "A total of 0–2 indicates low risk and routine monitoring. A total of 3–4 indicates intermediate risk: increase the frequency of observations and inform senior staff. A total ≥ 5, or a score of 3 in any single domain, warrants urgent medical review and consideration of transfer to a higher level of care.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: true,
    },
    whenToUse: [
      "Routine ward monitoring of hospitalized children",
      "Early detection of deterioration in respiratory, cardiovascular, or behavioral status",
      "Escalation triggers for the rapid response team",
    ],
    whenNotToUse: [
      "As a substitute for clinical judgment in a child who looks unwell",
      "In the ICU setting where continuous monitoring is already in place",
    ],
    limitations: [
      "Specific escalation protocols vary between institutions and PEWS chart versions.",
      "Age-specific normal ranges are needed for accurate cardiovascular and respiratory scoring.",
      "A low score does not exclude serious illness.",
    ],
    example: {
      description:
        "A ward child is sleeping but wakes to interact (behavior 1), is pale with a capillary refill of 1–2 seconds (cardiovascular 1), and has mild tachypnea on room air (respiratory 1), with no parent concern.",
      inputs: {
        behavior: "1",
        cardiovascular: "1",
        respiratory: "1",
        concern: "no",
      },
      expectedResult:
        "PEWS 3/10 — intermediate risk; increase observation frequency and inform senior staff.",
    },
    clinicalSignificance:
      "Pediatric early warning scores such as the Brighton PEWS provide a structured, reproducible way to detect deterioration before critical decompensation, supporting timely escalation, rapid response team activation, and improved safety on pediatric wards.",
    references: [
      {
        citation:
          "Monaghan A. Detecting and managing deterioration in children. Paediatr Nurs. 2005;17(1):32-35.",
        level: "Original Description",
      },
      {
        citation:
          "Lambert V, Matthews A, MacDonell R, Fitzsimons J. Paediatric early warning systems for detecting and responding to clinical deterioration in children: a systematic review. BMJ Open. 2017;7(3):e014497.",
        level: "Systematic Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. PEWS complements, but does not replace, clinical assessment; escalate any child who looks unwell regardless of the score.",
  },

  "nihss": {
    clinicalPurpose:
      "Quantifies neurologic impairment in acute ischemic stroke by scoring 15 standardized examination items (level of consciousness, orientation, commands, gaze, visual fields, facial palsy, arm and leg motor function, ataxia, sensory, language, dysarthria, and extinction), producing a total of 0–42.",
    howToUse: [
      "Administer the 15 items in the standard order, scoring each item's best response.",
      "Score the left and right arm and leg motor items separately.",
      "Sum all 15 item scores to obtain the total (0–42).",
      "Repeat the assessment serially to track improvement or deterioration.",
    ],
    interpretation: {
      guide:
        "A total of 0 indicates no stroke symptoms; 1–4 is a minor stroke; 5–15 moderate; 16–20 moderate–severe; and 21–42 severe. The baseline score helps stratify reperfusion eligibility and predicts outcome. A change of ≥ 2 points on repeat assessment indicates significant neurologic change.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Standardized quantification of deficit at acute stroke presentation",
      "Monitoring neurologic status after thrombolysis or thrombectomy",
      "Stratifying severity and communicating exam findings between teams",
    ],
    whenNotToUse: [
      "As a measure of functional disability or outcome — use the modified Rankin Scale instead",
      "To rule out posterior circulation stroke, which the NIHSS may underweight",
    ],
    limitations: [
      "Ceiling and floor effects — very mild and very severe deficits are under-differentiated.",
      "Underweights posterior circulation (e.g., ataxia, visual) and right-hemisphere signs.",
      "Confounded by sedation, intubation, aphasia, and language barriers.",
    ],
    example: {
      description:
        "A 70-year-old man presents 90 minutes after sudden right-sided weakness and word-finding difficulty. Examination shows he is drowsy but arousable (1a = 1), answers one of two questions (1b = 1), performs one of two commands (1c = 1), mild left gaze palsy (2 = 1), partial visual field loss (3 = 1), facial droop (4 = 1), left arm 2 (drifts to bed), left leg 2, right side normal, no ataxia, mild sensory loss (8 = 1), moderate aphasia (9 = 1), mild dysarthria (10 = 1), mild inattention (11 = 1).",
      inputs: {
        loc: "1",
        locQuestions: "1",
        locCommands: "1",
        gaze: "1",
        visual: "1",
        facial: "1",
        armLeft: "2",
        armRight: "0",
        legLeft: "2",
        legRight: "0",
        ataxia: "0",
        sensory: "1",
        language: "1",
        dysarthria: "1",
        extinction: "1",
      },
      expectedResult: "NIHSS 14/42 — MODERATE stroke; evaluate for reperfusion therapy.",
    },
    clinicalSignificance:
      "The NIHSS provides a reproducible, quantitative language for acute stroke severity that guides reperfusion decisions, predicts outcome, and enables serial monitoring — making it a cornerstone of acute stroke care.",
    references: [
      {
        citation:
          "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
        level: "Original Description",
        url: "https://www.ahajournals.org/doi/10.1161/01.STR.20.7.864",
      },
      {
        citation:
          "Lyden P, Brott T, Tilley B, et al. Improved reliability of the NIH Stroke Scale using video training. Stroke. 1994;25(11):2220-2226.",
        level: "Reliability Study",
        url: "https://www.ahajournals.org/doi/10.1161/01.STR.25.11.2220",
      },
    ],
    evidence: {
      source: "Clinical scoring system validated in acute stroke",
      reference:
        "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.",
      ],
    },
    faq: [
      {
        question: "What NIHSS score defines a severe stroke?",
        answer:
          "Scores of 21–42 are conventionally classified as severe, 16–20 as moderate–severe, 5–15 as moderate, and 1–4 as minor.",
      },
      {
        question: "Why score both arms and both legs?",
        answer:
          "Motor deficits are often asymmetric; scoring each limb separately captures the maximal deficit and adds up to 16 points total.",
      },
    ],
    comparison: {
      title: "Stroke assessment tools",
      calculators: [
        {
          name: "Modified Rankin Scale",
          href: "/calculators/modified-rankin-scale",
          use: "Functional outcome after stroke",
          bestFor: "Long-term disability measurement",
        },
        {
          name: "RACE Scale",
          href: "/calculators/race-scale",
          use: "Prehospital detection of large vessel occlusion",
          bestFor: "Field triage for thrombectomy",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The NIHSS requires standardized training; treatment decisions should follow current acute stroke guidelines and the patient's overall clinical picture.",
  },

  "abcd2-score": {
    clinicalPurpose:
      "Stratifies the short-term (2-day) risk of stroke after a transient ischemic attack using age, blood pressure, clinical features, duration of symptoms, and diabetes, giving a total of 0–7.",
    howToUse: [
      "Score age 60 or older as 1 point.",
      "Score blood pressure ≥ 140/90 mmHg as 1 point.",
      "Score clinical features: unilateral weakness = 2, speech disturbance without weakness = 1, other = 0.",
      "Score duration: ≥ 60 minutes = 2, 10–59 minutes = 1, < 10 minutes = 0.",
      "Add 1 point for diabetes and sum the total.",
    ],
    interpretation: {
      guide:
        "Scores of 0–3 are low risk with a 2-day stroke risk of about 1.0%; 4–5 moderate (≈ 4.1%); and 6–7 high (≈ 8.1%). All patients with a suspected TIA need urgent specialist evaluation regardless of the score.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Triage of patients presenting with a suspected transient ischemic attack",
      "Prioritizing urgency of TIA clinic referral and investigation",
    ],
    whenNotToUse: [
      "To diagnose a TIA — the score assumes the diagnosis is already established",
      "To rule out stroke in patients with persistent symptoms",
    ],
    limitations: [
      "Moderate discrimination — many strokes occur in the low-risk group.",
      "Derived in cohorts before routine diffusion-weighted MRI and modern rapid pathways.",
      "Does not incorporate imaging or carotid stenosis findings.",
    ],
    example: {
      description:
        "A 72-year-old hypertensive diabetic woman had 90 minutes of right-hand and face weakness that fully resolved. On arrival BP is 165/95.",
      inputs: {
        age: "1",
        bloodPressure: "1",
        clinicalFeatures: "2",
        duration: "2",
        diabetes: "1",
      },
      expectedResult: "ABCD2 7/7 — HIGH short-term stroke risk (2-day risk ≈ 8.1%); arrange same-day specialist evaluation.",
    },
    clinicalSignificance:
      "The ABCD2 score enables rapid, evidence-based triage of TIA patients, directing the highest-risk patients to same-day assessment and early secondary prevention that reduces the early risk of stroke.",
    references: [
      {
        citation:
          "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
        level: "Derivation/Validation Cohort",
        url: "https://doi.org/10.1016/S0140-6736(07)60150-0",
      },
      {
        citation:
          "Rothwell PM, Giles MF, Flossmann E, et al. A simple score (ABCD) to identify individuals at high early risk of stroke after transient ischaemic attack. Lancet. 2005;366(9479):29-36.",
        level: "Derivation",
        url: "https://doi.org/10.1016/S0140-6736(05)66702-5",
      },
    ],
    evidence: {
      source: "Validation study (Lancet 2007)",
      reference:
        "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
      ],
    },
    faq: [
      {
        question: "What does an ABCD2 score of 4–5 mean?",
        answer:
          "It indicates moderate risk, with a 2-day stroke risk of about 4.1%; patients should be seen urgently, typically within the same day.",
      },
      {
        question: "Should imaging change the management even with a low score?",
        answer:
          "Yes. Modern pathways incorporate MRI findings and carotid imaging; a low ABCD2 does not replace urgent assessment and secondary prevention.",
      },
    ],
    comparison: {
      title: "Stroke risk prediction",
      calculators: [
        {
          name: "Essen Stroke Risk Score",
          href: "/calculators/esrs",
          use: "Long-term recurrent stroke risk",
          bestFor: "Chronic secondary prevention decisions",
        },
        {
          name: "NIH Stroke Scale",
          href: "/calculators/nihss",
          use: "Acute stroke severity",
          bestFor: "Deficit quantification when stroke has occurred",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The ABCD2 score complements, but does not replace, urgent specialist assessment, neuroimaging, and initiation of secondary prevention.",
  },

  "hunt-hess-scale": {
    clinicalPurpose:
      "Classifies the clinical severity of aneurysmal subarachnoid hemorrhage into five grades (I–V) based on headache, nuchal rigidity, level of consciousness, and focal deficits, and is used to estimate prognosis.",
    howToUse: [
      "Assign the grade from the patient's clinical condition before any intervention that could alter the examination.",
      "Grade I: no or minimal symptoms; II: moderate–severe headache with nuchal rigidity and no deficit other than cranial nerve palsy; III: drowsy/confused with mild focal deficit; IV: stupor with moderate–severe hemiparesis; V: deep coma with decerebrate rigidity.",
      "In the 1974 modification, add one grade in the presence of serious systemic disease.",
    ],
    interpretation: {
      guide:
        "Lower grades predict better outcomes. Grades I–III are generally candidates for early aneurysm securing; grades IV–V require stabilization before treatment. Historical mortality ranged from 1–3% (grade I) to 70–77% (grade V), though modern outcomes are better.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Clinical grading of confirmed or suspected aneurysmal subarachnoid hemorrhage",
      "Communicating severity and guiding timing of aneurysm treatment",
      "Stratifying prognosis in neurosurgical units",
    ],
    whenNotToUse: [
      "To decide whether CT is needed to diagnose SAH — use the Ottawa SAH Rule",
      "As the sole basis for prognosis in patients already treated with modern endovascular techniques",
    ],
    limitations: [
      "Subjective grading with imperfect interobserver agreement.",
      "Historical mortality figures overestimate current mortality.",
      "Does not incorporate imaging findings such as the modified Fisher grade.",
    ],
    example: {
      description:
        "A 55-year-old woman with a confirmed posterior communicating artery aneurysm is drowsy, disoriented, and has a mild right hemiparesis after her SAH.",
      inputs: {
        grade: "3",
      },
      expectedResult: "Hunt and Hess grade III — drowsy/confused with mild focal deficit; historical mortality ≈ 9–19%.",
    },
    clinicalSignificance:
      "Hunt and Hess grading provides a rapid, universally recognized language for SAH severity that guides the timing and intensity of aneurysm treatment and supports prognostication.",
    references: [
      {
        citation:
          "Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.",
        level: "Original Description",
        url: "https://doi.org/10.3171/jns.1968.28.1.0014",
      },
      {
        citation:
          "Hunt WE, Kosnik EJ. Timing and perioperative care in intracranial aneurysm surgery. Clin Neurosurg. 1974;21:79-89.",
        level: "Modification",
      },
    ],
    evidence: {
      source: "Original clinical grading system (J Neurosurg 1968)",
      reference:
        "Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.",
      ],
    },
    faq: [
      {
        question: "What is the mortality for grade V SAH?",
        answer:
          "Historically 70–77%, but modern series with aggressive neurointensive care report substantially better outcomes.",
      },
      {
        question: "Is the Hunt and Hess scale used together with other scores?",
        answer:
          "Yes, it is commonly combined with the WFNS grade and the modified Fisher scale for a fuller assessment of SAH severity.",
      },
    ],
    comparison: {
      title: "Subarachnoid hemorrhage assessment",
      calculators: [
        {
          name: "Ottawa SAH Rule",
          href: "/calculators/ottawa-sah-rule",
          use: "Rule-out SAH in the emergency department",
          bestFor: "Pre-diagnosis triage of acute headache",
        },
        {
          name: "Glasgow Coma Scale",
          href: "/calculators/gcs",
          use: "Consciousness monitoring",
          bestFor: "Serial neurologic monitoring",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Mortality figures are historical; treatment decisions must follow current guidelines and the patient's full clinical picture.",
  },

  "modified-rankin-scale": {
    clinicalPurpose:
      "Measures the degree of functional disability after stroke or other neurologic events on a six-level scale (0 = no symptoms to 5 = severe disability), with 6 indicating death; it is the standard outcome measure in stroke trials.",
    howToUse: [
      "Interview the patient (and caregivers when appropriate) about what they can actually do.",
      "Assign a single level from 0 to 6 matching the patient's global level of disability.",
      "Use a structured interview to improve reproducibility.",
      "Record the score at a defined time point such as 90 days post-stroke.",
    ],
    interpretation: {
      guide:
        "0 = no symptoms; 1 = no significant disability despite symptoms; 2 = slight disability (independent in daily affairs but unable to do all previous activities); 3 = moderate disability (needs some help but walks unassisted); 4 = moderately severe disability (unable to walk or attend bodily needs unassisted); 5 = severe disability (bedridden, incontinent, constant care); 6 = death. Scores 0–2 are conventionally a favorable outcome.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Outcome measurement in stroke trials and registries",
      "Discharge planning and rehabilitation goal setting",
      "Longitudinal assessment of functional recovery",
    ],
    whenNotToUse: [
      "To quantify acute neurologic impairment — use the NIHSS",
      "To guide acute reperfusion treatment decisions",
    ],
    limitations: [
      "Ordinal scale — intervals are not equal and scores should not be averaged arithmetically.",
      "Cognitive, language, and mood deficits are easily underestimated.",
      "Interobserver agreement is moderate without structured interviews.",
    ],
    example: {
      description:
        "Three months after a left MCA stroke, a patient walks without another person's help but needs assistance with dressing and preparing meals.",
      inputs: {
        score: "3",
      },
      expectedResult: "mRS 3 — moderate disability; requires some help but able to walk unassisted.",
    },
    clinicalSignificance:
      "The mRS is the most widely used functional outcome measure in stroke research, providing a clinically meaningful, patient-centered measure of disability that complements the NIHSS.",
    references: [
      {
        citation:
          "van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.",
        level: "Validation Study",
        url: "https://www.ahajournals.org/doi/10.1161/01.STR.19.5.604",
      },
      {
        citation:
          "Rankin J. Cerebrovascular accidents in patients over the age of 60. II. Prognosis. Scott Med J. 1957;2(5):200-215.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Validated functional outcome scale (Stroke 1988)",
      reference:
        "van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.",
      ],
    },
    faq: [
      {
        question: "Why is mRS 0–2 called a good outcome?",
        answer:
          "Because patients at mRS 0–2 are functionally independent in daily life, which is the goal of stroke treatment.",
      },
      {
        question: "Can the mRS be used at the bedside?",
        answer:
          "Yes, but a structured assessment improves agreement; it is most informative at a fixed time point such as 90 days.",
      },
    ],
    comparison: {
      title: "Stroke severity and outcome",
      calculators: [
        {
          name: "NIH Stroke Scale",
          href: "/calculators/nihss",
          use: "Acute neurologic impairment",
          bestFor: "Severity at presentation and treatment decisions",
        },
        {
          name: "Hunt and Hess Scale",
          href: "/calculators/hunt-hess-scale",
          use: "SAH clinical grade",
          bestFor: "Subarachnoid hemorrhage prognosis",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The mRS should be assigned by a trained clinician using a structured assessment and interpreted within the full clinical context.",
  },

  "ottawa-sah-rule": {
    clinicalPurpose:
      "Determines whether an emergency department patient with an acute nontraumatic headache requires a non-contrast CT to rule out subarachnoid hemorrhage. The rule is positive if any of six high-risk findings is present and has 100% sensitivity for SAH.",
    howToUse: [
      "Confirm eligibility: alert patient (GCS 15), aged 15 years or older, acute nontraumatic headache reaching maximum intensity within 1 hour, normal neurologic examination.",
      "Check each of the six criteria: age ≥ 40, neck pain or stiffness, witnessed loss of consciousness, onset during exertion, thunderclap headache, and limited neck flexion on examination.",
      "If ANY criterion is present, the rule is positive and CT is indicated.",
    ],
    interpretation: {
      guide:
        "Rule negative (0 criteria): CT to rule out SAH is not required — sensitivity 100%, specificity 15.3%. Rule positive (≥ 1 criterion): non-contrast CT is indicated. A negative CT with ongoing suspicion may still require lumbar puncture per local protocol.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Emergency department evaluation of acute severe nontraumatic headache",
      "Triage decisions on who needs CT for suspected SAH",
    ],
    whenNotToUse: [
      "Patients with focal neurologic deficits, prior SAH, known brain tumors, or headache of traumatic origin",
      "Headache that peaks over more than 1 hour",
    ],
    limitations: [
      "Derived and validated in alert ED patients with normal examinations.",
      "Specificity is low (15.3%), so many CTs are still obtained.",
      "Timing of CT and center protocol (CT ± LP) still govern management.",
    ],
    example: {
      description:
        "A 58-year-old man presents with a sudden severe headache that peaked instantly while he was lifting weights, described as the worst headache of his life. His neurologic examination is normal.",
      inputs: {
        age40: "yes",
        neckPainStiffness: "no",
        witnessedLoc: "no",
        exertionOnset: "yes",
        thunderclap: "yes",
        limitedNeckFlexion: "no",
      },
      expectedResult: "Ottawa SAH Rule POSITIVE (3 of 6 criteria) — non-contrast CT is indicated to rule out SAH.",
    },
    clinicalSignificance:
      "The Ottawa SAH Rule provides an evidence-based, highly sensitive method to rule out subarachnoid hemorrhage in ED patients with acute headache, avoiding unnecessary CTs while safely identifying those who need imaging.",
    references: [
      {
        citation:
          "Perry JJ, Stiell IG, Sivilotti MLA, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.",
        level: "Multicenter Validation",
        url: "https://doi.org/10.1001/jama.2013.278018",
      },
      {
        citation:
          "Perry JJ, Stiell IG, Sivilotti MLA, et al. High risk clinical characteristics for subarachnoid haemorrhage in patients with acute headache: prospective cohort study. BMJ. 2010;341:c5204.",
        level: "Derivation",
        url: "https://doi.org/10.1136/bmj.c5204",
      },
    ],
    evidence: {
      source: "Multicenter validation cohort (JAMA 2013)",
      reference:
        "Perry JJ, Stiell IG, Sivilotti MLA, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Perry JJ, Stiell IG, Sivilotti MLA, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.",
      ],
    },
    faq: [
      {
        question: "What happens if the rule is negative?",
        answer:
          "CT to rule out SAH is not required (100% sensitivity); other causes of headache should still be considered clinically.",
      },
      {
        question: "Does a negative CT always rule out SAH?",
        answer:
          "Modern CT within 6 hours is highly sensitive; when CT is negative but suspicion persists, lumbar puncture may still be performed per local protocol.",
      },
    ],
    comparison: {
      title: "Headache decision tools",
      calculators: [
        {
          name: "Hunt and Hess Scale",
          href: "/calculators/hunt-hess-scale",
          use: "Severity grading once SAH is confirmed",
          bestFor: "Prognosis and treatment planning",
        },
        {
          name: "Glasgow Coma Scale",
          href: "/calculators/gcs",
          use: "Consciousness assessment",
          bestFor: "Monitoring neurologic status",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Ottawa SAH Rule applies only to the specified population; always apply clinical judgment and local protocol.",
  },

  "fout-score": {
    clinicalPurpose:
      "Assesses the depth of impaired consciousness using four components — Eye response, Motor response, Brainstem reflexes, and Respiration — each scored 0–4, for a total of 0–16. Lower totals indicate deeper coma and higher in-hospital mortality.",
    howToUse: [
      "Score eye response from open with tracking/blinking to command (4) down to remaining closed to pain (0).",
      "Score motor response from command following such as thumbs-up, fist, or peace sign (4) down to no response or myoclonus status (0).",
      "Score brainstem reflexes from both pupil and corneal present (4) down to pupil, corneal, and cough all absent (0).",
      "Score respiration from regular non-intubated breathing (4) down to apnea or breathing at the ventilator rate (0).",
      "Sum the four components to a total of 0–16.",
    ],
    interpretation: {
      guide:
        "Scores of 13–16 indicate relatively favorable status, 9–12 intermediate impairment, 5–8 poor status, and 0–4 very poor status with the highest in-hospital mortality. The score should be interpreted alongside the cause of coma.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Assessing depth of coma in intubated and non-intubated patients",
      "Monitoring brainstem function in the ICU",
      "Prognostication after cardiac arrest and in neurocritical care",
    ],
    whenNotToUse: [
      "As a substitute for a full neurologic examination",
      "To assess focal neurologic deficits — use the NIHSS",
    ],
    limitations: [
      "Confounded by sedation and neuromuscular blockade.",
      "Requires careful training for the respiratory scoring in ventilated patients.",
      "Not a substitute for EEG or neuroimaging in prognostication.",
    ],
    example: {
      description:
        "A comatose patient after cardiac arrest: eyes open but not tracking (3), localizes to pain (3), one pupil fixed and wide (3), and Cheyne-Stokes breathing on room air (3).",
      inputs: {
        eye: "3",
        motor: "3",
        brainstem: "3",
        respiration: "3",
      },
      expectedResult: "FOUR 12/16 — intermediate impairment; monitor closely.",
    },
    clinicalSignificance:
      "The FOUR score captures brainstem and respiratory function that the GCS does not, remains testable in intubated patients, and provides strong prognostic information in coma, making it valuable in neurocritical care.",
    references: [
      {
        citation:
          "Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: The FOUR score. Ann Neurol. 2005;58(4):585-593.",
        level: "Original Description/Validation",
        url: "https://doi.org/10.1002/ana.20611",
      },
      {
        citation:
          "Wijdicks EFM. The bare essentials: coma. Pract Neurol. 2010;10(1):51-60.",
        level: "Review",
      },
    ],
    evidence: {
      source: "Original description and validation (Ann Neurol 2005)",
      reference:
        "Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: The FOUR score. Ann Neurol. 2005;58(4):585-593.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: The FOUR score. Ann Neurol. 2005;58(4):585-593.",
      ],
    },
    faq: [
      {
        question: "How is the FOUR score better than the GCS?",
        answer:
          "It omits the verbal component (so it works in intubated patients) and adds brainstem reflexes and respiration, capturing more prognostic information.",
      },
      {
        question: "What FOUR score is associated with very poor prognosis?",
        answer:
          "Totals of 0–4 are associated with the highest in-hospital mortality in validation studies.",
      },
    ],
    comparison: {
      title: "Coma assessment scales",
      calculators: [
        {
          name: "Glasgow Coma Scale",
          href: "/calculators/gcs",
          use: "Standard consciousness assessment",
          bestFor: "Rapid trauma triage and familiarity",
        },
        {
          name: "NIH Stroke Scale",
          href: "/calculators/nihss",
          use: "Focal neurologic deficit quantification",
          bestFor: "Stroke-specific assessment",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The FOUR score complements clinical assessment and should not be used alone to limit care or predict outcome.",
  },

  "race-scale": {
    clinicalPurpose:
      "A prehospital stroke scale that scores facial palsy, arm and leg motor function, gaze deviation, and aphasia/agnosia to identify large vessel occlusion (LVO) in acute ischemic stroke, with a total of 0–9; a score ≥ 5 suggests LVO.",
    howToUse: [
      "Score facial palsy (0–2), left arm motor (0–2), left leg motor (0–2), gaze deviation (0–1), and aphasia or agnosia (0–2) using the worst finding in each domain.",
      "Sum the five items to a total of 0–9.",
      "A score ≥ 5 supports routing the patient to an endovascular-capable center.",
    ],
    interpretation: {
      guide:
        "Scores of 0–4 indicate a lower probability of large vessel occlusion; scores ≥ 5 suggest LVO (sensitivity 0.85, specificity 0.68) and warrant activation of the endovascular stroke pathway.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Prehospital and emergency triage of suspected acute ischemic stroke",
      "Selecting patients for direct transport to thrombectomy-capable centers",
    ],
    whenNotToUse: [
      "To quantify overall stroke severity — use the NIHSS",
      "To exclude posterior circulation stroke, which may score low",
    ],
    limitations: [
      "Sensitivity of 0.85 — some LVOs will be missed.",
      "Validated primarily in the prehospital setting with trained EMS personnel.",
      "Does not capture all stroke syndromes (e.g., isolated posterior circulation findings).",
    ],
    example: {
      description:
        "An EMS crew evaluates an elderly patient with dense left facial palsy (2), left arm plegia (2), left leg plegia (2), conjugate gaze deviation to the right (1), and inability to name objects or identify her own arm (2).",
      inputs: {
        facialPalsy: "2",
        armMotor: "2",
        legMotor: "2",
        gaze: "1",
        aphasiaAgnosia: "2",
      },
      expectedResult: "RACE 9/9 — large vessel occlusion suspected; transport to an endovascular-capable stroke center.",
    },
    clinicalSignificance:
      "The RACE scale enables prehospital identification of large vessel occlusion, allowing direct transport to thrombectomy-capable centers and reducing delays to endovascular treatment.",
    references: [
      {
        citation:
          "Pérez de la Ossa N, Carrera D, Gorchs M, et al. Design and validation of a prehospital scale to predict stroke severity: the RACE scale. Stroke. 2014;45(9):2678-2684.",
        level: "Derivation/Validation",
        url: "https://doi.org/10.1161/STROKEAHA.114.005202",
      },
      {
        citation:
          "Carrera D, Gorchs M, Querol M, et al. Revalidation of the RACE scale after its regional implementation in Catalonia: a triage tool for large vessel occlusion. J Neurointerv Surg. 2019;11(8):751-756.",
        level: "Revalidation",
        url: "https://doi.org/10.1136/neurintsurg-2018-014519",
      },
    ],
    evidence: {
      source: "Prehospital validation study (Stroke 2014)",
      reference:
        "Pérez de la Ossa N, Carrera D, Gorchs M, et al. Design and validation of a prehospital scale to predict stroke severity: the RACE scale. Stroke. 2014;45(9):2678-2684.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Pérez de la Ossa N, Carrera D, Gorchs M, et al. Design and validation of a prehospital scale to predict stroke severity: the RACE scale. Stroke. 2014;45(9):2678-2684.",
      ],
    },
    faq: [
      {
        question: "Why does a RACE score ≥ 5 matter?",
        answer:
          "It predicts large vessel occlusion, making the patient a candidate for direct transport to a center offering mechanical thrombectomy.",
      },
      {
        question: "Can RACE replace the NIHSS in the hospital?",
        answer:
          "No. RACE is a focused prehospital triage tool; the NIHSS provides a more complete severity assessment in the hospital.",
      },
    ],
    comparison: {
      title: "Acute stroke screening",
      calculators: [
        {
          name: "NIH Stroke Scale",
          href: "/calculators/nihss",
          use: "Comprehensive stroke severity scoring",
          bestFor: "In-hospital assessment and monitoring",
        },
        {
          name: "ABCD2 Score for TIA",
          href: "/calculators/abcd2-score",
          use: "TIA risk stratification",
          bestFor: "Post-TIA early stroke risk",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The RACE scale supports, but does not replace, clinical judgment and regional stroke transport protocols.",
  },

  "esrs": {
    clinicalPurpose:
      "Estimates the long-term risk of recurrent ischemic stroke in patients with prior ischemic stroke or TIA using age, hypertension, diabetes, prior myocardial infarction, other cardiovascular disease, peripheral arterial disease, smoking, and prior ischemic events, producing a total of 0–9.",
    howToUse: [
      "Score age 65–75 as 1 point and age over 75 as 2 points.",
      "Add 1 point each for hypertension, diabetes, prior myocardial infarction, other cardiovascular disease (excluding MI and atrial fibrillation), peripheral arterial disease, smoking, and prior ischemic stroke or TIA.",
      "Sum to a total of 0–9 and classify as low (0–2) or high (3–9) risk.",
    ],
    interpretation: {
      guide:
        "Scores of 0–2 indicate low long-term recurrent stroke risk; scores of 3–9 indicate high risk and warrant aggressive secondary prevention. In patients with atrial fibrillation, use AF-specific tools (e.g., CHA2DS2-VASc) for anticoagulation decisions.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Secondary prevention planning after ischemic stroke or TIA",
      "Identifying patients who may benefit from more intensive antithrombotic and risk-factor therapy",
    ],
    whenNotToUse: [
      "To guide anticoagulation in atrial fibrillation — use CHA2DS2-VASc",
      "For 2-day TIA risk triage — use ABCD2",
    ],
    limitations: [
      "Derived from the CAPRIE cohort and does not capture all predictors of recurrence.",
      "Does not include imaging or biomarker data.",
      "Discrimination is modest in some validation cohorts.",
    ],
    example: {
      description:
        "A 78-year-old hypertensive diabetic patient with a prior myocardial infarction and a recent minor ischemic stroke continues to smoke.",
      inputs: {
        ageGroup: "2",
        hypertension: "yes",
        diabetes: "yes",
        priorMi: "yes",
        otherCvd: "no",
        pad: "no",
        smoking: "yes",
        priorTiaStroke: "yes",
      },
      expectedResult: "ESRS 7/9 — HIGH recurrent stroke risk; aggressive secondary prevention warranted.",
    },
    clinicalSignificance:
      "The ESRS supports long-term secondary prevention decisions by quantifying recurrent stroke risk, guiding the intensity of antiplatelet therapy and vascular risk-factor management.",
    references: [
      {
        citation:
          "Diener HC, Ringleb PA, Savi P. Clopidogrel for the secondary prevention of stroke. Expert Opin Pharmacother. 2005;6(5):755-764.",
        level: "Derivation Cohort (CAPRIE)",
      },
      {
        citation:
          "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
        level: "Validation",
        url: "https://doi.org/10.1161/STROKEAHA.108.521419",
      },
    ],
    evidence: {
      source: "CAPRIE-derived score validated in REACH registry",
      reference:
        "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Weimar C, Diener HC, Alberts MJ, et al. The Essen stroke risk score predicts recurrent cardiovascular events: a validation within the REduction of Atherothrombosis for Continued Health (REACH) registry. Stroke. 2009;40(2):350-354.",
      ],
    },
    faq: [
      {
        question: "What is a high ESRS?",
        answer:
          "A score of 3 or more indicates high recurrent stroke risk and justifies aggressive secondary prevention.",
      },
      {
        question: "Does the ESRS replace CHA2DS2-VASc?",
        answer:
          "No — CHA2DS2-VASc is for stroke risk in atrial fibrillation; ESRS is for recurrent stroke risk after an ischemic event.",
      },
    ],
    comparison: {
      title: "Stroke risk assessment",
      calculators: [
        {
          name: "ABCD2 Score for TIA",
          href: "/calculators/abcd2-score",
          use: "Very early stroke risk after TIA",
          bestFor: "Acute TIA triage",
        },
        {
          name: "NIH Stroke Scale",
          href: "/calculators/nihss",
          use: "Acute stroke severity",
          bestFor: "Deficit quantification",
        },
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The ESRS supports risk stratification; treatment decisions must follow current clinical guidelines and individual patient circumstances.",
  },

  "phq-9": {
    clinicalPurpose:
      "Screens for and grades the severity of depressive symptoms over the previous two weeks and identifies possible suicidal ideation, guiding treatment initiation and follow-up in primary care.",
    howToUse: [
      "Ask the patient to rate each of the nine symptoms for the past two weeks using the four frequency options (0 = not at all to 3 = nearly every day).",
      "Sum the nine item scores to obtain the PHQ-9 total (0–27).",
      "Review the severity band and, whenever item 9 is endorsed, perform an immediate suicide risk assessment.",
    ],
    interpretation: {
      guide:
        "Total 0–4 = minimal, 5–9 = mild, 10–14 = moderate, 15–19 = moderately severe, and 20–27 = severe depression. A total ≥ 10 has ~88% sensitivity and ~88% specificity for major depressive disorder and is the recommended threshold for initiating treatment. Any endorsement of item 9 requires urgent evaluation regardless of the total.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Routine depression screening in primary care",
      "Assessment of patients with low mood, anhedonia, fatigue, or sleep disturbance",
      "Monitoring response to depression treatment",
      "Patients with chronic illness associated with depression",
    ],
    whenNotToUse: [
      "As a standalone diagnostic instrument without clinical assessment",
      "To grade symptoms in patients who cannot comprehend the questionnaire (severe cognitive impairment, language barriers)",
      "In acute emergencies — a positive suicide screen requires immediate action, not delayed scoring",
    ],
    limitations: [
      "Self-report may under- or over-estimate symptom severity.",
      "A score of 10 identifies probable depression; the diagnosis requires clinical confirmation.",
      "Somatic symptoms (fatigue, sleep disturbance) may reflect physical illness rather than depression.",
    ],
    example: {
      description:
        "A 46-year-old woman reports two weeks of low mood and loss of interest. She scores 2 (more than half the days) for anhedonia and depressed mood, 3 for sleep disturbance, 2 for fatigue, 1 for appetite change, 0 for guilt, 2 for poor concentration, and 1 for slowed movements; she denies suicidal ideation (item 9 = 0).",
      inputs: {
        phq1: "2",
        phq2: "2",
        phq3: "3",
        phq4: "2",
        phq5: "1",
        phq6: "0",
        phq7: "2",
        phq8: "1",
        phq9: "0",
      },
      expectedResult:
        "PHQ-9 = 2 + 2 + 3 + 2 + 1 + 0 + 2 + 1 + 0 = 13/27 — MODERATE depressive symptoms. A score ≥ 10 supports initiating treatment (e.g., antidepressant and/or psychotherapy) with close follow-up.",
    },
    clinicalSignificance:
      "The PHQ-9 is the most widely used brief depression severity measure; its validated cut-point of 10 makes it a practical case-finding and monitoring tool that directly quantifies each DSM-5 depressive criterion and screens for suicidal ideation.",
    references: [
      {
        citation:
          "Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.",
        level: "Validation study",
        url: "https://doi.org/10.1046/j.1525-1497.2001.016009606.x",
      },
      {
        citation:
          "Spitzer RL, Kroenke K, Williams JB. Validation and utility of a self-report version of PRIME-MD: the PHQ primary care study. JAMA. 1999;282(18):1737-1744.",
        level: "Primary care validation",
      },
    ],
    faq: [
      {
        question: "When should I act on item 9?",
        answer:
          "Any endorsement of item 9 (thoughts of being better off dead or of self-harm), even a score of 1, warrants an immediate, direct suicide risk assessment and urgent management.",
      },
      {
        question: "How much change on the PHQ-9 is clinically meaningful?",
        answer:
          "A change of 5 points is the conventional minimal clinically important difference when monitoring treatment response.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The PHQ-9 is a screening instrument, not a substitute for a clinical diagnostic assessment; any concern for self-harm requires immediate evaluation.",
  },

  "gad-7": {
    clinicalPurpose:
      "Screens for and grades the severity of generalized anxiety symptoms over the previous two weeks, guiding identification and treatment decisions in primary care and general medicine.",
    howToUse: [
      "Ask the patient to rate each of the seven symptoms for the past two weeks (0 = not at all to 3 = nearly every day).",
      "Sum the seven item scores to obtain the GAD-7 total (0–21).",
      "Interpret using the cut-point of 10 and the severity bands.",
    ],
    interpretation: {
      guide:
        "Total 0–4 = minimal, 5–9 = mild, 10–14 = moderate, and 15–21 = severe anxiety. A cut-point of 10 maximizes sensitivity (~89%) and specificity (~82%) for generalized anxiety disorder.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Routine anxiety screening in primary care",
      "Patients with worry, restlessness, irritability, or sleep disturbance",
      "Monitoring response to anxiety treatment",
      "Assessing anxiety comorbid with depression (with the PHQ-9)",
    ],
    whenNotToUse: [
      "As a standalone diagnostic instrument",
      "To distinguish among anxiety disorders (panic disorder, social anxiety, OCD, specific phobia)",
      "In patients who cannot understand or complete self-report scales",
    ],
    limitations: [
      "Focuses on generalized anxiety and may miss other anxiety disorders.",
      "Physical symptoms and medication side effects can elevate scores.",
      "Screening positive requires clinical confirmation.",
    ],
    example: {
      description:
        "A 34-year-old man reports two weeks of persistent worry and tension. He scores 2 for feeling nervous and for being unable to stop worrying, 3 for worrying too much, 1 for trouble relaxing, 2 for restlessness, 0 for irritability, and 1 for a feeling that something awful may happen.",
      inputs: {
        gad1: "2",
        gad2: "2",
        gad3: "3",
        gad4: "1",
        gad5: "2",
        gad6: "0",
        gad7: "1",
      },
      expectedResult:
        "GAD-7 = 2 + 2 + 3 + 1 + 2 + 0 + 1 = 11/21 — MODERATE anxiety symptoms. A score ≥ 10 supports the diagnosis of generalized anxiety disorder and initiation of treatment.",
    },
    clinicalSignificance:
      "The GAD-7 provides a brief, reliable measure of anxiety severity whose cut-point of 10 enables efficient case-finding and treatment monitoring, filling a key gap in primary care mental health screening.",
    references: [
      {
        citation:
          "Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
        level: "Validation study",
        url: "https://doi.org/10.1001/archinte.166.10.1092",
      },
      {
        citation:
          "Kroenke K, Spitzer RL, Williams JB, Monahan PO, Löwe B. Anxiety disorders in primary care: prevalence, impairment, comorbidity, and detection. Ann Intern Med. 2007;146(5):317-325.",
        level: "Primary care cohort",
      },
    ],
    faq: [
      {
        question: "Does a high GAD-7 mean the patient has generalized anxiety disorder?",
        answer:
          "Not necessarily. A score ≥ 10 indicates probable GAD and warrants treatment consideration, but the diagnosis is confirmed clinically, and other anxiety disorders must be considered.",
      },
      {
        question: "Should I screen for anxiety and depression together?",
        answer:
          "Yes — anxiety and depression frequently co-occur. Administering the GAD-7 alongside the PHQ-9 provides a more complete mental health assessment.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The GAD-7 is a screening tool and does not replace clinical assessment or exclude other anxiety disorders.",
  },

  "epworth": {
    clinicalPurpose:
      "Quantifies the general level of daytime sleepiness, supporting the evaluation of sleep disorders such as obstructive sleep apnea and narcolepsy.",
    howToUse: [
      "Ask the patient to rate the chance of dozing in each of the eight situations, comparing the score against their usual level of sleepiness (not after sleep deprivation).",
      "Sum the eight item scores (0–3 each) to obtain the ESS total (0–24).",
      "Interpret using the normal, mild, moderate, and severe bands.",
    ],
    interpretation: {
      guide:
        "0–10 = normal daytime sleepiness; 11–14 = mild; 15–17 = moderate; ≥ 18 = severe excessive daytime sleepiness. Scores of 11 or more warrant evaluation for sleep disorders, particularly obstructive sleep apnea.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Evaluation of suspected obstructive sleep apnea",
      "Patients reporting daytime fatigue or sleepiness",
      "Preoperative risk assessment in patients at risk for sleep apnea",
      "Monitoring sleepiness over time",
    ],
    whenNotToUse: [
      "To measure fatigue or lack of energy (it measures sleep propensity)",
      "To diagnose sleep apnea without objective testing",
      "To grade insomnia severity",
    ],
    limitations: [
      "Self-report of sleep propensity correlates imperfectly with objective sleep latency.",
      "Patients with insomnia may score low despite significant impairment.",
      "The scale does not capture sleepiness in all settings.",
    ],
    example: {
      description:
        "A 52-year-old man with loud snoring and observed apneas rates his chance of dozing as 3 when reading, 3 watching TV, 2 in a meeting, 2 as a car passenger, 2 lying down in the afternoon, 1 while talking, 1 after lunch, and 0 in traffic.",
      inputs: {
        ess1: "3",
        ess2: "3",
        ess3: "2",
        ess4: "2",
        ess5: "2",
        ess6: "1",
        ess7: "1",
        ess8: "0",
      },
      expectedResult:
        "ESS = 3 + 3 + 2 + 2 + 2 + 1 + 1 + 0 = 14/24 — MILD excessive daytime sleepiness, supporting further evaluation for obstructive sleep apnea.",
    },
    clinicalSignificance:
      "The Epworth Sleepiness Scale is the standard bedside measure of sleep propensity; an elevated score flags clinically significant daytime sleepiness that may indicate treatable sleep-disordered breathing and carries driving-safety implications.",
    references: [
      {
        citation:
          "Johns MW. A new method for measuring daytime sleepiness: the Epworth sleepiness scale. Sleep. 1991;14(6):540-545.",
        level: "Original description",
        url: "https://doi.org/10.1093/sleep/14.6.540",
      },
      {
        citation:
          "Johns MW. Daytime sleepiness, snoring, and obstructive sleep apnea. The Epworth Sleepiness Scale. Chest. 1993;103(1):30-36.",
        level: "Clinical correlation",
      },
    ],
    faq: [
      {
        question: "What should I do with an ESS of 11 or more?",
        answer:
          "Refer the patient for sleep medicine evaluation and objective testing (polysomnography or home sleep apnea testing) when clinically indicated, and discuss driving safety.",
      },
      {
        question: "Can the ESS be normal in sleep apnea?",
        answer:
          "Yes. Some patients with obstructive sleep apnea, especially those without perceived sleepiness, score within the normal range.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The ESS is a screening measure of sleep propensity; a diagnosis of sleep apnea requires objective sleep testing, and driving safety must always be addressed.",
  },

  "stop-bang": {
    clinicalPurpose:
      "Rapidly estimates the pretest probability of obstructive sleep apnea (OSA) from history and physical examination findings, guiding the need for objective sleep testing.",
    howToUse: [
      "Answer each of the eight items (Snoring, Tiredness, Observed apnea, high blood Pressure, BMI > 35 kg/m², Age > 50, Neck circumference > 40 cm, male Gender) as yes or no.",
      "Count the number of yes answers to obtain the STOP-BANG total (0–8).",
      "Interpret the risk category and arrange testing when indicated.",
    ],
    interpretation: {
      guide:
        "0–2 = low, 3–4 = intermediate, and 5–8 = high probability of OSA. A score ≥ 3 is ~93% sensitive for moderate and 100% sensitive for severe OSA, so low scores help rule out clinically significant disease, while high scores warrant confirmatory testing.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Screening for OSA in patients with snoring, fatigue, or witnessed apnea",
      "Preoperative evaluation for anesthesia planning",
      "Risk stratification in suspected sleep-disordered breathing",
    ],
    whenNotToUse: [
      "As a diagnostic test for OSA",
      "To exclude mild OSA or central sleep apnea",
      "In pediatric populations (not validated in children)",
    ],
    limitations: [
      "Lower specificity means many screening-positive patients will not have moderate-to-severe OSA on testing.",
      "Validated largely in surgical and sleep-clinic populations.",
      "Requires accurate measurement of BMI and neck circumference.",
    ],
    example: {
      description:
        "A 58-year-old man with treated hypertension reports loud snoring and daytime sleepiness; his wife has witnessed him stop breathing at night. His BMI is 32 kg/m², neck circumference 38 cm, and he is over 50 and male.",
      inputs: {
        snoring: "yes",
        tired: "yes",
        observedApnea: "no",
        bloodPressure: "yes",
        bmi: "no",
        age: "yes",
        neck: "no",
        gender: "yes",
      },
      expectedResult:
        "STOP-BANG = 5/8 (snoring, tiredness, blood pressure, age, gender) — HIGH probability of moderate-to-severe OSA, warranting objective testing (polysomnography or home sleep apnea test).",
    },
    clinicalSignificance:
      "The STOP-BANG score is one of the most widely used OSA screening tools; its high sensitivity at a threshold of 3 makes it an effective rule-out instrument and its graded scores stratify risk to guide diagnostic testing and perioperative management.",
    references: [
      {
        citation:
          "Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology. 2008;108(5):812-821.",
        level: "Original description",
        url: "https://doi.org/10.1097/ALN.0b013e31816d83e4",
      },
      {
        citation:
          "Chung F, Subramanyam R, Liao P, Sasaki E, Shapiro C, Sun Y. High STOP-Bang score indicates a high probability of obstructive sleep apnoea. Br J Anaesth. 2012;108(5):768-775.",
        level: "Large-cohort validation",
        url: "https://doi.org/10.1093/bja/aes022",
      },
    ],
    faq: [
      {
        question: "Is a STOP-BANG of 5 diagnostic of sleep apnea?",
        answer:
          "No. It indicates a high probability of moderate-to-severe OSA and warrants confirmatory testing, but it does not by itself establish the diagnosis.",
      },
      {
        question: "Can I use STOP-BANG to rule out OSA preoperatively?",
        answer:
          "Yes — a score below 3 has strong negative predictive value for moderate-to-severe OSA and is commonly used in preoperative screening, but clinical judgment remains essential.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. A positive STOP-BANG screen requires objective confirmation with polysomnography or home sleep apnea testing before OSA is diagnosed or treated.",
  },

  "centor": {
    clinicalPurpose:
      "Estimates the probability of group A streptococcal (GAS) pharyngitis from clinical criteria and age, guiding decisions about rapid antigen testing and antibiotic use in sore throat.",
    howToUse: [
      "Confirm the patient has acute pharyngitis without clinical features suggesting a viral cause (cough, rhinorrhea, oral ulcers, hoarseness).",
      "Score 1 for each criterion present: fever > 38°C, absence of cough, tonsillar exudates or swelling, and tender anterior cervical lymphadenopathy.",
      "Apply the age adjustment (3–14 years +1, 15–44 years 0, ≥ 45 years −1) and read the total (clamped to 0–4).",
    ],
    interpretation: {
      guide:
        "0–1 = low GAS probability (~2.5–5%), no testing or antibiotics; 2–3 = intermediate (~11–28%), test with RADT (and culture in children/adolescents) and treat only if positive; 4 = high probability (~53%), confirm and treat only if positive per IDSA guidelines.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Acute sore throat in children and adults being assessed for GAS pharyngitis",
      "Supporting appropriate antibiotic stewardship in upper respiratory infections",
    ],
    whenNotToUse: [
      "Patients with a clear viral syndrome (cough, rhinorrhea, conjunctivitis, hoarseness, oral ulcers)",
      "Severe illness, peritonsillar abscess, or stridor — these need urgent evaluation regardless of the score",
      "Patients with rheumatic fever history, immune compromise, or recurrent GAS complications where empiric consideration may differ",
    ],
    limitations: [
      "Derivation probabilities come from a single large primary-care cohort and vary across settings.",
      "The score is validated for typical pharyngitis presentations.",
      "Testing and treatment policies differ by age group and local guidance.",
    ],
    example: {
      description:
        "A 28-year-old woman presents with severe sore throat, fever of 38.6°C, tonsillar exudates, and tender anterior cervical nodes, but no cough.",
      inputs: {
        fever: "yes",
        absenceOfCough: "yes",
        tonsillarExudates: "yes",
        cervicalAdenopathy: "yes",
        ageGroup: "0",
      },
      expectedResult:
        "Modified Centor = 4/4 (all four criteria, age 28 adds 0) — HIGH probability of GAS pharyngitis (~53%). Confirm with a rapid antigen test and/or culture and treat only if positive, per IDSA recommendations.",
    },
    clinicalSignificance:
      "The Modified Centor (McIsaac) score quantifies the pretest probability of GAS pharyngitis and is central to antibiotic stewardship — it identifies patients who benefit from testing while discouraging unnecessary antibiotic prescriptions at low scores.",
    references: [
      {
        citation:
          "McIsaac WJ, White D, Tannenbaum D, Low DE. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ. 1998;158(1):75-83.",
        level: "Derivation and validation",
        url: "https://www.cmaj.ca/content/158/1/75",
      },
      {
        citation:
          "Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-246.",
        level: "Original criteria",
      },
      {
        citation:
          "Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):e86-e102.",
        level: "Clinical practice guideline",
        url: "https://doi.org/10.1093/cid/cis629",
      },
    ],
    faq: [
      {
        question: "What is the difference between Centor and McIsaac scores?",
        answer:
          "The Centor criteria score four clinical features; the McIsaac modification adds an age adjustment and is the version recommended for guiding testing decisions in both children and adults.",
      },
      {
        question: "Should a patient with all four criteria be treated without a test?",
        answer:
          "Current IDSA guidelines recommend confirming GAS with a rapid antigen test and/or culture and treating only if positive, even when the clinical score is 4.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The Modified Centor score estimates GAS probability and must be combined with clinical assessment and local testing/treatment policies; it is not a substitute for the IDSA pharyngitis guideline.",
  },

  "charlson": {
    clinicalPurpose:
      "Quantifies comorbid disease burden from a weighted list of conditions plus age, providing an estimate of ten-year survival that supports prognosis, research adjustment, and treatment planning.",
    howToUse: [
      "Select the age band and answer yes/no for each of the 19 comorbidity items from the patient's current record.",
      "The calculator sums the comorbidity weights and adds the age adjustment to give the age-adjusted CCI.",
      "Read the estimated ten-year survival and severity band.",
    ],
    interpretation: {
      guide:
        "0 = no comorbidity burden; 1–2 = low; 3–4 = moderate; ≥ 5 = high. Estimated ten-year survival follows 0.983^e^(0.9 × score): ~96% at 1, ~90% at 2, ~77% at 3, ~53% at 4, ~21% at 5. The index predicts group outcomes, not individual survival.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Estimating prognosis in patients with multiple comorbidities",
      "Case-mix adjustment in clinical research and quality comparisons",
      "Supporting discussions of treatment intensity and goals of care",
    ],
    whenNotToUse: [
      "To predict an individual patient's survival",
      "As the sole basis for withholding treatment",
      "To capture frailty or functional status, which it does not measure",
    ],
    limitations: [
      "Derived from 1980s inpatient cohorts and does not account for modern treatments.",
      "Requires complete documentation; missing conditions lower the score.",
      "Does not include frailty, functional, or cognitive status.",
    ],
    example: {
      description:
        "A 75-year-old man with prior myocardial infarction and congestive heart failure also has diabetes without end-organ damage.",
      inputs: {
        ageGroup: "3",
        myocardialInfarction: "yes",
        congestiveHeartFailure: "yes",
        peripheralVascularDisease: "no",
        cerebrovascularDisease: "no",
        dementia: "no",
        chronicPulmonaryDisease: "no",
        connectiveTissueDisease: "no",
        pepticUlcer: "no",
        mildLiverDisease: "no",
        diabetesNoComplications: "yes",
        hemiplegia: "no",
        moderateSevereRenalDisease: "no",
        diabetesEndOrganDamage: "no",
        anyMalignancy: "no",
        leukemia: "no",
        lymphoma: "no",
        moderateSevereLiverDisease: "no",
        metastaticSolidTumor: "no",
        aids: "no",
      },
      expectedResult:
        "CCI = 3 (MI 1 + CHF 1 + diabetes 1) + 3 (age 70–79) = 6 — HIGH comorbidity burden with an estimated ten-year survival of approximately 2%. This supports careful weighing of goals of care.",
    },
    clinicalSignificance:
      "The Charlson Comorbidity Index is the most widely used comorbidity measure in clinical research; its age-adjusted form provides a reproducible estimate of mortality risk that helps contextualize prognosis and adjust for case mix.",
    references: [
      {
        citation:
          "Charlson ME, Pompei P, Ales KL, MacKenzie CR. A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chronic Dis. 1987;40(5):373-383.",
        level: "Original derivation and validation",
        url: "https://doi.org/10.1016/0021-9681(87)90171-8",
      },
      {
        citation:
          "Charlson M, Szatrowski TP, Peterson J, Gold J. Validation of a combined comorbidity index. J Clin Epidemiol. 1994;47(11):1245-1251.",
        level: "Age-adjusted validation",
        url: "https://doi.org/10.1016/0895-4356(94)90129-5",
      },
    ],
    faq: [
      {
        question: "Should I use the age-adjusted CCI or the raw score?",
        answer:
          "Use the age-adjusted CCI when estimating ten-year survival, since the exponential survival model was validated with the age adjustment included.",
      },
      {
        question: "Why is metastatic cancer and AIDS weighted 6?",
        answer:
          "Because these conditions carried the highest relative risks of one-year mortality in the derivation cohort, so they receive the highest weight in the index.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The CCI predicts population-level mortality risk and must not be used to forecast an individual patient's outcome or to make treatment decisions in isolation.",
  },

  "barthel": {
    clinicalPurpose:
      "Measures functional independence in ten activities of daily living, providing an objective disability score for rehabilitation, geriatric care, and stroke services.",
    howToUse: [
      "Select the descriptor that matches the patient's actual current performance for each of the ten activities.",
      "Sum the item scores to obtain the Barthel total (0–100).",
      "Interpret the dependence band and use serial scores to track functional change.",
    ],
    interpretation: {
      guide:
        "100 = independent; 91–99 = slight dependence; 61–90 = moderate dependence; 21–60 = severe dependence; 0–20 = total dependence. The scale measures physical ADL performance, not cognition or caregiver burden.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Baseline and serial functional assessment after stroke",
      "Admission and discharge assessment in rehabilitation",
      "Geriatric assessment of dependency and care needs",
      "Measuring outcomes in clinical services",
    ],
    whenNotToUse: [
      "To assess cognitive function or communication",
      "To measure instrumental ADLs (shopping, finances, transport)",
      "As the sole tool for discharge planning — combine with social and caregiver assessment",
    ],
    limitations: [
      "Ceiling and floor effects limit sensitivity at the extremes.",
      "Different versions (original vs. Shah-modified) are not directly interchangeable.",
      "Does not capture quality of life or patient-perceived disability.",
    ],
    example: {
      description:
        "A 68-year-old woman one month after a moderate stroke is independent in feeding, dressing, bowels, toilet use, and stairs; needs help with grooming, bladder control, transfers, and walking, and is fully dependent for bathing.",
      inputs: {
        feeding: "5",
        bathing: "0",
        grooming: "5",
        dressing: "10",
        bowels: "10",
        bladder: "5",
        toiletUse: "10",
        transfers: "15",
        mobility: "10",
        stairs: "5",
      },
      expectedResult:
        "Barthel Index = 5 + 0 + 5 + 10 + 10 + 5 + 10 + 15 + 10 + 5 = 75/100 — MODERATE dependence, indicating the need for assistance with daily activities and structured rehabilitation.",
    },
    clinicalSignificance:
      "The Barthel Index is a widely used, reliable measure of ADL independence whose serial scoring documents functional recovery after stroke and in rehabilitation, guiding therapy intensity and discharge planning.",
    references: [
      {
        citation:
          "Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-65.",
        level: "Original scale",
      },
      {
        citation:
          "Shah S, Vanclay F, Cooper B. Improving the sensitivity of the Barthel Index for stroke rehabilitation. J Clin Epidemiol. 1989;42(8):703-709.",
        level: "Modified scoring validation",
        url: "https://doi.org/10.1016/0895-4356(89)90065-6",
      },
      {
        citation:
          "Collin C, Wade DT, Davies S, Horne V. The Barthel ADL Index: a reliability study. Int Disabil Stud. 1988;10(2):61-63.",
        level: "Reliability study",
      },
    ],
    faq: [
      {
        question: "What score indicates the patient is ready for discharge?",
        answer:
          "There is no universal cut-off; discharge readiness depends on the care environment. Scores in the 61–90 range indicate moderate dependence requiring some support, while higher scores suggest greater independence.",
      },
      {
        question: "Is the Barthel Index suitable for people with dementia?",
        answer:
          "It measures physical ADL performance and can be completed by an observer, but it does not assess cognition — use it alongside cognitive screening.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. The Barthel Index quantifies physical ADL dependence and should be used with clinical judgment and broader functional, social, and caregiver assessment.",
  },

  "ecog": {
    clinicalPurpose:
      "Grades a patient's functional performance status on a single 0–5 scale, guiding chemotherapy eligibility, treatment intensity, and prognosis in oncology and serious chronic illness.",
    howToUse: [
      "Select the grade that best describes the patient's current functional status.",
      "Use grades 0–1 as the conventional eligibility threshold for most intensive chemotherapy regimens and clinical trials.",
      "Re-assess the grade at each treatment decision point.",
    ],
    interpretation: {
      guide:
        "0 = fully active; 1 = restricted in strenuous activity but ambulatory; 2 = ambulatory, capable of self-care, unable to work; 3 = limited self-care, bed/chair-bound > 50% of waking hours; 4 = completely disabled; 5 = dead. ECOG 0–1 is the usual threshold for intensive treatment.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Determining eligibility for chemotherapy and clinical trials",
      "Adjusting treatment intensity in oncology",
      "Estimating prognosis in advanced illness",
      "Functional assessment in geriatric medicine",
    ],
    whenNotToUse: [
      "As the only measure of eligibility — clinical, laboratory, and patient-preference factors also matter",
      "To measure cognitive function or specific disability",
      "To replace a comprehensive geriatric assessment in older adults",
    ],
    limitations: [
      "Physician-rated and may under-represent patient-perceived impairment.",
      "A single snapshot may not capture a rapidly changing clinical course.",
      "Inter-rater variability exists despite its simplicity.",
    ],
    example: {
      description:
        "A 61-year-old woman with newly diagnosed metastatic colon cancer is ambulatory, manages all self-care, and can do light housework but is unable to return to her previous full-time work.",
      inputs: {
        grade: "2",
      },
      expectedResult:
        "ECOG = 2/5 — AMBULATORY, capable of all self-care but unable to work. Many regimens and some trials accept ECOG 0–2; treatment intensity and expected tolerance should be weighed.",
    },
    clinicalSignificance:
      "ECOG performance status is one of the strongest single predictors of treatment tolerance and survival in cancer patients, and its routine use standardizes functional assessment across oncology practice and research.",
    references: [
      {
        citation:
          "Oken MM, Creech RH, Tormey DC, et al. Toxicity and response criteria of the Eastern Cooperative Oncology Group. Am J Clin Oncol. 1982;5(6):649-655.",
        level: "Original scale",
        url: "https://doi.org/10.1097/00000421-198212000-00014",
      },
      {
        citation:
          "Zubrod CG, Schneiderman M, Frei E, et al. Appraisal of methods for the study of chemotherapy of cancer in man: comparative therapeutic trial of nitrogen mustard and triethylene thiophosphoramide. J Chronic Dis. 1960;11(1):7-33.",
        level: "Precursor (Zubrod) scale",
        url: "https://doi.org/10.1016/0021-9681(60)90137-5",
      },
    ],
    faq: [
      {
        question: "Why is ECOG 0–1 used for most trials?",
        answer:
          "Patients with ECOG 0–1 tolerate chemotherapy better and have more favorable outcomes, so trials standardize this threshold to reduce heterogeneity and improve safety.",
      },
      {
        question: "How does ECOG compare to the Karnofsky score?",
        answer:
          "ECOG uses six grades (0–5); Karnofsky uses percentages (100–0). Common cross-walks: ECOG 0 ≈ KPS 100, ECOG 1 ≈ 80–90, ECOG 2 ≈ 60–70, ECOG 3 ≈ 40–50, ECOG 4 ≈ 10–30.",
      },
    ],
    disclaimer:
      "This calculator is for educational and clinical decision support. ECOG performance status is one input into treatment decisions, which must be individualized with clinical judgment and the patient's goals and preferences.",
  },

  "meld-score": {
    clinicalPurpose:
      "Calculates the Model for End-stage Liver Disease (MELD) score to estimate 3-month mortality in adults with chronic liver disease and to guide liver transplant prioritization.",
    howToUse: [
      "Use the most recent serum bilirubin, creatinine, and INR from the same clinical assessment.",
      "Indicate whether the patient has been on dialysis at least twice in the past week — the calculator sets creatinine to 4 mg/dL in that case, per UNOS convention.",
      "Note that bilirubin and INR are floored at 1 and non-dialysis creatinine is capped at 4 mg/dL before scoring.",
      "Review the score against the mortality-risk bands and the patient's clinical trajectory.",
    ],
    interpretation: {
      guide:
        "MELD <10 indicates low 3-month mortality risk; 10–19 moderate; 20–29 high; 30–39 very high; ≥40 extremely high risk. Higher scores warrant expedited transplant evaluation.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Liver transplant listing and risk stratification",
      "Prognosis in decompensated cirrhosis",
      "Serial monitoring of disease severity over time",
      "Risk stratification before major interventions in cirrhotic patients",
    ],
    whenNotToUse: [
      "Acute liver failure, which uses dedicated criteria rather than MELD",
      "Pediatric patients, where PELD-based scores apply",
      "As a substitute for a full clinical assessment, including ascites and encephalopathy",
      "Solely to predict outcomes in non-liver surgical procedures",
    ],
    limitations: [
      "Does not include ascites or hepatic encephalopathy, which carry independent prognostic information.",
      "Creatinine depends on muscle mass, so MELD may under-estimate risk in low-muscle-mass patients.",
      "INR assays vary between laboratories, affecting reproducibility.",
      "The score is validated for chronic liver disease, not acute liver failure.",
    ],
    example: {
      description:
        "A 55-year-old man with decompensated alcoholic cirrhosis is being evaluated for transplant listing. Bilirubin is 2.5 mg/dL, creatinine 1.2 mg/dL, INR 1.5, and he is not on dialysis.",
      inputs: {
        bilirubin: "2.5",
        creatinine: "1.2",
        inr: "1.5",
        dialysis: "no",
      },
      expectedResult:
        "MELD = 3.78×ln(2.5) + 11.2×ln(1.5) + 9.57×ln(1.2) + 6.43 ≈ 16 — moderate 3-month mortality risk (band 10–19).",
    },
    clinicalSignificance:
      "MELD is a well-validated mortality-risk score that estimates 3-month survival in chronic liver disease and historically underpinned liver transplant prioritization in the United States. Current U.S. liver allocation uses the MELD 3.0 model (adopted July 2023), which incorporates albumin, sex, and updated coefficients rather than the classic MELD formula.",
    references: [
      {
        citation: "Kamath PS, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. Classic MELD is a prognostic mortality-risk score; current U.S. liver allocation uses the MELD 3.0 model. Transplant decisions must incorporate the full clinical picture and institutional policies.",
  },

  "meld-na-score": {
    clinicalPurpose:
      "Calculates the MELD-Na score, which adds serum sodium to the MELD model to improve 3-month mortality prediction in advanced liver disease. MELD-Na is a widely used prognostic model for transplant waitlist mortality; U.S. liver allocation transitioned to the MELD 3.0 model in July 2023.",
    howToUse: [
      "Enter the most recent serum bilirubin, creatinine, INR, and sodium.",
      "Indicate whether the patient has been on dialysis at least twice in the past week (creatinine is set to 4 mg/dL).",
      "Serum sodium is clamped between 125 and 137 mmol/L by the model before calculation.",
      "Review the score against the same mortality-risk bands used for MELD.",
    ],
    interpretation: {
      guide:
        "MELD-Na <10 indicates low 3-month mortality risk; 10–19 moderate; 20–29 high; 30–39 very high; ≥40 extremely high risk. Sodium below 137 mmol/L raises the score because hyponatremia worsens prognosis.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Transplant waitlist risk assessment in cirrhosis",
      "Prognosis in cirrhosis with hyponatremia",
      "Serial severity monitoring in decompensated liver disease",
    ],
    whenNotToUse: [
      "Acute liver failure, which is not modeled by MELD-Na",
      "Pediatric patients (PELD-based allocation applies)",
      "When serum sodium is unreliable, such as with recent aggressive diuresis or hypotonic fluid administration",
      "As a replacement for clinical assessment of ascites and encephalopathy",
    ],
    limitations: [
      "Sodium is clamped to a maximum of 137 mmol/L, so the score does not reward supra-normal sodium.",
      "Non-hepatic causes of hyponatremia (e.g., SIADH, diuretics) can bias the score.",
      "Retains the creatinine/INR caveats of the underlying MELD model.",
    ],
    example: {
      description:
        "A 60-year-old woman with cirrhosis and ascites is listed for transplant. Bilirubin is 2.5 mg/dL, creatinine 1.2 mg/dL, INR 1.5, sodium 130 mmol/L, and she is not on dialysis.",
      inputs: {
        bilirubin: "2.5",
        creatinine: "1.2",
        inr: "1.5",
        sodium: "130",
        dialysis: "no",
      },
      expectedResult:
        "MELD ≈ 16; MELD-Na = 16 + 1.32×(137−130) − 0.033×16×(137−130) ≈ 22 — high 3-month mortality risk (band 20–29).",
    },
    clinicalSignificance:
      "MELD-Na was adopted by UNOS for liver allocation because adding serum sodium improves mortality prediction compared with MELD alone, particularly in patients with hyponatremia. U.S. liver allocation transitioned to the MELD 3.0 model in July 2023.",
    references: [
      {
        citation: "Kim WR, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359:1018-1026.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. MELD-Na is one component of transplant evaluation; allocation decisions follow current institutional and UNOS/OPTN policy (MELD 3.0 in the United States).",
  },

  "fib-4-index": {
    clinicalPurpose:
      "Calculates the FIB-4 index, a non-invasive score using age, AST, ALT, and platelet count to estimate the probability of advanced liver fibrosis in chronic liver disease.",
    howToUse: [
      "Enter the patient's age, AST, ALT, and platelet count.",
      "Use steady-state liver enzymes rather than values from an acute hepatitis flare.",
      "Interpret the result against the 1.30 and 2.67 thresholds.",
      "For indeterminate results, consider additional testing such as elastography before referral decisions.",
    ],
    interpretation: {
      guide:
        "FIB-4 <1.30 indicates low probability of advanced fibrosis; 1.30–2.67 is indeterminate (intermediate risk); >2.67 indicates high probability of advanced fibrosis. Performance is reduced under age 35.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Screening for advanced fibrosis in NAFLD/MASLD and viral hepatitis",
      "Primary-care risk stratification before hepatology referral",
      "Serial follow-up of fibrosis risk in chronic liver disease",
    ],
    whenNotToUse: [
      "Patients younger than 35 years, where the score underperforms",
      "Acute hepatitis flares with rapidly changing transaminases",
      "Children and adolescents",
      "To replace elastography or biopsy when fibrosis staging is required",
    ],
    limitations: [
      "The indeterminate range (1.30–2.67) requires further evaluation and does not resolve the question alone.",
      "Age heavily influences the score, limiting accuracy at extremes.",
      "Thrombocytopenia from non-hepatic causes confounds the platelet component.",
    ],
    example: {
      description:
        "A 55-year-old man with metabolic dysfunction-associated steatohepatitis has AST 45 U/L, ALT 60 U/L, and platelets 200 ×10⁹/L.",
      inputs: {
        age: "55",
        ast: "45",
        alt: "60",
        platelets: "200",
      },
      expectedResult:
        "FIB-4 = (55 × 45) / (200 × √60) ≈ 1.6 — indeterminate risk (1.30–2.67); further assessment with elastography is reasonable.",
    },
    clinicalSignificance:
      "FIB-4 is a widely recommended first-line, inexpensive fibrosis risk tool that helps primary-care clinicians identify patients needing specialty evaluation without unnecessary liver biopsy.",
    references: [
      {
        citation: "Sterling RK, et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology. 2006;43:1317-1325.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. FIB-4 is a screening index and does not replace clinical evaluation or confirmatory fibrosis testing.",
  },

  "apri-score": {
    clinicalPurpose:
      "Calculates the AST-to-Platelet Ratio Index (APRI) to estimate the likelihood of significant liver fibrosis and cirrhosis from AST and platelet count, particularly in chronic hepatitis.",
    howToUse: [
      "Enter the patient's AST, the AST upper limit of normal (ULN) for the laboratory, and the platelet count.",
      "Confirm the correct local ULN, because the result scales directly with the ratio AST/ULN.",
      "Interpret the score against the 0.5, 1.5, and 2.0 thresholds.",
    ],
    interpretation: {
      guide:
        "APRI <0.5 indicates low likelihood of significant fibrosis; 0.5–1.5 intermediate probability; >1.5 significant fibrosis is likely; >2.0 is suggestive of cirrhosis.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Non-invasive fibrosis estimation in chronic hepatitis, especially HCV",
      "WHO-endorsed fibrosis screening in resource-limited settings",
      "Risk stratification where elastography is unavailable",
    ],
    whenNotToUse: [
      "Acute hepatitis with a transient AST flare",
      "Thrombocytopenia due to non-portal-hypertension causes",
      "Children and adolescents",
      "When the laboratory AST ULN is uncertain",
    ],
    limitations: [
      "The result depends on the chosen AST ULN, which varies between laboratories.",
      "Accuracy is lowest in the intermediate band (0.5–1.5).",
      "Platelet disorders unrelated to fibrosis confound the score.",
      "The model is best validated in chronic hepatitis C.",
    ],
    example: {
      description:
        "A 48-year-old man with chronic hepatitis C has AST 120 U/L, an AST upper limit of normal of 40 U/L, and platelets 150 ×10⁹/L.",
      inputs: {
        ast: "120",
        uln: "40",
        platelets: "150",
      },
      expectedResult:
        "APRI = ((120 / 40) × 100) / 150 = 2.0 — significant fibrosis is likely, bordering the cirrhosis threshold (>2.0).",
    },
    clinicalSignificance:
      "APRI is a simple, laboratory-only index endorsed by WHO for fibrosis screening in chronic hepatitis, enabling risk stratification in settings without access to elastography.",
    references: [
      {
        citation: "Wai CT, et al. A simple noninvasive index can predict both significant fibrosis and cirrhosis in patients with chronic hepatitis C. Hepatology. 2003;38:518-526.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. APRI is a screening index; fibrosis stage should be confirmed with further testing when clinically indicated.",
  },

  "rockall-score": {
    clinicalPurpose:
      "Calculates the Rockall score to predict mortality and the risk of rebleeding after acute upper gastrointestinal bleeding using clinical and endoscopic findings.",
    howToUse: [
      "Select the age band, shock category, comorbidity, endoscopic diagnosis, and major stigmata of recent hemorrhage.",
      "The full Rockall score requires endoscopic findings, so complete it after endoscopy.",
      "Interpret the total score against the 0–2, 3–4, and ≥5 bands.",
    ],
    interpretation: {
      guide:
        "Rockall 0–2 indicates low risk of mortality and rebleeding; 3–4 moderate risk with close monitoring; ≥5 high risk of mortality and recurrent bleeding requiring urgent specialist management.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Post-endoscopy risk stratification in upper GI bleeding",
      "Estimating mortality in hospitalized patients with UGIB",
      "Guiding the intensity of monitoring and follow-up endoscopy",
    ],
    whenNotToUse: [
      "Pre-endoscopy triage in the emergency department, where scores such as the Glasgow-Blatchford are used",
      "Isolated lower GI bleeding",
      "Children",
    ],
    limitations: [
      "The full score requires endoscopic findings and cannot be completed before endoscopy.",
      "Comorbidity weighting is coarse and may under-represent complex illness.",
      "It predicts mortality/rebleeding but was not designed to decide pre-endoscopy admission.",
    ],
    example: {
      description:
        "An 82-year-old man presents with hematemesis. He is tachycardic but not hypotensive. Endoscopy shows a non-bleeding ulcer without major stigmata.",
      inputs: {
        age: "2",
        shock: "1",
        comorbidity: "0",
        diagnosis: "1",
        stigmata: "0",
      },
      expectedResult:
        "Rockall score = 2 + 1 + 0 + 1 + 0 = 4 — moderate risk of mortality and rebleeding; close monitoring is recommended.",
    },
    clinicalSignificance:
      "The Rockall score is a well-validated tool for predicting mortality after upper GI bleeding and complements pre-endoscopy scores such as the Glasgow-Blatchford score.",
    references: [
      {
        citation: "Rockall TA, et al. Risk assessment after acute upper gastrointestinal haemorrhage. Gut. 1996;38:316-321.",
        level: "Original score",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. Risk scores inform but do not replace clinical judgment in the management of upper GI bleeding.",
  },

  "glasgow-blatchford-score": {
    clinicalPurpose:
      "Calculates the Glasgow-Blatchford score to predict the need for endoscopic intervention, transfusion, or death in patients presenting with suspected upper gastrointestinal bleeding.",
    howToUse: [
      "Enter BUN, hemoglobin, systolic blood pressure, and pulse from the presentation.",
      "Indicate the presence of melena, syncope, known hepatic disease, and known cardiac failure.",
      "A score of 0 identifies very low-risk patients in whom outpatient management may be appropriate.",
    ],
    interpretation: {
      guide:
        "Glasgow-Blatchford 0 indicates very low risk, and outpatient management may be appropriate; 1–5 low risk with hospital assessment; 6–12 moderate risk with endoscopic evaluation; ≥13 high risk requiring urgent resuscitation and endoscopy.",
      sexSpecific: true,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Emergency department triage of suspected upper GI bleeding",
      "Deciding between admission and outpatient management",
      "Pre-endoscopy risk stratification",
    ],
    whenNotToUse: [
      "Established variceal bleeding, where portal-hypertension-specific scores apply",
      "Melena of uncertain gastrointestinal origin",
      "Children",
    ],
    limitations: [
      "BUN can be elevated by prerenal states unrelated to bleeding, inflating the score.",
      "The score estimates the need for intervention rather than predicting rebleeding.",
      "Validated chiefly in acute non-variceal upper GI bleeding.",
    ],
    example: {
      description:
        "A 58-year-old man with melena has BUN 35 mg/dL, hemoglobin 10.5 g/dL, SBP 105 mmHg, pulse 105 bpm, no syncope, and no known hepatic or cardiac disease.",
      inputs: {
        bun: "35",
        hemoglobin: "10.5",
        sex: "male",
        sbp: "105",
        pulse: "105",
        melena: "yes",
        syncope: "no",
        hepatic: "no",
        cardiac: "no",
      },
      expectedResult:
        "Glasgow-Blatchford score = 4 (BUN) + 3 (hemoglobin) + 1 (SBP) + 1 (pulse) + 1 (melena) = 10 — moderate risk; endoscopic evaluation is recommended.",
    },
    clinicalSignificance:
      "A Glasgow-Blatchford score of 0 is supported by NICE guidance as identifying patients safe for outpatient management, helping avoid unnecessary admissions in low-risk upper GI bleeding.",
    references: [
      {
        citation: "Blatchford O, et al. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356:1318-1321.",
        level: "Original score",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The Glasgow-Blatchford score supports triage decisions but does not replace clinical judgment.",
  },

  "maddrey-discriminant-function": {
    clinicalPurpose:
      "Calculates the Maddrey Discriminant Function to identify severe alcoholic hepatitis, in which corticosteroid therapy may be considered.",
    howToUse: [
      "Enter the patient's prothrombin time, the control (reference) prothrombin time, and total bilirubin.",
      "The score uses the difference between patient and control prothrombin times.",
      "A value ≥32 defines severe alcoholic hepatitis and triggers consideration of corticosteroids if no contraindications exist.",
    ],
    interpretation: {
      guide:
        "MDF <32 indicates mild alcoholic hepatitis with a less ominous short-term prognosis; MDF ≥32 indicates severe alcoholic hepatitis, where corticosteroid therapy should be considered in the absence of contraindications.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Suspected alcoholic hepatitis",
      "Identifying candidates for corticosteroid therapy",
      "Initial severity assessment in acute-on-chronic alcohol-related liver disease",
    ],
    whenNotToUse: [
      "Without a secure diagnosis of alcoholic hepatitis",
      "When corticosteroids are contraindicated",
      "Other causes of acute liver injury or cholestatic disease",
      "Children",
    ],
    limitations: [
      "Requires a control prothrombin time and is sensitive to laboratory variation.",
      "Diagnosis of alcoholic hepatitis itself rests on clinical and often biopsy-based criteria.",
      "The score does not capture treatment response, which is assessed separately (e.g., with the Lille score).",
    ],
    example: {
      description:
        "A 45-year-old man with heavy alcohol use and clinical alcoholic hepatitis has a prothrombin time of 20 seconds (control 13 seconds) and total bilirubin 8 mg/dL.",
      inputs: {
        patient_pt: "20",
        control_pt: "13",
        bilirubin: "8",
      },
      expectedResult:
        "MDF = 4.6 × (20 − 13) + 8 = 40.2 — severe alcoholic hepatitis (MDF ≥32); corticosteroid therapy should be considered if no contraindications exist.",
    },
    clinicalSignificance:
      "The MDF ≥32 threshold is the classic criterion for severe alcoholic hepatitis and remains central to deciding which patients may benefit from corticosteroid therapy.",
    references: [
      {
        citation: "Maddrey WC, et al. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978;75:193-199.",
        level: "Original score",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The diagnosis of alcoholic hepatitis and treatment decisions must be individualized with clinical judgment.",
  },

  "nafld-fibrosis-score": {
    clinicalPurpose:
      "Calculates the NAFLD Fibrosis Score to estimate the probability of advanced fibrosis non-invasively in patients with NAFLD/MASLD.",
    howToUse: [
      "Enter age, BMI, diabetes/impaired fasting glucose status, AST, ALT, platelet count, and albumin.",
      "Confirm the patient has a diagnosis of NAFLD/MASLD before applying the score.",
      "Interpret the result against the −1.455 and 0.676 thresholds.",
    ],
    interpretation: {
      guide:
        "NFS <−1.455 indicates low probability of advanced fibrosis; −1.455 to 0.676 is indeterminate; >0.676 indicates high probability of advanced fibrosis.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Risk-stratifying patients with NAFLD/MASLD in primary care",
      "Triaging which patients need hepatology referral",
      "Estimating advanced fibrosis risk when elastography is not available",
    ],
    whenNotToUse: [
      "Liver disease other than NAFLD/MASLD",
      "Acute liver injury with unstable transaminases",
      "Children and adolescents",
      "To stage fibrosis when indeterminate — confirm with elastography or biopsy",
    ],
    limitations: [
      "Accuracy is limited in the indeterminate band, which requires further evaluation.",
      "The diabetes/IFG input is binary and does not capture glycemic detail.",
      "Requires albumin measurement and is best validated in NAFLD cohorts.",
    ],
    example: {
      description:
        "A 58-year-old man with MASLD and type 2 diabetes has BMI 32 kg/m², AST 60 U/L, ALT 40 U/L, platelets 180 ×10⁹/L, and albumin 3.8 g/dL.",
      inputs: {
        age: "58",
        bmi: "32",
        diabetes: "1",
        ast: "60",
        alt: "40",
        platelets: "180",
        albumin: "3.8",
      },
      expectedResult:
        "NFS = −1.675 + 0.037(58) + 0.094(32) + 1.13(1) + 0.99(60/40) − 0.013(180) − 0.66(3.8) ≈ 1.246 — high probability of advanced fibrosis (>0.676).",
    },
    clinicalSignificance:
      "The NAFLD Fibrosis Score is an AASLD-endorsed, non-invasive tool that helps identify patients with NAFLD/MASLD at risk of advanced fibrosis, reducing unnecessary biopsies.",
    references: [
      {
        citation: "Angulo P, et al. The NAFLD fibrosis score: a noninvasive system that identifies liver fibrosis in patients with NAFLD. Hepatology. 2007;45:846-854.",
        level: "Original score",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The NAFLD Fibrosis Score is a screening tool and does not replace clinical evaluation or confirmatory fibrosis testing.",
  },

  "rox-index": {
    clinicalPurpose:
      "Calculates the ROX index, which combines oxygenation (SpO₂/FiO₂) with respiratory rate to estimate the likelihood that high-flow nasal cannula (HFNC) therapy will succeed or fail in adults with acute hypoxemic respiratory failure.",
    howToUse: [
      "Use only in patients already receiving high-flow nasal cannula (HFNC) therapy.",
      "Enter SpO₂ as a percentage (e.g., 92 for 92%), FiO₂ as a fraction (e.g., 0.6 for 60%), and the respiratory rate.",
      "The index is designed to be reassessed over time during the initial hours of HFNC therapy rather than used as a one-time definitive decision.",
      "Interpret the result together with the patient's clinical trajectory when deciding whether to continue or escalate respiratory support.",
    ],
    interpretation: {
      guide:
        "ROX ≥4.88 suggests a high likelihood of HFNC success with low risk of intubation; 3.85–4.87 indicates intermediate risk warranting close monitoring and reassessment; <3.85 indicates a high risk of HFNC failure and supports earlier consideration of escalation of respiratory support.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Adults with acute hypoxemic respiratory failure receiving HFNC",
      "Serial monitoring of HFNC response during the initial hours of therapy",
      "Supporting decisions about continuing HFNC versus escalating respiratory support",
    ],
    whenNotToUse: [
      "Patients not receiving HFNC therapy",
      "Children and neonates, where the index has not been validated in the same way as in adults",
      "As a standalone indication for immediate intubation without clinical assessment",
    ],
    limitations: [
      "The ROX index is a dynamic assessment and must be reassessed over time; a single value is not definitive.",
      "It was derived and validated primarily in adults with pneumonia-related acute hypoxemic respiratory failure.",
      "SpO₂-based ratios can be affected by hemoglobin level, peripheral perfusion, and measurement conditions.",
      "It does not replace clinical judgment or account for comorbidities, work of breathing, or overall trajectory.",
    ],
    example: {
      description:
        "A 68-year-old man with COVID-19 pneumonia on high-flow nasal cannula has SpO₂ 85% on FiO₂ 0.8 with a respiratory rate of 30 breaths/min.",
      inputs: {
        spo2: "85",
        fio2: "0.8",
        rr: "30",
      },
      expectedResult:
        "ROX = (85 / 0.8) / 30 ≈ 3.54 — high risk of HFNC failure; consider earlier escalation of respiratory support.",
    },
    clinicalSignificance:
      "The ROX index combines simple bedside measurements to help clinicians gauge the likelihood of HFNC success in acute hypoxemic respiratory failure, supporting earlier identification of patients who may require invasive mechanical ventilation.",
    references: [
      {
        citation: "Roca O, et al. Predicting success of high-flow nasal cannula in pneumonia patients with hypoxemic respiratory failure: The utility of the ROX index. J Crit Care. 2016;35:200-205.",
        level: "Original index",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The ROX index is one component of respiratory-failure assessment and must be interpreted with serial measurements and full clinical judgment.",
  },

  "pf-ratio": {
    clinicalPurpose:
      "Calculates the PaO₂/FiO₂ (P/F) ratio to quantify the degree of oxygenation impairment and to support classification of ARDS severity according to the Berlin Definition.",
    howToUse: [
      "Enter the arterial oxygen tension (PaO₂) in mmHg and the fraction of inspired oxygen (FiO₂) as a fraction (room air = 0.21).",
      "Use PaO₂ and FiO₂ measured concurrently, ideally from the same arterial blood gas.",
      "Recognize that formal Berlin ARDS classification requires the appropriate clinical context, including timing, bilateral opacities, and the required PEEP.",
    ],
    interpretation: {
      guide:
        "P/F >400 indicates normal oxygenation; 301–400 mild oxygenation impairment; 201–300 mild ARDS; 101–200 moderate ARDS; ≤100 severe ARDS. The ARDS bands apply when the broader Berlin criteria, including the appropriate PEEP and clinical context, are met.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Quantifying the degree of oxygenation impairment in hypoxemic patients",
      "Supporting ARDS severity classification within the appropriate clinical context",
      "Monitoring oxygenation trends in critically ill patients",
    ],
    whenNotToUse: [
      "As the sole criterion for an ARDS diagnosis, without the full Berlin Definition context",
      "When PaO₂ and FiO₂ are not measured concurrently",
      "In children, where pediatric-specific ARDS (PARDS) criteria apply",
    ],
    limitations: [
      "The P/F ratio varies with FiO₂, so values obtained at different FiO₂ levels are not directly comparable.",
      "Formal Berlin ARDS classification also requires timing of onset, bilateral infiltrates, and a PEEP of at least 5 cmH₂O, which this calculator does not capture.",
      "The Berlin Definition applies to adults; pediatric ARDS is classified separately.",
      "The P/F ratio alone does not identify the cause of hypoxemia.",
    ],
    example: {
      description:
        "A 62-year-old woman with pneumonia is intubated on FiO₂ 0.4 with a concurrent PaO₂ of 110 mmHg.",
      inputs: {
        pao2: "110",
        fio2: "0.4",
      },
      expectedResult:
        "P/F ratio = 110 / 0.4 = 275 — mild ARDS (Berlin Definition band 201–300, with appropriate PEEP).",
    },
    clinicalSignificance:
      "The P/F ratio is a standard bedside measure of oxygenation and, within the full Berlin Definition framework, is used to grade ARDS severity and guide the intensity of respiratory support.",
    references: [
      {
        citation: "ARDS Definition Task Force; Ranieri VM, et al. Acute respiratory distress syndrome: the Berlin definition. JAMA. 2012;307(23):2526-2533.",
        level: "Original classification",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The P/F ratio is a component of ARDS assessment and does not by itself establish the diagnosis of ARDS.",
  },

  "a-a-gradient": {
    clinicalPurpose:
      "Calculates the alveolar-arterial oxygen (A–a) gradient from an arterial blood gas to evaluate whether hypoxemia is explained by impaired gas exchange.",
    howToUse: [
      "Enter age, FiO₂ as a fraction, PaO₂, and PaCO₂ from the same arterial blood gas.",
      "The calculator assumes sea level (barometric pressure 760 mmHg) and a respiratory quotient of 0.8.",
      "Compare the result with the age-expected gradient (roughly age/4 + 4 mmHg).",
    ],
    interpretation: {
      guide:
        "The A–a gradient normally increases with age (roughly age/4 + 4 mmHg). A gradient within the expected range is more consistent with hypoventilation, while a gradient above the age-expected value suggests a pulmonary cause of hypoxemia such as ventilation/perfusion mismatch, diffusion impairment, or right-to-left shunt. The severity bands used by this calculator (mild, moderate, severe elevation relative to the age-expected value) are pragmatic thresholds for this tool, not standardized guideline cut-offs.",
      sexSpecific: false,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Evaluating the cause of hypoxemia on an arterial blood gas",
      "Distinguishing pulmonary gas-exchange abnormalities from pure hypoventilation",
      "Assessing gas exchange in the appropriate clinical context",
    ],
    whenNotToUse: [
      "When the assumed sea-level conditions do not apply (e.g., at altitude)",
      "When FiO₂ and PaCO₂ are not from the same blood gas",
      "As a standalone test of lung function or to quantify shunt severity without further investigation",
    ],
    limitations: [
      "Assumes sea level (760 mmHg), an FiO₂-derived inspired oxygen tension, and a respiratory quotient of 0.8; at altitude or with a different RQ the result will differ.",
      "The age-expected value and the calculator's severity bands are convenient clinical guides, not universally established guideline thresholds.",
      "Requires arterial sampling, and a normal gradient does not exclude pulmonary disease.",
      "The gradient alone cannot quantify the relative contributions of shunt, V/Q mismatch, or diffusion impairment.",
    ],
    example: {
      description:
        "A 55-year-old man with dyspnea has a room-air arterial blood gas: FiO₂ 0.21, PaO₂ 65 mmHg, PaCO₂ 30 mmHg.",
      inputs: {
        age: "55",
        fio2: "0.21",
        pao2: "65",
        paco2: "30",
      },
      expectedResult:
        "A–a gradient = [0.21 × (760 − 47) − 30/0.8] − 65 ≈ 47.2 mmHg — moderately elevated for age (expected ≈ 17.8 mmHg).",
    },
    clinicalSignificance:
      "The A–a gradient is a core ABG-derived measure that helps clinicians separate hypoxemia due to pulmonary gas-exchange abnormalities from hypoxemia due to hypoventilation alone.",
    references: [
      {
        citation: "West JB. Respiratory Physiology.",
        level: "Textbook",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The A–a gradient is one component of ABG interpretation and must be considered together with the clinical picture.",
  },

  "oxygen-index": {
    clinicalPurpose:
      "Calculates the Oxygen Index (OI), combining FiO₂, mean airway pressure, and PaO₂ to gauge the severity of oxygenation failure in mechanically ventilated patients.",
    howToUse: [
      "Use only in mechanically ventilated patients.",
      "Enter FiO₂ as a fraction, the mean airway pressure (MAP) measured directly from the ventilator, and PaO₂ from a concurrent arterial blood gas.",
      "Interpret the result against the calculator's severity bands.",
    ],
    interpretation: {
      guide:
        "The Oxygen Index reflects the amount of oxygen and ventilatory pressure required to achieve a given PaO₂. In this calculator, OI <5 is reported as mild oxygenation impairment, 5–15 moderate, 16–25 severe, and >25 very severe. Note that values <5 are assigned a 'normal' status by the calculator even though the interpretation describes mild impairment; this reflects the tool's banding and does not mean oxygenation is fully normal.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Severity assessment of oxygenation failure in mechanically ventilated patients",
      "Monitoring the intensity of respiratory support in critical care, including pediatric and neonatal settings",
      "Serial tracking of response to ventilatory management",
    ],
    whenNotToUse: [
      "Non-ventilated patients",
      "Without a directly measured mean airway pressure",
      "In isolation to guide withdrawal of respiratory support",
    ],
    limitations: [
      "The severity bands used by this calculator are pragmatic thresholds; the Oxygen Index does not have a single universally standardized classification.",
      "Results depend on ventilator settings and the timing of PaO₂, so serial measurements are more informative than a single value.",
      "Mean airway pressure must be measured from the ventilator; estimated values will bias the result.",
      "Requires an arterial blood gas; SpO₂-based surrogates are not used by this calculator.",
    ],
    example: {
      description:
        "A ventilated patient with ARDS has FiO₂ 0.7, a mean airway pressure of 18 cmH₂O, and a PaO₂ of 70 mmHg.",
      inputs: {
        fio2: "0.7",
        map: "18",
        pao2: "70",
      },
      expectedResult:
        "OI = (0.7 × 18 × 100) / 70 ≈ 18 — severe oxygenation impairment.",
    },
    clinicalSignificance:
      "The Oxygen Index integrates the intensity of oxygen and pressure support with the resulting arterial oxygenation, making it a widely used severity metric for hypoxemic respiratory failure in critical care, including pediatric and neonatal intensive care.",
    references: [
      {
        citation:
          "Oxygen Index severity bands as implemented by this calculator. The citation previously supplied was not specific or verifiable and has been removed pending independent verification.",
        level: "Repository reference",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The Oxygen Index is one component of oxygenation assessment in ventilated patients and must be interpreted with the full clinical context.",
  },

  "free-water-deficit": {
    clinicalPurpose:
      "Estimates the free water deficit in a patient with hypernatremia — the approximate volume of free water needed to bring the serum sodium from its current value down to a chosen target — using total body water estimated as 0.6 × body weight.",
    howToUse: [
      "Enter the patient's weight, current serum sodium, and the desired target sodium.",
      "The result is an estimate of the free water deficit in liters; it represents only the water deficit and does not account for ongoing losses.",
      "Review the calculator's severity band as context, but interpret the value together with the clinical picture.",
      "Correction-rate concepts (for example, limiting correction to roughly 0.5 mmol/L per hour or 10–12 mmol/L per day) are educational background for planning and are not part of the calculator output.",
    ],
    interpretation: {
      guide:
        "The calculator reports the deficit in liters and classifies it as no deficit (≤0 L), mild (0.1–3 L), moderate (3.1–7 L), or severe (>7 L). The value is an estimate: it assumes total body water is 0.6 × weight, ignores ongoing water losses, and does not reflect the underlying cause of hypernatremia. Management depends on volume status (hypovolemic, euvolemic, or hypervolemic) and on concurrent losses, and the deficit should generally be corrected gradually rather than replaced as a single bolus.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Adults with hypernatremia where a target serum sodium has been defined",
      "Estimating the volume of free water needed to plan gradual correction",
      "Educational review of the water deficit implied by a given elevation in serum sodium",
    ],
    whenNotToUse: [
      "As a complete fluid management plan — ongoing losses and maintenance requirements are not included",
      "In children and neonates without age-appropriate total body water assumptions",
      "Without assessment of volume status and the underlying cause of hypernatremia",
    ],
    limitations: [
      "Assumes total body water is 0.6 × weight; the calculator does not apply the lower fraction (~0.5 × weight) commonly used in women.",
      "Represents the deficit at a single point in time and does not model ongoing GI, renal, or insensible losses.",
      "Does not consider the cause of hypernatremia (e.g., diabetes insipidus, osmotic diuresis, or inadequate intake).",
      "The result is an estimate for planning gradual correction, not a prescribed infusion order.",
    ],
    example: {
      description:
        "An 80 kg patient with serum sodium 160 mmol/L is being evaluated; a target sodium of 140 mmol/L is selected.",
      inputs: {
        weight: "80",
        currentNa: "160",
        desiredNa: "140",
      },
      expectedResult:
        "Free water deficit = 0.6 × 80 × (160/140 − 1) ≈ 6.9 L — reported by the calculator as a moderate free water deficit.",
    },
    clinicalSignificance:
      "Estimating the free water deficit gives clinicians a quantitative starting point for planning the gradual correction of hypernatremia and anticipating the volume of water replacement required, while emphasizing that the estimate must be adjusted for ongoing losses and the patient's volume status.",
    references: [
      {
        citation: "Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(21):1493-1499.",
        level: "Review",
      },
      {
        citation: "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372(1):55-65.",
        level: "Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The free water deficit is an estimate and is not a prescription; correction of hypernatremia requires assessment of volume status, ongoing losses, and an individualized rate of correction.",
  },

  "albumin-corrected-calcium": {
    clinicalPurpose:
      "Adjusts the measured serum total calcium for an abnormal serum albumin, estimating the total calcium corrected to a normal albumin of 4.0 g/dL, to help interpret whether calcium is low, normal, or high.",
    howToUse: [
      "Enter the serum calcium and albumin measured from the same blood sample (mg/dL and g/dL, respectively).",
      "The calculator applies the standard correction: corrected calcium = measured calcium + 0.8 × (4 − albumin).",
      "Use the corrected value to gauge calcium status, keeping in mind that it remains an estimate of total calcium.",
    ],
    interpretation: {
      guide:
        "Corrected calcium <8.5 mg/dL is reported as low (consistent with hypocalcemia), 8.5–10.5 mg/dL as normal, and >10.5 mg/dL as high (consistent with hypercalcemia). The correction is a bedside estimate; in critically ill patients, in those with markedly abnormal proteins, or in acid-base disturbances, the corrected value is less reliable and ionized calcium should be considered when available.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Interpreting serum calcium when the serum albumin is abnormal",
      "When ionized calcium measurement is not available and albumin is known",
      "Educational review of the relationship between albumin and total calcium",
    ],
    whenNotToUse: [
      "In critically ill patients where ionized calcium is available and preferred",
      "When either calcium or albumin has not been measured",
      "As a substitute for ionized calcium in unstable patients or those with abnormal calcium-binding proteins",
    ],
    limitations: [
      "The correction is an approximation and is less reliable in critical illness, altered protein binding, and acid-base disorders.",
      "It estimates total (protein-bound plus free) calcium, not ionized calcium.",
      "The typical range used (8.5–10.5 mg/dL) reflects adult reference values and may differ between laboratories and populations.",
    ],
    example: {
      description: "A patient has serum calcium 8.0 mg/dL and albumin 3.0 g/dL.",
      inputs: {
        calcium: "8.0",
        albumin: "3.0",
      },
      expectedResult:
        "Corrected calcium = 8.0 + 0.8 × (4.0 − 3.0) = 8.8 mg/dL — reported as normal.",
    },
    clinicalSignificance:
      "Because a large fraction of serum calcium is bound to albumin, adjusting for albumin helps prevent both misclassifying patients with hypoalbuminemia as hypocalcemic and overlooking true hypercalcemia, supporting more accurate interpretation of total calcium.",
    references: [
      {
        citation: "Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. Br Med J. 1973;4(5893):643-646.",
        level: "Original correction formula",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. Corrected calcium is an estimate; when calcium status affects clinical decisions, particularly in the critically ill, ionized calcium should be measured.",
  },

  "basal-metabolic-rate": {
    clinicalPurpose:
      "Estimates basal metabolic rate (BMR) — the energy expended at complete rest — using the Mifflin-St Jeor equation with sex, age, weight, and height.",
    howToUse: [
      "Select sex and enter age, weight (kg), and height (cm).",
      "The calculator applies the Mifflin-St Jeor equation directly and returns an estimate in kcal/day.",
      "Remember that the result is an estimate of resting energy expenditure, not a direct metabolic measurement.",
      "To estimate total daily energy expenditure, an activity factor must be applied separately; the calculator does not do this.",
    ],
    interpretation: {
      guide:
        "The result is an estimate of the energy required at rest; typical adult estimates are roughly 1,600–2,000 kcal/day in men and 1,400–1,800 kcal/day in women, though values vary with age, body size, and body composition. Because there is no single 'normal' BMR, the calculator reports all valid results as normal. BMR is distinct from total daily energy expenditure, which also includes physical activity and the thermic effect of food.",
      sexSpecific: true,
      ageSpecific: true,
      pediatric: false,
    },
    whenToUse: [
      "Estimating resting energy expenditure when indirect calorimetry is unavailable",
      "As a component of estimating total daily energy requirements in nutritional assessment",
      "Educational review of energy balance and resting metabolism",
    ],
    whenNotToUse: [
      "As a direct measurement of metabolic rate",
      "In critically ill patients where measured energy expenditure (indirect calorimetry) is preferred",
      "In children and adolescents, where pediatric-specific equations may be more appropriate",
    ],
    limitations: [
      "The Mifflin-St Jeor equation provides an estimate, and individual variation in metabolic rate can be substantial.",
      "It does not account for body composition, muscle mass, or metabolic stress such as illness, fever, or critical illness.",
      "BMR is not total energy expenditure; activity and the thermic effect of food must be added separately.",
      "The estimate assumes weight in kg and height in cm, matching the calculator inputs.",
    ],
    example: {
      description: "A 40-year-old man weighing 70 kg with a height of 175 cm.",
      inputs: {
        sex: "male",
        age: "40",
        weight: "70",
        height: "175",
      },
      expectedResult:
        "BMR = 10 × 70 + 6.25 × 175 − 5 × 40 + 5 ≈ 1598.8 kcal/day.",
    },
    clinicalSignificance:
      "Estimating BMR provides a foundation for nutritional assessment and energy-requirement planning in patients in whom resting energy expenditure cannot be measured directly.",
    references: [
      {
        citation: "Mifflin MD, et al.",
        level: "Original equation",
      },
      {
        citation: "Academy of Nutrition and Dietetics",
        level: "Professional organization",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. BMR estimates are approximations and do not replace measured energy expenditure in patients whose nutritional support is clinically critical.",
  },

  "fractional-excretion-calculator": {
    clinicalPurpose:
      "Calculates the fractional excretion of sodium (FENa) — the percentage of filtered sodium that appears in the urine — from paired urine and plasma sodium and creatinine values, as one component of evaluating acute kidney injury.",
    howToUse: [
      "Enter urine sodium, plasma sodium, urine creatinine, and plasma creatinine measured from samples taken close together in time.",
      "The calculator returns a numeric FENa (%) only; it does not assign a prerenal or intrinsic classification automatically.",
      "Interpret the number with the clinical context, including whether diuretics were recently given.",
      "The educational interpretation below describes common patterns and is not part of the calculator output.",
    ],
    interpretation: {
      guide:
        "The calculator output is the numeric FENa only — there is no automatic prerenal/intrinsic classification. As educational background, in appropriate clinical settings a low FENa (commonly <1%) can support a prerenal pattern of azotemia, while higher values (commonly >1–2%) can be seen with intrinsic tubular injury. These are general patterns, not absolute diagnostic thresholds, and FENa is unreliable during diuretic use, in chronic kidney disease, and in many oliguric states.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Supporting the clinical distinction between prerenal azotemia and intrinsic tubular injury in appropriate settings",
      "When paired urine and plasma sodium and creatinine are available",
      "As part of a broader evaluation of acute kidney injury",
    ],
    whenNotToUse: [
      "As the sole basis for diagnosing the cause of acute kidney injury",
      "In patients receiving diuretics, with chronic kidney disease, or in low-urine-output states where FENa is unreliable",
      "In children, where different interpretation and reference patterns may apply",
    ],
    limitations: [
      "The calculator returns a numeric value only; prerenal versus intrinsic classification is an educational interpretation and is not computed by the calculator.",
      "FENa is unreliable in diuretic use, chronic kidney disease, and oliguric states; alternative indices such as the fractional excretion of urea may be more useful.",
      "Requires simultaneously obtained urine and plasma samples.",
      "Commonly quoted thresholds (e.g., <1%, >1–2%) are general patterns, not absolute diagnostic cut-offs.",
    ],
    example: {
      description:
        "A patient with acute kidney injury has urine sodium 30 mmol/L, plasma sodium 140 mmol/L, urine creatinine 80 mg/dL, and plasma creatinine 1.2 mg/dL.",
      inputs: {
        urineNa: "30",
        plasmaNa: "140",
        urineCr: "80",
        plasmaCr: "1.2",
      },
      expectedResult:
        "FENa = (30/140) ÷ (80/1.2) × 100 ≈ 0.3%. The calculator returns this numeric value; the educational pattern is a low FENa that may support a prerenal pattern in the appropriate clinical setting.",
    },
    clinicalSignificance:
      "FENa is a widely used urinary index for evaluating the cause of acute kidney injury; interpreted together with the clinical picture it can support the distinction between prerenal azotemia and intrinsic tubular injury, but it must not be used in isolation.",
    references: [
      {
        citation: "Carvounis CP, et al. Significance of the fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62(3):1184-1191.",
        level: "Original research",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The calculator returns a numeric FENa only; the prerenal/intrinsic interpretation is educational and must be applied with the full clinical context.",
  },

  "edd": {
    clinicalPurpose:
      "Estimates the expected date of delivery (EDD) by adding 280 days to the first day of the last menstrual period (LMP), per the conventional Naegele calculation.",
    howToUse: [
      "Enter the first day of the last menstrual period in the date field.",
      "The calculator adds 280 days and returns the estimated date of delivery.",
      "Treat the result as an estimate: the calculation assumes a regular 28-day menstrual cycle with ovulation at day 14.",
      "Ultrasound dating may supersede LMP dating when clinically appropriate.",
    ],
    interpretation: {
      guide:
        "The calculator returns a single estimated date of delivery, approximately 40 weeks (280 days) after the LMP. The estimate assumes a regular 28-day cycle; longer or shorter cycles shift the true due date. The result is an estimate — first-trimester ultrasound dating is considered more reliable and may supersede LMP dating when the dates differ meaningfully.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
      pregnancy: true,
    },
    whenToUse: [
      "Estimating a due date from a reliable LMP when ultrasound dating is not available or not required",
      "Educational review of the Naegele rule and pregnancy dating",
      "Supporting discussions about timing of prenatal care milestones",
    ],
    whenNotToUse: [
      "As the definitive date when ultrasound dating indicates a significantly different date",
      "When the LMP is uncertain or the cycle length is unknown or irregular",
      "To determine pregnancy viability or to time obstetric interventions without clinical assessment",
    ],
    limitations: [
      "Assumes a regular 28-day menstrual cycle with ovulation approximately 14 days before the next menses.",
      "The estimate is based on the date only; it does not incorporate cycle length, menstrual regularity, or assisted-reproduction dating.",
      "Pregnancy dating is typically confirmed or corrected by early ultrasound; the calculator's output is an estimate.",
    ],
    example: {
      description: "A patient's first day of last menstrual period was January 1, 2026.",
      inputs: {
        lmp: "2026-01-01",
      },
      expectedResult:
        "EDD = 2026-01-01 + 280 days = 2026-10-08 — reported as the estimated date of delivery.",
    },
    clinicalSignificance:
      "Estimating the due date is one of the first steps in prenatal care, guiding the scheduling of screening, monitoring, and delivery planning; LMP-based estimation is the conventional starting point, with ultrasound used to confirm or correct the date.",
    references: [
      {
        citation: "ACOG Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129(5):e150-e154.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The expected date of delivery is an estimate based on the LMP and a 28-day cycle assumption; ultrasound dating should be used to confirm or correct the date when clinically indicated.",
  },

  "gestational-age": {
    clinicalPurpose:
      "Calculates gestational age in decimal weeks from entered weeks and days, and relates this to the weeks + days format clinicians commonly use in pregnancy.",
    howToUse: [
      "Enter the gestational age in completed weeks and days (e.g., 32 weeks 3 days).",
      "The calculator returns gestational age as a decimal number of weeks (weeks + days/7).",
      "Clinicians commonly express the same age as '32 weeks 3 days'; the decimal output (32.43 weeks) is the equivalent single number.",
      "Clinical dating of pregnancy typically relies on the LMP or, when available, established ultrasound dating.",
    ],
    interpretation: {
      guide:
        "The calculator returns gestational age in decimal weeks; for example, 32 weeks 3 days is reported as approximately 32.43 weeks. Clinically, gestational age is usually expressed in completed weeks plus days (e.g., 32w3d), and this decimal value is the mathematical equivalent. The calculator does not determine viability or obstetric diagnosis — that requires full clinical and ultrasound assessment.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
      pregnancy: true,
    },
    whenToUse: [
      "Converting a weeks + days gestational age into a decimal number of weeks",
      "Educational review of gestational age reporting",
      "Supporting documentation and calculations that require gestational age in weeks",
    ],
    whenNotToUse: [
      "To determine pregnancy viability or fetal well-being",
      "To replace ultrasound-based dating when dating is uncertain",
      "As a substitute for clinical assessment or obstetric diagnosis",
    ],
    limitations: [
      "The calculator is a unit conversion (weeks + days/7); it does not compute gestational age from dates or from ultrasound measurements.",
      "Accuracy of the entered age depends on how pregnancy dating was established (LMP or ultrasound).",
      "The decimal output (e.g., 32.43 weeks) should not be mistaken for a new clinical estimate; it is the same age expressed differently.",
      "The calculator accepts 0–42 weeks and 0–6 days, matching its input limits.",
    ],
    example: {
      description: "A patient's gestational age is 32 weeks and 3 days.",
      inputs: {
        weeks: "32",
        days: "3",
      },
      expectedResult:
        "Gestational age = 32 + 3/7 ≈ 32.43 weeks (32 weeks 3 days).",
    },
    clinicalSignificance:
      "Gestational age is the cornerstone of pregnancy dating and fetal growth assessment; expressing it consistently as weeks plus days (or a decimal equivalent) supports accurate documentation and interpretation of prenatal milestones.",
    references: [
      {
        citation: "ACOG Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129(5):e150-e154.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. Gestational age reflects the entered dating only and does not determine pregnancy viability or obstetric diagnosis.",
  },

  "adrenal-steroid-converter": {
    clinicalPurpose:
      "Converts a dose of one glucocorticoid into its approximate prednisone-equivalent dose using standard anti-inflammatory potency equivalence factors, to support comparing doses across glucocorticoids.",
    howToUse: [
      "Enter the dose in mg and select the source steroid.",
      "The calculator multiplies the dose by the steroid's prednisone-equivalence factor.",
      "Use the result as an approximate equivalence for comparing or communicating doses.",
      "The result is not a prescribing or tapering plan; it does not model formulation, route, indication, duration, or patient-specific factors.",
    ],
    interpretation: {
      guide:
        "The calculator returns the prednisone-equivalent dose in mg and assigns its own convention bands: ≤7.5 mg is labeled low-dose, 7.5–20 mg moderate-dose, and >20 mg high-dose. These bands are calculator conventions for context and are not universal treatment thresholds. Equivalences are approximate and based on anti-inflammatory potency; they do not reflect mineralocorticoid activity (e.g., hydrocortisone retains significant mineralocorticoid effect while dexamethasone has essentially none) or duration of action.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Comparing approximate equivalent doses when switching between glucocorticoids",
      "Educational review of glucocorticoid equivalence",
      "Supporting dose-comparison discussions in steroid management",
    ],
    whenNotToUse: [
      "As a prescribing or tapering plan",
      "Without considering formulation, route of administration, indication, and duration of therapy",
      "In place of clinical judgment about the specific patient's response to steroids",
    ],
    limitations: [
      "Equivalence factors are approximations based on anti-inflammatory potency; individual responses vary.",
      "The conversion does not account for mineralocorticoid activity, biological half-life, or HPA-axis suppression risk.",
      "The calculator's low/moderate/high-dose bands are conventions of this tool, not standardized guideline thresholds.",
      "Does not model tapering schedules, which require gradual reduction and individualized monitoring.",
    ],
    example: {
      description:
        "A patient is prescribed prednisone 10 mg/day; separately, dexamethasone 0.75 mg/day is being considered on another occasion.",
      inputs: {
        dose: "10",
        steroid: "prednisone",
      },
      expectedResult:
        "Prednisone 10 mg → prednisone-equivalent = 10 mg, reported in the moderate-dose band (7.5–20 mg). As a second illustration, dexamethasone 0.75 mg → 0.75 × 6.667 ≈ 5 mg prednisone-equivalent, reported in the low-dose band (≤7.5 mg).",
    },
    clinicalSignificance:
      "Because the anti-inflammatory potency of glucocorticoids differs, converting between them using standard equivalence factors helps ensure that a change from one steroid to another aims for a comparable dose — while emphasizing that equivalence is approximate and that formulation, route, indication, duration, and patient response must all be considered.",
    references: [
      {
        citation:
          "Glucocorticoid equivalence factors as implemented by this calculator (prednisone-equivalent conversion). Citations previously supplied could not be independently verified and have been removed pending review.",
        level: "Repository reference",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. Glucocorticoid equivalence is approximate and is not a prescribing or tapering plan; formulation, route, indication, duration, and individual patient factors must be considered by the treating clinician.",
  },

  "thyroid-dose": {
    clinicalPurpose:
      "Estimates a weight-based levothyroxine replacement dose (≈1.6 µg/kg/day) using the calculator's implemented equation, for educational review of starting-dose estimation in hypothyroidism.",
    howToUse: [
      "Enter body weight in kg.",
      "The calculator returns the total daily dose in µg based on 1.6 µg/kg/day.",
      "Treat the result as an educational estimate from a weight-based equation.",
      "Actual starting doses are individualized; the calculator does not incorporate age, cardiac risk, or pregnancy.",
    ],
    interpretation: {
      guide:
        "The calculator reports the weight-based estimate (1.6 µg/kg/day) as the 'full replacement dose.' The calculator's only input is body weight — age, cardiac risk, and pregnancy are not inputs and are not reflected in the number. Actual starting doses are individualized; many patients, especially older adults or those with cardiac disease, are started at much lower doses (commonly 25–50 µg/day) and titrated using TSH.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Educational review of the conventional full replacement levothyroxine dose estimate",
      "As background when discussing thyroid hormone replacement dosing",
      "When a rough weight-based starting estimate is wanted as a reference",
    ],
    whenNotToUse: [
      "As a prescription or dosing instruction",
      "Without individualization for age, cardiac disease, residual thyroid function, and concurrent medications",
      "In children, where weight-based dosing differs and specialist guidance applies",
    ],
    limitations: [
      "The calculation is purely weight-based (1.6 × weight) and does not account for age, cardiac disease, pregnancy, thyroid reserve, or aetiology.",
      "The calculator description mentions lean body weight, but the implemented equation uses total body weight.",
      "The result is a starting-dose estimate; individual requirements vary and the dose is typically titrated to a target TSH.",
      "Absorption is affected by food and medications such as iron, calcium, and proton pump inhibitors, which is not modeled by the calculator.",
    ],
    example: {
      description: "A 70 kg adult is being evaluated for thyroid hormone replacement.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Estimated dose = 1.6 × 70 = 112 µg/day — reported as the full replacement dose estimate.",
    },
    clinicalSignificance:
      "A weight-based estimate (≈1.6 µg/kg/day) provides a reference point for full levothyroxine replacement, but real-world starting doses are individualized — particularly in older adults and patients with cardiac disease — and are titrated to a target TSH.",
    references: [
      {
        citation: "Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670-1751.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The result is not a prescription: actual starting doses are individualized, current treatment guidance and patient factors must be considered, and this calculator does not apply any automatic adjustment for age, cardiac disease, or pregnancy.",
  },

  "levothyroxine-dose": {
    clinicalPurpose:
      "Estimates a weight-based levothyroxine replacement dose (≈1.6 µg/kg/day) using the calculator's implemented equation, for educational review of hypothyroidism replacement dosing.",
    howToUse: [
      "Enter body weight in kg.",
      "The calculator returns the total daily dose in µg based on 1.6 µg/kg/day.",
      "Treat the result as an educational estimate from a weight-based equation.",
      "Actual starting doses are individualized; the calculator does not incorporate age, cardiac risk, or pregnancy.",
    ],
    interpretation: {
      guide:
        "The calculator reports the weight-based estimate (1.6 µg/kg/day) as the 'full replacement dose.' The calculator's only input is body weight — age, cardiac risk, and pregnancy are not inputs and are not reflected in the number. Actual starting doses are individualized; many patients, especially older adults or those with cardiac disease, are started at much lower doses (commonly 25–50 µg/day) and titrated using TSH.",
      sexSpecific: false,
      ageSpecific: false,
      pediatric: false,
    },
    whenToUse: [
      "Educational review of the conventional full replacement levothyroxine dose estimate",
      "As background when discussing thyroid hormone replacement dosing",
      "When a rough weight-based starting estimate is wanted as a reference",
    ],
    whenNotToUse: [
      "As a prescription or dosing instruction",
      "Without individualization for age, cardiac disease, residual thyroid function, and concurrent medications",
      "In children, where weight-based dosing differs and specialist guidance applies",
    ],
    limitations: [
      "The calculation is purely weight-based (1.6 × weight) and does not account for age, cardiac disease, pregnancy, thyroid reserve, or aetiology.",
      "The calculator description refers to accounting for age and cardiac risk factors, but those are not inputs to this calculator and are not reflected in the result.",
      "The result is a starting-dose estimate; individual requirements vary and the dose is typically titrated to a target TSH.",
      "Absorption is affected by food and medications such as iron, calcium, and proton pump inhibitors, which is not modeled by the calculator.",
    ],
    example: {
      description: "A 70 kg adult is being evaluated for thyroid hormone replacement.",
      inputs: {
        weight: "70",
      },
      expectedResult:
        "Estimated dose = 1.6 × 70 = 112 µg/day — reported as the full replacement dose estimate.",
    },
    clinicalSignificance:
      "A weight-based estimate (≈1.6 µg/kg/day) provides a reference point for full levothyroxine replacement, but real-world starting doses are individualized — particularly in older adults and patients with cardiac disease — and are titrated to a target TSH.",
    references: [
      {
        citation: "Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670-1751.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support. The result is not a prescription: actual starting doses are individualized, current treatment guidance and patient factors must be considered, and this calculator does not apply any automatic adjustment for age, cardiac disease, or pregnancy.",
  },
};
