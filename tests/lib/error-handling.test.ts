import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const APP_DIR = path.resolve(__dirname, "../../app");

describe("error handling files", () => {
  // -------------------------------------------------------
  // global-error.tsx
  // -------------------------------------------------------

  describe("app/global-error.tsx", () => {
    const filePath = path.join(APP_DIR, "global-error.tsx");

    it("exists", () => {
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("exports a default function component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/export\s+default\s+function\s+GlobalError/);
    });

    it("is a client component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/^"use client";/m);
    });

    it("renders an error heading", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Something went wrong");
    });

    it("has a reset/retry action", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Try again");
      expect(content).toContain("onClick={reset}");
    });

    it("has a home recovery link", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Back to home");
      expect(content).toContain('href="/"');
    });

    it("wraps content in html and body tags", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("<html");
      expect(content).toContain("<body");
    });
  });

  // -------------------------------------------------------
  // app/error.tsx
  // -------------------------------------------------------

  describe("app/error.tsx", () => {
    const filePath = path.join(APP_DIR, "error.tsx");

    it("exists", () => {
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("exports a default function component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/export\s+default\s+function\s+GlobalError/);
    });

    it("is a client component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/^"use client";/m);
    });

    it("has a reset action", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Try again");
    });

    it("has a home recovery link", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Back to home");
    });
  });

  // -------------------------------------------------------
  // app/calculators/[slug]/error.tsx
  // -------------------------------------------------------

  describe("app/calculators/[slug]/error.tsx", () => {
    const filePath = path.join(APP_DIR, "calculators/[slug]/error.tsx");

    it("exists", () => {
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("exports a default function component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/export\s+default\s+function\s+CalculatorError/);
    });

    it("is a client component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/^"use client";/m);
    });

    it("has a reset action", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Try again");
    });

    it("links back to calculators list", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Back to calculators");
      expect(content).toContain('href="/calculators"');
    });
  });

  // -------------------------------------------------------
  // app/calculators/[slug]/loading.tsx
  // -------------------------------------------------------

  describe("app/calculators/[slug]/loading.tsx", () => {
    const filePath = path.join(APP_DIR, "calculators/[slug]/loading.tsx");

    it("exists", () => {
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("exports a default function component", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/export\s+default\s+function\s+CalculatorLoading/);
    });

    it("has accessible loading text", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("Loading calculator");
    });

    it("uses animate-pulse for skeleton effect", () => {
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("animate-pulse");
    });
  });
});
