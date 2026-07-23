type ReferenceRange = {
  label: string;
  range: string;
};

type Props = {
  normalRange?: string;
  referenceRanges?: ReferenceRange[];
};

export function ReferenceRange({
  normalRange,
  referenceRanges,
}: Props) {
  if (
    !normalRange &&
    (!referenceRanges || referenceRanges.length === 0)
  ) {
    return null;
  }

  return (
    <section className="mt-8 rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">
        📊 Reference Range
      </h2>

      {referenceRanges && referenceRanges.length > 0 ? (
        <div className="space-y-2">
          {referenceRanges.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="font-medium">
                {item.label}
              </span>

              <span className="text-muted-foreground">
                {item.range}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>{normalRange}</p>
      )}
    </section>
  );
}