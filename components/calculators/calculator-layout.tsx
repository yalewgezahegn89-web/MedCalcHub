import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function CalculatorLayout({ children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

      {children}

    </div>
  );
}