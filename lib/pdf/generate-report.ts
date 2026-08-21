import { jsPDF } from "jspdf";

export type CalculatorReport = {
  calculator: string;

  result: string;

  interpretation?: string;

  unit?: string;

  formula?: string;

  normalRange?: string;

  notes?: string;

  references?: string[];

  reviewedBy?: string;

  version?: string;
};

/** A4 page dimensions in mm */
const PAGE_HEIGHT = 297;
const TOP_MARGIN = 20;
const BOTTOM_MARGIN = 20;
const FOOTER_HEIGHT = 32;
const USABLE_HEIGHT =
  PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN - FOOTER_HEIGHT; // 225

/** Fixed y-coordinate for the footer (near bottom of every page) */
const FOOTER_Y = PAGE_HEIGHT - BOTTOM_MARGIN - FOOTER_HEIGHT; // 245

/** Width available for text starting at x=70 (right column) */
const RIGHT_COL_WIDTH = 120;

/**
 * Ensure there is room for `needed` mm of content on the current page,
 * leaving space for the footer at the bottom.
 * If not, add a new page and reset y to TOP_MARGIN.
 */
function ensureRoom(
  doc: jsPDF,
  y: number,
  needed: number,
): number {
  if (y + needed > USABLE_HEIGHT) {
    doc.addPage();
    return TOP_MARGIN;
  }
  return y;
}

/**
 * Write wrapped text that may itself exceed one page.
 * Returns the new y after all lines have been placed.
 */
function writeWrappedText(
  doc: jsPDF,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
): number {
  for (const line of lines) {
    y = ensureRoom(doc, y, lineHeight);
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

/**
 * Sanitize a string for use as a filename.
 * Removes characters illegal on Windows/macOS/Linux:
 * \ / : * ? " < > | and control characters (0x00-0x1F).
 * Collapses whitespace and leading/trailing dots/hyphens.
 */
function sanitizeFilename(name: string): string {
  return (
    name
      .replace(/[\\/:*?"<>|\x00-\x1f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || ""
  );
}

/**
 * Generate a PDF report for a calculator result.
 * Returns true on success, false if generation fails.
 */
export function generateCalculatorReport(
  report: CalculatorReport,
): boolean {
  try {
    const doc = new jsPDF();

    let y = TOP_MARGIN;

    // ------------------------------------------------
    // Header
    // ------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MedCalcHub", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Clinical Calculator Report", 20, y);

    y += 15;

    // ------------------------------------------------
    // Calculator
    // ------------------------------------------------

    y = ensureRoom(doc, y, 10);

    doc.setFont("helvetica", "bold");
    doc.text("Calculator", 20, y);

    doc.setFont("helvetica", "normal");
    doc.text(report.calculator || "Untitled", 70, y);

    y += 10;

    // ------------------------------------------------
    // Result
    // ------------------------------------------------

    y = ensureRoom(doc, y, 10);

    doc.setFont("helvetica", "bold");
    doc.text("Result", 20, y);

    doc.setFont("helvetica", "normal");
    doc.text(
      `${report.result}${
        report.unit ? ` ${report.unit}` : ""
      }`,
      70,
      y,
    );

    y += 10;

    // ------------------------------------------------
    // Interpretation
    // ------------------------------------------------

    if (report.interpretation) {
      const lines = doc.splitTextToSize(
        report.interpretation,
        RIGHT_COL_WIDTH,
      );

      const blockHeight = 7 + lines.length * 7 + 5; // label + lines + gap

      y = ensureRoom(doc, y, blockHeight);

      doc.setFont("helvetica", "bold");
      doc.text("Interpretation", 20, y);

      doc.setFont("helvetica", "normal");

      y = writeWrappedText(doc, lines, 70, y + 7, 7);

      y += 5;
    }

    // ------------------------------------------------
    // Formula
    // ------------------------------------------------

    if (report.formula) {
      const lines = doc.splitTextToSize(
        report.formula,
        RIGHT_COL_WIDTH,
      );

      const blockHeight = 7 + lines.length * 7 + 5;

      y = ensureRoom(doc, y, blockHeight);

      doc.setFont("helvetica", "bold");
      doc.text("Formula", 20, y);

      doc.setFont("helvetica", "normal");

      y = writeWrappedText(doc, lines, 70, y + 7, 7);

      y += 5;
    }

    // ------------------------------------------------
    // Reference Range
    // ------------------------------------------------

    if (report.normalRange) {
      const lines = doc.splitTextToSize(
        report.normalRange,
        RIGHT_COL_WIDTH,
      );

      const blockHeight = 7 + lines.length * 7 + 5;

      y = ensureRoom(doc, y, blockHeight);

      doc.setFont("helvetica", "bold");
      doc.text("Reference", 20, y);

      doc.setFont("helvetica", "normal");

      y = writeWrappedText(doc, lines, 70, y + 7, 7);

      y += 5;
    }

    // ------------------------------------------------
    // Clinical Notes
    // ------------------------------------------------

    if (report.notes) {
      const lines = doc.splitTextToSize(
        report.notes,
        170,
      );

      const blockHeight = 7 + lines.length * 7 + 12;

      y = ensureRoom(doc, y, blockHeight);

      doc.setFont("helvetica", "bold");
      doc.text("Clinical Notes", 20, y);

      doc.setFont("helvetica", "normal");

      y = writeWrappedText(doc, lines, 20, y + 7, 7);

      y += 12;
    }

    // ------------------------------------------------
    // References
    // ------------------------------------------------

    if (report.references?.length) {
      // Ensure room for the heading
      y = ensureRoom(doc, y, 7);

      doc.setFont("helvetica", "bold");
      doc.text("References", 20, y);

      y += 7;

      doc.setFont("helvetica", "normal");

      report.references.forEach((ref) => {
        const wrappedLines = doc.splitTextToSize(
          `\u2022 ${ref}`,
          165,
        );

        const blockHeight = wrappedLines.length * 7;

        y = ensureRoom(doc, y, blockHeight);

        for (const line of wrappedLines) {
          doc.text(line, 25, y);
          y += 7;
        }
      });

      y += 5;
    }

    // ------------------------------------------------
    // Footer (fixed position near bottom of page)
    // ------------------------------------------------

    const footerY = FOOTER_Y;

    doc.setDrawColor(220);
    doc.line(20, footerY, 190, footerY);

    let fy = footerY + 10;

    doc.setFontSize(10);

    doc.text(
      `Reviewed By: ${
        report.reviewedBy ??
        "MedCalcHub Clinical Team"
      }`,
      20,
      fy,
    );

    fy += 6;

    doc.text(
      `Version: ${report.version ?? "1.0"}`,
      20,
      fy,
    );

    fy += 6;

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      fy,
    );

    fy += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Estimates are for clinical reference only and do not constitute a diagnosis.",
      20,
      fy,
    );

    const filename = sanitizeFilename(report.calculator);

    doc.save(filename ? `${filename}-report.pdf` : "report.pdf");

    return true;
  } catch {
    return false;
  }
}