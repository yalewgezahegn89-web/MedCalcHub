export interface FormulaResult {
  value: number | string;
  interpretation: string;
  status:
    | "normal"
    | "warning"
    | "critical";
}

export type FormulaFunction = (
  values: Record<string, unknown>,
) => FormulaResult;