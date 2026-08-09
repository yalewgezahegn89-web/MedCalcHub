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
) {
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
  } catch {
    // Storage may be full or unavailable — fail gracefully
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable — fail gracefully
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}
