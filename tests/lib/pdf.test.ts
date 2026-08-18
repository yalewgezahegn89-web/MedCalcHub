import { describe, it, expect, vi, beforeEach } from "vitest";

// ── jsPDF mock (hoisted so it exists when vi.mock factory runs) ──

const { mockDoc } = vi.hoisted(() => ({
  mockDoc: {
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    text: vi.fn(),
    splitTextToSize: vi.fn(),
    addPage: vi.fn(),
    save: vi.fn(),
    setDrawColor: vi.fn(),
    line: vi.fn(),
  },
}));

vi.mock("jspdf", () => ({
  jsPDF: vi.fn(function () { return mockDoc; }),
}));

// Import the module once — avoids per-test dynamic import overhead
import { generateCalculatorReport } from "../../lib/pdf/generate-report";

// ── tests ───────────────────────────────────────────────────

describe("generateCalculatorReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: splitTextToSize returns one line (short text)
    mockDoc.splitTextToSize.mockImplementation(
      (text: string, _w: number) => [text],
    );
  });

  // ──────────────────────────────────────────────────────────
  // 1. Minimal report
  // ──────────────────────────────────────────────────────────

  it("minimal report generates successfully", () => {
    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
    });
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });

  // ──────────────────────────────────────────────────────────
  // 2. Normal report with all optional fields
  // ──────────────────────────────────────────────────────────

  it("handles all optional report fields", () => {
    generateCalculatorReport({
      calculator: "eGFR",
      result: "62",
      unit: "mL/min",
      interpretation: "Mildly decreased",
      formula: "MDRD equation",
      normalRange: "≥ 60",
      notes: "Repeat in 3 months",
      references: ["KDIGO 2012", "NKF-KDOQI"],
      reviewedBy: "Dr. Smith",
      version: "2.0",
    });
    expect(mockDoc.save).toHaveBeenCalledOnce();
    expect(mockDoc.text).toHaveBeenCalled();
  });

  // ──────────────────────────────────────────────────────────
  // 3. Long interpretation causes page break
  // ──────────────────────────────────────────────────────────

  it("long interpretation triggers addPage()", () => {
    mockDoc.splitTextToSize.mockImplementation(
      (text: string, _w: number) => {
        if (text.length <= 20) return [text];
        const lines: string[] = [];
        for (let i = 0; i < text.length; i += 20) {
          lines.push(text.slice(i, i + 20));
        }
        return lines;
      },
    );

    const longText = "A".repeat(600);

    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
      interpretation: longText,
    });

    expect(mockDoc.addPage).toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });

  // ──────────────────────────────────────────────────────────
  // 4. Many references cause page breaks
  // ──────────────────────────────────────────────────────────

  it("many references trigger page breaks", () => {
    const references = Array.from(
      { length: 50 },
      (_, i) => `Reference ${i + 1}`,
    );

    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
      references,
    });

    expect(mockDoc.addPage).toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });

  // ──────────────────────────────────────────────────────────
  // 5. Long clinical notes span pages
  // ──────────────────────────────────────────────────────────

  it("long clinical notes trigger page breaks", () => {
    mockDoc.splitTextToSize.mockImplementation(
      (text: string, _w: number) => {
        if (text.length <= 20) return [text];
        const lines: string[] = [];
        for (let i = 0; i < text.length; i += 20) {
          lines.push(text.slice(i, i + 20));
        }
        return lines;
      },
    );

    const longNotes = "N".repeat(600);

    generateCalculatorReport({
      calculator: "CrCl",
      result: "45",
      notes: longNotes,
    });

    expect(mockDoc.addPage).toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });

  // ──────────────────────────────────────────────────────────
  // 6. doc.save() filename format
  // ──────────────────────────────────────────────────────────

  it("calls save with hyphenated lowercase filename", () => {
    generateCalculatorReport({
      calculator: "Body Mass Index",
      result: "24.9",
    });
    expect(mockDoc.save).toHaveBeenCalledWith(
      "body-mass-index-report.pdf",
    );
  });

  // ──────────────────────────────────────────────────────────
  // 7. Multi-page report continues rendering
  // ──────────────────────────────────────────────────────────

  it("continues rendering after addPage (footer present)", () => {
    mockDoc.splitTextToSize.mockImplementation(
      (text: string, _w: number) => {
        if (text.length <= 20) return [text];
        const lines: string[] = [];
        for (let i = 0; i < text.length; i += 20) {
          lines.push(text.slice(i, i + 20));
        }
        return lines;
      },
    );

    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
      interpretation: "X".repeat(600),
      reviewedBy: "Dr. Jones",
      version: "3.1",
    });

    expect(mockDoc.setDrawColor).toHaveBeenCalled();
    expect(mockDoc.line).toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();

    const allTextCalls = mockDoc.text.mock.calls.map(
      (c: unknown[]) => String(c[0]),
    );
    expect(
      allTextCalls.some((t: string) =>
        t.includes("Reviewed By"),
      ),
    ).toBe(true);
    expect(
      allTextCalls.some((t: string) =>
        t.includes("Version: 3.1"),
      ),
    ).toBe(true);
  });

  // ──────────────────────────────────────────────────────────
  // 8. Header text is always present on first page
  // ──────────────────────────────────────────────────────────

  it("writes MedCalcHub header on the first page", () => {
    generateCalculatorReport({
      calculator: "BUN",
      result: "18",
    });

    const allTextCalls = mockDoc.text.mock.calls.map(
      (c: unknown[]) => String(c[0]),
    );
    expect(allTextCalls).toContain("MedCalcHub");
    expect(allTextCalls).toContain(
      "Clinical Calculator Report",
    );
  });

  // ──────────────────────────────────────────────────────────
  // 9. Unit is appended to result when provided
  // ──────────────────────────────────────────────────────────

  it("appends unit to result text", () => {
    generateCalculatorReport({
      calculator: "Creatinine",
      result: "1.2",
      unit: "mg/dL",
    });

    const allTextCalls = mockDoc.text.mock.calls.map(
      (c: unknown[]) => String(c[0]),
    );
    expect(
      allTextCalls.some((t: string) =>
        t.includes("1.2 mg/dL"),
      ),
    ).toBe(true);
  });

  // ──────────────────────────────────────────────────────────
  // 10. No page break when content fits
  // ──────────────────────────────────────────────────────────

  it("does not add pages when content fits", () => {
    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
    });

    expect(mockDoc.addPage).not.toHaveBeenCalled();
  });

  // ──────────────────────────────────────────────────────────
  // 11. Long normalRange wraps and triggers page breaks
  // ──────────────────────────────────────────────────────────

  it("long normalRange wraps and triggers page breaks", () => {
    mockDoc.splitTextToSize.mockImplementation(
      (text: string, _w: number) => {
        if (text.length <= 20) return [text];
        const lines: string[] = [];
        for (let i = 0; i < text.length; i += 20) {
          lines.push(text.slice(i, i + 20));
        }
        return lines;
      },
    );

    const longRange = "R".repeat(600);

    generateCalculatorReport({
      calculator: "Creatinine Clearance",
      result: "120",
      normalRange: longRange,
    });

    expect(mockDoc.addPage).toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });

  // ──────────────────────────────────────────────────────────
  // 12. Short normalRange does not cause a page break
  // ──────────────────────────────────────────────────────────

  it("short normalRange does not cause a page break", () => {
    generateCalculatorReport({
      calculator: "BMI",
      result: "24.9",
      normalRange: "18.5 – 24.9",
    });

    expect(mockDoc.addPage).not.toHaveBeenCalled();
    expect(mockDoc.save).toHaveBeenCalledOnce();
  });
});
