export function Hero() {
  return (
    <section className="space-y-5 pb-2 pt-4 text-center sm:pt-8">
      <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        MedCalcHub
      </p>

      <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
        Clinical calculations,
        <span className="block text-blue-600 dark:text-blue-400">
          made clear.
        </span>
      </h1>

      <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
        Evidence-based medical calculators and clinical decision-support
        tools for healthcare professionals.
      </p>
    </section>
  );
}
