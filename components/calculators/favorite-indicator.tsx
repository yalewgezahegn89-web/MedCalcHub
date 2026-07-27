"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { isFavorite } from "@/lib/favorites/storage";

type FavoriteIndicatorProps = {
  slug: string;
};

export function FavoriteIndicator({
  slug,
}: FavoriteIndicatorProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    function refresh() {
      setFavorite(isFavorite(slug));
    }

    refresh();

    window.addEventListener(
      "favorites-changed",
      refresh,
    );

    return () => {
      window.removeEventListener(
        "favorites-changed",
        refresh,
      );
    };
  }, [slug]);

  if (!favorite) {
    return null;
  }

  return (
    <Heart
      className="h-5 w-5 fill-red-500 text-red-500"
    />
  );
}