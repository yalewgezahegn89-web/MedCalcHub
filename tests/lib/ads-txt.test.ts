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

  it("does not contain a fake placeholder publisher ID", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    expect(content).not.toContain("pub-0000000000000000");
  });

  it("contains no active google.com entry lines", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    const lines = content
      .split("\n")
      .filter((l) => l.trim().length > 0 && !l.startsWith("#"));
    const googleLine = lines.find((l) => l.startsWith("google.com,"));
    expect(googleLine).toBeUndefined();
  });

  it("contains instructions for adding a real publisher entry later", () => {
    const content = fs.readFileSync(adsTxtPath, "utf-8");
    expect(content).toContain("ca-pub-XXXXXXXXXXXXXXXX");
  });
});
