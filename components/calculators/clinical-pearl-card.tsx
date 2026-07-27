type Props = {
  title?: string;
  pearl: string;
};

export function ClinicalPearlCard({
  title = "Clinical Pearl",
  pearl,
}: Props) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-800 dark:text-amber-300">
        💡 {title}
      </h3>

      <p className="leading-7 text-slate-700 dark:text-slate-300">
        {pearl}
      </p>
    </section>
  );
}