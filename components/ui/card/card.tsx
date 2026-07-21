import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { CardProps } from "./card.types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";