export const anthropometryKnowledge = {
  bmi: {
    category: "Anthropometry",
    specialty: "General Medicine",
    description:
      "Calculates Body Mass Index.",
    formula:
      "BMI = weight / height²",
    normalRange:
      "18.5–24.9 kg/m²",
    keywords: [
      "bmi",
      "body mass index",
      "weight",
      "height",
      "obesity",
    ],
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        required: true,
      },
    ],
  },

  bsa: {
    category: "Anthropometry",
    specialty: "General Medicine",
    description:
      "Calculates Body Surface Area (Mosteller formula).",
    formula:
      "BSA = √((height × weight) / 3600)",
    normalRange:
      "Typical adult: 1.4–2.2 m²",
    keywords: [
      "bsa",
      "body surface area",
      "mosteller",
      "height",
      "weight",
    ],
    inputs: [
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        required: true,
      },
    ],
  },
} as const;