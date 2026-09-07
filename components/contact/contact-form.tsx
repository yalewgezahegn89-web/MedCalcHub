"use client";

import { useCallback, useRef, useState } from "react";

import {
  CONTACT_EMAIL,
  CONTACT_SUCCESS_MESSAGE,
  CONTACT_FAILURE_MESSAGE,
  INQUIRY_TYPES,
} from "@/lib/contact/inquiry";
import type { InquiryType } from "@/lib/contact/inquiry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/forms/select";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  inquiryType: InquiryType | "";
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.inquiryType) {
    errors.inquiryType = "Please choose an inquiry type.";
  }

  if (!message) {
    errors.message = "A message is required.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const submittedRef = useRef(false);

  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (status === "error") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [status],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextErrors = validate(values);
      setErrors(nextErrors);

      if (Object.values(nextErrors).some(Boolean)) {
        return;
      }

      if (status === "submitting" || submittedRef.current) {
        return;
      }

      setStatus("submitting");
      submittedRef.current = true;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            inquiryType: values.inquiryType,
            message: values.message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send");
        }

        setStatus("success");
        setValues({ name: "", email: "", inquiryType: "", message: "" });
        setErrors({});
        requestAnimationFrame(() => statusRef.current?.focus());
      } catch {
        setStatus("error");
        requestAnimationFrame(() => statusRef.current?.focus());
      } finally {
        submittedRef.current = false;
      }
    },
    [values, status],
  );

  const nameErrorId = errors.name ? "contact-name-error" : undefined;
  const emailErrorId = errors.email ? "contact-email-error" : undefined;
  const typeErrorId = errors.inquiryType ? "contact-type-error" : undefined;
  const messageErrorId = errors.message ? "contact-message-error" : undefined;

  return (
    <Card className="p-6 sm:p-8">
      <form
        data-testid="contact-form"
        noValidate
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              Name <span aria-hidden="true">*</span>
            </label>
            <Input
              id="contact-name"
              name="contact-name"
              autoComplete="name"
              placeholder="Your name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={nameErrorId}
              value={values.name}
              error={Boolean(errors.name)}
              onChange={(event) => handleChange("name", event.target.value)}
            />
            {nameErrorId && (
              <p id={nameErrorId} className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              Email <span aria-hidden="true">*</span>
            </label>
            <Input
              id="contact-email"
              name="contact-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={emailErrorId}
              value={values.email}
              error={Boolean(errors.email)}
              onChange={(event) => handleChange("email", event.target.value)}
            />
            {emailErrorId && (
              <p id={emailErrorId} className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-inquiry-type"
            className="block text-sm font-medium text-slate-900 dark:text-slate-100"
          >
            Inquiry type <span aria-hidden="true">*</span>
          </label>
          <Select
            id="contact-inquiry-type"
            name="contact-inquiry-type"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={typeErrorId}
            value={values.inquiryType}
            error={Boolean(errors.inquiryType)}
            onChange={(event) =>
              handleChange("inquiryType", event.target.value as InquiryType)
            }
          >
            <option value="" disabled>
              Select an inquiry type
            </option>
            {INQUIRY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {typeErrorId && (
            <p id={typeErrorId} className="text-sm text-destructive" role="alert">
              {errors.inquiryType}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-slate-900 dark:text-slate-100"
          >
            Message <span aria-hidden="true">*</span>
          </label>
          <Textarea
            id="contact-message"
            name="contact-message"
            rows={6}
            placeholder="Describe your question, feedback, or issue..."
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={messageErrorId}
            value={values.message}
            error={Boolean(errors.message)}
            onChange={(event) => handleChange("message", event.target.value)}
          />
          {messageErrorId && (
            <p id={messageErrorId} className="text-sm text-destructive" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Submit inquiry"}
          </Button>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {CONTACT_EMAIL}
            </a>
          </span>
        </div>

        {status === "success" && (
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            data-testid="contact-form-status"
            className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success dark:text-success"
          >
            {CONTACT_SUCCESS_MESSAGE}
          </p>
        )}

        {status === "error" && (
          <p
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            data-testid="contact-form-status"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive dark:text-destructive"
          >
            {CONTACT_FAILURE_MESSAGE}
          </p>
        )}
      </form>
    </Card>
  );
}
