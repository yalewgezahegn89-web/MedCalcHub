import { calculatorFaqs } from "@/lib/calculators/faqs";

type Props = {
  slug: string;
};

export function CalculatorFAQ({ slug }: Props) {
  const faqs = calculatorFaqs[slug];

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
      <h2 className="mb-6 text-2xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b pb-4 last:border-b-0"
          >
            <h3 className="mb-2 text-lg font-semibold">
              {faq.question}
            </h3>

            <p className="leading-7 text-muted-foreground">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}