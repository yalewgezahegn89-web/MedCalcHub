import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

const root = join(__dirname, "..", "..");
const layout = readFileSync(join(root, "app", "layout.tsx"), "utf8");

describe("AdSense site-verification meta tag", () => {
  it("root layout metadata contains google-adsense-account entry", () => {
    expect(layout).toContain('"google-adsense-account"');
    expect(layout).toContain("ca-pub-1261821676127594");
  });

  it("publisher ID is set via metadata.other (not a second <head>)", () => {
    const otherMatch = layout.match(
      /other:\s*\{[^}]*"google-adsense-account"/,
    );
    expect(otherMatch).not.toBeNull();
  });
});
