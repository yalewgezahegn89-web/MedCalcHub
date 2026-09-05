import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Contact MedCalcHub",
  },
  description:
    "Contact MedCalcHub — feedback, corrections, and technical support.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Contact MedCalcHub</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Email
          </h2>
          <p>
            <a
              href="mailto:medcalculatorhub@gmail.com"
              className="font-medium text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              medcalculatorhub@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            What to Contact Us About
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Calculator or content corrections</strong> — if you
              believe a formula, interpretation range, clinical reference, or
              FAQ contains an error
            </li>
            <li>
              <strong>Technical issues</strong> — bugs, broken functionality,
              or problems using the platform
            </li>
            <li>
              <strong>Feature suggestions</strong> — ideas for new calculators
              or improvements to existing ones
            </li>
            <li>
              <strong>Privacy or legal questions</strong> — concerns about
              data handling, consent, or terms of service
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            GitHub Issue Tracker
          </h2>
          <p>
            For calculator corrections and technical issues, you can also raise
            an issue through the project&apos;s public issue tracker on GitHub.
            This is especially useful for tracking the status of bug reports
            and feature requests.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Privacy-Related Requests
          </h2>
          <p>
            Because MedCalcHub stores all data locally in your browser and does
            not transmit clinical data to any server, most privacy-related
            actions can be performed directly by you — clearing your
            browser&apos;s local storage, managing advertising consent via the
            footer link, or removing individual saved calculations within the
            app.
          </p>
          <p className="mt-2">
            If you have a specific privacy concern or data request, email us at{" "}
            <a
              href="mailto:medcalculatorhub@gmail.com"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              medcalculatorhub@gmail.com
            </a>{" "}
            with &quot;Privacy Request&quot; in the subject line.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Response Expectations
          </h2>
          <p>
            While we aim to respond in a timely manner, response times may
            vary. For urgent clinical safety concerns, please also contact the
            relevant medical device regulatory authority in your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}
