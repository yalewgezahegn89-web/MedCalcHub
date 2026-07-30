import { anthropometryKnowledge } from "./anthropometry";
import { nephrologyKnowledge } from "./nephrology";
export const calculatorKnowledge = {
  ...anthropometryKnowledge,
  ...nephrologyKnowledge,
};

export type CalculatorKey =
  keyof typeof calculatorKnowledge;