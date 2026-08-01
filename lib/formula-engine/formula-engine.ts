import { formulas } from "./formulas";

export class FormulaEngine {
  static calculate(
    id: string,
    values: Record<string, unknown>,
  ) {
    const formula =
      formulas[id];

    if (!formula) {
      throw new Error(
        `Formula "${id}" not found.`,
      );
    }

    return formula(values);
  }
}