/**
 * Batch 8 — Ad Placement Tests
 *
 * Covers:
 * 1. Calculator page ad slot exists only when eligible
 * 2. Calculator page ad absent when ads disabled
 * 3. Calculator page ad absent without consent
 * 4. Calculator page ad absent without valid slot ID
 * 5. Category page: no ad when calculator count below threshold
 * 6. Category page: at most one ad placement
 * 7. Category page: placement does not create invalid nesting
 * 8. Specialty page: same protections as category
 * 9. Homepage: ad is below primary content
 * 10. Homepage: no ad when disabled/consent absent
 * 11. Search: no ad placement introduced
 * 12. AdSlot responsive sizing includes w-full
 * 13. AdSlot accepts slotId prop
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readFile(relPath: string): string {
  return readFileSync(join(__dirname, relPath), "utf-8");
}

/* ------------------------------------------------------------------
   1–4. AdSlot gating — source-level verification
   ------------------------------------------------------------------ */

describe("AdSlot placement gating", () => {
  it("AdSlot returns null when adsConfig.adsenseReady is false", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("if (!adsConfig.adsenseReady || !consent || !isValidSlotId(slotId))");
    expect(src).toContain("return null;");
  });

  it("AdSlot gates on adsenseReady, consent, and valid slot ID", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("adsConfig.adsenseReady");
    expect(src).toContain("consent");
    expect(src).toContain("isValidSlotId(slotId)");
  });

  it("AdSlot accepts slotId prop", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("slotId?: string");
  });

  it("AdSlot renders data-slot-id when slotId provided", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("data-slot-id={slotId}");
  });
});

/* ------------------------------------------------------------------
   5–7. Category page placement
   ------------------------------------------------------------------ */

describe("Category page ad placement", () => {
  it("category page source imports AdSlot", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    expect(src).toContain('from "@/components/ads"');
  });

  it("category page uses threshold of 6 calculators", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    expect(src).toContain("calculators.length >= 6");
  });

  it("category page splits grid to insert at most one ad", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    const adSlotMatches = src.match(/<AdSlot[\s\S]*?\/>/g) ?? [];
    expect(adSlotMatches.length).toBe(1);
  });

  it("category ad is not nested inside calculator card divs", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    const slice4Index = src.indexOf("calculators.slice(0, 4)");
    const adSlotIndex = src.indexOf("<AdSlot");
    const slice4AfterIndex = src.indexOf("calculators.slice(4)");
    expect(slice4Index).toBeGreaterThan(-1);
    expect(adSlotIndex).toBeGreaterThan(slice4Index);
    expect(adSlotIndex).toBeLessThan(slice4AfterIndex);
  });

  it("category page uses slice to split calculator list", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    expect(src).toContain("calculators.slice(0, 4)");
    expect(src).toContain("calculators.slice(4)");
  });
});

/* ------------------------------------------------------------------
   8. Specialty page placement
   ------------------------------------------------------------------ */

describe("Specialty page ad placement", () => {
  it("specialty page source imports AdSlot", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    expect(src).toContain('from "@/components/ads"');
  });

  it("specialty page uses threshold of 6 calculators", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    expect(src).toContain("calculators.length >= 6");
  });

  it("specialty page splits grid to insert at most one ad", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    const adSlotMatches = src.match(/<AdSlot[\s\S]*?\/>/g) ?? [];
    expect(adSlotMatches.length).toBe(1);
  });

  it("specialty ad is not nested inside calculator card divs", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    const slice4Index = src.indexOf("calculators.slice(0, 4)");
    const adSlotIndex = src.indexOf("<AdSlot");
    const slice4AfterIndex = src.indexOf("calculators.slice(4)");
    expect(slice4Index).toBeGreaterThan(-1);
    expect(adSlotIndex).toBeGreaterThan(slice4Index);
    expect(adSlotIndex).toBeLessThan(slice4AfterIndex);
  });

  it("specialty page uses slice to split calculator list", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    expect(src).toContain("calculators.slice(0, 4)");
    expect(src).toContain("calculators.slice(4)");
  });
});

/* ------------------------------------------------------------------
   9–10. Homepage placement
   ------------------------------------------------------------------ */

