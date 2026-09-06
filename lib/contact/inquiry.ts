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

export type ContactInquiry = {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
};

export const CONTACT_SUBMISSION_NOTICE =
  "Your email app will open with the inquiry prepared. Send the message there to contact MedCalcHub.";

function inquiryLabel(type: InquiryType): string {
  return (
    INQUIRY_TYPES.find((option) => option.value === type)?.label ?? "Other"
  );
}

export function buildContactMailto(inquiry: ContactInquiry): string {
  const subject = `[MedCalcHub Contact] ${inquiryLabel(inquiry.inquiryType)}`;

  const body = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Inquiry type: ${inquiryLabel(inquiry.inquiryType)}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}