/**
 * Trust & Identity — Regression Tests
 *
 * Covers:
 * 1. /about page structure and content
 * 2. /contact page structure and content
 * 3. /terms page structure and content
 * 4. Footer links
 * 5. Navbar trust links
 * 6. Accessibility / semantic basics
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

/* ------------------------------------------------------------------ */
/*  1. /about page                                                      */
/* ------------------------------------------------------------------ */

describe("Trust — /about page", () => {
  const source = readFile("app/about/page.tsx");

  it("exists and exports a default function", () => {
    expect(source).toContain("export default function AboutPage");
  });

  it("has metadata with canonical URL", () => {
    expect(source).toContain("canonical");
    expect(source).toContain("/about");
  });

  it("has a descriptive title", () => {
    expect(source).toContain("About MedCalcHub");
  });

  it("explains what MedCalcHub is", () => {
    expect(source).toContain("What MedCalcHub Is");
  });

  it("identifies the intended audience", () => {
    expect(source).toContain("Who It Is For");
    expect(source).toContain("healthcare professionals");
  });

  it("explains what calculators do", () => {
    expect(source).toContain("What the Calculators Do");
  });

  it("states calculators do not replace clinical judgment", () => {
    expect(source).toContain("do not provide medical diagnoses");
  });

  it("lists limitations", () => {
    expect(source).toContain("Limitations");
  });

  it("includes responsible use guidance", () => {
    expect(source).toContain("Responsible Use");
  });

  it("does not invent credentials or certifications", () => {
    expect(source).not.toContain("FDA");
    expect(source).not.toContain("certified");
    expect(source).not.toContain("board-certified");
    expect(source).not.toContain("physician-reviewed");
  });

  it("does not invent a company or legal entity", () => {
    expect(source).not.toContain("Inc.");
    expect(source).not.toContain("LLC");
    expect(source).not.toContain("Ltd.");
    expect(source).not.toContain("Corporation");
  });

  it("references Privacy and Cookie policies", () => {
    expect(source).toContain("/privacy");
    expect(source).toContain("/cookie");
  });

  it("uses SITE_URL from lib/site-url", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("@/lib/site-url");
  });
});

/* ------------------------------------------------------------------ */
/*  2. /contact page                                                    */
/* ------------------------------------------------------------------ */

describe("Trust — /contact page", () => {
  const source = readFile("app/contact/page.tsx");

  it("exists and exports a default function", () => {
    expect(source).toContain("export default function ContactPage");
  });

  it("has metadata with canonical URL", () => {
    expect(source).toContain("canonical");
    expect(source).toContain("/contact");
  });

  it("has a descriptive title", () => {
    expect(source).toContain("Contact MedCalcHub");
  });

  it("displays the official contact email", () => {
    expect(source).toContain("medcalculatorhub@gmail.com");
  });

  it("has a mailto link for the contact email", () => {
    expect(source).toContain("mailto:medcalculatorhub@gmail.com");
  });

  it("covers calculator/content corrections", () => {
    expect(source).toContain("corrections");
  });

  it("covers technical issues", () => {
    expect(source).toContain("Technical issues");
  });

  it("covers feature suggestions", () => {
    expect(source).toContain("Feature suggestions");
  });

  it("covers privacy/legal questions", () => {
    expect(source).toContain("Privacy");
    expect(source).toContain("legal");
  });

  it("keeps GitHub issue tracker as additional option", () => {
    expect(source).toContain("issue tracker");
    expect(source).toContain("GitHub");
  });

  it("covers privacy-related requests with email", () => {
    expect(source).toContain("Privacy Request");
    expect(source).toContain("medcalculatorhub@gmail.com");
  });

  it("uses SITE_URL from lib/site-url", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("@/lib/site-url");
  });
});

/* ------------------------------------------------------------------ */
/*  3. /terms page                                                      */
/* ------------------------------------------------------------------ */

describe("Trust — /terms page", () => {
  const source = readFile("app/terms/page.tsx");

  it("exists and exports a default function", () => {
    expect(source).toContain("export default function TermsPage");
  });

  it("has metadata with canonical URL", () => {
    expect(source).toContain("canonical");
    expect(source).toContain("/terms");
  });

  it("has a descriptive title", () => {
    expect(source).toContain("Terms of Service | MedCalcHub");
  });

  it("marks legal review required", () => {
    expect(source).toContain("Legal review required");
  });

  it("covers acceptance of terms", () => {
    expect(source).toContain("Acceptance of Terms");
  });

  it("states no medical diagnosis or treatment", () => {
    expect(source).toContain("No Medical Diagnosis or Treatment");
    expect(source).toContain("does not provide medical advice");
  });

  it("covers calculator limitations", () => {
    expect(source).toContain("Calculator Limitations");
  });

  it("covers user responsibilities", () => {
    expect(source).toContain("User Responsibilities");
  });

  it("covers acceptable use", () => {
    expect(source).toContain("Acceptable Use");
  });

  it("covers intellectual property", () => {
    expect(source).toContain("Intellectual Property");
  });

  it("covers disclaimers", () => {
    expect(source).toContain("Disclaimers");
    expect(source).toContain("as is");
  });

  it("covers limitation of liability", () => {
    expect(source).toContain("Limitation of Liability");
  });

  it("references privacy and cookie policies", () => {
    expect(source).toContain("/privacy");
    expect(source).toContain("/cookie");
  });

  it("covers changes to terms", () => {
    expect(source).toContain("Changes to These Terms");
  });

  it("includes a contact section", () => {
    expect(source).toContain("Contact");
    expect(source).toContain("/contact");
  });

  it("does not invent a company or legal entity", () => {
    expect(source).not.toContain("Inc.");
    expect(source).not.toContain("LLC");
    expect(source).not.toContain("Ltd.");
    expect(source).not.toContain("Corporation");
  });

  it("uses SITE_URL from lib/site-url", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("@/lib/site-url");
  });
});

