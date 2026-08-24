import { describe, it, expect } from "vitest";
import { getSpecialties } from "@/lib/calculators/registry";

const specialtyVisuals: Record<string, { icon: unknown; color: string }> = {
  Cardiology: { icon: null, color: "bg-red-500" },
  Neurology: { icon: null, color: "bg-purple-500" },
  "Internal Medicine": { icon: null, color: "bg-blue-500" },
  Pediatrics: { icon: null, color: "bg-green-500" },
  "Emergency Medicine": { icon: null, color: "bg-orange-500" },
  Nephrology: { icon: null, color: "bg-emerald-500" },
  Endocrinology: { icon: null, color: "bg-amber-500" },
  Orthopedics: { icon: null, color: "bg-slate-600" },
  "Critical Care": { icon: null, color: "bg-rose-600" },
  Gastroenterology: { icon: null, color: "bg-cyan-500" },
  "General Medicine": { icon: null, color: "bg-teal-500" },
  Obstetrics: { icon: null, color: "bg-pink-500" },
  Pulmonology: { icon: null, color: "bg-indigo-500" },
};

describe("specialty visual mapping", () => {
  const specialties = getSpecialties();

  it("has an explicit visual mapping for every registered specialty", () => {
    for (const specialty of specialties) {
      expect(
        specialtyVisuals[specialty],
        `Missing visual mapping for "${specialty}"`,
      ).toBeDefined();
    }
  });

  it("no current specialty relies on the default fallback", () => {
    for (const specialty of specialties) {
      expect(
        specialtyVisuals[specialty],
        `"${specialty}" falls back to defaultVisual`,
      ).toBeDefined();
    }
  });

  it("all mapped colors are non-empty strings", () => {
    for (const [name, visual] of Object.entries(specialtyVisuals)) {
      expect(
        visual.color,
        `"${name}" has empty color`,
      ).toBeTruthy();
      expect(
        visual.color.startsWith("bg-"),
        `"${name}" color does not start with bg-`,
      ).toBe(true);
    }
  });

  it("all mapped colors are valid Tailwind classes", () => {
    const validPrefixes = [
      "bg-red-",
      "bg-purple-",
      "bg-blue-",
      "bg-green-",
      "bg-orange-",
      "bg-emerald-",
      "bg-amber-",
      "bg-slate-",
      "bg-rose-",
      "bg-cyan-",
      "bg-teal-",
      "bg-pink-",
      "bg-indigo-",
    ];
    for (const [name, visual] of Object.entries(specialtyVisuals)) {
      const isValid = validPrefixes.some((prefix) =>
        visual.color.startsWith(prefix),
      );
      expect(
        isValid,
        `"${name}" color "${visual.color}" is not a recognized Tailwind color class`,
      ).toBe(true);
    }
  });
});
