"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import type { CalculatorToolbarProps } from "./calculator-toolbar.types";

export const CalculatorToolbar = forwardRef<
  HTMLDivElement,
  CalculatorToolbarProps
>(function CalculatorToolbar(
    {
      className,
      onReset,
      onCopy,
      onPrint,
      onShare,
      onFavorite,
      onSave,
      showReset = true,
      showCopy = true,
      showPrint = true,
      showShare = true,
      showFavorite = true,
      showSave = true,
      isFavorite = false,
      ...props
    },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {showReset && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          🔄 Reset
        </Button>
      )}

      {showCopy && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCopy}
        >
          📋 Copy
        </Button>
      )}

      {showPrint && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrint}
        >
          🖨️ Print
        </Button>
      )}

      {showShare && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onShare}
        >
          🔗 Share
        </Button>
      )}

      {showFavorite && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onFavorite}
        >
          {isFavorite ? "❤️" : "🤍"}{" "}
          {isFavorite ? "Favorited" : "Favorite"}
        </Button>
      )}

      {showSave && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSave}
        >
          💾 Save
        </Button>
      )}
    </div>
  );
});

CalculatorToolbar.displayName = "CalculatorToolbar";