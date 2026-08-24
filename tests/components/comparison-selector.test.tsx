import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { ComparisonSelector } from "../../components/comparison/comparison-selector";
import {
  buildDisplaySuggestedGroups,
  normalizeComparisonTitle,
} from "../../lib/comparison";

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

describe("ComparisonSelector quick-compare labels", () => {
  const markup = renderToStaticMarkup(
    <ComparisonSelector selected={[]} onChange={() => {}} />,
  );

  it("renders the quick compare area", () => {
    expect(markup).toContain("Quick compare");
  });

  it("renders no repeated visible group labels", () => {
    const display = buildDisplaySuggestedGroups()
      .slice(0, 6)
      .map((group) => `${group.name} (${group.slugs.length})`);

    for (const label of display) {
      const occurrences = stripTags(markup).split(label).length - 1;
      expect(
        occurrences,
        `"${label}" is rendered ${occurrences} times`,
      ).toBe(1);
    }
  });

  it("matches the deduplicated display set, not the raw groups", () => {
    const normalizedRendered = [
      ...new Set(
        buildDisplaySuggestedGroups()
          .slice(0, 6)
          .map((group) => normalizeComparisonTitle(group.name)),
      ),
    ];

    expect(normalizedRendered.length).toBeLessThanOrEqual(6);

    // The previously duplicated kidney title appears at most once.
    const kidneyOccurrences =
      normalizedRendered.filter(
        (title) =>
          title ===
          "which kidney calculator should i use?",
      ).length;
    expect(kidneyOccurrences).toBeLessThanOrEqual(1);
  });

  it("keeps the manual filter and limit affordances intact", () => {
    expect(markup).toContain("comparison-filter");
    expect(stripTags(markup)).toContain("Select calculators to compare");
    expect(stripTags(markup)).toContain("up to 3 calculators");
  });
});
