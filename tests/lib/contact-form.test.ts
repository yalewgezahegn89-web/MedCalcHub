/**
 * Contact Form — focused tests
 *
 * Covers:
 * 1. Contact form fields, options, and required validation
 * 2. mailto: target is medcalculatorhub@gmail.com
 * 3. Generated mailto includes inquiry data
 * 4. No server-side persistence is claimed
 * 5. GitHub fallback retained on the contact page
 * 6. Footer trust links and navigation remain intact
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

import {
  CONTACT_EMAIL,
  CONTACT_SUBMISSION_NOTICE,
  INQUIRY_TYPES,
  buildContactMailto,
} from "../../lib/contact/inquiry";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

/* ------------------------------------------------------------------ */
/*  Unit tests — mailto builder                                         */
/* ------------------------------------------------------------------ */

describe("Contact inquiry mailto builder", () => {
  it("defines the official contact email address", () => {
    expect(CONTACT_EMAIL).toBe("medcalculatorhub@gmail.com");
  });

  it("exposes all seven inquiry type options", () => {
    const labels = INQUIRY_TYPES.map((option) => option.label);
    expect(labels).toEqual([
      "General question",
      "Calculator issue",
      "Clinical content correction",
      "Technical issue",
      "Feature request",
      "Privacy / data request",
      "Other",
    ]);
  });

  it("builds a mailto targeting medcalculatorhub@gmail.com", () => {
    const url = buildContactMailto({
      name: "Ada Lovelace",
      email: "ada@example.com",
      inquiryType: "technical-issue",
      message: "The BMI calculator shows an error.",
    });

    expect(url.startsWith("mailto:medcalculatorhub@gmail.com?")).toBe(true);
  });

  it("includes the inquiry type label in the subject", () => {
    const url = buildContactMailto({
      name: "Ada Lovelace",
      email: "ada@example.com",
      inquiryType: "clinical-correction",
      message: "Reference update needed.",
    });

    const decoded = decodeURIComponent(url.replace(/\+/g, "%20"));
    expect(decoded).toContain(
      "[MedCalcHub Contact] Clinical content correction",
    );
  });

  it("includes sender name, email, inquiry type, and message in the body", () => {
    const url = buildContactMailto({
      name: "Ada Lovelace",
      email: "ada@example.com",
      inquiryType: "feature-request",
      message: "Please add a pediatric GCS calculator.",
    });

    const decoded = decodeURIComponent(url.replace(/\+/g, "%20"));
    expect(decoded).toContain("Name: Ada Lovelace");
    expect(decoded).toContain("Email: ada@example.com");
    expect(decoded).toContain("Inquiry type: Feature request");
    expect(decoded).toContain("Please add a pediatric GCS calculator.");
  });

  it("URL-encodes newlines and special characters", () => {
    const url = buildContactMailto({
      name: "A&B <Team>",
      email: "a@example.com",
      inquiryType: "other",
      message: "Line one\nLine two with & symbol",
    });

    expect(url).toContain(encodeURIComponent("\n"));
    expect(url).not.toContain("Line one\nLine two");
  });
});

/* ------------------------------------------------------------------ */
/*  Source-level — <ContactForm /> component                            */
/* ------------------------------------------------------------------ */

