import { describe, it, expect } from "vitest";
import { escapeXml, buildSitemapXml } from "../lib/seo/sitemap-xml";

describe("Sitemap XML encoding regression", () => {
  it("escapeXml converts & to &amp;", () => {
    expect(escapeXml("obstetrics-&-gynecology")).toBe(
      "obstetrics-&amp;-gynecology",
    );
  });

  it("escapeXml converts < > \" ' to XML entities", () => {
    expect(escapeXml('<test>"\'')).toBe("&lt;test&gt;&quot;&apos;");
  });

  it("escapeXml leaves clean strings unchanged", () => {
    expect(escapeXml("cardiology")).toBe("cardiology");
  });

  it("generated sitemap contains &amp; for obstetrics-&-gynecology", () => {
    const xml = buildSitemapXml();
    expect(xml).toContain("obstetrics-&amp;-gynecology");
  });

  it("generated sitemap does NOT contain raw & in loc elements", () => {
    const xml = buildSitemapXml();
    const locPattern = /<loc>([^<]+)<\/loc>/g;
    let match;
    while ((match = locPattern.exec(xml)) !== null) {
      const locValue = match[1];
      expect(
        locValue,
        `Raw & found in loc: ${locValue}`,
      ).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#)/);
    }
  });

  it("generated sitemap XML is well-formed (no unescaped ampersands)", () => {
    const xml = buildSitemapXml();
    const lines = xml.split("\n");
    for (const line of lines) {
      if (line.includes("<loc>")) {
        const locMatch = line.match(/<loc>([^<]+)<\/loc>/);
        if (locMatch) {
          const value = locMatch[1];
          expect(value).not.toContain("&-");
          expect(value).not.toContain("&g");
          expect(value).not.toContain("& ");
        }
      }
    }
  });

  it("sitemap has the expected URL count", () => {
    const xml = buildSitemapXml();
    const locCount = (xml.match(/<loc>/g) || []).length;
    expect(locCount).toBe(177);
  });

  it("no duplicate URLs in sitemap", () => {
    const xml = buildSitemapXml();
    const urls = [
      ...xml.matchAll(/<loc>([^<]+)<\/loc>/g),
    ].map((m) => m[1]);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("sitemap contains all expected calculator URLs", () => {
    const xml = buildSitemapXml();
    expect(xml).toContain("/calculators/ckd-epi-2021");
    expect(xml).toContain("/calculators/bmi");
    expect(xml).toContain("/calculators/edd");
  });

  it("sitemap contains expected static pages", () => {
    const xml = buildSitemapXml();
    expect(xml).toContain("<loc>https://medcalchub.com</loc>");
    expect(xml).toContain(
      "<loc>https://medcalchub.com/calculators</loc>",
    );
    expect(xml).toContain(
      "<loc>https://medcalchub.com/categories</loc>",
    );
    expect(xml).toContain(
      "<loc>https://medcalchub.com/comparison</loc>",
    );
    expect(xml).toContain(
      "<loc>https://medcalchub.com/specialties</loc>",
    );
  });
});
