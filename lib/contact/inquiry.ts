export const CONTACT_EMAIL = "medcalculatorhub@gmail.com";

export type InquiryType =
  | "general"
  | "calculator-issue"
  | "clinical-correction"
  | "technical-issue"
  | "feature-request"
  | "privacy-request"
  | "other";

export const INQUIRY_TYPES: ReadonlyArray<{
  value: InquiryType;
  label: string;
}> = [
  { value: "general", label: "General question" },
  { value: "calculator-issue", label: "Calculator issue" },
  { value: "clinical-correction", label: "Clinical content correction" },
  { value: "technical-issue", label: "Technical issue" },
  { value: "feature-request", label: "Feature request" },
  { value: "privacy-request", label: "Privacy / data request" },
  { value: "other", label: "Other" },
];

const VALID_INQUIRY_TYPES = new Set<string>(
  INQUIRY_TYPES.map((t) => t.value),
);

export const CONTACT_SUCCESS_MESSAGE =
  "Your inquiry was sent successfully. Thank you for contacting MedCalcHub.";

export const CONTACT_FAILURE_MESSAGE =
  "We couldn't send your inquiry. Please try again or email medcalculatorhub@gmail.com directly.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 10000;

export type ContactInquiry = {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
};

export type ValidationError = {
  field: string;
  message: string;
};

export function inquiryLabel(type: string): string {
  return (
    INQUIRY_TYPES.find((option) => option.value === type)?.label ?? "Other"
  );
}

export function validateContactPayload(
  payload: Record<string, unknown>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  const name =
    typeof payload.name === "string" ? payload.name.trim() : "";
  const email =
    typeof payload.email === "string" ? payload.email.trim() : "";
  const inquiryType =
    typeof payload.inquiryType === "string"
      ? payload.inquiryType.trim()
      : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name) {
    errors.push({ field: "name", message: "Name is required." });
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push({
      field: "name",
      message: `Name must be at most ${MAX_NAME_LENGTH} characters.`,
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email address is required." });
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address.",
    });
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.push({
      field: "email",
      message: `Email must be at most ${MAX_EMAIL_LENGTH} characters.`,
    });
  }

  if (!inquiryType) {
    errors.push({
      field: "inquiryType",
      message: "Please choose an inquiry type.",
    });
  } else if (!VALID_INQUIRY_TYPES.has(inquiryType)) {
    errors.push({ field: "inquiryType", message: "Unsupported inquiry type." });
  }

  if (!message) {
    errors.push({ field: "message", message: "A message is required." });
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.push({
      field: "message",
      message: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  return errors;
}

export function buildEmailHtml(inquiry: ContactInquiry): string {
  const escaped = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.6;color:#334155;max-width:600px;margin:0 auto;padding:20px;">
  <h2 style="color:#1e293b;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">New MedCalcHub Contact Inquiry</h2>
  <table style="width:100%;border-collapse:collapse;margin:16px 0;">
    <tr><td style="padding:8px 12px;font-weight:600;color:#64748b;width:120px;">Name</td><td style="padding:8px 12px;">${escaped(inquiry.name)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 12px;"><a href="mailto:${escaped(inquiry.email)}">${escaped(inquiry.email)}</a></td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;color:#64748b;">Inquiry type</td><td style="padding:8px 12px;">${escaped(inquiryLabel(inquiry.inquiryType))}</td></tr>
  </table>
  <div style="margin:16px 0;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
    <p style="margin:0 0 8px;font-weight:600;color:#64748b;">Message</p>
    <p style="margin:0;white-space:pre-wrap;">${escaped(inquiry.message)}</p>
  </div>
  <p style="font-size:12px;color:#94a3b8;margin-top:24px;">Sent via MedCalcHub contact form at medcalculatorhub.com</p>
</body>
</html>`;
}
