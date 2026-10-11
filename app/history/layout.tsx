import type { Metadata } from "next";

import { buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata";

export const metadata: Metadata = buildUtilityPageMetadata({
  title: "Calculation History",
  description:
    "Review your past medical calculations on MedCalcHub. History is stored locally in your browser.",
  path: "/history",
});

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}