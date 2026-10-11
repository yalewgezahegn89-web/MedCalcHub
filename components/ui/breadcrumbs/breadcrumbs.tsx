import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import type { BreadcrumbItem } from "./breadcrumbs.types";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = !isLast && item.href;

          return (
            <li
              key={item.href ?? item.label}
              className="flex items-center gap-1.5"
            >
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {isLink ? (
                <Link
                  href={item.href!}
                  className="text-slate-500 transition hover:text-blue-600 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    isLast && "font-medium text-slate-900",
                    !isLast && "text-slate-500",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}