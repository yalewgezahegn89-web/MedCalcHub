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
  openGraph: {
    title: "Privacy Policy | MedCalcHub",
    description:
      "Privacy Policy for MedCalcHub — how we handle your data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MedCalcHub",
    description:
      "Privacy Policy for MedCalcHub — how we handle your data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Effective: September 6, 2026 · Last updated: September 6, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            About MedCalcHub
          </h2>
          <p>
            MedCalcHub is an independent medical calculator and clinical
            decision-support website operated by Yalew Abera, based in Hawassa,
            Sidama Region, Ethiopia. It provides evidence-based clinical
            decision-support tools for healthcare professionals.
          </p>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:medcalculatorhub@gmail.com"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              medcalculatorhub@gmail.com
            </a>
            .
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
            <li>Advertising consent preference</li>
            <li>Appearance preference (light/dark theme)</li>
          </ul>
          <p className="mt-2">
            Your calculator data is stored locally in your browser and is not
            synced to MedCalcHub servers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            What This Policy Covers
          </h2>
          <p>This policy distinguishes four types of data handling:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Calculator and saved data</strong> — stored locally in
              your browser, as described above.
            </li>
            <li>
              <strong>Consent preference storage</strong> — your advertising
              consent choice is stored locally on your device.
            </li>
            <li>
              <strong>Website infrastructure</strong> — the website is served
              through standard web hosting infrastructure, and technical
              details such as how server logs are handled are determined by the
              hosting provider.
            </li>
            <li>
              <strong>Advertising and third-party services</strong> — currently
              disabled on MedCalcHub. If advertising is enabled in the future,
              third-party technologies may be used and will be disclosed and
              handled according to the then-current consent configuration.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Clinical Data You Enter
          </h2>
          <p>
            Saved calculations may contain clinical values you enter, such as
            laboratory results, patient weight, or age. We strongly recommend
            you avoid entering personally identifying patient information. All
            data remains in your browser and is not uploaded to MedCalcHub
            servers by our application code.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Advertising and Third-Party Services
          </h2>
          <p>
            <strong>Current status:</strong> advertising is currently disabled
            on MedCalcHub. While advertising is disabled, no advertising scripts
            or cookies are loaded, and no requests are made to advertising
            services.
          </p>
          <p className="mt-2">
            If advertising is enabled in the future, third-party services such
            as Google AdSense may load on this site. Third-party advertising may
            use cookies or similar technologies to serve and measure ads, and
            those technologies will be disclosed and configured in accordance
            with your consent before they are activated.
          </p>
          <p className="mt-2">
            You control whether advertising loads through the cookie consent
            banner on this site. You may reject advertising at any time.
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

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Contact
          </h2>
          <p>
            MedCalcHub is operated by Yalew Abera in Hawassa, Sidama Region,
            Ethiopia. For questions about this policy or your data, email{" "}
            <a
              href="mailto:medcalculatorhub@gmail.com"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              medcalculatorhub@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
