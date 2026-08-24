import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "Calculator Comparison | MedCalcHub",
  },
  description:
    "Compare medical calculators side by side — inputs, formulas, intended use, and limitations — to choose the most appropriate tool for your patient.",
  alternates: {
    canonical: `${SITE_URL}/comparison`,
  },
  openGraph: {
    title: "Calculator Comparison | MedCalcHub",
    description:
      "Compare medical calculators side by side to choose the most appropriate tool for your patient.",
    url: `${SITE_URL}/comparison`,
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
    title: "Calculator Comparison | MedCalcHub",
    description:
      "Compare medical calculators side by side to choose the most appropriate tool for your patient.",
    images: [OG_IMAGE],
  },
};

export default function ComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
