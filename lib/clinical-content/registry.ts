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
    commonMistakes: [
      "Failing to correct for low albumin, which can hide a high anion gap metabolic acidosis behind a deceptively normal value.",
      "Using a normal anion gap to rule out metabolic acidosis, since a normal result does not exclude the disorder.",
      "Mistaking lithium, bromide, or iodide interference for a genuine rise in unmeasured anions when reviewing an elevated gap."
    ],
    formulaExplanation:
      "The anion gap is calculated as sodium minus the sum of chloride and bicarbonate (AG = Na - (Cl + HCO3)), all in mmol/L.",
    variables: [
      {
        inputId: "sodium",
        label: "Sodium",
        explanation: "Serum sodium in mmol/L, used as the minuend.",
      },
      {
        inputId: "chloride",
        label: "Chloride",
        explanation: "Serum chloride in mmol/L, added to bicarbonate in the subtrahend.",
      },
      {
        inputId: "bicarbonate",
        label: "Bicarbonate (HCO3)",
        explanation: "Serum bicarbonate in mmol/L, added to chloride in the subtrahend.",
      },
    ],
    faq: [
          {
        "question": "What does an elevated anion gap mean?",
        "answer": "An elevated anion gap (> 12 mmol/L) in the setting of metabolic acidosis suggests accumulation of unmeasured anions such as lactate, ketoacids, or toxic metabolites. Common causes include lactic acidosis, diabetic ketoacidosis, renal failure, and toxic alcohol ingestion."
      },
      {
        "question": "What does a low anion gap mean?",
        "answer": "A low anion gap (< 8 mmol/L) may indicate hypoalbuminemia, lithium or bromide toxicity, or laboratory error. It can also be seen with hypercalcemia, hypermagnesemia, or hyperkalemia."
      },
      {
        "question": "Why should I correct for albumin?",
        "answer": "About 80% of the normal anion gap is accounted for by albumin. In hypoalbuminemia, the anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. For every 1 g/dL drop in albumin below 4.0, the expected anion gap decreases by approximately 2.5 mmol/L."
      },
      {
        "question": "When should I use the corrected anion gap?",
        "answer": "Use the albumin-corrected anion gap when the patient has known or suspected hypoalbuminemia (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition)."
      }

  ],
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
    evidence: {
      source: "Nephrology / Acid-Base",
      reference:
        "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162-174.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162-174.",
        "Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment. Always interpret laboratory values in the context of the individual patient's clinical presentation.",
  },

  "ckd-epi-2021": {
    commonMistakes: [
      "Using the CKD-EPI result to adjust medication doses when the drug label requires Cockcroft-Gault creatinine clearance instead.",
      "Applying the equation during acute kidney injury, when a rapidly changing creatinine breaks the steady-state assumption.",
      "Diagnosing chronic kidney disease from a single low eGFR without repeating testing after at least 3 months to confirm chronicity."
    ],
    formulaExplanation:
      "The 2021 CKD-EPI creatinine equation estimates eGFR = 142 x min(Scr/k, 1)^alpha x max(Scr/k, 1)^-1.200 x 0.9938^age x 1.012 (female). Scr is serum creatinine in mg/dL; k is 0.7 (female) or 0.9 (male); alpha is -0.241 (female) or -0.302 (male). The race coefficient used in earlier equations was removed.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, entered into the 0.9938^age term so that eGFR declines with older age.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which sets the k and alpha constants and applies the 1.012 multiplier for females.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL, the filtration marker that is divided by k (0.7 female, 0.9 male) before exponentiation.",
      },
    ],
    faq: [
          {
        "question": "What does eGFR measure?",
        "answer": "eGFR estimates how well the kidneys are filtering waste from the blood, expressed in mL/min/1.73 m²."
      },
      {
        "question": "Why was the race variable removed from CKD-EPI?",
        "answer": "The 2021 equation removed race because including it was not scientifically justified and contributed to health disparities in CKD detection."
      },
      {
        "question": "Is CKD-EPI better than MDRD?",
        "answer": "Yes. CKD-EPI is more accurate at higher GFR values and is now the preferred equation in most guidelines."
      }

  ],
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
    commonMistakes: [
      "Entering the QT interval in seconds instead of milliseconds produces a QTc far below the 450 ms and 460 ms sex-specific limits.",
      "Applying the 450 ms male limit to a woman, or the 460 ms female limit to a man, classifies the result against the wrong sex-specific threshold.",
      "Reading Bazett over-correction at a fast heart rate as true prolongation ignores a limitation that Fridericia or Framingham correction may address."
    ],
    faq: [
      {
        question: "How does the calculator get the RR interval used in the Bazett formula?",
        answer: "You never measure the RR interval yourself. The calculator converts the heart rate you enter into an RR interval in seconds by dividing 60 by the heart rate, then applies QTc = QT / sqrt(RR). Enter the QT interval measured on the ECG in milliseconds, the heart rate in beats per minute, and the patient's sex, because the upper limit of normal is 450 ms in men and 460 ms in women."
      },
      {
        question: "Why can Bazett correction mislead at fast or slow heart rates?",
        answer: "Bazett's correction does not track heart rate evenly: at fast rates it inflates the QTc, and at slow rates it deflates it, so the number can look more abnormal or more normal than true repolarization warrants. That is a property of the equation rather than a data-entry error. The calculator notes that Fridericia and Framingham corrections may suit some clinical settings better, and that QTc never replaces clinical assessment of arrhythmia risk."
      },
      {
        question: "What does a QTc of 500 ms or higher indicate?",
        answer: "A QTc at or above 500 ms is classified as marked prolongation and is associated with increased risk of Torsades de Pointes, a potentially fatal ventricular arrhythmia. Values between 450 and 499 ms in men or 460 and 499 ms in women are reported as prolonged. Because QT measurement varies between observers and the tracing must be readable, the result should be weighed with the patient's medications, electrolyte status, and clinical picture rather than used as a stand-alone diagnosis."
      }
    ],
    formulaExplanation:
      "The Bazett formula corrects the QT interval for heart rate: QTc = QT / sqrt(RR), where RR (in seconds) = 60 / heart rate.",
    variables: [
      {
        inputId: "qt",
        label: "QT Interval",
        explanation: "Measured QT interval in milliseconds, divided by the square root of RR.",
      },
      {
        inputId: "heartRate",
        label: "Heart Rate",
        explanation: "Heart rate in beats per minute, converted to the RR interval in seconds (60 / heart rate).",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, used to apply sex-specific upper limits of normal for QTc.",
      },
    ],
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
    evidence: {
      source: "Original Bazett Description / AHA ECG Guidelines",
      reference:
        "Bazett HC. An analysis of the time-relations of electrocardiograms. Heart. 1920;7:353-370.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Bazett HC. Heart. 1920;7:353-370.",
        "AHA ECG Guidelines for the Interpretation of the Resting 12-Lead ECG.",
      ],
    },
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
    commonMistakes: [
      "Entering height in meters instead of centimeters, which the calculator converts before squaring.",
      "Classifying a child with adult BMI cutoffs instead of age- and sex-specific percentiles.",
      "Attributing a high BMI in an older adult to excess weight when vertebral compression has reduced their measured height."
    ],
    faq: [
          {
        "question": "What is BMI?",
        "answer": "BMI is a screening tool that estimates body fat using height and weight."
      },
      {
        "question": "Can BMI diagnose obesity?",
        "answer": "No. BMI is only a screening tool and should always be interpreted together with clinical findings."
      }

  ],
    clinicalPurpose:
      "Calculates Body Mass Index (BMI) to screen for underweight, normal weight, overweight, and obesity categories.",
    formulaExplanation:
      "BMI is calculated as weight in kilograms divided by the square of height in meters (BMI = weight (kg) / height (m)²). Since height is provided in centimeters, the calculator converts height to meters before squaring.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms used as the numerator in the BMI calculation.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, converted to meters and squared in the denominator.",
        commonError: "Forgetting to convert cm to m will give incorrect values.",
      },
    ],
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
    evidence: {
      source: "Anthropometry / WHO",
      reference: "WHO. Body Mass Index — BMI. World Health Organization.",
      version: "2000",
      updatedAt: "2026-08",
      references: [
        "WHO. Body Mass Index — BMI.",
      ],
    },
  },

  "bun-creatinine-ratio": {
    commonMistakes: [
      "Entering blood urea nitrogen or creatinine in a unit other than mg/dL, which both inputs require.",
      "Treating a ratio above 20:1 as proof of a prerenal cause instead of one supportive finding.",
      "Interpreting the ratio in a patient on dialysis, where the usual patterns do not apply."
    ],
    formulaExplanation:
      "The BUN-to-creatinine ratio is blood urea nitrogen divided by serum creatinine (BUN / Cr), both in mg/dL. A ratio above about 20:1 suggests a prerenal cause of azotemia.",
    variables: [
      {
        inputId: "bun",
        label: "Blood Urea Nitrogen",
        explanation: "Blood urea nitrogen in mg/dL, used as the numerator.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL, used as the denominator.",
      },
    ],
    faq: [
          {
        "question": "What does a high BUN/Creatinine ratio mean?",
        "answer": "A ratio >20:1 may suggest prerenal azotemia (e.g. dehydration, heart failure), GI bleeding, or high protein intake."
      },
      {
        "question": "What does a low BUN/Creatinine ratio mean?",
        "answer": "A ratio <10:1 may indicate intrinsic renal disease, liver disease, malnutrition, or a low-protein diet."
      }

  ],
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
    evidence: {
      source: "NKF / KDIGO",
      reference:
        "KDIGO Clinical Practice Guideline for the Evaluation and Management of CKD.",
      version: "2024",
      updatedAt: "2026-08",
      references: [
        "KDIGO Clinical Practice Guideline.",
        "National Kidney Foundation.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The BUN/Cr ratio should be interpreted in the context of the individual patient's clinical presentation and other laboratory values.",
  },

  "corrected-sodium": {
    commonMistakes: [
      "Applying the correction when glucose is normal or only mildly elevated, where it adds little beyond noise to the interpretation.",
      "Expecting the formula to capture hypertonicity from osmotic agents such as mannitol or glycine, which it does not include.",
      "Trusting the 1.6 mmol/L per 100 mg/dL factor at glucose levels above 600 mg/dL, where it becomes less reliable."
    ],
    formulaExplanation:
      "Corrected sodium = measured sodium + 1.6 x ((glucose - 100) / 100) when glucose exceeds 100 mg/dL, adjusting for hyperglycemia-induced dilutional hyponatremia.",
    variables: [
      {
        inputId: "sodium",
        label: "Measured Sodium",
        explanation: "Measured serum sodium in mmol/L, to which the glucose correction is added.",
      },
      {
        inputId: "glucose",
        label: "Glucose",
        explanation: "Serum glucose in mg/dL; the amount above 100 mg/dL drives the correction.",
      },
    ],
    faq: [
          {
        "question": "Why does hyperglycemia lower sodium?",
        "answer": "High glucose increases serum osmolality, drawing water from the intracellular to the extracellular space. This dilutes the serum sodium, causing a falsely low measured value. The corrected sodium estimates what the sodium would be at a normal glucose."
      },
      {
        "question": "What correction factor should I use?",
        "answer": "The conventional correction factor is 1.6 mmol/L for every 100 mg/dL increase in glucose above 100 mg/dL. For very high glucose (> 400 mg/dL), some experts use a factor of 2.0–2.4."
      },
      {
        "question": "When should I correct sodium for glucose?",
        "answer": "Correct sodium whenever glucose is significantly elevated (> 200 mg/dL), especially in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS), to accurately assess the patient's true sodium status."
      }

  ],
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
        "Corrected sodium ≈ 128 + 1.6 × (500−100)/100 = 128 + 6.4 = 134.4 mmol/L. The corrected value remains mildly low, showing that glucose-driven dilution accounts for a large part (6.4 mmol/L) of the measured fall.",
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
    evidence: {
      source: "Endocrinology / Nephrology",
      reference:
        "Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399-403.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Hillier TA, Abbott RD, Barrett EJ. Am J Med. 1999;106:399-403.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Sodium correction is an approximation and should be interpreted alongside clinical assessment of the patient's volume and glucose status.",
  },

  "osmolar-gap": {
    commonMistakes: [
      "Computing the gap without a laboratory-measured osmolality, since the calculation needs the measured value as its starting point.",
      "Concluding that a normal gap excludes toxic alcohol, when metabolism during a delayed presentation can normalize it before the patient arrives.",
      "Blaming a toxic alcohol for an elevated gap when uremia or ketoacidosis may be the actual source of the unmeasured osmoles."
    ],
    formulaExplanation:
      "The osmolar gap is measured osmolality minus calculated osmolality, where calculated = 2 x sodium + glucose / 18 + BUN / 2.8. A positive gap suggests unmeasured osmotically active substances.",
    variables: [
      {
        inputId: "measured",
        label: "Measured Osmolality",
        explanation: "Laboratory-measured serum osmolality in mOsm/kg, the minuend.",
      },
      {
        inputId: "sodium",
        label: "Sodium",
        explanation: "Serum sodium in mmol/L, multiplied by 2 in the calculated osmolality.",
      },
      {
        inputId: "glucose",
        label: "Glucose",
        explanation: "Serum glucose in mg/dL, divided by 18 in the calculated osmolality.",
      },
      {
        inputId: "bun",
        label: "BUN",
        explanation: "Blood urea nitrogen in mg/dL, divided by 2.8 in the calculated osmolality.",
      },
    ],
    faq: [
          {
        "question": "What does an elevated osmolar gap mean?",
        "answer": "An elevated osmolar gap (> 10 mOsm/kg) indicates the presence of unmeasured osmotically active substances. In the emergency setting, this may suggest toxic alcohol ingestion (methanol, ethylene glycol), ethanol, or propylene glycol. Other causes include DKA, uremia, and alcohol intoxication."
      },
      {
        "question": "Can the osmolar gap be normal in toxic ingestion?",
        "answer": "Yes. In delayed presentations of toxic alcohol ingestion, the parent alcohol may have been metabolized to its toxic metabolites, normalizing the osmolar gap while toxicity persists. The anion gap may be elevated in these cases."
      },
      {
        "question": "What is the normal osmolar gap?",
        "answer": "A normal osmolar gap is generally considered to be between -10 and +10 mOsm/kg. Values above this range are considered elevated."
      }

  ],
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
    evidence: {
      source: "Emergency Medicine / Toxicology",
      reference:
        "Brent J, et al. Fomepizole for the treatment of methanol poisoning. N Engl J Med. 2001;344:424-429.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Brent J, et al. N Engl J Med. 2001;344:424-429.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. An elevated osmolar gap requires urgent clinical evaluation. Do not delay treatment while awaiting laboratory confirmation.",
  },

  "news2": {
    commonMistakes: [
      "Selecting Scale 2 routinely instead of reserving it for patients designated for the 88 to 92% oxygen target in chronic hypercapnic respiratory failure.",
      "Entering temperature in Fahrenheit when the calculator scores it in Celsius, which distorts the temperature sub-score.",
      "Using NEWS2 for a pediatric patient when PEWS is the appropriate deterioration score for that population."
    ],
    formulaExplanation:
      "NEWS2 assigns 0-3 points to each recorded observation using standardized ranges: respiratory rate, oxygen saturation (SpO2 Scale 1 or Scale 2), temperature, systolic blood pressure, and pulse. The total is the sum of the sub-scores, ranging from 0 to 15, with higher totals indicating greater risk of deterioration.",
    variables: [
      {
        inputId: "spo2-scale",
        label: "SpO2 Scale",
        explanation: "Selects the oxygen saturation scoring scale: Scale 1 for the standard target of 94-98%, or Scale 2 for patients with chronic hypercapnic respiratory failure targeting 88-92%.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory Rate",
        explanation: "Respiratory rate per minute, scored 0-3 (12-20 scores 0; 8 or fewer scores 3).",
      },
      {
        inputId: "spo2",
        label: "SpO2",
        explanation: "Oxygen saturation in percent, scored 0-3 according to the selected scale.",
      },
      {
        inputId: "temperature",
        label: "Temperature",
        explanation: "Body temperature in degrees Celsius, scored 0-3 (36.1-38.0 scores 0; 35.0 or lower scores 3).",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg, scored 0-3 (111-219 scores 0; 90 or lower scores 3).",
      },
      {
        inputId: "pulse",
        label: "Pulse",
        explanation: "Pulse rate in beats per minute, scored 0-3 (51-90 scores 0; 40 or lower scores 3).",
      },
    ],
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
      "A deterioration-monitoring score rather than a diagnostic tool — it does not identify the underlying cause of acute illness.",
      "Does not replace comprehensive clinical assessment.",
      "A low score does not guarantee clinical stability.",
      "Patients on long-term oxygen therapy require individualized assessment.",
    ],
    example: {
      description:
        "A 72-year-old woman on the surgical ward has respiratory rate 24/min, SpO₂ 93% on air, temperature 38.2°C, systolic BP 100 mmHg, and pulse 110 bpm, and is alert.",
      inputs: {
        "spo2-scale": "standard",
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
    evidence: {
      source: "Royal College of Physicians",
      reference:
        "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. RCP, 2017.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Royal College of Physicians. NEWS2. RCP, 2017.",
      ],
    },
    references: [
      {
        citation:
          "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. RCP, 2017.",
        level: "Guideline",
      },
    ],
    faq: [
      {
        question:
          "What does a NEWS2 score mean?",
        answer:
          "Score 0: low clinical risk. 1-4: low-to-moderate risk, assess by registered nurse. 5-6 or any single parameter of 3: high risk, urgent clinician assessment. 7 or more: very high risk, emergency assessment, likely ICU admission.",
      },
      {
        question:
          "How do I use NEWS2 for patients with chronic lung disease?",
        answer:
          "Patients on long-term oxygen may have persistently low SpO2. Use the target SpO2 scoring scale (88-92% or 94-98% as clinically appropriate) rather than the standard SpO2 scale.",
      },
      {
        question:
          "Can NEWS2 be used for pediatric patients?",
        answer:
          "No. NEWS2 is validated for adult inpatients. Use the Pediatric Early Warning Score (PEWS) for children.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. NEWS2 should be used as part of a comprehensive clinical assessment and does not replace clinical judgment.",
  },

  "cockcroft-gault": {
    commonMistakes: [
      "Entering creatinine in micromoles per liter without dividing by 88.4, since the equation expects mg/dL.",
      "Comparing the mL/min result directly with a body-surface-area-normalized eGFR as if they were the same scale.",
      "Calculating a dose estimate while renal function is rapidly changing, where the steady-state assumption fails."
    ],
    formulaExplanation:
      "Creatinine clearance is estimated as CrCl = ((140 - age) x weight) / (72 x serum creatinine), multiplied by 0.85 for females. Weight is in kg and creatinine in mg/dL.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, subtracted from 140 in the numerator.",
      },
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms used in the numerator.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex; females receive a 0.85 correction factor.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL, used in the denominator.",
      },
    ],
    faq: [
          {
        "question": "When should I use Cockcroft-Gault instead of CKD-EPI?",
        "answer": "Use Cockcroft-Gault when adjusting medication doses, as many drug labels still reference CrCl from this equation."
      },
      {
        "question": "What weight should I use in the Cockcroft-Gault equation?",
        "answer": "Use actual body weight by default. Adjusted body weight may be used in obese patients per institutional guidelines."
      }

  ],
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
    evidence: {
      source: "Nephrology / Pharmacy",
      reference:
        "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Cockcroft DW, Gault MH. Nephron. 1976;16:31-41.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Drug dosing decisions should always consider the individual patient's clinical context and current drug labeling.",
  },

  "homa-ir": {
    commonMistakes: [
      "Multiplying glucose in mmol/L by insulin and dividing by 405, since that constant assumes the glucose is entered in mg/dL.",
      "Reading a result just above 2.5 as a diagnosis of insulin resistance when no universally accepted cutoff exists and assays differ between laboratories.",
      "Calculating HOMA-IR in a patient with type 1 diabetes or on exogenous insulin, where the index is not validated and the value cannot be trusted."
    ],
    formulaExplanation:
      "HOMA-IR = (fasting glucose (mg/dL) x fasting insulin (microU/mL)) / 405. Higher values indicate greater insulin resistance.",
    variables: [
      {
        inputId: "glucose",
        label: "Fasting Glucose",
        explanation: "Fasting plasma glucose in mg/dL, multiplied by fasting insulin.",
      },
      {
        inputId: "insulin",
        label: "Fasting Insulin",
        explanation: "Fasting serum insulin in microU/mL, multiplied by fasting glucose.",
      },
    ],
    faq: [
          {
        "question": "What does a high HOMA-IR mean?",
        "answer": "A HOMA-IR > 2.5 suggests insulin resistance, meaning the body's cells are not responding efficiently to insulin. This is a risk factor for type 2 diabetes, metabolic syndrome, and cardiovascular disease."
      },
      {
        "question": "What are the units of HOMA-IR?",
        "answer": "HOMA-IR is unitless. It is calculated using fasting glucose in mg/dL and fasting insulin in µU/mL: (glucose × insulin) / 405."
      },
      {
        "question": "How does HOMA-IR differ from HOMA-B?",
        "answer": "HOMA-IR estimates insulin resistance, while HOMA-B estimates pancreatic beta-cell function. Both use the same fasting glucose and insulin values but different formulas."
      },
      {
        "question": "When should HOMA-IR be measured?",
        "answer": "HOMA-IR requires fasting for at least 8 hours. It is best measured in the morning before any food intake."
      }

  ],
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
    evidence: {
      source: "Endocrinology / Diabetes",
      reference:
        "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412-419.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Matthews DR, et al. Diabetologia. 1985;28:412-419.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-IR is a research and screening tool and should not be used as a standalone diagnostic test. Clinical decisions should be based on comprehensive metabolic assessment.",
  },

  "curb-65": {
    commonMistakes: [
      "Entering urea in mg/dL when the > 7 mmol/L criterion requires the value in mmol/L.",
      "Using CURB-65 to triage a child or a patient with hospital-acquired or ventilator-associated pneumonia, where it is not validated.",
      "Sending a patient home because the score is low when the patient is hypoxemic, since oxygenation is not part of the score."
    ],
    formulaExplanation:
      "The CURB-65 score sums five one-point criteria: new-onset Confusion, Urea > 7 mmol/L, Respiratory rate >= 30/min, Systolic blood pressure < 90 mmHg (or diastolic <= 60 mmHg), and Age >= 65 years. The total ranges from 0 to 5.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years; one point is added when age is 65 or older.",
      },
      {
        inputId: "confusion",
        label: "New-Onset Confusion",
        explanation: "New disorientation to person, place, or time; Yes adds one point.",
      },
      {
        inputId: "urea",
        label: "Urea",
        explanation: "Blood urea in mmol/L; a value greater than 7 mmol/L adds one point.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory Rate",
        explanation: "Respiratory rate per minute; 30 or more breaths per minute adds one point.",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg; below 90 mmHg adds one point.",
      },
    ],
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
    evidence: {
      source: "CURB-65 Derivation/Validation",
      reference:
        "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Lim WS, et al. Thorax. 2003;58(5):377-382.",
      ],
    },
    references: [
      {
        citation:
          "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
        level: "Derivation/Validation Study",
      },
    ],
    faq: [
      {
        question:
          "What does a CURB-65 score mean?",
        answer:
          "Each criterion scores 1 point: Confusion, Urea >7 mmol/L, Respiratory rate >=30, Blood pressure <90 systolic or <60 diastolic, age >=65. 0-1: low risk, consider outpatient. 2: consider admission. 3 or more: severe, consider ICU.",
      },
      {
        question:
          "When should I use CURB-65 vs PSI/PORT?",
        answer:
          "CURB-65 is faster to calculate at the bedside (no lab values required beyond urea). PSI/PORT is more detailed but requires more data. Both are validated for community-acquired pneumonia in adults.",
      },
      {
        question:
          "Does CURB-65 account for oxygen levels?",
        answer:
          "No. CURB-65 does not include hypoxia or oxygen requirements. Supplemental clinical assessment of oxygenation is essential alongside the score.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Severity scores inform but do not replace clinical judgment, especially in patients with hypoxia, sepsis, or significant comorbidity.",
  },

  "qsofa": {
    commonMistakes: [
      "Treating a qSOFA of 2 or higher as a diagnosis of sepsis rather than a prompt to escalate care.",
      "Assuming a qSOFA of 0 rules out sepsis, since the score has lower sensitivity than the full SOFA assessment.",
      "Using qSOFA thresholds in pregnancy, where normal blood pressure and respiratory rate shift with physiological changes."
    ],
    formulaExplanation:
      "The quick SOFA (qSOFA) score adds one point for each of: systolic blood pressure <= 100 mmHg, respiratory rate >= 22/min, and altered mental status (GCS < 15). The total ranges from 0 to 3.",
    variables: [
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg; a value of 100 or lower adds one point.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory Rate",
        explanation: "Respiratory rate per minute; a value of 22 or higher adds one point.",
      },
      {
        inputId: "mental-status",
        label: "Altered Mental Status",
        explanation: "Altered mental status (GCS < 15); Yes adds one point.",
      },
    ],
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
    evidence: {
      source: "Sepsis-3 / qSOFA Derivation",
      reference:
        "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):762-774.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Seymour CW, et al. JAMA. 2016;315(8):762-774.",
      ],
    },
    references: [
      {
        citation:
          "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):762-774.",
        level: "Derivation/Validation Study",
      },
    ],
    faq: [
      {
        question:
          "What does a qSOFA score mean?",
        answer:
          "Score 0: low concern. 1: moderate concern. 2 or more: high risk of sepsis-related organ dysfunction and mortality, prompting escalation of care, full SOFA assessment, and source evaluation.",
      },
      {
        question:
          "How does qSOFA differ from SIRS?",
        answer:
          "qSOFA uses 3 bedside criteria (altered mentation, fast breathing, low blood pressure) without lab values. SIRS uses 4 criteria including temperature and white cell count. qSOFA is more specific for sepsis-related mortality.",
      },
      {
        question:
          "Is qSOFA validated for emergency department use?",
        answer:
          "qSOFA was derived and validated primarily in non-ICU settings. It is intended as a bedside screening tool, not a diagnostic test. A low qSOFA does not exclude sepsis.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. qSOFA is a screening tool and must not replace full clinical assessment or delay treatment in patients with suspected sepsis.",
  },

  "gcs": {
    commonMistakes: [
      "Recording the worst response observed in a component instead of the best response the patient demonstrated.",
      "Scoring verbal as 1 for an intubated patient instead of documenting that component as not testable.",
      "Relying on the GCS total alone for prognosis without assessing pupils, brainstem function, or focal deficits."
    ],
    formulaExplanation:
      "The Glasgow Coma Scale is the sum of the best Eye (1-4), Verbal (1-5), and Motor (1-6) responses, giving a total from 3 (deep coma) to 15 (fully awake).",
    variables: [
      {
        inputId: "eye",
        label: "Eye Opening",
        explanation: "Best eye-opening response, scored 1 to 4 (1 = none, 4 = spontaneous).",
      },
      {
        inputId: "verbal",
        label: "Verbal Response",
        explanation: "Best verbal response, scored 1 to 5 (1 = none, 5 = oriented).",
      },
      {
        inputId: "motor",
        label: "Motor Response",
        explanation: "Best motor response, scored 1 to 6 (1 = none, 6 = obeys commands).",
      },
    ],
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
    evidence: {
      source: "Original GCS Description",
      reference:
        "Teasdale G, Jennett B. Assessment of coma and impaired consciousness: a practical scale. Lancet. 1974;304(7872):81-84.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Teasdale G, Jennett B. Lancet. 1974;304(7872):81-84.",
      ],
    },
    references: [
      {
        citation:
          "Teasdale G, Jennett B. Assessment of coma and impaired consciousness: a practical scale. Lancet. 1974;304(7872):81-84.",
        level: "Original Description",
      },
    ],
    faq: [
      {
        question: "What does a GCS score mean?",
        answer:
          "GCS 13–15 indicates mild impairment, 9–12 moderate, and 8 or below severe. A GCS of 8 or less is commonly used as a threshold to consider airway protection (intubation).",
      },
      {
        question: "How is pediatric GCS different?",
        answer:
          "For pre-verbal children, the verbal component is replaced with an age-appropriate scale (e.g., crying, inconsolable, irritable, cooing, oriented). The eye and motor components remain the same as the adult scale.",
      },
      {
        question: "Why should I record trends instead of a single score?",
        answer:
          "A single GCS score is a snapshot. A fall of 2 or more points over time indicates neurologic deterioration and is clinically significant. Serial assessments are more informative than any single measurement.",
      },
      {
        question: "Can sedation or intubation affect the GCS?",
        answer:
          "Yes. Sedation, paralysis, and intubation confound the verbal and sometimes motor components. In these cases, document a modified GCS with the specific components scored, and note the confounding factor.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The GCS is one component of neurologic assessment and must be interpreted alongside the full clinical picture.",
  },

  "shock-index": {
    commonMistakes: [
      "Treating a shock index above 0.7 as a diagnosis of shock instead of a trigger for clinical reassessment.",
      "Applying the adult normal range of 0.5 to 0.7 to a child, since normal values differ by age in children.",
      "Interpreting the ratio in a patient with a pacemaker or beta-blockade, where heart rate no longer reflects perfusion."
    ],
    faq: [
      {
        question: "What should I do when the shock index is elevated?",
        answer: "A shock index above 0.7 is commonly regarded as elevated and warrants investigation, while 0.5 to 0.7 is generally normal. An abnormal value does not diagnose shock or hypoperfusion; it calls for clinical reassessment with serial measurements, blood pressure trends, lactate, urine output, and perfusion findings. Progressively higher values suggest worsening hemodynamic reserve, particularly in trauma, hemorrhage, and sepsis, but the result must always be read within the full clinical picture."
      },
      {
        question: "Can the shock index be used in pediatric patients?",
        answer: "The calculator is intended as an adult bedside screen. Normal reference values differ in children and vary by age, so the adult range of 0.5 to 0.7 does not apply there. In children, use age-appropriate assessment and interpret vital signs alongside the clinical picture rather than relying on this ratio, which has not been validated as a fixed diagnostic threshold in that population."
      },
      {
        question: "Does a normal shock index rule out compensated shock?",
        answer: "No. A single value within 0.5 to 0.7 does not exclude compensated shock, because the ratio does not measure cardiac output, lactate, or tissue perfusion directly. Heart rate can also be modified by rate-control medications, pacemakers, arrhythmias, pain, and autonomic dysfunction, which can mask an abnormality. The index works best as a trend and as one component of a broader hemodynamic assessment."
      }
    ],
    formulaExplanation:
      "The shock index is the heart rate divided by the systolic blood pressure (SI = HR / SBP). Normal values are approximately 0.5-0.7; values of 0.9 or higher suggest hemodynamic compromise.",
    variables: [
      {
        inputId: "heart-rate",
        label: "Heart Rate",
        explanation: "Heart rate in beats per minute, used as the numerator.",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg, used as the denominator.",
      },
    ],
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
    evidence: {
      source: "Emergency Medicine / Critical Care",
      reference:
        "Rady MY, Smithline HA, Blake H, et al. A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department. Ann Emerg Med. 1994;24(4):685-690.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Rady MY, et al. Ann Emerg Med. 1994;24(4):685-690.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The shock index is a screening adjunct and must be interpreted with full hemodynamic and clinical assessment.",
  },

  "map": {
    commonMistakes: [
      "Averaging systolic and diastolic pressure equally instead of weighting diastolic twice, as the MAP formula requires.",
      "Concluding that perfusion is adequate from a single MAP value without checking cardiac output, lactate, or urine output.",
      "Relying on the calculated MAP in marked tachycardia, atrial fibrillation, or a very wide pulse pressure, where it is less reliable."
    ],
    formulaExplanation:
      "Mean arterial pressure is estimated as MAP = (SBP + 2 x DBP) / 3, weighting diastolic pressure twice because the cardiac cycle spends roughly twice as long in diastole as in systole.",
    variables: [
      {
        inputId: "sbp",
        label: "SBP",
        explanation: "Systolic blood pressure in mmHg, counted once in the numerator.",
      },
      {
        inputId: "dbp",
        label: "DBP",
        explanation: "Diastolic blood pressure in mmHg, counted twice in the numerator.",
      },
    ],
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
    evidence: {
      source: "Original MAP Formula / SSC Guidelines",
      reference:
        "Meaney E, Alva F, Moguel R, et al. Formula and nomogram for the sphygmomanometric calculation of the mean arterial pressure. Heart. 2000;84(1):64.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Meaney E, et al. Heart. 2000;84(1):64.",
        "Evans L, et al. Crit Care Med. 2021;49(11):e1063-e1143.",
      ],
    },
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
    faq: [
      {
        question:
          "What is a normal MAP?",
        answer:
          "Normal resting MAP is approximately 70-100 mmHg. In sepsis and septic shock, a MAP of 65 mmHg or more is a commonly cited target to support organ perfusion.",
      },
      {
        question:
          "How is MAP calculated?",
        answer:
          "MAP = Diastolic BP + 1/3 x (Systolic BP - Diastolic BP). This is an approximation; direct arterial measurement provides a more accurate value.",
      },
      {
        question:
          "Is MAP the same as perfusion pressure?",
        answer:
          "No. MAP is the average arterial pressure. Perfusion pressure also depends on venous pressure and cardiac output. A normal MAP does not guarantee adequate tissue perfusion.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. MAP targets should be individualized based on clinical context and institutional protocols.",
  },

  "mdrd": {
    commonMistakes: [
      "Using MDRD for a new clinical decision when CKD-EPI is available.",
      "Comparing MDRD results with CKD-EPI values when tracking a trend, since the equations give different numbers.",
      "Applying MDRD in children or pregnancy, where the equation has not been validated."
    ],
    formulaExplanation:
      "The MDRD equation estimates eGFR = 175 x (serum creatinine)^-1.154 x (age)^-0.203 x 0.742 (if female), with creatinine in mg/dL and age in years.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, raised to the -0.203 power.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex; females receive a 0.742 multiplier.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL, raised to the -1.154 power.",
      },
    ],
    faq: [
          {
        "question": "Is MDRD still used clinically?",
        "answer": "Most laboratories have transitioned to CKD-EPI, but MDRD may still appear on older reports. CKD-EPI is now preferred."
      },
      {
        "question": "Why is MDRD less accurate at higher GFR?",
        "answer": "The MDRD equation was developed in patients with known CKD and was not validated in healthy individuals, leading to underestimation at higher GFR values."
      }

  ],
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
    evidence: {
      source: "Nephrology",
      reference:
        "Levey AS, Bosch JP, Lewis JB, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130(6):461-470.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Levey AS, et al. Ann Intern Med. 1999;130(6):461-470.",
        "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. eGFR is an estimate and MDRD has been largely superseded by CKD-EPI for current clinical decisions.",
  },

  "fena": {
    commonMistakes: [
      "Ordering FENa in a patient on loop or thiazide diuretics, which blunts the low urinary sodium pattern the test depends on.",
      "Calling prerenal azotemia from a value below 1% in an older patient or one with chronic kidney disease, where thresholds lose reliability.",
      "Interpreting FENa in the first hours of acute kidney injury, before urine sodium reflects the underlying process."
    ],
    formulaExplanation:
      "Fractional excretion of sodium = (urine sodium x plasma creatinine) / (plasma sodium x urine creatinine) x 100, expressed as a percentage.",
    variables: [
      {
        inputId: "urineNa",
        label: "Urine Sodium",
        explanation: "Urine sodium in mmol/L, used in the numerator.",
      },
      {
        inputId: "plasmaNa",
        label: "Plasma Sodium",
        explanation: "Plasma sodium in mmol/L, used in the denominator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used in the denominator.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator.",
      },
    ],
    faq: [
          {
        "question": "What does FENa < 1% mean?",
        "answer": "A FENa < 1% suggests prerenal azotemia, meaning the kidneys are appropriately retaining sodium in response to decreased perfusion."
      },
      {
        "question": "When is FENa unreliable?",
        "answer": "FENa is unreliable in patients on diuretics, in chronic kidney disease, and in the elderly. Consider FEUrea in these situations."
      }

  ],
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
    evidence: {
      source: "Nephrology",
      reference:
        "Carvounis CP, et al. Significance of the fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62(3):1184-1191.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Carvounis CP, et al. Kidney Int. 2002;62(3):1184-1191.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FENa must be interpreted with the clinical context and is unreliable in patients on diuretics or with chronic kidney disease.",
  },

  "feurea": {
    commonMistakes: [
      "Using FEUrea in place of FENa when no diuretics have been given, even though FENa is better validated in that setting.",
      "Interpreting the result in severe liver disease, where reduced urea production distorts both plasma and urine urea.",
      "Overlooking corticosteroid use, a catabolic state, or protein intake, all of which alter urea handling and shift the value."
    ],
    formulaExplanation:
      "Fractional excretion of urea = (urine urea x plasma creatinine) / (plasma urea x urine creatinine) x 100, expressed as a percentage.",
    variables: [
      {
        inputId: "urineUrea",
        label: "Urine Urea",
        explanation: "Urine urea in mg/dL, used in the numerator.",
      },
      {
        inputId: "plasmaUrea",
        label: "Plasma Urea",
        explanation: "Plasma urea in mg/dL, used in the denominator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used in the denominator.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator.",
      },
    ],
    faq: [
          {
        "question": "When should I use FEUrea instead of FENa?",
        "answer": "Use FEUrea when the patient has received diuretics, which can increase urinary sodium and make FENa unreliable."
      },
      {
        "question": "What does FEUrea > 50% mean?",
        "answer": "A FEUrea > 50% suggests intrinsic renal injury such as acute tubular necrosis."
      }

  ],
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
    evidence: {
      source: "Nephrology",
      reference:
        "Pépin MN, et al. Reassessment of the fractional excretion of urea for the differential diagnosis of acute renal failure. Clin Invest Med. 2007;30(5):E163-167.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Pépin MN, et al. Clin Invest Med. 2007;30(5):E163-167.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEUrea is a complementary test and must be interpreted alongside FENa, urine studies, and clinical context.",
  },

  "albumin-creatinine-ratio": {
    commonMistakes: [
      "Diagnosing CKD from a single abnormal ACR result.",
      "Ignoring transient albuminuria caused by fever, exercise, or urinary tract infection.",
      "Using ACR alone without assessing kidney function (eGFR)."
    ],
    clinicalPearl: "Persistent albuminuria is one of the earliest indicators of chronic kidney disease and should always be interpreted together with eGFR.",
    formulaExplanation:
      "The urine albumin-to-creatinine ratio is urine albumin divided by urine creatinine (ACR = albumin / creatinine). With albumin in mg/L and creatinine in g/L, the result is expressed in mg/g.",
    variables: [
      {
        inputId: "albumin",
        label: "Urine Albumin",
        explanation: "Urine albumin concentration in mg/L, used as the numerator.",
      },
      {
        inputId: "creatinine",
        label: "Urine Creatinine",
        explanation: "Urine creatinine concentration in g/L, used as the denominator.",
      },
    ],
    faq: [
          {
        "question": "What is the Albumin-to-Creatinine Ratio (ACR)?",
        "answer": "The Albumin-to-Creatinine Ratio estimates the amount of albumin excreted in urine while correcting for urine concentration using creatinine."
      },
      {
        "question": "Why is ACR important?",
        "answer": "ACR is one of the earliest markers of kidney damage and is recommended for screening chronic kidney disease, especially in patients with diabetes or hypertension."
      },
      {
        "question": "What is considered a normal ACR?",
        "answer": "An ACR below 30 mg/g is considered normal or mildly increased (A1)."
      },
      {
        "question": "When should ACR be repeated?",
        "answer": "Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months."
      }

  ],
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
    evidence: {
      source: "Nephrology / KDIGO",
      reference:
        "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Persistent albuminuria and the diagnosis of CKD require confirmatory testing over at least 3 months alongside eGFR.",
  },

  "corrected-calcium": {
    commonMistakes: [
      "Entering albumin in g/L rather than g/dL produces an exaggerated correction because the formula expects a value around 4.0 g/dL.",
      "Using the corrected value to screen for hypercalcemia, a setting in which this albumin correction has not been validated.",
      "Trusting the result when albumin is below 2.0 g/dL, where the fixed calcium-albumin binding assumption behind the correction breaks down."
    ],
    formulaExplanation:
      "Corrected calcium = measured calcium + 0.8 x (4.0 - serum albumin), with calcium in mg/dL and albumin in g/dL. It estimates the calcium level expected if albumin were normal.",
    variables: [
      {
        inputId: "calcium",
        label: "Measured Calcium",
        explanation: "Measured total serum calcium in mg/dL.",
      },
      {
        inputId: "albumin",
        label: "Albumin",
        explanation: "Serum albumin in g/dL; each 1 g/dL below 4.0 adds 0.8 mg/dL to the corrected calcium.",
      },
    ],
    faq: [
          {
        "question": "Why correct calcium for albumin?",
        "answer": "About 40–50% of serum calcium is bound to albumin. When albumin is low (e.g. liver disease, nephrotic syndrome), total calcium appears falsely low even though ionized (biologically active) calcium may be normal. The correction factor estimates what total calcium would be at a normal albumin of 4.0 g/dL."
      },
      {
        "question": "What does a corrected calcium above normal mean?",
        "answer": "A corrected calcium > 10.5 mg/dL suggests true hypercalcemia. Common causes include primary hyperparathyroidism, malignancy, vitamin D toxicity, and granulomatous disease. Confirm with ionized calcium and investigate accordingly."
      },
      {
        "question": "Is ionized calcium better than corrected calcium?",
        "answer": "Yes. Ionized (free) calcium directly measures the physiologically active fraction and is not affected by albumin. It is the preferred test, but the correction is useful when ionized calcium measurement is unavailable."
      },
      {
        "question": "Can this formula be used in children?",
        "answer": "The formula is validated in adults. Neonatal and paediatric reference ranges and correction factors differ; consult local guidelines for those populations."
      }

  ],
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
          "Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. Br Med J. 1973;4(5893):643-646.",
        level: "Original Description",
      },
    ],
    evidence: {
      source: "Clinical Biochemistry",
      reference:
        "Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. Br Med J. 1973;4(5893):643-646.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Payne RB, et al. Br Med J. 1973;4(5893):643-646.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The correction is an estimate; ionized calcium is the preferred measurement in the critically ill and when hypercalcemia is suspected.",
  },

  "homa-b": {
    commonMistakes: [
      "Entering fasting glucose in mg/dL for an equation that expects mmol/L and subtracts 3.5, which wrecks the result before it is even interpreted.",
      "Interpreting a HOMA-B of 200% or higher as strong beta-cell reserve in a newly diagnosed patient when glucotoxicity can transiently inflate the value.",
      "Substituting HOMA-B for C-peptide when a precise answer on beta-cell reserve is needed, since the index is only a fasting estimate of secretion."
    ],
    formulaExplanation:
      "HOMA-B = (20 x fasting insulin) / (fasting glucose (mmol/L) - 3.5), an estimate of pancreatic beta-cell function.",
    variables: [
      {
        inputId: "glucose",
        label: "Fasting Glucose",
        explanation: "Fasting plasma glucose in mmol/L, reduced by 3.5 in the denominator.",
      },
      {
        inputId: "insulin",
        label: "Fasting Insulin",
        explanation: "Fasting serum insulin in microU/mL, multiplied by 20 in the numerator.",
      },
    ],
    faq: [
          {
        "question": "What does a low HOMA-B mean?",
        "answer": "A HOMA-B below 100% suggests reduced beta-cell function, meaning the pancreas is producing less insulin than expected for the glucose level. This is common in progressive type 2 diabetes."
      },
      {
        "question": "How is HOMA-B different from HOMA-IR?",
        "answer": "HOMA-B estimates how well the pancreas produces insulin (beta-cell function), while HOMA-IR estimates how well the body responds to it (insulin resistance)."
      },
      {
        "question": "What is normal HOMA-B?",
        "answer": "A normal HOMA-B is approximately 100–200%. Values below 50% indicate significant beta-cell dysfunction."
      }

  ],
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
    evidence: {
      source: "Endocrinology / Diabetes",
      reference:
        "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28(7):412-419.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Matthews DR, et al. Diabetologia. 1985;28(7):412-419.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and research purposes only. HOMA-B is an estimate of beta-cell function and must not be used as a standalone diagnostic test.",
  },

  "insulin-sensitivity": {
    commonMistakes: [
      "Quoting a score of 0.4 or higher to reassure a patient that insulin resistance is excluded, even though the cutoffs shown for this index are illustrative rather than validated.",
      "Reporting the score in a patient with type 1 diabetes or on exogenous insulin, where the HOMA-IR it is derived from breaks down.",
      "Comparing scores across laboratories that use different insulin assays, since assay variability in the input HOMA-IR carries straight into this reciprocal."
    ],
    formulaExplanation:
      "Insulin sensitivity is estimated as the reciprocal of HOMA-IR (IS = 1 / HOMA-IR). Higher values indicate greater insulin sensitivity.",
    variables: [
      {
        inputId: "homaIr",
        label: "HOMA-IR",
        explanation: "HOMA-IR value from which the reciprocal is taken to estimate insulin sensitivity.",
      },
    ],
    faq: [
          {
        "question": "What is insulin sensitivity?",
        "answer": "Insulin sensitivity measures how effectively the body's cells respond to insulin. A higher value means cells are more responsive, requiring less insulin to manage blood glucose."
      },
      {
        "question": "How is this different from HOMA-IR?",
        "answer": "This is simply 1 / HOMA-IR. It presents the same information in a more intuitive direction: higher values mean better sensitivity."
      },
      {
        "question": "What is a good insulin sensitivity score?",
        "answer": "A score > 0.4 is generally considered good insulin sensitivity. Below 0.2 suggests significant insulin resistance."
      }

  ],
    clinicalPurpose:
      "Presents insulin resistance as its reciprocal so that higher values indicate better insulin sensitivity, providing an intuitive complement to HOMA-IR.",
    howToUse: [
      "Enter the patient's HOMA-IR value.",
      "Review the insulin sensitivity score.",
      "Higher values (toward 1.0) reflect better sensitivity.",
    ],
    interpretation: {
      guide:
        "A score > 0.4 indicates good insulin sensitivity; a score between 0.2 and 0.4 suggests reduced sensitivity; and a score of 0.2 or less indicates significant insulin resistance.",
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
    evidence: {
      source: "Endocrinology / Diabetes",
      reference:
        "Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27(6):1487-1495.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wallace TM, Levy JC, Matthews DR. Diabetes Care. 2004;27(6):1487-1495.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and research purposes only. Insulin sensitivity derived from HOMA-IR is an estimate and should not be used as a standalone diagnostic test.",
  },

  "bsa": {
    commonMistakes: [
      "Entering height in meters instead of centimeters, which breaks the 3600 constant in the Mosteller formula.",
      "Using BSA to dose a medication whose label specifies weight-based dosing instead.",
      "Using the calculated BSA in place of measuring burn surface area in a burn patient."
    ],
    formulaExplanation:
      "Body surface area is calculated with the Mosteller formula: BSA (m^2) = sqrt((height (cm) x weight (kg)) / 3600).",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms, multiplied by height in the numerator.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, multiplied by weight before dividing by 3600.",
      },
    ],
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
    faq: [
      {
        question:
          "What is BSA used for?",
        answer:
          "BSA is used to index physiological parameters (e.g., cardiac output) and to dose certain medications that are normalized to body surface area, particularly in oncology.",
      },
      {
        question:
          "Which BSA formula should I use?",
        answer:
          "The Mosteller formula is most commonly used. Different formulas (DuBois, Haycock) give slightly different results. Use the same formula consistently within your institution.",
      },
      {
        question:
          "Is BSA the same as BMI?",
        answer:
          "No. BSA measures total body surface area in m2. BMI measures weight relative to height squared. BSA is used for dosing and physiological indexing; BMI is a screening tool for body fatness.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dosing decisions must always follow drug-specific labeling and institutional protocols.",
    evidence: {
      source: "Anthropometry / Oncology",
      reference: "Mosteller RD. N Engl J Med. 1987;317(17):1098.",
      version: "1987",
      updatedAt: "2026-08",
      references: [
        "Mosteller RD. N Engl J Med. 1987;317(17):1098.",
      ],
    },
  },

  "ideal-body-weight": {
    commonMistakes: [
      "Applying the Devine formula by hand with height in centimeters where the formula expects inches.",
      "Using ideal body weight to diagnose underweight or obesity when BMI is the appropriate screening measure.",
      "Using the Devine result in a child, since the equation was derived in and validated only for adults."
    ],
    faq: [
      {
        question: "What is ideal body weight used for?",
        answer: "Ideal body weight is a height- and sex-based reference weight used to guide medication dosing and to derive adjusted body weight in patients above their ideal weight. The Devine equation behind this calculator was originally developed for aminoglycoside dosing in adults. It does not account for body composition or frame size, and for some drugs actual body weight may be the more appropriate dosing weight, so drug-specific guidance should always be checked."
      },
      {
        question: "Why does the selected sex change the result?",
        answer: "The Devine formula starts from a different constant for each sex: males begin at 50 kg and females at 45.5 kg, and the same 2.3 kg is then added or subtracted per inch away from 60 inches of height. Choosing the wrong sex option therefore shifts the whole result, which matters because this value feeds into weight-based dosing calculations."
      },
      {
        question: "Can ideal body weight be used for children?",
        answer: "No. The Devine equation was derived for adults and has not been validated in children, who need age- and height-based references instead. Ideal body weight is also only a mathematical reference rather than a measure of health, and competing equations such as Robinson, Miller, and Hamwi give different values for the same patient, so the same formula should be used consistently when results are compared."
      }
    ],
    formulaExplanation:
      "Ideal body weight uses the Devine formula: for males IBW (kg) = 50 + 2.3 x (height in inches - 60); for females IBW (kg) = 45.5 + 2.3 x (height in inches - 60), where inches = height (cm) / 2.54.",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which sets the base weight (50 kg for males, 45.5 kg for females).",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, converted to inches (cm / 2.54) for the Devine formula.",
      },
    ],
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
    evidence: {
      source: "Internal Medicine / Pharmacy",
      reference: "Devine BJ. Drug Intell Clin Pharm. 1974;8(11):650-655.",
      version: "1974",
      updatedAt: "2026-08",
      references: [
        "Devine BJ. Drug Intell Clin Pharm. 1974;8(11):650-655.",
      ],
    },
  },

  "adjusted-body-weight": {
    commonMistakes: [
      "Applying the 0.4 correction factor to every medication as though it were validated across all drug classes.",
      "Calculating an adjusted weight for a normal-weight patient, where the adjustment adds nothing over ideal weight.",
      "Using adjusted body weight for a child when pediatric weight references should apply instead."
    ],
    faq: [
      {
        question: "When should adjusted body weight be used?",
        answer: "Use it for overweight and obese adults when the drug label or guidance specifically calls for an adjusted weight, because actual weight can over-dose while ideal weight can under-dose such patients. The result always falls between ideal and actual body weight. Whether actual, ideal, or adjusted weight is correct depends on the medication, so confirm the drug-specific recommendation before letting this value drive a dose calculation."
      },
      {
        question: "Why does the formula add only 40% of the excess weight?",
        answer: "The 0.4 factor is the conventional correction used to blend ideal body weight with the excess above it, but it is empirical rather than derived from pharmacokinetic data. The optimal correction varies by drug class, has not been validated across all dosing nomograms, and different sources report different factors. Always read the result alongside the specific medication's distribution characteristics and institutional policy."
      },
      {
        question: "Is adjusted body weight a measure of lean mass?",
        answer: "No. Adjusted body weight is a dosing weight, not a measure of body composition or lean tissue. It simply blends ideal body weight with a fraction of the difference between actual and ideal weight, and it applies to adults only. When a drug label specifies actual or ideal weight, this adjustment should not be used, and pediatric dosing requires other references."
      }
    ],
    formulaExplanation:
      "Adjusted body weight = IBW + 0.4 x (actual weight - IBW), where IBW is the Devine ideal body weight derived from sex and height. It is used for drug dosing in patients substantially above ideal weight.",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex used to compute the Devine ideal body weight.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters used to compute the Devine ideal body weight.",
      },
      {
        inputId: "weight",
        label: "Actual Weight",
        explanation: "Actual body weight in kilograms; 40% of the difference between actual and ideal weight is added to the IBW.",
      },
    ],
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
    evidence: {
      source: "Internal Medicine / Pharmacy",
      reference: "ClinCalc Drug Dosing Reference. Adjusted Body Weight.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "ClinCalc Drug Dosing Reference. Adjusted Body Weight.",
        "ASHP Clinical Guidelines on medication dosing in obese patients.",
      ],
    },
  },

  "child-pugh": {
    commonMistakes: [
      "Applying Child-Pugh in acute liver failure, where the score has not been validated.",
      "Scoring a total bilirubin of exactly 3 mg/dL as 3 points when the 2 to 3 mg/dL band carries only 2 points.",
      "Grading ascites or encephalopathy inconsistently between assessors without a standardized examination, which shifts the total."
    ],
    formulaExplanation:
      "The Child-Pugh score sums five components each scored 1-3: total bilirubin, serum albumin, INR (prothrombin time), ascites, and hepatic encephalopathy. Totals of 5-6 are Class A, 7-9 are Class B, and 10-15 are Class C.",
    variables: [
      {
        inputId: "bilirubin",
        label: "Total Bilirubin",
        explanation: "Total bilirubin, scored 1-3 based on the serum level.",
      },
      {
        inputId: "albumin",
        label: "Serum Albumin",
        explanation: "Serum albumin, scored 1-3 (lower albumin scores higher).",
      },
      {
        inputId: "inr",
        label: "INR",
        explanation: "International normalized ratio, scored 1-3 based on prolongation.",
      },
      {
        inputId: "ascites",
        label: "Ascites",
        explanation: "Clinical degree of ascites, scored 1-3 (none to severe).",
      },
      {
        inputId: "encephalopathy",
        label: "Hepatic Encephalopathy",
        explanation: "Grade of hepatic encephalopathy, scored 1-3 (none to severe).",
      },
    ],
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
      version: "1973",
      references: [
        "Pugh RNH, et al. Br J Surg. 1973;60(8):646-649.",
        "Child CG, Turcotte JG. Major Probl Clin Surg. 1964;1:1-85.",
        "AASLD Practice Guidance on cirrhosis.",
      ],
    },
    faq: [
      {
        question:
          "What does a Child-Pugh score mean?",
        answer:
          "Class A (5-6 points): well-compensated, about 95% 1-year survival. Class B (7-9 points): significant compromise, about 80% 1-year survival. Class C (10-15 points): decompensated, about 45% 1-year survival.",
      },
      {
        question:
          "What does Child-Pugh assess?",
        answer:
          "It evaluates five parameters: bilirubin, albumin, INR, ascites, and hepatic encephalopathy. Each scores 1-3 points. The total classifies cirrhosis severity and estimates prognosis.",
      },
      {
        question:
          "Can Child-Pugh replace MELD for transplant listing?",
        answer:
          "No. MELD (and MELD-Na) is the preferred tool for liver transplant allocation in most regions. Child-Pugh remains useful for surgical risk assessment and general prognosis.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Child-Pugh score is one component of a full prognostic assessment and does not replace specialist evaluation.",
  },

  "corrected-anion-gap": {
    commonMistakes: [
      "Running the albumin correction in a patient whose albumin is normal, where the standard anion gap calculation is already sufficient.",
      "Assuming the 2.5 mmol/L per g/dL factor is exact, since other sources use 2.4 or 2.8 and the relationship also varies with pH.",
      "Expecting the corrected number to name the cause of the acidosis, when it only signals that unmeasured anions are present."
    ],
    formulaExplanation:
      "The albumin-corrected anion gap = (Na - (Cl + HCO3)) + 2.5 x (4.0 - serum albumin). The correction reveals a high anion gap that would otherwise be masked by hypoalbuminemia.",
    variables: [
      {
        inputId: "sodium",
        label: "Sodium",
        explanation: "Serum sodium in mmol/L, used in the uncorrected anion gap.",
      },
      {
        inputId: "chloride",
        label: "Chloride",
        explanation: "Serum chloride in mmol/L, added to bicarbonate in the anion gap.",
      },
      {
        inputId: "bicarbonate",
        label: "Bicarbonate (HCO3)",
        explanation: "Serum bicarbonate in mmol/L, added to chloride in the anion gap.",
      },
      {
        inputId: "albumin",
        label: "Albumin",
        explanation: "Serum albumin in g/dL; each 1 g/dL below 4.0 adds 2.5 mmol/L to the corrected gap.",
      },
    ],
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
    commonMistakes: [
      "Entering glucose in mmol/L instead of mg/dL, which quietly corrupts the estimate because the formula divides glucose by 18.",
      "Deriving an osmolar gap from this calculated value without a simultaneous laboratory-measured osmolality.",
      "Assuming the formula accounts for ethanol, even though alcohol is not one of the three solutes it includes."
    ],
    formulaExplanation:
      "Calculated serum osmolality = 2 x sodium + glucose / 18 + BUN / 2.8, with sodium in mmol/L and glucose and BUN in mg/dL.",
    variables: [
      {
        inputId: "sodium",
        label: "Sodium",
        explanation: "Serum sodium in mmol/L, multiplied by 2 as the dominant osmotic contributor.",
      },
      {
        inputId: "glucose",
        label: "Glucose",
        explanation: "Serum glucose in mg/dL, divided by 18 before being added.",
      },
      {
        inputId: "bun",
        label: "BUN",
        explanation: "Blood urea nitrogen in mg/dL, divided by 2.8 before being added.",
      },
    ],
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
    commonMistakes: [
      "Calculating TTKG when urine osmolality is lower than plasma osmolality, contrary to the assumption the formula requires.",
      "Combining potassium and osmolality values that were not measured at the same time, which makes the gradient uninterpretable.",
      "Reading a TTKG in a patient taking loop or thiazide diuretics without caution, since altered urine electrolytes can invalidate it."
    ],
    formulaExplanation:
      "Transtubular potassium gradient = (urine potassium x plasma osmolality) / (plasma potassium x urine osmolality). It estimates renal potassium handling in the distal nephron.",
    variables: [
      {
        inputId: "urineK",
        label: "Urine Potassium",
        explanation: "Urine potassium in mmol/L, used in the numerator.",
      },
      {
        inputId: "plasmaK",
        label: "Plasma Potassium",
        explanation: "Plasma potassium in mmol/L, used in the denominator.",
      },
      {
        inputId: "urineOsmolality",
        label: "Urine Osmolality",
        explanation: "Urine osmolality in mOsm/kg, used in the denominator.",
      },
      {
        inputId: "plasmaOsmolality",
        label: "Plasma Osmolality",
        explanation: "Plasma osmolality in mOsm/kg, used in the numerator.",
      },
    ],
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
    commonMistakes: [
      "Multiplying calcium and phosphate reported in different units, since the product is meaningful only when both values are in mg/dL.",
      "Treating the product as a direct measurement of vascular calcification rather than a risk estimate that imaging must confirm.",
      "Adjusting management solely to lower the product while ignoring PTH, vitamin D, and the rest of the mineral metabolism picture."
    ],
    formulaExplanation:
      "The calcium-phosphate product = serum calcium (mg/dL) x serum phosphate (mg/dL), used to assess the risk of vascular and soft-tissue calcification in chronic kidney disease.",
    variables: [
      {
        inputId: "calcium",
        label: "Calcium",
        explanation: "Serum calcium in mg/dL, used as a factor in the product.",
      },
      {
        inputId: "phosphate",
        label: "Phosphate",
        explanation: "Serum phosphate in mg/dL, used as a factor in the product.",
      },
    ],
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

  "estimated-average-glucose": {
    commonMistakes: [
      "Trusting eAG in a patient with sickle cell trait or recent transfusion, conditions that alter red cell lifespan and distort the A1c feeding the equation.",
      "Using eAG to judge hypoglycemia risk or day-to-day variability, questions that call for self-monitored or continuous glucose data instead.",
      "Expecting eAG to reproduce a personal meter average exactly, since it was derived from continuous glucose monitoring studies as a population estimate."
    ],
    formulaExplanation:
      "Estimated average glucose (mg/dL) = 28.7 x HbA1c (%) - 46.7, the ADAG equation relating HbA1c to mean plasma glucose.",
    variables: [
      {
        inputId: "a1c",
        label: "HbA1c",
        explanation: "Glycated hemoglobin in percent, multiplied by 28.7 and reduced by 46.7 to estimate average glucose.",
      },
    ],
    clinicalPurpose:
      "Estimates mean plasma glucose from HbA1c using the ADAG equation, translating A1c into a mg/dL value patients can compare with home glucose readings.",
    howToUse: [
      "Enter the NGSP-standardized HbA1c value (%).",
      "Review the estimated average glucose in mg/dL.",
      "Interpret against the normal range of 70–140 mg/dL and the ADA target of eAG ≈154 mg/dL.",
    ],
    interpretation: {
      guide:
        "eAG ≤140 mg/dL is normal, eAG above 140 up to 200 mg/dL is the pre-diabetic range, and eAG >200 mg/dL is in the diabetic range. eAG reflects average glucose over the preceding 2–3 months.",
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
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use NGSP-standardized A1c values and interpret within the clinical context.",
  },

  "bmi-for-pediatrics": {
    commonMistakes: [
      "Applying adult BMI weight-status cutoffs to an adolescent ignores that pediatric results are classified only by BMI-for-age percentile.",
      "Calculating BMI-for-age for a child under 2 years uses the wrong reference, since weight-for-length WHO charts apply below that age.",
      "Entering weight in pounds rather than kilograms produces an incorrect BMI and a misclassified percentile for the child."
    ],
    clinicalPurpose:
      "Calculates BMI for children and adolescents (ages 2–20) and classifies weight status using CDC 2000 BMI-for-age percentile references.",
    formulaExplanation:
      "Pediatric BMI is calculated as weight in kilograms divided by the square of height in meters (BMI = weight (kg) / height (m)²). Since height is provided in centimeters, the calculator converts height to meters before squaring; the resulting BMI value is interpreted using age- and sex-specific percentile references.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years used to select the appropriate age- and sex-specific BMI percentile reference.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Sex determines the age-specific percentile reference used to interpret BMI in children and adolescents.",
      },
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms used in the BMI calculation.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, converted to meters and squared in the denominator for the BMI calculation.",
      },
    ],
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
    commonMistakes: [
      "Entering height in meters instead of centimeters, which the Boer formula requires.",
      "Dosing a drug with lean body weight when its label specifies actual or ideal body weight.",
      "Reading the result as a direct measurement of body fat or muscle mass."
    ],
    formulaExplanation:
      "Lean body weight uses the Boer formula: males LBM (kg) = 0.407 x weight + 0.267 x height - 19.2; females LBM (kg) = 0.252 x weight + 0.473 x height - 48.3, with weight in kg and height in cm.",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which selects the male or female Boer coefficients.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, multiplied by the sex-specific height coefficient.",
      },
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Weight in kilograms, multiplied by the sex-specific weight coefficient.",
      },
    ],
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

  "harris-benedict": {
    commonMistakes: [
      "Applying Harris-Benedict to overweight or obese patients without caution, since the equation may overestimate their energy needs.",
      "Assuming the historical 1918-1919 coefficients are interchangeable with the revised equation implemented in this calculator.",
      "Using this prediction in place of measured energy expenditure when caring for a critically ill patient."
    ],
    formulaExplanation:
      "The revised Harris-Benedict equation estimates BMR: males 88.362 + 13.397 x weight + 4.799 x height - 5.677 x age; females 447.593 + 9.247 x weight + 3.098 x height - 4.33 x age, with weight in kg, height in cm, and age in years.",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which selects the male or female equation constants.",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, subtracted using the sex-specific age coefficient.",
      },
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Weight in kilograms, multiplied by the sex-specific weight coefficient.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, multiplied by the sex-specific height coefficient.",
      },
    ],
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
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Energy estimates should be individualized and verified clinically.",
  },

  "sodium-deficit": {
    commonMistakes: [
      "Relying on this calculated deficit as the sole guide in acute severe symptomatic hyponatremia instead of hypertonic saline and institutional protocols.",
      "Entering a desired sodium that implies correction beyond safe limits, a constraint the formula itself does not enforce.",
      "Ignoring ongoing free water intake and losses when turning the estimated deficit into a replacement plan."
    ],
    formulaExplanation:
      "Sodium deficit = total body water x (desired sodium - current sodium), where total body water is estimated as 0.6 x weight (kg). Negative values are reported as zero.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms; total body water is estimated as 0.6 x weight.",
      },
      {
        inputId: "currentNa",
        label: "Current Sodium",
        explanation: "Measured serum sodium in mmol/L, subtracted from the desired sodium.",
      },
      {
        inputId: "desiredNa",
        label: "Desired Sodium",
        explanation: "Target serum sodium in mmol/L, the minuend in the sodium difference.",
      },
    ],
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
    commonMistakes: [
      "Entering the count interval in seconds when the formula divides beats by minutes.",
      "Diagnosing a rhythm abnormality from the calculated rate alone, since the number does not identify the underlying rhythm.",
      "Interpreting a resting rate below 60 as pathology in a well-trained athlete without considering fitness and medications."
    ],
    formulaExplanation:
      "Heart rate is the number of beats divided by the elapsed time in minutes (HR = beats / minutes).",
    variables: [
      {
        inputId: "beats",
        label: "Number of Beats",
        explanation: "Number of heart beats counted during the measurement interval.",
      },
      {
        inputId: "time",
        label: "Time",
        explanation: "Duration of the measurement in minutes, used as the divisor.",
      },
    ],
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
    commonMistakes: [
      "Dividing hip circumference by waist circumference inverts the ratio and can turn a high-risk result into the low-risk range.",
      "Applying the 0.85 female threshold to a man or the 0.90 male threshold to a woman misclassifies risk because the cutoffs are sex-specific.",
      "Measuring the waist at the navel instead of at the rib-to-crest midpoint shifts the ratio so it cannot be compared with the 0.90 and 0.85 cutoffs."
    ],
    formulaExplanation:
      "Waist-to-hip ratio = waist circumference / hip circumference. Risk thresholds are sex-specific.",
    variables: [
      {
        inputId: "waist",
        label: "Waist Circumference",
        explanation: "Waist circumference in cm, used as the numerator.",
      },
      {
        inputId: "hip",
        label: "Hip Circumference",
        explanation: "Hip circumference in cm, used as the denominator.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, used to apply sex-specific risk thresholds for central adiposity.",
      },
    ],
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
        sex: "1",
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
    commonMistakes: [
      "Choosing an activity factor outside the supported 1 to 2.5 range, which the calculator does not validate.",
      "Ignoring fever or ongoing illness when applying the result, since neither is reflected in the BMR-times-factor calculation.",
      "Entering a BMR that was not derived from a validated estimate or measurement, because the output inherits that error directly."
    ],
    formulaExplanation:
      "Estimated daily calorie requirement = BMR x activity factor, where the activity factor scales basal energy expenditure for the patient's physical activity level.",
    variables: [
      {
        inputId: "bmr",
        label: "Basal Metabolic Rate",
        explanation: "Basal metabolic rate in kcal/day, multiplied by the activity factor.",
      },
      {
        inputId: "activity",
        label: "Activity Factor",
        explanation: "Multiplier reflecting physical activity level applied to the BMR.",
      },
    ],
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
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Calorie targets are estimates and nutrition plans should be individualized.",
  },

  "fluid-requirement": {
    commonMistakes: [
      "Ordering the estimated volume unchanged for a patient with fever, vomiting, or diarrhea, who has ongoing losses the rule ignores.",
      "Reading the result as a complete prescription, since it specifies neither electrolyte content nor administration route.",
      "Applying the fixed per-kilogram estimate in heart failure or renal impairment, where fluid restriction may be required."
    ],
    formulaExplanation:
      "Estimated daily fluid requirement = weight (kg) x 35 mL/kg/day.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms, multiplied by 35 mL/kg/day.",
      },
    ],
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
    commonMistakes: [
      "Applying 100 mL/kg to the entire body weight instead of stepping down to 50 mL/kg after the first 10 kg and 20 mL/kg above 20 kg.",
      "Infusing the calculated daily volume as an hourly rate, which would deliver many times the intended maintenance amount.",
      "Using the Holliday-Segar total to replace an existing fluid deficit, because the rule covers maintenance needs only."
    ],
    formulaExplanation:
      "The Holliday-Segar method estimates daily maintenance fluids: 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg for each kilogram above 20 kg.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms, used to select the Holliday-Segar rate tier.",
      },
    ],
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
    commonMistakes: [
      "Applying the PERC rule to a patient with intermediate or high pre-test probability, in whom a negative result is not valid.",
      "Counting seven of the eight criteria as enough to rule out pulmonary embolism, when all eight must be met.",
      "Interpreting a PERC-positive result as confirming pulmonary embolism, when it only means further testing is needed."
    ],
    formulaExplanation:
      "The PERC rule counts how many of eight criteria are met (age under 50, heart rate under 100, oxygen saturation 95% or higher, no hemoptysis, no estrogen use, no prior DVT/PE, no unilateral leg swelling, no recent surgery/trauma). When all 8 criteria are met (PERC negative) PE can be considered ruled out in a patient with low pre-test probability.",
    variables: [
      {
        inputId: "age",
        label: "Age less than 50 years",
        explanation: "Select Yes when age is under 50; Yes counts as one criterion met.",
      },
      {
        inputId: "heart-rate",
        label: "Heart rate less than 100 bpm",
        explanation: "Select Yes when heart rate is under 100 bpm; Yes counts as one criterion met.",
      },
      {
        inputId: "oxygen-saturation",
        label: "Oxygen saturation >= 95% on room air",
        explanation: "Select Yes when SpO2 is 95% or higher on room air; Yes counts as one criterion met.",
      },
      {
        inputId: "hemoptysis",
        label: "No hemoptysis",
        explanation: "Select Yes when there is no hemoptysis; Yes counts as one criterion met.",
      },
      {
        inputId: "estrogen",
        label: "No estrogen use",
        explanation: "Select Yes when there is no estrogen use; Yes counts as one criterion met.",
      },
      {
        inputId: "prior-dvt-pe",
        label: "No prior DVT or PE",
        explanation: "Select Yes when there is no prior DVT or PE; Yes counts as one criterion met.",
      },
      {
        inputId: "leg-swelling",
        label: "No unilateral leg swelling",
        explanation: "Select Yes when there is no unilateral leg swelling; Yes counts as one criterion met.",
      },
      {
        inputId: "surgery-trauma",
        label: "No surgery/trauma requiring hospitalization in past 4 weeks",
        explanation: "Select Yes when there has been no recent surgery or trauma; Yes counts as one criterion met.",
      },
    ],
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
    evidence: {
      source: "PERC Rule Derivation / Validation",
      reference:
        "Kline JA, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kline JA, et al. J Thromb Haemost. 2004;2(8):1247-1255.",
        "Kline JA, et al. Ann Emerg Med. 2004;44(5):490-502.",
      ],
    },
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
    faq: [
      {
        question:
          "What does a PERC-negative result mean?",
        answer:
          "All 8 criteria met (PERC negative): PE can be safely ruled out without D-dimer or imaging. Fewer than 8 met (PERC positive): proceed with D-dimer and/or CT pulmonary angiography.",
      },
      {
        question:
          "When should I apply the PERC rule?",
        answer:
          "Only in adult emergency patients with low pre-test probability of PE (typically Wells 4 or less or gestalt low). Do not use in patients with intermediate or high pre-test probability.",
      },
      {
        question:
          "Can PERC be used in pregnancy?",
        answer:
          "No. The original PERC derivation excluded pregnant patients. Use pregnancy-specific PE assessment pathways instead.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The PERC rule applies only to patients with a low pre-test probability of PE and does not replace clinical judgment.",
  },

  "wells-pe": {
    commonMistakes: [
      "Awarding 1 point for clinical signs of DVT when the Wells PE item is worth 3 points, which underestimates the total.",
      "Using the two-tier cutoff of 4 points for the three-tier interpretation, which uses 0 to 1, 2 to 6, and over 6.",
      "Treating a score of 4 or less as excluding pulmonary embolism without a high-sensitivity D-dimer, when it only identifies candidacy for testing."
    ],
    formulaExplanation:
      "The Wells PE score assigns 3 points each for clinical signs of DVT and for PE being the most likely diagnosis, 1.5 points each for heart rate over 100 bpm, immobilization/surgery, and prior DVT/PE, and 1 point each for hemoptysis and active malignancy. A two-tier interpretation treats a score above 4 as PE likely.",
    variables: [
      {
        inputId: "dvt-signs",
        label: "Clinical signs/symptoms of DVT",
        explanation: "Leg swelling or pain on palpation suggesting DVT; Yes adds 3 points.",
      },
      {
        inputId: "pe-most-likely",
        label: "PE judged to be the most likely diagnosis",
        explanation: "Clinical gestalt that PE is the most likely diagnosis; Yes adds 3 points.",
      },
      {
        inputId: "tachycardia",
        label: "Heart rate > 100 bpm",
        explanation: "Heart rate greater than 100 bpm; Yes adds 1.5 points.",
      },
      {
        inputId: "immobilization",
        label: "Immobilization >= 3 days or surgery within previous 4 weeks",
        explanation: "Immobilization or recent surgery; Yes adds 1.5 points.",
      },
      {
        inputId: "prior-dvt-pe",
        label: "Previous objectively diagnosed DVT or PE",
        explanation: "Prior documented DVT or PE; Yes adds 1.5 points.",
      },
      {
        inputId: "hemoptysis",
        label: "Hemoptysis",
        explanation: "Hemoptysis; Yes adds 1 point.",
      },
      {
        inputId: "malignancy",
        label: "Active malignancy",
        explanation: "Active malignancy treated within 6 months or palliative; Yes adds 1 point.",
      },
    ],
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
      "A low score does not by itself exclude PE — persistent clinical suspicion warrants continued evaluation.",
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
    evidence: {
      source: "Wells PE Criteria",
      reference:
        "Wells PS, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected pulmonary embolism presenting to the emergency department by using a simple clinical model and D-dimer. Ann Intern Med. 2001;135(2):98-107.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wells PS, et al. Ann Intern Med. 2001;135(2):98-107.",
        "Wells PS, et al. Thromb Haemost. 2000;83(3):416-420.",
      ],
    },
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
    faq: [
      {
        question:
          "What does a Wells score for PE mean?",
        answer:
          "Two-tier: 4 or less = PE unlikely (D-dimer can rule out). More than 4 = PE likely (proceed to CT pulmonary angiography). Three-tier: 0-1 low, 2-6 moderate, more than 6 high probability.",
      },
      {
        question:
          "Is Wells PE likely still valid with age-adjusted D-dimer?",
        answer:
          "Yes. The Wells score determines pre-test probability. If PE is unlikely (Wells 4 or less), age-adjusted D-dimer can further reduce unnecessary CT scans in patients over 50 years.",
      },
      {
        question:
          "Can Wells be used for inpatients?",
        answer:
          "Wells was derived primarily in emergency department and outpatient settings. Performance differs in inpatients, where pre-test probability tools may overestimate risk. Clinical judgment is essential.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Wells PE score guides, but does not replace, D-dimer or CT pulmonary angiography and clinical judgment.",
  },

  "wells-dvt": {
    commonMistakes: [
      "Adding 2 points when an alternative diagnosis is at least as likely, when the item should subtract 2 points from the total.",
      "Using the two-tier cutoff of 2 points for the three-tier reading, which classifies 1 to 2 as moderate rather than DVT likely.",
      "Resetting a negative total to 0 instead of allowing scores from -2 to 9, which can misclassify the pre-test probability."
    ],
    faq: [
      {
        question: "What is the difference between the two-tier and the three-tier Wells DVT interpretation?",
        answer: "The two-tier version, which is most commonly used, treats a score of 1 or less as DVT unlikely and 2 or more as DVT likely. The three-tier version instead classifies 0 or less as low, 1 to 2 as moderate, and 3 or more as high probability. Both use the same nine items plus a subtraction of 2 points when an alternative diagnosis is at least as likely. Choose one system and apply it consistently, because a negative D-dimer safely excludes DVT only in the DVT-unlikely group."
      },
      {
        question: "How does the alternative diagnosis item change the Wells DVT score?",
        answer: "It is the only negative item. When an alternative diagnosis is judged at least as likely as DVT, the score subtracts 2 points from the total of the nine positive items. Because this judgment is subjective, it can move a patient across the two-tier cutoff, so it should be applied deliberately. Without this subtraction the score can be overestimated and a patient who could safely have D-dimer testing may instead be sent for compression ultrasound."
      },
      {
        question: "Does a Wells DVT score of 1 or less rule out DVT by itself?",
        answer: "No. A score of 1 or less means DVT is unlikely, which makes the patient suitable for a high-sensitivity D-dimer. Only a negative D-dimer in that group safely excludes DVT. When clinical suspicion remains high, a low score does not exclude DVT and imaging should still be considered. The score estimates pre-test probability; it is not a stand-alone diagnostic test."
      }
    ],
    formulaExplanation:
      "The Wells DVT score adds 1 point for each of nine clinical features (active cancer, paralysis/paresis, bedridden or recent surgery, deep-vein tenderness, entire-leg swelling, calf swelling over 3 cm, pitting edema, collateral superficial veins, and previous DVT) and subtracts 2 points if an alternative diagnosis is at least as likely. A score of 2 or more is DVT likely (two-tier).",
    variables: [
      {
        inputId: "active-cancer",
        label: "Active cancer",
        explanation: "Active cancer treated within 6 months or palliative; Yes adds 1 point.",
      },
      {
        inputId: "paralysis",
        label: "Paralysis, paresis, or recent plaster immobilization of the lower extremities",
        explanation: "Recent paralysis, paresis, or leg immobilization; Yes adds 1 point.",
      },
      {
        inputId: "bedridden",
        label: "Recently bedridden > 3 days or major surgery within previous 12 weeks",
        explanation: "Recent bed rest or major surgery; Yes adds 1 point.",
      },
      {
        inputId: "localized-tenderness",
        label: "Localized tenderness along the deep venous system",
        explanation: "Tenderness along the deep venous system; Yes adds 1 point.",
      },
      {
        inputId: "entire-leg-swollen",
        label: "Entire leg swollen",
        explanation: "Swelling of the entire leg; Yes adds 1 point.",
      },
      {
        inputId: "calf-swelling",
        label: "Calf swelling > 3 cm compared with the asymptomatic leg",
        explanation: "Calf swelling exceeding the other leg by more than 3 cm; Yes adds 1 point.",
      },
      {
        inputId: "pitting-edema",
        label: "Pitting edema confined to the symptomatic leg",
        explanation: "Pitting edema in the symptomatic leg; Yes adds 1 point.",
      },
      {
        inputId: "collateral-veins",
        label: "Collateral superficial veins (non-varicose)",
        explanation: "Non-varicose collateral superficial veins; Yes adds 1 point.",
      },
      {
        inputId: "previous-dvt",
        label: "Previously documented DVT",
        explanation: "Prior documented DVT; Yes adds 1 point.",
      },
      {
        inputId: "alternative-diagnosis",
        label: "Alternative diagnosis at least as likely as DVT",
        explanation: "An alternative diagnosis at least as likely as DVT; Yes subtracts 2 points.",
      },
    ],
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
    evidence: {
      source: "Wells DVT Criteria",
      reference:
        "Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wells PS, et al. N Engl J Med. 2003;349(13):1227-1235.",
        "Wells PS, et al. Lancet. 1995;345(8960):1326-1330.",
      ],
    },
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
      "This calculator is intended for educational and clinical decision support purposes only. The Wells DVT score guides, but does not replace, compression ultrasound and clinical judgment.",
  },

  "heart-score": {
    commonMistakes: [
      "Scoring the history item only by whether chest pain is present, when it reflects how suspicious the presentation is for acute coronary syndrome.",
      "Applying the HEART score to a patient with ST-elevation myocardial infarction, who needs immediate reperfusion and is outside its intended use.",
      "Treating a low HEART score as ruling out acute coronary syndrome without serial troponins and clinical assessment."
    ],
    formulaExplanation:
      "The HEART score sums five components each scored 0-2: history, ECG, age, risk factors, and troponin, for a total of 0-10. Scores of 0-3 are low, 4-6 moderate, and 7-10 high risk for 6-week major adverse cardiac events.",
    variables: [
      {
        inputId: "history",
        label: "History (suspicion of ACS)",
        explanation: "Clinical suspicion of ACS, scored 0 (slightly/non-suspicious), 1 (moderately suspicious), or 2 (highly suspicious).",
      },
      {
        inputId: "ecg",
        label: "ECG findings",
        explanation: "ECG, scored 0 (normal), 1 (non-specific repolarization changes), or 2 (significant ST-segment deviation).",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age, scored 0 (under 45), 1 (45-64), or 2 (65 or older).",
      },
      {
        inputId: "risk-factors",
        label: "Risk factors",
        explanation: "Cardiac risk factors, scored 0 (none), 1 (1-2 factors), or 2 (3 or more factors or known atherosclerotic disease).",
      },
      {
        inputId: "troponin",
        label: "Troponin",
        explanation: "Troponin relative to the assay upper reference limit, scored 0 (normal), 1 (1-3x), or 2 (over 3x).",
      },
    ],
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
      "A risk-stratification tool rather than a standalone diagnostic test — clinical assessment, ECG, and serial biomarkers remain necessary.",
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
    evidence: {
      source: "HEART Score Validation",
      reference:
        "Backus BE, et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013;168(3):2153-2158.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Six AJ, et al. Neth Heart J. 2008;16(6):191-196.",
        "Backus BE, et al. Int J Cardiol. 2013;168(3):2153-2158.",
      ],
    },
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
    faq: [
      {
        question:
          "What does a HEART score mean?",
        answer:
          "0-3: low risk (MACE about 1-2%), candidate for early discharge. 4-6: moderate risk (MACE about 12-17%), observation with serial troponins. 7-10: high risk (MACE about 50-65%), early invasive strategy and cardiology consultation.",
      },
      {
        question:
          "Is the HEART score better than TIMI or GRACE for chest pain?",
        answer:
          "HEART is specifically designed for emergency department chest pain evaluation and has been prospectively validated in that setting. TIMI and GRACE are more commonly used for ACS risk stratification once acute coronary syndrome is confirmed.",
      },
      {
        question:
          "Can the HEART score be used for stable chest pain?",
        answer:
          "No. HEART is designed for acute chest pain evaluation in the emergency department. For stable chest pain assessment, use appropriate outpatient evaluation pathways.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The HEART score supports, but does not replace, clinical judgment in acute coronary syndrome evaluation.",
  },

  "sofa-score": {
    commonMistakes: [
      "Using SOFA as an emergency department screening test rather than qSOFA for initial sepsis screening.",
      "Calling any SOFA elevation sepsis, when sepsis requires an acute rise of at least 2 points from baseline with suspected infection.",
      "Entering the platelet count in cells per microliter instead of the x10^9/L units the coagulation subscore expects, which distorts the score."
    ],
    formulaExplanation:
      "The SOFA score sums six organ-system subscores each ranging 0-4: respiration (PaO2/FiO2 selection), coagulation (platelet count), liver (bilirubin), cardiovascular (MAP/vasopressor selection), central nervous system (GCS), and renal (creatinine), for a total of 0-24. Higher totals indicate more severe organ dysfunction.",
    variables: [
      {
        inputId: "pao2-fio2",
        label: "PaO2/FiO2 ratio",
        explanation: "Respiratory oxygenation, scored 0 (>= 400 mmHg) up to 4 (< 100 mmHg with ventilation).",
      },
      {
        inputId: "platelets",
        label: "Platelet count",
        explanation: "Platelet count in x10^9/L, scored 0 (>= 150) to 4 (< 20).",
      },
      {
        inputId: "bilirubin",
        label: "Bilirubin",
        explanation: "Serum bilirubin in mg/dL, scored 0 (< 1.2) to 4 (>= 12).",
      },
      {
        inputId: "cardiovascular",
        label: "Cardiovascular status",
        explanation: "Blood pressure/vasopressor requirement, scored 0 (MAP >= 70) to 4 (high-dose vasopressors).",
      },
      {
        inputId: "gcs",
        label: "Glasgow Coma Scale",
        explanation: "GCS in points (3-15), scored 0 (GCS 15) to 4 (GCS < 6).",
      },
      {
        inputId: "creatinine",
        label: "Creatinine",
        explanation: "Serum creatinine in mg/dL, scored 0 (< 1.2) to 4 (>= 5.0).",
      },
    ],
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
      "A SOFA score alone does not establish infection; organ dysfunction must be interpreted with the overall clinical picture.",
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
    evidence: {
      source: "Sepsis-3 / Original SOFA Description",
      reference:
        "Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22(7):707-710.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Vincent JL, et al. Intensive Care Med. 1996;22(7):707-710.",
        "Singer M, et al. JAMA. 2016;315(8):801-810.",
      ],
    },
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
    faq: [
      {
        question: "What does the SOFA score measure?",
        answer:
          "SOFA quantifies organ dysfunction across six systems (respiration, coagulation, liver, cardiovascular, CNS, renal). Each system scores 0–4. Higher total scores correlate with higher ICU mortality.",
      },
      {
        question: "How is SOFA used to diagnose sepsis?",
        answer:
          "Per the Sepsis-3 consensus, sepsis is defined as a suspected or confirmed infection with an acute SOFA increase of ≥2 points from baseline. This indicates organ dysfunction caused by infection.",
      },
      {
        question: "Can SOFA be calculated at the bedside?",
        answer:
          "Not entirely. SOFA requires laboratory values (platelets, bilirubin, creatinine) and PaO₂/FiO₂ ratio, which are not available at the bedside. For rapid bedside screening, use qSOFA instead.",
      },
      {
        question: "What if I don't know the patient's baseline SOFA?",
        answer:
          "A baseline SOFA of 0 is assumed if no prior organ dysfunction is documented. If the patient has known chronic organ dysfunction, the acute increase may be underestimated.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. SOFA describes, but does not diagnose, sepsis; clinical judgment and serial assessment remain essential.",
  },

  "sirs-criteria": {
    commonMistakes: [
      "Using SIRS criteria alone to diagnose sepsis without confirming a suspected infection and organ dysfunction.",
      "Counting a temperature of exactly 38 C as meeting the fever criterion, which requires a value above 38 C or below 36 C.",
      "Ignoring band forms above 10 percent when the white cell count is otherwise normal, although the band criterion alone can satisfy that item."
    ],
    formulaExplanation:
      "SIRS counts how many of four criteria are met: temperature above 38 C or below 36 C, heart rate above 90 bpm, respiratory rate above 20 breaths/min, and white blood cell count above 12 or below 4 x10^9/L. Two or more criteria indicate SIRS.",
    variables: [
      {
        inputId: "temperature",
        label: "Temperature",
        explanation: "Temperature in C; above 38 C or below 36 C counts as one criterion.",
      },
      {
        inputId: "heart-rate",
        label: "Heart rate",
        explanation: "Heart rate in bpm; above 90 counts as one criterion.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory rate",
        explanation: "Respiratory rate in breaths/min; above 20 counts as one criterion.",
      },
      {
        inputId: "wbc",
        label: "White blood cell count",
        explanation: "WBC in x10^9/L; above 12 or below 4 counts as one criterion.",
      },
    ],
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
    evidence: {
      source: "SCCM/ESICM Consensus Definitions",
      reference:
        "Bone RC, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. Chest. 1992;101(6):1644-1655.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Bone RC, et al. Chest. 1992;101(6):1644-1655.",
        "Singer M, et al. JAMA. 2016;315(8):801-810.",
      ],
    },
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
    faq: [
      {
        question:
          "What are the SIRS criteria?",
        answer:
          "Two or more of: temperature >38 C or <36 C, heart rate >90 bpm, respiratory rate >20 breaths/min, and white blood cell count >12,000 or <4,000 cells per uL. Two or more criteria indicate SIRS is present.",
      },
      {
        question:
          "Is SIRS still used to define sepsis?",
        answer:
          "The Sepsis-3 consensus (2016) removed SIRS from the formal sepsis definition. Sepsis is now defined as infection with an acute SOFA increase of 2 or more. However, SIRS criteria remain useful for early bedside screening.",
      },
      {
        question:
          "Can SIRS be triggered by non-infectious conditions?",
        answer:
          "Yes. SIRS is non-specific and can be met in trauma, pancreatitis, surgery, burns, and other inflammatory states. Always assess for an infectious source before attributing SIRS to sepsis.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. SIRS criteria screen for, but do not diagnose, sepsis; clinical judgment remains essential.",
  },

  "crb-65": {
    commonMistakes: [
      "Counting a systolic pressure below 90 mmHg and a diastolic pressure of 60 mmHg or lower as two separate points, when they share one criterion.",
      "Failing to award the age point to a patient who is exactly 65 years old, when age 65 or older scores a point.",
      "Treating a CRB-65 score of 0 as ruling out severe pneumonia without assessing oxygenation, which the score does not capture."
    ],
    faq: [
      {
        question: "How does CRB-65 differ from CURB-65?",
        answer: "CRB-65 is the laboratory-free version of CURB-65. Both score confusion, respiratory rate, blood pressure, and age 65 or older, but CURB-65 adds a urea component. Dropping urea means CRB-65 can be completed in primary care or out of hospital without blood tests, at the cost of slightly reduced discrimination. The four items and the 0 to 4 total are otherwise the same, so the two scores should not be mixed."
      },
      {
        question: "What does each CRB-65 score mean for where the patient is treated?",
        answer: "A score of 0 indicates low mortality risk, about 1 percent, and outpatient care can be considered. A score of 1 to 2 indicates intermediate risk, about 8 percent, and hospital admission should be considered. A score of 3 to 4 indicates high risk, about 30 percent, and warrants urgent admission with consideration of ICU care. These estimates support but do not replace clinical judgment about the individual patient."
      },
      {
        question: "Why does CRB-65 give a point to every patient aged 65 or older?",
        answer: "Age 65 or older is one of the four criteria in the score, so it adds a point by design. This means an otherwise stable older patient can score 1 without having any abnormal physiology, which is a recognized limitation of the tool. The age point should be interpreted alongside the clinical picture, and because CRB-65 does not measure oxygenation, oxygen requirements should always be assessed separately."
      }
    ],
    formulaExplanation:
      "CRB-65 adds one point each for new confusion, respiratory rate 30/min or higher, systolic blood pressure below 90 mmHg or diastolic 60 mmHg or lower, and age 65 years or older, for a total of 0-4. Higher scores indicate greater pneumonia mortality risk.",
    variables: [
      {
        inputId: "confusion",
        label: "New mental confusion",
        explanation: "New-onset confusion; Yes adds one point.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory rate",
        explanation: "Respiratory rate in breaths/min; 30 or higher adds one point.",
      },
      {
        inputId: "sbp",
        label: "Systolic blood pressure",
        explanation: "Systolic blood pressure in mmHg; below 90 adds one point.",
      },
      {
        inputId: "dbp",
        label: "Diastolic blood pressure",
        explanation: "Diastolic blood pressure in mmHg; 60 or lower adds one point.",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years; 65 or older adds one point.",
      },
    ],
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
      "Does not account for oxygenation or systemic illness — combine with clinical judgment and assessment of oxygen requirements in all patients, not only young adults.",
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
      "This calculator is intended for educational and clinical decision support purposes only. CRB-65 guides site-of-care triage but does not replace assessment of oxygenation and hemodynamic stability.",
    evidence: {
      source: "Emergency Medicine / Pulmonology",
      reference: "Lim WS, et al. Thorax. 2003;58(5):377-382.",
      version: "2003",
      updatedAt: "2026-08",
      references: [
        "Lim WS, et al. Thorax. 2003;58(5):377-382.",
        "NICE CG191. Pneumonia in adults. 2014.",
      ],
    },
  },

  "psi-port": {
    commonMistakes: [
      "Forgetting to subtract 10 points for female sex, which inflates the total and can push the patient into a higher risk class.",
      "Assigning class I to a patient with any comorbidity, when class I requires age under 50, no comorbidities, and no risk findings.",
      "Entering the BUN in mmol/L instead of the mg/dL units the score expects, which miscalculates the laboratory points."
    ],
    formulaExplanation:
      "The Pneumonia Severity Index starts with points equal to age (minus 10 for women), then adds weighted points for comorbidity/risk items (nursing-home 10, neoplastic disease 30, liver disease 20, CHF 10, cerebrovascular 10, renal disease 10, altered mental status 20, pleural effusion 10), vital-sign abnormalities (respiratory rate >= 30: 20, systolic BP < 90: 20, temperature < 35 or >= 40 C: 15, heart rate >= 125: 10), and laboratory abnormalities (pH < 7.35: 30, BUN >= 30: 20, sodium < 130: 20, glucose >= 250: 10, hematocrit < 30: 10, PaO2 < 60: 10). The total assigns a PORT risk class I-V.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, added directly to the total score.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Female sex subtracts 10 points; male sex adds none.",
      },
      {
        inputId: "nursing-home",
        label: "Nursing home resident",
        explanation: "Nursing home residency; Yes adds 10 points.",
      },
      {
        inputId: "neoplastic-disease",
        label: "Neoplastic disease",
        explanation: "Neoplastic disease; Yes adds 30 points.",
      },
      {
        inputId: "liver-disease",
        label: "Liver disease",
        explanation: "Liver disease; Yes adds 20 points.",
      },
      {
        inputId: "chf",
        label: "Congestive heart failure",
        explanation: "Congestive heart failure; Yes adds 10 points.",
      },
      {
        inputId: "cerebrovascular",
        label: "Cerebrovascular disease",
        explanation: "Cerebrovascular disease; Yes adds 10 points.",
      },
      {
        inputId: "renal-disease",
        label: "Renal disease",
        explanation: "Renal disease; Yes adds 10 points.",
      },
      {
        inputId: "ams",
        label: "Altered mental status",
        explanation: "Altered mental status; Yes adds 20 points.",
      },
      {
        inputId: "respiratory-rate",
        label: "Respiratory rate",
        explanation: "Respiratory rate in breaths/min; 30 or higher adds 20 points.",
      },
      {
        inputId: "sbp",
        label: "Systolic blood pressure",
        explanation: "Systolic blood pressure in mmHg; below 90 adds 20 points.",
      },
      {
        inputId: "temperature",
        label: "Temperature",
        explanation: "Temperature in C; below 35 or 40 or higher adds 15 points.",
      },
      {
        inputId: "heart-rate",
        label: "Heart rate",
        explanation: "Heart rate in bpm; 125 or higher adds 10 points.",
      },
      {
        inputId: "ph",
        label: "Arterial pH",
        explanation: "Arterial pH; below 7.35 adds 30 points.",
      },
      {
        inputId: "bun",
        label: "BUN",
        explanation: "Blood urea nitrogen in mg/dL; 30 or higher adds 20 points.",
      },
      {
        inputId: "sodium",
        label: "Sodium",
        explanation: "Serum sodium in mmol/L; below 130 adds 20 points.",
      },
      {
        inputId: "glucose",
        label: "Glucose",
        explanation: "Serum glucose in mg/dL; 250 or higher adds 10 points.",
      },
      {
        inputId: "hematocrit",
        label: "Hematocrit",
        explanation: "Hematocrit in percent; below 30 adds 10 points.",
      },
      {
        inputId: "pao2",
        label: "Arterial PaO2",
        explanation: "Arterial PaO2 in mmHg; below 60 adds 10 points.",
      },
      {
        inputId: "pleural-effusion",
        label: "Pleural effusion on imaging",
        explanation: "Pleural effusion; Yes adds 10 points.",
      },
    ],
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
      "The score supports but does not dictate site-of-care decisions — social factors, oxygen requirements, and other acute considerations can justify a different disposition.",
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
    faq: [
      {
        question:
          "What does the PSI/PORT score mean?",
        answer:
          "Classes I-II (70 or fewer points): low mortality (about 0.1-0.6%), consider outpatient. Class III (71-90): consider observation. Class IV (91-130): moderate risk (about 8-9%), admit. Class V (more than 130): high risk (about 27-31%), admit and consider ICU.",
      },
      {
        question:
          "How is PSI different from CURB-65?",
        answer:
          "PSI uses 20 variables including demographics, comorbidities, and lab findings, making it more comprehensive but slower to calculate. CURB-65 uses 5 bedside variables and is faster but less granular.",
      },
      {
        question:
          "Does PSI apply to all pneumonia patients?",
        answer:
          "PSI is validated for community-acquired pneumonia in adults. It is not validated for hospital-acquired pneumonia, pediatric patients, or immunocompromised populations outside the original cohort.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. PSI/PORT guides site-of-care triage but does not replace clinical judgment about comorbidities, social factors, and goals of care.",
    evidence: {
      source: "Emergency Medicine / Pulmonology",
      reference: "Fine MJ, et al. N Engl J Med. 1997;336(4):243-250.",
      version: "1997",
      updatedAt: "2026-08",
      references: [
        "Fine MJ, et al. N Engl J Med. 1997;336(4):243-250.",
        "Fine MJ, et al. JAMA. 1996;275(2):134-141.",
      ],
    },
  },

  "rts": {
    commonMistakes: [
      "Entering the raw Glasgow Coma Scale, systolic pressure, and respiratory rate into the weighted equation instead of converting each to its 0-4 code, which produces a value outside the 0-7.8408 range.",
      "Treating an RTS at or above 4 as ruling out serious injury, even though normal vital signs at a single time point can mask severe internal injury.",
      "Using the RTS in non-trauma medical emergencies or as the sole triage determinant while ignoring anatomical injury and injury mechanism."
    ],
    faq: [
      {
        question: "What does the Revised Trauma Score measure?",
        answer: "It combines coded Glasgow Coma Scale, systolic blood pressure, and respiratory rate into a weighted physiologic score. Each variable is first converted to a 0-4 code, then weighted, giving a total between 0 and 7.8408. Lower totals indicate greater physiologic derangement and worse predicted survival. It is designed for trauma triage and outcome prediction, not for medical emergencies outside trauma."
      },
      {
        question: "How do I convert the vital signs into RTS codes?",
        answer: "The Glasgow Coma Scale is coded 4 for 13-15, 3 for 9-12, 2 for 6-8, 1 for 4-5, and 0 for 3. Systolic pressure is coded 4 above 89, 3 for 76-89, 2 for 50-75, 1 for 1-49, and 0 for 0. Respiratory rate is coded 4 for 10-29, 3 above 29, 2 for 6-9, 1 for 1-5, and 0 for 0."
      },
      {
        question: "What does an RTS below 4 mean?",
        answer: "An RTS below 4 is associated with a predicted survival probability below 70% and supports consideration of transfer to a trauma center. Values near the top of the range indicate only minor physiologic derangement. Because the score reflects a single time point, it must be repeated as the patient evolves, and resuscitation should never be delayed to calculate it."
      }
    ],
    formulaExplanation:
      "The Revised Trauma Score weights coded values of three physiologic variables: RTS = 0.9368 x GCS code + 0.7326 x systolic BP code + 0.2908 x respiratory rate code. Each variable is converted to a 0-4 code before weighting; lower totals predict worse outcome.",
    variables: [
      {
        inputId: "gcs",
        label: "Glasgow Coma Scale",
        explanation: "GCS in points (3-15), coded 0-4 (>= 13 codes to 4, <= 3 codes to 0) with weight 0.9368.",
      },
      {
        inputId: "sbp",
        label: "Systolic blood pressure",
        explanation: "Systolic blood pressure in mmHg, coded 0-4 (>= 90 codes to 4) with weight 0.7326.",
      },
      {
        inputId: "rr",
        label: "Respiratory rate",
        explanation: "Respiratory rate in breaths/min, coded 0-4 (10-29 codes to 4) with weight 0.2908.",
      },
    ],
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
      "Scoring must not delay immediate trauma stabilization — resuscitation takes priority over triage calculation.",
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
    evidence: {
      source: "Trauma / Emergency Medicine",
      reference: "Champion HR, et al. J Trauma. 1989;29(5):623-629.",
      version: "1989",
      updatedAt: "2026-08",
      references: [
        "Champion HR, et al. J Trauma. 1989;29(5):623-629.",
      ],
    },
  },

  "parkland-formula": {
    commonMistakes: [
      "Including first-degree (superficial) burns when summing the burn-region percentages, which inflates total TBSA and overestimates the 24-hour fluid volume.",
      "Applying the Parkland estimate to a child under 30 kg instead of using a pediatric burn formula with different maintenance needs.",
      "Giving the calculated 24-hour volume as a fixed prescription rather than titrating to urine output of 0.5-1.0 mL/kg/h."
    ],
    formulaExplanation:
      "The Parkland formula estimates 24-hour crystalloid resuscitation as 4 mL x body weight (kg) x total body surface area burned (%). Half of the total is given in the first 8 hours and half over the following 16 hours. Total TBSA is the sum of the entered burn-region percentages, capped at 100%.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kg, multiplied by 4 mL and by total TBSA.",
      },
      {
        inputId: "head",
        label: "Head",
        explanation: "Percentage of total body surface area burned on the head, added into total TBSA.",
      },
      {
        inputId: "anterior-trunk",
        label: "Anterior trunk",
        explanation: "Percentage of TBSA burned on the anterior trunk.",
      },
      {
        inputId: "posterior-trunk",
        label: "Posterior trunk",
        explanation: "Percentage of TBSA burned on the posterior trunk.",
      },
      {
        inputId: "right-upper-limb",
        label: "Right upper limb",
        explanation: "Percentage of TBSA burned on the right upper limb.",
      },
      {
        inputId: "left-upper-limb",
        label: "Left upper limb",
        explanation: "Percentage of TBSA burned on the left upper limb.",
      },
      {
        inputId: "right-lower-limb",
        label: "Right lower limb",
        explanation: "Percentage of TBSA burned on the right lower limb.",
      },
      {
        inputId: "left-lower-limb",
        label: "Left lower limb",
        explanation: "Percentage of TBSA burned on the left lower limb.",
      },
      {
        inputId: "perineum",
        label: "Perineum",
        explanation: "Percentage of TBSA burned on the perineum.",
      },
    ],
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
    faq: [
      {
        question:
          "How is the Parkland formula calculated?",
        answer:
          "Total volume = 4 mL x weight (kg) x %TBSA burned of Ringers lactate over 24 hours. Give half in the first 8 hours from time of burn, half over the next 16 hours.",
      },
      {
        question:
          "Is the Parkland formula a fixed prescription?",
        answer:
          "No. It is a starting estimate. Titrate to urine output of 0.5-1.0 mL/kg/h. Actual fluid needs vary with burn depth, inhalation injury, delay in treatment, and patient comorbidities.",
      },
      {
        question:
          "Can I use the Parkland formula for pediatric burns?",
        answer:
          "The 4 mL/kg/%TBSA formula is for adults. Children under 30 kg require pediatric-specific formulas that account for larger surface area-to-mass ratios and maintenance fluid needs.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Burn resuscitation must be titrated continuously to urine output, hemodynamics, and clinical response.",
    evidence: {
      source: "Emergency Medicine / Burns",
      reference: "Baxter CR. Clin Plast Surg. 1974;1(4):693-709.",
      version: "1974",
      updatedAt: "2026-08",
      references: [
        "Baxter CR. Clin Plast Surg. 1974;1(4):693-709.",
        "Alvarado R, et al. Burns. 2009;35(1):4-14.",
      ],
    },
  },

  "timi": {
    commonMistakes: [
      "Applying this unstable angina / NSTEMI score to a patient with ST-elevation MI, who needs a STEMI-specific risk tool instead.",
      "Interpreting a low score as excluding myocardial infarction rather than as a lower 14-day composite risk estimate.",
      "Omitting the aspirin-use-in-the-past-7-days item or the elevated troponin item when tallying the seven criteria."
    ],
    formulaExplanation:
      "The TIMI risk score adds one point for each of seven criteria: age 65 or older, three or more CAD risk factors, known coronary disease with stenosis of 50% or more, aspirin use within 7 days, two or more anginal events in 24 hours, ST-segment deviation, and elevated cardiac biomarkers, for a total of 0-7.",
    variables: [
      {
        inputId: "age-65",
        label: "Age >= 65 years",
        explanation: "Age 65 or older; Yes adds one point.",
      },
      {
        inputId: "risk-factors",
        label: "3 or more risk factors for CAD",
        explanation: "Three or more CAD risk factors; Yes adds one point.",
      },
      {
        inputId: "known-cad",
        label: "Known coronary disease",
        explanation: "Known coronary stenosis of 50% or more; Yes adds one point.",
      },
      {
        inputId: "aspirin",
        label: "Aspirin use in the past 7 days",
        explanation: "Aspirin use within the past 7 days; Yes adds one point.",
      },
      {
        inputId: "anginal-events",
        label: "2 or more anginal events in the past 24 hours",
        explanation: "Two or more anginal events in 24 hours; Yes adds one point.",
      },
      {
        inputId: "ecg-changes",
        label: "ST-segment deviation on admission ECG",
        explanation: "ST-segment deviation; Yes adds one point.",
      },
      {
        inputId: "troponin",
        label: "Elevated cardiac biomarkers",
        explanation: "Elevated troponin; Yes adds one point.",
      },
    ],
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
        "A 72-year-old man with hypertension, diabetes, and hyperlipidemia presents with recurrent chest pain over the past day, ST-segment depression on ECG, and a mildly elevated troponin. No known prior CAD and no aspirin use.",
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
    evidence: {
      source: "TIMI Study Group",
      reference:
        "Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Antman EM, et al. JAMA. 2000;284(7):835-842.",
      ],
    },
    references: [
      {
        citation:
          "Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.",
        level: "Level I",
      },
    ],
    faq: [
      {
        question:
          "What does a TIMI score mean?",
        answer:
          "0-1: low risk (about 4.7% 14-day composite event rate). 2-4: intermediate risk (about 8.3-19.9%). 5-7: high risk (about 26.2-40.9%). Higher scores support earlier invasive strategy.",
      },
      {
        question:
          "Can TIMI be used for STEMI?",
        answer:
          "No. TIMI risk scoring is designed for unstable angina and NSTEMI. For STEMI, use STEMI-specific tools such as the Killip class or TIMI flow grade for perfusion assessment.",
      },
      {
        question:
          "How does TIMI compare to GRACE?",
        answer:
          "TIMI is simpler to calculate but considers fewer prognostic factors. GRACE is more comprehensive and is generally preferred by current guidelines. Both remain widely used in clinical practice.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment or serial reassessment of the patient.",
  },

  "grace": {
    commonMistakes: [
      "Using the in-hospital GRACE nomogram to estimate 6-month or discharge mortality, for which separate GRACE models exist.",
      "Entering actual age, heart rate, systolic pressure, or creatinine values rather than the pre-scored nomogram points for each band.",
      "Applying the GRACE score to non-ACS chest pain syndromes instead of confirmed STEMI, NSTEMI, or unstable angina presentations."
    ],
    formulaExplanation:
      "The GRACE in-hospital score sums pre-scored points from eight admission variables: age, heart rate, systolic blood pressure, serum creatinine, Killip class, cardiac arrest at admission, ST-segment deviation, and elevated cardiac enzymes. Higher totals indicate greater in-hospital mortality risk (low <= 108, intermediate 109-140, high > 140).",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age band, scored 0 (under 30 years) up to 100 (90 years or older).",
      },
      {
        inputId: "heart-rate",
        label: "Heart rate on admission",
        explanation: "Heart rate band, scored 0 (under 50 bpm) up to 46 (200 bpm or higher).",
      },
      {
        inputId: "sbp",
        label: "Systolic blood pressure on admission",
        explanation: "Systolic blood pressure band, scored 58 (under 80 mmHg) down to 0 (200 mmHg or higher).",
      },
      {
        inputId: "creatinine",
        label: "Serum creatinine on admission",
        explanation: "Creatinine band, scored 1 (0-0.39 mg/dL) up to 28 (4.0 mg/dL or higher).",
      },
      {
        inputId: "killip",
        label: "Killip class",
        explanation: "Killip class, scored 0 (class I) up to 59 (class IV cardiogenic shock).",
      },
      {
        inputId: "cardiac-arrest",
        label: "Cardiac arrest at admission",
        explanation: "Cardiac arrest at admission; Yes contributes 39 points.",
      },
      {
        inputId: "st-deviation",
        label: "ST-segment deviation on admission ECG",
        explanation: "ST-segment deviation; Yes contributes 28 points.",
      },
      {
        inputId: "elevated-enzymes",
        label: "Elevated cardiac enzymes on admission",
        explanation: "Elevated cardiac enzymes; Yes contributes 14 points.",
      },
    ],
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
        "A 78-year-old woman presents with STEMI, heart rate 100 bpm, blood pressure 110/70 mmHg, creatinine 1.4 mg/dL, Killip class II, ST-segment elevation, and positive troponin. No cardiac arrest.",
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
    evidence: {
      source: "GRACE Registry",
      reference:
        "Granger CB, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Granger CB, et al. Arch Intern Med. 2003;163(19):2345-2353.",
      ],
    },
    references: [
      {
        citation:
          "Granger CB, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.",
        level: "Level I",
      },
    ],
    faq: [
      {
        question:
          "What does a GRACE score mean?",
        answer:
          "108 or less: low risk (less than 1% in-hospital mortality). 109-140: intermediate risk (1-3%). More than 140: high risk (more than 3%). GRACE is the preferred ACS risk tool per European and US guidelines.",
      },
      {
        question:
          "When should I use GRACE vs TIMI?",
        answer:
          "GRACE is more comprehensive and is the guideline-recommended tool for ACS risk stratification. TIMI is simpler but considers fewer variables. GRACE is generally preferred for both in-hospital and 6-month prognosis.",
      },
      {
        question:
          "Does GRACE apply to all ACS types?",
        answer:
          "Yes. GRACE is validated for STEMI, NSTEMI, and unstable angina. It estimates in-hospital mortality. Separate GRACE models exist for 6-month and discharge risk.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. It does not replace clinical judgment in the acute management of ACS.",
  },

  "cha2ds2-vasc": {
    commonMistakes: [
      "Awarding 1 point for age 75 or older instead of the 2 points specified for that age band.",
      "Treating the score as a bleeding risk tool rather than a stroke risk estimate that must be paired with a separate bleeding assessment.",
      "Applying the score to valvular, especially rheumatic mitral, atrial fibrillation, where anticoagulation is indicated regardless of the score."
    ],
    formulaExplanation:
      "CHA2DS2-VASc adds 1 point each for congestive heart failure/LV dysfunction, hypertension, diabetes, vascular disease, and female sex, 2 points for age 75 or older, 2 points for prior stroke/TIA/systemic thromboembolism, and 1 point for age 65-74, for a total of 0-9. Annual stroke risk rises with the score.",
    variables: [
      {
        inputId: "chf",
        label: "Congestive heart failure / LV dysfunction",
        explanation: "Congestive heart failure or LV dysfunction; Yes adds 1 point.",
      },
      {
        inputId: "hypertension",
        label: "Hypertension",
        explanation: "Treated or untreated hypertension; Yes adds 1 point.",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age band, scored 0 (under 65), 1 (65-74), or 2 (75 or older).",
      },
      {
        inputId: "diabetes",
        label: "Diabetes mellitus",
        explanation: "Diabetes; Yes adds 1 point.",
      },
      {
        inputId: "stroke",
        label: "Stroke, TIA, or systemic thromboembolism",
        explanation: "Prior stroke, TIA, or systemic thromboembolism; Yes adds 2 points.",
      },
      {
        inputId: "vascular-disease",
        label: "Vascular disease",
        explanation: "Prior MI, peripheral artery disease, or aortic plaque; Yes adds 1 point.",
      },
      {
        inputId: "sex",
        label: "Sex category",
        explanation: "Female sex adds 1 point; male sex adds none.",
      },
    ],
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
    evidence: {
      source: "Euro Heart Survey / AHA/ACC/HRS Guideline",
      reference:
        "Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on atrial fibrillation. Chest. 2010;137(2):263-272.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Lip GYH, et al. Chest. 2010;137(2):263-272.",
        "January CT, et al. Circulation. 2019;140(2):e125-e151.",
      ],
    },
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
    faq: [
      {
        question:
          "What does a CHA2DS2-VASc score mean?",
        answer:
          "Score 0 (men) or 1 (women): low stroke risk, no antithrombotic therapy. Men 1 or women 2: consider oral anticoagulation. Men 2 or more / women 3 or more: oral anticoagulation is recommended.",
      },
      {
        question:
          "Why are the thresholds different for men and women?",
        answer:
          "Women receive 1 point for sex alone, which is a risk modifier rather than an independent risk factor. The threshold for recommending anticoagulation is 1 point higher in women to avoid over-treatment based on sex alone.",
      },
      {
        question:
          "Does CHA2DS2-VASc account for bleeding risk?",
        answer:
          "No. CHA2DS2-VASc estimates stroke risk only. Bleeding risk should be assessed separately using HAS-BLED or a similar tool before starting anticoagulation.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Anticoagulation decisions require assessment of both stroke and bleeding risk together with patient values and preferences.",
  },

  "has-bled": {
    commonMistakes: [
      "Awarding the hypertension point for any elevated reading instead of the specified systolic pressure above 160 mmHg.",
      "Withholding anticoagulation because of a high score rather than correcting modifiable bleeding risk factors and comparing against stroke risk.",
      "Using HAS-BLED to estimate stroke risk rather than the 1-year risk of major bleeding on anticoagulation."
    ],
    formulaExplanation:
      "HAS-BLED adds one point each for uncontrolled hypertension, abnormal renal function, abnormal liver function, prior stroke, prior major bleeding or bleeding predisposition, labile INR, age over 65, concomitant antiplatelet/NSAID drugs, and alcohol excess, for a total of 0-9. Higher scores indicate greater 1-year major bleeding risk.",
    variables: [
      {
        inputId: "hypertension",
        label: "Uncontrolled hypertension",
        explanation: "Systolic BP over 160 mmHg; Yes adds 1 point.",
      },
      {
        inputId: "renal",
        label: "Abnormal renal function",
        explanation: "Dialysis, transplant, or creatinine over 2.26 mg/dL; Yes adds 1 point.",
      },
      {
        inputId: "liver",
        label: "Abnormal liver function",
        explanation: "Cirrhosis or bilirubin over 2x ULN with ALT/AST over 3x ULN; Yes adds 1 point.",
      },
      {
        inputId: "stroke",
        label: "Prior stroke",
        explanation: "Prior stroke, especially lacunar; Yes adds 1 point.",
      },
      {
        inputId: "bleeding",
        label: "Prior major bleeding or predisposition to bleeding",
        explanation: "Prior major bleed or bleeding predisposition; Yes adds 1 point.",
      },
      {
        inputId: "labile-inr",
        label: "Labile INR",
        explanation: "Time in therapeutic range under 60%; Yes adds 1 point.",
      },
      {
        inputId: "elderly",
        label: "Age > 65 years",
        explanation: "Age over 65 years; Yes adds 1 point.",
      },
      {
        inputId: "drugs",
        label: "Concomitant drugs (antiplatelets, NSAIDs)",
        explanation: "Concomitant antiplatelet or NSAID use; Yes adds 1 point.",
      },
      {
        inputId: "alcohol",
        label: "Alcohol excess",
        explanation: "Eight or more alcoholic drinks per week; Yes adds 1 point.",
      },
    ],
    clinicalPurpose:
      "Estimates 1-year risk of major bleeding in patients receiving anticoagulation, most commonly for atrial fibrillation, to identify modifiable bleeding risk factors.",
    howToUse: [
      "Confirm the patient is a candidate for or currently on anticoagulation.",
      "Assign 1 point for each HAS-BLED criterion present: uncontrolled hypertension, abnormal renal function, abnormal liver function, prior stroke, prior major bleeding, labile INR, age > 65, concomitant drugs, and alcohol excess.",
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
    evidence: {
      source: "Euro Heart Survey",
      reference:
        "Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Pisters R, et al. Chest. 2010;138(5):1093-1100.",
      ],
    },
    references: [
      {
        citation:
          "Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.",
        level: "Level II",
      },
    ],
    faq: [
      {
        question:
          "What does a HAS-BLED score mean?",
        answer:
          "0-1: low risk (about 1% major bleeding per year). 2: moderate risk (about 2% per year). 3 or more: high risk (about 4% per year). A high score flags the need to correct modifiable bleeding risk factors.",
      },
      {
        question:
          "Should I stop anticoagulation if HAS-BLED is high?",
        answer:
          "No. A high HAS-BLED score should prompt correction of modifiable risk factors (poor INR control, concomitant drugs, alcohol) and closer monitoring, not automatic discontinuation of anticoagulation.",
      },
      {
        question:
          "Is HAS-BLED validated for DOACs?",
        answer:
          "HAS-BLED was calibrated in warfarin-era cohorts. DOACs generally have lower bleeding rates. The score remains useful for identifying modifiable bleeding risk factors regardless of anticoagulant type.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Decisions about anticoagulation must balance stroke and bleeding risk with patient values.",
  },

  "rcri": {
    commonMistakes: [
      "Awarding the diabetes point to a patient on oral agents rather than requiring insulin-treated diabetes mellitus.",
      "Applying the index to cardiac surgery, where procedure-specific risk tools rather than the RCRI should be used.",
      "Confusing high-risk surgery with any major operation instead of the specified intraperitoneal, intrathoracic, or supraringuinal vascular procedures."
    ],
    faq: [
      {
        question: "What perioperative outcomes does the RCRI predict?",
        answer: "It estimates the 30-day risk of major cardiac complications after non-cardiac surgery: myocardial infarction, pulmonary edema, ventricular fibrillation or primary cardiac arrest, and complete heart block. It does not predict non-cardiac complications such as infection or renal failure, and it should be combined with functional capacity and procedure-specific risk. Higher scores warrant closer perioperative cardiac monitoring."
      },
      {
        question: "Which patients should not be assessed with the RCRI?",
        answer: "It is intended for non-cardiac surgery, so patients undergoing cardiac surgery should use procedure-specific risk tools. It also does not replace clinical assessment of functional capacity or acute cardiac conditions. Because it was derived from a predominantly male single-center cohort, predicted risk may differ in women and contemporary populations. Modifiable risk factors should still be optimized."
      },
      {
        question: "What do the RCRI point scores mean?",
        answer: "A score of 0 corresponds to roughly 0.4% risk, 1 to about 0.9%, 2 to approximately 7%, and 3 or more to about 11% risk of major cardiac events within 30 days. Higher scores warrant closer perioperative cardiac monitoring and optimization of modifiable risk factors before surgery. These estimates frame risk; they do not by themselves postpone or cancel an operation."
      }
    ],
    formulaExplanation:
      "The Revised Cardiac Risk Index adds one point for each of six predictors: high-risk surgery, ischemic heart disease, congestive heart failure, cerebrovascular disease, insulin-treated diabetes, and preoperative creatinine over 2 mg/dL, for a total of 0-6. Higher totals predict greater risk of major perioperative cardiac events.",
    variables: [
      {
        inputId: "high-risk-surgery",
        label: "High-risk surgery",
        explanation: "Intraperitoneal, intrathoracic, or suprainguinal vascular surgery; Yes adds 1 point.",
      },
      {
        inputId: "ischemic-heart-disease",
        label: "Ischemic heart disease",
        explanation: "Prior MI, positive stress test, current angina, nitrate use, or prior CABG/PCI; Yes adds 1 point.",
      },
      {
        inputId: "chf",
        label: "Congestive heart failure",
        explanation: "History of heart failure with supporting findings; Yes adds 1 point.",
      },
      {
        inputId: "cerebrovascular",
        label: "Cerebrovascular disease",
        explanation: "Prior TIA or stroke; Yes adds 1 point.",
      },
      {
        inputId: "insulin-diabetes",
        label: "Insulin-treated diabetes mellitus",
        explanation: "Diabetes requiring insulin; Yes adds 1 point.",
      },
      {
        inputId: "creatinine",
        label: "Preoperative creatinine > 2 mg/dL",
        explanation: "Preoperative creatinine over 2 mg/dL; Yes adds 1 point.",
      },
    ],
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
    evidence: {
      source: "Original RCRI Description",
      reference:
        "Lee TH, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999;100(10):1043-1049.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Lee TH, et al. Circulation. 1999;100(10):1043-1049.",
      ],
    },
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
    commonMistakes: [
      "Entering the treated or untreated systolic pressure status incorrectly, which changes the calculated risk for the same blood pressure value.",
      "Applying the white/other equation to every patient rather than selecting the African American equation for Black patients.",
      "Using the estimate in a patient outside the validated age range of 40-79 years or with lipids outside the specified ranges."
    ],
    faq: [
      {
        question: "Who is the ASCVD Pooled Cohort Equation intended for?",
        answer: "It estimates 10-year risk of a first atherosclerotic cardiovascular disease event in adults aged 40-79 years without established clinical ASCVD, combining age, total and HDL cholesterol, systolic blood pressure with treatment status, smoking, and diabetes. Patients with existing ASCVD should be managed through secondary prevention pathways instead. The equations are validated for total cholesterol 130-320 mg/dL, HDL 20-100 mg/dL, and systolic pressure 90-200 mmHg."
      },
      {
        question: "What risk categories does the score define?",
        answer: "The 2018 ACC/AHA categories are less than 5% (low), 5-7.4% (borderline), 7.5-19.9% (intermediate), and 20% or higher (high). In adults 40-75 years, borderline or intermediate risk prompts a clinician-patient risk discussion, often supported by risk-enhancing factors or coronary artery calcium scoring. The categories guide preventive treatment discussions rather than dictating a specific therapy."
      },
      {
        question: "Why can the estimate be inaccurate for some patients?",
        answer: "The equations were derived from US cohorts in the 1990s-2000s, so contemporary populations may have lower event rates. Risk can be overestimated or underestimated in groups such as Hispanic/Latino, South Asian, and older adults. The estimate addresses only 10-year risk, so lifetime risk is a separate consideration, particularly for younger adults. Clinical judgment remains essential for unusual phenotypes."
      }
    ],
    formulaExplanation:
      "The 2013 ACC/AHA Pooled Cohort Equations combine age, total cholesterol, HDL cholesterol, systolic blood pressure (with treatment status), smoking, and diabetes in sex- and race-specific Cox models. A linear predictor is computed from the log-transformed risk factors and converted to a 10-year ASCVD risk percentage for patients aged 40-79 years.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years (40-79), entered as a natural logarithm in the equations.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which selects the male- or female-specific equation.",
      },
      {
        inputId: "race",
        label: "Race",
        explanation: "African American or White/other, which selects the race-specific equation coefficients.",
      },
      {
        inputId: "total-cholesterol",
        label: "Total cholesterol",
        explanation: "Total cholesterol in mg/dL, entered as a natural logarithm.",
      },
      {
        inputId: "hdl",
        label: "HDL cholesterol",
        explanation: "HDL cholesterol in mg/dL, entered as a natural logarithm.",
      },
      {
        inputId: "sbp",
        label: "Systolic blood pressure",
        explanation: "Systolic blood pressure in mmHg, entered as a natural logarithm with treatment-specific coefficients.",
      },
      {
        inputId: "hypertension-treated",
        label: "Hypertension treatment",
        explanation: "Whether hypertension is untreated or treated, which selects the corresponding blood-pressure coefficients.",
      },
      {
        inputId: "smoker",
        label: "Current smoker",
        explanation: "Current smoking; Yes contributes with age-interaction terms.",
      },
      {
        inputId: "diabetes",
        label: "Diabetes mellitus",
        explanation: "Diabetes; Yes contributes a coefficient to the linear predictor.",
      },
    ],
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
    evidence: {
      source: "AHA / ACC",
      reference: "Goff DC Jr, et al. J Am Coll Cardiol. 2014;63(25 Pt B):2935-2959.",
      version: "2018",
      updatedAt: "2026-08",
      references: [
        "Goff DC Jr, et al. J Am Coll Cardiol. 2014;63(25 Pt B):2935-2959.",
        "Grundy SM, et al. Circulation. 2019;139(25):e1082-e1143.",
      ],
    },
  },

  "dapt": {
    commonMistakes: [
      "Treating the age component as positive points when advancing age actually subtracts 1 or 2 points from the total.",
      "Forgetting that heart failure or LVEF under 30% and saphenous vein graft PCI each contribute 2 points rather than 1.",
      "Using the DAPT score in a patient already mandated to extended therapy because of a high-risk ischemic indication."
    ],
    faq: [
      {
        question: "What does the DAPT score help decide?",
        answer: "It estimates whether continuing dual antiplatelet therapy beyond 12 months after coronary stenting provides net benefit. A score of 2 or more favors extended DAPT up to 30 months because ischemic reduction is expected to outweigh bleeding risk, while a score below 2 favors standard 12-month therapy. It balances stent-related ischemic events against moderate or severe bleeding."
      },
      {
        question: "Why does older age lower the DAPT score?",
        answer: "Age contributes negative points: 0 for under 65, -1 for 65 to under 75, and -2 for 75 or older, so the total ranges from -2 to +10. Advanced age carries a higher bleeding risk on prolonged dual antiplatelet therapy, so it reduces the net-benefit estimate and makes the 2-point threshold harder to reach. This reflects the trade-off the score was designed to capture."
      },
      {
        question: "What should clinicians remember when applying the DAPT score?",
        answer: "The tool was developed in the DAPT Study, so its applicability to newer stents and P2Y12 inhibitors may differ. It omits some bleeding risk factors, including renal function and baseline anemia, and the 2-point cutoff was derived rather than compared head-to-head across all populations. Clinical judgment and individual bleeding risk still guide the final decision."
      }
    ],
    formulaExplanation:
      "The DAPT score starts with an age score (0 under 65, -1 for 65 to under 75, -2 for 75 or older), adds 1 point each for smoking, diabetes, MI at presentation, prior MI/PCI, stent diameter under 3 mm, and paclitaxel-eluting stent, and adds 2 points each for CHF or LVEF under 30% and saphenous vein graft PCI. A score of 2 or more favors extended dual antiplatelet therapy.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age band, scored 0 (under 65), -1 (65 to under 75), or -2 (75 or older).",
      },
      {
        inputId: "smoking",
        label: "Current cigarette smoking",
        explanation: "Current smoking; Yes adds 1 point.",
      },
      {
        inputId: "diabetes",
        label: "Diabetes mellitus",
        explanation: "Diabetes; Yes adds 1 point.",
      },
      {
        inputId: "mi-at-presentation",
        label: "Myocardial infarction at presentation",
        explanation: "MI at presentation; Yes adds 1 point.",
      },
      {
        inputId: "prior-mi-pci",
        label: "Prior MI or prior PCI",
        explanation: "Prior MI or PCI; Yes adds 1 point.",
      },
      {
        inputId: "stent-diameter",
        label: "Stent diameter < 3 mm",
        explanation: "Stent diameter under 3 mm; Yes adds 1 point.",
      },
      {
        inputId: "paclitaxel",
        label: "Paclitaxel-eluting stent",
        explanation: "Paclitaxel-eluting stent; Yes adds 1 point.",
      },
      {
        inputId: "chf-lvef",
        label: "Congestive heart failure or LVEF < 30%",
        explanation: "CHF or LVEF under 30%; Yes adds 2 points.",
      },
      {
        inputId: "svg-pci",
        label: "Saphenous vein graft PCI",
        explanation: "PCI of a saphenous vein graft; Yes adds 2 points.",
      },
    ],
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
    evidence: {
      source: "Cardiology Literature",
      reference: "Yeh RW, et al. JAMA. 2016;315(16):1735-1749.",
      version: "2016",
      updatedAt: "2026-08",
      references: [
        "Yeh RW, et al. JAMA. 2016;315(16):1735-1749.",
      ],
    },
  },

  "h2fpef": {
    commonMistakes: [
      "Awarding only 1 point for atrial fibrillation, which actually contributes 3 points as the strongest predictor in the score.",
      "Applying the score to a patient with reduced or mid-range ejection fraction instead of classifying them as HFrEF or HFmrEF.",
      "Treating an intermediate score as diagnostic rather than prompting further testing such as exercise echocardiography or invasive hemodynamics."
    ],
    faq: [
      {
        question: "What does the H2FPEF score estimate?",
        answer: "It estimates the probability of heart failure with preserved ejection fraction in patients with unexplained exertional dyspnea. Scores of 0-1 indicate low probability (about 6%), 2-5 intermediate probability (about 10-46%), and 6-9 high probability (about 67-95%). It is not a substitute for exercise testing or invasive hemodynamics when results are ambiguous, and it applies only when ejection fraction is preserved."
      },
      {
        question: "Which H2FPEF components contribute the most points?",
        answer: "Atrial fibrillation contributes the most at 3 points, followed by a body mass index over 30 kg/m2 at 2 points. One point each is added for age over 60 years, two or more antihypertensive medications, an E/e' ratio over 9, and a pulmonary artery systolic pressure over 35 mmHg, for a total of 0-9. Higher totals indicate greater probability."
      },
      {
        question: "When is the H2FPEF score less reliable?",
        answer: "It was developed in patients referred specifically for unexplained exertional dyspnea, so its accuracy in general primary care populations is less clear. The score needs echocardiographic measures, including E/e' and pulmonary artery systolic pressure, that are often unavailable at first assessment. For intermediate scores it does not include the resting or exercise filling pressures that may be needed to confirm the diagnosis."
      }
    ],
    formulaExplanation:
      "The H2FPEF score adds 3 points for atrial fibrillation, 2 points if BMI is over 30 kg/m2, 1 point if age is over 60 years, 1 point for two or more antihypertensive medications, 1 point for E/e' over 9, and 1 point for pulmonary artery systolic pressure over 35 mmHg, for a total of 0-9. Higher scores indicate greater HFpEF probability.",
    variables: [
      {
        inputId: "afib",
        label: "Atrial fibrillation",
        explanation: "Paroxysmal or persistent atrial fibrillation; Yes contributes 3 points.",
      },
      {
        inputId: "bmi",
        label: "Body mass index (BMI)",
        explanation: "BMI in kg/m2; over 30 contributes 2 points.",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years; over 60 contributes 1 point.",
      },
      {
        inputId: "antihypertensives",
        label: "Number of antihypertensive medications",
        explanation: "Two or more antihypertensive medications contributes 1 point.",
      },
      {
        inputId: "e-e-ratio",
        label: "E/e' ratio",
        explanation: "Septal e' averaged with lateral e'; over 9 contributes 1 point.",
      },
      {
        inputId: "pasp",
        label: "Pulmonary artery systolic pressure (PASP)",
        explanation: "PASP over 35 mmHg contributes 1 point.",
      },
    ],
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
    evidence: {
      source: "Cardiology Literature",
      reference: "Reddy YNV, et al. Circulation. 2018;138(9):861-870.",
      version: "2018",
      updatedAt: "2026-08",
      references: [
        "Reddy YNV, et al. Circulation. 2018;138(9):861-870.",
      ],
    },
  },

  "ldl-cholesterol": {
    commonMistakes: [
      "Treating a calculated LDL below 100 mg/dL as proof the patient is at goal when treatment targets depend on the ASCVD risk category.",
      "Dividing triglycerides by 5 once they reach 400 mg/dL or higher, where the VLDL assumption breaks down and the estimate becomes unreliable.",
      "Confusing calculated LDL with non-HDL cholesterol, which answers a different question by capturing all apolipoprotein B-containing lipoproteins."
    ],
    formulaExplanation:
      "The Friedewald equation estimates LDL-C = total cholesterol - HDL cholesterol - (triglycerides / 5), with all lipids in mg/dL. It is not valid when triglycerides are 400 mg/dL or higher.",
    variables: [
      {
        inputId: "totalCholesterol",
        label: "Total Cholesterol",
        explanation: "Total serum cholesterol in mg/dL, the starting value of the subtraction.",
      },
      {
        inputId: "hdl",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL, subtracted from total cholesterol.",
      },
      {
        inputId: "triglycerides",
        label: "Triglycerides",
        explanation: "Triglycerides in mg/dL, divided by 5 and subtracted to estimate VLDL cholesterol.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. LDL treatment decisions must be based on the patient's overall cardiovascular risk and clinical judgment.",
  },

  "non-hdl-cholesterol": {
    commonMistakes: [
      "Entering an HDL value larger than total cholesterol produces a negative non-HDL result that signals the lipid panel inputs were swapped or mistyped.",
      "Subtracting LDL as well as HDL from total cholesterol computes remnant cholesterol instead of the non-HDL value this calculator defines.",
      "Labeling a result above 160 mg/dL as grounds for starting therapy treats a population lipid category as an individual prescribing threshold."
    ],
    formulaExplanation:
      "Non-HDL cholesterol = total cholesterol - HDL cholesterol, capturing all atherogenic ApoB-containing lipoproteins (LDL, VLDL, IDL, and remnants).",
    variables: [
      {
        inputId: "totalCholesterol",
        label: "Total Cholesterol",
        explanation: "Total serum cholesterol in mg/dL.",
      },
      {
        inputId: "hdl",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL, subtracted from total cholesterol.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Lipid management should follow contemporary guidelines and individualized patient risk assessment.",
  },

  "albumin-globulin-ratio": {
    commonMistakes: [
      "Dividing total protein by albumin instead of first subtracting albumin to derive globulin yields a number that is not the A/G ratio.",
      "Comparing albumin in g/dL with total protein reported in g/L produces a corrupted globulin value and a meaningless ratio.",
      "Accepting a ratio inside 1.0-2.0 as reassuring when albumin and globulin are both low overlooks the masked abnormality this ratio can conceal."
    ],
    formulaExplanation:
      "Globulin = total protein - albumin; the albumin-to-globulin ratio = albumin / globulin.",
    variables: [
      {
        inputId: "albumin",
        label: "Serum Albumin",
        explanation: "Serum albumin in g/dL, used as the numerator and subtracted from total protein to derive globulin.",
      },
      {
        inputId: "totalProtein",
        label: "Total Protein",
        explanation: "Total serum protein in g/dL, from which albumin is subtracted to compute globulin.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Laboratory reference intervals vary; confirm with your local laboratory and interpret with clinical context.",
  },

  "tyg-index": {
    commonMistakes: [
      "Entering triglycerides or glucose in mmol/L rather than mg/dL changes the numeric result because the formula is defined only for mg/dL inputs.",
      "Calculating the index from a non-fasting sample ignores that both triglycerides and glucose must be fasting values for this formula.",
      "Treating a high TyG value as a diagnosis of insulin resistance ignores that no universal threshold exists and population thresholds vary widely."
    ],
    formulaExplanation:
      "Triglyceride-glucose index = ln(fasting triglycerides (mg/dL) x fasting plasma glucose (mg/dL) / 2).",
    variables: [
      {
        inputId: "triglycerides",
        label: "Fasting Triglycerides",
        explanation: "Fasting triglycerides in mg/dL, multiplied by fasting plasma glucose.",
      },
      {
        inputId: "glucose",
        label: "Fasting Plasma Glucose",
        explanation: "Fasting plasma glucose in mg/dL, multiplied by triglycerides before dividing by 2 and taking the natural log.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TyG index is a screening surrogate and must not be used alone to diagnose diabetes or guide therapy.",
  },

  "triglyceride-hdl-ratio": {
    commonMistakes: [
      "Using triglyceride and HDL values in mmol/L without converting them first produces a ratio that cannot be compared with the 3.0 threshold.",
      "Applying the 3.0 cut-point to an African American patient assumes a relationship that was not reproduced in that population.",
      "Diagnosing insulin resistance from a ratio of 3.0 or higher in a diabetic patient extends the marker beyond its derivation in overweight non-diabetic adults."
    ],
    formulaExplanation:
      "Triglyceride-to-HDL ratio = fasting triglycerides (mg/dL) / HDL cholesterol (mg/dL).",
    variables: [
      {
        inputId: "triglycerides",
        label: "Triglycerides",
        explanation: "Fasting triglycerides in mg/dL, used as the numerator.",
      },
      {
        inputId: "hdl",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL, used as the denominator.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TG/HDL ratio is a screening marker with population limitations and must not be used alone for diagnosis.",
  },

  "quicki": {
    commonMistakes: [
      "Reporting fasting glucose in mmol/L instead of mg/dL yields a QUICKI that cannot be compared with the published 0.38 and 0.30 means.",
      "Applying natural logarithms instead of base-10 logarithms produces a QUICKI value different from the one the formula defines.",
      "Treating a QUICKI below 0.30 as a diagnostic threshold for diabetes ignores that no validated clinical cut-point exists for this index."
    ],
    formulaExplanation:
      "QUICKI = 1 / (log10(fasting insulin (microU/mL)) + log10(fasting glucose (mg/dL))). Lower values indicate greater insulin resistance.",
    variables: [
      {
        inputId: "fastingInsulin",
        label: "Fasting Insulin",
        explanation: "Fasting serum insulin in microU/mL, converted with base-10 logarithm in the denominator.",
      },
      {
        inputId: "fastingGlucose",
        label: "Fasting Glucose",
        explanation: "Fasting plasma glucose in mg/dL, converted with base-10 logarithm in the denominator.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. QUICKI is a research-oriented surrogate and must not be used alone to diagnose insulin resistance or diabetes.",
  },

  "winters-formula": {
    commonMistakes: [
      "Using Winter's formula when the bicarbonate is normal or the primary disorder is alkalosis generates an expected PaCO2 with no clinical meaning.",
      "Treating the calculated expected PaCO2 as a ventilation target to aim for confuses a compensation equation with a therapeutic goal.",
      "Judging compensation from a blood gas drawn soon after an acute bicarbonate fall may falsely suggest that the respiratory response is inadequate."
    ],
    formulaExplanation:
      "Expected PaCO2 = 1.5 x bicarbonate + 8 (+/- 2) mmHg, the expected respiratory compensation for a primary metabolic acidosis.",
    variables: [
      {
        inputId: "bicarbonate",
        label: "Bicarbonate (HCO3)",
        explanation: "Serum bicarbonate in mEq/L, multiplied by 1.5 and added to 8 to compute the expected PaCO2.",
      },
      {
        inputId: "pco2",
        label: "Measured PaCO2",
        explanation: "Measured arterial PaCO2 in mmHg, compared with the expected range to assess the respiratory response.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid-base interpretation requires correlation with pH, the clinical picture, and the timing of blood sampling.",
  },

  "anion-gap-delta-ratio": {
    commonMistakes: [
      "Entering a bicarbonate close to 24 mEq/L leaves a near-zero denominator and produces an unstable delta ratio.",
      "Calculating the delta ratio in a normal anion gap acidosis applies a formula intended only for a high anion gap metabolic acidosis.",
      "Treating a result of 0.9 as proof of a coexisting non-anion gap acidosis ignores that boundary values around 0.9 and 2.1 need clinical correlation."
    ],
    formulaExplanation:
      "Delta ratio = (measured anion gap - 12) / (24 - measured bicarbonate). It compares the rise in anion gap with the fall in bicarbonate to identify mixed acid-base disorders.",
    variables: [
      {
        inputId: "anionGap",
        label: "Anion Gap",
        explanation: "Measured anion gap in mEq/L, reduced by the normal value of 12 in the numerator.",
      },
      {
        inputId: "bicarbonate",
        label: "Bicarbonate (HCO3)",
        explanation: "Measured bicarbonate in mEq/L, subtracted from 24 in the denominator.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Mixed acid-base interpretation requires integration of the full chemistry panel, ABG, and clinical context.",
  },

  "urine-anion-gap": {
    commonMistakes: [
      "Using the urine anion gap to interpret a high anion gap metabolic acidosis applies it outside the hyperchloremic setting it is meant for.",
      "Interpreting the result in a patient with acute or chronic kidney disease is misleading because tubular acidification is already abnormal.",
      "A urine collection covering an incomplete or changing clinical period can distort the gap and falsely point toward renal acidification failure."
    ],
    formulaExplanation:
      "Urine anion gap = (urine sodium + urine potassium) - urine chloride, all in mEq/L.",
    variables: [
      {
        inputId: "urineNa",
        label: "Urine Sodium",
        explanation: "Urine sodium in mEq/L, added to urine potassium.",
      },
      {
        inputId: "urineK",
        label: "Urine Potassium",
        explanation: "Urine potassium in mEq/L, added to urine sodium.",
      },
      {
        inputId: "urineCl",
        label: "Urine Chloride",
        explanation: "Urine chloride in mEq/L, subtracted from the sum of sodium and potassium.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The urine anion gap is an indirect estimate of ammonium excretion and must be interpreted with renal function and clinical context.",
  },

  "kt-v": {
    commonMistakes: [
      "Entering ultrafiltration volume in milliliters instead of liters inflates the ultrafiltrate over weight correction term and distorts the delivered dose.",
      "Reversing the pre-dialysis and post-dialysis BUN values inverts the R ratio and produces a Kt/V unrelated to the actual treatment.",
      "Applying the 1.2 minimum to peritoneal dialysis or a twice-weekly schedule uses an adequacy standard that does not apply to that regimen.",
      "Reporting single-pool Kt/V as though it accounts for urea rebound overlooks that equilibrated Kt/V is the measure that corrects for rebound."
    ],
    formulaExplanation:
      "Single-pool Kt/V uses the Daugirdas second-generation equation: spKt/V = -ln(R - 0.008 x t) + (4 - 3.5 x R) x (UF / W), where R is the post/pre-dialysis BUN ratio, t is treatment time in hours, UF is ultrafiltrate volume in L, and W is post-dialysis weight in kg.",
    variables: [
      {
        inputId: "preBun",
        label: "Pre-Dialysis BUN",
        explanation: "Blood urea nitrogen before dialysis in mg/dL, used to compute the post/pre BUN ratio R.",
      },
      {
        inputId: "postBun",
        label: "Post-Dialysis BUN",
        explanation: "Blood urea nitrogen after dialysis in mg/dL, divided by pre-dialysis BUN to form R.",
      },
      {
        inputId: "ultrafiltrate",
        label: "Ultrafiltration Volume",
        explanation: "Fluid removed during dialysis in L, divided by post-dialysis weight.",
      },
      {
        inputId: "treatmentTime",
        label: "Treatment Time",
        explanation: "Duration of the dialysis session in hours, used in the 0.008 x t term.",
      },
      {
        inputId: "postWeight",
        label: "Post-Dialysis Weight",
        explanation: "Post-dialysis body weight in kg, used to normalize the ultrafiltration volume.",
      },
    ],
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
      version: "1.0",
      updatedAt: "2026-08",
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Dialysis adequacy decisions must incorporate the prescription, access function, patient status, and KDOQI guidelines.",
  },

  "fractional-excretion-uric-acid": {
    commonMistakes: [
      "Using FEUA in a patient on uricosuric drugs such as losartan or probenecid without factoring in their effect on urate excretion.",
      "Treating the 12% and 20% cutoffs as definitive separators, since they come from observational data with substantial overlap.",
      "Pairing urine and serum samples that were not obtained simultaneously, which distorts the fractional excretion calculation."
    ],
    formulaExplanation:
      "Fractional excretion of uric acid = (urine uric acid x plasma creatinine) / (serum uric acid x urine creatinine) x 100, the percentage of filtered uric acid that is excreted in the urine.",
    variables: [
      {
        inputId: "urineUricAcid",
        label: "Urine Uric Acid",
        explanation: "Urine uric acid concentration in mg/dL, used in the numerator.",
      },
      {
        inputId: "serumUricAcid",
        label: "Serum Uric Acid",
        explanation: "Serum (plasma) uric acid in mg/dL, used in the denominator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used in the denominator to normalize for the filtered load.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator to estimate the filtered load.",
      },
    ],
    faq: [
          {
        "question": "Why use FEUA instead of FENa?",
        "answer": "FENa is inflated by diuretics and saline resuscitation, which makes it unreliable in many AKI patients. FEUA is less affected by diuretics and can complement FENa and FEUrea."
      },
      {
        "question": "What does a high FEUA mean in AKI?",
        "answer": "In AKI, a FEUA persistently > 20% is more consistent with intrinsic renal injury (e.g., ATN), whereas a low FEUA supports a prerenal pattern. Overlap is common."
      }

  ],
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
    evidence: {
      source: "Original derivation + observational validation (peer-reviewed)",
      reference:
        "Steinhäuslin F, et al. Fractional excretion of trace lithium and uric acid in acute renal failure. J Am Soc Nephrol. 1994;4(7):1429-1437.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Steinhäuslin F, et al. J Am Soc Nephrol. 1994;4(7):1429-1437.",
        "Fenske W, et al. FE-urate and FE-urea in the differential diagnosis of SIADH. Eur J Clin Invest. 2010;40(6):506-513.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEUA must be interpreted with the clinical context and alongside other urinary indices.",
  },

  "fractional-excretion-phosphate": {
    commonMistakes: [
      "Combining a urine phosphate from a morning void with a creatinine drawn that afternoon, since the ratio is only meaningful when blood and urine are collected together.",
      "Applying the 5% cutoff to a patient whose serum phosphate is normal or high, a setting where FEP is not intended to be interpreted.",
      "Reading an FEP above 5% as proof of FGF23 excess when high dietary phosphate, vitamin D therapy, or PTH status can independently raise phosphate excretion."
    ],
    formulaExplanation:
      "Fractional excretion of phosphate = (urine phosphate x plasma creatinine) / (serum phosphate x urine creatinine) x 100, the percentage of filtered phosphate that is excreted in the urine.",
    variables: [
      {
        inputId: "urinePhosphate",
        label: "Urine Phosphate",
        explanation: "Urine phosphate concentration in mg/dL, used in the numerator.",
      },
      {
        inputId: "serumPhosphate",
        label: "Serum Phosphate",
        explanation: "Serum phosphate in mg/dL, used in the denominator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used in the denominator to normalize for the filtered load.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator to estimate the filtered load.",
      },
    ],
    faq: [
          {
        "question": "When is FEP most useful?",
        "answer": "In a hypophosphatemic patient, FEP helps distinguish renal phosphate wasting (FEP > 5%) from causes such as redistribution into cells or gastrointestinal losses."
      },
      {
        "question": "Why is FEP unreliable in CKD?",
        "answer": "As GFR falls, fractional phosphate excretion rises physiologically due to FGF23/PTH-driven phosphaturia, so a high FEP is expected and not diagnostic."
      }

  ],
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
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Broadus AE, et al. Phosphate homeostasis and evaluation of hypophosphatemia. J Clin Invest. 1983;72(1):119-126.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Broadus AE, et al. J Clin Invest. 1983;72(1):119-126.",
        "Farrow EG, et al. Tumor-induced osteomalacia: the tumor takes the calcium, phosphate, and other nutrients. J Am Soc Nephrol. 2010;21(3):395-398.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FEP must be interpreted with the clinical context and the prevailing serum phosphate.",
  },

  "fractional-excretion-calcium": {
    commonMistakes: [
      "Ordering the ratio in hypercalcemia with suppressed PTH, where FHH is off the table and the result does not apply to malignancy or sarcoidosis.",
      "Proceeding to parathyroid surgery on the strength of a ratio above 2% without considering that CASR gene analysis remains the reference standard.",
      "Interpreting a CCCR below 0.01 as FHH when lithium, thiazides, or low calcium intake are lowering urine calcium and mimicking hypocalciuria."
    ],
    formulaExplanation:
      "Fractional excretion of calcium (calcium-creatinine clearance ratio) = (urine calcium x plasma creatinine) / (serum calcium x urine creatinine) x 100, the percentage of filtered calcium that is excreted in the urine.",
    variables: [
      {
        inputId: "urineCalcium",
        label: "Urine Calcium",
        explanation: "Urine calcium concentration in mg/dL, used in the numerator.",
      },
      {
        inputId: "serumCalcium",
        label: "Serum Calcium",
        explanation: "Serum calcium in mg/dL, used in the denominator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used in the denominator to normalize for the filtered load.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator to estimate the filtered load.",
      },
    ],
    faq: [
          {
        "question": "Why is FECa used to diagnose FHH?",
        "answer": "FHH is characterized by an inappropriately low renal calcium excretion relative to the prevailing hypercalcemia. A calcium–creatinine clearance ratio below 0.01 (FECa < 1%) supports FHH over primary hyperparathyroidism."
      },
      {
        "question": "What is the preferred FECa threshold?",
        "answer": "Traditional teaching uses < 0.01 (1%). Retrospective data suggest a screening cutoff of 0.02 (2%) captures about 98% of FHH cases, at the cost of including some primary hyperparathyroidism patients."
      }

  ],
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
    evidence: {
      source: "Original derivation + validation (peer-reviewed)",
      reference:
        "Christiansen C, et al. Discriminative power of three indices of renal calcium excretion for the distinction between familial hypocalciuric hypercalcaemia and primary hyperparathyroidism. Clin Endocrinol (Oxf). 2008;69(4):572-578.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Christiansen C, et al. Clin Endocrinol (Oxf). 2008;69(4):572-578.",
        "National Institute for Health and Care Excellence (NICE). Hyperparathyroidism (primary): diagnosis, assessment and initial management. NG132. 2019.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FECa is one component of the FHH evaluation and must be interpreted with PTH, family history, and genetic testing when indicated.",
  },

  "renal-failure-index": {
    commonMistakes: [
      "Reading an RFI above 1 as proof of acute tubular necrosis when values between 1 and 2 are indeterminate and the threshold alone is not validated.",
      "Expecting RFI to account for plasma sodium the way FENa does, even though this index drops that term and hinges on urine sodium and the creatinine ratio.",
      "Calculating RFI during active diuresis without accounting for it, since diuretics and saline resuscitation push urine sodium up and mimic intrinsic injury."
    ],
    formulaExplanation:
      "Renal failure index = (urine sodium x plasma creatinine) / urine creatinine, with urine sodium in mEq/L and both creatinines in mg/dL.",
    variables: [
      {
        inputId: "urineSodium",
        label: "Urine Sodium",
        explanation: "Urine sodium in mEq/L, used in the numerator.",
      },
      {
        inputId: "plasmaCr",
        label: "Plasma Creatinine",
        explanation: "Plasma creatinine in mg/dL, used in the numerator.",
      },
      {
        inputId: "urineCr",
        label: "Urine Creatinine",
        explanation: "Urine creatinine in mg/dL, used as the denominator.",
      },
    ],
    faq: [
          {
        "question": "How does RFI differ from FENa?",
        "answer": "FENa divides by the plasma sodium and expresses the result as a percentage; RFI omits the plasma sodium term. Both use urine sodium and the urine:plasma creatinine ratio and are interpreted similarly."
      },
      {
        "question": "Is RFI still used?",
        "answer": "FENa and FEUrea are more commonly used today, but RFI remains a classic, quick index taught for the AKI differential and is easily calculated at the bedside."
      }

  ],
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
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Miller TR, et al. Urinary diagnostic indices in acute renal failure: a prospective study. Ann Intern Med. 1978;89(1):47-50.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Miller TR, et al. Ann Intern Med. 1978;89(1):47-50.",
        "Espinel CH. The FENa test: use in the differential diagnosis of acute renal failure. JAMA. 1976;236(6):579-581.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. RFI must be interpreted with the clinical context and alongside other urinary indices.",
  },

  "urine-osmolal-gap": {
    commonMistakes: [
      "Entering urine urea and glucose in mmol/L rather than mg/dL, since the estimate divides urea by 2.8 and glucose by 18 using mg/dL values.",
      "Waiting until well after presentation to collect the urine, because continued alcohol metabolism lowers the gap and can hide unmeasured osmoles.",
      "Reporting a gap above 10 mOsm/kg as confirmation of ethylene glycol poisoning without sending the specific toxic alcohol assay."
    ],
    formulaExplanation:
      "Estimated urine osmolality = 2 x (urine sodium + urine potassium) + (urine urea / 2.8) + (urine glucose / 18). The urine osmolal gap is the measured urine osmolality minus this estimated value.",
    variables: [
      {
        inputId: "urineOsmolality",
        label: "Measured Urine Osmolality",
        explanation: "Laboratory-measured urine osmolality in mOsm/kg, the minuend of the gap.",
      },
      {
        inputId: "urineSodium",
        label: "Urine Sodium",
        explanation: "Urine sodium in mmol/L, added to urine potassium and doubled in the estimate.",
      },
      {
        inputId: "urinePotassium",
        label: "Urine Potassium",
        explanation: "Urine potassium in mmol/L, added to urine sodium and doubled in the estimate.",
      },
      {
        inputId: "urineUrea",
        label: "Urine Urea",
        explanation: "Urine urea in mg/dL, divided by 2.8 in the estimate.",
      },
      {
        inputId: "urineGlucose",
        label: "Urine Glucose",
        explanation: "Urine glucose in mg/dL, divided by 18 in the estimate.",
      },
    ],
    faq: [
          {
        "question": "What does the urine osmolal gap measure?",
        "answer": "It compares measured urine osmolality to the osmolality predicted from urine sodium, potassium, urea, and glucose. The difference represents unmeasured osmotically active solutes."
      },
      {
        "question": "When is the urine osmolal gap used?",
        "answer": "Mainly in suspected toxic alcohol or mannitol exposure when the serum osmolar gap is normal or negative, and as part of the metabolic evaluation of unmeasured osmoles."
      }

  ],
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
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Kraut JA, Kurtz I. Toxic alcohol ingestions: clinical features, diagnosis, and management. Clin J Am Soc Nephrol. 2008;3(1):208-225.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kraut JA, Kurtz I. Clin J Am Soc Nephrol. 2008;3(1):208-225.",
        "Hoffman RS, et al. Osmol and gap: a critical appraisal. Am J Emerg Med. 1993;11(5):543-547.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Suspected toxic alcohol ingestion requires specific assays and urgent clinical management regardless of the urine osmolal gap.",
  },

  "free-water-clearance": {
    commonMistakes: [
      "Relying on CH2O during a high-urea osmotic diuresis, where urea adds to urine osmolality without contributing tonicity and electrolyte-free water clearance is preferred.",
      "Entering a total collected urine volume where the formula expects a flow rate in mL/min, which inflates the magnitude and misstates water handling.",
      "Taking a positive CH2O as diagnostic of diabetes insipidus without weighing water intake and non-renal losses, which this single point estimate cannot capture."
    ],
    formulaExplanation:
      "Free water clearance C(H2O) = V x (1 - urine osmolality / plasma osmolality), where V is the urine flow rate. Positive values indicate free water excretion and negative values indicate free water retention.",
    variables: [
      {
        inputId: "urineVolume",
        label: "Urine Flow Rate",
        explanation: "Urine flow rate in mL/min, the multiplier V in the formula.",
      },
      {
        inputId: "urineOsmolality",
        label: "Urine Osmolality",
        explanation: "Urine osmolality in mOsm/kg, used as the numerator of the ratio.",
      },
      {
        inputId: "plasmaOsmolality",
        label: "Plasma Osmolality",
        explanation: "Plasma osmolality in mOsm/kg, used as the denominator of the ratio.",
      },
    ],
    faq: [
          {
        "question": "What does a positive CH₂O mean?",
        "answer": "A positive CH₂O means the kidney is excreting electrolyte-free water (dilute urine). This is appropriate after water loading and seen in diabetes insipidus and primary polydipsia."
      },
      {
        "question": "When should I prefer EFWC over CH₂O?",
        "answer": "In high-urea (osmotic) diuresis and when predicting the direction of serum sodium change, the electrolyte-free water clearance is more accurate because it excludes urea."
      }

  ],
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
    evidence: {
      source: "Original derivation (classic renal physiology)",
      reference:
        "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
        "Goldberg M. Hyponatremia. Med Clin North Am. 1981;65(2):251-269.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Water balance decisions require the full clinical picture, including intake, insensible losses, and serum sodium trends.",
  },

  "electrolyte-free-water-clearance": {
    commonMistakes: [
      "Adding urine urea into the calculation out of habit, when EFWC deliberately uses only the flow rate with urine and plasma sodium and potassium.",
      "Pairing a flow rate from one collection with urine electrolytes measured on a different sample, since every input must come from the same timed collection.",
      "Blaming renal water loss for a rising serum sodium when EFWC is near zero, a pattern that instead points to gastrointestinal or insensible losses."
    ],
    formulaExplanation:
      "Electrolyte-free water clearance = V x (1 - (urine sodium + urine potassium) / plasma sodium), where V is the urine flow rate.",
    variables: [
      {
        inputId: "urineVolume",
        label: "Urine Flow Rate",
        explanation: "Urine flow rate in mL/min, the multiplier V in the formula.",
      },
      {
        inputId: "urineSodium",
        label: "Urine Sodium",
        explanation: "Urine sodium in mmol/L, added to urine potassium in the numerator of the ratio.",
      },
      {
        inputId: "urinePotassium",
        label: "Urine Potassium",
        explanation: "Urine potassium in mmol/L, added to urine sodium in the numerator of the ratio.",
      },
      {
        inputId: "plasmaSodium",
        label: "Plasma Sodium",
        explanation: "Plasma sodium in mmol/L, used as the denominator of the ratio.",
      },
    ],
    faq: [
          {
        "question": "How is EFWC different from CH₂O?",
        "answer": "CH₂O uses total urine osmolality (including urea); EFWC uses only urine sodium + potassium relative to plasma sodium, so it reflects tonicity and is more accurate in osmotic diuresis."
      },
      {
        "question": "What does a high positive EFWC imply in hypernatremia?",
        "answer": "It means the kidneys are excreting substantial electrolyte-free water — the cause of the hypernatremia is renal, and replacement therapy must match this ongoing loss."
      }

  ],
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
    evidence: {
      source: "Original derivation (classic renal physiology)",
      reference:
        "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
        "Nguyen MK, Kurtz I. Derivation of a new formula for calculating urinary electrolyte-free water clearance based on the Edelman equation. Am J Physiol Renal Physiol. 2005;288(1):F1-7.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fluid therapy in dysnatremia must account for the full clinical picture and serial laboratory monitoring.",
  },

  "urine-protein-creatinine-ratio": {
    commonMistakes: [
      "Applying the adult nephrotic threshold of 3.5 mg/mg to a child, where a ratio of at least 2.0 defines nephrotic-range proteinuria instead.",
      "Using UPCR instead of the albumin-to-creatinine ratio to screen for early diabetic kidney disease, where albumin-specific testing is preferred.",
      "Trusting the ratio during gross hematuria or marked urine dilution, where non-albumin protein and abnormal concentration make the estimate unreliable."
    ],
    formulaExplanation:
      "Urine protein-to-creatinine ratio = urine protein / urine creatinine, both in mg/dL, giving a dimensionless ratio (mg/mg) that estimates 24-hour protein excretion.",
    variables: [
      {
        inputId: "urineProtein",
        label: "Urine Protein",
        explanation: "Urine protein concentration in mg/dL, used as the numerator.",
      },
      {
        inputId: "urineCreatinine",
        label: "Urine Creatinine",
        explanation: "Urine creatinine concentration in mg/dL, used as the denominator to normalize for urine concentration.",
      },
    ],
    faq: [
          {
        "question": "How does UPCR relate to 24-hour urine protein?",
        "answer": "In most adults, a spot UPCR in mg/mg is approximately equal to grams of protein per day, so 3.5 mg/mg approximates nephrotic range (≥ 3.5 g/day) proteinuria."
      },
      {
        "question": "Should I use UPCR or ACR?",
        "answer": "ACR (albumin) is preferred for early diabetic kidney disease and KDIGO staging. UPCR (total protein) is used for general proteinuria quantification, including nephrotic syndrome."
      }

  ],
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
    evidence: {
      source: "Guideline + validation studies",
      reference:
        "National Kidney Foundation. KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int Suppl. 2013;3(1):1-150.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "KDIGO 2012 CKD Guideline. Kidney Int Suppl. 2013;3(1):1-150.",
        "Ginsberg JM, et al. Use of single voided urine samples to estimate quantitative proteinuria. N Engl J Med. 1983;309(25):1543-1546.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Proteinuria results must be interpreted with the clinical context and confirmed with repeat testing when abnormal.",
  },

  "creatinine-clearance-24h": {
    commonMistakes: [
      "Forgetting to divide by 1440, or dividing by it twice, when converting the 24-hour volume into the per-minute rate the formula requires.",
      "Using the result for drug dosing in acute kidney injury, where serum creatinine is changing during the collection and the clearance is unreliable.",
      "Assuming a low measured clearance reflects kidney disease when missed voids during the collection are the more common cause of an underestimated result."
    ],
    formulaExplanation:
      "Creatinine clearance = (urine creatinine x 24-hour urine volume) / (serum creatinine x 1440), where 1440 is the number of minutes in 24 hours, yielding mL/min.",
    variables: [
      {
        inputId: "urineCreatinine",
        label: "Urine Creatinine (24h)",
        explanation: "Urine creatinine concentration in mg/dL measured from the 24-hour collection.",
      },
      {
        inputId: "urineVolume",
        label: "24-Hour Urine Volume",
        explanation: "Total urine volume collected over 24 hours in mL.",
      },
      {
        inputId: "serumCreatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL, used with 1440 minutes in the denominator.",
      },
    ],
    faq: [
          {
        "question": "Why does CrCl overestimate true GFR?",
        "answer": "Creatinine is filtered and also actively secreted by proximal tubules, so urinary creatinine clearance exceeds the true filtration rate by roughly 10–20%, with a larger gap at low GFR."
      },
      {
        "question": "How do I check whether the 24-hour collection was complete?",
        "answer": "Compare the collection's total creatinine (urine creatinine × volume) with the expected daily excretion (~15–20 mg/kg/day in men, 10–15 mg/kg/day in women). Wide deviations suggest over- or under-collection."
      }

  ],
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
    evidence: {
      source: "Classic renal physiology definition",
      reference:
        "Levey AS, et al. Expressing the Modification of Diet in Renal Disease Study equation for estimating glomerular filtration rate with standardized serum creatinine values. Clin Chem. 2007;53(4):766-772.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Levey AS, et al. Clin Chem. 2007;53(4):766-772.",
        "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Collection completeness and clinical context are essential when interpreting creatinine clearance.",
  },

  "total-cholesterol-hdl-ratio": {
    commonMistakes: [
      "Running the ratio on a non-fasting sample drawn during acute illness, since swings in triglycerides alter total cholesterol and shift the calculated ratio.",
      "Declining statin therapy because the ratio is below 4, when statin decisions rest on validated cardiovascular risk scores rather than this single marker.",
      "Flagging a female patient as high risk at a value a clinician would call unremarkable in a male peer, since the reference pattern differs by sex."
    ],
    formulaExplanation:
      "Total cholesterol to HDL ratio = total cholesterol / HDL cholesterol, with both lipids in mg/dL.",
    variables: [
      {
        inputId: "totalCholesterol",
        label: "Total Cholesterol",
        explanation: "Total serum cholesterol in mg/dL, used as the numerator.",
      },
      {
        inputId: "hdlCholesterol",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL, used as the denominator.",
      },
    ],
    faq: [
          {
        "question": "What is a good TC/HDL ratio?",
        "answer": "Values below 4 are generally considered desirable, with some risk models favoring values around 3.5 or lower. The ratio should be interpreted in the context of overall cardiovascular risk."
      },
      {
        "question": "Is TC/HDL still recommended?",
        "answer": "Modern guidelines emphasize LDL and non-HDL cholesterol for treatment decisions, but the TC/HDL ratio remains a useful, inexpensive risk indicator and patient-education tool."
      }

  ],
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
    evidence: {
      source: "Epidemiological association (peer-reviewed)",
      reference:
        "Stampfer MJ, et al. A prospective study of cholesterol, apolipoproteins, and the risk of myocardial infarction. N Engl J Med. 1991;325(6):373-381.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Stampfer MJ, et al. N Engl J Med. 1991;325(6):373-381.",
        "Assmann G, et al. The role of HDL cholesterol in the metabolic syndrome. Atheroscler Suppl. 2002;3(4):35-41.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The TC/HDL ratio should be interpreted within the framework of a complete cardiovascular risk assessment.",
  },

  "atherogenic-index-of-plasma": {
    commonMistakes: [
      "Calculating AIP from a non-fasting lipid draw, because a recent high-fat meal inflates triglycerides and shifts the index upward.",
      "Setting a treatment goal of driving AIP below 0.21, since the index is an adjunct marker rather than a target and its cutoffs are not standardized.",
      "Describing AIP as a direct measurement of LDL particle size, when it only correlates with smaller, denser particles."
    ],
    formulaExplanation:
      "Atherogenic index of plasma = log10(triglycerides / HDL cholesterol), with both lipids in mg/dL.",
    variables: [
      {
        inputId: "triglycerides",
        label: "Triglycerides",
        explanation: "Fasting triglycerides in mg/dL, used as the numerator of the ratio.",
      },
      {
        inputId: "hdlCholesterol",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL, used as the denominator before the base-10 logarithm.",
      },
    ],
    faq: [
          {
        "question": "What does the AIP actually measure?",
        "answer": "AIP reflects the balance between atherogenic triglyceride-rich lipoproteins and protective HDL. Higher values correlate with smaller, denser LDL particles and increased cardiovascular risk."
      },
      {
        "question": "How do I compute AIP when TG and HDL are in mmol/L?",
        "answer": "The ratio TG/HDL is unit-independent (it is a ratio), so AIP can be computed with mg/dL or mmol/L values; only the logarithmic transformation matters."
      }

  ],
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
    evidence: {
      source: "Original derivation (peer-reviewed)",
      reference:
        "Dobiásová M, Frohlich J. The plasma parameter log (TG/HDL-C) as an atherogenic index: correlation with lipoprotein particle size and esterification rate in apoB-lipoprotein-depleted plasma (FERHDL). Clin Biochem. 2001;34(7):583-588.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Dobiásová M, Frohlich J. Clin Biochem. 2001;34(7):583-588.",
        "Dobiásová M. Atherogenic index of plasma [log(triglycerides/HDL-cholesterol)]: theoretical and practical implications. Clin Chem. 2004;50(7):1113-1115.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The AIP should be used as an adjunct to, not a substitute for, comprehensive lipid and cardiovascular risk assessment.",
  },

  "apob-apoa1-ratio": {
    commonMistakes: [
      "Applying the male upper reference of 1.0 to a female patient, whose reference range tops out at 0.8 and whose elevated threshold differs.",
      "Dividing ApoB reported in mg/dL by ApoA1 reported in g/L, since the ratio only holds when both apolipoproteins are expressed in the same units.",
      "Adopting a ratio above 1.0 as a treatment target even when the performing laboratory's own reference interval says something different."
    ],
    formulaExplanation:
      "ApoB to ApoA1 ratio = ApoB (g/L) / ApoA1 (g/L). A higher ratio reflects a greater burden of atherogenic relative to protective lipoproteins.",
    variables: [
      {
        inputId: "apoB",
        label: "ApoB",
        explanation: "Apolipoprotein B in g/L, used as the numerator.",
      },
      {
        inputId: "apoA1",
        label: "ApoA1",
        explanation: "Apolipoprotein A1 in g/L, used as the denominator.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, used to apply sex-specific interpretation thresholds for the ratio.",
      },
    ],
    faq: [
          {
        "question": "Why is the ApoB:ApoA1 ratio used?",
        "answer": "It reflects the balance between atherogenic and protective lipoproteins, and in epidemiological studies (e.g., INTERHEART, AMORIS) it has performed well as a cardiovascular risk marker."
      },
      {
        "question": "What is the difference between ApoB and LDL?",
        "answer": "LDL cholesterol measures cholesterol mass; ApoB counts the number of atherogenic particles (one per particle), which better captures risk from small, dense LDL and remnant particles."
      }

  ],
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
    evidence: {
      source: "Epidemiological association (peer-reviewed)",
      reference:
        "Walldius G, Jungner I. The apoB/apoA-I ratio: a strong, new risk factor for cardiovascular disease and a target for lipid-lowering therapy — a review of the evidence. J Intern Med. 2006;259(5):493-519.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Walldius G, Jungner I. J Intern Med. 2006;259(5):493-519.",
        "Yusuf S, et al. Effect of potentially modifiable risk factors associated with myocardial infarction in 52 countries (INTERHEART). Lancet. 2004;364(9438):937-952.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use the performing laboratory's reference interval and incorporate the ratio into a complete cardiovascular risk assessment.",
  },

  "respiratory-compensation": {
    commonMistakes: [
      "Selecting the chronic factor of 4 for a disturbance that began only hours earlier, producing an expected bicarbonate that overshoots the real response.",
      "Calling a disturbance chronic from the blood gas pattern alone, when chronic respiratory acidosis also requires a duration of more than 3-5 days.",
      "Stopping the acid-base workup once the measured bicarbonate matches the expectation, without checking anion gap and delta ratio for a hidden mixed disorder."
    ],
    formulaExplanation:
      "Expected bicarbonate = 24 + k x ((PaCO2 - 40) / 10), where k = 1 for acute respiratory acidosis, 4 for chronic respiratory acidosis, -2 for acute respiratory alkalosis, and -5 for chronic respiratory alkalosis. The expected value is compared with the measured bicarbonate to identify mixed disorders.",
    variables: [
      {
        inputId: "disorderType",
        label: "Disorder Type",
        explanation: "Selects the acute or chronic respiratory disorder, which determines the compensation coefficient k.",
      },
      {
        inputId: "paCO2",
        label: "Arterial PaCO2",
        explanation: "Arterial partial pressure of carbon dioxide in mmHg, entered into the (PaCO2 - 40) / 10 term.",
      },
      {
        inputId: "measuredBicarbonate",
        label: "Measured Bicarbonate (HCO3)",
        explanation: "Measured serum bicarbonate in mEq/L, compared with the expected value to assess compensation.",
      },
    ],
    faq: [
          {
        "question": "What does 'within ±2' mean for the expected HCO₃?",
        "answer": "It means the measured bicarbonate should fall within roughly 2 mEq/L of the calculated expected value for the patient's PaCO₂ and disorder type. Larger deviations suggest a mixed acid–base disorder."
      },
      {
        "question": "Why are the factors different for acute vs chronic disorders?",
        "answer": "Acute changes rely mainly on cellular buffering, which raises HCO₃ modestly. With time, renal compensation becomes much more effective, so chronic respiratory acidosis and alkalosis produce larger changes in bicarbonate."
      }

  ],
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
    evidence: {
      source: "Classic acid–base physiology / expert-derived rules",
      reference:
        "Merck Manual Professional Version. Respiratory Acidosis and Respiratory Alkalosis. www.merckmanuals.com.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Merck Manual Professional Version. Respiratory Acidosis and Alkalosis.",
        "Brewer ED. Disorders of acid-base balance. Pediatr Clin North Am. 1990;37(2):429-447.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid–base interpretation requires the full clinical picture, including electrolytes, albumin, and the anion gap.",
  },

  "metabolic-alkalosis-compensation": {
    commonMistakes: [
      "Feeding a bicarbonate of 24 mEq/L or lower into a rule built for metabolic alkalosis, which only applies when the bicarbonate is above 24.",
      "Expecting the predicted PaCO2 to rise without limit at extreme bicarbonate values, even though the ventilatory response flattens near 55 mmHg.",
      "Applying the rule to a patient on fixed-rate mechanical ventilation, where the ventilator settings rather than the metabolic disturbance set the PaCO2."
    ],
    formulaExplanation:
      "Expected PaCO2 in metabolic alkalosis = 40 + 0.6 x (bicarbonate - 24), capped near 55 mmHg. A measured PaCO2 within about +/-5 mmHg of the expected value indicates appropriate respiratory compensation.",
    variables: [
      {
        inputId: "bicarbonate",
        label: "Serum Bicarbonate (HCO3)",
        explanation: "Serum bicarbonate in mEq/L, used in the (HCO3 - 24) term to compute the expected PaCO2.",
      },
      {
        inputId: "measuredPaCO2",
        label: "Measured Arterial PaCO2",
        explanation: "Measured arterial PaCO2 in mmHg, compared with the expected value to assess compensation.",
      },
    ],
    faq: [
          {
        "question": "Why is the expected PaCO₂ capped?",
        "answer": "The ventilatory response has an upper limit — PaCO₂ rarely exceeds ~55 mmHg in pure metabolic alkalosis even at very high bicarbonates — so the linear rule flattens at the extreme."
      },
      {
        "question": "What does a PaCO₂ below expected suggest?",
        "answer": "It suggests a coexisting respiratory alkalosis (e.g., pain, anxiety, hypoxemia, or over-breathing). A PaCO₂ well above expected suggests a coexisting respiratory acidosis."
      }

  ],
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
    evidence: {
      source: "Classic acid–base physiology / expert-derived rule",
      reference:
        "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kraut JA, Madias NE. Metabolic alkalosis: pathogenesis, diagnosis, and treatment. In: Brenner and Rector's The Kidney. 2020.",
        "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Acid–base interpretation requires the full clinical picture and should guide, not replace, clinical judgment.",
  },

  "free-thyroxine-index": {
    commonMistakes: [
      "Entering the T3 resin uptake as a decimal fraction instead of a percentage makes the division by 100 produce an incorrect index.",
      "Comparing a result to the 1.0-4.5 reference when the performing laboratory uses a different assay ignores that the interval is assay-specific.",
      "Ordering FTI when a direct free T4 assay is available substitutes a largely superseded indirect estimate for the direct measurement."
    ],
    formulaExplanation:
      "Free thyroxine index = total T4 (microg/dL) x T3 resin uptake (%) / 100, an indirect estimate of free T4.",
    variables: [
      {
        inputId: "totalT4",
        label: "Total T4",
        explanation: "Total serum thyroxine in microg/dL, multiplied by the T3 resin uptake.",
      },
      {
        inputId: "t3Uptake",
        label: "T3 Resin Uptake",
        explanation: "T3 resin uptake in percent, divided by 100 before multiplying total T4.",
      },
    ],
    faq: [
          {
        "question": "How is FTI different from free T4?",
        "answer": "Free T4 is a direct (or calculated) measure of unbound T4. FTI is an indirect index derived by multiplying total T4 by the T3 resin uptake, used when direct free T4 measurement is not available or binding-protein effects are confounding."
      },
      {
        "question": "What causes the FTI to be falsely abnormal?",
        "answer": "Abnormalities in thyroid hormone-binding proteins (pregnancy, estrogens, androgens, liver disease, nephrotic syndrome) and drugs (salicylates, phenytoin, heparin) can alter total T4 and T3 uptake, changing the FTI even when free hormone is normal."
      }

  ],
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
    evidence: {
      source: "Endocrinology / Thyroid",
      reference:
        "Surks MI, et al. American Thyroid Association guidelines for use of laboratory tests in thyroid disorders. JAMA. 1990;263(11):1529-1532.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Surks MI, et al. JAMA. 1990;263(11):1529-1532.",
        "Mayo Clinic Laboratories. Free Thyroxine Index (FTI), Serum.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Use the performing laboratory's reference interval and interpret the FTI together with TSH and clinical status.",
  },

  "metabolic-syndrome-atp3": {
    commonMistakes: [
      "Applying Asian-specific waist cutoffs of 90/80 cm when this calculator uses the classic ATP III values of 102/88 cm misclassifies the waist criterion.",
      "Marking a treated hypertensive or treated dyslipidemia patient as failing a criterion ignores the treatment exemption built into the ATP III definition.",
      "Interpreting a positive result as a diagnosis of diabetes or hypertension confuses clustered risk factors with individual disease diagnoses."
    ],
    formulaExplanation:
      "Metabolic syndrome is present when at least 3 of 5 NCEP ATP III criteria are met: elevated waist circumference (sex-specific), triglycerides >= 150 mg/dL (or treatment), HDL < 40 mg/dL in men or < 50 mg/dL in women (or treatment), blood pressure >= 130/85 mmHg (or treatment), and fasting glucose >= 100 mg/dL (or treatment).",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which sets the sex-specific waist circumference and HDL thresholds.",
      },
      {
        inputId: "waist",
        label: "Waist Circumference",
        explanation: "Waist circumference in cm, compared with the sex-specific ATP III cutoff.",
      },
      {
        inputId: "triglycerides",
        label: "Triglycerides",
        explanation: "Fasting triglycerides in mg/dL; 150 or higher counts as a criterion.",
      },
      {
        inputId: "hdl",
        label: "HDL Cholesterol",
        explanation: "HDL cholesterol in mg/dL; below 40 (men) or 50 (women) counts as a criterion.",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg, part of the 130/85 mmHg blood pressure criterion.",
      },
      {
        inputId: "dbp",
        label: "Diastolic Blood Pressure",
        explanation: "Diastolic blood pressure in mmHg, part of the 130/85 mmHg blood pressure criterion.",
      },
      {
        inputId: "fastingGlucose",
        label: "Fasting Glucose",
        explanation: "Fasting glucose in mg/dL; 100 or higher counts as a criterion.",
      },
      {
        inputId: "lipidRx",
        label: "On drug treatment for dyslipidemia (triglycerides/HDL)",
        explanation: "Whether the patient takes lipid-lowering therapy; Yes satisfies the triglyceride and HDL criteria regardless of the measured values.",
      },
      {
        inputId: "bpRx",
        label: "On drug treatment for hypertension",
        explanation: "Whether the patient takes antihypertensive therapy; Yes satisfies the blood pressure criterion regardless of the measured values.",
      },
      {
        inputId: "glucoseRx",
        label: "On drug treatment for elevated glucose",
        explanation: "Whether the patient takes glucose-lowering therapy; Yes satisfies the fasting glucose criterion regardless of the measured value.",
      },
    ],
    faq: [
          {
        "question": "How is metabolic syndrome diagnosed?",
        "answer": "Any 3 of the 5 ATP III criteria (waist, triglycerides, HDL, blood pressure, glucose), with patients on drug treatment for any criterion counted as meeting that criterion."
      },
      {
        "question": "What waist thresholds should I use?",
        "answer": "The classic ATP III cutoffs are 102 cm (men) and 88 cm (women), or BMI ≥ 30 kg/m². Some population-specific guidelines use lower cutoffs (e.g., 90/80 cm for Asian populations)."
      }

  ],
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
    evidence: {
      source: "Cardiology / Endocrinology",
      reference:
        "Grundy SM, et al. Diagnosis and management of the metabolic syndrome: an American Heart Association/National Heart, Lung, and Blood Institute scientific statement. Circulation. 2005;112(17):2735-2752.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Grundy SM, et al. Circulation. 2005;112(17):2735-2752.",
        "Alberti KG, et al. Circulation. 2009;120(16):1640-1645.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Metabolic syndrome assessment should be combined with global cardiovascular risk scoring and clinical judgment.",
  },

  "bishop-score": {
    commonMistakes: [
      "Using the Bishop score to counsel about the course of spontaneous labor in women not facing induction, a purpose the score was never designed to serve.",
      "Applying the traditional favorable cutoff of 8 when the local protocol uses a modified Bishop score of 6 or higher, or the reverse, which mislabels cervical favorability.",
      "Assuming the score alone predicts induction success, when parity, gestational age, and prior vaginal delivery also influence the outcome and examiner variability affects each assessment."
    ],
    formulaExplanation:
      "The Bishop score sums five cervical findings: dilatation (0-3), effacement (0-3), station (0-3), consistency (0-2), and position (0-2), for a total of 0-13. Higher scores predict a higher likelihood of successful induction and vaginal delivery.",
    variables: [
      {
        inputId: "dilation",
        label: "Cervical Dilatation",
        explanation: "Cervical dilatation, scored 0 (0 cm) to 3 (3 cm or more).",
      },
      {
        inputId: "effacement",
        label: "Cervical Effacement",
        explanation: "Cervical effacement, scored 0 (0-30%) to 3 (80% or more).",
      },
      {
        inputId: "station",
        label: "Fetal Station",
        explanation: "Fetal station, scored 0 (minus 3) to 3 (plus 1 or plus 2).",
      },
      {
        inputId: "consistency",
        label: "Cervical Consistency",
        explanation: "Cervical consistency, scored 0 (firm), 1 (medium), or 2 (soft).",
      },
      {
        inputId: "position",
        label: "Cervical Position",
        explanation: "Cervical position, scored 0 (posterior), 1 (mid), or 2 (anterior).",
      },
    ],
    faq: [
          {
        "question": "What is a good Bishop score for induction?",
        "answer": "A score of 8 or higher is traditionally considered favorable; a modified Bishop score of 6 or higher is often used as the threshold at which induction is likely to succeed."
      },
      {
        "question": "What if the Bishop score is low?",
        "answer": "A low score (unfavorable cervix) suggests cervical ripening is warranted before oxytocin, using pharmacologic agents or mechanical methods, then reassessment."
      }

  ],
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
    evidence: {
      source: "Obstetrics",
      reference:
        "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Bishop EH. Obstet Gynecol. 1964;24:266-268.",
        "ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Induction decisions require the full clinical picture, including maternal and fetal indications, and should guide — not replace — clinical judgment.",
  },

  "biophysical-profile": {
    commonMistakes: [
      "Using the biophysical profile as the sole test when acute fetal distress is suspected, where continuous fetal monitoring is the indicated assessment instead.",
      "Giving partial credit such as 1 point to a component, since each of the five components scores only 0 or 2 and the total runs from 0 to 10.",
      "Recording absent fetal breathing or movement before the full 30-minute observation window has elapsed, which can misclassify a reassuring fetus as abnormal."
    ],
    formulaExplanation:
      "The biophysical profile sums five components each scored 0 or 2: fetal breathing, gross body movement, fetal tone, amniotic fluid volume, and non-stress test, for a total of 0-10. Higher scores indicate reassuring fetal status.",
    variables: [
      {
        inputId: "breathing",
        label: "Fetal Breathing",
        explanation: "Fetal breathing movements, scored 0 if absent or 2 if at least one episode of 30 seconds or more within 30 minutes.",
      },
      {
        inputId: "movement",
        label: "Gross Body Movement",
        explanation: "Gross body movements, scored 0 if absent or 2 if at least three movements in 30 minutes.",
      },
      {
        inputId: "tone",
        label: "Fetal Tone",
        explanation: "Fetal tone, scored 0 if absent or poor or 2 if at least one episode of flexion and extension.",
      },
      {
        inputId: "amnioticFluid",
        label: "Amniotic Fluid Volume",
        explanation: "Amniotic fluid volume, scored 0 if the single deepest pocket is under 2 cm or 2 if 2 cm or more.",
      },
      {
        inputId: "nst",
        label: "Non-Stress Test (NST)",
        explanation: "Non-stress test result, scored 0 if nonreactive or 2 if reactive.",
      },
    ],
    faq: [
          {
        "question": "What does a BPP of 6 mean?",
        "answer": "A score of 6 is equivocal. It is typically repeated within 24 hours; management depends on the indication for testing, gestational age, and the specific component(s) that were abnormal."
      },
      {
        "question": "Why is amniotic fluid scored separately?",
        "answer": "Amniotic fluid volume reflects chronic fetal status (weeks), while breathing, movement, tone, and the NST reflect acute status (minutes to hours)."
      }

  ],
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
    evidence: {
      source: "Obstetrics / Perinatology",
      reference:
        "Manning FA, et al. Fetal biophysical profile scoring: a prospective study in 1,184 high-risk patients. Am J Obstet Gynecol. 1981;140(3):289-294.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Manning FA, et al. Am J Obstet Gynecol. 1981;140(3):289-294.",
        "ACOG Practice Bulletin No. 145: Antepartum fetal surveillance. Obstet Gynecol. 2014;124(1):182-201.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Fetal well-being assessment must be interpreted with the full clinical context by the managing obstetric provider.",
  },

  "hellp-syndrome": {
    commonMistakes: [
      "Mixing the Tennessee calculator output with the Mississippi classification system, which grades severity differently, and then quoting a severity grade the Tennessee criteria do not produce.",
      "Entering platelets in units that ignore the per-microliter scale, since low platelets means strictly below 100,000 per microliter, or 100 in thousands, and borderline values hinge on that distinction.",
      "Stopping the evaluation once the three criteria are met, without excluding look-alikes such as thrombotic microangiopathy, viral hepatitis, or fatty liver of pregnancy."
    ],
    formulaExplanation:
      "The Tennessee (Sibai) criteria for HELLP require three findings: hemolysis (LDH of 600 U/L or higher, schistocytes on smear, or low haptoglobin), elevated liver enzymes (AST of 70 U/L or higher), and low platelets (below 100 x10^3/microL). The calculator reports which criteria are present.",
    variables: [
      {
        inputId: "platelets",
        label: "Platelets",
        explanation: "Platelet count in x10^3/microL; below 100 is a positive criterion.",
      },
      {
        inputId: "ast",
        label: "AST",
        explanation: "Aspartate aminotransferase in U/L; 70 or higher is a positive liver-enzyme criterion.",
      },
      {
        inputId: "ldh",
        label: "LDH",
        explanation: "Lactate dehydrogenase in U/L; 600 or higher supports the hemolysis criterion.",
      },
      {
        inputId: "hemolysis",
        label: "Hemolysis evidence on smear (schistocytes) or low haptoglobin",
        explanation: "Presence of hemolysis on the peripheral smear or low haptoglobin; Yes satisfies the hemolysis criterion.",
      },
    ],
    faq: [
          {
        "question": "What is the difference between complete and partial HELLP?",
        "answer": "Complete (classic) HELLP requires all three Tennessee criteria (hemolysis, AST ≥ 70, platelets < 100,000). Partial HELLP has one or two features; management is generally similar given the risk of progression."
      },
      {
        "question": "Can HELLP occur without hypertension?",
        "answer": "Yes — up to 15–20% of patients do not have significant hypertension or proteinuria at presentation, which contributes to misdiagnosis."
      }

  ],
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
    evidence: {
      source: "Obstetrics / Maternal-Fetal Medicine",
      reference:
        "Sibai BM, et al. Maternal morbidity and mortality in 442 pregnancies with hemolysis, elevated liver enzymes, and low platelets (HELLP syndrome). Am J Obstet Gynecol. 1993;169(4):1000-1006.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Sibai BM, et al. Am J Obstet Gynecol. 1993;169(4):1000-1006.",
        "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. HELLP syndrome is a clinical emergency; laboratory-based scoring supplements, but does not replace, urgent clinical judgment.",
  },

  "hadlock-efw": {
    commonMistakes: [
      "Entering any biometric measurement in millimeters instead of centimeters, which distorts the logarithmic formula and produces an estimated weight that is wildly implausible.",
      "Quoting the estimate to patients as a predicted birth weight, when the reported error is about 7.5% at 1 standard deviation and accuracy declines at the extremes of size.",
      "Diagnosing growth restriction or macrosomia from a single estimated weight without gestational-age growth charts and serial measurements, which are much more reliable than one value."
    ],
    formulaExplanation:
      "The Hadlock four-parameter formula estimates fetal weight: log10(EFW) = 1.3596 - 0.00386(AC x FL) + 0.0064(HC) + 0.00061(BPD x AC) + 0.0424(AC) + 0.174(FL), with all measurements in cm and the estimated fetal weight in grams.",
    variables: [
      {
        inputId: "bpd",
        label: "Biparietal Diameter (BPD)",
        explanation: "Biparietal diameter in cm, contributing through the BPD x AC term.",
      },
      {
        inputId: "hc",
        label: "Head Circumference (HC)",
        explanation: "Head circumference in cm, contributing through its linear term.",
      },
      {
        inputId: "ac",
        label: "Abdominal Circumference (AC)",
        explanation: "Abdominal circumference in cm, the dominant measurement appearing in several terms.",
      },
      {
        inputId: "fl",
        label: "Femur Length (FL)",
        explanation: "Femur length in cm, contributing through the AC x FL and linear terms.",
      },
    ],
    faq: [
          {
        "question": "How accurate is the Hadlock formula?",
        "answer": "The 1 SD error is approximately 7.5% (roughly ±250 g near term). This means a computed EFW of 3000 g should be read as approximately 2775–3225 g."
      },
      {
        "question": "Why are all four measurements required?",
        "answer": "This calculator uses the four-parameter Hadlock model (BPD, HC, AC, FL), which has better accuracy than models using fewer measurements. Three-parameter and two-parameter variants exist but are less precise."
      }

  ],
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
    evidence: {
      source: "Obstetrics / Ultrasound",
      reference:
        "Hadlock FP, et al. Estimation of fetal weight with the use of head, body, and femur measurements — a prospective study. Am J Obstet Gynecol. 1985;151(3):333-337.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Hadlock FP, et al. Am J Obstet Gynecol. 1985;151(3):333-337.",
        "ACOG Practice Bulletin No. 227: Fetal growth restriction. Obstet Gynecol. 2021;137(2):e16-e28.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Estimated fetal weight is inherently imprecise and must be interpreted with gestational age, growth trends, and clinical judgment.",
  },

  "preeclampsia-criteria": {
    commonMistakes: [
      "Recording a blood pressure of 140/90 as a severe feature, when severe-range pressure is 160 systolic or 110 diastolic and 140/90 merely meets the diagnostic threshold.",
      "Accepting a dipstick of 1+ as proteinuria, since the definition requires at least 300 mg per 24 hours, a protein-to-creatinine ratio of 0.3, or dipstick 2+ or higher.",
      "Running the criteria on hypertension detected before 20 weeks or in a patient with known chronic hypertension, clinical contexts the ACOG definition does not address."
    ],
    formulaExplanation:
      "Preeclampsia is present when hypertension (systolic 140 mmHg or higher or diastolic 90 mmHg or higher after 20 weeks) is accompanied by proteinuria or end-organ dysfunction. Severe features are counted individually: blood pressure of 160/110 mmHg or higher, platelets below 100 x10^3/microL, creatinine above 1.1 mg/dL, impaired liver function, pulmonary edema, and cerebral or visual symptoms.",
    variables: [
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg; 140 or higher meets the hypertension threshold and 160 or higher is a severe feature.",
      },
      {
        inputId: "dbp",
        label: "Diastolic Blood Pressure",
        explanation: "Diastolic blood pressure in mmHg; 90 or higher meets the hypertension threshold and 110 or higher is a severe feature.",
      },
      {
        inputId: "proteinuria",
        label: "Proteinuria (>= 300 mg/24 h, PCR >= 0.3, or dipstick >= 2+)",
        explanation: "Presence of significant proteinuria; Yes satisfies the proteinuria criterion.",
      },
      {
        inputId: "platelets",
        label: "Platelets",
        explanation: "Platelet count in x10^3/microL; below 100 is a severe feature (thrombocytopenia).",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL; above 1.1 indicates renal involvement.",
      },
      {
        inputId: "transaminases",
        label: "AST/ALT >= 2x ULN (impaired liver function)",
        explanation: "Transaminases at least twice the upper limit of normal; Yes indicates liver involvement.",
      },
      {
        inputId: "ruqPain",
        label: "Severe persistent RUQ/epigastric pain",
        explanation: "Severe persistent right upper quadrant or epigastric pain; Yes is a severe feature.",
      },
      {
        inputId: "pulmonaryEdema",
        label: "Pulmonary edema",
        explanation: "Pulmonary edema; Yes is a severe feature.",
      },
      {
        inputId: "headache",
        label: "New-onset headache unresponsive to medication",
        explanation: "New-onset headache unresponsive to medication; Yes is a cerebral severe feature.",
      },
      {
        inputId: "visual",
        label: "Visual symptoms (scotomata, blurred vision)",
        explanation: "Visual symptoms such as scotomata or blurred vision; Yes is a cerebral severe feature.",
      },
    ],
    faq: [
          {
        "question": "Can preeclampsia be diagnosed without proteinuria?",
        "answer": "Yes — new-onset hypertension plus any of thrombocytopenia, renal insufficiency, liver involvement, pulmonary edema, or cerebral/visual symptoms meets criteria even without proteinuria."
      },
      {
        "question": "What counts as a severe feature?",
        "answer": "SBP ≥ 160 or DBP ≥ 110; platelets < 100,000/µL; creatinine > 1.1 mg/dL or doubling; transaminases ≥ 2× ULN; pulmonary edema; new headache unresponsive to medication; and visual symptoms."
      }

  ],
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
    evidence: {
      source: "Obstetrics / ACOG",
      reference:
        "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Preeclampsia diagnosis and management require complete clinical assessment; treat severe hypertension promptly regardless of the calculated feature count.",
  },

  "gestational-weight-gain": {
    commonMistakes: [
      "Entering a BMI calculated from a weight taken during pregnancy rather than the pre-pregnancy weight, which shifts the patient into a higher category with a lower recommended gain.",
      "Comparing the calculator's pound-based totals, such as 25 to 35 lb for a normal pre-pregnancy BMI, against kilogram targets from another source without converting.",
      "Presenting the returned midpoint as the patient's personal weight-gain target, when it is only the middle of a recommended range that varies by category."
    ],
    formulaExplanation:
      "The calculator applies the Institute of Medicine (2009) recommended total gestational weight gain range based on the pre-pregnancy BMI category: underweight (below 18.5) 28-40 lb, normal (18.5-24.9) 25-35 lb, overweight (25-29.9) 15-25 lb, and obese (30 or higher) 11-20 lb, along with each category's second- and third-trimester weekly rate.",
    variables: [
      {
        inputId: "bmi",
        label: "Pre-Pregnancy BMI",
        explanation: "Pre-pregnancy body mass index in kg/m2, used to select the IOM total weight-gain range and weekly rate.",
      },
    ],
    faq: [
          {
        "question": "What BMI do I use?",
        "answer": "The pre-pregnancy BMI (weight and height measured before conception or at the first prenatal visit) determines the recommended weight-gain range."
      },
      {
        "question": "Do these ranges apply to twin pregnancy?",
        "answer": "No. IOM 2009 also provides separate recommendations for twin gestations; this calculator applies to singleton pregnancies."
      }

  ],
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
    evidence: {
      source: "Obstetrics / Nutrition",
      reference:
        "Institute of Medicine and National Research Council. Weight Gain During Pregnancy: Reexamining the Guidelines. The National Academies Press; 2009.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "IOM/NRC. Weight Gain During Pregnancy. National Academies Press; 2009.",
        "ACOG Committee Opinion No. 548: Weight gain during pregnancy. Obstet Gynecol. 2013;121(1):210-212.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Weight-gain recommendations should be individualized and integrated with nutrition counseling and clinical judgment.",
  },

  "magnesium-sulfate-preeclampsia": {
    commonMistakes: [
      "Treating the calculated 24-hour total as one large bolus instead of a loading dose followed by a continuous maintenance infusion.",
      "Keeping the 2 g/h maintenance rate in significant renal impairment without recognizing that the regimen requires adjustment and monitoring.",
      "Using the therapeutic serum range of 4.8-8.4 mg/dL as a dosing target and titrating the infusion to reach it rather than watching for toxicity."
    ],
    formulaExplanation:
      "Selected total 24-hour dose (g) = loading dose (g, given IV over 20-30 minutes) + maintenance rate (g/h) x 24 hours.",
    variables: [
      {
        inputId: "loadingDose",
        label: "IV Loading Dose",
        explanation: "Selected IV loading dose in grams (4, 5, or 6 g), added to the 24-hour maintenance total.",
      },
      {
        inputId: "maintenance",
        label: "Maintenance Infusion Rate",
        explanation: "Selected maintenance infusion rate in g/h (1 or 2 g/h), multiplied by 24 hours.",
      },
    ],
    faq: [
          {
        "question": "What serum level is therapeutic?",
        "answer": "Therapeutic serum magnesium is approximately 4.8–8.4 mg/dL (2–3.5 mEq/L). Levels above 10 mg/dL cause loss of deep tendon reflexes, and respiratory depression occurs near 12 mg/dL."
      },
      {
        "question": "How long is magnesium continued?",
        "answer": "Most protocols continue therapy for 24 hours after delivery (or 24 hours after the last seizure), after which it is discontinued if severe features have resolved."
      }

  ],
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
    evidence: {
      source: "ACOG Practice Bulletin and Original Descriptions",
      reference:
        "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260. Pritchard JA. Surg Gynecol Obstet. 1955;100(2):131-140. Zuspan FP. Clin Obstet Gynecol. 1966;9(4):954-972.",
      version: "2020",
      updatedAt: "2026-08",
      references: [
        "ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.",
        "Pritchard JA. Surg Gynecol Obstet. 1955;100(2):131-140.",
        "Zuspan FP. Clin Obstet Gynecol. 1966;9(4):954-972.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Magnesium sulfate therapy requires individualized dosing, monitoring for toxicity, and prompt treatment of adverse effects.",
  },

  "ebl-obstetric": {
    commonMistakes: [
      "Entering the wet and dry sponge weights in kilograms instead of grams, which makes the gravimetric blood loss far too small.",
      "Relying on the hematocrit method immediately after delivery, before the pre-delivery and post-delivery values have had time to diverge.",
      "Ruling out postpartum hemorrhage because the estimate is under 1000 mL when the patient already shows signs of hypovolemia."
    ],
    formulaExplanation:
      "Blood loss is estimated by one of two methods. Gravimetric: EBL (mL) = (wet weight - dry weight) in grams x 1 mL/g. Hematocrit-based: EBL = estimated blood volume x (pre-Hct - post-Hct) / pre-Hct, where blood volume is approximately 85 mL/kg.",
    variables: [
      {
        inputId: "method",
        label: "Estimation Method",
        explanation: "Selects the gravimetric (weighed materials) or hematocrit-based method; only the corresponding inputs are used.",
      },
      {
        inputId: "wetWeight",
        label: "Wet Weight (blood-soaked materials)",
        explanation: "Weight of blood-soaked sponges and drapes in grams, used in the gravimetric method.",
      },
      {
        inputId: "dryWeight",
        label: "Dry Weight (baseline materials)",
        explanation: "Baseline weight of dry materials in grams, subtracted from wet weight in the gravimetric method.",
      },
      {
        inputId: "weightKg",
        label: "Maternal Weight",
        explanation: "Maternal weight in kg, multiplied by approximately 85 mL/kg to estimate blood volume in the hematocrit method.",
      },
      {
        inputId: "preHct",
        label: "Pre-Delivery Hematocrit",
        explanation: "Pre-delivery hematocrit in percent, the denominator of the hematocrit method.",
      },
      {
        inputId: "postHct",
        label: "Post-Delivery Hematocrit",
        explanation: "Post-delivery hematocrit in percent, subtracted from the pre-delivery hematocrit.",
      },
    ],
    faq: [
          {
        "question": "Why use 85 mL/kg for blood volume?",
        "answer": "Maternal blood volume expands during pregnancy to approximately 85 mL/kg (range 70–100 mL/kg). Using the non-pregnant ~70 mL/kg underestimates total blood volume and can overestimate proportional loss."
      },
      {
        "question": "When is blood loss defined as postpartum hemorrhage?",
        "answer": "ACOG defines PPH as cumulative blood loss ≥ 1000 mL, or bleeding with signs/symptoms of hypovolemia, within 24 hours after delivery — regardless of delivery route."
      }

  ],
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
    evidence: {
      source: "ACOG Practice Bulletins",
      reference:
        "ACOG Committee Opinion No. 794: Quantitative blood loss in obstetric hemorrhage. Obstet Gynecol. 2019;134(6):e150-e156. ACOG Practice Bulletin No. 183: Postpartum hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.",
      version: "2019",
      updatedAt: "2026-08",
      references: [
        "ACOG Committee Opinion No. 794. Obstet Gynecol. 2019;134(6):e150-e156.",
        "ACOG Practice Bulletin No. 183. Obstet Gynecol. 2017;130(4):e168-e186.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Blood-loss estimates are imprecise; clinical signs of hypovolemia always take precedence in hemorrhage management.",
  },

  "epds": {
    commonMistakes: [
      "Treating a total of 10 or higher as a diagnosis of depression rather than a positive screen that still needs clinical assessment.",
      "Dismissing a positive answer on item 10 about self-harm because the overall total stays below the screen-positive cutoff.",
      "Applying the cutoff of 13 in every setting and failing to flag results that would be screen-positive at the widely used cutoff of 10."
    ],
    formulaExplanation:
      "The Edinburgh Postnatal Depression Scale sums ten scored items (item1 through item10), each scored 0-3. The total ranges 0-30, with higher scores indicating more depressive symptoms.",
    variables: [
      {
        inputId: "item1",
        label: "I have been able to laugh and see the funny side of things",
        explanation: "Question 1, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item2",
        label: "I have looked forward with enjoyment to things",
        explanation: "Question 2, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item3",
        label: "I have blamed myself unnecessarily when things went wrong",
        explanation: "Question 3, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item4",
        label: "I have been anxious or worried for no good reason",
        explanation: "Question 4, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item5",
        label: "I have felt scared or panicky for no very good reason",
        explanation: "Question 5, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item6",
        label: "Things have been getting on top of me",
        explanation: "Question 6, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item7",
        label: "I have been so unhappy that I have had difficulty sleeping",
        explanation: "Question 7, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item8",
        label: "I have felt sad or miserable",
        explanation: "Question 8, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item9",
        label: "I have been so unhappy that I have been crying",
        explanation: "Question 9, scored 0-3 based on the selected response.",
      },
      {
        inputId: "item10",
        label: "The thought of harming myself has occurred to me",
        explanation: "Question 10, scored 0-3 based on the selected response.",
      },
    ],
    faq: [
          {
        "question": "What score indicates possible depression?",
        "answer": "A total of 10 or higher is commonly used as the screen-positive cutoff; some settings use 13 or higher to increase specificity. Any score requires clinical judgment and follow-up."
      },
      {
        "question": "What if the answer to item 10 is positive?",
        "answer": "Item 10 asks about thoughts of self-harm. Any response other than 'Never' (score > 0) warrants immediate clinical assessment for safety."
      }

  ],
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
    evidence: {
      source: "Original Validation and ACOG Committee Opinion",
      reference:
        "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry. 1987;150:782-786. ACOG Committee Opinion No. 757: Screening for perinatal depression. Obstet Gynecol. 2018;132(5):e208-e212.",
      version: "1987",
      updatedAt: "2026-08",
      references: [
        "Cox JL, Holden JM, Sagovsky R. Br J Psychiatry. 1987;150:782-786.",
        "ACOG Committee Opinion No. 757. Obstet Gynecol. 2018;132(5):e208-e212.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The EPDS is a screening tool; a positive screen requires full clinical assessment, and any item-10 positive response requires immediate safety evaluation.",
  },

  "apgar-score": {
    commonMistakes: [
      "Waiting for the 1-minute score before starting resuscitation instead of responding to the newborn's breathing, pulse, and color.",
      "Stopping after the delivery-room score and omitting the 5-minute assessment even though the first score was below 7.",
      "Treating a low score in a preterm or sedated infant as proof of birth asphyxia when the score is only a snapshot of condition."
    ],
    formulaExplanation:
      "The Apgar score sums five components each scored 0-2: appearance (color), pulse (heart rate), grimace (reflex irritability), activity (muscle tone), and respiration (respiratory effort), for a total of 0-10.",
    variables: [
      {
        inputId: "appearance",
        label: "Appearance (Skin Color)",
        explanation: "Skin color, scored 0 (pale/blue), 1 (acrocyanotic), or 2 (completely pink).",
      },
      {
        inputId: "pulse",
        label: "Pulse (Heart Rate)",
        explanation: "Heart rate, scored 0 (absent), 1 (below 100 bpm), or 2 (100 bpm or above).",
      },
      {
        inputId: "grimace",
        label: "Grimace (Reflex Irritability)",
        explanation: "Reflex response to stimulation, scored 0 (no response), 1 (grimace), or 2 (cry or active withdrawal).",
      },
      {
        inputId: "activity",
        label: "Activity (Muscle Tone)",
        explanation: "Muscle tone, scored 0 (limp), 1 (some flexion), or 2 (active motion).",
      },
      {
        inputId: "respiration",
        label: "Respiration (Respiratory Effort)",
        explanation: "Respiratory effort, scored 0 (apneic), 1 (slow or irregular), or 2 (good, crying).",
      },
    ],
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
    faq: [
      {
        question:
          "What does an Apgar score mean?",
        answer:
          "7-10: reassuring. 4-6: moderate depression, may need stimulation. 0-3: severe depression, immediate resuscitation required. The score assesses heart rate, respiration, muscle tone, reflex irritability, and color.",
      },
      {
        question:
          "When is the Apgar score assessed?",
        answer:
          "At 1 minute and 5 minutes after birth. If the 5-minute score is less than 7, continue scoring every 5 minutes up to 20 minutes. The score reports the newborn condition and response to resuscitation.",
      },
      {
        question:
          "Can Apgar predict long-term outcomes?",
        answer:
          "No. Apgar is a snapshot of transition at birth. Low scores in preterm or sedated infants do not imply asphyxia. It should not be used to predict long-term neurologic outcomes.",
      },
    ],
    evidence: {
      source: "Obstetrics / Neonatology",
      reference:
        "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Apgar V. Curr Res Anesth Analg. 1953;32(4):260-267.",
        "AAP/ACOG Committee. The Apgar score. Pediatrics. 2015;136(4):819-822.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Apgar score is a reporting tool; resuscitation decisions should be guided by the newborn's respirations, heart rate, and color.",
  },

  "pediatric-gcs": {
    commonMistakes: [
      "Applying the age-appropriate verbal scale to an older child who can answer orientation questions, where the adult verbal scale applies.",
      "Expecting the scale to reach a total below 3, when each component scores at least 1 and 3 is the lowest possible score.",
      "Managing airway or referral decisions from the total alone without examining the pupils and brainstem, which the scale does not cover."
    ],
    formulaExplanation:
      "The pediatric Glasgow Coma Scale sums three components: eye opening (1-4), verbal response (1-5), and motor response (1-6), for a total of 3-15. Lower totals indicate greater impairment of consciousness.",
    variables: [
      {
        inputId: "eye",
        label: "Eye Opening",
        explanation: "Eye opening scored 1-4, with age-appropriate response options.",
      },
      {
        inputId: "verbal",
        label: "Verbal Response",
        explanation: "Verbal response scored 1-5, using age-specific descriptors.",
      },
      {
        inputId: "motor",
        label: "Motor Response",
        explanation: "Best motor response scored 1-6.",
      },
    ],
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
    evidence: {
      source: "Original Description and ACS ATLS",
      reference:
        "James HE, Trauner D. The Glasgow Coma Scale. In: Brain Insults in Infants and Children. Grune & Stratton; 1985:179-182. American College of Surgeons. ATLS Student Course Manual. 10th ed. ACS; 2018.",
      version: "1985",
      updatedAt: "2026-08",
      references: [
        "James HE, Trauner D. Brain Insults in Infants and Children. Grune & Stratton; 1985:179-182.",
        "American College of Surgeons. ATLS Student Course Manual. 10th ed. ACS; 2018.",
      ],
    },
    faq: [
      {
        question:
          "How is pediatric GCS different from adult GCS?",
        answer:
          "Only the verbal component differs for pre-verbal children. Eye and motor components are the same. The pediatric verbal scale uses age-appropriate responses (e.g., crying, consolable, irritable, coos, oriented).",
      },
      {
        question:
          "At what age does adult GCS apply?",
        answer:
          "Adult GCS applies when the child can reliably orient to person, place, and time. Typically this is around age 2-3, though it depends on developmental milestones.",
      },
      {
        question:
          "What does a pediatric GCS of 8 or less mean?",
        answer:
          "A GCS of 8 or less indicates severe impairment (coma) and warrants consideration of airway protection, urgent neuroimaging, and neurosurgical or ICU referral.",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Neurologic assessment requires serial evaluation by trained clinicians, and clinical decisions should not rest on a single score.",
  },

  "pediatric-trauma-score": {
    commonMistakes: [
      "Treating an unremarkable weight, airway, or blood pressure finding as worth no points, when a normal component contributes +2.",
      "Assuming a higher total means worse injury, when mortality risk rises as the score falls below 8 and toward -6.",
      "Using the score to triage an adult patient, since the weight and blood pressure bands were designed for children."
    ],
    formulaExplanation:
      "The pediatric trauma score sums six components: weight, airway, systolic blood pressure, central nervous system status, open wound, and skeletal injury, each scored from -1 to +2, for a total of -6 to +12. Lower scores indicate more severe injury.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight, scored +2 (over 20 kg), +1 (10-20 kg), or -1 (under 10 kg).",
      },
      {
        inputId: "airway",
        label: "Airway",
        explanation: "Airway patency, scored +2 (normal), +1 (maintainable), or -1 (unmaintainable).",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure, scored +2 (over 90 mmHg), +1 (50-90 mmHg), or -1 (under 50 mmHg).",
      },
      {
        inputId: "cns",
        label: "Central Nervous System",
        explanation: "Level of consciousness, scored +2 (awake), +1 (obtunded), or -1 (comatose).",
      },
      {
        inputId: "openWound",
        label: "Open Wound",
        explanation: "Open wound, scored +2 (none), +1 (minor), or -1 (major or penetrating).",
      },
      {
        inputId: "skeletal",
        label: "Skeletal Injury",
        explanation: "Skeletal injury, scored +2 (none), +1 (closed fracture), or -1 (open or multiple fractures).",
      },
    ],
    faq: [
          {
        "question": "What PTS threshold indicates the need for a trauma center?",
        "answer": "A Pediatric Trauma Score below 8 is the standard threshold associated with a clinically significant risk of mortality and warrants transfer to a pediatric trauma center."
      },
      {
        "question": "Why does the PTS use −1 for small children?",
        "answer": "Infants and small children (< 10 kg) have less physiologic reserve and are more vulnerable to the same injuries, so the weighting accounts for their higher risk."
      }

  ],
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
    evidence: {
      source: "Original Description and ACS Guideline",
      reference:
        "Tepas JJ 3rd, et al. The Pediatric Trauma Score as a predictor of injury severity in the injured child. J Pediatr Surg. 1987;22(1):14-18. American College of Surgeons. Resources for Optimal Care of the Injured Patient. ACS; 2022.",
      version: "1987",
      updatedAt: "2026-08",
      references: [
        "Tepas JJ 3rd, et al. J Pediatr Surg. 1987;22(1):14-18.",
        "American College of Surgeons. Resources for Optimal Care of the Injured Patient. ACS; 2022.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Trauma triage requires continuous reassessment, and clinical judgment should always override any score-based triage recommendation.",
  },

  "westley-croup-score": {
    commonMistakes: [
      "Scoring stridor as present at rest when it only appeared while the child was agitated, which inflates the total.",
      "Calling a total of 7 severe croup when severe disease begins at 8, with 3 to 7 representing moderate disease.",
      "Using the scale in suspected epiglottitis or foreign body, where the clinical course and required management are different."
    ],
    formulaExplanation:
      "The Westley croup score sums five components: level of consciousness (0-5), cyanosis (0-5), stridor (0-2), air entry (0-2), and retractions (0-2), for a total of 0-17. Higher scores indicate more severe croup.",
    variables: [
      {
        inputId: "consciousness",
        label: "Level of Consciousness",
        explanation: "Consciousness, scored 0 (normal), up to 5 (reduced level).",
      },
      {
        inputId: "cyanosis",
        label: "Cyanosis",
        explanation: "Cyanosis, scored 0 (none), 4 (with agitation), or 5 (at rest).",
      },
      {
        inputId: "stridor",
        label: "Stridor",
        explanation: "Stridor, scored 0 (none), 1 (with agitation), or 2 (at rest).",
      },
      {
        inputId: "airEntry",
        label: "Air Entry",
        explanation: "Air entry, scored 0 (normal), 1 (decreased), or 2 (markedly decreased).",
      },
      {
        inputId: "retractions",
        label: "Retractions",
        explanation: "Chest wall retractions, scored 0 (none), 1 (mild), or 2 (moderate to severe).",
      },
    ],
    faq: [
          {
        "question": "When is nebulized epinephrine indicated?",
        "answer": "Nebulized epinephrine is indicated for stridor at rest (moderate-to-severe croup). A single dose of dexamethasone should be given to essentially all children with croup."
      },
      {
        "question": "How high does the score need to be before admission?",
        "answer": "Persistent stridor at rest, hypoxemia, or a score in the moderate-to-severe range (3 or higher with concerning features, ≥ 8 for severe) generally warrant admission for observation and treatment."
      }

  ],
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
    evidence: {
      source: "Original Description and Lancet Review",
      reference:
        "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487. Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-339.",
      version: "1978",
      updatedAt: "2026-08",
      references: [
        "Westley CR, et al. Am J Dis Child. 1978;132(5):484-487.",
        "Bjornson CL, Johnson DW. Lancet. 2008;371(9609):329-339.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. A child who is drowsy or cyanotic at rest has critical obstruction regardless of the score; continuous airway reassessment is mandatory.",
  },

  "pecarn-head-trauma": {
    commonMistakes: [
      "Combining predictors from both age groups, such as counting vomiting in a child under 2 years instead of using only that age set.",
      "Applying the rule to an infant under 3 months with a scalp hematoma, who generally needs CT regardless of which predictors are present.",
      "Sending a child home with no observation or return precautions because the calculated risk of injury is very low."
    ],
    formulaExplanation:
      "The PECARN algorithm stratifies children under 2 years and 2 years and older using age-specific predictors. A computed tomography scan is recommended if any high-risk predictor is present, or if one or more intermediate-risk predictors are present together with significant mechanism or clinician judgment. Only the age-appropriate predictors are used.",
    variables: [
      {
        inputId: "ageGroup",
        label: "Age Group",
        explanation: "Selects the under-2 or 2-years-and-older predictor set.",
      },
      {
        inputId: "u2AlteredMentation",
        label: "Altered Mental Status (under 2)",
        explanation: "High-risk predictor for children under 2.",
      },
      {
        inputId: "u2PalpableSkullFracture",
        label: "Palpable Skull Fracture (under 2)",
        explanation: "High-risk predictor for children under 2.",
      },
      {
        inputId: "u2ScalpHematoma",
        label: "Non-frontal Scalp Hematoma (under 2)",
        explanation: "Intermediate-risk predictor for children under 2.",
      },
      {
        inputId: "u2Loc5Seconds",
        label: "Loss of Consciousness >= 5 s (under 2)",
        explanation: "Intermediate-risk predictor for children under 2.",
      },
      {
        inputId: "u2NotActingNormal",
        label: "Not Acting Normally per Parent (under 2)",
        explanation: "Intermediate-risk predictor for children under 2.",
      },
      {
        inputId: "p2AlteredMentation",
        label: "Altered Mental Status (2 and older)",
        explanation: "High-risk predictor for children 2 years and older.",
      },
      {
        inputId: "p2BasilarSkullFracture",
        label: "Basilar Skull Fracture Signs (2 and older)",
        explanation: "High-risk predictor for children 2 years and older.",
      },
      {
        inputId: "p2Vomiting",
        label: "Vomiting (2 and older)",
        explanation: "Intermediate-risk predictor for children 2 years and older.",
      },
      {
        inputId: "p2SevereHeadache",
        label: "Severe Headache (2 and older)",
        explanation: "Intermediate-risk predictor for children 2 years and older.",
      },
      {
        inputId: "p2LossOfConsciousness",
        label: "Loss of Consciousness (2 and older)",
        explanation: "Intermediate-risk predictor for children 2 years and older.",
      },
      {
        inputId: "dangerousMechanism",
        label: "Dangerous Mechanism",
        explanation: "Mechanism of injury judged dangerous, applied with intermediate-risk predictors.",
      },
    ],
    faq: [
          {
        "question": "What is 'clinically important' TBI in the PECARN rule?",
        "answer": "Death, the need for neurosurgery, intubation for more than 24 hours, or traumatic brain injury with a hospital stay of 2 or more nights."
      },
      {
        "question": "When is a CT definitely needed?",
        "answer": "In general, CT is recommended for children with two or more PECARN predictors, any high-risk predictor with substantial clinical concern, or deterioration during observation. Children under 3 months with any scalp hematoma are also generally scanned."
      }

  ],
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
    evidence: {
      source: "PECARN Derivation/Validation and Ann Emerg Med Validation",
      reference:
        "Kuppermann N, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170. Schonfeld D, et al. Ann Emerg Med. 2013;62(6):597-603.",
      version: "2009",
      updatedAt: "2026-08",
      references: [
        "Kuppermann N, et al. Lancet. 2009;374(9696):1160-1170.",
        "Schonfeld D, et al. Ann Emerg Med. 2013;62(6):597-603.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The PECARN rule supports, but does not replace, clinical judgment; any child with clinical deterioration warrants CT regardless of the calculated risk.",
  },

  "rochester-criteria": {
    commonMistakes: [
      "Counting 6 of 7 criteria as low risk when failure of any single criterion means the infant is not low risk.",
      "Accepting exactly 10 white cells per high-power field on urinalysis when the criterion requires fewer than 10.",
      "Applying the criteria to an infant older than 60 days, who falls outside the age range the tool was designed for."
    ],
    formulaExplanation:
      "The Rochester criteria identify febrile infants at low risk of serious bacterial infection. An infant is low risk when all criteria are met: age 60 days or older (or, if younger, term gestation and previously healthy), well-appearing and nontoxic, no focal bacterial infection, and reassuring laboratory values (peripheral WBC below 15 x10^3/microL, urinalysis with fewer than 10 WBC/hpf, and either no diarrhea or stool with fewer than 5 WBC/hpf).",
    variables: [
      {
        inputId: "ageDays",
        label: "Age (days)",
        explanation: "Age in days, used with gestation and health status to determine age eligibility.",
      },
      {
        inputId: "termGestation",
        label: "Term Gestation",
        explanation: "Whether the infant was born at term, required if younger than 60 days.",
      },
      {
        inputId: "previouslyHealthy",
        label: "Previously Healthy",
        explanation: "Whether the infant was previously healthy, required if younger than 60 days.",
      },
      {
        inputId: "nontoxic",
        label: "Nontoxic / Well-Appearing",
        explanation: "Well appearance without toxicity; Yes satisfies a core criterion.",
      },
      {
        inputId: "focalInfection",
        label: "Focal Infection Present",
        explanation: "Presence of a focal bacterial infection; Yes disqualifies low-risk status.",
      },
      {
        inputId: "wbc",
        label: "Peripheral WBC",
        explanation: "Peripheral white blood cell count in x10^3/microL; must be below 15.",
      },
      {
        inputId: "urinalysisWbc",
        label: "Urinalysis WBC",
        explanation: "Urine white blood cells per high-power field; must be fewer than 10.",
      },
      {
        inputId: "diarrhea",
        label: "Diarrhea",
        explanation: "Presence of diarrhea; if Yes, stool WBC is assessed.",
      },
      {
        inputId: "stoolWbc",
        label: "Stool WBC",
        explanation: "Stool white blood cells per high-power field; must be fewer than 5 when diarrhea is present.",
      },
    ],
    faq: [
          {
        "question": "What temperature counts as a fever in a young infant?",
        "answer": "A rectal temperature of 38.0 °C (100.4 °F) or higher. Axillary and tympanic readings are less reliable in young infants and should be confirmed rectally."
      },
      {
        "question": "Can a 'low-risk' infant be sent home without tests?",
        "answer": "No. Blood and urine cultures should be obtained before outpatient management is considered, and the infant needs close follow-up within 24 hours and clear return precautions."
      }

  ],
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
    evidence: {
      source: "Original Description and AAP Guideline",
      reference:
        "Jaskiewicz JA, et al. Febrile infants at low risk for serious bacterial infection — an appraisal of the Rochester criteria and implications for management. Pediatrics. 1994;94(3):390-396. Dagan R, et al. J Pediatr. 1985;107(6):855-860. Pantell RH, et al. Pediatrics. 2021;148(2):e2021052228.",
      version: "1994",
      updatedAt: "2026-08",
      references: [
        "Jaskiewicz JA, et al. Pediatrics. 1994;94(3):390-396.",
        "Dagan R, et al. J Pediatr. 1985;107(6):855-860.",
        "Pantell RH, et al. Pediatrics. 2021;148(2):e2021052228.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Febrile infant management must follow current institutional and AAP guidelines; cultures and reassessment are essential regardless of the calculated risk.",
  },

  "gorelick-dehydration": {
    commonMistakes: [
      "Counting a capillary refill of exactly 2 seconds as positive when the item requires a refill time greater than 2 seconds.",
      "Reading a score of 3 or 4 as a precise percentage of fluid loss when the scale only separates below from above 5%.",
      "Making the oral versus intravenous decision from the score alone, without any weight comparison or reassessment."
    ],
    formulaExplanation:
      "The Gorelick dehydration score counts four clinical signs: capillary refill greater than 2 seconds, dry mucous membranes, absent tears, and ill or toxic appearance. A score of 3 or more suggests dehydration of 5% or greater (roughly 10% for 3-4 signs).",
    variables: [
      {
        inputId: "capillaryRefill",
        label: "Capillary refill > 2 seconds",
        explanation: "Prolonged capillary refill; present contributes one point.",
      },
      {
        inputId: "dryMucousMembranes",
        label: "Dry mucous membranes",
        explanation: "Dry mucous membranes; present contributes one point.",
      },
      {
        inputId: "absentTears",
        label: "Absent tears",
        explanation: "Absence of tears; present contributes one point.",
      },
      {
        inputId: "illAppearance",
        label: "Ill/toxic appearance",
        explanation: "Ill or toxic general appearance; present contributes one point.",
      },
    ],
    faq: [
          {
        "question": "How many positive signs mean significant dehydration?",
        "answer": "Three or more of the four signs (prolonged capillary refill, dry mucous membranes, absent tears, ill appearance) predict ≥ 5% dehydration, which usually warrants intravenous rehydration."
      },
      {
        "question": "Can a child with 2 signs still be dehydrated?",
        "answer": "Yes — the scale is a screening tool, not a perfect test. Weigh the child, track urine output, and combine the score with clinical judgment."
      }

  ],
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
    evidence: {
      source: "Original Description and WHO Guideline",
      reference:
        "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6. World Health Organization. The Treatment of Diarrhoea: A Manual for Physicians and Other Senior Health Workers. 4th rev. WHO; 2005.",
      version: "1997",
      updatedAt: "2026-08",
      references: [
        "Gorelick MH, et al. Pediatrics. 1997;99(5):E6.",
        "World Health Organization. The Treatment of Diarrhoea. 4th rev. WHO; 2005.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Combine the score with weight change, urine output, and clinical judgment; never delay resuscitation of a shocked child to complete scoring.",
  },

  "pediatric-hypotension": {
    commonMistakes: [
      "Choosing the 1-12 month bracket for a newborn under 1 month, where hypotension means a systolic below 60 mmHg rather than 70.",
      "Concluding that shock is absent because the systolic pressure meets the threshold, when compensated shock keeps blood pressure normal.",
      "Using these resuscitation cutoffs to screen a child for chronic hypertension, a purpose the 5th-percentile thresholds were not meant for."
    ],
    formulaExplanation:
      "Hypotension thresholds follow PALS: for term neonates (0-28 days) systolic BP below 60 mmHg; infants (1-12 months) below 70 mmHg; children 1-10 years below 70 + (2 x age) mmHg; and children over 10 years below 90 mmHg. The calculator compares the entered systolic pressure to the age-appropriate threshold.",
    variables: [
      {
        inputId: "ageGroup",
        label: "Age Group",
        explanation: "Selects neonate, infant, child, or adolescent threshold logic.",
      },
      {
        inputId: "ageYears",
        label: "Age (years)",
        explanation: "Age in years, used in the 1-10 year threshold of 70 + (2 x age).",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Measured systolic blood pressure in mmHg, compared to the threshold.",
      },
    ],
    faq: [
          {
        "question": "What is the hypotension threshold for a 4-year-old?",
        "answer": "70 + (2 × 4) = 78 mmHg. A systolic blood pressure below 78 mmHg in a 4-year-old is defined as hypotension by the PALS criteria."
      },
      {
        "question": "Is a normal blood pressure enough to rule out shock?",
        "answer": "No. Blood pressure is a late sign of shock; a child in compensated shock may have a normal blood pressure but abnormal perfusion, so assess capillary refill, pulses, urine output, and mental status as well."
      }

  ],
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
    evidence: {
      source: "AHA PALS Guidelines",
      reference:
        "American Heart Association. Pediatric Advanced Life Support Provider Manual. AHA; 2020. Kleinman ME, et al. Pediatric advanced life support: 2010 American Heart Association guidelines for cardiopulmonary resuscitation and emergency cardiovascular care. Pediatrics. 2010;126(5):e1361-e1399.",
      version: "2020",
      updatedAt: "2026-08",
      references: [
        "American Heart Association. PALS Provider Manual. AHA; 2020.",
        "Kleinman ME, et al. Pediatrics. 2010;126(5):e1361-e1399.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. A normal blood pressure does not exclude shock; always assess perfusion, mental status, and urine output alongside blood pressure.",
  },

  "peds-pews": {
    commonMistakes: [
      "Focusing only on a total of 4 and overlooking a score of 3 in a single domain, which itself triggers urgent medical review.",
      "Awarding 2 points for persistent parent or staff concern, which can add at most 1 point to the total.",
      "Judging tachycardia or tachypnea against adult reference values instead of age-specific ranges, which distorts the scoring."
    ],
    formulaExplanation:
      "The Pediatric Early Warning Score assigns 0-3 points to each of three clinical domains (behavior, cardiovascular, and respiratory) plus additional points for staff concern, and sums them. Higher totals indicate greater risk of clinical deterioration.",
    variables: [
      {
        inputId: "behavior",
        label: "Behavior",
        explanation: "Behavior from sleeping to unresponsive, scored 0-3.",
      },
      {
        inputId: "cardiovascular",
        label: "Cardiovascular",
        explanation: "Cardiovascular assessment, scored 0-3.",
      },
      {
        inputId: "respiratory",
        label: "Respiratory",
        explanation: "Respiratory assessment, scored 0-3.",
      },
      {
        inputId: "concern",
        label: "Staff / Family Concern",
        explanation: "Degree of staff or family concern; present adds points to the total.",
      },
    ],
    faq: [
          {
        "question": "When should I escalate with the PEWS?",
        "answer": "A score of 3–4 warrants increased observation frequency and informing senior staff; a score of 5 or higher warrants urgent medical review. A score of 3 in any single domain should also prompt immediate senior involvement."
      },
      {
        "question": "Does a low PEWS mean the child is safe?",
        "answer": "No. PEWS is a monitoring adjunct; a child who appears unwell to an experienced clinician should be escalated regardless of the score."
      }

  ],
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
    evidence: {
      source: "Original Description and BMJ Systematic Review",
      reference:
        "Monaghan A. Detecting and managing deterioration in children. Paediatr Nurs. 2005;17(1):32-35. Lambert V, et al. Paediatric early warning systems for detecting and responding to clinical deterioration in children: a systematic review. BMJ Open. 2017;7(3):e014497.",
      version: "2005",
      updatedAt: "2026-08",
      references: [
        "Monaghan A. Paediatr Nurs. 2005;17(1):32-35.",
        "Lambert V, et al. BMJ Open. 2017;7(3):e014497.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. PEWS complements, but does not replace, clinical assessment; escalate any child who looks unwell regardless of the score.",
  },

  "nihss": {
    commonMistakes: [
      "Scoring only one arm and one leg, so the motor items never reach the 16 points available from all four limbs.",
      "Reporting the total as a measure of disability when the modified Rankin Scale is the instrument meant for functional outcome.",
      "Assuming a modest total excludes posterior circulation stroke, which this scale is known to underweight."
    ],
    formulaExplanation:
      "The NIH Stroke Scale sums fifteen items: level of consciousness, two consciousness questions, consciousness commands, gaze, visual fields, facial palsy, left and right arm motor, left and right leg motor, limb ataxia, sensory, language, dysarthria, and extinction/inattention. Item scores are summed for a total of 0-42, with higher scores indicating more severe stroke.",
    variables: [
      {
        inputId: "loc",
        label: "1a. Level of Consciousness",
        explanation: "Level of consciousness, scored 0-3.",
      },
      {
        inputId: "locQuestions",
        label: "1b. LOC Questions",
        explanation: "Answers to month and age, scored 0-2.",
      },
      {
        inputId: "locCommands",
        label: "1c. LOC Commands",
        explanation: "Ability to follow open/close eyes and grip commands, scored 0-2.",
      },
      {
        inputId: "gaze",
        label: "2. Best Gaze",
        explanation: "Horizontal eye movement, scored 0-2.",
      },
      {
        inputId: "visual",
        label: "3. Visual Fields",
        explanation: "Visual field testing, scored 0-3.",
      },
      {
        inputId: "facial",
        label: "4. Facial Palsy",
        explanation: "Facial movement, scored 0-3.",
      },
      {
        inputId: "armLeft",
        label: "5a. Left Arm Motor",
        explanation: "Left arm motor drift, scored 0-4.",
      },
      {
        inputId: "armRight",
        label: "5b. Right Arm Motor",
        explanation: "Right arm motor drift, scored 0-4.",
      },
      {
        inputId: "legLeft",
        label: "6a. Left Leg Motor",
        explanation: "Left leg motor drift, scored 0-4.",
      },
      {
        inputId: "legRight",
        label: "6b. Right Leg Motor",
        explanation: "Right leg motor drift, scored 0-4.",
      },
      {
        inputId: "ataxia",
        label: "7. Limb Ataxia",
        explanation: "Limb ataxia, scored 0-2.",
      },
      {
        inputId: "sensory",
        label: "8. Sensory",
        explanation: "Sensory response to pinprick, scored 0-2.",
      },
      {
        inputId: "language",
        label: "9. Best Language",
        explanation: "Language and naming, scored 0-3.",
      },
      {
        inputId: "dysarthria",
        label: "10. Dysarthria",
        explanation: "Speech articulation, scored 0-2.",
      },
      {
        inputId: "extinction",
        label: "11. Extinction / Inattention",
        explanation: "Neglect or extinction, scored 0-2.",
      },
    ],
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
        "A 70-year-old man presents 90 minutes after sudden left-sided weakness and word-finding difficulty. Examination shows he is drowsy but arousable (1a = 1), answers one of two questions (1b = 1), performs one of two commands (1c = 1), mild left gaze palsy (2 = 1), partial visual field loss (3 = 1), facial droop (4 = 1), left arm 2 (drifts to bed), left leg 2, right side normal, no ataxia, mild sensory loss (8 = 1), moderate aphasia (9 = 1), mild dysarthria (10 = 1), mild inattention (11 = 1).",
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
        "Lyden PD, et al. Stroke. 1994;25:2446-2451.",
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
    commonMistakes: [
      "Giving 1 point for unilateral weakness, when weakness scores 2 points and speech disturbance without weakness scores 1.",
      "Using the score to decide whether the symptoms represent a TIA, even though the diagnosis is assumed before scoring.",
      "Quoting the risk percentages as long-term figures when they describe stroke risk only in the 2 days after the event."
    ],
    clinicalPurpose:
      "Stratifies the short-term (2-day) risk of stroke after a transient ischemic attack using age, blood pressure, clinical features, duration of symptoms, and diabetes, giving a total of 0–7.",
    formulaExplanation:
      "The ABCD² score assigns points for age, blood pressure, clinical features, duration of symptoms, and diabetes to produce a total score (0–7) that estimates 2-day stroke risk after TIA.",
    variables: [
      {inputId:"age", label:"Age", explanation:"Age =60 years contributes points to stroke risk after TIA."},
      {inputId:"bloodPressure", label:"Blood pressure", explanation:"Elevated blood pressure contributes points to the ABCD² score."},
      {inputId:"clinicalFeatures", label:"Clinical features", explanation:"Specific TIA symptoms contribute points based on their severity/nature."},
      {inputId:"duration", label:"Duration", explanation:"Duration of TIA symptoms contributes points."},
      {inputId:"diabetes", label:"Diabetes", explanation:"Presence of diabetes contributes points to the score."}
    ],
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
        "Johnston SC, et al. Lancet. 2007;369:208-213.",
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
    commonMistakes: [
      "Using the assigned grade to decide whether imaging is needed for suspected hemorrhage, a decision the Ottawa SAH Rule addresses.",
      "Quoting the 70-77% mortality for grade V as the expected rate under modern endovascular care, when those figures are historical.",
      "Grading a patient with severe headache, nuchal rigidity, and no deficit as III when that presentation is grade II."
    ],
    formulaExplanation:
      "The Hunt and Hess scale classifies the clinical severity of subarachnoid hemorrhage using the selected grade from 1 to 5, based on headache, meningismus, level of consciousness, and focal neurologic deficit. Higher grades predict greater mortality.",
    variables: [
      {
        inputId: "grade",
        label: "Hunt and Hess Grade",
        explanation: "Selected grade: 1 (asymptomatic or mild headache), 2 (moderate to severe headache, nuchal rigidity, no deficit), 3 (drowsiness, confusion, mild focal deficit), 4 (stupor, moderate to severe hemiparesis), or 5 (coma, decerebrate posturing).",
      },
    ],
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
        "Hunt WE, Kosnik EJ. J Neurosurg. 1974;41:149-154.",
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
    commonMistakes: [
      "Averaging mRS grades across a group of patients, since the scale is ordinal and equal spacing between levels cannot be assumed.",
      "Using the scale to quantify acute neurologic deficit when the NIHSS is the appropriate instrument for that purpose.",
      "Recording a grade of 2 for a patient who needs some help but walks unassisted, which is how grade 3 is defined."
    ],
    formulaExplanation:
      "The modified Rankin Scale is a single ordinal grade selected from 0 to 6 describing global functional disability after stroke; it is not an arithmetic sum. Grade 0 means no symptoms, grades 1-2 are favorable outcomes, grades 3-5 represent increasing dependency, and grade 6 denotes death.",
    variables: [
      {
        inputId: "score",
        label: "Functional Disability Level",
        explanation: "The single mRS grade (0-6) selected from the standard descriptions of independence, disability, and death.",
      },
    ],
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
        "van Swieten JC, et al. Neurology. 1988;38:1021-1024.",
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
    commonMistakes: [
      "Applying the rule when symptoms reached maximum intensity over more than 1 hour, beyond the onset window used in validation.",
      "Believing that more findings mean a higher urgency category, when a single positive criterion already makes CT indicated.",
      "Using the rule in a patient with a traumatic headache or focal deficit, presentations excluded from its validation."
    ],
    formulaExplanation:
      "The Ottawa SAH Rule counts the presence of six high-risk findings. A result of 0 of 6 is negative (CT not required to rule out subarachnoid hemorrhage); any single criterion present makes the rule positive and CT is indicated.",
    variables: [
      {
        inputId: "age40",
        label: "Age >= 40 years",
        explanation: "Age 40 years or older; Yes counts as one high-risk criterion.",
      },
      {
        inputId: "neckPainStiffness",
        label: "Neck Pain or Stiffness",
        explanation: "Neck pain or stiffness; Yes counts as one criterion.",
      },
      {
        inputId: "witnessedLoc",
        label: "Witnessed Loss of Consciousness",
        explanation: "Loss of consciousness witnessed by another person; Yes counts as one criterion.",
      },
      {
        inputId: "exertionOnset",
        label: "Headache Onset During Exertion",
        explanation: "Headache that began during exertion; Yes counts as one criterion.",
      },
      {
        inputId: "thunderclap",
        label: "Thunderclap Headache (instantly peaking pain)",
        explanation: "Abrupt, instantly peaking headache; Yes counts as one criterion.",
      },
      {
        inputId: "limitedNeckFlexion",
        label: "Limited Neck Flexion on Examination",
        explanation: "Restricted neck flexion on examination; Yes counts as one criterion.",
      },
    ],
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
        "Perry JJ, et al. JAMA. 2013;310:1828-1836.",
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
    commonMistakes: [
      "Reading a higher total as a worse prognosis when lower scores, not higher ones, signal deeper coma and higher mortality.",
      "Giving motor credit for obeying any command as in the GCS, when a score of 4 needs a thumbs-up, fist, or peace sign.",
      "Interpreting a drop in the total as neurologic deterioration without first accounting for sedation or neuromuscular blockade."
    ],
    formulaExplanation:
      "The FOUR score sums four components each scored 0-4: eye response, motor response, brainstem reflexes, and respiration, for a total of 0-16. Lower totals indicate deeper coma and higher in-hospital mortality.",
    variables: [
      {
        inputId: "eye",
        label: "E - Eye Response",
        explanation: "Eye response scored 0-4, from eyelids remaining closed with pain (0) to eyelids open and tracking to command (4).",
      },
      {
        inputId: "motor",
        label: "M - Motor Response",
        explanation: "Motor response scored 0-4, from no response (0) to following commands with a thumbs-up, fist, or peace sign (4).",
      },
      {
        inputId: "brainstem",
        label: "B - Brainstem Reflexes",
        explanation: "Brainstem reflexes scored 0-4, from absent pupil, corneal, and cough reflexes (0) to intact pupil and corneal reflexes (4).",
      },
      {
        inputId: "respiration",
        label: "R - Respiration",
        explanation: "Respiratory pattern scored 0-4, from breathing at the ventilator rate or apnea (0) to regular breathing when not intubated (4).",
      },
    ],
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
        "Wijdicks EFM, et al. Pract Neurol. 2010;10:86-88.",
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
    commonMistakes: [
      "Scoring the arm and leg motor items from the unaffected limb rather than the left side specified in the calculator, which lowers the motor subscores.",
      "Using a RACE total below 5 to reassure against a posterior circulation stroke, which may score low despite a large vessel occlusion.",
      "Awarding 2 points for aphasia or agnosia when the patient performs one of the two tasks correctly, which overstates the score."
    ],
    formulaExplanation:
      "The RACE scale sums five prehospital items: facial palsy (0-2), arm motor (0-2), leg motor (0-2), gaze deviation (0-1), and aphasia/agnosia (0-2), for a total of 0-9. A score of 5 or more suggests a large vessel occlusion.",
    variables: [
      {
        inputId: "facialPalsy",
        label: "Facial Palsy",
        explanation: "Facial weakness, scored 0 (absent), 1 (mild), or 2 (moderate to severe).",
      },
      {
        inputId: "armMotor",
        label: "Arm Motor (left side)",
        explanation: "Left arm strength, scored 0 (normal), 1 (mild weakness), or 2 (moderate to severe weakness).",
      },
      {
        inputId: "legMotor",
        label: "Leg Motor (left side)",
        explanation: "Left leg strength, scored 0 (normal), 1 (mild weakness), or 2 (moderate to severe weakness).",
      },
      {
        inputId: "gaze",
        label: "Gaze Deviation",
        explanation: "Conjugate gaze deviation, scored 0 (normal) or 1 (deviation to the right or left).",
      },
      {
        inputId: "aphasiaAgnosia",
        label: "Aphasia or Agnosia",
        explanation: "Ability to name an object and identify the own arm, scored 0 (both tasks), 1 (one task), or 2 (neither task).",
      },
    ],
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
        "Carrera D, et al. Stroke. 2019;50:1819-1824.",
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
    commonMistakes: [
      "Counting a prior myocardial infarction under both the prior MI item and the other cardiovascular disease item, which double-counts one condition.",
      "Including atrial fibrillation in the other cardiovascular disease item, even though the score explicitly excludes it.",
      "Giving 2 age points to a patient who is exactly 75 years old, when 2 points require being over 75 years."
    ],
    formulaExplanation:
      "The Essen Stroke Risk Score adds an age score (0 under 65, 1 for 65-75, 2 over 75) to one point each for hypertension, diabetes, prior myocardial infarction, other cardiovascular disease, peripheral arterial disease, current smoking, and prior ischemic stroke or TIA, for a total of 0-9.",
    variables: [
      {
        inputId: "ageGroup",
        label: "Age",
        explanation: "Age category scored 0 (under 65 years), 1 (65-75 years), or 2 (over 75 years).",
      },
      {
        inputId: "hypertension",
        label: "Hypertension",
        explanation: "History of hypertension; Yes adds one point.",
      },
      {
        inputId: "diabetes",
        label: "Diabetes Mellitus",
        explanation: "History of diabetes; Yes adds one point.",
      },
      {
        inputId: "priorMi",
        label: "Prior Myocardial Infarction",
        explanation: "Previous myocardial infarction; Yes adds one point.",
      },
      {
        inputId: "otherCvd",
        label: "Other Cardiovascular Disease",
        explanation: "Other cardiovascular disease excluding MI and atrial fibrillation; Yes adds one point.",
      },
      {
        inputId: "pad",
        label: "Peripheral Arterial Disease",
        explanation: "Peripheral arterial disease; Yes adds one point.",
      },
      {
        inputId: "smoking",
        label: "Current Smoker",
        explanation: "Current cigarette smoking; Yes adds one point.",
      },
      {
        inputId: "priorTiaStroke",
        label: "Prior Ischemic Stroke or TIA",
        explanation: "Previous ischemic stroke or transient ischemic attack; Yes adds one point.",
      },
    ],
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
        "Weimar C, et al. Stroke. 2009;40:2532-2536.",
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
    commonMistakes: [
      "Scoring each symptom over the past two days rather than the past two weeks specified for the PHQ-9, which invalidates the total.",
      "Dismissing an endorsed item 9 because the total is below 10, when any endorsement of suicidal ideation requires urgent evaluation.",
      "Presenting the total as a diagnosis of major depressive disorder rather than a probable-depression screen needing clinical confirmation."
    ],
    formulaExplanation:
      "The PHQ-9 sums nine DSM-based items (phq1 through phq9), each scored 0-3 for the frequency of symptoms over the past two weeks, for a total of 0-27. The total is graded as minimal (0-4), mild (5-9), moderate (10-14), moderately severe (15-19), or severe (20-27); item 9 separately screens for suicidal ideation.",
    variables: [
      {
        inputId: "phq1",
        label: "Little interest or pleasure in doing things",
        explanation: "Item 1, scored 0 (not at all) to 3 (nearly every day).",
      },
      {
        inputId: "phq2",
        label: "Feeling down, depressed, or hopeless",
        explanation: "Item 2, scored 0-3.",
      },
      {
        inputId: "phq3",
        label: "Trouble falling or staying asleep, or sleeping too much",
        explanation: "Item 3, scored 0-3.",
      },
      {
        inputId: "phq4",
        label: "Feeling tired or having little energy",
        explanation: "Item 4, scored 0-3.",
      },
      {
        inputId: "phq5",
        label: "Poor appetite or overeating",
        explanation: "Item 5, scored 0-3.",
      },
      {
        inputId: "phq6",
        label: "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
        explanation: "Item 6, scored 0-3.",
      },
      {
        inputId: "phq7",
        label: "Trouble concentrating on things",
        explanation: "Item 7, scored 0-3.",
      },
      {
        inputId: "phq8",
        label: "Moving or speaking slowly, or being fidgety or restless",
        explanation: "Item 8, scored 0-3.",
      },
      {
        inputId: "phq9",
        label: "Thoughts that you would be better off dead or of hurting yourself",
        explanation: "Item 9 (self-harm/suicidal ideation screen), scored 0-3; any endorsement warrants urgent evaluation.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The PHQ-9 is a screening instrument, not a substitute for a clinical diagnostic assessment; any concern for self-harm requires immediate evaluation.",
    evidence: {
      source: "Psychiatry / Primary Care",
      reference: "Kroenke K, Spitzer RL, Williams JB. J Gen Intern Med. 2001;16(9):606-613.",
      version: "2001",
      updatedAt: "2026-08",
      references: [
        "Kroenke K, Spitzer RL, Williams JB. J Gen Intern Med. 2001;16(9):606-613.",
      ],
    },
  },

  "gad-7": {
    commonMistakes: [
      "Using the GAD-7 to separate panic disorder, social anxiety, or OCD from generalized anxiety, which the scale was not designed to do.",
      "Treating a GAD-7 total of 10 or more as a confirmed diagnosis rather than a screening result that still needs clinical confirmation.",
      "Scoring physical symptoms or medication side effects as anxiety items, which can artificially raise the total."
    ],
    formulaExplanation:
      "The GAD-7 sums seven items (gad1 through gad7), each scored 0-3 for symptom frequency over the past two weeks, for a total of 0-21. The total is graded as minimal (0-4), mild (5-9), moderate (10-14), or severe (15-21), with a cut-point of 10 for generalized anxiety disorder.",
    variables: [
      {
        inputId: "gad1",
        label: "Feeling nervous, anxious, or on edge",
        explanation: "Item 1, scored 0 (not at all) to 3 (nearly every day).",
      },
      {
        inputId: "gad2",
        label: "Not being able to stop or control worrying",
        explanation: "Item 2, scored 0-3.",
      },
      {
        inputId: "gad3",
        label: "Worrying too much about different things",
        explanation: "Item 3, scored 0-3.",
      },
      {
        inputId: "gad4",
        label: "Trouble relaxing",
        explanation: "Item 4, scored 0-3.",
      },
      {
        inputId: "gad5",
        label: "Being so restless that it is hard to sit still",
        explanation: "Item 5, scored 0-3.",
      },
      {
        inputId: "gad6",
        label: "Becoming easily annoyed or irritable",
        explanation: "Item 6, scored 0-3.",
      },
      {
        inputId: "gad7",
        label: "Feeling afraid, as if something awful might happen",
        explanation: "Item 7, scored 0-3.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The GAD-7 is a screening tool and does not replace clinical assessment or exclude other anxiety disorders.",
    evidence: {
      source: "Psychiatry / Primary Care",
      reference: "Spitzer RL, Kroenke K, Williams JB, Löwe B. Arch Intern Med. 2006;166(10):1092-1097.",
      version: "2006",
      updatedAt: "2026-08",
      references: [
        "Spitzer RL, Kroenke K, Williams JB, Löwe B. Arch Intern Med. 2006;166(10):1092-1097.",
      ],
    },
  },

  "epworth": {
    commonMistakes: [
      "Using the Epworth score to grade insomnia severity, when the scale measures daytime sleep propensity rather than insomnia.",
      "Treating an Epworth score of 11 or more as a diagnosis of obstructive sleep apnea instead of an indication for objective testing.",
      "Using a normal Epworth score of 0 to 10 to reassure against sleep apnea, since the scale correlates imperfectly with objective findings."
    ],
    formulaExplanation:
      "The Epworth Sleepiness Scale sums eight situation items (ess1 through ess8), each scored 0-3 for the likelihood of dozing, for a total of 0-24. Higher totals indicate greater daytime sleepiness: 0-10 normal, 11-14 mild, 15-17 moderate, and 18-24 severe excessive daytime sleepiness.",
    variables: [
      {
        inputId: "ess1",
        label: "Sitting and reading",
        explanation: "Situation 1, scored 0 (would never doze) to 3 (high chance of dozing).",
      },
      {
        inputId: "ess2",
        label: "Watching TV",
        explanation: "Situation 2, scored 0-3.",
      },
      {
        inputId: "ess3",
        label: "Sitting inactive in a public place",
        explanation: "Situation 3, scored 0-3.",
      },
      {
        inputId: "ess4",
        label: "As a passenger in a car for an hour without a break",
        explanation: "Situation 4, scored 0-3.",
      },
      {
        inputId: "ess5",
        label: "Lying down to rest in the afternoon when circumstances permit",
        explanation: "Situation 5, scored 0-3.",
      },
      {
        inputId: "ess6",
        label: "Sitting and talking to someone",
        explanation: "Situation 6, scored 0-3.",
      },
      {
        inputId: "ess7",
        label: "Sitting quietly after lunch without alcohol",
        explanation: "Situation 7, scored 0-3.",
      },
      {
        inputId: "ess8",
        label: "In a car, while stopped for a few minutes in traffic",
        explanation: "Situation 8, scored 0-3.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The ESS is a screening measure of sleep propensity; a diagnosis of sleep apnea requires objective sleep testing, and driving safety must always be addressed.",
    evidence: {
      source: "Sleep Medicine",
      reference: "Johns MW. Sleep. 1991;14(6):540-545.",
      version: "1991",
      updatedAt: "2026-08",
      references: [
        "Johns MW. Sleep. 1991;14(6):540-545.",
      ],
    },
  },

  "stop-bang": {
    commonMistakes: [
      "Treating a STOP-BANG score of 5 or more as diagnostic of obstructive sleep apnea rather than a screening result that needs confirmatory testing.",
      "Applying the STOP-BANG score to a child, although the tool is not validated in pediatric populations.",
      "Marking the BMI item positive at exactly 35 kg/m2, when the criterion requires a BMI greater than 35 kg/m2."
    ],
    formulaExplanation:
      "The STOP-BANG score adds one point for each of eight items: snoring, tiredness, observed apnea, high blood pressure, BMI over 35 kg/m2, age over 50 years, neck circumference over 40 cm, and male gender, for a total of 0-8. Scores of 3-4 indicate intermediate and 5-8 high obstructive sleep apnea risk.",
    variables: [
      {
        inputId: "snoring",
        label: "Snoring (loud, heard through closed doors)",
        explanation: "Loud snoring; Yes adds one point.",
      },
      {
        inputId: "tired",
        label: "Tiredness or sleepiness during the day",
        explanation: "Daytime tiredness or sleepiness; Yes adds one point.",
      },
      {
        inputId: "observedApnea",
        label: "Observed apnea",
        explanation: "Witnessed breathing pauses during sleep; Yes adds one point.",
      },
      {
        inputId: "bloodPressure",
        label: "High blood pressure",
        explanation: "Treated or diagnosed hypertension; Yes adds one point.",
      },
      {
        inputId: "bmi",
        label: "BMI greater than 35 kg/m2",
        explanation: "Body mass index over 35 kg/m2; Yes adds one point.",
      },
      {
        inputId: "age",
        label: "Age over 50 years",
        explanation: "Age greater than 50 years; Yes adds one point.",
      },
      {
        inputId: "neck",
        label: "Neck circumference greater than 40 cm",
        explanation: "Neck circumference over 40 cm; Yes adds one point.",
      },
      {
        inputId: "gender",
        label: "Male gender",
        explanation: "Male sex; Yes adds one point.",
      },
    ],
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
        "A 58-year-old man with treated hypertension reports loud snoring and daytime sleepiness; his wife has not witnessed him stop breathing during sleep. His BMI is 32 kg/m², neck circumference 38 cm, and he is over 50 and male.",
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
      "This calculator is intended for educational and clinical decision support purposes only. A positive STOP-BANG screen requires objective confirmation with polysomnography or home sleep apnea testing before OSA is diagnosed or treated.",
    evidence: {
      source: "Sleep Medicine / Anesthesiology",
      reference: "Chung F, et al. Anesthesiology. 2008;108(5):812-821.",
      version: "2008",
      updatedAt: "2026-08",
      references: [
        "Chung F, et al. Anesthesiology. 2008;108(5):812-821.",
      ],
    },
  },

  "centor": {
    commonMistakes: [
      "Awarding a point for the cough criterion when the patient has a cough, when a point is given only for absence of cough.",
      "Forgetting to subtract 1 point for a patient aged 45 years or older, which overestimates the group A streptococcal probability.",
      "Letting the raw total exceed 4 without applying the clamp, when interpretation is defined only across scores of 0 to 4."
    ],
    formulaExplanation:
      "The Modified Centor score adds one point each for fever, absence of cough, tonsillar exudates, and tender anterior cervical adenopathy, plus an age adjustment (+1 for 3-14 years, 0 for 15-44 years, -1 for 45 years or older). The raw total is clamped to the range 0-4 for interpretation.",
    variables: [
      {
        inputId: "fever",
        label: "Fever (> 38 C / 100.4 F)",
        explanation: "Documented fever over 38 C; Yes adds one point.",
      },
      {
        inputId: "absenceOfCough",
        label: "Absence of cough",
        explanation: "No cough present; Yes (absence of cough) adds one point.",
        commonError: "Select 'No cough' only when the patient is not coughing; a present cough contributes no point.",
      },
      {
        inputId: "tonsillarExudates",
        label: "Tonsillar exudates or swelling",
        explanation: "Tonsillar exudates or swelling; Yes adds one point.",
      },
      {
        inputId: "cervicalAdenopathy",
        label: "Tender anterior cervical lymphadenopathy",
        explanation: "Tender anterior cervical nodes; Yes adds one point.",
      },
      {
        inputId: "ageGroup",
        label: "Age",
        explanation: "Age adjustment: +1 for 3-14 years, 0 for 15-44 years, and -1 for 45 years or older.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The Modified Centor score estimates GAS probability and must be combined with clinical assessment and local testing/treatment policies; it is not a substitute for the IDSA pharyngitis guideline.",
    evidence: {
      source: "Infectious Disease / Primary Care",
      reference: "Centor RM, et al. Med Decis Making. 1992;12(1):3-11.",
      version: "1992",
      updatedAt: "2026-08",
      references: [
        "Centor RM, et al. Med Decis Making. 1992;12(1):3-11.",
      ],
    },
  },

  "charlson": {
    commonMistakes: [
      "Counting diabetes twice by awarding both the diabetes without end-organ damage point and the diabetes with end-organ damage points.",
      "Omitting the age adjustment, which adds 1 point for ages 50 to 59 and up to 4 points at age 80 or older.",
      "Using the estimated ten-year survival percentage to predict an individual patient's outcome instead of group-level prognosis."
    ],
    formulaExplanation:
      "The Charlson Comorbidity Index adds weighted points for 19 comorbidities (weights of 1, 2, 3, or 6) to an age adjustment (one point per decade starting at age 50). A higher total indicates greater comorbidity burden and lower estimated ten-year survival.",
    variables: [
      {
        inputId: "ageGroup",
        label: "Age",
        explanation: "Age category contributing 0 (under 50) up to 4 (80 or older) adjustment points.",
      },
      {
        inputId: "myocardialInfarction",
        label: "Myocardial infarction",
        explanation: "Prior myocardial infarction; weighted 1 point.",
      },
      {
        inputId: "congestiveHeartFailure",
        label: "Congestive heart failure",
        explanation: "Congestive heart failure; weighted 1 point.",
      },
      {
        inputId: "peripheralVascularDisease",
        label: "Peripheral vascular disease",
        explanation: "Peripheral vascular disease; weighted 1 point.",
      },
      {
        inputId: "cerebrovascularDisease",
        label: "Cerebrovascular disease",
        explanation: "Cerebrovascular disease; weighted 1 point.",
      },
      {
        inputId: "dementia",
        label: "Dementia",
        explanation: "Dementia; weighted 1 point.",
      },
      {
        inputId: "chronicPulmonaryDisease",
        label: "Chronic pulmonary disease",
        explanation: "Chronic pulmonary disease; weighted 1 point.",
      },
      {
        inputId: "connectiveTissueDisease",
        label: "Connective tissue disease",
        explanation: "Connective tissue disease; weighted 1 point.",
      },
      {
        inputId: "pepticUlcer",
        label: "Peptic ulcer disease",
        explanation: "Peptic ulcer disease; weighted 1 point.",
      },
      {
        inputId: "mildLiverDisease",
        label: "Mild liver disease",
        explanation: "Mild liver disease; weighted 1 point.",
      },
      {
        inputId: "diabetesNoComplications",
        label: "Diabetes without end-organ damage",
        explanation: "Diabetes without complications; weighted 1 point.",
      },
      {
        inputId: "hemiplegia",
        label: "Hemiplegia or paraplegia",
        explanation: "Hemiplegia or paraplegia; weighted 2 points.",
      },
      {
        inputId: "moderateSevereRenalDisease",
        label: "Moderate or severe renal disease",
        explanation: "Moderate or severe renal disease; weighted 2 points.",
      },
      {
        inputId: "diabetesEndOrganDamage",
        label: "Diabetes with end-organ damage",
        explanation: "Diabetes with end-organ damage; weighted 2 points.",
      },
      {
        inputId: "anyMalignancy",
        label: "Any malignancy (without metastasis)",
        explanation: "Any malignancy without metastasis; weighted 2 points.",
      },
      {
        inputId: "leukemia",
        label: "Leukemia",
        explanation: "Leukemia; weighted 2 points.",
      },
      {
        inputId: "lymphoma",
        label: "Lymphoma",
        explanation: "Lymphoma; weighted 2 points.",
      },
      {
        inputId: "moderateSevereLiverDisease",
        label: "Moderate or severe liver disease",
        explanation: "Moderate or severe liver disease; weighted 3 points.",
      },
      {
        inputId: "metastaticSolidTumor",
        label: "Metastatic solid tumor",
        explanation: "Metastatic solid tumor; weighted 6 points.",
      },
      {
        inputId: "aids",
        label: "AIDS",
        explanation: "AIDS; weighted 6 points.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The CCI predicts population-level mortality risk and must not be used to forecast an individual patient's outcome or to make treatment decisions in isolation.",
    evidence: {
      source: "Internal Medicine / Epidemiology",
      reference: "Charlson ME, et al. J Chronic Dis. 1987;40(5):373-383.",
      version: "1987",
      updatedAt: "2026-08",
      references: [
        "Charlson ME, et al. J Chronic Dis. 1987;40(5):373-383.",
      ],
    },
  },

  "barthel": {
    commonMistakes: [
      "Using a maximum of 10 points for every domain, when transfers and mobility are scored out of 15 and bathing and grooming out of 5.",
      "Mixing item anchors from the original and the Shah-modified versions in one assessment, which makes the totals non-interchangeable.",
      "Reading a score of 100 as meaning no care needs, when the index covers physical ADLs only and not cognition or caregiver burden."
    ],
    formulaExplanation:
      "The Barthel Index sums ten activities-of-daily-living domains with item-specific maximum points: feeding 10, bathing 5, grooming 5, dressing 10, bowels 10, bladder 10, toilet use 10, transfers 15, mobility 15, and stairs 10, for a total of 0-100. Higher totals indicate greater independence.",
    variables: [
      {
        inputId: "feeding",
        label: "Feeding",
        explanation: "Feeding independence, scored 0 (unable), 5 (needs some help), or 10 (independent).",
      },
      {
        inputId: "bathing",
        label: "Bathing",
        explanation: "Bathing independence, scored 0 (dependent) or 5 (independent).",
      },
      {
        inputId: "grooming",
        label: "Grooming",
        explanation: "Grooming (face, hair, teeth, shaving), scored 0 (needs help) or 5 (independent).",
      },
      {
        inputId: "dressing",
        label: "Dressing",
        explanation: "Dressing, scored 0 (dependent), 5 (needs help), or 10 (independent).",
      },
      {
        inputId: "bowels",
        label: "Bowels",
        explanation: "Bowel control, scored 0 (incontinent), 5 (occasional accident), or 10 (continent).",
      },
      {
        inputId: "bladder",
        label: "Bladder",
        explanation: "Bladder control, scored 0 (incontinent), 5 (occasional accident), or 10 (continent).",
      },
      {
        inputId: "toiletUse",
        label: "Toilet use",
        explanation: "Toilet use, scored 0 (dependent), 5 (needs some help), or 10 (independent).",
      },
      {
        inputId: "transfers",
        label: "Transfers (bed to chair and back)",
        explanation: "Transfers, scored 0 (unable), 5 (major help), 10 (minor help), or 15 (independent).",
      },
      {
        inputId: "mobility",
        label: "Mobility (walking or wheelchair)",
        explanation: "Mobility, scored 0 (immobile), 5 (wheelchair independent), 10 (walks with help), or 15 (independent).",
      },
      {
        inputId: "stairs",
        label: "Stairs",
        explanation: "Stairs, scored 0 (unable), 5 (needs help), or 10 (independent).",
      },
    ],
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
        "A 68-year-old woman one month after a moderate stroke needs help with feeding and stairs, is fully dependent for bathing, has occasional bladder accidents, and walks with help; she is independent in grooming, dressing, bowel control, toilet use, and transfers.",
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
    evidence: {
      source: "Original Scale and Validation Studies",
      reference:
        "Mahoney FI, Barthel DW. Functional evaluation: the Barthel Index. Md State Med J. 1965;14:61-65. Shah S, Vanclay F, Cooper B. J Clin Epidemiol. 1989;42(8):703-709. Collin C, Wade DT, et al. Int Disabil Stud. 1988;10(2):61-63.",
      version: "1965",
      updatedAt: "2026-08",
      references: [
        "Mahoney FI, Barthel DW. Md State Med J. 1965;14:61-65.",
        "Shah S, Vanclay F, Cooper B. J Clin Epidemiol. 1989;42(8):703-709.",
        "Collin C, Wade DT, et al. Int Disabil Stud. 1988;10(2):61-63.",
      ],
    },
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
      "This calculator is intended for educational and clinical decision support purposes only. The Barthel Index quantifies physical ADL dependence and should be used with clinical judgment and broader functional, social, and caregiver assessment.",
  },

  "ecog": {
    commonMistakes: [
      "Summing several functional domains to produce an ECOG number, when the status is a single ordinal grade from 0 to 5.",
      "Assigning grade 5 to a patient who is severely unwell but alive, when grade 5 denotes death.",
      "Using the ECOG grade alone to decide chemotherapy eligibility without weighing laboratory, clinical, and patient-preference factors."
    ],
    formulaExplanation:
      "The ECOG performance status is a single ordinal grade from 0 to 5 selected directly; it is not a sum. Grade 0 indicates full activity, grades 1-4 indicate progressive functional limitation, and grade 5 denotes death.",
    variables: [
      {
        inputId: "grade",
        label: "ECOG performance status grade",
        explanation: "The single ECOG grade (0 fully active, 1 restricted but ambulatory, 2 ambulatory but unable to work, 3 limited self-care, 4 completely disabled, 5 dead).",
      },
    ],
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
    evidence: {
      source: "Original Scale Description",
      reference:
        "Oken MM, Creech RH, Tormey DC, et al. Toxicity and response criteria of the Eastern Cooperative Oncology Group. Am J Clin Oncol. 1982;5(6):649-655. Zubrod CG, Schneiderman M, Frei E, et al. J Chronic Dis. 1960;11(1):7-33.",
      version: "1982",
      updatedAt: "2026-08",
      references: [
        "Oken MM, Creech RH, et al. Am J Clin Oncol. 1982;5(6):649-655.",
        "Zubrod CG, Schneiderman M, et al. J Chronic Dis. 1960;11(1):7-33.",
      ],
    },
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
      "This calculator is intended for educational and clinical decision support purposes only. ECOG performance status is one input into treatment decisions, which must be individualized with clinical judgment and the patient's goals and preferences.",
  },

  "meld-score": {
    commonMistakes: [
      "Entering serum creatinine in micromoles per liter rather than mg/dL, which inflates the creatinine term and yields a score that cannot be compared with the risk bands.",
      "Answering 'No' to dialysis for a patient dialyzed at least twice in the last week, because the rules set creatinine to 4.0 in that situation and missing this underestimates risk.",
      "Using MELD to grade acute liver failure, which has dedicated criteria, or expecting it to capture ascites, encephalopathy, or other factors it does not include."
    ],
    faq: [
      {
        question: "What happens to bilirubin, INR, and creatinine values below 1.0?",
        answer: "In the standard MELD calculation, bilirubin, INR, and creatinine are floored at 1.0 before the logarithms are taken, so a very low creatinine cannot lower the score below what a value of 1.0 would produce. Creatinine is also capped at 4.0, and is set to 4.0 when dialysis was required at least twice in the last week."
      },
      {
        question: "How does MELD differ from the current U.S. allocation score?",
        answer: "The classic MELD formula uses bilirubin, INR, and creatinine with fixed coefficients. Current U.S. liver allocation uses the MELD 3.0 model, adopted in July 2023, which incorporates albumin, sex, and updated coefficients. The classic score remains a valid prognostic estimate of 3-month mortality in chronic liver disease, but it is no longer the allocation score."
      },
      {
        question: "Why can MELD underestimate risk in some patients?",
        answer: "Creatinine depends on muscle mass, so patients with low muscle mass can have a deceptively low creatinine and therefore a lower MELD than their true severity warrants. The score also omits ascites and hepatic encephalopathy, which carry independent prognostic information, and INR assays vary between laboratories, which affects reproducibility of the score over time."
      }
    ],
    formulaExplanation:
      "MELD = 3.78 x ln(bilirubin) + 11.2 x ln(INR) + 9.57 x ln(creatinine) + 6.43, with bilirubin and creatinine in mg/dL. Bilirubin, INR, and creatinine are floored at 1.0, creatinine is capped at 4.0 (and set to 4.0 when dialysis was required), and the result is rounded to the nearest integer.",
    variables: [
      {
        inputId: "bilirubin",
        label: "Serum Bilirubin",
        explanation: "Serum bilirubin in mg/dL, entered into a natural logarithm and floored at 1.0.",
        commonError: "Values below 1.0 are raised to 1.0, so very low bilirubin does not further lower the score.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL; floored at 1.0 and capped at 4.0, or set to 4.0 when on dialysis.",
      },
      {
        inputId: "inr",
        label: "INR",
        explanation: "International normalized ratio, entered into a natural logarithm and floored at 1.0.",
      },
      {
        inputId: "dialysis",
        label: "Dialysis at least twice in the last week?",
        explanation: "Yes forces the creatinine term to 4.0, reflecting transplant allocation practice.",
      },
    ],
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
    evidence: {
      source: "Original MELD Description / UNOS",
      reference:
        "Kamath PS, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kamath PS, et al. Hepatology. 2001.",
      ],
    },
    references: [
      {
        citation: "Kamath PS, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Classic MELD is a prognostic mortality-risk score; current U.S. liver allocation uses the MELD 3.0 model. Transplant decisions must incorporate the full clinical picture and institutional policies.",
  },

  "meld-na-score": {
    commonMistakes: [
      "Expecting a sodium above 137 mmol/L to reduce the score, since sodium is bounded to the 125-137 range before calculation and values above 137 change nothing.",
      "Calculating the score immediately after aggressive diuresis or hypotonic fluid administration, when the measured sodium has not reached a steady state and can bias the result.",
      "Applying the sodium adjustment to a MELD that was not calculated with the standard floors, creatinine cap, and dialysis rule, which produces a MELD-Na that does not match the published model."
    ],
    faq: [
      {
        question: "How does hyponatremia change the MELD-Na score?",
        answer: "Hyponatremia raises the score. The formula adds 1.32 times the difference between 137 mmol/L and the measured sodium, with a small interaction term, so the further sodium falls below 137 the higher the result. Sodium below 125 is bounded at 125 before calculation. This reflects the observation that hyponatremia worsens prognosis in cirrhosis."
      },
      {
        question: "Is MELD-Na still used for U.S. transplant allocation?",
        answer: "MELD-Na was adopted by UNOS because adding serum sodium improved mortality prediction compared with MELD alone, particularly in patients with hyponatremia. U.S. liver allocation transitioned to the MELD 3.0 model in July 2023, which incorporates albumin, sex, and updated coefficients, so MELD-Na is no longer the allocation score but remains a validated prognostic estimate."
      },
      {
        question: "Why does a high sodium not improve the score?",
        answer: "Sodium is clamped to a maximum of 137 mmol/L, so the model does not reward supra-normal sodium; a value above 137 is treated the same as exactly 137. The score was built to capture the prognostic penalty of hyponatremia in advanced liver disease, not any potential benefit of higher sodium."
      }
    ],
    formulaExplanation:
      "MELD-Na = MELD + 1.32 x (137 - sodium) - [0.033 x MELD x (137 - sodium)], where MELD is the standard MELD score and sodium is in mmol/L. Sodium is bounded to 125-137 mmol/L before the calculation, and the result is rounded to the nearest integer.",
    variables: [
      {
        inputId: "bilirubin",
        label: "Serum Bilirubin",
        explanation: "Serum bilirubin in mg/dL, entered into the MELD component with a floor of 1.0.",
      },
      {
        inputId: "creatinine",
        label: "Serum Creatinine",
        explanation: "Serum creatinine in mg/dL; floored at 1.0 and capped at 4.0, or set to 4.0 when on dialysis.",
      },
      {
        inputId: "inr",
        label: "INR",
        explanation: "International normalized ratio, entered into the MELD component with a floor of 1.0.",
      },
      {
        inputId: "sodium",
        label: "Serum Sodium",
        explanation: "Serum sodium in mmol/L, bounded to 125-137 for the MELD-Na correction term.",
        commonError: "Sodium values outside 125-137 mmol/L are clamped to those limits.",
      },
      {
        inputId: "dialysis",
        label: "Dialysis at least twice in the last week?",
        explanation: "Yes forces the creatinine term to 4.0 within the MELD component.",
      },
    ],
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
    evidence: {
      source: "Original MELD-Na Description / UNOS",
      reference:
        "Kim WR, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359:1018-1026.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kim WR, et al. N Engl J Med. 2008;359:1018-1026.",
      ],
    },
    references: [
      {
        citation: "Kim WR, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359:1018-1026.",
        level: "Original model",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. MELD-Na is one component of transplant evaluation; allocation decisions follow current institutional and UNOS/OPTN policy (MELD 3.0 in the United States).",
  },

  "fib-4-index": {
    commonMistakes: [
      "Applying FIB-4 to patients younger than 35 years, where the score underperforms and low or high results should be interpreted with particular caution.",
      "Omitting the square root on ALT or swapping platelets with ALT in the formula, which yields a number that cannot be compared with the 1.30 and 2.67 cutoffs.",
      "Entering an AST upper limit of normal out of habit from using APRI, since FIB-4 uses the raw AST and ALT values directly and has no ULN input."
    ],
    faq: [
      {
        question: "How is FIB-4 different from APRI?",
        answer: "FIB-4 combines age, AST, ALT, and platelet count, while APRI uses only AST relative to its upper limit of normal and the platelet count. Because FIB-4 includes age and ALT, it draws on more of the routine panel, but age also drives its accuracy and limits performance under 35 years. Both are non-invasive estimates, not fibrosis diagnoses."
      },
      {
        question: "What does an indeterminate FIB-4 of 1.30 to 2.67 mean?",
        answer: "It means the score cannot resolve advanced fibrosis on its own. Results below 1.30 indicate low probability and results above 2.67 indicate high probability, but the middle range requires further evaluation such as elastography or other confirmatory testing. Patients in this band should not be reassured or labeled as having advanced fibrosis based on the number alone."
      },
      {
        question: "Why does age matter so much in FIB-4?",
        answer: "Age appears in the numerator, so the score rises with age even when liver tests are unchanged. This helps capture fibrosis risk in older adults but limits accuracy at the extremes of age, which is why performance is reduced under 35 years. When following a patient over time, expect the score to drift upward as the patient ages."
      }
    ],
    formulaExplanation:
      "FIB-4 = (age x AST) / (platelets x sqrt(ALT)), with age in years, AST and ALT in U/L, and platelets in x10^9/L.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, multiplied by AST in the numerator.",
      },
      {
        inputId: "ast",
        label: "AST",
        explanation: "Aspartate aminotransferase in U/L, multiplied by age in the numerator.",
      },
      {
        inputId: "alt",
        label: "ALT",
        explanation: "Alanine aminotransferase in U/L, square-rooted in the denominator.",
      },
      {
        inputId: "platelets",
        label: "Platelet Count",
        explanation: "Platelet count in x10^9/L, multiplied by the square root of ALT in the denominator.",
      },
    ],
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
    evidence: {
      source: "Hepatology Literature",
      reference:
        "Sterling RK, et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology. 2006;43:1317-1325.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Sterling RK, et al. Hepatology. 2006;43:1317-1325.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. FIB-4 is a screening index and does not replace clinical evaluation or confirmatory fibrosis testing.",
  },

  "apri-score": {
    commonMistakes: [
      "Entering the platelet count in units other than x10^9/L, such as reporting platelets per microliter, which distorts the denominator and can move the score across the 0.5 and 1.5 thresholds.",
      "Calculating APRI during an acute hepatitis flare, because a transient AST elevation inflates the ratio and can mimic significant fibrosis or cirrhosis that is not actually present.",
      "Treating a result in the 0.5 to 1.5 intermediate band as a definitive fibrosis estimate, even though accuracy is lowest in that range and further evaluation is required."
    ],
    faq: [
      {
        question: "Which AST upper limit of normal should I enter?",
        answer: "Enter the upper limit of normal from your own laboratory, since APRI divides the patient's AST by that value before scaling by 100 and the platelet count. Different laboratories use different ULNs, and the score shifts accordingly. If the laboratory ULN is uncertain, the result should not be used for fibrosis decision-making."
      },
      {
        question: "Can APRI be used in patients with hepatitis B?",
        answer: "APRI is best validated in chronic hepatitis C and is endorsed by WHO for fibrosis screening in resource-limited settings, including chronic viral hepatitis more broadly. It should not be used during acute hepatitis with a transient AST flare, in children, or when thrombocytopenia arises from causes unrelated to portal hypertension, since those situations confound the score."
      },
      {
        question: "What should I do when APRI is between 0.5 and 1.5?",
        answer: "An intermediate result does not resolve the fibrosis question on its own, because accuracy is lowest in the 0.5 to 1.5 range. Patients in this band should proceed to further evaluation, such as elastography where available, or other confirmatory assessment, rather than being labeled as having or not having significant fibrosis based on APRI alone."
      }
    ],
    formulaExplanation:
      "APRI = [(AST / AST upper limit of normal) x 100] / platelet count (x10^9/L). It compares the AST elevation to the platelet count as a non-invasive marker of hepatic fibrosis.",
    variables: [
      {
        inputId: "ast",
        label: "AST",
        explanation: "Aspartate aminotransferase in U/L, divided by the AST upper limit of normal.",
      },
      {
        inputId: "uln",
        label: "AST Upper Limit of Normal",
        explanation: "Laboratory-specific AST upper limit of normal in U/L, used as the denominator of the AST ratio.",
      },
      {
        inputId: "platelets",
        label: "Platelet Count",
        explanation: "Platelet count in x10^9/L, used as the divisor of the scaled AST ratio.",
      },
    ],
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
    evidence: {
      source: "Hepatology Literature",
      reference:
        "Wai CT, et al. A simple noninvasive index can predict both significant fibrosis and cirrhosis in patients with chronic hepatitis C. Hepatology. 2003;38:518-526.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Wai CT, et al. Hepatology. 2003;38:518-526.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. APRI is a screening index; fibrosis stage should be confirmed with further testing when clinically indicated.",
  },

  "rockall-score": {
    commonMistakes: [
      "Assigning endoscopic diagnosis and stigmata points before endoscopy has been performed, which either forces guesswork or produces a deceptively low total that understates true risk.",
      "Using Rockall for emergency department triage or admission decisions, which is the role of the Glasgow-Blatchford score, since Rockall is applied after endoscopy to estimate mortality and rebleeding.",
      "Scoring the shock category by diastolic blood pressure, when the options are defined by pulse above 100 bpm or systolic pressure below 100 mmHg."
    ],
    faq: [
      {
        question: "Why can't the Rockall score be used before endoscopy?",
        answer: "Two of its five components, namely endoscopic diagnosis and major stigmata of recent hemorrhage, can only be completed once endoscopy has been done. A clinical-only version exists, but the full Rockall score used for mortality and rebleeding prediction requires those endoscopic findings, which is why pre-endoscopy risk stratification relies on the Glasgow-Blatchford score instead."
      },
      {
        question: "What counts as major stigmata of recent hemorrhage?",
        answer: "Within this calculator the stigmata component scores 0 for no stigmata or a dark spot only, and 2 for blood in the upper gastrointestinal tract, an adherent clot, a visible vessel, or active bleeding. These endoscopic findings carry much of the post-endoscopy risk estimate alongside diagnosis and comorbidity."
      },
      {
        question: "How does Rockall complement Glasgow-Blatchford in the same patient?",
        answer: "Glasgow-Blatchford is calculated at presentation using clinical and laboratory data to estimate the need for intervention and to guide admission decisions. After endoscopy, the Rockall score adds the endoscopic diagnosis and stigmata to age, shock, and comorbidity to estimate mortality and rebleeding risk. Many units use both, at different points in the same admission."
      }
    ],
    formulaExplanation:
      "The Rockall score sums weighted points across five components: age, shock, comorbidity, endoscopic diagnosis, and major stigmata of recent hemorrhage. Each component is selected as a pre-scored value (0-3) and summed; higher totals predict greater rebleeding and mortality risk.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age category scored 0 (under 60 years), 1 (60-79 years), or 2 (80 years or older).",
      },
      {
        inputId: "shock",
        label: "Shock",
        explanation: "Hemodynamic status scored 0 (no shock), 1 (pulse over 100 bpm), or 2 (systolic BP under 100 mmHg).",
      },
      {
        inputId: "comorbidity",
        label: "Comorbidity",
        explanation: "Comorbidity scored 0 (none), 2 (heart failure or ischemic heart disease), or 3 (renal failure, liver failure, or metastatic cancer).",
      },
      {
        inputId: "diagnosis",
        label: "Endoscopic Diagnosis",
        explanation: "Endoscopic diagnosis scored 0 (Mallory-Weiss or no lesion), 1 (all other diagnoses), or 2 (upper GI malignancy).",
      },
      {
        inputId: "stigmata",
        label: "Major Stigmata of Recent Hemorrhage",
        explanation: "Endoscopic stigmata scored 0 (none or dark spot only) or 2 (blood in the tract, adherent clot, visible vessel, or active bleeding).",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. Risk scores inform but do not replace clinical judgment in the management of upper GI bleeding.",
    evidence: {
      source: "Gastroenterology / Emergency Medicine",
      reference: "Rockall TA, et al. Gut. 1996;38(3):316-321.",
      version: "1996",
      updatedAt: "2026-08",
      references: [
        "Rockall TA, et al. Gut. 1996;38(3):316-321.",
      ],
    },
  },

  "glasgow-blatchford-score": {
    commonMistakes: [
      "Assuming an elevated BUN reflects only the magnitude of gastrointestinal bleeding, when prerenal states such as dehydration raise BUN independently and can push the score into a higher risk category.",
      "Choosing the wrong sex option during entry, because the hemoglobin component relies on sex-specific thresholds and a mismatched selection adds or removes points from the total.",
      "Using the Glasgow-Blatchford score after endoscopy to estimate rebleeding or mortality, since it predicts the need for intervention while post-endoscopy risk is the domain of the Rockall score."
    ],
    faq: [
      {
        question: "What does a Glasgow-Blatchford score of 0 mean for discharge?",
        answer: "A score of 0 identifies a very low-risk patient in whom outpatient management may be appropriate, and NICE guidance supports avoiding admission in this group. Even so, the decision should reflect overall clinical assessment, including hemodynamic status and the reliability of follow-up. Scores of 1 or higher indicate that hospital assessment is needed."
      },
      {
        question: "Can I calculate the Glasgow-Blatchford score before endoscopy?",
        answer: "Yes, and that is its main use. All of its inputs, namely BUN, hemoglobin, sex, systolic blood pressure, pulse, melena, syncope, known hepatic disease, and known cardiac failure, are available at presentation, which is why it is suited to emergency department triage and pre-endoscopy risk stratification."
      },
      {
        question: "How is the Glasgow-Blatchford score different from the Rockall score?",
        answer: "The Glasgow-Blatchford score uses only clinical and laboratory findings available before endoscopy and predicts the need for intervention, transfusion, or death. The Rockall score adds endoscopic diagnosis and stigmata of recent hemorrhage and is used after endoscopy to estimate mortality and rebleeding risk. The two are complementary rather than interchangeable."
      }
    ],
    formulaExplanation:
      "The Glasgow-Blatchford score sums weighted points for blood urea nitrogen, hemoglobin (with sex-specific thresholds), systolic blood pressure, pulse rate, melena, syncope, hepatic disease, and cardiac failure. Higher totals predict a greater need for clinical intervention.",
    variables: [
      {
        inputId: "bun",
        label: "Blood Urea Nitrogen",
        explanation: "Blood urea nitrogen in mg/dL, scored across increasing ranges.",
      },
      {
        inputId: "hemoglobin",
        label: "Hemoglobin",
        explanation: "Hemoglobin in g/dL, scored using sex-specific thresholds.",
      },
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which sets the hemoglobin scoring thresholds.",
      },
      {
        inputId: "sbp",
        label: "Systolic Blood Pressure",
        explanation: "Systolic blood pressure in mmHg, scored higher at lower values.",
      },
      {
        inputId: "pulse",
        label: "Pulse Rate",
        explanation: "Pulse rate in beats per minute; values of 100 or higher contribute points.",
      },
      {
        inputId: "melena",
        label: "Melena",
        explanation: "Passage of melena; Yes contributes one point.",
      },
      {
        inputId: "syncope",
        label: "Syncope",
        explanation: "Syncope at presentation; Yes contributes points.",
      },
      {
        inputId: "hepatic",
        label: "Known Hepatic Disease",
        explanation: "Known hepatic disease; Yes contributes one point.",
      },
      {
        inputId: "cardiac",
        label: "Known Cardiac Failure",
        explanation: "Known cardiac failure; Yes contributes one point.",
      },
    ],
    clinicalPurpose:
      "Calculates the Glasgow-Blatchford score to predict the need for endoscopic intervention, transfusion, or death in patients presenting with suspected upper gastrointestinal bleeding.",
    howToUse: [
      "Enter BUN, hemoglobin, systolic blood pressure, and pulse from the presentation, and select the patient's sex (hemoglobin scoring is sex-specific).",
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
    evidence: {
      source: "Original GBS Description / NICE Guideline",
      reference:
        "Blatchford O, et al. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356:1318-1321.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Blatchford O, et al. Lancet. 2000;356:1318-1321.",
      ],
    },
    references: [
      {
        citation: "Blatchford O, et al. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356:1318-1321.",
        level: "Original score",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Glasgow-Blatchford score supports triage decisions but does not replace clinical judgment.",
  },

  "maddrey-discriminant-function": {
    commonMistakes: [
      "Entering total bilirubin in micromoles per liter instead of mg/dL, which inflates that term of the equation and can spuriously push the result past the 32-point threshold.",
      "Substituting the INR or a PT ratio for the prothrombin time difference, when the formula needs the patient PT minus the control PT, both measured in seconds.",
      "Expecting a follow-up MDF value to show whether corticosteroids are working, since the score grades initial severity and treatment response is assessed separately with tools such as the Lille score."
    ],
    faq: [
      {
        question: "Why does the formula need a control prothrombin time?",
        answer: "The Maddrey discriminant function is built on the difference between the patient's prothrombin time and a control value, both in seconds, multiplied by 4.6 and then added to total bilirubin in mg/dL. Prothrombin time reagents and instrumentation vary between laboratories, so using the matched control keeps the difference meaningful rather than depending on an absolute number."
      },
      {
        question: "Does an MDF of 32 or higher automatically mean corticosteroids?",
        answer: "An MDF of 32 or greater defines severe alcoholic hepatitis and is the classic threshold for considering corticosteroid therapy, but only when there are no contraindications. The underlying diagnosis of alcoholic hepatitis itself rests on clinical and often biopsy-based criteria, and the score does not capture contraindications, so the treatment decision remains clinical."
      },
      {
        question: "Can the MDF be used in other types of liver injury?",
        answer: "No. The MDF is intended for suspected alcoholic hepatitis and should not be applied to other causes of acute liver injury or cholestatic disease, or used without a secure diagnosis of alcoholic hepatitis. It is also not validated in children, and the score does not replace the broader clinical and sometimes biopsy-based assessment required to establish the diagnosis."
      }
    ],
    formulaExplanation:
      "Maddrey discriminant function = 4.6 x (patient prothrombin time - control prothrombin time) + total bilirubin, with prothrombin times in seconds and bilirubin in mg/dL. Values of 32 or greater indicate severe alcoholic hepatitis.",
    variables: [
      {
        inputId: "patient_pt",
        label: "Patient Prothrombin Time",
        explanation: "Patient prothrombin time in seconds, from which the control PT is subtracted.",
      },
      {
        inputId: "control_pt",
        label: "Control Prothrombin Time",
        explanation: "Laboratory control prothrombin time in seconds, subtracted from the patient PT.",
      },
      {
        inputId: "bilirubin",
        label: "Total Bilirubin",
        explanation: "Total serum bilirubin in mg/dL, added to the prolonged prothrombin time term.",
      },
    ],
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
      "This calculator is intended for educational and clinical decision support purposes only. The diagnosis of alcoholic hepatitis and treatment decisions must be individualized with clinical judgment.",
    evidence: {
      source: "Hepatology / Gastroenterology",
      reference: "Madrey WC, et al. Hepatology. 1998;28(6):1561-1563.",
      version: "1998",
      updatedAt: "2026-08",
      references: [
        "Madrey WC, et al. Hepatology. 1998;28(6):1561-1563.",
      ],
    },
  },

  "nafld-fibrosis-score": {
    commonMistakes: [
      "Entering albumin in grams per liter rather than g/dL, which inflates the albumin term of the formula and artificially lowers the resulting score.",
      "Marking diabetes/IFG as absent when impaired fasting glucose is present, since the input is a single binary term and omission shifts the score by the full 1.13 coefficient.",
      "Using the NAFLD fibrosis score in patients with liver disease other than NAFLD/MASLD, where the score was not validated and the result does not carry the same meaning."
    ],
    faq: [
      {
        question: "How is the NAFLD fibrosis score different from FIB-4?",
        answer: "The NAFLD fibrosis score adds BMI, diabetes or impaired fasting glucose, and albumin to age, the AST/ALT ratio, and platelets, and it was built and validated specifically in NAFLD cohorts. FIB-4 uses age, AST, ALT, and platelets without metabolic variables. Both estimate advanced fibrosis non-invasively, both have an indeterminate middle range, and neither replaces elastography or biopsy when staging is required."
      },
      {
        question: "What should I do with an indeterminate result?",
        answer: "An indeterminate result between -1.455 and 0.676 does not resolve the question of advanced fibrosis. Guidance directs these patients to further evaluation, typically elastography and occasionally biopsy, rather than relying on the score alone. Only results below -1.455, indicating low probability, or above 0.676, indicating high probability, are used to triage without further testing."
      },
      {
        question: "Why do AST and ALT need to be entered separately?",
        answer: "The formula uses the ratio of AST to ALT as one of its terms, along with separate coefficients for the other variables, so both raw enzyme values in U/L are required. Entering a pre-calculated ratio or swapping the two values changes that term and moves the score relative to the -1.455 and 0.676 cutoffs."
      }
    ],
    formulaExplanation:
      "NAFLD fibrosis score = -1.675 + (0.037 x age) + (0.094 x BMI) + (1.13 x diabetes) + (0.99 x AST/ALT) - (0.013 x platelets) - (0.66 x albumin), with age in years, BMI in kg/m2, diabetes coded 0 or 1, platelets in x10^9/L, and albumin in g/dL.",
    variables: [
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, multiplied by 0.037.",
      },
      {
        inputId: "bmi",
        label: "BMI",
        explanation: "Body mass index in kg/m2, multiplied by 0.094.",
      },
      {
        inputId: "diabetes",
        label: "Diabetes / IFG",
        explanation: "Presence of diabetes or impaired fasting glucose, coded 1 if present and 0 if absent.",
      },
      {
        inputId: "ast",
        label: "AST",
        explanation: "Aspartate aminotransferase in U/L, used as the numerator of the AST/ALT ratio.",
      },
      {
        inputId: "alt",
        label: "ALT",
        explanation: "Alanine aminotransferase in U/L, used as the denominator of the AST/ALT ratio.",
      },
      {
        inputId: "platelets",
        label: "Platelet Count",
        explanation: "Platelet count in x10^9/L, multiplied by -0.013.",
      },
      {
        inputId: "albumin",
        label: "Albumin",
        explanation: "Serum albumin in g/dL, multiplied by -0.66.",
      },
    ],
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
    evidence: {
      source: "Hepatology Literature",
      reference:
        "Angulo P, et al. The NAFLD fibrosis score: a noninvasive system that identifies liver fibrosis in patients with NAFLD. Hepatology. 2007;45:846-854.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Angulo P, et al. Hepatology. 2007;45:846-854.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The NAFLD Fibrosis Score is a screening tool and does not replace clinical evaluation or confirmatory fibrosis testing.",
  },

  "rox-index": {
    commonMistakes: [
      "Using the ROX index to guide intubation decisions in patients on standard oxygen or noninvasive ventilation, since it was derived and validated in adults receiving high-flow nasal cannula.",
      "Relying on a single ROX value instead of reassessing it over the initial hours of therapy, because the index is a dynamic measure and one reading cannot confirm HFNC success or failure.",
      "Entering FiO2 as a percentage rather than a fraction, which shrinks the SpO2/FiO2 component and can drive the index below 3.85 even when the patient is responding well."
    ],
    faq: [
      {
        question: "When should I recalculate the ROX index during therapy?",
        answer: "The ROX index is intended for serial monitoring during the initial hours of high-flow nasal cannula therapy rather than a one-time calculation. Reassess it at regular clinical reviews using the current SpO2, FiO2, and respiratory rate. A value that rises toward 4.88 or higher suggests the patient is responding, while a persistently low or falling value supports earlier consideration of escalation."
      },
      {
        question: "Can I use the ROX index in patients with pneumonia only?",
        answer: "It was derived and validated primarily in adults with pneumonia-related acute hypoxemic respiratory failure, so evidence is strongest in that group. Clinicians apply it more broadly in adult hypoxemic respiratory failure on high-flow nasal cannula, but it has not been validated in children and neonates, and it does not replace clinical assessment of work of breathing, comorbidities, or overall trajectory."
      },
      {
        question: "How does the ROX index differ from the P/F ratio?",
        answer: "The P/F ratio uses arterial PaO2 divided by FiO2, whereas the ROX index uses peripheral oxygen saturation (SpO2) divided by FiO2 and then by respiratory rate. Adding respiratory rate is what lets the ROX index reflect work of breathing and predict high-flow nasal cannula success, while the P/F ratio is used to grade oxygenation impairment and ARDS severity."
      }
    ],
    formulaExplanation:
      "ROX index = (SpO2 / FiO2) / respiratory rate. SpO2 is the peripheral oxygen saturation, FiO2 is the inspired oxygen fraction, and respiratory rate is in breaths per minute; higher values predict greater likelihood of high-flow nasal cannula success.",
    variables: [
      {
        inputId: "spo2",
        label: "SpO2",
        explanation: "Peripheral oxygen saturation as a percentage.",
      },
      {
        inputId: "fio2",
        label: "FiO2",
        explanation: "Fraction of inspired oxygen as a decimal (0.21 to 1.0); SpO2 is divided by this value.",
        commonError: "Entering FiO2 as a percentage rather than a decimal alters the ratio.",
      },
      {
        inputId: "rr",
        label: "Respiratory Rate",
        explanation: "Respiratory rate in breaths per minute, used as the divisor.",
      },
    ],
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
    evidence: {
      source: "Original Index Description",
      reference:
        "Roca O, Messika J, Caralt B, et al. Predicting success of high-flow nasal cannula in pneumonia patients with hypoxemic respiratory failure: The utility of the ROX index. J Crit Care. 2016;35:200-205.",
      version: "2016",
      updatedAt: "2026-08",
      references: [
        "Roca O, et al. J Crit Care. 2016;35:200-205.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The ROX index is one component of respiratory-failure assessment and must be interpreted with serial measurements and full clinical judgment.",
  },

  "pf-ratio": {
    commonMistakes: [
      "Entering FiO2 as a percentage instead of a fraction, such as entering 100 instead of 1 for pure oxygen, which produces a falsely low ratio.",
      "Combining a PaO2 from one blood gas with an FiO2 recorded at a different time, since the ratio is only meaningful when both values are measured concurrently.",
      "Applying the Berlin ARDS severity bands to a patient who lacks bilateral infiltrates or a PEEP of at least 5 cmH2O, misclassifying simple hypoxemia as ARDS."
    ],
    faq: [
      {
        question: "What FiO2 value should I use for a patient on room air?",
        answer: "Room air corresponds to an FiO2 of 0.21. Enter the fraction, not the percentage, so room air is 0.21 and pure oxygen is 1. The calculator divides PaO2 in mmHg by this fraction. Using the wrong scale will produce a ratio that is off by a factor of 100 and cannot be compared with the published severity bands."
      },
      {
        question: "Does a low P/F ratio confirm ARDS?",
        answer: "No. The P/F ratio quantifies oxygenation impairment, but the Berlin Definition also requires timing of onset, bilateral infiltrates, and a PEEP of at least 5 cmH2O within the appropriate clinical context. A low ratio in a patient who does not meet those criteria indicates hypoxemia of some cause, and the ratio itself does not identify why oxygenation is impaired."
      },
      {
        question: "Why are P/F values at different FiO2 levels not comparable?",
        answer: "The P/F ratio varies with the inspired oxygen fraction, so values obtained at different FiO2 levels are not directly comparable. When tracking oxygenation over time, record the FiO2 and PEEP used at each measurement so that any trend reflects a real change in the patient rather than a change in oxygen delivery."
      }
    ],
    formulaExplanation:
      "P/F ratio = PaO2 / FiO2. PaO2 is the arterial partial pressure of oxygen in mmHg and FiO2 is the inspired oxygen fraction (0.21 on room air). Lower ratios indicate worse oxygenation and are used to grade ARDS severity.",
    variables: [
      {
        inputId: "pao2",
        label: "PaO2",
        explanation: "Arterial partial pressure of oxygen in mmHg, used as the numerator.",
      },
      {
        inputId: "fio2",
        label: "FiO2",
        explanation: "Fraction of inspired oxygen as a decimal (0.21 to 1.0), used as the denominator.",
        commonError: "Entering FiO2 as a percentage such as 21 instead of 0.21 makes the ratio 100 times too small.",
      },
    ],
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
    evidence: {
      source: "Berlin Definition Consensus",
      reference:
        "ARDS Definition Task Force; Ranieri VM, Rubenfeld GD, Thompson BT, et al. Acute respiratory distress syndrome: the Berlin definition. JAMA. 2012;307(23):2526-2533.",
      version: "2012",
      updatedAt: "2026-08",
      references: [
        "ARDS Definition Task Force; Ranieri VM, et al. JAMA. 2012;307(23):2526-2533.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The P/F ratio is a component of ARDS assessment and does not by itself establish the diagnosis of ARDS.",
  },

  "a-a-gradient": {
    commonMistakes: [
      "Combining a PaCO2 from one blood gas with an FiO2 recorded at a different moment breaks the requirement that all inputs come from the same sample.",
      "Applying the calculation at altitude, where barometric pressure differs from 760 mmHg, relies on a sea-level assumption that no longer holds.",
      "Judging a result against a single fixed normal limit ignores that the expected gradient rises with age, roughly age/4 plus 4 mmHg."
    ],
    faq: [
      {
        question: "What does an elevated A-a gradient suggest about the cause of hypoxemia?",
        answer: "A gradient above the age-expected value indicates that hypoxemia is not explained by simple hypoventilation alone; it points to impaired gas transfer within the lung. The calculator compares your result with an age-expected value of roughly age divided by 4 plus 4 mmHg. The gradient cannot quantify how much each underlying mechanism contributes, so the finding must be interpreted with the rest of the blood gas and the clinical context."
      },
      {
        question: "Why do FiO2 and PaCO2 need to come from the same blood gas?",
        answer: "The alveolar gas equation pairs the inspired oxygen fraction with the measured PaCO2 to estimate alveolar oxygen, so both inputs must describe the patient at the same moment. If the FiO2 comes from a ventilator setting recorded after the arterial sample, or from a different time entirely, the calculated PAO2 will not match the measured PaO2 and the gradient loses meaning. The calculation also assumes sea-level conditions with a barometric pressure of 760 mmHg and a respiratory quotient of 0.8."
      },
      {
        question: "Is a normal A-a gradient enough to rule out lung disease?",
        answer: "No. A gradient within the age-expected range supports hypoventilation as the explanation for hypoxemia, but the calculator notes that a normal gradient does not exclude pulmonary disease and that the gradient alone cannot separate the contributions of shunt, ventilation/perfusion mismatch, and diffusion impairment. It is one component of arterial blood gas interpretation and should be read alongside the clinical picture, the measured PaO2, and assumptions such as sea-level barometric pressure."
      }
    ],
    clinicalPurpose:
      "Calculates the alveolar-arterial oxygen (A–a) gradient from an arterial blood gas to evaluate whether hypoxemia is explained by impaired gas exchange.",
    formulaExplanation:
      "A–a gradient = PAO₂ − PaO₂, where PAO₂ = (FiO₂ × (PB − PH₂O)) − (PaCO₂/RQ). Assumes PB=760 mmHg, PH₂O=47 mmHg, RQ=0.8.",
    variables: [
      {inputId:"age", label:"Age", explanation:"Used as a reference to interpret age-expected gradient (age/4 + 4 mmHg)."},
      {inputId:"fio2", label:"FiO2", explanation:"Fraction of inspired oxygen used to calculate alveolar oxygen tension."},
      {inputId:"pao2", label:"PaO2", explanation:"Arterial oxygen tension (mmHg)."},
      {inputId:"paco2", label:"PaCO2", explanation:"Arterial carbon dioxide tension (mmHg) used in alveolar gas equation."}
    ],
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
    evidence: {
      source: "Classic Respiratory Physiology",
      reference:
        "Fenn WO, Rahn H, Otis AB. A theoretical study of the composition of the alveolar air at altitude. Am J Physiol. 1946;146(5):637-653. West JB. Respiratory Physiology: The Essentials. 11th ed. Wolters Kluwer; 2022.",
      version: "1946",
      updatedAt: "2026-08",
      references: [
        "Fenn WO, Rahn H, Otis AB. Am J Physiol. 1946;146(5):637-653.",
        "West JB. Respiratory Physiology: The Essentials. 11th ed. Wolters Kluwer; 2022.",
      ],
    },
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The A–a gradient is one component of ABG interpretation and must be considered together with the clinical picture.",
  },

  "oxygen-index": {
    commonMistakes: [
      "Typing FiO2 as a percentage instead of the decimal fraction the formula requires makes the Oxygen Index far too high.",
      "Using an estimated mean airway pressure rather than the value read directly from the ventilator biases the result.",
      "Reading an Oxygen Index below 5 as proof of normal oxygenation misreads the tool's banding, since that range is described as mild impairment."
    ],
    faq: [
      {
        question: "Which patients and measurements are appropriate for the Oxygen Index?",
        answer: "The Oxygen Index is intended for mechanically ventilated patients, because the formula multiplies FiO2 by mean airway pressure, which must be read directly from the ventilator. It should not be used in patients breathing without ventilatory support or when mean airway pressure has to be estimated. The calculation also requires an arterial PaO2 from an arterial blood gas, since oxygen saturation surrogates are not accepted, and results are interpreted with the calculator's severity bands."
      },
      {
        question: "How should a single Oxygen Index value be interpreted over time?",
        answer: "The value depends on the current ventilator settings and on when the arterial blood gas was drawn, so one reading describes a single moment rather than the overall course, and serial measurements are more informative than an isolated number. The calculator's bands, below 5, 5 to 15, 16 to 25, and above 25, are pragmatic tool conventions because no single universally standardized classification exists for the Oxygen Index."
      },
      {
        question: "Why does the calculator label an Oxygen Index below 5 as normal?",
        answer: "The tool assigns a normal status to values below 5 as part of its banding scheme, even though its own interpretation text describes that range as mild oxygenation impairment. The discrepancy reflects how the categories are drawn in this calculator and does not mean oxygenation is fully normal. Since the Oxygen Index has no universally standardized classification, the banding is a pragmatic guide that should be read with ventilator settings, the arterial blood gas, and the patient's clinical trajectory."
      }
    ],
    formulaExplanation:
      "Oxygen index = (FiO2 x mean airway pressure x 100) / PaO2. FiO2 is entered as a fraction of inspired oxygen, mean airway pressure in cmH2O, and PaO2 in mmHg; higher values indicate more severe oxygenation failure.",
    variables: [
      {
        inputId: "fio2",
        label: "FiO2",
        explanation: "Fraction of inspired oxygen as a decimal (for example 0.21 for room air and 1.0 for 100% oxygen), multiplied by mean airway pressure and 100.",
        commonError: "Entering FiO2 as a percentage (for example 60) instead of a fraction (0.6) grossly overstates the index.",
      },
      {
        inputId: "map",
        label: "Mean Airway Pressure",
        explanation: "Mean airway pressure in cmH2O, representing the average pressure delivered by the ventilator.",
      },
      {
        inputId: "pao2",
        label: "PaO2",
        explanation: "Arterial partial pressure of oxygen in mmHg, used as the denominator.",
      },
    ],
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
          "Pediatric Acute Lung Injury Consensus Conference Group. Pediatric Acute Respiratory Distress Syndrome: Consensus Recommendations From the Pediatric Acute Lung Injury Consensus Conference. Pediatr Crit Care Med. 2015;16(5):428-439.",
        level: "Consensus Recommendation",
      },
    ],
    evidence: {
      source: "Pediatric Acute Lung Injury Consensus Conference (PALICC)",
      reference:
        "Pediatric Acute Lung Injury Consensus Conference Group. Pediatric Acute Respiratory Distress Syndrome: Consensus Recommendations From the Pediatric Acute Lung Injury Consensus Conference. Pediatr Crit Care Med. 2015;16(5):428-439.",
      version: "2015",
      updatedAt: "2026-08",
      references: [
        "Pediatric Acute Lung Injury Consensus Conference Group. Pediatr Crit Care Med. 2015;16(5):428-439. doi:10.1097/PCC.0000000000000350.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Oxygen Index is one component of oxygenation assessment in ventilated patients and must be interpreted with the full clinical context.",
  },

  "free-water-deficit": {
    commonMistakes: [
      "Applying the 0.6 total body water factor to a woman, when about 0.5 times weight is the commonly used assumption.",
      "Using the calculator in neonates or children without age-appropriate total body water assumptions.",
      "Treating the one-time deficit as a fixed infusion order rather than an estimate to be revised by serial sodium measurements."
    ],
    formulaExplanation:
      "Free water deficit = total body water x (current sodium / desired sodium - 1), where total body water is estimated as 0.6 x weight (kg). Negative values are reported as zero.",
    variables: [
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Body weight in kilograms; total body water is estimated as 0.6 x weight.",
      },
      {
        inputId: "currentNa",
        label: "Current Sodium",
        explanation: "Measured serum sodium in mmol/L, used as the numerator of the ratio.",
      },
      {
        inputId: "desiredNa",
        label: "Desired Sodium",
        explanation: "Target serum sodium in mmol/L, used as the denominator of the ratio.",
      },
    ],
    faq: [
          {
        "question": "How is the free water deficit calculated?",
        "answer": "The free water deficit is calculated as: TBW × (Current Na / Target Na − 1), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total liters of free water needed."
      },
      {
        "question": "How fast should I correct hypernatremia?",
        "answer": "Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours. Faster correction risks cerebral edema as water shifts into brain cells."
      },
      {
        "question": "Should I use D5W or hypotonic saline?",
        "answer": "D5W (which becomes free water after glucose metabolism) or hypotonic saline (0.45% NaCl) are commonly used. The choice depends on the patient's volume status—hypotonic saline for hypovolemic hypernatremia, D5W for euvolemic or hypervolemic patients."
      },
      {
        "question": "What if the patient has ongoing losses?",
        "answer": "Add estimated ongoing losses (GI losses, urinary output) to the calculated deficit. Ongoing losses must be replaced in addition to the free water deficit."
      }

  ],
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
    evidence: {
      source: "Nephrology / Fluids & Electrolytes",
      reference:
        "Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(21):1493-1499.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Adrogue HJ, Madias NE. N Engl J Med. 2000;342(21):1493-1499.",
        "Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372(1):55-65.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The free water deficit is an estimate and is not a prescription; correction of hypernatremia requires assessment of volume status, ongoing losses, and an individualized rate of correction.",
  },

  "basal-metabolic-rate": {
    commonMistakes: [
      "Reporting the BMR result as the patient's total daily energy needs without adding activity and the thermic effect of food.",
      "Using the Mifflin-St Jeor equation for a child or adolescent, where pediatric-specific equations are more appropriate.",
      "Entering height in inches or weight in pounds, because the equation is calibrated for centimeters and kilograms."
    ],
    faq: [
      {
        question: "What units does this calculator expect for its inputs?",
        answer: "Weight must be entered in kilograms, height in centimeters, and age in years, matching the constants of the Mifflin-St Jeor equation. The sex selection matters because the equation applies a different constant for men than for women. Output is in kilocalories per day, so entering pounds or inches produces an estimate that does not correspond to the patient."
      },
      {
        question: "Why does the calculator report every valid result as normal?",
        answer: "There is no single normal basal metabolic rate, because the estimate changes with age, sex, body size, and body composition, so every valid entry is reported as normal. For orientation, typical adult values fall roughly around 1,600-2,000 kcal/day in men and 1,400-1,800 kcal/day in women. Those figures are descriptive ranges rather than targets, and the result still requires individual clinical judgment."
      },
      {
        question: "When should indirect calorimetry be used instead of this estimate?",
        answer: "Indirect calorimetry is preferred in critically ill patients, where a measured energy expenditure is available. The equation does not account for body composition, muscle mass, fever, illness, or other metabolic stress, so its estimate drifts from reality in those settings. The result also covers only rest: activity and the thermic effect of food must be added separately before it can inform a daily energy plan."
      }
    ],
    formulaExplanation:
      "The Mifflin-St Jeor equation estimates BMR: males 10 x weight + 6.25 x height - 5 x age + 5; females 10 x weight + 6.25 x height - 5 x age - 161, with weight in kg, height in cm, and age in years.",
    variables: [
      {
        inputId: "sex",
        label: "Sex",
        explanation: "Biological sex, which selects the male (+5) or female (-161) constant.",
      },
      {
        inputId: "age",
        label: "Age",
        explanation: "Age in years, multiplied by -5.",
      },
      {
        inputId: "weight",
        label: "Weight",
        explanation: "Weight in kilograms, multiplied by 10.",
      },
      {
        inputId: "height",
        label: "Height",
        explanation: "Height in centimeters, multiplied by 6.25.",
      },
    ],
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
    evidence: {
      source: "Nutrition / Endocrinology",
      reference:
        "Mifflin MD, St Jeor ST, Hill LA, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. BMR estimates are approximations and do not replace measured energy expenditure in patients whose nutritional support is clinically critical.",
  },

  "edd": {
    commonMistakes: [
      "Starting the 280-day count from the last day of the period rather than the first day of the last menstrual period, which moves the due date several days later.",
      "Applying the 280-day rule to an irregular or poorly recalled menstrual cycle without adjustment, even though the method assumes a regular 28-day cycle.",
      "Keeping the LMP-based date when first-trimester ultrasound dating differs by more than 5-7 days, since ultrasound is considered the more reliable method in the first trimester."
    ],
    faq: [
      {
        question: "When should the LMP-based EDD be corrected by ultrasound?",
        answer: "First-trimester ultrasound dating by crown-rump length is considered more reliable than LMP dating and may supersede the LMP-based estimate when the discrepancy is typically greater than 5 to 7 days. After the first trimester ultrasound becomes less precise for establishing gestational age, so the earliest reliable dating available for the patient should guide care."
      },
      {
        question: "How does an irregular cycle affect the due date?",
        answer: "The Naegele rule assumes a regular 28-day cycle with ovulation about 14 days before the next menses. Longer or shorter cycles shift the true due date, and the calculator does not incorporate cycle length or regularity, or assisted-reproduction dating. When the cycle is irregular or the LMP is uncertain, the estimate should be confirmed or corrected by early ultrasound."
      },
      {
        question: "Can the EDD tell me if the pregnancy is viable?",
        answer: "No. The EDD is a dating estimate only; it does not assess viability, fetal well-being, or the timing of obstetric interventions, all of which require clinical assessment. The calculator adds 280 days to the LMP date and returns an anticipated date of birth that should be confirmed or refined with early ultrasound when available."
      }
    ],
    formulaExplanation:
      "Expected date of delivery = last menstrual period date + 280 days, corresponding to the Naegele rule of a 40-week gestation.",
    variables: [
      {
        inputId: "lmp",
        label: "Last Menstrual Period",
        explanation: "First day of the last menstrual period, the starting date to which 280 days are added.",
      },
    ],
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
    evidence: {
      source: "ACOG Committee Opinion",
      reference:
        "ACOG Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129(5):e150-e154.",
      version: "2017",
      updatedAt: "2026-08",
      references: [
        "ACOG Committee Opinion No. 700. Obstet Gynecol. 2017;129(5):e150-e154.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The expected date of delivery is an estimate based on the LMP and a 28-day cycle assumption; ultrasound dating should be used to confirm or correct the date when clinically indicated.",
  },

  "gestational-age": {
    commonMistakes: [
      "Entering 7 or more days in the days field instead of carrying the excess into weeks, even though the accepted range for days is 0 to 6.",
      "Interpreting the decimal remainder as a day count, when the fractional part represents a portion of a week and the value is simply the entered weeks and days expressed differently.",
      "Expecting the tool to derive gestational age from the last menstrual period date or ultrasound measurements, since it only converts an already determined weeks-plus-days age into decimal weeks."
    ],
    faq: [
      {
        question: "How do I convert decimal weeks back to weeks and days?",
        answer: "Take the whole number as completed weeks, then multiply the decimal remainder by 7 to recover the days. For example, 32 weeks 3 days is expressed as approximately 32.43 weeks, so multiplying that remainder by 7 returns about 3 days. Clinically the age is usually reported as completed weeks plus days, such as 32w3d, rather than as a decimal."
      },
      {
        question: "Does this calculator establish the gestational age for my patient?",
        answer: "No. It converts an age you have already determined from weeks and days into decimal form; it does not compute gestational age from the LMP date or from ultrasound biometry. The accuracy of the entered age depends entirely on how the pregnancy was dated, and the decimal output is the same age expressed differently, not a new clinical estimate."
      },
      {
        question: "Why are the input limits 0-42 weeks and 0-6 days?",
        answer: "These limits match the ranges clinicians use when documenting gestational age: days are counted 0 to 6 because a seventh day becomes one additional week, and 42 weeks covers the post-term range. Values outside these ranges usually indicate a data-entry error rather than a true gestational age."
      }
    ],
    formulaExplanation:
      "Gestational age = weeks + days / 7, expressed in weeks with the days as the fractional remainder.",
    variables: [
      {
        inputId: "weeks",
        label: "Weeks",
        explanation: "Completed weeks of gestation.",
      },
      {
        inputId: "days",
        label: "Days",
        explanation: "Additional days beyond the completed weeks, divided by 7.",
      },
    ],
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
    evidence: {
      source: "ACOG Committee Opinion",
      reference:
        "ACOG Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129(5):e150-e154.",
      version: "2017",
      updatedAt: "2026-08",
      references: [
        "ACOG Committee Opinion No. 700. Obstet Gynecol. 2017;129(5):e150-e154.",
      ],
    },

    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. Gestational age reflects the entered dating only and does not determine pregnancy viability or obstetric diagnosis.",
  },

  "adrenal-steroid-converter": {
    commonMistakes: [
      "Treating the 7.5 mg and 20 mg band edges as guideline-defined categories confuses this calculator's conventions with standardized dose thresholds.",
      "Assuming an equivalent prednisone dose carries equivalent mineralocorticoid effect ignores that hydrocortisone retains sodium-retaining activity while dexamethasone has essentially none.",
      "Using the converted equivalent as a tapering plan overlooks that the calculator does not model gradual dose reduction or monitoring intervals."
    ],
    formulaExplanation:
      "The entered dose is converted to its prednisone-equivalent dose by multiplying by the steroid's glucocorticoid equivalence factor, with the mineralocorticoid equivalent also reported.",
    variables: [
      {
        inputId: "dose",
        label: "Dose",
        explanation: "Dose of the source steroid in mg, multiplied by the equivalence factor.",
      },
      {
        inputId: "steroid",
        label: "Source Steroid",
        explanation: "The steroid being converted, which determines the glucocorticoid and mineralocorticoid equivalence factors.",
      },
    ],
    faq: [
          {
        "question": "How do I convert prednisone to dexamethasone?",
        "answer": "Prednisone 5 mg is approximately equivalent to dexamethasone 0.75 mg. Divide the prednisone dose by approximately 6.67 to get the dexamethasone equivalent."
      },
      {
        "question": "Why is hydrocortisone used for adrenal insufficiency?",
        "answer": "Hydrocortisone has both glucocorticoid and mineralocorticoid activity, making it the preferred replacement in adrenal insufficiency when given in divided doses to mimic physiological cortisol rhythm."
      },
      {
        "question": "Are steroid equivalences exact?",
        "answer": "No. These are approximations based on anti-inflammatory potency. Individual patient response varies based on metabolism, comorbidities, and the specific clinical condition."
      }

  ],
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
      "This calculator is intended for educational and clinical decision support purposes only. Glucocorticoid equivalence is approximate and is not a prescribing or tapering plan; formulation, route, indication, duration, and individual patient factors must be considered by the treating clinician.",
  },

  "levothyroxine-dose": {
    commonMistakes: [
      "Entering body weight in pounds instead of kilograms inflates the estimate because the 1.6 mcg/kg/day factor is defined per kilogram.",
      "Using the full-replacement estimate as the starting dose for an elderly patient with cardiac disease ignores that such patients generally start at 12.5 to 25 mcg.",
      "Assuming the result accounts for age, cardiac status, or pregnancy misreads the output, since body weight is the calculator's only input."
    ],
    formulaExplanation:
      "Estimated full-replacement levothyroxine dose = 1.6 micrograms/kg/day x body weight (kg). This is an approximation, not a universal starting dose.",
    variables: [
      {
        inputId: "weight",
        label: "Body Weight",
        explanation: "Body weight in kilograms, multiplied by approximately 1.6 micrograms/kg/day.",
      },
    ],
    faq: [
          {
        "question": "What is the difference between Thyroid Dose and Levothyroxine Dose calculators?",
        "answer": "Both use the same 1.6 µg/kg/day formula. Thyroid Dose provides the estimate, while Levothyroxine Dose includes clinical guidance on titration, cardiac precautions, and pregnancy adjustments."
      },
      {
        "question": "How quickly can levothyroxine dose be increased?",
        "answer": "In healthy patients, dose can be titrated every 6–8 weeks. In elderly or cardiac patients, increase more slowly (every 6–12 weeks)."
      },
      {
        "question": "Does levothyroxine need to be taken on an empty stomach?",
        "answer": "Yes. Take 30–60 minutes before breakfast with water only. Separate from calcium, iron supplements, and PPIs."
      }

  ],
    clinicalPurpose:
      "Estimates a weight-based levothyroxine dose (≈1.6 µg/kg/day) using the calculator's implemented equation, illustrating the weight-based reference point used when starting levothyroxine replacement.",
    howToUse: [
      "Enter body weight in kg.",
      "The calculator returns the total daily dose in µg based on 1.6 µg/kg/day.",
      "Use the estimate as a weight-based reference point, not a prescription; doses are titrated to a target TSH.",
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
      "This calculator is intended for educational and clinical decision support purposes only. The result is not a prescription: actual starting doses are individualized, current treatment guidance and patient factors must be considered, and this calculator does not apply any automatic adjustment for age, cardiac disease, or pregnancy.",
    evidence: {
      source: "Endocrinology",
      reference: "Jonklaas J, et al. Thyroid. 2014;24(12):1670-1751.",
      version: "2014",
      updatedAt: "2026-08",
      references: [
        "Jonklaas J, et al. Thyroid. 2014;24(12):1670-1751.",
      ],
    },
  },
  "alvarado-score": {
    commonMistakes: [
      "Awarding only 1 point for right lower quadrant tenderness or leukocytosis when each of these items is worth 2 points.",
      "Treating a score below 5 as definitively excluding appendicitis, which a negative score cannot do.",
      "Relying on the score in pregnant women, elderly patients, or young children, where its sensitivity is lower."
    ],
    formulaExplanation:
      "The Alvarado (MANTRELS) score sums eight items: migration of pain to the RLQ (1), anorexia (1), nausea/vomiting (1), RLQ tenderness (2), rebound pain (1), fever (1), leukocytosis (2), and left shift/neutrophilia (1), for a total of 0-10. Higher totals indicate greater probability of acute appendicitis.",
    variables: [
      {
        inputId: "migration",
        label: "Migration of Pain to RLQ",
        explanation: "Pain migrating to the right lower quadrant; Yes adds 1 point.",
      },
      {
        inputId: "anorexia",
        label: "Anorexia",
        explanation: "Anorexia; Yes adds 1 point.",
      },
      {
        inputId: "nausea",
        label: "Nausea / Vomiting",
        explanation: "Nausea or vomiting; Yes adds 1 point.",
      },
      {
        inputId: "rlq-tenderness",
        label: "Tenderness in Right Lower Quadrant",
        explanation: "RLQ tenderness; Yes adds 2 points.",
      },
      {
        inputId: "rebound",
        label: "Rebound Pain (Rebound Tenderness)",
        explanation: "Rebound tenderness; Yes adds 1 point.",
      },
      {
        inputId: "fever",
        label: "Fever",
        explanation: "Temperature 37.3 C (99.1 F) or higher; Yes adds 1 point.",
      },
      {
        inputId: "leukocytosis",
        label: "Leukocytosis",
        explanation: "WBC over 10,000/microL; Yes adds 2 points.",
      },
      {
        inputId: "left-shift",
        label: "Left Shift",
        explanation: "Neutrophilia over 75%; Yes adds 1 point.",
      },
    ],
    faq: [
          {
        "question": "What is the Alvarado score?",
        "answer": "The Alvarado score (MANTRELS) is a clinical scoring system that estimates the probability of acute appendicitis based on 8 clinical and laboratory parameters: Migration of pain, Anorexia, Nausea/vomiting, Tenderness in the right lower quadrant, Rebound pain, Fever, Leukocytosis, and left Shift (neutrophilia)."
      },
      {
        "question": "What does a score of 7 or higher mean?",
        "answer": "A score of 7–8 is considered high probability for appendicitis and strongly supports surgical consultation and consideration for appendectomy. A score of 9–10 is very high probability."
      },
      {
        "question": "Can appendicitis be present with a low score?",
        "answer": "Yes. The Alvarado score has a sensitivity of approximately 75–95% depending on the study. A low score does not definitively exclude appendicitis, particularly in atypical populations (elderly, pregnant women, young children)."
      },
      {
        "question": "How does the Alvarado score compare to CT imaging?",
        "answer": "CT imaging has higher sensitivity and specificity than the Alvarado score for appendicitis. The Alvarado score is a clinical screening tool that helps determine which patients should proceed to imaging. CT is the gold standard for definitive diagnosis."
      },
      {
        "question": "Is the Alvarado score reliable in children?",
        "answer": "The Alvarado score has been validated in pediatric populations but may be less reliable in very young children. The Pediatric Appendicitis Score (PAS) is an alternative specifically designed for children."
      }

  ],
    clinicalPurpose:
      "Risk-stratifies patients with suspected acute appendicitis using the Alvarado (MANTRELS) scoring system to assist clinical decision-making regarding imaging, observation, and surgical consultation.",
    howToUse: [
      "Assess each of the 8 MANTRELS criteria and assign 1 point each for Migration, Anorexia, Nausea/Vomiting, Rebound, Fever, Left Shift, 2 points for RLQ Tenderness, and 2 points for Leukocytosis.",
      "Sum all points for a total score out of 10.",
      "Score ≤4: low probability — consider alternative diagnoses.",
      "Score 5–6: moderate probability — clinical observation, serial examination, and imaging recommended.",
      "Score 7–8: high probability — strong consideration for surgical consultation and CT or ultrasound imaging.",
      "Score 9–10: very high probability — urgent surgical consultation warranted.",
    ],
    interpretation: {
      guide:
        "A score of 7 or higher strongly suggests appendicitis and warrants strong consideration for surgical intervention. A score of 5–6 is equivocal and typically requires further imaging or observation. A score below 5 has low probability but does not exclude appendicitis.",
    },
    clinicalSignificance:
      "The Alvarado score (MANTRELS) was described by Alvarado in 1986 and has been extensively validated for acute appendicitis screening. It uses 8 clinical and laboratory parameters. CT imaging remains the gold standard for appendicitis confirmation in adults.",
    whenToUse: [
      "Adult patients presenting with acute abdominal pain suspicious for appendicitis",
      "Initial clinical screening before imaging",
      "Resource-limited settings where CT imaging is not immediately available",
    ],
    whenNotToUse: [
      "As a sole basis for operative decision-making",
      "In pregnant women, elderly patients, or young children where the score has lower sensitivity",
      "When CT imaging is readily available and clinical suspicion is moderate to high",
    ],
    limitations: [
      "Lower sensitivity in elderly patients, pregnant women, and young children.",
      "Does not replace clinical judgment or imaging studies.",
      "A negative score does not definitively exclude appendicitis.",
    ],
    example: {
      description: "A 25-year-old male presents with migrating abdominal pain, anorexia, nausea, RLQ tenderness, and fever.",
      inputs: {
        migration: "1",
        anorexia: "1",
        nausea: "1",
        "rlq-tenderness": "2",
        rebound: "0",
        fever: "1",
        leukocytosis: "0",
        "left-shift": "0",
      },
      expectedResult:
        "Score = 1 + 1 + 1 + 2 + 0 + 1 + 0 + 0 = 6 — moderate probability; clinical observation and imaging recommended.",
    },
    references: [
      {
        citation: "Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986;15(5):557-564.",
        level: "Diagnostic study",
      },
      {
        citation: "Ohmann C, et al. Systematic review of scores for diagnosing acute appendicitis. Dig Surg. 1999;16(6):449-457.",
        level: "Systematic review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The Alvarado score is a screening tool and should not replace clinical judgment, imaging studies, or specialist consultation.",
    evidence: {
      source: "Emergency Medicine",
      reference: "Alvarado A. Ann Emerg Med. 1986;15(5):557-564.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Alvarado A. Ann Emerg Med. 1986;15(5):557-564.",
        "Ohmann C, et al. Dig Surg. 1999;16(6):449-457.",
      ],
    },
  },
  "corrected-magnesium": {
    commonMistakes: [
      "Entering serum albumin in g/dL instead of the specified g/L, which invalidates the correction because the reference value is 40 g/L.",
      "Applying the correction in neonates or pediatric patients, where magnesium binding dynamics differ and the formula is not validated.",
      "Using the corrected value in place of ionized magnesium when a reliable ionized measurement is available."
    ],
    formulaExplanation:
      "Corrected magnesium = measured magnesium (mmol/L) + 0.005 x (40 - serum albumin in g/L). The correction raises the reported magnesium when albumin is low, because less magnesium is protein-bound and measured total magnesium underestimates the physiologically active level.",
    variables: [
      {
        inputId: "magnesium",
        label: "Measured Serum Magnesium",
        explanation: "Measured total serum magnesium in mmol/L, used as the baseline value.",
      },
      {
        inputId: "albumin",
        label: "Serum Albumin",
        explanation: "Serum albumin in g/L; each 1 g/L below 40 adds 0.005 mmol/L to the corrected magnesium.",
        commonError: "Enter albumin in g/L (not g/dL); using g/dL shifts the correction by a factor of ten.",
      },
    ],
    faq: [
          {
        "question": "Why should I correct magnesium for albumin?",
        "answer": "About 25–30% of serum magnesium is bound to albumin. When albumin is low (hypoalbuminemia), measured total magnesium appears falsely low even though ionized magnesium may be normal. The correction estimates what total magnesium would be at a normal albumin of 40 g/L."
      },
      {
        "question": "What does a corrected magnesium below normal mean?",
        "answer": "A corrected magnesium below 0.75 mmol/L suggests true hypomagnesemia. Common causes include gastrointestinal losses (vomiting, diarrhea), renal wasting (diuretics), malnutrition, alcohol use disorder, and critical illness. Hypomagnesemia can cause cardiac arrhythmias, seizures, and refractory hypokalemia."
      },
      {
        "question": "Is ionized magnesium better than corrected magnesium?",
        "answer": "Yes. Ionized (free) magnesium directly measures the biologically active fraction and is not affected by albumin. However, ionized magnesium assays require specialized analyzers that are not available in all clinical settings. The corrected magnesium is a practical alternative."
      },
      {
        "question": "How does this differ from corrected calcium?",
        "answer": "Both correct for albumin-binding effects, but they use different coefficients. Calcium uses 0.8 (g/dL units) because ~40–50% of calcium binds to albumin. Magnesium uses 0.005 (g/L units) because only ~25–30% binds to albumin. They are distinct analytes with distinct clinical implications."
      },
      {
        "question": "When should I NOT use this correction?",
        "answer": "Avoid using this correction in neonates (different binding dynamics), when ionized magnesium testing is available and reliable, or when acid-base disturbances or hyperphosphatemia are present (these alter magnesium binding independently of albumin)."
      }

  ],
    clinicalPurpose:
      "Adjusts measured serum magnesium for hypoalbuminemia. When serum albumin is low, measured total magnesium is falsely reduced because less magnesium is bound to proteins.",
    howToUse: [
      "Enter the measured serum magnesium in mmol/L.",
      "Enter the serum albumin in g/L.",
      "The calculator applies the correction: Corrected Mg = Measured Mg + 0.005 × (40 − Albumin).",
      "Use the corrected value for clinical interpretation of magnesium status.",
    ],
    interpretation: {
      guide:
        "A corrected magnesium below 0.75 mmol/L suggests true hypomagnesemia. A value above 1.05 mmol/L suggests hypermagnesemia. The correction is most useful when albumin is significantly reduced (e.g., critical illness, liver disease, nephrotic syndrome).",
    },
    clinicalSignificance:
      "Approximately 25–30% of serum magnesium binds to albumin. When albumin falls, measured total magnesium decreases proportionally even though ionized (biologically active) magnesium may remain normal. This correction is analogous to the corrected calcium formula.",
    whenToUse: [
      "Patients with hypoalbuminemia (critical illness, liver disease, nephrotic syndrome, malnutrition)",
      "When measured total magnesium appears low but clinical signs of hypomagnesemia are absent",
      "To avoid unnecessary magnesium supplementation in hypoalbuminemic patients",
    ],
    whenNotToUse: [
      "When ionized magnesium measurement is available and reliable",
      "In neonates or pediatric populations (different binding dynamics)",
      "When acid-base disturbances or hyperphosphatemia are present (alter magnesium binding independently)",
    ],
    limitations: [
      "Does not replace ionized magnesium measurement when available.",
      "Not validated in neonates or pediatric populations.",
      "Results become less reliable when albumin is extremely low (<20 g/L).",
      "Concurrent acid-base disturbances and hyperphosphatemia can reduce correction accuracy.",
    ],
    example: {
      description: "A patient with liver cirrhosis has a measured magnesium of 0.7 mmol/L and albumin of 20 g/L.",
      inputs: {
        magnesium: "0.7",
        albumin: "20",
      },
      expectedResult:
        "Corrected Mg = 0.7 + 0.005 × (40 − 20) = 0.7 + 0.1 = 0.8 mmol/L — within normal range, suggesting the measured value was falsely low due to hypoalbuminemia.",
    },
    references: [
      {
        citation: "Kroll MH, Elin RJ. Relationships between magnesium and protein concentrations in serum. Clin Chem. 1985;31(2):326-327.",
        level: "Laboratory study",
      },
      {
        citation: "Costello RB, et al. Perspective: The case for an evidence-based reference interval for serum magnesium. Adv Nutr. 2016;7(6):977-993.",
        level: "Review",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. The corrected magnesium is an estimate; direct ionized magnesium measurement is the gold standard when available.",
    evidence: {
      source: "Clinical Chemistry",
      reference: "Kroll MH, Elin RJ. Clin Chem. 1985;31(2):326-327.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Kroll MH, Elin RJ. Clin Chem. 1985;31(2):326-327.",
        "Costello RB, et al. Adv Nutr. 2016;7(6):977-993.",
      ],
    },
  },
  "kdigo-aki-staging": {
    commonMistakes: [
      "Selecting the wrong baseline creatinine, since the same current creatinine can produce a different stage depending on the baseline chosen.",
      "Failing to assign the highest stage when both creatinine and urine output criteria are met, resulting in under-staging.",
      "Attributing the low urine output stage to intrinsic kidney injury without accounting for diuretics, catheter patency, or recent volume status."
    ],
    formulaExplanation:
      "KDIGO AKI staging assigns the highest stage met by creatinine or urine-output criteria. Creatinine: stage 1 = rise of 0.3 mg/dL or more or 1.5-1.9x baseline, stage 2 = 2.0-2.9x baseline, stage 3 = 3.0x baseline or more, current creatinine 4.0 mg/dL or more, or renal replacement therapy. Urine output: stage 1 = under 0.5 mL/kg/h for 6-12 h, stage 2 = under 0.5 mL/kg/h for 12 h or more or under 0.3 for 12-24 h, stage 3 = under 0.3 mL/kg/h for 24 h or more. Any renal replacement therapy is automatically stage 3.",
    variables: [
      {
        inputId: "baseline-creatinine",
        label: "Baseline Serum Creatinine",
        explanation: "Baseline serum creatinine in mg/dL, used as the denominator for the creatinine ratio.",
      },
      {
        inputId: "current-creatinine",
        label: "Current Serum Creatinine",
        explanation: "Current serum creatinine in mg/dL, compared with baseline or to the absolute 4.0 mg/dL threshold.",
      },
      {
        inputId: "weight",
        label: "Patient Weight",
        explanation: "Body weight in kg, used with the urine output rate to assess urine-output criteria.",
      },
      {
        inputId: "urine-output-rate",
        label: "Urine Output Rate",
        explanation: "Urine output rate in mL/kg/h, compared with the 0.5 and 0.3 thresholds.",
      },
      {
        inputId: "urine-output-duration",
        label: "Duration of Low Urine Output",
        explanation: "Duration in hours that the urine output rate has been low, determining the urine-output stage.",
      },
      {
        inputId: "on-rrt",
        label: "Currently on Renal Replacement Therapy",
        explanation: "Yes automatically assigns stage 3 regardless of creatinine or urine output.",
      },
    ],
    faq: [
          {
        "question": "What is KDIGO AKI staging?",
        "answer": "KDIGO AKI staging is an international classification system for acute kidney injury severity. It uses serum creatinine changes and urine output measurements to assign stages 1–3, with Stage 3 being the most severe."
      },
      {
        "question": "How is the AKI stage determined when both creatinine and urine output criteria are met?",
        "answer": "The highest applicable stage is assigned. For example, if creatinine criteria meet Stage 1 but urine output criteria meet Stage 2, the final stage is Stage 2."
      },
      {
        "question": "What if I don't have a baseline creatinine?",
        "answer": "If no baseline creatinine is available, use the lowest creatinine value from the preceding 7 days, or estimate baseline using the MDRD or CKD-EPI equation assuming normal kidney function. Clinical judgment is essential."
      },
      {
        "question": "Does AKI staging include the cause of kidney injury?",
        "answer": "No. KDIGO staging classifies severity but does not distinguish between prerenal, intrarenal (structural), or postrenal causes. The underlying etiology must be determined separately."
      },
      {
        "question": "How does KDIGO differ from RIFLE and AKIN?",
        "answer": "KDIGO is the most current standard (2012) and incorporates elements of both RIFLE (2004) and AKIN (2007). KDIGO uses both creatinine and urine output criteria, defines AKI based on changes within 48 hours or 7 days, and is the recommended classification in current clinical practice."
      }

  ],
    clinicalPurpose:
      "Classifies acute kidney injury (AKI) severity using the KDIGO 2012 criteria based on serum creatinine changes and urine output.",
    howToUse: [
      "Enter baseline creatinine (lowest in past 7 days) if available.",
      "Enter current serum creatinine.",
      "If assessing urine output criteria, enter patient weight, average urine output rate, and duration.",
      "Indicate whether the patient is currently on renal replacement therapy (RRT).",
      "The calculator assigns the highest applicable stage from either creatinine or urine output criteria.",
    ],
    interpretation: {
      guide:
        "Stage 0: No AKI. Stage 1: Cr rise ≥0.3 mg/dL or 1.5–1.9× baseline; UO <0.5 mL/kg/h for 6–12h. Stage 2: Cr 2.0–2.9× baseline; UO <0.5 mL/kg/h for ≥12h. Stage 3: Cr ≥3.0× baseline or ≥4.0 mg/dL or RRT; UO <0.3 mL/kg/h for ≥24h.",
    },
    clinicalSignificance:
      "The KDIGO 2012 guidelines define AKI using serum creatinine and urine output criteria. AKI is staged 1–3 based on severity. The highest applicable stage from either criterion is assigned. KDIGO staging is the current international standard for AKI classification.",
    whenToUse: [
      "All patients with suspected or confirmed acute kidney injury",
      "For severity classification and prognosis communication",
      "To guide clinical management decisions regarding monitoring intensity and nephrology consultation",
    ],
    whenNotToUse: [
      "To determine the cause of AKI (prerenal, intrarenal, postrenal)",
      "As a standalone diagnostic tool without clinical assessment",
      "To replace serial creatinine measurements for tracking trajectory",
    ],
    limitations: [
      "Does not account for the cause of AKI (prerenal, intrarenal, postrenal).",
      "CKD patients may have a higher baseline creatinine, affecting staging accuracy.",
      "Single creatinine measurements may not capture the trajectory; serial measurements are preferred.",
      "Urine output criteria require accurate intake/output monitoring over the specified duration.",
    ],
    example: {
      description: "A patient's baseline creatinine was 1.0 mg/dL; current creatinine is 2.5 mg/dL.",
      inputs: {
        "baseline-creatinine": "1.0",
        "current-creatinine": "2.5",
        "on-rrt": "no",
      },
      expectedResult:
        "Ratio = 2.5/1.0 = 2.5× baseline → KDIGO Stage 2 AKI. Consider urgent nephrology consultation and renal ultrasound.",
    },
    references: [
      {
        citation: "KDIGO Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1-138.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. KDIGO staging should be used in conjunction with clinical assessment and is not a standalone diagnostic tool.",
    evidence: {
      source: "Nephrology",
      reference: "KDIGO AKI Work Group. Kidney Int Suppl. 2012;2(1):1-138.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "KDIGO AKI Work Group. Kidney Int Suppl. 2012;2(1):1-138.",
        "Bellomo R, et al. Intensive Care Med. 2004;30(8):1417-1425.",
      ],
    },
  },
  "saag": {
    commonMistakes: [
      "Reversing the order and subtracting serum albumin from ascitic albumin, which inverts the direction of the gradient.",
      "Measuring serum and ascitic albumin at different times rather than simultaneously, which reduces accuracy.",
      "Using the SAAG to identify the specific cause of ascites rather than only classifying it as portal hypertensive or not."
    ],
    formulaExplanation:
      "SAAG = serum albumin minus ascitic fluid albumin, rounded to one decimal place. A gradient of 1.1 g/dL or higher indicates portal hypertension, while a gradient below 1.1 g/dL suggests a non-portal hypertensive cause of ascites.",
    variables: [
      {
        inputId: "serum-albumin",
        label: "Serum Albumin",
        explanation: "Serum albumin in g/dL, the minuend of the gradient.",
      },
      {
        inputId: "ascites-albumin",
        label: "Ascitic Fluid Albumin",
        explanation: "Ascitic fluid albumin in g/dL, subtracted from the serum albumin.",
      },
    ],
    faq: [
          {
        "question": "What is SAAG and how is it calculated?",
        "answer": "SAAG (Serum-Ascites Albumin Gradient) is the difference between serum albumin and ascitic fluid albumin, both measured in g/dL. It is calculated as: SAAG = Serum albumin − Ascites albumin."
      },
      {
        "question": "What does a SAAG ≥1.1 g/dL mean?",
        "answer": "A SAAG ≥1.1 g/dL indicates that portal hypertension is the cause of ascites. Common causes include liver cirrhosis, congestive heart failure, and Budd-Chiari syndrome. The gradient is maintained because the elevated hydrostatic pressure in the portal system forces albumin-rich fluid into the peritoneal cavity."
      },
      {
        "question": "What does a SAAG <1.1 g/dL mean?",
        "answer": "A SAAG <1.1 g/dL indicates non-portal hypertensive causes of ascites, such as peritoneal carcinomatosis, tuberculosis, nephrotic syndrome, or pancreatic ascites. These conditions cause ascites through mechanisms other than elevated portal pressure."
      },
      {
        "question": "When should SAAG not be used?",
        "answer": "SAAG may be unreliable in mixed ascites (e.g., cirrhosis with concurrent cancer), severe hypoalbuminemia (serum albumin <2.8 g/dL), or when serum and ascitic fluid samples are not collected simultaneously."
      },
      {
        "question": "How does SAAG compare to the transudate/exudate classification?",
        "answer": "SAAG is superior to the traditional transudate/exudate classification (based on ascitic fluid protein) for classifying ascites. SAAG correctly classifies >90% of ascites, while the protein-based method misclassifies up to 20-30% of cases due to the confounding effect of serum albumin."
      }

  ],
    clinicalPurpose:
      "Calculates the Serum-Ascites Albumin Gradient (SAAG) to classify ascites as portal hypertensive (SAAG ≥1.1 g/dL) or non-portal hypertensive (SAAG <1.1 g/dL). This is the first-line diagnostic tool for ascites workup.",
    howToUse: [
      "Obtain serum albumin and ascitic fluid albumin from the same blood draw.",
      "Enter both values in g/dL (multiply g/L by 0.1 to convert).",
      "The calculator computes the gradient and classifies the ascites.",
      "SAAG ≥1.1 g/dL indicates portal hypertension as the cause of ascites.",
      "SAAG <1.1 g/dL indicates non-portal hypertensive causes.",
    ],
    interpretation: {
      guide:
        "SAAG ≥1.1 g/dL is consistent with portal hypertension (cirrhosis, heart failure, Budd-Chiari). SAAG <1.1 g/dL suggests peritoneal carcinomatosis, tuberculosis, nephrotic syndrome, or pancreatic ascites. The gradient must be interpreted alongside ascitic fluid cell count, protein, glucose, and cytology.",
    },
    whenToUse: [
      "Any patient with new-onset or unexplained ascites",
      "Initial workup to classify ascites etiology",
      "When the cause of ascites is uncertain",
      "Before deciding on further diagnostic testing (e.g., diagnostic paracentesis)",
    ],
    whenNotToUse: [
      "When the cause of ascites is clinically obvious (e.g., known decompensated cirrhosis with typical features)",
      "In mixed ascites (cirrhosis with concurrent peritoneal carcinomatosis)",
      "When serum albumin is <2.8 g/dL (may reduce accuracy)",
    ],
    limitations: [
      "SAAG must be measured simultaneously from serum and ascitic fluid.",
      "Hypoalbuminemia (<2.8 g/dL) may reduce SAAG accuracy.",
      "SAAG is unreliable in mixed ascites.",
      "Does not identify the specific cause of portal hypertension or non-portal hypertensive ascites.",
    ],
    example: {
      description:
        "A patient with known cirrhosis presents with new-onset ascites. Serum albumin is 3.2 g/dL and ascitic fluid albumin is 1.0 g/dL.",
      inputs: {
        "serum-albumin": "3.2",
        "ascites-albumin": "1.0",
      },
      expectedResult:
        "SAAG = 3.2 − 1.0 = 2.2 g/dL (≥1.1 g/dL). Consistent with portal hypertension from cirrhosis.",
    },
    clinicalSignificance:
      "SAAG is the single most reliable test for classifying ascites, replacing the older transudate/exudate classification. It correctly identifies portal hypertension with >90% accuracy and guides the subsequent diagnostic workup.",
    references: [
      {
        citation: "Boyer TD, Kahn AM, Reynolds TB. Arch Intern Med. 1968;122(5):425-428.",
        level: "Diagnostic study",
      },
      {
        citation: "Runyon BA, Hoefs JC, Morgenthaler US. N Engl J Med. 1983;309(22):1340-1344.",
        level: "Validation study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. SAAG should be interpreted with ascitic fluid analysis and clinical context. It does not replace comprehensive clinical assessment.",
    evidence: {
      source: "Gastroenterology",
      reference: "Boyer TD, et al. Arch Intern Med. 1968;122(5):425-428.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Boyer TD, et al. Arch Intern Med. 1968;122(5):425-428.",
        "Runyon BA, et al. N Engl J Med. 1983;309(22):1340-1344.",
      ],
    },
  },
  "rumack-matthew": {
    commonMistakes: [
      "Applying the nomogram to a level drawn before 4 hours after ingestion, when it is not valid.",
      "Using the nomogram for repeated supratherapeutic or staggered ingestions instead of a single acute ingestion with known timing.",
      "Withholding N-acetylcysteine from a patient with hepatotoxicity because the level falls below the treatment line."
    ],
    formulaExplanation:
      "The Rumack-Matthew nomogram compares the serum acetaminophen level to a time-dependent treatment threshold, threshold (mcg/mL) = exp(5.33252 - 0.08047 x hours since ingestion). If the level is at or above the threshold between 4 and 24 hours after ingestion, N-acetylcysteine treatment is indicated; the nomogram is not valid before 4 hours or after 24 hours.",
    variables: [
      {
        inputId: "time-since-ingestion",
        label: "Time Since Ingestion",
        explanation: "Hours since the acute ingestion, used to compute the treatment threshold. Values under 4 h or over 24 h fall outside the valid nomogram window.",
      },
      {
        inputId: "acetaminophen-level",
        label: "Serum Acetaminophen Level",
        explanation: "Serum acetaminophen concentration in mcg/mL, compared with the time-based threshold.",
      },
    ],
    faq: [
          {
        "question": "What is the Rumack-Matthew nomogram?",
        "answer": "The Rumack-Matthew nomogram is a graphical tool that plots serum acetaminophen concentration against time since ingestion. A treatment line defines the threshold above which N-acetylcysteine (NAC) treatment is recommended to prevent hepatotoxicity."
      },
      {
        "question": "When is the nomogram applicable?",
        "answer": "The nomogram is applicable ONLY for a single acute ingestion (one time ingestion) with a KNOWN time of ingestion. It is valid for serum levels obtained 4 to 24 hours after ingestion. It does NOT apply to repeated ingestions, chronic use, or staggered ingestions."
      },
      {
        "question": "What if the time of ingestion is unknown?",
        "answer": "If the time of ingestion is unknown, the nomogram cannot be used. In this case, obtain acetaminophen level, hepatic function tests (AST, ALT, INR), and renal function. Treat with NAC if there is any concern for toxicity, and consult toxicology."
      },
      {
        "question": "What if the level is obtained before 4 hours?",
        "answer": "Levels obtained before 4 hours post-ingestion may not have peaked and are unreliable for ruling out toxicity. Repeat the level at 4 hours or later. If there is clinical concern, start NAC and recheck."
      },
      {
        "question": "Does this nomogram apply to sustained-release acetaminophen?",
        "answer": "The nomogram is not validated for sustained-release formulations. For sustained-release ingestion, consider prolonged monitoring and consult toxicology, as peak levels may be delayed."
      }

  ],
    clinicalPurpose:
      "Determines whether N-acetylcysteine (NAC) treatment is indicated following a single acute acetaminophen ingestion, based on the serum acetaminophen concentration and time since ingestion.",
    howToUse: [
      "Confirm the ingestion was a single acute event with a known time of ingestion.",
      "Obtain a serum acetaminophen level at 4 or more hours after ingestion.",
      "Enter the time since ingestion (hours) and the serum level (mcg/mL).",
      "The calculator computes the treatment threshold at that time point.",
      "If the level is at or above the threshold, initiate NAC per institutional protocol.",
    ],
    interpretation: {
      guide:
        "Level at or above treatment threshold: Initiate NAC therapy. Level below treatment threshold: NAC not indicated for single acute ingestion with known timing. The nomogram is valid only for 4–24 hours post-ingestion.",
    },
    whenToUse: [
      "Single acute acetaminophen ingestion with known time of ingestion",
      "Serum acetaminophen level obtained 4–24 hours post-ingestion",
      "To determine need for N-acetylcysteine (NAC) treatment",
    ],
    whenNotToUse: [
      "Repeated supratherapeutic ingestion or chronic use",
      "Staggered ingestion (multiple doses over time)",
      "Unknown time of ingestion",
      "Sustained-release formulations (different pharmacokinetics)",
      "Patients presenting with hepatotoxicity (treat with NAC regardless of level)",
    ],
    limitations: [
      "Valid only for single acute ingestion with known timing.",
      "Valid only for levels obtained 4–24 hours post-ingestion.",
      "Does not apply to repeated, staggered, or chronic ingestion.",
      "Does not account for co-ingestants or individual patient factors.",
      "Clinical toxicology consultation supersedes this calculator when uncertainty exists.",
    ],
    example: {
      description:
        "A patient ingested a single acute dose of acetaminophen. At 6 hours post-ingestion, the serum level is 120 mcg/mL.",
      inputs: {
        "time-since-ingestion": "6",
        "acetaminophen-level": "120",
      },
      expectedResult:
        "Treatment threshold at 6h ≈ 130 mcg/mL. Level 120 mcg/mL is BELOW the threshold — NAC not indicated for this single acute ingestion.",
    },
    clinicalSignificance:
      "The Rumack-Matthew nomogram is the standard tool for determining NAC treatment in acute acetaminophen overdose in the United States. Early NAC treatment is highly effective at preventing hepatotoxicity when initiated within 8 hours of ingestion.",
    references: [
      {
        citation: "Rumack BH, Matthew H. Pediatrics. 1975;55(6):871-876.",
        level: "Original description",
      },
      {
        citation: "Smilkstein MJ, et al. N Engl J Med. 1988;319(24):1557-1562.",
        level: "Validation study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. For acetaminophen overdose, always consult clinical toxicology and follow institutional protocols. This calculator does not replace clinical judgment.",
    evidence: {
      source: "Emergency Medicine",
      reference: "Rumack BH, Matthew H. Pediatrics. 1975;55(6):871-876.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Rumack BH, Matthew H. Pediatrics. 1975;55(6):871-876.",
        "Smilkstein MJ, et al. N Engl J Med. 1988;319(24):1557-1562.",
      ],
    },
  },
  "bode-index": {
    commonMistakes: [
      "Entering the FEV1 in liters instead of FEV1 percent predicted, which the airflow obstruction subscore requires.",
      "Adding the mMRC grade directly as points, when grades 0-1 both score 0 and grade 4 scores 3 rather than 4.",
      "Performing the assessment during an acute exacerbation, when dyspnea and walk distance temporarily worsen the result."
    ],
    formulaExplanation:
      "The BODE index sums four weighted subscores each 0-3: BMI (1 point if 21 kg/m2 or lower, else 0; capped at 1), FEV1 % predicted (0 for >= 65, 1 for 50-64, 2 for 36-49, 3 for < 36), mMRC dyspnea grade (0 for <= 1, 1 for 2, 2 for 3, 3 for 4), and 6-minute walk distance (0 for >= 350 m, 1 for 250-349, 2 for 150-249, 3 for < 150), for a total of 0-10. Higher totals predict greater 4-year mortality.",
    variables: [
      {
        inputId: "bmi",
        label: "Body Mass Index (BMI)",
        explanation: "BMI in kg/m2; 21 or lower contributes 1 point to the BMI subscore.",
      },
      {
        inputId: "fev1-percent",
        label: "FEV1 % Predicted",
        explanation: "FEV1 as a percentage of predicted, contributing 0-3 points across the defined bands.",
      },
      {
        inputId: "mmrc-dyspnea",
        label: "mMRC Dyspnea Grade",
        explanation: "mMRC dyspnea grade (0-4), mapped to 0-3 points.",
      },
      {
        inputId: "six-minute-walk",
        label: "6-Minute Walk Distance",
        explanation: "Six-minute walk distance in meters, contributing 0-3 points across the defined bands.",
      },
    ],
    faq: [
          {
        "question": "What does the BODE Index measure?",
        "answer": "The BODE Index is a composite score (0–10) that combines four validated predictors of mortality in COPD: Body mass index (B), airflow Obstruction (O, measured by FEV1 % predicted), Dyspnea (D, measured by mMRC scale), and Exercise capacity (E, measured by 6-minute walk distance)."
      },
      {
        "question": "What does a high BODE score mean?",
        "answer": "A higher BODE score indicates worse prognosis. Scores 0–2 have ~10% 4-year mortality, while scores 7–10 have ~80% 4-year mortality. Scores ≥7 should prompt consideration of lung transplant referral and advanced care planning."
      },
      {
        "question": "How often should BODE be reassessed?",
        "answer": "BODE should be reassessed at least annually in stable COPD patients, and more frequently (every 3–6 months) in patients with moderate-to-severe disease or during exacerbation recovery."
      },
      {
        "question": "Can BODE Index guide lung transplant decisions?",
        "answer": "Yes. A BODE score ≥7 is associated with very high mortality and is one indicator for lung transplant referral. However, transplant decisions involve multiple factors including comorbidities, functional status, and patient preferences."
      },
      {
        "question": "Is BODE Index validated for all COPD patients?",
        "answer": "BODE was validated in stable COPD patients. It may be less reliable during acute exacerbations, in very elderly patients, or in patients with significant comorbidities affecting exercise capacity."
      }

  ],
    clinicalPurpose:
      "Multidimensional prognostic index for COPD based on Body mass index, airflow Obstruction, Dyspnea, and Exercise capacity. Predicts mortality and guides treatment decisions including transplant evaluation.",
    howToUse: [
      "Enter patient BMI (kg/m²), FEV1 % predicted, mMRC dyspnea grade (0–4), and 6-minute walk distance (meters).",
      "The calculator scores each component and sums to a BODE Index (0–10).",
      "Score 0–2: Low risk (~10% 4-year mortality).",
      "Score 3–4: Moderate risk (~25% 4-year mortality).",
      "Score 5–6: High risk (~50% 4-year mortality).",
      "Score 7–10: Very high risk (~80% 4-year mortality). Consider lung transplant referral.",
    ],
    interpretation: {
      guide:
        "Higher BODE scores indicate worse prognosis. The BODE Index is superior to FEV1 alone for predicting mortality. Scores ≥7 should prompt consideration of lung transplant referral and advanced care planning.",
    },
    whenToUse: [
      "Stable COPD patients for mortality risk assessment",
      "Guiding treatment intensity and rehabilitation referrals",
      "Evaluating lung transplant candidacy",
      "Tracking disease progression over time",
    ],
    whenNotToUse: [
      "During acute COPD exacerbations (components may be temporarily worsened)",
      "In patients unable to perform 6-minute walk test",
      "As a sole determinant for treatment decisions (must integrate clinical context)",
    ],
    limitations: [
      "Validated in stable COPD patients; may be less reliable during exacerbations.",
      "6-minute walk test requires proper instruction and supervision.",
      "BMI cutoff may vary in different populations, including elderly patients and different ethnic groups.",
      "Does not account for comorbidities beyond the four measured components.",
    ],
    example: {
      description:
        "A 65-year-old COPD patient with BMI 22, FEV1 45%, mMRC grade 3, and 6MWD 200 meters.",
      inputs: {
        bmi: "22",
        "fev1-percent": "45",
        "mmrc-dyspnea": "3",
        "six-minute-walk": "200",
      },
      expectedResult:
        "BMI score 0 (>21), FEV1 score 2 (36–49%), mMRC score 2 (grade 3), 6MWD score 2 (150–249m). BODE = 0+2+2+2 = 6 (high risk). Intensify therapy and consider pulmonary rehabilitation.",
    },
    clinicalSignificance:
      "The BODE Index outperforms FEV1 alone for predicting mortality in COPD. It is recommended by GOLD guidelines for comprehensive assessment and has been validated in multiple international cohorts.",
    references: [
      {
        citation: "Celli BR, et al. N Engl J Med. 2004;350(10):1005-1012.",
        level: "Original validation",
      },
      {
        citation: "GOLD Report 2024. Global Strategy for COPD.",
        level: "Clinical guideline",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. BODE Index should be used as part of comprehensive COPD assessment, not as a standalone tool for treatment decisions.",
    evidence: {
      source: "Pulmonology",
      reference: "Celli BR, et al. N Engl J Med. 2004;350(10):1005-1012.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Celli BR, et al. N Engl J Med. 2004;350(10):1005-1012.",
        "GOLD Report 2024.",
      ],
    },
  },
  "albi-score": {
    commonMistakes: [
      "Entering bilirubin in mg/dL instead of micromol/L, or albumin in g/dL instead of g/L, which invalidates the formula's inputs.",
      "Misclassifying the grade at the boundary values of -2.60 and -1.39, which separate Grade I, Grade II, and Grade III.",
      "Using ALBI as the sole determinant for treatment decisions rather than integrating tumor stage and performance status."
    ],
    formulaExplanation:
      "ALBI = (log10(bilirubin in micromol/L) x -0.372) + (albumin in g/L x -0.198) + 4.9, rounded to two decimals. Grade I is -2.60 or lower, Grade II is between -2.60 and -1.39, and Grade III is above -1.39; higher grades indicate worse liver function and prognosis.",
    variables: [
      {
        inputId: "bilirubin",
        label: "Total Bilirubin",
        explanation: "Total bilirubin in micromol/L, entered as a base-10 logarithm.",
        commonError: "Enter bilirubin in micromol/L; a mg/dL value would misstate the logarithmic term.",
      },
      {
        inputId: "albumin",
        label: "Serum Albumin",
        explanation: "Serum albumin in g/L, multiplied by -0.198.",
        commonError: "Enter albumin in g/L (not g/dL) to match the ALBI equation.",
      },
    ],
    faq: [
          {
        "question": "What is the ALBI score?",
        "answer": "The ALBI (Albumin-Bilirubin) score is an objective prognostic tool for assessing liver function using only serum albumin and bilirubin. It was developed as a more reproducible alternative to the Child-Pugh score, eliminating subjective components like ascites and encephalopathy grading."
      },
      {
        "question": "What are the ALBI grades?",
        "answer": "ALBI Grade I (≤ −2.60): Best prognosis, ~25% 1-year mortality. ALBI Grade II (−2.60 to −1.39): Intermediate prognosis, ~50% 1-year mortality. ALBI Grade III (> −1.39): Worst prognosis, ~75% 1-year mortality. These were derived from HCC patient cohorts."
      },
      {
        "question": "How does ALBI compare to Child-Pugh?",
        "answer": "ALBI uses only two objective lab values (albumin and bilirubin), while Child-Pugh includes subjective components (ascites, encephalopathy, nutritional status). ALBI is more reproducible and has been shown to predict outcomes similarly or better than Child-Pugh in HCC patients."
      },
      {
        "question": "Can ALBI be used for non-HCC liver disease?",
        "answer": "ALBI was primarily validated in HCC patients. While it may provide useful prognostic information in other liver diseases (cirrhosis, hepatitis), its use outside HCC should be interpreted with caution as it has not been as extensively validated in these populations."
      },
      {
        "question": "What units does the ALBI formula use?",
        "answer": "The ALBI formula uses bilirubin in µmol/L (SI units; multiply mg/dL by 17.1 to convert) and albumin in g/L (multiply g/dL by 10 to convert)."
      }

  ],
    clinicalPurpose:
      "Objective prognostic assessment of liver function using serum albumin and bilirubin. Primarily validated in hepatocellular carcinoma (HCC) for stratifying prognosis and guiding treatment decisions.",
    howToUse: [
      "Enter total bilirubin in µmol/L (multiply mg/dL by 17.1 to convert).",
      "Enter serum albumin in g/L (multiply g/dL by 10 to convert).",
      "The calculator computes the ALBI score and assigns a grade.",
      "Grade I (≤ −2.60): Best prognosis. Consider curative therapies.",
      "Grade II (−2.60 to −1.39): Intermediate prognosis. Multidisciplinary discussion.",
      "Grade III (> −1.39): Worst prognosis. Consider systemic therapy or supportive care.",
    ],
    interpretation: {
      guide:
        "ALBI Grade I indicates preserved liver function with favorable prognosis. Grade III indicates severe liver dysfunction with poor prognosis. ALBI is objective and reproducible, eliminating the subjective components of Child-Pugh scoring.",
    },
    whenToUse: [
      "HCC patients for liver function assessment and prognosis stratification",
      "When objective liver function assessment is preferred over Child-Pugh",
      "For HCC treatment decision-making (curative vs. palliative intent)",
      "For comparing liver function across patients or studies",
    ],
    whenNotToUse: [
      "As a sole determinant for treatment decisions (must integrate tumor stage, performance status)",
      "In non-HCC liver disease without additional validation",
      "When portal hypertension complications (varices, ascites) need assessment (use Child-Pugh)",
    ],
    limitations: [
      "Primarily validated in HCC patients; use in other liver diseases should be interpreted with caution.",
      "Does not account for portal hypertension, encephalopathy, or other clinical features.",
      "Extreme albumin or bilirubin values may produce less reliable results.",
      "Does not replace comprehensive clinical assessment for treatment decisions.",
    ],
    example: {
      description:
        "An HCC patient with bilirubin 25 µmol/L and albumin 38 g/L.",
      inputs: {
        bilirubin: "25",
        albumin: "38",
      },
      expectedResult:
        "ALBI = (log10(25) × −0.372) + (38 × −0.198) + 4.90 = (1.398 × −0.372) + (−7.524) + 4.90 = −0.520 + (−7.524) + 4.90 = −3.14 (Grade I — best prognosis).",
    },
    clinicalSignificance:
      "ALBI provides an objective, reproducible alternative to Child-Pugh for liver function assessment in HCC. It uses only two laboratory values and has been validated in multiple international cohorts, making it increasingly adopted in HCC staging systems.",
    references: [
      {
        citation: "Johnson PJ, et al. J Clin Oncol. 2015;33(6):550-558.",
        level: "Original validation",
      },
      {
        citation: "Hiraoka A, et al. Liver Cancer. 2017;6(2):112-119.",
        level: "Validation study",
      },
    ],
    disclaimer:
      "This calculator is intended for educational and clinical decision support purposes only. ALBI score should be used as part of comprehensive HCC assessment, not as a standalone tool for treatment decisions.",
    evidence: {
      source: "Gastroenterology",
      reference: "Johnson PJ, et al. J Clin Oncol. 2015;33(6):550-558.",
      version: "1.0",
      updatedAt: "2026-08",
      references: [
        "Johnson PJ, et al. J Clin Oncol. 2015;33(6):550-558.",
        "Hiraoka A, et al. Liver Cancer. 2017;6(2):112-119.",
      ],
    },
  },
};
