import type { Metadata } from "next";

import { buildUtilityPageMetadata } from "@/lib/seo/utility-page-metadata";

export const metadata: Metadata = buildUtilityPageMetadata({
  title: "Clinical Workspace",
  description:
    "Your MedCalcHub clinical workspace: favorites, recently used tools, calculation history, and saved calculations in one place.",
  path: "/workspace",
});

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}