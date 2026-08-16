import { describe, it, expect, beforeEach, vi } from "vitest";

// Minimal localStorage mock backed by a Map
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
      clear: vi.fn(() => {
        store.clear();
      }),
    },
  };
}

const FAVORITES_KEY = "medcalchub-favorites";

describe("workspace", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", { dispatchEvent: dispatchEventSpy });

    vi.resetModules();
  });

  async function load() {
    const workspace = await import("../../lib/workspace");
    const favorites = await import("../../lib/favorites");
    return { ...workspace, ...favorites };
  }

  it("resolves an empty workspace to an empty saved list", async () => {
    const { resolveWorkspaceCalculators, getFavorites } =
      await load();
    expect(getFavorites()).toEqual([]);
    expect(resolveWorkspaceCalculators(getFavorites())).toEqual([]);
  });

  it("renders saved calculators from the favorites store", async () => {
    const { resolveWorkspaceCalculators, addFavorite, getFavorites } =
      await load();
    addFavorite("bmi");
    addFavorite("gcs");

    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
    expect(saved[0]?.name).toBe("bmi");
    expect(saved[1]?.name).toBe("gcs");
  });

  it("resolved saved calculators open valid calculator routes", async () => {
    const { resolveWorkspaceCalculators, addFavorite, getFavorites } =
      await load();
    addFavorite("bmi");
    addFavorite("gcs");

    const saved = resolveWorkspaceCalculators(getFavorites());
    for (const calc of saved) {
      expect(calc.slug).toBeTruthy();
      expect(calc.slug).toBe(calc.id);
    }
  });

  it("removing a saved calculator updates storage and the workspace list", async () => {
    const {
      resolveWorkspaceCalculators,
      addFavorite,
      removeFavorite,
      getFavorites,
    } = await load();
    addFavorite("bmi");
    addFavorite("gcs");

    removeFavorite("bmi");

    const favorites = getFavorites();
    expect(favorites).toEqual(["gcs"]);
    expect(
      resolveWorkspaceCalculators(favorites).map((calc) => calc.id),
    ).toEqual(["gcs"]);
  });

  it("removing a non-existent id is a safe no-op", async () => {
    const { resolveWorkspaceCalculators, addFavorite, removeFavorite } =
      await load();
    addFavorite("bmi");

    expect(() => removeFavorite("unknown-id")).not.toThrow();
    expect(
      resolveWorkspaceCalculators(JSON.parse(ls.store.get(FAVORITES_KEY) ?? "[]")).map(
        (calc) => calc.id,
      ),
    ).toEqual(["bmi"]);
  });

  it("preserves saved calculators across reload (state recreation)", async () => {
    let loaded = await load();
    loaded.addFavorite("bmi");
    loaded.addFavorite("gcs");

    vi.resetModules();
    loaded = await load();

    expect(loaded.getFavorites()).toEqual(["bmi", "gcs"]);
    expect(
      loaded.resolveWorkspaceCalculators(loaded.getFavorites()).map(
        (calc) => calc.id,
      ),
    ).toEqual(["bmi", "gcs"]);
  });

  it("handles stale or invalid saved calculator ids safely", async () => {
    ls.store.set(
      FAVORITES_KEY,
      JSON.stringify(["bmi", "not-a-real-calculator", "gcs"]),
    );

    const { resolveWorkspaceCalculators, getFavorites } = await load();
    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
  });

  it("preserves the stored order of saved calculators", async () => {
    const { resolveWorkspaceCalculators, addFavorite, getFavorites } =
      await load();
    addFavorite("gcs");
    addFavorite("bmi");

    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["gcs", "bmi"]);
  });

  it("resolves calculators without a DOM (SSR-safe, mobile-safe)", async () => {
    vi.unstubAllGlobals();
    delete (globalThis as Record<string, unknown>).window;
    delete (globalThis as Record<string, unknown>).localStorage;

    const { resolveWorkspaceCalculators } = await load();
    const saved = resolveWorkspaceCalculators(["bmi", "gcs"]);
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
  });
});
