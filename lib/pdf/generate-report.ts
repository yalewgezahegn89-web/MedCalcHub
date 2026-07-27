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

export function generateCalculatorReport(
  report: CalculatorReport,
) {
  const doc = new jsPDF();

  let y = 20;

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

  doc.setFont("helvetica", "bold");
  doc.text("Calculator", 20, y);

  doc.setFont("helvetica", "normal");
  doc.text(report.calculator, 70, y);

  y += 10;

  // ------------------------------------------------
  // Result
  // ------------------------------------------------

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
    doc.setFont("helvetica", "bold");
    doc.text("Interpretation", 20, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(
      report.interpretation,
      120,
    );

    doc.text(lines, 70, y);

    y += lines.length * 7 + 5;
  }

  // ------------------------------------------------
  // Formula
  // ------------------------------------------------

  if (report.formula) {
    doc.setFont("helvetica", "bold");
    doc.text("Formula", 20, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(
      report.formula,
      120,
    );

    doc.text(lines, 70, y);

    y += lines.length * 7 + 5;
  }

  // ------------------------------------------------
  // Reference Range
  // ------------------------------------------------

  if (report.normalRange) {
    doc.setFont("helvetica", "bold");
    doc.text("Reference", 20, y);

    doc.setFont("helvetica", "normal");
    doc.text(report.normalRange, 70, y);

    y += 10;
  }

  // ------------------------------------------------
  // Clinical Notes
  // ------------------------------------------------

  if (report.notes) {
    doc.setFont("helvetica", "bold");
    doc.text("Clinical Notes", 20, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(
      report.notes,
      170,
    );

    doc.text(lines, 20, y + 7);

    y += lines.length * 7 + 12;
  }

  // ------------------------------------------------
  // References
  // ------------------------------------------------

  if (report.references?.length) {
    doc.setFont("helvetica", "bold");
    doc.text("References", 20, y);

    y += 7;

    doc.setFont("helvetica", "normal");

    report.references.forEach((ref) => {
      doc.text(`• ${ref}`, 25, y);
      y += 7;
    });

    y += 5;
  }

  // ------------------------------------------------
  // Footer
  // ------------------------------------------------

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

  doc.save(
    `${report.calculator
      .replace(/\s+/g, "-")
      .toLowerCase()}-report.pdf`,
  );
}