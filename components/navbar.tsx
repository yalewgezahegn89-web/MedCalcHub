"use client";

import Link from "next/link";
import { Heart, Scale, Search } from "lucide-react";

export default function Navbar() {
  function openCommandPalette() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
      }),
    );
  }

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

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/calculators"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            Calculators
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            Categories
          </Link>

          <Link
            href="/specialties"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            Specialties
          </Link>

          <Link
            href="/comparison"
            className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-blue-600"
          >
            <Scale className="h-4 w-4" />
            Comparison
          </Link>

          <Link
            href="/favorites"
            className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-blue-600"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>

          <Link
            href="/history"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            History
          </Link>

          <Link
            href="/workspace"
            className="text-sm font-medium transition hover:text-blue-600"
          >
            Workspace
          </Link>
        </nav>

        {/* Search */}
        <button
          onClick={openCommandPalette}
          className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          title="Search (Ctrl + K)"
          aria-label="Open Search"
        >
          <Search className="h-5 w-5" />
        </button>

      </div>
    </header>
  );
}