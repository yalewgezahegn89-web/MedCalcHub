import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
        404
      </h1>

      <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Back to Home
        </Link>

        <Link
          href="/categories"
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Browse Calculators
        </Link>
      </div>
    </div>
  );
}
