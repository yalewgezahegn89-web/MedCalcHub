type Props = {
  title?: string;
  source: string;
  reference?: string;
  link?: string;
};

export function EvidenceCard({
  title = "Evidence & References",
  source,
  reference,
  link,
}: Props) {
  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-8 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold text-blue-900">
        {title}
      </h2>

      <p className="font-semibold text-slate-800">
        {source}
      </p>

      {reference && (
        <p className="mt-2 text-sm text-slate-600">
          {reference}
        </p>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-medium text-blue-700 hover:underline"
        >
          View Guideline →
        </a>
      )}

    </section>
  );
}