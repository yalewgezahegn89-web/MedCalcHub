"use client";

import { useCallback, useEffect, useRef } from "react";

import { useSearch } from "./use-search";
import { SearchInput } from "./search-input";
import { SearchResults } from "./search-results";

export interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({
  open,
  onClose,
}: SearchDialogProps) {
  const { query, setQuery, results, isSearching } =
    useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to allow the DOM to render
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open, setQuery]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K to open
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        if (!open) {
          // The parent should handle opening
        }
      }

      // Escape to close
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onClose();
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Click outside to close
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-[15vh]"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <div className="border-b p-4">
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={setQuery}
            placeholder="Search calculators..."
            loading={isSearching}
          />
        </div>

        <SearchResults
          results={results}
          onResultClick={onClose}
        />
      </div>
    </div>
  );
}