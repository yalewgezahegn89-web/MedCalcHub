import { anthropometryKnowledge } from "./anthropometry";
import { cardiologyKnowledge } from "./cardiology";
import { criticalCareKnowledge } from "./critical-care";
import { emergencyKnowledge } from "./emergency";
import { endocrinologyKnowledge } from "./endocrinology";
import { laboratoryKnowledge } from "./laboratory";
import { nephrologyKnowledge } from "./nephrology";

export const calculatorKnowledge = {
  ...anthropometryKnowledge,
  ...cardiologyKnowledge,
  ...criticalCareKnowledge,
  ...emergencyKnowledge,
  ...endocrinologyKnowledge,
  ...laboratoryKnowledge,
  ...nephrologyKnowledge,
};

export type CalculatorKey =
  keyof typeof calculatorKnowledge;