type Props = {
  formula: string;
  title?: string;
};

export function FormulaCard({
  formula,
  title = "Formula",
}: Props) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        {title}
      </h2>

      <div className="overflow-x-auto rounded-xl bg-slate-50 p-6">

        <code className="block whitespace-pre-wrap break-words text-lg font-semibold text-blue-700">
          {formula}
        </code>

      </div>

    </section>
  );
}