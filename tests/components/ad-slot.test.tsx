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

describe("AdSlot", () => {
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

  it("returns null when ads are disabled (default)", async () => {
    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner" });
    expect(result).toBeNull();
  });

  it("returns null when consent is absent", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner" });
    expect(result).toBeNull();
  });

  it("returns null when consent is rejected", async () => {
    ls.store.set(CONSENT_KEY, "false");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner" });
    expect(result).toBeNull();
  });

  it("returns element when ads enabled + consent true", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner" });
    expect(result).not.toBeNull();
  });
});
