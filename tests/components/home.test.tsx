import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    // Resolve stores from the current snapshot so localStorage-mocked
    // states can be asserted without a DOM environment.
    useSyncExternalStore: (
      _subscribe: unknown,
      getSnapshot: () => unknown,
    ) => getSnapshot(),
  };
});

import { Hero } from "../../components/home/hero";
import { TrustStrip } from "../../components/home/trust-strip";
import {
  PopularCalculators,
  POPULAR_CALCULATOR_SLUGS,
} from "../../components/home/popular-calculators";
import { FavoritesWidget } from "../../components/home/favorites-widget";
import { RecentCalculatorsWidget } from "../../components/home/recent-calculators-widget";
import { BrowseCategories } from "../../components/home/browse-categories";
import { BrowseSpecialties } from "../../components/home/browse-specialties";

import {
  calculatorRegistry,
  getCategories,
} from "../../lib/calculators/registry";

function render(component: React.ReactElement): string {
  return renderToStaticMarkup(component);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

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

beforeEach(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Homepage hero", () => {
  const markup = render(<Hero />);

  it("renders a single h1 with the primary heading", () => {
    expect(markup).toContain("<h1");
    expect(markup.match(/<h1/g)?.length).toBe(1);
    expect(stripTags(markup)).toContain("Clinical calculations,");
    expect(stripTags(markup)).toContain("made clear.");
  });

  it("renders the factual supporting description", () => {
    expect(stripTags(markup)).toContain(
      "Evidence-based medical calculators and clinical decision-support tools for healthcare professionals.",
    );
  });
});

describe("Homepage trust strip", () => {
  const markup = render(<TrustStrip />);
  const text = stripTags(markup);

  it("shows the live registry calculator count", () => {
    expect(text).toContain(`${calculatorRegistry.length} calculators`);
  });

  it("shows the live category count", () => {
    expect(text).toContain(`${getCategories().length} clinical areas`);
  });

  it("contains no fabricated numeric values", () => {
    const allowed = new Set<number>([
      calculatorRegistry.length,
      getCategories().length,
    ]);
    const numbers = (text.match(/\d+/g) ?? []).map(Number);

    for (const value of numbers) {
      expect(
        allowed.has(value),
        `Unexpected numeric value ${value} in trust strip`,
      ).toBe(true);
    }
  });

  it("mentions evidence-based references and decision support without regulatory claims", () => {
    expect(text).toContain("Evidence-based");
    expect(text).toContain("Referenced sources");
    expect(text).toContain("Decision support");
    expect(text.toLowerCase()).not.toContain("fda");
    expect(text.toLowerCase()).not.toContain("validated");
  });
});

describe("Popular Clinical Tools section", () => {
  it("selects 6-8 unique calculators that all exist in the registry", () => {
    const slugs = [...POPULAR_CALCULATOR_SLUGS];

    expect(slugs.length).toBeGreaterThanOrEqual(6);
    expect(slugs.length).toBeLessThanOrEqual(8);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const slug of slugs) {
      expect(
        calculatorRegistry.some(
          (calculator) => calculator.slug === slug,
        ),
        `Popular slug "${slug}" is not in the registry`,
      ).toBe(true);
    }
  });

  const markup = render(<PopularCalculators />);

  it("renders the section title and description", () => {
    expect(stripTags(markup)).toContain("Popular Clinical Tools");
    expect(stripTags(markup)).toContain(
      "Quick access to commonly used medical calculators.",
    );
  });

  it("links every selected calculator to its registry-backed route", () => {
    for (const slug of POPULAR_CALCULATOR_SLUGS) {
      expect(markup).toContain(`href="/calculators/${slug}"`);
    }
  });

  it("does not render cards beyond the curated set", () => {
    const cardLinks = markup.match(
      /href="\/calculators\/[a-z0-9-]+"/g,
    ) ?? [];

    expect(cardLinks.length).toBe(POPULAR_CALCULATOR_SLUGS.length);
  });
});

describe("Quick access widgets", () => {
  it("favorites widget shows the compact empty state", () => {
    const markup = render(<FavoritesWidget />);

    expect(markup).toContain("No saved favorites yet");
    expect(markup).toContain("Save calculators for quick access.");
    expect(markup).not.toContain("href=\"/calculators/bmi\"");
  });

  it("recent widget shows the compact empty state", () => {
    const markup = render(<RecentCalculatorsWidget />);

    expect(markup).toContain("No recently opened calculators.");
  });

  it("favorites still resolve registry entries to calculator links", () => {
    const ls = createLocalStorageMock();
    ls.store.set(
      "medcalchub-favorites",
      JSON.stringify(["bmi", "gcs"]),
    );
    vi.stubGlobal("localStorage", ls.mock);
    vi.stubGlobal("window", {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const markup = render(<FavoritesWidget />);

    expect(markup).toContain('href="/calculators/bmi"');
    expect(markup).toContain('href="/calculators/gcs"');
    expect(markup).toContain("Body Mass Index (BMI)");
    expect(markup).toContain("Glasgow Coma Scale");
  });

  it("recent still resolves registry entries to calculator links", () => {
    const ls = createLocalStorageMock();
    ls.store.set(
      "medcalchub-recent",
      JSON.stringify(["news2"]),
    );
    vi.stubGlobal("localStorage", ls.mock);
    vi.stubGlobal("window", {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const markup = render(<RecentCalculatorsWidget />);

    expect(markup).toContain('href="/calculators/news2"');
    expect(markup).toContain("National Early Warning Score 2 (NEWS2)");
  });
});

describe("Homepage collection sections", () => {
  it("categories section keeps its route and uses the refined heading", () => {
    const markup = render(<BrowseCategories />);

    expect(stripTags(markup)).toContain("Explore by Clinical Area");
    expect(stripTags(markup)).toContain(
      "Find calculators organized by medical topic.",
    );
    expect(markup).toContain('href="/categories"');
    expect(markup).toContain('href="/categories/');
  });

  it("specialties section keeps its route and uses the refined heading", () => {
    const markup = render(<BrowseSpecialties />);

    expect(stripTags(markup)).toContain("Explore by Specialty");
    expect(stripTags(markup)).toContain(
      "Find calculators by clinical specialty.",
    );
    expect(markup).toContain('href="/specialties"');
    expect(markup).toContain('href="/specialties/');
  });
});