describe("Homepage ad placement", () => {
  it("homepage imports AdSlot", () => {
    const src = readFile("../../app/page.tsx");
    expect(src).toContain('from "@/components/ads"');
  });

  it("homepage ad is below BrowseSpecialties", () => {
    const src = readFile("../../app/page.tsx");
    const specialtiesIndex = src.indexOf("<BrowseSpecialties");
    const adSlotIndex = src.indexOf("<AdSlot");
    expect(specialtiesIndex).toBeGreaterThan(-1);
    expect(adSlotIndex).toBeGreaterThan(specialtiesIndex);
  });

  it("homepage ad is below CalculatorSearch", () => {
    const src = readFile("../../app/page.tsx");
    const searchIndex = src.indexOf("<CalculatorSearch");
    const adSlotIndex = src.indexOf("<AdSlot");
    expect(searchIndex).toBeGreaterThan(-1);
    expect(adSlotIndex).toBeGreaterThan(searchIndex);
  });

  it("homepage has exactly one AdSlot", () => {
    const src = readFile("../../app/page.tsx");
    const adSlotMatches = src.match(/<AdSlot[\s\S]*?\/>/g) ?? [];
    expect(adSlotMatches.length).toBe(1);
  });
});

/* ------------------------------------------------------------------
   11. Search page: no ad placement
   ------------------------------------------------------------------ */

describe("Search page ad placement", () => {
  it("search page does not import AdSlot", () => {
    const src = readFile("../../app/search/page.tsx");
    expect(src).not.toContain("AdSlot");
    expect(src).not.toContain("@/components/ads");
  });

  it("search page has no ad-related imports", () => {
    const src = readFile("../../app/search/page.tsx");
    expect(src).not.toContain("adsConfig");
    expect(src).not.toContain("ad-slot");
  });
});

/* ------------------------------------------------------------------
   12–13. AdSlot responsive sizing
   ------------------------------------------------------------------ */

describe("AdSlot responsive sizing", () => {
  it("all size variants include w-full", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain('banner: "min-h-[100px] max-w-[728px] w-full"');
    expect(src).toContain('leaderboard: "min-h-[100px] max-w-[970px] w-full"');
    expect(src).toContain('rectangle: "min-h-[260px] max-w-[336px] w-full"');
    expect(src).toContain('"mobile-banner": "min-h-[100px] max-w-[320px] w-full"');
  });

  it("all size variants preserve min-h for CLS prevention", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("min-h-[100px]");
    expect(src).toContain("min-h-[260px]");
  });

  it("AdSlot includes data-testid for testing", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain('data-testid="ad-slot"');
  });
});

/* ------------------------------------------------------------------
   14. Calculator page placement structure
   ------------------------------------------------------------------ */

describe("Calculator page ad placement", () => {
  it("calculator page imports AdSlot", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    expect(src).toContain('from "@/components/ads"');
  });

  it("calculator page has exactly one AdSlot", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    const adSlotMatches = src.match(/<AdSlot[\s\S]*?\/>/g) ?? [];
    expect(adSlotMatches.length).toBe(1);
  });

  it("calculator ad is after CalculatorClient", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    const clientIndex = src.indexOf("<CalculatorClient");
    const adSlotIndex = src.indexOf("<AdSlot");
    expect(clientIndex).toBeGreaterThan(-1);
    expect(adSlotIndex).toBeGreaterThan(clientIndex);
  });

  it("calculator ad is before CalculatorMetadataCard", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    const adSlotIndex = src.indexOf("<AdSlot");
    const metadataIndex = src.indexOf("<CalculatorMetadataCard");
    expect(adSlotIndex).toBeGreaterThan(-1);
    expect(metadataIndex).toBeGreaterThan(adSlotIndex);
  });

  it("calculator ad slot uses placeholder ID", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    expect(src).toContain('slotId="placeholder-calc-primary"');
  });

  it("calculator page does not modify CalculatorClient logic", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    expect(src).toContain("<CalculatorClient slug={calculator.slug} />");
  });
});

/* ------------------------------------------------------------------
   15. Default state verification
   ------------------------------------------------------------------ */

describe("Default advertising state", () => {
  it("ads config source checks NEXT_PUBLIC_ADS_ENABLED", () => {
    const src = readFile("../../lib/ads/config.ts");
    expect(src).toContain("NEXT_PUBLIC_ADS_ENABLED");
    expect(src).toContain("return false");
  });

  it("ads config defaults to disabled when env var is undefined", () => {
    const src = readFile("../../lib/ads/config.ts");
    expect(src).toContain('raw === undefined || raw === null || raw === ""');
    expect(src).toContain("return false");
  });

  it("ads config does not hardcode real publisher IDs", () => {
    const src = readFile("../../lib/ads/config.ts");
    expect(src).not.toMatch(/ca-pub-\d{10,}/);
  });
});

