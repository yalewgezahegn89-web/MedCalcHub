import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "Search Medical Calculators | MedCalcHub",
  },
  description:
    "Search and filter MedCalcHub's evidence-based medical calculators by name, specialty, category, or keyword. Find the right clinical tool instantly.",
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
  openGraph: {
    title: "Search Medical Calculators | MedCalcHub",
    description:
      "Search and filter MedCalcHub's evidence-based medical calculators by name, specialty, category, or keyword.",
    url: `${SITE_URL}/search`,
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
    title: "Search Medical Calculators | MedCalcHub",
    description:
      "Search and filter MedCalcHub's evidence-based medical calculators by name, specialty, category, or keyword.",
    images: [OG_IMAGE],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
