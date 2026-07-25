const STORAGE_KEY = "medcalchub-recent";

const MAX_RECENT = 10;

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

export function addRecentCalculator(id: string) {
  const recent = getRecentCalculators().filter(
    (item) => item !== id,
  );

  recent.unshift(id);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT)),
  );
}

export function removeRecentCalculator(id: string) {
  const recent = getRecentCalculators().filter(
    (item) => item !== id,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(recent),
  );
}

export function clearRecentCalculators() {
  localStorage.removeItem(STORAGE_KEY);
}