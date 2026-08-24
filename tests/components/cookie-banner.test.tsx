import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
    useCallback: <T extends (...args: unknown[]) => unknown>(cb: T) => cb,
    useRef: (initial: unknown) => ({ current: initial }),
    // Mock useEffect to be a no-op — DOM effects don't run in unit tests
    useEffect: () => {},
  };
});

const CONSENT_KEY = "medcalchub-consent";

function createLocalStorageMock() {
  const store = new Map<string, string>();
  return {
    store,
    mock: {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store.set(key, value);
      }),
      removeItem: vi.fn((key: string) => {
        store.delete(key);
      }),
      clear: vi.fn(() => store.clear()),
    },
  };
}

describe("CookieBanner", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchEventSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("returns element when consent is undecided", async () => {
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).not.toBeNull();
  });

  it("returns null when consent is accepted", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).toBeNull();
  });

  it("returns null when consent is rejected", async () => {
    ls.store.set(CONSENT_KEY, "false");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    const result = CookieBanner();
    expect(result).toBeNull();
  });

  it("reappears after consent is cleared (revocation)", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const { CookieBanner } = await import(
      "../../components/consent/cookie-banner"
    );
    expect(CookieBanner()).toBeNull();

    vi.resetModules();
    ls.store.delete(CONSENT_KEY);
    const { CookieBanner: Banner2 } = await import(
      "../../components/consent/cookie-banner"
    );
    expect(Banner2()).not.toBeNull();
  });
});
