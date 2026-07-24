import type { Specialty } from "./specialty.types";

export const specialtyRegistry: Specialty[] = [
  {
    id: "general",
    slug: "general",
    name: "General",
    description: "General clinical and anthropometric calculators.",
    icon: "🩺",
  },
  {
    id: "emergency",
    slug: "emergency",
    name: "Emergency",
    description: "Acute care and emergency medicine calculations.",
    icon: "🚑",
  },
  {
    id: "nephrology",
    slug: "nephrology",
    name: "Nephrology",
    description: "Kidney function, fluids, and renal physiology calculations.",
    icon: "🫘",
  },
  {
    id: "cardiology",
    slug: "cardiology",
    name: "Cardiology",
    description: "Cardiac risk and cardiovascular calculations.",
    icon: "❤️",
  },
  {
    id: "endocrinology",
    slug: "endocrinology",
    name: "Endocrinology",
    description: "Metabolic and endocrine disease calculations.",
    icon: "🧪",
  },
  {
    id: "pulmonology",
    slug: "pulmonology",
    name: "Pulmonology",
    description: "Respiratory and pulmonary diagnostic calculators.",
    icon: "🫁",
  },
  {
    id: "neurology",
    slug: "neurology",
    name: "Neurology",
    description: "Neurologic assessment and brain-related calculations.",
    icon: "🧠",
  },
  {
    id: "gastroenterology",
    slug: "gastroenterology",
    name: "Gastroenterology",
    description: "Digestive and gastrointestinal calculations.",
    icon: "🧬",
  },
  {
    id: "critical-care",
    slug: "critical-care",
    name: "Critical Care",
    description: "Intensive care and high-acuity decision support.",
    icon: "🩹",
  },
  {
    id: "obstetrics",
    slug: "obstetrics",
    name: "Obstetrics",
    description: "Pregnancy and obstetric calculations.",
    icon: "🤰",
  },
  {
    id: "pediatrics",
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Child health and pediatric growth calculations.",
    icon: "🧒",
  },
];

export function getSpecialtyBySlug(slug: string) {
  return specialtyRegistry.find((specialty) => specialty.slug === slug);
}
