"use client";

import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  slug: string;
};

export default function FavoriteButton({
  slug,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-label={`Favorite ${slug}`}
      className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      <Heart className="h-5 w-5 text-slate-500" />
    </button>
  );
}