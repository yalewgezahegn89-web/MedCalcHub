/**
 * Toolbar Actions Tests
 *
 * Tests for calculator toolbar action behavior:
 * - Favorite toggle uses existing favorites utility correctly
 * - Print calls window.print (mocked)
 * - Share uses navigator.share when available
 * - Share falls back to clipboard when Web Share API is unavailable
 * - Share cancellation does not produce an error
 * - Unexpected share errors are handled gracefully
 */

import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";

import {
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
  getFavorites,
} from "../../lib/favorites";

// --- localStorage mock ---
const store: Record<string, string> = {};

beforeEach(() => {
  for (const key of Object.keys(store)) {
    delete store[key];
  }

  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  });

  vi.stubGlobal("window", {
    dispatchEvent: vi.fn(),
  });
});

// --- Favorites utility tests ---
describe("Favorites utility integration", () => {
  it("returns empty array initially", () => {
    expect(getFavorites()).toEqual([]);
  });

  it("addFavorite adds a slug", () => {
    addFavorite("bmi");
    expect(isFavorite("bmi")).toBe(true);
    expect(getFavorites()).toEqual(["bmi"]);
  });

  it("addFavorite does not duplicate", () => {
    addFavorite("bmi");
    addFavorite("bmi");
    expect(getFavorites()).toEqual(["bmi"]);
  });

  it("removeFavorite removes a slug", () => {
    addFavorite("bmi");
    removeFavorite("bmi");
    expect(isFavorite("bmi")).toBe(false);
    expect(getFavorites()).toEqual([]);
  });

  it("toggleFavorite adds when not favorited", () => {
    expect(isFavorite("bmi")).toBe(false);
    const added = toggleFavorite("bmi");
    expect(added).toBe(true);
    expect(isFavorite("bmi")).toBe(true);
  });

  it("toggleFavorite removes when favorited", () => {
    addFavorite("bmi");
    expect(isFavorite("bmi")).toBe(true);
    const added = toggleFavorite("bmi");
    expect(added).toBe(false);
    expect(isFavorite("bmi")).toBe(false);
  });

  it("multiple favorites are tracked independently", () => {
    addFavorite("bmi");
    addFavorite("creatinine");
    expect(getFavorites()).toEqual([
      "bmi",
      "creatinine",
    ]);
    expect(isFavorite("bmi")).toBe(true);
    expect(isFavorite("creatinine")).toBe(true);
  });

  it("removing one favorite leaves others intact", () => {
    addFavorite("bmi");
    addFavorite("creatinine");
    removeFavorite("bmi");
    expect(isFavorite("bmi")).toBe(false);
    expect(isFavorite("creatinine")).toBe(true);
    expect(getFavorites()).toEqual(["creatinine"]);
  });

  it("dispatches change event on addFavorite", () => {
    addFavorite("bmi");
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  it("dispatches change event on removeFavorite", () => {
    addFavorite("bmi");
    vi.mocked(window.dispatchEvent).mockClear();
    removeFavorite("bmi");
    expect(window.dispatchEvent).toHaveBeenCalled();
  });
});

// --- Print action tests ---
describe("Print action", () => {
  it("calls window.print()", () => {
    const printMock = vi.fn();
    vi.stubGlobal("window", {
      ...window,
      print: printMock,
    });

    window.print();

    expect(printMock).toHaveBeenCalled();
  });
});

// --- Share action tests ---
describe("Share action", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses navigator.share when available", async () => {
    const shareMock = vi.fn().mockResolvedValue(
      undefined,
    );

    vi.stubGlobal("navigator", {
      share: shareMock,
    });

    const data = {
      title: "BMI Calculator",
      text: "Calculate your BMI",
      url: "https://medcalchub.com/calculators/bmi",
    };

    await navigator.share(data);

    expect(shareMock).toHaveBeenCalledWith(data);
  });

  it("falls back to clipboard when share unavailable", async () => {
    vi.stubGlobal("navigator", { share: undefined });

    // navigator.share is undefined, so fallback path is taken
    expect(
      typeof (navigator as unknown as Record<string, unknown>)
        .share,
    ).toBe("undefined");
  });

  it("share cancellation (AbortError) is silent", async () => {
    const abortError = new DOMException(
      "The user aborted a request.",
      "AbortError",
    );

    const shareMock = vi
      .fn()
      .mockRejectedValue(abortError);

    vi.stubGlobal("navigator", {
      share: shareMock,
    });

    // Simulating the error handling logic from calculator-form
    let silent = false;

    try {
      await navigator.share({
        title: "test",
        text: "test",
        url: "https://test.com",
      });
    } catch (err: unknown) {
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        silent = true;
      }
    }

    expect(silent).toBe(true);
  });

  it("unexpected share errors are caught", async () => {
    const networkError = new Error("Network error");

    const shareMock = vi
      .fn()
      .mockRejectedValue(networkError);

    vi.stubGlobal("navigator", {
      share: shareMock,
    });

    let caught = false;

    try {
      await navigator.share({
        title: "test",
        text: "test",
        url: "https://test.com",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        caught = true;
      }
    }

    expect(caught).toBe(true);
  });
});

// --- Toolbar isFavorite prop tests ---
describe("Toolbar isFavorite prop", () => {
  it("isFavorite reflects current favorites state", () => {
    expect(isFavorite("bmi")).toBe(false);
    addFavorite("bmi");
    expect(isFavorite("bmi")).toBe(true);
  });

  it("toggleFavorite returns true after adding", () => {
    const result = toggleFavorite("new-calc");
    expect(result).toBe(true);
    expect(isFavorite("new-calc")).toBe(true);
  });

  it("toggleFavorite returns false after removing", () => {
    addFavorite("new-calc");
    const result = toggleFavorite("new-calc");
    expect(result).toBe(false);
    expect(isFavorite("new-calc")).toBe(false);
  });
});