describe("ContactForm component", () => {
  const source = readFile("components/contact/contact-form.tsx");

  it("renders a form with all four fields", () => {
    expect(source).toContain("id=\"contact-name\"");
    expect(source).toContain("id=\"contact-email\"");
    expect(source).toContain("id=\"contact-inquiry-type\"");
    expect(source).toContain("id=\"contact-message\"");
  });

  it("uses accessible labels for every field", () => {
    expect(source).toContain("htmlFor=\"contact-name\"");
    expect(source).toContain("htmlFor=\"contact-email\"");
    expect(source).toContain("htmlFor=\"contact-inquiry-type\"");
    expect(source).toContain("htmlFor=\"contact-message\"");
  });

  it("marks required fields with required and aria-required", () => {
    const requiredCount = (source.match(/required/g) || []).length;
    const ariaRequiredCount =
      (source.match(/aria-required="true"/g) || []).length;
    expect(requiredCount).toBeGreaterThanOrEqual(4);
    expect(ariaRequiredCount).toBeGreaterThanOrEqual(4);
  });

  it("renders required-field validation errors", () => {
    expect(source).toContain("Name is required.");
    expect(source).toContain("Email address is required.");
    expect(source).toContain("Please choose an inquiry type.");
    expect(source).toContain("A message is required.");
  });

  it("annotates errors with aria-describedby and role=alert", () => {
    expect(source).toContain("aria-describedby={nameErrorId}");
    expect(source).toContain("aria-describedby={emailErrorId}");
    expect(source).toContain('role="alert"');
  });

  it("opens the email client instead of posting to a server", () => {
    expect(source).toContain("window.location.href = mailto");
    expect(source).not.toMatch(/\bfetch\s*\(/);
    expect(source).not.toContain("/api/");
    expect(source).not.toContain("FormData");
    expect(source).not.toContain(new RegExp("action=\"/"));
  });

  it("does not falsely claim messages are received or stored server-side", () => {
    const normalized = source.replace(/\s+/g, " ");
    expect(source).not.toContain("received your message");
    expect(source).not.toContain("stored on our server");
    expect(normalized).toContain(
      "MedCalcHub does not collect or store this message on the website.",
    );
  });

  it("shows a truthful submission notice with role=status", () => {
    expect(source).toContain('role="status"');
    expect(source).toContain('data-testid="contact-form-status"');
    expect(source).toContain(`{CONTACT_SUBMISSION_NOTICE}`);
    expect(CONTACT_SUBMISSION_NOTICE).toBe(
      "Your email app will open with the inquiry prepared. Send the message there to contact MedCalcHub.",
    );
  });

  it("keeps a visible plain-email fallback", () => {
    expect(source).toContain("Prefer email?");
    expect(source).toContain(`mailto:${"${CONTACT_EMAIL}"}`);
  });
});

/* ------------------------------------------------------------------ */
/*  Source-level — /contact page                                        */
/* ------------------------------------------------------------------ */

describe("Contact page", () => {
  const source = readFile("app/contact/page.tsx");

  it("embeds the ContactForm component", () => {
    expect(source).toContain("ContactForm");
    expect(source).toContain('import { ContactForm }');
  });

  it("keeps the GitHub issue tracker as a fallback", () => {
    expect(source).toContain("issue tracker on GitHub");
    expect(source).toContain(
      "https://github.com/yalewgezahegn89-web/MedCalcHub/issues",
    );
  });

  it("keeps the officer email and mailto link", () => {
    expect(source).toContain("medcalculatorhub@gmail.com");
    expect(source).toContain("mailto:medcalculatorhub@gmail.com");
  });

  it("keeps the privacy request section with subject line guidance", () => {
    expect(source).toContain("Privacy Request");
  });

  it("keeps site URL metadata for canonical and social cards", () => {
    expect(source).toContain("SITE_URL");
    expect(source).toContain("canonical");
    expect(source).toContain("openGraph");
    expect(source).toContain("twitter");
  });
});

/* ------------------------------------------------------------------ */
/*  Source-level — footer trust links and navigation                   */
/* ------------------------------------------------------------------ */

describe("Footer trust links", () => {
  const source = readFile("app/layout.tsx");

  it("keeps links to about, contact, terms, privacy, and cookie", () => {
    expect(source).toContain('href="/about"');
    expect(source).toContain('href="/contact"');
    expect(source).toContain('href="/terms"');
    expect(source).toContain('href="/privacy"');
    expect(source).toContain('href="/cookie"');
  });
});

describe("Navigation integrity", () => {
  const source = readFile("components/navbar.tsx");

  it("keeps the core navigation links", () => {
    expect(source).toContain('href: "/"');
    expect(source).toContain('href: "/calculators"');
    expect(source).toContain('href: "/categories"');
    expect(source).toContain('href: "/specialties"');
    expect(source).toContain('href: "/comparison"');
    expect(source).toContain('href: "/favorites"');
    expect(source).toContain('href: "/saved-calculations"');
    expect(source).toContain('href: "/history"');
    expect(source).toContain('href: "/recent"');
    expect(source).toContain('href: "/workspace"');
  });

  it("keeps trust links in the footer", () => {
    const footer = readFile("app/layout.tsx");
    expect(footer).toContain('href="/about"');
    expect(footer).toContain('href="/contact"');
  });
});