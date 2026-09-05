import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";
import { calculatorRegistry, getCategories } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: {
    absolute: "About MedCalcHub",
  },
  description:
    "About MedCalcHub — a free, evidence-based medical calculator platform for healthcare professionals.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const calculatorCount = calculatorRegistry.length;
const categoryCount = getCategories().length;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">About MedCalcHub</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            What MedCalcHub Is
          </h2>
          <p>
            MedCalcHub is a free, open-access medical calculator and clinical
            decision-support platform. It provides{" "}
            <strong>{calculatorCount} evidence-based clinical calculators</strong>{" "}
            organised across <strong>{categoryCount} clinical areas</strong>,
            designed to support healthcare professionals at the point of care.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Who It Is For
          </h2>
          <p>
            MedCalcHub is intended for use by qualified healthcare
            professionals — including physicians, nurses, pharmacists,
            paramedics, and trainees — who need quick, reliable access to
            validated clinical scoring tools and calculation formulas.
          </p>
          <p className="mt-2">
            It is not intended for patients or the general public as a
            substitute for professional medical advice.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            What the Calculators Do
          </h2>
          <p>
            Each calculator implements a specific, published clinical formula or
            scoring system — for example, the CKD-EPI equation for estimating
            glomerular filtration rate, the CURB-65 score for pneumonia severity,
            or the Glasgow Coma Scale for neurological assessment.
          </p>
          <p className="mt-2">
            Calculators take the clinical inputs you provide (such as laboratory
            values, vital signs, or patient characteristics) and return a
            calculated result, often with interpretation bands, clinical context,
            and references to the original published source.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Clinical Decision Support, Not Diagnosis
          </h2>
          <p>
            MedCalcHub calculators are{" "}
            <strong>clinical decision-support tools</strong>. They are designed to
            assist qualified professionals in applying published evidence and
            scoring systems consistently.
          </p>
          <p className="mt-2">
            <strong>
              These calculators do not provide medical diagnoses, treatment
              recommendations, or clinical decisions.
            </strong>{" "}
            All results must be interpreted by a qualified healthcare professional
            in the context of the individual patient&apos;s clinical presentation,
            medical history, and professional judgment.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Limitations
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              Calculators rely on the accuracy of the values you enter. Incorrect
              inputs produce incorrect results.
            </li>
            <li>
              Published formulas and scoring systems have specific populations and
              use cases for which they were validated. Applying them outside those
              contexts may produce unreliable results.
            </li>
            <li>
              Calculators do not account for clinical nuances, comorbidities, or
              individual patient factors that a clinician would consider.
            </li>
            <li>
              Results are estimates or classifications — not definitive clinical
              endpoints.
            </li>
            <li>
              No calculator replaces the need for comprehensive clinical
              assessment, appropriate diagnostic workup, and professional
              judgment.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Responsible Use
          </h2>
          <p>
            MedCalcHub is provided as a convenience tool. Users are responsible
            for:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              Verifying that each calculator is appropriate for the clinical
              context in which it is being used.
            </li>
            <li>
              Checking inputs for accuracy before interpreting results.
            </li>
            <li>
              Applying professional clinical judgment to all results.
            </li>
            <li>
              Consulting primary sources and clinical guidelines where
              appropriate.
            </li>
            <li>
              Not relying on any single calculator as the sole basis for
              clinical decisions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Data and Privacy
          </h2>
          <p>
            MedCalcHub stores all data — including favourites, history, and
            saved calculations — entirely in your browser&apos;s local storage.
            No clinical data is transmitted to any server. See the{" "}
            <a
              href="/privacy"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/cookie"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              Cookie Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Platform
          </h2>
          <p>
            MedCalcHub is built with Next.js and is designed to be fast,
            accessible, and usable on any device. The source code and full
            calculator library are available on the project&apos;s public
            repository.
          </p>
        </section>
      </div>
    </div>
  );
}
