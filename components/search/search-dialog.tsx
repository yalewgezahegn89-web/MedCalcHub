"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();

  const effectiveActiveIndex =
    activeIndex >= results.length ? -1 : activeIndex;

  const resetState = useCallback(() => {
    setQuery("");
    setActiveIndex(-1);
  }, [setQuery]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Arrow key navigation + Focus trap + Escape handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        resetState();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev < results.length - 1 ? prev + 1 : 0;
          return next;
        });
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : results.length - 1;
          return next;
        });
        return;
      }

      if (e.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
        e.preventDefault();
        const slug = results[activeIndex].document.slug;
        router.push(`/calculators/${slug}`);
        onClose();
        return;
      }

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
    [onClose, results, activeIndex, resetState, router],
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
        resetState();
        onClose();
      }
    },
    [onClose, resetState],
  );

  if (!open) return null;

  const hasResults = results.length > 0;
  const activeDescendantId = effectiveActiveIndex >= 0 ? `${listboxId}-option-${effectiveActiveIndex}` : undefined;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-[15vh]"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search calculators"
        className="w-full max-w-lg max-h-[70vh] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 flex flex-col"
      >
        <div className="border-b p-4 shrink-0">
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={setQuery}
            placeholder="Search calculators..."
            loading={isSearching}
            role="combobox"
            aria-expanded={query.trim().length > 0}
            aria-controls={listboxId}
            aria-activedescendant={activeDescendantId}
          />
        </div>

        <SearchResults
          results={results}
          onResultClick={onClose}
          activeIndex={effectiveActiveIndex}
          listboxId={listboxId}
          query={query}
        />
      </div>
    </div>
  );
}
