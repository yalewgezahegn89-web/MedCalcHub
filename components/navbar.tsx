"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock, Heart, Menu, Bookmark, Scale, Search, X } from "lucide-react";

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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  function openCommandPalette() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
      }),
    );
  }

  /* Close on Escape */
  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        buttonRef.current?.focus();
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-blue-600"
        >
          MedCalcHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-blue-600"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </Link>
          ))}
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            onClick={openCommandPalette}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            title="Search (Ctrl + K)"
            aria-label="Open Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            type="button"
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
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
          aria-label="Navigation menu"
          className="border-t border-slate-200 bg-white px-6 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}