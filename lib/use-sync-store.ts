import { useSyncExternalStore } from "react";

type LocalStore<T> = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => string;
  getServerSnapshot: () => string;
  parse: () => T;
};

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
    return JSON.stringify(read());
  }

  function getServerSnapshot() {
    return "[]";
  }

  function parse() {
    return JSON.parse(getSnapshot()) as T;
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

  return JSON.parse(snapshot) as T;
}
