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

describe("AdScripts", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.resetModules();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);
    vi.stubGlobal("window", {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("returns null when disabled (default)", async () => {
    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });

  it("returns null when consent absent", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });

  it("returns null when consent rejected", async () => {
    ls.store.set(CONSENT_KEY, "false");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });
});
