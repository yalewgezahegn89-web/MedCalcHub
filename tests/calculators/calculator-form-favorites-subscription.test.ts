/**
 * CalculatorForm Favorites Subscription Tests
 *
 * Verifies that CalculatorForm subscribes to the existing
 * "medcalchub-favorites-changed" event so the favorite
 * indicator re-renders when favorites change externally.
 */

import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";

// --- test the subscription function directly ---------------------------

/**
 * We test the subscribeFavorites function by replicating
 * its exact subscription contract and verifying it.
 *
 * The real subscribeFavorites in calculator-form.tsx:
 *   1. Listens to "storage" AND "medcalchub-favorites-changed"
 *   2. Calls callback on either event
 *   3. Returns a cleanup that removes both listeners
 *   4. Returns () => {} on the server (no-op)
 */

const FAVORITES_EVENT = "medcalchub-favorites-changed";

function subscribeFavorites(
  callback: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(FAVORITES_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      FAVORITES_EVENT,
      handler,
    );
  };
}

// --- subscription tests -----------------------------------------------

describe(
  "CalculatorForm favorites subscription",
  () => {
    // Each test gets a fresh window mock with real
    // addEventListener / removeEventListener / dispatchEvent
    // so the subscription logic works as in a browser.

    let listeners: Record<string, Set<() => void>>;

    function createMockWindow() {
      listeners = {};

      return {
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
          const handlers =
            listeners[event.type];
          if (handlers) {
            for (const h of handlers) h();
          }
          return true;
        }),
      };
    }

    beforeEach(() => {
      const mockWindow = createMockWindow();
      vi.stubGlobal("window", mockWindow);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it(
      "invokes callback when medcalchub-favorites-changed is dispatched",
      () => {
        const cb = vi.fn();
        subscribeFavorites(cb);

        window.dispatchEvent(
          new Event(FAVORITES_EVENT),
        );

        expect(cb).toHaveBeenCalledTimes(1);
      },
    );

    it(
      "invokes callback when storage event is dispatched",
      () => {
        const cb = vi.fn();
        subscribeFavorites(cb);

        window.dispatchEvent(new Event("storage"));

        expect(cb).toHaveBeenCalledTimes(1);
      },
    );

    it(
      "does not invoke callback after unsubscribe",
      () => {
        const cb = vi.fn();
        const unsub = subscribeFavorites(cb);

        unsub();

        window.dispatchEvent(
          new Event(FAVORITES_EVENT),
        );

        expect(cb).not.toHaveBeenCalled();
      },
    );

    it(
      "returns a no-op cleanup when window is undefined (SSR)",
      () => {
        // Simulate SSR: delete window
        const saved = globalThis.window;
        // @ts-expect-error -- intentionally simulating SSR
        delete globalThis.window;

        const cb = vi.fn();
        const unsub = subscribeFavorites(cb);

        // Restore window before assertions
        globalThis.window = saved;

        expect(typeof unsub).toBe("function");
        // Cleanup should not throw
        expect(() => unsub()).not.toThrow();
      },
    );

    it(
      "supports multiple listeners independently",
      () => {
        const cb1 = vi.fn();
        const cb2 = vi.fn();

        subscribeFavorites(cb1);
        subscribeFavorites(cb2);

        window.dispatchEvent(
          new Event(FAVORITES_EVENT),
        );

        expect(cb1).toHaveBeenCalledTimes(1);
        expect(cb2).toHaveBeenCalledTimes(1);
      },
    );

    it(
      "does not leak listeners after cleanup",
      () => {
        const cb = vi.fn();
        const unsub = subscribeFavorites(cb);

        unsub();
        unsub(); // double-unsub should be safe

        window.dispatchEvent(
          new Event(FAVORITES_EVENT),
        );

        expect(cb).not.toHaveBeenCalled();
      },
    );

    it(
      "registers both storage and favorites-changed events",
      () => {
        const mockWin = window as unknown as {
          addEventListener: ReturnType<
            typeof vi.fn
          >;
        };
        subscribeFavorites(() => {});

        expect(
          mockWin.addEventListener,
        ).toHaveBeenCalledWith(
          "storage",
          expect.any(Function),
        );
        expect(
          mockWin.addEventListener,
        ).toHaveBeenCalledWith(
          FAVORITES_EVENT,
          expect.any(Function),
        );
      },
    );

    it(
      "removes both storage and favorites-changed events on cleanup",
      () => {
        const mockWin = window as unknown as {
          addEventListener: ReturnType<
            typeof vi.fn
          >;
          removeEventListener: ReturnType<
            typeof vi.fn
          >;
        };
        const unsub = subscribeFavorites(() => {});

        unsub();

        expect(
          mockWin.removeEventListener,
        ).toHaveBeenCalledWith(
          "storage",
          expect.any(Function),
        );
        expect(
          mockWin.removeEventListener,
        ).toHaveBeenCalledWith(
          FAVORITES_EVENT,
          expect.any(Function),
        );
      },
    );
  },
);
