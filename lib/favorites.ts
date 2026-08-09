const STORAGE_KEY = "medcalchub-favorites";

const CHANGE_EVENT = "medcalchub-favorites-changed";

export function getFavorites(): string[] {
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

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function addFavorite(id: string) {
  const favorites = getFavorites();

  if (!favorites.includes(id)) {
    favorites.push(id);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      // Storage may be full or unavailable — fail gracefully
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export function removeFavorite(id: string) {
  const favorites = getFavorites().filter(
    (item) => item !== id,
  );

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites),
    );
  } catch {
    // Storage may be full or unavailable — fail gracefully
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function toggleFavorite(id: string): boolean {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  } else {
    addFavorite(id);
    return true;
  }
}
