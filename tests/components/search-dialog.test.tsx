import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import { SearchDialog } from "../../components/search/search-dialog";

const DIALOG_SOURCE_PATH = path.join(
  process.cwd(),
  "components",
  "search",
  "search-dialog.tsx",
);

describe("SearchDialog usable sizing (regression)", () => {
  function renderOpenDialog() {
    return renderToStaticMarkup(
      <SearchDialog open={true} onClose={() => {}} />,
    );
  }

  it("renders the dialog shell when open", () => {
    const html = renderOpenDialog();
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-label="Search calculators"');
  });

  it("caps dialog width at 720px instead of a spacing-scale token", () => {
    const html = renderOpenDialog();
    // Regression: max-w-lg once resolved to --spacing-lg (1.5rem),
    // collapsing the dialog into a ~24px vertical pill.
    expect(html).toContain("max-w-[45rem]");
    expect(html).not.toContain("max-w-lg");
  });

  it("keeps full-width fluid sizing inside comfortable side margins", () => {
    const html = renderOpenDialog();
    expect(html).toContain("w-full");
    expect(html).toContain("px-4");
  });

  it("provides responsive vertical positioning", () => {
    const html = renderOpenDialog();
    expect(html).toContain("pt-[10vh]");
    expect(html).toContain("sm:pt-[15vh]");
  });

  it("keeps a bounded results area so the dialog never collapses or overflows", () => {
    const html = renderOpenDialog();
    expect(html).toContain("max-h-[75vh]");
    expect(html).toContain("overflow-hidden");
  });

  it("search input stays rendered and usable", () => {
    const html = renderOpenDialog();
    expect(html).toContain('type="search"');
    expect(html).toContain('aria-label="Search calculators"');
    expect(html).toContain("flex-1");
  });

  it("has a visible dark-mode border for definition", () => {
    const html = renderOpenDialog();
    expect(html).toContain("dark:border-slate-700");
  });
});

describe("SearchDialog interaction behavior preserved (regression)", () => {
  const source = readFileSync(DIALOG_SOURCE_PATH, "utf8");

  it("still wires Escape close + focus trap + arrow navigation on window keydown", () => {
    expect(source).toContain('e.key === "Escape"');
    expect(source).toContain('e.key === "ArrowDown"');
    expect(source).toContain('e.key === "ArrowUp"');
    expect(source).toContain('e.key === "Tab"');
    expect(source).toContain('window.addEventListener("keydown"');
    expect(source).toContain('window.removeEventListener("keydown"');
  });

  it("still locks body scroll while open and restores it after", () => {
    expect(source).toContain('document.body.style.overflow = "hidden"');
    expect(source).toContain("document.body.style.overflow = prev");
  });

  it("still closes on backdrop click without closing when clicking inside", () => {
    expect(source).toContain("!dialogRef.current.contains(e.target as Node)");
  });

  it("still navigates to the selected result via router.push", () => {
    expect(source).toContain("router.push(`/calculators/${slug}`)");
  });
});
