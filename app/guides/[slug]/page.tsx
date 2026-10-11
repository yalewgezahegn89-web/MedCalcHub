import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_URL } from "@/lib/site-url";
import {
  getGuide,
  getGuides,
  getRelatedCalculators,
  getRelatedGuide,
  formatGuideDate,
  buildGuideJsonLd,
} from "@/lib/guides";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const title = `${guide.title} | MedCalcHub`;

  return {
    title: { absolute: title },
    description: guide.summary,
    alternates: {
      canonical: `${SITE_URL}/guides/${guide.slug}`,
    },
    openGraph: {
      title,
      description: guide.summary,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: "article",
      siteName: "MedCalcHub",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "MedCalcHub — Professional Medical Calculators",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.summary,
      images: [OG_IMAGE],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const calculators = getRelatedCalculators(guide);
  const relatedGuides = (guide.relatedGuides ?? [])
    .map((relatedId) => getRelatedGuide(guide, relatedId))
    .filter((candidate) => candidate !== undefined);

  const jsonLd = buildGuideJsonLd(guide);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: guide.title },
          ]}
        />

        <header className="mb-8">
          <h1 className="mt-4 text-4xl font-bold">
            {guide.title}
          </h1>

          <p className="mt-3 text-gray-600">
            Published {formatGuideDate(guide.publication.publishedAt)} · Last
            updated {formatGuideDate(guide.publication.updatedAt)}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {guide.summary}
          </p>
        </header>

        <div className="space-y-6">
          {guide.introduction.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-2xl font-bold">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Calculators in this guide
          </h2>
          <ul className="mt-3 space-y-2">
            {calculators.map((calculator) => (
              <li key={calculator.slug}>
                <Link
                  href={`/calculators/${calculator.slug}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {calculator.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {relatedGuides.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">
              Related guides
            </h2>
            <ul className="mt-3 space-y-2">
              {relatedGuides.map((relatedGuide) => (
                <li key={relatedGuide.id}>
                  <Link
                    href={`/guides/${relatedGuide.slug}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {relatedGuide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            References
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
            {guide.references.map((reference, index) => (
              <li key={index}>{reference.citation}</li>
            ))}
          </ul>
        </section>

        <aside className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <h2 className="font-semibold">Guide disclaimer</h2>
          <p className="mt-2 leading-relaxed">
            {guide.disclaimer}
          </p>
        </aside>
      </div>
    </>
  );
}