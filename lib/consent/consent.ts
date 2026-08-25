const STORAGE_KEY = "medcalchub-consent";
const CHANGE_EVENT = "medcalchub-consent-changed";

/*
 * In-memory session fallback.
 *
 * Some iOS Safari privacy configurations (Lockdown Mode, disabled website
 * data, private-browsing quota errors) make `localStorage.setItem` throw.
 * Previously that exception was swallowed and the change event was never
 * dispatched, so the consent banner could never be dismissed on those
 * devices. The decision is now always recorded in memory for the session
 * and subscribers are always notified; persistence is best-effort.
 */
let memoryConsent: boolean | null = null;

export function getConsent(): boolean | null {
  if (memoryConsent !== null) {
    return memoryConsent;
  }

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
  if (typeof window === "undefined") {
    return false;
  }

  // Record the decision first so the UI always reacts, even when
  // storage writes are blocked by the browser.
  memoryConsent = granted;

  try {
    localStorage.setItem(STORAGE_KEY, String(granted));
  } catch {
    // Persistence unavailable — session-only consent is acceptable.
    // Never let a storage failure block the banner dismissal.
  }

  try {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Event dispatch unavailable in exotic environments; state still flips.
  }

  return true;
}

export function clearConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  memoryConsent = null;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Same resilience contract as setConsent.
  }

  try {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // State already reset in memory.
  }

  return true;
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
