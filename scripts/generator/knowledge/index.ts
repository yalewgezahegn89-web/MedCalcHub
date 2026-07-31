import { anthropometryKnowledge } from "./anthropometry";
import { cardiologyKnowledge } from "./cardiology";
import { criticalCareKnowledge } from "./critical-care";
import { emergencyKnowledge } from "./emergency";
import { laboratoryKnowledge } from "./laboratory";
import { nephrologyKnowledge } from "./nephrology";

export const calculatorKnowledge = {
  ...anthropometryKnowledge,
  ...cardiologyKnowledge,
  ...criticalCareKnowledge,
  ...emergencyKnowledge,
  ...laboratoryKnowledge,
  ...nephrologyKnowledge,
};

export type CalculatorKey =
  keyof typeof calculatorKnowledge;