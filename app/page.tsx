import { CalculatorSearch } from "@/components/home/calculator-search";
import { FeaturedCalculators } from "@/components/home/featured-calculators";
import { FavoritesWidget } from "@/components/home/favorites-widget";
import { RecentCalculatorsWidget } from "@/components/home/recent-calculators-widget";
import { BrowseSpecialties } from "@/components/home/browse-specialties";
import { BrowseCategories } from "@/components/home/browse-categories";

export default function HomePage() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-10">

      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          MedCalcHub
        </h1>

        <p className="mx-auto max-w-3xl text-muted-foreground">
          Professional medical calculators, clinical decision support,
          and evidence-based tools for healthcare professionals.
        </p>
      </section>

      <CalculatorSearch />

      <FeaturedCalculators />

      <div className="grid gap-6 lg:grid-cols-2">
        <FavoritesWidget />
        <RecentCalculatorsWidget />
      </div>

      <BrowseCategories />

      <BrowseSpecialties />

    </main>
  );
}