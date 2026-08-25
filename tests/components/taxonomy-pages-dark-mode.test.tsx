import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import SpecialtiesPage from "../../app/specialties/page";
import CategoriesPage from "../../app/categories/page";

describe("Specialties route page dark-mode cards (regression)", () => {
  const html = renderToStaticMarkup(<SpecialtiesPage />);

  it("renders a dark card surface instead of white-on-dark", () => {
    expect(html).toContain("dark:bg-slate-900");
  });

  it("has visible borders for structure", () => {
    expect(html).toContain("dark:border-slate-700");
  });

  it("renders high-contrast titles and readable counts", () => {
    expect(html).toContain("dark:text-slate-100");
    expect(html).toContain("dark:text-slate-400");
  });

  it("provides hover and focus interaction states", () => {
    expect(html).toContain("dark:hover:border-blue-500/70");
    expect(html).toContain("group-hover:text-blue-400");
    expect(html).toContain("focus-visible:ring-2");
    expect(html).toContain("dark:focus-visible:ring-blue-400");
  });

  it("page heading and subtitle are readable in dark mode", () => {
    expect(html).toContain("dark:text-white");
    expect(html).toContain("dark:text-slate-300");
  });
});

describe("Categories route page dark-mode cards (regression)", () => {
  const html = renderToStaticMarkup(<CategoriesPage />);

  it("renders a dark card surface instead of white-on-dark", () => {
    expect(html).toContain("dark:bg-slate-900");
  });

  it("has visible borders for structure", () => {
    expect(html).toContain("dark:border-slate-700");
  });

  it("renders high-contrast titles, counts, and arrow action", () => {
    expect(html).toContain("dark:text-slate-100");
    expect(html).toContain("dark:text-slate-400");
    expect(html).toContain("dark:text-blue-400");
  });

  it("provides hover and focus interaction states", () => {
    expect(html).toContain("hover:shadow-lg");
    expect(html).toContain("focus-visible:ring-2");
    expect(html).toContain("dark:hover:bg-slate-800/70");
  });

  it("page heading and subtitle are readable in dark mode", () => {
    expect(html).toContain("dark:text-white");
    expect(html).toContain("dark:text-slate-300");
  });

  it("light mode keeps the original white surface", () => {
    // unprefixed bg-white must remain for light theme
    expect(html).toContain("bg-white");
  });
});
