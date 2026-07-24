import type { CalculatorDefinition } from "./calculator.types";

export const roxIndexCalculator: CalculatorDefinition = {
  id: "rox-index",
  slug: "rox-index",
  name: "ROX Index",
  shortName: "ROX",
  description:
    "A simplified educational estimate of success of high-flow nasal cannula oxygen therapy in hypoxemic respiratory failure.",
  category: "Critical Care",
  specialty: "critical-care",
  featured: true,
  updatedAt: "2026-07",
  version: "1.0",
  keywords: ["ROX", "Critical Care", "Respiratory failure", "HFNC"],
  warnings: [
    "This is an educational approximation and should not replace clinical assessment of respiratory failure.",
  ],
  formula: "ROX = SpO2 / FiO2 / respiratory rate",
  normalRange: ">4.88",
  referenceRanges: [
    { label: "Favorable", range: ">4.88" },
    { label: "Uncertain", range: "3.8–4.88" },
    { label: "Poor", range: "<3.8" },
  ],
  clinicalNotes:
    "Higher ROX values suggest greater likelihood of successful HFNC weaning.",
  references: ["Roca O, et al. JAMA. 2019.", "Respiratory failure"],
  inputs: [
    { id: "spo2", label: "SpO2", type: "number", unit: "%", required: true, min: 70, max: 100, step: 1 },
    { id: "fio2", label: "FiO2", type: "number", unit: "%", required: true, min: 0.2, max: 1, step: 0.01 },
    { id: "respiratoryRate", label: "Respiratory Rate", type: "number", unit: "breaths/min", required: true, min: 10, max: 60, step: 1 },
  ],
  calculate(values) {
    const spo2 = parseFloat(values.spo2);
    const fio2 = parseFloat(values.fio2);
    const respiratoryRate = parseFloat(values.respiratoryRate);

    const rox = respiratoryRate > 0 ? (spo2 / (fio2 * 100)) / respiratoryRate : 0;
    const rounded = Math.round(rox * 100) / 100;

    let interpretation = "Favorable ROX index";
    let status: "normal" | "low" | "high" | "critical" = "normal";
    if (rounded < 3.8) {
      interpretation = "Poor likelihood of HFNC success";
      status = "critical";
    } else if (rounded < 4.88) {
      interpretation = "Intermediate ROX index";
      status = "high";
    }

    return { value: rounded, unit: "ratio", interpretation, status };
  },
};
