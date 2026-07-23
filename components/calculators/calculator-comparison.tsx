import Link from "next/link";
import { Card } from "@/components/ui/card";

type Props = {
  slug: string;
};

const comparisonMap: Record<
  string,
  {
    title: string;
    calculators: {
      name: string;
      href: string;
      use: string;
    }[];
  }
> = {
  "ckd-epi-2021": {
    title: "Which Renal Calculator Should I Use?",
    calculators: [
      {
        name: "CKD-EPI 2021",
        href: "/calculators/ckd-epi-2021",
        use: "Recommended for estimating kidney function in most adults.",
      },
      {
        name: "Cockcroft-Gault",
        href: "/calculators/cockcroft-gault",
        use: "Preferred for medication dosing.",
      },
      {
        name: "MDRD",
        href: "/calculators/mdrd-egfr",
        use: "Older equation mainly used for historical comparison.",
      },
    ],
  },

  mdrd: {
    title: "Which Renal Calculator Should I Use?",
    calculators: [
      {
        name: "CKD-EPI 2021",
        href: "/calculators/ckd-epi-2021",
        use: "Preferred in current clinical practice.",
      },
      {
        name: "Cockcroft-Gault",
        href: "/calculators/cockcroft-gault",
        use: "Best for drug dose adjustment.",
      },
      {
        name: "MDRD",
        href: "/calculators/mdrd-egfr",
        use: "Older equation.",
      },
    ],
  },

  "cockcroft-gault": {
    title: "Which Renal Calculator Should I Use?",
    calculators: [
      {
        name: "CKD-EPI 2021",
        href: "/calculators/ckd-epi-2021",
        use: "Preferred for estimating GFR.",
      },
      {
        name: "Cockcroft-Gault",
        href: "/calculators/cockcroft-gault",
        use: "Preferred for medication dosing.",
      },
      {
        name: "MDRD",
        href: "/calculators/mdrd-egfr",
        use: "Older GFR equation.",
      },
    ],
  },
};

export function CalculatorComparison({ slug }: Props) {
  const section = comparisonMap[slug];

  if (!section) return null;

  return (
    <Card className="mt-8 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        {section.title}
      </h2>

      <div className="space-y-4">
        {section.calculators.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className="font-semibold text-primary hover:underline"
            >
              {item.name}
            </Link>

            <p className="text-sm text-muted-foreground">
              {item.use}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}