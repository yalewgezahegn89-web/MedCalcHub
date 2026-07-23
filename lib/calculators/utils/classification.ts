export type ClassificationItem = {
  label: string;
  range: string;
  min?: number;
  max?: number;
  color?: "green" | "yellow" | "orange" | "red" | "gray";
};

export function findClassification(
  value: number,
  items?: ClassificationItem[],
) {
  if (!items) return undefined;

  return items.find((item) => {
    const meetsMin =
      item.min === undefined || value >= item.min;

    const meetsMax =
      item.max === undefined || value <= item.max;

    return meetsMin && meetsMax;
  });
}