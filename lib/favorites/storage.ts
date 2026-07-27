const STORAGE_KEY = "medcalchub:favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveFavorites(
  favorites: string[],
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites),
  );
}

export function isFavorite(
  id: string,
): boolean {
  return getFavorites().includes(id);
}

export function addFavorite(
  id: string,
): void {
  const favorites = getFavorites();

  if (!favorites.includes(id)) {
    favorites.push(id);
    saveFavorites(favorites);
  }
}

export function removeFavorite(
  id: string,
): void {
  const favorites = getFavorites().filter(
    (item) => item !== id,
  );

  saveFavorites(favorites);
}

export function toggleFavorite(
  id: string,
): boolean {
  const favorites = getFavorites();

  const exists = favorites.includes(id);

  if (exists) {
    saveFavorites(
      favorites.filter((item) => item !== id),
    );

    notifyFavoritesChanged();

    return false;
  }

  favorites.push(id);

  saveFavorites(favorites);

  notifyFavoritesChanged();

  return true;
}
export function notifyFavoritesChanged() {
  window.dispatchEvent(
    new Event("favorites-changed"),
  );
}