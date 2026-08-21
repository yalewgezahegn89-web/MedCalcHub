import { useSyncExternalStore } from "react";

type LocalStore<T> = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => string;
  getServerSnapshot: () => string;
  parse: () => T;
};

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "[]";
  }
}

function safeParse(snapshot: string, fallback: unknown): unknown {
  try {
    return JSON.parse(snapshot);
  } catch {
    return fallback;
  }
}

function defaultServerValue(read: () => unknown): string {
  try {
    const sample = read();
    if (Array.isArray(sample)) return "[]";
    if (sample === null) return "null";
    if (typeof sample === "object") return "{}";
    if (typeof sample === "boolean") return "false";
    if (typeof sample === "number") return "0";
    return "[]";
  } catch {
    return "[]";
  }
}

export function createLocalStore<T>(
  eventName: string,
  read: () => T,
): LocalStore<T> {
  function subscribe(callback: () => void) {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handler = () => callback();

    window.addEventListener("storage", handler);
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(eventName, handler);
    };
  }

  function getSnapshot() {
    try {
      return safeStringify(read());
    } catch {
      return "[]";
    }
  }

  function getServerSnapshot() {
    return defaultServerValue(read);
  }

  function parse() {
    try {
      const snapshot = getSnapshot();
      return safeParse(snapshot, safeStringify(read())) as T;
    } catch {
      return "[]" as unknown as T;
    }
  }

  return { subscribe, getSnapshot, getServerSnapshot, parse };
}

export function useLocalStorageStore<T>(
  store: LocalStore<T>,
): T {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return safeParse(snapshot, safeParse(store.getServerSnapshot(), [])) as T;
}
