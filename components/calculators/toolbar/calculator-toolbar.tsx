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
      disabledSave = false,
      disabledCopy = false,
      disabledPrint = false,
      disabledShare = false,
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
          size="md"
          className="min-h-[44px]"
          onClick={onReset}
        >
          🔄 Reset
        </Button>
      )}

      {showCopy && (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="min-h-[44px]"
          onClick={onCopy}
          disabled={disabledCopy}
        >
          📋 Copy
        </Button>
      )}

      {showPrint && (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="min-h-[44px]"
          onClick={onPrint}
          disabled={disabledPrint}
        >
          🖨️ Print
        </Button>
      )}

      {showShare && (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="min-h-[44px]"
          onClick={onShare}
          disabled={disabledShare}
        >
          🔗 Share
        </Button>
      )}

      {showFavorite && (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="min-h-[44px]"
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
          size="md"
          className="min-h-[44px]"
          onClick={onSave}
          disabled={disabledSave}
        >
          💾 Save
        </Button>
      )}
    </div>
  );
});

CalculatorToolbar.displayName = "CalculatorToolbar";