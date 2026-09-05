"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Heart, Menu, Bookmark, Scale, Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { isActiveRoute } from "@/lib/nav/active-route";
import { ThemeControl } from "@/components/theme/theme-control";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/categories", label: "Categories" },
  { href: "/specialties", label: "Specialties" },
  { href: "/comparison", label: "Comparison", icon: Scale },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/saved-calculations", label: "Saved", icon: Bookmark },
  { href: "/history", label: "History" },
  { href: "/recent", label: "Recent", icon: Clock },
  { href: "/workspace", label: "Workspace" },
];

const TRUST_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function getMobileFocusableElements(
  container: HTMLElement,
): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function isActive(href: string): boolean {
    return isActiveRoute(pathname, href);
  }

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  function openCommandPalette() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
      }),
    );
  }

  /* Close on Escape + focus trap for mobile nav */
  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        buttonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = getMobileFocusableElements(
          menuRef.current,
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
            document.activeElement === menuRef.current
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
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  /* Close on outside click */
  useEffect(() => {
    if (!mobileOpen) return;

    function onClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () =>
      document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen, closeMenu]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-blue-600"
        >
          MedCalcHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium transition",
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400",
                )}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {label}
              </Link>
            );
          })}
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
          {TRUST_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition",
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            onClick={openCommandPalette}
            className="min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            title="Search (Ctrl + K)"
            aria-label="Open Search"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Theme preference */}
          <ThemeControl />

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div
          ref={menuRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition",
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {label}
                </Link>
              );
            })}
            <span className="my-1 h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            {TRUST_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium transition",
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Theme preference (same control as desktop) */}
          <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Theme
            </p>

            <ThemeControl />
          </div>
        </div>
      )}
    </header>
  );
}