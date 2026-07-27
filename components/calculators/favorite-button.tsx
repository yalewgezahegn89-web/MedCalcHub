"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import {
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites/storage";

type FavoriteButtonProps = {
  slug: string;
};

export default function FavoriteButton({
  slug,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(slug));
  }, [slug]);

  function handleClick() {
    const state = toggleFavorite(slug);
    setFavorite(state);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle Favorite"
      className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      <Heart
        className={`h-5 w-5 transition-all duration-200 ${
          favorite
            ? "fill-red-500 text-red-500 scale-110"
            : "text-slate-400"
        }`}
      />
    </button>
  );
}