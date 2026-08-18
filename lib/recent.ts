const STORAGE_KEY = "medcalchub-recent";

const MAX_RECENT = 10;

const CHANGE_EVENT = "medcalchub-recent-changed";

export function getRecentCalculators(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentCalculator(id: string): boolean {
  const recent = getRecentCalculators().filter(
    (item) => item !== id,
  );

  recent.unshift(id);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recent.slice(0, MAX_RECENT)),
    );

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function removeRecentCalculator(id: string): boolean {
  const recent = getRecentCalculators().filter(
    (item) => item !== id,
  );

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recent),
    );

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearRecentCalculators(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
