type Props = {
  title?: string;
source?: string;
  reference?: string;
  link?: string;

  reviewedBy?: string;
  version?: string;
  updatedAt?: string;
};

export function EvidenceCard({
  title = "Evidence & References",
  source,
  reference,
  link,
  reviewedBy = "Editorial Team",
  version = "1.0",
  updatedAt,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold text-blue-900 dark:text-blue-300">
        {title}
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Source
          </p>

          <p className="font-semibold text-slate-800 dark:text-slate-200">
            {source}
          </p>
        </div>

        {reference && (
          <div>
            <p className="text-sm font-medium text-slate-500">
              Reference
            </p>

            <p className="text-slate-700 dark:text-slate-300">
              {reference}
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Reviewed By
            </p>

            <p>{reviewedBy}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Version
            </p>

            <p>{version}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Updated
            </p>

            <p>{updatedAt ?? "—"}</p>
          </div>

        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-medium text-blue-700 transition hover:underline dark:text-blue-400"
          >
            View Guideline →
          </a>
        )}

      </div>

    </section>
  );
}