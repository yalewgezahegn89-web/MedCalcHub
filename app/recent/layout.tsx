import type { Metadata } from "next";

import { buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata";

export const metadata: Metadata = buildUtilityPageMetadata({
  title: "Recently Used",
  description:
    "Continue working where you left off with the medical calculators you used most recently on MedCalcHub.",
  path: "/recent",
});

export default function RecentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}