import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { SpecialtyCard } from "../../components/home/specialty-card";
import { BrowseSpecialties } from "../../components/home/browse-specialties";

describe("SpecialtyCard dark-mode readability (regression)", () => {
  function renderCard() {
    return renderToStaticMarkup(
      <SpecialtyCard
        title="Cardiology"
        description="Browse all Cardiology calculators."
        href="/specialties/cardiology"
        icon={<span data-testid="icon" />}
        color="bg-red-500"
        calculatorCount={12}
      />,
    );
  }

  it("renders a high-contrast light title in dark mode", () => {
    expect(renderCard()).toContain("dark:text-white");
  });

  it("renders readable muted description and calculator count in dark mode", () => {
    const html = renderCard();
    expect(html).toContain("dark:text-slate-300");
    // The old faint slate-400 muted tone must not come back
    expect(html).not.toContain("dark:text-slate-400");
    expect(html).toContain("12 calculators");
  });

  it("has a clearly visible dark-mode border and divider", () => {
    const html = renderCard();
    expect(html).toContain("dark:border-slate-700");
    expect(html).not.toContain("dark:border-slate-800");
    expect(html).not.toContain("dark:border-slate-700/0");
  });

  it("preserves hover and group-hover affordances", () => {
    const html = renderCard();
    expect(html).toContain("hover:-translate-y-1");
    expect(html).toContain("group-hover:text-blue-400");
    expect(html).toContain("hover:shadow-xl");
    expect(html).toContain("dark:hover:border-slate-500");
  });

  it("has a clearly visible keyboard focus state", () => {
    const html = renderCard();
    expect(html).toContain("focus-visible:ring-2");
    expect(html).toContain("focus-visible:ring-blue-500");
    expect(html).toContain("dark:focus-visible:ring-blue-400");
  });

  it("preserves the specialty icon container color", () => {
    expect(renderCard()).toContain("bg-red-500");
  });
});

describe("BrowseSpecialties dark-mode section controls (regression)", () => {
  const html = renderToStaticMarkup(<BrowseSpecialties />);

  it("section header action link is readable in dark mode", () => {
    expect(html).toContain("dark:text-blue-400");
  });

  it("action link meets the 44px touch target", () => {
    expect(html).toContain("min-h-[44px]");
  });

  it("section heading stays high-contrast in dark mode", () => {
    expect(html).toContain("dark:text-white");
  });
});
