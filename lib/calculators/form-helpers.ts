import type { CalculatorInput } from "@/lib/calculators";

/**
 * Build initial form values from calculator input definitions.
 *
 * Priority:
 * 1. initialValues (from saved calculation restore) — applied by the caller
 * 2. input.defaultValue — used here as the base
 * 3. empty string — fallback
 *
 * Only declared calculator input IDs may exist in state.
 */
export function buildInitialValues(
  inputs: CalculatorInput[],
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const input of inputs) {
    values[input.id] = input.defaultValue ?? "";
  }

  return values;
}

/**
 * Merge saved initialValues over a base set of form values.
 * Only keys that match declared calculator input IDs are applied.
 * Unknown keys in initialValues are silently ignored.
 */
export function mergeInitialValues(
  base: Record<string, string>,
  inputIds: string[],
  initialValues?: Record<string, string>,
): Record<string, string> {
  if (!initialValues) {
    return base;
  }

  const result = { ...base };

  for (const id of inputIds) {
    if (id in initialValues) {
      result[id] = initialValues[id];
    }
  }

  return result;
}
