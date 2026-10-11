import type { Metadata } from "next";

import { buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata";

export const metadata: Metadata = buildUtilityPageMetadata({
  title: "Saved Calculations",
  description:
    "View and manage the medical calculations you have saved on MedCalcHub. Data is stored locally in your browser.",
  path: "/saved-calculations",
});

export default function SavedCalculationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}