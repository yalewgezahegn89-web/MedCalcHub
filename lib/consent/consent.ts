const STORAGE_KEY = "medcalchub-consent";
const CHANGE_EVENT = "medcalchub-consent-changed";

export function getConsent(): boolean | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === "true") return true;
    if (raw === "false") return false;

    return null;
  } catch {
    return null;
  }
}

export function setConsent(granted: boolean): boolean {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, String(granted));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearConsent(): boolean {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function hasConsent(): boolean {
  return getConsent() === true;
}

export function subscribeConsent(
  callback: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
