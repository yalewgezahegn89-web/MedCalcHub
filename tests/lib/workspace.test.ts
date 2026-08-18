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

// Cache modules so we only pay the dynamic import cost once per test suite
let workspaceModule: typeof import("../../lib/workspace");
let favoritesModule: typeof import("../../lib/favorites");

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

    // Import modules once (without resetModules) to avoid slow re-imports
    workspaceModule = await import("../../lib/workspace");
    favoritesModule = await import("../../lib/favorites");
  });

  it("resolves an empty workspace to an empty saved list", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { getFavorites } = favoritesModule;
    expect(getFavorites()).toEqual([]);
    expect(resolveWorkspaceCalculators(getFavorites())).toEqual([]);
  });

  it("renders saved calculators from the favorites store", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { addFavorite, getFavorites } = favoritesModule;
    addFavorite("bmi");
    addFavorite("gcs");

    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
    expect(saved[0]?.name).toBe("bmi");
    expect(saved[1]?.name).toBe("gcs");
  });

  it("resolved saved calculators open valid calculator routes", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { addFavorite, getFavorites } = favoritesModule;
    addFavorite("bmi");
    addFavorite("gcs");

    const saved = resolveWorkspaceCalculators(getFavorites());
    for (const calc of saved) {
      expect(calc.slug).toBeTruthy();
      expect(calc.slug).toBe(calc.id);
    }
  });

  it("removing a saved calculator updates storage and the workspace list", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { addFavorite, removeFavorite, getFavorites } = favoritesModule;
    addFavorite("bmi");
    addFavorite("gcs");

    removeFavorite("bmi");

    const favorites = getFavorites();
    expect(favorites).toEqual(["gcs"]);
    expect(
      resolveWorkspaceCalculators(favorites).map((calc) => calc.id),
    ).toEqual(["gcs"]);
  });

  it("removing a non-existent id is a safe no-op", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { addFavorite, removeFavorite } = favoritesModule;
    addFavorite("bmi");

    expect(() => removeFavorite("unknown-id")).not.toThrow();
    expect(
      resolveWorkspaceCalculators(JSON.parse(ls.store.get(FAVORITES_KEY) ?? "[]")).map(
        (calc) => calc.id,
      ),
    ).toEqual(["bmi"]);
  });

  it("preserves saved calculators across reload (state recreation)", async () => {
    const { addFavorite } = favoritesModule;
    addFavorite("bmi");
    addFavorite("gcs");

    // Simulate a page reload by clearing module cache and re-importing
    vi.resetModules();
    const reloadedWorkspace = await import("../../lib/workspace");
    const reloadedFavorites = await import("../../lib/favorites");

    expect(reloadedFavorites.getFavorites()).toEqual(["bmi", "gcs"]);
    expect(
      reloadedWorkspace.resolveWorkspaceCalculators(reloadedFavorites.getFavorites()).map(
        (calc) => calc.id,
      ),
    ).toEqual(["bmi", "gcs"]);
  });

  it("handles stale or invalid saved calculator ids safely", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { getFavorites } = favoritesModule;
    ls.store.set(
      FAVORITES_KEY,
      JSON.stringify(["bmi", "not-a-real-calculator", "gcs"]),
    );

    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
  });

  it("preserves the stored order of saved calculators", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    const { addFavorite, getFavorites } = favoritesModule;
    addFavorite("gcs");
    addFavorite("bmi");

    const saved = resolveWorkspaceCalculators(getFavorites());
    expect(saved.map((calc) => calc.id)).toEqual(["gcs", "bmi"]);
  });

  it("resolves calculators without a DOM (SSR-safe, mobile-safe)", () => {
    const { resolveWorkspaceCalculators } = workspaceModule;
    vi.unstubAllGlobals();
    delete (globalThis as Record<string, unknown>).window;
    delete (globalThis as Record<string, unknown>).localStorage;

    const saved = resolveWorkspaceCalculators(["bmi", "gcs"]);
    expect(saved.map((calc) => calc.id)).toEqual(["bmi", "gcs"]);
  });
});
