import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function main() {
  const pdfPath = './public/assets/aistudio/LA2_Smart_Water_Monitoring_Simple_Report_b991d4db.pdf';
  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();

  // 1. PAGE 1 UPDATE:
  const page1 = pages[0];
  // Cover the old text in the Group Members box
  // The box is at x=306.5, y=531, width=244, height=13.2
  page1.drawRectangle({
    x: 306.8,
    y: 531.0,
    width: 243.0,
    height: 12.8,
    color: rgb(1, 1, 1), // clean white cover
  });

  // Draw new text with Rahul first and addressed as Admin & Lead Developer
  page1.drawText('Rahul (Admin & Lead Developer), Sushanth, Rohan, Jilani, Adthiya, Soyug', {
    x: 310.0,
    y: 534.5,
    size: 7.2,
    font: fontRegular,
    color: rgb(0.176, 0.216, 0.255),
  });

  // 2. PAGE 3 UPDATE:
  const page3 = pages[2];
  // Cover the 6 table data rows (from y=466 to y=550)
  // Left col: x=56 to 300 (width=244)
  // Right col: x=301 to 545 (width=244)
  const rows = [
    {
      y: 536,
      name: 'Rahul (Admin & Lead Developer)',
      task: 'System Administrator & Lead Developer of this website; report QA',
      isLead: true
    },
    {
      y: 522,
      name: 'Sushanth',
      task: 'Coordinate the group',
      isLead: false
    },
    {
      y: 508,
      name: 'Rohan',
      task: 'Help connect the sensor and Arduino',
      isLead: false
    },
    {
      y: 494,
      name: 'Jilani',
      task: 'Check the sensor readings',
      isLead: false
    },
    {
      y: 480,
      name: 'Adthiya',
      task: 'Run the Python program',
      isLead: false
    },
    {
      y: 466,
      name: 'Soyug',
      task: 'Collect notes and help with the presentation',
      isLead: false
    }
  ];

  for (const r of rows) {
    // Blank out the old text in the cell
    page3.drawRectangle({
      x: 57.0,
      y: r.y - 4.5,
      width: 242.0,
      height: 13.0,
      color: rgb(1, 1, 1),
    });
    page3.drawRectangle({
      x: 302.0,
      y: r.y - 4.5,
      width: 242.0,
      height: 13.0,
      color: rgb(1, 1, 1),
    });

    // Draw updated member name
    page3.drawText(r.name, {
      x: 61.2,
      y: r.y,
      size: r.isLead ? 8.2 : 9.5,
      font: r.isLead ? fontBold : fontRegular,
      color: rgb(0.176, 0.216, 0.255),
    });

    // Draw updated task description
    page3.drawText(r.task, {
      x: 306.1,
      y: r.y,
      size: r.isLead ? 7.6 : 9.5,
      font: fontRegular,
      color: rgb(0.176, 0.216, 0.255),
    });
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, modifiedPdfBytes);
  console.log("Successfully updated PDF with Rahul first as Admin & Lead Developer!");
}

main().catch(console.error);
