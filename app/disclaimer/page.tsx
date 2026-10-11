import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Medical Disclaimer | MedCalcHub",
  },
  description:
    "MedCalcHub's medical disclaimer — educational decision-support scope, calculator limitations, urgent situations, and sources of information.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Medical Disclaimer | MedCalcHub",
    description:
      "MedCalcHub's medical disclaimer — educational decision-support scope, calculator limitations, urgent situations, and sources of information.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Disclaimer | MedCalcHub",
    description:
      "MedCalcHub's medical disclaimer — educational decision-support scope, calculator limitations, urgent situations, and sources of information.",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Medical Disclaimer</h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Last updated: October 11, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Educational and Decision-Support Scope
          </h2>
          <p>
            <strong>
              MedCalcHub does not provide medical advice, diagnosis, or
              treatment.
            </strong>{" "}
            The calculators and scoring systems on this platform are
            educational and clinical decision-support tools intended for use by
            qualified healthcare professionals. They help apply published
            clinical formulas and scoring systems consistently. They are not a
            substitute for professional clinical judgment, an individual
            assessment, or appropriate diagnostic care.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Interpretation in an Individual Context
          </h2>
          <p>
            Every result must be interpreted by a qualified healthcare
            professional in the full context of the individual patient: history,
            examination, laboratory results, comorbidities, and clinical
            presentation. Users are responsible for verifying that a calculator
            is appropriate for the situation, confirming the accuracy of every
            input, and reaching all clinical decisions through their own
            professional judgment. No result should be used as the sole basis
            for any medical decision.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Results and Their Limitations
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              Results are estimates or classifications — not definitive clinical
              endpoints.
            </li>
            <li>
              Results depend on values that you enter. Incorrect inputs produce
              incorrect results.
            </li>
            <li>
              Published formulas and scoring systems were validated for specific
              populations and use cases. Applying them elsewhere may be
              unreliable.
            </li>
            <li>
              Calculators cannot account for every clinical variable,
              comorbidity, or individual patient factor.
            </li>
            <li>
              Calculator content may not reflect the most current clinical
              evidence, and none of it has yet been subject to a completed human
              review. See the{" "}
              <a
                href="/content-sources"
                className="underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                Content Sources
              </a>{" "}
              page for the precise human-review status.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Emergency and Urgent Situations
          </h2>
          <p>
            MedCalcHub is not designed for emergency or urgent use. If you are
            facing a medical emergency, do not use this website. Contact the
            appropriate emergency services or healthcare facility in your area
            immediately.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Sources and Changes
          </h2>
          <p>
            The published sources behind each calculator are listed on the
            calculator&apos;s own page under Evidence &amp; References and
            References. Content may be updated as sources change, and no
            guarantee is made that results or wording will remain the same over
            time. This page and the site sitemap carry a lastmod date so you
            can see when editorial pages change.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            No False Assurance
          </h2>
          <p>
            MedCalcHub is an independent platform operated by Yalew Abera in
            Hawassa, Sidama Region, Ethiopia on a non-commercial basis. No
            certification, approval, or endorsement from any institution or
            regulatory body is claimed for the site or its calculators. Nothing
            on this platform promises a definitive clinical outcome. Nothing
            here replaces your professional responsibility to the individual
            patient. Please review the{" "}
            <a
              href="/terms"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </a>{" "}
            as well.
          </p>
        </section>
      </div>
    </div>
  );
}