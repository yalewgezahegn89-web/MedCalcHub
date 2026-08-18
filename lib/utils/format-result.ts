/**
 * Format a calculation result into a human-readable string.
 */
export function formatResult(
  result?: { value: string | number; unit?: string },
): string | null {
  if (!result) return null;
  return `${result.value}${result.unit ? ` ${result.unit}` : ""}`;
}