/* ------------------------------------------------------------------ */
/*  4. Footer links                                                     */
/* ------------------------------------------------------------------ */

describe("Trust — footer links", () => {
  const source = readFile("app/layout.tsx");

  it("footer links to /about", () => {
    expect(source).toContain('href="/about"');
    expect(source).toContain("About");
  });

  it("footer links to /contact", () => {
    expect(source).toContain('href="/contact"');
    expect(source).toContain("Contact");
  });

  it("footer links to /terms", () => {
    expect(source).toContain('href="/terms"');
    expect(source).toContain("Terms of Service");
  });

  it("footer still links to /privacy", () => {
    expect(source).toContain('href="/privacy"');
    expect(source).toContain("Privacy Policy");
  });

  it("footer still links to /cookie", () => {
    expect(source).toContain('href="/cookie"');
    expect(source).toContain("Cookie Policy");
  });

  it("footer still renders ConsentPreferencesButton", () => {
    expect(source).toContain("ConsentPreferencesButton");
  });

  it("footer has site description", () => {
    expect(source).toContain("Evidence-based medical calculators");
  });

  it("footer has copyright notice", () => {
    expect(source).toContain("&copy;");
  });
});

/* ------------------------------------------------------------------ */
/*  5. Navbar trust links                                               */
/* ------------------------------------------------------------------ */

describe("Trust — navbar links", () => {
  const source = readFile("components/navbar.tsx");

  it("navbar defines TRUST_LINKS with About and Contact", () => {
    expect(source).toContain("TRUST_LINKS");
    expect(source).toContain('/about"');
    expect(source).toContain('/contact"');
  });

  it("desktop nav renders trust links", () => {
    expect(source).toContain("TRUST_LINKS.map");
  });

  it("mobile nav renders trust links", () => {
    const mobileSection = source.slice(
      source.indexOf("Mobile Navigation Panel"),
    );
    expect(mobileSection).toContain("TRUST_LINKS.map");
  });

  it("desktop nav has a separator before trust links", () => {
    expect(source).toContain("bg-slate-200");
    expect(source).toContain("aria-hidden=\"true\"");
  });

  it("does not remove any existing navigation items", () => {
    expect(source).toContain('"/"');
    expect(source).toContain('"/calculators"');
    expect(source).toContain('"/categories"');
    expect(source).toContain('"/specialties"');
    expect(source).toContain('"/comparison"');
    expect(source).toContain('"/favorites"');
    expect(source).toContain('"/saved-calculations"');
    expect(source).toContain('"/history"');
    expect(source).toContain('"/recent"');
    expect(source).toContain('"/workspace"');
  });
});

/* ------------------------------------------------------------------ */
/*  6. Accessibility / semantic basics                                   */
/* ------------------------------------------------------------------ */

describe("Trust — accessibility and semantics", () => {
  it("about page uses section headings", () => {
    const source = readFile("app/about/page.tsx");
    expect(source).toContain("<h1");
    expect(source).toContain("<h2");
    expect(source).toContain("<section>");
  });

  it("contact page uses section headings", () => {
    const source = readFile("app/contact/page.tsx");
    expect(source).toContain("<h1");
    expect(source).toContain("<h2");
    expect(source).toContain("<section>");
  });

  it("terms page uses section headings", () => {
    const source = readFile("app/terms/page.tsx");
    expect(source).toContain("<h1");
    expect(source).toContain("<h2");
    expect(source).toContain("<section>");
  });

  it("about page uses semantic lists for limitations", () => {
    const source = readFile("app/about/page.tsx");
    expect(source).toContain("<li>");
    expect(source).toContain("<ul");
  });

  it("contact page uses semantic lists for contact categories", () => {
    const source = readFile("app/contact/page.tsx");
    expect(source).toContain("<li>");
    expect(source).toContain("<ul");
  });

  it("terms page uses semantic lists for limitations and responsibilities", () => {
    const source = readFile("app/terms/page.tsx");
    expect(source).toContain("<li>");
    expect(source).toContain("<ul");
  });

  it("all trust pages have lang=\"en\" via root layout", () => {
    const layout = readFile("app/layout.tsx");
    expect(layout).toContain('lang="en"');
  });
});