/* ------------------------------------------------------------------
   16. Slot ID conventions
   ------------------------------------------------------------------ */

describe("Slot ID conventions", () => {
  it("calculator slot uses placeholder prefix", () => {
    const src = readFile("../../app/calculators/[slug]/page.tsx");
    expect(src).toContain('slotId="placeholder-calc-primary"');
  });

  it("category slot uses placeholder prefix", () => {
    const src = readFile("../../app/categories/[category]/page.tsx");
    expect(src).toContain('slotId="placeholder-category-feed"');
  });

  it("specialty slot uses placeholder prefix", () => {
    const src = readFile("../../app/specialties/[slug]/page.tsx");
    expect(src).toContain('slotId="placeholder-specialty-feed"');
  });

  it("homepage slot uses placeholder prefix", () => {
    const src = readFile("../../app/page.tsx");
    expect(src).toContain('slotId="placeholder-homepage-below-fold"');
  });

  it("no real AdSense slot IDs are used", () => {
    const pages = [
      "../../app/calculators/[slug]/page.tsx",
      "../../app/categories/[category]/page.tsx",
      "../../app/specialties/[slug]/page.tsx",
      "../../app/page.tsx",
    ];
    for (const page of pages) {
      const src = readFile(page);
      expect(src).not.toMatch(/ca-pub-\d+/);
    }
  });
});

/* ------------------------------------------------------------------
   17. Consent / Ads security boundary — source-level
   ------------------------------------------------------------------ */

describe("Consent / Ads security boundary", () => {
  it("AdSlot gates on consent before rendering", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("hasConsent");
    expect(src).toContain("consent");
  });

  it("AdScripts gates on consent before rendering", () => {
    const src = readFile("../../components/ads/ad-scripts.tsx");
    expect(src).toContain("hasConsent");
    expect(src).toContain("consent");
  });

  it("AdSlot does not render without valid slot ID", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("isValidSlotId(slotId)");
  });

  it("AdScripts does not render without adsenseReady", () => {
    const src = readFile("../../components/ads/ad-scripts.tsx");
    expect(src).toContain("adsConfig.adsenseReady");
  });

  it("consent banner default state is null (not yet decided)", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("consent !== null");
  });

  it("consent preferences button calls clearConsent", () => {
    const src = readFile("../../components/consent/consent-preferences-button.tsx");
    expect(src).toContain("clearConsent");
  });
});

/* ------------------------------------------------------------------
   18. Accessibility source verification
   ------------------------------------------------------------------ */

describe("Ad accessibility", () => {
  it("AdSlot uses role=complementary", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain('role="complementary"');
  });

  it("AdSlot has aria-label", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("aria-label={label}");
  });

  it("consent dialog uses role=dialog", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain('role="dialog"');
  });

  it("consent dialog has aria-label", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain('aria-label="Cookie and advertising consent"');
  });
});

/* ------------------------------------------------------------------
   19. Consent flow source verification
   ------------------------------------------------------------------ */

describe("Consent flow source verification", () => {
  it("cookie banner has Accept button", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("handleAccept");
    expect(src).toContain("Accept advertising");
  });

  it("cookie banner has Reject button", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("handleReject");
    expect(src).toContain("Reject advertising");
  });

  it("accept calls setConsent(true)", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("setConsent(true)");
  });

  it("reject calls setConsent(false)", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("setConsent(false)");
  });

  it("banner disappears after consent is set", () => {
    const src = readFile("../../components/consent/cookie-banner.tsx");
    expect(src).toContain("if (consent !== null)");
    expect(src).toContain("return null;");
  });
});

/* ------------------------------------------------------------------
   20. Layout / responsive safety — source verification
   ------------------------------------------------------------------ */

describe("Layout responsive safety", () => {
  it("all AdSlot sizes include w-full for responsive behavior", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("w-full");
  });

  it("AdSlot sizes use max-w constraints", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("max-w-[728px]");
    expect(src).toContain("max-w-[970px]");
    expect(src).toContain("max-w-[336px]");
    expect(src).toContain("max-w-[320px]");
  });

  it("AdSlot uses mx-auto for centering", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("mx-auto");
  });

  it("AdSlot has overflow-hidden to prevent content spillover", () => {
    const src = readFile("../../components/ads/ad-slot.tsx");
    expect(src).toContain("overflow-hidden");
  });
});
