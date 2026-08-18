import type { CalculatorResult } from "./calculators";

export type SavedCalculation = {
  id: string;
  calculatorId: string;
  calculatorName: string;
  values: Record<string, string>;
  result?: CalculatorResult;
  savedAt: number;
};

const STORAGE_KEY = "medcalchub-saved-calculations";

export const SAVED_CALCULATIONS_CHANGED =
  "medcalchub-saved-calculations-changed";

const MAX_ENTRIES = 50;

function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `sc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getSavedCalculations(): SavedCalculation[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getSavedCalculation(
  id: string,
): SavedCalculation | undefined {
  return getSavedCalculations().find((s) => s.id === id);
}

export function saveSavedCalculation(
  item: Omit<SavedCalculation, "id">,
): boolean {
  const existing = getSavedCalculations();

  const entry: SavedCalculation = {
    ...item,
    id: generateId(),
  };

  existing.unshift(entry);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(existing.slice(0, MAX_ENTRIES)),
    );

    window.dispatchEvent(
      new Event(SAVED_CALCULATIONS_CHANGED),
    );
    return true;
  } catch {
    return false;
  }
}

export function deleteSavedCalculation(
  id: string,
): boolean {
  const existing = getSavedCalculations();
  const next = existing.filter((s) => s.id !== id);

  if (next.length === existing.length) {
    return true;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next),
    );

    window.dispatchEvent(
      new Event(SAVED_CALCULATIONS_CHANGED),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearSavedCalculations(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(
      new Event(SAVED_CALCULATIONS_CHANGED),
    );
    return true;
  } catch {
    return false;
  }
}
