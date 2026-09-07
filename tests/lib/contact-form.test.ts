/**
 * Contact Form — focused tests
 *
 * Covers:
 * 1. Contact form fields, options, and required validation
 * 2. Direct submission ("Submit inquiry") with no mailto
 * 3. Loading / success / failure states
 * 4. Server-side API endpoint (validation, delivery, safety)
 * 5. Privacy wording accurately reflects transmission
 * 6. GitHub fallback retained on the contact page
 * 7. Footer trust links and navigation remain intact
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

import {
  CONTACT_EMAIL,
  CONTACT_SUCCESS_MESSAGE,
  CONTACT_FAILURE_MESSAGE,
  INQUIRY_TYPES,
  validateContactPayload,
  buildEmailHtml,
  inquiryLabel,
} from "../../lib/contact/inquiry";

const root = join(__dirname, "../..");

function readFile(relPath: string): string {
  return readFileSync(join(root, relPath), "utf8");
}

/* ------------------------------------------------------------------ */
/*  Shared validation + email builder                                   */
/* ------------------------------------------------------------------ */

describe("Contact inquiry validation", () => {
  it("accepts a valid payload", () => {
    const errors = validateContactPayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      inquiryType: "technical-issue",
      message: "The BMI calculator shows an error.",
    });
    expect(errors).toEqual([]);
  });

  it("rejects a missing name", () => {
    const errors = validateContactPayload({
      name: "   ",
      email: "ada@example.com",
      inquiryType: "general",
      message: "Hello",
    });
    expect(errors.some((e) => e.field === "name")).toBe(true);
  });

  it("rejects an invalid email", () => {
    const errors = validateContactPayload({
      name: "Ada",
      email: "not-an-email",
      inquiryType: "general",
      message: "Hello",
    });
    expect(errors.some((e) => e.field === "email")).toBe(true);
  });

  it("rejects an unsupported inquiry type", () => {
    const errors = validateContactPayload({
      name: "Ada",
      email: "ada@example.com",
      inquiryType: "spam",
      message: "Hello",
    });
    expect(errors.some((e) => e.field === "inquiryType")).toBe(true);
  });

  it("rejects a missing message", () => {
    const errors = validateContactPayload({
      name: "Ada",
      email: "ada@example.com",
      inquiryType: "general",
      message: "",
    });
    expect(errors.some((e) => e.field === "message")).toBe(true);
  });

  it("enforces name and message length limits", () => {
    const longName = "N".repeat(300);
    const longMessage = "M".repeat(10_001);
    const errors = validateContactPayload({
      name: longName,
      email: "ada@example.com",
      inquiryType: "general",
      message: longMessage,
    });
    expect(errors.some((e) => e.field === "name")).toBe(true);
    expect(errors.some((e) => e.field === "message")).toBe(true);
  });

  it("rejects non-string payload values", () => {
    const errors = validateContactPayload({
      name: 42,
      email: null,
      inquiryType: true,
      message: undefined,
    } as unknown as Record<string, unknown>);
    expect(errors.length).toBeGreaterThanOrEqual(4);
  });

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

  it("builds subject line with the inquiry type label", () => {
    expect(`[MedCalcHub Contact] ${inquiryLabel("clinical-correction")}`).toBe(
      "[MedCalcHub Contact] Clinical content correction",
    );
  });

  it("builds an email body containing name, email, type, and message", () => {
    const html = buildEmailHtml({
      name: "Ada Lovelace",
      email: "ada@example.com",
      inquiryType: "feature-request",
      message: "Please add a pediatric GCS calculator.",
    });
    expect(html).toContain("Ada Lovelace");
    expect(html).toContain("ada@example.com");
    expect(html).toContain("Feature request");
    expect(html).toContain("Please add a pediatric GCS calculator.");
  });

  it("escapes special characters in the email body", () => {
    const html = buildEmailHtml({
      name: "A&B <Team>",
      email: "a@example.com",
      inquiryType: "other",
      message: "Line one\nLine two with & symbol",
    });
    expect(html).toContain("A&amp;B");
    expect(html).toContain("&lt;Team&gt;");
    expect(html).toContain("&amp; symbol");
  });
});

/* ------------------------------------------------------------------ */
/*  API route — app/api/contact/route.ts                               */
/* ------------------------------------------------------------------ */

