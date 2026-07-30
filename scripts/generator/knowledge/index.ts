import { anthropometryKnowledge } from "./anthropometry";

export const calculatorKnowledge = {
  ...anthropometryKnowledge,
};

export type CalculatorKey =
  keyof typeof calculatorKnowledge;