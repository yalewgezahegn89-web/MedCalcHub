import { Button } from "@/components/ui/button";

const variants = ["primary", "secondary", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 py-16 font-sans">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            HealthCalcPro Design System
          </h1>
          <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
            Development playground for reusable UI components.
          </p>
        </header>

        <section className="space-y-10">
          {variants.map((variant) => (
            <div key={variant}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {variant}
              </h2>
              <div className="flex flex-wrap items-end gap-3">
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