const { resendSendMock } = vi.hoisted(() => ({
  resendSendMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: resendSendMock } };
  }),
}));

import { POST } from "../../app/api/contact/route";

function jsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Contact API endpoint", () => {
  beforeEach(() => {
    resendSendMock.mockReset();
    resendSendMock.mockResolvedValue({ error: null });
    process.env.RESEND_API_KEY = "test-key";
  });

  it("accepts a valid POST and sends to medcalculatorhub@gmail.com", async () => {
    const res = await POST(
      jsonRequest({
        name: "Ada Lovelace",
        email: "ada@example.com",
        inquiryType: "technical-issue",
        message: "The BMI calculator shows an error.",
      }),
    );
    expect(res.status).toBe(200);
    expect(resendSendMock).toHaveBeenCalledTimes(1);
    const arg = resendSendMock.mock.calls[0][0];
    expect(arg.to).toBe("medcalculatorhub@gmail.com");
  });

  it("uses the inquiry type in the subject and Reply-To the visitor", async () => {
    await POST(
      jsonRequest({
        name: "Ada",
        email: "ada@example.com",
        inquiryType: "clinical-correction",
        message: "Please review the reference.",
      }),
    );
    const arg = resendSendMock.mock.calls[0][0];
    expect(arg.subject).toBe(
      "[MedCalcHub Contact] Clinical content correction",
    );
    expect(arg.replyTo).toBe("ada@example.com");
  });

  it("rejects invalid POST with 422", async () => {
    const res = await POST(
      jsonRequest({
        name: "",
        email: "not-an-email",
        inquiryType: "spam",
        message: "",
      }),
    );
    expect(res.status).toBe(422);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("rejects unsupported inquiry type", async () => {
    const res = await POST(
      jsonRequest({
        name: "Ada",
        email: "ada@example.com",
        inquiryType: "billing",
        message: "Hello",
      }),
    );
    expect(res.status).toBe(422);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("rejects missing fields", async () => {
    const res = await POST(jsonRequest({}));
    expect(res.status).toBe(422);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("enforces message and name length limits", async () => {
    const res = await POST(
      jsonRequest({
        name: "N".repeat(201),
        email: "ada@example.com",
        inquiryType: "general",
        message: "M".repeat(10_001),
      }),
    );
    expect(res.status).toBe(422);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON payloads", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not valid json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("rejects non-POST methods", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "GET",
    });
    const res = await POST(req as unknown as Request);
    expect(res.status).toBe(405);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("returns a safe error response when no API key is configured", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(
      jsonRequest({
        name: "Ada",
        email: "ada@example.com",
        inquiryType: "general",
        message: "Hello",
      }),
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Internal server error");
    expect(JSON.stringify(body)).not.toContain("key");
    expect(JSON.stringify(body)).not.toContain("RESEND_API_KEY");
  });

  it("returns a safe error response when Resend reports failure", async () => {
    resendSendMock.mockResolvedValue({ error: { message: "rate limited" } });
    const res = await POST(
      jsonRequest({
        name: "Ada",
        email: "ada@example.com",
        inquiryType: "general",
        message: "Hello",
      }),
    );
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(JSON.stringify(body).toLowerCase()).not.toContain("rate limited");
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

  it('shows a "Submit inquiry" button', () => {
    expect(source).toContain("Submit inquiry");
  });

  it('does not show a "Prepare email" button', () => {
    expect(source).not.toContain("Prepare email");
  });

  it("does not use mailto for submission", () => {
    expect(source).not.toContain("window.location.href = mailto");
    expect(source).not.toContain("buildContactMailto");
    expect(source).not.toMatch(/location\.href\s*=/);
    expect(source).not.toContain("Your email app will open");
  });

  it("posts to the contact API endpoint", () => {
    expect(source).toContain('fetch("/api/contact"');
    expect(source).toContain("method: \"POST\"");
  });

  it("submits JSON with all four fields", () => {
    expect(source).toContain("values.name.trim()");
    expect(source).toContain("values.email.trim()");
    expect(source).toContain("values.inquiryType");
    expect(source).toContain("values.message.trim()");
  });

  it("disables the button and shows a loading state while submitting", () => {
    expect(source).toContain('disabled={status === "submitting"}');
    expect(source).toContain('status === "submitting" ? "Sending..."');
    expect(source).toContain('"Submit inquiry"');
  });

  it("prevents duplicate submissions", () => {
    expect(source).toContain('status === "submitting"');
    expect(source).toContain('submittedRef');
  });

  it("shows an accessible success state with role=status", () => {
    expect(source).toContain('role="status"');
    expect(source).toContain('data-testid="contact-form-status"');
    expect(source).toContain("CONTACT_SUCCESS_MESSAGE");
    expect(CONTACT_SUCCESS_MESSAGE).toBe(
      "Your inquiry was sent successfully. Thank you for contacting MedCalcHub.",
    );
  });

  it("shows an accessible failure state with role=alert", () => {
    expect(source).toContain('role="alert"');
    expect(source).toContain("CONTACT_FAILURE_MESSAGE");
    expect(CONTACT_FAILURE_MESSAGE).toBe(
      "We couldn't send your inquiry. Please try again or email medcalculatorhub@gmail.com directly.",
    );
  });

  it("clears the form after successful submission", () => {
    expect(source).toContain(
      'setValues({ name: "", email: "", inquiryType: "", message: "" })',
    );
  });

  it("keeps a visible plain-email fallback", () => {
    expect(source).toContain("Prefer email?");
    expect(source).toContain("mailto:${CONTACT_EMAIL}");
  });
});

/* ------------------------------------------------------------------ */
/*  Source-level — /contact page                                        */
/* ------------------------------------------------------------------ */

describe("Contact page", () => {
  const source = readFile("app/contact/page.tsx");
  const normalized = source.replace(/\s+/g, " ");

  it("embeds the ContactForm component", () => {
    expect(source).toContain("ContactForm");
    expect(source).toContain("import { ContactForm }");
  });

  it("no longer claims messages stay entirely local", () => {
    expect(source).not.toContain("does not receive or store");
    expect(source).not.toContain("opens your email app");
    expect(source).not.toContain("message ready to send");
  });

  it("accurately states contact transmission to MedCalcHub", () => {
    expect(normalized).toContain(
      "transmitted to MedCalcHub for the purpose of responding to your request",
    );
    expect(normalized).toContain(
      "name, email address, inquiry type, and message",
    );
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
/*  Source-level — Privacy page                                         */
/* ------------------------------------------------------------------ */

describe("Privacy page contact wording", () => {
  const source = readFile("app/privacy/page.tsx");
  const normalized = source.replace(/\s+/g, " ");

  it("covers contact form submissions as a data handling type", () => {
    expect(source).toContain("Contact form submissions");
  });

  it("accurately states information is transmitted for responding", () => {
    expect(normalized).toContain(
      "transmitted to MedCalcHub for the purpose of responding to your request",
    );
    expect(normalized).toContain(
      "name, email address, inquiry type, and message",
    );
  });

  it("states that the email delivery provider may process the message", () => {
    expect(normalized).toContain(
      "may be processed by the email delivery provider used to deliver the message",
    );
  });

  it("does not invent retention periods", () => {
    expect(source).not.toMatch(/retention/i);
    expect(source).not.toMatch(/stored for \d+/i);
    expect(source).not.toMatch(/keep .* for \d+/i);
  });
});

/* ------------------------------------------------------------------ */
/*  API route source-level safety checks                               */
/* ------------------------------------------------------------------ */

describe("Contact API source safety", () => {
  const source = readFile("app/api/contact/route.ts");

  it("does not expose the API key to the client", () => {
    expect(source).toContain("process.env.RESEND_API_KEY");
    expect(source).not.toContain("\"use client\"");
    expect(source).toMatch(/server/i);
  });

  it("does not hard-code a real API key", () => {
    expect(source).not.toMatch(/re_[A-Za-z0-9]{20,}/);
  });

  it("restricts the request method", () => {
    expect(source).toContain("method !== \"POST\"");
  });

  it("limits payload size", () => {
    expect(source).toContain("content-length");
    expect(source).toMatch(/MAX_BODY_BYTES/);
  });

  it("returns safe error responses", () => {
    expect(source).toContain("Invalid JSON payload");
    expect(source).toContain("Method not allowed");
    expect(source).toContain("Payload too large");
    expect(source).toContain("Validation failed");
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