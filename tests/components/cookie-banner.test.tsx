import { describe, it, expect, beforeEach, vi } from "vitest";

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
});
