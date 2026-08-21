export default function CalculatorLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded bg-slate-200" />

        <div className="h-4 w-32 rounded bg-slate-200" />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded-lg bg-blue-200" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-3/4 rounded bg-slate-100" />
        </div>
      </div>

      <span className="sr-only">Loading calculator…</span>
    </div>
  );
}
