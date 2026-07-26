type Props = {
  title?: string;
  interpretation: string;
};

export function InterpretationCard({
  title = "Clinical Interpretation",
  interpretation,
}: Props) {
  return (
    <section className="rounded-2xl border border-green-200 bg-green-50 p-8 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold text-green-800">
        {title}
      </h2>

      <p className="leading-8 text-green-900">
        {interpretation}
      </p>

    </section>
  );
}