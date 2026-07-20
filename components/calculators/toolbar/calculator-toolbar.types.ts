import type { ButtonHTMLAttributes } from "react";

export interface CalculatorToolbarProps
  extends ButtonHTMLAttributes<HTMLDivElement> {
  onReset?: () => void;
  onCopy?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;

  showReset?: boolean;
  showCopy?: boolean;
  showPrint?: boolean;
  showShare?: boolean;
  showFavorite?: boolean;
}