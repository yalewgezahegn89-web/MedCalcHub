"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";

import {
  getFavorites,
  toggleFavorite,
} from "@/lib/favorites";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-favorites-changed",
    handler,
  );

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-favorites-changed",
      handler,
    );
  };
}

function getSnapshot() {
  return JSON.stringify(getFavorites());
}

function getServerSnapshot() {
  return "[]";
}

type FavoriteButtonProps = {
  calculatorId: string;
};

export default function FavoriteButton({
  calculatorId,
}: FavoriteButtonProps) {
  const favoritesStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const favorite = JSON.parse(favoritesStr).includes(
    calculatorId,
  );

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(calculatorId);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
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