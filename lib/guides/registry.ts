import type { GuideDefinition } from "./guide.types";

export const guideRegistry: GuideDefinition[] = [
  {
    id: "acid-base-interpretation",
    slug: "acid-base-interpretation",
    title: "Interpreting Acid–Base Disorders: A Calculator Workflow",
    summary:
      "A step-by-step path through acid–base interpretation: start with the serum anion gap, correct it for albumin, check the delta ratio, verify the expected respiratory compensation, and turn to urine indexes for normal anion gap acidosis.",
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    introduction: [
      "Acid–base interpretation is best approached as a sequence of small, answerable questions rather than as one large judgment. Each step produces a number — the anion gap, the corrected gap, the delta ratio, an expected compensatory PaCO2 or bicarbonate — and the interpretation comes from comparing each number to the previous step.",
      "The calculators in this workflow cover that arithmetic individually. This guide explains which step each calculator belongs to, what the result is measuring, and how the steps fit together when you interpret an arterial blood gas alongside serum electrolytes.",
    ],
    sections: [
      {
        heading: "Start with the serum anion gap",
        paragraphs: [
          "The first branch point is the serum anion gap. It separates a metabolic acidosis into a high anion gap acidosis (HAGMA) from a normal anion gap acidosis (NAGMA), because the size of the gap reflects accumulation of unmeasured anions such as lactate or ketoacids versus loss of bicarbonate. The normal reference range is commonly cited as approximately 8 to 12 mmol/L, though thresholds vary between laboratories.",
          "Use the anion gap calculator to compute the gap from the measured sodium, chloride, and bicarbonate.",
        ],
      },
      {
        heading: "Correct the gap for a low albumin",
        paragraphs: [
          "Albumin is the largest unmeasured anion in routine lab testing. When albumin is low, the anion gap is falsely narrowed, and an underlying HAGMA can be hidden. The corrected anion gap calculator applies the Figge adjustment for hypoalbuminemia so that the gap is judged against the patient's actual albumin rather than an assumed value.",
        ],
      },
      {
        heading: "Check the delta ratio in a high anion gap acidosis",
        paragraphs: [
          "Once a HAGMA is established, the anion gap delta ratio compares the change in the gap to the change in bicarbonate (ΔAG/ΔHCO3). The ratio is often used to look for a complicating bicarbonate-losing or co-existing alkalosis while the primary gap acidosis is being considered — a single number that tries to summarize whether the acid–base picture is \"pure\" or mixed.",
          "The formula is (AG − 12) / (24 − HCO3), as used in the anion-gap-delta-ratio calculator.",
        ],
      },
      {
        heading: "Verify the respiratory response to a metabolic acidosis",
        paragraphs: [
          "A primary metabolic acidosis should trigger a compensatory respiratory response. Winter's formula calculates the expected arterial PaCO2 from the bicarbonate (expected PaCO2 = 1.5 × HCO3 + 8 ± 2 mmHg). A measured PaCO2 near the expected value indicates an appropriate compensatory response; a value meaningfully outside that window suggests an additional respiratory disorder.",
        ],
      },
      {
        heading: "Assess the primary respiratory disorders in the other direction",
        paragraphs: [
          "The workflow also works in reverse. In a primary respiratory acidosis or alkalosis, the respiratory compensation calculator estimates the expected serum bicarbonate for the acute and chronic compensation ranges, and the metabolic alkalosis compensation calculator estimates the expected PaCO2 in metabolic alkalosis (PaCO2 ≈ 40 + 0.6 × (HCO3 − 24)). Comparing the measured value to the expected value helps distinguish an appropriate response from a second, independent disorder.",
        ],
      },
      {
        heading: "Use urine indexes when the gap is normal",
        paragraphs: [
          "When the acidosis is a normal anion gap (hyperchloremic) acidosis, the next question is whether the kidney is failing to excrete acid or whether bicarbonate is being lost elsewhere. The urine anion gap, calculated as [urine sodium + urine potassium] − urine chloride, was classically described to help separate renal causes from extrarenal causes such as diarrhea on the basis of urinary acidification.",
        ],
      },
    ],
    relatedCalculators: [
      "anion-gap",
      "corrected-anion-gap",
      "anion-gap-delta-ratio",
      "winters-formula",
      "respiratory-compensation",
      "metabolic-alkalosis-compensation",
      "urine-anion-gap",
    ],
    relatedGuides: ["fluid-sodium-and-calorie-calculations"],
    references: [
      {
        citation:
          "Emmett M, Narins RG. Clinical use of the anion gap. Medicine (Baltimore). 1977;56(1):38-54.",
      },
      {
        citation:
          "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
      },
      {
        citation:
          "Figge J, et al. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.",
      },
      {
        citation:
          "Rastegar A. J Am Soc Nephrol. 2007;18(10):2631-2636.",
      },
      {
        citation:
          "Albert MS, Dell RB, Winters RW. Ann Intern Med. 1967;66(2):312-322.",
      },
      {
        citation:
          "Rose BD. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5th ed. McGraw-Hill; 2001.",
      },
      {
        citation:
          "Battle DC, et al. N Engl J Med. 1988;318(10):594-599.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked calculators are intended to be used together; it is educational and does not provide medical advice, diagnosis, or treatment. Calculator outputs are estimates, not measured values, and should be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "choosing-kidney-function-estimates",
    slug: "choosing-kidney-function-estimates",
    title: "Choosing a Kidney Function Estimate",
    summary:
      "How the four kidney function calculators differ: CKD-EPI 2021 and MDRD estimate GFR for classifying chronic kidney disease, Cockcroft–Gault estimates creatinine clearance for drug dosing, and a 24-hour urine collection provides a direct timed clearance.",
    category: "Nephrology",
    specialty: "Internal Medicine",
    introduction: [
      "Glomerular filtration rate (GFR) cannot be measured directly at the bedside, so clinicians rely on estimating equations built from serum creatinine or on timed urine collections. Different equations answer slightly different questions, and using the wrong one for a question can mislead.",
      "This guide compares the four kidney function calculators in the library — when each is appropriate, what its result actually estimates, and how the results relate to one another.",
    ],
    sections: [
      {
        heading: "Why several estimators exist",
        paragraphs: [
          "Creatinine-based estimators are population-derived equations, and each was derived and validated in a different era and population. As methods for standardized creatinine measurement changed and evidence accumulated, newer equations replaced older ones for clinical classification while older ones remained embedded in other workflows such as drug labels.",
          "Current guidance organizations, including KDIGO, recommend the creatinine-based CKD-EPI equations that no longer use a race variable for classifying chronic kidney disease.",
        ],
      },
      {
        heading: "Use eGFR equations for staging chronic kidney disease",
        paragraphs: [
          "The CKD-EPI 2021 equation estimates GFR from serum creatinine, age, and sex without a race variable, and it is the recommended default for CKD staging in adults. The MDRD equation, developed earlier and from a predominantly CKD population, is still encountered in older laboratory reports and historical comparisons, but it is less accurate in the higher normal range of GFR than newer equations.",
          "These eGFR estimates are reported in mL/min/1.73 m² and are used for classifying and monitoring chronic kidney disease rather than for calculating an absolute creatinine clearance.",
        ],
      },
      {
        heading: "Use a creatinine clearance estimate for drug dosing",
        paragraphs: [
          "Many drug labels still express renal dose adjustments in terms of creatinine clearance (CrCl) rather than eGFR. The Cockcroft–Gault equation derives CrCl from serum creatinine, age, sex, and body weight, and remains widely used in pharmacy practice for adjusting renally eliminated medications even though it is not a GFR classifier per current KDIGO guidance.",
          "Because Cockcroft–Gault includes weight, the value is expressed in mL/min rather than per 1.73 m², which is one reason its numeric result differs from an eGFR for the same patient.",
        ],
      },
      {
        heading: "Confirm with a measured 24-hour clearance",
        paragraphs: [
          "For situations where a timed measurement is needed — for example, to inform a decision that depends on an actual clearance rather than an estimate — the classic approach is a 24-hour urine collection. The creatinine clearance from 24-hour urine calculator combines urine creatinine, serum creatinine, and the 24-hour urine volume. The result is only as reliable as the collection: incomplete or over-collected urine is the most common source of error.",
        ],
      },
      {
        heading: "Choosing among the tools",
        paragraphs: [
          "In practice: use CKD-EPI 2021 when the question is staging or tracking chronic kidney disease; be prepared to recognize MDRD values on older reports; use Cockcroft–Gault when the question is drug dosing per a product label that specifies it; and reserve a 24-hour clearance for when an actual timed measurement is clinically warranted. When reports disagree, the explanation is usually that they are different quantities, not that one is wrong.",
        ],
      },
    ],
    relatedCalculators: [
      "ckd-epi-2021",
      "mdrd",
      "cockcroft-gault",
      "creatinine-clearance-24h",
    ],
    relatedGuides: [
      "fluid-sodium-and-calorie-calculations",
      "body-composition-and-dosing-weights",
    ],
    references: [
      {
        citation:
          "Inker LA, Eneanya ND, Coresh J, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385(19):1737-1749.",
      },
      {
        citation:
          "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Disease: Improving Global Outcomes.",
      },
      {
        citation:
          "Levey AS, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130(6):461-470.",
      },
      {
        citation:
          "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.",
      },
      {
        citation:
          "Levey AS, et al. Clin Chem. 2007;53(4):766-772.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked kidney function calculators differ; it is educational and does not provide medical advice, diagnosis, or treatment. Estimated values are approximations and should be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "fluid-sodium-and-calorie-calculations",
    slug: "fluid-sodium-and-calorie-calculations",
    title: "Fluid, Sodium, and Calorie Calculations",
    summary:
      "The weight-based rules behind maintenance fluids, sodium correction in hyponatremia and hypernatremia, and daily calorie requirements — how the estimates differ from one another and how to use them as planning numbers rather than prescriptions.",
    category: "Internal Medicine",
    specialty: "Internal Medicine",
    introduction: [
      "Daily fluid, electrolyte, and energy needs are commonly estimated from body weight using simple rules. These rules produce planning numbers that become clinically meaningful only when they are then reconciled with ongoing losses, the patient's cardiovascular and renal status, and laboratory reassessment.",
      "This guide groups the fluid, sodium, and calorie calculators, explains the rule behind each one, and notes where the estimates agree or diverge.",
    ],
    sections: [
      {
        heading: "Estimate maintenance fluids with a weight-based rule",
        paragraphs: [
          "The maintenance fluids calculator applies the classic weight-based 100/50/20 rule — 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg for each kilogram thereafter — originally described by Holliday and Segar for parenteral fluid therapy in children.",
          "The fluid requirement calculator takes a simpler fixed 35 mL/kg/day estimate for adults. The two calculators answer the same broad question with different conventions, and the difference between their outputs is a reminder that these are approximations, not measurements. Adult intravenous fluid therapy guidance, such as NICE Guideline CG174, emphasizes prescribing fluids as a drug with explicit daily goals and reassessment.",
        ],
      },
      {
        heading: "Plan sodium correction step by step",
        paragraphs: [
          "Three calculators address sodium disorders, and each addresses a different step. In hyperglycemia, the corrected sodium calculator adjusts the measured serum sodium for the glucose level so that the sodium status is not misinterpreted as hyponatremia. When a true sodium disorder requires correction, the sodium deficit calculator estimates the sodium needed to raise a low sodium toward a target, and the free water deficit calculator estimates the volume of free water needed to lower a high sodium toward a target.",
          "All three produce estimates that support a management plan. Hyponatremia and hypernatremia corrections carry the risk of over-correction (and of correction occurring too quickly in hyponatremia), so the numbers from these calculators must always be paired with rapid clinical reassessment rather than followed blindly.",
        ],
      },
      {
        heading: "Estimate daily calorie needs from energy expenditures",
        paragraphs: [
          "The calorie requirement calculator estimates total daily calorie need by multiplying an estimated basal metabolic rate by an activity factor, following the FAO/WHO/UNU Human Energy Requirements approach and the Dietary Reference Intakes framework. The result is a starting estimate for nutrition planning and is sensitive both to the accuracy of the underlying weight and to the activity factor chosen.",
        ],
      },
      {
        heading: "Treat every result as a hypothesis, not a prescription",
        paragraphs: [
          "The shared theme across these calculators is that each converts a weight and a few inputs into a daily number. The number is a reasonable starting estimate, and it becomes unsafe when treated as precise. Fluid status is best tracked by serial clinical assessment, intake and output, and laboratory or urine measures; the correct volume or rate is the one that works for the individual patient under re-evaluation.",
        ],
      },
    ],
    relatedCalculators: [
      "maintenance-fluids",
      "fluid-requirement",
      "corrected-sodium",
      "sodium-deficit",
      "free-water-deficit",
      "calorie-requirement",
    ],
    relatedGuides: [
      "choosing-kidney-function-estimates",
      "acid-base-interpretation",
    ],
    references: [
      {
        citation:
          "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832.",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Guideline CG174. London: NICE; 2013 (updated 2017).",
      },
      {
        citation:
          "Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.",
      },
      {
        citation:
          "Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106(4):399-403.",
      },
      {
        citation:
          "Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499.",
      },
      {
        citation:
          "Food and Agriculture Organization / World Health Organization / United Nations University. Human Energy Requirements: Report of a Joint FAO/WHO/UNU Expert Consultation. Rome: FAO; 2004.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked fluid, sodium, and calorie calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Every result is an estimate that must be interpreted in the full context of the individual patient, especially where rates of correction are concerned, with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "cardiac-and-perioperative-risk-scores",
    slug: "cardiac-and-perioperative-risk-scores",
    title: "Cardiac and Perioperative Risk Scores",
    summary:
      "Which risk score answers which question: CHA₂DS₂-VASc and HAS-BLED balance stroke against bleeding in atrial fibrillation, GRACE and TIMI prognosticate acute coronary syndromes, HEART stratifies emergency chest pain, RCRI estimates perioperative cardiac risk, and DAPT weighs antiplatelet duration.",
    category: "Cardiology",
    specialty: "Cardiology",
    introduction: [
      "Cardiac risk scores are population-derived prediction tools, and each is calibrated to a specific population and a specific time horizon. Using a score outside the setting it was derived for is a common and avoidable error.",
      "This guide groups the seven cardiac and perioperative risk calculators in the library by the question each one answers, so the right score can be matched to the clinical setting.",
    ],
    sections: [
      {
        heading: "Atrial fibrillation: balance stroke risk against bleeding risk",
        paragraphs: [
          "In non-valvular atrial fibrillation, the CHA₂DS₂-VASc score estimates annual ischemic stroke risk and is used to inform oral anticoagulation decisions. The HAS-BLED score estimates the 1-year risk of major bleeding in patients receiving anticoagulation and is used to surface modifiable bleeding risk factors.",
          "The two scores are complementary: the stroke-risk score argues for anticoagulation, and the bleeding-risk score identifies factors that can be mitigated — it is intended to prompt correction of reversible bleeding risks rather than to veto treatment.",
        ],
      },
      {
        heading: "Acute coronary syndromes: in-hospital and 14-day risk",
        paragraphs: [
          "The GRACE score was developed from a large registry of acute coronary syndromes to estimate in-hospital mortality across the ACS spectrum, including STEMI, NSTEMI, and unstable angina. The TIMI risk score for UA/NSTEMI estimates the 14-day risk of all-cause mortality, new or recurrent myocardial infarction, or severe recurrent ischemia requiring urgent revascularization.",
          "Both are prognostic scores for an already-diagnosed ACS; they differ in time horizon and in the inputs they use, so the one you choose depends on the endpoint you want to estimate.",
        ],
      },
      {
        heading: "Emergency chest pain: the HEART score",
        paragraphs: [
          "For undifferentiated chest pain in the emergency department — before the diagnosis is certain — the HEART score stratifies patients by their 6-week risk of a major adverse cardiac event. It is a different tool for a different moment than GRACE or TIMI: those assume an ACS diagnosis, while HEART is applied to the larger population of chest-pain presentations in which most patients do not have an ACS.",
        ],
      },
      {
        heading: "Perioperative risk: the Revised Cardiac Risk Index",
        paragraphs: [
          "The RCRI estimates the 30-day risk of major cardiac complications — myocardial infarction, pulmonary edema, ventricular fibrillation or primary cardiac arrest, and complete heart block — in patients undergoing major noncardiac surgery. It is the score most commonly used for preoperative risk stratification and is deliberately simple, built from a small set of clinical predictors.",
        ],
      },
      {
        heading: "Antiplatelet duration: the DAPT score",
        paragraphs: [
          "After coronary stenting, the DAPT score weighs the expected benefit of continuing dual antiplatelet therapy beyond 12 months against the expected risk of bleeding, helping clinicians decide whether the prolonged course is likely to have net benefit. It was developed specifically for the decision of extending DAPT after the first year.",
        ],
      },
      {
        heading: "Match the score to the question",
        paragraphs: [
          "A score is only meaningful when its population, outcome, and time horizon match the question being asked. Atrial fibrillation, a suspected ACS, undifferentiated chest pain, upcoming noncardiac surgery, and the decision about antiplatelet duration are five different questions, and each has its own calibrated tool in the library.",
        ],
      },
    ],
    relatedCalculators: [
      "cha2ds2-vasc",
      "has-bled",
      "grace",
      "timi",
      "heart-score",
      "rcri",
      "dapt",
    ],
    relatedGuides: ["lipids-and-cardiometabolic-markers"],
    references: [
      {
        citation:
          "Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on atrial fibrillation. Chest. 2010;137(2):263-272.",
      },
      {
        citation:
          "January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation. Circulation. 2019;140(2):e125-e151.",
      },
      {
        citation:
          "Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.",
      },
      {
        citation:
          "Lee TH, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999;100(10):1043-1049.",
      },
      {
        citation:
          "Granger CB, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.",
      },
      {
        citation:
          "Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.",
      },
      {
        citation:
          "Six AJ, et al. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008;16(6):191-196.",
      },
      {
        citation:
          "Yeh RW, et al. Development and validation of a prediction rule for benefit and harm of dual antiplatelet therapy beyond 1 year after percutaneous coronary intervention. JAMA. 2016;315(16):1735-1749.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked cardiac risk scores are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Risk scores produce population-level estimates that must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "sepsis-and-deterioration-scores",
    slug: "sepsis-and-deterioration-scores",
    title: "Sepsis and Deterioration Screening Scores",
    summary:
      "How qSOFA, SOFA, SIRS criteria, NEWS2, and the shock index fit into detecting sepsis and clinical deterioration — including the shift in sepsis definitions from SIRS to the Sepsis-3 qSOFA/SOFA framework.",
    category: "Emergency",
    specialty: "Emergency Medicine",
    introduction: [
      "Sepsis screening and the detection of clinical deterioration work at different altitudes. Some tools are quick bedside filters for suspected infection, others quantify organ dysfunction in the critically ill, and others score deranged physiology to trigger a response. Confusing one for another is a frequent source of misuse.",
      "This guide explains what each of the five screening and severity calculators measures and the setting each was designed for.",
    ],
    sections: [
      {
        heading: "The sepsis definition shift: from SIRS to qSOFA",
        paragraphs: [
          "The SIRS criteria (four physiologic criteria — temperature, heart rate, respiratory rate, and leukocyte count) defined sepsis from the early 1990s consensus. The Third International Consensus Definitions (Sepsis-3) moved away from SIRS, defining sepsis as organ dysfunction caused by infection and complementing the SOFA score with the quick qSOFA tool.",
          "The SIRS criteria calculator remains in the library because SIRS-based criteria are still embedded in many protocols and older documentation, but it is important to know that the current consensus framework is the Sepsis-3 one.",
        ],
      },
      {
        heading: "qSOFA: a bedside trigger in suspected infection",
        paragraphs: [
          "The qSOFA score uses altered mentation, tachypnea, and hypotension to identify adults outside the intensive care unit with a suspected infection who are at higher risk of sepsis-related organ dysfunction and death. It is a screening and escalation prompt rather than a diagnostic definition — a quick way to raise the index of suspicion and escalate care.",
        ],
      },
      {
        heading: "SOFA: quantifying organ dysfunction",
        paragraphs: [
          "The SOFA score quantifies organ dysfunction across six organ systems and is used in critically ill patients; under Sepsis-3, sepsis is operationally identified by an acute change in the baseline SOFA score of 2 points or more in the setting of infection. Because it requires laboratory and physiologic inputs, it belongs in the ICU or comparable settings rather than at the first bedside glance.",
        ],
      },
      {
        heading: "NEWS2: detecting deterioration on the ward",
        paragraphs: [
          "The National Early Warning Score 2 (NEWS2) standardizes the assessment of acute-illness severity in adult inpatients by scoring routine bedside observations and linking score bands to mandated clinical response levels. It is a general deterioration tool, not a sepsis tool specifically, and it is the established framework in the NHS for triggering escalation of care.",
        ],
      },
      {
        heading: "The shock index as a hemodynamic adjunct",
        paragraphs: [
          "The shock index relates heart rate to systolic blood pressure. An inappropriately high heart rate relative to the blood pressure flags impaired hemodynamic status, and a calculated index can work as a quick adjunct to the scoring tools above, particularly in detecting early critical illness. It is not itself a sepsis screen.",
        ],
      },
      {
        heading: "Match the tool to the setting",
        paragraphs: [
          "In the emergency department or on the ward with suspected infection, qSOFA is the Sepsis-3 bedside filter; in the ICU, SOFA quantifies organ dysfunction; on the general ward, NEWS2 scores deterioration across all causes; the shock index gives a continuous hemodynamic signal; and SIRS persists in legacy protocols. Choosing among them is fundamentally a question of setting and question.",
        ],
      },
    ],
    relatedCalculators: [
      "qsofa",
      "sofa-score",
      "sirs-criteria",
      "news2",
      "shock-index",
    ],
    relatedGuides: [
      "cardiac-and-perioperative-risk-scores",
      "pneumonia-severity-scores",
    ],
    references: [
      {
        citation:
          "Seymour CW, et al. Assessment of Clinical Criteria for Sepsis. JAMA 2016;315(8):762-774.",
      },
      {
        citation:
          "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
      },
      {
        citation:
          "Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22(7):707-710.",
      },
      {
        citation:
          "Bone RC, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. Chest. 1992;101(6):1644-1655.",
      },
      {
        citation:
          "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. RCP, 2017.",
      },
      {
        citation:
          "Rady MY, et al. A comparison of the shock index and conventional vital signs to identify acute, critical illness in the emergency department. Ann Emerg Med. 1994;24(4):685-690.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked sepsis and deterioration tools are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Screening scores raise or lower suspicion; they do not diagnose, and they must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "body-composition-and-dosing-weights",
    slug: "body-composition-and-dosing-weights",
    title: "Body Composition and Dosing Weight Calculators",
    summary:
      "The relationships among BMI, waist-to-hip ratio, body surface area, and the ideal, adjusted, and lean body weight equations — what each measures, the formula behind it (WHO, Mosteller, Devine, Boer), and how to choose a weight basis for a task.",
    category: "Anthropometry",
    specialty: "General Medicine",
    introduction: [
      "A single scale weight is not the only number a clinician needs. Screening for obesity, assessing central adiposity, normalizing physiologic measures, and dosing medications each want a different body-related quantity. The body composition calculators in the library compute those different quantities from the same basic inputs.",
      "This guide explains what each calculator measures, the classic formula it uses, and how to choose between them for a given purpose.",
    ],
    sections: [
      {
        heading: "Screen with BMI, then assess fat distribution",
        paragraphs: [
          "The body mass index (BMI) calculator computes BMI for screening underweight, normal weight, overweight, and obesity categories as defined by the World Health Organization. BMI is a population-screening metric: it is quick, weight and height based, and does not by itself distinguish muscle from fat or describe where fat is carried.",
          "The waist-to-hip ratio calculator complements BMI by measuring central (abdominal) adiposity, which the WHO expert consultation on waist circumference and waist–hip ratio addressed as a risk-stratification measure in its own right.",
        ],
      },
      {
        heading: "Estimate body surface area for normalization and dosing",
        paragraphs: [
          "The body surface area (BSA) calculator uses the Mosteller formula to estimate BSA from height and weight. BSA is used to normalize physiologic parameters and to dose selected medications, and it is a distinct quantity from BMI — it grows more slowly than weight and captures both height and weight together.",
        ],
      },
      {
        heading: "Use framework weights for size-adjusted dosing",
        paragraphs: [
          "Three calculators provide size-adjusted weight references for dosing. The ideal body weight calculator applies the Devine formula, a height-based reference weight originally described in the context of gentamicin therapy. The adjusted body weight calculator builds on ideal body weight by adding a fraction of the excess weight for overweight and obese patients, the approach used when a medication distributes into lean tissue and fat differently. The lean body weight calculator applies the Boer formula to estimate lean body mass, useful in dosing, anesthesia, and nutritional assessment.",
        ],
      },
      {
        heading: "Choose the weight basis that matches the task",
        paragraphs: [
          "Dosing labels and protocols specify which weight basis to use — actual, ideal, adjusted, or lean — and using a different basis than the one the label assumes will change the dose for the same patient. The choice is dictated by the medication and the evidence behind its label, not by which value is numerically most appealing. When in doubt, follow the basis declared by the prescribing information.",
        ],
      },
    ],
    relatedCalculators: [
      "bmi",
      "waist-to-hip-ratio",
      "bsa",
      "ideal-body-weight",
      "adjusted-body-weight",
      "lean-body-weight",
    ],
    relatedGuides: [
      "choosing-kidney-function-estimates",
      "fluid-sodium-and-calorie-calculations",
      "pediatric-assessment-scores",
    ],
    references: [
      {
        citation:
          "WHO. Obesity and Overweight. World Health Organization Fact Sheet.",
      },
      {
        citation:
          "Nuttall FQ. Body Mass Index: Obesity, BMI, Health, and Nutritional Risks. Nutrients. 2015;7(9):8184-8191.",
      },
      {
        citation:
          "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.",
      },
      {
        citation:
          "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8(11):650–655.",
      },
      {
        citation:
          "Pai MP, Paloucek FP. The origin of the \"ideal\" body weight equations. Ann Pharmacother. 2000;34(9):1066–1069.",
      },
      {
        citation:
          "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Am J Physiol. 1984;247(4 Pt 2):F632–F636.",
      },
      {
        citation:
          "World Health Organization. Waist circumference and waist–hip ratio: report of a WHO expert consultation. Geneva: WHO; 2008.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked body composition and weight calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Weight-based estimates are starting points and must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "pneumonia-severity-scores",
    slug: "pneumonia-severity-scores",
    title: "Community-Acquired Pneumonia Severity Scores",
    summary:
      "How the CURB-65, CRB-65, and PSI/PORT scores stratify community-acquired pneumonia severity and support site-of-care decisions — what variables each uses and where its evidence comes from.",
    category: "Emergency",
    specialty: "Emergency Medicine",
    introduction: [
      "Community-acquired pneumonia (CAP) severity scores convert bedside findings and routine test results into a risk category. Their shared purpose is to support site-of-care decisions — who can be managed at home, who needs a ward bed, and who may need intensive care — but each does so with a different set of variables and a different underlying model.",
      "The library contains three CAP severity instruments: CURB-65, CRB-65, and the PSI/PORT score. This guide explains which step each one belongs to, what it measures, and where the evidence behind it comes from.",
    ],
    sections: [
      {
        heading: "Why several CAP severity scores exist",
        paragraphs: [
          "Severity scores differ in the data they require and in the populations and outcomes against which they were derived. A score that can be applied without laboratory results answers a different practical question from a weighted model that uses many variables. Knowing which tool was built for which setting is part of using it well.",
        ],
      },
      {
        heading: "CURB-65: five bedside variables",
        paragraphs: [
          "The CURB-65 score was derived and validated to define community-acquired pneumonia severity at hospital presentation, using five readily available features to stratify 30-day mortality risk and help guide site-of-care decisions. It relies on data that are typically available at the point of assessment rather than an extended laboratory panel.",
          "Use the CURB-65 calculator to compute the score from its inputs.",
        ],
      },
      {
        heading: "CRB-65: the laboratory-free version",
        paragraphs: [
          "The CRB-65 score omits the blood urea nitrogen component of CURB-65 so that it can be applied without laboratory testing, which suits primary care and other settings where a result is not immediately available. It stratifies severity and mortality risk in the same general way, at the cost of one discriminating variable.",
        ],
      },
      {
        heading: "PSI/PORT: a weighted, tiered model",
        paragraphs: [
          "The Pneumonia Severity Index (PSI), also called the PORT score, was developed by Fine and colleagues as a prediction rule to identify patients with community-acquired pneumonia who are at low risk of 30-day mortality. It assigns points across demographic, comorbidity, examination, and laboratory or radiographic variables and groups patients into risk classes, so it is more detailed than either CURB-based score.",
        ],
      },
      {
        heading: "Choosing a score, and its limits",
        paragraphs: [
          "The three scores are not interchangeable: they were derived in different cohorts, use different variables, and are calibrated to different outcomes. None is a substitute for clinical judgement — a patient who looks unwell should be treated as unwell regardless of a low score, and social and functional factors that affect safe site of care often sit outside the models. For that reason this guide links only the CAP severity instruments in the library rather than padding the list with unrelated calculators.",
        ],
      },
    ],
    relatedCalculators: ["curb-65", "crb-65", "psi-port"],
    relatedGuides: [
      "sepsis-and-deterioration-scores",
      "venous-thromboembolism-assessment",
    ],
    references: [
      {
        citation:
          "Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
      },
      {
        citation:
          "Lim WS, Baudouin SV, George RC, et al. BTS guidelines for the management of community acquired pneumonia in adults: update 2009. Thorax. 2009;64(Suppl III):iii1-iii55.",
      },
      {
        citation:
          "Fine MJ, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336(4):243-250.",
      },
      {
        citation:
          "Fine MJ, et al. Prognosis and outcomes of patients with community-acquired pneumonia: a meta-analysis. JAMA. 1996;275(2):134-141.",
      },
      {
        citation:
          "National Institute for Health and Care Excellence. Pneumonia in adults: diagnosis and management. NICE Clinical Guideline CG191. 2014.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked pneumonia severity scores are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Severity scores produce population-level risk estimates that must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "liver-disease-scoring",
    slug: "liver-disease-scoring",
    title: "Scoring Chronic Liver Disease",
    summary:
      "How the liver calculators divide the work: MELD and MELD-Na for transplant prognosis, Child-Pugh and ALBI for liver function, APRI, FIB-4, and the NAFLD Fibrosis Score for non-invasive fibrosis estimation, the Maddrey Discriminant Function for alcoholic hepatitis, and the SAAG for ascites.",
    category: "Gastroenterology",
    specialty: "Gastroenterology",
    introduction: [
      "Liver-related calculators answer several distinct questions: how urgently a patient with advanced disease needs transplant assessment, how well the liver is functioning, how likely significant fibrosis is without a biopsy, whether alcoholic hepatitis is severe, and why a patient has ascites. Each question has its own instrument, and using one in place of another changes what the number means.",
      "This guide groups the liver calculators in the library by the question each answers and explains the model behind each one.",
    ],
    sections: [
      {
        heading: "Severity and transplant prognosis: MELD and MELD-Na",
        paragraphs: [
          "The MELD score models 3-month mortality in adults with end-stage liver disease from bilirubin, INR, and creatinine, and it underpins liver transplant prioritisation in many systems. The MELD-Na score adds serum sodium, which improves 3-month mortality prediction. MELD is recalibrated periodically and allocation policies vary, so the version your centre reports should be confirmed before acting on a number.",
        ],
      },
      {
        heading: "Liver function and prognosis: Child-Pugh and ALBI",
        paragraphs: [
          "The Child-Pugh score combines bilirubin, albumin, INR, ascites, and hepatic encephalopathy into a severity class for chronic liver disease and cirrhosis, and it has long been used to gauge prognosis. The ALBI grade uses only albumin and bilirubin, making it objective and easier to apply; it was primarily validated in hepatocellular carcinoma for prognostic stratification as an alternative to Child-Pugh.",
        ],
      },
      {
        heading: "Non-invasive fibrosis estimation: APRI, FIB-4, and the NAFLD Fibrosis Score",
        paragraphs: [
          "APRI uses the AST level relative to the platelet count and was developed to predict significant fibrosis and cirrhosis in chronic hepatitis C. FIB-4 combines age, AST, ALT, and platelet count and was derived to estimate advanced fibrosis. The NAFLD Fibrosis Score estimates the probability of advanced fibrosis in NAFLD/MASLD from routine clinical and laboratory variables. These indices are triage tools that estimate likelihood, not replacements for elastography or biopsy.",
        ],
      },
      {
        heading: "Alcoholic hepatitis severity: the Maddrey Discriminant Function",
        paragraphs: [
          "The Maddrey Discriminant Function identifies severe alcoholic hepatitis, the setting in which corticosteroid therapy may be considered. It is a severity marker tied to a specific disease and treatment decision rather than a general liver-function score.",
        ],
      },
      {
        heading: "Ascites classification: the Serum-Ascites Albumin Gradient",
        paragraphs: [
          "The SAAG compares serum and ascitic fluid albumin to classify ascites as portal-hypertensive or not. It answers a mechanistic question about why fluid has accumulated and is used alongside — not instead of — the severity scores above.",
        ],
      },
      {
        heading: "Using the liver calculators together",
        paragraphs: [
          "These tools describe different dimensions of liver disease, and a single patient may need several of them at once: one for allocation, another for an objective functional grade, another for fibrosis triage. The numbers are population-calibrated estimates and should be read with the clinical picture, the stage of disease, and the version conventions of the reporting laboratory.",
        ],
      },
    ],
    relatedCalculators: [
      "meld-score",
      "meld-na-score",
      "child-pugh",
      "albi-score",
      "apri-score",
      "fib-4-index",
      "nafld-fibrosis-score",
      "maddrey-discriminant-function",
      "saag",
    ],
    references: [
      {
        citation:
          "Kamath PS, Wiesner RH, Malinchoc M, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001;33(2):464–470.",
      },
      {
        citation:
          "Kim WR, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359:1018-1026.",
      },
      {
        citation:
          "Pugh RNH, Murray-Lyon IM, Dawson JL, et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60(8):646-649.",
      },
      {
        citation:
          "Child CG, Turcotte JG. Surgery and portal hypertension. Major Probl Clin Surg. 1964;1:1-85.",
      },
      {
        citation:
          "Johnson PJ, Chan SC, Cheng CL, et al. Albumin-Bilirubin (ALBI) Grade as an Alternative to the Child-Pugh Score for Assessing Liver Function in Patients With HCC. J Clin Oncol. 2015;33(6):550-558.",
      },
      {
        citation:
          "Wai CT, et al. A simple noninvasive index can predict both significant fibrosis and cirrhosis in patients with chronic hepatitis C. Hepatology. 2003;38:518-526.",
      },
      {
        citation:
          "Sterling RK, et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology. 2006;43:1317-1325.",
      },
      {
        citation:
          "Angulo P, et al. The NAFLD fibrosis score: a noninvasive system that identifies liver fibrosis in patients with NAFLD. Hepatology. 2007;45:846-854.",
      },
      {
        citation:
          "Maddrey WC, et al. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978;75:193-199.",
      },
      {
        citation:
          "Runyon BA, Hoefs JC, Morgenthaler US. N Engl J Med. 1983;309(22):1340-1344.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked liver calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. These scores are population-calibrated estimates that must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "venous-thromboembolism-assessment",
    slug: "venous-thromboembolism-assessment",
    title: "Assessing Suspected Venous Thromboembolism",
    summary:
      "How the Wells score for pulmonary embolism, the Wells score for deep vein thrombosis, and the PERC rule estimate pre-test probability of venous thromboembolism and guide D-dimer and imaging decisions.",
    category: "Emergency",
    specialty: "Emergency Medicine",
    introduction: [
      "Suspected venous thromboembolism — pulmonary embolism (PE) and deep vein thrombosis (DVT) — is common in emergency and acute settings, and the clinical question is usually about pre-test probability: how likely is VTE, and which patients can avoid imaging. The library contains three tools for that question: the Wells score for PE, the Wells score for DVT, and the PERC rule.",
      "This guide describes what each tool estimates and how they fit into a diagnostic pathway.",
    ],
    sections: [
      {
        heading: "PE or DVT: two presentations, two Wells scores",
        paragraphs: [
          "The Wells score exists in a PE version and a DVT version. Both are clinical models that categorise a patient's probability of the corresponding diagnosis from history and examination, but the items and their weights differ between the two, so the PE score should not be applied to a suspected DVT (or the reverse).",
        ],
      },
      {
        heading: "The Wells score for PE",
        paragraphs: [
          "The Wells PE score estimates the pre-test probability of pulmonary embolism to guide D-dimer testing and imaging decisions. It was derived as a simple clinical model to categorise probability and later evaluated in management studies in which D-dimer was used to exclude PE without imaging in low-probability patients.",
        ],
      },
      {
        heading: "The Wells score for DVT",
        paragraphs: [
          "The Wells DVT score estimates the pre-test probability of deep vein thrombosis to guide D-dimer testing and compression ultrasound. It was derived to make clinical assessment of DVT more accurate and was subsequently tested in management studies of D-dimer use.",
        ],
      },
      {
        heading: "The PERC rule: ruling out PE without testing",
        paragraphs: [
          "The Pulmonary Embolism Rule-out Criteria (PERC) is used when a clinician's gestalt pre-test probability is already low. If all criteria are met, PE can be considered ruled out without D-dimer or imaging; if any criterion is present, the rule does not apply. PERC is therefore layered on top of, rather than a substitute for, a probability assessment.",
        ],
      },
      {
        heading: "Limits and sensible use",
        paragraphs: [
          "Each tool was derived and tested in a particular population, and none replaces clinical judgement. A probability that appears low in a patient who is deteriorating, pregnant, or has an unreliable history should not be allowed to override that assessment. For that reason this guide links only the three VTE tools in the library rather than padding the list with unrelated calculators.",
        ],
      },
    ],
    relatedCalculators: ["wells-pe", "wells-dvt", "perc-rule"],
    relatedGuides: [
      "pneumonia-severity-scores",
      "oxygenation-and-respiratory-assessment",
    ],
    references: [
      {
        citation:
          "Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000;83(3):416-420.",
      },
      {
        citation:
          "Wells PS, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected pulmonary embolism presenting to the emergency department by using a simple clinical model and D-dimer. Ann Intern Med. 2001;135(2):98-107.",
      },
      {
        citation:
          "Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.",
      },
      {
        citation:
          "Wells PS, et al. Accuracy of clinical assessment of deep-vein thrombosis. Lancet. 1995;345(8960):1326-1330.",
      },
      {
        citation:
          "Kline JA, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.",
      },
      {
        citation:
          "Kline JA, et al. Impact of a rapid rule-out protocol for pulmonary embolism on the rate of screening, missed cases, and pulmonary vascular imaging in an urban US emergency department. Ann Emerg Med. 2004;44(5):490-502.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked venous thromboembolism tools are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Pre-test probability estimates must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "lipids-and-cardiometabolic-markers",
    slug: "lipids-and-cardiometabolic-markers",
    title: "Lipid and Cardiometabolic Markers",
    summary:
      "The relationships among the laboratory lipid calculators — calculated LDL, non-HDL cholesterol, TC/HDL, ApoB/ApoA1, and the atherogenic index of plasma — and the metabolic markers TG/HDL, the TyG index, and metabolic syndrome criteria.",
    category: "Laboratory",
    specialty: "Internal Medicine",
    introduction: [
      "Lipid panels and metabolic markers are used to estimate cardiovascular risk, to set and monitor treatment targets, and to flag insulin resistance. The library contains a set of lipid calculations and a set of metabolic markers, and the numbers relate to one another through the lipoproteins they describe.",
      "This guide groups those calculators and explains what each one measures.",
    ],
    sections: [
      {
        heading: "Primary and secondary lipid measures",
        paragraphs: [
          "Calculated LDL estimates LDL cholesterol from a standard lipid panel by the Friedewald equation and is widely used for cardiovascular risk assessment and treatment targets, though it becomes unreliable at high triglyceride levels. Non-HDL cholesterol — total cholesterol minus HDL — captures all apolipoprotein B-containing particles and is used as a secondary target.",
        ],
      },
      {
        heading: "Ratios: TC/HDL, ApoB/ApoA1, and the atherogenic index of plasma",
        paragraphs: [
          "The total cholesterol to HDL ratio compares total cholesterol with the protective HDL fraction. The ApoB/ApoA1 ratio weighs atherogenic against anti-atherogenic lipoproteins and has been studied as a risk marker. The atherogenic index of plasma is the logarithmically transformed ratio of triglycerides to HDL cholesterol and reflects the balance of atherogenic and protective lipids.",
        ],
      },
      {
        heading: "Markers of insulin resistance: TG/HDL and the TyG index",
        paragraphs: [
          "The triglyceride to HDL ratio is a lipid-based marker of insulin resistance studied in overweight, non-diabetic adults. The triglyceride-glucose (TyG) index combines fasting triglycerides and fasting glucose as a surrogate for insulin resistance. Both are indirect markers rather than direct measures of insulin sensitivity.",
        ],
      },
      {
        heading: "Metabolic syndrome criteria",
        paragraphs: [
          "The metabolic syndrome calculator applies the updated NCEP ATP III criteria, which require several of a defined set of components including waist circumference, triglycerides, HDL cholesterol, blood pressure, and fasting glucose. It is a categorical definition rather than a continuous risk score.",
        ],
      },
      {
        heading: "Reading the markers together",
        paragraphs: [
          "These values are interpreted against treatment targets, fasting status, and the analytic method used. The Friedewald estimate in particular depends on an accurate triglyceride measurement, and all of the ratios are population-level markers rather than individual diagnoses. They support — but do not replace — formal cardiovascular risk scoring and clinical assessment.",
        ],
      },
    ],
    relatedCalculators: [
      "ldl-cholesterol",
      "non-hdl-cholesterol",
      "total-cholesterol-hdl-ratio",
      "apob-apoa1-ratio",
      "atherogenic-index-of-plasma",
      "triglyceride-hdl-ratio",
      "tyg-index",
      "metabolic-syndrome-atp3",
    ],
    relatedGuides: [
      "cardiac-and-perioperative-risk-scores",
      "body-composition-and-dosing-weights",
    ],
    references: [
      {
        citation:
          "Friedewald WT, Levy RI, Fredrickson DS. Estimation of the concentration of low-density lipoprotein cholesterol in plasma, without use of the preparative ultracentrifuge. Clin Chem. 1972;18(6):499-502.",
      },
      {
        citation:
          "Grundy SM, et al. 2018 AHA/ACC guideline on the management of blood cholesterol. Circulation. 2019;139(25):e1082-e1143.",
      },
      {
        citation:
          "Stampfer MJ, et al. A prospective study of cholesterol, apolipoproteins, and the risk of myocardial infarction. N Engl J Med. 1991;325(6):373-381.",
      },
      {
        citation:
          "Walldius G, Jungner I. The apoB/apoA-I ratio: a strong, new risk factor for cardiovascular disease and a target for lipid-lowering therapy — a review of the evidence. J Intern Med. 2006;259(5):493-519.",
      },
      {
        citation:
          "Dobiásová M, Frohlich J. The plasma parameter log (TG/HDL-C) as an atherogenic index: correlation with lipoprotein particle size and esterification rate in apoB-lipoprotein-depleted plasma (FERHDL). Clin Biochem. 2001;34(7):583-588.",
      },
      {
        citation:
          "McLaughlin T, Abbasi F, Cheal K, et al. Use of metabolic markers to identify overweight individuals who are insulin resistant. Ann Intern Med. 2003;139(10):802-809.",
      },
      {
        citation:
          "Simental-Mendía LE, Rodríguez-Morán M, Guerrero-Romero F. The product of fasting glucose and triglycerides as surrogate for identifying insulin resistance in apparently healthy subjects. Metab Syndr Relat Disord. 2008;6(4):299-304.",
      },
      {
        citation:
          "Grundy SM, et al. Diagnosis and management of the metabolic syndrome: an American Heart Association/National Heart, Lung, and Blood Institute scientific statement. Circulation. 2005;112(17):2735-2752.",
      },
      {
        citation:
          "Alberti KG, et al. Harmonizing the metabolic syndrome: a joint interim statement of the IDF Task Force on Epidemiology and Prevention; NHLBI; AHA; WHF; IAS; IASO. Circulation. 2009;120(16):1640-1645.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked lipid and metabolic calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Laboratory-derived markers are estimates that must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "pediatric-assessment-scores",
    slug: "pediatric-assessment-scores",
    title: "Paediatric Assessment Scores",
    summary:
      "A tour of the paediatric scoring tools: Apgar for newborns, the Pediatric Glasgow Coma Scale and Pediatric Trauma Score, PECARN for head trauma, the Westley croup score, the Rochester criteria and Gorelick scale, PEWS, PALS hypotension thresholds, and BMI-for-age.",
    category: "Pediatrics",
    specialty: "Pediatrics",
    introduction: [
      "Paediatric scoring tools are built around age- and size-specific norms, and transferring an adult threshold to a child is a recurring source of error. The library spans newborn assessment, neurological and trauma scoring, common respiratory and infection presentations, ward deterioration, and growth.",
      "This guide groups the paediatric calculators in the library by the situation each is used in.",
    ],
    sections: [
      {
        heading: "Newborn assessment: the Apgar score",
        paragraphs: [
          "The Apgar score assigns points for appearance, pulse, grimace, activity, and respiration shortly after birth. It describes the newborn's condition and response to resuscitation at that moment; it is not designed to predict long-term outcome on its own.",
        ],
      },
      {
        heading: "Neurological and trauma scoring: Pediatric GCS, Pediatric Trauma Score, and PECARN",
        paragraphs: [
          "The Pediatric Glasgow Coma Scale modifies the verbal component of the adult scale for age while keeping the eye and motor components. The Pediatric Trauma Score grades injury severity in the injured child. The PECARN rule identifies children with minor blunt head trauma who are at very low risk of clinically important traumatic brain injury, supporting decisions about CT imaging.",
        ],
      },
      {
        heading: "Respiratory and infection tools: Westley, Rochester, and Gorelick",
        paragraphs: [
          "The Westley croup score grades the severity of viral croup using five components including stridor, air entry, and chest-wall retraction. The Rochester criteria risk-stratify febrile infants for serious bacterial infection, and the Gorelick scale predicts clinically important dehydration in children with gastroenteritis.",
        ],
      },
      {
        heading: "Ward deterioration and resuscitation thresholds: PEWS and PALS",
        paragraphs: [
          "The Brighton Pediatric Early Warning Score summarises behaviour and cardiovascular and respiratory observations to flag children at risk of deterioration on the ward. The PALS hypotension thresholds provide age-specific systolic blood pressure values used to define hypotension in paediatric resuscitation.",
        ],
      },
      {
        heading: "Growth assessment: BMI-for-age",
        paragraphs: [
          "The paediatric BMI calculator interprets body mass index against CDC growth charts by age and sex, because the meaning of a given BMI changes as a child grows. It is a screening tool read against the growth chart rather than an adult cutoff.",
        ],
      },
      {
        heading: "Using paediatric scores safely",
        paragraphs: [
          "Each tool is validated for a specific age band and clinical setting, and the interpretation is tied to the child's exact age and weight. Where a score informs an urgent decision, it complements — and never overrides — a thorough clinical assessment.",
        ],
      },
    ],
    relatedCalculators: [
      "apgar-score",
      "pediatric-gcs",
      "pediatric-trauma-score",
      "westley-croup-score",
      "pecarn-head-trauma",
      "rochester-criteria",
      "gorelick-dehydration",
      "pediatric-hypotension",
      "peds-pews",
      "bmi-for-pediatrics",
    ],
    relatedGuides: [
      "body-composition-and-dosing-weights",
      "sepsis-and-deterioration-scores",
    ],
    references: [
      {
        citation:
          "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
      },
      {
        citation:
          "AAP Committee on Fetus and Newborn, ACOG Committee on Obstetric Practice. The Apgar score. Pediatrics. 2015;136(4):819-822.",
      },
      {
        citation:
          "Tepas JJ 3rd, Ramenofsky ML, Mollitt DL, et al. The Pediatric Trauma Score as a predictor of injury severity in the injured child. J Pediatr Surg. 1987;22(1):14-18.",
      },
      {
        citation:
          "James HE, Trauner D. The Glasgow Coma Scale. In: James HE, Anas NG, Perkin RM, eds. Brain Insults in Infants and Children. Orlando, FL: Grune & Stratton; 1985:179-182.",
      },
      {
        citation:
          "Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
      },
      {
        citation:
          "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
      },
      {
        citation:
          "Jaskiewicz JA, McCarthy CA, Richardson AC, et al. Febrile infants at low risk for serious bacterial infection — an appraisal of the Rochester criteria and implications for management. Pediatrics. 1994;94(3):390-396.",
      },
      {
        citation:
          "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
      },
      {
        citation:
          "Monaghan A. Detecting and managing deterioration in children. Paediatr Nurs. 2005;17(1):32-35.",
      },
      {
        citation:
          "Kuczmarski RJ, Ogden CL, Guo SS, et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital Health Stat 11. 2002;(246):1-190.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked paediatric calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Paediatric scores embed age- and size-specific norms and must be interpreted in the full context of the individual child with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "obstetric-calculators-and-assessment",
    slug: "obstetric-calculators-and-assessment",
    title: "Obstetric Calculators and Antenatal Assessment",
    summary:
      "Pregnancy dating and fetal assessment tools: EDD and gestational age, Hadlock estimated fetal weight, the Bishop score, the biophysical profile, ACOG preeclampsia and HELLP criteria, magnesium sulfate dosing, obstetric blood loss, gestational weight gain, and the Edinburgh Postnatal Depression Scale.",
    category: "Obstetrics & Gynecology",
    specialty: "Obstetrics",
    introduction: [
      "Obstetric calculations are bound to dates and gestational windows: the correct tool depends on how far along the pregnancy is, and several are repeated at every visit so that change can be tracked. The library covers dating, fetal assessment, labour readiness, hypertensive disorders, haemorrhage, weight gain, and perinatal mood screening.",
      "This guide groups those calculators by the task each performs.",
    ],
    sections: [
      {
        heading: "Dating the pregnancy: EDD and gestational age",
        paragraphs: [
          "The estimated date of delivery calculator applies the conventional Naegele approach, adding 280 days to the first day of the last menstrual period, while recognising that ACOG guidance supports ultrasound-based dating when it differs by a defined margin. The gestational age calculator converts weeks and days into the decimal and weeks-plus-days forms used in antenatal records.",
        ],
      },
      {
        heading: "Fetal size and wellbeing: Hadlock EFW and the biophysical profile",
        paragraphs: [
          "The Hadlock four-parameter model estimates fetal weight from head and abdominal measurements and femur length; it is an estimate with an acknowledged margin of error. The biophysical profile scores fetal wellbeing from breathing, movement, tone, amniotic fluid volume, and the non-stress test.",
        ],
      },
      {
        heading: "Labour readiness: the Bishop score",
        paragraphs: [
          "The Bishop score grades cervical readiness for induction of labour from dilatation, effacement, station, consistency, and position. A higher score predicts a more favourable cervix for induction.",
        ],
      },
      {
        heading: "Hypertensive disorders: preeclampsia, HELLP, and magnesium",
        paragraphs: [
          "The preeclampsia criteria calculator applies the ACOG definition — new-onset hypertension after 20 weeks with proteinuria or end-organ dysfunction — and counts severe features. The HELLP criteria assess hemolysis, elevated liver enzymes, and low platelets. Magnesium sulfate dosing supports seizure prophylaxis in severe preeclampsia and eclampsia.",
        ],
      },
      {
        heading: "Haemorrhage, weight gain, and mood: EBL, IOM weight gain, and EPDS",
        paragraphs: [
          "The obstetric estimated blood loss calculator supports quantification by the gravimetric method or the hematocrit-based method. The gestational weight gain tool applies the IOM 2009 recommendations stratified by pre-pregnancy BMI. The Edinburgh Postnatal Depression Scale screens for perinatal depression.",
        ],
      },
      {
        heading: "Acting on obstetric numbers",
        paragraphs: [
          "Because these tools are calibrated to specific gestational windows and populations, the gestational age range for which a tool was validated should always be confirmed before it is applied. The outputs inform management alongside clinical findings, laboratory results, and the woman's own circumstances.",
        ],
      },
    ],
    relatedCalculators: [
      "edd",
      "gestational-age",
      "bishop-score",
      "biophysical-profile",
      "hellp-syndrome",
      "hadlock-efw",
      "preeclampsia-criteria",
      "gestational-weight-gain",
      "magnesium-sulfate-preeclampsia",
      "ebl-obstetric",
      "epds",
    ],
    relatedGuides: ["clinical-screening-questionnaires"],
    references: [
      {
        citation:
          "ACOG Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129(5):e150-e154.",
      },
      {
        citation:
          "Hadlock FP, et al. Am J Obstet Gynecol. 1985;151(3):333-337.",
      },
      {
        citation:
          "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268.",
      },
      {
        citation:
          "Manning FA, et al. Am J Obstet Gynecol. 1981;140(3):289-294.",
      },
      {
        citation:
          "ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.",
      },
      {
        citation:
          "Sibai BM, et al. Maternal morbidity and mortality in 442 pregnancies with hemolysis, elevated liver enzymes, and low platelets (HELLP syndrome). Am J Obstet Gynecol. 1993;169(4):1000-1006.",
      },
      {
        citation:
          "Institute of Medicine and National Research Council. Weight Gain During Pregnancy: Reexamining the Guidelines. The National Academies Press; 2009.",
      },
      {
        citation:
          "Zuspan FP. Treatment of severe preeclampsia and eclampsia. Clin Obstet Gynecol. 1966;9(4):954-972.",
      },
      {
        citation:
          "Pritchard JA. The use of the magnesium ion in the management of eclamptogenic toxemias. Surg Gynecol Obstet. 1955;100(2):131-140.",
      },
      {
        citation:
          "ACOG Committee Opinion No. 794: Quantitative blood loss in obstetric hemorrhage. Obstet Gynecol. 2019;134(6):e150-e156.",
      },
      {
        citation:
          "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry. 1987;150:782-786.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked obstetric calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Obstetric tools are calibrated to specific gestational windows and populations and must be interpreted in the full context of the individual pregnancy with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "clinical-screening-questionnaires",
    slug: "clinical-screening-questionnaires",
    title: "Clinical Screening Questionnaires",
    summary:
      "How the PHQ-9, GAD-7, Epworth Sleepiness Scale, and STOP-BANG questionnaire screen for depression, anxiety, daytime sleepiness, and obstructive sleep apnoea risk — and why a screening result is not a diagnosis.",
    category: undefined,
    specialty: "General Medicine",
    introduction: [
      "Screening questionnaires turn a short set of self-reported or observed items into a severity band or risk estimate. They are widely used in primary care and specialist clinics because they are quick, validated, and repeatable, and because they can be tracked over time. The library contains four: the PHQ-9, the GAD-7, the Epworth Sleepiness Scale, and the STOP-BANG questionnaire.",
      "This guide describes what each instrument screens for and why a positive result is a prompt for further assessment rather than a diagnosis.",
    ],
    sections: [
      {
        heading: "Depression: the PHQ-9",
        paragraphs: [
          "The PHQ-9 grades the severity of depressive symptoms over the previous two weeks using nine items aligned with the DSM criteria, and it also identifies possible suicidal ideation. It is validated as a brief depression severity measure and is commonly used to monitor treatment response.",
        ],
      },
      {
        heading: "Anxiety: the GAD-7",
        paragraphs: [
          "The GAD-7 grades the severity of generalised anxiety symptoms over the previous two weeks. It was developed as a brief measure for assessing generalised anxiety disorder and has been studied in primary care populations.",
        ],
      },
      {
        heading: "Daytime sleepiness: the Epworth Sleepiness Scale",
        paragraphs: [
          "The Epworth Sleepiness Scale quantifies the general level of daytime sleepiness across everyday situations, distinguishing pathological sleepiness from normal variation. It supports the evaluation of sleep disorders such as obstructive sleep apnoea and narcolepsy.",
        ],
      },
      {
        heading: "Obstructive sleep apnoea risk: STOP-BANG",
        paragraphs: [
          "The STOP-BANG questionnaire estimates the pre-test probability of obstructive sleep apnoea from history and physical findings, guiding the need for objective sleep testing. It is designed as a rapid screen and has high sensitivity but more moderate specificity.",
        ],
      },
      {
        heading: "Screening is not diagnosis",
        paragraphs: [
          "These instruments estimate the probability or severity of a condition; they do not establish a diagnosis, and a positive screen warrants further clinical evaluation. Scores are most informative when repeated and read as a trend alongside the clinical picture, not as a single standalone result.",
        ],
      },
    ],
    relatedCalculators: ["phq-9", "gad-7", "epworth", "stop-bang"],
    relatedGuides: ["obstetric-calculators-and-assessment"],
    references: [
      {
        citation:
          "Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.",
      },
      {
        citation:
          "Spitzer RL, Kroenke K, Williams JB. Validation and utility of a self-report version of PRIME-MD: the PHQ primary care study. JAMA. 1999;282(18):1737-1744.",
      },
      {
        citation:
          "Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
      },
      {
        citation:
          "Johns MW. A new method for measuring daytime sleepiness: the Epworth sleepiness scale. Sleep. 1991;14(6):540-545.",
      },
      {
        citation:
          "Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology. 2008;108(5):812-821.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked screening questionnaires are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Screening scores estimate probability or severity and must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
  {
    id: "oxygenation-and-respiratory-assessment",
    slug: "oxygenation-and-respiratory-assessment",
    title: "Oxygenation and Respiratory Assessment",
    summary:
      "The respiratory physiology calculators: the A–a oxygen gradient, PaO₂/FiO₂ ratio, oxygen index, ROX index, and BODE index — what each measures about gas exchange, lung injury, or COPD prognosis.",
    category: "Pulmonology",
    specialty: "Pulmonology",
    introduction: [
      "Respiratory calculators convert blood gas and ventilator values into measures of gas exchange and lung injury, and one composite index summarises COPD prognosis. They are used in critical care and respiratory clinics where objective oxygenation metrics complement the clinical assessment of distress.",
      "This guide describes what each of the five respiratory calculators measures.",
    ],
    sections: [
      {
        heading: "Gas exchange: the A–a oxygen gradient",
        paragraphs: [
          "The alveolar-arterial (A–a) oxygen gradient compares calculated alveolar oxygen with measured arterial oxygen. A widened gradient suggests that hypoxaemia is not explained by hypoventilation alone and points to impaired gas exchange such as ventilation-perfusion mismatch or shunt.",
        ],
      },
      {
        heading: "ARDS severity: the PaO₂/FiO₂ ratio and oxygen index",
        paragraphs: [
          "The PaO₂/FiO₂ (P/F) ratio quantifies the degree of oxygenation impairment and supports classification of ARDS severity under the Berlin definition. The oxygen index combines FiO₂, mean airway pressure, and PaO₂ to gauge the severity of oxygenation failure in mechanically ventilated patients, a measure used particularly in paediatric respiratory failure.",
        ],
      },
      {
        heading: "High-flow therapy: the ROX index",
        paragraphs: [
          "The ROX index combines oxygenation (SpO₂/FiO₂) with respiratory rate to estimate the likelihood that high-flow nasal cannula therapy will succeed in hypoxaemic respiratory failure, supporting decisions about when to escalate support.",
        ],
      },
      {
        heading: "COPD prognosis: the BODE index",
        paragraphs: [
          "The BODE index is a multidimensional prognostic measure for COPD that combines body mass index, airflow obstruction, dyspnoea, and exercise capacity. It is used to predict mortality and inform decisions such as transplant evaluation, and it is read over time rather than as an isolated value.",
        ],
      },
      {
        heading: "Reading oxygenation numbers",
        paragraphs: [
          "Oxygenation indices depend on the FiO₂ and ventilator settings at the moment of measurement, so trends within a stable setting mean more than single values. They are decision-support measures that complement, not replace, bedside assessment and the broader clinical trajectory.",
        ],
      },
    ],
    relatedCalculators: [
      "a-a-gradient",
      "oxygen-index",
      "pf-ratio",
      "rox-index",
      "bode-index",
    ],
    relatedGuides: [
      "venous-thromboembolism-assessment",
      "sepsis-and-deterioration-scores",
    ],
    references: [
      {
        citation:
          "Fenn WO, Rahn H, Otis AB. Am J Physiol. 1946;146(5):637-653.",
      },
      {
        citation:
          "West JB. Respiratory Physiology: The Essentials. 11th ed. Wolters Kluwer; 2022.",
      },
      {
        citation:
          "ARDS Definition Task Force; Ranieri VM, et al. Acute respiratory distress syndrome: the Berlin definition. JAMA. 2012;307(23):2526-2533.",
      },
      {
        citation:
          "Pediatric Acute Lung Injury Consensus Conference Group. Pediatric Acute Respiratory Distress Syndrome: Consensus Recommendations From the Pediatric Acute Lung Injury Consensus Conference. Pediatr Crit Care Med. 2015;16(5):428-439.",
      },
      {
        citation:
          "Roca O, et al. Predicting success of high-flow nasal cannula in pneumonia patients with hypoxemic respiratory failure: The utility of the ROX index. J Crit Care. 2016;35:200-205.",
      },
      {
        citation:
          "Celli BR, Cote CG, Marin JM, et al. The Body-Mass Index, Airflow Obstruction, Dyspnea, and Exercise Capacity Index in Chronic Obstructive Pulmonary Disease. N Engl J Med. 2004;350(10):1005-1012.",
      },
      {
        citation:
          "Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease. 2024 Report.",
      },
    ],
    publication: {
      publishedAt: "2026-10-11",
      updatedAt: "2026-10-11",
    },
    disclaimer:
      "This guide explains how the linked respiratory calculators are intended to be used; it is educational and does not provide medical advice, diagnosis, or treatment. Oxygenation indices depend on the ventilator settings at the time of measurement and must be interpreted in the full context of the individual patient with professional judgment. Consistent with the Content Sources page, neither the calculators nor this guide has a completed human clinical review record yet.",
  },
];