type Props = {
  mistakes: string[];
};

export function CommonMistakesCard({
  mistakes,
}: Props) {
  if (mistakes.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-800 dark:text-red-300">
        ⚠ Common Mistakes
      </h3>

      <ul className="space-y-3">
        {mistakes.map((mistake, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            <span className="mt-1 text-red-600">
              •
            </span>

            <span className="leading-7 text-slate-700 dark:text-slate-300">
              {mistake}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}