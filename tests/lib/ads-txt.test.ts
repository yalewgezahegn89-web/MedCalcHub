import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("ads.txt", () => {
  const adsTxtPath = path.resolve(__dirname, "../../public/ads.txt");

  it("exists at public/ads.txt", () => {
    expect(fs.existsSync(adsTxtPath)).toBe(true);
  });

  it("contains the IAB ads.txt comment header", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    expect(content).toContain("# https://iabtechlab.com/ads.txt/");
  });

  it("contains a google.com entry line", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    const lines = content
      .split("\n")
      .filter((l) => l.trim().length > 0 && !l.startsWith("#"));
    const googleLine = lines.find((l) => l.startsWith("google.com,"));
    expect(googleLine).toBeDefined();
  });

  it("detects placeholder publisher ID that must be replaced before launch", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    const hasPlaceholder = content.includes("pub-0000000000000000");
    expect(hasPlaceholder).toBe(true);
  });

  it("has correct IAB format for the entry line", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    const lines = content
      .split("\n")
      .filter((l) => l.trim().length > 0 && !l.startsWith("#"));
    const googleLine = lines.find((l) => l.startsWith("google.com,"));
    expect(googleLine).toBeDefined();

    const parts = googleLine!.split(",").map((p) => p.trim());
    expect(parts).toHaveLength(4);
    expect(parts[0]).toBe("google.com");
    expect(parts[1]).toMatch(/^pub-\d+$/);
    expect(parts[2]).toBe("DIRECT");
    expect(parts[3]).toBe("f08c47fec0942fa0");
  });
});
