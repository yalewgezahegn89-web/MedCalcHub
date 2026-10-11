import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "Content Sources | MedCalcHub",
  },
  description:
    "Where MedCalcHub calculator methods come from, how content is maintained, and the platform's honest human-review status.",
  alternates: {
    canonical: `${SITE_URL}/content-sources`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Content Sources | MedCalcHub",
    description:
      "Where MedCalcHub calculator methods come from, how content is maintained, and the platform's honest human-review status.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Sources | MedCalcHub",
    description:
      "Where MedCalcHub calculator methods come from, how content is maintained, and the platform's honest human-review status.",
  },
};

export default function ContentSourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Content Sources</h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Last updated: October 11, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Where the Methods Come From
          </h2>
          <p>
            Every calculator on MedCalcHub implements a specific, published
            clinical formula or scoring system. Each calculator&apos;s page
            displays the original sources it is based on. The{" "}
            <span className="font-medium">Evidence &amp; References</span>{" "}
            block shows the evidence source (for example &quot;KDIGO&quot;,
            &quot;NICE CG174&quot;, or &quot;Original derivation
            (peer-reviewed)&quot;) together with a content-update date at month
            precision where one is recorded. The{" "}
            <span className="font-medium">References</span> list then gives the
            full citations.
          </p>
          <p className="mt-2">
            Examples of the full citations shown on individual calculators:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              CKD-EPI 2021 — &quot;Inker LA, Eneanya ND, Coresh J, et al. New
              Creatinine- and Cystatin C&ndash;Based Equations to Estimate GFR
              without Race. N Engl J Med. 2021;385(19):1737-1749.&quot;
            </li>
            <li>
              CURB-65 — &quot;Lim WS, van der Eerden MM, Laing R, et al.
              Defining community acquired pneumonia severity on presentation to
              hospital: an international derivation and validation study.
              Thorax. 2003;58(5):377-382.&quot;
            </li>
            <li>
              Glasgow Coma Scale — &quot;Teasdale G, Jennett B. Assessment of
              coma and impaired consciousness: a practical scale. Lancet.
              1974;304(7872):81-84.&quot;
            </li>
            <li>
              Apgar Score — &quot;Apgar V. A proposal for a new method of
              evaluation of the newborn infant. Curr Res Anesth Analg.
              1953;32(4):260-267.&quot;
            </li>
            <li>
              ABCD&#178; — &quot;Johnston SC, Rothwell PM, Nguyen-Huynh MN, et
              al. Validation and refinement of scores to predict very early
              stroke risk after transient ischaemic attack. Lancet.
              2007;369(9558):283-292.&quot;
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            How Calculations Are Represented
          </h2>
          <p>
            Each calculation is defined as structured data in the MedCalcHub
            source repository: the input fields, the applied formula, normal or
            reference ranges, clinical notes, and the reference list. The
            computation is ordinary arithmetic applied to the values a user
            enters. No calculator uses machine-learning inference or
            black-box models; every formula can be inspected in the public
            repository and checked against the cited publication.
          </p>
          <p className="mt-2">
            Around the calculation itself, each calculator page renders
            entered-clinical content such as clinical purpose, how to use it,
            an explanation of the formula and its variables, an interpretation
            guide, common mistakes, worked examples, limitations, and FAQs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            How Content Is Maintained
          </h2>
          <p>
            Calculator definitions and supporting content are maintained as
            source files and are built into the site at build time. They are
            not entered per request. Every change goes through the project&apos;s
            version control and is reflected in the calculator&apos;s reference
            list and update metadata.
          </p>
          <p className="mt-2">
            Automated tests in the repository enforce structural requirements:
            every one of the {142} calculators with evidence content and all{" "}
            {143} calculators overall must expose a formula explanation and
            variable definitions; each must carry at least three
            calculator-specific common mistakes, at least one FAQ entry, a
            clinical purpose, and a disclaimer; reference and evidence formats
            must be consistent; and no calculator may claim a review that has
            not been recorded.
          </p>
          <p className="mt-2">
            <strong>
              These automated tests verify internal consistency, completeness,
              and structure. They are not a substitute for clinical validation
              and do not constitute human clinical review.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Human Review Status
          </h2>
          <p>
            As of the date of this page, no calculator in the library carries a
            completed human review record. No named clinical reviewer has
            signed off on any calculator or its supporting content, and nothing
            on MedCalcHub claims otherwise. Evidence blocks display content
            update dates where recorded, but they never name a reviewer.
          </p>
          <p className="mt-2">
            The site can render a review section when a genuine human review is
            completed and recorded, but none exists today. This page will be
            updated to state it plainly if and when human review status changes.
            Until then, treat all calculator content as pending human review
            and verify against the cited primary sources.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Correcting Content
          </h2>
          <p>
            If you find an error in a formula, an interpretation range, a
            clinical reference, or a FAQ, please report it through the{" "}
            <a
              href="/contact"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact page
            </a>{" "}
            or the project&apos;s public GitHub issue tracker. While we aim to
            respond in a timely manner, response times may vary. For urgent
            clinical safety concerns, please also contact the relevant medical
            device regulatory authority in your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}