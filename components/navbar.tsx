"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <Heart className="h-6 w-6 text-red-500" />
          <span>MedCalcHub</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/calculators"
            className="text-sm font-medium hover:text-blue-600"
          >
            Calculators
          </Link>

          <Link
            href="/specialties"
            className="text-sm font-medium hover:text-blue-600"
          >
            Specialties
          </Link>

          <Link
            href="/favorites"
            className="text-sm font-medium hover:text-blue-600"
          >
            Favorites
          </Link>
        </nav>

        <button
          className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
          title="Search (Ctrl + K)"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}