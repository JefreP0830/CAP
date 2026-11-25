import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CAP_COLORS, SOURCE, requiredItems, tally, refitList, levelTitle, levelSource, type InspectionLevel, type Rating } from '../pack';

export interface PackSubmission {
  memberCAPID: string;
  inspectorCAPID: string;
  activity: string;
  date: string;
  ratings: Record<number, Rating>;
  sustain: string;
  improve: string;
}

const LABEL: Record<Rating, string> = { Pass: 'P', Fail: 'F', NA: 'N/A' };

// Same layout as the Drill Evaluator PDF: title, CAP subtitle, Ultramarine rule, result, table, hotwash.
export const generatePackPDF = (s: PackSubmission, level: InspectionLevel) => {
  const doc = new jsPDF();
  const BODY: [number, number, number] = [77, 77, 77];

  doc.setFont('helvetica', 'bold'); doc.setTextColor(CAP_COLORS.blue); doc.setFontSize(16);
  doc.text(`PACK INSPECTION: ${levelTitle(level).toUpperCase()}`, 20, 20);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...BODY);
  doc.text(`Civil Air Patrol  |  ${levelSource(level)}`, 20, 27);
  doc.setDrawColor(CAP_COLORS.blue); doc.setLineWidth(0.8); doc.line(20, 31, 190, 31);

  const kv = (k: string, v: string, x: number, y: number) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...BODY); doc.text(k.toUpperCase(), x, y);
    doc.setFontSize(12); doc.setTextColor(0, 0, 0); doc.text(v || '-', x, y + 5.5); doc.setFont('helvetica', 'normal');
  };
  kv('Member CAPID', s.memberCAPID, 20, 40);
  kv('Inspector CAPID', s.inspectorCAPID, 65, 40);
  kv('Date', s.date, 110, 40);
  kv('Activity', s.activity.slice(0, 28), 140, 40);

  const t = tally(level, s.ratings);
  const ok = t.ready === t.need;
  doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.setTextColor(ok ? CAP_COLORS.blue : CAP_COLORS.red);
  doc.text(`RESULT: ${ok ? 'PASS' : 'FAIL'} (${t.ready} of ${t.need} required items passed)`, 105, 60, { align: 'center' });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...BODY);
  doc.text('Pass: every required item present and serviceable. Only listed substitutes allowed.', 105, 65, { align: 'center' });

  const rows = requiredItems(level).map(({ p, i }, n) => [
    String(n + 1),
    p.group,
    { content: p.sub ? `${p.item} (or ${p.sub})` : p.item, styles: { fontSize: 8 } },
    LABEL[s.ratings[i]] || '-',
  ]);
  autoTable(doc, {
    startY: 70,
    head: [['#', 'Group', 'Item', 'Result']],
    body: rows,
    headStyles: { fillColor: [0, 20, 137], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [0, 0, 0], fontSize: 8 },
    alternateRowStyles: { fillColor: [245, 246, 252] },
    columnStyles: { 0: { cellWidth: 9 }, 1: { cellWidth: 30 }, 2: { cellWidth: 109 }, 3: { cellWidth: 22 } },
    margin: { left: 20, right: 20 },
    styles: { overflow: 'linebreak', cellPadding: 1.6 },
    didParseCell: (d) => {
      if (d.section === 'body' && d.column.index === 3 && d.cell.raw === 'F') {
        d.cell.styles.fontStyle = 'bold';
      }
    },
  });

  let y = (doc as any).lastAutoTable.finalY + 10;
  const room = (h: number) => { if (y + h > 275) { doc.addPage(); y = 20; } };
  const para = (txt: string, x = 20, w = 170) => {
    const lines = doc.splitTextToSize(txt, w); room(lines.length * 5 + 2); doc.text(lines, x, y); y += lines.length * 5 + 2;
  };
  room(12); doc.setTextColor(CAP_COLORS.blue); doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
  doc.text('Hotwash (AAR)', 20, y); y += 6; doc.setTextColor(0, 0, 0); doc.setFontSize(10);

  const r = refitList(level, s.ratings);
  para('Refit list (Task O-0002, 4 R’s)'); doc.setFont('helvetica', 'normal');
  if (!r.length) para('None. Every required item passed.', 25, 165);
  else para(`Replenish or repair: ${r.map(p => p.item).join('; ')}.`, 25, 165);
  y += 2;
  doc.setFont('helvetica', 'bold'); para('Sustain (what went well)'); doc.setFont('helvetica', 'normal'); para(s.sustain, 25, 165);
  doc.setFont('helvetica', 'bold'); para('Improve (coaching point)'); doc.setFont('helvetica', 'normal'); para(s.improve, 25, 165);

  room(20); y += 8;
  doc.text('__________________________', 20, y);
  doc.text(`Inspector CAPID ${s.inspectorCAPID}`, 20, y + 5);

  const pages = doc.getNumberOfPages();
  for (let pg = 1; pg <= pages; pg++) {
    doc.setPage(pg); doc.setFontSize(9); doc.setTextColor(...BODY);
    doc.text(`Civil Air Patrol | Event Pack Inspection | page ${pg} of ${pages}`, 105, 288, { align: 'center' });
  }
  return doc;
};
