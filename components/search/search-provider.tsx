"use client";

import { SearchDialog } from "./search-dialog";
import { useSearchDialog } from "./use-search-dialog";

export function SearchProvider() {
  const { open, closeDialog } = useSearchDialog();

  return (
    <SearchDialog open={open} onClose={closeDialog} />
  );
}