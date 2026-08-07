"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils/cn";

type FavoriteButtonProps = {
  calculatorId: string;
};

export default function FavoriteButton({
  calculatorId,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(() =>
    isFavorite(calculatorId),
  );

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(calculatorId);

    setFavorite(isFavorite(calculatorId));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Favorite"
      className={cn(
        "rounded-full p-2 transition-all duration-200",
        "hover:bg-red-50",
        favorite && "scale-110",
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          favorite
            ? "fill-red-500 text-red-500"
            : "text-slate-400",
        )}
      />
    </button>
  );
}