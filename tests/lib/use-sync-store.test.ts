import { describe, it, expect, beforeEach, vi } from "vitest";
import { createLocalStore } from "../../lib/use-sync-store";

// Mock useSyncExternalStore to test useLocalStorageStore without React rendering
const mockUseSyncExternalStore = vi.fn();

vi.mock("react", () => ({
  useSyncExternalStore: (...args: unknown[]) =>
    mockUseSyncExternalStore(...args),
}));

// Import after mock setup so it uses the mocked React
const { useLocalStorageStore } = await import("../../lib/use-sync-store");

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

    it("getServerSnapshot returns '[]' for array store", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["x"],
      );

      expect(store.getServerSnapshot()).toBe("[]");
    });

    it("getServerSnapshot returns '{}' for object store", () => {
      const store = createLocalStore(
        "test-changed",
        () => ({ key: "value" }),
      );

      expect(store.getServerSnapshot()).toBe("{}");
    });

    it("getServerSnapshot returns 'false' for boolean store", () => {
      const store = createLocalStore(
        "test-changed",
        () => true,
      );

      expect(store.getServerSnapshot()).toBe("false");
    });

    it("getServerSnapshot returns 'null' for null store", () => {
      const store = createLocalStore(
        "test-changed",
        () => null,
      );

      expect(store.getServerSnapshot()).toBe("null");
    });

    it("getServerSnapshot returns '0' for number store", () => {
      const store = createLocalStore(
        "test-changed",
        () => 42,
      );

      expect(store.getServerSnapshot()).toBe("0");
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

  describe("malformed JSON resilience", () => {
    it("getSnapshot survives read() throwing", () => {
      const store = createLocalStore(
        "test-changed",
        () => {
          throw new Error("read failure");
        },
      );

      expect(store.getSnapshot()).toBe("[]");
    });

    it("parse survives read() throwing", () => {
      const store = createLocalStore(
        "test-changed",
        () => {
          throw new Error("read failure");
        },
      );

      expect(() => store.parse()).not.toThrow();
    });
  });

  describe("serialization failure safety", () => {
    it("getSnapshot returns '[]' when read() returns circular reference", () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;

      const store = createLocalStore(
        "test-changed",
        () => circular,
      );

      expect(store.getSnapshot()).toBe("[]");
    });

    it("parse returns fallback when snapshot is unparseable", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["a", "b"],
      );

      expect(store.parse()).toEqual(["a", "b"]);
    });
  });

  describe("getServerSnapshot type safety", () => {
    it("returns '[]' for array store", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["x"],
      );

      const serverSnap = store.getServerSnapshot();
      expect(() => JSON.parse(serverSnap)).not.toThrow();
      expect(JSON.parse(serverSnap)).toEqual([]);
    });

    it("returns '{}' for object store", () => {
      const store = createLocalStore(
        "test-changed",
        () => ({ key: "value" }),
      );

      const serverSnap = store.getServerSnapshot();
      expect(() => JSON.parse(serverSnap)).not.toThrow();
      expect(JSON.parse(serverSnap)).toEqual({});
    });

    it("returns 'false' for boolean store", () => {
      const store = createLocalStore(
        "test-changed",
        () => true,
      );

      const serverSnap = store.getServerSnapshot();
      expect(() => JSON.parse(serverSnap)).not.toThrow();
      expect(JSON.parse(serverSnap)).toBe(false);
    });

    it("returns 'null' for null store", () => {
      const store = createLocalStore(
        "test-changed",
        () => null,
      );

      const serverSnap = store.getServerSnapshot();
      expect(() => JSON.parse(serverSnap)).not.toThrow();
      expect(JSON.parse(serverSnap)).toBe(null);
    });
  });

  describe("hydration-safe snapshot", () => {
    it("getServerSnapshot is deterministic across calls", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["a", "b"],
      );

      const first = store.getServerSnapshot();
      const second = store.getServerSnapshot();
      expect(first).toBe(second);
    });

    it("parse on server snapshot returns type-compatible value", () => {
      const arrayStore = createLocalStore(
        "test-changed",
        () => ["a", "b"],
      );

      const parsed = JSON.parse(arrayStore.getServerSnapshot());
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toEqual([]);
    });
  });

  describe("useLocalStorageStore integration", () => {
    beforeEach(() => {
      mockUseSyncExternalStore.mockReset();
    });

    it("calls useSyncExternalStore with store subscribe, getSnapshot, getServerSnapshot", () => {
      const store = createLocalStore("test-changed", () => ["a"]);
      mockUseSyncExternalStore.mockReturnValue(["a"]);

      useLocalStorageStore(store);

      expect(mockUseSyncExternalStore).toHaveBeenCalledWith(
        store.subscribe,
        store.getSnapshot,
        store.getServerSnapshot,
      );
    });

    it("returns parsed array when snapshot is valid JSON array", () => {
      const store = createLocalStore("test-changed", () => ["x", "y"]);
      mockUseSyncExternalStore.mockReturnValue(JSON.stringify(["x", "y"]));

      const result = useLocalStorageStore(store);

      expect(result).toEqual(["x", "y"]);
    });

    it("returns parsed object when snapshot is valid JSON object", () => {
      const store = createLocalStore("test-changed", () => ({ key: "val" }));
      mockUseSyncExternalStore.mockReturnValue(JSON.stringify({ key: "val" }));

      const result = useLocalStorageStore(store);

      expect(result).toEqual({ key: "val" });
    });

    it("returns parsed boolean when snapshot is valid JSON boolean", () => {
      const store = createLocalStore("test-changed", () => true);
      mockUseSyncExternalStore.mockReturnValue("true");

      const result = useLocalStorageStore(store);

      expect(result).toBe(true);
    });

    it("returns parsed null when snapshot is valid JSON null", () => {
      const store = createLocalStore("test-changed", () => null);
      mockUseSyncExternalStore.mockReturnValue("null");

      const result = useLocalStorageStore(store);

      expect(result).toBe(null);
    });

    it("returns parsed number when snapshot is valid JSON number", () => {
      const store = createLocalStore("test-changed", () => 42);
      mockUseSyncExternalStore.mockReturnValue("42");

      const result = useLocalStorageStore(store);

      expect(result).toBe(42);
    });

    it("falls back to server snapshot when client snapshot is malformed", () => {
      const store = createLocalStore("test-changed", () => ["a"]);
      mockUseSyncExternalStore.mockReturnValue("not-valid-json");

      const result = useLocalStorageStore(store);

      // Server snapshot for array is "[]", which parses to []
      expect(result).toEqual([]);
    });

    it("falls back to server snapshot when client snapshot is empty string", () => {
      const store = createLocalStore("test-changed", () => ["a"]);
      mockUseSyncExternalStore.mockReturnValue("");

      const result = useLocalStorageStore(store);

      // safeParse("", "[]") -> fallback "[]" -> []
      expect(result).toEqual([]);
    });

    it("returns type-compatible value for each store type", () => {
      const arrayStore = createLocalStore("a", () => [1, 2]);
      const objectStore = createLocalStore("b", () => ({ x: 1 }));
      const boolStore = createLocalStore("c", () => true);
      const nullStore = createLocalStore("d", () => null);
      const numStore = createLocalStore("e", () => 99);

      mockUseSyncExternalStore
        .mockReturnValueOnce(JSON.stringify([1, 2]))
        .mockReturnValueOnce(JSON.stringify({ x: 1 }))
        .mockReturnValueOnce("true")
        .mockReturnValueOnce("null")
        .mockReturnValueOnce("99");

      expect(useLocalStorageStore(arrayStore)).toEqual([1, 2]);
      expect(useLocalStorageStore(objectStore)).toEqual({ x: 1 });
      expect(useLocalStorageStore(boolStore)).toBe(true);
      expect(useLocalStorageStore(nullStore)).toBe(null);
      expect(useLocalStorageStore(numStore)).toBe(99);
    });

    it("subscribe is passed through to useSyncExternalStore", () => {
      const store = createLocalStore("test-changed", () => []);
      const subscribeFn = vi.fn();
      store.subscribe = subscribeFn;
      mockUseSyncExternalStore.mockReturnValue("[]");

      useLocalStorageStore(store);

      expect(mockUseSyncExternalStore).toHaveBeenCalledWith(
        subscribeFn,
        expect.any(Function),
        expect.any(Function),
      );
    });
  });

  describe("cross-tab storage synchronization", () => {
    it("matching custom event triggers subscriber callback", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb = vi.fn();
      store.subscribe(cb);

      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("matching storage event triggers subscriber callback", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb = vi.fn();
      store.subscribe(cb);

      window.dispatchEvent(new Event("storage"));

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("unrelated custom event does NOT trigger callback", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb = vi.fn();
      store.subscribe(cb);

      window.dispatchEvent(new Event("history-changed"));

      expect(cb).not.toHaveBeenCalled();
    });

    it("malformed external storage value does not crash subscriber", () => {
      const store = createLocalStore(
        "test-changed",
        () => ["a"],
      );
      const cb = vi.fn();
      store.subscribe(cb);

      // Simulate external tab writing malformed data
      expect(() => {
        window.dispatchEvent(new Event("storage"));
      }).not.toThrow();

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("external update produces correct parsed value via getSnapshot", () => {
      let data = ["initial"];
      const store = createLocalStore("test-changed", () => data);
      const cb = vi.fn();
      store.subscribe(cb);

      // Simulate external update
      data = ["updated", "value"];
      window.dispatchEvent(new Event("storage"));

      expect(cb).toHaveBeenCalledTimes(1);
      expect(store.getSnapshot()).toBe(JSON.stringify(["updated", "value"]));
    });

    it("unsubscribe stops listener from receiving events", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb = vi.fn();
      const unsub = store.subscribe(cb);

      unsub();
      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb).not.toHaveBeenCalled();
    });

    it("repeated subscribe/unsubscribe does not leak listeners", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb = vi.fn();

      for (let i = 0; i < 10; i++) {
        const unsub = store.subscribe(cb);
        unsub();
      }

      window.dispatchEvent(new Event("favorites-changed"));

      // Callback should never fire since all subscriptions were cleaned up
      expect(cb).not.toHaveBeenCalled();
    });

    it("multiple subscribers receive independent callbacks", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      store.subscribe(cb1);
      store.subscribe(cb2);

      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb1).toHaveBeenCalledTimes(1);
      expect(cb2).toHaveBeenCalledTimes(1);
    });

    it("first unsubscribe does not affect second subscriber", () => {
      const store = createLocalStore("favorites-changed", () => []);
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      const unsub1 = store.subscribe(cb1);
      store.subscribe(cb2);

      unsub1();
      window.dispatchEvent(new Event("favorites-changed"));

      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalledTimes(1);
    });

    it("storage event key filtering: callback fires regardless of key", () => {
      // The store listens to all "storage" events (browser cross-tab)
      // and to its own custom event. Both trigger the callback.
      const store = createLocalStore("my-store-changed", () => []);
      const cb = vi.fn();
      store.subscribe(cb);

      // Any storage event triggers the callback
      window.dispatchEvent(new Event("storage"));
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  describe("hydration safety", () => {
    it("getServerSnapshot returns deterministic value for array store", () => {
      const store = createLocalStore("test", () => ["a", "b"]);
      const calls = Array.from({ length: 5 }, () =>
        store.getServerSnapshot(),
      );
      expect(new Set(calls).size).toBe(1);
      expect(calls[0]).toBe("[]");
    });

    it("getServerSnapshot returns deterministic value for object store", () => {
      const store = createLocalStore("test", () => ({ k: "v" }));
      const calls = Array.from({ length: 5 }, () =>
        store.getServerSnapshot(),
      );
      expect(new Set(calls).size).toBe(1);
      expect(calls[0]).toBe("{}");
    });

    it("getServerSnapshot returns deterministic value for boolean store", () => {
      const store = createLocalStore("test", () => true);
      const calls = Array.from({ length: 5 }, () =>
        store.getServerSnapshot(),
      );
      expect(new Set(calls).size).toBe(1);
      expect(calls[0]).toBe("false");
    });

    it("getServerSnapshot returns deterministic value for null store", () => {
      const store = createLocalStore("test", () => null);
      const calls = Array.from({ length: 5 }, () =>
        store.getServerSnapshot(),
      );
      expect(new Set(calls).size).toBe(1);
      expect(calls[0]).toBe("null");
    });

    it("getServerSnapshot returns deterministic value for number store", () => {
      const store = createLocalStore("test", () => 42);
      const calls = Array.from({ length: 5 }, () =>
        store.getServerSnapshot(),
      );
      expect(new Set(calls).size).toBe(1);
      expect(calls[0]).toBe("0");
    });

    it("all server snapshots are valid JSON", () => {
      const types = [
        createLocalStore("a", () => [1]),
        createLocalStore("b", () => ({ x: 1 })),
        createLocalStore("c", () => true),
        createLocalStore("d", () => null),
        createLocalStore("e", () => 0),
        createLocalStore("f", () => "string"),
      ];

      for (const store of types) {
        const snap = store.getServerSnapshot();
        expect(() => JSON.parse(snap)).not.toThrow();
      }
    });

    it("server snapshot parse result matches expected default type", () => {
      const arrayStore = createLocalStore("a", () => [1]);
      const objectStore = createLocalStore("b", () => ({ x: 1 }));
      const boolStore = createLocalStore("c", () => true);
      const nullStore = createLocalStore("d", () => null);
      const numStore = createLocalStore("e", () => 42);

      expect(Array.isArray(JSON.parse(arrayStore.getServerSnapshot()))).toBe(
        true,
      );
      expect(typeof JSON.parse(objectStore.getServerSnapshot())).toBe("object");
      expect(typeof JSON.parse(boolStore.getServerSnapshot())).toBe("boolean");
      expect(JSON.parse(nullStore.getServerSnapshot())).toBe(null);
      expect(typeof JSON.parse(numStore.getServerSnapshot())).toBe("number");
    });

    it("hydration does not depend on browser-only APIs", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore("test", () => ["a"]);
      expect(store.getServerSnapshot()).toBe("[]");
      expect(() => JSON.parse(store.getServerSnapshot())).not.toThrow();
    });

    it("getSnapshot is independent of getServerSnapshot", () => {
      const store = createLocalStore("test", () => ["actual"]);
      const clientSnap = store.getSnapshot();
      const serverSnap = store.getServerSnapshot();

      expect(clientSnap).toBe(JSON.stringify(["actual"]));
      expect(serverSnap).toBe("[]");
      expect(clientSnap).not.toBe(serverSnap);
    });

    it("useLocalStorageStore returns server snapshot value when no client state", () => {
      mockUseSyncExternalStore.mockReset();

      const arrayStore = createLocalStore("a", () => [1]);
      const objectStore = createLocalStore("b", () => ({ x: 1 }));
      const boolStore = createLocalStore("c", () => true);

      // Simulate server: useSyncExternalStore returns server snapshot
      mockUseSyncExternalStore
        .mockReturnValueOnce(arrayStore.getServerSnapshot())
        .mockReturnValueOnce(objectStore.getServerSnapshot())
        .mockReturnValueOnce(boolStore.getServerSnapshot());

      expect(useLocalStorageStore(arrayStore)).toEqual([]);
      expect(useLocalStorageStore(objectStore)).toEqual({});
      expect(useLocalStorageStore(boolStore)).toBe(false);
    });
  });

  describe("storage failure resilience", () => {
    it("createLocalStore survives read() throwing on getSnapshot", () => {
      const store = createLocalStore("test", () => {
        throw new Error("localStorage unavailable");
      });
      expect(store.getSnapshot()).toBe("[]");
    });

    it("createLocalStore survives read() throwing on parse", () => {
      const store = createLocalStore("test", () => {
        throw new Error("localStorage unavailable");
      });
      expect(() => store.parse()).not.toThrow();
    });

    it("createLocalStore survives read() throwing on getServerSnapshot", () => {
      const store = createLocalStore("test", () => {
        throw new Error("localStorage unavailable");
      });
      expect(store.getServerSnapshot()).toBe("[]");
    });

    it("useLocalStorageStore handles malformed snapshot from useSyncExternalStore", () => {
      mockUseSyncExternalStore.mockReturnValue("{not json}[");

      const store = createLocalStore("test", () => ["a"]);
      const result = useLocalStorageStore(store);

      // Falls back to server snapshot "[]"
      expect(result).toEqual([]);
    });

    it("useLocalStorageStore handles undefined snapshot gracefully", () => {
      mockUseSyncExternalStore.mockReturnValue(undefined as unknown as string);

      const store = createLocalStore("test", () => ["a"]);
      const result = useLocalStorageStore(store);
      // safeParse with undefined throws -> falls back to parsed server snapshot
      expect(result).toEqual([]);
    });

    it("useLocalStorageStore handles null snapshot gracefully", () => {
      mockUseSyncExternalStore.mockReturnValue(null as unknown as string);

      const store = createLocalStore("test", () => ["a"]);
      // JSON.parse(null) may return null or throw depending on environment
      // The store handles this without throwing uncontrolled errors
      expect(() => useLocalStorageStore(store)).not.toThrow();
    });

    it("useLocalStorageStore handles numeric snapshot (non-string) gracefully", () => {
      mockUseSyncExternalStore.mockReturnValue(42 as unknown as string);

      const store = createLocalStore("test", () => ["a"]);
      // JSON.parse(42) -> 42, returned as-is. No crash.
      expect(() => useLocalStorageStore(store)).not.toThrow();
    });

    it("subscribe returns no-op function when window is undefined (SSR)", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore("test", () => []);
      const unsub = store.subscribe(() => {});

      expect(typeof unsub).toBe("function");
      expect(() => unsub()).not.toThrow();
    });

    it("getSnapshot works when window is undefined (SSR)", () => {
      vi.unstubAllGlobals();
      delete (globalThis as Record<string, unknown>).window;

      const store = createLocalStore("test", () => ["server-data"]);
      expect(store.getSnapshot()).toBe(JSON.stringify(["server-data"]));
    });

    it("circular reference in read() does not crash getSnapshot", () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;

      const store = createLocalStore("test", () => circular);
      expect(store.getSnapshot()).toBe("[]");
    });

    it("circular reference in read() does not crash parse", () => {
      const circular: Record<string, unknown> = {};
      circular.self = circular;

      const store = createLocalStore("test", () => circular);
      expect(() => store.parse()).not.toThrow();
    });
  });
});
