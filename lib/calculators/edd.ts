import type { CalculatorDefinition } from "./calculator.types";
import { calculateEdd } from "./utils/obgyn";

export const eddCalculator: CalculatorDefinition = {
  id: "edd",

  slug: "edd",

  name: "EDD",

  shortName: "EDD",

  description: "Estimates the expected date of delivery from the last menstrual period.",

  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  formula: "EDD = LMP + 280 days",

  normalRange: "Typically around 40 weeks from LMP",

  clinicalNotes:
    "The estimated date of delivery (EDD) is a clinical estimate of the anticipated date of birth, calculated by adding 280 days (40 weeks) to the first day of the last menstrual period (LMP), per the standard Naegele rule. This calculation assumes a regular 28-day menstrual cycle with ovulation occurring approximately 14 days before the next menses.\n\nGestational dating is a cornerstone of prenatal care, guiding the scheduling of prenatal visits, screening tests (e.g., Down syndrome screening, glucose tolerance testing), surveillance of fetal growth, and timing of delivery. Accurate dating is essential for managing preterm labor, post-term pregnancies, and decisions about induction of labor.\n\nImportant limitations: The EDD based on LMP is an estimate. It may be inaccurate if the patient has irregular cycles, uncertain recall of the LMP, or if ovulation occurred at a different point in the cycle. First-trimester ultrasound dating (crown-rump length measurement) is considered more reliable than LMP dating and may supersede LMP-based estimates when the discrepancy is significant (typically > 5–7 days in the first trimester). After the first trimester, ultrasound dating becomes less precise for establishing gestational age.\n\nThis calculator provides an educational estimate only. The EDD should always be confirmed or refined by early ultrasound when available, and clinical decisions should be based on the most reliable dating method available for the individual patient.",

  references: [
    "ACOG Committee Opinion No. 700: Methods for Estimating the Due Date. Obstet Gynecol. 2017;129(5):e150-e154.",
    "WHO recommendations on antenatal care for a positive pregnancy experience. World Health Organization; 2016.",
  ],



  keywords: ["EDD", "Expected Date of Delivery", "Pregnancy", "Obstetrics"],

  inputs: [
    {
      id: "lmp",
      label: "Last Menstrual Period",
      type: "text",
      required: true,
    },
  ],

  calculate(values) {
    const date = calculateEdd(values.lmp);

    return {
      value: date,
      interpretation: date ? "Estimated date of delivery" : "Please enter a valid date",
      status: date ? "normal" : "high",
    };
  },
};
