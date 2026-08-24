"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";

import type { ThemePreference } from "@/lib/theme";

import { useThemePreference } from "./use-theme-preference";

const THEME_OPTIONS: readonly {
  value: ThemePreference;
  label: string;
  Icon: typeof Sun;
}[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export function ThemeControl() {
  const [preference, setPreference] = useThemePreference();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  const current =
    THEME_OPTIONS.find((option) => option.value === preference) ??
    THEME_OPTIONS[2];
  const CurrentIcon = current.Icon;

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () =>
      document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  /* Move focus to the selected option when the menu opens */
  useEffect(() => {
    if (!open) return;

    const selectedIndex = THEME_OPTIONS.findIndex(
      (option) => option.value === preference,
    );

    (itemRefs.current[selectedIndex] ?? itemRefs.current[0])?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function focusOption(index: number) {
    const count = THEME_OPTIONS.length;
    const next = ((index % count) + count) % count;
    itemRefs.current[next]?.focus();
  }

  function currentOptionIndex(): number {
    const focused = itemRefs.current.findIndex(
      (item) => item === document.activeElement,
    );
    if (focused >= 0) return focused;

    const selected = THEME_OPTIONS.findIndex(
      (option) => option.value === preference,
    );
    return selected >= 0 ? selected : 0;
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusOption(currentOptionIndex() + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusOption(currentOptionIndex() - 1);
        break;
      case "Home":
        e.preventDefault();
        focusOption(0);
        break;
      case "End":
        e.preventDefault();
        focusOption(THEME_OPTIONS.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  function selectTheme(value: ThemePreference) {
    setPreference(value);
    closeMenu();
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Theme: ${current.label}. Change theme`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <CurrentIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Theme"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {THEME_OPTIONS.map((option, index) => {
            const selected = preference === option.value;
            const { Icon, label } = option;

            return (
              <button
                key={option.value}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                tabIndex={-1}
                onClick={() => selectTheme(option.value)}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
                  selected
                    ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-400"
                  aria-hidden="true"
                />

                <span className="flex-1">{label}</span>

                {selected && (
                  <Check
                    className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
