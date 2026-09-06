export default function SpecialtyLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-10 w-48 rounded bg-slate-200" />
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-4 w-96 rounded bg-slate-200" />

        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-full bg-slate-200" />
          <div className="h-8 w-20 rounded-full bg-slate-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
              <div className="mt-4 h-4 w-20 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading specialty…</span>
    </div>
  );
}
