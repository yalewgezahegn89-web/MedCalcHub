"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";

import { getFavorites } from "@/lib/favorites";

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

type FavoriteIndicatorProps = {
  id: string;
};

export function FavoriteIndicator({
  id,
}: FavoriteIndicatorProps) {
  const favoritesStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const favorite = JSON.parse(favoritesStr).includes(
    id,
  );

  if (!favorite) {
    return null;
  }

  return (
    <Heart className="h-5 w-5 fill-red-500 text-red-500" aria-hidden="true" />
  );
}