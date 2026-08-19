import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy | MedCalcHub",
  },
  description:
    "Privacy Policy for MedCalcHub — how we handle your data.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="mt-2 text-sm text-amber-700 dark:text-amber-400 font-semibold">
        Legal review required before production use.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            About MedCalcHub
          </h2>
          <p>
            MedCalcHub is a medical calculator and clinical education platform
            for healthcare professionals. It provides evidence-based clinical
            decision support tools.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Data Stored in Your Browser
          </h2>
          <p>
            MedCalcHub uses your browser&apos;s localStorage to store:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Favorited calculators</li>
            <li>Calculator usage history</li>
            <li>Recently viewed calculators</li>
            <li>Saved calculation inputs and results</li>
          </ul>
          <p className="mt-2">
            This data is stored entirely on your device. It is not transmitted
            to MedCalcHub servers or any third party by our application code.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Clinical Data You Enter
          </h2>
          <p>
            Saved calculations may contain clinical values you enter, such as
            laboratory results, patient weight, or age. We strongly recommend
            you avoid entering personally identifying patient information. All
            data remains in your browser and is not uploaded anywhere.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Optional Advertising
          </h2>
          <p>
            When advertising is enabled by the site operator and you have
            consented, third-party advertising services such as Google AdSense
            may load on this site. Third-party advertising may use cookies or
            similar technologies to serve and measure ads.
          </p>
          <p className="mt-2">
            You control whether advertising loads through the cookie consent
            banner. You may reject advertising at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Your Choices
          </h2>
          <p>
            You can accept or reject optional advertising via the consent
            banner. Rejecting advertising prevents any third-party advertising
            scripts or cookies from loading.
          </p>
          <p className="mt-2">
            You can clear all locally stored data at any time through your
            browser&apos;s settings or by using the clear functions within
            MedCalcHub.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Changes to This Policy
          </h2>
          <p>
            This privacy policy may be updated as the platform evolves. The
            latest version is always available at this page.
          </p>
        </section>
      </div>
    </div>
  );
}
