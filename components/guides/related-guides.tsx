import Link from "next/link";

import type { GuideDefinition } from "@/lib/guides";

type Props = {
  guides: GuideDefinition[];
};

export function RelatedGuides({ guides }: Props) {
  if (guides.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
      <h2 className="mb-6 text-2xl font-bold">Related Guides</h2>

      <div className="space-y-3">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.slug}`}
            className="block rounded-lg border p-3 transition hover:bg-gray-50 dark:hover:bg-zinc-900"
          >
            <div className="font-medium">{guide.title}</div>

            <div className="text-sm text-muted-foreground">
              {guide.summary}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
