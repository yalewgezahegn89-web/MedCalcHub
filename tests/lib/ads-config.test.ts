import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ads config", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function load(envOverrides: Record<string, string> = {}) {
    for (const [key, value] of Object.entries(envOverrides)) {
      vi.stubEnv(key, value);
    }
    return import("../../lib/ads/config");
  }

  it("is disabled by default", async () => {
    const { adsConfig } = await load();
    expect(adsConfig.enabled).toBe(false);
    expect(adsConfig.adsensePubId).toBe("");
    expect(adsConfig.adsenseReady).toBe(false);
  });

  it("adsenseReady is true only when enabled AND publisher ID exists", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADS_ENABLED: "true",
      NEXT_PUBLIC_ADSENSE_PUB_ID: "ca-pub-1234567890",
    });
    expect(adsConfig.enabled).toBe(true);
    expect(adsConfig.adsensePubId).toBe("ca-pub-1234567890");
    expect(adsConfig.adsenseReady).toBe(true);
  });

  it("adsenseReady is false when enabled but no publisher ID", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADS_ENABLED: "true",
    });
    expect(adsConfig.enabled).toBe(true);
    expect(adsConfig.adsensePubId).toBe("");
    expect(adsConfig.adsenseReady).toBe(false);
  });

  it("adsenseReady is false when publisher ID set but not enabled", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADSENSE_PUB_ID: "ca-pub-1234567890",
    });
    expect(adsConfig.enabled).toBe(false);
    expect(adsConfig.adsenseReady).toBe(false);
  });

  it("accepts '1' as truthy for ADS_ENABLED", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADS_ENABLED: "1",
      NEXT_PUBLIC_ADSENSE_PUB_ID: "ca-pub-1234567890",
    });
    expect(adsConfig.enabled).toBe(true);
    expect(adsConfig.adsenseReady).toBe(true);
  });

  it("rejects 'false' and '0' as truthy", async () => {
    const m1 = await load({ NEXT_PUBLIC_ADS_ENABLED: "false" });
    expect(m1.adsConfig.enabled).toBe(false);

    vi.resetModules();
    const m2 = await load({ NEXT_PUBLIC_ADS_ENABLED: "0" });
    expect(m2.adsConfig.enabled).toBe(false);
  });

  it("adsenseReady is false when publisher ID contains placeholder X characters", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADS_ENABLED: "true",
      NEXT_PUBLIC_ADSENSE_PUB_ID: "ca-pub-XXXXXXXXXXXXXXXX",
    });
    expect(adsConfig.enabled).toBe(true);
    expect(adsConfig.adsenseReady).toBe(false);
  });

  it("adsenseReady is false when publisher ID does not start with ca-pub-", async () => {
    const { adsConfig } = await load({
      NEXT_PUBLIC_ADS_ENABLED: "true",
      NEXT_PUBLIC_ADSENSE_PUB_ID: "pub-1234567890",
    });
    expect(adsConfig.enabled).toBe(true);
    expect(adsConfig.adsenseReady).toBe(false);
  });

  it("isValidSlotId returns false for undefined", async () => {
    const { isValidSlotId } = await load();
    expect(isValidSlotId(undefined)).toBe(false);
  });

  it("isValidSlotId returns false for empty string", async () => {
    const { isValidSlotId } = await load();
    expect(isValidSlotId("")).toBe(false);
  });

  it("isValidSlotId returns false for placeholder with X characters", async () => {
    const { isValidSlotId } = await load();
    expect(isValidSlotId("XXXXXXXXXX")).toBe(false);
  });

  it("isValidSlotId returns false for short numeric IDs", async () => {
    const { isValidSlotId } = await load();
    expect(isValidSlotId("12345")).toBe(false);
  });

  it("isValidSlotId returns true for valid numeric slot IDs", async () => {
    const { isValidSlotId } = await load();
    expect(isValidSlotId("1234567890")).toBe(true);
    expect(isValidSlotId("123456789012")).toBe(true);
  });
});
