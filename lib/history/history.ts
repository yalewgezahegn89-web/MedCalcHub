export type CalculationHistoryItem = {
  calculatorId: string;
  calculatorName: string;
  result: string;
  timestamp: number;
};

const STORAGE_KEY = "medcalchub-history";

const CHANGE_EVENT = "medcalchub-history-changed";

export function getCalculationHistory(): CalculationHistoryItem[] {
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

export function saveCalculation(
  item: CalculationHistoryItem,
): boolean {
  const history = getCalculationHistory();

  history.unshift(item);

  const unique = history.filter(
    (entry, index, self) =>
      index ===
      self.findIndex(
        (x) =>
          x.calculatorId === entry.calculatorId &&
          x.result === entry.result,
      ),
  );

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(unique.slice(0, 50)),
    );

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function deleteHistoryEntry(index: number): boolean {
  const history = getCalculationHistory();

  if (index < 0 || index >= history.length) {
    return true;
  }

  const next = [
    ...history.slice(0, index),
    ...history.slice(index + 1),
  ];

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next),
    );

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearHistory(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
