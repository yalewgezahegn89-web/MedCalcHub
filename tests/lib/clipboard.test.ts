import { describe, it, expect, beforeEach, vi } from "vitest";

describe("clipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function load() {
    return import("../../lib/clipboard/copy");
  }

  describe("copyToClipboard", () => {
    it("returns true when writeText succeeds", async () => {
      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      });

      const { copyToClipboard } = await load();
      const result = await copyToClipboard("hello");
      expect(result).toBe(true);
    });

    it("passes the exact text to writeText", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", {
        clipboard: { writeText },
      });

      const { copyToClipboard } = await load();
      await copyToClipboard("test-value-123");
      expect(writeText).toHaveBeenCalledWith("test-value-123");
    });

    it("returns false when writeText rejects", async () => {
      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
        },
      });

      const { copyToClipboard } = await load();
      const result = await copyToClipboard("hello");
      expect(result).toBe(false);
    });

    it("returns false when navigator.clipboard is unavailable", async () => {
      vi.stubGlobal("navigator", {});

      const { copyToClipboard } = await load();
      const result = await copyToClipboard("hello");
      expect(result).toBe(false);
    });

    it("handles empty string without throwing", async () => {
      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      });

      const { copyToClipboard } = await load();
      const result = await copyToClipboard("");
      expect(result).toBe(true);
    });

    it("no exception escapes the function", async () => {
      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new DOMException("Abort", "AbortError")),
        },
      });

      const { copyToClipboard } = await load();
      await expect(copyToClipboard("text")).resolves.toBe(false);
    });
  });
});