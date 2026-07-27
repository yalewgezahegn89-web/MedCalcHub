import {
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Activity,
  Bone,
  Droplets,
} from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";
import { SpecialtyCard } from "./specialty-card";

const specialties = [
  {
    title: "Cardiology",
    description: "Heart disease risk scores and cardiovascular calculators.",
    href: "/specialties/cardiology",
    icon: <Heart className="h-7 w-7 text-white" />,
    color: "bg-red-500",
    calculatorCount: 8,
  },
  {
    title: "Pulmonology",
    description: "Respiratory medicine and pulmonary function tools.",
    href: "/specialties/pulmonology",
    icon: <Activity className="h-7 w-7 text-white" />,
    color: "bg-cyan-500",
    calculatorCount: 6,
  },
  {
    title: "Neurology",
    description: "Neurological assessment and stroke calculators.",
    href: "/specialties/neurology",
    icon: <Brain className="h-7 w-7 text-white" />,
    color: "bg-purple-500",
    calculatorCount: 5,
  },
  {
    title: "Pediatrics",
    description: "Growth charts, pediatric dosing, and child health.",
    href: "/specialties/pediatrics",
    icon: <Baby className="h-7 w-7 text-white" />,
    color: "bg-green-500",
    calculatorCount: 9,
  },
  {
    title: "Emergency",
    description: "Rapid clinical scores for emergency medicine.",
    href: "/specialties/emergency",
    icon: <Stethoscope className="h-7 w-7 text-white" />,
    color: "bg-orange-500",
    calculatorCount: 10,
  },
  {
    title: "Obstetrics",
    description: "Pregnancy, maternal care, and obstetric calculators.",
    href: "/specialties/obstetrics",
    icon: <Heart className="h-7 w-7 text-white" />,
    color: "bg-pink-500",
    calculatorCount: 7,
  },
  {
    title: "Nephrology",
    description: "Kidney function and renal disease calculators.",
    href: "/specialties/nephrology",
    icon: <Droplets className="h-7 w-7 text-white" />,
    color: "bg-emerald-500",
    calculatorCount: 6,
  },
  {
    title: "Orthopedics",
    description: "Musculoskeletal assessment and fracture tools.",
    href: "/specialties/orthopedics",
    icon: <Bone className="h-7 w-7 text-white" />,
    color: "bg-slate-600",
    calculatorCount: 4,
  },
];

export function BrowseSpecialties() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Browse by Specialty"
        description="Choose your medical specialty to quickly find the most relevant calculators."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {specialties.map((specialty) => (
          <SpecialtyCard
            key={specialty.title}
            title={specialty.title}
            description={specialty.description}
            href={specialty.href}
            icon={specialty.icon}
            color={specialty.color}
            calculatorCount={specialty.calculatorCount}
          />
        ))}
      </div>
    </section>
  );
}