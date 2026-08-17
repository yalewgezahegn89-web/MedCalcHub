import { describe, it, expect, beforeEach, vi } from "vitest";
import { createLocalStore } from "../../lib/use-sync-store";

function createMockWindow() {
  const listeners: Record<string, Set<() => void>> = {};

  return {
    listeners,
    mock: {
      addEventListener: vi.fn(
        (event: string, handler: () => void) => {
          if (!listeners[event]) {
            listeners[event] = new Set();
          }
          listeners[event].add(handler);
        },
      ),
      removeEventListener: vi.fn(
        (event: string, handler: () => void) => {
          listeners[event]?.delete(handler);
        },
      ),
      dispatchEvent: vi.fn((event: Event) => {
        const handlers = listeners[event.type];
        if (handlers) {
          for (const h of handlers) h();
        }
        return true;
      }),
    },
  };
}

describe("use-sync-store", () => {
  let mockWin: ReturnType<typeof createMockWindow>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    mockWin = createMockWindow();
    vi.stubGlobal("window", mockWin.mock);
  });

  describe("createLocalStore", () => {
    it("returns subscribe, getSnapshot, getServerSnapshot, and parse", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["a", "b"],
      );

      expect(typeof store.subscribe).toBe("function");
      expect(typeof store.getSnapshot).toBe("function");
      expect(typeof store.getServerSnapshot).toBe("function");
      expect(typeof store.parse).toBe("function");
    });

    it("getSnapshot returns JSON-stringified getter result", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["x", "y"],
      );

      expect(store.getSnapshot()).toBe(JSON.stringify(["x", "y"]));
    });

    it("getServerSnapshot always returns '[]'", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["x"],
      );

      expect(store.getServerSnapshot()).toBe("[]");
    });

    it("parse returns the getter result", () => {
      const store = createLocalStore(
        "test-changed",
        () => ({ foo: 1 }),
      );

      expect(store.parse()).toEqual({ foo: 1 });
    });
  });

  describe("subscribe", () => {
    it("registers both storage and custom event listeners", () => {
      const store = createLocalStore(
        "my-custom-changed",
        () => [],
      );

      store.subscribe(() => {});

      expect(mockWin.mock.addEventListener).toHaveBeenCalledWith(
        "storage",
        expect.any(Function),
      );
      expect(mockWin.mock.addEventListener).toHaveBeenCalledWith(
        "my-custom-changed",
        expect.any(Function),
      );
    });

    it("invokes callback when custom event fires", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const cb = vi.fn();
      store.subscribe(cb);

      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("invokes callback when storage event fires", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const cb = vi.fn();
      store.subscribe(cb);

      window.dispatchEvent(new Event("storage"));

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("cleanup removes both listeners", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const unsub = store.subscribe(() => {});
      unsub();

      expect(mockWin.mock.removeEventListener).toHaveBeenCalledWith(
        "storage",
        expect.any(Function),
      );
      expect(mockWin.mock.removeEventListener).toHaveBeenCalledWith(
        "favorites-changed",
        expect.any(Function),
      );
    });

    it("callback not invoked after cleanup", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const cb = vi.fn();
      const unsub = store.subscribe(cb);
      unsub();

      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb).not.toHaveBeenCalled();
    });

    it("supports multiple independent subscriptions", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const cb1 = vi.fn();
      const cb2 = vi.fn();
      store.subscribe(cb1);
      store.subscribe(cb2);

      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb1).toHaveBeenCalledTimes(1);
      expect(cb2).toHaveBeenCalledTimes(1);
    });

    it("double-unsub is safe", () => {
      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const unsub = store.subscribe(() => {});
      unsub();
      unsub();

      expect(mockWin.mock.removeEventListener).toHaveBeenCalledTimes(4);
    });
  });

  describe("SSR safety", () => {
    it("returns no-op cleanup when window is undefined", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore(
        "favorites-changed",
        () => [],
      );

      const unsub = store.subscribe(() => {});

      expect(typeof unsub).toBe("function");
      expect(() => unsub()).not.toThrow();
    });

    it("getSnapshot works without window", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore(
        "favorites-changed",
        () => ["a"],
      );

      expect(store.getSnapshot()).toBe(JSON.stringify(["a"]));
    });

    it("getServerSnapshot works without window", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore(
        "favorites-changed",
        () => ["a"],
      );

      expect(store.getServerSnapshot()).toBe("[]");
    });
  });
});
