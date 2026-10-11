import type { Metadata } from "next";

import { buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata";

export const metadata: Metadata = buildUtilityPageMetadata({
  title: "Favorite Calculators",
  description:
    "View and manage the medical calculators you have saved as favorites on MedCalcHub.",
  path: "/favorites",
});

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}