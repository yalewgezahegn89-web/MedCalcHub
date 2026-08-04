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

    clinicalGuidance: {
      advice: [
        "Maintain a balanced diet and regular physical activity.",
        "Assess cardiovascular and metabolic risk factors when clinically indicated.",
      ],

      warnings: [
        "BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass.",
      ],

      followUp: [
        "Interpret BMI together with clinical history and physical examination.",
        "Consider additional risk assessment based on the patient's overall health profile.",
      ],
    },

    classification: [
      {
        max: 18.4,
        label: "Underweight",
        status: "low",
      },

      {
        min: 18.5,
        max: 24.9,
        label: "Normal weight",
        status: "normal",
      },

      {
        min: 25,
        max: 29.9,
        label: "Overweight",
        status: "high",
      },

      {
        min: 30,
        label: "Obesity",
        status: "critical",
      },
    ],

    keywords: [
      "bmi",
      "body mass index",
      "weight",
      "height",
      "obesity",
    ],

    faq: [
      {
        question: "What is BMI?",
        answer: "BMI is a screening tool that estimates body fat using height and weight.",
      },
      {
        question: "Can BMI diagnose obesity?",
        answer: "No. BMI is only a screening tool and should always be interpreted together with clinical findings.",
      },
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
        conversion: {
          type: "divide",
          factor: 100,
        },
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