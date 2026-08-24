import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
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

describe("AdScripts", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
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

  it("returns null when publisher ID is placeholder", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-XXXXXXXXXXXXXXXX");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });

  it("renders Script element when enabled + valid publisher ID + consent true", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).not.toBeNull();
  });

  it("does not render when ads enabled but no consent", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });

  it("does not render when consent true but ads disabled", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).toBeNull();
  });

  it("Script src contains publisher ID", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-9999999999");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).not.toBeNull();
    expect(result?.props.src).toContain("ca-pub-9999999999");
  });

  it("Script uses afterInteractive strategy", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdScripts } = await import("../../components/ads/ad-scripts");
    const result = AdScripts();
    expect(result).not.toBeNull();
    expect(result?.props.strategy).toBe("afterInteractive");
  });
});
