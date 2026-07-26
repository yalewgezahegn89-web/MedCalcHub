type Props = {
  title?: string;
  description: string;
};

export function ClinicalDescription({
  title = "Clinical Overview",
  description,
}: Props) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold">
        {title}
      </h2>

      <p className="leading-8 text-slate-700">
        {description}
      </p>

    </section>
  );
}