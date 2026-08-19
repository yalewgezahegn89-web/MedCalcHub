import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Cookie Policy | MedCalcHub",
  },
  description:
    "Cookie Policy for MedCalcHub — how we use cookies and local storage.",
  alternates: {
    canonical: `${SITE_URL}/cookie`,
  },
};

export default function CookiePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>

      <p className="mt-2 text-sm text-amber-700 dark:text-amber-400 font-semibold">
        Legal review required before production use.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            How MedCalcHub Stores Data
          </h2>
          <p>
            MedCalcHub does not use cookies for its core functionality. Instead,
            it uses your browser&apos;s localStorage for the following
            purposes:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Favorites</strong> — stores which calculators you have
              favorited
            </li>
            <li>
              <strong>History</strong> — stores your recent calculation results
            </li>
            <li>
              <strong>Recent Calculators</strong> — tracks which calculators
              you have recently viewed
            </li>
            <li>
              <strong>Saved Calculations</strong> — stores calculation inputs
              and results you choose to save
            </li>
            <li>
              <strong>Consent State</strong> — records your advertising
              consent choice
            </li>
          </ul>
          <p className="mt-2">
            All of this data remains entirely on your device. It is never sent
            to MedCalcHub servers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Third-Party Advertising Cookies
          </h2>
          <p>
            When advertising is activated by the site operator and you have
            consented to advertising, third-party services such as Google
            AdSense may set cookies or use similar tracking technologies.
          </p>
          <p className="mt-2">
            These third-party cookies are controlled by the respective
            advertising providers, not by MedCalcHub. The specific cookies
            used will depend on the advertising provider and their
            configuration.
          </p>
          <p className="mt-2">
            <strong>
              The production cookie inventory must be confirmed after the
              chosen advertising provider and account are configured.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Managing Your Consent
          </h2>
          <p>
            You are presented with a consent banner when you first visit
            MedCalcHub. You may accept or reject advertising.
          </p>
          <p className="mt-2">
            Rejecting advertising prevents any third-party advertising scripts
            or cookies from loading. Your choice is stored locally in your
            browser and can be cleared at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Changes to This Policy
          </h2>
          <p>
            This cookie policy may be updated as the platform evolves. The
            latest version is always available at this page.
          </p>
        </section>
      </div>
    </div>
  );
}
