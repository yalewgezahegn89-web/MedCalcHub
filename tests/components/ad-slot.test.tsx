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

describe("AdSlot", () => {
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

  it("returns null when ads are disabled (default)", async () => {
    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).toBeNull();
  });

  it("returns null when consent is absent", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).toBeNull();
  });

  it("returns null when consent is rejected", async () => {
    ls.store.set(CONSENT_KEY, "false");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).toBeNull();
  });

  it("returns null when slot ID is missing", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner" });
    expect(result).toBeNull();
  });

  it("returns null when slot ID is placeholder", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-test123");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "XXXXXXXXXX" });
    expect(result).toBeNull();
  });

  it("returns null when publisher ID is placeholder", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-XXXXXXXXXXXXXXXX");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).toBeNull();
  });

  it("renders aside with ins element when all gates pass", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("type", "aside");
  });

  it("renders with role=complementary and aria-label", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890", label: "Sponsored" });
    expect(result).not.toBeNull();
    expect(result?.props.role).toBe("complementary");
    expect(result?.props["aria-label"]).toBe("Sponsored");
  });

  it("uses default aria-label when label not provided", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).not.toBeNull();
    expect(result?.props["aria-label"]).toBe("Advertisement");
  });

  it("reserved sizing min-h prevents CLS", async () => {
    ls.store.set(CONSENT_KEY, "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890");
    vi.resetModules();

    const { AdSlot } = await import("../../components/ads/ad-slot");
    const result = AdSlot({ size: "banner", slotId: "1234567890" });
    expect(result).not.toBeNull();
    expect(result?.props.className).toContain("min-h-");
  });

  it("AdSlotInit try/catch prevents crash on adsbygoogle error", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/ads/ad-slot.tsx"),
      "utf8",
    );
    expect(src).toContain("try {");
    expect(src).toContain("} catch {");
    expect(src).toContain("window.adsbygoogle");
  });

  it("AdSlot does not expose error details to users", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../components/ads/ad-slot.tsx"),
      "utf8",
    );
    expect(src).not.toContain("console.error");
    expect(src).not.toContain("throw ");
  });
});
