"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseSearchDialogReturn {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export function useSearchDialog(): UseSearchDialogReturn {
  const [open, setOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const openDialog = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  // Return focus to the trigger element when the dialog closes
  useEffect(() => {
    if (wasOpenRef.current && !open) {
      previousFocusRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            previousFocusRef.current = document.activeElement as HTMLElement | null;
          }
          return !prev;
        });
      }

      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    },
    [open],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { open, openDialog, closeDialog };
}
