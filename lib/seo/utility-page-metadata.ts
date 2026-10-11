import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

type UtilityPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function buildUtilityPageMetadata({
  title,
  description,
  path,
}: UtilityPageMetadataOptions): Metadata {
  const absoluteTitle = `${title} | MedCalcHub`;

  return {
    title: { absolute: absoluteTitle },
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
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
      title: absoluteTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}