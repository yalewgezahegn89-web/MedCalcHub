import { jsPDF } from "jspdf";

export type CalculatorReport = {
  calculator: string;
  result: string;
  interpretation?: string;
  unit?: string;
  notes?: string;
  references?: string[];
};

export function generateCalculatorReport(
  report: CalculatorReport,
) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text("MedCalcHub", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.text("Clinical Calculator Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Calculator: ${report.calculator}`, 20, y);

  y += 10;

  doc.text(
    `Result: ${report.result}${report.unit ? " " + report.unit : ""}`,
    20,
    y,
  );

  y += 10;

  if (report.interpretation) {
    doc.text("Interpretation:", 20, y);

    y += 7;

    doc.text(report.interpretation, 25, y);

    y += 10;
  }

  if (report.notes) {
    doc.text("Clinical Notes:", 20, y);

    y += 7;

    const lines = doc.splitTextToSize(report.notes, 170);

    doc.text(lines, 25, y);

    y += lines.length * 7;
  }

  if (report.references?.length) {
    doc.text("References:", 20, y);

    y += 7;

    report.references.forEach((ref) => {
      doc.text(`• ${ref}`, 25, y);
      y += 7;
    });
  }

  y += 10;

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    y,
  );

  doc.save(
    `${report.calculator.replace(/\s+/g, "-").toLowerCase()}-report.pdf`,
  );
}