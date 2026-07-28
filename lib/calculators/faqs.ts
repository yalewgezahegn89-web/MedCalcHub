export type FAQ = {
  question: string;
  answer: string;
};

export const calculatorFaqs: Record<
  string,
  FAQ[]
> = {
  bmi: [
    {
      question:
        "What is BMI?",
      answer:
        "Body Mass Index is a screening tool that estimates body fat using height and weight.",
    },
    {
      question:
        "Can BMI diagnose obesity?",
      answer:
        "No. BMI is only a screening tool and should always be interpreted together with clinical findings.",
    },
  ],

  "ckd-epi-2021": [
    {
      question:
        "What is CKD-EPI used for?",
      answer:
        "CKD-EPI estimates glomerular filtration rate (eGFR) to assess kidney function.",
    },
    {
      question:
        "Why is CKD-EPI preferred over MDRD?",
      answer:
        "CKD-EPI is generally more accurate, especially when kidney function is normal or only mildly reduced.",
    },
  ],

  "cockcroft-gault": [
    {
      question:
        "When should Cockcroft-Gault be used?",
      answer:
        "Cockcroft-Gault is commonly used for medication dose adjustment based on renal function.",
    },
  ],
};