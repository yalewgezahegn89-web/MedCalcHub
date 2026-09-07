import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  CONTACT_EMAIL,
  validateContactPayload,
  buildEmailHtml,
  inquiryLabel,
} from "@/lib/contact/inquiry";

const MAX_BODY_BYTES = 16_384;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 },
    );
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Payload too large" },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const errors = validateContactPayload(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed", details: errors },
      { status: 422 },
    );
  }

  const name = (body.name as string).trim();
  const email = (body.email as string).trim();
  const inquiryType = (body.inquiryType as string).trim();
  const message = (body.message as string).trim();

  try {
    const resend = getResendClient();

    const subject = `[MedCalcHub Contact] ${inquiryLabel(inquiryType)}`;

    const html = buildEmailHtml({
      name,
      email,
      inquiryType: inquiryType as Parameters<typeof buildEmailHtml>[0]["inquiryType"],
      message,
    });

    const { error } = await resend.emails.send({
      from: "MedCalcHub Contact <contact@medcalculatorhub.com>",
      to: CONTACT_EMAIL,
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
