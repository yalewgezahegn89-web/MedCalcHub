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
const USABLE_HEIGHT = PAGE_HEIGHT - BOTTOM_MARGIN; // 277

/**
 * Ensure there is room for `needed` mm of content on the current page.
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

export function generateCalculatorReport(
  report: CalculatorReport,
) {
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
  doc.text(report.calculator, 70, y);

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
      120,
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
      120,
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
      120,
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
      y = ensureRoom(doc, y, 7);
      doc.text(`\u2022 ${ref}`, 25, y);
      y += 7;
    });

    y += 5;
  }

  // ------------------------------------------------
  // Footer
  // ------------------------------------------------

  // Ensure room for footer (line + 3 text lines ~ 32mm)
  y = ensureRoom(doc, y, 32);

  doc.setDrawColor(220);
  doc.line(20, y, 190, y);

  y += 10;

  doc.setFontSize(10);

  doc.text(
    `Reviewed By: ${
      report.reviewedBy ??
      "MedCalcHub Clinical Team"
    }`,
    20,
    y,
  );

  y += 6;

  doc.text(
    `Version: ${report.version ?? "1.0"}`,
    20,
    y,
  );

  y += 6;

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    y,
  );

  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Estimates are for clinical reference only and do not constitute a diagnosis.",
    20,
    y,
  );

  doc.save(
    `${report.calculator
      .replace(/\s+/g, "-")
      .toLowerCase()}-report.pdf`,
  );
}