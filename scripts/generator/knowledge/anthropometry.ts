export const anthropometryKnowledge = {
  bmi: {
    category: "Anthropometry",

    specialty: "General Medicine",

    description:
      "Calculates Body Mass Index from weight and height.",

    formula:
      "weight / (height * height)",

    normalRange:
      "18.5–24.9 kg/m²",

    clinicalGuidance: {
      advice: [
        "Maintain a balanced diet and regular physical activity.",
        "Assess cardiovascular and metabolic risk factors when clinically indicated.",
        "Use BMI as a screening tool, not a definitive diagnostic measure.",
      ],

      warnings: [
        "BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass.",
        "BMI does not differentiate between fat mass and lean mass.",
      ],

      followUp: [
        "Interpret BMI together with clinical history and physical examination.",
        "Consider waist circumference and additional metabolic risk assessment.",
        "Refer for body composition analysis if clinical picture is unclear.",
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

    relatedCalculators: [
      "bsa",
      "ibw",
      "adjbw",
      "lbm",
    ],

    faq: [
      {
        question: "What is BMI?",
        answer: "Body Mass Index (BMI) is a measure of body fat based on height and weight. It is calculated by dividing weight in kilograms by the square of height in meters.",
      },
      {
        question: "Is BMI accurate for athletes?",
        answer: "BMI may overestimate body fat in athletes and muscular individuals because it does not distinguish between muscle and fat mass.",
      },
      {
        question: "What BMI indicates obesity?",
        answer: "A BMI of 30 or higher is classified as obesity according to WHO guidelines.",
      },
    ],

    comparison: {
      title: "BMI vs Other Body Composition Measures",
      calculators: [
        {
          name: "Body Surface Area",
          href: "/calculators/bsa",
          use: "Drug dosing and physiologic scaling",
        },
        {
          name: "Waist-to-Hip Ratio",
          href: "/calculators/waist-to-hip-ratio",
          use: "Central adiposity assessment",
        },
      ],
    },

    evidence: {
      source: "World Health Organization",
      reference: "WHO Obesity: Preventing and managing the global epidemic. WHO Technical Report Series 894.",
      references: [
        "WHO. Obesity: Preventing and managing the global epidemic. WHO Technical Report Series 894, 2000.",
        "Nuttall FQ. Body Mass Index: Obesity, BMI, and Health. Nutrition. 2015.",
      ],
    },

    keywords: [
      "bmi",
      "body mass index",
      "weight",
      "height",
      "obesity",
      "overweight",
      "body composition",
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
      "Calculates Body Surface Area using the Mosteller formula.",

    formula:
      "BSA = √((height × weight) / 3600)",

    normalRange:
      "Typical adult: 1.4–2.2 m²",

    clinicalGuidance: {
      advice: [
        "BSA is commonly used for drug dosing, particularly in oncology and cardiology.",
        "Mosteller formula is widely accepted for clinical use.",
      ],

      warnings: [
        "BSA estimates may be less accurate at extremes of body size.",
        "Different BSA formulas may yield slightly different results.",
      ],

      followUp: [
        "Use BSA-based dosing with clinical judgment.",
        "Consider ideal body weight for drug dosing in obese patients.",
      ],
    },

    classification: [
      {
        max: 1.3,
        label: "Small adult",
        status: "low",
      },
      {
        min: 1.4,
        max: 2.2,
        label: "Typical adult",
        status: "normal",
      },
      {
        min: 2.3,
        label: "Large adult",
        status: "high",
      },
    ],

    relatedCalculators: [
      "bmi",
      "ibw",
      "adjbw",
      "lbm",
    ],

    faq: [
      {
        question: "What is BSA used for?",
        answer: "Body Surface Area is used for drug dosing (especially chemotherapy), cardiac index calculation, and metabolic rate estimation.",
      },
      {
        question: "Which BSA formula is most common?",
        answer: "The Mosteller formula BSA = √((height × weight) / 3600) is the most widely used in clinical practice.",
      },
    ],

    comparison: {
      title: "Body Composition Calculators",
      calculators: [
        {
          name: "BMI",
          href: "/calculators/bmi",
          use: "General body fat screening",
        },
        {
          name: "Ideal Body Weight",
          href: "/calculators/ibw",
          use: "Drug dosing reference weight",
        },
      ],
    },

    evidence: {
      source: "Mosteller RD",
      reference: "Simplified calculation of body-surface area. N Engl J Med. 1987.",
      references: [
        "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.",
      ],
    },

    keywords: [
      "bsa",
      "body surface area",
      "mosteller",
      "height",
      "weight",
      "drug dosing",
      "chemotherapy",
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

  ibw: {
    category: "Anthropometry",

    specialty: "Internal Medicine",

    description:
      "Calculates Ideal Body Weight using the Devine formula.",

    formula:
      "IBW = 50 + 2.3 × (Height - 60)",

    normalRange:
      "Varies by height and sex",

    clinicalGuidance: {
      advice: [
        "IBW is primarily used as a reference for drug dosing and ventilator settings.",
        "The Devine formula is the most widely used IBW equation.",
      ],

      warnings: [
        "IBW is an estimate and may not reflect actual healthy weight for all body types.",
        "In clinical practice, actual body weight is often preferred for drug dosing unless the patient is significantly obese.",
      ],

      followUp: [
        "Consider using adjusted body weight for drug dosing in obese patients.",
        "Compare IBW with actual weight to assess nutritional status.",
      ],
    },

    relatedCalculators: [
      "adjbw",
      "bmi",
      "bsa",
      "lbm",
    ],

    faq: [
      {
        question: "What is Ideal Body Weight?",
        answer: "Ideal Body Weight (IBW) is a reference weight calculated from height, used primarily for drug dosing and ventilator settings.",
      },
      {
        question: "When is IBW used clinically?",
        answer: "IBW is used for drug dosing (e.g., aminoglycosides, vancomycin), ventilator settings, and nutritional assessment.",
      },
      {
        question: "What is the Devine formula?",
        answer: "The Devine formula calculates IBW as 50 + 2.3 × (height in inches − 60) for males, and 45.5 + 2.3 × (height in inches − 60) for females.",
      },
    ],

    comparison: {
      title: "Body Weight Calculators",
      calculators: [
        {
          name: "Adjusted Body Weight",
          href: "/calculators/adjbw",
          use: "Drug dosing in obese patients",
        },
        {
          name: "Lean Body Mass",
          href: "/calculators/lbm",
          use: "Body composition and dosing",
        },
      ],
    },

    evidence: {
      source: "Devine BJ",
      reference: "Gentamicin therapy. Drug Intell Clin Pharm. 1974.",
      references: [
        "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655.",
      ],
    },

    keywords: [
      "ibw",
      "ideal body weight",
      "devine",
      "drug dosing",
      "body weight",
      "height",
    ],

    inputs: [
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        conversion: {
          type: "divide",
          factor: 2.54,
        },
        required: true,
      },
    ],
  },

  adjbw: {
    category: "Anthropometry",

    specialty: "Internal Medicine",

    description:
      "Calculates Adjusted Body Weight for drug dosing in overweight and obese patients.",

    formula:
      "AdjBW = IBW + 0.4 × (Actual Weight − IBW)",

    normalRange:
      "Varies by height and actual weight",

    clinicalGuidance: {
      advice: [
        "Adjusted body weight is used for drug dosing when actual body weight may overestimate and ideal body weight may underestimate requirements.",
        "Commonly used for aminoglycoside and vancomycin dosing in obese patients.",
      ],

      warnings: [
        "Adjusted body weight is primarily validated for aminoglycoside dosing.",
        "Clinical judgment should always supplement weight-based dosing calculations.",
      ],

      followUp: [
        "Monitor drug levels when using adjusted body weight for dosing.",
        "Reassess weight status periodically during treatment.",
      ],
    },

    relatedCalculators: [
      "ibw",
      "bmi",
      "bsa",
      "lbm",
    ],

    faq: [
      {
        question: "What is Adjusted Body Weight?",
        answer: "Adjusted Body Weight (AdjBW) is calculated as IBW + 0.4 × (Actual Weight − IBW). It is used for drug dosing in overweight and obese patients.",
      },
      {
        question: "When should Adjusted Body Weight be used?",
        answer: "AdjBW is used when dosing aminoglycosides and other drugs in obese patients where actual body weight may lead to overdosing.",
      },
    ],

    comparison: {
      title: "Body Weight Calculators",
      calculators: [
        {
          name: "Ideal Body Weight",
          href: "/calculators/ibw",
          use: "Reference weight from height",
        },
        {
          name: "Lean Body Mass",
          href: "/calculators/lbm",
          use: "Fat-free body weight estimation",
        },
      ],
    },

    evidence: {
      source: "ASHP Guidelines",
      reference: "ASHP Therapeutic Guidelines on Antimicrobial Dosing in Adults.",
      references: [
        "ASHP. Therapeutic Guidelines on Antimicrobial Dosing in Adults. Am J Health-Syst Pharm.",
      ],
    },

    keywords: [
      "adjbw",
      "adjusted body weight",
      "drug dosing",
      "obesity",
      "devine",
      "aminoglycoside",
    ],

    inputs: [
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        conversion: {
          type: "divide",
          factor: 2.54,
        },
        required: true,
      },
      {
        id: "weight",
        label: "Actual Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
    ],
  },

  "lean-body-weight": {
    category: "Anthropometry",

    specialty: "Internal Medicine",

    description:
      "Calculates Lean Body Weight using the Boer formula.",

    formula:
      "Male: LBM = 0.407 × Weight + 0.267 × Height − 19.2; Female: LBM = 0.252 × Weight + 0.473 × Height − 48.3",

    normalRange:
      "Varies by height, weight, and sex",

    clinicalGuidance: {
      advice: [
        "Lean Body Mass estimates the weight of the body excluding fat mass.",
        "Commonly used in clinical nutrition, anesthesia, and medication dosing.",
      ],

      warnings: [
        "LBM is an estimate and may vary with different measurement methods.",
        "The Boer formula was developed in a specific population and may not apply universally.",
      ],

      followUp: [
        "Use LBM alongside other nutritional assessment tools.",
        "Consider bioelectrical impedance or DEXA for more precise body composition analysis.",
      ],
    },

    relatedCalculators: [
      "ibw",
      "adjbw",
      "bmi",
      "bsa",
    ],

    faq: [
      {
        question: "What is Lean Body Mass?",
        answer: "Lean Body Mass (LBM) is the weight of the body excluding fat mass. It includes muscles, bones, organs, and water.",
      },
      {
        question: "What is the Boer formula?",
        answer: "The Boer formula estimates LBM: for males LBM = 0.407 × Weight + 0.267 × Height − 19.2; for females LBM = 0.252 × Weight + 0.473 × Height − 48.3.",
      },
    ],

    comparison: {
      title: "Body Composition Calculators",
      calculators: [
        {
          name: "Ideal Body Weight",
          href: "/calculators/ibw",
          use: "Reference weight from height",
        },
        {
          name: "BMI",
          href: "/calculators/bmi",
          use: "General body fat screening",
        },
      ],
    },

    evidence: {
      source: "Boer P",
      reference: "Estimated lean body mass as an index for normalization of body fluid volumes in humans. Nephron. 1984.",
      references: [
        "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Nephron. 1984;36:361-367.",
      ],
    },

    keywords: [
      "lbm",
      "lean body mass",
      "lean body weight",
      "boer",
      "body composition",
      "drug dosing",
      "nutrition",
    ],

    inputs: [
      {
        id: "sex",
        label: "Sex",
        type: "select",
        required: true,
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        required: true,
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        required: true,
      },
    ],
  },

  "waist-to-hip-ratio": {
    category: "Anthropometry",

    specialty: "General Medicine",

    description:
      "Calculates Waist-to-Hip Ratio to assess central adiposity and cardiovascular risk.",

    formula:
      "WHR = Waist Circumference / Hip Circumference",

    normalRange:
      "Males: <0.90; Females: <0.85",

    clinicalGuidance: {
      advice: [
        "WHR is a strong predictor of cardiovascular disease and type 2 diabetes.",
        "Measure waist at the narrowest point between the rib cage and iliac crest.",
        "Measure hips at the widest point of the buttocks.",
      ],

      warnings: [
        "WHR measurements require standardized technique for consistent results.",
        "WHR should be interpreted alongside other cardiovascular risk factors.",
      ],

      followUp: [
        "If WHR is elevated, assess other cardiovascular risk factors including blood pressure, lipids, and glucose.",
        "Lifestyle modifications including diet and exercise are primary interventions.",
      ],
    },

    classification: [
      {
        max: 0.89,
        label: "Low risk (Males)",
        status: "normal",
      },
      {
        min: 0.90,
        max: 0.99,
        label: "Moderate risk (Males)",
        status: "high",
      },
      {
        min: 1.0,
        label: "High risk (Males)",
        status: "critical",
      },
    ],

    relatedCalculators: [
      "bmi",
      "bsa",
    ],

    faq: [
      {
        question: "What does Waist-to-Hip Ratio measure?",
        answer: "WHR measures the distribution of body fat, specifically central (abdominal) adiposity, which is a strong predictor of cardiovascular risk.",
      },
      {
        question: "What WHR indicates increased risk?",
        answer: "For males, WHR ≥ 0.90 indicates increased risk. For females, WHR ≥ 0.85 indicates increased risk.",
      },
      {
        question: "How is WHR measured?",
        answer: "Measure waist circumference at the narrowest point between the rib cage and iliac crest. Measure hip circumference at the widest point of the buttocks. Divide waist by hip.",
      },
    ],

    comparison: {
      title: "Body Composition and Risk Assessment",
      calculators: [
        {
          name: "BMI",
          href: "/calculators/bmi",
          use: "General body fat screening",
        },
        {
          name: "Body Surface Area",
          href: "/calculators/bsa",
          use: "Drug dosing and scaling",
        },
      ],
    },

    evidence: {
      source: "WHO",
      reference: "Waist circumference and waist-hip ratio: report of a WHO expert consultation. WHO, 2008.",
      references: [
        "WHO. Waist circumference and waist-hip ratio: report of a WHO expert consultation. Geneva: World Health Organization, 2008.",
        "Yusuf S, et al. Obesity and the risk of myocardial infarction in 27 000 participants from 52 countries. Lancet. 2005.",
      ],
    },

    keywords: [
      "whr",
      "waist to hip ratio",
      "waist-hip ratio",
      "central obesity",
      "cardiovascular risk",
      "abdominal fat",
      "adiposity",
    ],

    inputs: [
      {
        id: "waist",
        label: "Waist Circumference",
        type: "number",
        unit: "cm",
        required: true,
      },
      {
        id: "hip",
        label: "Hip Circumference",
        type: "number",
        unit: "cm",
        required: true,
      },
    ],
  },
};
