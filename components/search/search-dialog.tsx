"use client";

import { useCallback, useEffect, useRef } from "react";

import { useSearch } from "./use-search";
import { SearchInput } from "./search-input";
import { SearchResults } from "./search-results";

export interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function getFocusableElements(
  container: HTMLElement,
): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'input, button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex >= 0);
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

  // Focus trap: Tab cycles within the dialog
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(
          dialogRef.current,
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === first ||
            document.activeElement === dialogRef.current
          ) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!open) return;

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

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
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search calculators"
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
